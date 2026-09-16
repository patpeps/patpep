import type { Metadata } from "next";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import ProductCard from "@/components/ProductCard";
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

export default function CatalogPage() {
  const activeCategories = getActiveCategories();
  const total = getVisibleProducts().length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Research Catalog</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          The listings below describe research materials supplied by {site.name} for in vitro and
          laboratory research by qualified researchers. Amounts, availability, and any reference
          pricing are shown for information only — this website does not provide ordering,
          purchasing, or payment functionality.
        </p>
      </header>

      <DisclaimerBanner className="mt-8 max-w-3xl" />

      <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted">
        {total} listing{total === 1 ? "" : "s"}
      </p>

      {activeCategories.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
          No catalog listings are currently published.
        </p>
      ) : (
        <div className="mt-4 space-y-14">
          {activeCategories.map((category) => {
            const items = getProductsByCategory(category.id);
            return (
              <section key={category.id} aria-labelledby={`category-${category.id}`}>
                <div className="border-b border-border pb-4">
                  <h2
                    id={`category-${category.id}`}
                    className="text-xl font-semibold tracking-tight"
                  >
                    {category.label}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{category.description}</p>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <section className="mt-16 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-base font-semibold tracking-tight">Availability key</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            ["Available", "Currently listed as in stock for qualified research use."],
            ["Coming Soon / Pending", "Not currently offered. Listed for information only."],
            ["Unavailable", "Not currently offered and no timeline is listed."],
          ].map(([term, definition]) => (
            <div key={term}>
              <dt className="text-sm font-medium">{term}</dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted">{definition}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
