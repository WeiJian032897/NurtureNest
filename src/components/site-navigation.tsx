"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

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
          <div className="flex items-center leading-none">
            <span
              className="uppercase text-[23px] font-semibold tracking-[0.10em] text-[#2D4130]"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              NURTURE NEST
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
    <footer className="bg-[#2f4431] px-5 pt-14 pb-0 text-[#fbf7ef] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1.2fr_0.7fr] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/LogoNurtureNest_v2.jpg"
                alt="Nurture Nest logo"
                className="size-14 shrink-0 rounded-sm object-contain"
              />
              <div className="flex min-w-max flex-col justify-center">
                <p className="font-serif text-xl tracking-[0.2em] text-[#fbf7ef]">NURTURE NEST</p>
                <p className="mt-1 whitespace-nowrap text-[12px] font-medium tracking-[0.08em] text-[#f4ead8]">
                  Confinement Care Finder
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#fbf7ef]/80">
              Nurture Nest is a confinement care discovery and booking platform, connecting families with premium postnatal care and wellness centres across Malaysia. 
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c5aa70]">Explore</h2>
            <nav aria-label="Footer navigation" className="mt-5 flex flex-col items-start gap-3 text-sm text-white/70">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={`transition-colors hover:text-[#c5aa70] ${focusRing}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c5aa70]">Contact</h2>
            <address className="mt-5 space-y-6 text-sm not-italic leading-6 text-white/70">
              <p className="[text-wrap:pretty]">
                Confinement Care Finder <br />
                No. 18, Jalan Seri Damai 2,<br />
                Taman Damai Indah, Bukit Jalil,<br />
                57000 Kuala Lumpur, Malaysia
              </p>
              <div className="flex flex-col items-start gap-3">
                <a className="transition-colors hover:text-white" href="tel:+60177029187">+60 17-702 9187</a>
                <a className="inline-flex items-center gap-2 rounded-full border border-[#c5aa70] bg-[#c5aa70] px-4 py-2 font-semibold text-[#2f4431] transition-colors hover:border-[#d6bf8b] hover:bg-[#d6bf8b]" href="https://wa.me/60177029187" target="_blank" rel="noreferrer"><FaWhatsapp aria-hidden="true" />WhatsApp</a>
              </div>
              <p>Mon–Sat , 9am–6pm</p>
            </address>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#c5aa70]">Follow us</h2>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={`flex size-9 items-center justify-center rounded-full border-[0.5px] border-white/30 text-white/70 transition-colors hover:border-[#c5aa70] hover:text-[#c5aa70] ${focusRing}`}
              >
                <FaFacebookF className="size-4" aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={`flex size-9 items-center justify-center rounded-full border-[0.5px] border-white/30 text-white/70 transition-colors hover:border-[#c5aa70] hover:text-[#c5aa70] ${focusRing}`}
              >
                <FaInstagram className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <p>© 2026 Nurture Nest</p>
          <div className="flex items-center gap-2">
            <Link href="/privacy-policy" className={`transition-colors hover:text-[#c5aa70] ${focusRing}`}>Privacy Policy</Link>
            <span aria-hidden="true">·</span>
            <Link href="/terms" className={`transition-colors hover:text-[#c5aa70] ${focusRing}`}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
