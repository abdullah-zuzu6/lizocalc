import { Metadata } from "next";
import { Hash } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import LCMCalculator from "./clientside";

const faqData = [
  {
    question: "What is LCM?",
    answer:
      "LCM stands for Least Common Multiple. It is the smallest number that is divisible by two or more numbers.",
  },
  {
    question: "How do you find the LCM of numbers?",
    answer:
      "The LCM can be calculated using prime factorization or using the formula LCM(a,b) = (a × b) / GCD(a,b).",
  },
  {
    question: "Why is LCM important in math?",
    answer:
      "LCM is commonly used when adding or subtracting fractions and solving problems involving repeating cycles or schedules.",
  },
];

export const metadata: Metadata = {
  title: "LCM Calculator (Least Common Multiple)",
  description:
    "Free LCM calculator to find the least common multiple of two or more numbers instantly with step-by-step explanation.",

  keywords: [
    "lcm calculator",
    "least common multiple calculator",
    "find lcm online",
    "math lcm tool",
    "lcm formula calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/lcm-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "LCM Calculator | LizoCalc",
    description:
      "Find the Least Common Multiple (LCM) of numbers instantly using our free calculator.",
    url: "https://lizocalc.com/calculators/math/lcm-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LCM Calculator | LizoCalc",
    description:
      "Calculate the Least Common Multiple of numbers quickly using our free LCM calculator.",
  },
};

export default function LCMPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* JSON-LD Structured Data */}
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
                  "https://lizocalc.com/calculators/math/lcm-calculator#breadcrumb",
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
                    name: "LCM Calculator",
                    item: "https://lizocalc.com/calculators/math/lcm-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "LCM Calculator",
                applicationCategory: "EducationalApplication",
                operatingSystem: "Any",
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
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
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-600/10">
            <Hash className="w-8 h-8 text-blue-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">LCM Calculator</h1>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <LCMCalculator />
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
        <h2 className="text-3xl md:text-4xl font-bold">What is LCM?</h2>

        <p>
          The Least Common Multiple (LCM) is the smallest number that is
          divisible by two or more integers. It is commonly used in mathematics
          when working with fractions, ratios, and repeating cycles.
        </p>

        <h2>How to Calculate LCM</h2>

        <p>
          One of the most common ways to calculate the LCM is by using prime
          factorization. Another method uses the relationship between the
          Greatest Common Divisor (GCD) and LCM.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
