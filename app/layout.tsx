import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VerificationModal from "@/components/VerificationModal";
import { site } from "@/lib/site";

/**
 * Type system: a high-contrast display serif against a technical sans/mono
 * pair. Deliberately not a default UI font.
 */
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Research Materials for Qualified Researchers`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "research peptides",
    "laboratory research materials",
    "in vitro research",
    "research use only",
    "Patterson California research company",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Research Materials for Qualified Researchers`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Research Materials for Qualified Researchers`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSerif.variable} ${plexSans.variable} ${plexMono.variable} antialiased`}
      >
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <VerificationModal />
      </body>
    </html>
  );
}
