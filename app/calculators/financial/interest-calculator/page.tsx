import { Metadata } from "next";

import AdvancedInterestCalculator from "./clientside";

import { Percent } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";

const faqData = [
  {
    question: "How is compound interest calculated?",
    answer:
      "Compound interest is calculated by applying the interest rate to the principal amount plus any previously accumulated interest over a specific period.",
  },
  {
    question: "What is the difference between simple and compound interest?",
    answer:
      "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus the accumulated interest from previous periods.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Interest Calculator ",
  description:
    "Use our advanced interest calculator to estimate simple and compound interest, total growth, and investment earnings instantly.",

  keywords: [
    "interest calculator",
    "compound interest calculator",
    "simple interest calculator",
    "investment growth calculator",
    "advanced interest calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/interest-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Interest Calculator | LizoCalc",
    description:
      "Free advanced interest calculator to calculate simple and compound interest growth.",
    url: "https://lizocalc.com/calculators/financial/interest-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Interest Calculator | LizoCalc",
    description:
      "Calculate simple and compound interest, investment growth, and total returns with our free interest calculator.",
  },
};

export default function InterestPage() {
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
                  "https://lizocalc.com/calculators/financial/interest-calculator#breadcrumb",
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
                    name: "Interest Calculator",
                    item: "https://lizocalc.com/calculators/financial/interest-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/interest-calculator",
                url: "https://lizocalc.com/calculators/financial/interest-calculator",
                name: "Advanced Interest Calculator",
                description: "Use our advanced interest calculator to estimate simple and compound interest, total growth, and investment earnings instantly.",
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
                  "https://lizocalc.com/calculators/financial/interest-calculator#app",
                name: "Advanced Interest Calculator",
                url: "https://lizocalc.com/calculators/financial/interest-calculator",
                description:
                  "Advanced interest calculator to estimate simple and compound interest, growth over time, and total returns.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Interest Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate simple interest",
                  "Calculate compound interest",
                  "Estimate total investment growth",
                  "Compare different compounding frequencies",
                  "Visualize earnings over time",
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
              <Percent className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Interest Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedInterestCalculator />
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
          What is this Interest Calculator?
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