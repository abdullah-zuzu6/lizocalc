import { Metadata } from "next";

import AdvancedPaymentCalculator from "./clientside";

import { CreditCard } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";

const faqData = [
  {
    question: "How is a loan payment calculated?",
    answer:
      "The monthly payment is calculated using the standard amortization formula based on your total loan principal, annual interest rate, and the loan term.",
  },
  {
    question: "Can I adjust my payment frequency?",
    answer:
      "Yes, our calculator allows you to view payment breakdowns across different frequencies, such as monthly, bi-weekly, or weekly, to help you plan your budget.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Payment Calculator ",
  description:
    "Use our advanced payment calculator to estimate monthly loan payments, interest costs, and repayment schedules instantly.",

  keywords: [
    "payment calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "repayment calculator",
    "advanced payment calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/payment-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Payment Calculator | LizoCalc",
    description:
      "Free advanced payment calculator to calculate monthly loan payments and amortization.",
    url: "https://lizocalc.com/calculators/financial/payment-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Payment Calculator | LizoCalc",
    description:
      "Calculate loan payments, interest, and amortization schedules with our free payment calculator.",
  },
};

export default function PaymentPage() {
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
                  "https://lizocalc.com/calculators/financial/payment-calculator#breadcrumb",
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
                    name: "Payment Calculator",
                    item: "https://lizocalc.com/calculators/financial/payment-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/payment-calculator",
                url: "https://lizocalc.com/calculators/financial/payment-calculator",
                name: "Advanced Payment Calculator",
                description: "Use our advanced payment calculator to estimate monthly loan payments, interest costs, and repayment schedules instantly.",
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
                  "https://lizocalc.com/calculators/financial/payment-calculator#app",
                name: "Advanced Payment Calculator",
                url: "https://lizocalc.com/calculators/financial/payment-calculator",
                description:
                  "Advanced payment calculator to estimate monthly payments, interest, and complete amortization schedule.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Payment Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate monthly loan payments",
                  "Estimate total interest payable",
                  "View full amortization schedule",
                  "Compare payment frequencies",
                  "Assess impact of extra principal payments",
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
              Payment Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedPaymentCalculator />
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
          What is this Payment Calculator?
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