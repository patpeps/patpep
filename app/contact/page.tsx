import type { Metadata } from "next";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import { MapPin, MessagesSquare } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
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
  "What we have in stock, and how much",
  "When something on the list is coming back",
  "What a listed material actually is",
  "Anything else about the business",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Say<span className="display-light"> hello.</span>
          </>
        }
        lede="Instagram is the quickest way to reach us. Ask about anything in the catalog: what we have, how much is left, when something is coming back."
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Instagram panel */}
          <Reveal as="section" motion="left" className="on-ink relative overflow-hidden bg-ink p-8 text-on-ink sm:p-10">
            <div className="console-grid console-grid-drift absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="halo halo-breathe absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="relative">
              <p className="label text-[0.58rem] text-acid">Primary channel</p>
              <h2 className="display mt-5 text-4xl leading-none sm:text-5xl">Instagram</h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-on-ink-muted">
                Send us a message. We read them.
              </p>
              <p className="mt-8 font-mono text-lg text-on-ink sm:text-xl">
                {site.instagramHandle}
              </p>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press group mt-6 inline-flex items-center gap-4 bg-acid px-6 py-4 text-ink hover:bg-on-ink"
              >
                <InstagramIcon className="h-4 w-4" />
                <span className="label text-[0.65rem]">Open Instagram profile</span>
                <span className="arrow-shift" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>
          </Reveal>

          <div className="grid gap-6">
            <Reveal as="section" delay={120} className="border border-rule bg-paper-2 p-8">
              <p className="label flex items-center gap-2 text-[0.55rem] text-muted">
                <MapPin className="h-3.5 w-3.5 text-acid-deep" aria-hidden="true" />
                Location
              </p>
              <address className="display mt-5 text-3xl not-italic leading-tight">
                {site.name}
                <span className="block text-2xl text-muted">{site.location}</span>
              </address>
            </Reveal>

            <Reveal as="section" delay={200} className="border border-rule p-8">
              <p className="label flex items-center gap-2 text-[0.55rem] text-muted">
                <MessagesSquare className="h-3.5 w-3.5 text-acid-deep" aria-hidden="true" />
                Things worth asking
              </p>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {TOPICS.map((topic, index) => (
                  <li key={topic} className="row-slide flex gap-4 py-4">
                    <span className="label shrink-0 pt-0.5 text-[0.52rem] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{topic}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-muted">
                This site is a catalog, not a store. Nothing here takes an order or a payment.
              </p>
            </Reveal>
          </div>
        </div>

        <DisclaimerBanner className="mt-10 max-w-3xl" />
      </div>
    </>
  );
}
