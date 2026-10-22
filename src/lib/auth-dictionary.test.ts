import { describe, expect, it } from "vitest";
import { authDictionary, formatVerificationSent } from "./auth-dictionary";

describe("verification email message", () => {
  it.each(["en", "zh"] as const)("renders the %s translation with the email", (language) => {
    expect(formatVerificationSent(language, "parent@example.com")).toBe(
      authDictionary[language].sentTo.replace("{email}", "parent@example.com"),
    );
  });

  it.each(["en", "zh"] as const)("survives a missing %s translation at runtime", (language) => {
    const original = authDictionary[language].sentTo;
    try {
      Reflect.deleteProperty(authDictionary[language], "sentTo");
      expect(formatVerificationSent(language, "parent@example.com")).toBe(
        original.replace("{email}", "parent@example.com"),
      );
    } finally { authDictionary[language].sentTo = original; }
  });

  it("handles a missing email without throwing", () => {
    expect(formatVerificationSent("en", null)).not.toContain("{email}");
  });

  it("inserts email addresses literally instead of interpreting replacement tokens", () => {
    expect(formatVerificationSent("en", "$&@example.com")).toContain("$&@example.com");
  });
});
