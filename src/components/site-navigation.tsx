"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navItems } from "@/lib/home-data";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

export function SiteNavigation() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8ddca]/80 bg-[#fbf7ef]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          className={`group flex items-center gap-[14px] ${focusRing}`}
          aria-label="Nurture Nest home"
        >
          <img
            src="/images/LogoNurtureNest_v2.jpg"
            alt=""
            className="h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col items-start leading-none">
            <span
              className="uppercase text-[25px] font-semibold tracking-[0.10em] text-[#2D4130]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              NURTURE NEST
            </span>
            <span className="mt-[6px] text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[#9a9183]">
              Postnatal Care & Wellness Centre
            </span>
          </div>
        </Link>

        <div className="order-3 flex w-full gap-2 overflow-x-auto pt-2 text-sm font-medium text-[#6e6658] md:order-2 md:w-auto md:items-center md:gap-2 md:overflow-visible md:pt-0">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`shrink-0 rounded-full px-4 py-2 transition duration-200 ${focusRing} ${
                  isActive
                    ? "bg-[#2f4431] text-white shadow-sm"
                    : "hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#40563f]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <a
          href="/faq#enquiry"
          className={`order-2 rounded-full border border-[#2f4431] bg-[#2f4431] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#253827] md:order-3 ${focusRing}`}
        >
          Enquire
        </a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e8ddca] bg-[#f5ecde] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 text-sm text-[#6e6658] md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl text-[#2d2a22]">Nurture Nest</p>
          <p className="mt-2">Premium postnatal care & wellness centre in Kuala Lumpur.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 hover:bg-white/70 hover:text-[#40563f] ${focusRing}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
