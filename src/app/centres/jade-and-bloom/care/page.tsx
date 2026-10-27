import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/section";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";
import { careSections, type CareSectionContent } from "@/lib/care-data";

export const metadata: Metadata = {
  title: "Our Care | JADE & BLOOM",
  description: "Discover attentive maternal and newborn care, nourishing cuisine and personalised wellness at Jade & Bloom in Setapak, throughout your first 42 days.",
};
const imagePath = "/images/jb_room_pack_care/";

export default function CarePage() {
  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <main>
        <section aria-labelledby="care-heading" className="px-5 pt-56 pb-16 sm:px-8 md:pt-44 lg:px-10 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#60745c]">JADE & BLOOM · OUR CARE</p>
              <h1 id="care-heading" className="mt-6 font-serif text-[2.5rem] leading-[1.12] tracking-[-0.025em] text-[#2f4431] sm:text-5xl lg:text-[3.75rem]">
                Attentive care for mother and baby, through every day of the first 42 days.
              </h1>
              <p className="mt-7 text-xs leading-6 tracking-[0.1em] text-[#6e6658] sm:text-sm">Setapak · Since 1988 · 42-day programme</p>
            </div>
            <div className="relative mt-12 aspect-[3/2] overflow-hidden rounded-lg bg-[#e8ddca] sm:mt-14 lg:aspect-[2/1]">
              <Image src={`${imagePath}caregiver.jpg`} alt="A caregiver gently holding a newborn beside a resting mother" fill preload
                sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), (max-width: 1360px) calc(100vw - 80px), 1280px"
                className="object-cover object-[center_62%]" />
            </div>
          </div>
        </section>
        {careSections.map((section, index) => <CareSection key={section.id} content={section} reversed={index % 2 === 1} />)}
      </main>
      <SiteFooter />
    </div>
  );
}

function CareSection({ content, reversed }: { content: CareSectionContent; reversed: boolean }) {
  return (
    <Section id={content.id} tone={reversed ? "sage" : "cream"}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24">
        <div className={`relative aspect-[3/2] overflow-hidden rounded-lg bg-[#e2dfd3] ${reversed ? "lg:order-2" : ""}`}>
          <Image src={`${imagePath}${content.image}`} alt={content.alt} fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1360px) 44vw, 592px"
            className="object-cover" />
        </div>
        <div className={reversed ? "lg:order-1" : ""}>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#60745c]">{content.eyebrow}</p>
          <h2 className="font-serif text-[1.875rem] leading-[1.25] tracking-[-0.015em] text-[#2f4431] sm:text-4xl">{content.title}</h2>
          <ul className="mt-8 space-y-4 border-t border-[#c9cdbd] pt-7">
            {content.points.map((point) => (
              <li key={point.title} className="text-[15px] leading-7 text-[#6e6658]">
                <strong className="font-semibold text-[#394936]">{point.title}</strong>
                {point.title.endsWith("?") ? " " : ": "}{point.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
