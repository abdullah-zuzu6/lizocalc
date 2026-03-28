import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import LCMCalculator from "./clientside";

const faqData = [
  {
    question: "What is the easiest way to find the Least Common Multiple (LCM)?",
    answer: "The Prime Factorization Method is the most reliable. You break each number into prime factors and multiply the highest power of each prime. For example, for 12 (2² × 3) and 18 (2 × 3²), the LCM is 2² × 3² = 4 × 9 = 36. Our calculator automates this prime breakdown for you instantly."
  },
  {
    question: "Can the LCM be smaller than the numbers I am analyzing?",
    answer: "No. The Least Common Multiple must be greater than or equal to the largest number in your set because it must be evenly divisible by those numbers. If you find a smaller number that divides into your set, you are likely looking for the Greatest Common Factor (GCF) instead."
  },
  {
    question: "How is the LCM mathematically related to the Greatest Common Divisor (GCD)?",
    answer: "LCM and GCD are linked by a specific formula: LCM(a, b) = |a × b| / GCD(a, b). This relationship is highly efficient for calculations. For example, if GCD(8, 12) is 4, then LCM = (8 × 12) / 4 = 24. This logic is built directly into our calculator's engine."
  },
  {
    question: "Why is finding the LCM necessary for adding fractions?",
    answer: "To add or subtract fractions with different denominators, you need a Least Common Denominator (LCD), which is simply the LCM of the denominators. For example, to add 1/6 and 1/8, you find LCM(6, 8) = 24, allowing you to convert both to a common base before calculating."
  },
  {
    question: "How do you calculate the LCM for a list of three or more numbers?",
    answer: "You can find the LCM of multiple numbers by processing them in pairs. To find LCM(a, b, c), you first calculate LCM(a, b) = Z, and then find LCM(Z, c). Our tool handles this iteratively, so you can enter as many numbers as you need, separated by commas."
  },
  {
    question: "What are the real-world applications of the LCM?",
    answer: "LCM is essential for synchronized timing and scheduling. If one event repeats every 6 days and another every 10 days, they will coincide every LCM(6, 10) = 30 days. It is also used in mechanical engineering for gear ratios and in project management for aligning repetitive task cycles."
  }
];

export const metadata: Metadata = {
  title: "LCM Calculator with Prime Factorization | LizoCalc",
  description:
    "Find the Least Common Multiple (LCM) of two or more numbers instantly. Get step-by-step prime factorization, formulas, and clear math explanations.",

  keywords: [
    "lcm calculator",
    "least common multiple calculator",
    "find lcm online",
    "math lcm tool",
    "lcm formula calculator",
    "prime factorization lcm solver",
    "lcm of 3 numbers calculator",
    "calculate least common multiple",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/lcm-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "LCM Calculator | LizoCalc",
    description:
      "Find the Least Common Multiple (LCM) of numbers instantly using our free calculator with prime factorization steps.",
    url: "https://www.lizocalc.com/calculators/math/lcm-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "LCM Calculator | LizoCalc",
    description:
      "Calculate the Least Common Multiple of numbers quickly using our free LCM calculator with step-by-step results.",
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
                  "https://www.lizocalc.com/calculators/math/lcm-calculator#breadcrumb",
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
                    name: "LCM Calculator",
                    item: "https://www.lizocalc.com/calculators/math/lcm-calculator",
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
          
          <h1 className="text-3xl md:text-4xl font-bold">LCM Calculator: Find the Least Common Multiple with Prime Factorization</h1>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <LCMCalculator />
      </section>

      {/* SEO Content */}
 <article className="max-w-6xl mx-auto px-6 py-16 text-white">

  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>least common multiple (LCM)</strong> — also known as the{" "}
    <strong>lowest common multiple</strong> or{" "}
    <strong>smallest common multiple</strong> — is a key concept in mathematics.
    It helps you work with <strong>fractions</strong>, simplify ratios, solve
    real-world problems, and understand repeating patterns. Whether you are a
    student or someone solving daily calculations, learning{" "}
    <strong>how to find LCM</strong> is essential.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our fast and accurate{" "}
    <strong>lcm calculator</strong> makes it easy to{" "}
    <strong>calculate LCM</strong> of two or more numbers instantly. You can
    enter values and get results using methods like{" "}
    <strong>prime factorization</strong>, <strong>division method</strong>, and
    more. If you also want to understand related concepts like{" "}
    <strong>gcf</strong> (greatest common factor), you can explore our{" "}
    <Link
      href="/calculators/math/gcf-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      GCF calculator page
    </Link>
    .
  </p>

  {/* SECTION 1 */}
  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Find the Least Common Multiple (LCM) Instantly
    </h2>

    <p className="text-gray-200 mb-6">
      There are several ways for <strong>finding LCM</strong>. The simplest
      method for beginners is <strong>listing multiples</strong>, while advanced
      methods include the <strong>prime factorization method</strong> and the{" "}
      <strong>ladder method</strong> (also called the{" "}
      <strong>cake method</strong>).
    </p>

    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl text-blue-300 mb-4 font-semibold">
        Example: LCM of Two Numbers
      </h3>
      <p className="text-gray-200">
        Multiples of 4 → 4, 8, 12, 16, 20, 24...
        <br />
        Multiples of 6 → 6, 12, 18, 24...
        <br />
        Common multiples → 12, 24...
        <br />
        <strong>LCM = 12</strong>
      </p>
    </div>

    <p className="text-gray-200 mt-6">
      This method works well for small numbers, but for larger values, using a{" "}
      <Link
        href="/calculators/math/lcm-calculator"
        className="text-blue-400 hover:underline"
      >
        LCM calculator
      </Link>{" "}
      is much faster and more accurate.
    </p>
  </section>

  {/* SECTION 2 */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Why Use Our Prime Factorization LCM Solver?
    </h2>

    <p className="text-gray-200 mb-6">
      The <strong>prime factorization</strong> method breaks each number into{" "}
      <strong>prime factors</strong> using <strong>prime numbers</strong>. This
      method ensures 100% accuracy and is widely used in exams.
    </p>

    <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
      <h3 className="text-xl text-blue-300 mb-3 font-semibold">
        Example Using Exponents
      </h3>
      <p className="text-gray-200">
        24 = 2³ × 3
        <br />
        36 = 2² × 3²
        <br />
        Take highest <strong>powers</strong> → 2³ × 3² = <strong>72</strong>
      </p>
    </div>

    <p className="text-gray-200 mt-6">
      This approach is also called{" "}
      <strong>prime factorization using exponents</strong> and is the most
      reliable way to <strong>find lcm</strong>.
    </p>
  </section>

  {/* SECTION 3 */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      The Step-by-Step LCM Formula: Using GCD for Accuracy
    </h2>

    <p className="text-gray-200 mb-6">
      The <strong>lcm formula</strong> connects LCM with{" "}
      <strong>gcd</strong> (greatest common divisor):
    </p>

    <div className="bg-gray-900 p-5 rounded-lg text-green-300 font-mono mb-6">
      LCM(a, b) = (a × b) / GCD(a, b)
    </div>

    <p className="text-gray-200">
      This formula is very useful for large numbers. You can calculate the{" "}
      <strong>greatest common factor</strong> first and then apply this formula.
      Try it using our{" "}
      <Link
        href="/calculators/math/scientific-calculator"
        className="text-blue-400 hover:underline"
      >
        Scientific Calculator
      </Link>
      .
    </p>
  </section>

  {/* SECTION 4 */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use the Multi-Number LCM Parameters
    </h2>

    <p className="text-gray-200 mb-6">
      You can find the <strong>lcm of more than two numbers</strong> easily by
      repeating the process step-by-step.
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3">
      <li>Start with first two numbers</li>
      <li>Find their LCM</li>
      <li>Combine result with next number</li>
      <li>Repeat until complete</li>
    </ul>

    <p className="text-gray-200 mt-6">
      This works for any number set and is supported by our tool.
    </p>
  </section>

  {/* SECTION 5 */}
  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Practical Applications: From Fractions to Scheduling Intervals
    </h2>

    <ul className="list-disc list-inside text-gray-200 space-y-3">
      
      <li>Comparing ratios and percentages using{" "}
        <Link
          href="/calculators/math/percentage-calculator"
          className="text-blue-400 hover:underline"
        >
          Percentage Calculator
        </Link>
      </li>
      <li>Geometry problems using{" "}
        <Link
          href="/calculators/math/triangle-calculator"
          className="text-blue-400 hover:underline"
        >
          Triangle Calculator
        </Link>
      </li>
    </ul>
  </section>

  {/* EXTRA EXAMPLE */}
  <section className="mt-20">
    <h3 className="text-2xl text-blue-300 mb-5 font-semibold">
      Step-by-Step Example: LCM of 12, 18, and 24
    </h3>

    <p className="text-gray-200">
      Prime factorization:
      <br />
      12 = 2² × 3
      <br />
      18 = 2 × 3²
      <br />
      24 = 2³ × 3
      <br />
      Take highest exponents → 2³ × 3² = <strong>72</strong>
    </p>
  </section>

  {/* TABLE */}
  <section className="mt-20">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">
      LCM Examples Table
    </h2>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm border border-gray-700">
        <thead className="bg-blue-900">
          <tr>
            <th className="p-3">Numbers</th>
            <th className="p-3">LCM</th>
            <th className="p-3">Method</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800">
          <tr>
            <td className="p-3">6, 8</td>
            <td className="p-3">24</td>
            <td className="p-3">Listing Multiples</td>
          </tr>
          <tr>
            <td className="p-3">12, 18</td>
            <td className="p-3">36</td>
            <td className="p-3">Prime Factorization</td>
          </tr>
          <tr>
            <td className="p-3">15, 20</td>
            <td className="p-3">60</td>
            <td className="p-3">Division Method</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  {/* FAQ */}
  <section className="mt-20">
    <h4 className="text-2xl text-blue-400 mb-6 font-bold">
      FAQ: LCM Questions Answered
    </h4>

    <div className="space-y-6">
      <div>
        <h5 className="text-blue-300 font-semibold">
          What is the simplest formula for LCM?
        </h5>
        <p className="text-gray-200">
          LCM(a, b) = (a × b) / GCD(a, b)
        </p>
      </div>

      <div>
        <h5 className="text-blue-300 font-semibold">
          Can the LCM be smaller than the largest number?
        </h5>
        <p className="text-gray-200">
          No, it is always equal or greater than the largest number.
        </p>
      </div>

      <div>
        <h5 className="text-blue-300 font-semibold">
          How does this tool handle large numbers?
        </h5>
        <p className="text-gray-200">
          It uses optimized algorithms like GCD and prime factorization for fast results.
        </p>
      </div>

      <div>
        <h5 className="text-blue-300 font-semibold">
          Why is prime factorization best?
        </h5>
        <p className="text-gray-200">
          It uses exact <strong>prime factors</strong> and avoids errors.
        </p>
      </div>
    </div>
  </section>

</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
