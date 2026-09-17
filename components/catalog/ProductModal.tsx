"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import StatusBadge from "@/components/StatusBadge";
import StarRating from "@/components/reviews/StarRating";
import type { Product } from "@/data/products";
import { averageRating, formatReviewDate, type Review } from "@/lib/reviews";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Detail popup for one catalog listing. Same construction as the researcher
 * gate: ink panel, focus trap, scroll lock. Unlike the gate this one can be
 * dismissed, with Escape, the close button, or a click outside it.
 */
export default function ProductModal({
  product,
  reviews,
  onClose,
  onWriteReview,
  onSeeReviews,
}: {
  product: Product;
  reviews: Review[];
  onClose: () => void;
  onWriteReview: (productId: string) => void;
  onSeeReviews: (productId: string) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const average = averageRating(reviews);
  const recent = reviews.slice(0, 2);

  // Only ever rendered after a click, so there is no server pass to guard
  // against beyond this check.
  if (typeof document === "undefined") return null;

  // Portalled to the body so no transformed ancestor can reposition it.
  // A transform anywhere up the tree turns that element into the containing
  // block for fixed children, which is exactly how this modal once ended up
  // measured against the full height of the page instead of the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-[3px] sm:p-6"
      role="presentation"
    >
      {/* Click-outside target */}
      <button
        type="button"
        aria-label="Close details"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="on-ink reveal relative flex max-h-full w-full max-w-2xl flex-col overflow-hidden border border-rule-on-ink bg-ink text-on-ink"
      >
        <div className="console-grid console-grid-drift absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="halo halo-breathe absolute inset-0 opacity-70" aria-hidden="true" />

        <div className="relative min-h-0 flex-1 overflow-y-auto p-7 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <p className="label text-[0.55rem] text-acid">Listing detail</p>
              <h2
                id="product-modal-title"
                className="display mt-4 text-4xl leading-none sm:text-5xl"
              >
                {product.name}
              </h2>
              {product.subtitle && (
                <p className="label mt-3 text-[0.55rem] text-on-ink-muted">{product.subtitle}</p>
              )}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="press flex h-10 w-10 shrink-0 items-center justify-center border border-rule-on-ink text-on-ink hover:border-acid hover:text-acid"
            >
              <span aria-hidden="true" className="text-lg leading-none">
                &times;
              </span>
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusBadge status={product.status} tone="ink" />
            {average !== null && (
              <span className="flex items-center gap-2">
                <StarRating value={average} tone="ink" />
                <span className="label text-[0.52rem] text-on-ink-muted">
                  {average} from {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
                </span>
              </span>
            )}
          </div>

          {/* Facts */}
          <dl className="mt-7 grid grid-cols-2 gap-px border border-rule-on-ink bg-rule-on-ink sm:grid-cols-2">
            <div className="bg-ink px-4 py-3.5">
              <dt className="label text-[0.52rem] text-on-ink-muted">Amount</dt>
              <dd className="mt-1.5 font-mono text-sm">{product.amount ?? "TBC"}</dd>
            </div>
            <div className="bg-ink px-4 py-3.5">
              <dt className="label text-[0.52rem] text-on-ink-muted">Reference price</dt>
              <dd className="mt-1.5 font-mono text-sm">{product.price ?? "Ask us"}</dd>
            </div>
          </dl>

          {/* What it is */}
          {product.details && (
            <section className="mt-8">
              <h3 className="label border-b border-rule-on-ink pb-3 text-[0.55rem] text-acid">
                What it is
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-on-ink-muted">{product.details}</p>
            </section>
          )}

          {/* Research use */}
          {product.researchUse && product.researchUse.length > 0 && (
            <section className="mt-8">
              <h3 className="label border-b border-rule-on-ink pb-3 text-[0.55rem] text-acid">
                What labs use it for
              </h3>
              <ul className="mt-2 divide-y divide-rule-on-ink">
                {product.researchUse.map((use, index) => (
                  <li key={use} className="flex gap-4 py-3.5">
                    <span className="label shrink-0 pt-0.5 text-[0.52rem] text-on-ink-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-on-ink-muted">{use}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Handling */}
          {product.handling && (
            <section className="mt-8">
              <h3 className="label border-b border-rule-on-ink pb-3 text-[0.55rem] text-acid">
                Handling
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-on-ink-muted">{product.handling}</p>
            </section>
          )}

          {/* Reviews preview */}
          <section className="mt-8">
            <h3 className="label border-b border-rule-on-ink pb-3 text-[0.55rem] text-acid">
              Reviews
            </h3>
            {recent.length === 0 ? (
              <p className="mt-4 text-sm leading-relaxed text-on-ink-muted">
                No reviews for this one yet. If you have worked with it, yours would be the first.
              </p>
            ) : (
              <ul className="mt-2 divide-y divide-rule-on-ink">
                {recent.map((review) => (
                  <li key={review.id} className="py-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <StarRating value={review.rating} tone="ink" />
                      <span className="label text-[0.5rem] text-on-ink-muted">
                        {formatReviewDate(review.createdAt)}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-on-ink-muted">
                      {review.body}
                    </p>
                    <p className="label mt-2.5 text-[0.5rem] text-on-ink-muted">
                      {review.name.trim() === "" ? "Anonymous" : review.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onWriteReview(product.id)}
                className="press group flex items-center gap-3 bg-acid px-5 py-3.5 text-ink hover:bg-on-ink"
              >
                <span className="label text-[0.6rem]">Write a review</span>
                <span className="arrow-shift" aria-hidden="true">
                  &rarr;
                </span>
              </button>
              {reviews.length > 0 && (
                <button
                  type="button"
                  onClick={() => onSeeReviews(product.id)}
                  className="label press border border-rule-on-ink px-5 py-3.5 text-[0.6rem] text-on-ink hover:border-acid hover:text-acid"
                >
                  Read all {reviews.length}
                </button>
              )}
            </div>
          </section>

          {/* Standing notice */}
          <p className="mt-8 border-l-2 border-acid bg-ink-2 py-4 pl-5 pr-4 text-xs leading-relaxed text-on-ink-muted">
            {product.disclaimer}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
