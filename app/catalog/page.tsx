import type { Metadata } from "next";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import ProductCard from "@/components/ProductCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getActiveCategories, getProductsByCategory, getVisibleProducts } from "@/data/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research Catalog",
  description:
    "Catalog information for research materials supplied by Patterson Peptides for in vitro and laboratory research use. Informational only — no ordering.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: `Research Catalog | ${site.name}`,
    description:
      "Catalog information for research materials supplied for in vitro and laboratory research use.",
    url: "/catalog",
  },
};

const KEY = [
  ["Available", "Currently listed as in stock for qualified research use."],
  ["Coming Soon / Pending", "Not currently offered. Listed for information only."],
  ["Unavailable", "Not currently offered and no timeline is listed."],
];

export default function CatalogPage() {
  const activeCategories = getActiveCategories();
  const all = getVisibleProducts();

  return (
    <>
      <PageHeader
        eyebrow="Catalog"
        title={
          <>
            Research
            <br />
            Catalog
          </>
        }
        lede={`The listings below describe research materials supplied by ${site.name} for in vitro and laboratory research by qualified researchers. Amounts, availability, and any reference pricing are shown for information only — this website does not provide ordering, purchasing, or payment functionality.`}
        meta={[
          ["Listings", String(all.length).padStart(2, "0")],
          ["Categories", String(activeCategories.length).padStart(2, "0")],
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <DisclaimerBanner className="max-w-3xl" />
        </Reveal>

        {activeCategories.length === 0 ? (
          <p className="mt-16 border border-dashed border-rule-strong p-16 text-center text-sm text-muted">
            No catalog listings are currently published.
          </p>
        ) : (
          <div className="mt-16 space-y-20">
            {activeCategories.map((category) => {
              const items = getProductsByCategory(category.id);
              return (
                <section key={category.id} aria-labelledby={`category-${category.id}`}>
                  <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
                    <div>
                      <h2 id={`category-${category.id}`} className="display text-4xl leading-none sm:text-5xl">
                        {category.label}
                      </h2>
                      <p className="mt-3 text-sm text-muted">{category.description}</p>
                    </div>
                    <p className="label pb-1 text-[0.55rem] text-muted">
                      {String(items.length).padStart(2, "0")}{" "}
                      {items.length === 1 ? "listing" : "listings"}
                    </p>
                  </Reveal>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={all.indexOf(product)}
                        delay={index * 80}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}

        {/* Availability key */}
        <Reveal as="section" className="mt-20 border border-rule bg-paper-2">
          <h2 className="label border-b border-rule px-6 py-4 text-[0.58rem] text-muted">
            Availability key
          </h2>
          <dl className="grid divide-y divide-rule sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {KEY.map(([term, definition], index) => (
              <div key={term} className="p-6">
                <dt className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`h-1.5 w-1.5 ${
                      index === 0 ? "bg-acid-deep" : index === 1 ? "bg-oxide" : "bg-rule-strong"
                    }`}
                  />
                  <span className="label text-[0.58rem]">{term}</span>
                </dt>
                <dd className="mt-3 text-xs leading-relaxed text-muted">{definition}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </>
  );
}
