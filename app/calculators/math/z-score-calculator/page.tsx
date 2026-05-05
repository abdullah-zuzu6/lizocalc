import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import ZScoreCalculator from "./clientside";
import Link from "next/link";

const faqData = [
  {
    question: "What is the Z-score formula and how does it work?",
    answer: "The Z-score formula is $z = (x - \mu) / \sigma$. In this equation, 'x' is your raw score, $\mu$ (mu) is the population mean, and $\sigma$ (sigma) is the standard deviation. The result tells you exactly how many standard deviations a data point is above or below the average.",
  },
  {
    question: "What does a negative Z-score mean in a calculation?",
    answer: "A negative Z-score indicates that the data point is lower than the mean. For example, a Z-score of -1.5 means the value is one and a half standard deviations below the average. A Z-score of 0 means the value is exactly equal to the mean.",
  },
  {
    question: "How do I calculate a Z-score step-by-step?",
    answer: "To find a Z-score manually: 1. Subtract the mean from your raw score ($x - \mu$). 2. Divide that result by the standard deviation ($\sigma$). For instance, if you scored 85 on a test where the mean was 70 and the deviation was 10, your Z-score would be $(85 - 70) / 10 = 1.5$.",
  },
  {
    question: "How do I convert a Z-score to a percentile?",
    answer: "Once you have a Z-score, you use a standard normal distribution table (Z-table) to find the area under the curve to the left of your score. For example, a Z-score of +1.0 corresponds to roughly the 84th percentile, meaning you performed better than 84% of the population.",
  },
  {
    question: "What is a 'normal' or 'good' Z-score in statistics?",
    answer: "In a standard normal distribution, about 95% of all data points fall between a Z-score of -2 and +2. Any score beyond +3 or -3 is considered an 'outlier,' meaning it is extremely rare. Whether a score is 'good' depends on the context—a high Z-score is great for a test, but potentially bad for a blood pressure reading.",
  },
  {
    question: "What is the difference between a Z-score and a T-score?",
    answer: "Z-scores are used when you know the population standard deviation and have a large sample size ($n > 30$). T-scores are used when the population standard deviation is unknown or the sample size is small. Both measures tell you about relative standing, but the T-distribution is slightly wider to account for more uncertainty.",
  },
];
export const metadata: Metadata = {
  title: "Z-Score Calculator | Calculate Percentile & P-Value",
  description:
    "Free Z-score calculator to standardize data, find percentile rankings, and calculate P-values. Includes step-by-step normal distribution formulas.",

  keywords: [
    "z-score calculator",
    "standard score calculator",
    "z-score to percentile finder",
    "normal distribution calculator",
    "calculate p-value from z-score",
    "statistics probability tool",
    "standard deviation calculator",
    "z table calculator online",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/z-score-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Standardize your data points instantly. Calculate Z-scores and find their position on the normal distribution curve.",
    url: "https://www.lizocalc.com/calculators/math/z-score-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Z-Score Calculator | LizoCalc",
    description:
      "Find percentiles and standardized scores quickly with our free, professional-grade statistics calculator.",
  },
};

export default function ZScorePage() {
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
                "@id":
                  "https://www.lizocalc.com/calculators/math/z-score-calculator#breadcrumb",
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
                    name: "Statistics",
                    item: "https://www.lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Z-Score Calculator",
                    item: "https://www.lizocalc.com/calculators/math/z-score-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator",
  "url": "https://www.lizocalc.com/calculators/math/z-score-calculator",
  "name": "Advanced Z-Score Calculator",
  "description": "Calculate Z-scores from raw scores, population means, and standard deviations with our easy statistics tool.",
  "inLanguage": "en",
  "isPartOf": { "@type": "WebSite", "name": "LizoCalc", "url": "https://www.lizocalc.com" },
  "mainEntityOfPage": { "@type": "SoftwareApplication", "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator#app" }
},
{
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/math/z-score-calculator#app",
  "name": "Advanced Z-Score Calculator",
  "url": "https://www.lizocalc.com/calculators/math/z-score-calculator",
  "description": "Statistic tool to calculate standard scores and probability distribution.",
  "applicationCategory": "EducationalApplication",
  "applicationSubCategory": "Statistics Calculator",
  "operatingSystem": "Any",
  "inLanguage": "en",
  "browserRequirements": "Requires JavaScript. Works on modern browsers.",
  "featureList": [
    "Calculate Z-score from raw data",
    "Calculate probability area (P-value)",
    "Supports population and sample data",
    "Clear step-by-step breakdown"
  ],
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "LizoCalc", "url": "https://www.lizocalc.com" },
  "potentialAction": {
    "@type": "UseAction",
    "target": ["https://www.lizocalc.com/calculators/math/z-score-calculator"]
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
              Z-Score Calculator - Find Percentile & Normal Distribution Rank
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <ZScoreCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Z-Score</strong> (also called standard score) is one of the most powerful and widely used concepts in statistics. Whether you're a student in Sahiwal preparing for Class 11–12 statistics, FSC, BS Statistics, or data science entrance tests, a teacher explaining normal distribution, a researcher comparing test scores, or someone analyzing financial risk — understanding how far a value is from the mean in standard deviation units makes interpretation much clearer and more meaningful.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required{" "}
    <strong>Z-Score calculator</strong> instantly computes the z-score, shows you the corresponding percentile rank, probability (area under the curve), and whether the value is above/below average or an outlier. Just enter your raw score (x), population mean (μ), and standard deviation (σ), click Calculate, and get clean results with step-by-step explanation. The tool is mobile-friendly, works offline after first load, remembers your last inputs (with consent), handles decimals perfectly, and never shows ads. Perfect for board exams, university assignments, research papers, or quick data analysis. Try it now on our{" "}
    <Link
      href="/calculators/math/z-score-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      Z-Score Calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Calculate a Z-Score with This Tool
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step-by-Step Guide to Entering Your Data
        </h3>
        <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
          <li>Enter your <strong>raw score (x)</strong> — the actual value you measured (e.g., test score, height, stock return).</li>
          <li>Enter the <strong>population mean (μ)</strong> — the average of the entire group.</li>
          <li>Enter the <strong>standard deviation (σ)</strong> — how spread out the data is (must be positive).</li>
          <li>Click the large <strong>Calculate Z-Score</strong> button.</li>
          <li>Instantly see the z-score, percentile rank, probability below/above, and interpretation.</li>
          <li>Finished? Hit <strong>Reset</strong> to clear everything instantly.</li>
        </ol>
        <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
          Pro tip: The tool automatically validates inputs, prevents division by zero, and gives friendly warnings if values look unrealistic (e.g. extremely large z-scores).
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Understanding the Parameters: Raw Score, Mean, and Std Dev
        </h3>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
          <li><strong>Raw Score (x)</strong> — your individual data point (e.g., 1420 on SAT).</li>
          <li><strong>Mean (μ)</strong> — average value of the population (e.g., 1050 for SAT).</li>
          <li><strong>Standard Deviation (σ)</strong> — measure of spread (e.g., 210 for SAT).</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h4 className="text-xl font-bold text-blue-300 mb-3">
          Why Standard Deviation (σ) must be greater than zero
        </h4>
        <p className="text-gray-200 text-base">
          Standard deviation measures variation. If σ = 0, every value in the population is exactly the same — there is no spread. In that case the z-score formula would involve division by zero, which is mathematically undefined. The tool will show a clear error message: “Standard deviation must be greater than 0”.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      The Mathematics of Standard Normal Distribution
    </h2>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        The Z-Score Formula: z = (x − μ) / σ
      </h3>
      <div className="font-mono text-green-300 text-3xl text-center my-6">
        z = (x − μ) / σ
      </div>
      <p className="text-gray-200 text-base">
        This tells you how many standard deviations a raw score is from the mean.
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        How We Convert Z-Scores to Percentile Rankings
      </h3>
      <p className="text-gray-200 text-base mb-4">
        Percentile = cumulative probability × 100 (area to the left of z under the standard normal curve).
      </p>
      <h4 className="text-xl font-bold text-blue-300 mb-3">
        Using the Error Function (ERF) for precise probability
      </h4>
      <div className="font-mono text-green-300 bg-gray-900/70 p-5 rounded-xl text-sm leading-relaxed">
        CDF(z) = ½ × [1 + erf(z / √2)]
      </div>
      <p className="text-gray-200 mt-4">
        Our calculator uses high-precision numerical approximation of the error function to give accurate percentile and p-value results.
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Calculating the P-Value and Probability Density
      </h3>
      <p className="text-gray-200 text-base">
        • Probability below z → CDF(z)<br />
        • Probability above z → 1 − CDF(z)<br />
        • Two-tailed p-value (for hypothesis testing) → 2 × min(CDF(z), 1−CDF(z))
      </p>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Reading the Results: Above vs. Below the Mean
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-4">
          What does a Positive Z-Score indicate?
        </h3>
        <p className="text-gray-200">
          Value is <strong>above</strong> the mean.<br />
          Example: z = +1.5 → 1.5 standard deviations above average → ~93rd percentile.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-4">
          Understanding Negative Z-Scores and Percentiles
        </h3>
        <p className="text-gray-200">
          Value is <strong>below</strong> the mean.<br />
          Example: z = –1.2 → 1.2 standard deviations below average → ~11.5th percentile.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-xl font-semibold text-blue-300 mb-4">
          Identifying Outliers: When a Z-Score exceeds ±3
        </h3>
        <p className="text-gray-200">
          |z| &gt; 3 → very unusual (less than ~0.3% of data).<br />
          |z| &gt; 4 → extreme outlier in most fields.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Practical Examples of Z-Score Calculations
    </h2>

    <div className="space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Standardizing Test Scores (SAT, GRE, and IQ)
        </h3>
        <p className="text-gray-200">
          SAT: You scored 1380. Mean = 1050, SD = 210<br />
          z = (1380 − 1050) / 210 ≈ +1.57 → ~94th percentile
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Using Z-Scores in Finance and Investment Risk
        </h3>
        <p className="text-gray-200">
          Stock return = 18%. Mean return = 8%, SD = 15%<br />
          z = (18 − 8) / 15 = +0.67 → better than average, but not extreme
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Comparing Data Points from Different Populations
        </h3>
        <p className="text-gray-200">
          Height: Boy 175 cm (mean 170 cm, SD 7 cm) → z = +0.71<br />
          Girl 162 cm (mean 158 cm, SD 6 cm) → z = +0.67<br />
          → Boy is slightly more above average for boys than girl for girls.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Troubleshooting and Common Statistics Errors
    </h2>

    <div className="space-y-8">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          "Please enter valid numbers" – Fixing Input Issues
        </h3>
        <p className="text-gray-200">
          Make sure all fields contain numbers (no letters or symbols).<br />
          Standard deviation must be positive.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          The Difference Between Population and Sample Z-Scores
        </h3>
        <p className="text-gray-200">
          This calculator uses <strong>population</strong> parameters (μ and σ).<br />
          For sample data → use s (sample standard deviation) and note it approximates z.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          When to use a T-Score instead of a Z-Score
        </h3>
        <p className="text-gray-200">
          Use <strong>t-score</strong> when:<br />
          • Sample size is small (n &lt; 30)<br />
          • Population standard deviation is unknown<br />
          • Using sample standard deviation s
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Math & Statistics Tools to Explore
    </h2>

    <p className="text-gray-200 text-base mb-6">
      Continue your statistics journey with these free calculators:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      
      <li>
        <Link href="/calculators/math/half-life-calculator" className="text-blue-400 hover:underline">
          Half-Life Calculator
        </Link>
      </li>
      
    </ul>

    
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}