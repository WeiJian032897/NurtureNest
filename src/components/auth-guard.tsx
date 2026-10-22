"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth-provider";

export function AuthLoading() {
  return <div className="auth-shell grid min-h-dvh place-items-center" role="status" aria-label="Loading"><span className="animate-pulse font-serif text-2xl tracking-widest">NURTURE NEST<span aria-hidden="true"> ···</span></span></div>;
}

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, processing, pendingSignup } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !processing && (pendingSignup || !user?.emailVerified)) router.replace("/login");
  }, [user, loading, processing, pendingSignup, router]);
  if (loading || processing || pendingSignup || !user?.emailVerified) return <AuthLoading />;
  return children;
}
