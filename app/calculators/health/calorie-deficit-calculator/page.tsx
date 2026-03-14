import { Metadata } from "next";
import AdvancedCalorieDeficitCalculator from "./clientside";
import { TrendingDown } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is a calorie deficit calculated?",
    answer:
      "A calorie deficit is calculated by subtracting your desired daily deficit from your Total Daily Energy Expenditure (TDEE) to determine the number of calories you should consume to lose weight.",
  },
  {
    question: "What is a safe calorie deficit?",
    answer:
      "A safe and sustainable calorie deficit is generally considered to be 300 to 500 calories below your TDEE, which typically supports a healthy weight loss rate of 0.5 to 1 pound per week.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Calorie Deficit Calculator ",
  description:
    "Use our advanced calorie deficit calculator to determine the daily caloric intake needed to reach your weight loss goals sustainably.",

  keywords: [
    "calorie deficit calculator",
    "weight loss calculator",
    "calorie intake calculator",
    "fat loss calculator",
    "advanced calorie deficit calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Calorie Deficit Calculator | LizoCalc",
    description:
      "Free advanced calorie deficit calculator to calculate the calories needed for effective weight loss.",
    url: "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Calorie Deficit Calculator | LizoCalc",
    description:
      "Calculate your daily calorie deficit for weight loss with our free health calculator.",
  },
};

export default function CalorieDeficitPage() {
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
                  "https://lizocalc.com/calculators/health/calorie-deficit-calculator#breadcrumb",
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
                    name: "Health Calculators",
                    item: "https://lizocalc.com/calculators/health",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Calorie Deficit Calculator",
                    item: "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
                url: "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
                name: "Advanced Calorie Deficit Calculator",
                description: "Use our advanced calorie deficit calculator to determine the daily caloric intake needed to reach your weight loss goals sustainably.",
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
                  "https://lizocalc.com/calculators/health/calorie-deficit-calculator#app",
                name: "Advanced Calorie Deficit Calculator",
                url: "https://lizocalc.com/calculators/health/calorie-deficit-calculator",
                description:
                  "Advanced calorie deficit calculator to determine daily intake for sustainable weight loss.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Calorie Deficit Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate required calorie deficit",
                  "Estimate daily calorie target for weight loss",
                  "Safe rate-of-loss recommendations",
                  "TDEE-based calculations",
                  "Support for customized weight goals",
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
              <TrendingDown className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Calorie Deficit Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedCalorieDeficitCalculator />
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
          What is this Calorie Deficit Calculator?
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