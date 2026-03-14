import { Metadata } from "next";
import WeightCalculator from "./clientside";
import { Home } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is weight calculated?",
    answer:
      "Weight is calculated using the formula Weight = Mass × Gravity. The gravitational force acting on an object determines its weight.",
  },
  {
    question: "What is the difference between mass and weight?",
    answer:
      "Mass is the amount of matter in an object and remains constant, while weight is the force exerted on that mass due to gravity and can change depending on the planet.",
  },
];

export const metadata: Metadata = {
  title: "Weight Calculator ",
  description:
    "Use our weight calculator to calculate the weight of an object based on its mass and gravitational force instantly.",

  keywords: [
    "weight calculator",
    "mass to weight calculator",
    "gravity weight calculator",
    "physics weight calculator",
    "object weight calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/physics/weight-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Weight Calculator | LizoCalc",
    description:
      "Free weight calculator to calculate weight using mass and gravity.",
    url: "https://lizocalc.com/calculators/physics/weight-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Weight Calculator | LizoCalc",
    description:
      "Calculate weight using mass and gravity with our free physics weight calculator.",
  },
};

export default function WeightPage() {
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
                  "https://lizocalc.com/calculators/physics/weight-calculator#breadcrumb",
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
                    name: "Weight Calculator",
                    item: "https://lizocalc.com/calculators/physics/weight-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://lizocalc.com/calculators/physics/weight-calculator",
  url: "https://lizocalc.com/calculators/physics/weight-calculator",
  name: "Weight Calculator",
  description: "Use our weight calculator to determine the weight of an object using mass and gravity instantly.",
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
                  "https://lizocalc.com/calculators/physics/weight-calculator#app",
                name: "Weight Calculator",
                url: "https://lizocalc.com/calculators/physics/weight-calculator",
                description:
                  "Physics weight calculator to calculate the weight of an object using mass and gravitational acceleration.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Physics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate weight using mass and gravity",
                  "Instant physics calculation",
                  "Supports different gravity values",
                  "Accurate scientific calculation",
                  "Simple and fast tool",
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
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
             Weight Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <WeightCalculator />

        
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
          What is this Weight Calculator?
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
