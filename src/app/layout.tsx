import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Analytics from "./components/Analytics";
import PageViewTracker from "./components/PageViewTracker";
import JsonLd from "./components/JsonLd";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fsdafrica.org"),
  title: {
    template: "%s | FSD Africa",
    default: "FSD Africa — Finance that works for everyone",
  },
  description:
    "FSD Africa partners with financial systems, policymakers, and innovators across the continent to build economies where every person and business can participate, grow, and thrive.",
  keywords: [
    "FSD Africa",
    "financial inclusion",
    "Africa finance",
    "climate finance",
    "capital markets",
    "policy",
    "development",
  ],
  authors: [{ name: "FSD Africa" }],
  creator: "FSD Africa",
  publisher: "FSD Africa",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "FSD Africa",
    images: [
      {
        url: "/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "FSD Africa — Shaping Africa's Financial Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@FSDAfrica",
    images: ["/hero-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              className="hidden invisible"
              title="gtm"
            />
          </noscript>
        )}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:text-white focus:text-xs focus:font-semibold focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to main content
        </a>
        <Analytics />
        <PageViewTracker />
        <JsonLd />
        <header>
          <Navigation />
        </header>
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </body>
    </html>
  );
}
