"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Check, Minus, CircleHelp } from "lucide-react";
import { Section } from "@/components/section";
import { standardServices, serviceCategories } from "@/lib/standard-services";
import { resolvePackageServices } from "@/lib/package-services";
import type { PackageContent, PackageService } from "@/lib/package-types";
import type { StayCentre } from "@/lib/stay-types";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

export function CarePackages({ centre, content }: { centre: StayCentre; content?: PackageContent }) {
  const packages = (content?.packages ?? []).filter((item) => item.centreId === centre.id && item.available !== false);
  const copy = (text: string) => text.replaceAll("{standardStayDays}", String(centre.standardStayDays));
  const resolved = packages.map((item) => {
    try {
      return resolvePackageServices(item, content?.packages ?? [], content?.services ?? []);
    } catch {
      // Invalid inheritance must not result in misleading partial coverage.
      return null;
    }
  });
  return <>
    <Section id="care-packages" tone="white">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#60745c]">Care Packages</p>
      <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-[#2f4431] sm:text-5xl">Thoughtful care, shaped around you.</h2>
      {packages.length === 0 ? <p className="mt-8 text-[#6e6658]">Package information is not available yet. Please contact the centre for details.</p> : <>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {packages.map((item) => <article key={item.id} className="flex flex-col rounded-lg border border-[#e8ddca] bg-[#fbf7ef] p-7 sm:p-9 motion-safe:transition-shadow hover:shadow-lg hover:shadow-[#d9ccb6]/25">
            <p className="text-xs font-semibold uppercase leading-6 tracking-[0.2em] text-[#60745c]">{item.subtitle}</p>
            <h3 className="mt-4 font-serif text-3xl text-[#2f4431]">{item.name}</h3>
            <p className="mt-4 leading-7 text-[#6e6658]">{copy(item.description)}</p>
            <ul className="mt-7 space-y-3 border-t border-[#e8ddca] pt-6 text-sm leading-6 text-[#5f5749]">
              {(item.highlights ?? []).slice(0, 4).map((highlight) => <li key={highlight} className="flex gap-3"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#6f866b]" />{highlight}</li>)}
            </ul>
          </article>)}
        </div>
        <a href="#comparison-heading" className={`mt-10 inline-flex min-h-12 items-center rounded-full bg-[#2f4431] px-7 py-3 text-sm font-semibold text-white motion-safe:transition-colors hover:bg-[#40583f] ${focus}`}>View Full Comparison <span aria-hidden="true" className="ml-3">↓</span></a>
      </>}
    </Section>
    <Section id="package-comparison">
      <ComparisonReveal>
      <h2 id="comparison-heading" tabIndex={-1} className={`scroll-mt-44 max-w-3xl font-serif text-4xl leading-tight text-[#2f4431] sm:text-5xl ${focus}`}>Find the Care That Feels Right for You</h2>
      {content?.comparisonDescription && packages.length > 0 && <p className="mt-6 max-w-3xl text-lg leading-8 text-[#6e6658]">{copy(content.comparisonDescription)}</p>}
      {packages.length === 0 ? <p className="mt-8 text-[#6e6658]">A comparison will be available when the centre publishes its packages.</p> : <>
        {resolved.some((value) => value === null) && <p role="status" className="mt-6 text-[#6e6658]">Some package details need confirmation. Please check with the centre.</p>}
        <div className="mt-8 flex items-center justify-between gap-4 border-b border-[#d8cfbd] pb-3 text-xs text-[#6e6658]">
          <span>Care at a glance</span><span aria-hidden="true">↔</span><span className="sr-only">Scrollable comparison. Focus the table area to scroll with arrow keys.</span>
        </div>
        <div role="region" aria-labelledby="comparison-heading" tabIndex={0} className={`overflow-x-auto rounded-b-lg bg-[#fffdf8] ${focus}`}>
          <table className="w-full table-fixed border-collapse text-left text-sm" style={{ minWidth: `${200 + packages.length * 180}px` }}>
            <caption className="sr-only">Service availability by package. Conditional services have individual requirements; Not confirmed means information is missing.</caption>
            <colgroup><col style={{ width: "200px" }} />{packages.map((item) => <col key={item.id} style={{ width: "180px" }} />)}</colgroup>
            <thead className="text-[#2f4431]"><tr><th scope="col" className="px-4 py-5 text-xs font-medium uppercase tracking-[0.16em]">Service</th>{packages.map((item) => <th scope="col" key={item.id} className={`px-4 py-5 text-center font-serif text-xl ${item.featuredInComparison ? "bg-[#eef2e8]" : ""}`}>{item.comparisonLabel ?? item.name}</th>)}</tr></thead>
            {serviceCategories.map((category) => <tbody key={category.id}>
              <tr><th scope="rowgroup" colSpan={packages.length + 1} className="border-y border-[#dedfce] bg-[#f3f1e8] px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#60745c]">{category.label}</th></tr>
              {standardServices.filter((service) => service.category === category.id).map((service) => {
                const records = resolved.map((result) => result?.get(service.id));
                const firstNote = records[0]?.details?.trim();
                const sharedNote = firstNote && records.every((record) => record?.details?.trim() === firstNote) ? firstNote : undefined;
                const hasDifference = new Set(records.map((record) => record?.status)).size > 1;
                return <tr key={service.id} className="group/service border-b border-[#e8ddca]/60">
                  <th scope="row" className={`px-4 py-3 align-top leading-6 text-[#2f4431] group-hover/service:bg-[#eaf0e4] group-focus-within/service:bg-[#eaf0e4] motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out ${hasDifference ? "font-medium" : "font-normal"}`}>
                    {service.canonicalLabel}
                    {(sharedNote || service.description) && <Explanation label={`About ${service.canonicalLabel}`} text={[service.description, sharedNote].filter(Boolean).join(" ")} />}
                  </th>
                  {packages.map((item, index) => <td key={item.id} className={`px-4 py-3 align-top motion-safe:transition-colors motion-safe:duration-200 motion-safe:ease-out ${item.featuredInComparison ? "bg-[#f1f5ed]/75 group-hover/service:bg-[#eaf0e4] group-focus-within/service:bg-[#eaf0e4] hover:!bg-[#e0e9d9] focus-within:!bg-[#e0e9d9]" : "group-hover/service:bg-[#eaf0e4] group-focus-within/service:bg-[#eaf0e4]"}`}>
                    <ServiceStatus record={records[index]} hideNote={Boolean(sharedNote)} emphasized={hasDifference && records[index]?.status === "included"} context={`${item.name}: ${service.canonicalLabel}`} />
                  </td>)}
                </tr>;
              })}
            </tbody>)}
          </table>
        </div>
      </>}
      </ComparisonReveal>
    </Section>
  </>;
}

function ComparisonReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !element.contains(document.activeElement)) {
        element.classList.add("animate-rise");
      }
      observer.disconnect();
    }, { threshold: 0.05 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className="motion-reduce:animate-none">{children}</div>;
}

function ServiceStatus({ record, hideNote, emphasized, context }: { record?: PackageService; hideNote: boolean; emphasized: boolean; context: string }) {
  const status = record?.status;
  const Icon = status === "included" ? Check : status === "not_included" ? Minus : CircleHelp;
  const label = status === "included" ? "Included" : status === "not_included" ? "Not included" : status === "conditional" ? "Conditional" : "Not confirmed";
  const note = record?.details || (status === "conditional" ? "Please ask the centre about eligibility and arrangements." : undefined);
  return <div className={`text-center ${status === "not_included" ? "text-[#817a6e]" : "text-[#40583f]"}`}>
    <span className={`flex items-center justify-center gap-2 leading-6 ${emphasized ? "font-semibold" : "font-normal"}`}><Icon aria-hidden="true" className="size-4 shrink-0" />{label}</span>
    {!hideNote && note && <Explanation label={`Details for ${context}`} text={note} />}
  </div>;
}

function Explanation({ label, text }: { label: string; text: string }) {
  return <details className="mt-1 text-left font-normal text-[#6e6658]">
    <summary className={`min-h-8 cursor-pointer rounded-sm py-1 text-xs underline decoration-[#b6bfab] underline-offset-4 ${focus}`}>
      Details<span className="sr-only"> — {label}</span>
    </summary>
    <p className="pb-2 pt-1 text-xs leading-6">{text}</p>
  </details>;
}
