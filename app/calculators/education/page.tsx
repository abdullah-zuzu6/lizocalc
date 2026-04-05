import OtherCalculators from './OtherCalculators'

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Education Calculators | GPA, CGPA & Grade Calculators",
  description:
    "Free online education calculators for students. Calculate GPA, CGPA, semester grades, percentage to GPA conversion, and more with accurate, easy-to-use tools.",

  keywords: [
    "gpa calculator",
    "cgpa calculator",
    "grade calculator",
    "education calculator",
    "student tools",
    "gpa to percentage",
    "percentage to gpa",
    "semester gpa calculator",
    "academic calculator",
    "free student calculator",
  ],

  // Open Graph (Facebook, WhatsApp, LinkedIn, etc.)
  openGraph: {
    title: "Education Calculators | GPA, CGPA & Grade Calculators",
    description:
      "Free online GPA, CGPA, semester grade, and percentage converters for students. Fast, accurate tools by LizoCalc.",
    url: "https://www.lizocalc.com/calculators/education",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Education Calculators | GPA, CGPA & Grade Calculators",
    description:
      "Free GPA, CGPA, and grade calculators for students. Try LizoCalc’s accurate education tools now!",
    // creator: "@lizocalc",   // Uncomment and add your handle if you have one
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education",
  },
};
export default function Page() {
  return <OtherCalculators />
}