import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Wordmark: a bonded-residue glyph in a hairline square, set against the
 * display serif. `tone` matches the surface it sits on.
 */
export default function Logo({
  tone = "ink",
  showTagline = true,
}: {
  tone?: "ink" | "paper";
  showTagline?: boolean;
}) {
  const onInk = tone === "ink";

  return (
    <Link
      href="/"
      aria-label={`${site.name}, home`}
      className="group flex items-center gap-3"
    >
      <span
        className={`flex h-10 w-10 items-center justify-center border transition-colors duration-300 ${
          onInk
            ? "border-rule-on-ink group-hover:border-acid"
            : "border-rule-strong group-hover:border-acid-deep"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-5 w-5 transition-colors duration-300 ${
            onInk ? "text-acid" : "text-acid-deep"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M5.5 8.5 12 16l6.5-7.5" />
          <circle cx="5.5" cy="8.5" r="1.9" />
          <circle cx="18.5" cy="8.5" r="1.9" />
          <circle cx="12" cy="16" r="1.9" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`display block text-[1.35rem] ${onInk ? "text-on-ink" : "text-text"}`}
        >
          {site.name}
        </span>
        {showTagline && (
          <span
            className={`label mt-1.5 block text-[0.6rem] ${
              onInk ? "text-on-ink-muted" : "text-muted"
            }`}
          >
            {site.location}
          </span>
        )}
      </span>
    </Link>
  );
}
