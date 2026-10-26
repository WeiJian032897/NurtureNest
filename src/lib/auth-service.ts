import { browserLocalPersistence, inMemoryPersistence, setPersistence, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, updateProfile, type User } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const fallbackName = (user: User) => user.displayName?.trim() || user.email?.split("@")[0] || "Member";

export async function ensureUserDocument(user: User) {
  const reference = doc(db, "users", user.uid);
  const snapshot = await getDoc(reference);
  if (!snapshot.exists()) {
    await setDoc(reference, { name: fallbackName(user), email: user.email, createdAt: serverTimestamp() });
  }
}

export async function registerAccount(name: string, email: string, password: string) {
  try {
    // A signup verification session must disappear on refresh.
    await setPersistence(auth, inMemoryPersistence);
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName: name });
    // Profile storage may fail independently; verified login repairs missing documents.
    try { await setDoc(doc(db, "users", user.uid), { name, email: user.email, createdAt: serverTimestamp() }); } catch { /* Retry on login. */ }
    try { await sendEmailVerification(user); } catch { /* Keep the verification screen and resend available. */ }
    return user;
  } catch (error) {
    await signOut(auth);
    throw error;
  }
}

export async function loginAccount(email: string, password: string) {
  let complete = false;
  try {
    // Do not persist an unverified login, even while it is being checked.
    await setPersistence(auth, inMemoryPersistence);
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    if (!user.emailVerified) return user;
    await ensureUserDocument(user);
    await setPersistence(auth, browserLocalPersistence);
    complete = true;
    return user;
  } finally {
    if (!complete) await signOut(auth);
  }
}

export async function resendVerification(user: User) {
  try {
    // The User retains its token in memory after signOut; no password login is needed.
    if (!user.emailVerified) await sendEmailVerification(user);
    return user.emailVerified;
  } finally {
    await signOut(auth);
  }
}

export function errorKey(error: unknown) {
  const code = typeof error === "object" && error !== null && "code" in error ? error.code : "";
  switch (code) {
    case "auth/email-already-in-use": return "emailUsed";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found": return "invalidCredentials";
    case "auth/weak-password":
    case "auth/password-does-not-meet-requirements": return "weakPassword";
    case "auth/too-many-requests": return "tooMany";
    case "auth/network-request-failed": return "network";
    default: return "generic";
  }
}
