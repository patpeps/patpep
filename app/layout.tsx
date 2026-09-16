import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VerificationModal from "@/components/VerificationModal";
import { site } from "@/lib/site";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    card: "summary",
    title: `${site.name} — Research Materials for Qualified Researchers`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <DisclaimerBanner variant="bar" />
        <Navbar />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <Footer />
        <VerificationModal />
      </body>
    </html>
  );
}
