import Image from "next/image";
import { Beaker, FlaskConical, Tag } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * Informational catalog card. Every value comes from /data/products.ts —
 * there is no ordering, cart, or checkout anywhere on this site.
 */
export default function ProductCard({ product }: { product: Product }) {
  const dimmed = product.status !== "available";

  return (
    <article
      id={product.id}
      className="group flex scroll-mt-28 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
    >
      <div className="lab-grid relative flex h-40 items-center justify-center border-b border-border bg-surface">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={cn("object-cover", dimmed && "opacity-70")}
          />
        ) : (
          <span
            className={cn(
              "flex flex-col items-center gap-2 text-muted transition-colors group-hover:text-accent",
              dimmed && "opacity-70",
            )}
            aria-hidden="true"
          >
            {product.category === "supplies" ? (
              <Beaker className="h-8 w-8" strokeWidth={1.25} />
            ) : (
              <FlaskConical className="h-8 w-8" strokeWidth={1.25} />
            )}
            {product.amount && (
              <span className="font-mono text-xs tracking-tight">{product.amount}</span>
            )}
          </span>
        )}
        <span className="absolute left-3 top-3 rounded-full border border-border bg-background/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
          Research Use Only
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold tracking-tight">{product.name}</h3>
            {product.subtitle && <p className="mt-0.5 text-xs text-muted">{product.subtitle}</p>}
          </div>
        </div>

        <StatusBadge status={product.status} className="mt-3 self-start" />

        <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-muted">Amount</dt>
            <dd className="mt-1 font-medium">{product.amount ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.12em] text-muted">Reference price</dt>
            <dd className="mt-1 flex items-center gap-1.5 font-medium">
              {product.price ? (
                <>
                  <Tag className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {product.price}
                </>
              ) : (
                "—"
              )}
            </dd>
          </div>
        </dl>

        <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted">
          {product.disclaimer}
        </p>
      </div>
    </article>
  );
}
