import { Metadata } from "next";


import { Car } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";
import AutoLoanCalculator from "./clientside";

const faqData = [
  {
    question: "How is an auto loan payment calculated?",
    answer:
      "The monthly payment is calculated using the standard amortization formula based on your loan amount, interest rate, and the loan term in months.",
  },
  {
    question: "Can I make extra payments?",
    answer:
      "Yes, our calculator includes an extra payment field to show you how much interest you can save and how much faster you can pay off your vehicle loan.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Auto Loan Calculator ",
  description:
    "Use our advanced auto loan calculator to estimate monthly payments, total interest, and loan payoff timelines instantly.",

  keywords: [
    "auto loan calculator",
    "car loan calculator",
    "auto finance calculator",
    "monthly car payment calculator",
    "advanced auto loan calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/auto-loan-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Auto Loan Calculator | LizoCalc",
    description:
      "Free advanced auto loan calculator to calculate monthly car payments and total interest.",
    url: "https://lizocalc.com/calculators/financial/auto-loan-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Auto Loan Calculator | LizoCalc",
    description:
      "Calculate car loan payments, interest, and payoff schedules with our free auto loan calculator.",
  },
};

export default function AutoLoanPage() {
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
                  "https://lizocalc.com/calculators/financial/auto-loan-calculator#breadcrumb",
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
                    name: "Auto Loan Calculator",
                    item: "https://lizocalc.com/calculators/financial/auto-loan-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/auto-loan-calculator",
                url: "https://lizocalc.com/calculators/financial/auto-loan-calculator",
                name: "Advanced Auto Loan Calculator",
                description: "Use our advanced auto loan calculator to estimate monthly payments, total interest, and loan payoff timelines instantly.",
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
                  "https://lizocalc.com/calculators/financial/auto-loan-calculator#app",
                name: "Advanced Auto Loan Calculator",
                url: "https://lizocalc.com/calculators/financial/auto-loan-calculator",
                description:
                  "Advanced auto loan calculator to estimate monthly payments, interest, and loan amortization schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Auto Loan Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly auto loan payments",
                  "Estimate total interest cost",
                  "View loan amortization schedule",
                  "Add extra monthly payments",
                  "Calculate payoff timeline",
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
              <Car className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Auto Loan Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
      
        <AutoLoanCalculator/>
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
          What is this Auto Loan Calculator?
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