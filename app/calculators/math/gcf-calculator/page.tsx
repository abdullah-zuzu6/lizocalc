import { Metadata } from "next";
import { Hash } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import GCFCalculator from "./clientside"; // Imported as requested

const faqData = [
  {
    question: "What is GCF?",
    answer:
      "GCF stands for Greatest Common Factor. It is the largest positive integer that divides each of the integers without a remainder.",
  },
  {
    question: "How do you find the GCF of numbers?",
    answer:
      "The GCF can be calculated using prime factorization, the Euclidean algorithm, or by listing all factors of each number and finding the largest one they have in common.",
  },
  {
    question: "What is the difference between GCF and LCM?",
    answer:
      "GCF is the largest factor that divides the numbers, while LCM (Least Common Multiple) is the smallest multiple that is divisible by the numbers.",
  },
];

export const metadata: Metadata = {
  title: "GCF Calculator (Greatest Common Factor)",
  description:
    "Free GCF calculator to find the greatest common factor of two or more numbers instantly with step-by-step prime factorization.",

  keywords: [
    "gcf calculator",
    "greatest common factor calculator",
    "find gcf online",
    "hcf calculator",
    "highest common factor tool",
    "greatest common divisor calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/gcf-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "GCF Calculator | LizoCalc",
    description:
      "Find the Greatest Common Factor (GCF) of numbers instantly using our free calculator.",
    url: "https://lizocalc.com/calculators/math/gcf-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "GCF Calculator | LizoCalc",
    description:
      "Calculate the Greatest Common Factor of numbers quickly using our free GCF calculator.",
  },
};

export default function GCFPage() {
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
                    name: "GCF Calculator",
                    item: "https://lizocalc.com/calculators/math/gcf-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "GCF Calculator",
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
          <h1 className="text-3xl md:text-4xl font-bold">
            GCF Calculator
          </h1>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <GCFCalculator />
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
          What is the Greatest Common Factor (GCF)?
        </h2>

        <p>
          The Greatest Common Factor (GCF), also known as the Highest Common Factor (HCF) or Greatest Common Divisor (GCD), 
          is the largest number that divides a set of numbers without leaving a remainder. It is a fundamental concept used 
          to simplify fractions and factor algebraic expressions.
        </p>

        <h2>How to Calculate GCF</h2>

        <p>
          There are several reliable methods to find the GCF. The <strong>Prime Factorization method</strong> involves 
          listing the prime factors of each number and multiplying the common ones. The <strong>Euclidean Algorithm</strong> 
          is a more efficient method for larger numbers, involving repeated division until the remainder is zero.
        </p>

        <p>
          Our GCF calculator uses advanced algorithms to provide you with instant results and the step-by-step 
          factorization needed to understand the solution.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}