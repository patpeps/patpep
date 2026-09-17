"use client";

import ReviewForm from "@/components/reviews/ReviewForm";
import StarRating from "@/components/reviews/StarRating";
import type { Product } from "@/data/products";
import { averageRating, formatReviewDate, groupByProduct, type Review } from "@/lib/reviews";

/**
 * Reviews written by visitors. Nothing here is seeded, sampled or generated:
 * the list is empty until real people submit reviews and those reviews are
 * published by hand.
 *
 * The data is fetched by CatalogBrowser and passed in, so the popup and this
 * section share one request.
 */
export default function ReviewsSection({
  products,
  reviews,
  load,
  formProductId,
}: {
  products: Product[];
  reviews: Review[];
  load: "loading" | "ready" | "error";
  /** Preselects a listing in the form, set when someone clicks through from a popup. */
  formProductId?: string;
}) {
  const byProduct = groupByProduct(reviews);
  const overall = averageRating(reviews);

  return (
    <section id="reviews" className="mt-20 scroll-mt-36">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
        <div>
          <p className="label text-[0.58rem] text-muted">From researchers</p>
          <h2 className="display mt-3 text-4xl leading-none sm:text-5xl">Reviews</h2>
        </div>
        {overall !== null && (
          <div className="pb-1 text-right">
            <StarRating value={overall} className="justify-end" />
            <p className="label mt-2 text-[0.55rem] text-muted">
              {overall} average &middot; {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
        {/* The reviews themselves */}
        <div>
          {load === "loading" && <p className="label text-[0.58rem] text-muted">Loading reviews</p>}

          {load === "error" && (
            <p className="border-l-2 border-oxide bg-oxide-soft/60 py-4 pl-5 pr-4 text-sm leading-relaxed">
              Reviews could not be loaded just now. The catalog above is unaffected, and refreshing
              usually sorts it out.
            </p>
          )}

          {load === "ready" && reviews.length === 0 && (
            <div className="border border-dashed border-rule-strong p-10 text-center">
              <p className="display text-2xl leading-none">No reviews yet</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
                Nothing here is made up, so this stays empty until someone writes the first one. If
                you have worked with something from the catalog, that could be you.
              </p>
            </div>
          )}

          {load === "ready" && reviews.length > 0 && (
            <div className="space-y-12">
              {products
                .filter((product) => (byProduct[product.id]?.length ?? 0) > 0)
                .map((product) => {
                  const forProduct = byProduct[product.id];
                  const average = averageRating(forProduct);

                  return (
                    <div key={product.id} id={`reviews-${product.id}`} className="scroll-mt-36">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-rule pb-3">
                        <h3 className="display text-2xl leading-none">{product.name}</h3>
                        <span className="flex items-center gap-3">
                          {average !== null && <StarRating value={average} />}
                          <span className="label text-[0.52rem] text-muted">
                            {forProduct.length} {forProduct.length === 1 ? "review" : "reviews"}
                          </span>
                        </span>
                      </div>

                      <ul className="divide-y divide-rule">
                        {forProduct.map((review) => (
                          <li key={review.id} className="row-slide py-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <StarRating value={review.rating} />
                              <span className="label text-[0.52rem] text-muted">
                                {formatReviewDate(review.createdAt)}
                              </span>
                            </div>
                            <p className="mt-3 text-sm leading-relaxed">{review.body}</p>
                            <p className="label mt-3 text-[0.52rem] text-muted">
                              {review.name.trim() === "" ? "Anonymous" : review.name}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* The form. Remounts when a popup preselects a different listing. */}
        <div id="review-form" className="scroll-mt-36 lg:sticky lg:top-40 lg:self-start">
          <ReviewForm
            key={formProductId ?? "default"}
            products={products}
            defaultProductId={formProductId}
          />
        </div>
      </div>
    </section>
  );
}
