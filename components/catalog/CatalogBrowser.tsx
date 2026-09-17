"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ProductModal from "@/components/catalog/ProductModal";
import ReviewsSection from "@/components/reviews/ReviewsSection";
import type { Category, Product } from "@/data/products";
import {
  averageRating,
  fetchPublishedReviews,
  groupByProduct,
  type Review,
} from "@/lib/reviews";

type Load = "loading" | "ready" | "error";

/**
 * The interactive half of the catalog: the grid, the detail popup, and the
 * reviews section underneath.
 *
 * Reviews are fetched once here and handed to both the popup and the reviews
 * section, so opening a listing costs no extra requests.
 */
export default function CatalogBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [load, setLoad] = useState<Load>("loading");
  /** Which listing the review form should have selected. */
  const [formProductId, setFormProductId] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    fetchPublishedReviews()
      .then((result) => {
        if (cancelled) return;
        setReviews(result);
        setLoad("ready");
      })
      .catch(() => {
        if (!cancelled) setLoad("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const byProduct = groupByProduct(reviews);
  const openProduct = products.find((product) => product.id === openId) ?? null;

  function scrollTo(id: string) {
    // Let the modal unmount and the scroll lock lift first.
    window.setTimeout(() => {
      const target = document.getElementById(id) ?? document.getElementById("reviews");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function handleWriteReview(productId: string) {
    setFormProductId(productId);
    setOpenId(null);
    scrollTo("review-form");
  }

  function handleSeeReviews(productId: string) {
    setOpenId(null);
    scrollTo(`reviews-${productId}`);
  }

  return (
    <>
      <div className="mt-16 space-y-20">
        {categories.map((category) => {
          const items = products.filter((product) => product.category === category.id);
          if (items.length === 0) return null;

          return (
            <section key={category.id} aria-labelledby={`category-${category.id}`}>
              <Reveal className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
                <div>
                  <h2
                    id={`category-${category.id}`}
                    className="display text-4xl leading-none sm:text-5xl"
                  >
                    {category.label}
                  </h2>
                  <p className="mt-3 text-sm text-muted">{category.description}</p>
                </div>
                <p className="label pb-1 text-[0.55rem] text-muted">
                  {String(items.length).padStart(2, "0")}{" "}
                  {items.length === 1 ? "listing" : "listings"}
                </p>
              </Reveal>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={products.indexOf(product)}
                    delay={index * 80}
                    reviewCount={byProduct[product.id]?.length ?? 0}
                    rating={averageRating(byProduct[product.id] ?? [])}
                    onOpen={() => setOpenId(product.id)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {openProduct && (
        <ProductModal
          product={openProduct}
          reviews={byProduct[openProduct.id] ?? []}
          onClose={() => setOpenId(null)}
          onWriteReview={handleWriteReview}
          onSeeReviews={handleSeeReviews}
        />
      )}

      <ReviewsSection
        products={products}
        reviews={reviews}
        load={load}
        formProductId={formProductId}
      />
    </>
  );
}
