import { FileText } from "lucide-react";

export interface LegalSection {
  id: string;
  title: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

/**
 * Shared layout for Disclaimer / Terms / Privacy. Pass the content as
 * `sections` — the table of contents and anchors are generated automatically.
 */
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
  footnote,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
  footnote?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-xs text-muted">Last updated: {updated}</p>
      <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>

      <nav aria-label="On this page" className="mt-8 rounded-xl border border-border bg-surface p-5">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
          <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          On this page
        </h2>
        <ol className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="text-sm text-muted transition-colors hover:text-accent"
              >
                {index + 1}. {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-10 space-y-10">
        {sections.map((section, index) => (
          <section key={section.id} id={section.id} className="scroll-mt-28">
            <h2 className="text-lg font-semibold tracking-tight">
              {index + 1}. {section.title}
            </h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-4 space-y-2">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {footnote && (
        <p className="mt-12 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
          {footnote}
        </p>
      )}
    </div>
  );
}
