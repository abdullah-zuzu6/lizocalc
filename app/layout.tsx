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
    default:
      "LizoCalc - Free Calculators for Financial, Fitness & Math and More ",
    template: "%s | LizoCalc",
  },

  description:"LizoCalc offers free online calculators for finance, fitness, math, education,physics, and more. Simple, accurate, and fast tools designed to solve everyday calculations.",
  keywords: [
  "LizoCalc",
  "online calculator",
  "free calculator",
  "financial calculator",
  "loan calculator",
  "mortgage calculator",
  "BMI calculator",
  "fitness calculator",
  "math calculator",
  "conversion calculator",
  "scientific calculator",
  "easy online calculator",
  "fast calculator",
  "calculator for finance",
  "calculator for health",
],

  authors: [{ name: "LizoCalc" }],

  alternates: {
    canonical: BASE_URL,
  },

  // ✅ FIXED ICONS (PNG for browser, WEBP avoided here)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/logo.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
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
    description:
      "Professional online calculators for all your calculation needs",

    // ✅ WEBP for SEO (fast loading)
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

    // ✅ WEBP ok for structured data
    logo: `${BASE_URL}/logo.webp`,

    sameAs: [
      "https://www.facebook.com/lizocalc",
      "https://twitter.com/lizocalc",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning={true} >
      <head>
        {/* ✅ Favicon (browser friendly) */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* ✅ Apple devices */}
        <link rel="apple-touch-icon" href="/logo.png" />

        <meta name="theme-color" content="#0d111f" />

        {/* ✅ PWA */}
        <link rel="manifest" href="/manifest.json" />

        {/* ✅ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>

      <body
        className={`${inter.className} bg-background text-foreground antialiased`}
       >
        {children}
        <Analytics />
      </body>
    </html>
  );
}