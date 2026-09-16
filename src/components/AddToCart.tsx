"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export default function AddToCart({ slug, inStock }: { slug: string; inStock: boolean }) {
  const { add } = useCart();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center rounded-md border border-border bg-surface-2">
        <button
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-2.5 text-muted hover:text-foreground"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQuantity((q) => Math.min(99, q + 1))}
          className="px-3 py-2.5 text-muted hover:text-foreground"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
      <button
        type="button"
        disabled={!inStock}
        onClick={() => add(slug, quantity)}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[#05221f] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-surface-2 disabled:text-muted sm:flex-none"
      >
        <ShoppingCart className="h-4 w-4" />
        {inStock ? "Add to cart" : "Currently backordered"}
      </button>
    </div>
  );
}
