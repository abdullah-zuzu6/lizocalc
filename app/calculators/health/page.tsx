import type { Metadata } from 'next';
import FitnessCalculators from './OtherCalculator';

export const metadata: Metadata = {
  title: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
  description:
    "Free online health and fitness calculators. Calculate BMI, BMR, TDEE, daily calories, body fat percentage, macros, and more with accurate, easy-to-use tools.",

  keywords: [
    "health calculators",
    "fitness calculators",
    "bmi calculator",
    "bmr calculator",
    "tdee calculator",
    "calorie calculator",
    "body fat calculator",
    "macros calculator",
    "ideal weight calculator",
    "body fat percentage calculator",
    "fitness tools",
  ],

  // Open Graph
  openGraph: {
    title: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
    description:
      "Free BMI, BMR, TDEE, calorie, and body fat calculators to help you achieve your health and fitness goals.",
    url: "https://www.lizocalc.com/calculators/health",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Health & Fitness Calculators | BMI, BMR, TDEE & Calorie Tools",
    description:
      "Free online BMI, BMR, TDEE, calorie, and fitness calculators by LizoCalc.",
  },

  // Other SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health",
  },
};

export default function Page() {
  return <FitnessCalculators />;
}