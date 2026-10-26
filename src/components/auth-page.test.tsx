// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import type { User } from "firebase/auth";
import { authDictionary } from "@/lib/auth-dictionary";

const mocks = vi.hoisted(() => ({
  login: vi.fn(), resend: vi.fn(), signOut: vi.fn(), replace: vi.fn(), setProcessing: vi.fn(),
  setPendingSignup: vi.fn(),
}));
vi.mock("next/navigation", () => ({ useRouter: () => ({ replace: mocks.replace }) }));
vi.mock("next/image", () => ({ default: ({ alt, src }: { alt: string; src: string }) => createElement("img", { alt, src }) }));
vi.mock("next/link", () => ({ default: "a" }));
vi.mock("firebase/auth", () => ({ signOut: mocks.signOut }));
vi.mock("@/lib/firebase", () => ({ auth: {} }));
vi.mock("./auth-provider", () => ({ useAuth: () => ({ user: null, loading: false, pendingSignup: false, setProcessing: mocks.setProcessing, setPendingSignup: mocks.setPendingSignup }) }));
vi.mock("@/lib/auth-service", () => ({
  loginAccount: mocks.login, resendVerification: mocks.resend, registerAccount: vi.fn(),
  errorKey: () => "tooMany",
}));
import { AuthPage } from "./auth-page";
import { SignupVerification } from "./signup-verification";

const recipient = { uid: "parent", email: "parent@example.com", emailVerified: false, reload: vi.fn().mockResolvedValue(undefined) } as unknown as User;
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
  Object.assign(recipient, { emailVerified: false });
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  mocks.login.mockResolvedValue(recipient);
  mocks.resend.mockResolvedValue(false);
  mocks.signOut.mockResolvedValue(undefined);
  vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

async function attemptLogin() {
  const email = await screen.findByLabelText("Email") as HTMLInputElement;
  const password = screen.getByLabelText("Password") as HTMLInputElement;
  fireEvent.change(email, { target: { value: recipient.email } });
  fireEvent.change(password, { target: { value: "example-password" } });
  fireEvent.click(screen.getByRole("button", { name: "Log in" }));
  await screen.findByText(authDictionary.en.unverified);
  return { email, password };
}

describe("unverified login", () => {
  it("shows verification success without auto-login and preserves credentials until Log in is clicked", async () => {
    render(createElement(AuthPage, { mode: "login" }));
    const { email, password } = await attemptLogin();
    Object.assign(recipient, { emailVerified: true });
    fireEvent(document, new Event("visibilitychange"));
    await screen.findByText(authDictionary.en.loginVerified);
    expect(screen.queryByRole("button", { name: "Resend email" })).toBeNull();
    expect(email.value).toBe(recipient.email);
    expect(password.value).toBe("example-password");
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(mocks.login).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    expect(screen.getByText(authDictionary.zh.loginVerified)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "登入" }));
    await waitFor(() => expect(mocks.replace).toHaveBeenCalledWith("/"));
    expect(mocks.login).toHaveBeenCalledTimes(2);
  });
  it("switches the signup panel to congratulations without navigating automatically", async () => {
    const onLeave = vi.fn().mockResolvedValue(undefined);
    render(createElement(SignupVerification, { user: recipient, language: "en", remaining: 0, startCooldown: vi.fn(), onLeave }));
    await waitFor(() => expect(recipient.reload).toHaveBeenCalled());
    Object.assign(recipient, { emailVerified: true });
    fireEvent(document, new Event("visibilitychange"));
    await screen.findByRole("heading", { name: "Congratulations!" });
    expect(screen.getByText(authDictionary.en.verifiedWelcome)).toBeTruthy();
    expect(onLeave).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "Go to Log in" }));
    await waitFor(() => expect(onLeave).toHaveBeenCalledTimes(1));
  });
  it("keeps the login identity and inputs, resends directly, and signs out on leave", async () => {
    const { unmount } = render(createElement(AuthPage, { mode: "login" }));
    const { email, password } = await attemptLogin();
    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeTruthy();
    expect(screen.getByAltText("Nurture Nest")).toBeTruthy();
    expect(screen.queryByText(/To resend, enter/)).toBeNull();
    expect(email.value).toBe(recipient.email);
    expect(password.value).toBe("example-password");
    fireEvent.click(screen.getByRole("button", { name: "Resend email" }));
    await waitFor(() => expect(mocks.resend).toHaveBeenCalledWith(recipient));
    await screen.findByText(authDictionary.en.sent);
    expect(mocks.login).toHaveBeenCalledTimes(1);
    expect(email.value).toBe(recipient.email);
    expect(password.value).toBe("example-password");
    expect((screen.getByRole("button", { name: /Resend in/ }) as HTMLButtonElement).disabled).toBe(true);
    expect(mocks.replace).not.toHaveBeenCalled();
    expect(Object.values(localStorage).join(" ")).not.toContain("example-password");
    unmount();
    expect(mocks.signOut).toHaveBeenCalled();
  });
  it("preserves fields and the cooldown after rate limiting and translates the notice", async () => {
    mocks.resend.mockRejectedValue({ code: "auth/too-many-requests" });
    render(createElement(AuthPage, { mode: "login" }));
    const { email, password } = await attemptLogin();
    fireEvent.click(screen.getByRole("button", { name: "Resend email" }));
    await screen.findByText(authDictionary.en.tooMany);
    expect(email.value).toBe(recipient.email);
    expect(password.value).toBe("example-password");
    fireEvent.click(screen.getByRole("button", { name: "中文" }));
    expect(screen.getByText(authDictionary.zh.unverified)).toBeTruthy();
    expect(screen.getByRole("heading", { name: "欢迎回来" })).toBeTruthy();
    expect(mocks.replace).not.toHaveBeenCalled();
  });
});
