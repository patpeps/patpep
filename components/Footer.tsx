import Link from "next/link";
import InstagramIcon from "@/components/InstagramIcon";
import ResetVerification from "@/components/ResetVerification";
import { footerLinks, RESEARCH_USE_NOTICE, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="on-ink relative mt-24 overflow-hidden bg-ink text-on-ink">
      <div className="console-grid console-grid-drift absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="halo halo-breathe absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <p className="label text-[0.58rem] text-acid">Patterson, California</p>
            <p className="display mt-4 text-5xl leading-[0.9] sm:text-6xl">
              Patterson
              <br />
              Peptides
            </p>
            <div className="trace-rule mt-6 w-32 opacity-80" aria-hidden="true" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-on-ink-muted">
              {site.description}
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="label text-[0.58rem] text-on-ink-muted">Site</h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-sweep text-sm text-on-ink/90 transition-colors duration-200 hover:text-acid"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label text-[0.58rem] text-on-ink-muted">Connect</h2>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press group mt-5 flex items-center gap-3 border border-rule-on-ink px-4 py-3 hover:border-acid"
            >
              <InstagramIcon className="h-4 w-4 text-acid" />
              <span className="font-mono text-sm text-on-ink transition-colors group-hover:text-acid">
                {site.instagramHandle}
              </span>
            </a>
            <p className="mt-4 text-xs leading-relaxed text-on-ink-muted">
              General research and business inquiries only. No ordering process is offered through
              Instagram.
            </p>
          </div>
        </div>

        <p className="label mt-14 border border-acid/45 bg-acid/10 px-4 py-4 text-center text-[0.6rem] text-acid sm:text-xs">
          {RESEARCH_USE_NOTICE}
        </p>

        <div className="mt-8 flex flex-col gap-4 border-t border-rule-on-ink pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[0.55rem] text-on-ink-muted">
            &copy; {new Date().getFullYear()} {site.name} &middot; {site.tagline}
          </p>
          <ResetVerification />
        </div>
      </div>
    </footer>
  );
}
