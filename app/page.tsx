import Link from "next/link";
import CountUp from "@/components/CountUp";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import HeroTrace from "@/components/HeroTrace";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { countByStatus, getVisibleProducts } from "@/data/products";
import { site } from "@/lib/site";

const PRINCIPLES = [
  {
    title: "Research focused",
    body: "Materials are presented for in vitro and laboratory work by qualified researchers, with the intended use stated plainly on every listing.",
  },
  {
    title: "Patterson based",
    body: `Independently operated from ${site.location}, serving researchers who want a local, responsive point of contact.`,
  },
  {
    title: "Catalog, not commerce",
    body: "Each listing states the amount, availability, and reference pricing where configured. No ordering or checkout takes place on this site.",
  },
];

export default function HomePage() {
  const products = getVisibleProducts();

  return (
    <>
      {/* ── Hero slab ────────────────────────────────────────────────── */}
      <section className="on-ink relative overflow-hidden bg-ink text-on-ink">
        <div className="console-grid console-grid-drift absolute inset-0" aria-hidden="true" />
        <div className="halo halo-breathe absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24">
          <div className="grid gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div>
              <p
                className="label reveal text-[0.6rem] text-acid"
                style={{ "--d": "60ms" } as React.CSSProperties}
              >
                {site.location} &nbsp;/&nbsp; Research supply
              </p>

              <h1 className="mt-7 text-[3rem] leading-[0.9] sm:text-[4.5rem] lg:text-[5.75rem]">
                <span
                  className="display reveal block"
                  style={{ "--d": "120ms" } as React.CSSProperties}
                >
                  Research
                </span>
                <span
                  className="display reveal block"
                  style={{ "--d": "200ms" } as React.CSSProperties}
                >
                  materials for
                </span>
                <span
                  className="display-light reveal block text-acid"
                  style={{ "--d": "280ms" } as React.CSSProperties}
                >
                  qualified researchers.
                </span>
              </h1>

              <div
                className="rule-draw mt-10 h-px bg-rule-on-ink"
                style={{ "--d": "460ms" } as React.CSSProperties}
                aria-hidden="true"
              />

              <p
                className="lede reveal mt-8 max-w-xl text-on-ink-muted"
                style={{ "--d": "380ms" } as React.CSSProperties}
              >
                {site.name} is a Patterson based research company. We provide research materials
                intended solely for in vitro and laboratory research. This website is informational:
                it lists catalog details and does not process orders or payments.
              </p>

              <div
                className="reveal mt-10 flex flex-wrap items-center gap-3"
                style={{ "--d": "460ms" } as React.CSSProperties}
              >
                <Link
                  href="/catalog"
                  className="press group flex items-center gap-4 bg-acid px-6 py-4 text-ink hover:bg-on-ink"
                >
                  <span className="label text-[0.65rem]">View research catalog</span>
                  <span className="arrow-shift" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="label press border border-rule-on-ink px-6 py-4 text-[0.65rem] text-on-ink hover:border-acid hover:text-acid"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Catalog index — driven entirely by data/products.ts */}
            <aside
              className="reveal self-end border border-rule-on-ink bg-ink-2/60 backdrop-blur-[2px]"
              style={{ "--d": "560ms" } as React.CSSProperties}
            >
              <div className="flex items-center justify-between border-b border-rule-on-ink px-5 py-3">
                <p className="label text-[0.55rem] text-on-ink-muted">Catalog index</p>
                <p className="label text-[0.55rem] text-on-ink-muted">
                  {String(products.length).padStart(2, "0")} listings
                </p>
              </div>
              <ul className="divide-y divide-rule-on-ink">
                {products.map((product, index) => (
                  <li key={product.id}>
                    <Link
                      href={`/catalog#${product.id}`}
                      className="row-slide flex items-center justify-between gap-4 px-5 py-4 hover:bg-ink-3/40"
                    >
                      <span className="min-w-0">
                        <span className="label block text-[0.5rem] text-on-ink-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="display mt-1.5 block truncate text-xl text-on-ink transition-colors duration-300 hover:text-acid">
                          {product.name}
                        </span>
                      </span>
                      <StatusBadge status={product.status} tone="ink" className="shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-rule-on-ink px-5 py-3">
                <p className="label text-[0.5rem] text-on-ink-muted">Research use only</p>
                <Link href="/catalog" className="label link-sweep text-[0.5rem] text-acid">
                  Open catalog
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Self-drawing chromatogram trace along the bottom of the slab */}
        <HeroTrace className="pointer-events-none absolute inset-x-0 bottom-0 h-24 text-acid/45" />
      </section>

      {/* ── Figures ──────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper-2">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-rule sm:grid-cols-4 sm:divide-x">
          {[
            { value: products.length, label: "Catalog listings" },
            { value: countByStatus("available"), label: "Currently available" },
            { value: countByStatus("pending"), label: "Pending" },
            { value: 21, label: "Researcher acknowledgement", suffix: "+", pad: 0 },
          ].map((figure, index) => (
            <Reveal
              key={figure.label}
              motion="up"
              delay={index * 90}
              className={`px-5 py-8 sm:px-6 ${
                index < 2 ? "border-b border-rule sm:border-b-0" : ""
              } ${index % 2 === 0 ? "border-r border-rule sm:border-r-0" : ""}`}
            >
              <dt className="display text-5xl leading-none">
                <CountUp
                  value={figure.value}
                  pad={figure.pad ?? 2}
                  suffix={figure.suffix ?? ""}
                />
              </dt>
              <dd className="label mt-3 text-[0.55rem] text-muted">{figure.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Principles ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal as="p" motion="left" className="label text-[0.58rem] text-muted">
          How we operate
        </Reveal>
        <div className="mt-10 grid gap-px border border-rule bg-rule md:grid-cols-3">
          {PRINCIPLES.map((principle, index) => (
            <Reveal
              key={principle.title}
              delay={index * 110}
              className="group relative bg-paper p-7 transition-colors duration-300 hover:bg-paper-2"
            >
              <span className="label text-[0.55rem] text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="display mt-5 text-3xl leading-none">{principle.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">{principle.body}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-acid transition-transform duration-500 group-hover:scale-x-100"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Selected listings ────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 sm:pb-28">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
          <div>
            <p className="label text-[0.58rem] text-muted">Selection</p>
            <h2 className="display mt-4 text-5xl leading-none sm:text-6xl">From the catalog</h2>
          </div>
          <Link href="/catalog" className="label link-sweep press pb-1 text-[0.6rem]">
            All listings &rarr;
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} delay={index * 110} />
          ))}
        </div>
      </section>

      {/* ── Intended use ─────────────────────────────────────────────── */}
      <section className="on-ink relative overflow-hidden bg-ink text-on-ink">
        <div
          className="console-grid console-grid-drift absolute inset-0 opacity-70"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal motion="left">
              <p className="label text-[0.58rem] text-acid">Intended use</p>
              <h2 className="display mt-6 text-5xl leading-[0.92] sm:text-6xl">
                Stated plainly,
                <br />
                on every listing.
              </h2>
              <div className="trace-rule mt-8 w-28 opacity-80" aria-hidden="true" />
            </Reveal>
            <Reveal delay={140}>
              <p className="lede text-on-ink-muted">
                {site.name} provides research materials exclusively for qualified research purposes.
                Products displayed on this website are intended solely for in vitro and laboratory
                research and are not intended for human consumption, human administration,
                veterinary use, or diagnostic procedures. Products have not been evaluated by the
                U.S. Food and Drug Administration for safety or efficacy for human or veterinary
                use.
              </p>
              <DisclaimerBanner tone="ink" className="mt-8" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
