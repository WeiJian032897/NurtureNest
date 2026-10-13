import {
  Baby,
  CalendarCheck,
  Flower2,
  HeartPulse,
  Hotel,
  MessageCircle,
  Moon,
  Sparkles,
  Utensils,
} from "lucide-react";

const navItems = ["Services", "Rooms", "Care", "About"];

const services = [
  {
    icon: HeartPulse,
    title: "Mother-first recovery",
    text: "Gentle daily support designed around rest, nutrition, and confident healing after birth.",
  },
  {
    icon: Baby,
    title: "Newborn care",
    text: "Warm, attentive guidance for feeding rhythms, soothing routines, and early baby care.",
  },
  {
    icon: Utensils,
    title: "Nourishing meals",
    text: "Comforting confinement meals planned to feel restorative, balanced, and beautifully served.",
  },
];

const rooms = [
  {
    name: "Serene Suite",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85",
    detail: "Private suite with soft natural light, nursing lounge, and quiet recovery space.",
  },
  {
    name: "Garden Room",
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=85",
    detail: "A calming room palette inspired by linen, sage leaves, and slow mornings.",
  },
];

const amenities = [
  { icon: Moon, label: "Restful night support" },
  { icon: Hotel, label: "Boutique hospitality" },
  { icon: Flower2, label: "Calm wellness rituals" },
  { icon: CalendarCheck, label: "Personal care planning" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#2d2a22]">
      <Navigation />
      <Hero />
      <Services />
      <Rooms />
      <Amenities />
      <About />
      <CTA />
    </main>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8ddca]/70 bg-[#fbf7ef]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#" className="group flex items-center gap-3" aria-label="Nurture Nest home">
          <span className="grid size-10 place-items-center rounded-full bg-[#8fa88b] text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.28em] text-[#6d7f68]">
              Nurture
            </span>
            <span className="block font-serif text-2xl leading-none text-[#2d2a22]">
              Nest
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium text-[#6e6658] md:flex">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#40563f]">
              {item}
            </a>
          ))}
        </div>

        <a
          href="#consultation"
          className="rounded-full bg-[#2f4431] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#253827]"
        >
          Enquire
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative px-5 pt-28 sm:px-8 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-16">
        <div className="animate-rise max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
            Premium confinement care
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] text-[#28251f] sm:text-6xl lg:text-7xl">
            A softer place to recover, bond, and begin again.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-[#6e6658]">
            Nurture Nest is a refined postpartum sanctuary for mothers and newborns,
            shaped around privacy, nourishment, attentive care, and calm everyday rituals.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#consultation"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#2f4431] px-7 text-sm font-semibold text-white shadow-lg shadow-[#6d7f68]/20 transition hover:-translate-y-0.5 hover:bg-[#253827]"
            >
              Book a consultation
            </a>
            <a
              href="#rooms"
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#c8b99f] px-7 text-sm font-semibold text-[#3f3a30] transition hover:-translate-y-0.5 hover:border-[#8fa88b] hover:bg-white/60"
            >
              View rooms
            </a>
          </div>
        </div>

        <div className="animate-fade relative">
          <div className="absolute -left-8 top-16 hidden rounded-full bg-[#d8c5ad] px-5 py-3 text-sm font-medium text-[#3f3a30] shadow-xl shadow-[#b8a58d]/20 md:block">
            Private, calm, mother-led
          </div>
          <div className="overflow-hidden rounded-t-full rounded-b-[2rem] border border-white/70 bg-white p-3 shadow-2xl shadow-[#b9aa8f]/25">
            <div
              role="img"
              aria-label="Mother gently holding her newborn baby"
              className="h-[34rem] w-full rounded-t-full rounded-b-[1.5rem] bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=1200&q=85')",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-white px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Care, quietly elevated"
          title="Every detail supports the first weeks after birth."
          text="The home page introduces the intended care experience without adding booking systems, logins, payments, or database features."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-lg border border-[#eadfcd] bg-[#fbf7ef] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#b7c3ad] hover:shadow-xl hover:shadow-[#ded2c0]/35"
            >
              <service.icon className="mb-8 size-8 text-[#789074]" aria-hidden="true" />
              <h3 className="font-serif text-2xl text-[#2d2a22]">{service.title}</h3>
              <p className="mt-4 leading-7 text-[#6e6658]">{service.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rooms() {
  return (
    <section id="rooms" className="px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionIntro
          eyebrow="Suites and spaces"
          title="Boutique rooms made for privacy and peaceful recovery."
          text="Warm textures, soft light, and uncluttered layouts create a setting that feels restful rather than clinical."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {rooms.map((room) => (
            <article key={room.name} className="overflow-hidden rounded-lg bg-white shadow-xl shadow-[#d9ccb6]/25">
              <div
                role="img"
                aria-label={`${room.name} interior`}
                className="h-80 w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${room.image}')` }}
              />
              <div className="p-7">
                <h3 className="font-serif text-3xl text-[#2d2a22]">{room.name}</h3>
                <p className="mt-3 leading-7 text-[#6e6658]">{room.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Amenities() {
  return (
    <section id="care" className="bg-[#eef2e8] px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionIntro
            eyebrow="Included comforts"
            title="A considered stay from the first hello."
            text="The experience is presented as a premium care concept. Specific medical, pricing, and operational details should be confirmed before launch."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((item) => (
              <div key={item.label} className="flex items-center gap-4 rounded-lg bg-white/75 p-5 shadow-sm">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#8fa88b] text-white">
                  <item.icon className="size-5" aria-hidden="true" />
                </span>
                <p className="font-medium text-[#3f3a30]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-white px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="overflow-hidden rounded-lg">
          <div
            role="img"
            aria-label="Peaceful newborn care moment"
            className="h-[32rem] w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=85')",
            }}
          />
        </div>
        <div>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
            About Nurture Nest
          </p>
          <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">
            A modern confinement centre with a gentle, hospitality-led heart.
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#6e6658]">
            This homepage frames Nurture Nest as a calm, premium postpartum care brand.
            It focuses on the brand experience, service pillars, and consultation CTA while
            keeping the implementation intentionally simple.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Calm", "Private", "Nurturing"].map((word) => (
              <div key={word} className="border-l border-[#c8b99f] pl-4">
                <p className="font-serif text-2xl text-[#2f4431]">{word}</p>
                <p className="mt-1 text-sm text-[#7a7265]">brand principle</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="consultation" className="px-5 py-24 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl rounded-lg bg-[#2f4431] px-6 py-14 text-center text-white shadow-2xl shadow-[#8fa88b]/30 sm:px-12">
        <MessageCircle className="mx-auto mb-6 size-9 text-[#d8c5ad]" aria-hidden="true" />
        <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
          Begin with a quiet conversation.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#f1eadf]">
          Share your expected date, care preferences, and room needs. The next step can be
          a simple consultation before any booking flow is added to the product.
        </p>
        <a
          href="mailto:hello@nurturenest.example?subject=Nurture%20Nest%20consultation"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#fbf7ef] px-7 text-sm font-semibold text-[#2f4431] transition hover:-translate-y-0.5 hover:bg-white"
        >
          Request consultation
        </a>
      </div>
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
