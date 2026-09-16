import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Specimen record card. Every value comes from /data/products.ts — this site
 * is informational, so there is no ordering, cart, or checkout anywhere.
 */
export default function ProductCard({
  product,
  index,
  delay = 0,
}: {
  product: Product;
  index?: number;
  delay?: number;
}) {
  const muted = product.status !== "available";

  return (
    <article
      id={product.id}
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="reveal group relative flex scroll-mt-32 flex-col border border-rule bg-paper transition-colors duration-300 hover:border-ink"
    >
      {/* Record header */}
      <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
        <span className="label text-[0.55rem] text-muted">
          {typeof index === "number" ? `Rec. ${String(index + 1).padStart(3, "0")}` : "Record"}
        </span>
        <span className="label text-[0.55rem] text-muted">Research use only</span>
      </div>

      {/* Plate */}
      <div className="graph-paper relative flex h-44 items-center justify-center overflow-hidden border-b border-rule bg-paper-2">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn("object-cover", muted && "opacity-75 saturate-50")}
          />
        ) : (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "display text-6xl leading-none transition-transform duration-500 group-hover:-translate-y-0.5",
                muted ? "text-rule-strong" : "text-ink/85",
              )}
            >
              {product.amount ?? "—"}
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 group-hover:scale-x-100"
            />
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="display text-[2rem] leading-none">{product.name}</h3>
        {product.subtitle && (
          <p className="label mt-2.5 text-[0.58rem] text-muted">{product.subtitle}</p>
        )}

        <StatusBadge status={product.status} className="mt-4 self-start" />

        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

        <dl className="mt-5 divide-y divide-rule border-y border-rule">
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label text-[0.55rem] text-muted">Amount</dt>
            <dd className="font-mono text-sm">{product.amount ?? "—"}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-2.5">
            <dt className="label text-[0.55rem] text-muted">Reference price</dt>
            <dd className="font-mono text-sm">{product.price ?? "—"}</dd>
          </div>
        </dl>

        <p className="mt-4 text-xs leading-relaxed text-muted">{product.disclaimer}</p>
      </div>

      {/* Accent rule on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-acid transition-transform duration-500 group-hover:scale-x-100"
      />
    </article>
  );
}
