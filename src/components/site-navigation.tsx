"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

import { getCentreNavItems } from "@/lib/home-data";
import { centres } from "@/lib/centres";
import { UserMenu } from "@/components/user-menu";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6f866b]";

export function SiteNavigation() {
  const pathname = usePathname();
  const activeCentre = centres.find((centre) => pathname.startsWith(centre.href));
  const isCentrePage = Boolean(activeCentre);
  const navigationItems = isCentrePage
    ? getCentreNavItems(activeCentre!.href)
    : [{ label: "Home", href: "/" }];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#e8ddca]/80 bg-[#fbf7ef]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-4 lg:px-10">
        <div className="flex items-center gap-3 xl:justify-self-start">
          {isCentrePage && (
            <Link
              href="/"
              aria-label="Go to Nurture Nest home page"
              aria-describedby="home-arrow-tooltip"
              className={`group relative -translate-x-44 flex size-11 shrink-0 items-center justify-center rounded-full border border-[#c9d4c1] bg-[#fbf7ef] text-[#7f967a] transition duration-200 hover:-translate-x-38 hover:border-[#2f4431] hover:bg-[#2f4431] hover:text-[#fbf7ef] ${focusRing}`}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="size-5"
              >
                <path
                  d="M19 12H5m0 0 6 6m-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                id="home-arrow-tooltip"
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-[60] mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-[#2f4431] px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-[#fbf7ef] opacity-0 shadow-lg transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                Nurture Nest Home Page ?
              </span>
            </Link>
          )}
          <div className={`flex items-center -ml-20 ${isCentrePage ? "gap-3" : "gap-4"}`}>
            <Link
              href={navigationItems[0].href}
              className={`group flex shrink-0 items-center ${focusRing}`}
              aria-label={isCentrePage ? "Jade & Bloom home" : "Nurture Nest home"}
            >
              <img
                src={isCentrePage ? "/images/centresLogo/jadeBloomLogo.jpg" : "/images/logoNurtureNest_v2.jpg"}
                alt={isCentrePage ? "Jade & Bloom logo" : "Nurture Nest logo"}
                className={`${isCentrePage ? "h-12 w-14 object-contain sm:h-16 sm:w-24" : "h-14 w-auto"} transition-transform duration-300 group-hover:scale-105`}
              />
            </Link>
            {isCentrePage ? (
              <span
                className="whitespace-nowrap font-serif text-[20px] font-medium tracking-[0.035em] text-[#2f4431] sm:text-[30px]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Jade <span className="italic text-[#8d7950]">&amp;</span> Bloom
              </span>
            ) : (
              <span
                className="whitespace-nowrap uppercase text-[26px] font-semibold tracking-[0.10em] text-[#2D4130]"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                NURTURE NEST
              </span>
            )}
          </div>
        </div>

        <div className="order-3 flex w-full items-center justify-center gap-1 pt-2 text-[13px] font-medium text-[#6e6658] sm:text-[15px] xl:order-none xl:w-auto xl:justify-self-center xl:pt-0">
          {navigationItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname === item.href;

            return <Link key={item.href} href={item.href} aria-current={isActive ? "page" : undefined} className={`rounded-full px-3 py-2.5 transition duration-200 sm:px-5 ${focusRing} ${isActive ? "bg-[#2f4431] text-white shadow-sm" : "hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#40563f]"}`}>{item.label}</Link>;
          })}
          {!isCentrePage && (
            <details className="group relative">
              <summary className={`flex cursor-pointer list-none items-center gap-2 rounded-full px-3 py-2.5 transition duration-200 sm:px-5 [&::-webkit-details-marker]:hidden ${focusRing} ${pathname.startsWith("/centres") ? "bg-[#2f4431] text-white shadow-sm" : "hover:-translate-y-0.5 hover:bg-white/70 hover:text-[#40563f]"}`}>
                Centres <span aria-hidden="true" className="text-[10px] transition-transform group-open:rotate-180">▼</span>
              </summary>
              <div className="absolute left-0 top-full z-50 mt-2 min-w-56 rounded-2xl border border-[#e8ddca] bg-[#fbf7ef] p-2 shadow-xl">
                {centres.map((centre) => (
                  <Link key={centre.href} href={centre.href} className={`block rounded-xl px-4 py-3 transition hover:bg-white ${focusRing}`}>
                    <span className="block font-semibold text-[#2f4431]">{centre.name}</span>
                    <span className="mt-1 block text-xs text-[#8a8172]">{centre.location}</span>
                  </Link>
                ))}
              </div>
            </details>
          )}
        </div>

        {pathname === "/" && <UserMenu />}
        {isCentrePage && (
          <a
            href={`${getCentreNavItems(activeCentre!.href)[4].href}#enquiry`}
            className={`order-2 justify-self-end rounded-full border border-[#2f4431] bg-[#2f4431] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#253827] sm:px-6 sm:py-3 sm:text-base xl:order-none ${focusRing}`}
          >
            Enquire
          </a>
        )}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const activeCentre = centres.find((centre) => pathname.startsWith(centre.href));
  const exploreItems = pathname === "/"
    ? [{ label: "Home", href: "/" }]
    : [
        { label: "Home", href: "/" },
        ...(!activeCentre ? [{ label: "Centres", href: "/centres" }] : []),
        ...getCentreNavItems(activeCentre?.href ?? centres[0].href),
      ];

  return (
    <footer className="bg-[#2f4431] px-5 pt-14 pb-0 text-[#fbf7ef] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_1.2fr_0.7fr] lg:gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/images/logoNurtureNest_v2.jpg"
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
              {[
                ...exploreItems,
              ].map((item) => (
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
                Confinement Care Finder & Booking Platform<br />
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
