/**
 * ============================================================================
 *  PATTERSON PEPTIDES: CENTRAL CATALOG FILE
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

/** Category id. Must match one of the ids in `categories` below. */
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
  /** Research-use description. Keep it factual, with no health or medical claims. */
  description: string;
  /** Amount / concentration, e.g. "10 mg" or "3 mL". Use null to omit. */
  amount: string | null;
  /**
   * Display price as a string, e.g. "$50". Use null to omit pricing entirely.
   * Reference only. The site does not process payments or orders.
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

  /* ---- Detail popup. All optional: leave any of these out and the popup
   *      simply omits that block. -------------------------------------- */

  /**
   * What the material actually is: class, structure, what it binds.
   * Keep this factual. Describe the compound, never an effect on a person
   * or animal, which would contradict the research-use-only position of
   * the whole site.
   */
  details?: string;
  /** What laboratories use it for. Assays and models, not outcomes. */
  researchUse?: string[];
  /** Storage and reconstitution notes. */
  handling?: string;
}

/**
 * Shared disclaimer text. Individual products can override it by writing
 * their own string in the `disclaimer` field.
 */
export const DEFAULT_DISCLAIMER =
  "For laboratory research use only. Not for human or veterinary use, and not for use in diagnostic procedures.";

/* ==========================================================================
 *  THE CATALOG: edit below this line
 * ========================================================================== */

export const products: Product[] = [
  {
    id: "reta",
    name: "Retatrutide",
    subtitle: "RETA",
    category: "peptides",
    description:
      "A lyophilized peptide, sold by the vial for lab work. Reconstitute it yourself with bacteriostatic water.",
    amount: "10 mg",
    price: "$50",
    status: "available",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
    details:
      "A synthetic peptide of 39 amino acids, built on the GIP backbone with a fatty acid chain attached so it stays intact longer in solution. What makes it unusual in the literature is that it acts at three receptors rather than one: GIP, GLP-1 and glucagon. Supplied lyophilized, as a white powder in a sealed vial.",
    researchUse: [
      "Receptor binding and selectivity assays across GIP, GLP-1 and glucagon receptors",
      "cAMP signalling and downstream pathway work in cell culture",
      "Comparative studies against single and dual receptor agonists",
    ],
    handling:
      "Keep the sealed vial cold and out of the light. Reconstitute with bacteriostatic water, then keep it refrigerated and use it within the window your protocol allows.",
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    subtitle: "Copper tripeptide-1",
    category: "peptides",
    description:
      "A copper-binding tripeptide, lyophilized. We are not carrying this one yet. It is listed here so you know it is coming.",
    amount: "50 mg",
    price: null,
    status: "pending",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
    details:
      "A tripeptide, glycyl-L-histidyl-L-lysine, bound to a copper(II) ion. It occurs naturally in human plasma, which is where it was first isolated in the 1970s, and it has been a fixture of cell culture work ever since, mostly for what it does to gene expression in fibroblasts. The copper is part of the molecule, not an additive, and gives the powder its blue colour.",
    researchUse: [
      "Collagen and extracellular matrix protein expression in fibroblast culture",
      "Gene expression profiling",
      "Copper transport and metal-binding chemistry",
    ],
    handling:
      "Light sensitive. Keep the sealed vial cold and dark, and protect the solution from light once reconstituted.",
  },
  {
    id: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    subtitle: "Laboratory supply",
    category: "supplies",
    description:
      "Sterile diluent for reconstituting lyophilized material at the bench. Most people order it alongside a peptide.",
    amount: "3 mL",
    price: "$5",
    status: "available",
    visible: true,
    image: null,
    disclaimer: DEFAULT_DISCLAIMER,
    details:
      "Sterile water with roughly 0.9% benzyl alcohol added as a preservative. The preservative is the whole point: it is what lets a vial be entered more than once without the contents spoiling, which is why this rather than plain sterile water is the usual choice for reconstituting a lyophilized powder you plan to draw from repeatedly.",
    researchUse: [
      "Reconstituting lyophilized peptides",
      "Preparing stock solutions at the bench",
    ],
    handling:
      "Store at room temperature. Wipe the stopper before each entry and keep track of how long the vial has been open.",
  },
];

/* ==========================================================================
 *  CATEGORIES: add or rename groups here, then use the id on a product
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
    description: "Lyophilized peptides, sold by the vial for lab work.",
  },
  {
    id: "supplies",
    label: "Laboratory Supplies",
    description: "The bits and pieces you need to actually work with them.",
  },
];

/* ==========================================================================
 *  HELPERS: used by the components. You normally won't need to edit these.
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
