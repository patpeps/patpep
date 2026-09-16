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
  url: "https://pattersonpeptides.com",
} as const;

export interface NavItem {
  href: string;
  label: string;
}

/** Main navigation — used by both the desktop navbar and the mobile menu. */
export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Research Catalog" },
  { href: "/about", label: "About" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" },
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
