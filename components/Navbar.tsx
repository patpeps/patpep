"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import InstagramIcon from "@/components/InstagramIcon";
import Logo from "@/components/Logo";
import Marquee from "@/components/Marquee";
import { navItems, RESEARCH_USE_NOTICE, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const TICKER = [
  "Research use only",
  RESEARCH_USE_NOTICE,
  "Not for use in diagnostic procedures",
  site.location,
  "In vitro / laboratory research",
  "Qualified researchers only",
  "21+",
];

export default function Navbar() {
  const pathname = usePathname();
  // The menu is open only for the route it was opened on, so navigating
  // closes it without needing an effect.
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="on-ink sticky top-0 z-40 bg-ink text-on-ink">
      {/* Standing notice ticker */}
      <div className="flex items-center gap-4 border-b border-rule-on-ink/70 px-4 py-2 sm:px-6">
        <span className="live-dot h-1.5 w-1.5 shrink-0 bg-acid" aria-hidden="true" />
        <Marquee items={TICKER} duration={22} />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Logo tone="ink" />

        <div className="hidden items-center gap-7 lg:flex">
          <nav aria-label="Main navigation">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "label press relative block py-1 text-[0.63rem]",
                        active ? "text-acid" : "text-on-ink-muted hover:text-on-ink",
                      )}
                    >
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px w-full bg-acid transition-transform duration-300",
                          active
                            ? "origin-left scale-x-100"
                            : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-within:origin-left group-focus-within:scale-x-100",
                        )}
                        aria-hidden="true"
                      />
                    </Link>

                    {/* What the page is for. Visual only: the menu panel and the
                        page itself carry this text for assistive tech. */}
                    {item.description && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-[calc(100%+1.1rem)] w-60 translate-y-1 border border-rule-on-ink bg-ink-2 p-3.5 text-xs leading-relaxed text-on-ink-muted opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                      >
                        <span className="mb-2 block h-px w-8 bg-acid" />
                        {item.description}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="press group flex items-center gap-2.5 border border-acid/50 bg-acid/10 px-4 py-2.5 hover:bg-acid"
          >
            <InstagramIcon className="h-3.5 w-3.5 text-acid group-hover:text-ink" />
            <span className="label text-[0.6rem] text-acid group-hover:text-ink">Message us</span>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpenForPath(open ? null : pathname)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="press flex h-10 w-10 items-center justify-center border border-rule-on-ink hover:border-acid lg:hidden"
        >
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 block h-px w-4 bg-current transition-all duration-300",
                open ? "top-1.5 rotate-45 bg-acid" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-px bg-current transition-all duration-200",
                open ? "w-0 opacity-0" : "w-4 opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-4 bg-current transition-all duration-300",
                open ? "top-1.5 -rotate-45 bg-acid" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="max-h-[calc(100vh-8rem)] overflow-y-auto border-t border-rule-on-ink/70 bg-ink-2 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className="reveal border-b border-rule-on-ink/40 last:border-0"
                  style={{ "--d": `${index * 50}ms` } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="row-slide -mx-2 block px-2 py-4"
                  >
                    <span className="flex items-baseline justify-between gap-4">
                      <span
                        className={cn(
                          "display text-[1.6rem]",
                          active ? "text-acid" : "text-on-ink",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="label shrink-0 text-[0.55rem] text-on-ink-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    {item.description && (
                      <span className="mt-1.5 block max-w-md text-xs leading-relaxed text-on-ink-muted">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6">
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press group flex items-center justify-between gap-4 bg-acid px-5 py-4 text-ink hover:bg-on-ink"
            >
              <span className="flex items-center gap-3">
                <InstagramIcon className="h-4 w-4" />
                <span className="label text-[0.65rem]">Message us on Instagram</span>
              </span>
              <span className="arrow-shift" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <p className="label mt-4 text-[0.55rem] text-on-ink-muted">
              {site.instagramHandle} &nbsp;&middot;&nbsp; {site.location}
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
