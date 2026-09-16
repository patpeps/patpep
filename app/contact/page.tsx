import type { Metadata } from "next";
import { MapPin, MessageSquare } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Patterson Peptides, a Patterson, California based research company, for general research and business inquiries.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${site.name}`,
    description: "General research and business inquiries for Patterson Peptides.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">Contact</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Get in touch</h1>
      <p className="mt-4 text-base leading-relaxed text-muted">
        {site.name} is a Patterson based research company. We welcome general business and research
        inquiries, including questions about catalog information and availability.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        <section className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <InstagramIcon className="h-5 w-5 text-accent" />
          <h2 className="mt-3 text-base font-semibold tracking-tight">Instagram</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The fastest way to reach us is through our Instagram profile.
          </p>
          <p className="mt-3 font-mono text-sm">{site.instagramHandle}</p>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
          >
            <InstagramIcon className="h-4 w-4" />
            Open Instagram profile
          </a>
        </section>

        <section className="rounded-xl border border-border bg-background p-6 shadow-sm">
          <MapPin className="h-5 w-5 text-accent" aria-hidden="true" />
          <h2 className="mt-3 text-base font-semibold tracking-tight">Location</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {site.name}
            <br />
            Patterson based research company
            <br />
            {site.location}
          </p>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-border bg-surface p-6">
        <MessageSquare className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 className="mt-3 text-base font-semibold tracking-tight">What we can help with</h2>
        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
          {[
            "General business and research inquiries",
            "Questions about catalog information, amounts, or availability",
            "Questions about the intended research use of a listed material",
          ].map((item) => (
            <li key={item} className="flex gap-2.5">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 rounded-lg border border-border bg-background p-4 text-xs leading-relaxed text-muted">
          This website is informational. It does not accept orders, and no ordering or purchasing
          process is offered through Instagram or any other channel listed on this page.
        </p>
      </section>

      <DisclaimerBanner className="mt-8" />
    </div>
  );
}
