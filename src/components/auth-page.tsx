"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, EyeOff, ArrowRight, LoaderCircle, MailCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { authDictionary, type AuthLanguage, type AuthTextKey } from "@/lib/auth-dictionary";
import { errorKey, loginAccount, registerAccount, resendVerification } from "@/lib/auth-service";
import { useAuth } from "./auth-provider";
import { AuthLoading } from "./auth-guard";
import { SignupVerification } from "./signup-verification";
import { PasswordStrength } from "./ui/password-strength";
import { getPasswordLength, PASSWORD_MAX, PASSWORD_MIN_ERROR, PASSWORD_MAX_ERROR, passwordSchema } from "@/lib/password-policy";

type Values = { name: string; email: string; password: string; confirmPassword: string };
type Theme = "system" | "light" | "dark";

export function AuthPage({ mode }: { mode: "login" | "signup" }) {
  const signup = mode === "signup";
  const { user, loading, setProcessing, pendingSignup, setPendingSignup } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState<AuthLanguage>("en");
  const [theme, setTheme] = useState<Theme>("system");
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const lock = useRef(false);
  const active = useRef(false);
  const ownsSignupSession = useRef(false);
  const [signupUser, setSignupUser] = useState<User | null>(null);
  const cooldownUntil = useRef(0);
  const [verification, setVerification] = useState(false);
  const [notice, setNotice] = useState<AuthTextKey | null>(null);
  const [failure, setFailure] = useState<AuthTextKey | null>(null);
  const [remaining, setRemaining] = useState(0);
  const [visible, setVisible] = useState<Record<string, boolean>>({});
  const t = authDictionary[language];
  const schema = z.object({
    name: signup && !verification ? z.string().trim().min(1, "nameRequired") : z.string(),
    email: z.string().trim().email("invalidEmail"),
    password: signup && !verification ? passwordSchema : z.string().min(1, "passwordRequired"),
    confirmPassword: z.string(),
  }).refine((values) => !signup || verification || values.password === values.confirmPassword, { message: "mismatch", path: ["confirmPassword"] });
  const { register, handleSubmit, reset, control, trigger, setError, formState: { errors, touchedFields, isSubmitted } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  const passwordValue = useWatch({ control, name: "password" });

  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
      if (ownsSignupSession.current) {
        ownsSignupSession.current = false;
        void signOut(auth).then(() => setPendingSignup(false)).catch(() => { /* Guard remains closed if cleanup fails. */ });
      }
    };
  }, [setPendingSignup]);

  const leaveSignup = useCallback(async () => {
    await signOut(auth);
    ownsSignupSession.current = false;
    setSignupUser(null);
    setPendingSignup(false);
    router.replace("/login");
  }, [router, setPendingSignup]);

  useEffect(() => {
    // Also runs when Next.js reactivates a preserved page after navigation.
    reset();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) reset();
    });
    return () => {
      unsubscribe();
      // Do not leave credentials in an inactive, cached form.
      reset();
    };
  }, [reset]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
    try {
      const savedLanguage = localStorage.getItem("nn-language");
      const savedTheme = localStorage.getItem("nn-theme");
      if (savedLanguage === "zh") setLanguage("zh");
      if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
    } catch { /* Storage may be unavailable in private browsing. */ }
    setReady(true);
    });
    const tick = () => {
      try { cooldownUntil.current = Math.max(cooldownUntil.current, Number(localStorage.getItem("nn-resend-until")) || 0); } catch { /* In-memory countdown remains available. */ }
      setRemaining(Math.max(0, Math.ceil((cooldownUntil.current - Date.now()) / 1000)));
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => { window.cancelAnimationFrame(frame); window.clearInterval(interval); };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => { document.documentElement.dataset.authTheme = theme === "system" ? (media.matches ? "dark" : "light") : theme; };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, [theme, ready]);

  useEffect(() => {
    if (!loading && user?.emailVerified && !pendingSignup && !lock.current) router.replace("/");
  }, [loading, user, router, busy, pendingSignup]);

  function startCooldown() {
    cooldownUntil.current = Date.now() + 60_000;
    setRemaining(60);
    try { localStorage.setItem("nn-resend-until", String(cooldownUntil.current)); } catch { /* Use in-memory cooldown. */ }
  }

  async function submit(values: Values, resend = false) {
    if (lock.current || (resend && remaining > 0)) return;
    lock.current = true; setBusy(true); setProcessing(true); setFailure(null); setNotice(null);
    try {
      if (resend) {
        startCooldown();
        const verified = await resendVerification(values.email, values.password);
        setNotice(verified ? "verified" : "sent");
      } else if (signup) {
        ownsSignupSession.current = true;
        setPendingSignup(true);
        const createdUser = await registerAccount(values.name, values.email, values.password);
        if (!active.current) { await signOut(auth); setPendingSignup(false); return; }
        setSignupUser(createdUser);
        reset();
        startCooldown();
      } else {
        const verified = await loginAccount(values.email, values.password);
        if (verified) { reset(); router.replace("/"); }
        else { setVerification(true); setNotice("unverified"); }
      }
    } catch (error) {
      if (signup && !resend) { ownsSignupSession.current = false; setPendingSignup(false); }
      const key = errorKey(error);
      if (key === "weakPassword" && signup) setError("password", { type: "server", message: "passwordPolicyError" }, { shouldFocus: true });
      else setFailure(key);
      if (key === "tooMany") startCooldown();
    } finally {
      // Resend credentials must be cleared on both success and failure.
      if (resend) reset();
      lock.current = false; setBusy(false); setProcessing(false);
    }
  }

  if (!ready || loading || (user?.emailVerified && !busy && !pendingSignup)) return <AuthLoading />;

  const fields: (keyof Values)[] = signup && !verification ? ["name", "email", "password", "confirmPassword"] : ["email", "password"];
  return <main className="auth-shell min-h-dvh" lang={language === "zh" ? "zh-CN" : "en"}>
    <div className="mx-auto grid min-h-dvh max-w-[1600px] lg:grid-cols-[1.05fr_1fr]">
      <aside className={`auth-story relative m-4 flex flex-col ${signup ? "gap-8 px-7 pt-10 pb-7 sm:px-12 sm:pt-16 sm:pb-12" : "justify-between p-7 sm:p-12"} overflow-hidden rounded-[2rem] sm:m-6 lg:min-h-[calc(100dvh-3rem)]`}>
        <div className="relative z-10 flex items-center gap-3"><Image src="/images/logoNurtureNest_v2.jpg" alt="" width={40} height={40} className="size-10 shrink-0 rounded-full bg-[#fbf7ef] object-contain" /><span className="auth-serif text-xl tracking-[0.18em]">NURTURE NEST</span></div>
        <div className={`relative z-10 ${signup ? "@container flex w-full flex-1 flex-col justify-center gap-6 sm:gap-8" : "py-10 lg:py-16"}`}>
          <p className={`${signup ? "" : "mb-5"} text-xs font-medium uppercase tracking-[0.2em] opacity-80`}>{t.eyebrow}</p>
          <h1 className={`auth-serif leading-[1.13] ${signup ? "whitespace-nowrap text-[clamp(1rem,10cqw,3.75rem)]" : "whitespace-pre-line text-4xl sm:text-5xl xl:text-6xl"}`}>{t.brandTitle}</h1>
          <p className={`${signup ? "" : "mt-6"} max-w-sm text-sm leading-7 opacity-85`}>{t.brandBody}</p>
          <div className={`relative ${signup ? "aspect-[6/5] w-full max-w-sm shrink-0 lg:aspect-auto lg:h-64" : "mt-10 hidden h-64 max-w-sm lg:block"} overflow-hidden rounded-t-[10rem] rounded-b-2xl border border-white/25 xl:h-80`}>
            <Image src="/images/nurtureNestHome/happyMother.jpg" alt="" fill sizes="384px" className="object-cover" priority />
          </div>
        </div>
        <p className={`relative z-10 text-xs tracking-wide opacity-75 ${signup ? "shrink-0" : "hidden lg:block"}`}>{t.caption}</p>
        <div aria-hidden="true" className="pointer-events-none absolute -right-32 -bottom-40 size-[32rem] rounded-full border border-white/10" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 -bottom-24 size-[32rem] rounded-full border border-white/10" />
      </aside>
      <section className="flex flex-col px-6 pb-10 sm:px-12 lg:px-14 xl:px-20">
        <div className="flex flex-wrap items-center justify-end gap-3 py-6 text-xs">
          <div className="auth-toggle flex rounded-full border p-1" role="group" aria-label={t.language}>
            {(["en", "zh"] as const).map((value) => <button key={value} type="button" aria-pressed={language === value} className="rounded-full px-3 py-2" onClick={() => { setLanguage(value); try { localStorage.setItem("nn-language", value); } catch {} }}>{value === "en" ? "EN" : "中文"}</button>)}
          </div>
          <label className="sr-only" htmlFor="auth-theme">{t.theme}</label>
          <select id="auth-theme" className="auth-select rounded-full border px-3 py-2.5" value={theme} onChange={(event) => { const value = event.target.value as Theme; setTheme(value); try { localStorage.setItem("nn-theme", value); } catch {} }}>
            <option value="system">{t.system}</option><option value="light">{t.light}</option><option value="dark">{t.dark}</option>
          </select>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8 lg:py-12">
          {signupUser && signup && pendingSignup ? <SignupVerification user={signupUser} language={language} remaining={remaining} startCooldown={startCooldown} onLeave={leaveSignup} /> : (
          <div className="animate-rise">
            <span className="auth-emblem mb-6 inline-flex size-12 items-center justify-center rounded-full">{verification ? <MailCheck aria-hidden="true" /> : <Image src="/images/logoNurtureNest_v2.jpg" alt="Nurture Nest" width={48} height={48} className="size-12 rounded-full bg-[#fbf7ef] object-contain" />}</span>
            <h2 className="auth-serif text-4xl leading-tight sm:text-5xl">{verification && signup ? t.sentTitle : signup ? t.signupTitle : t.loginTitle}</h2>
            <p className="auth-muted mt-4 text-sm leading-7">{verification ? t.resendHint : signup ? t.signupBody : t.loginBody}</p>
            <div aria-live="polite" aria-atomic="true">{notice && <p className="auth-notice mt-5 rounded-xl border p-4 text-sm leading-6">{t[notice]}</p>}</div>
            {failure && <p role="alert" className="auth-error mt-5 text-sm">{t[failure]}</p>}
            <form className="mt-7 space-y-5" noValidate aria-busy={busy} onSubmit={(event) => { void handleSubmit((values) => submit(values, verification && signup))(event); }}>
              {fields.map((field) => {
                const password = field === "password" || field === "confirmPassword";
                const rawError = field === "password" && signup && getPasswordLength(passwordValue) > PASSWORD_MAX ? PASSWORD_MAX_ERROR : errors[field]?.message;
                const error = (rawError === PASSWORD_MIN_ERROR ? "passwordMin" : rawError === PASSWORD_MAX_ERROR ? "passwordMax" : rawError) as AuthTextKey | undefined;
                return <div key={field}>
                  <label htmlFor={field} className="mb-2 block text-sm font-medium">{t[field]}</label>
                  <div className="relative">
                    <input {...register(field, field === "password" && signup ? {
                      onBlur: () => { void trigger("password"); },
                      onChange: () => { if (touchedFields.password || isSubmitted || errors.password) void trigger("password"); },
                    } : {})} id={field} type={password ? visible[field] ? "text" : "password" : field === "email" ? "email" : "text"}
                      autoComplete={password ? signup ? "new-password" : "current-password" : field === "name" ? "name" : "email"}
                      autoCapitalize={field === "email" ? "none" : undefined} spellCheck={field === "email" || password ? false : undefined}
                      aria-invalid={Boolean(error)} aria-describedby={[error ? `${field}-error` : "", field === "password" && signup && !verification ? "password-hint" : ""].filter(Boolean).join(" ") || undefined}
                      disabled={busy} placeholder={field === "name" ? t.namePlaceholder : field === "email" ? t.emailPlaceholder : undefined}
                      className={`auth-input w-full rounded-xl border px-4 py-3.5 text-sm transition ${password ? "pr-14" : ""}`} />
                    {password && <button type="button" aria-label={visible[field] ? t.hide : t.show} aria-pressed={Boolean(visible[field])} aria-controls={field} className="absolute inset-y-0 right-1 flex w-12 items-center justify-center rounded-lg" onClick={() => setVisible((previous) => ({ ...previous, [field]: !previous[field] }))}>{visible[field] ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button>}
                  </div>
                  {error && <p id={`${field}-error`} role="alert" className="auth-error mt-2 text-xs">{t[error]}</p>}
                  {field === "password" && signup && !verification && <>
                    <p id="password-hint" className="auth-muted mt-2 text-xs leading-5">{t.passwordHelp}</p>
                    <PasswordStrength value={passwordValue} language={language} className="mt-3" />
                  </>}
                </div>;
              })}
              <button type="submit" disabled={busy || (verification && signup && remaining > 0)} className="auth-primary mt-2 flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-55">
                {busy ? <><LoaderCircle size={18} aria-hidden="true" className="animate-spin" />{t.working}</> : verification && signup ? remaining > 0 ? `${t.resendIn} ${remaining}${t.seconds}` : t.resend : <>{signup ? t.signup : t.login}<ArrowRight size={17} aria-hidden="true" /></>}
              </button>
              {verification && !signup && <button type="button" disabled={busy || remaining > 0} className="auth-secondary w-full rounded-full border px-5 py-3 text-sm disabled:opacity-50" onClick={() => { void handleSubmit((values) => submit(values, true))(); }}>{remaining > 0 ? `${t.resendIn} ${remaining}${t.seconds}` : t.resend}</button>}
            </form>
            <p className="auth-muted mt-7 text-center text-sm">{signup && verification ? "" : signup ? t.hasAccount : t.noAccount}{" "}<Link className="auth-link rounded underline underline-offset-4" href={signup ? "/login" : "/signup"} onClick={(event) => { if (busy) event.preventDefault(); }}>{signup ? verification ? t.back : t.login : t.signup}</Link></p>
          </div>
          )}
        </div>
        <p className="auth-muted text-center text-xs tracking-wide">{t.note}</p>
      </section>
    </div>
  </main>;
}
