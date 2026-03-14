import { Metadata } from "next";
import AdvancedBodyFatCalculator from "./clientside";
import { Scale } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is body fat percentage calculated?",
    answer:
      "Body fat percentage is calculated using body measurements (like neck, waist, and hip circumference) combined with your height and weight via standardized formulas.",
  },
  {
    question: "Is this measurement accurate?",
    answer:
      "While it provides a reliable estimate for fitness tracking, it is an approximation and may vary compared to clinical methods like DEXA scans.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Body Fat Calculator ",
  description:
    "Use our advanced body fat calculator to estimate your body composition and track your fitness progress based on body measurements.",

  keywords: [
    "body fat calculator",
    "body composition calculator",
    "body fat percentage calculator",
    "fitness progress calculator",
    "advanced body fat calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/body-fat-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Body Fat Calculator | LizoCalc",
    description:
      "Free advanced body fat calculator to estimate body fat percentage and track fitness goals.",
    url: "https://lizocalc.com/calculators/health/body-fat-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Body Fat Calculator | LizoCalc",
    description:
      "Calculate your body fat percentage and track your body composition with our free health calculator.",
  },
};

export default function BodyFatPage() {
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
                  "https://lizocalc.com/calculators/health/body-fat-calculator#breadcrumb",
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
                    name: "Body Fat Calculator",
                    item: "https://lizocalc.com/calculators/health/body-fat-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/body-fat-calculator",
                url: "https://lizocalc.com/calculators/health/body-fat-calculator",
                name: "Advanced Body Fat Calculator",
                description: "Use our advanced body fat calculator to estimate your body composition and track your fitness progress based on body measurements.",
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
                  "https://lizocalc.com/calculators/health/body-fat-calculator#app",
                name: "Advanced Body Fat Calculator",
                url: "https://lizocalc.com/calculators/health/body-fat-calculator",
                description:
                  "Advanced body fat calculator to estimate body fat percentage and body composition.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Body Fat Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate body fat percentage",
                  "Track body composition changes",
                  "Support for neck, waist, and hip measurements",
                  "Gender-specific calculation formulas",
                  "Fitness level categorization",
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
              <Scale className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Body Fat Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBodyFatCalculator />
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
          What is this Body Fat Calculator?
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