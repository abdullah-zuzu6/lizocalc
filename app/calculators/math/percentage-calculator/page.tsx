import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import PercentageCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Percentage Calculator",
  description:
    "Solve the percent equation for any missing value, compare two numbers with percentage difference, or work out a percent increase or decrease from any two of the three numbers.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "percentage difference calculator",
    "percentage change calculator",
    "percent increase calculator",
    "percent decrease calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/percentage-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Percentage Calculator",
    description:
      "Solve for any missing value in the percent equation, compare two numbers, or find a percent increase or decrease from any two of the three numbers involved.",
    url: "https://www.lizocalc.com/calculators/math/percentage-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percentage Calculator",
    description:
      "Solve for percent, base, or result, compare two numbers, or find a percent increase or decrease from any two known values.",
  },
};

const tocItems = [
  { id: "what-percent-means", label: "What A Percent Actually Is" },
  { id: "the-percent-equation", label: "The Percent Equation" },
  { id: "solving-for-unknowns", label: "Solving For Each Unknown" },
  { id: "difference-vs-change", label: "Percentage Difference vs. Percentage Change" },
  { id: "solving-change", label: "Solving Percentage Change For Any Unknown" },
  { id: "why-recovery-is-asymmetric", label: "Why A 50% Drop Needs A 100% Gain" },
  { id: "reference-table", label: "Quick-Reference Percent Table" },
  { id: "common-mistakes", label: "Common Mistakes With Percentages" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#person-abdullah",
      name: "Rana Muhammad Abdullah",
      url: "https://www.linkedin.com/in/abdullahsajjad06/",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/math/percentage-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Percentage Calculator", item: "https://www.lizocalc.com/calculators/math/percentage-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/percentage-calculator",
      url: "https://www.lizocalc.com/calculators/math/percentage-calculator",
      name: "Percentage Calculator",
      description:
        "Solve the percent equation for any missing value, compare two numbers with percentage difference, or find a percent increase or decrease from any two known values.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/percentage-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/percentage-calculator#app",
      name: "Percentage Calculator",
      url: "https://www.lizocalc.com/calculators/math/percentage-calculator",
      description:
        "Solves the percent equation for any of its three variables, compares two numbers with percentage difference, and solves percentage change for old value, new value, or percent.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Solve for percent, base number, or result",
        "Percentage difference between two numbers",
        "Percentage change — solve for old value, new value, or percent",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/percentage-calculator"],
      },
    },
  ],
};

/** Textbook-style stacked fraction: numerator over denominator, separated by a rule. */
function Frac({
  n,
  d,
  size = "text-sm",
}: {
  n: React.ReactNode;
  d: React.ReactNode;
  size?: string;
}) {
  return (
    <span className={`inline-flex flex-col items-center align-middle mx-1 leading-none ${size}`}>
      <span className="px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5 border-t border-current">{d}</span>
    </span>
  );
}

/** A single formula row, laid out left-to-right so fractions can sit inline. */
function FormulaLine({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center flex-wrap gap-1">{children}</div>;
}

/** Dark code-style box holding one or more FormulaLine rows, stacked vertically. */
function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm space-y-3">
      {children}
    </div>
  );
}

export default function PercentagePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-percentage-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Percentage calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Solve the percent equation for whichever value you're missing, compare two numbers, or
            find a percent increase or decrease from any two of the three numbers involved.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <PercentageCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Most percentage tools split "percent of a number," "what percent," and "percent
          increase/decrease" into separate boxes that all do the same underlying algebra. The tool
          above collapses the first three into one solver you point at whichever value is missing,
          and does the same for percentage change. Below, each formula is worked out by hand so you
          can see exactly where every number comes from.
        </p>

        <nav aria-label="Table of contents" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16">
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">Table Of Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base">
                  <span aria-hidden="true">-&gt;</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* WHAT A PERCENT IS */}
        <section id="what-percent-means" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What a percent actually is
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Percent means "per hundred." Saying 20% is just a shorthand for the fraction 20/100, or
            0.2. Every percentage problem, no matter how it's phrased, is really a statement about
            three numbers: a percent, a base number the percent applies to, and the result of applying
            it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you see those three numbers, every "percent of," "what percent," and "percent
            change" question turns out to be the same handful of algebra rearranged. That's the whole
            idea behind the equation solver above: instead of memorizing three separate formulas,
            you're solving one formula for three different unknowns.
          </p>
        </section>

        {/* THE PERCENT EQUATION */}
        <section id="the-percent-equation" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The percent equation
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Three letters cover every basic percentage question:
          </p>
          <ul className="text-gray-200 space-y-2 text-base mb-6 list-none">
            <li><strong className="text-blue-300">P</strong> is the percent</li>
            <li><strong className="text-blue-300">N</strong> is the base number the percent is taken of</li>
            <li><strong className="text-blue-300">R</strong> is the result</li>
          </ul>
          <FormulaBlock>
            <FormulaLine>
              <span>R = N ×</span>
              <Frac n="P" d="100" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            That single line answers "what is P% of N," and rearranged, it answers the other two
            common phrasings as well: "R is what percent of N" and "R is P% of what number."
          </p>
        </section>

        {/* SOLVING FOR EACH UNKNOWN */}
        <section id="solving-for-unknowns" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving for each unknown
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            1. Finding the result: what is P% of N?
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A store discounts a $150 jacket by 20%. How much is the discount worth?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>R = N ×</span>
              <Frac n="P" d="100" />
            </FormulaLine>
            <FormulaLine>
              <span>R = 150 ×</span>
              <Frac n="20" d="100" />
            </FormulaLine>
            <FormulaLine><span>R = 150 × 0.20</span></FormulaLine>
            <FormulaLine><span>R = $30</span></FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            2. Finding the percent: R is what % of N?
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A student answers 45 questions correctly out of 60. What percent is that?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>P =</span>
              <Frac n="R" d="N" />
              <span>× 100</span>
            </FormulaLine>
            <FormulaLine>
              <span>P =</span>
              <Frac n="45" d="60" />
              <span>× 100</span>
            </FormulaLine>
            <FormulaLine><span>P = 0.75 × 100</span></FormulaLine>
            <FormulaLine><span>P = 75%</span></FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            3. Finding the base: R is P% of what number?
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A tip of $12 came out to 15% of the bill. What was the total bill?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N =</span>
              <Frac n="R" d={<span>P / 100</span>} />
            </FormulaLine>
            <FormulaLine>
              <span>N =</span>
              <Frac n="12" d="0.15" />
            </FormulaLine>
            <FormulaLine><span>N = $80</span></FormulaLine>
          </FormulaBlock>
        </section>

        {/* DIFFERENCE VS CHANGE */}
        <section id="difference-vs-change" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Percentage difference vs. percentage change
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            These two get mixed up constantly, and the mix-up isn't really anyone's fault: both
            compare two numbers and both produce a percent. The difference is what the two numbers
            represent.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Percentage change compares an old value to a new one. It has a direction: a value went up
            or it went down, and the old value is always the reference point. Percentage difference
            compares two values that sit side by side with no before-and-after relationship, like two
            competing prices. Neither number is the "starting" one, so the formula uses their average
            as the reference instead, and the result is always positive.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>Percentage change =</span>
              <Frac n="new − old" d="old" />
              <span>× 100</span>
            </FormulaLine>
            <div className="h-1" />
            <FormulaLine>
              <span>Percentage difference =</span>
              <Frac n="|value 1 − value 2|" d="(value 1 + value 2) / 2" />
              <span>× 100</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Run the same two numbers through both formulas and you'll get two different, equally
            correct answers to two different questions. Going from $80 to $100 is a 25% change, since
            $80 is the reference. But treated as two prices with no order, $80 and $100 differ by
            about 22.2%, since the reference there is their average, $90.
          </p>
        </section>

        {/* SOLVING CHANGE */}
        <section id="solving-change" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving percentage change for any unknown
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            The change calculator above works forward or backward. Give it the old value and the
            percent, it finds the new value. Give it the new value and the percent, it finds the old
            value. Give it both values, it finds the percent and tells you whether that's an increase
            or a decrease.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            Finding the new value
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A $250 laptop goes on sale for 30% off. What's the sale price?
          </p>
          <FormulaBlock>
            <FormulaLine><span>new = old × (1 + signed percent / 100)</span></FormulaLine>
            <FormulaLine><span>new = 250 × (1 − 0.30)</span></FormulaLine>
            <FormulaLine><span>new = 250 × 0.70</span></FormulaLine>
            <FormulaLine><span>new = $175</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The percent is treated as negative for a decrease and positive for an increase, which is
            what the direction dropdown in the calculator is doing behind the scenes.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Finding the old value
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            After a 12% raise, a salary is $56,000. What was it before the raise?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>old =</span>
              <Frac n="new" d="1 + signed percent / 100" />
            </FormulaLine>
            <FormulaLine>
              <span>old =</span>
              <Frac n="56,000" d="1.12" />
            </FormulaLine>
            <FormulaLine><span>old = $50,000</span></FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Finding the percent
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A city's population went from 42,000 to 39,060. What's the percent change?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>change =</span>
              <Frac n="39,060 − 42,000" d="42,000" />
              <span>× 100</span>
            </FormulaLine>
            <FormulaLine>
              <span>change =</span>
              <Frac n="−2,940" d="42,000" />
              <span>× 100</span>
            </FormulaLine>
            <FormulaLine><span>change = −7%, a decrease</span></FormulaLine>
          </FormulaBlock>
        </section>

        {/* WHY RECOVERY IS ASYMMETRIC */}
        <section id="why-recovery-is-asymmetric" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why a 50% drop needs a 100% gain to undo it
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This trips people up constantly, and it's worth sitting with because it explains why
            percentage change isn't symmetric. Start with $100. Drop it 50% and you're at $50. To get
            back to $100 from $50, you don't need another 50%, that would only get you to $75. You
            need $50 to double, which is a 100% increase.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The reason is the reference point moves. The 50% drop was measured against $100. The
            recovery has to be measured against $50, a smaller base, so the same dollar amount is now
            a bigger percentage. This is exactly why investment losses are harder to recover from than
            they look: a 50% portfolio loss needs a 100% gain just to break even, not a matching 50%
            gain.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It's also why stacking two percentage changes doesn't simply add up. A 20% increase
            followed by a 20% decrease doesn't return to the starting number, because the second 20%
            is taken from a larger base than the first one was.
          </p>
        </section>

        {/* REFERENCE TABLE */}
        <section id="reference-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick-reference percent table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Starting from 100, here's what a range of percent changes actually land on, next to what
            percentage difference the same two numbers would report. The gap between the two columns
            grows as the change gets bigger, which is the asymmetry from the last section showing up
            in numbers.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">From → To</th>
                  <th className="p-4 text-left">Percentage change</th>
                  <th className="p-4 text-left">Percentage difference</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">100 → 110</td><td className="p-4">+10%</td><td className="p-4">9.52%</td></tr>
                <tr><td className="p-4">100 → 125</td><td className="p-4">+25%</td><td className="p-4">22.22%</td></tr>
                <tr><td className="p-4">100 → 150</td><td className="p-4">+50%</td><td className="p-4">40.00%</td></tr>
                <tr><td className="p-4">100 → 200</td><td className="p-4">+100%</td><td className="p-4">66.67%</td></tr>
                <tr><td className="p-4">100 → 90</td><td className="p-4">−10%</td><td className="p-4">10.53%</td></tr>
                <tr><td className="p-4">100 → 75</td><td className="p-4">−25%</td><td className="p-4">28.57%</td></tr>
                <tr><td className="p-4">100 → 50</td><td className="p-4">−50%</td><td className="p-4">66.67%</td></tr>
                <tr><td className="p-4">100 → 20</td><td className="p-4">−80%</td><td className="p-4">133.33%</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* COMMON MISTAKES */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common mistakes with percentages
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Using percentage difference when the question is really about change is the most frequent
            one. If there's a "before" and an "after," a start date and an end date, or an original
            price and a sale price, that's percentage change, not difference. Difference only applies
            when neither number is clearly the starting point.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Adding or subtracting percentages directly is another common slip. A shirt marked up 50%
            and then discounted 50% is not back to its original price, because the discount is taken
            from the marked-up price, not the original one. Work each step through the actual base
            number rather than combining the percentages first.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            And watch the sign when the old value in a percentage-change problem is negative or zero.
            A change from 0 has no defined percentage, since the formula divides by the old value, and
            a negative old value can flip the sign of the result in ways that don't match the plain-
            language "increase" or "decrease" you'd expect.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "Fraction Calculator", href: "/calculators/math/fraction-calculator" },
              { label: "Half-Life Calculator", href: "/calculators/math/half-life-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
              { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}