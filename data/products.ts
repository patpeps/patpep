/**
 * ============================================================================
 *  PATTERSON PEPTIDES — CENTRAL CATALOG FILE
 * ============================================================================
 *
 *  This is the ONLY file you need to edit to change the research catalog.
 *  Everything on the site (catalog page, status badges, counts, home page
 *  highlights, sitemap) reads from the `products` array below.
 *
 *  TO ADD A PRODUCT     -> copy an existing block, change the values, keep the
 *                          `id` unique (lowercase, no spaces).
 *  TO HIDE A PRODUCT    -> set `visible: false` (it disappears site-wide).
 *  TO CHANGE AVAILABILITY -> set `status` to "available" | "pending" | "unavailable".
 *  TO REMOVE A PRICE    -> set `price: null` (the card simply omits pricing).
 *  TO ADD AN IMAGE      -> drop the file in /public and set
 *                          `image: "/my-image.jpg"`. Leave `null` for the
 *                          built-in lab-glass placeholder.
 *
 *  Categories are defined in `categories` at the bottom of this file.
 *
 *  NOTE: This site is informational only. Nothing here creates an order,
 *  a cart, or a checkout. `price` is a DISPLAY STRING for reference only.
 * ============================================================================
 */

/** Availability shown on the card. Drives the StatusBadge everywhere. */
export type ProductStatus = "available" | "pending" | "unavailable";

/** Category id — must match one of the ids in `categories` below. */
export type CategoryId = "peptides" | "supplies";

export interface Product {
  /** Unique, URL-safe id. Used as the React key and anchor target. */
  id: string;
  /** Display name, e.g. "RETA". */
  name: string;
  /** Optional second line under the name, e.g. a full or alternate name. */
  subtitle?: string;
  /** Category id from `categories` below. */
  category: CategoryId;
  /** Research-use description. Keep it factual — no health or medical claims. */
  description: string;
  /** Amount / concentration, e.g. "10 mg" or "3 mL". Use null to omit. */
  amount: string | null;
  /**
   * Display price as a string, e.g. "$50". Use null to omit pricing entirely.
   * Reference only — the site does not process payments or orders.
   */
  price: string | null;
  /** "available" | "pending" | "unavailable" */
  status: ProductStatus;
  /** Set false to hide this product everywhere without deleting it. */
  visible: boolean;
  /** Path to an image in /public, e.g. "/reta.jpg". Null = placeholder. */
  image: string | null;
  /** Per-product research-use disclaimer shown on the card. */
  disclaimer: string;
}

/**
 * Shared disclaimer text. Individual products can override it by writing
 * their own string in the `disclaimer` field.
 */
export const DEFAULT_DISCLAIMER =
  "For laboratory research use only. Not for human or veterinary use, and not for use in diagnostic procedures.";

/* ==========================================================================
 *  THE CATALOG — edit below this line
 * ========================================================================== */

export const products: Product[] = [
  {
    id: "reta",
    name: "Retatrutide",
    subtitle: "RETA",
    category: "peptides",
    description:
      "Lyophilized research peptide supplied for in vitro and laboratory research applications by qualified researchers.",
    amount: "10 mg",
    price: "$50",
    status: "available",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    subtitle: "Copper tripeptide-1",
    category: "peptides",
    description:
      "Copper-binding tripeptide supplied for in vitro and laboratory research applications by qualified researchers.",
    amount: null,
    price: null,
    status: "pending",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
  },
  {
    id: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    subtitle: "Laboratory supply",
    category: "supplies",
    description:
      "Laboratory-use diluent for reconstitution of lyophilized research materials in a research setting.",
    amount: "3 mL",
    price: "$5",
    status: "available",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
  },
];

/* ==========================================================================
 *  CATEGORIES — add or rename groups here, then use the id on a product
 * ========================================================================== */

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: "peptides",
    label: "Research Peptides",
    description: "Lyophilized peptides for in vitro and laboratory research.",
  },
  {
    id: "supplies",
    label: "Laboratory Supplies",
    description: "Supporting materials for handling research compounds.",
  },
];

/* ==========================================================================
 *  HELPERS — used by the components. You normally won't need to edit these.
 * ========================================================================== */

/** Every product marked `visible: true`, in catalog order. */
export function getVisibleProducts(): Product[] {
  return products.filter((product) => product.visible);
}

/** Visible products belonging to one category. */
export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return getVisibleProducts().filter((product) => product.category === categoryId);
}

/** Categories that currently contain at least one visible product. */
export function getActiveCategories(): Category[] {
  return categories.filter((category) => getProductsByCategory(category.id).length > 0);
}

/** Count of visible products with a given status. */
export function countByStatus(status: ProductStatus): number {
  return getVisibleProducts().filter((product) => product.status === status).length;
}
