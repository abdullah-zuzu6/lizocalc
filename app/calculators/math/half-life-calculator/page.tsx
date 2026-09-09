import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";

import HalfLifeCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Half-Life Calculator",
  description:
    "Solve for remaining amount, initial amount, elapsed time, or half-life itself. Includes a decay constant and mean lifetime converter, a decay curve, and a step-by-step table.",
  keywords: [
    "half life calculator",
    "radioactive decay calculator",
    "decay constant calculator",
    "mean lifetime calculator",
    "exponential decay calculator",
    "carbon dating calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/half-life-calculator",
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
    title: "Half-Life Calculator",
    description:
      "Solve for any of the four half-life variables, convert between half-life, mean lifetime, and decay constant, and see the decay curve.",
    url: "https://www.lizocalc.com/calculators/math/half-life-calculator",
    siteName: "LizoCalc",
    images: [
      {
        url: "https://www.lizocalc.com/og-half-life-calculator.png",
        width: 1200,
        height: 630,
        alt: "LizoCalc Half-Life Calculator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Half-Life Calculator",
    description:
      "Solve for remaining amount, initial amount, elapsed time, or half-life, plus a decay constant converter and decay curve.",
    images: ["https://www.lizocalc.com/og-half-life-calculator.png"],
  },
};

const tocItems = [
  { id: "what-is-half-life", label: "What Half-Life Means" },
  { id: "half-life-formula", label: "The Half-Life Formula" },
  { id: "decay-constant-mean-lifetime", label: "Decay Constant & Mean Lifetime" },
  { id: "solving-for-unknowns", label: "Solving For Each Unknown" },
  { id: "reading-the-curve", label: "Reading The Decay Curve And Table" },
  { id: "common-half-lives", label: "Common Half-Lives, In Real Numbers" },
  { id: "where-its-used", label: "Where Half-Life Actually Gets Used" },
  { id: "units-and-mistakes", label: "Units, Precision & Common Mistakes" },
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
      "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Half-Life Calculator", item: "https://www.lizocalc.com/calculators/math/half-life-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator",
      url: "https://www.lizocalc.com/calculators/math/half-life-calculator",
      name: "Half-Life Calculator",
      description:
        "Solve for remaining amount, initial amount, elapsed time, or half-life. Convert between half-life, mean lifetime, and decay constant.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator#app",
      name: "Half-Life Calculator",
      url: "https://www.lizocalc.com/calculators/math/half-life-calculator",
      description:
        "Solves the exponential decay equation for any of its four variables and converts between half-life, mean lifetime, and decay constant.",
      applicationCategory: "ScienceApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Solve for remaining amount, initial amount, elapsed time, or half-life",
        "Convert between half-life, mean lifetime, and decay constant",
        "Decay curve chart",
        "Step-by-step decay table",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/half-life-calculator"],
      },
    },
  ],
};

/**
 * Textbook-style stacked fraction: numerator over denominator, separated by a rule.
 * Inherits the surrounding text color via `text-current`, so it works both inside
 * the dark formula boxes and inline within regular paragraph text.
 */
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

/** Raised exponent, sized down and lifted so it sits at the top-right of the base. */
function Exp({ children }: { children: React.ReactNode }) {
  return (
    <sup className="relative -top-2 text-[0.7em] ml-0.5 inline-flex items-center">
      {children}
    </sup>
  );
}

/** A single formula, laid out left-to-right so fractions and exponents can sit inline. */
function FormulaLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center flex-wrap gap-1">
      {children}
    </div>
  );
}

/** Dark code-style box that holds one or more FormulaLine rows, stacked vertically. */
function FormulaBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm space-y-3 ${className}`}
    >
      {children}
    </div>
  );
}

export default function HalfLifePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-half-life-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Half life calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Solve for the remaining amount, the starting amount, the elapsed time, or the half-life
            itself. Convert between half-life, mean lifetime, and decay constant, and see the decay
            curve for whatever you're working out.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <HalfLifeCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Most half-life tools only do one thing: plug in three numbers, get a fourth. This one does
          that too, but you can solve for any of the four variables in the decay equation, not just
          the remaining amount. Below, the math behind each case is worked out by hand so you can see
          exactly where the numbers come from.
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

        {/* WHAT IS HALF-LIFE */}
        <section id="what-is-half-life" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What half-life means
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Half-life is the time it takes for a quantity to drop to half of whatever it was. That's
            it. The term started in nuclear physics, describing how long it takes for half the atoms
            in a radioactive sample to decay, but the same math applies to anything that shrinks at a
            constant proportional rate: a drug clearing your bloodstream, carbon-14 fading out of a
            fossil, even a hot cup of coffee losing heat in a rough, simplified sense.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The key word is proportional. A half-life doesn't remove a fixed amount each cycle, it
            removes a fixed fraction. Start with 80 grams of iodine-131 and after one half-life (about
            8 days) you have 40 grams. After another 8 days, 20 grams. Not 0 grams after two cycles,
            because you're always losing half of what's currently there, not half of the original
            amount.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That's also why half-life decay never technically reaches zero. The curve keeps halving
            forever, getting closer to zero without touching it. In practice, after about 10 half-lives
            less than 0.1% of the original amount is left, which is usually treated as gone.
          </p>
        </section>

        {/* THE FORMULA */}
        <section id="half-life-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The half-life formula
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Every half-life problem, no matter the field, comes down to one equation:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N(t) = N₀ ·</span>
              <Frac n="1" d="2" />
              <Exp>
                <Frac n="t" d="t½" size="text-[0.85em]" />
              </Exp>
            </FormulaLine>
          </FormulaBlock>
          <ul className="text-gray-200 space-y-2 text-base mt-6 mb-6 list-none">
            <li><strong className="text-blue-300">N(t)</strong> is the amount left after time t</li>
            <li><strong className="text-blue-300">N₀</strong> is the starting amount, at t = 0</li>
            <li><strong className="text-blue-300">t</strong> is how much time has passed</li>
            <li><strong className="text-blue-300">t½</strong> is the half-life, the time for one halving</li>
          </ul>
          <p className="text-gray-200 leading-relaxed mb-4 text-base flex items-center flex-wrap gap-1">
            <span>The ratio</span>
            <Frac n="t" d="t½" />
            <span>
              counts how many half-lives have gone by. It doesn't need to be a whole number. After 1.5
              half-lives, for example, the amount remaining is
            </span>
            <Frac n="1" d="2" />
            <Exp>1.5</Exp>
            <span>, roughly 35.4% of the start.</span>
          </p>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            You'll also see the same equation written with base e instead of base one-half. It's the same
            curve, just described through the decay constant λ instead of the half-life directly:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N(t) = N₀ · e</span>
              <Exp>−λt</Exp>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            Both forms give identical results. Chemists and physicists tend to use the λ version because
            it plugs directly into other decay math; everyone else usually finds the halving version
            easier to reason about.
          </p>
        </section>

        {/* DECAY CONSTANT & MEAN LIFETIME */}
        <section id="decay-constant-mean-lifetime" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Decay constant and mean lifetime
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Half-life has two close relatives that show up constantly in the same formulas: the decay
            constant (λ) and the mean lifetime (τ). All three describe the same decay process, just
            from different angles.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The decay constant is the fraction of the remaining quantity that decays per unit of time.
            A larger λ means faster decay, a shorter half-life. The mean lifetime is the average time a
            single atom (or molecule, or particle) survives before decaying, which is always a bit
            longer than the half-life because a few stragglers survive far past the halfway point and
            pull the average up.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>λ =</span>
              <Frac n="ln(2)" d="t½" />
              <span>≈</span>
              <Frac n="0.6931" d="t½" />
            </FormulaLine>
            <FormulaLine>
              <span>τ =</span>
              <Frac n="1" d="λ" />
              <span>=</span>
              <Frac n="t½" d="ln(2)" />
              <span>≈ 1.4427 × t½</span>
            </FormulaLine>
          </FormulaBlock>
          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            Worked example: iodine-131
          </h3>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Iodine-131, used in thyroid treatment, has a half-life of 8.02 days.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>λ =</span>
              <Frac n="ln(2)" d="8.02" />
            </FormulaLine>
            <FormulaLine>
              <span>=</span>
              <Frac n="0.6931" d="8.02" />
            </FormulaLine>
            <FormulaLine>
              <span>= 0.0864 per day</span>
            </FormulaLine>
            <div className="h-1" />
            <FormulaLine>
              <span>τ =</span>
              <Frac n="1" d="0.0864" />
            </FormulaLine>
            <FormulaLine>
              <span>= 11.57 days</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            So roughly 8.64% of whatever iodine-131 is present decays every single day, and a given atom
            survives 11.57 days on average before it does.
          </p>
        </section>

        {/* SOLVING FOR EACH UNKNOWN */}
        <section id="solving-for-unknowns" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving for each unknown
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            The formula has four variables. Give the calculator any three and it rearranges the
            equation to find the fourth. Here's how each case works out algebraically, with a full
            example for each.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            1. Solving for the remaining amount
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            This is the direct case: plug N₀, t, and t½ straight into the formula.
          </p>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A hospital starts with 80 mg of a radiotracer with a 6-hour half-life. How much is left
            after 18 hours?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N(t) = N₀ ·</span>
              <Frac n="1" d="2" />
              <Exp>
                <Frac n="t" d="t½" size="text-[0.85em]" />
              </Exp>
            </FormulaLine>
            <FormulaLine>
              <span>N(18) = 80 ·</span>
              <Frac n="1" d="2" />
              <Exp>
                <Frac n="18" d="6" size="text-[0.85em]" />
              </Exp>
            </FormulaLine>
            <FormulaLine>
              <span>= 80 ·</span>
              <Frac n="1" d="2" />
              <Exp>3</Exp>
            </FormulaLine>
            <FormulaLine>
              <span>= 80 · 0.125</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 10 mg</span>
            </FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            2. Solving for the initial amount
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Flip the formula around: divide N(t) by one-half raised to t over t½, which is the same as
            multiplying by 2 raised to that same power.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N₀ =</span>
              <Frac n="N(t)" d={<span>(1/2)<Exp>t/t½</Exp></span>} />
              <span>= N(t) · 2</span>
              <Exp>
                <Frac n="t" d="t½" size="text-[0.85em]" />
              </Exp>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A soil sample has 12 g of a substance left after 3 half-lives have passed. How much was
            there at the start?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N₀ = N(t) · 2</span>
              <Exp>
                <Frac n="t" d="t½" size="text-[0.85em]" />
              </Exp>
            </FormulaLine>
            <FormulaLine>
              <span>= 12 · 2</span>
              <Exp>3</Exp>
            </FormulaLine>
            <FormulaLine>
              <span>= 12 · 8</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 96 g</span>
            </FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            3. Solving for elapsed time
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base flex items-center flex-wrap gap-1">
            <span>
              Here you need logarithms. Starting from N(t) = N₀ times one-half raised to t over t½,
              divide both sides by N₀, take the natural log, and isolate t.
            </span>
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>t = t½ ·</span>
              <Frac n="ln(N₀ / N(t))" d="ln(2)" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A 200 mg dose of a drug with a 4-hour half-life has fallen to 25 mg. How long has it been?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>t = 4 ·</span>
              <Frac n={<span>ln(<Frac n="200" d="25" size="text-[0.85em]" />)</span>} d="ln(2)" />
            </FormulaLine>
            <FormulaLine>
              <span>= 4 ·</span>
              <Frac n="ln(8)" d="0.6931" />
            </FormulaLine>
            <FormulaLine>
              <span>= 4 ·</span>
              <Frac n="2.0794" d="0.6931" />
            </FormulaLine>
            <FormulaLine>
              <span>= 4 · 3.0000</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 12 hours</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            That checks out cleanly: 200 → 100 → 50 → 25 is exactly 3 halvings, and 3 × 4 hours is 12
            hours.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            4. Solving for the half-life itself
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Same logarithm approach, just isolating t½ instead of t.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>t½ = t ·</span>
              <Frac n="ln(2)" d="ln(N₀ / N(t))" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            A lab measures 500 becquerels of activity in a fresh sample, and 62.5 becquerels 45 minutes
            later. What's the half-life of whatever's in the sample?
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>t½ = 45 ·</span>
              <Frac
                n="0.6931"
                d={<span>ln(<Frac n="500" d="62.5" size="text-[0.85em]" />)</span>}
              />
            </FormulaLine>
            <FormulaLine>
              <span>= 45 ·</span>
              <Frac n="0.6931" d="ln(8)" />
            </FormulaLine>
            <FormulaLine>
              <span>= 45 ·</span>
              <Frac n="0.6931" d="2.0794" />
            </FormulaLine>
            <FormulaLine>
              <span>=</span>
              <Frac n="31.19" d="2.0794" />
            </FormulaLine>
            <FormulaLine>
              <span>= 15 minutes</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            500 to 62.5 is three halvings (500 → 250 → 125 → 62.5) in 45 minutes, so 15 minutes per
            halving lines up.
          </p>
        </section>

        {/* READING THE CURVE */}
        <section id="reading-the-curve" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Reading the decay curve and table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Once the calculator solves your inputs, it plots the curve and lays out a table below it.
            Both come from the same underlying numbers, just presented two ways.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The curve always has the same shape: it drops fast at first, then levels off. That's the
            proportional-loss property from earlier showing up visually. The steepest part of the curve
            is right at the start, when the quantity is largest, so the largest raw amount decays in the
            earliest stretch even though the fraction lost per half-life never changes.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The dot on the chart marks whatever point you solved for. The table underneath breaks the
            same curve into even steps, so you can read off intermediate values without eyeballing the
            graph.
          </p>
        </section>

        {/* COMMON HALF-LIVES */}
        <section id="common-half-lives" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common half-lives, in real numbers
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Numbers help more than definitions here. This table covers isotopes and a few commonly
            cited drug half-lives, spanning from under a second to billions of years. Drug half-lives
            vary by person, dose, and metabolism, so treat those as rough averages, not medical
            guidance.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Substance</th>
                  <th className="p-4 text-left">Field</th>
                  <th className="p-4 text-left">Half-life</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">Polonium-214</td><td className="p-4">Nuclear physics</td><td className="p-4">164 microseconds</td></tr>
                <tr><td className="p-4">Iodine-131</td><td className="p-4">Nuclear medicine</td><td className="p-4">8.02 days</td></tr>
                <tr><td className="p-4">Cobalt-60</td><td className="p-4">Industrial / medical</td><td className="p-4">5.27 years</td></tr>
                <tr><td className="p-4">Cesium-137</td><td className="p-4">Nuclear waste</td><td className="p-4">30.17 years</td></tr>
                <tr><td className="p-4">Carbon-14</td><td className="p-4">Archaeology</td><td className="p-4">5,730 years</td></tr>
                <tr><td className="p-4">Plutonium-239</td><td className="p-4">Nuclear fuel / weapons</td><td className="p-4">24,100 years</td></tr>
                <tr><td className="p-4">Uranium-238</td><td className="p-4">Geology / dating</td><td className="p-4">4.47 billion years</td></tr>
                <tr><td className="p-4">Ibuprofen</td><td className="p-4">Pharmacology (approx.)</td><td className="p-4">~2 hours</td></tr>
                <tr><td className="p-4">Caffeine</td><td className="p-4">Pharmacology (approx.)</td><td className="p-4">~5 hours</td></tr>
                <tr><td className="p-4">Melatonin</td><td className="p-4">Pharmacology (approx.)</td><td className="p-4">~45 minutes</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* WHERE IT'S USED */}
        <section id="where-its-used" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where half-life actually gets used
          </h2>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Nuclear medicine and safety</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Hospitals pick radiotracers partly by half-life. Something that decays away in hours, like
            technetium-99m (6 hours), clears the patient's body fast after imaging. Waste storage
            planning goes the opposite direction: cesium-137's 30-year half-life is why spent fuel needs
            to sit in secure storage for decades, not days.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Pharmacology and dosing</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A drug's half-life sets how often it needs to be taken to keep a steady level in the blood.
            Short half-life drugs need more frequent doses; long half-life drugs stay active (and can
            build up) over several days. This is also why doctors ask about the timing of the last dose
            before certain procedures.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Radiocarbon dating</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Living organisms keep a roughly constant ratio of carbon-14 to carbon-12 while alive. Once
            they die, the carbon-14 decays on its 5,730-year clock with nothing replacing it. Measuring
            how much is left tells you roughly how long ago something died, which is how the technique
            dates organic material up to about 50,000 years old before the remaining carbon-14 gets too
            faint to measure reliably.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Geology</h3>
          <p className="text-gray-200 leading-relaxed text-base">
            For rocks and minerals older than carbon dating can reach, geologists use isotopes with much
            longer half-lives, like uranium-238 decaying into lead over billions of years, to date the
            formation of rock samples.
          </p>
        </section>

        {/* UNITS & MISTAKES */}
        <section id="units-and-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Units, precision, and common mistakes
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base flex items-center flex-wrap gap-1">
            <span>The half-life formula only cares about the ratio</span>
            <Frac n="t" d="t½" />
            <span>
              , so any time unit works as long as t and t½ are in the same one. Mixing a half-life given
              in days with an elapsed time given in hours is the single most common source of wrong
              answers. Convert first, then calculate.
            </span>
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            When solving for elapsed time or half-life, the remaining amount has to be smaller than the
            starting amount and greater than zero. If N(t) equals N₀, no time has passed and the
            half-life can't be worked out from that pair alone. If N(t) is larger than N₀, the numbers
            describe growth, not decay, and this calculator won't produce a real answer for it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Rounding matters more than it looks like it should, especially with the logarithm cases.
            Carrying an extra decimal place or two through ln(2) and the ratio calculation keeps small
            errors from compounding into a noticeably wrong half-life or elapsed time.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math & Science Calculators"
            links={[
              { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}