import { PlatformPage } from "@/components/platform-page";
import { AuthGuard } from "@/components/auth-guard";

export default function Page() {
  return <AuthGuard><PlatformPage /></AuthGuard>;
}
