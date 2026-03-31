import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://www.lizocalc.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "LizoCalc - Free Calculators for Financial, Fitness & Math and More",
    template: "%s | LizoCalc",
  },

  description:
    "LizoCalc offers free online calculators for finance, fitness, math, education, physics, and more. Simple, accurate, and fast tools designed to solve everyday calculations.",
  
  keywords: [
    "LizoCalc", "online calculator", "free calculator", "financial calculator",
    "loan calculator", "mortgage calculator", "BMI calculator", "fitness calculator",
    "math calculator", "conversion calculator", "scientific calculator"
  ],

  authors: [{ name: "LizoCalc" }],

  alternates: {
    canonical: BASE_URL,
  },

  // ✅ OPTIMIZED ICONS: Added 96x96 for Google Search results
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "LizoCalc",
    title: "LizoCalc - Free Online Calculators",
    description: "Professional online calculators for all your calculation needs",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "LizoCalc",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d111f",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LizoCalc",
    url: BASE_URL,
    // Using PNG here is safer for some legacy schema crawlers
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/lizocalc",
      "https://x.com/lizocalc",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        {/* Note: Next.js automatically injects favicon, apple-touch-icon, 
          canonical, and meta theme-color from the metadata/viewport 
          objects above. No need to repeat them manually. 
        */}
        
        {/* ✅ PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>

      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}