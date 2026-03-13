import { Metadata } from "next";
import PermutationCombinationCalculator from "./clientside";
import { Layers } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is the difference between a permutation and a combination?",
    answer:
      "The main difference is whether order matters. In a permutation, the order of the selected items is important (like a PIN code), whereas in a combination, the order does not matter (like choosing a team from a group).",
  },
  {
    question: "What does 'n' and 'r' stand for in these formulas?",
    answer:
      "'n' represents the total number of items in a set, and 'r' represents the number of items being selected or arranged from that set.",
  },
];

export const metadata: Metadata = {
  title: "Permutation & Combination Calculator",
  description:
    "Use our advanced permutation and combination calculator to find arrangements and selections instantly. Supports standard and repetition calculations.",

  keywords: [
    "permutation calculator",
    "combination calculator",
    "nPr calculator",
    "nCr calculator",
    "math arrangement calculator",
    "probability calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/permutation-combination-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Permutation & Combination Calculator | LizoCalc",
    description:
      "Free calculator to solve permutation and combination problems including scenarios with repetition.",
    url: "https://lizocalc.com/calculators/math/permutation-combination-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Permutation & Combination Calculator | LizoCalc",
    description:
      "Calculate permutations and combinations with our free math tool.",
  },
};

export default function PermutationCombinationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT === */}
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
                  "https://lizocalc.com/calculators/math/permutation-combination-calculator#breadcrumb",
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
                    name: "Permutation & Combination Calculator",
                    item: "https://lizocalc.com/calculators/math/permutation-combination-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/permutation-combination-calculator",
                url: "https://lizocalc.com/calculators/math/permutation-combination-calculator",
                name: "Permutation & Combination Calculator",
                description: "Use our advanced calculator to estimate permutations and combinations for any set of items.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/math/permutation-combination-calculator#app",
                name: "Permutation & Combination Calculator",
                url: "https://lizocalc.com/calculators/math/permutation-combination-calculator",
                description:
                  "Advanced math calculator to solve arrangements and selections with high-precision logic.",
                applicationCategory: "EducationApplication",
                applicationSubCategory: "Mathematics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Permutations (nPr)",
                  "Calculate Combinations (nCr)",
                  "Handle Permutations with Repetition",
                  "Handle Combinations with Repetition",
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
              <Layers className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Permutation & Combination Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <PermutationCombinationCalculator />
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
          What is this Permutation & Combination Calculator?
        </h2>

        <p>1000+ words of SEO content here...</p>

        <h3>How it works</h3>

        <p>Your explanation of the mathematical principles...</p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}