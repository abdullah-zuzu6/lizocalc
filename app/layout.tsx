import React from "react"
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LizoCalculator - Free Online Calculators for Financial, Fitness & Math',
  description: 'Professional online calculators for financial planning, fitness tracking, mathematics, and more. Fast, accurate, and easy to use.',
  keywords: 'calculator, mortgage calculator, loan calculator, BMI calculator, scientific calculator, free calculator online',
  authors: [{ name: 'LizoCalculator' }],
  metadataBase: new URL('https://lizocalculator.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://lizocalculator.com',
    siteName: 'LizoCalculator',
    title: 'LizoCalculator - Free Online Calculators',
    description: 'Professional online calculators for all your calculation needs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LizoCalculator',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0d111f',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LizoCalculator',
    url: 'https://lizocalculator.com',
    logo: 'https://lizocalculator.com/logo.png',
    description: 'Professional online calculators for financial planning, fitness tracking, and mathematics',
    sameAs: [
      'https://www.facebook.com/lizocalculator',
      'https://twitter.com/lizocalculator',
      'https://www.linkedin.com/company/lizocalculator',
    ],
    contact: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Service',
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://lizocalculator.com" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0d111f" />
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
      </body>
    </html>
  )
}
