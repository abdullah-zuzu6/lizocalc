import { Metadata } from "next";
import AdvancedTDEECalculator from "./clientside";
import { Gauge } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is TDEE calculated?",
    answer:
      "TDEE (Total Daily Energy Expenditure) is calculated by taking your Basal Metabolic Rate (BMR) and multiplying it by an activity factor that represents your daily exercise and movement levels.",
  },
  {
    question: "Why is knowing my TDEE important?",
    answer:
      "Knowing your TDEE is crucial for effective weight management; consuming calories above your TDEE leads to weight gain, while consuming below it leads to weight loss.",
  },
];

export const metadata: Metadata = {
  title: "Advanced TDEE Calculator ",
  description:
    "Use our advanced TDEE calculator to estimate your Total Daily Energy Expenditure, understand your caloric maintenance level, and reach your fitness goals.",

  keywords: [
    "tdee calculator",
    "total daily energy expenditure calculator",
    "maintenance calorie calculator",
    "daily calorie needs",
    "advanced tdee calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/tdee-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced TDEE Calculator | LizoCalc",
    description:
      "Free advanced TDEE calculator to calculate your daily energy expenditure and calorie needs.",
    url: "https://lizocalc.com/calculators/health/tdee-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced TDEE Calculator | LizoCalc",
    description:
      "Calculate your Total Daily Energy Expenditure (TDEE) with our free health calculator.",
  },
};

export default function TDEEPage() {
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
                  "https://lizocalc.com/calculators/health/tdee-calculator#breadcrumb",
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
                    name: "TDEE Calculator",
                    item: "https://lizocalc.com/calculators/health/tdee-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/tdee-calculator",
                url: "https://lizocalc.com/calculators/health/tdee-calculator",
                name: "Advanced TDEE Calculator",
                description: "Use our advanced TDEE calculator to estimate your Total Daily Energy Expenditure, understand your caloric maintenance level, and reach your fitness goals.",
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
                  "https://lizocalc.com/calculators/health/tdee-calculator#app",
                name: "Advanced TDEE Calculator",
                url: "https://lizocalc.com/calculators/health/tdee-calculator",
                description:
                  "Advanced TDEE calculator to estimate daily energy expenditure and caloric maintenance levels.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "TDEE Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Total Daily Energy Expenditure (TDEE)",
                  "Determine daily maintenance calories",
                  "Activity level adjustments",
                  "Support for weight loss and muscle gain goals",
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
              <Gauge className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              TDEE Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedTDEECalculator />
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
          What is this TDEE Calculator?
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