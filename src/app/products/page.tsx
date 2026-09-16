import type { Metadata } from "next";
import Catalog from "@/components/Catalog";
import { categories, type Category } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse third-party tested research peptides and reference standards.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const valid = categories.find((c) => c.id === category)?.id as Category | undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Research catalog</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        Every compound ships lyophilized with a lot-matched certificate of analysis. Products are
        sold for laboratory research only and are not for human or veterinary use.
      </p>
      <div className="mt-8">
        <Catalog initialCategory={valid} />
      </div>
    </div>
  );
}
