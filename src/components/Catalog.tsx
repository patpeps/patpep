"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { categories, products, type Category } from "@/lib/products";

type Sort = "featured" | "price-asc" | "price-desc" | "name";

export default function Catalog({ initialCategory }: { initialCategory?: Category }) {
  const [category, setCategory] = useState<Category | "all">(initialCategory ?? "all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (inStockOnly && !p.inStock) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.cas.includes(q)
      );
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return Number(Boolean(b.featured)) - Number(Boolean(a.featured)) || a.name.localeCompare(b.name);
      }
    });
  }, [category, query, sort, inStockOnly]);

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, description, or CAS number"
              aria-label="Search catalog"
              className="w-full rounded-md border border-border bg-surface-2 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:border-accent/60"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted">
            <SlidersHorizontal className="h-4 w-4" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
              className="rounded-md border border-border bg-surface-2 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/60"
            >
              <option value="featured">Featured</option>
              <option value="name">Name A&ndash;Z</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
            All
          </FilterChip>
          {categories.map((c) => (
            <FilterChip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>
              {c.label}
            </FilterChip>
          ))}
          <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs text-muted">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-3.5 w-3.5 accent-[color:var(--accent)]"
            />
            In stock only
          </label>
        </div>
      </div>

      <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">
        {visible.length} compound{visible.length === 1 ? "" : "s"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted">
          No compounds match those filters.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-accent/60 bg-accent-soft text-accent"
          : "border-border bg-surface-2 text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
