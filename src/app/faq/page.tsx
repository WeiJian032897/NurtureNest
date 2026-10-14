import type { Metadata } from "next";
import { Baby, CalendarCheck, HelpCircle, Mail, ShieldCheck, Utensils } from "lucide-react";
import { faqs, faqTopics } from "@/lib/faq-data";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";

export const metadata: Metadata = {
  title: "FAQ | Nurture Nest",
  description:
    "Frequently asked questions for the Nurture Nest confinement centre website concept.",
};

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

const topicIcons = {
  baby: Baby,
  meals: Utensils,
  planning: CalendarCheck,
  trust: ShieldCheck,
};

export default function FaqPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <section className="px-5 pt-36 sm:px-8 md:pt-32 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="animate-rise">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
              Questions before enquiry
            </p>
            <h1 className="font-serif text-5xl leading-[1.03] text-[#28251f] sm:text-6xl">
              Thoughtful answers for a calmer first step.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6e6658]">
              This FAQ page keeps the Phase 1 concept transparent: pricing is illustrative,
              testimonials are fictional demo content, and care details should be confirmed
              before real publication.
            </p>
            <a
              href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20FAQ%20question"
              className={`mt-9 inline-flex h-12 items-center justify-center rounded-full bg-[#2f4431] px-7 text-sm font-semibold text-white shadow-lg shadow-[#6d7f68]/20 transition hover:-translate-y-0.5 hover:bg-[#253827] ${focusRing}`}
            >
              <Mail className="mr-2 size-4" aria-hidden="true" />
              Ask a question
            </a>
          </div>

          <div className="animate-fade rounded-[2rem] border border-[#e8ddca] bg-white/75 p-4 shadow-2xl shadow-[#d9ccb6]/35">
            <div className="rounded-[1.5rem] bg-[#eef2e8] p-8 sm:p-10">
              <HelpCircle className="mb-8 size-10 text-[#6f866b]" aria-hidden="true" />
              <p className="font-serif text-3xl leading-tight text-[#2f4431]">
                The best confinement centre website sets expectations gently, clearly,
                and without exaggeration.
              </p>
              <p className="mt-5 leading-7 text-[#5f6757]">
                Use this page as the content foundation for future service, room, and package
                detail pages.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {faqTopics.map((topic) => {
              const TopicIcon = topicIcons[topic.icon as keyof typeof topicIcons];

              return (
                <article key={topic.title} className="premium-card p-6">
                  <TopicIcon className="mb-7 size-8 text-[#789074]" aria-hidden="true" />
                  <h2 className="font-serif text-2xl text-[#2d2a22]">{topic.title}</h2>
                  <p className="mt-4 leading-7 text-[#6e6658]">{topic.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#7f967a]">
              FAQ
            </p>
            <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">
              Clear answers, refined presentation.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#6e6658]">
              Native accordion elements keep the page accessible and lightweight while matching
              the premium brand direction.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-[#e1d4c0] bg-white/80 p-5 shadow-sm open:bg-white"
              >
                <summary className={`flex cursor-pointer list-none items-center justify-between gap-5 font-semibold text-[#2d2a22] ${focusRing}`}>
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eef2e8] text-[#789074] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-[#6e6658]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-32 px-5 pb-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-lg bg-[#2f4431] px-6 py-14 text-center text-white shadow-2xl shadow-[#8fa88b]/30 sm:px-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#d8c5ad]">
            Still unsure?
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl">
            Send one careful question before the next page is built.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#f1eadf]">
            The FAQ page is ready for future Rooms, Packages, and Care pages to link back to it.
          </p>
          <a
            href="mailto:cheeweijian2003@gmail.com?subject=Nurture%20Nest%20FAQ%20question"
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
