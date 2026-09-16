"use client";

import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, CreditCard, Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";

export default function CheckoutPage() {
  const { detailed, subtotal, shipping, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setReference(`PP-${Math.floor(100000 + Math.random() * 899999)}`);
    setSubmitted(true);
    clear();
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Order request received</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Reference <span className="font-mono text-foreground">{reference}</span>. Our team will
          email a payment link and lot-matched certificates of analysis before the order ships.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[#05221f]"
        >
          Continue browsing
        </Link>
      </div>
    );
  }

  if (detailed.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your cart is empty</h1>
        <p className="mt-3 text-sm text-muted">Add a compound to begin an order request.</p>
        <Link
          href="/products"
          className="mt-8 inline-block rounded-md bg-accent px-5 py-3 text-sm font-semibold text-[#05221f]"
        >
          Browse catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Checkout</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Orders are reviewed for research eligibility before a secure payment link is issued. No card
        details are collected on this page.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Fieldset title="Contact">
            <Field label="Full name" name="name" autoComplete="name" required />
            <Field label="Work email" name="email" type="email" autoComplete="email" required />
            <Field label="Institution or company" name="institution" required />
          </Fieldset>

          <Fieldset title="Shipping address">
            <Field label="Street address" name="address" autoComplete="street-address" required />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="City" name="city" autoComplete="address-level2" required />
              <Field label="State / region" name="region" autoComplete="address-level1" required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Postal code" name="postal" autoComplete="postal-code" required />
              <Field label="Country" name="country" autoComplete="country-name" required />
            </div>
          </Fieldset>

          <Fieldset title="Research attestation">
            <label className="flex gap-3 text-sm leading-relaxed text-muted">
              <input
                type="checkbox"
                required
                className="mt-1 h-4 w-4 shrink-0 accent-[color:var(--accent)]"
              />
              I confirm these materials are purchased for laboratory research use only, will not be
              administered to humans or animals, and will be handled by qualified personnel.
            </label>
          </Fieldset>

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3.5 text-sm font-semibold text-[#05221f] transition-opacity hover:opacity-90"
          >
            <CreditCard className="h-4 w-4" />
            Submit order request
          </button>
          <p className="flex items-center justify-center gap-1.5 text-xs text-muted">
            <Lock className="h-3 w-3" /> A secure payment link follows by email.
          </p>
        </form>

        <aside className="h-fit rounded-xl border border-border bg-surface p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em]">Order summary</h2>
          <ul className="mt-4 divide-y divide-border">
            {detailed.map(({ product, quantity, lineTotal }) => (
              <li key={product.slug} className="flex justify-between gap-3 py-3 text-sm">
                <span className="min-w-0">
                  <span className="block truncate font-medium">{product.name}</span>
                  <span className="text-xs text-muted">
                    {product.size} &times; {quantity}
                  </span>
                </span>
                <span className="shrink-0">{formatPrice(lineTotal)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1.5 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between pt-2 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="mb-3 text-sm font-semibold uppercase tracking-[0.14em]">{title}</legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  name,
  type = "text",
  ...rest
}: { label: string; name: string; type?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs text-muted">{label}</span>
      <input
        id={name}
        name={name}
        type={type}
        {...rest}
        className="w-full rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-accent/60"
      />
    </label>
  );
}
