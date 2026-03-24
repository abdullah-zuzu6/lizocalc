import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const PercentageCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});
const faqData = [
  {
    question: "What is the simplest formula to calculate a percentage of a number?",
    answer:
      "The easiest way to find a percentage is to multiply the total number by the percentage and then divide by 100. For example, to find 15% of 200: (15 × 200) / 100 = 3000 / 100 = 30. This formula is the foundation for calculating discounts, taxes, and tips.",
  },
  {
    question: "How do I calculate a percentage increase between two values?",
    answer:
      "To find the percentage increase, subtract the old value from the new value, divide that result by the old value, and multiply by 100. Formula: ((New - Old) / Old) * 100. For instance, if a price goes from $80 to $100, the increase is ((100 - 80) / 80) * 100 = 25%.",
  },
  {
    question: "What is the difference between percentage change and percentage difference?",
    answer:
      "Percentage change is used when comparing the same item over time (Old vs. New), while percentage difference is used to compare two different items of the same kind. Difference uses the average of the two numbers as the denominator: (|V1 - V2| / ((V1 + V2) / 2)) * 100.",
  },
  {
    question: "How do I calculate what percentage one number is of another?",
    answer:
      "To find the percentage ratio, divide the 'part' by the 'whole' and multiply by 100. If you want to know what percent 20 is of 50, the calculation is (20 / 50) * 100 = 40%. This is highly useful for grading, market share analysis, and budget tracking.",
  },
  {
    question: "Can you explain how to calculate a 20% tip without a calculator?",
    answer:
      "Yes! A quick mental trick is to find 10% first by moving the decimal one place to the left, then double that amount. For a $64.00 bill, 10% is $6.40. Doubling $6.40 gives you $12.80, which is exactly 20%. Our online tool does this instantly for any specific percentage.",
  },
  {
    question: "How do I convert a fraction into a percentage percentage?",
    answer:
      "To convert any fraction to a percentage, divide the numerator (top) by the denominator (bottom) to get a decimal, then multiply by 100. For example, 3/4 becomes 0.75, and 0.75 * 100 = 75%. This is the same logic our calculator uses to simplify complex ratios for you.",
  },
];
export const metadata: Metadata = {
  title: "Percentage Calculator: Fast % Increase & Difference Solver",
  description:
    "Free online percentage calculator. Instantly find the percentage of a number, calculate percentage change, difference, and phrases with step-by-step steps.",
  
  keywords: [
    "percentage calculator",
    "calculate percentage increase",
    "percentage difference calculator",
    "percent off calculator",
    "find percentage of a number",
    "percentage change formula",
    "online math percentage tool",
    "calculate tip percentage",
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
      "Easily calculate percentages for math, business, and daily tasks with our all-in-one percentage tool.",
    url: "https://lizocalc.com/calculators/math/percentage-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator | Fast % Change & Difference",
    description:
      "Instantly calculate percentage increase, decrease, and differences with our free, easy-to-use math tool.",
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
                    name: "Math ",
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
          
            <h1 className="text-3xl md:text-4xl font-bold">
               Percentage Calculator: Fast & Accurate Percent Solutions           
                </h1>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <PercentageCalculator />
      </section>

    <article className="max-w-6xl mx-auto px-6 py-16 prose prose-blue prose-lg lg:prose-xl">

  <p>
    Percentages are a crucial part of everyday life, used in finance, shopping, academics, and personal budgeting. From calculating discounts to determining interest rates or splitting bills, understanding percentages simplifies decision-making. Our <strong>Percentage Calculator</strong> is designed to help you perform all percentage calculations instantly and accurately, saving time and avoiding errors. Whether you are a student, professional, or managing household finances, this tool is an essential resource.
  </p>

  {/* H2: Core Features & Calculation Modes */}
  <section className="mt-16">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">
      Core Features & Calculation Modes
    </h2>

    <p>
      Our online <strong>percentage calculator</strong> provides multiple calculation modes to meet all your needs. It is fast, reliable, and suitable for both simple and advanced percentage problems.
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3">
      <li>
        <strong>Calculate Percentage of a Number Instantly:</strong> Quickly determine what $X$% of a given number $Y$.
      </li>
      <li>
        <strong>Find Percentage Phrases and Ratios:</strong> Solve problems like "$X$ is what percent of $Y$?" with ease.
      </li>
      <li>
        <strong>Percentage Difference Between Two Values:</strong> Compare two values and see their relative difference in percent.
      </li>
      <li>
        <strong>Percentage Increase and Decrease:</strong> Determine how much a value has increased or decreased in percentage terms.
      </li>
      <li>
        <strong>Integration with Other Math Tools:</strong> If your calculation involves fractions, decimals, or advanced math, try our{" "}
        <NoPrefetchLink
          href="/calculators/math/fraction-calculator"
          className="text-blue-400 hover:underline font-semibold"
        >
          Fraction Calculator
        </NoPrefetchLink>{" "}
        or{" "}
        <NoPrefetchLink
          href="/calculators/math/scientific-calculator"
          className="text-blue-400 hover:underline font-semibold"
        >
          Scientific Calculator
        </NoPrefetchLink>
        .
      </li>
    </ul>
  </section>

  {/* H2: Deep-Dive Subsections & Search Intent */}
  <section className="mt-16">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">
      Deep-Dive Subsections & Real-Life Applications
    </h2>

    <p>
      Percentages are not only academic—they appear in almost every area of life. Below are the most common types of percentage calculations, formulas, and real-world examples.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      What is $X$ percent of $Y$? (Basic Percentage Calculation)
    </h3>
    <p>
      The basic percentage calculation determines a part of a number. Use the formula:
    </p>
    <div className="bg-gray-900 p-5 rounded-lg text-green-300 font-mono mb-4">
      (X / 100) × Y
    </div>
    <p>
      Example: 20% of 150 = (20 / 100) × 150 = 30. You can quickly calculate this using our <strong>Percentage Calculator</strong>.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      $X$ is what percent of $Y$? (Finding the Percentage Ratio)
    </h3>
    <p>
      To find what percent one number is of another:
    </p>
    <div className="bg-gray-900 p-5 rounded-lg text-green-300 font-mono mb-4">
      (X / Y) × 100
    </div>
    <p>
      Example: 45 out of 60 = (45 / 60) × 100 = 75%. This is useful for grades, survey results, or financial analysis.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      Percentage Difference Between Two Values
    </h3>
    <p>
      Shows how much two numbers differ relative to their average. Formula:
    </p>
    <div className="bg-gray-900 p-5 rounded-lg text-green-300 font-mono mb-4">
      ((Value2 − Value1) / ((Value1 + Value2) / 2)) × 100
    </div>
    <p>
      Example: 50 vs 70 → ((70 − 50) / ((50 + 70) / 2)) × 100 = 33.33%. This is commonly used in finance, sales, and data analysis.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      Calculating Percentage Change: Old vs. New Values
    </h3>
    <p>
      Percentage change tracks increases or decreases over time. Formula:
    </p>
    <div className="bg-gray-900 p-5 rounded-lg text-green-300 font-mono mb-4">
      ((New − Old) / Old) × 100
    </div>
    <p>
      Example: Price rises from $80 to $100 → ((100 − 80) / 80) × 100 = 25%. Percentage increase or decrease is vital in budgeting and financial planning.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      Using Percentages in Real Life: Discounts and Tips
    </h3>
    <p>
      Percentages are everywhere: sales discounts, taxes, and restaurant tips. For example, a 15% discount on a $200 item = $30 off. You can calculate tips using our <NoPrefetchLink
          href="/calculators/math/percentage-calculator"
          className="text-blue-400 hover:underline font-semibold"
        >
          Percentage Calculator
        </NoPrefetchLink> instantly.
    </p>

    <h3 className="text-2xl font-semibold text-blue-400 mt-8">
      Comparison Table: Common Percentage Calculations
    </h3>
    <div className="overflow-x-auto mt-4 rounded-lg shadow-sm">
  <table className="table-auto w-full min-w-[600px] text-left text-gray-200 bg-gray-800 rounded-lg">
    <thead>
      <tr>
        <th className="px-4 py-2 border-b border-gray-700">Calculation Type</th>
        <th className="px-4 py-2 border-b border-gray-700">Formula</th>
        <th className="px-4 py-2 border-b border-gray-700">Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="px-4 py-2 border-b border-gray-700">Percentage of a Number</td>
        <td className="px-4 py-2 border-b border-gray-700">(X / 100) × Y</td>
        <td className="px-4 py-2 border-b border-gray-700">20% of 150 = 30</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border-b border-gray-700">Percentage Ratio</td>
        <td className="px-4 py-2 border-b border-gray-700">(X / Y) × 100</td>
        <td className="px-4 py-2 border-b border-gray-700">45 of 60 = 75%</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border-b border-gray-700">Percentage Difference</td>
        <td className="px-4 py-2 border-b border-gray-700">((V2 − V1) / ((V1+V2)/2)) ×100</td>
        <td className="px-4 py-2 border-b border-gray-700">50 vs 70 = 33.33%</td>
      </tr>
      <tr>
        <td className="px-4 py-2 border-b border-gray-700">Percentage Change</td>
        <td className="px-4 py-2 border-b border-gray-700">((New − Old)/Old) × 100</td>
        <td className="px-4 py-2 border-b border-gray-700">80 → 100 = 25%</td>
      </tr>
    </tbody>
  </table>
</div>
  </section>

  {/* H4: FAQ & Semantic Queries */}
  <section className="mt-16">
    <h2 className="text-3xl font-bold text-blue-500 mb-6">FAQ & Semantic Queries</h2>

    <div className="space-y-6">
      <div>
        <h4 className="text-2xl text-blue-400 font-semibold">
          How do I calculate a 20% tip quickly?
        </h4>
        <p>
          Multiply the total bill by 0.20. Example: $50 × 0.20 = $10 tip.
        </p>
      </div>

      <div>
        <h4 className="text-2xl text-blue-400 font-semibold">
          What is the formula for percentage increase?
        </h4>
        <p>
          ((New Value − Old Value) / Old Value) × 100. Useful for tracking price changes, salaries, or growth rates.
        </p>
      </div>

      <div>
        <h4 className="text-2xl text-blue-400 font-semibold">
          Can percentage difference be negative?
        </h4>
        <p>
          No. Percentage difference is always positive. Only percentage change can be negative for decreases.
        </p>
      </div>

      <div>
        <h4 className="text-2xl text-blue-400 font-semibold">
          How to convert a fraction to a percentage?
        </h4>
        <p>
          Multiply the fraction by 100. Example: 3/4 × 100 = 75%.
        </p>
      </div>
    </div>
  </section>

  {/* INTERNAL LINKS */}
 

</article>
      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
