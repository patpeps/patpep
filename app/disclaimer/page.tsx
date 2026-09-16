import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Research-use disclaimer for Patterson Peptides. Products are supplied for in vitro and laboratory research only and are not for human or veterinary use.",
  alternates: { canonical: "/disclaimer" },
  openGraph: {
    title: `Disclaimer | ${site.name}`,
    description:
      "Research-use disclaimer: materials are for in vitro and laboratory research only.",
    url: "/disclaimer",
  },
};

const SECTIONS: LegalSection[] = [
  {
    id: "research-use-only",
    title: "Research use only",
    body: [
      `${site.name} provides research materials exclusively for qualified research purposes. Products displayed on this website are intended solely for in vitro and laboratory research and are not intended for human consumption, human administration, veterinary use, or diagnostic procedures.`,
      "Products have not been evaluated by the U.S. Food and Drug Administration for safety or efficacy for human or veterinary use.",
    ],
  },
  {
    id: "no-human-or-veterinary-use",
    title: "No human or veterinary use",
    body: [
      "Materials described on this website must not be administered to humans or animals in any form or by any route. They are not foods, dietary supplements, cosmetics, drugs, or medical devices, and must not be relabeled, repackaged, or represented as such.",
      "Any use outside a controlled research setting is outside the intended use of these materials and is undertaken solely at the user's own risk.",
    ],
  },
  {
    id: "no-medical-advice",
    title: "No medical advice",
    body: [
      "Nothing on this website is medical, clinical, veterinary, or professional advice, and nothing here should be used to diagnose, treat, cure, prevent, or manage any condition. Information is provided for general reference by researchers only.",
      "If you have a medical question or concern, consult a licensed healthcare professional.",
    ],
  },
  {
    id: "no-diagnostic-use",
    title: "No diagnostic use",
    body: [
      "Materials described on this website are not intended for use in diagnostic procedures, clinical testing, or any process used to inform decisions about the health of a person or animal.",
    ],
  },
  {
    id: "qualified-researcher-responsibility",
    title: "Qualified researcher responsibility",
    body: [
      "These materials are intended for individuals and organizations with the training, facilities, and experience required to handle research compounds safely.",
      "The researcher is solely responsible for determining suitability for a given application, for experimental design and interpretation, and for the safety of everyone who may come into contact with the material.",
    ],
  },
  {
    id: "regulatory-compliance",
    title: "Regulatory compliance",
    body: [
      "Laws, regulations, and institutional policies governing the purchase, possession, handling, storage, transport, and disposal of research materials differ by jurisdiction and change over time.",
      "It is the researcher's responsibility to determine which requirements apply to them and to comply with them. Nothing on this website states or implies that any material is approved, registered, permitted, or otherwise cleared for use in a given jurisdiction or application.",
    ],
  },
  {
    id: "proper-laboratory-handling",
    title: "Proper laboratory handling",
    body: [
      "Materials should be handled only in an appropriate laboratory setting by trained personnel using suitable protective equipment and procedures.",
    ],
    bullets: [
      "Follow your institution's safety, handling, and disposal procedures.",
      "Store materials as indicated for the material in question and keep them out of reach of children and untrained individuals.",
      "Do not use materials in any setting where they could be mistaken for a consumable product.",
    ],
  },
  {
    id: "product-information",
    title: "Product information",
    body: [
      "Catalog information on this website — including names, descriptions, amounts, availability, and any reference pricing — is provided for general information and may change without notice.",
      "We make no representation or warranty, express or implied, as to the purity, composition, stability, suitability, safety, efficacy, or regulatory status of any material described on this website.",
    ],
  },
  {
    id: "no-therapeutic-claims",
    title: "No therapeutic claims",
    body: [
      "No statement on this website should be read as a claim that any material treats, cures, prevents, mitigates, improves, or otherwise affects any disease, condition, or physical characteristic. We make no performance, cosmetic, anti-aging, weight, or muscle-related claims of any kind.",
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of liability",
    body: [
      `To the fullest extent permitted by applicable law, ${site.name} is not liable for any direct, indirect, incidental, special, consequential, or exemplary damages arising from the use or misuse of any material described on this website, or from reliance on any information published here.`,
      "By using this website you accept that any use of research materials is undertaken at your own risk and under your own professional judgement.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Disclaimer"
      updated="September 16, 2026"
      intro={`${site.name} provides research materials exclusively for qualified research purposes. Please read this disclaimer in full before using this website or any material described on it.`}
      sections={SECTIONS}
      footnote="This disclaimer is provided as general informational text and is not legal advice. Patterson Peptides should have its final disclaimer reviewed by a qualified attorney before publication."
    />
  );
}
