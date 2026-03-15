import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import CookieBanner from '@/components/CookieBanner';
import { Analytics } from "@vercel/analytics/next";
const inter = Inter({ subsets: ['latin'] });
const BASE_URL = 'https://lizocalc.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: 'LizoCalc - Free Online Calculators for Financial, Fitness & Math', template: '%s | LizoCalc' },
  description: 'Professional online calculators for financial planning, fitness tracking, mathematics, and more.',
  keywords: ['calculator', 'mortgage calculator', 'loan calculator', 'BMI calculator'],
  authors: [{ name: 'LizoCalc' }],
  alternates: { canonical: BASE_URL },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'LizoCalc',
    title: 'LizoCalc - Free Online Calculators',
    description: 'Professional online calculators for all your calculation needs',
    images: [{ url: '/lizo-calc-logo.jpeg', width: 1200, height: 630, alt: 'LizoCalc' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0d111f',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LizoCalc',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    sameAs: [
      'https://www.facebook.com/lizocalc',
      'https://twitter.com/lizocalc',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="mask-icon" href="/logo.png" color="#0d111f" />
        <meta name="theme-color" content="#0d111f" />

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}