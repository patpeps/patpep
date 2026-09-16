import Link from "next/link";

export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent-soft">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-accent" fill="none" strokeWidth="1.6" stroke="currentColor">
          <path d="M5 4c0 5 14 11 14 16" strokeLinecap="round" />
          <path d="M19 4c0 5-14 11-14 16" strokeLinecap="round" />
          <path d="M8 7h8M7.5 12h9M8 17h8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight text-foreground">
          Patterson Peptides
        </span>
        {!compact && (
          <span className="block text-[10px] uppercase tracking-[0.18em] text-muted">
            Research Compounds
          </span>
        )}
      </span>
    </Link>
  );
}
