import Link from "next/link";
import { FlaskConical, Mail, ShieldCheck, Truck } from "lucide-react";
import Logo from "@/components/Logo";

const COLUMNS = [
  {
    title: "Catalog",
    links: [
      { href: "/products", label: "All compounds" },
      { href: "/products?category=metabolic", label: "Metabolic" },
      { href: "/products?category=recovery", label: "Recovery" },
      { href: "/products?category=longevity", label: "Longevity" },
      { href: "/products?category=cognitive", label: "Cognitive" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/quality", label: "Quality & testing" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/terms", label: "Terms of sale" },
      { href: "/terms#shipping", label: "Shipping" },
      { href: "/terms#returns", label: "Returns" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Third-party tested research compounds for laboratory and in-vitro use, shipped cold
              from our facility with a certificate of analysis on every lot.
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" /> HPLC + MS tested
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-accent" /> Cold-chain shipping
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FlaskConical className="h-3.5 w-3.5 text-accent" /> Lot-level COA
              </span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-border bg-surface-2 p-4 text-xs leading-relaxed text-muted">
          <strong className="text-foreground">Research use only.</strong> All products sold by
          Patterson Peptides are intended strictly for laboratory research and in-vitro
          experimentation by qualified professionals. They are not drugs, foods, cosmetics, or
          medical devices, and may not be misbranded, misused, or relabeled. They are not for human
          or veterinary consumption or administration of any kind. Nothing on this site is medical
          advice.
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Patterson Peptides. All rights reserved.</p>
          <a
            href="mailto:research@pattersonpeptides.com"
            className="inline-flex items-center gap-1.5 hover:text-accent"
          >
            <Mail className="h-3.5 w-3.5" /> research@pattersonpeptides.com
          </a>
        </div>
      </div>
    </footer>
  );
}
