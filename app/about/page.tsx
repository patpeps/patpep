import type { Metadata } from "next";
import Link from "next/link";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import PageHeader from "@/components/PageHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Patterson Peptides is a Patterson, California based research company providing research materials for qualified laboratory and in vitro research purposes.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About | ${site.name}`,
    description:
      "A Patterson, California based research company providing materials for qualified laboratory research.",
    url: "/about",
  },
};

const POINTS = [
  {
    title: "Patterson based",
    body: `${site.name} is independently operated from ${site.location}.`,
  },
  {
    title: "Research purposes only",
    body: "Materials are supplied for in vitro and laboratory research carried out by qualified researchers. They are not supplied for human or veterinary use.",
  },
  {
    title: "Informational website",
    body: "This website lists catalog information. It does not provide ordering, purchasing, checkout, or payment functionality.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A research
            <br />
            company in
            <br />
            <em className="italic">Patterson.</em>
          </>
        }
        meta={[
          ["Location", site.location],
          ["Focus", "In vitro / laboratory research"],
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="max-w-2xl">
            <p className="lede">
              {site.name} is a research company based in {site.location}. We focus on providing
              research materials to qualified researchers and laboratories for in vitro and
              laboratory research purposes.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Our catalog is intentionally small and clearly described. Each listing states the
              material, the amount where applicable, its current availability, and its intended
              research use. We do not describe our materials in terms of health, therapeutic,
              performance, or disease-related outcomes, and nothing on this website should be read
              as medical advice.
            </p>

            <h2 className="display mt-14 text-4xl leading-none">Researcher responsibility</h2>
            <div className="trace-rule mt-5 w-20 opacity-90" aria-hidden="true" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Researchers are responsible for determining whether a material is appropriate for
              their work, for handling and storing it safely, and for complying with the laws,
              regulations, and institutional policies that apply to them. Materials should be
              handled only by individuals trained in laboratory practice and appropriate safety
              procedures.
            </p>

            <DisclaimerBanner className="mt-10" />

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="group flex items-center gap-4 bg-ink px-6 py-4 text-on-ink transition-colors duration-200 hover:bg-acid hover:text-ink"
              >
                <span className="label text-[0.65rem]">View research catalog</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
              <Link
                href="/contact"
                className="label border border-rule-strong px-6 py-4 text-[0.65rem] transition-colors duration-200 hover:border-ink"
              >
                Contact
              </Link>
            </div>
          </div>

          <aside className="border border-rule bg-paper-2">
            <h2 className="label border-b border-rule px-6 py-4 text-[0.55rem] text-muted">
              At a glance
            </h2>
            <dl className="divide-y divide-rule">
              {POINTS.map((point, index) => (
                <div key={point.title} className="px-6 py-6">
                  <dt className="flex items-baseline gap-3">
                    <span className="label text-[0.52rem] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="display text-2xl leading-none">{point.title}</span>
                  </dt>
                  <dd className="mt-3 pl-9 text-sm leading-relaxed text-muted">{point.body}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </>
  );
}
