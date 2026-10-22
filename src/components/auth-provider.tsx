"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AuthContext = createContext<{
  user: User | null; loading: boolean; processing: boolean;
  setProcessing: (value: boolean) => void;
  pendingSignup: boolean; setPendingSignup: (value: boolean) => void;
}>({ user: null, loading: true, processing: false, setProcessing: () => {}, pendingSignup: false, setPendingSignup: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [pendingSignup, setPendingSignup] = useState(false);
  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setLoading(false);
  }, () => { setUser(null); setLoading(false); }), []);
  useEffect(() => {
    if (!loading && !processing && !pendingSignup && user && !user.emailVerified) {
      void signOut(auth).catch(() => { /* Guards still deny unverified users. */ });
    }
  }, [user, loading, processing, pendingSignup]);
  return <AuthContext.Provider value={{ user, loading, processing, setProcessing, pendingSignup, setPendingSignup }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
