// app/calculators/math/fraction-calculator/page.tsx

import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import FractionCalculator from "./clientside";

// ────────────────────────────────────────────────
//  FAQ Content
// ────────────────────────────────────────────────
const faqData = [
  {
    question: "How do you add fractions with different denominators?",
    answer: "To add fractions with different denominators, you must first find a Common Denominator. Multiply the numerator and denominator of each fraction by the value needed to make the denominators match. For example, to solve $1/2 + 1/3$, convert them to $3/6 + 2/6$ to get $5/6$.",
  },
  {
    question: "How do I convert a fraction into a decimal?",
    answer: "Converting a fraction to a decimal is simple: just divide the top number (numerator) by the bottom number (denominator). For instance, to convert $3/4$, you calculate $3 \div 4$, which equals $0.75$.",
  },
  {
    question: "What is the easiest way to multiply two fractions?",
    answer: "Unlike addition, you don't need a common denominator to multiply fractions. Simply multiply the numerators together and the denominators together. For example: $(2/3) \times (4/5) = (2 \times 4) / (3 \times 5) = 8/15$.",
  },
  {
    question: "How do you simplify or reduce a fraction?",
    answer: "To simplify a fraction, find the Greatest Common Divisor (GCD) of both the numerator and denominator and divide both by that number. For $12/16$, the GCD is $4$. Dividing both by $4$ simplifies the fraction to $3/4$.",
  },
  {
    question: "How do I divide one fraction by another?",
    answer: "To divide fractions, use the 'Keep, Change, Flip' method. Keep the first fraction, change the division sign to multiplication, and flip the second fraction (its reciprocal). For $1/2 \div 3/4$, it becomes $1/2 \times 4/3 = 4/6$, which simplifies to $2/3$.",
  },
  {
    question: "What is a mixed number and how do I calculate it?",
    answer: "A mixed number combines a whole number and a fraction (e.g., $1 \frac{1}{2}$). To use it in a calculator, convert it to an improper fraction first: multiply the whole number by the denominator and add the numerator. For $2 \frac{3}{4}$, calculate $(2 \times 4) + 3 = 11$, resulting in $11/4$.",
  },
];

// ────────────────────────────────────────────────
//  Metadata (SEO)
// ────────────────────────────────────────────────
export const metadata: Metadata = {
  title:
    "Fraction Calculator Online – Add, Subtract, Multiply, Divide & Simplify Fractions",
  description:
    "Free online fraction calculator: instantly add, subtract, multiply, divide fractions, simplify to lowest terms, and convert to decimal. Perfect for students, teachers, and everyday math.",
  keywords: [
    "fraction calculator",
    "online fraction calculator",
    "add fractions online",
    "subtract fractions calculator",
    "multiply fractions",
    "divide fractions",
    "simplify fractions",
    "fraction to decimal converter",
    "mixed fraction calculator",
    "free fraction tool",
    "math fraction solver",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/fraction-calculator",
  },
  openGraph: {
    title: "Fraction Calculator – Add, Subtract, Multiply & Simplify Instantly",
    description:
      "Fast, accurate online tool for all fraction operations + automatic simplification and decimal conversion.",
    url: "https://lizocalc.com/calculators/math/fraction-calculator",
    type: "website",
  },
};

// ────────────────────────────────────────────────
//  PAGE COMPONENT
// ────────────────────────────────────────────────
export default function FractionCalculatorPage() {
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
                    name: "Math",
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
                "@type": "WebPage",
                url: "https://lizocalc.com/calculators/math/fraction-calculator",
                name: "Fraction Calculator",
                description:
                  "Free tool to add, subtract, multiply, divide and simplify fractions with instant results and decimal conversion.",
              },
              {
                "@type": "SoftwareApplication",
                name: "Fraction Calculator",
                applicationCategory: "EducationalApplication",
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

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          
          <h1 className="text-3xl md:text-4xl font-bold">
            Fraction Calculator: Add, Subtract, Multiply, and Divide Fractions
          </h1>
        </div>
      </section>

      {/* Calculator Component (client-side only) */}
      <section className="px-4 py-8">
        <FractionCalculator />
      </section>

      {/* Main SEO + Educational Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6">
    Mastering fractions is a foundational math skill used in everyday life — from cooking and baking recipes, splitting bills, measuring ingredients, calculating discounts, understanding ratios in design, to advanced topics in algebra, physics, and engineering. Our free online fraction calculator makes working with fractions fast, accurate, and stress-free. It handles addition, subtraction, multiplication, division, automatic simplification using GCD, and instant decimal conversion — all in one clean interface. Whether you're a student tackling homework, a parent helping with math practice, a teacher demonstrating concepts, or someone needing quick real-world calculations, this tool delivers precise results instantly. No sign-up, no ads, mobile-friendly, and it remembers your last inputs via browser cookies for seamless return visits.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8">
    Unlike basic calculator apps or search engine snippets that often show only approximate decimals or force manual steps, our dedicated fraction calculator performs full operations with exact fraction results first, then provides a clear decimal approximation. It prevents common errors like forgetting to find common denominators or misapplying the "keep-change-flip" rule. Perfect for middle school through high school math, pre-algebra review, or anyone refreshing fraction skills for work or daily tasks.
  </p>

  <section>
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mt-16 border-b border-blue-600 pb-4 mb-8">
      How to Use the Online Fraction Calculator
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Step-by-Step Guide to Calculating Fractions
        </h3>
        <ol className="list-decimal list-inside text-gray-200 space-y-3">
          <li>Enter the first fraction: type the numerator (top number) and denominator (bottom number) into the respective fields.</li>
          <li>Choose your operation using the dropdown: Add (+), Subtract (−), Multiply (×), or Divide (÷).</li>
          <li>Enter the second fraction in the same way — numerator and denominator separately.</li>
          <li>Click the large “Calculate” button to see instant results.</li>
          <li>View the exact simplified fraction (lowest terms) and its decimal equivalent side by side.</li>
          <li>Use the “Reset” button to clear all fields and start a fresh problem — ideal for practicing multiple examples quickly.</li>
        </ol>
        <p className="text-gray-300 italic mt-4">
          Tip: The tool prevents division by zero and handles negative numbers correctly (useful for signed quantities like temperatures or debts).
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Understanding Your Results: Simplified Fractions vs. Decimals
        </h3>
        <p className="text-gray-200 leading-relaxed mb-4">
          Every result appears in two formats for maximum clarity:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2">
          <li><strong>Simplified fraction</strong> — the mathematically exact answer reduced to lowest terms using the Greatest Common Divisor (GCD).</li>
          <li><strong>Decimal approximation</strong> — shown to 6 decimal places for quick real-world comparisons (money, measurements, probabilities).</li>
        </ul>
        <p className="text-gray-200 mt-4">
          Keep the fraction form for precision in schoolwork, recipes, or ratios. Switch to the decimal when estimating, comparing sizes, or using measuring tools that display decimals.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Resetting the Calculator for New Math Problems
        </h3>
        <p className="text-gray-200 leading-relaxed">
          One click on “Reset” restores default values (1/2 and 1/3) and clears the result area. This makes it effortless to work through homework sets, test practice, or compare multiple fraction scenarios without re-typing everything.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Powerful Features for Simplifying Complex Math
    </h2>

    <div className="grid md:grid-cols-2 gap-6 mt-8">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          Automatic Fraction Simplification Using GCD
        </h3>
        <p className="text-gray-200">
          The tool instantly computes the Greatest Common Divisor after each operation and reduces the fraction automatically. Example: 12/18 + 8/24 becomes 2/3 + 1/3 = 1 exactly — no manual reduction needed.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          Instant Decimal Conversion for Every Calculation
        </h3>
        <p className="text-gray-200">
          Fractions are exact, but decimals help in practical scenarios (pricing, measurements, statistics). Both are shown side-by-side for flexibility.
        </p>
      </div>
    </div>

    <h4 className="text-xl font-bold text-blue-300 mt-10 mb-4">
      Why Proper Denominators Matter in Fraction Calculations
    </h4>
    <p className="text-gray-200">
      Addition and subtraction require identical denominators — otherwise the parts don't align meaningfully. The calculator finds a common denominator (often the least common multiple) behind the scenes, performs the operation accurately, and then simplifies the result. This eliminates one of the most frequent student errors in fraction arithmetic.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Supported Fraction Operations and Formulas
    </h2>

    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Adding Fractions with Different Denominators
        </h3>
        <p className="text-gray-200">
          <strong>Formula:</strong> <span className="font-mono text-green-300">a/b + c/d = (a×d + c×b) / (b×d)</span> → simplify using GCD.
        </p>
        <p className="text-gray-300 mt-2">
          The tool automatically computes the common denominator to avoid manual work.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Subtracting Fractions: Finding the Difference Quickly
        </h3>
        <p className="text-gray-200">
          <strong>Formula:</strong> <span className="font-mono text-green-300">a/b − c/d = (a×d − c×b) / (b×d)</span> → simplify.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          How to Multiply Fractions Numerator-by-Numerator
        </h3>
        <p className="text-gray-200">
          <strong>Formula:</strong> <span className="font-mono text-green-300">(a/b) × (c/d) = (a×c) / (b×d)</span> → simplify.
        </p>
        <p className="text-gray-300 mt-2">
          Multiplication is straightforward — no common denominator required.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Dividing Fractions: The "Keep, Change, Flip" Method
        </h3>
        <p className="text-gray-200">
          <strong>Formula:</strong> <span className="font-mono text-green-300">(a/b) ÷ (c/d) = (a/b) × (d/c) = (a×d) / (b×c)</span>
        </p>
        <p className="text-gray-300 mt-2">
          Flipping the second fraction (using its reciprocal) turns division into multiplication.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Examples of Fraction Problems Solved
    </h2>

    <div className="space-y-10">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Example 1: Adding 1/2 + 1/3 (Different Denominators)
        </h3>
        <ul className="list-decimal list-inside text-gray-200 space-y-2">
          <li>Least Common Multiple of 2 and 3 = 6</li>
          <li>Convert: 1/2 = 3/6, 1/3 = 2/6</li>
          <li>Add numerators: 3 + 2 = 5</li>
          <li>Result: 5/6 (already simplified)</li>
        </ul>
        <p className="text-green-400 font-bold mt-4">Decimal: ≈ 0.833333</p>
        <p className="text-gray-300 mt-2">Real-life: Splitting a pizza (half + one-third slice).</p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Example 2: Dividing 3/4 ÷ 1/2 (Keep-Change-Flip)
        </h3>
        <p className="text-gray-200">
          Keep 3/4, change ÷ to ×, flip 1/2 to 2/1 → (3/4) × (2/1) = 6/4 = 3/2
        </p>
        <p className="text-green-400 font-bold mt-4">Result: 3/2 or 1 1/2 ≈ 1.5</p>
        <p className="text-gray-300 mt-2">Real-life: How many half-cup servings in ¾ cup of flour?</p>
      </div>
    </div>

    <div className="overflow-x-auto mt-10">
      <table className="min-w-full text-sm text-white border border-gray-600 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-900/60">
            <th className="p-3 text-left">Operation</th>
            <th className="p-3 text-left">Example</th>
            <th className="p-3 text-left">Formula Used</th>
            <th className="p-3 text-left">Result (Simplified)</th>
            <th className="p-3 text-left">Decimal</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/40 divide-y divide-gray-700">
          <tr>
            <td className="p-3">Addition</td>
            <td className="p-3">2/5 + 1/4</td>
            <td className="p-3">(8 + 5)/20</td>
            <td className="p-3">13/20</td>
            <td className="p-3">0.65</td>
          </tr>
          <tr>
            <td className="p-3">Subtraction</td>
            <td className="p-3">5/6 − 1/4</td>
            <td className="p-3">(10 − 3)/12</td>
            <td className="p-3">7/12</td>
            <td className="p-3">≈0.5833</td>
          </tr>
          <tr>
            <td className="p-3">Multiplication</td>
            <td className="p-3">3/8 × 4/5</td>
            <td className="p-3">12/40</td>
            <td className="p-3">3/10</td>
            <td className="p-3">0.3</td>
          </tr>
          <tr>
            <td className="p-3">Division</td>
            <td className="p-3">2/3 ÷ 5/6</td>
            <td className="p-3">2/3 × 6/5</td>
            <td className="p-3">4/5</td>
            <td className="p-3">0.8</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Common Mistakes to Avoid When Working with Fractions
    </h2>

    <div className="space-y-6">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          Mistake #1: Adding Denominators Instead of Numerators
        </h3>
        <p className="text-gray-200">
          Wrong: 1/4 + 1/5 = 2/9 (added both tops and bottoms). Correct: find common denominator first → 5/20 + 4/20 = 9/20.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          Mistake #2: Forgetting to Flip When Dividing
        </h3>
        <p className="text-gray-200">
          Wrong: 3/4 ÷ 2/5 = 6/20. Correct: multiply by reciprocal → 3/4 × 5/2 = 15/8.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-3">
          Mistake #3: Not Simplifying Final Answer
        </h3>
        <p className="text-gray-200">
          Our tool handles this automatically so you always get the cleanest form.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Advanced Tools for Math Students and Professionals
    </h2>

    <p className="text-gray-200 mb-6">
      For deeper fraction work, combine this calculator with our specialized tools:
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">
      Finding the Least Common Multiple (LCM)
    </h3>
    <p className="text-gray-200">
      Essential for adding/subtracting fractions with large denominators. Try our{" "}
      <Link href="/calculators/math/lcm-calculator" className="text-blue-400 hover:underline">
        LCM calculator
      </Link>{" "}
      for instant results — great for problems like 7/12 + 5/18.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-4">
      Determining the Greatest Common Factor (GCF/GCD)
    </h3>
    <p className="text-gray-200">
      Key to manual simplification. Use our{" "}
      <Link href="/calculators/math/gcf-calculator" className="text-blue-400 hover:underline">
        GCF calculator
      </Link>{" "}
      to verify or practice reducing fractions by hand.
    </p>

    

    <p className="text-gray-300 italic text-center mt-16 text-lg">
      Practice fractions confidently — this free tool is always ready when you need accurate, instant help!
    </p>
  </section>
</article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
