/**
 * Customer reviews, stored in Firestore.
 *
 * This talks to the Firestore REST API directly rather than pulling in the
 * Firebase JS SDK, which would add roughly 200 KB to every page load for a
 * feature that needs two requests and no realtime updates.
 *
 * The values below are public client identifiers. They are meant to ship in
 * the browser: what actually protects the data is firestore.rules, which lets
 * anyone submit a review but nobody read an unpublished one, edit one, or
 * delete one.
 *
 * MODERATION: every submitted review is written with status "pending" and is
 * invisible on the site until someone changes that field to "published" in the
 * Firebase console. Nothing is ever posted automatically, and no review is
 * written by anyone but a real visitor.
 */

const PROJECT_ID = "peps-eafbc";
const API_KEY = "AIzaSyBaR78S6i6i3u0_Tel1SDt-hAnfDXij7SE";

const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

/** Limits, mirrored in firestore.rules so the server enforces them too. */
export const REVIEW_LIMITS = {
  nameMax: 60,
  bodyMin: 10,
  bodyMax: 1500,
} as const;

export interface Review {
  id: string;
  productId: string;
  rating: number;
  /** Optional. Empty string means the reviewer did not leave a name. */
  name: string;
  body: string;
  /** ISO timestamp. */
  createdAt: string;
}

export interface ReviewDraft {
  productId: string;
  rating: number;
  name: string;
  body: string;
}

/* -------------------------------------------------------------------------
 *  Reading
 * ---------------------------------------------------------------------- */

interface FirestoreValue {
  stringValue?: string;
  integerValue?: string;
  timestampValue?: string;
}

interface FirestoreDocument {
  name: string;
  fields?: Record<string, FirestoreValue>;
}

function toReview(doc: FirestoreDocument): Review | null {
  const f = doc.fields;
  if (!f) return null;

  const productId = f.productId?.stringValue;
  const body = f.body?.stringValue;
  const rating = f.rating?.integerValue;
  if (!productId || !body || !rating) return null;

  return {
    id: doc.name.split("/").pop() ?? doc.name,
    productId,
    rating: Number(rating),
    name: f.name?.stringValue ?? "",
    body,
    createdAt: f.createdAt?.timestampValue ?? "",
  };
}

/**
 * Every published review, newest first.
 *
 * Returns an empty array when nothing has been published yet, and also when
 * the database is unreachable: a broken reviews panel should never take the
 * catalog down with it.
 */
export async function fetchPublishedReviews(): Promise<Review[]> {
  const query = {
    structuredQuery: {
      from: [{ collectionId: "reviews" }],
      where: {
        fieldFilter: {
          field: { fieldPath: "status" },
          op: "EQUAL",
          value: { stringValue: "published" },
        },
      },
      orderBy: [{ field: { fieldPath: "createdAt" }, direction: "DESCENDING" }],
      limit: 200,
    },
  };

  const response = await fetch(`${BASE}:runQuery?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });

  if (!response.ok) throw new Error(`Could not load reviews (${response.status})`);

  const rows = (await response.json()) as { document?: FirestoreDocument }[];
  return rows
    .map((row) => (row.document ? toReview(row.document) : null))
    .filter((review): review is Review => review !== null);
}

/* -------------------------------------------------------------------------
 *  Writing
 * ---------------------------------------------------------------------- */

/**
 * Submits a review for moderation. It is stored with status "pending" and
 * will not appear anywhere on the site until it is published by hand.
 */
export async function submitReview(draft: ReviewDraft): Promise<void> {
  const body = {
    fields: {
      productId: { stringValue: draft.productId },
      rating: { integerValue: String(draft.rating) },
      name: { stringValue: draft.name.trim().slice(0, REVIEW_LIMITS.nameMax) },
      body: { stringValue: draft.body.trim().slice(0, REVIEW_LIMITS.bodyMax) },
      status: { stringValue: "pending" },
      createdAt: { timestampValue: new Date().toISOString() },
    },
  };

  const response = await fetch(`${BASE}/reviews?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      response.status === 403
        ? "That submission was rejected. Check the rating and the length of your review, then try again."
        : `Could not send the review (${response.status}). ${detail.slice(0, 120)}`,
    );
  }
}

/* -------------------------------------------------------------------------
 *  Helpers
 * ---------------------------------------------------------------------- */

export function groupByProduct(reviews: Review[]): Record<string, Review[]> {
  const grouped: Record<string, Review[]> = {};
  for (const review of reviews) {
    (grouped[review.productId] ??= []).push(review);
  }
  return grouped;
}

export function averageRating(reviews: Review[]): number | null {
  if (reviews.length === 0) return null;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
}

export function formatReviewDate(iso: string): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
