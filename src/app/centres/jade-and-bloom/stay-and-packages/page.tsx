import type { Metadata } from "next";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";

export const metadata: Metadata = {
  title: "Stay & Packages | Jade & Bloom",
};

export default function StayAndPackagesPage() {
  return (
    <div className="bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <main className="min-h-screen" aria-label="Stay & Packages" />
      <SiteFooter />
    </div>
  );
}
