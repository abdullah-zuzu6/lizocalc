import { Metadata } from "next";
import AdvancedMacrosCalculator from "./clientside";
import { PieChart } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How are macros calculated?",
    answer:
      "Macros (proteins, fats, and carbohydrates) are calculated based on your total daily calorie needs, adjusted according to your specific fitness goals and nutritional preferences.",
  },
  {
    question: "Can I adjust my macro ratios?",
    answer:
      "Yes, our calculator allows you to select different diet types or manually adjust your macro percentages to fit your lifestyle and training requirements.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Macros Calculator ",
  description:
    "Use our advanced macros calculator to determine your optimal protein, fat, and carbohydrate intake to help you reach your fitness goals.",

  keywords: [
    "macros calculator",
    "macronutrient calculator",
    "protein fat carb calculator",
    "flexible dieting calculator",
    "advanced macros calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/macros-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Macros Calculator | LizoCalc",
    description:
      "Free advanced macros calculator to determine your daily protein, fat, and carbohydrate needs.",
    url: "https://lizocalc.com/calculators/health/macros-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Macros Calculator | LizoCalc",
    description:
      "Calculate your daily macronutrient breakdown with our free health calculator.",
  },
};

export default function MacrosPage() {
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
                  "https://lizocalc.com/calculators/health/macros-calculator#breadcrumb",
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
                    name: "Macros Calculator",
                    item: "https://lizocalc.com/calculators/health/macros-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/macros-calculator",
                url: "https://lizocalc.com/calculators/health/macros-calculator",
                name: "Advanced Macros Calculator",
                description: "Use our advanced macros calculator to determine your optimal protein, fat, and carbohydrate intake to help you reach your fitness goals.",
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
                  "https://lizocalc.com/calculators/health/macros-calculator#app",
                name: "Advanced Macros Calculator",
                url: "https://lizocalc.com/calculators/health/macros-calculator",
                description:
                  "Advanced macros calculator to estimate daily protein, fat, and carbohydrate requirements.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Macros Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate daily protein, fat, and carb needs",
                  "Support for various diet types",
                  "Customizable macro ratios",
                  "Goal-based recommendations",
                  "User-friendly breakdown charts",
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
              Macros Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedMacrosCalculator />
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
          What is this Macros Calculator?
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