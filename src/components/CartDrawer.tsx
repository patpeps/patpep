"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { useCart, FREE_SHIPPING_THRESHOLD } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CartDrawer() {
  const { isOpen, closeCart, detailed, subtotal, shipping, total, setQuantity, remove } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col border-l border-border bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em]">
            <ShoppingCart className="h-4 w-4 text-accent" />
            Your cart
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-md p-1.5 text-muted hover:bg-surface-2 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-muted">Your cart is empty.</p>
            <Link
              href="/products"
              onClick={closeCart}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-[#05221f]"
            >
              Browse catalog
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {detailed.map(({ product, quantity, lineTotal }) => (
                <li key={product.slug} className="flex gap-3 px-5 py-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md border border-border bg-surface-2 text-[10px] font-mono text-accent">
                    {product.size}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={closeCart}
                        className="truncate text-sm font-medium hover:text-accent"
                      >
                        {product.name}
                      </Link>
                      <span className="shrink-0 text-sm">{formatPrice(lineTotal)}</span>
                    </div>
                    <p className="truncate text-xs text-muted">{product.subtitle}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-border">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() => setQuantity(product.slug, quantity - 1)}
                          className="p-1.5 text-muted hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-xs">{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() => setQuantity(product.slug, quantity + 1)}
                          className="p-1.5 text-muted hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => remove(product.slug)}
                        className="rounded-md p-1.5 text-muted hover:text-red-400"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4">
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="mb-3 rounded-md bg-accent-soft px-3 py-2 text-xs text-accent">
                  {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
              )}
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted">
                  <dt>Shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 font-semibold">
                  <dt>Total</dt>
                  <dd>{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-4 block rounded-md bg-accent px-4 py-2.5 text-center text-sm font-semibold text-[#05221f] transition-opacity hover:opacity-90"
              >
                Proceed to checkout
              </Link>
              <p className="mt-2 text-center text-[11px] text-muted">
                Research use only. Not for human or veterinary use.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
