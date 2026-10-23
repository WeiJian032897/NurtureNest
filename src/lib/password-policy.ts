import { z } from "zod";

export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 64;
export const PASSWORD_MIN_ERROR = "Password must be at least 8 characters.";
export const PASSWORD_MAX_ERROR = "Password must be at most 64 characters.";
const COMMON = /^(?:password|passw0rd|qwerty|letmein|welcome|admin|iloveyou|monkey|dragon|abc123|111111|123123|123456)/i;
const RUN = /(.)\1{3,}/u;
const RUN_UP = /(?:0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|defg|qwer|wert|erty|asdf)/i;
const BLOCKLIST = new Set(["12345678", "123456789", "password", "qwertyui", "iloveyou"]);

export const getPasswordLength = (value: string) => Array.from(value).length;
export const characterTypeTests = {
  lowercase: (value: string) => /\p{Ll}/u.test(value),
  uppercase: (value: string) => /\p{Lu}/u.test(value),
  digit: (value: string) => /\p{Nd}/u.test(value),
  symbol: (value: string) => /[\p{P}\p{S}]/u.test(value),
};
export const countCharacterTypes = (value: string) => Object.values(characterTypeTests).filter((test) => test(value)).length;
export const isCommonPassword = (value: string) => BLOCKLIST.has(value.toLowerCase()) || COMMON.test(value) || RUN.test(value) || RUN_UP.test(value);
export const isPassphrase = (value: string) => getPasswordLength(value) >= 20 && value.trim().split(/\s+/u).length >= 4;

export function getPasswordLevel(value: string): 0 | 1 | 2 | 3 | 4 {
  const length = getPasswordLength(value);
  if (!length) return 0;
  if (length < PASSWORD_MIN || length > PASSWORD_MAX || isCommonPassword(value)) return 1;
  if (length >= 14 || isPassphrase(value)) return 4;
  const types = countCharacterTypes(value);
  if (length >= 12 && types >= 3) return 3;
  if (length >= 10 && types >= 2) return 2;
  return 1;
}

export const passwordSchema = z.string().superRefine((value, context) => {
  const length = getPasswordLength(value);
  if (length < PASSWORD_MIN) context.addIssue({ code: "custom", message: PASSWORD_MIN_ERROR });
  if (length > PASSWORD_MAX) context.addIssue({ code: "custom", message: PASSWORD_MAX_ERROR });
});
