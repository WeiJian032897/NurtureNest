"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

/** Watches a page-local User, including a user retained after Firebase signOut. */
export function useEmailVerificationWatcher(user: User | null) {
  const [result, setResult] = useState<{ user: User; verified: boolean; error: unknown } | null>(null);
  useEffect(() => {
    if (!user) return;
    let active = true;
    let checking = false;
    let complete = false;
    async function check() {
      if (!active || complete || checking || document.hidden || !user) return;
      checking = true;
      try {
        await user.reload();
        if (!active) return;
        complete = user.emailVerified;
        setResult({ user, verified: complete, error: null });
        if (complete) stop();
      } catch (error) {
        if (active) setResult({ user, verified: false, error });
      } finally { checking = false; }
    }
    function onVisibilityChange() {
      if (!document.hidden) void check();
    }
    const interval = window.setInterval(() => { void check(); }, 4000);
    function stop() {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);
    void check();
    return () => { active = false; stop(); };
  }, [user]);
  return {
    verified: Boolean(user && result?.user === user && result.verified),
    error: user && result?.user === user ? result.error : null,
  };
}
