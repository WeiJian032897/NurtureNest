import type { Metadata } from "next";
import { AuthPage } from "@/components/auth-page";

export const metadata: Metadata = { title: "Log in | Nurture Nest" };
export default function LoginPage() { return <AuthPage mode="login" />; }
