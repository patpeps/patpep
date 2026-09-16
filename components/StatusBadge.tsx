import type { ProductStatus } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Availability chip. Status is never carried by colour alone — every chip
 * pairs its dot with a written label.
 *
 * The label and styling for every status live here, so changing `status` in
 * /data/products.ts updates the whole site.
 */
const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; surface: string; dot: string; onInk: string }
> = {
  available: {
    label: "Available",
    surface: "border-acid-deep/35 bg-acid/25 text-text",
    dot: "bg-acid-deep",
    onInk: "border-acid/40 bg-acid/15 text-acid",
  },
  pending: {
    label: "Coming Soon / Pending",
    surface: "border-oxide/30 bg-oxide-soft text-text",
    dot: "bg-oxide",
    onInk: "border-oxide/50 bg-oxide/15 text-oxide-soft",
  },
  unavailable: {
    label: "Unavailable",
    surface: "border-rule-strong bg-paper-3 text-muted",
    dot: "bg-rule-strong",
    onInk: "border-rule-on-ink bg-ink-3 text-on-ink-muted",
  },
};

export function statusLabel(status: ProductStatus): string {
  return STATUS_CONFIG[status].label;
}

export default function StatusBadge({
  status,
  tone = "paper",
  className,
}: {
  status: ProductStatus;
  tone?: "paper" | "ink";
  className?: string;
}) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "label inline-flex items-center gap-2 border px-2.5 py-1.5 text-[0.58rem]",
        tone === "ink" ? config.onInk : config.surface,
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0",
          tone === "ink" && status === "available" ? "bg-acid" : config.dot,
          status === "available" && "live-dot",
        )}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
