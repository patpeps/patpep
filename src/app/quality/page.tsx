import type { Metadata } from "next";
import { Beaker, FileCheck2, PackageCheck, ScanLine, Snowflake, Thermometer } from "lucide-react";

export const metadata: Metadata = {
  title: "Quality & testing",
  description:
    "How Patterson Peptides verifies purity, identity, and stability on every research lot.",
};

const STEPS = [
  {
    icon: Beaker,
    title: "1 · Synthesis & release",
    body: "Solid-phase synthesis at an audited partner facility, followed by preparative HPLC purification and an internal release check.",
  },
  {
    icon: ScanLine,
    title: "2 · Independent verification",
    body: "A third-party lab runs reverse-phase HPLC for purity and ESI-MS for identity. Results must match the declared spec before a lot is listed.",
  },
  {
    icon: Thermometer,
    title: "3 · Stability & fill",
    body: "Material is lyophilized under nitrogen, fill-weight verified by sample audit, and sealed with desiccant in amber vials.",
  },
  {
    icon: PackageCheck,
    title: "4 · Release to catalog",
    body: "Each lot is assigned a traceable number linked to its chromatogram, spectrum, fill record, and expiry.",
  },
];

const ASSAYS = [
  ["RP-HPLC", "Purity, typically reported to 0.1%"],
  ["ESI-MS", "Molecular identity confirmation"],
  ["Karl Fischer", "Residual moisture in lyophilized cake"],
  ["Acetate content", "Counter-ion quantification"],
  ["Endotoxin (on request)", "LAL testing for sensitive assays"],
  ["Appearance", "Visual cake and reconstitution check"],
];

export default function QualityPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Quality &amp; testing</h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
        A purity number without a chromatogram is a claim, not a result. Here is exactly what happens
        between synthesis and the vial that reaches your bench.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {STEPS.map((s) => (
          <div key={s.title} className="rounded-xl border border-border bg-surface p-5">
            <s.icon className="h-5 w-5 text-accent" />
            <h2 className="mt-4 text-sm font-semibold tracking-tight">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">Assays we run</h2>
      <dl className="mt-5 overflow-hidden rounded-xl border border-border">
        {ASSAYS.map(([name, detail], i) => (
          <div
            key={name}
            className={`grid grid-cols-[170px_1fr] gap-4 px-4 py-3.5 text-sm ${
              i % 2 === 0 ? "bg-surface" : "bg-surface-2"
            }`}
          >
            <dt className="font-medium">{name}</dt>
            <dd className="text-muted">{detail}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <FileCheck2 className="h-5 w-5 text-accent" />
          <h3 className="mt-4 text-sm font-semibold tracking-tight">Requesting a COA</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Email the lot number printed on your vial and we will send the full analytical packet,
            including raw chromatograms, the same business day.
          </p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <Snowflake className="h-5 w-5 text-accent" />
          <h3 className="mt-4 text-sm font-semibold tracking-tight">Cold-chain handling</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Orders ship in insulated mailers with gel packs. On arrival, store lyophilized material
            at -20 °C and protect from light; reconstituted material belongs at 2–8 °C.
          </p>
        </div>
      </div>
    </div>
  );
}
