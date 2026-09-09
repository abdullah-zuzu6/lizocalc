import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import PermutationCombinationCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Permutation and Combination Calculator",
  description:
    "Calculate nPr and nCr instantly for any n and r, with and without repetition. See the factorial formula worked out step by step, plus a shareable result link.",
  keywords: [
    "permutation and combination calculator",
    "npr calculator",
    "ncr calculator",
    "combination calculator",
    "permutation calculator",
    "permutation with repetition calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
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
    title: "Permutation and Combination Calculator",
    description:
      "Calculate nPr and nCr for any n and r, with and without repetition. Step-by-step factorial working included.",
    url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Permutation and Combination Calculator",
    description:
      "Instantly calculate nPr and nCr, with and without repetition, and share the result with one link.",
  },
};

const tocItems = [
  { id: "what-they-count", label: "What Permutations And Combinations Count" },
  { id: "the-formulas", label: "The nPr And nCr Formulas" },
  { id: "worked-examples", label: "Worked Examples, Step By Step" },
  { id: "with-repetition", label: "When Items Can Repeat" },
  { id: "which-one-to-use", label: "Which One Do You Actually Need?" },
  { id: "useful-identities", label: "Identities Worth Knowing" },
  { id: "reference-table", label: "Reference Table For Small n And r" },
  { id: "common-mistakes", label: "Common Mistakes" },
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
      "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Permutation & Combination Calculator", item: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
      url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
      name: "Permutation and Combination Calculator",
      description:
        "Calculate nPr and nCr instantly for any n and r, with and without repetition, with a full factorial breakdown.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/permutation-combination-calculator#app",
      name: "Permutation and Combination Calculator",
      url: "https://www.lizocalc.com/calculators/math/permutation-combination-calculator",
      description:
        "Computes nPr and nCr using exact big-integer arithmetic, with and without repetition, and generates a shareable result link.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate permutations (nPr)",
        "Calculate combinations (nCr)",
        "Permutations and combinations with repetition",
        "Exact results for large n using big-integer math",
        "Shareable result link",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/permutation-combination-calculator"],
      },
    },
  ],
};

/** Textbook-style stacked fraction: numerator over denominator, separated by a rule. */
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1.5 leading-none text-sm">
      <span className="px-1 pb-1">{n}</span>
      <span className="px-1 pt-1 border-t-2 border-current">{d}</span>
    </span>
  );
}

/** A single formula row, laid out left-to-right so fractions sit inline. */
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

export default function PermutationCombinationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-permutation-combination-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Permutation and combination calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Enter a total (n) and a selection size (r) to get nPr and nCr instantly, with and
            without repetition, worked out with the same factorial formula shown below.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <PermutationCombinationCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          nPr and nCr solve the same counting question two different ways: how many ways can you
          pick r items from a set of n? The answer depends on one thing, whether the order you pick
          them in matters. Everything below walks through why that single question splits into two
          formulas, with the factorials worked out by hand.
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

        {/* WHAT THEY COUNT */}
        <section id="what-they-count" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What permutations and combinations count
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Take three letters, A, B, and C, and pick two of them. If you care about which one comes
            first, there are six possible outcomes: AB, BA, AC, CA, BC, CB. Each pair shows up twice,
            once for each order. That's a permutation count, written as ₃P₂.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Now stop caring about order. AB and BA are the same selection, just written differently,
            so they collapse into one outcome. The same happens to the other two pairs, leaving three
            distinct selections: AB, AC, BC. That's a combination count, written as ₃C₂.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Notice the relationship: 6 permutations divided by 3 combinations is exactly 2, which is
            2! (two factorial), the number of ways to order a pair. That's not a coincidence, and it's
            the entire reason the two formulas look so similar below.
          </p>
        </section>

        {/* THE FORMULAS */}
        <section id="the-formulas" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The nPr and nCr formulas
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Both formulas start from n factorial, the number of ways to arrange all n items in a row.
            Permutations trim that down to just the arrangements of the first r spots:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>ₙPᵣ =</span>
              <Frac n="n!" d="(n − r)!" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-4 text-base">
            Combinations go one step further and divide out the r! ways each selected group could
            itself be reordered, since order no longer counts:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>ₙCᵣ =</span>
              <Frac n="n!" d="r! × (n − r)!" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            n is the total pool of items. r is how many you're choosing. n! means multiply every
            whole number from n down to 1; by definition 0! equals 1, which is what keeps both
            formulas well behaved when r equals 0 or r equals n.
          </p>
        </section>

        {/* WORKED EXAMPLES */}
        <section id="worked-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked examples, step by step
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            Permutation: ranking 3 runners out of 8
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Eight runners race. How many different ways can first, second, and third place be
            awarded? Order matters here, first is not the same as third, so this is a permutation.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>₈P₃ =</span>
              <Frac n="8!" d="(8 − 3)!" />
              <span>=</span>
              <Frac n="8!" d="5!" />
            </FormulaLine>
            <FormulaLine>
              <span>= 8 × 7 × 6</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 336</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The 5! in the denominator cancels against the bottom five terms of 8!, which is why nPr
            can be computed quickly as n × (n−1) × (n−2) × … stopping after r terms, without ever
            multiplying out the full factorial.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Combination: choosing a 3-person committee from 8
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Same eight people, but now you're just forming a committee with no assigned roles. Order
            doesn't matter, so this is a combination.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>₈C₃ =</span>
              <Frac n="8!" d="3! × 5!" />
            </FormulaLine>
            <FormulaLine>
              <span>=</span>
              <Frac n="336" d="6" />
            </FormulaLine>
            <FormulaLine>
              <span>= 56</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            That 336 in the numerator is exactly the ₈P₃ answer from above, divided by 3! (which is
            6), the number of ways each 3-person group could have been ordered.
          </p>
        </section>

        {/* WITH REPETITION */}
        <section id="with-repetition" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When items can repeat
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Everything above assumes each item is used at most once, arranging or picking from a set
            without putting anything back. Some problems don't work that way. A 4-digit PIN can reuse
            digits, so 1-1-2-2 is a valid, distinct code.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Permutations with repetition are the simpler case: every one of the r positions has n
            independent choices, so the count is just n multiplied by itself r times.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>ₙPᵣ (with repetition) = n</span>
              <sup className="relative -top-2 text-[0.75em]">r</sup>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-2 mt-6 text-base">
            A 4-digit PIN using digits 0 through 9:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>10</span>
              <sup className="relative -top-2 text-[0.75em]">4</sup>
              <span>= 10,000 possible codes</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-4 mt-6 text-base">
            Combinations with repetition are less intuitive. Picking 3 scoops of ice cream from 5
            flavors, where you can repeat a flavor and order doesn't matter, uses a different formula
            entirely, sometimes called "stars and bars":
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>ₙCᵣ (with repetition) =</span>
              <Frac n="(n + r − 1)!" d="r! × (n − 1)!" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-2 mt-6 text-base">
            For 3 scoops from 5 flavors:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>=</span>
              <Frac n="(5 + 3 − 1)!" d="3! × (5 − 1)!" />
              <span>=</span>
              <Frac n="7!" d="3! × 4!" />
            </FormulaLine>
            <FormulaLine>
              <span>= 35 ways</span>
            </FormulaLine>
          </FormulaBlock>
        </section>

        {/* WHICH ONE */}
        <section id="which-one-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Which one do you actually need?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            One question settles it: if you swapped two of your chosen items, would that count as a
            different outcome? If yes, it's a permutation. If the result is the same regardless of
            order, it's a combination.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Assigning specific roles, like president, treasurer, and secretary, is a permutation,
            because swapping who holds which role changes the outcome. Picking a plain committee with
            no roles attached is a combination, because the committee is the same group regardless of
            the order you named its members in.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A common misconception is that a "combination lock" is a combination in this sense. It
            isn't. Entering 1-2-9 opens a different lock than 2-9-1, so despite the name, it's really a
            permutation.
          </p>
        </section>

        {/* IDENTITIES */}
        <section id="useful-identities" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Identities worth knowing
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A handful of relationships between nPr and nCr are worth memorizing, mostly because they
            let you sanity-check an answer without redoing the whole calculation.
          </p>
          <FormulaBlock>
            <FormulaLine><span>ₙPᵣ = ₙCᵣ × r!</span></FormulaLine>
            <FormulaLine><span>ₙCᵣ = ₙC₍ₙ₋ᵣ₎</span></FormulaLine>
            <FormulaLine><span>ₙCₙ = ₙC₀ = 1</span></FormulaLine>
            <FormulaLine><span>ₙC₁ = n</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The second one, ₙCᵣ = ₙC₍ₙ₋ᵣ₎, is a genuinely useful shortcut: choosing 3 people to include
            from a group of 10 gives the exact same count as choosing 7 people to leave out, since
            picking one side of the split automatically picks the other. If a combination result comes
            out larger than the matching permutation for the same n and r, something's been swapped,
            because nPr is always the larger of the two (or equal, when r is 0 or 1).
          </p>
        </section>

        {/* REFERENCE TABLE */}
        <section id="reference-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Reference table for small n and r
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Small cases are worth having memorized or at least recognizable, since they show up
            constantly in textbook problems and as sanity checks for larger calculations.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">n</th>
                  <th className="p-4 text-left">r</th>
                  <th className="p-4 text-left">nPr</th>
                  <th className="p-4 text-left">nCr</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">4</td><td className="p-4">2</td><td className="p-4">12</td><td className="p-4">6</td></tr>
                <tr><td className="p-4">5</td><td className="p-4">2</td><td className="p-4">20</td><td className="p-4">10</td></tr>
                <tr><td className="p-4">5</td><td className="p-4">3</td><td className="p-4">60</td><td className="p-4">10</td></tr>
                <tr><td className="p-4">6</td><td className="p-4">2</td><td className="p-4">30</td><td className="p-4">15</td></tr>
                <tr><td className="p-4">7</td><td className="p-4">3</td><td className="p-4">210</td><td className="p-4">35</td></tr>
                <tr><td className="p-4">8</td><td className="p-4">3</td><td className="p-4">336</td><td className="p-4">56</td></tr>
                <tr><td className="p-4">10</td><td className="p-4">3</td><td className="p-4">720</td><td className="p-4">120</td></tr>
                <tr><td className="p-4">52</td><td className="p-4">5</td><td className="p-4">311,875,200</td><td className="p-4">2,598,960</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            That last row is a standard poker hand: 5 cards dealt from a 52-card deck. 2,598,960 is
            the total number of distinct 5-card hands possible, a number that shows up constantly in
            probability courses.
          </p>
        </section>

        {/* COMMON MISTAKES */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common mistakes
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Reaching for combinations by default is the most common one. Committees, lottery numbers,
            and card hands are combinations, but plenty of everyday counting problems, seating charts,
            race results, PINs, passwords, are permutations, and mixing them up produces an answer off
            by a factor of r!.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Forgetting to check whether repetition is allowed is the second one. If the problem
            involves reusing digits, letters, or picks (a PIN, a die rolled multiple times, sampling
            with replacement), the plain nPr and nCr formulas from the top of this page don't apply;
            use the repetition versions instead.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            And watch for r greater than n in a no-repetition problem. You can't select more items
            than exist in the set without reusing one, so nPr and nCr are undefined there; that
            usually means repetition was intended, or one of the inputs was typed wrong.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
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