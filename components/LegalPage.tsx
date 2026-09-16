import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

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
 * sticky index. Pass the content as `sections`; numbering and anchors are
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
      {/* Reading progress. Renders only where scroll-driven animation works. */}
      <div className="scroll-progress" aria-hidden="true" />

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
          <Reveal
            as="nav"
            motion="left"
            aria-label="On this page"
            className="lg:sticky lg:top-40 lg:self-start"
          >
            <h2 className="label border-b border-rule pb-3 text-[0.55rem] text-muted">
              On this page
            </h2>
            <ol className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="row-slide -mx-2 flex gap-3 px-2 py-1.5 text-sm leading-snug text-muted transition-colors duration-200 hover:text-text"
                  >
                    <span className="label shrink-0 pt-0.5 text-[0.52rem] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Body */}
          <div className="max-w-2xl space-y-14">
            {sections.map((section, index) => (
              <Reveal
                key={section.id}
                as="section"
                id={section.id}
                delay={index === 0 ? 80 : 0}
                className="scroll-mt-40"
              >
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
                      <li key={bullet} className="row-slide flex gap-4 py-3.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 shrink-0 bg-acid-deep"
                        />
                        <span className="text-sm leading-relaxed text-muted">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}

            {footnote && (
              <Reveal
                as="p"
                className="border-l-2 border-oxide bg-oxide-soft/60 py-4 pl-5 pr-4 text-sm leading-relaxed"
              >
                {footnote}
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
