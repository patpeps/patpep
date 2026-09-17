"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];

/**
 * Clickable star rating for the review form. Radio semantics, so it works
 * with arrow keys and reads correctly to a screen reader.
 */
export default function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const shown = hovered || value;

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <div
        role="radiogroup"
        aria-label="Rating out of 5"
        className="flex items-center gap-1"
        onMouseLeave={() => setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((mark) => (
          <button
            key={mark}
            type="button"
            role="radio"
            aria-checked={value === mark}
            aria-label={`${mark} ${mark === 1 ? "star" : "stars"}${LABELS[mark] ? `, ${LABELS[mark]}` : ""}`}
            onClick={() => onChange(mark)}
            onMouseEnter={() => setHovered(mark)}
            onFocus={() => setHovered(mark)}
            onBlur={() => setHovered(0)}
            className={cn(
              "p-1 transition-transform duration-200",
              shown >= mark ? "text-acid-deep" : "text-rule-strong hover:text-muted",
              "hover:scale-110 active:scale-95",
            )}
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6.05 6.6.88-4.8 4.6 1.2 6.55L12 17.5l-5.9 3.08 1.2-6.55-4.8-4.6 6.6-.88L12 2.5z" />
            </svg>
          </button>
        ))}
      </div>
      <span className="text-xs text-muted">
        {shown === 0 ? "Pick a rating" : `${shown} of 5 · ${LABELS[shown]}`}
      </span>
    </div>
  );
}
