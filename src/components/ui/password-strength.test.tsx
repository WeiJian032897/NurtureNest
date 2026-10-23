// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { usePasswordStrength } from "./password-strength";

afterEach(() => { cleanup(); vi.useRealTimers(); });
describe("strength hook", () => {
  it("keeps scoring independent of optional checklist rules", () => {
    const { result } = renderHook(() => usePasswordStrength("correct horse battery staple", { rules: [{ id: "never", label: "Optional", test: () => false }] }));
    expect(result.current.max).toBe(4);
    expect(result.current.score).toBe(4);
    expect(result.current.rules[0].met).toBe(false);
  });
  it("debounces announcements and clears them when the password resets", () => {
    vi.useFakeTimers();
    const { result, rerender, unmount } = renderHook(({ value }) => usePasswordStrength(value), { initialProps: { value: "Summer12345" } });
    expect(result.current.announcement).toBe("");
    act(() => { vi.advanceTimersByTime(700); });
    expect(result.current.announcement).toContain("Weak");
    expect(result.current.announcement).toContain("Commonly guessed");
    expect(result.current.announcement).not.toContain("Summer12345");
    rerender({ value: "" });
    expect(result.current.announcement).toBe("");
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
