import { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import BMICalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "BMI Calculator – Body Mass Index by Height & Weight (kg, cm, lbs)",
  description:
    "Calculate your BMI in seconds with metric or imperial units. See your weight category, your healthy weight range, and how BMI compares to real body fat percentage.",

  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "bmi calculator kg and cm",
    "bmi calculator lbs and inches",
    "bmi chart by height and weight",
    "healthy weight for height",
    "bmi formula",
    "normal bmi range",
    "bmi calculator for men",
    "bmi calculator for women",
    "overweight bmi",
    "bmi categories explained",
    "bmi calculator pakistan",
    "ideal weight calculator",
    "bmi vs body fat percentage",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/bmi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "BMI Calculator – Body Mass Index by Height & Weight",
    description:
      "Find your BMI in seconds with metric or imperial units, plus the WHO category chart, your healthy weight range, and where BMI falls short as a health measure.",
    url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator – Body Mass Index by Height & Weight",
    description:
      "Calculate your BMI with metric or imperial units. Includes the BMI chart, weight categories, and your healthy weight range.",
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
      "@id": "https://www.lizocalc.com/calculators/health/bmi-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Health", item: "https://www.lizocalc.com/calculators/health" },
        { "@type": "ListItem", position: 4, name: "BMI Calculator", item: "https://www.lizocalc.com/calculators/health/bmi-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/health/bmi-calculator",
      url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
      name: "BMI Calculator – Body Mass Index by Height & Weight",
      description:
        "Calculate your BMI in seconds with metric or imperial units. See your weight category, your healthy weight range, and how BMI compares to real body fat percentage.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-09-14",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/health/bmi-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/health/bmi-calculator#app",
      name: "BMI Calculator",
      url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
      description:
        "Free BMI calculator for finding your Body Mass Index, weight category, and healthy weight range in metric or imperial units.",
      applicationCategory: "HealthApplication",
      applicationSubCategory: "BMI Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate BMI from height and weight",
        "Metric (kg, cm) and imperial (lbs, ft/in) units",
        "WHO weight category classification",
        "Healthy weight range for your height",
        "Ponderal Index calculation",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

// Small "textbook style" fraction — numerator over denominator, used the
// same way the density calculator page uses it, so formulas read the same
// across the site instead of switching between ÷ signs and stacked text.
function Fraction({
  numerator,
  denominator,
}: {
  numerator: string;
  denominator: string;
}) {
  return (
    <span className="inline-flex flex-col items-center mx-1.5 align-middle text-green-300 leading-tight">
      <span className="px-1.5 pb-0.5 border-b-2 border-green-300">
        {numerator}
      </span>
      <span className="px-1.5 pt-0.5">{denominator}</span>
    </span>
  );
}

const tocItems = [
  { id: "what-is-bmi", label: "What Is BMI" },
  { id: "bmi-formula", label: "The BMI Formula" },
  { id: "bmi-chart-categories", label: "BMI Chart & Categories" },
  { id: "bmi-height-weight-chart", label: "BMI by Height & Weight" },
  { id: "healthy-weight-range", label: "Healthy Weight Range" },
  { id: "bmi-limitations", label: "Where BMI Gets It Wrong" },
  { id: "bmi-by-group", label: "BMI for Men, Women & Kids" },
  { id: "bmi-vs-body-fat", label: "BMI vs Body Fat %" },
  { id: "improving-your-bmi", label: "Improving Your BMI" },
];

export default function BMIPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-bmi-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">BMI Calculator</h1>
          </div>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BMICalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        {/* Quick answer box — the same job as the density page's opening
            paragraph, sized for a featured-snippet pull */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            Quick answer: how to calculate BMI
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            Divide your weight in kilograms by the square of your height in
            meters: <strong>BMI = weight (kg) ÷ height (m)²</strong>. Most
            adults fall in a healthy range between 18.5 and 24.9. Below 18.5
            is underweight, 25 to 29.9 is overweight, and 30 or above is
            classed as obese. BMI is a proxy for body fat based on height and
            weight, not a direct measurement of it — the calculator above
            works out the exact figure for your height and weight in either
            unit system.
          </p>
        </div>

        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A BMI calculator tells you where your weight sits relative to your
          height, using a formula doctors have leaned on since the 1970s.
          The math takes seconds. Knowing what the number actually means for
          you takes a bit more. Below, we cover the formula itself, the WHO
          weight categories, the adjusted thresholds used across Pakistan and
          South Asia, and the specific situations where BMI stops being
          useful.
        </p>

        {/* Jump-to-section navigation block */}
        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Table Of Contents
          </h2>
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

        {/* ── WHAT IS BMI ─────────────────────────────────────── */}
        <section id="what-is-bmi" className="scroll-mt-24 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is BMI?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Body Mass Index is a number calculated from your height and
            weight that estimates how much body fat you're likely carrying.
            A Belgian mathematician named Adolphe Quetelet worked out the
            formula in the 1830s while studying population averages across
            Belgium, which is why BMI was originally called the Quetelet
            Index. The World Health Organization and the US National
            Institutes of Health adopted it as a standard screening tool in
            the 1990s, and it's stayed the default weight-status check at
            doctor's offices ever since.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Doctors use it because it costs nothing and takes about ten
            seconds with a scale and a tape measure. A high or low reading
            doesn't diagnose anything by itself, but it flags who might need
            a closer look for conditions like type 2 diabetes, high blood
            pressure, or malnutrition.
          </p>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base leading-relaxed">
              <strong>Worth remembering:</strong> BMI estimates body fat from
              height and weight alone. It doesn't measure fat directly, and
              it isn't a diagnosis. Treat it as a starting point, not a final
              answer, and check anything unusual with a doctor.
            </p>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            In Pakistan, the Pakistan Society of Endocrinology and Metabolism
            uses BMI as the first screening number too, but with adjusted
            thresholds. South Asian bodies tend to store visceral fat at
            lower body weights than Western populations do, so a BMI of 23 in
            Lahore or Karachi carries roughly the same health risk as a BMI
            of 25 in London. We've listed the adjusted numbers in the chart
            further down.
          </p>
        </section>

        {/* ── FORMULA ─────────────────────────────────────────── */}
        <section id="bmi-formula" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The BMI Formula — Metric and Imperial
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The formula hasn't changed since Quetelet's day. In metric units,
            used across Pakistan, the UK, and most of the world:
          </p>

          <p className="text-center text-2xl md:text-3xl font-mono text-green-300 my-6">
            BMI = weight (kg) ÷ [height (m)]²
          </p>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: weight = 70 kg, height = 175 cm (1.75 m).
          </p>
          <p className="text-green-300 font-mono text-lg flex items-center flex-wrap mb-6">
            BMI&nbsp;=&nbsp;
            <Fraction numerator="70 kg" denominator="1.75 m × 1.75 m" />
            &nbsp;= 70 ÷ 3.0625 ≈ 22.9 — a healthy weight.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Height has to be in meters before you square it. 175 cm ÷ 100 =
            1.75 m — the calculator above handles that conversion for you.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base mt-8">
            For pounds and inches, common in the US, the formula picks up a
            correction factor of 703 so the units cancel out properly:
          </p>

          <p className="text-center text-2xl md:text-3xl font-mono text-green-300 my-6">
            BMI = [weight (lbs) × 703] ÷ [height (in)]²
          </p>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: weight = 154 lbs, height = 5&apos;9&quot; (69 in).
          </p>
          <p className="text-green-300 font-mono text-lg flex items-center flex-wrap">
            BMI&nbsp;=&nbsp;
            <Fraction numerator="154 × 703" denominator="69 × 69" />
            &nbsp;= 108,262 ÷ 4,761 ≈ 22.7
          </p>

          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Both examples land close to 23 because 70 kg at 175 cm and 154
            lbs at 5&apos;9&quot; describe roughly the same body. The
            calculator above runs this math instantly and adds your exact
            healthy weight range for the height you entered.
          </p>
        </section>

        {/* ── CHART & CATEGORIES ──────────────────────────────── */}
        <section id="bmi-chart-categories" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI Chart and Weight Categories
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The WHO splits adult BMI into five bands. Each one carries a
            different level of health risk, and knowing which band you're in
            is the first step toward setting a realistic goal instead of an
            arbitrary one.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/health/bmi-chart-category-scale.webp"
                alt="BMI chart showing all WHO weight categories — Underweight below 18.5, Healthy Weight 18.5 to 24.9, Overweight 25 to 29.9, Obese Class I 30 to 34.9, Obese Class II 35 to 39.9, and Severely Obese 40 and above"
                className="w-full h-64 object-cover"
                width={800}
                height={500}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="text-gray-200 text-base leading-relaxed">
                The green band, 18.5 to 24.9, carries the lowest risk of
                weight-related disease for most adults. Everything below or
                above it is worth a second look, though how much weight to
                give it depends on the rest of your health picture, not the
                number alone.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">BMI Range</th>
                  <th className="p-4 text-left font-semibold">
                    WHO Category
                  </th>
                  <th className="p-4 text-left font-semibold">
                    South Asian Adjusted
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Health Risk Level
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-blue-300">Below 18.5</td>
                  <td className="p-4">Underweight</td>
                  <td className="p-4 text-gray-400">Below 18.5</td>
                  <td className="p-4 text-yellow-300">
                    Moderate (malnutrition risk)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">
                    18.5 – 24.9
                  </td>
                  <td className="p-4">Healthy Weight</td>
                  <td className="p-4">18.5 – 22.9</td>
                  <td className="p-4 text-green-400">Lowest risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">
                    25.0 – 29.9
                  </td>
                  <td className="p-4">Overweight</td>
                  <td className="p-4">23.0 – 27.4</td>
                  <td className="p-4 text-yellow-300">Increased risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-400">
                    30.0 – 34.9
                  </td>
                  <td className="p-4">Obesity Class I</td>
                  <td className="p-4">27.5 – 32.4</td>
                  <td className="p-4 text-orange-400">High risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-400">35.0 – 39.9</td>
                  <td className="p-4">Obesity Class II</td>
                  <td className="p-4">32.5 – 37.4</td>
                  <td className="p-4 text-red-400">Very high risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-600">
                    40 and above
                  </td>
                  <td className="p-4">Obesity Class III</td>
                  <td className="p-4">37.5+</td>
                  <td className="p-4 text-red-600">Extremely high risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── QUICK REFERENCE CHART ───────────────────────────── */}
        <section id="bmi-height-weight-chart" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI Chart by Height and Weight
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below covers the most-searched height and weight
            combinations, so you can find your approximate BMI without
            typing anything into the calculator. Use it for a quick read,
            then run your exact numbers above for a precise figure and your
            healthy weight range.
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">
                    50 kg / 110 lbs
                  </th>
                  <th className="p-4 text-left font-semibold">
                    60 kg / 132 lbs
                  </th>
                  <th className="p-4 text-left font-semibold">
                    70 kg / 154 lbs
                  </th>
                  <th className="p-4 text-left font-semibold">
                    80 kg / 176 lbs
                  </th>
                  <th className="p-4 text-left font-semibold">
                    90 kg / 198 lbs
                  </th>
                  <th className="p-4 text-left font-semibold">
                    100 kg / 220 lbs
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    155 cm / 5&apos;1&quot;
                  </td>
                  <td className="p-4 text-blue-300">20.8</td>
                  <td className="p-4 text-green-400">25.0</td>
                  <td className="p-4 text-yellow-300">29.1</td>
                  <td className="p-4 text-orange-400">33.3</td>
                  <td className="p-4 text-red-400">37.5</td>
                  <td className="p-4 text-red-600">41.6</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    160 cm / 5&apos;3&quot;
                  </td>
                  <td className="p-4 text-green-400">19.5</td>
                  <td className="p-4 text-green-400">23.4</td>
                  <td className="p-4 text-green-400">27.3</td>
                  <td className="p-4 text-yellow-300 font-bold">31.3</td>
                  <td className="p-4 text-orange-400">35.2</td>
                  <td className="p-4 text-red-400">39.1</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    165 cm / 5&apos;5&quot;
                  </td>
                  <td className="p-4 text-green-400">18.4</td>
                  <td className="p-4 text-green-400">22.0</td>
                  <td className="p-4 text-green-400">25.7</td>
                  <td className="p-4 text-yellow-300">29.4</td>
                  <td className="p-4 text-orange-400">33.1</td>
                  <td className="p-4 text-red-400">36.7</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    170 cm / 5&apos;7&quot;
                  </td>
                  <td className="p-4 text-blue-300">17.3</td>
                  <td className="p-4 text-green-400">20.8</td>
                  <td className="p-4 text-green-400">24.2</td>
                  <td className="p-4 text-green-400">27.7</td>
                  <td className="p-4 text-yellow-300">31.1</td>
                  <td className="p-4 text-orange-400">34.6</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    175 cm / 5&apos;9&quot;
                  </td>
                  <td className="p-4 text-blue-300">16.3</td>
                  <td className="p-4 text-green-400">19.6</td>
                  <td className="p-4 text-green-400">22.9</td>
                  <td className="p-4 text-green-400">26.1</td>
                  <td className="p-4 text-yellow-300">29.4</td>
                  <td className="p-4 text-orange-400">32.7</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    180 cm / 5&apos;11&quot;
                  </td>
                  <td className="p-4 text-blue-300">15.4</td>
                  <td className="p-4 text-green-400">18.5</td>
                  <td className="p-4 text-green-400">21.6</td>
                  <td className="p-4 text-green-400">24.7</td>
                  <td className="p-4 text-green-400">27.8</td>
                  <td className="p-4 text-yellow-300">30.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    183 cm / 6&apos;0&quot;
                  </td>
                  <td className="p-4 text-blue-300">14.9</td>
                  <td className="p-4 text-green-400">17.9</td>
                  <td className="p-4 text-green-400">20.9</td>
                  <td className="p-4 text-green-400">23.9</td>
                  <td className="p-4 text-yellow-300">26.9</td>
                  <td className="p-4 text-yellow-300">29.9</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm italic">
            Color key: <span className="text-blue-300">blue</span> =
            underweight · <span className="text-green-400">green</span> =
            healthy weight · <span className="text-yellow-300">yellow</span>{" "}
            = overweight · <span className="text-orange-400">orange</span> =
            obese class I · <span className="text-red-400">red</span> =
            obese class II · <span className="text-red-600">dark red</span> =
            obese class III.
          </p>
        </section>

        {/* ── HEALTHY WEIGHT RANGE ─────────────────────────────── */}
        <section id="healthy-weight-range" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Healthy Weight Range for Your Height
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below lists the weight range that keeps you inside a
            BMI of 18.5 to 24.9 for a given height — essentially an ideal
            weight chart. The calculator above shows your own range the
            moment you enter your height, but this is a handy reference if
            you're just comparing numbers.
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">
                    Healthy Weight Range (kg)
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Healthy Weight Range (lbs)
                  </th>
                  <th className="p-4 text-left font-semibold">BMI Range</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    152 cm / 5&apos;0&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">43 – 58 kg</td>
                  <td className="p-4">95 – 128 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    157 cm / 5&apos;2&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">46 – 61 kg</td>
                  <td className="p-4">101 – 135 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    165 cm / 5&apos;5&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">50 – 67 kg</td>
                  <td className="p-4">111 – 149 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    170 cm / 5&apos;7&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">53 – 72 kg</td>
                  <td className="p-4">117 – 159 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    175 cm / 5&apos;9&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">57 – 76 kg</td>
                  <td className="p-4">125 – 168 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    178 cm / 5&apos;10&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">59 – 79 kg</td>
                  <td className="p-4">130 – 174 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    183 cm / 6&apos;0&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">62 – 84 kg</td>
                  <td className="p-4">137 – 184 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    188 cm / 6&apos;2&quot;
                  </td>
                  <td className="p-4 font-bold text-green-400">65 – 88 kg</td>
                  <td className="p-4">144 – 194 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── LIMITATIONS ──────────────────────────────────────── */}
        <section id="bmi-limitations" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where BMI Gets It Wrong
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            BMI is a decent screening tool at the population level, but it
            breaks down for specific groups of people. Here's where to be
            skeptical of your own number:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                Athletes and heavy lifters
              </h4>
              <p className="text-gray-200 text-base">
                Rugby players, powerlifters, and bodybuilders often read as
                overweight or obese on BMI despite low body fat. Muscle is
                denser than fat, so someone carrying a lot of it weighs more
                per inch of height than the formula expects.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                Pregnancy
              </h4>
              <p className="text-gray-200 text-base">
                BMI isn't valid during pregnancy — the weight gain is normal
                and necessary. Follow the pregnancy-specific weight
                guidelines your obstetrician gives you instead.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                Older adults
              </h4>
              <p className="text-gray-200 text-base">
                People tend to lose muscle while gaining or holding onto fat
                with age, a pattern called sarcopenic obesity. Someone in
                their 70s can carry a normal BMI while their body fat
                percentage is quietly high.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                Children and teens
              </h4>
              <p className="text-gray-200 text-base">
                Adult categories don't apply under 18. Pediatricians use
                BMI-for-age percentiles instead, which account for normal
                growth at different ages and between sexes.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                South Asian populations
              </h4>
              <p className="text-gray-200 text-base">
                People from Pakistan, India, and Bangladesh tend to develop
                insulin resistance and heart disease at lower BMI values than
                Western populations. That's the reasoning behind the
                adjusted 23 and 27.5 thresholds in the chart above.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">
                Where fat is stored
              </h4>
              <p className="text-gray-200 text-base">
                BMI says nothing about fat location. Visceral fat around the
                organs is far more harmful than fat under the skin, and
                waist circumference — above 90 cm for Asian men, 80 cm for
                Asian women — predicts that risk better than BMI does.
              </p>
            </div>
          </div>
        </section>

        {/* ── BY GROUP ──────────────────────────────────────────── */}
        <section id="bmi-by-group" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI for Men, Women, and Children
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The formula and the five weight categories are identical for
            adult men and women — there's no separate men's or women's BMI
            scale. What differs is body composition underneath that number.
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mb-6">
            <li>
              Men carry more muscle and less fat on average. A man at BMI 22
              might sit around 15–20% body fat.
            </li>
            <li>
              Women naturally carry roughly 10–13% more body fat than men at
              the same BMI, due to hormonal and reproductive differences. A
              woman at BMI 22 might sit around 25–30% body fat, which is
              still normal for her.
            </li>
            <li>
              During menopause, fat often shifts toward the abdomen even
              without a change in BMI, which raises cardiometabolic risk on
              its own.
            </li>
          </ul>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For kids and teens under 18, BMI is read against age- and
            sex-specific percentile charts instead of the fixed adult
            thresholds:
          </p>

          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">
                    BMI Percentile Range
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Category (Children 2–18)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 text-blue-300">
                    Below the 5th percentile
                  </td>
                  <td className="p-4">Underweight</td>
                </tr>
                <tr>
                  <td className="p-4 text-green-400">
                    5th to less than the 85th percentile
                  </td>
                  <td className="p-4">Healthy Weight</td>
                </tr>
                <tr>
                  <td className="p-4 text-yellow-300">
                    85th to less than the 95th percentile
                  </td>
                  <td className="p-4">Overweight</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400">
                    95th percentile and above
                  </td>
                  <td className="p-4">Obese</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Pediatricians in Pakistan and elsewhere plot a child's BMI
            against WHO Child Growth Standard charts, which account for both
            age and sex. Talk to a pediatrician directly if you're concerned
            about a child's weight — this page isn't built for that.
          </p>
        </section>

        {/* ── BMI VS BODY FAT ──────────────────────────────────── */}
        <section id="bmi-vs-body-fat" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI vs Body Fat Percentage
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            BMI doesn't measure body fat. It's a proxy built from two
            numbers, height and weight, and two people with the same BMI can
            have very different bodies underneath it. One might sit at 15%
            body fat, the other at 35%, and BMI has no way to tell them
            apart.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            If you want a number that reflects actual composition rather
            than a height-weight ratio, our{" "}
            <Link
              href="/calculators/health/body-fat-calculator"
              className="text-blue-400 hover:underline"
            >
              Body Fat Calculator
            </Link>{" "}
            uses the US Navy tape-measurement method to estimate your fat
            percentage directly. It takes a couple more measurements than
            BMI does — neck, waist, and for women, hips — but it gives you a
            figure that actually changes when you build muscle or lose fat,
            which a static BMI reading won't show you.
          </p>

          <p className="text-gray-200 text-base leading-relaxed">
            Methods that measure body fat properly, like DEXA scans,
            hydrostatic weighing, and skinfold calipers, cost money and
            usually need a clinic visit. The Body Fat Calculator won't match
            a DEXA scan exactly, but it's a free way to get closer to the
            real picture than BMI alone gives you.
          </p>
        </section>

        {/* ── IMPROVING BMI ─────────────────────────────────────── */}
        <section id="improving-your-bmi" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Improving Your BMI Safely
          </h2>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
            <p className="text-gray-200 text-base italic">
              This is general wellness information, not medical advice.
              Check with a doctor or dietitian before changing your diet or
              training, especially if you have an existing health condition.
            </p>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            If your BMI came back below 18.5, the usual fix is a calorie
            surplus of 300 to 500 calories a day from real food, paired with
            resistance training 3 to 4 times a week so the extra calories
            build muscle instead of just fat. Aim for 1.6 to 2.2 g of
            protein per kg of body weight. Our{" "}
            <Link
              href="/calculators/health/calorie-calculator"
              className="text-blue-400 hover:underline"
            >
              Calorie Calculator
            </Link>{" "}
            works out a daily target based on your activity level, and the{" "}
            <Link
              href="/calculators/health/macros-calculator"
              className="text-blue-400 hover:underline"
            >
              Macros Calculator
            </Link>{" "}
            splits that number into protein, carbs, and fat, so you're not
            just eating more — you're eating enough of the right things.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            If your BMI landed at 25 or above, a moderate deficit of 300 to
            500 calories a day is the standard starting point, and it
            produces roughly 0.3 to 0.5 kg of fat loss a week without your
            metabolism fighting back. Our{" "}
            <Link
              href="/calculators/health/calorie-deficit-calculator"
              className="text-blue-400 hover:underline"
            >
              Calorie Deficit Calculator
            </Link>{" "}
            builds that target for you. It's worth pairing with the{" "}
            <Link
              href="/calculators/health/tdee-calculator"
              className="text-blue-400 hover:underline"
            >
              TDEE Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/health/bmr-calculator"
              className="text-blue-400 hover:underline"
            >
              BMR Calculator
            </Link>{" "}
            first, so you know both your resting burn and your real-world
            daily burn before setting a deficit on top of it.
          </p>

          <p className="text-gray-200 text-base leading-relaxed">
            Sleep matters here more than people give it credit for. Poor
            sleep raises cortisol and ghrelin, the hormone that drives
            hunger, which makes any calorie target harder to stick to. Our{" "}
            <Link
              href="/calculators/health/sleep-calculator"
              className="text-blue-400 hover:underline"
            >
              Sleep Calculator
            </Link>{" "}
            works backward from your wake-up time to suggest bedtimes that
            line up with full 90-minute sleep cycles, so you wake up at the
            end of one instead of in the middle.
          </p>
        </section>

        {/* ── RELATED TOOLS ─────────────────────────────────────── */}
        <section className="px-4 mt-20 mb-4 flex justify-center">
          <SimilarCalculators
            title="Similar Health Calculators"
            links={[
              {
                label: "Calorie Calculator",
                href: "/calculators/health/calorie-calculator",
              },
              {
                label: "Body Fat Calculator",
                href: "/calculators/health/body-fat-calculator",
              },
              {
                label: "BMR Calculator",
                href: "/calculators/health/bmr-calculator",
              },
              {
                label: "TDEE Calculator",
                href: "/calculators/health/tdee-calculator",
              },
              {
                label: "Calorie Deficit Calculator",
                href: "/calculators/health/calorie-deficit-calculator",
              },
              {
                label: "Macros Calculator",
                href: "/calculators/health/macros-calculator",
              },
              {
                label: "Sleep Calculator",
                href: "/calculators/health/sleep-calculator",
              },
            ]}
            seeAllHref="/calculators/health"
          />
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}

const faqData = [
  {
    question: "What is a healthy BMI?",
    answer:
      "A healthy BMI for most adults falls between 18.5 and 24.9. This range carries the lowest risk of weight-related conditions like type 2 diabetes, heart disease, and high blood pressure. It's a screening number, not a diagnosis, so check anything unusual with a doctor.",
  },
  {
    question: "How do I calculate BMI manually?",
    answer:
      "Divide your weight in kilograms by your height in meters, squared: BMI = weight (kg) ÷ height (m)². Example: 70 kg at 1.75 m gives 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.86. In pounds and inches, use BMI = (weight in lbs × 703) ÷ height (in)².",
  },
  {
    question: "Is BMI accurate?",
    answer:
      "It's a useful screening tool at the population level, but it has real limits for individuals. It can't tell muscle from fat, so very muscular people often read as overweight despite low body fat. It also ignores age, sex, and where fat is stored. Pair it with waist circumference or a body fat percentage for a fuller picture.",
  },
  {
    question: "What BMI is considered overweight?",
    answer:
      "25.0 to 29.9 counts as overweight under WHO guidelines. At this stage, gradual changes — a moderate calorie deficit and more physical activity — are usually recommended before it progresses further.",
  },
  {
    question: "What BMI is considered obese?",
    answer:
      "30.0 or higher is classed as obesity, split into three classes: Class I (30–34.9), Class II (35–39.9), and Class III (40 and above). Each class carries progressively higher risk for heart disease, sleep apnea, joint problems, and metabolic conditions.",
  },
  {
    question: "Does BMI work the same for men and women?",
    answer:
      "The formula and category thresholds are identical for adult men and women. Body composition isn't, though — women naturally carry roughly 10% more body fat than men at the same BMI, due to hormonal and reproductive differences.",
  },
  {
    question: "Does BMI measure body fat?",
    answer:
      "No. BMI is calculated from height and weight only, and it doesn't measure fat directly. Two people with the same BMI can have very different body fat percentages. For an estimate that reflects composition instead of a height-weight ratio, try our Body Fat Calculator.",
  },
  {
    question: "Is BMI accurate for athletes and muscular people?",
    answer:
      "Not reliably. Muscle weighs more than fat for the same volume, so heavily muscled people — rugby players, powerlifters, bodybuilders — often score as overweight or obese on BMI despite low body fat. In this case, a body fat percentage or waist measurement tells you more than BMI does.",
  },
  {
    question: "How can I lower a high BMI safely?",
    answer:
      "A moderate calorie deficit of 300 to 500 calories a day, combined with regular activity and enough protein to protect muscle, is the standard starting point. Aim for roughly 0.3 to 0.5 kg of loss per week rather than a crash diet — it's more sustainable and easier on your metabolism.",
  },
  {
    question: "What is a normal BMI in Pakistan?",
    answer:
      "Pakistani and South Asian health bodies generally recommend lower thresholds than the global WHO scale, because South Asian populations tend to develop metabolic complications at lower body weights. A BMI above 23 is considered overweight and above 27.5 obese for South Asian adults, compared to 25 and 30 globally.",
  },
];