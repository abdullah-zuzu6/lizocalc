import { Metadata } from "next";
import AdvancedCalorieCalculator from "./clientside";
import { Flame } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How are daily calories calculated?",
    answer:
      "The daily calorie requirement is calculated using established equations like Mifflin-St Jeor, factoring in your age, gender, weight, height, and activity level.",
  },
  {
    question: "Can I adjust for weight loss or gain?",
    answer:
      "Yes, our calculator includes goal-setting options to show you how many calories to consume for weight loss, maintenance, or muscle gain.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Calorie Calculator ",
  description:
    "Use our advanced calorie calculator to estimate your daily energy needs, track macros, and reach your fitness goals instantly.",

  keywords: [
    "calorie calculator",
    "daily calorie needs calculator",
    "TDEE calculator",
    "weight loss calorie calculator",
    "advanced calorie calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/calorie-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Calorie Calculator | LizoCalc",
    description:
      "Free advanced calorie calculator to calculate daily energy needs and macro targets.",
    url: "https://lizocalc.com/calculators/health/calorie-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Calorie Calculator | LizoCalc",
    description:
      "Calculate your daily calorie needs and macronutrients with our free calorie calculator.",
  },
};

export default function CaloriePage() {
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
                  "https://lizocalc.com/calculators/health/calorie-calculator#breadcrumb",
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
                    name: "Calorie Calculator",
                    item: "https://lizocalc.com/calculators/health/calorie-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/calorie-calculator",
                url: "https://lizocalc.com/calculators/health/calorie-calculator",
                name: "Advanced Calorie Calculator",
                description: "Use our advanced calorie calculator to estimate your daily energy needs, track macros, and reach your fitness goals instantly.",
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
                  "https://lizocalc.com/calculators/health/calorie-calculator#app",
                name: "Advanced Calorie Calculator",
                url: "https://lizocalc.com/calculators/health/calorie-calculator",
                description:
                  "Advanced calorie calculator to estimate daily energy expenditure, macro requirements, and fitness goals.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Calorie Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate daily calorie needs (TDEE)",
                  "Estimate macronutrient breakdown",
                  "Support for weight loss and muscle gain goals",
                  "Adjustable activity levels",
                  "Metric and imperial unit support",
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
              <Flame className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Calorie Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedCalorieCalculator />
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
          What is this Calorie Calculator?
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