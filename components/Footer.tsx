import Link from "next/link";
import { MapPin } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import Logo from "@/components/Logo";
import ResetVerification from "@/components/ResetVerification";
import { footerLinks, RESEARCH_USE_NOTICE, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Site</h2>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em]">Connect</h2>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-accent/50 hover:text-accent"
            >
              <InstagramIcon className="h-4 w-4" />
              {site.instagramHandle}
            </a>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              General research and business inquiries only.
            </p>
          </div>
        </div>

        <p className="mt-10 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-slate-100">
          {RESEARCH_USE_NOTICE}
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. {site.tagline}.
          </p>
          <ResetVerification />
        </div>
      </div>
    </footer>
  );
}
