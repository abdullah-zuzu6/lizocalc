import { Metadata } from "next";
import AdvancedBMICalculator from "./clientside";
import { Activity } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is BMI calculated?",
    answer:
      "BMI is calculated by dividing your weight in kilograms by the square of your height in meters. It provides a simple numeric value to categorize body weight.",
  },
  {
    question: "Is BMI an accurate measure of health?",
    answer:
      "BMI is a useful screening tool, but it does not measure body fat directly or account for muscle mass, bone density, or overall body composition.",
  },
];

export const metadata: Metadata = {
  title: "Advanced BMI Calculator ",
  description:
    "Use our advanced BMI calculator to instantly determine your Body Mass Index and understand your weight category based on height and weight.",

  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "weight health calculator",
    "bmi index calculator",
    "advanced bmi calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/bmi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced BMI Calculator | LizoCalc",
    description:
      "Free advanced BMI calculator to calculate body mass index and health category.",
    url: "https://lizocalc.com/calculators/health/bmi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced BMI Calculator | LizoCalc",
    description:
      "Calculate your Body Mass Index (BMI) accurately with our free health calculator.",
  },
};

export default function BMIPage() {
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
                  "https://lizocalc.com/calculators/health/bmi-calculator#breadcrumb",
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
                    name: "BMI Calculator",
                    item: "https://lizocalc.com/calculators/health/bmi-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/bmi-calculator",
                url: "https://lizocalc.com/calculators/health/bmi-calculator",
                name: "Advanced BMI Calculator",
                description: "Use our advanced BMI calculator to instantly determine your Body Mass Index and understand your weight category based on height and weight.",
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
                  "https://lizocalc.com/calculators/health/bmi-calculator#app",
                name: "Advanced BMI Calculator",
                url: "https://lizocalc.com/calculators/health/bmi-calculator",
                description:
                  "Advanced BMI calculator to estimate body mass index and provide health weight category insights.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMI Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Body Mass Index (BMI)",
                  "Determine weight category (Underweight, Normal, Overweight, Obese)",
                  "Support for metric and imperial units",
                  "Health-focused results explanation",
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
               BMI Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMICalculator />
        
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
          What is this BMI Calculator?
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