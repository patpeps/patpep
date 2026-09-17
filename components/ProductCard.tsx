"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import StatusBadge from "@/components/StatusBadge";
import StarRating from "@/components/reviews/StarRating";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Specimen record card. Every value comes from /data/products.ts. This site
 * is informational, so there is no ordering, cart, or checkout anywhere.
 *
 * With `onOpen` the whole card becomes one button that opens the detail
 * popup. Without it the card is plain, which is how the home page uses it.
 */
export default function ProductCard({
  product,
  index,
  delay = 0,
  reviewCount = 0,
  rating = null,
  onOpen,
}: {
  product: Product;
  index?: number;
  delay?: number;
  reviewCount?: number;
  /** Average of published reviews, or null when there are none yet. */
  rating?: number | null;
  onOpen?: () => void;
}) {
  const muted = product.status !== "available";

  return (
    <Reveal
      as="article"
      motion="up"
      delay={delay}
      id={product.id}
      className={cn(
        "press-card group relative flex scroll-mt-32 flex-col border border-rule bg-paper hover:border-ink",
        onOpen && "cursor-pointer",
      )}
    >
      {/* Record header */}
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="label text-[0.55rem] text-muted">
          {typeof index === "number" ? `Rec. ${String(index + 1).padStart(3, "0")}` : "Record"}
        </span>
        {/* Label rolls over to the status on hover. */}
        <span className="label relative block h-3.5 w-36 overflow-hidden text-right text-[0.55rem] text-muted">
          <span className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-full">
            Research use only
          </span>
          <span
            className="absolute inset-0 translate-y-full text-acid-deep transition-transform duration-500 group-hover:translate-y-0"
            aria-hidden="true"
          >
            {product.status === "available" ? "In stock" : "See status"}
          </span>
        </span>
      </div>

      {/* Plate */}
      <div className="graph-paper relative flex h-44 items-center justify-center overflow-hidden border-b border-rule bg-paper-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-700 group-hover:scale-105",
              muted && "opacity-75 saturate-50",
            )}
          />
        ) : (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "display text-6xl leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]",
                muted ? "text-rule-strong" : "text-ink/85",
              )}
            >
              {product.amount ?? "TBC"}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
            />
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-[1.9rem] leading-none transition-colors duration-300">
          {product.name}
        </h3>
        {product.subtitle && (
          <p className="label mt-2.5 text-[0.58rem] text-muted">{product.subtitle}</p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <StatusBadge status={product.status} />
          {rating !== null && reviewCount > 0 && (
            <span className="flex items-center gap-2">
              <StarRating value={rating} />
              <span className="label text-[0.5rem] text-muted">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            </span>
          )}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

        <dl className="mt-5 divide-y divide-rule border-y border-rule">
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label text-[0.55rem] text-muted">Amount</dt>
            <dd className="font-mono text-sm">{product.amount ?? "TBC"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label text-[0.55rem] text-muted">Reference price</dt>
            <dd className="font-mono text-sm">{product.price ?? "Ask us"}</dd>
          </div>
        </dl>

        {onOpen ? (
          <p className="mt-5 flex items-center justify-between gap-3 border-t border-rule pt-4">
            <span className="label text-[0.55rem] text-acid-deep">
              {reviewCount > 0
                ? `Details and ${reviewCount} ${reviewCount === 1 ? "review" : "reviews"}`
                : "Details and reviews"}
            </span>
            <span className="arrow-shift text-sm" aria-hidden="true">
              &rarr;
            </span>
          </p>
        ) : (
          <p className="mt-4 text-xs leading-relaxed text-muted">{product.disclaimer}</p>
        )}
      </div>

      {/* Accent rule on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-acid transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* The whole card is the control. Sits above the card, below the modal. */}
      {onOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="absolute inset-0 z-10"
          aria-label={`Open details and reviews for ${product.name}`}
        />
      )}
    </Reveal>
  );
}
