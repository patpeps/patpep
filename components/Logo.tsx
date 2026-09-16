import Link from "next/link";
import { site } from "@/lib/site";

/** Wordmark + molecule glyph. Links home. */
export default function Logo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-md border border-accent/25 bg-accent-soft transition-colors group-hover:border-accent/50">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 text-accent"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="6" cy="7" r="2" />
          <circle cx="18" cy="7" r="2" />
          <circle cx="12" cy="17" r="2" />
          <path d="M7.7 8.5 10.7 15.2M16.3 8.5 13.3 15.2M8 7h8" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight text-foreground">
          {site.name}
        </span>
        {showTagline && (
          <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            {site.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
