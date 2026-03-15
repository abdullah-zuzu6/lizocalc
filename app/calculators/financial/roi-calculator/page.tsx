import { Metadata } from "next";



import { PieChart } from "lucide-react";

import Footer from "@/components/Footer";

import Navbar from "@/components/Navbar";

import FAQ from "@/components/FAQ";

import Script from "next/script";
import ROICalculator from "./clientside";

const faqData = [
  {
    question: "How is ROI calculated?",
    answer:
      "Return on Investment (ROI) is calculated by taking the net profit from an investment and dividing it by the original cost of the investment, expressed as a percentage.",
  },
  {
    question: "Why should I use an ROI calculator?",
    answer:
      "An ROI calculator helps you quickly evaluate the efficiency and profitability of different investment opportunities, allowing you to make more informed financial decisions.",
  },
];

export const metadata: Metadata = {
  title: "Advanced ROI Calculator ",
  description:
    "Use our advanced ROI calculator to estimate the return on investment, net profit, and investment efficiency instantly.",

  keywords: [
    "roi calculator",
    "return on investment calculator",
    "investment profit calculator",
    "investment performance calculator",
    "advanced roi calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/financial/roi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced ROI Calculator | LizoCalc",
    description:
      "Free advanced ROI calculator to calculate investment returns and profitability.",
    url: "https://lizocalc.com/calculators/financial/roi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced ROI Calculator | LizoCalc",
    description:
      "Calculate ROI, net profit, and investment performance with our free ROI calculator.",
  },
};

export default function ROIPage() {
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
                  "https://lizocalc.com/calculators/financial/roi-calculator#breadcrumb",
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
                    name: "ROI Calculator",
                    item: "https://lizocalc.com/calculators/financial/roi-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/financial/roi-calculator",
                url: "https://lizocalc.com/calculators/financial/roi-calculator",
                name: "Advanced ROI Calculator",
                description: "Use our advanced ROI calculator to estimate the return on investment, net profit, and investment efficiency instantly.",
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
                  "https://lizocalc.com/calculators/financial/roi-calculator#app",
                name: "Advanced ROI Calculator",
                url: "https://lizocalc.com/calculators/financial/roi-calculator",
                description:
                  "Advanced ROI calculator to estimate return on investment, total gain, and profitability percentage.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "ROI Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate percentage ROI",
                  "Estimate net profit from investment",
                  "Analyze investment gain vs cost",
                  "Compare different financial scenarios",
                  "Assess investment efficiency",
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
              <PieChart className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              ROI Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
<ROICalculator/>
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
          What is this ROI Calculator?
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