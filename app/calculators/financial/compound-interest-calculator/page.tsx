import { Metadata } from "next";


import { TrendingUp } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";
import CompoundInterestCalculator from "./clientside";

const faqData = [
  {
    question: "How is compound interest calculated?",
    answer:
      "Compound interest is calculated by multiplying the initial principal amount by one plus the annual interest rate raised to the number of compound periods, minus the original principal.",
  },
  {
    question: "Can I add regular contributions?",
    answer:
      "Yes, our calculator includes a recurring contribution field to show you how consistent saving impacts your long-term wealth growth.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Compound Interest Calculator ",
  description:
    "Use our advanced compound interest calculator to estimate investment growth, total interest, and future value instantly.",

  keywords: [
    "compound interest calculator",
    "investment growth calculator",
    "future value calculator",
    "interest calculator",
    "advanced compound interest calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/compound-interest-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Compound Interest Calculator | LizoCalc",
    description:
      "Free advanced compound interest calculator to calculate investment returns and future value.",
    url: "https://lizocalc.com/calculators/financial/compound-interest-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Compound Interest Calculator | LizoCalc",
    description:
      "Calculate investment growth, interest, and future value with our free compound interest calculator.",
  },
};

export default function CompoundInterestPage() {
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
                  "https://lizocalc.com/calculators/financial/compound-interest-calculator#breadcrumb",
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
                    name: "Compound Interest Calculator",
                    item: "https://lizocalc.com/calculators/financial/compound-interest-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/compound-interest-calculator",
                url: "https://lizocalc.com/calculators/financial/compound-interest-calculator",
                name: "Advanced Compound Interest Calculator",
                description: "Use our advanced compound interest calculator to estimate investment growth, total interest, and future value instantly.",
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
                  "https://lizocalc.com/calculators/financial/compound-interest-calculator#app",
                name: "Advanced Compound Interest Calculator",
                url: "https://lizocalc.com/calculators/financial/compound-interest-calculator",
                description:
                  "Advanced compound interest calculator to estimate future value, total interest, and investment growth over time.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Compound Interest Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate future investment value",
                  "Estimate total interest earned",
                  "Visualize compound interest growth",
                  "Include monthly or annual contributions",
                  "Adjust compounding frequency",
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
              Compound Interest Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        
        <CompoundInterestCalculator/>
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
          What is this Compound Interest Calculator?
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