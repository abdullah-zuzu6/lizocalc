import type { Metadata } from 'next'

interface CalculatorMetadata {
  title: string
  description: string
  keywords: string[]
  category: 'financial' | 'fitness' | 'math' | 'education'|'time'|'physics'
  slug: string
}

// lib/seo.ts
export function getCategoryPath(category: string): string {
  const categoryMap: Record<string, string> = {
    financial: '/calculators/financial',
    health: '/calculators/health',
    math: '/calculators/math',
    time: '/calculators/time',
    education: '/calculators/education',
    physics: '/calculators/physics',
  }
  return categoryMap[category] || '/calculators'
}
export function generateCalculatorMetadata(config: CalculatorMetadata): Metadata {
  const fullTitle = `${config.title} - Free Online Calculator | LizoCalc`
  const fullDescription = `${config.description} Fast and accurate calculations. No registration required.`
  const calculatorUrl = `https://lizocalc.com${getCategoryPath(config.category)}/${config.slug}`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...config.keywords, 'calculator', 'free online calculator', 'lizo calc'],
    authors: [{ name: 'LizoCalc' }],
    metadataBase: new URL('https://lizocalc.com'),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: calculatorUrl,
      siteName: 'LizoCalc',
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: config.title,
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
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: ['/og-image.jpg'],
    },
  }
}

export function generateStructuredData(config: CalculatorMetadata) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.title,
    description: config.description,
    url: `https://lizocalc.com${getCategoryPath(config.category)}/${config.slug}`,
    applicationCategory: 'Productivity',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'LizoCalc',
      url: 'https://lizocalc.com',
    },
  }
}