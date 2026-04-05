import type { Metadata } from 'next';
import MathCalculators from './OtheCalculators';

export const metadata: Metadata = {
  title: "Math Calculators | Scientific, Percentage, Fraction & Algebra Tools",
  description:
    "Free online math calculators including scientific calculator, percentage, fraction, LCM, GCF, algebra, trigonometry, statistics, and more. Fast and accurate results.",

  keywords: [
    "math calculators",
    "scientific calculator",
    "percentage calculator",
    "fraction calculator",
    "lcm calculator",
    "gcf calculator",
    "algebra calculator",
    "triangle calculator",
    "trigonometry calculator",
    "binary calculator",
    "statistics calculator",
    "permutation combination calculator",
  ],

  // Open Graph
  openGraph: {
    title: "Math Calculators | Scientific, Percentage, Fraction & Algebra Tools",
    description:
      "Free online math calculators: scientific, percentage, fraction, LCM, GCF, algebra, and more. Accurate and easy to use.",
    url: "https://www.lizocalc.com/calculators/math",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Math Calculators | Scientific, Percentage, Fraction & Algebra Tools",
    description:
      "Free scientific calculator, percentage, fraction, LCM, GCF, and algebra tools by LizoCalc.",
  },

  // Other SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math",
  },
};

export default function Page() {
  return <MathCalculators />;
}