"use client";

import { useRef, useState } from "react";
import { sendEmailVerification, type User } from "firebase/auth";
import { Check, LoaderCircle, MailCheck } from "lucide-react";
import { useEmailVerificationWatcher } from "@/hooks/use-email-verification-watcher";
import { auth } from "@/lib/firebase";
import { errorKey } from "@/lib/auth-service";
import { authDictionary, formatVerificationSent, type AuthLanguage, type AuthTextKey } from "@/lib/auth-dictionary";

export function SignupVerification({ user, language, remaining, startCooldown, onLeave }: {
  user: User; language: AuthLanguage; remaining: number;
  startCooldown: () => void; onLeave: () => Promise<void>;
}) {
  const t = authDictionary[language];
  const { verified, error: verificationError } = useEmailVerificationWatcher(user);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState<AuthTextKey | null>(null);
  const lock = useRef(false);

  const displayedFailure = failure ?? (!verified && verificationError ? errorKey(verificationError) : null);

  async function leave() {
    if (lock.current) return;
    lock.current = true; setBusy(true); setFailure(null);
    try { await onLeave(); } catch (error) { setFailure(errorKey(error)); }
    finally { lock.current = false; setBusy(false); }
  }

  async function resend() {
    if (lock.current || remaining > 0) return;
    lock.current = true; setBusy(true); setFailure(null);
    startCooldown();
    try {
      if (auth.currentUser?.uid !== user.uid) { await onLeave(); return; }
      await sendEmailVerification(user);
    } catch (error) { setFailure(errorKey(error)); }
    finally { lock.current = false; setBusy(false); }
  }

  return <div className="animate-rise" aria-busy={busy}>
    <span className="auth-emblem mb-6 inline-flex size-12 items-center justify-center rounded-full">{verified ? <Check aria-hidden="true" /> : <MailCheck aria-hidden="true" />}</span>
    <div aria-live="polite" aria-atomic="true">
      <h2 className="auth-serif text-4xl leading-tight sm:text-5xl">{verified ? t.congratulations : t.sentTitle}</h2>
      <p className="auth-muted mt-4 break-words text-sm leading-7">{verified ? t.verifiedWelcome : formatVerificationSent(language, user.email)}</p>
    </div>
    {displayedFailure && <p role="alert" className="auth-error mt-5 text-sm">{t[displayedFailure]}</p>}
    <button type="button" disabled={busy || (!verified && remaining > 0)} onClick={() => { void (verified ? leave() : resend()); }} className="auth-primary mt-8 flex w-full items-center justify-center gap-3 rounded-full px-5 py-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-55">
      {busy ? <><LoaderCircle size={18} aria-hidden="true" className="animate-spin" />{t.working}</> : verified ? t.goToLogin : remaining > 0 ? `${t.resendIn} ${remaining}${t.seconds}` : t.resend}
    </button>
    {!verified && <p className="mt-7 text-center text-sm"><a href="/login" aria-disabled={busy} className="auth-link rounded underline underline-offset-4" onClick={(event) => { event.preventDefault(); void leave(); }}>{t.back}</a></p>}
  </div>;
}
