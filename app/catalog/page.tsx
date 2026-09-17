import type { Metadata } from "next";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CatalogBrowser from "@/components/catalog/CatalogBrowser";
import { getActiveCategories, getVisibleProducts } from "@/data/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Research Catalog",
  description:
    "Catalog information for research materials supplied by Patterson Peptides for in vitro and laboratory research use. Informational only, with no ordering.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    title: `Research Catalog | ${site.name}`,
    description:
      "Catalog information for research materials supplied for in vitro and laboratory research use.",
    url: "/catalog",
  },
};

const KEY = [
  ["Available", "We have it on hand."],
  ["Coming Soon / Pending", "Not here yet, but it is on the way."],
  ["Unavailable", "We are not carrying this at the moment."],
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
        lede="Here is everything we carry, what it costs, and whether we actually have it right now. It is all for lab work only. There is no cart on this site, so if you want something, message us and we will sort it out from there."
        meta={[
          ["Listings", String(all.length).padStart(2, "0")],
          ["Categories", String(activeCategories.length).padStart(2, "0")],
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Reveal>
          <DisclaimerBanner className="max-w-3xl" />
        </Reveal>

        <p className="label mt-10 text-[0.55rem] text-muted">
          Click any listing for the full description and its reviews
        </p>

        {all.length === 0 ? (
          <p className="mt-6 border border-dashed border-rule-strong p-16 text-center text-sm text-muted">
            Nothing listed right now. Check back soon.
          </p>
        ) : (
          <CatalogBrowser products={all} categories={activeCategories} />
        )}

        {/* Availability key */}
        <Reveal as="section" className="mt-20 border border-rule bg-paper-2">
          <h2 className="label border-b border-rule px-6 py-4 text-[0.58rem] text-muted">
            What the labels mean
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
