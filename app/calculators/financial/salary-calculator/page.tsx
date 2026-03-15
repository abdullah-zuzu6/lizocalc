import { Metadata } from "next";
import AdvancedSalaryCalculator from "./clientside";
import { DollarSign } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is net salary calculated?",
    answer:
      "Net salary is calculated by taking your gross annual income and subtracting applicable federal, state, and local taxes, as well as any voluntary deductions like retirement contributions.",
  },
  {
    question: "Does this calculator account for bonuses?",
    answer:
      "Yes, our calculator includes fields to incorporate annual bonuses and other supplemental income to provide a more accurate picture of your total take-home pay.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Salary Calculator ",
  description:
    "Use our advanced salary calculator to estimate your net take-home pay after taxes, deductions, and bonuses instantly.",

  keywords: [
    "salary calculator",
    "take-home pay calculator",
    "net pay calculator",
    "annual salary calculator",
    "advanced salary calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/salary-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Salary Calculator | LizoCalc",
    description:
      "Free advanced salary calculator to estimate your net take-home pay and tax breakdown.",
    url: "https://lizocalc.com/calculators/financial/salary-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Salary Calculator | LizoCalc",
    description:
      "Calculate your net take-home pay, tax deductions, and bonuses with our free salary calculator.",
  },
};

export default function SalaryPage() {
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
                  "https://lizocalc.com/calculators/financial/salary-calculator#breadcrumb",
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
                    name: "Salary Calculator",
                    item: "https://lizocalc.com/calculators/financial/salary-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/salary-calculator",
                url: "https://lizocalc.com/calculators/financial/salary-calculator",
                name: "Advanced Salary Calculator",
                description: "Use our advanced salary calculator to estimate your net take-home pay after taxes, deductions, and bonuses instantly.",
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
                  "https://lizocalc.com/calculators/financial/salary-calculator#app",
                name: "Advanced Salary Calculator",
                url: "https://lizocalc.com/calculators/financial/salary-calculator",
                description:
                  "Advanced salary calculator to estimate net pay, tax impact, and annual take-home income.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Salary Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate net take-home pay",
                  "Estimate federal and state tax impact",
                  "Incorporate annual bonuses",
                  "Calculate pay periods (monthly, bi-weekly)",
                  "Factor in pre-tax deductions",
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
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Salary Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedSalaryCalculator />
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
          What is this Salary Calculator?
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