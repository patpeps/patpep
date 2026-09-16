import PageHeader from "@/components/PageHeader";

export interface LegalSection {
  id: string;
  title: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** Optional bullet list rendered after the paragraphs. */
  bullets?: string[];
}

/**
 * Shared layout for Disclaimer / Terms / Privacy: editorial two-column with a
 * sticky index. Pass the content as `sections` — numbering and anchors are
 * generated automatically.
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
  title: React.ReactNode;
  intro: string;
  updated: string;
  sections: LegalSection[];
  footnote?: string;
}) {
  return (
    <>
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        lede={intro}
        meta={[
          ["Last updated", updated],
          ["Sections", String(sections.length).padStart(2, "0")],
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
          {/* Index */}
          <nav aria-label="On this page" className="lg:sticky lg:top-36 lg:self-start">
            <h2 className="label border-b border-rule pb-3 text-[0.55rem] text-muted">
              On this page
            </h2>
            <ol className="mt-4 space-y-2.5">
              {sections.map((section, index) => (
                <li key={section.id} className="flex gap-3">
                  <span className="label shrink-0 pt-0.5 text-[0.52rem] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={`#${section.id}`}
                    className="link-sweep text-sm leading-snug text-muted transition-colors duration-200 hover:text-text"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Body */}
          <div className="max-w-2xl space-y-14">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-36">
                <div className="flex items-baseline gap-4 border-b border-rule pb-4">
                  <span className="label text-[0.55rem] text-acid-deep">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display text-3xl leading-none sm:text-4xl">{section.title}</h2>
                </div>

                <div className="mt-5 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-5 divide-y divide-rule border-y border-rule">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-4 py-3.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-acid-deep"
                        />
                        <span className="text-sm leading-relaxed text-muted">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {footnote && (
              <p className="border-l-2 border-oxide bg-oxide-soft/60 py-4 pl-5 pr-4 text-sm leading-relaxed">
                {footnote}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
