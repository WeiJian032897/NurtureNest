import {
  Baby,
  CalendarCheck,
  Flower2,
  HeartPulse,
  Hotel,
  Leaf,
  Moon,
  Utensils,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  careValues,
  packages,
  rooms,
  services,
  testimonials,
  valueDetails,
} from "@/lib/home-data";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";

const iconMap = {
  baby: Baby,
  heart: HeartPulse,
  leaf: Leaf,
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <HeroSection />
      <CareValuesSection />
      <HomeValuesSection />
      <RoomsSection />
      <PackagesSection />
      <ServicesSection />
      <TestimonialsSection />
      <SiteFooter />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative px-5 pt-36 sm:px-8 md:pt-28 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 py-12 lg:grid-cols-[1fr_0.95fr] lg:py-16">
        <div className="animate-rise max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
            Premium confinement centre concept
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] text-[#28251f] sm:text-6xl lg:text-7xl">
            Restful postpartum care with the grace of boutique hospitality.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6e6658]">
            Nurture Nest is a refined Phase 1 brand website for mothers and newborns,
            shaped around calm recovery, thoughtful care, and a warm sense of belonging.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20consultation"
              variant="primary"
            >
              Book a consultation
            </ButtonLink>
            <ButtonLink href="#packages" variant="secondary">
              View example packages
            </ButtonLink>
          </div>
        </div>

        <div className="animate-fade relative">
          <div className="absolute -left-8 top-16 hidden rounded-full bg-[#d8c5ad] px-5 py-3 text-sm font-medium text-[#3f3a30] shadow-xl shadow-[#b8a58d]/20 md:block">
            Private, calm, mother-led
          </div>
          <SurfaceImage
            label="Mother gently holding her newborn baby"
            image="https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=1400&q=85"
            className="h-[34rem] rounded-t-full rounded-b-[1.5rem]"
            frameClassName="rounded-t-full rounded-b-[2rem] p-3"
          />
        </div>
      </div>
    </section>
  );
}

function CareValuesSection() {
  return (
    <Section id="values" tone="white">
      <SectionIntro
        eyebrow="Care values"
        title="Three principles for a softer beginning."
        text="The concept avoids unsupported medical claims and focuses on environment, routines, and practical postpartum support."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {careValues.map((value) => {
          const Icon = iconMap[value.icon as keyof typeof iconMap];

          return (
            <article key={value.title} className="premium-card group p-7">
              <Icon className="mb-8 size-8 text-[#789074]" aria-hidden="true" />
              <h3 className="font-serif text-2xl text-[#2d2a22]">{value.title}</h3>
              <p className="mt-4 leading-7 text-[#6e6658]">{value.text}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function HomeValuesSection() {
  return (
    <Section id="home-values" tone="sage">
      <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="sticky top-28">
          <SectionIntro
            eyebrow="Home values"
            title="The emotional foundation of Nurture Nest."
            text="These values stay on the Home page as brand storytelling. Rooms, Packages, Care, and FAQ can expand into dedicated pages as the website grows."
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {valueDetails.map((value) => (
            <article key={value.label} className="rounded-lg border border-[#c9d4c1] bg-white/75 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-[#cbd6c3]/40">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f967a]">
                {value.label}
              </p>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-[#2d2a22]">
                {value.title}
              </h3>
              <p className="mt-4 leading-7 text-[#6e6658]">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RoomsSection() {
  return (
    <Section id="rooms">
      <SectionIntro
        eyebrow="Rooms and facilities"
        title="Editorial spaces designed for privacy, pause, and care."
        text="Use these as concept placeholders until licensed photography and confirmed facility details are available."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {rooms.map((room, index) => (
          <article
            key={room.name}
            className={`overflow-hidden rounded-lg bg-white shadow-xl shadow-[#d9ccb6]/25 transition duration-300 hover:-translate-y-1 ${index === 0 ? "lg:col-span-2" : ""}`}
          >
            <SurfaceImage
              label={`${room.name} concept photography`}
              image={room.image}
              className={index === 0 ? "h-96" : "h-80"}
              frameClassName="rounded-none border-0 p-0 shadow-none"
            />
            <div className="p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7f967a]">
                {room.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-3xl text-[#2d2a22]">{room.name}</h3>
              <p className="mt-3 leading-7 text-[#6e6658]">{room.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function PackagesSection() {
  return (
    <Section id="packages" tone="sage">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <SectionIntro
          eyebrow="Example packages"
          title="Illustrative stay options for early planning."
          text="Prices are demo examples for Phase 1 and must be reviewed before any real enquiry or sales use."
        />
        <p className="max-w-sm rounded-lg border border-[#c5d0bd] bg-white/70 p-4 text-sm leading-6 text-[#5f6757]">
          Example pricing only. Final inclusions, care scope, taxes, and availability are not configured.
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {packages.map((item) => (
          <article
            key={item.name}
            className={`rounded-lg border p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
              item.featured
                ? "border-[#2f4431] bg-[#2f4431] text-white shadow-[#8fa88b]/30"
                : "border-[#d8cbb8] bg-white/85 text-[#2d2a22] shadow-[#ded2c0]/25"
            }`}
          >
            <p
              className={`text-xs font-semibold uppercase tracking-[0.25em] ${
                item.featured ? "text-[#d8c5ad]" : "text-[#7f967a]"
              }`}
            >
              {item.duration}
            </p>
            <h3 className="mt-4 font-serif text-3xl">{item.name}</h3>
            <p className={`mt-3 text-2xl font-semibold ${item.featured ? "text-[#fbf7ef]" : "text-[#2f4431]"}`}>
              {item.price}
            </p>
            <p className={`mt-5 leading-7 ${item.featured ? "text-[#f3eadf]" : "text-[#6e6658]"}`}>
              {item.summary}
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {item.inclusions.map((inclusion) => (
                <li key={inclusion} className="flex gap-3">
                  <CalendarCheck className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  <span>{inclusion}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ServicesSection() {
  return (
    <Section id="care" tone="white">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionIntro
            eyebrow="Mother and newborn care"
            title="A service language built around reassurance, not pressure."
            text="Phase 1 presents care categories at a brand level only. Specific clinical protocols should be confirmed by qualified operators before publication."
          />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/faq" variant="secondary">
              Read FAQ
            </ButtonLink>
            <ButtonLink
              href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20care%20question"
              variant="primary"
            >
              Ask a question
            </ButtonLink>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const icons = [Moon, Utensils, Baby, HeartPulse, Hotel, Flower2];
            const Icon = icons[index % icons.length];

            return (
              <div key={service} className="flex items-center gap-4 rounded-lg bg-[#fbf7ef] p-5 shadow-sm">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#8fa88b] text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-medium text-[#3f3a30]">{service}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section id="testimonials">
      <SectionIntro
        eyebrow="Demo testimonials"
        title="A tone sample for future approved family stories."
        text="These quotes are fictional demo content only and are intentionally labelled that way."
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <figure key={item.name} className="premium-card p-7">
            <blockquote className="font-serif text-2xl leading-9 text-[#2d2a22]">
              <q>{item.quote}</q>
            </blockquote>
            <figcaption className="mt-8 border-t border-[#e8ddca] pt-5">
              <p className="font-semibold text-[#40563f]">{item.name}</p>
              <p className="mt-1 text-sm text-[#7a7265]">{item.note}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

function Section({
  id,
  tone = "cream",
  children,
}: {
  id: string;
  tone?: "cream" | "white" | "sage";
  children: ReactNode;
}) {
  const toneClass = {
    cream: "bg-[#fbf7ef]",
    white: "bg-white",
    sage: "bg-[#eef2e8]",
  }[tone];

  return (
    <section id={id} className={`${toneClass} px-5 py-24 sm:px-8 lg:px-10`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#7f967a]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-[#6e6658]">{text}</p>
    </div>
  );
}

function ButtonLink({
  href,
  variant,
  children,
}: {
  href: string;
  variant: "primary" | "secondary";
  children: ReactNode;
}) {
  const className =
    variant === "primary"
      ? "bg-[#2f4431] text-white shadow-lg shadow-[#6d7f68]/20 hover:bg-[#253827]"
      : "border border-[#c8b99f] text-[#3f3a30] hover:border-[#8fa88b] hover:bg-white/60";

  return (
    <a
      href={href}
      className={`inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold transition hover:-translate-y-0.5 ${className} ${focusRing}`}
    >
      {children}
    </a>
  );
}

function SurfaceImage({
  label,
  image,
  className,
  frameClassName = "",
}: {
  label: string;
  image: string;
  className: string;
  frameClassName?: string;
}) {
  return (
    <div
      className={`overflow-hidden border border-white/70 bg-white shadow-2xl shadow-[#b9aa8f]/25 ${frameClassName}`}
    >
      <div
        role="img"
        aria-label={label}
        className={`w-full bg-cover bg-center ${className}`}
        style={{ backgroundImage: `url('${image}')` }}
      />
    </div>
  );
}
