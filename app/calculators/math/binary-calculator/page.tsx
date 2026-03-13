import { Metadata } from "next";
import BinaryCalculator from "./clientside";
import { Binary } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is a binary calculator?",
    answer:
      "A binary calculator is a tool used to perform arithmetic operations using binary numbers (base-2). It allows you to add, subtract, multiply, divide, and convert binary values quickly.",
  },
  {
    question: "How do you convert binary to decimal?",
    answer:
      "Binary numbers can be converted to decimal by multiplying each bit by powers of 2 and adding the results together. Our calculator performs this conversion instantly.",
  },
  {
    question: "How do you convert decimal to binary?",
    answer:
      "To convert a decimal number to binary, repeatedly divide the number by 2 and record the remainders. The binary number is formed by reading the remainders from bottom to top.",
  },
  {
    question: "Can this calculator perform binary arithmetic?",
    answer:
      "Yes. This binary calculator supports binary addition, subtraction, multiplication, and division along with binary to decimal and decimal to binary conversions.",
  },
];

export const metadata: Metadata = {
  title: "Binary Calculator – Binary to Decimal & Decimal to Binary | LizoCalc",
  description:
    "Free binary calculator to perform binary arithmetic and convert binary to decimal or decimal to binary instantly.",

  keywords: [
    "binary calculator",
    "binary to decimal converter",
    "decimal to binary converter",
    "binary number calculator",
    "binary arithmetic calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/binary-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Binary Calculator | LizoCalc",
    description:
      "Use our free binary calculator to convert binary to decimal, decimal to binary, and perform binary arithmetic operations.",
    url: "https://lizocalc.com/calculators/math/binary-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Binary Calculator | LizoCalc",
    description:
      "Convert binary to decimal and decimal to binary instantly with our free binary calculator.",
  },
};

export default function BinaryCalculatorPage() {
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
                  "https://lizocalc.com/calculators/math/binary-calculator#breadcrumb",
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
                    name: "Binary Calculator",
                    item: "https://lizocalc.com/calculators/math/binary-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/binary-calculator",
                url: "https://lizocalc.com/calculators/math/binary-calculator",
                name: "Binary Calculator",
                description:
                  "Use our binary calculator to perform binary arithmetic and convert binary numbers to decimal and decimal numbers to binary.",
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
                  "https://lizocalc.com/calculators/math/binary-calculator#app",
                name: "Binary Calculator",
                url: "https://lizocalc.com/calculators/math/binary-calculator",
                description:
                  "Free binary calculator for performing binary arithmetic and converting binary to decimal or decimal to binary.",
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Binary Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Binary addition",
                  "Binary subtraction",
                  "Binary multiplication",
                  "Binary division",
                  "Convert binary to decimal",
                  "Convert decimal to binary",
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
              <Binary className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Binary Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BinaryCalculator />
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
          What is a Binary Calculator?
        </h2>

        <p>
          A binary calculator is an online tool that helps users perform
          calculations using binary numbers. Binary numbers are part of the
          base-2 number system, which uses only two digits: 0 and 1. This number
          system is fundamental to computer science and digital electronics
          because computers internally process data using binary values.
        </p>

        <h3>How Binary Numbers Work</h3>

        <p>
          In the binary number system, each digit represents a power of two.
          Starting from the rightmost digit, the values correspond to 2⁰, 2¹,
          2², 2³, and so on. By adding these values together, binary numbers can
          represent any decimal number.
        </p>

        <h3>Binary to Decimal Conversion</h3>

        <p>
          Converting binary to decimal involves multiplying each binary digit by
          the corresponding power of 2 and summing the results. Our binary
          calculator performs this conversion instantly, making it easier for
          students, developers, and engineers.
        </p>

        <h3>Decimal to Binary Conversion</h3>

        <p>
          Decimal numbers can be converted into binary by repeatedly dividing
          the number by 2 and recording the remainders. These remainders form
          the binary representation of the number.
        </p>

        <h3>Why Binary Calculators Are Useful</h3>

        <p>
          Binary calculators are useful for computer science students,
          programmers, engineers, and anyone working with digital systems. They
          allow fast conversion between number systems and make binary
          arithmetic much easier.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
