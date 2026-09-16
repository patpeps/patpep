"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors hover:border-accent/40">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="grid-backdrop relative flex h-40 items-center justify-center border-b border-border bg-surface-2">
          <span className="rounded-md border border-accent/30 bg-background/70 px-3 py-1 font-mono text-xs text-accent">
            {product.size} &middot; {product.purity}
          </span>
          {!product.inStock && (
            <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted">
              Backordered
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold tracking-tight group-hover:text-accent">
            {product.name}
          </h3>
        </Link>
        <p className="mt-0.5 text-xs text-muted">{product.subtitle}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{product.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3 pt-2">
          <span className="text-lg font-semibold">{formatPrice(product.price)}</span>
          <button
            type="button"
            disabled={!product.inStock}
            onClick={() => add(product.slug)}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-sm font-medium text-[#05221f] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted"
          >
            <Plus className="h-3.5 w-3.5" />
            {product.inStock ? "Add" : "Sold out"}
          </button>
        </div>
      </div>
    </article>
  );
}
