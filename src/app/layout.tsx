import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Analytics from "./components/Analytics";
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
  title: "FSD Africa — Finance that works for everyone",
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://fsdafrica.org",
    siteName: "FSD Africa",
    title: "FSD Africa — Finance that works for everyone",
    description:
      "FSD Africa partners with financial systems, policymakers, and innovators across the continent to build economies where every person and business can participate, grow, and thrive.",
    images: [
      {
        url: "https://fsdafrica.org/hero-banner.png",
        width: 1200,
        height: 630,
        alt: "FSD Africa — Shaping Africa's Financial Future",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FSD Africa — Finance that works for everyone",
    description:
      "FSD Africa partners with financial systems, policymakers, and innovators across the continent to build economies where every person and business can participate, grow, and thrive.",
    creator: "@FSDAfrica",
    images: ["https://fsdafrica.org/hero-banner.png"],
  },
  alternates: {
    canonical: "https://fsdafrica.org",
  },
  robots: {
    index: true,
    follow: true,
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
        <Analytics />
        <JsonLd />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
