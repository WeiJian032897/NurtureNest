import type { Metadata } from "next";
import {
  Baby,
  CalendarCheck,
  HeartPulse,
  Mail,
  ShieldCheck,
  Utensils,
} from "lucide-react";
import { faqs } from "@/lib/faq-data";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Nurture Nest",
  description:
    "Frequently asked questions about Nurture Nest — a premium postnatal care and wellness centre in Kuala Lumpur.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

const topics = [
  {
    icon: CalendarCheck,
    title: "42-Day Programme",
    text: "Our signature stay designed around the first six weeks of motherhood, with attentive care every step of the way.",
  },
  {
    icon: Baby,
    title: "Mother & Baby Care",
    text: "Personalised postnatal support, newborn care and breastfeeding guidance from a dedicated team.",
  },
  {
    icon: Utensils,
    title: "Dining & Wellness",
    text: "Carefully curated confinement meals and wellness amenities for recovery and relaxation.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Privacy",
    text: "Controlled access, professional security and a tranquil environment that families can trust.",
  },
];

export default function FaqPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />

      {/* Hero */}
      <section className="px-5 pt-36 sm:px-8 md:pt-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="animate-rise">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
              Nurture Nest
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] text-[#28251f] sm:text-6xl">
              Everything You Need to Know
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6e6658]">
             We understand that welcoming a new baby comes with many questions. At Nurture Nest, we are always happy to help you find the answers you need, 
             so you and your family can feel informed, reassured and confident as you prepare for this beautiful new chapter.
            </p>
            <a
              href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20enquiry"
              className={`mt-9 inline-flex h-12 items-center justify-center rounded-full bg-[#2f4431] px-7 text-sm font-semibold text-white shadow-lg shadow-[#6d7f68]/20 transition hover:-translate-y-0.5 hover:bg-[#253827] ${focusRing}`}
            >
              <Mail className="mr-2 size-4" aria-hidden="true" />
              Enquire now
            </a>
          </div>

          <div className="animate-fade rounded-[2rem] border border-[#e8ddca] bg-white/75 p-4 shadow-2xl shadow-[#d9ccb6]/35">
            <div className="rounded-[1.5rem] bg-[#eef2e8] p-8 sm:p-10">
              <HeartPulse className="mb-8 size-10 text-[#6f866b]" aria-hidden="true" />
              <p className="font-serif text-3xl leading-tight text-[#2f4431]">
                Thoughtfully designed for mothers, beautifully cared for
                families.
              </p>
              <p className="mt-5 leading-7 text-[#5f6757]">
                Explore our programme, care services, dining and facilities
                below — everything you need to know before your stay with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => {
              const Icon = topic.icon;

              return (
                <article key={topic.title} className="premium-card p-6">
                  <Icon className="mb-7 size-8 text-[#789074]" aria-hidden="true" />
                  <h2 className="font-serif text-2xl text-[#2d2a22]">{topic.title}</h2>
                  <p className="mt-4 leading-7 text-[#6e6658]">{topic.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#7f967a]">
              Frequently Asked Questions
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">
              Clear answers, refined presentation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6e6658]">
              Everything you need to know about staying at Nurture Nest. Can&apos;t
              find what you&apos;re looking for? Reach out to our team directly.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={faq.questionEn}
                className="group rounded-lg border border-[#e1d4c0] bg-white/80 p-5 shadow-sm open:bg-white"
              >
                <summary
                  className={`flex cursor-pointer list-none items-start justify-between gap-5 font-semibold text-[#2d2a22] ${focusRing}`}
                >
                  <div>
                    <p className="text-base">
                      <span className="mr-2 text-[#7f967a]">{index + 1}.</span>
                      {faq.questionEn}
                    </p>
                    <p className="mt-1 text-sm font-normal text-[#6e6658]">
                      {faq.questionCn}
                    </p>
                  </div>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eef2e8] text-[#789074] transition">
                    <span className="text-lg leading-none group-open:hidden">+</span>
                    <span className="hidden text-lg leading-none group-open:block">–</span>
                  </span>
                </summary>
                <div className="mt-4 space-y-3 leading-7 text-[#6e6658]">
                  <p>{faq.answerEn}</p>
                  <p className="text-[#7a7265]">{faq.answerCn}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section
        id="enquiry"
        className="scroll-mt-32 px-5 pb-24 sm:px-8 lg:px-10"
      >
        <div className="mx-auto max-w-5xl rounded-lg bg-[#2f4431] px-6 py-14 text-center text-white shadow-2xl shadow-[#8fa88b]/30 sm:px-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#d8c5ad]">
            Still unsure?
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            We&apos;re here to help you begin with confidence.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#f1eadf]">
            Send us your questions about rooms, packages, care services or
            anything else — our team will be happy to assist.
          </p>
          <a
            href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20enquiry"
            className={`mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#fbf7ef] px-7 text-sm font-semibold text-[#2f4431] transition hover:-translate-y-0.5 hover:bg-white ${focusRing}`}
          >
            Contact Nurture Nest
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
