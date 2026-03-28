import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import HalfLifeCalculator from "./clientside";
import Link from "next/link";
const faqData = [
  {
    question: "What is half-life and how is it calculated?",
    answer:
      "Half-life is the time required for a quantity to reduce to half of its initial value. In physics and chemistry, it describes how quickly unstable atoms undergo radioactive decay. The standard formula used in our calculator is: $N(t) = N_0(1/2)^{t/t_{1/2}}$, where $N(t)$ is the remaining quantity, $N_0$ is the initial quantity, $t$ is the elapsed time, and $t_{1/2}$ is the half-life period.",
  },
  {
    question: "How do you find the half-life of a substance manually?",
    answer:
      "To find the half-life ($t_{1/2}$) when you know the initial and remaining amounts, use the formula: $t_{1/2} = (t \cdot \ln(2)) / \ln(N_0 / N_t)$. For example, if 100g of a substance decays to 25g in 10 hours, it has gone through two half-lives (100 -> 50 -> 25), meaning the half-life is 5 hours. Our calculator automates this logarithmic math for instant results.",
  },
  {
    question: "What is the difference between half-life and decay constant?",
    answer:
      "While both measure decay, they are inversely related. The decay constant ($\lambda$) represents the fraction of atoms decaying per unit time, while half-life is the time it takes for 50% to disappear. They are linked by the equation: $t_{1/2} = \ln(2) / \lambda \approx 0.693 / \lambda$. High decay constants mean very short half-lives.",
  },
  {
    question: "How much of a substance remains after 3 half-lives?",
    answer:
      "After each half-life, the remaining amount is reduced by 50%. After 1 half-life, 50% remains; after 2, 25% remains; and after 3 half-lives, exactly 12.5% (or 1/8th) of the original substance is left. You can calculate this easily by taking $(1/2)^n$, where $n$ is the number of half-lives elapsed.",
  },
  {
    question: "Can half-life be used for things other than radioactivity?",
    answer:
      "Yes! While most common in nuclear physics, the concept of half-life is widely used in pharmacology (biological half-life) to determine how long a drug stays in your system, and in finance to calculate the 'half-life' of a debt or the depreciation of assets. Our calculator supports various time units to accommodate these different scientific and financial fields.",
  },
  {
    question: "How do you calculate the remaining amount of a radioactive isotope?",
    answer:
      "To find the remaining amount, identify the initial quantity, the elapsed time, and the half-life. Use the decay formula: $Remaining = Initial \times (0.5)^{(Time / Half\text{-}Life)}$. If you start with 80mg of an isotope with a 2-day half-life, after 6 days (which is 3 half-lives), the remaining amount is $80 \times (0.5)^3 = 10\text{mg}$.",
  },
];
export const metadata: Metadata = {
  title: "Half-Life Calculator | Calculate Decay Step-by-Step",
  description:
    "Free half-life calculator to find the remaining amount, decay constant, and elapsed half-lives. Includes a detailed decay table for any time unit.",

  keywords: [
    "half-life calculator",
    "radioactive decay calculator",
    "calculate decay constant",
    "carbon dating calculator",
    "drug half life tool",
    "exponential decay calculator",
    "remaining quantity finder",
    "half life formula steps",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/math/half-life-calculator",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: "Half-Life Calculator | Track Exponential Decay | LizoCalc",
    description:
      "Struggling with physics or chemistry? Calculate half-life, decay constants, and visualize the process with our interactive decay table.",
    url: "https://www.lizocalc.com/math/half-life-calculator",
    siteName: "LizoCalc",
    images: [
      {
        url: "https://www.lizocalc.com/og-half-life-calculator.png", // Recommended: 1200x630px
        width: 1200,
        height: 630,
        alt: "LizoCalc Half-Life and Decay Calculator",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Half-Life Calculator: Find Remaining Amount & Decay Rate",
    description:
      "Get instant, accurate results for radioactive decay or pharmacology calculations with the LizoCalc Half-Life tool.",
    images: ["https://www.lizocalc.com/og-half-life-calculator.png"],
  },
};
export default function HalfLifePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT (BEST PRACTICE) === */}
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
                "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Math ", item: "https://www.lizocalc.com/calculators/math" },
                  { "@type": "ListItem", position: 4, name: "Half-Life Calculator", item: "https://www.lizocalc.com/calculators/math/half-life-calculator" },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator",
                url: "https://www.lizocalc.com/calculators/math/half-life-calculator",
                name: "Advanced Half-Life Calculator",
                description: "Use our advanced half-life calculator to compute remaining quantity, decay constants, and half-lives elapsed.",
                inLanguage: "en",
                isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.lizocalc.com/calculators/math/half-life-calculator#app",
                name: "Advanced Half-Life Calculator",
                url: "https://www.lizocalc.com/calculators/math/half-life-calculator",
                description: "Advanced half-life calculator to compute remaining quantity, decay constants, and total decay.",
                applicationCategory: "ScienceApplication",
                applicationSubCategory: "Half-Life Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate remaining amount",
                  "Compute decay constant",
                  "Compute half-lives elapsed",
                  "Calculate decay percentage",
                  "Reset and recalculate instantly",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
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
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            
            <h1 className="text-3xl md:text-4xl font-bold">
             Half-Life Calculator: Track Exponential Decay and Remaining Amounts
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HalfLifeCalculator/>
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Whether you're studying <strong>nuclear physics</strong>, analyzing drug elimination in <strong>pharmacokinetics</strong>, dating ancient artifacts with <strong>carbon-14</strong>, or just curious about how substances decay over time, our free <strong>Half-Life Calculator</strong> makes it simple and accurate. Enter your initial amount, half-life value, and time elapsed — and instantly see how much remains, the decay constant (λ), percentage decayed, and number of half-lives passed.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    This powerful exponential decay tool is mobile-friendly, ad-free, works offline after first load, and requires no sign-up. Perfect for students in Sahiwal or anywhere else preparing for exams, researchers modeling radioactive isotopes, or medical professionals tracking medication clearance. Try the <strong>half life calculator</strong> now and master exponential decay in seconds!
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use the LizoCalc Half-Life Tool
    </h2>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Entering Your Initial Amount and Decay Parameters
      </h3>
      <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
        <li>Enter the <strong>initial amount</strong> (N₀) — this can be mass (grams, mg), number of atoms, activity (becquerels), or concentration. Any positive number works.</li>
        <li>Type the <strong>half-life</strong> value — the time it takes for half the substance to decay (e.g., 5730 years for carbon-14).</li>
        <li>Input the <strong>time elapsed</strong> (t) — how long the decay has been happening.</li>
        <li>Choose consistent <strong>time units</strong> for half-life and elapsed time (the tool auto-converts if needed).</li>
        <li>Hit <strong>Calculate</strong> — see remaining amount, decay constant λ, percent remaining/decayed, and half-lives elapsed instantly.</li>
        <li>Use <strong>Reset</strong> to clear fields and start a new calculation — great for comparing scenarios.</li>
      </ol>
      <p className="text-gray-300 italic mt-6 text-base">
        Pro tip: For very large or small numbers, the tool handles scientific notation automatically. No crashes, no ads — just clean results.
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Selecting Time Units: From Seconds to Millennia
      </h3>
      <p className="text-gray-200 mb-4">
        Decay happens across vastly different timescales. Our calculator supports:
      </p>
      <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
        <li>Seconds — ideal for short-lived isotopes in labs</li>
        <li>Minutes / Hours — pharmacokinetics and drug half-lives</li>
        <li>Days / Weeks — biological and medical applications</li>
        <li>Years / Centuries / Millennia — radioactive dating and nuclear waste</li>
      </ul>
      <p className="text-gray-200 mt-4">
        Need quick unit conversion? Check our <Link href="/calculators/time/time-calculator" className="text-blue-400 hover:underline font-semibold">Time Calculator</Link> or <Link href="/calculators/time/date-calculator" className="text-blue-400 hover:underline font-semibold">Date Calculator</Link>.
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Reading the Results: Remaining Amount and Decay Constant (λ)
      </h3>
      <p className="text-gray-200">
        Results show:
      </p>
      <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
        <li><strong>Remaining amount</strong> — exact quantity left</li>
        <li><strong>Decay constant λ</strong> — rate of decay (larger λ = faster decay)</li>
        <li><strong>Percentage remaining / decayed</strong></li>
        <li><strong>Number of half-lives elapsed</strong></li>
        <li>Interactive decay table and graph visualization</li>
      </ul>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Understanding the Half-Life Formulas Used
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      The Exponential Decay Equation: N(t) = N₀ × 0.5^(t/t_{1/2})
    </h3>
    <p className="text-gray-200 mb-4">
      This is the most intuitive form — every half-life halves the amount:
    </p>
    <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl mb-4">
      N(t) = N₀ × (1/2)^(t / t_{1/2})
    </p>
    <p className="text-gray-200">
      Equivalent exponential form (using decay constant):
    </p>
    <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl">
      N(t) = N₀ × e^(-λt)
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How to Calculate the Decay Constant (λ)
    </h3>
    <p className="text-gray-200 mb-4">
      The decay constant shows how quickly decay occurs:
    </p>
    <p className="text-gray-200 font-mono bg-gray-900 p-4 rounded-xl">
      λ = ln(2) / t_{1/2} ≈ 0.693 / t_{1/2}
    </p>
    <p className="text-gray-200">
      Shorter half-life → larger λ → faster decay.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Determining Total Decay Percentage and Half-Lives Elapsed
    </h3>
    <p className="text-gray-200">
      Percentage remaining = (N(t) / N₀) × 100%<br />
      Percentage decayed = 100% − percentage remaining<br />
      Half-lives elapsed = t / t_{1/2}
    </p>
    <p className="text-gray-200 mt-4">
      For percentage help, try our <Link href="/calculators/math/percentage-calculator" className="text-blue-400 hover:underline">Percentage Calculator</Link>.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Interactive Decay Table and Data Visualization
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Tracking Substance Reduction Over Time Intervals
    </h3>
    <p className="text-gray-200 mb-6">
      The tool generates a table showing remaining amount at regular intervals (e.g., every half-life or custom steps). Visualize the classic exponential curve — rapid early loss, then slower decline.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Why the Decay Table is Essential for Predictive Modeling
    </h3>
    <p className="text-gray-200">
      See patterns — predict storage times for nuclear waste, dosing schedules for medications, or when a sample becomes undetectable in carbon dating. Great for science fair projects or professional reports.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Practical Applications of Half-Life Calculation
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Nuclear Physics: Calculating Isotope Stability
    </h3>
    <p className="text-gray-200">
      Determine safe handling times for isotopes like iodine-131 (8 days) or uranium-238 (4.5 billion years). Essential in reactors and waste management.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
      Pharmacokinetics: Managing Drug Clearance in Medicine
    </h3>
    <p className="text-gray-200">
      Many drugs have known half-lives (e.g., ibuprofen ~2 hours, morphine ~2–4 hours). Calculate how much remains in the body after dosing intervals to avoid overdose or underdose.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
      Archaeology: Carbon Dating and the Age of Samples
    </h3>
    <p className="text-gray-200">
      Carbon-14 (half-life 5730 years) dates organic remains up to ~50,000 years. Measure remaining ¹⁴C to estimate age — revolutionized archaeology and paleontology.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Step-by-Step Decay Calculation Examples
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Example: How much of 100g remains after 3 half-lives?
    </h3>
    <p className="text-gray-200 mb-2">
      N(t) = 100 × (1/2)^3 = 100 × 1/8 = <strong>12.5 g</strong>
    </p>
    <p className="text-gray-200">
      After 1 half-life: 50 g<br />
      After 2: 25 g<br />
      After 3: 12.5 g (87.5% decayed)
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Solving for Time: How long until 10% of a substance remains?
    </h3>
    <p className="text-gray-200 mb-2">
      0.10 = (1/2)^(t / t_{1/2})<br />
      Take log: t / t_{1/2} = log₂(1/0.10) = log₂(10) ≈ 3.322<br />
      t ≈ 3.322 × t_{1/2}
    </p>
    <p className="text-gray-200">
      If half-life = 10 years → t ≈ 33.22 years until only 10% remains.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How do I convert minutes to years for half-life calculations?
    </h3>
    <p className="text-gray-200">
      Use conversion: 1 year ≈ 525,600 minutes.<br />
      For drug half-life of 120 minutes → in years: 120 / 525600 ≈ 0.000228 years.<br />
      Our <Link href="/calculators/conversion-calculator" className="text-blue-400 hover:underline">Conversion Calculator</Link> or time tools handle this instantly.
    </p>

    <div className="overflow-x-auto mt-10">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left">Half-Lives Elapsed</th>
            <th className="p-4 text-left">Remaining Fraction</th>
            <th className="p-4 text-left">Example (Start 100g)</th>
            <th className="p-4 text-left">% Decayed</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr><td className="p-4">1</td><td className="p-4">1/2</td><td className="p-4">50g</td><td className="p-4">50%</td></tr>
          <tr><td className="p-4">2</td><td className="p-4">1/4</td><td className="p-4">25g</td><td className="p-4">75%</td></tr>
          <tr><td className="p-4">3</td><td className="p-4">1/8</td><td className="p-4">12.5g</td><td className="p-4">87.5%</td></tr>
          <tr><td className="p-4">4</td><td className="p-4">1/16</td><td className="p-4">6.25g</td><td className="p-4">93.75%</td></tr>
          <tr><td className="p-4">5</td><td className="p-4">1/32</td><td className="p-4">3.125g</td><td className="p-4">96.875%</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Math & Science Tools to Explore
    </h2>
    <p className="text-gray-200 mb-6">
      Enhance your decay calculations with these free LizoCalc tools:
    </p>
    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li><Link href="/calculators/physics/density-calculator" className="text-blue-400 hover:underline">Density Calculator</Link> — related physics concepts</li>
      <li><Link href="/calculators/math/conversion-calculator" className="text-blue-400 hover:underline">Unit Conversion Calculator</Link> — time & mass units</li>
    </ul>

    <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
      Exponential decay is everywhere — from atoms to medicine to history. Our Half-Life Calculator makes it accessible and accurate. Bookmark it, share it, and keep exploring the fascinating world of decay!
    </p>
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
