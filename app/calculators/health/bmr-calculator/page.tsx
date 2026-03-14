import { Metadata } from "next";
import AdvancedBMRCalculator from "./clientside";
import { Zap } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is BMR calculated?",
    answer:
      "BMR is calculated using scientific equations like Mifflin-St Jeor or Harris-Benedict, which account for your age, gender, weight, and height to determine your body's energy expenditure at rest.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is the energy your body burns at total rest just to survive, while TDEE (Total Daily Energy Expenditure) includes that BMR plus the calories you burn through daily movement and exercise.",
  },
];

export const metadata: Metadata = {
  title: "Advanced BMR Calculator ",
  description:
    "Use our advanced BMR calculator to estimate your Basal Metabolic Rate and understand how many calories your body burns at rest.",

  keywords: [
    "bmr calculator",
    "basal metabolic rate calculator",
    "metabolism calculator",
    "resting metabolic rate calculator",
    "advanced bmr calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/bmr-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced BMR Calculator | LizoCalc",
    description:
      "Free advanced BMR calculator to determine your basal metabolic rate and resting energy expenditure.",
    url: "https://lizocalc.com/calculators/health/bmr-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced BMR Calculator | LizoCalc",
    description:
      "Calculate your Basal Metabolic Rate (BMR) accurately with our free health calculator.",
  },
};

export default function BMRPage() {
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
                  "https://lizocalc.com/calculators/health/bmr-calculator#breadcrumb",
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
                    name: "BMR Calculator",
                    item: "https://lizocalc.com/calculators/health/bmr-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/bmr-calculator",
                url: "https://lizocalc.com/calculators/health/bmr-calculator",
                name: "Advanced BMR Calculator",
                description: "Use our advanced BMR calculator to estimate your Basal Metabolic Rate and understand how many calories your body burns at rest.",
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
                  "https://lizocalc.com/calculators/health/bmr-calculator#app",
                name: "Advanced BMR Calculator",
                url: "https://lizocalc.com/calculators/health/bmr-calculator",
                description:
                  "Advanced BMR calculator to determine resting metabolic rate and daily baseline energy needs.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMR Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Basal Metabolic Rate (BMR)",
                  "Scientific estimation formulas",
                  "Support for metric and imperial units",
                  "Baseline calorie requirements analysis",
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
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              BMR Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMRCalculator />
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
          What is this BMR Calculator?
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