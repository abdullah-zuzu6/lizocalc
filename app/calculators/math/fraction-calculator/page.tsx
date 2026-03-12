import { Metadata } from "next";
import { Hash } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import FractionCalculator from "./clientside";

const faqData = [
  {
    question: "What is a fraction calculator?",
    answer:
      "A fraction calculator helps you perform operations like addition, subtraction, multiplication, and division on fractions and shows the simplified result.",
  },
  {
    question: "How do you add fractions?",
    answer:
      "To add fractions, first make the denominators the same, then add the numerators and simplify the result.",
  },
  {
    question: "Can this calculator simplify fractions?",
    answer:
      "Yes. The calculator automatically simplifies the fraction result to its lowest terms using the greatest common divisor (GCD).",
  },
];

export const metadata: Metadata = {
  title: "Fraction Calculator | Simplify, Add, Subtract, Multiply Fractions",
  description:
    "Free online fraction calculator to add, subtract, multiply, divide, and simplify fractions instantly with decimal conversion.",
  keywords: [
    "fraction calculator",
    "simplify fractions",
    "add fractions calculator",
    "fraction to decimal calculator",
    "math fraction tool",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/fraction-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Fraction Calculator | LizoCalc",
    description:
      "Perform fraction calculations instantly including addition, subtraction, multiplication, and division.",
    url: "https://lizocalc.com/calculators/math/fraction-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraction Calculator | LizoCalc",
    description:
      "Use our free fraction calculator to simplify and convert fractions quickly.",
  },
};

export default function FractionPage() {
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
                  "https://lizocalc.com/calculators/math/fraction-calculator#breadcrumb",
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
                    name: "Fraction Calculator",
                    item: "https://lizocalc.com/calculators/math/fraction-calculator",
                  },
                ],
              },
              {
                "@type": "SoftwareApplication",
                name: "Fraction Calculator",
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
            Fraction Calculator
          </h1>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <FractionCalculator />
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
        <h2 className="text-3xl md:text-4xl font-bold" >What is a Fraction?</h2>

        <p>
          A fraction represents a part of a whole and consists of a numerator
          and a denominator. The numerator shows how many parts are taken, while
          the denominator represents the total number of equal parts.
        </p>

        <h2>How to Use the Fraction Calculator</h2>

        <p>
          Enter the numerator and denominator for both fractions, choose the
          operation (addition, subtraction, multiplication, or division), and
          press calculate. The tool will display the simplified fraction and its
          decimal value instantly.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
