import { cn } from "@/lib/utils";

const SIZES = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-6 w-6",
} as const;

function Star({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5l2.9 6.05 6.6.88-4.8 4.6 1.2 6.55L12 17.5l-5.9 3.08 1.2-6.55-4.8-4.6 6.6-.88L12 2.5z" />
    </svg>
  );
}

/**
 * Read-only star rating. Half stars are handled by clipping the filled row
 * over a dimmed row, so 4.5 reads as four and a half rather than rounding.
 */
export default function StarRating({
  value,
  tone = "paper",
  size = "sm",
  showValue = false,
  className,
}: {
  value: number;
  tone?: "paper" | "ink";
  size?: keyof typeof SIZES;
  showValue?: boolean;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const starClass = SIZES[size];
  const emptyColor = tone === "ink" ? "text-rule-on-ink" : "text-rule-strong";
  const fillColor = tone === "ink" ? "text-acid" : "text-acid-deep";

  return (
    <span
      className={cn("inline-flex items-center gap-1.5", className)}
      role="img"
      aria-label={`${clamped} out of 5 stars`}
    >
      <span className="relative inline-flex">
        {/* Empty row */}
        <span className={cn("inline-flex gap-0.5", emptyColor)} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className={starClass} />
          ))}
        </span>
        {/* Filled row, clipped to the score */}
        <span
          className={cn("absolute inset-0 inline-flex gap-0.5 overflow-hidden", fillColor)}
          style={{ width: `${(clamped / 5) * 100}%` }}
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className={cn(starClass, "shrink-0")} />
          ))}
        </span>
      </span>

      {showValue && (
        <span
          className={cn(
            "font-mono text-xs",
            tone === "ink" ? "text-on-ink-muted" : "text-muted",
          )}
        >
          {clamped.toFixed(1)}
        </span>
      )}
    </span>
  );
}
