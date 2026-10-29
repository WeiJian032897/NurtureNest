// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { StayConfigurator } from "./stay-configurator";
import { getStayPageData } from "@/lib/stay-data";
import { createSelectedStayPayload, findStayOption } from "@/lib/stay-pricing";

afterEach(cleanup);
const data = getStayPageData("jade-and-bloom")!;

describe("stay configuration", () => {
  it("updates all four totals and prepares only a demo action", () => {
    render(<StayConfigurator {...data} />);
    expect(screen.getByText("RM 21,000")).toBeTruthy();
    expect(screen.queryByRole("combobox")).toBeNull();
    fireEvent.click(screen.getByRole("radio", { name: /Premium Care/ }));
    expect(screen.getByText("RM 26,000")).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: /Deluxe Room/ }));
    expect(screen.getByText("RM 29,500")).toBeTruthy();
    fireEvent.click(screen.getByRole("radio", { name: /Essential Care/ }));
    expect(screen.getByText("RM 24,500")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Add to Cart/ }));
    expect(screen.getByRole("status").textContent).toContain("nothing has been added to a cart");
    fireEvent.click(screen.getByRole("radio", { name: /Standard Room/ }));
    expect(screen.getByRole("status").textContent).toBe("");
  });

  it("disables unavailable combinations and requests a quote for missing prices", () => {
    const fixture = structuredClone(data);
    fixture.pricing!.options[1].status = "unavailable";
    fixture.pricing!.options[0].finalTotalPriceMYR = undefined;
    render(<StayConfigurator {...fixture} />);
    expect((screen.getByRole("radio", { name: /Premium Care/ }) as HTMLInputElement).disabled).toBe(true);
    expect(screen.getByText("Request quote")).toBeTruthy();
    expect((screen.getByRole("button", { name: /Add to Cart/ }) as HTMLButtonElement).disabled).toBe(true);
    fireEvent.click(screen.getByRole("radio", { name: /Deluxe Room/ }));
    expect((screen.getByRole("radio", { name: /Premium Care/ }) as HTMLInputElement).disabled).toBe(false);
    expect(screen.getByText("RM 24,500")).toBeTruthy();
  });

  it("uses the published final total rather than calculating it from component prices", () => {
    const fixture = structuredClone(data);
    fixture.pricing!.options[0].finalTotalPriceMYR = 20000;
    render(<StayConfigurator {...fixture} />);
    expect(screen.getByText("RM 20,000")).toBeTruthy();
    expect(screen.getByText("−RM 1,000")).toBeTruthy();
    const option = findStayOption(fixture.pricing, fixture.centre.id, "standard-room", "jb-essential", 42);
    expect(createSelectedStayPayload(option)?.finalTotalPriceMYR).toBe(20000);
    expect(createSelectedStayPayload(undefined)).toBeUndefined();
    expect(createSelectedStayPayload({ ...option!, status: "request_quote" })).toBeUndefined();
  });

  it("handles missing pricing and missing inventory without an actionable selection", () => {
    render(<StayConfigurator {...data} rooms={[]} pricing={undefined} />);
    expect(screen.getByText("No rooms are currently available.")).toBeTruthy();
    expect((screen.getByRole("button", { name: /Add to Cart/ }) as HTMLButtonElement).disabled).toBe(true);
  });
});
