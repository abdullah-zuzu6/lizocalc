import React from "react";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const BASE_URL = "https://www.lizocalc.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  applicationName: "LizoCalc",

  title: {
    default: "LizoCalc - Free Online Calculators for Finance, Fitness & Math",
    template: "%s | LizoCalc",
  },

  description:
    "LizoCalc offers free online calculators for finance, fitness, math, education, physics, and more. Simple, accurate, and fast tools designed to solve everyday calculations.",

  keywords: [
    "LizoCalc", "lizocalc calculator", "online calculator", "free calculator", "financial calculator",
    "loan calculator", "mortgage calculator", "BMI calculator", "fitness calculator",
    "math calculator", "conversion calculator", "scientific calculator"
  ],

  authors: [{ name: "LizoCalc", url: BASE_URL }],
  creator: "LizoCalc",
  publisher: "LizoCalc",

  alternates: {
    canonical: BASE_URL,
  },

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

  twitter: {
    card: "summary_large_image",
    title: "LizoCalc - Free Online Calculators",
    description: "Free calculators for finance, health, math and physics.",
    images: ["/logo.webp"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Replace with your actual Search Console verification code once you have it
  // verification: {
  //   google: "your-google-site-verification-code",
  // },
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
    alternateName: "Lizo Calc",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      "https://www.facebook.com/lizocalc",
      "https://x.com/lizocalc",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LizoCalc",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="manifest" href="/manifest.json" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
      </head>

      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W122RNR3R4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W122RNR3R4');
          `}
        </Script>

        <Analytics />
      </body>
    </html>
  );
}