/**
 * Site-wide configuration: company details, links, and navigation.
 * Edit here to change the company name, location, Instagram handle, or menu.
 */

export const site = {
  name: "Patterson Peptides",
  shortName: "Patterson Peptides",
  tagline: "Research Use Only",
  location: "Patterson, California",
  description:
    "A small research supply company in Patterson, California. We sell research materials to qualified researchers for in vitro and laboratory use only.",
  instagramHandle: "@PattersonPeptides",
  instagramUrl: "https://instagram.com/PattersonPeptides",
  /**
   * Used for canonical URLs, Open Graph, sitemap and robots.txt.
   * Change this to your real domain when you deploy.
   */
  url: "https://pattersonpeptides.org",
} as const;

export interface NavItem {
  href: string;
  label: string;
  /** One line on what the page is for. Shown in the menu. */
  description?: string;
}

/** Main navigation, used by both the desktop navbar and the mobile menu. */
export const navItems: NavItem[] = [
  {
    href: "/",
    label: "Home",
    description: "The short version of who we are and what we carry.",
  },
  {
    href: "/catalog",
    label: "Research Catalog",
    description: "Everything we stock, with amounts, prices and what is in right now.",
  },
  {
    href: "/about",
    label: "About",
    description: "Who runs this, where we are, and what we will not claim.",
  },
  {
    href: "/disclaimer",
    label: "Disclaimer",
    description: "What these materials are for, and what they are not for.",
  },
  {
    href: "/terms",
    label: "Terms",
    description: "The rules for using this site, in plain language.",
  },
  {
    href: "/privacy",
    label: "Privacy",
    description: "What this site collects, which is close to nothing.",
  },
  {
    href: "/contact",
    label: "Contact",
    description: "How to reach us. Instagram is the fastest way.",
  },
];

/** Links listed in the footer. */
export const footerLinks: NavItem[] = [
  { href: "/catalog", label: "Research Catalog" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

/** The single sentence repeated across the site. */
export const RESEARCH_USE_NOTICE = "NOT FOR HUMAN OR VETERINARY USE.";
