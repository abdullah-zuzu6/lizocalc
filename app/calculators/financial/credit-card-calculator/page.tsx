import { Metadata } from "next";

import { CreditCard } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";
import CreditCardPayoffCalculator from "./clientside";

const faqData = [
  {
    question: "How is a credit card payment calculated?",
    answer:
      "Credit card payments are calculated based on your outstanding balance, the annual percentage rate (APR), and the amount you choose to pay towards the principal each month.",
  },
  {
    question: "Can I pay off my balance faster?",
    answer:
      "Yes, our calculator includes an extra payment field to show you how much interest you can save and how much faster you can become debt-free by paying more than the minimum.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Credit Card Calculator ",
  description:
    "Use our advanced credit card calculator to estimate monthly payments, total interest costs, and time to become debt-free instantly.",

  keywords: [
    "credit card calculator",
    "credit card payoff calculator",
    "debt payoff calculator",
    "monthly payment calculator",
    "advanced credit card calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/credit-card-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Credit Card Calculator | LizoCalc",
    description:
      "Free advanced credit card calculator to calculate monthly payments and debt repayment timelines.",
    url: "https://lizocalc.com/calculators/financial/credit-card-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Credit Card Calculator | LizoCalc",
    description:
      "Calculate credit card payments, interest, and payoff dates with our free credit card calculator.",
  },
};

export default function CreditCardPage() {
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
                  "https://lizocalc.com/calculators/financial/credit-card-calculator#breadcrumb",
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
                    name: "Credit Card Calculator",
                    item: "https://lizocalc.com/calculators/financial/credit-card-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/credit-card-calculator",
                url: "https://lizocalc.com/calculators/financial/credit-card-calculator",
                name: "Advanced Credit Card Calculator",
                description: "Use our advanced credit card calculator to estimate monthly payments, total interest costs, and time to become debt-free instantly.",
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
                  "https://lizocalc.com/calculators/financial/credit-card-calculator#app",
                name: "Advanced Credit Card Calculator",
                url: "https://lizocalc.com/calculators/financial/credit-card-calculator",
                description:
                  "Advanced credit card calculator to estimate monthly payments, total interest, and debt repayment schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Credit Card Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly credit card payments",
                  "Estimate total interest paid",
                  "View debt repayment schedule",
                  "Add extra monthly payments",
                  "Calculate time to reach zero balance",
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
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Credit Card Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <CreditCardPayoffCalculator/>
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
          What is this Credit Card Calculator?
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