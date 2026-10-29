import {
  Baby,
  Check,
  HeartPulse,
  Moon,
} from "lucide-react";
import {
  accommodationComparison,
  brandDifferentiation,
  brandPhilosophy,
  environmentFacilities,
  rooms,
  services,
} from "@/lib/home-data";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { Section } from "@/components/section";

const philosophyIcons = [Moon, Baby, HeartPulse];

export function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <HeroSection />
      <BrandPhilosophySection />
      <AccommodationExperienceSection />
      <CoreServicesSection />
      <EnvironmentFacilitiesSection />
      <BrandDifferentiationSection />
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
            Setapak&apos;s Trusted Confinement Centre · Since 1988
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] text-[#28251f] sm:text-6xl lg:text-7xl">
            Every Mother Deserves a Beautiful Beginning.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6e6658]">
            At Jade & Bloom, the first 42 days of motherhood are met with thoughtful care, refined comfort and meaningful family connections.
            From attentive newborn support to nourishing cuisine and peaceful lakeside moments, every detail is designed to help families
            embrace this new chapter with greater comfort, confidence and peace of mind.
          </p>
        </div>

        <div className="animate-fade relative">
          <div className="absolute -left-8 top-16 hidden rounded-full bg-[#d8c5ad] px-5 py-3 text-sm font-medium text-[#3f3a30] shadow-xl shadow-[#b8a58d]/20 md:block">
            Private, calm, mother-led
          </div>
          <SurfaceImage
            label="Mother gently holding her newborn baby"
            image="/images/jadeBloomHome/motherHugBaby.jpg"
            className="h-[34rem] rounded-t-full rounded-b-[1.5rem]"
            frameClassName="rounded-t-full rounded-b-[2rem] p-3"
          />
        </div>
      </div>
    </section>
  );
}

function BrandPhilosophySection() {
  return (
    <Section id="philosophy" tone="white">
      <SectionIntro
        eyebrow="Brand Philosophy"
        title="A Gentle Beginning, Thoughtfully Bloomed"
        text="Welcoming a new life is a beautiful beginning, but the weeks that follow deserve just as much care. 
        At Jade & Bloom, we believe mothers need space to rest, babies deserve attentive care, and families deserve the time and support to grow together. 
        Rooted in Setapak since 1988, we have walked alongside generations of local families, caring for new mothers and their babies with warmth and tradition. Over more than 35 years, our centre has earned the respect of fellow practitioners and the trust of thousands of families. 
        Through thoughtful postnatal support, a peaceful living environment and meaningful moments of connection, we aim to make the first 42 days a more comfortable and reassuring experience for every family.
"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {brandPhilosophy.map((value, index) => {
          const Icon = philosophyIcons[index % philosophyIcons.length];

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

function AccommodationExperienceSection() {
  return (
    <Section id="rooms">
      <SectionIntro
        eyebrow="Accommodation Experience"
        title="Your Private Sanctuary"
        text="Designed for comfort, privacy and peaceful moments, our thoughtfully appointed rooms offer a welcoming retreat for mothers and their little ones. From restful interiors to considered everyday essentials, every space is envisioned to make the first 42 days feel a little more comfortable."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {rooms.map((room) => (
          <article
            key={room.name}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xl shadow-[#d9ccb6]/25 transition duration-300"
          >
            <SurfaceImage
              label={`${room.name} room`}
              image={room.image}
              className="h-96 transform-gpu transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              frameClassName="group rounded-none border-0 p-0 shadow-none"
            />
            <div className="flex flex-1 flex-col p-7">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#7f967a]">
                  {room.eyebrow}
                </p>
                <span className="text-[#c8b99f]" aria-hidden="true">·</span>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a9183]">
                  {room.tag}
                </p>
              </div>
              <h3 className="mt-3 font-serif text-3xl text-[#2d2a22]">{room.name}</h3>
              <p className="mt-3 leading-7 text-[#6e6658]">{room.description}</p>

              <div className="mt-5 border-t border-[#e8ddca] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f967a]">
                  Features
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-[#5f5749]">
                  {room.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <span className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-[#8fa88b]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 border-t border-[#e8ddca] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7f967a]">
                  Design Concept
                </p>
                <p className="mt-2 text-sm italic leading-6 text-[#6e6658]">
                  {room.designConcept}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-[#8fa88b]" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7f967a]">
            Designed for Mother & Baby
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-[#e8ddca] bg-white shadow-xl shadow-[#d9ccb6]/30">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#2f4431] text-white">
                <th className="w-[22%] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em]">
                  Design Dimension
                </th>
                <th className="w-[39%] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  Standard Boutique Hotel
                </th>
                <th className="w-[39%] bg-[#3a523c] px-6 py-5 text-sm font-semibold uppercase tracking-[0.18em]">
                  The Jade & Bloom Advantage
                </th>
              </tr>
            </thead>
            <tbody>
              {accommodationComparison.map((row, index) => (
                <tr
                  key={row.dimension}
                  className={`transition-colors hover:bg-[#f6f1e7] ${
                    index % 2 === 0 ? "bg-[#fbf7ef]" : "bg-white"
                  }`}
                >
                  <td className="border-t border-[#e8ddca] px-6 py-5 align-top text-sm font-semibold text-[#2f4431]">
                    {row.dimension}
                  </td>
                  <td className="border-t border-[#e8ddca] px-6 py-5 align-top text-sm leading-6 text-[#8a8172]">
                    {row.standard}
                  </td>
                  <td className="border-t border-[#e8ddca] bg-[#f3f6ee] px-6 py-5 align-top text-sm leading-6 text-[#2d4130]">
                    <span className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#6f866b]" aria-hidden="true" />
                      <span>{row.jadeAndBloom}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </Section>
  );
}

function CoreServicesSection() {
  return (
    <Section id="care" tone="sage">
      <SectionIntro
        eyebrow="Core Services"
        title="Care That Goes Beyond Comfort"
        text="A thoughtful blend of maternal support, newborn care, nourishing cuisine and personalised wellness—each designed to meet families where they are during the first 42 days."
      />
      <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <article
            key={service.title}
            className="group overflow-hidden rounded-lg bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#cbd6c3]/40"
          >
            <div className="relative">
              <SurfaceImage
                label={`${service.title} service`}
                image={service.image}
                className="h-80"
                frameClassName="rounded-none border-0 p-0 shadow-none"
              />
              <div className="absolute left-5 top-5 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-[#2f4431]/90 font-serif text-lg text-white backdrop-blur-sm">
                  {service.number}
                </span>
                <span className="rounded-full bg-white/85 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#2f4431] backdrop-blur-sm">
                  {service.category}
                </span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="font-serif text-2xl text-[#2d2a22]">{service.title}</h3>
              <p className="mt-3 leading-7 text-[#6e6658]">{service.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function EnvironmentFacilitiesSection() {
  return (
    <Section id="environment" tone="cream">
      <SectionIntro
        eyebrow="Environment and Facilities"
        title="Room to Rest, Space to Reconnect"
        text="A thoughtful stay is shaped by more than the room itself. From quiet moments of rest to meaningful time with loved ones, the environment should offer space to slow down and settle into a new chapter of family life."
      />

      <div className="mt-12 flex flex-col gap-8">
        <div className="overflow-hidden rounded-2xl shadow-xl shadow-[#b9aa8f]/20">
          <SurfaceImage
            label="Jade & Bloom environment and facilities"
            image={environmentFacilities.heroImage}
            className="h-[34rem]"
            frameClassName="rounded-none border-0 p-0 shadow-none"
          />
        </div>

        {environmentFacilities.spaces.map((space) => (
          <article
            key={space.title}
            className="group flex flex-col overflow-hidden rounded-2xl border border-[#e8ddca] bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#d9ccb6]/30 sm:flex-row"
          >
            <div className="w-full overflow-hidden sm:w-1/3">
              <SurfaceImage
                label={space.title}
                image={space.image}
                className="h-64 sm:h-full min-h-[12rem]"
                frameClassName="rounded-none border-0 p-0 shadow-none"
              />
            </div>
            <div className="flex flex-col justify-center p-8 sm:w-2/3">
              <h3 className="font-serif text-2xl text-[#2d2a22] sm:text-3xl">{space.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#6e6658]">{space.text}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function BrandDifferentiationSection() {
  return (
    <Section id="difference" tone="sage">
      <div className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#7f967a]">
          Brand Differentiation
        </p>
        <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">
          The Jade & Bloom Difference
        </h2>
        <p className="mt-5 text-lg leading-8 text-[#6e6658]">
          We believe the early days of motherhood deserve thoughtful attention in every detail. Our vision brings together the warmth of family life, the comfort of considered spaces and a more personal approach to the postnatal stay.
        </p>
      </div>

      <div className="mt-[4.5rem] grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {brandDifferentiation.map((item, index) => (
          <article
            key={item.title}
            className="group relative flex flex-col rounded-2xl border border-[#c9d4c1] bg-white/80 p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-[#cbd6c3]/40"
          >
            <span className="font-serif text-5xl text-[#8fa88b]/40" aria-hidden="true">
              0{index + 1}
            </span>
            <h3 className="mt-4 font-serif text-2xl leading-snug text-[#2d2a22]">
              {item.title}
            </h3>
            <p className="mt-3 leading-7 text-[#6e6658]">{item.text}</p>
          </article>
        ))}
      </div>

      <div className="mt-24 flex flex-col items-center text-center">
        <span className="mb-5 h-px w-14 bg-[#c9d4c1]" aria-hidden="true" />
        <p className="max-w-4xl font-serif text-xl italic leading-relaxed text-[#7f967a] sm:text-2xl">
          <span className="block">Trusted by Setapak families since 1988,</span>
          <span className="block">and respected within the confinement care community.</span>
        </p>
      </div>
    </Section>
  );
}

function TestimonialsSection() {
  return (
    <Section id="testimonials" tone="white">
      <SectionIntro
        eyebrow="KIND WORDS FROM OUR FAMILIES"
        title="A Beautiful Beginning, Shared."
        text="Every family's journey into parenthood is unique. We're honoured to be part of these precious first moments, 
        creating a space where new parents can find comfort, feel supported, and embrace the joy of growing together."
      />
      <TestimonialsCarousel />
    </Section>
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
