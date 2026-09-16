import type { ReactNode } from "react";

/**
 * Shared masthead for interior pages: eyebrow, oversized serif title, lede,
 * and an optional strip of mono metadata. Paper ground with a light halo so
 * the page opens with atmosphere rather than a flat fill.
 */
export default function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: string;
  meta?: [string, string][];
}) {
  return (
    <header className="relative overflow-hidden border-b border-rule bg-paper-2">
      <div className="graph-paper absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="halo-paper absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p
          className="label reveal text-[0.58rem] text-acid-deep"
          style={{ "--d": "40ms" } as React.CSSProperties}
        >
          {eyebrow}
        </p>

        <h1
          className="display reveal mt-6 text-[3rem] leading-[0.9] sm:text-[4.5rem] lg:text-[5.5rem]"
          style={{ "--d": "110ms" } as React.CSSProperties}
        >
          {title}
        </h1>

        {lede && (
          <p
            className="lede reveal mt-8 max-w-2xl text-muted"
            style={{ "--d": "200ms" } as React.CSSProperties}
          >
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="reveal mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-rule pt-6"
            style={{ "--d": "280ms" } as React.CSSProperties}
          >
            {meta.map(([term, value]) => (
              <div key={term}>
                <dt className="label text-[0.52rem] text-muted">{term}</dt>
                <dd className="mt-2 font-mono text-sm">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
