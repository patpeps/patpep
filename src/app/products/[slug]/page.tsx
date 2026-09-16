import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, FileCheck2, Snowflake, TriangleAlert } from "lucide-react";
import AddToCart from "@/components/AddToCart";
import ProductCard from "@/components/ProductCard";
import { formatPrice, getProduct, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} (${product.size})`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const specs: [string, string][] = [
    ["Quantity", product.size],
    ["Purity", product.purity],
    ["CAS number", product.cas],
    ["Molecular weight", product.molecularWeight],
    ["Sequence", product.sequence],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/products"
        className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
      >
        <ChevronLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="grid-backdrop flex h-72 items-center justify-center rounded-xl border border-border bg-surface-2 sm:h-96">
          <div className="rounded-lg border border-accent/30 bg-background/70 px-6 py-5 text-center">
            <p className="font-mono text-sm text-accent">{product.name}</p>
            <p className="mt-1 font-mono text-xs text-muted">
              {product.size} &middot; {product.purity}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-accent">{product.category}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{product.name}</h1>
          <p className="mt-1 text-sm text-muted">{product.subtitle}</p>

          <p className="mt-6 text-3xl font-semibold">{formatPrice(product.price)}</p>
          <p className="mt-1 text-xs text-muted">
            {product.inStock ? "In stock — ships within 48 hours" : "Backordered — restocking soon"}
          </p>

          <div className="mt-6">
            <AddToCart slug={product.slug} inStock={product.inStock} />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="h-3.5 w-3.5 text-accent" /> Lot COA included
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Snowflake className="h-3.5 w-3.5 text-accent" /> Cold-pack shipping
            </span>
          </div>

          <div className="mt-6 flex gap-3 rounded-lg border border-amber-500/25 bg-amber-500/5 p-4 text-xs leading-relaxed text-amber-200/90">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              For laboratory research use only. Not for human or veterinary use, and not for
              diagnostic or therapeutic purposes. Handle in accordance with your institution&apos;s
              safety protocols.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold tracking-tight">Specifications</h2>
          <dl className="mt-4 overflow-hidden rounded-xl border border-border">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`grid grid-cols-[130px_1fr] gap-4 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-surface" : "bg-surface-2"
                }`}
              >
                <dt className="text-muted">{label}</dt>
                <dd className="break-words font-mono text-xs leading-relaxed">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="text-lg font-semibold tracking-tight">Common research applications</h2>
          <ul className="mt-4 space-y-2.5">
            {product.research.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em]">
            Handling &amp; storage
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">{product.storage}</p>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-lg font-semibold tracking-tight">Related compounds</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
