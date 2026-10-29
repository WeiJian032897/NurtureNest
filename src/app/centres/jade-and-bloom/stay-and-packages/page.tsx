import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StayPackagesPage } from "@/components/stay-packages-page";
import { getStayPageData } from "@/lib/stay-data";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";

export const metadata: Metadata = {
  title: "Stay & Packages | Jade & Bloom",
};

export default function StayAndPackagesPage() {
  const data = getStayPageData("jade-and-bloom");
  if (!data) notFound();
  return (
    <div className="bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <StayPackagesPage {...data} />
      <SiteFooter />
    </div>
  );
}
