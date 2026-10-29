import { describe, expect, it } from "vitest";
import { resolvePackageServices } from "./package-services";
import { jadeBloomPackages } from "./jade-bloom-packages";
import { standardServices } from "./standard-services";

const { packages, services } = jadeBloomPackages;
describe("package service resolution", () => {
  it("inherits baseline care while keeping rooming-in exclusive to the upgraded package", () => {
    const base = resolvePackageServices(packages[0], packages, services);
    const upgraded = resolvePackageServices(packages[1], packages, services);
    expect(base.get("newborn.rooming-in")?.status).toBe("not_included");
    expect(upgraded.get("newborn.rooming-in")?.status).toBe("included");
    for (const [id, record] of base) {
      if (record.status !== "not_included") expect(upgraded.get(id)?.status).toBe(record.status);
    }
    expect(upgraded.get("maternal.medical-referral")?.status).toBe("included");
    expect(base.get("wellness.personalised-sessions")?.status).toBe("not_included");
    expect(upgraded.get("wellness.personalised-sessions")?.status).toBe("included");
    expect(upgraded.get("wellness.personalised-sessions")?.details).toBe("Sessions are personalised according to individual recovery needs and medical suitability.");
    expect(base.get("wellness.shared-facilities")?.status).toBe("included");
    expect(upgraded.get("wellness.shared-facilities")?.status).toBe("included");
    for (const service of standardServices) expect(base.has(service.id) && upgraded.has(service.id)).toBe(true);
  });
  it("uses IDs rather than names, preserves unknowns and allows explicit overrides", () => {
    const renamed = packages.map((item) => ({ ...item, name: "Different name" }));
    const result = resolvePackageServices(renamed[1], renamed, [...services, { packageId: renamed[1].id, serviceId: "maternal.daily-support", status: "not_included" }]);
    expect(result.get("maternal.daily-support")?.status).toBe("not_included");
    expect(result.get("undefined-service")).toBeUndefined();
    expect(result.get("newborn.feeding")?.status).toBe("included");
  });
  it("rejects cycles and missing or cross-centre parents", () => {
    const cyclic = packages.map((item) => ({ ...item, inheritsFromPackageId: item.id }));
    expect(() => resolvePackageServices(cyclic[0], cyclic, services)).toThrow();
    expect(() => resolvePackageServices(packages[1], [packages[1]], services)).toThrow();
    expect(() => resolvePackageServices({ ...packages[1], centreId: "other" }, packages, services)).toThrow();
  });
});
