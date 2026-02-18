import type { Metadata } from 'next'

interface CalculatorMetadata {
  title: string
  description: string
  keywords: string[]
  category: 'financial' | 'fitness' | 'math' | 'other'
  slug: string
}

export function generateCalculatorMetadata(config: CalculatorMetadata): Metadata {
  const fullTitle = `${config.title} - Free Online Calculator | LizoCalculator`
  const fullDescription = `${config.description} Fast and accurate calculations. No registration required.`

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: [...config.keywords, 'calculator', 'free online calculator', 'lizo calculator'],
    authors: [{ name: 'LizoCalculator' }],
    metadataBase: new URL('https://lizocalculator.com'),
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `https://lizocalculator.com/calculator/${config.slug}`,
      siteName: 'LizoCalculator',
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
    '@type': 'WebApplication',
    name: config.title,
    description: config.description,
    url: `https://lizocalculator.com/calculator/${config.slug}`,
    applicationCategory: 'Productivity',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'LizoCalculator',
      url: 'https://lizocalculator.com',
    },
  }
}

export function getCategoryPath(category: string): string {
  const categoryMap: Record<string, string> = {
    financial: '/calculators/financial',
    fitness: '/calculators/fitness',
    math: '/calculators/math',
    other: '/calculators/other',
  }
  return categoryMap[category] || '/calculators'
}
