import { Metadata } from "next";
import ZScoreCalculator from "./clientside";
import { Activity } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is a Z-score?",
    answer:
      "A Z-score (also known as a standard score) tells you how many standard deviations a data point is from the mean of a dataset. It helps you understand how a specific value compares to the rest of the data.",
  },
  {
    question: "How do I interpret the results?",
    answer:
      "A positive Z-score means the value is above the mean, while a negative Z-score means it is below the mean. A Z-score of 0 indicates the value is exactly at the mean.",
  },
];

export const metadata: Metadata = {
  title: "Z-Score Calculator",
  description:
    "Use our advanced Z-score calculator to standardize your data, calculate standard deviations from the mean, and determine percentile rankings instantly.",

  keywords: [
    "z-score calculator",
    "standard score calculator",
    "statistics calculator",
    "normal distribution calculator",
    "standard deviation calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/statistics/z-score-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Free advanced Z-score calculator to calculate standard scores and percentile rankings.",
    url: "https://lizocalc.com/calculators/statistics/z-score-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Calculate Z-scores, understand data distribution, and find percentiles with our free statistics tool.",
  },
};

export default function ZScorePage() {
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
                  "https://lizocalc.com/calculators/statistics/z-score-calculator#breadcrumb",
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
                    name: "Statistics Calculators",
                    item: "https://lizocalc.com/calculators/statistics",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Z-Score Calculator",
                    item: "https://lizocalc.com/calculators/statistics/z-score-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/statistics/z-score-calculator",
                url: "https://lizocalc.com/calculators/statistics/z-score-calculator",
                name: "Z-Score Calculator",
                description: "Use our advanced Z-score calculator to standardize data points and determine relative standing.",
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
                  "https://lizocalc.com/calculators/statistics/z-score-calculator#app",
                name: "Z-Score Calculator",
                url: "https://lizocalc.com/calculators/statistics/z-score-calculator",
                description:
                  "Advanced Z-score calculator to determine how many standard deviations a value is from the mean.",
                applicationCategory: "EducationApplication",
                applicationSubCategory: "Statistics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Z-score",
                  "Determine percentile rank",
                  "Calculate P-Value",
                  "Visualize data standing",
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
              <Activity className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Z-Score Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <ZScoreCalculator />
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
          What is this Z-Score Calculator?
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