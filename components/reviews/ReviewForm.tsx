"use client";

import { useState } from "react";
import StarRatingInput from "@/components/reviews/StarRatingInput";
import type { Product } from "@/data/products";
import { REVIEW_LIMITS, submitReview } from "@/lib/reviews";

type State = "idle" | "sending" | "sent" | "error";

export default function ReviewForm({
  products,
  defaultProductId,
}: {
  products: Product[];
  defaultProductId?: string;
}) {
  const [productId, setProductId] = useState(defaultProductId ?? products[0]?.id ?? "");
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  // Bots fill hidden fields; people do not.
  const [trap, setTrap] = useState("");

  const bodyTooShort = body.trim().length > 0 && body.trim().length < REVIEW_LIMITS.bodyMin;
  const canSend =
    state !== "sending" &&
    productId !== "" &&
    rating > 0 &&
    body.trim().length >= REVIEW_LIMITS.bodyMin;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    // Silently accept and discard anything that filled the honeypot.
    if (trap !== "") {
      setState("sent");
      return;
    }

    setState("sending");
    setError("");

    try {
      await submitReview({ productId, rating, name, body });
      setState("sent");
      setRating(0);
      setName("");
      setBody("");
    } catch (caught) {
      setState("error");
      setError(caught instanceof Error ? caught.message : "Something went wrong. Try again.");
    }
  }

  if (state === "sent") {
    return (
      <div className="border border-acid-deep/40 bg-acid/15 p-6">
        <p className="label text-[0.58rem] text-acid-deep">Received</p>
        <p className="mt-3 text-sm leading-relaxed">
          Thanks for writing it. Every review is read before it goes up, so it will appear on this
          page once we have looked at it. We do not edit what people write.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="label press mt-5 border border-rule-strong px-4 py-2.5 text-[0.6rem] hover:border-ink"
        >
          Write another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-rule bg-paper-2 p-6">
      <p className="label text-[0.58rem] text-muted">Write a review</p>
      <h3 className="display mt-3 text-2xl leading-none">Used something from the catalog?</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Tell other researchers how it went. Keep it to the material and your work with it.
      </p>

      <div className="mt-6 space-y-5">
        {/* Product */}
        <label className="block">
          <span className="label block text-[0.55rem] text-muted">Which one</span>
          <select
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            className="mt-2 w-full border border-rule bg-paper px-3 py-2.5 text-sm outline-none focus:border-ink"
            required
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
                {product.amount ? ` (${product.amount})` : ""}
              </option>
            ))}
          </select>
        </label>

        {/* Rating */}
        <fieldset>
          <legend className="label text-[0.55rem] text-muted">Rating</legend>
          <StarRatingInput value={rating} onChange={setRating} />
        </fieldset>

        {/* Name */}
        <label className="block">
          <span className="label block text-[0.55rem] text-muted">
            Name or lab <span className="normal-case tracking-normal">(optional)</span>
          </span>
          <input
            type="text"
            value={name}
            maxLength={REVIEW_LIMITS.nameMax}
            onChange={(event) => setName(event.target.value)}
            placeholder="Leave blank to post anonymously"
            className="mt-2 w-full border border-rule bg-paper px-3 py-2.5 text-sm outline-none placeholder:text-muted focus:border-ink"
          />
        </label>

        {/* Body */}
        <label className="block">
          <span className="label block text-[0.55rem] text-muted">Your review</span>
          <textarea
            value={body}
            rows={5}
            maxLength={REVIEW_LIMITS.bodyMax}
            onChange={(event) => setBody(event.target.value)}
            required
            className="mt-2 w-full border border-rule bg-paper px-3 py-2.5 text-sm leading-relaxed outline-none placeholder:text-muted focus:border-ink"
            placeholder="How did it arrive, how did it handle, would you order it again?"
          />
          <span className="mt-2 flex justify-between text-xs text-muted">
            <span>
              {bodyTooShort ? `At least ${REVIEW_LIMITS.bodyMin} characters.` : " "}
            </span>
            <span>
              {body.length}/{REVIEW_LIMITS.bodyMax}
            </span>
          </span>
        </label>

        {/* Honeypot: off-screen, not announced, never filled by a person. */}
        <input
          type="text"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute left-[-9999px] h-0 w-0 opacity-0"
        />
      </div>

      {state === "error" && (
        <p className="mt-5 border-l-2 border-oxide bg-oxide-soft/60 py-3 pl-4 pr-3 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!canSend}
        className="press group mt-6 flex w-full items-center justify-between gap-4 bg-ink px-5 py-4 text-on-ink hover:bg-acid hover:text-ink disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-paper-2"
      >
        <span className="label text-[0.65rem]">
          {state === "sending" ? "Sending" : "Submit review"}
        </span>
        <span className="arrow-shift" aria-hidden="true">
          &rarr;
        </span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Reviews are read before they go up, so yours will not appear straight away. Please do not
        describe human or veterinary use: these materials are sold for laboratory research only, and
        reviews saying otherwise will not be published.
      </p>
    </form>
  );
}
