import { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import HexCalculator from "./clientside";


const faqData = [
  {
    question: "How do you add hexadecimal numbers manually?",
    answer:
      "To add hex numbers, align them by position and add each column. If the sum exceeds 15, subtract 16 and carry 1 to the next column. For example, $0x9 + 0x7$: $9 + 7 = 16$. Since 16 is the base, we write $0$ and carry $1$, resulting in $0x10$.",
  },
  {
    question: "How do I convert Hex to Decimal quickly?",
    answer:
      "Each hex digit represents a power of 16. To convert $0x1A$, multiply the first digit by $16^1$ and the second by $16^0$: $(1 \times 16) + (10 \times 1) = 26$. Our calculator automates this for any value instantly.",
  },
  {
    question: "What are the values of A, B, C, D, E, and F in Hex?",
    answer:
      "In the hexadecimal (base-16) system, letters represent values from 10 to 15: A=10, B=11, C=12, D=13, E=14, and F=15. This allows a single digit to represent numbers that would require two digits in decimal.",
  },
  {
    question: "Why does the calculator show 8-bit or 16-bit binary results?",
    answer:
      "Hexadecimal is used in computing because one hex digit represents exactly 4 binary bits (a nibble). A two-digit hex number like $0xFF$ equals an 8-bit byte ($11111111$), making it easier for developers to read memory addresses.",
  },
  {
    question: "Can I use this Hex Calculator for CSS color codes?",
    answer:
      "Absolutely! CSS colors use 6-digit hex codes (e.g., #FF5733). You can use this tool to convert those values to Decimal (RGB) or perform shifts to adjust brightness and contrast mathematically.",
  },
  {
    question: "Does this calculator support negative hex numbers?",
    answer:
      "Most hex tools, including ours, focus on unsigned integers or 'Two's Complement' logic. If a subtraction result is negative, it is typically represented by its decimal equivalent or an error if the specific bit-length cannot support the sign.",
  },
];
export const metadata: Metadata = {
  title: "Hex Calculator | Hexadecimal Arithmetic & Base Converter",
  description:
    "Fast hexadecimal calculator to add, subtract, multiply, and divide hex numbers. Convert between hex, decimal, and binary with instant accurate results.",
  keywords: [
    "hexadecimal calculator",
    "hex arithmetic calculator",
    "hex to decimal converter",
    "decimal to hex tool",
    "binary to hex calculator",
    "hex adder subtractor",
    "base 16 calculator",
    "online hex solver",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Hex Calculator: Arithmetic & Base-16 Converter | LizoCalc",
    description:
      "Perform complex hexadecimal math or instant base conversions. Get precise results in hex, decimal, and binary for developers and students.",
    url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hex Calculator | Fast Hexadecimal Math & Conversion",
    description:
      "Calculate hex addition, subtraction, and more. Convert hex to decimal or binary instantly with our free online tool.",
  },
};

export default function HexadecimalPage() {
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
                  "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://www.lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Math",
                    item: "https://www.lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Hexadecimal Calculator",
                    item: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
                url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
                name: "Hexadecimal Calculator",
                description:
                  "Use our hexadecimal calculator to convert decimal numbers to hexadecimal and back instantly.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                "mainEntityOfPage": { "@type": "SoftwareApplication", "@id": "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#app" }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#app",
                name: "Hexadecimal Calculator",
                url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
                description:
                  "Hexadecimal calculator to convert decimal numbers to hexadecimal and vice versa.",
                applicationCategory: "FinanceApplication",
                applicationSubCategory: "Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Convert decimal to hexadecimal",
                  "Convert hexadecimal to decimal",
                  "Supports digits 0-9 and letters A-F",
                  "Instant conversion results",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                "potentialAction": {
    "@type": "UseAction",
    "target": ["https://www.lizocalc.com/calculators/math/hexadecimal-calculator"]
  }
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
            <h1 className="text-3xl md:text-4xl font-bold">
              Hexadecimal Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HexCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    The hexadecimal number system is one of the most important concepts in modern computing. From memory addresses to color codes in web design, hex values are everywhere. This Hexadecimal Calculator is designed to simplify complex calculations and conversions, allowing you to work efficiently with base-16 numbers.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Whether you are a beginner learning number systems or a developer handling low-level data, this tool helps you perform operations instantly.
   
  </p>

  {/* SECTION */}
  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use the Hexadecimal Calculator
    </h2>

    <p className="text-gray-200 mb-8">
      Using the calculator is simple. Enter your hexadecimal values, select an operation, and get results instantly. You can verify outputs by comparing them with tools like the{" "}
      <Link href="/calculators/math/binary-calculator" className="text-blue-400 hover:underline">
        Binary Calculator
      </Link>{" "}
      or perform advanced checks using the{" "}
      <Link href="/calculators/math/scientific-calculator" className="text-blue-400 hover:underline">
        Scientific Calculator
      </Link>.
    </p>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Performing Hex Arithmetic: Add, Subtract, Multiply, and Divide
      </h3>

      <p className="text-gray-200 mb-4">
        You can perform all basic operations directly using hexadecimal values. The calculator automatically handles carry and borrow operations, making it easier than manual calculation.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left">Operation</th>
              <th className="p-4 text-left">Example</th>
              <th className="p-4 text-left">Result</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            <tr><td className="p-4">Addition</td><td className="p-4">0x1A + 0xF2</td><td className="p-4">0x10C</td></tr>
            <tr><td className="p-4">Subtraction</td><td className="p-4">0xFF - 0x1A</td><td className="p-4">0xE5</td></tr>
            <tr><td className="p-4">Multiplication</td><td className="p-4">0xA × 0xB</td><td className="p-4">0x6E</td></tr>
            <tr><td className="p-4">Division</td><td className="p-4">0x64 ÷ 0x4</td><td className="p-4">0x19</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Using the Hex to Decimal Conversion Tool
      </h3>

      <p className="text-gray-200 mb-4">
        Converting hex to decimal is based on positional values using powers of 16. For exponent calculations, you can also use the{" "}
        <Link href="/calculators/math/scientific-calculator" className="text-blue-400 hover:underline">
          Scientific Calculator
        </Link>.
      </p>

      <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl">
        Decimal = Σ(digit × 16^position)
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mt-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Converting Decimal Numbers back to Hex (Base-16)
      </h3>

      <p className="text-gray-200 mb-4">
        To convert decimal to hex, divide the number by 16 repeatedly and record the remainders.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left">Step</th>
              <th className="p-4 text-left">Division</th>
              <th className="p-4 text-left">Remainder</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            <tr><td className="p-4">1</td><td className="p-4">47 ÷ 16 = 2</td><td className="p-4">F</td></tr>
            <tr><td className="p-4">2</td><td className="p-4">2 ÷ 16 = 0</td><td className="p-4">2</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mt-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Understanding Your Results: Hex, Decimal, and Binary Outputs
      </h3>

      <ul className="list-disc list-inside text-gray-200 space-y-2">
        <li>Hexadecimal (Base-16)</li>
        <li>Decimal (Base-10)</li>
        <li>Binary (Base-2)</li>
      </ul>
    </div>
  </section>

  {/* SECTION */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Hexadecimal System Explained
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      What is Hexadecimal (Base-16)?
    </h3>

    <p className="text-gray-200 mb-6">
      Hexadecimal is a base-16 number system that uses sixteen symbols: 0–9 and A–F. It is more compact than binary and widely used in computing systems.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      How to Read Hex Values: From 0-9 to A-F
    </h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left">Hex</th>
            <th className="p-4 text-left">Decimal</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr><td className="p-4">A</td><td className="p-4">10</td></tr>
          <tr><td className="p-4">B</td><td className="p-4">11</td></tr>
          <tr><td className="p-4">C</td><td className="p-4">12</td></tr>
          <tr><td className="p-4">D</td><td className="p-4">13</td></tr>
          <tr><td className="p-4">E</td><td className="p-4">14</td></tr>
          <tr><td className="p-4">F</td><td className="p-4">15</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Why Hexadecimal is Essential in Computing and Web Development
    </h3>

    <p className="text-gray-200 mb-6">
      Hexadecimal is widely used because it is compact and easy to convert to binary. Each hex digit represents exactly 4 binary bits.
    </p>

    {/* COMPARISON TABLE */}
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left">System</th>
            <th className="p-4 text-left">Base</th>
            <th className="p-4 text-left">Digits Used</th>
            <th className="p-4 text-left">Example</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr><td className="p-4">Binary</td><td className="p-4">2</td><td className="p-4">0–1</td><td className="p-4">1010</td></tr>
          <tr><td className="p-4">Decimal</td><td className="p-4">10</td><td className="p-4">0–9</td><td className="p-4">10</td></tr>
          <tr><td className="p-4">Hexadecimal</td><td className="p-4">16</td><td className="p-4">0–9, A–F</td><td className="p-4">A</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  {/* SECTION */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Step-by-Step Hex Calculation Examples
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      How to Add Hex Numbers (e.g., 0x1A + 0xF2)
    </h3>

    <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl mb-6">
      0x1A = 26, 0xF2 = 242 → 26 + 242 = 268 → 0x10C
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Manual Hex to Decimal Conversion Formula
    </h3>

    <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl">
      Decimal = Σ(digit × 16^position)
    </p>

    <h4 className="text-xl font-semibold text-blue-200 mt-6 mb-3">
      Example: Converting 0x2F to Decimal 47
    </h4>

    <p className="text-gray-200">
      (2 × 16) + (15 × 1) = 32 + 15 = 47
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Converting Hex to Binary for Low-Level Programming
    </h3>

    <p className="text-gray-200 mb-4">
      Each hex digit converts into 4 binary bits. You can verify results using the{" "}
      <Link href="/calculators/math/binary-calculator" className="text-blue-400 hover:underline">
        Binary Calculator
      </Link>.
    </p>
  </section>

  {/* SECTION */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Key Features of the LizoCalc Hex Tool
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Instant Conversion between Hex, Decimal, and 8-bit Binary
    </h3>

    <p className="text-gray-200 mb-6">
      The tool provides real-time conversion between different number systems, helping you understand relationships between formats instantly.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Error Handling for Division by Zero and Negative Results
    </h3>

    <p className="text-gray-200 mb-6">
      The calculator prevents invalid operations such as division by zero and handles negative values correctly to ensure accurate results.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Persistent History: Saving Your Recent Hex Calculations
    </h3>

    <p className="text-gray-200">
      Your recent calculations are stored automatically, allowing you to review or reuse them without entering values again.
    </p>
  </section>

</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
