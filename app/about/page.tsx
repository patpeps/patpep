import type { Metadata } from "next";
import Link from "next/link";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
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
    title: "Where we are",
    body: `${site.location}. We run this ourselves.`,
  },
  {
    title: "Who it is for",
    body: "Researchers doing in vitro and laboratory work. Not for people, not for animals.",
  },
  {
    title: "What this site is",
    body: "A catalog. It shows what we have and what it costs. You cannot check out here.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A small shop
            <br />
            in<span className="display-light"> Patterson.</span>
          </>
        }
        meta={[
          ["Location", site.location],
          ["Sells to", "Labs and researchers"],
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal motion="left" className="max-w-2xl">
            <p className="lede">
              {site.name} is a small research supply company in {site.location}. We sell research
              materials to people doing in vitro and laboratory work, and that is the whole
              business.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              We keep the catalog short on purpose. Every listing tells you what the material is,
              how much is in the vial, whether we have it, and what it costs. You will not find
              claims here about what anything does to a body, because that is not what we sell it
              for and it is not ours to say. Nothing on this site is medical advice.
            </p>

            <h2 className="display mt-14 text-4xl leading-none">Your side of it</h2>
            <div className="trace-rule mt-5 w-20 opacity-90" aria-hidden="true" />
            <p className="mt-6 text-sm leading-relaxed text-muted">
              Once it leaves us, the work is yours. You decide whether a material suits your
              experiment, you store and handle it safely, and you follow whatever rules apply where
              you are: your lab, your institution, your local ones. These materials belong in the
              hands of people trained to work with them.
            </p>

            <DisclaimerBanner className="mt-10" />

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="press group flex items-center gap-4 bg-ink px-6 py-4 text-on-ink hover:bg-acid hover:text-ink"
              >
                <span className="label text-[0.65rem]">See the catalog</span>
                <span className="arrow-shift" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
              <Link
                href="/contact"
                className="label press border border-rule-strong px-6 py-4 text-[0.65rem] hover:border-ink"
              >
                Contact
              </Link>
            </div>
          </Reveal>

          <Reveal as="aside" delay={140} className="border border-rule bg-paper-2">
            <h2 className="label border-b border-rule px-6 py-4 text-[0.55rem] text-muted">
              At a glance
            </h2>
            <dl className="divide-y divide-rule">
              {POINTS.map((point, index) => (
                <div key={point.title} className="row-slide px-6 py-6">
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
          </Reveal>
        </div>
      </div>
    </>
  );
}
