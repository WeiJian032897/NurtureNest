import { beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "firebase/auth";

const mocks = vi.hoisted(() => ({
  setPersistence: vi.fn(), inMemoryPersistence: "memory", browserLocalPersistence: "local",
  createUserWithEmailAndPassword: vi.fn(), updateProfile: vi.fn(), sendEmailVerification: vi.fn(),
  signInWithEmailAndPassword: vi.fn(), signOut: vi.fn(), getDoc: vi.fn(), setDoc: vi.fn(),
  doc: vi.fn((_db: unknown, collection: string, uid: string) => `${collection}/${uid}`),
  serverTimestamp: vi.fn(() => "server-time"),
}));
vi.mock("firebase/auth", () => mocks);
vi.mock("firebase/firestore", () => mocks);
vi.mock("./firebase", () => ({ auth: {}, db: {} }));

import { errorKey, loginAccount, registerAccount, resendVerification } from "./auth-service";

const user = { uid: "test-uid", email: "parent@example.com", displayName: "Parent", emailVerified: true };
beforeEach(() => {
  vi.clearAllMocks();
  mocks.setPersistence.mockResolvedValue(undefined);
  mocks.createUserWithEmailAndPassword.mockResolvedValue({ user });
  mocks.signInWithEmailAndPassword.mockResolvedValue({ user });
  mocks.updateProfile.mockResolvedValue(undefined);
  mocks.sendEmailVerification.mockResolvedValue(undefined);
  mocks.signOut.mockResolvedValue(undefined);
  mocks.setDoc.mockResolvedValue(undefined);
  mocks.getDoc.mockResolvedValue({ exists: () => false });
});

describe("account lifecycle", () => {
  it("registers with only permitted fields and retains an in-memory verification session", async () => {
    expect(await registerAccount("Parent", user.email, "password123")).toBe(user);
    expect(mocks.setPersistence).toHaveBeenCalledWith({}, "memory");
    expect(mocks.setDoc).toHaveBeenCalledWith("users/test-uid", { name: "Parent", email: user.email, createdAt: "server-time" });
    expect(mocks.updateProfile.mock.invocationCallOrder[0]).toBeLessThan(mocks.setDoc.mock.invocationCallOrder[0]);
    expect(mocks.setDoc.mock.invocationCallOrder[0]).toBeLessThan(mocks.sendEmailVerification.mock.invocationCallOrder[0]);
    expect(mocks.signOut).not.toHaveBeenCalled();
  });
  it("retains the verification session when Firestore fails", async () => {
    mocks.setDoc.mockRejectedValue(new Error("unavailable"));
    await expect(registerAccount("Parent", user.email, "password123")).resolves.toBe(user);
    expect(mocks.sendEmailVerification).toHaveBeenCalled();
    expect(mocks.signOut).not.toHaveBeenCalled();
  });
  it("allows the verification screen when email delivery fails", async () => {
    mocks.sendEmailVerification.mockRejectedValue({ code: "auth/too-many-requests" });
    await expect(registerAccount("Parent", user.email, "password123")).resolves.toBe(user);
    expect(mocks.signOut).not.toHaveBeenCalled();
  });
  it("signs out when account setup fails before the verification screen", async () => {
    mocks.updateProfile.mockRejectedValueOnce(new Error("unavailable"));
    await expect(registerAccount("Parent", user.email, "password123")).rejects.toThrow();
    expect(mocks.signOut).toHaveBeenCalled();
  });
  it("denies unverified login and signs out without touching Firestore", async () => {
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: { ...user, emailVerified: false } });
    expect((await loginAccount(user.email, "password123")).emailVerified).toBe(false);
    expect(mocks.getDoc).not.toHaveBeenCalled();
    expect(mocks.signOut).toHaveBeenCalled();
    expect(mocks.setPersistence).toHaveBeenCalledWith({}, "memory");
    expect(mocks.setPersistence).not.toHaveBeenCalledWith({}, "local");
  });
  it("repairs missing profiles with email prefix fallback before allowing login", async () => {
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: { ...user, displayName: null } });
    expect((await loginAccount(user.email, "password123")).emailVerified).toBe(true);
    expect(mocks.setDoc).toHaveBeenCalledWith("users/test-uid", { name: "parent", email: user.email, createdAt: "server-time" });
    expect(mocks.signOut).not.toHaveBeenCalled();
    expect(mocks.setPersistence).toHaveBeenCalledWith({}, "local");
  });
  it("preserves existing profiles", async () => {
    mocks.getDoc.mockResolvedValue({ exists: () => true });
    await loginAccount(user.email, "password123");
    expect(mocks.setDoc).not.toHaveBeenCalled();
  });
  it("signs out after profile repair failure", async () => {
    mocks.setDoc.mockRejectedValue(new Error("unavailable"));
    await expect(loginAccount(user.email, "password123")).rejects.toThrow();
    expect(mocks.signOut).toHaveBeenCalled();
  });
  it("signs out even when resend is rate limited", async () => {
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: { ...user, emailVerified: false } });
    mocks.sendEmailVerification.mockRejectedValue({ code: "auth/too-many-requests" });
    await expect(resendVerification({ ...user, emailVerified: false } as User)).rejects.toEqual({ code: "auth/too-many-requests" });
    expect(mocks.signInWithEmailAndPassword).not.toHaveBeenCalled();
    expect(mocks.signOut).toHaveBeenCalled();
  });
  it("does not retain a verified session from resend", async () => {
    expect(await resendVerification(user as User)).toBe(true);
    expect(mocks.sendEmailVerification).not.toHaveBeenCalled();
    expect(mocks.signOut).toHaveBeenCalled();
  });
  it("maps unknown errors to generic messages", () => {
    expect(errorKey(new Error("internal details"))).toBe("generic");
    expect(errorKey({ code: "auth/invalid-credential" })).toBe("invalidCredentials");
    expect(errorKey({ code: "auth/network-request-failed" })).toBe("network");
  });
  it("resends directly to the user returned by login after sign-out", async () => {
    const unverified = { ...user, emailVerified: false } as User;
    mocks.signInWithEmailAndPassword.mockResolvedValue({ user: unverified });
    const recipient = await loginAccount(user.email, "password123");
    expect(recipient).toBe(unverified);
    expect(mocks.signOut).toHaveBeenCalledTimes(1);
    await resendVerification(recipient);
    expect(mocks.sendEmailVerification).toHaveBeenCalledWith(unverified);
    expect(mocks.signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(mocks.signOut).toHaveBeenCalledTimes(2);
  });
});
