import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions for using the Patterson Peptides informational website, including research-use-only limitations and researcher responsibilities.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `Terms & Conditions | ${site.name}`,
    description: "Terms and conditions for using the Patterson Peptides informational website.",
    url: "/terms",
  },
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of terms",
    body: [
      `By accessing or using this website you agree to these Terms & Conditions. If you do not agree with them, please do not use the website.`,
      "These terms apply to your use of the website itself. This website is informational and does not offer ordering, purchasing, checkout, or payment functionality.",
    ],
  },
  {
    id: "research-use-only",
    title: "Research-use-only limitation",
    body: [
      `All materials described by ${site.name} are presented for in vitro and laboratory research by qualified researchers only.`,
      "Catalog information is published for reference. It is not an offer, and it does not create any agreement to supply a material.",
    ],
  },
  {
    id: "no-human-use",
    title: "No human use",
    body: [
      "Materials described on this website are not for human consumption or human administration by any route, and must not be represented, relabeled, or supplied as a food, supplement, cosmetic, drug, or medical device.",
    ],
  },
  {
    id: "no-veterinary-use",
    title: "No veterinary use",
    body: [
      "Materials described on this website are not for administration to animals and are not supplied for veterinary purposes of any kind.",
    ],
  },
  {
    id: "no-diagnostic-use",
    title: "No diagnostic use",
    body: [
      "Materials described on this website are not for use in diagnostic procedures or in any process used to inform decisions about the health of a person or animal.",
    ],
  },
  {
    id: "product-information",
    title: "Product information limitations",
    body: [
      "Names, descriptions, amounts, availability, and any reference pricing shown on this website may change at any time without notice, and may contain errors or omissions.",
      "No representation or warranty, express or implied, is made regarding the purity, composition, suitability, safety, efficacy, or regulatory status of any material described here.",
    ],
  },
  {
    id: "researcher-responsibility",
    title: "Researcher responsibility",
    body: [
      "You are responsible for evaluating whether any material is appropriate for your work, and for handling, storing, transporting, and disposing of it safely and lawfully.",
    ],
    bullets: [
      "You confirm you are a qualified researcher or acting on behalf of a qualified research organization.",
      "You confirm materials will be used strictly for in vitro and laboratory research.",
      "You accept responsibility for the safety of all personnel who may come into contact with these materials.",
    ],
  },
  {
    id: "regulatory-disclaimer",
    title: "Regulatory disclaimer",
    body: [
      "Nothing on this website states or implies that any material is approved, registered, cleared, or otherwise permitted for any use in any jurisdiction.",
      "Requirements vary by location and change over time. Determining and meeting the requirements that apply to you is your responsibility.",
    ],
  },
  {
    id: "age-restriction",
    title: "Age restriction",
    body: [
      "This website is intended for individuals who are at least 21 years of age. The acknowledgement shown on first visit is an informational age and research-use acknowledgement only; it is not verification of identity, age, or professional qualification.",
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    body: [
      "You agree to use this website lawfully and not to interfere with its operation, attempt to gain unauthorized access to it, or use automated means to disrupt it.",
      "The website is provided on an as-is and as-available basis, and may be modified, interrupted, or discontinued at any time.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      `The content of this website, including text, layout, graphics, and the ${site.name} name and logo, is the property of ${site.name} or its licensors, except where third-party material is identified as such.`,
      "You may view and print pages for your own reference. Any other reproduction, distribution, or commercial use requires prior written permission.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: [
      `To the fullest extent permitted by applicable law, ${site.name} is not liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from your use of this website, from any material described on it, or from reliance on any information published here.`,
    ],
  },
  {
    id: "changes",
    title: "Changes to terms",
    body: [
      "These terms may be updated from time to time. The revision date at the top of this page indicates when they were last changed, and continued use of the website after a change constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact information",
    body: [
      `Questions about these terms can be directed to ${site.name} on Instagram at ${site.instagramHandle}, or through the contact page on this website.`,
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Terms &amp;
          <br />
          Conditions
        </>
      }
      updated="September 16, 2026"
      intro="These terms govern your use of this informational website. They are written in plain language and are intended to be read alongside the disclaimer and privacy policy."
      sections={SECTIONS}
      footnote="These terms are provided as a general template and are not legal advice. They do not claim compliance with the laws of any particular jurisdiction. Patterson Peptides should have the final version reviewed by a qualified attorney before publication."
    />
  );
}
