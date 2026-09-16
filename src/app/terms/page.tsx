import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of sale",
  description: "Terms of sale, shipping, and returns for Patterson Peptides research compounds.",
};

const SECTIONS = [
  {
    id: "use",
    title: "Research use only",
    body: [
      "All products sold by Patterson Peptides are intended solely for laboratory research and in-vitro experimentation by qualified professionals.",
      "Products are not drugs, foods, dietary supplements, cosmetics, or medical devices. They are not intended to diagnose, treat, cure, or prevent any condition, and must not be administered to humans or animals.",
      "By placing an order you represent that you are a qualified researcher or authorized purchasing agent, and that the materials will be used and stored in accordance with applicable laws and your institution's safety policies.",
    ],
  },
  {
    id: "orders",
    title: "Orders & eligibility",
    body: [
      "Orders are reviewed before a payment link is issued. We may request institutional verification and may decline any order at our discretion.",
      "Prices are listed in USD and may change without notice. An order is not binding until we confirm it in writing.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping",
    body: [
      "Domestic orders placed before 14:00 CT on a business day typically ship the same day; all others ship within 48 hours.",
      "Orders ship in insulated packaging with gel packs. Flat-rate domestic shipping is $12.00, and is waived on orders of $200.00 or more.",
      "Title and risk of loss pass to the buyer on delivery to the carrier. The buyer is responsible for any import duties, taxes, and compliance with local import restrictions.",
    ],
  },
  {
    id: "returns",
    title: "Returns & claims",
    body: [
      "Because these are temperature-sensitive research materials, we do not accept returns of opened or reconstituted product.",
      "If a shipment arrives damaged, or if analytical results do not match the certificate of analysis for the lot, contact us within 10 days of delivery with the lot number and supporting data. Verified claims are replaced or refunded in full.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "Products are supplied without warranty of fitness for any particular purpose beyond conformance to the published certificate of analysis for the lot.",
      "To the maximum extent permitted by law, our aggregate liability arising from any order is limited to the purchase price paid for the product in question.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of sale</h1>
      <p className="mt-3 text-sm text-muted">
        These terms are a general template and are not legal advice. Have counsel review them before
        selling.
      </p>

      <div className="mt-10 space-y-10">
        {SECTIONS.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24">
            <h2 className="text-lg font-semibold tracking-tight">{s.title}</h2>
            <div className="mt-3 space-y-3">
              {s.body.map((p) => (
                <p key={p} className="text-sm leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
