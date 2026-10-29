import type { CarePackage, PackageService } from "./package-types";

// Explicit records override local declarations, which override inherited records.
// An absent record is unknown, never implicitly included or excluded.
export function resolvePackageServices(
  target: CarePackage,
  packages: CarePackage[],
  records: PackageService[],
  ancestors = new Set<string>(),
): Map<string, PackageService> {
  if (ancestors.has(target.id)) throw new Error("Cyclic package inheritance");
  const visited = new Set(ancestors).add(target.id);
  let resolved = new Map<string, PackageService>();
  if (target.inheritsFromPackageId) {
    const parent = packages.find((item) => item.id === target.inheritsFromPackageId && item.centreId === target.centreId);
    if (!parent) throw new Error("Missing parent package in this centre");
    resolved = resolvePackageServices(parent, packages, records, visited);
  }
  for (const serviceId of target.includedStandardServiceIds) {
    resolved.set(serviceId, { packageId: target.id, serviceId, status: "included" });
  }
  for (const record of records.filter((item) => item.packageId === target.id)) {
    resolved.set(record.serviceId, record);
  }
  return new Map([...resolved].map(([id, record]) => [id, { ...record, packageId: target.id }]));
}
