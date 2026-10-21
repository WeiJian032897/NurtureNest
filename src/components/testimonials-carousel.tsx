"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { testimonials } from "@/lib/home-data";

const testimonialImages = [
  "/images/jadeBloomHome/mother.jpg",
  "/images/jadeBloomHome/father.jpg",
  "/images/jadeBloomHome/parents.jpg",
  "/images/jadeBloomHome/mother2.jpg",
  "/images/jadeBloomHome/parents2.jpg",
];

export function TestimonialsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateButtons = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    setCanScrollPrev(viewport.scrollLeft > 1);
    setCanScrollNext(viewport.scrollLeft + viewport.clientWidth < viewport.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    updateButtons();
    const observer = new ResizeObserver(updateButtons);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [updateButtons]);

  const scrollByCard = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>("[data-testimonial-card]");
    if (!viewport || !card) return;
    const styles = window.getComputedStyle(viewport);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    viewport.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <div className="mt-12">
      <div className="mb-5 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollPrev}
          aria-label="Previous testimonials"
          className="flex size-11 items-center justify-center rounded-full border border-[#b8c2b0] text-[#40563f] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollNext}
          aria-label="Next testimonials"
          className="flex size-11 items-center justify-center rounded-full border border-[#b8c2b0] text-[#40563f] transition-opacity disabled:cursor-not-allowed disabled:opacity-35"
        >
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
      <div className="relative">
        {canScrollPrev && (
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20"
            style={{ background: "linear-gradient(to right, #ffffff 0%, transparent 100%)" }}
            aria-hidden="true"
          />
        )}
        <div
          ref={viewportRef}
          onScroll={updateButtons}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-2 pr-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Family testimonials"
          tabIndex={0}
        >
          {testimonials.map((item, index) => (
            <figure
              key={item.name}
              data-testimonial-card
              className="premium-card flex min-h-[25rem] shrink-0 snap-start flex-col p-7 basis-[calc((100%-2.5rem-1.25rem)/1.12)] sm:basis-[calc((100%-2.5rem-1.25rem)/2.12)] lg:basis-[calc((100%-2.5rem-1.25rem)/3.12)]"
            >
              <div className="-mx-7 -mt-7 mb-6 aspect-[4/3] overflow-hidden rounded-t-[0.45rem]">
                <Image
                  src={testimonialImages[index]}
                  alt=""
                  width={720}
                  height={400}
                  className="h-full w-full object-cover object-[center_25%] [filter:saturate(0.9)_sepia(0.08)]"
                />
              </div>
              <p className="text-sm tracking-[0.15em]" aria-label="Star rating">
                {item.note}
              </p>
              <h3 className="mt-4 min-h-[2.6em] font-serif text-2xl leading-snug text-[#2d2a22]">
                {item.topic}
              </h3>
              <blockquote className="mt-4 mb-6 leading-7 text-[#6e6658]">
                <q>{item.quote}</q>
              </blockquote>
              <figcaption className="mt-auto border-t border-[#e8ddca] pt-5">
                <p className="font-semibold text-[#40563f]">{item.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        {canScrollNext && (
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20"
            style={{ background: "linear-gradient(to left, #ffffff 0%, transparent 100%)" }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
