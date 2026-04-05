import type { Metadata } from 'next';
import FinancialCalculators from './OtherCalculator';

export const metadata: Metadata = {
  title: "Financial Calculators | Mortgage, Loan, EMI, ROI & Salary Tools",
  description:
    "Free online financial calculators including mortgage, loan EMI, compound interest, ROI, inflation, salary, and savings tools. Make smart financial decisions with accurate calculations.",

  keywords: [
    "financial calculators",
    "mortgage calculator",
    "loan calculator",
    "emi calculator",
    "auto loan calculator",
    "compound interest calculator",
    "interest calculator",
    "inflation calculator",
    "salary calculator",
    "roi calculator",
    "payment calculator",
    "savings calculator",
  ],

  // Open Graph
  openGraph: {
    title: "Financial Calculators | Mortgage, Loan, EMI, ROI & Salary Tools",
    description:
      "Free financial calculators for mortgage, loan EMI, compound interest, ROI, inflation, and salary. Accurate tools for better financial planning.",
    url: "https://www.lizocalc.com/calculators/financial",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
  },

  // Twitter / X Cards
  twitter: {
    card: "summary_large_image",
    title: "Financial Calculators | Mortgage, Loan, EMI, ROI & Salary Tools",
    description:
      "Free online mortgage, loan EMI, compound interest, ROI, and salary calculators by LizoCalc.",
  },

  // Other SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/financial",
  },
};

export default function Page() {
  return <FinancialCalculators />;
}