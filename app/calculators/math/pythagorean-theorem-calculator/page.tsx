import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const PythagoreanCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});
const faqData = [
  {
    question: "What is the formula used in a Pythagorean theorem calculator?",
    answer: "A Pythagorean theorem calculator uses the formula $a^2 + b^2 = c^2$. In this equation, 'a' and 'b' represent the two shorter sides (legs) that meet at a 90-degree angle, while 'c' represents the hypotenuse, which is the longest side opposite the right angle.",
  },
  {
    question: "How do I calculate the hypotenuse of a right triangle?",
    answer: "To find the hypotenuse (c), follow these three steps: 1. Square both legs ($a^2$ and $b^2$). 2. Add those two squares together. 3. Take the square root of the sum. For example, if the legs are 3 and 4, the calculation is $\\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    question: "Can I use the Pythagorean theorem on any triangle?",
    answer: "No, the Pythagorean theorem only works for right-angled triangles (triangles with one 180°/2 = 90° angle). If you try to apply it to acute or obtuse triangles, the results will be mathematically incorrect. For non-right triangles, you would typically use the Law of Cosines instead.",
  },
  {
    question: "How do I find a missing leg (a or b) if I know the hypotenuse?",
    answer: "If you have the hypotenuse (c) and one leg (a), you rearrange the formula to $b = \\sqrt{c^2 - a^2}$. You subtract the square of the known leg from the square of the hypotenuse, then find the square root of the remainder to determine the missing side's length.",
  },
  {
    question: "What are some common 'Pythagorean Triples' to remember?",
    answer: "Pythagorean Triples are sets of three whole numbers that perfectly fit the formula without decimals. The most common ones used in school and construction are (3, 4, 5), (5, 12, 13), (8, 15, 17), and (7, 24, 25). These are great for quickly verifying if a corner is perfectly 'square'.",
  },
  {
    question: "What are the real-world applications of a Pythagorean theorem calculator?",
    answer: "This calculation is essential in various fields. Architects and builders use it to ensure corners are square; painters use it to determine the ladder length needed to reach a certain height; and navigation experts use it to find the shortest 'as-the-crow-flies' distance between two points on a map.",
  },
];
export const metadata: Metadata = {
  title: "Pythagorean Theorem Calculator | Solve Right Triangles",
  description:
    "Calculate the hypotenuse, base, or perpendicular side of a right triangle instantly using our Pythagorean Theorem calculator with step-by-step steps.",

  keywords: [
    "pythagorean theorem calculator",
    "hypotenuse calculator",
    "right triangle solver",
    "calculate triangle sides",
    "a2 b2 c2 calculator",
    "triangle area calculator",
    "right angle triangle sides",
    "geometry side finder",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Pythagorean Theorem Calculator | LizoCalc",
    description:
      "Free Pythagorean calculator to solve triangle sides with an easy-to-use interface and formulas.",
    url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pythagorean Theorem Calculator | LizoCalc",
    description:
      "Solve for a, b, or c in any right-angled triangle with our free Pythagorean Theorem calculator.",
  },
};

export default function PythagoreanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA === */}
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
                  "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator#breadcrumb",
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
                    name: "Math ",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Pythagorean Theorem Calculator",
                    item: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                name: "Pythagorean Theorem Calculator",
                description: "Estimate the missing sides of a right triangle instantly with our Pythagorean Theorem calculator.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator#app",
                name: "Pythagorean Theorem Calculator",
                url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                description:
                  "Online math tool to solve for the hypotenuse, base, or perpendicular using the Pythagorean Theorem.",
                applicationCategory: "MathApplication",
                applicationSubCategory: "Geometry Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Solve for Hypotenuse (c)",
                  "Solve for Perpendicular (a)",
                  "Solve for Base (b)",
                  "Step-by-step calculation steps",
                  "Triangle area calculation",
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
            
            <h1 className="text-3xl md:text-4xl font-bold">
              Pythagorean Theorem Calculator -Solve Right Triangles Instantly
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <PythagoreanCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Pythagorean Theorem</strong> — also known as the Pythagoras theorem — is one of the most powerful and widely used principles in geometry. Whether you're a student in Sahiwal preparing for your Class 8–10 board exams, a parent helping with right-triangle homework, a carpenter checking corners on a construction site in Punjab, or an engineer verifying squareness on a real-world project, this simple formula <span className="font-mono text-green-300">a² + b² = c²</span> saves hours of manual calculation.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>Pythagorean Theorem Calculator</strong> (also called the hypotenuse calculator or right-triangle solver) instantly finds the missing side and the area of any right-angled triangle. Just enter any two sides (or leave one field empty), click Calculate, and get the exact result with step-by-step working, highlighted formulas, and the triangle area — all displayed in big, clean numbers. The tool is fully mobile-friendly, works offline after first load, remembers your last inputs (with consent), handles decimal values perfectly, and never shows ads. Perfect for homework checks, exam revision, carpentry, construction, or quick field measurements. Jump right in and try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/math/pythagorean-theorem-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Pythagorean Theorem Calculator page
          </NoPrefetchLink>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Pythagorean Theorem Solver
          </h2>

          <div className="mt-8 space-y-10">
            {/* Finding the Hypotenuse */}
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Finding the Hypotenuse (Side C)
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                When you know the two legs (base <span className="font-mono">a</span> and perpendicular <span className="font-mono">b</span>), the calculator instantly solves for the longest side — the hypotenuse <span className="font-mono">c</span>.
              </p>
              <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-center text-xl mb-4">
                c = √(a² + b²)
              </div>
              <p className="text-gray-200 text-base">
                Example: a = 3, b = 4 → c = √(9 + 16) = √25 = <strong>5</strong> (classic 3-4-5 triangle).
              </p>
            </div>

            {/* Calculating Base or Perpendicular */}
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Calculating the Base or Perpendicular (Side A or B)
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Know the hypotenuse <span className="font-mono">c</span> and one leg? The solver finds the missing leg using rearrangement of the formula.
              </p>
              <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-center text-xl mb-4">
                a = √(c² − b²)&nbsp;&nbsp;&nbsp;or&nbsp;&nbsp;&nbsp;b = √(c² − a²)
              </div>
              <p className="text-gray-200 text-base">
                Example: c = 13, b = 5 → a = √(169 − 25) = √144 = <strong>12</strong> (5-12-13 triple).
              </p>
            </div>

            {/* Step-by-Step Guide */}
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step-by-Step Guide to Entering Your Parameters
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Enter any two known sides in the input fields (you can use decimals or whole numbers).</li>
                <li>Leave the third side (the unknown) completely blank — the calculator will solve for it automatically.</li>
                <li>Click the big <strong>Calculate</strong> button.</li>
                <li>Instantly see the missing side displayed in large bold text plus the exact area of the triangle.</li>
                <li>Scroll down for the detailed step-by-step working with formulas highlighted.</li>
                <li>Need another calculation? Hit <strong>Reset</strong> — everything clears instantly.</li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool automatically detects which side is missing, validates that the hypotenuse is the longest side, and gives friendly error messages if your numbers don’t form a valid right triangle.
              </p>
            </div>

            {/* Why leave Unknown empty */}
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Why you should leave the "Unknown" field empty
              </h4>
              <p className="text-gray-200 text-base">
                The calculator is smart — it only needs two values to solve for the third. Leaving the unknown field blank tells the tool exactly which side to calculate. If you accidentally fill all three fields, it will verify whether they satisfy <span className="font-mono text-green-300">a² + b² = c²</span> and show a green “Valid Right Triangle” message or a red warning.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Mathematics Behind $a^2 + b^2 = c^2$
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Understanding the Geometry of Right-Angled Triangles
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              In any right-angled triangle, the two shorter sides (legs) are called the base (<span className="font-mono">a</span>) and perpendicular (<span className="font-mono">b</span>). The longest side, opposite the 90° angle, is the hypotenuse (<span className="font-mono">c</span>). The theorem states that the square of the hypotenuse equals the sum of the squares of the other two sides.
            </p>
            <div className="font-mono text-3xl text-green-300 text-center my-8">
              a² + b² = c²
            </div>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Detailed Breakdown of the Calculation Steps
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base">
              <li>Identify which side is missing.</li>
              <li>Square the two known sides.</li>
              <li>Add (or subtract) the squares depending on whether you are finding the hypotenuse or a leg.</li>
              <li>Take the square root of the result.</li>
            </ol>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
            <h4 className="text-xl font-bold text-blue-300 mb-3">
              Squaring the sides and extracting the square root
            </h4>
            <p className="text-gray-200 text-base mb-4">
              Example calculation (finding hypotenuse):
            </p>
            <div className="font-mono text-green-300 bg-gray-900/70 p-5 rounded-xl leading-relaxed text-sm">
              a = 6, b = 8<br />
              a² = 36<br />
              b² = 64<br />
              a² + b² = 100<br />
              c = √100 = <strong>10</strong>
            </div>
            <p className="text-gray-200 text-base mt-6">
              Same steps work in reverse when finding a missing leg.
            </p>
          </div>

          <div className="mt-12 bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              How We Calculate the Triangle Area ($0.5 \times a \times b$)
            </h3>
            <p className="text-gray-200 text-base mb-4">
              Once both legs are known (or calculated), the area is simply:
            </p>
            <div className="font-mono text-green-300 text-2xl text-center mb-4">
              Area = ½ × a × b
            </div>
            <p className="text-gray-200 text-base">
              Example: legs 6 cm and 8 cm → Area = ½ × 6 × 8 = <strong>24 cm²</strong>. The calculator shows this automatically with every result.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Applications &amp; Pythagorean Triples
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              What are Pythagorean Triples? (3, 4, 5 and beyond)
            </h3>
            <p className="text-gray-200 text-base mb-6">
              A Pythagorean triple is any set of three positive integers (a, b, c) that perfectly satisfy a² + b² = c². These are extremely useful for quick mental checks on construction sites.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-900/70">
                    <th className="p-4 text-left font-semibold">Triple</th>
                    <th className="p-4 text-left font-semibold">a</th>
                    <th className="p-4 text-left font-semibold">b</th>
                    <th className="p-4 text-left font-semibold">c</th>
                    <th className="p-4 text-left font-semibold">Common Use</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                  <tr>
                    <td className="p-4 font-bold">3-4-5</td>
                    <td className="p-4">3</td>
                    <td className="p-4">4</td>
                    <td className="p-4">5</td>
                    <td className="p-4">Smallest &amp; most famous</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">5-12-13</td>
                    <td className="p-4">5</td>
                    <td className="p-4">12</td>
                    <td className="p-4">13</td>
                    <td className="p-4">Roof framing</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">6-8-10</td>
                    <td className="p-4">6</td>
                    <td className="p-4">8</td>
                    <td className="p-4">10</td>
                    <td className="p-4">Scaled 3-4-5 (multiply by 2)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">7-24-25</td>
                    <td className="p-4">7</td>
                    <td className="p-4">24</td>
                    <td className="p-4">25</td>
                    <td className="p-4">Larger construction checks</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">8-15-17</td>
                    <td className="p-4">8</td>
                    <td className="p-4">15</td>
                    <td className="p-4">17</td>
                    <td className="p-4">Common in Pakistan building projects</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold">9-12-15</td>
                    <td className="p-4">9</td>
                    <td className="p-4">12</td>
                    <td className="p-4">15</td>
                    <td className="p-4">Scaled 3-4-5 (multiply by 3)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Using the Calculator for Construction and Carpentry
            </h3>
            <p className="text-gray-200 text-base">
              Carpenters in Sahiwal and across Punjab use the 3-4-5 rule every day: measure 3 units along one wall, 4 units along the adjacent wall — if the diagonal is exactly 5 units, the corner is perfectly 90°. Our calculator instantly scales these for any size project (multiply by 10 → 30-40-50, etc.).
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Determining "Squareness" in Real-World Projects
            </h3>
            <p className="text-gray-200 text-base">
              To check if a rectangular frame or room is square, measure both diagonals. They must be equal. If you know length and width, enter them as a and b — the calculator gives the exact diagonal length you should measure on site.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Troubleshooting Common Calculation Errors
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Why the Hypotenuse Must Always Be the Longest Side
            </h3>
            <p className="text-gray-200 text-base">
              In a right-angled triangle, the hypotenuse is always opposite the 90° angle and therefore longer than either leg. Mathematically: c = √(a² + b²) &gt; a and &gt; b. If your entered “hypotenuse” is shorter than a leg, the calculator shows a red error: “Hypotenuse must be the longest side”.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Solving the "Hypotenuse must be longer than Side B" Error
            </h3>
            <p className="text-gray-200 text-base">
              This error appears when you accidentally label a leg as the hypotenuse or enter numbers that violate the triangle inequality. Fix: swap the values so the longest side is in the hypotenuse field, or leave the longest field blank and let the calculator calculate it.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              What to do if your triangle doesn't have a 90-degree angle
            </h3>
            <p className="text-gray-200 text-base">
              Our tool is built exclusively for right-angled triangles. If a² + b² ≠ c² (within a tiny rounding tolerance), it will display “Not a valid right triangle”. In that case, you need the Law of Cosines calculator (available in our advanced geometry tools) or you must physically measure the angle to confirm it is exactly 90°.
            </p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Math Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your Pythagorean practice with these other free, fast calculators from our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <NoPrefetchLink
                href="/calculators/math/square-root-calculator"
                className="text-blue-400 hover:underline"
              >
                Square Root Calculator
              </NoPrefetchLink>{" "}
              — perfect for the √ steps in Pythagoras
            </li>
            
           
            <li>
              <NoPrefetchLink
                href="/calculators/math/percentage-calculator"
                className="text-blue-400 hover:underline"
              >
                Percentage Calculator
              </NoPrefetchLink>{" "}
              — useful when scaling construction measurements
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Master the Pythagorean theorem with our fast, accurate, completely free calculator — always ready for homework, exams, or your next construction project in Sahiwal or anywhere else. Bookmark it today and make geometry calculations effortless!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}