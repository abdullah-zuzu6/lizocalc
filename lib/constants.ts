// SEO Constants and Configurations
export const SITE_NAME = 'LizoCalculator'
export const SITE_URL = 'https://lizocalculator.com'
export const SITE_DESCRIPTION = 'Professional online calculators for financial planning, fitness tracking, mathematics, and more. Fast, accurate, and easy to use.'

// Keywords for different calculator types
export const CALCULATOR_KEYWORDS = {
  financial: ['mortgage calculator', 'loan calculator', 'auto loan', 'interest calculator', 'payment calculator', 'financial calculator'],
  fitness: ['BMI calculator', 'calorie calculator', 'body fat calculator', 'BMR calculator', 'fitness calculator', 'health calculator'],
  math: ['scientific calculator', 'fraction calculator', 'percentage calculator', 'math calculator'],
  other: ['age calculator', 'GPA calculator', 'time calculator', 'date calculator', 'utility calculator'],
}

// Structured Data for Calculators
export const CALCULATOR_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  applicationCategory: 'Productivity',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
}

// Performance optimization hints
export const PERFORMANCE_CONFIG = {
  imageSizes: {
    hero: { width: 1200, height: 630 },
    thumbnail: { width: 400, height: 300 },
  },
  cacheControl: {
    static: 'public, max-age=31536000, immutable',
    dynamic: 'public, max-age=3600, stale-while-revalidate=86400',
  },
}

// Social Media Meta Tags
export const SOCIAL_MEDIA = {
  twitter: '@lizocalculator',
  facebook: 'lizocalculator',
  linkedin: 'company/lizocalculator',
}

// Breadcrumb Navigation Config
export const BREADCRUMBS = {
  financial: [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Financial', href: '/calculators/financial' },
  ],
  fitness: [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Fitness & Health', href: '/calculators/fitness' },
  ],
  math: [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Math', href: '/calculators/math' },
  ],
  other: [
    { label: 'Home', href: '/' },
    { label: 'Calculators', href: '/calculators' },
    { label: 'Other', href: '/calculators/other' },
  ],
}
