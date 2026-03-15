import { Metadata } from "next";

import AdvancedInflationCalculator from "./clientside";

import { TrendingUp } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";

const faqData = [
  {
    question: "How is inflation calculated?",
    answer:
      "Inflation is calculated by tracking the change in price of a basket of goods and services over time, typically using the Consumer Price Index (CPI).",
  },
  {
    question: "Why should I use an inflation calculator?",
    answer:
      "An inflation calculator helps you understand how the purchasing power of your money changes over time, allowing you to adjust for the rising cost of living.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Inflation Calculator ",
  description:
    "Use our advanced inflation calculator to estimate the change in purchasing power, historical inflation rates, and future value of money instantly.",

  keywords: [
    "inflation calculator",
    "purchasing power calculator",
    "historical inflation calculator",
    "cost of living calculator",
    "advanced inflation calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/inflation-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Inflation Calculator | LizoCalc",
    description:
      "Free advanced inflation calculator to calculate purchasing power and historical price changes.",
    url: "https://lizocalc.com/calculators/financial/inflation-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Inflation Calculator | LizoCalc",
    description:
      "Calculate inflation rates, purchasing power, and historical value with our free inflation calculator.",
  },
};

export default function InflationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT (BEST PRACTICE) === */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/financial/inflation-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Financial Calculators",
                    item: "https://lizocalc.com/calculators/financial",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Inflation Calculator",
                    item: "https://lizocalc.com/calculators/financial/inflation-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/inflation-calculator",
                url: "https://lizocalc.com/calculators/financial/inflation-calculator",
                name: "Advanced Inflation Calculator",
                description: "Use our advanced inflation calculator to estimate the change in purchasing power, historical inflation rates, and future value of money instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/financial/inflation-calculator#app",
                name: "Advanced Inflation Calculator",
                url: "https://lizocalc.com/calculators/financial/inflation-calculator",
                description:
                  "Advanced inflation calculator to estimate changes in purchasing power and historical price trends.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Inflation Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate inflation-adjusted value",
                  "Estimate historical purchasing power",
                  "Compare costs across different years",
                  "Analyze CPI-based data",
                  "Visualize inflation trends",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Inflation Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedInflationCalculator />
      </section>

      {/* SEO Content */}
      <article
        className="max-w-6xl mx-auto px-6 py-16 
        prose prose-blue prose-lg lg:prose-xl
        prose-headings:font-extrabold
        prose-h2:text-blue-900
        prose-h2:border-b-2
        prose-h2:border-blue-200
        prose-h2:pb-2
        prose-p:text-gray-600
        prose-p:leading-relaxed"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          What is this Inflation Calculator?
        </h2>

        <p>1000+ words of SEO content here...</p>

        <h3>How it works</h3>

        <p>Your explanation...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}