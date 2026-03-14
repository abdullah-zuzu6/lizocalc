import { Metadata } from "next";
import AdvancedIdealWeightCalculator from "./clientside";
import { Scale } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How is an ideal weight calculated?",
    answer:
      "Ideal weight is typically estimated using scientific formulas that consider your height, gender, and sometimes body frame size to provide a healthy weight range.",
  },
  {
    question: "Is ideal weight the same for everyone?",
    answer:
      "No, 'ideal weight' is a guideline. Factors like muscle mass, bone density, and overall body composition play a significant role in determining what is healthy and sustainable for your individual body.",
  },
];

export const metadata: Metadata = {
  title: "Advanced Ideal Weight Calculator ",
  description:
    "Use our advanced ideal weight calculator to estimate your healthy weight range based on your height, gender, and scientific formulas.",

  keywords: [
    "ideal weight calculator",
    "healthy weight calculator",
    "weight range calculator",
    "bmi based ideal weight",
    "advanced ideal weight calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/ideal-weight-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Ideal Weight Calculator | LizoCalc",
    description:
      "Free advanced ideal weight calculator to determine a healthy weight range for your body.",
    url: "https://lizocalc.com/calculators/health/ideal-weight-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Ideal Weight Calculator | LizoCalc",
    description:
      "Calculate your ideal weight range accurately with our free health calculator.",
  },
};

export default function IdealWeightPage() {
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
                  "https://lizocalc.com/calculators/health/ideal-weight-calculator#breadcrumb",
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
                    name: "Ideal Weight Calculator",
                    item: "https://lizocalc.com/calculators/health/ideal-weight-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/ideal-weight-calculator",
                url: "https://lizocalc.com/calculators/health/ideal-weight-calculator",
                name: "Advanced Ideal Weight Calculator",
                description: "Use our advanced ideal weight calculator to estimate your healthy weight range based on your height, gender, and scientific formulas.",
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
                  "https://lizocalc.com/calculators/health/ideal-weight-calculator#app",
                name: "Advanced Ideal Weight Calculator",
                url: "https://lizocalc.com/calculators/health/ideal-weight-calculator",
                description:
                  "Advanced ideal weight calculator to estimate healthy weight ranges using established health formulas.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Ideal Weight Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate ideal weight range",
                  "Support for various scientific formulas",
                  "Adjustments for gender and height",
                  "User-friendly health metrics",
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
              <Scale className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Ideal Weight Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedIdealWeightCalculator />
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
          What is this Ideal Weight Calculator?
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