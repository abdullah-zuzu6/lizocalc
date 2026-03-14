import { Metadata } from "next";
import MassCalculator from "./clientside";
import { Scale } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is mass in physics?",
    answer:
      "Mass is the amount of matter in an object. It is usually measured in kilograms (kg) and remains constant regardless of location.",
  },
  {
    question: "How is mass calculated from weight?",
    answer:
      "Mass can be calculated using the formula Mass = Weight ÷ Gravity. This calculator allows you to find mass using weight and gravitational acceleration.",
  },
];

export const metadata: Metadata = {
  title: "Mass Calculator",

  description:
    "Use our free physics mass calculator to calculate mass, weight, or gravitational force instantly using the formula m = W ÷ g.",

  keywords: [
    "mass calculator",
    "physics mass calculator",
    "weight to mass calculator",
    "calculate mass from weight",
    "mass formula calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/physics/mass-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Mass Calculator | LizoCalc",
    description:
      "Free physics mass calculator to calculate mass, weight, and gravity using simple formulas.",
    url: "https://lizocalc.com/calculators/physics/mass-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mass Calculator | LizoCalc",
    description:
      "Calculate mass, weight, or gravitational force instantly with our physics mass calculator.",
  },
};

export default function MassCalculatorPage() {
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
                  "https://lizocalc.com/calculators/physics/mass-calculator#breadcrumb",
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
                    name: "Physics Calculators",
                    item: "https://lizocalc.com/calculators/physics",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Mass Calculator",
                    item: "https://lizocalc.com/calculators/physics/mass-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/physics/mass-calculator",
                url: "https://lizocalc.com/calculators/physics/mass-calculator",
                name: "Mass Calculator",
                description:
                  "Use our physics mass calculator to calculate mass, weight, and gravity instantly.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/physics/mass-calculator#app",
                name: "Mass Calculator",
                url: "https://lizocalc.com/calculators/physics/mass-calculator",
                description:
                  "Physics mass calculator to calculate mass, weight, or gravitational force using the formula m = W ÷ g.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Physics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate mass from weight and gravity",
                  "Calculate weight using mass",
                  "Supports physics formulas",
                  "Instant physics calculations",
                  "Works on all devices",
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
              Mass Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <MassCalculator />
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
          What is Mass in Physics?
        </h2>

        <p>1000+ words of SEO content here...</p>

        <h3>How the Mass Formula Works</h3>

        <p>Your explanation...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
