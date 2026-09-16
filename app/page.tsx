import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  FlaskConical,
  Mail,
  MapPin,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import ProductCard from "@/components/ProductCard";
import { countByStatus, getVisibleProducts } from "@/data/products";
import { site } from "@/lib/site";

const PILLARS = [
  {
    icon: Microscope,
    title: "Research focused",
    body: "Materials are presented for in vitro and laboratory work by qualified researchers, with the intended use stated plainly on every listing.",
  },
  {
    icon: MapPin,
    title: "Patterson based",
    body: `Independently operated from ${site.location}, serving researchers who want a local, responsive point of contact.`,
  },
  {
    icon: ClipboardList,
    title: "Clear catalog information",
    body: "Each listing states the amount, availability, and reference pricing where configured. No ordering or checkout takes place on this site.",
  },
];

export default function HomePage() {
  const products = getVisibleProducts();
  const featured = products.slice(0, 3);

  return (
    <>
      <section className="lab-grid relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="animate-fade-up max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              Research Use Only &middot; {site.location}
            </span>

            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Research materials for qualified researchers.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {site.name} is a Patterson based research company. We provide research materials
              intended solely for in vitro and laboratory research. This website is informational:
              it lists catalog details and does not process orders or payments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
              >
                View research catalog <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-medium transition-colors hover:border-accent/50 hover:text-accent"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Contact us
              </Link>
            </div>
          </div>

          <dl className="animate-fade-up mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3">
            {[
              [String(products.length), "Catalog listings"],
              [String(countByStatus("available")), "Currently available"],
              [String(countByStatus("pending")), "Pending"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-3xl font-semibold text-accent">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-xl border border-border bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              <pillar.icon className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="mt-4 text-base font-semibold tracking-tight">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">From the research catalog</h2>
            <p className="mt-1 text-sm text-muted">
              Availability and amounts are listed for reference. No ordering functionality is
              provided.
            </p>
          </div>
          <Link
            href="/catalog"
            className="shrink-0 text-sm font-medium text-accent hover:text-accent-hover hover:underline"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10">
          <ShieldCheck className="h-6 w-6 text-accent" aria-hidden="true" />
          <h2 className="mt-4 text-2xl font-semibold tracking-tight">
            Intended use, stated plainly
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
            {site.name} provides research materials exclusively for qualified research purposes.
            Products displayed on this website are intended solely for in vitro and laboratory
            research and are not intended for human consumption, human administration, veterinary
            use, or diagnostic procedures. Products have not been evaluated by the U.S. Food and
            Drug Administration for safety or efficacy for human or veterinary use.
          </p>
          <DisclaimerBanner className="mt-6 max-w-3xl" />
        </div>
      </section>
    </>
  );
}
