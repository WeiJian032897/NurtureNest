import Link from "next/link";
import { SiteFooter, SiteNavigation } from "@/components/site-navigation";
import { centres } from "@/lib/centres";
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

          <div id="centres" className="scroll-mt-28 pt-16 sm:pt-20">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#7f967a]">Explore care centres</p>
            <h2 className="font-serif text-4xl leading-tight text-[#28251f] sm:text-5xl">Thoughtful care starts with the right centre.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#6e6658]">
              Browse welcoming spaces and postnatal support for mothers, babies and families.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
