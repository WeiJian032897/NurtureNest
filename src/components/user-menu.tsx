"use client";

import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { fallbackName } from "@/lib/auth-service";
import { useAuth } from "./auth-provider";

export function UserMenu() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<{ uid: string; name: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!user?.emailVerified) return;
    let active = true;
    void getDoc(doc(db, "users", user.uid)).then((snapshot) => {
      const name: unknown = snapshot.data()?.name;
      if (active && typeof name === "string" && name.trim()) setProfile({ uid: user.uid, name });
    }).catch(() => { /* The Auth profile provides a safe fallback. */ });
    return () => { active = false; };
  }, [user]);
  if (!user?.emailVerified) return null;
  return <div className="order-2 flex max-w-full items-center justify-self-end gap-3 text-sm text-[#2f4431] md:order-none">
    <span className="max-w-32 truncate" title={profile?.uid === user.uid ? profile.name : fallbackName(user)}>{profile?.uid === user.uid ? profile.name : fallbackName(user)}</span>
    <button type="button" disabled={busy} className="rounded-full border border-[#c9d4c1] px-4 py-2 transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-50" onClick={async () => {
      setBusy(true); setFailed(false);
      try {
        await signOut(auth);
        // Discard the router's preserved login page and create a fresh form.
        // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Logout deliberately requires a fresh document, not client navigation.
        window.location.assign("/login");
      } catch { setFailed(true); } finally { setBusy(false); }
    }}>{busy ? "Signing out…" : "Logout"}</button>
    {failed && <span role="alert" className="text-xs">Unable to sign out. Please retry.</span>}
  </div>;
}
