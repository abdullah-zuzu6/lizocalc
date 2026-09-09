import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";

import ZScoreCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Z-Score Calculator | Calculate Percentile & Probability",
  description:
    "Calculate a z-score from a raw score, mean, and standard deviation, see the matching percentile and cumulative probability, and share the result with a link.",
  keywords: [
    "z-score calculator",
    "standard score calculator",
    "z-score to percentile",
    "normal distribution calculator",
    "z table calculator online",
    "empirical rule calculator",
    "z score vs t score",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/z-score-calculator",
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
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Turn a raw score into a z-score, a percentile, and a cumulative probability, with the normal-distribution math worked out step by step.",
    url: "https://www.lizocalc.com/calculators/math/z-score-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Standardize a raw score against a mean and standard deviation, then share the result with one link.",
  },
};

const tocItems = [
  { id: "what-is-a-z-score", label: "What A Z-Score Actually Measures" },
  { id: "the-formula", label: "The Z-Score Formula" },
  { id: "worked-examples", label: "Worked Examples, Step By Step" },
  { id: "z-to-percentile", label: "From Z-Score To Percentile" },
  { id: "reading-the-sign", label: "Reading The Sign: Above, Below, Equal" },
  { id: "outliers-and-empirical-rule", label: "Outliers And The Empirical Rule" },
  { id: "z-vs-t", label: "Z-Score Or T-Score?" },
  { id: "reference-table", label: "Reference Table For Common Z-Values" },
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
      "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Statistics", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Z-Score Calculator", item: "https://www.lizocalc.com/calculators/math/z-score-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator",
      url: "https://www.lizocalc.com/calculators/math/z-score-calculator",
      name: "Z-Score Calculator",
      description:
        "Calculate a z-score from a raw score, mean, and standard deviation, and see the matching percentile and cumulative probability.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator#app",
      name: "Z-Score Calculator",
      url: "https://www.lizocalc.com/calculators/math/z-score-calculator",
      description:
        "Computes a z-score from a raw score, population mean, and standard deviation, along with its percentile rank and cumulative probability.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate z-score from a raw score, mean, and standard deviation",
        "Convert a z-score to a percentile rank",
        "Report the cumulative probability under the normal curve",
        "Shareable result link",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/z-score-calculator"],
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

export default function ZScorePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-z-score-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Z-score calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Enter a raw score, a mean, and a standard deviation to get the z-score, its
            percentile rank, and the cumulative probability under the normal curve. Once it's
            solved, copy a link to the result instead of re-typing the same three numbers.
          </p>
          <ShareBar/>
        </div>
      </section>

      <section className="px-4 py-8">
        <ZScoreCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A z-score answers one question: how many standard deviations away from the mean is
          this value? Everything else on this page, the percentile, the probability, the
          outlier rules, all follows from that single number. The formula and the normal-curve
          math behind it are worked out below with real numbers, not just stated.
        </p>

        <nav aria-label="Table of contents" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16">
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

        {/* WHAT IS A Z-SCORE */}
        <section id="what-is-a-z-score" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What a z-score actually measures
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A raw score on its own doesn't say much. Scoring 85 on a test sounds fine, but
            whether it's actually good depends entirely on how everyone else did. A z-score
            strips that ambiguity out by converting the raw score into a single, comparable
            unit: standard deviations from the mean.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A z-score of 0 means the value is exactly average. A z-score of 1 means it sits one
            standard deviation above the mean, 2 means two above, and so on; negative values work
            the same way below the mean. Because the unit is always "standard deviations," a
            z-score from a test score and a z-score from someone's height can be compared
            directly, even though the raw numbers aren't measuring the same thing at all.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator standardizes against a population mean (μ) and population standard
            deviation (σ), the two parameters that describe the whole group a value is being
            compared against.
          </p>
        </section>

        {/* THE FORMULA */}
        <section id="the-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The z-score formula
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Subtract the mean from the raw score, then divide by the standard deviation. That's
            the entire calculation.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>z =</span>
              <Frac n="x − μ" d="σ" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            x is the raw score, μ (mu) is the population mean, σ (sigma) is the population
            standard deviation. The subtraction on top tells you the raw distance from average;
            dividing by σ rescales that distance into standard-deviation units, which is what
            makes z-scores comparable across completely different datasets.
          </p>
        </section>

        {/* WORKED EXAMPLES */}
        <section id="worked-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked examples, step by step
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mt-8 mb-3">
            A score above the mean
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            A test has a mean of 70 and a standard deviation of 10. Someone scores 85.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>z =</span>
              <Frac n="85 − 70" d="10" />
              <span>=</span>
              <Frac n="15" d="10" />
              <span>= 1.5</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            A z-score of 1.5 means that score sits one and a half standard deviations above
            average. Run it through the calculator above and the percentile comes out to 93.32%,
            meaning the score beat roughly 93 out of every 100 people in that population.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">
            A score below the mean
          </h3>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Same test, same mean and standard deviation, but this time someone scores 60.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>z =</span>
              <Frac n="60 − 70" d="10" />
              <span>=</span>
              <Frac n="−10" d="10" />
              <span>= −1.0</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The negative sign just means below average, not a mistake in the arithmetic. A
            z-score of −1.0 lands at the 15.87th percentile: about 16 out of 100 people scored at
            or below that mark.
          </p>
        </section>

        {/* Z TO PERCENTILE */}
        <section id="z-to-percentile" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            From z-score to percentile
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The z-score alone tells you the distance from the mean. To find out what share of a
            population falls below that point, you need the cumulative distribution function
            (CDF) of the standard normal curve, the running total of area under the bell curve
            from the far left up to z.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>CDF(z) = ½ [ 1 + erf(</span>
              <Frac n="z" d="√2" />
              <span>) ]</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-4 text-base">
            erf is the error function, a standard piece of mathematics that doesn't have a
            simple closed-form shortcut, so this calculator evaluates it with a numerical
            approximation accurate to about five decimal places, the same approach used by most
            statistical software for everyday work.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The percentile the calculator shows is CDF(z) turned into a percentage. The
            "Cumulative Probability" field is that same CDF(z) value, just written as a decimal
            instead of a percent, so for any single result those two fields will always match
            once you move the percent sign. That's worth knowing, because it's easy to assume
            "probability" here means something like a two-tailed significance test p-value; it
            doesn't. It's the one-directional area to the left of z, nothing more.
          </p>
        </section>

        {/* READING THE SIGN */}
        <section id="reading-the-sign" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Reading the sign: above, below, equal
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The sign of z is a direct readout of position relative to the mean, and this
            calculator labels it plainly.
          </p>
          <ul className="text-gray-200 space-y-3 text-base list-disc list-inside">
            <li><strong className="text-blue-300">z &gt; 0</strong>: the raw score is above the mean.</li>
            <li><strong className="text-blue-300">z &lt; 0</strong>: the raw score is below the mean.</li>
            <li><strong className="text-blue-300">z = 0</strong>: the raw score equals the mean exactly.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Whether "above" is actually good depends entirely on what's being measured. A high
            z-score on a test is good news. A high z-score on a resting heart rate reading is
            usually the opposite. The formula doesn't know the context, so it's worth pausing on
            that before treating a positive result as automatically favorable.
          </p>
        </section>

        {/* OUTLIERS AND EMPIRICAL RULE */}
        <section id="outliers-and-empirical-rule" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Outliers and the empirical rule
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            For data that follows a normal distribution, most of it clusters close to the mean.
            The empirical rule (sometimes called the 68-95-99.7 rule) describes exactly how much:
          </p>
          <ul className="text-gray-200 space-y-3 text-base list-disc list-inside mb-6">
            <li>About 68% of values fall within 1 standard deviation of the mean (−1 &lt; z &lt; 1).</li>
            <li>About 95% fall within 2 standard deviations (−2 &lt; z &lt; 2).</li>
            <li>About 99.7% fall within 3 standard deviations (−3 &lt; z &lt; 3).</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            That last band is why |z| beyond 3 is usually flagged as an outlier: under a normal
            distribution, less than 0.3% of values should ever land out there. It's not an
            automatic disqualifier, real data isn't always perfectly normal, but a z-score past
            ±3 is a reasonable point to stop and double-check the measurement before trusting it.
          </p>
        </section>

        {/* Z VS T */}
        <section id="z-vs-t" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Z-score or t-score?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This calculator assumes you know the actual population mean and standard deviation,
            which is realistic for standardized tests (SAT, IQ scales) where those numbers are
            published, but not for most research data, where you only have a sample.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            When the population standard deviation is unknown and has to be estimated from a
            sample, especially a small one (under about 30 observations), a t-score is the more
            honest choice. The t-distribution is shaped like the normal curve but with heavier
            tails, which accounts for the extra uncertainty that comes from estimating spread
            instead of knowing it outright. As the sample size grows, the t-distribution
            converges toward the normal curve, and the two approaches give nearly identical
            answers.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If your σ is a textbook population value, this calculator applies directly. If it's a
            sample standard deviation from a small dataset, treat the result as an approximation
            rather than an exact percentile.
          </p>
        </section>

        {/* REFERENCE TABLE */}
        <section id="reference-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Reference table for common z-values
          </h2>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            A handful of z-values show up constantly, either as round numbers or as the critical
            values behind common confidence levels. Worth recognizing on sight.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">z</th>
                  <th className="p-4 text-left">Percentile</th>
                  <th className="p-4 text-left">Commonly seen as</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">−3.00</td><td className="p-4">0.13%</td><td className="p-4">Far-left outlier boundary</td></tr>
                <tr><td className="p-4">−2.00</td><td className="p-4">2.28%</td><td className="p-4">2 SD below the mean</td></tr>
                <tr><td className="p-4">−1.00</td><td className="p-4">15.87%</td><td className="p-4">1 SD below the mean</td></tr>
                <tr><td className="p-4">0.00</td><td className="p-4">50.00%</td><td className="p-4">Exactly the mean</td></tr>
                <tr><td className="p-4">1.00</td><td className="p-4">84.13%</td><td className="p-4">1 SD above the mean</td></tr>
                <tr><td className="p-4">1.645</td><td className="p-4">95.00%</td><td className="p-4">One-tailed 95% cutoff</td></tr>
                <tr><td className="p-4">1.96</td><td className="p-4">97.50%</td><td className="p-4">Two-tailed 95% confidence bound</td></tr>
                <tr><td className="p-4">2.00</td><td className="p-4">97.73%</td><td className="p-4">2 SD above the mean</td></tr>
                <tr><td className="p-4">2.576</td><td className="p-4">99.50%</td><td className="p-4">Two-tailed 99% confidence bound</td></tr>
                <tr><td className="p-4">3.00</td><td className="p-4">99.87%</td><td className="p-4">Far-right outlier boundary</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The 1.96 row is the one most often quoted in research papers: it's the boundary
            behind a standard 95% confidence interval, since 2.5% of a normal distribution sits
            beyond it on each side.
          </p>
        </section>

        {/* COMMON MISTAKES */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common mistakes
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Treating a sample standard deviation as if it were the population standard deviation
            is the most common one. The formula doesn't care where σ came from, but the resulting
            percentile is only as trustworthy as that number; a small, noisy sample can produce a
            confident-looking z-score that isn't actually reliable.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Reading "Cumulative Probability" as a hypothesis-testing p-value is the second.
            They're related concepts but not the same number: this field is the one-tailed area
            to the left of z, while a two-tailed p-value (common in significance testing) doubles
            the smaller tail area instead.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            And entering a standard deviation of 0 or a negative number. Standard deviation
            measures spread, so it can't be negative, and a value of exactly 0 would mean every
            data point in the population is identical, making the division in the formula
            undefined. The calculator catches both and shows an error instead of a nonsense
            result.
          </p>
        </section>
         <section className="px-4 mb-16 flex justify-center">
                  <SimilarCalculators
                    title="Similar Math Calculators"
                    links={[
                      { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
                      { label: "Fraction Calculator", href: "/calculators/math/fraction-calculator" },
                      { label: "Hexadecimal Calculator", href: "/calculators/math/hexadecimal-calculator" },
                      { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
                    ]}
                    seeAllHref="/calculators/math"
                  />
                </section>
      </article>

      <Footer />
    </main>
  );
}