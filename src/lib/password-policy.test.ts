import { describe, expect, it } from "vitest";
import { countCharacterTypes, getPasswordLength, getPasswordLevel, isPassphrase, passwordSchema, PASSWORD_MIN_ERROR, PASSWORD_MAX_ERROR } from "./password-policy";

describe("password policy", () => {
  it.each([
    [7, false, 1], [8, true, 1], [9, true, 1], [10, true, 2],
    [12, true, 3], [14, true, 4], [64, true, 4], [65, false, 1],
  ])("validates and scores length %i", (length, valid, level) => {
    const value = "mB7!nR9?".repeat(9).slice(0, length);
    expect(passwordSchema.safeParse(value).success).toBe(valid);
    expect(getPasswordLevel(value)).toBe(level);
  });
  it.each(["中", "🌿"])("counts 64 %s characters correctly", (character) => {
    expect(getPasswordLength(character.repeat(64))).toBe(64);
    expect(passwordSchema.safeParse(character.repeat(64)).success).toBe(true);
    expect(passwordSchema.safeParse(character.repeat(65)).success).toBe(false);
  });
  it.each(["12345678", "Summer12345", "aaaaaaaaaaaa"])("common override: %s", (value) => {
    expect(getPasswordLevel(value)).toBe(1);
    // Strength advice must not impose additional validation rules.
    expect(passwordSchema.safeParse(value).success).toBe(true);
  });
  it("falls through to Fair for 12 characters with two types", () => {
    expect(countCharacterTypes("mnpqrstuvx78")).toBe(2);
    expect(getPasswordLevel("mnpqrstuvx78")).toBe(2);
  });
  it("recognizes a strong passphrase", () => {
    expect(isPassphrase("correct horse battery staple")).toBe(true);
    expect(getPasswordLevel("correct horse battery staple")).toBe(4);
  });
  it("keeps empty at zero and returns the exact length errors", () => {
    expect(getPasswordLevel("")).toBe(0);
    for (const [value, message] of [["short", PASSWORD_MIN_ERROR], ["🌿".repeat(65), PASSWORD_MAX_ERROR]]) {
      const result = passwordSchema.safeParse(value);
      expect(result.success).toBe(false);
      if (!result.success) expect(result.error.issues[0].message).toBe(message);
    }
  });
  it("allows spaces and Unicode without normalization or trimming", () => {
    const value = "  éÉ中🌿  ";
    expect(passwordSchema.parse(value)).toBe(value);
    expect(countCharacterTypes("éÉ٢🌿")).toBe(4);
  });
});
