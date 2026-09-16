import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Patterson Peptides supplies independently verified research compounds to laboratories.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">About Patterson Peptides</h1>
      <p className="mt-5 text-base leading-relaxed text-muted">
        We started Patterson Peptides after years of watching good experiments fail for bad reasons:
        an unlabeled lot, a purity claim with no chromatogram behind it, a vial that arrived warm.
        Reagent quality is not a detail — it is the floor your data sits on.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Every compound we list is sourced from audited synthesis partners, independently verified by
        a third-party analytical lab, and released only when the chromatogram and mass spectrum both
        match specification. The reports travel with the lot, not with the marketing copy.
      </p>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">How we operate</h2>
      <ul className="mt-5 space-y-4">
        {[
          [
            "Audited supply",
            "Synthesis partners are qualified on site and re-audited annually. We do not drop-ship.",
          ],
          [
            "Independent verification",
            "Purity and identity are confirmed by a lab with no financial stake in the result.",
          ],
          [
            "Traceable lots",
            "Every vial carries a lot number that maps to its own COA, fill record, and ship date.",
          ],
          [
            "Research-only sales",
            "We sell to institutions and qualified researchers, and we decline orders that suggest human use.",
          ],
        ].map(([title, body]) => (
          <li key={title} className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold tracking-tight">Working on something specific?</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We handle custom synthesis, bulk quantities, and recurring supply agreements for ongoing
          studies.
        </p>
        <Link
          href="/contact"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-[#05221f]"
        >
          Talk to our team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
