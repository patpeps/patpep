"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "label press group relative block py-1 text-[0.63rem]",
                      active ? "text-acid" : "text-on-ink-muted hover:text-on-ink",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 h-px w-full bg-acid transition-transform duration-300",
                        active
                          ? "origin-left scale-x-100"
                          : "origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100",
                      )}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

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
          className="border-t border-rule-on-ink/70 bg-ink-2 lg:hidden"
        >
          <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <li
                  key={item.href}
                  className="reveal border-b border-rule-on-ink/40 last:border-0"
                  style={{ "--d": `${index * 45}ms` } as React.CSSProperties}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className="row-slide -mx-2 flex items-baseline justify-between px-2 py-4"
                  >
                    <span
                      className={cn(
                        "display text-[1.75rem]",
                        active ? "text-acid" : "text-on-ink",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="label text-[0.58rem] text-on-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="label mx-auto max-w-6xl px-4 pb-5 pt-2 text-[0.55rem] text-on-ink-muted sm:px-6">
            {site.location}
          </p>
        </nav>
      )}
    </header>
  );
}
