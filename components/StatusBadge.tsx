import { CircleDashed, CircleSlash, CircleCheck } from "lucide-react";
import type { ProductStatus } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Availability badge. The label and styling for every status live here, so
 * changing `status` in /data/products.ts updates the whole site.
 */
const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; className: string; icon: typeof CircleCheck }
> = {
  available: {
    label: "Available",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CircleCheck,
  },
  pending: {
    label: "Coming Soon / Pending",
    className: "border-amber-200 bg-amber-50 text-amber-700",
    icon: CircleDashed,
  },
  unavailable: {
    label: "Unavailable",
    className: "border-slate-200 bg-slate-100 text-slate-600",
    icon: CircleSlash,
  },
};

export function statusLabel(status: ProductStatus): string {
  return STATUS_CONFIG[status].label;
}

export default function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  const { label, className: statusClass, icon: Icon } = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        statusClass,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
}
