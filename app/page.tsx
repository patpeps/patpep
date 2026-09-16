import Link from "next/link";
import CountUp from "@/components/CountUp";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import HeroTrace from "@/components/HeroTrace";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import { countByStatus, getVisibleProducts } from "@/data/products";
import { site } from "@/lib/site";

const PRINCIPLES = [
  {
    title: "Made for the bench",
    body: "Everything we carry is meant for lab work, and we say so on every listing. We do not dress it up as anything else.",
  },
  {
    title: "Small and local",
    body: `We run this ourselves out of ${site.location}. Ask a question and you are talking to the people who handle the material.`,
  },
  {
    title: "A catalog, not a store",
    body: "Each listing shows the amount, whether we have it, and the price where we have set one. There is no cart and no checkout.",
  },
];

const BAND = [
  "Research use only",
  "Patterson, California",
  "In vitro only",
  "Not for human or veterinary use",
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
                We are a small research supply company in {site.location}. Everything we carry is
                for laboratory work only. This site is the catalog: you can see what we have, how
                much of it, and what it costs. You cannot order here.
              </p>

              <div
                className="reveal mt-10 flex flex-wrap items-center gap-3"
                style={{ "--d": "460ms" } as React.CSSProperties}
              >
                <Link
                  href="/catalog"
                  className="press group flex items-center gap-4 bg-acid px-6 py-4 text-ink hover:bg-on-ink"
                >
                  <span className="label text-[0.65rem]">See what we have</span>
                  <span className="arrow-shift" aria-hidden="true">
                    &rarr;
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="label press border border-rule-on-ink px-6 py-4 text-[0.65rem] text-on-ink hover:border-acid hover:text-acid"
                >
                  Ask us something
                </Link>
              </div>
            </div>

            {/* Catalog index, driven entirely by data/products.ts */}
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

      {/* ── Moving band ──────────────────────────────────────────────── */}
      <div className="border-y border-rule bg-acid py-4 text-ink">
        <Marquee
          items={BAND}
          size="lg"
          duration={34}
          reverse
          itemClassName="text-ink"
          dotClassName="bg-ink"
        />
      </div>

      {/* ── Figures ──────────────────────────────────────────────────── */}
      <section className="border-b border-rule bg-paper-2">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-rule sm:grid-cols-4 sm:divide-x">
          {[
            { value: products.length, label: "Things we list" },
            { value: countByStatus("available"), label: "In stock now" },
            { value: countByStatus("pending"), label: "On the way" },
            { value: 21, label: "Minimum age to browse", suffix: "+", pad: 0 },
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
                <CountUp value={figure.value} pad={figure.pad ?? 2} suffix={figure.suffix ?? ""} />
              </dt>
              <dd className="label mt-3 text-[0.55rem] text-muted">{figure.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ── Principles ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <Reveal as="p" motion="left" className="label text-[0.58rem] text-muted">
          How we work
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
            <p className="label text-[0.58rem] text-muted">What we carry</p>
            <h2 className="display mt-4 text-5xl leading-none sm:text-6xl">In the catalog</h2>
          </div>
          <Link href="/catalog" className="label link-sweep press pb-1 text-[0.6rem]">
            See all &rarr;
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
              <p className="label text-[0.58rem] text-acid">What this is for</p>
              <h2 className="display mt-6 text-5xl leading-[0.92] sm:text-6xl">
                Read this part
                <br />
                before you order.
              </h2>
              <div className="trace-rule mt-8 w-28 opacity-80" aria-hidden="true" />
            </Reveal>
            <Reveal delay={140}>
              <p className="lede text-on-ink-muted">
                {site.name} sells to researchers, for research. What we list is meant for in vitro
                and laboratory use and nothing else: not for people, not for animals, and not for
                diagnosing anything. None of it has been evaluated by the U.S. Food and Drug
                Administration for safety or efficacy in humans or animals.
              </p>
              <DisclaimerBanner tone="ink" className="mt-8" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
