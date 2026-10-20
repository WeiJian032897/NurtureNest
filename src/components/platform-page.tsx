import Link from "next/link";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";
import { centres } from "@/lib/centres";

export function PlatformPage({ directory = false }: { directory?: boolean }) {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#2d2a22]">
      <SiteNavigation />
      <section className="px-5 pb-24 pt-36 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.32em] text-[#7f967a]">
            Confinement Care Finder
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-[#28251f] sm:text-6xl">
            {directory ? "Find a centre for your family’s next chapter." : "Thoughtful care starts with the right centre."}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#6e6658]">
            Discover confinement centres offering attentive postnatal care, welcoming spaces and support for mothers, babies and families.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {centres.map((centre) => (
              <article key={centre.href} className="overflow-hidden rounded-2xl border border-[#e8ddca] bg-white/80 shadow-lg shadow-[#d9ccb6]/20">
                <div className="h-2 bg-[#c5aa70]" />
                <div className="p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7f967a]">{centre.location}</p>
                  <h2 className="mt-3 font-serif text-3xl text-[#2f4431]">{centre.name}</h2>
                  <p className="mt-4 leading-7 text-[#6e6658]">{centre.description}</p>
                  <Link href={centre.href} className="mt-7 inline-flex h-11 items-center rounded-full bg-[#2f4431] px-6 text-sm font-semibold text-white transition hover:bg-[#253827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]">
                    Explore centre
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
