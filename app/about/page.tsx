import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, MapPin, Microscope } from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
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
    icon: MapPin,
    title: "Patterson based",
    body: `${site.name} is independently operated from ${site.location}.`,
  },
  {
    icon: Microscope,
    title: "Research purposes only",
    body: "Materials are supplied for in vitro and laboratory research carried out by qualified researchers. They are not supplied for human or veterinary use.",
  },
  {
    icon: ClipboardCheck,
    title: "Informational website",
    body: "This website lists catalog information. It does not provide ordering, purchasing, checkout, or payment functionality.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">About</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">About {site.name}</h1>

      <p className="mt-6 text-base leading-relaxed text-muted">
        {site.name} is a research company based in {site.location}. We focus on providing research
        materials to qualified researchers and laboratories for in vitro and laboratory research
        purposes.
      </p>
      <p className="mt-4 text-base leading-relaxed text-muted">
        Our catalog is intentionally small and clearly described. Each listing states the material,
        the amount where applicable, its current availability, and its intended research use. We do
        not describe our materials in terms of health, therapeutic, performance, or disease-related
        outcomes, and nothing on this website should be read as medical advice.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {POINTS.map((point) => (
          <div key={point.title} className="rounded-xl border border-border bg-background p-5 shadow-sm">
            <point.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            <h2 className="mt-3 text-sm font-semibold tracking-tight">{point.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold tracking-tight">Researcher responsibility</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Researchers are responsible for determining whether a material is appropriate for their
        work, for handling and storing it safely, and for complying with the laws, regulations, and
        institutional policies that apply to them. Materials should be handled only by individuals
        trained in laboratory practice and appropriate safety procedures.
      </p>

      <DisclaimerBanner className="mt-8" />

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          View research catalog <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
