import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Instrument_Serif, Rubik } from "next/font/google";
import { Background } from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { RevealGate } from "@/components/layout/RevealGate";
import { ScrollThumb } from "@/components/layout/ScrollThumb";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Share card defaults (pages override them with their own pageMetadata). No canonical here:
// it would leak to pages that don't set one, like the 404.
const { openGraph, twitter } = pageMetadata({ description: site.description, path: "/" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} - ${site.role}`,
    template: `%s - ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  // Indexing is the default; only widen Google's previews. (An explicit "index" here would
  // contradict the "noindex" Next adds on the 404.)
  robots: { googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
  openGraph,
  twitter,
};

export const viewport: Viewport = {
  themeColor: "#060907",
  colorScheme: "dark",
  // Draw under the iPhone notch / home indicator; safe areas are padded in CSS.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" data-scroll-behavior="smooth" className={`${instrumentSerif.variable} ${rubik.variable} ${geistMono.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-on-accent"
        >
          Aller au contenu
        </a>
        <Background />
        <Navbar />
        {children}
        <ScrollThumb />
        <RevealGate />
        <Analytics />
      </body>
    </html>
  );
}
