import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { VERIFICATION_STORAGE_KEY } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for the Patterson Peptides informational website, describing what information the site does and does not collect.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `Privacy Policy | ${site.name}`,
    description: "What the Patterson Peptides website does and does not collect.",
    url: "/privacy",
  },
};

const SECTIONS: LegalSection[] = [
  {
    id: "information-collected",
    title: "Information we collect",
    body: [
      "This website is informational. As currently implemented it has no contact form, no account system, no ordering process, and no payment processing, and it does not ask you to submit personal information.",
      "The only information stored by the site is kept locally in your own browser, as described under “Cookies and local storage” below. It is not transmitted to us.",
    ],
  },
  {
    id: "contact-information",
    title: "Contact information",
    body: [
      `If you choose to contact us, for example by messaging ${site.instagramHandle} on Instagram, we will see whatever information you send us, along with whatever your Instagram profile makes visible. We use that information only to respond to your inquiry.`,
      "Messages sent through Instagram are handled on Instagram's platform and are subject to Instagram's own privacy practices, not this policy.",
    ],
  },
  {
    id: "analytics",
    title: "Website analytics",
    body: [
      "This website does not currently run analytics software, and we do not build profiles of visitors.",
      "If analytics are added in the future, this policy will be updated to describe what is collected and why before that change takes effect.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    body: [
      "This website does not set advertising or tracking cookies.",
      `It stores a single value in your browser's local storage (“${VERIFICATION_STORAGE_KEY}”) to remember that you acknowledged the researcher-verification notice, so the notice does not appear on every page load. This value stays on your device, is not sent to us, and can be removed at any time by clearing your browser's site data.`,
    ],
  },
  {
    id: "third-party-services",
    title: "Third-party services",
    body: [
      "This website links to our Instagram profile. Following that link takes you to a third-party platform with its own terms and privacy policy, and we do not control what that platform collects.",
      "The website loads a web font from Google Fonts at build time, and is served by a web host. A host will ordinarily process basic technical request data, such as IP address, browser type, and requested page, as part of delivering the site and keeping it secure.",
    ],
  },
  {
    id: "data-retention",
    title: "Data retention",
    body: [
      "Because the website itself does not collect personal information, there is nothing for us to retain from your visit.",
      "Messages you send us directly are kept only as long as needed to respond to and reasonably document the inquiry.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We take reasonable steps to keep the website and any correspondence secure. No website or method of transmission can be guaranteed completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's privacy",
    body: [
      "This website is intended for individuals who are at least 21 years of age and is not directed to children. We do not knowingly collect personal information from children.",
    ],
  },
  {
    id: "user-rights",
    title: "Your rights",
    body: [
      "Depending on where you live, you may have rights over personal information a business holds about you, such as the right to request access to it or its deletion.",
      "Because this website does not collect personal information, such a request would generally relate only to correspondence you have sent us. You can contact us to ask what we hold and to request its deletion.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to this policy",
    body: [
      "This policy may be updated as the website changes. The revision date at the top of this page indicates when it was last changed.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about this policy can be directed to ${site.name} on Instagram at ${site.instagramHandle}, or through the contact page on this website.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Privacy
          <br />
          Policy
        </>
      }
      updated="September 16, 2026"
      intro="This policy describes what this informational website does and does not collect. It is deliberately narrow, because the site itself asks for nothing from you."
      sections={SECTIONS}
      footnote="This policy is provided as a general template and is not legal advice. If the website later adds forms, analytics, or other data collection, update this policy first and have the final version reviewed by a qualified attorney."
    />
  );
}
