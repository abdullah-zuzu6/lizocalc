
import { Metadata } from "next";
import CasioCalculatorAdvanced from "./clientside";
import { Calculator } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How do I use the scientific calculator?",
    answer:
      "Simply use the calculator buttons to enter numbers and functions. The calculator supports arithmetic operations, trigonometric functions, logarithms, square roots, and memory features. You can switch between degree and radian modes using the DEG/RAD toggle.",
  },
  {
    question: "Does this calculator save my calculations?",
    answer:
      "Yes. The calculator stores your last 10 calculations in the history section so you can review previous results even after refreshing the page.",
  },
];

export const metadata: Metadata = {
  title: "Scientific Calculator",
  description:
    "Free online scientific calculator for advanced mathematical calculations including trigonometry, logarithms, square roots, and more.",

  keywords: [
    "scientific calculator",
    "advanced calculator",
    "math calculator",
    "trigonometry calculator",
    "online scientific calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/scientific-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Scientific Calculator | LizoCalc",
    description:
      "Use our advanced scientific calculator to perform complex mathematical calculations online for free.",
    url: "https://lizocalc.com/calculators/math/scientific-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Scientific Calculator | LizoCalc",
    description:
      "Free scientific calculator for trigonometry, logarithms, square roots, and advanced math operations.",
  },
};

export default function ScientificPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA === */}
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
                  "https://lizocalc.com/calculators/math/scientific-calculator#breadcrumb",
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
                    name: "Math Calculators",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Scientific Calculator",
                    item: "https://lizocalc.com/calculators/math/scientific-calculator",
                  },
                ],
              },

              {
                "@type": "WebPage",
                "@id":
                  "https://lizocalc.com/calculators/math/scientific-calculator",
                url: "https://lizocalc.com/calculators/math/scientific-calculator",
                name: "Scientific Calculator",
                description:
                  "Free scientific calculator for advanced math operations including trigonometry, logarithms, and square roots.",
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
                  "https://lizocalc.com/calculators/math/scientific-calculator#app",
                name: "Scientific Calculator",
                url: "https://lizocalc.com/calculators/math/scientific-calculator",
                description:
                  "Online scientific calculator that supports trigonometry, logarithms, square roots, and advanced mathematical calculations.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Math Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Trigonometric calculations",
                  "Logarithms and natural logs",
                  "Square root and exponent operations",
                  "Memory functions (M+, M-, MR, MC)",
                  "Calculation history",
                  "Degree and radian modes",
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

      {/* HERO */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <Calculator className="w-8 h-8 text-blue-500" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold">
              Scientific Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="px-4 py-8">
        <CasioCalculatorAdvanced />
      </section>

      {/* SEO CONTENT */}
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
          What is a Scientific Calculator?
        </h2>

        <p>
          A scientific calculator is an advanced mathematical tool designed to
          perform complex calculations beyond basic arithmetic. Unlike a
          standard calculator, it supports trigonometric functions,
          logarithmic operations, exponentiation, square roots, and many other
          advanced mathematical features.
        </p>

        <h3>Features of this Scientific Calculator</h3>

        <p>
          This online calculator allows students, engineers, and professionals
          to solve mathematical equations quickly and accurately. It includes
          trigonometric functions such as sine, cosine, and tangent along with
          logarithmic calculations and square root operations.
        </p>

        <p>
          The calculator also includes memory functions and a history panel so
          you can track previous calculations. These features make it useful
          for solving complex equations while studying mathematics, physics,
          or engineering.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}

