import { cn } from "@/lib/utils";

/** Read-only rating display. Five marks, filled to the score. */
export default function StarRating({
  value,
  tone = "paper",
  className,
}: {
  value: number;
  tone?: "paper" | "ink";
  className?: string;
}) {
  const filled = Math.round(value);

  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      role="img"
      aria-label={`${value} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((mark) => (
        <span
          key={mark}
          aria-hidden="true"
          className={cn(
            "h-2.5 w-2.5",
            mark <= filled
              ? tone === "ink"
                ? "bg-acid"
                : "bg-acid-deep"
              : tone === "ink"
                ? "bg-rule-on-ink"
                : "bg-rule-strong",
          )}
        />
      ))}
    </span>
  );
}
