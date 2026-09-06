import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import FractionCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Fraction Calculator Online – Add, Subtract, Multiply, Divide",
  description:
    "Free online fraction calculator that adds, subtracts, multiplies, and divides fractions. See every step, the simplified answer, and the decimal equivalent instantly.",
  keywords: [
    "fraction calculator",
    "fraction calculator online",
    "add fractions calculator",
    "subtract fractions calculator",
    "multiply fractions calculator",
    "divide fractions calculator",
    "simplify fraction calculator",
    "fraction to decimal calculator",
    "mixed number calculator",
    "common denominator calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/fraction-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions",
    description:
      "Work out fraction addition, subtraction, multiplication, and division with full step-by-step working and a shareable result link.",
    url: "https://www.lizocalc.com/calculators/math/fraction-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fraction Calculator – Instant Fraction Math",
    description:
      "Add, subtract, multiply, and divide fractions online and see exactly how the answer was reached.",
  },
};

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
      "@id": "https://www.lizocalc.com/calculators/math/fraction-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Fraction Calculator", item: "https://www.lizocalc.com/calculators/math/fraction-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/fraction-calculator",
      url: "https://www.lizocalc.com/calculators/math/fraction-calculator",
      name: "Fraction Calculator – Add, Subtract, Multiply & Divide Fractions | LizoCalc",
      description:
        "Free online fraction calculator for addition, subtraction, multiplication, and division, with step-by-step working and decimal conversion.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-07",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/fraction-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/fraction-calculator#app",
      name: "Fraction Calculator",
      url: "https://www.lizocalc.com/calculators/math/fraction-calculator",
      description:
        "Free fraction calculator for addition, subtraction, multiplication, and division, with automatic simplification and decimal output.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Fraction Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Fraction addition",
        "Fraction subtraction",
        "Fraction multiplication",
        "Fraction division",
        "Automatic simplification to lowest terms",
        "Fraction to decimal conversion",
        "Step-by-step working for every calculation",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "how-to-use", label: "How to Use the Fraction Calculator" },
  { id: "what-is-a-fraction", label: "What Is a Fraction" },
  { id: "types-of-fractions", label: "Proper, Improper & Mixed Numbers" },
  { id: "fraction-addition", label: "Fraction Addition" },
  { id: "fraction-subtraction", label: "Fraction Subtraction" },
  { id: "fraction-multiplication", label: "Fraction Multiplication" },
  { id: "fraction-division", label: "Fraction Division" },
  { id: "simplifying-fractions", label: "Simplifying a Fraction" },
  { id: "fraction-to-decimal", label: "Fraction to Decimal" },
];

// Stacked numerator-over-denominator display for the article, so fractions
// read the way they do in a math book instead of a flat "a/b" string.
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1 text-base leading-none">
      <span className="px-1">{n}</span>
      <span className="w-full border-t border-current my-0.5" />
      <span className="px-1">{d}</span>
    </span>
  );
}

export default function FractionCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        id="structured-data-fraction-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Fraction Calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Add, subtract, multiply, and divide fractions, with the answer simplified and shown as a decimal too.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <Suspense fallback={<div className="text-center">Loading tool...</div>}>
          <FractionCalculator />
        </Suspense>
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A fraction calculator adds, subtracts, multiplies, and divides fractions, then reduces the answer
          to its lowest terms and converts it to a decimal. Type in two fractions, pick an operation, and
          you get the full working behind the answer, not just the final number.
        </p>

        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">Table Of Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base"
                >
                  <span aria-hidden="true">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* How to use */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Fraction Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Type the numerator and denominator for your first fraction, then do the same for the second
            one. Pick addition, subtraction, multiplication, or division from the dropdown in the middle.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Hit <strong>Calculate Result</strong> and the answer appears simplified, next to a decimal
            version. Below it, every step of the working is spelled out for the exact numbers you entered,
            not a generic formula.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you have a result, copy the <strong>share link</strong> and send it to anyone. It carries
            both fractions and the operation, so whoever opens it sees the same calculation you just ran.
            Reset clears the fields and takes the link out of the address bar.
          </p>
        </section>

        {/* What is a fraction */}
        <section id="what-is-a-fraction" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is a Fraction
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A fraction is a way of writing a part of a whole. It has two numbers stacked on top of each
            other: <Frac n="3" d="4" /> means three parts out of four equal parts.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The top number is the <strong>numerator</strong>. It counts how many parts you have. The bottom
            number is the <strong>denominator</strong>. It tells you how many equal parts the whole was
            split into. In <Frac n="3" d="4" />, the numerator is 3 and the denominator is 4.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Fractions with the same denominator are easy to compare and combine, since the parts are the
            same size. Fractions with different denominators need to be rewritten over a{" "}
            <strong>common denominator</strong> before you can add or subtract them, which is why that step
            shows up in both sections below.
          </p>
        </section>

        {/* Types of fractions */}
        <section id="types-of-fractions" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Proper Fractions, Improper Fractions, and Mixed Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A <strong>proper fraction</strong> has a numerator smaller than its denominator, like{" "}
            <Frac n="3" d="4" />. Its value is less than 1.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            An <strong>improper fraction</strong> has a numerator equal to or larger than its denominator,
            like <Frac n="11" d="4" />. Its value is 1 or more, even though it's still written as a single
            fraction.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A <strong>mixed number</strong> writes that same value as a whole number next to a proper
            fraction. <Frac n="11" d="4" />{" "}
            equals 2 whole units plus <Frac n="3" d="4" /> left over, written as 2 <Frac n="3" d="4" />. To
            convert back, multiply the whole number by the denominator and add the numerator: 2 × 4 + 3 = 11,
            so 2 <Frac n="3" d="4" /> becomes <Frac n="11" d="4" /> again.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator works with the improper-fraction form directly, so if you're starting from a
            mixed number, convert it to a single fraction first using the method above.
          </p>
        </section>

        {/* Addition */}
        <section id="fraction-addition" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Fraction Addition
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Fractions only add cleanly when the parts are the same size, which means the denominators have
            to match first. The fastest way to get there is to multiply the two denominators together and
            rewrite each fraction over that new <strong>common denominator</strong>.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Add <Frac n="3" d="8" /> and <Frac n="2" d="5" />.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>
              Multiply the denominators: 8 × 5 = 40. That's the common denominator.
            </li>
            <li>
              Rewrite each fraction over 40. For the first: 3 × 5 = 15, so <Frac n="3" d="8" /> becomes{" "}
              <Frac n="15" d="40" />. For the second: 2 × 8 = 16, so <Frac n="2" d="5" /> becomes{" "}
              <Frac n="16" d="40" />.
            </li>
            <li>Add the numerators and keep the denominator: 15 + 16 = 31.</li>
            <li>
              The answer is <Frac n="31" d="40" />. Since 31 and 40 share no common factor besides 1, it's
              already in its <strong>lowest terms</strong>. As a decimal, that's 0.775.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            The carry-the-denominator method above always works, even when it doesn't produce the smallest
            possible common denominator. If you'd rather find the least common multiple of the two
            denominators first, the{" "}
            <Link href="/calculators/math/lcm-calculator" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
              LCM calculator
            </Link>{" "}
            handles that step on its own.
          </p>
        </section>

        {/* Subtraction */}
        <section id="fraction-subtraction" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Fraction Subtraction
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Subtraction follows the same setup as addition. Get a common denominator, rewrite both
            fractions, then subtract the numerators instead of adding them.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Subtract <Frac n="2" d="3" /> from <Frac n="7" d="9" />.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>Multiply the denominators: 9 × 3 = 27.</li>
            <li>
              Convert each fraction: 7 × 3 = 21, so <Frac n="7" d="9" /> becomes <Frac n="21" d="27" />.
              And 2 × 9 = 18, so <Frac n="2" d="3" /> becomes <Frac n="18" d="27" />.
            </li>
            <li>Subtract the numerators: 21 − 18 = 3, giving <Frac n="3" d="27" />.</li>
            <li>
              The <strong>greatest common divisor</strong> of 3 and 27 is 3. Dividing both by 3 simplifies
              the answer to <Frac n="1" d="9" />, which is roughly 0.111 as a decimal.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            Watch the sign on step 3. Subtracting the numerators in the wrong order flips the result, which
            is the single most common mistake in fraction subtraction.
          </p>
        </section>

        {/* Multiplication */}
        <section id="fraction-multiplication" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Fraction Multiplication
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Multiplying fractions doesn't need a common denominator at all. Multiply the two{" "}
            <strong>numerators</strong> together, multiply the two <strong>denominators</strong> together,
            and simplify what's left.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Multiply <Frac n="5" d="6" /> by <Frac n="3" d="10" />.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>Multiply the numerators: 5 × 3 = 15.</li>
            <li>Multiply the denominators: 6 × 10 = 60.</li>
            <li>
              That gives <Frac n="15" d="60" />. The <strong>greatest common divisor</strong> of 15 and 60
              is 15, so dividing both by 15 simplifies it to <Frac n="1" d="4" />, or 0.25 as a decimal.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            Multiplying two proper fractions always gives an answer smaller than either one you started
            with, since you're taking a fraction of a fraction.
          </p>
        </section>

        {/* Division */}
        <section id="fraction-division" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Fraction Division
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Dividing by a fraction is the same as multiplying by its <strong>reciprocal</strong>. Keep the
            first fraction as it is, change the division sign to multiplication, and flip the second
            fraction upside down.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Divide <Frac n="4" d="5" /> by <Frac n="2" d="3" />.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>
              Flip the second fraction: <Frac n="2" d="3" /> becomes <Frac n="3" d="2" />.
            </li>
            <li>
              Multiply straight across: 4 × 3 = 12 for the numerator, and 5 × 2 = 10 for the denominator,
              giving <Frac n="12" d="10" />.
            </li>
            <li>
              The <strong>greatest common divisor</strong> of 12 and 10 is 2. Dividing both by 2 simplifies
              the answer to <Frac n="6" d="5" />, or 1.2 as a decimal.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            Notice the answer is bigger than 1, even though both starting fractions were less than 1.
            Dividing by a proper fraction always makes the result larger, the opposite of what happens with
            multiplication.
          </p>
        </section>

        {/* Simplifying */}
        <section id="simplifying-fractions" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Simplifying a Fraction
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A fraction is simplified, or reduced to its <strong>lowest terms</strong>, when its numerator
            and denominator share no common factor besides 1. To get there, find the{" "}
            <strong>greatest common divisor</strong>, or GCD, of both numbers and divide each one by it.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Simplify <Frac n="18" d="24" />.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>List the factors of 18: 1, 2, 3, 6, 9, 18. List the factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.</li>
            <li>The largest number that appears in both lists is 6, so the <strong>GCD</strong> is 6.</li>
            <li>
              Divide both numbers by 6: 18 ÷ 6 = 3 and 24 ÷ 6 = 4, giving <Frac n="3" d="4" />.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator runs that same GCD step automatically on every result, so the fraction you see
            is always in its lowest terms. Working the GCD out by hand is worth practicing on the{" "}
            <Link href="/calculators/math/gcf-calculator" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
              GCF calculator
            </Link>{" "}
            if you want to check your own arithmetic.
          </p>
        </section>

        {/* Decimal conversion */}
        <section id="fraction-to-decimal" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Fraction to Decimal
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Converting a fraction to a <strong>decimal</strong> only takes one step: divide the numerator
            by the denominator.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Convert <Frac n="7" d="8" /> to a decimal.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 mb-4">
            <li>Divide 7 by 8: 7 ÷ 8 = 0.875.</li>
            <li>That's the final answer. No further simplifying applies to a decimal.</li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base">
            Some fractions, like <Frac n="1" d="3" />, don't divide evenly and produce a repeating decimal:
            0.333... The calculator rounds these to 6 decimal places so the number stays readable without
            losing the precision most calculations need.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "LCM Calculator", href: "/calculators/math/lcm-calculator" },
              { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
              { label: "Binary Calculator", href: "/calculators/math/binary-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}