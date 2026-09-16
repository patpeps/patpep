import Link from "next/link";
import { ArrowRight, FileCheck2, FlaskConical, Snowflake, Microscope } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

const PILLARS = [
  {
    icon: FileCheck2,
    title: "COA on every lot",
    body: "HPLC purity and mass-spec identity reports, lot-matched and downloadable before you order.",
  },
  {
    icon: Snowflake,
    title: "Cold-chain fulfillment",
    body: "Lyophilized under nitrogen, sealed with desiccant, and shipped in insulated packs with gel.",
  },
  {
    icon: Microscope,
    title: "Built for the bench",
    body: "Consistent fill weights, clear reconstitution guidance, and batch traceability for reproducible work.",
  },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <section className="grid-backdrop relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-xs text-accent">
            <FlaskConical className="h-3.5 w-3.5" />
            Research use only · Not for human consumption
          </span>
          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
            Research peptides your data can stand on.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            Patterson Peptides supplies independently verified reference compounds to academic,
            biotech, and contract research laboratories — with the analytics attached.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[#05221f] transition-opacity hover:opacity-90"
            >
              Browse the catalog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/quality"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium transition-colors hover:border-accent/50"
            >
              How we test
            </Link>
          </div>

          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              ["99%+", "Typical purity"],
              ["48 hr", "Order to ship"],
              ["100%", "Lots with COA"],
              ["12", "Compounds stocked"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-semibold text-accent">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-xl border border-border bg-surface p-5">
              <p.icon className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-base font-semibold tracking-tight">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured compounds</h2>
            <p className="mt-1 text-sm text-muted">Most requested by our research partners.</p>
          </div>
          <Link href="/products" className="shrink-0 text-sm text-accent hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight">Shop by research area</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <h3 className="text-sm font-semibold tracking-tight group-hover:text-accent">
                {c.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{c.blurb}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs text-accent">
                {products.filter((p) => p.category === c.id).length} compounds
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
