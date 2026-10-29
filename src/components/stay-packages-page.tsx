import Image from "next/image";
import { CarePackages } from "@/components/care-packages";
import { StayConfigurator } from "@/components/stay-configurator";
import { Check, ChevronDown } from "lucide-react";
import { Section } from "@/components/section";
import type { StayPageData, StayRoom } from "@/lib/stay-types";

export function StayPackagesPage({ centre, rooms, packageContent, pricing }: StayPageData) {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#2d2a22]">
      <section aria-labelledby="stay-heading" className="px-5 pt-56 pb-16 sm:px-8 md:pt-44 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#60745c]">{centre.displayName} · Stay &amp; Packages</p>
            <h1 id="stay-heading" className="mt-6 font-serif text-[2.5rem] leading-[1.12] tracking-[-0.025em] text-[#2f4431] sm:text-5xl lg:text-[3.75rem]">{centre.hero.heading}</h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#6e6658] sm:text-lg">{centre.hero.description.replaceAll("{standardStayDays}", String(centre.standardStayDays))}</p>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-[#60745c]">{centre.standardStayDays}-day standard stay</p>
          </div>
          <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-lg bg-[#e8ddca] sm:aspect-[3/2] lg:aspect-[2/1]">
            <Image src={centre.hero.image.src} alt={centre.hero.image.alt} fill preload sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), (max-width: 1360px) calc(100vw - 80px), 1280px" className="object-cover" />
          </div>
        </div>
      </section>
      <Section id="our-rooms" tone="sage">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#60745c]">Our Rooms</p>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-[#2f4431] sm:text-5xl">Space to rest. Room to feel at home.</h2>
        </div>
        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {rooms.map((room) => <RoomCard key={room.id} room={room} />)}
        </div>
      </Section>
      <CarePackages centre={centre} content={packageContent} />
      <StayConfigurator centre={centre} rooms={rooms} packageContent={packageContent} pricing={pricing} />
    </main>
  );
}

function RoomCard({ room }: { room: StayRoom }) {
  return (
    <article aria-labelledby={`room-${room.id}`} className="overflow-hidden rounded-lg border border-[#e8ddca] bg-white shadow-sm motion-safe:transition-shadow motion-safe:duration-300 hover:shadow-xl hover:shadow-[#d9ccb6]/25">
      <div className="group relative aspect-[3/2] overflow-hidden bg-[#e8ddca]">
        <Image src={room.images[0].src} alt={room.images[0].alt} fill sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), (max-width: 1360px) 46vw, 624px" className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.03]" />
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase leading-6 tracking-[0.2em] text-[#60745c]">{room.subtitle}</p>
        <h3 id={`room-${room.id}`} className="mt-3 font-serif text-3xl text-[#2f4431] sm:text-4xl">{room.name}</h3>
        <p className="mt-4 leading-7 text-[#6e6658]">{room.description}</p>
        <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#5f5749] sm:grid-cols-2">
          {room.highlights.slice(0, 4).map((highlight) => <li key={highlight} className="flex gap-2"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#6f866b]" />{highlight}</li>)}
        </ul>
        <details className="group/details mt-7 border-t border-[#e8ddca] pt-2">
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-sm py-3 text-sm font-semibold text-[#2f4431] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b] [&::-webkit-details-marker]:hidden">
            <span>View Room Details<span className="sr-only"> for {room.name}</span></span>
            <ChevronDown aria-hidden="true" className="size-4 shrink-0 group-open/details:rotate-180 motion-safe:transition-transform" />
          </summary>
          <div className="pb-2 pt-4">
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#60745c]">Room amenities</h4>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#6e6658]">{room.amenities.map((amenity) => <li key={amenity}>{amenity}</li>)}</ul>
          </div>
        </details>
      </div>
    </article>
  );
}
