import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import PermutationCombinationCalculator from "./clientside";


const faqData = [
  {
    question: "What is the main difference between permutations and combinations?",
    answer:
      "The key difference is order. In permutations, the order of items matters (like a door lock code 1-2-3 is different from 3-2-1). In combinations, the order does not matter (like a fruit salad with apple, banana, and cherry is the same as cherry, banana, and apple).",
  },
  {
    question: "How do I calculate permutations (nPr) for a set of items?",
    answer:
      "To find permutations, use the formula nPr = n! / (n - r)!, where 'n' is the total items and 'r' is the number you are choosing. For example, if you have 5 runners and want to know how many ways they can finish in 1st, 2nd, and 3rd place: 5P3 = 5! / (5-3)! = 120 / 2 = 60 ways.",
  },
  {
    question: "What is the formula for calculating combinations (nCr)?",
    answer:
      "The combinations formula is nCr = n! / [r! * (n - r)!]. This divides the permutations by r! to remove duplicate groups. For example, picking a team of 3 from 5 people: 5C3 = 120 / [6 * 2] = 120 / 12 = 10 unique groups.",
  },
  {
    question: "When should I use a Permutation vs. a Combination calculator?",
    answer:
      "Use the Permutation mode if you are arranging items in a specific sequence, like seating charts or race results. Use the Combination mode if you are simply selecting a group where the position doesn't change the outcome, like lottery numbers or committee selections.",
  },
  {
    question: "How do you calculate permutations with repetitions?",
    answer:
      "If items can be reused (like a 4-digit PIN using numbers 0-9), the formula is n^r. For a 4-digit PIN, it would be 10^4 = 10,000 possible sequences. Our calculator allows you to toggle repetition to handle these specific probability scenarios.",
  },
  {
    question: "What does the '!' symbol mean in probability math?",
    answer:
      "The '!' stands for factorial, which means multiplying a series of descending natural numbers. For example, 4! (four factorial) is 4 × 3 × 2 × 1 = 24. It represents the total number of ways to arrange 'n' distinct objects.",
  },
  {
    question: "Can I find combinations for very large numbers manually?",
    answer:
      "Manually calculating large factorials (like 50! or 100!) is extremely difficult as the numbers grow exponentially. An online calculator uses specialized algorithms to handle these large integers instantly, preventing calculation errors in complex probability homework or statistical research.",
  },
];
export const metadata: Metadata = {
  title: "Permutation and Combination Calculator | nPr & nCr Solver",
  description:
    "Free nPr and nCr calculator to find permutations and combinations instantly. Includes step-by-step math formulas and support for repetitions.",

  keywords: [
    "permutation and combination calculator",
    "npr and ncr calculator",
    "permutation calculator with repetition",
    "combination calculator online",
    "npr formula calculator",
    "ncr formula calculator",
    "probability arrangement tool",
    "math factorial calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Permutation & Combination Calculator | LizoCalc",
    description:
      "Solve complex probability problems with our free permutation and combination tool. Get instant results for nPr and nCr calculations.",
    url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Permutation & Combination Calculator | LizoCalc",
    description:
      "Instantly calculate arrangements (nPr) and selections (nCr) with our free, step-by-step math tool.",
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
                  "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#breadcrumb",
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
                    name: "Permutation & Combination Calculator",
                    item: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
                url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
                name: "Permutation & Combination Calculator",
                description: "Use our advanced calculator to estimate permutations and combinations for any set of items.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com"
                },
                "mainEntityOfPage": { "@type": "SoftwareApplication", "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#app" }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#app",
                name: "Permutation & Combination Calculator",
                url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
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
                  url: "https://www.lizocalc.com",
                },
                "potentialAction": {
    "@type": "UseAction",
    "target": ["https://www.lizocalc.com/calculators/math/permutation-combination-calculator"]
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
             Permutation and Combination Calculator: Solve nPr and nCr Instantly
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <PermutationCombinationCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 prose prose-blue prose-lg lg:prose-xl">

  <p>
    In probability and statistics, understanding how to count and arrange objects is essential. Our 
    <strong>Permutation and Combination Calculator</strong> provides instant results for any counting problem, saving time and eliminating manual errors. Whether you are a student, data analyst, or math enthusiast, this tool is perfect for solving problems involving sets, arrangements, and probability calculations.
  </p>

  {/* H2: Major Sections */}
  <section className="mt-16">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">Major Sections</h2>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      How to Use the Permutation and Combination Calculator
    </h3>
    <p>
      Simply enter the values for <code>n</code> (total items) and <code>r</code> (items selected) into the input fields, then choose whether you want a 
      <strong>permutation</strong> or a <strong>combination</strong>. Click “Calculate” to get your result instantly. For advanced calculations, consider using our 
      <Link
        href="/calculators/math/scientific-calculator"
        className="text-blue-400 hover:underline font-semibold"
      >
        Scientific Calculator
      </Link>{" "}
      to handle large numbers.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Permutation vs. Combination: Understanding the Difference
    </h3>
    <p>
      The main difference lies in whether the order matters:
    </p>
    <ul className="list-disc list-inside text-gray-200 space-y-2">
      <li>
        <strong>Permutation (nPr):</strong> Order matters. Arrangements of items are counted differently if their order changes.
      </li>
      <li>
        <strong>Combination (nCr):</strong> Order does not matter. Only the selection of items counts, not their arrangement.
      </li>
    </ul>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      The Mathematics Behind $nPr$ and $nCr$ Formulas
    </h3>
    <p>
      The formulas for counting arrangements and selections are:
    </p>

    <div className="overflow-x-auto mt-4 rounded-lg">
      <table className="table-auto w-full min-w-[600px] text-left text-gray-200 bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-700">Type</th>
            <th className="px-4 py-2 border-b border-gray-700">Formula</th>
            <th className="px-4 py-2 border-b border-gray-700">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 border-b border-gray-700">Permutation (nPr)</td>
            <td className="px-4 py-2 border-b border-gray-700">n! / (n - r)!</td>
            <td className="px-4 py-2 border-b border-gray-700">5P3 = 5×4×3 = 60</td>
          </tr>
          <tr>
            <td className="px-4 py-2 border-b border-gray-700">Combination (nCr)</td>
            <td className="px-4 py-2 border-b border-gray-700">n! / (r!(n - r)!)</td>
            <td className="px-4 py-2 border-b border-gray-700">5C3 = 10</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Step-by-Step Examples: Calculating Sets and Arrangements
    </h3>
    <p>
      <strong>Example 1 (Permutation):</strong> How many ways can 3 students be arranged from a group of 5? <br/>
      Formula: 5P3 = 5! / (5-3)! = 60 ways.
    </p>
    <p>
      <strong>Example 2 (Combination):</strong> How many ways can 3 students be chosen from 5? <br/>
      Formula: 5C3 = 5! / (3!×2!) = 10 ways.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Why Accuracy Matters in Probability and Statistics
    </h3>
    <p>
      In probability, even a small miscalculation can drastically change the outcome. Using our online calculator ensures precision and saves time, especially for large datasets or exams. For related tools, check our 
      <Link
        href="/calculators/math/z-score-calculator"
        className="text-blue-400 hover:underline font-semibold"
      >
        Z-Score Calculator
      </Link>.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Frequently Asked Questions About Permutations and Combinations
    </h3>
    <p>
      We cover the most common queries to help you master counting theory quickly.
    </p>

  </section>

  {/* H3: Detailed Subsections & Search Intent */}
  <section className="mt-16">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">Detailed Subsections & Search Intent</h2>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      When Does Order Matter? Choosing Between $P(n, r)$ and $C(n, r)$
    </h3>
    <p>
      If rearranging the selected items creates a new outcome, use <strong>permutations</strong>. Otherwise, if the order is irrelevant, use <strong>combinations</strong>.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      How to Calculate Permutations with the $n! / (n-r)!$ Formula
    </h3>
    <p>
      Factorial notation (<code>n!</code>) is used for permutations. Multiply descending numbers until reaching the difference between total items and selected items. Example: 7P4 = 7×6×5×4 = 840.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Calculating Combinations Using the $n! / [r!(n-r)!]$ Formula
    </h3>
    <p>
      Combinations divide permutations by <code>r!</code> to remove duplicate orderings. Example: 7C4 = 35.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      What is a Factorial? The Building Block of Counting Theory
    </h3>
    <p>
      Factorial represents the product of all positive integers up to <code>n</code>. For example, 5! = 5×4×3×2×1 = 120. It is crucial for calculating both permutations and combinations.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Permutations with Repetition: Handling Identical Items
    </h3>
    <p>
      When some items are identical, divide the total factorial by the factorials of identical items. Example: arranging letters in "AAB" → 3! / 2! = 3 unique arrangements.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Practical Example: How Many Ways to Choose a Committee?
    </h3>
    <p>
      Choosing 3 members from 10 people: 10C3 = 120 ways. Use our calculator for quick results without manual computation.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Solving Probability Problems with Our Instant Calculator
    </h3>
    <p>
      Combine the calculator with probability formulas for events. For example, the probability of selecting a specific 3-member team from 10 people = 1 / 120.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-6">
      Tips for Large Number Calculations and Scientific Notation
    </h3>
    <p>
      For large values of <code>n</code> and <code>r</code>, results can grow exponentially. Use scientific notation to handle them efficiently. Our calculator automatically formats large numbers for readability.
    </p>

  </section>

</article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}