import type { Metadata } from "next";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { MapPin, MessagesSquare } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import PageHeader from "@/components/PageHeader";
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

const TOPICS = [
  "General business and research inquiries",
  "Questions about catalog information, amounts, or availability",
  "Questions about the intended research use of a listed material",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Get in
            <br />
            <em className="italic">touch.</em>
          </>
        }
        lede={`${site.name} is a Patterson based research company. We welcome general business and research inquiries, including questions about catalog information and availability.`}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Instagram panel */}
          <section className="on-ink relative overflow-hidden bg-ink p-8 text-on-ink sm:p-10">
            <div className="console-grid absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="halo absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative">
              <p className="label text-[0.58rem] text-acid">Primary channel</p>
              <h2 className="display mt-5 text-4xl leading-none sm:text-5xl">Instagram</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-ink-muted">
                The fastest way to reach us is through our Instagram profile.
              </p>
              <p className="mt-8 font-mono text-lg text-on-ink sm:text-xl">
                {site.instagramHandle}
              </p>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-4 bg-acid px-6 py-4 text-ink transition-colors duration-200 hover:bg-on-ink"
              >
                <InstagramIcon className="h-4 w-4" />
                <span className="label text-[0.65rem]">Open Instagram profile</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </a>
            </div>
          </section>

          <div className="grid gap-6">
            <section className="border border-rule bg-paper-2 p-8">
              <p className="label flex items-center gap-2 text-[0.55rem] text-muted">
                <MapPin className="h-3.5 w-3.5 text-acid-deep" aria-hidden="true" />
                Location
              </p>
              <address className="display mt-5 text-3xl not-italic leading-tight">
                {site.name}
                <span className="block text-2xl text-muted">Patterson based research company</span>
                <span className="block text-2xl text-muted">{site.location}</span>
              </address>
            </section>

            <section className="border border-rule p-8">
              <p className="label flex items-center gap-2 text-[0.55rem] text-muted">
                <MessagesSquare className="h-3.5 w-3.5 text-acid-deep" aria-hidden="true" />
                What we can help with
              </p>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {TOPICS.map((topic, index) => (
                  <li key={topic} className="flex gap-4 py-4">
                    <span className="label shrink-0 pt-0.5 text-[0.52rem] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{topic}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted">
                This website is informational. It does not accept orders, and no ordering or
                purchasing process is offered through Instagram or any other channel listed on this
                page.
              </p>
            </section>
          </div>
        </div>

        <DisclaimerBanner className="mt-10 max-w-3xl" />
      </div>
    </>
  );
}
