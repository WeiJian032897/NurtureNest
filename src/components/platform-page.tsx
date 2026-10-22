import Image from "next/image";
import {
  BadgeCheck,
  CalendarCheck,
  HeartHandshake,
  MessageCircleMore,
  Search,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";
import PolaroidLineCarousel, { type Slide } from "@/components/ui/polaroid-line-carousel";
import { TiltedGridHero, type TiltedGridImage } from "@/components/ui/tilted-grid-hero";

const heroImages: TiltedGridImage[] = [
  { src: "/images/curvedImageCarouselHero/cich1.webp", alt: "A mother and newborn sharing a quiet moment" },
  { src: "/images/curvedImageCarouselHero/cich2.webp", alt: "A peaceful space for new parents" },
  { src: "/images/curvedImageCarouselHero/cich3.webp", alt: "Newborn care and family support" },
  { src: "/images/curvedImageCarouselHero/cich4.webp", alt: "A welcoming confinement care centre" },
  { src: "/images/curvedImageCarouselHero/cich5.webp", alt: "A family beginning life with their baby" },
  { src: "/images/curvedImageCarouselHero/cich6.webp", alt: "Comfort and care during postnatal recovery" },
  { src: "/images/curvedImageCarouselHero/cich7.webp", alt: "A warm, restful room for mother and baby" },
  { src: "/images/curvedImageCarouselHero/cich8.webp", alt: "Thoughtful support for a growing family" },
  { src: "/images/curvedImageCarouselHero/cich9.webp", alt: "A calm setting for the first weeks together" },
  { src: "/images/curvedImageCarouselHero/cich10.webp", alt: "Postnatal care for mothers and newborns" },
];

const reasons = [
  {
    title: "Verified centres",
    text: "Every centre is checked for its details, licence and facilities before it is listed.",
    image: "upThumb.jpg",
    alt: "Verified centre information",
    icon: BadgeCheck,
  },
  {
    title: "Transparent comparison",
    text: "See prices, packages and services side by side, with nothing hidden.",
    image: "priceComparison.jpg",
    alt: "Comparing confinement packages and prices",
    icon: Scale,
  },
  {
    title: "Real mother reviews",
    text: "Only mothers who have stayed at a centre can leave a review.",
    image: "realMother.jpg",
    alt: "A mother sharing her experience",
    icon: HeartHandshake,
  },
  {
    title: "Confident booking",
    text: "Search online, arrange a visit and book with a secured deposit.",
    image: "confidentBooking.png",
    alt: "Planning a confinement centre booking",
    icon: ShieldCheck,
  },
  {
    title: "Care for every family",
    text: "Choose from Chinese, Malay and Indian confinement styles, with vegetarian and halal options.",
    image: "careEvery.png",
    alt: "Care options for different families",
    icon: HeartHandshake,
  },
];

const steps = [
  {
    number: "01",
    title: "Search and compare",
    text: "Browse confinement centres and compare their packages and rooms in one place.",
    icon: Search,
  },
  {
    number: "02",
    title: "Visit or enquire",
    text: "Book a visit or send an enquiry directly to the centres you like.",
    icon: MessageCircleMore,
  },
  {
    number: "03",
    title: "Confirm your booking",
    text: "Reserve your stay with confidence once you have found the right fit.",
    icon: CalendarCheck,
  },
];

const packageInclusions = [
  {
    title: "Confinement meals",
    text: "Nourishing, freshly prepared meals and soups designed to help your body recover.",
    image: "confinementMeal.jpg",
    alt: "Freshly prepared confinement meals",
  },
  {
    title: "Professional nursing care",
    text: "Professionally trained caregivers provide care for half a day or nearly around the clock, allowing you to rest with peace of mind.",
    image: "nursingCare.jpg",
    alt: "Professional caregiver providing postnatal support",
  },
  {
    title: "Newborn care",
    text: "Gentle daily care for your baby, including bathing, feeding support and sleep routines.",
    image: "newBornCare.jpg",
    alt: "Gentle newborn care",
  },
  {
    title: "Postnatal massage",
    text: "Traditional massage and body care to ease aches and support your recovery.",
    image: "postnatalMassage.jpg",
    alt: "Postnatal massage and body care",
  },
  {
    title: "Breastfeeding support",
    text: "Practical guidance and encouragement to help you feed your baby with confidence.",
    image: "breastfeedingSupport.png",
    alt: "Breastfeeding support for a new mother",
  },
  {
    title: "Comfortable room and facilities",
    text: "A clean, quiet room with the essentials you and your baby need during your stay.",
    image: "comfortRoom.jpg",
    alt: "A comfortable room for mother and baby",
  },
];

const partnerCentres: Slide[] = [
  {
    image: "/images/centresLogo(Full)/fullJadeBloom.png",
    title: "Jade & Bloom",
    caption: "Trusted postnatal care in Setapak, Malaysia, nurturing mothers and newborns since 1988.",
    alt: "Jade & Bloom confinement centre logo",
  },
  {
    image: "/images/centresLogo(Full)/fullAmaraHaven.jpg",
    title: "Amara Haven",
    caption: "Thailand’s gentle confinement sanctuary, blending traditional herbal care with modern comfort since 1975.",
    alt: "Amara Haven confinement centre logo",
  },
  {
    image: "/images/centresLogo(Full)/fullAuspiciousMoonPalace.png",
    title: "瑞月宫 · Auspicious Moon Palace",
    caption: "Malaysia’s premier Chinese confinement retreat, cherished by families for 78 years.",
    alt: "Auspicious Moon Palace confinement centre logo",
  },
  {
    image: "/images/centresLogo(Full)/fullMaisonLumière.jpg",
    title: "Maison Lumière",
    caption: "A French-inspired postnatal haven offering refined, restorative care for new mothers since 1967.",
    alt: "Maison Lumière confinement centre logo",
  },
  {
    image: "/images/centresLogo(Full)/fullChineseImperial.jpg",
    title: "御福轩 · Imperial Blessings Confinement Retreat",
    caption: "One of China’s most celebrated confinement centers, honoring 80 years of imperial-style postpartum care.",
    alt: "Imperial Blessings Confinement Retreat logo",
  },
  {
    image: "/images/centresLogo(Full)/fullMatrutvaIndian.png",
    title: "Matrutva Postnatal Indian Sanctuary",
    caption: "Malaysia’s beloved Indian postnatal sanctuary, nurturing mothers with Ayurvedic tradition for 40 years.",
    alt: "Matrutva Postnatal Indian Sanctuary logo",
  },
];

export function PlatformPage({ directory = false }: { directory?: boolean }) {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <section className="px-5 pb-24 pt-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <TiltedGridHero
            images={heroImages}
            speed={7}
            tileHeight={39}
            axis={68}
            curve={50}
            fade={8}
            className="-mx-5 h-[620px] w-[calc(100%+2.5rem)] bg-[#f7f2e8] sm:-mx-8 sm:h-[680px] sm:w-[calc(100%+4rem)] lg:-mx-10 lg:h-[720px] lg:w-[calc(100%+5rem)]"
          >
            <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center px-5 pt-8 text-center sm:px-8 sm:pt-12">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#6e8668] sm:text-sm">
                Nurture Nest · Confinement Care Finder
              </p>
              <h1 className="max-w-4xl font-serif text-4xl leading-[1.04] text-[#28251f] sm:text-6xl lg:text-7xl">
                {directory ? "Find a centre for your family’s next chapter." : "Find the right care for your family’s next chapter."}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#5e594e] sm:mt-6 sm:text-lg sm:leading-8">
                Discover trusted confinement centres across Malaysia, and compare the care, comfort and support that matter to your family.
              </p>
              <span className="absolute bottom-7 hidden text-xs font-medium uppercase tracking-[0.24em] text-[#6e6658]/75 sm:block">
                A more supported start begins here
              </span>
            </div>
          </TiltedGridHero>
          {!directory && <HomeInformationSections />}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}

function HomeInformationSections() {
  return (
    <>
      <section className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          eyebrow="A more considered way to choose"
          title="Why choose Nurture Nest"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                className="group overflow-hidden rounded-2xl border border-[#e8ddca] bg-white shadow-sm shadow-[#b9aa8f]/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b9aa8f]/20"
              >
                <div className="relative h-48 overflow-hidden bg-[#eef2e8] sm:h-44 xl:h-40">
                  <Image
                    src={`/images/nurtureNestHome/${reason.image}`}
                    alt={reason.alt}
                    fill
                    sizes="(min-width: 1280px) 230px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-full border border-white/70 bg-[#fbf7ef]/95 text-[#526c4e] shadow-sm backdrop-blur">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="absolute bottom-3 right-4 font-serif text-4xl leading-none text-white/90 drop-shadow-md" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-[21px] leading-tight text-[#2f4431]">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#6e6658]">{reason.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="-mx-5 bg-[#eef2e8] px-5 py-20 sm:-mx-8 sm:px-8 sm:py-24 lg:-mx-10 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Your next steps"
            title="What can you do on our website?"
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-7">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-[#dce4d5] bg-white/85 p-7 shadow-sm sm:p-9"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-4xl leading-none text-[#b09a6a]">{step.number}</span>
                    <span className="grid size-14 place-items-center rounded-full bg-[#f3f1e8] text-[#526c4e]">
                      <Icon className="size-6" strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 font-serif text-2xl text-[#2f4431]">{step.title}</h3>
                  <p className="mt-3 leading-7 text-[#6e6658]">{step.text}</p>
                  <span className="mt-7 block h-px w-12 bg-[#c5aa70]" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <SectionHeading
          eyebrow="Thoughtful care, day by day"
          title="What’s included in a typical confinement package in our verified centres?"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {packageInclusions.map((item, index) => (
            <article
              key={item.title}
              className="group flex overflow-hidden rounded-2xl border border-[#e8ddca] bg-white shadow-sm shadow-[#b9aa8f]/10 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#b9aa8f]/20 sm:flex-col"
            >
              <div className="relative min-h-36 w-2/5 shrink-0 overflow-hidden bg-[#eef2e8] sm:h-56 sm:w-full">
                <Image
                  src={`/images/nurtureNestHome/${item.image}`}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-[#fbf7ef]/95 px-3 py-1 font-serif text-sm text-[#526c4e] shadow-sm backdrop-blur sm:left-4 sm:top-4 sm:px-3.5 sm:py-1.5 sm:text-base">
                  0{index + 1}
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center p-4 sm:p-6">
                <h3 className="font-serif text-xl leading-tight text-[#2f4431] sm:text-2xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6e6658] sm:mt-3 sm:text-[15px]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-xl border border-[#e8ddca] bg-white/60 px-5 py-4 text-sm leading-6 text-[#716959] sm:text-center">
          Inclusions vary by centre. Please check each package for full details.
        </p>
      </section>

      <section className="-mx-5 bg-[#f3efe5] px-5 py-20 sm:-mx-8 sm:px-8 sm:py-24 lg:-mx-10 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our trusted network"
            title="Our partner confinement centres"
          />
          <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-[#6e6658] sm:text-lg">
            Meet the centres we&apos;ve verified and trust.
          </p>
          <div className="mt-9 overflow-hidden rounded-[1.75rem] border border-[#e4dac8] bg-white shadow-[0_24px_70px_rgba(81,66,43,0.09)] sm:mt-12">
            <PolaroidLineCarousel
              slides={partnerCentres}
              height="600px"
              cardWidth={280}
              sag={42}
              swing={0.55}
              autoplay={7500}
              string="#a68e66"
              background="#ffffff"
              ink="#2f4431"
              ariaLabel="Verified partner confinement centres"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#7f967a] sm:text-sm">
        {eyebrow}
      </p>
      <h2 className="font-serif text-3xl leading-[1.12] text-[#28251f] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      <span className="mx-auto mt-6 block h-px w-14 bg-[#c5aa70]" aria-hidden="true" />
    </div>
  );
}
