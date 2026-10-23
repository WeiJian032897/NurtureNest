"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { characterTypeTests, getPasswordLevel, isCommonPassword } from "@/lib/password-policy";

const CELL = { type: "spring", stiffness: 520, damping: 34, mass: 0.45 } as const;
const CROSSFADE = { type: "spring", stiffness: 260, damping: 34, mass: 0.8 } as const;
const INSTANT = { duration: 0 } as const;

export const passwordStrengthCopy = {
  en: {
    labels: ["Empty", "Weak", "Fair", "Good", "Strong"],
    title: "Password strength", common: "Commonly guessed", met: "met", unmet: "not met",
    guidance: "Optional recommendations", allMet: "All recommendations met.",
    remaining: "Suggestions", lowercase: "Lowercase letters", uppercase: "Uppercase letters", digit: "A number", symbol: "A symbol",
  },
  zh: {
    labels: ["未输入", "弱", "一般", "良好", "强"],
    title: "密码强度", common: "容易被猜到", met: "已满足", unmet: "未满足",
    guidance: "可选建议", allMet: "已满足所有建议。",
    remaining: "建议", lowercase: "小写字母", uppercase: "大写字母", digit: "数字", symbol: "特殊符号",
  },
};

export type PasswordRule = { id: string; label: string; test: (value: string) => boolean };
export type EvaluatedRule = PasswordRule & { met: boolean };
export const defaultPasswordRules: readonly PasswordRule[] = Object.entries(characterTypeTests).map(([id, test]) => ({
  id, test, label: passwordStrengthCopy.en[id as keyof typeof characterTypeTests],
}));
export type UsePasswordStrengthOptions = {
  rules?: readonly PasswordRule[];
  language?: keyof typeof passwordStrengthCopy;
  announceDelay?: number;
};
export type PasswordStrengthState = {
  score: number; max: number; label: string; rules: EvaluatedRule[]; guessable: boolean; announcement: string;
};

export function usePasswordStrength(value: string, { rules, language = "en", announceDelay = 700 }: UsePasswordStrengthOptions = {}): PasswordStrengthState {
  const state = useMemo(() => {
    const copy = passwordStrengthCopy[language];
    const checklist = rules ?? Object.entries(characterTypeTests).map(([id, test]) => ({ id, test, label: copy[id as keyof typeof characterTypeTests] }));
    const evaluated = checklist.map((rule) => ({ ...rule, met: rule.test(value) }));
    const score = getPasswordLevel(value);
    const label = copy.labels[score];
    const guessable = value.length > 0 && isCommonPassword(value);
    const unmet = evaluated.filter((rule) => !rule.met);
    const announcement = value.length === 0 ? "" : [
      `${copy.title}: ${label}.`, guessable ? `${copy.common}.` : "",
      unmet.length ? `${copy.remaining}: ${unmet.map((rule) => rule.label).join(", ")}.` : copy.allMet,
    ].filter(Boolean).join(" ");
    return { score, max: 4, label, rules: evaluated, guessable, announcement };
  }, [value, rules, language]);
  const [settled, setSettled] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setSettled(state.announcement), state.announcement ? announceDelay : 0);
    return () => clearTimeout(timer);
  }, [state.announcement, announceDelay]);
  return { ...state, announcement: value ? settled : "" };
}

export type PasswordStrengthProps = UsePasswordStrengthOptions & { value: string; showRules?: boolean; className?: string };

export function PasswordStrength({ value, rules, language = "en", announceDelay = 700, showRules = true, className = "" }: PasswordStrengthProps) {
  const { score, max, label, rules: evaluated, guessable, announcement } = usePasswordStrength(value, { rules, language, announceDelay });
  const reduced = useReducedMotion();
  const copy = passwordStrengthCopy[language];
  const tone = score === 0 ? "var(--auth-muted)" : score === 1 ? "var(--auth-error)" : score === 2 ? "var(--auth-strength-fair)" : "var(--auth-strength-good)";
  return <div className={`w-full ${className}`}>
    <div role="meter" aria-label={copy.title} aria-valuemin={0} aria-valuemax={max} aria-valuenow={score} aria-valuetext={label} className="grid grid-cols-4 gap-1.5">
      {Array.from({ length: max }, (_, i) => <div key={i} className="relative h-1.5 overflow-hidden rounded-[2px] bg-[var(--auth-border)]">
        <motion.span className="absolute inset-0 origin-left rounded-[2px] transition-colors duration-200" style={{ backgroundColor: tone }} initial={false} animate={{ scaleX: i < score ? 1 : 0 }} transition={reduced ? INSTANT : { ...CELL, delay: i < score ? i * 0.03 : 0 }} />
      </div>)}
    </div>
    <div className="mt-2 flex min-h-5 flex-wrap items-center justify-between gap-x-3 gap-y-1">
      <span className="inline-grid text-xs font-medium leading-5" style={{ color: tone }}>
        {copy.labels.map((text, i) => <motion.span key={text} aria-hidden className="col-start-1 row-start-1 whitespace-nowrap" initial={false} animate={{ opacity: i === score ? 1 : 0 }} transition={reduced ? INSTANT : CROSSFADE}>{text}</motion.span>)}
      </span>
      <motion.span aria-hidden className="text-xs leading-5 text-[var(--auth-strength-fair)]" initial={false} animate={{ opacity: guessable ? 1 : 0 }} transition={reduced ? INSTANT : CROSSFADE}>{copy.common}</motion.span>
    </div>
    {showRules && <div className="mt-3">
      <p className="auth-muted mb-2 text-xs">{copy.guidance}</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {evaluated.map((rule) => <li key={rule.id} className="flex items-center gap-2">
          <span className="relative grid size-3.5 shrink-0 place-items-center rounded border border-[var(--auth-border)] text-[var(--auth-bg)]">
            <motion.span className="absolute inset-0 rounded-[3px] bg-[var(--auth-strength-good)]" initial={false} animate={{ opacity: rule.met ? 1 : 0 }} transition={reduced ? INSTANT : CROSSFADE} />
            <motion.svg viewBox="0 0 12 12" fill="none" aria-hidden className="relative size-[9px]" initial={false} animate={{ opacity: rule.met ? 1 : 0, scale: rule.met ? 1 : 0.6 }} transition={reduced ? INSTANT : CELL}>
              <path d="M2 6.2 4.7 8.9 10 3.3" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </span>
          <span className={`text-xs leading-5 transition-colors ${rule.met ? "text-[var(--auth-text)]" : "auth-muted"}`}>{rule.label}</span>
          <span className="sr-only">{rule.met ? copy.met : copy.unmet}</span>
        </li>)}
      </ul>
    </div>}
    <p aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</p>
  </div>;
}

export default PasswordStrength;
