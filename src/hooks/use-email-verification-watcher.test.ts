// @vitest-environment jsdom
import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "firebase/auth";
import { useEmailVerificationWatcher } from "./use-email-verification-watcher";

function makeUser(uid = "parent") {
  return { uid, emailVerified: false, reload: vi.fn().mockResolvedValue(undefined) };
}
beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.restoreAllMocks(); });

describe("email verification watcher", () => {
  it("checks every four seconds and stops all checks after success", async () => {
    const user = makeUser();
    const { result } = renderHook(() => useEmailVerificationWatcher(user as unknown as User));
    await act(async () => { await vi.advanceTimersByTimeAsync(0); });
    expect(user.reload).toHaveBeenCalledTimes(1);
    await act(async () => { await vi.advanceTimersByTimeAsync(4000); });
    expect(user.reload).toHaveBeenCalledTimes(2);
    user.emailVerified = true;
    await act(async () => { await vi.advanceTimersByTimeAsync(4000); });
    expect(result.current.verified).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    await act(async () => {
      document.dispatchEvent(new Event("visibilitychange"));
      await vi.advanceTimersByTimeAsync(12000);
    });
    expect(user.reload).toHaveBeenCalledTimes(3);
  });
  it("pauses while hidden and checks immediately on return", async () => {
    const hidden = vi.spyOn(document, "hidden", "get").mockReturnValue(true);
    const user = makeUser();
    renderHook(() => useEmailVerificationWatcher(user as unknown as User));
    await act(async () => { await vi.advanceTimersByTimeAsync(12000); });
    expect(user.reload).not.toHaveBeenCalled();
    hidden.mockReturnValue(false);
    await act(async () => { document.dispatchEvent(new Event("visibilitychange")); });
    expect(user.reload).toHaveBeenCalledTimes(1);
  });
  it("avoids overlapping requests and ignores an in-flight result after unmount", async () => {
    let resolve!: () => void;
    const user = makeUser();
    user.reload.mockImplementation(() => new Promise<void>((done) => { resolve = done; }));
    const { result, unmount } = renderHook(() => useEmailVerificationWatcher(user as unknown as User));
    await act(async () => { await vi.advanceTimersByTimeAsync(12000); });
    expect(user.reload).toHaveBeenCalledTimes(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
    user.emailVerified = true;
    await act(async () => { resolve(); });
    expect(result.current.verified).toBe(false);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(user.reload).toHaveBeenCalledTimes(1);
  });
  it("retries transient failures and does not carry success to another user", async () => {
    const first = makeUser();
    first.reload.mockRejectedValueOnce(new Error("offline"));
    const { result, rerender } = renderHook(({ user }) => useEmailVerificationWatcher(user), { initialProps: { user: first as unknown as User | null } });
    await act(async () => { await vi.advanceTimersByTimeAsync(0); });
    expect(result.current.error).toBeTruthy();
    first.emailVerified = true;
    await act(async () => { await vi.advanceTimersByTimeAsync(4000); });
    expect(result.current.verified).toBe(true);
    const second = makeUser("another");
    rerender({ user: second as unknown as User });
    expect(result.current.verified).toBe(false);
    await act(async () => { await vi.advanceTimersByTimeAsync(0); });
    rerender({ user: null });
    expect(result.current.verified).toBe(false);
    expect(vi.getTimerCount()).toBe(0);
  });
});
