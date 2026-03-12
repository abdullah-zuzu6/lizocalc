import { Metadata } from "next";
import PercentageCalculator from "./clientside";
import { Percent } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "How do I calculate a percentage of a number?",
    answer:
      "To calculate a percentage of a number, multiply the number by the percentage value and divide by 100. For example, 10% of 100 is (10 * 100) / 100 = 10.",
  },
  {
    question:
      "What is the difference between percentage change and difference?",
    answer:
      "Percentage change measures the increase or decrease relative to an original value, whereas percentage difference measures the relative difference between two values compared to their average.",
  },
];

export const metadata: Metadata = {
  title: "Percentage Calculator | Calculate Percentages Instantly",
  description:
    "Free online percentage calculator. Instantly calculate percentage of a number, percentage change, percentage difference, and more with our easy-to-use tool.",
  keywords: [
    "percentage calculator",
    "percent off calculator",
    "percentage change calculator",
    "percentage difference",
    "calculate percentage",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/percentage-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Percentage Calculator | LizoCalc",
    description:
      "Easily calculate percentages for math, business, and daily tasks.",
    url: "https://lizocalc.com/calculators/math/percentage-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
};

export default function PercentagePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

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
                  "https://lizocalc.com/calculators/math/percentage-calculator#breadcrumb",
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
                    name: "Percentage Calculator",
                    item: "https://lizocalc.com/calculators/math/percentage-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id":
                  "https://lizocalc.com/calculators/math/percentage-calculator",
                url: "https://lizocalc.com/calculators/math/percentage-calculator",
                name: "Percentage Calculator",
                description:
                  "Free online percentage calculator for all your math needs.",
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
                  "https://lizocalc.com/calculators/math/percentage-calculator#app",
                name: "Percentage Calculator",
                applicationCategory: "EducationApplication",
                operatingSystem: "Any",
                featureList: [
                  "Percentage of number",
                  "Percentage change",
                  "Percentage difference",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },
            ],
          }),
        }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <Percent className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Percentage Calculator
            </h1>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <PercentageCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 prose prose-blue prose-lg lg:prose-xl">
        <h2 className="text-3xl font-bold">Understanding Percentages</h2>
        <p>
          Percentages are a fundamental part of daily life, used in everything
          from calculating discounts at a store to understanding complex
          financial interest rates. Our percentage calculator simplifies these
          calculations so you don't have to worry about manual formulas.
        </p>

        <h3>Why use our Percentage Calculator?</h3>
        <p>
          Whether you are a student, a professional, or just someone trying to
          split a bill, our tool provides instant, accurate results for all your
          percentage-related needs.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
