import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import BMICalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "What is a healthy BMI?",
    answer:
      "A healthy BMI for most adults falls between 18.5 and 24.9. This range is associated with the lowest risk of weight-related health conditions such as type 2 diabetes, heart disease, and hypertension. However, BMI is a screening tool — not a diagnosis — so always consult a doctor for a full health assessment.",
  },
  {
    question: "How do I calculate BMI manually?",
    answer:
      "To calculate BMI manually using metric units, divide your weight in kilograms by the square of your height in meters: BMI = weight (kg) ÷ height (m)². For example, if you weigh 70 kg and are 1.75 m tall: BMI = 70 ÷ (1.75 × 1.75) = 70 ÷ 3.0625 = 22.86. For imperial units, the formula is: BMI = (weight in lbs × 703) ÷ height (in)².",
  },
  {
    question: "Is BMI accurate?",
    answer:
      "BMI is a useful population-level screening tool but has well-known limitations for individuals. It does not distinguish between muscle and fat mass, so highly muscular athletes may register as 'overweight' despite having very low body fat. It also does not account for age, sex, bone density, or fat distribution. For a more complete picture, BMI should be used alongside waist circumference measurements and body fat percentage assessments.",
  },
  {
    question: "What BMI is considered overweight?",
    answer:
      "A BMI of 25.0 to 29.9 is classified as overweight according to the World Health Organization (WHO). This range indicates that body weight relative to height is above the healthy range. At this stage, gradual lifestyle changes — including a moderate calorie deficit and increased physical activity — are recommended before the condition progresses to obesity.",
  },
  {
    question: "What BMI is considered obese?",
    answer:
      "A BMI of 30.0 or higher is classified as obesity. It is further divided into three classes: Class I (30–34.9), Class II (35–39.9), and Class III (40 and above, also called severe or morbid obesity). Each class carries progressively higher risks for cardiovascular disease, sleep apnea, joint problems, and metabolic conditions.",
  },
  {
    question: "Does BMI work the same for men and women?",
    answer:
      "The standard BMI formula and categories are the same for adult men and women, but their body compositions differ. Women naturally carry a higher percentage of body fat than men at the same BMI value — roughly 10% more — due to hormonal and reproductive physiological differences. Some researchers suggest gender-specific BMI thresholds would be more accurate, but current clinical guidelines still use the universal adult ranges.",
  },
  {
    question: "Does BMI measure body fat?",
    answer:
      "No. BMI does not directly measure body fat percentage. It is a proxy measure calculated from height and weight only. Two people with identical BMI scores can have very different body compositions — one with 15% body fat and one with 35%. Methods that actually measure body fat include DEXA scans, hydrostatic weighing, skinfold calipers, and bioelectrical impedance analysis (BIA).",
  },
  {
    question: "What is a normal BMI in Pakistan?",
    answer:
      "In Pakistan and across South Asian populations, health organisations — including the Pakistan National Institute of Health — suggest slightly lower BMI thresholds due to differences in body fat distribution. A BMI above 23 may be considered overweight and above 27.5 as obese for South Asian adults, compared to the global WHO thresholds of 25 and 30 respectively. Using these adjusted thresholds can provide a more accurate health risk assessment for people in Sahiwal, Lahore, Karachi, and across Pakistan.",
  },
];

export const metadata: Metadata = {
  title: "BMI Calculator – Calculate Body Mass Index by Height & Weight",
  description:
    "Use our free BMI calculator to find your Body Mass Index instantly. Supports metric and imperial units. Includes BMI chart, healthy weight ranges, and categories for adults.",

  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "bmi chart by height and weight",
    "healthy weight for height",
    "bmi formula",
    "overweight bmi",
    "bmi categories",
    "bmi calculator pakistan",
    "ideal weight calculator",
    "lizocalc bmi tool",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/bmi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "BMI Calculator – Instant Body Mass Index by Height & Weight",
    description:
      "Find your BMI in seconds. Our advanced BMI calculator includes metric and imperial support, a full BMI category chart, and healthy weight ranges for your height.",
    url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BMI Calculator – Body Mass Index by Height & Weight",
    description:
      "Instantly calculate your BMI with metric or imperial units. Includes BMI chart, categories, and healthy weight ranges.",
  },
};

export default function BMIPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT === */}
      <Script
        id="structured-data-bmi-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* ── 1. BREADCRUMB ── */
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmi-calculator#breadcrumb",
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
                    name: "Health",
                    item: "https://www.lizocalc.com/calculators/health",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "BMI Calculator",
                    item: "https://www.lizocalc.com/calculators/health/bmi-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T author) ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and health tool maker behind LizoCalc.",
                knowsAbout: [
                  "BMI Calculation",
                  "Health Metrics",
                  "Body Composition",
                  "Web Development",
                  "Mechatronics",
                ],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.lizocalc.com/logo.png",
                },
                foundingDate: "2026",
                founder: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 4. WEBSITE ── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmi-calculator",
                url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
                name: "BMI Calculator – Calculate Body Mass Index by Height & Weight",
                description:
                  "Use our free BMI calculator to find your Body Mass Index instantly. Supports metric and imperial units. Includes BMI chart, healthy weight ranges, and categories.",
                inLanguage: "en",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator#app",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator#app",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp#image",
                },
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmi-calculator#app",
                name: "BMI Calculator",
                url: "https://www.lizocalc.com/calculators/health/bmi-calculator",
                description:
                  "Free BMI calculator to determine Body Mass Index using metric or imperial units, with full category classification and healthy weight ranges.",
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator",
                },
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp#image",
                },
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMI Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Body Mass Index (BMI)",
                  "Supports metric (kg/cm) and imperial (lbs/inches) units",
                  "BMI category classification per WHO guidelines",
                  "Healthy weight range for any height",
                  "South Asian / Pakistani BMI threshold guidance",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/health/bmi-calculator",
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmi-calculator#howto",
                name: "How to Calculate Your BMI",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator",
                },
                description:
                  "Step-by-step guide to calculating Body Mass Index using the LizoCalc BMI Calculator",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Choose your unit system",
                    text: "Select metric (kg and cm) or imperial (lbs and inches) using the toggle at the top of the calculator.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter your weight",
                    text: "Type or slide to your current body weight in kilograms (metric) or pounds (imperial).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter your height",
                    text: "Enter your height in centimeters (metric) or feet and inches (imperial).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read your BMI result instantly",
                    text: "Your BMI score, category (e.g. Healthy Weight), and healthy weight range appear immediately — no button needed.",
                  },
                ],
              },

              /* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmi-calculator#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmi-calculator",
                },
                mainEntity: (faqData || []).map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },

              /* ── 9. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp#image",
                url: "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp",
                name: "BMI Chart Showing Weight Categories from Underweight to Obese",
                caption:
                  "Visual BMI scale showing all five WHO weight categories — Underweight, Healthy Weight, Overweight, Obese, and Severely Obese — mapped against BMI values.",
                description:
                  "A BMI category scale chart illustrating the WHO standard weight classifications from below 18.5 (Underweight) through 40+ (Obesity Class III), used as a visual reference alongside the LizoCalc BMI calculator.",
                width: 800,
                height: 500,
                contentUrl:
                  "https://www.lizocalc.com/images/health/bmi-chart-category-scale.webp",
                encodingFormat: "image/png",
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
              BMI Calculator – Calculate Body Mass Index by Height &amp; Weight
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BMICalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── DIRECT ANSWER BOX (AI Overview trigger) ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Calculate BMI
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            BMI is calculated by dividing your weight in kilograms by the square of your height in meters:{" "}
            <strong>BMI = weight (kg) ÷ height (m)²</strong>. A{" "}
            <strong>healthy BMI range for most adults is 18.5 – 24.9</strong>.
            Below 18.5 is underweight; 25–29.9 is overweight; 30 and above is obese.
            BMI estimates body fat based on height and weight, but it does not directly measure
            body fat percentage.
          </p>
        </div>

      

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — WHAT IS BMI
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is BMI (Body Mass Index)?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            <strong>Body Mass Index (BMI)</strong> is a numerical value derived from a person's
            height and weight that serves as a proxy indicator of body fatness and associated
            health risk. The concept was developed by Belgian mathematician Adolphe Quetelet in
            the 1830s — which is why it was originally called the <em>Quetelet Index</em> — and
            was formally adopted as a clinical screening tool by the World Health Organization
            (WHO) and the U.S. National Institutes of Health (NIH) in the 1990s.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Doctors and public health professionals use BMI primarily because it is inexpensive,
            non-invasive, and reproducible at scale. A single BMI calculation can flag whether a
            patient warrants further investigation for conditions such as type 2 diabetes,
            cardiovascular disease, hypertension, sleep apnea, or malnutrition — making it an
            indispensable first step in a clinical encounter.
          </p>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base leading-relaxed font-medium">
              <strong>Important trust statement:</strong> BMI estimates body fat based on height
              and weight, but it does not directly measure body fat percentage. It is a screening
              tool, not a medical diagnosis. Always consult a qualified healthcare professional for
              a full health assessment.
            </p>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            In Pakistan, the Pakistan Society of Endocrinology and Metabolism and local public
            health bodies recognise BMI as the standard first-line screening metric for
            weight-related risk. However, because South Asian populations — including Pakistanis —
            tend to accumulate visceral fat at lower BMI values than Western populations, adjusted
            thresholds of 23 (overweight) and 27.5 (obese) are increasingly used alongside the
            global WHO ranges.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — HOW TO CALCULATE BMI (FORMULA)
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate BMI — The Exact Formula
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Metric BMI Formula (kg and cm)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The standard metric formula — used in Pakistan, the UK, Europe, and most of the world — is:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMI = weight (kg) ÷ [height (m)]²
            <br />
            <br />
            Example: Weight = 70 kg, Height = 175 cm (1.75 m)
            <br />
            BMI = 70 ÷ (1.75 × 1.75)
            <br />
            BMI = 70 ÷ 3.0625
            <br />→ <strong>BMI = 22.86 — Healthy Weight ✅</strong>
          </div>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Note that height must be converted from centimetres to metres before squaring.
            175 cm ÷ 100 = 1.75 m. Our calculator handles this conversion automatically.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Imperial BMI Formula (lbs and inches)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For users working in pounds and inches (common in the US), the formula includes a
            correction factor of 703:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMI = [weight (lbs) × 703] ÷ [height (inches)]²
            <br />
            <br />
            Example: Weight = 154 lbs, Height = 5&apos;9&quot; = 69 inches
            <br />
            BMI = (154 × 703) ÷ (69 × 69)
            <br />
            BMI = 108,262 ÷ 4,761
            <br />→ <strong>BMI = 22.74 — Healthy Weight ✅</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Common BMI Examples by Weight and Height
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Below are manually calculated BMI values for the most commonly searched
            height-and-weight combinations:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">BMI</th>
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Calculation</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">70 kg</td>
                  <td className="p-4 font-semibold text-yellow-300">170 cm</td>
                  <td className="p-4 font-bold text-green-400">24.22</td>
                  <td className="p-4">✅ Healthy Weight</td>
                  <td className="p-4 text-gray-400">70 ÷ 1.70²</td>
                </tr>
                <tr>
                  <td className="p-4">80 kg</td>
                  <td className="p-4">180 cm</td>
                  <td className="p-4 font-bold text-green-400">24.69</td>
                  <td className="p-4">✅ Healthy Weight</td>
                  <td className="p-4 text-gray-400">80 ÷ 1.80²</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">90 kg</td>
                  <td className="p-4 font-semibold text-yellow-300">183 cm (6&apos;0&quot;)</td>
                  <td className="p-4 font-bold text-orange-400">26.87</td>
                  <td className="p-4">⚠️ Overweight</td>
                  <td className="p-4 text-gray-400">90 ÷ 1.83²</td>
                </tr>
                <tr>
                  <td className="p-4">60 kg</td>
                  <td className="p-4">167 cm (5&apos;6&quot;)</td>
                  <td className="p-4 font-bold text-green-400">21.51</td>
                  <td className="p-4">✅ Healthy Weight</td>
                  <td className="p-4 text-gray-400">60 ÷ 1.67²</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">150 lbs</td>
                  <td className="p-4 font-semibold text-yellow-300">5&apos;7&quot; (67 in)</td>
                  <td className="p-4 font-bold text-green-400">23.49</td>
                  <td className="p-4">✅ Healthy Weight</td>
                  <td className="p-4 text-gray-400">(150×703)÷67²</td>
                </tr>
                <tr>
                  <td className="p-4">100 kg</td>
                  <td className="p-4">175 cm</td>
                  <td className="p-4 font-bold text-red-400">32.65</td>
                  <td className="p-4">❌ Obese Class I</td>
                  <td className="p-4 text-gray-400">100 ÷ 1.75²</td>
                </tr>
                <tr>
                  <td className="p-4">50 kg</td>
                  <td className="p-4">165 cm</td>
                  <td className="p-4 font-bold text-blue-300">18.37</td>
                  <td className="p-4">⬇️ Underweight</td>
                  <td className="p-4 text-gray-400">50 ÷ 1.65²</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — BMI CHART AND CATEGORIES
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI Chart and Weight Categories — WHO Standard
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The World Health Organisation (WHO) defines five adult BMI weight categories.
            Each range is associated with a different level of health risk. Knowing which
            category your BMI falls into is the first step toward setting a targeted, realistic
            health goal:
          </p>

          {/* BMI Image */}
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
                The BMI scale above illustrates how weight categories progress from
                Underweight through to Obesity Class III. Each colour band represents a
                different zone of health risk — with the green band (18.5–24.9) indicating the
                range associated with the lowest risk of weight-related disease for most adults.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">BMI Range</th>
                  <th className="p-4 text-left font-semibold">WHO Category</th>
                  <th className="p-4 text-left font-semibold">South Asian Adjusted</th>
                  <th className="p-4 text-left font-semibold">Health Risk Level</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-blue-300">Below 18.5</td>
                  <td className="p-4">Underweight</td>
                  <td className="p-4 text-gray-400">Below 18.5</td>
                  <td className="p-4 text-yellow-300">Moderate (malnutrition risk)</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">18.5 – 24.9</td>
                  <td className="p-4">✅ Healthy Weight</td>
                  <td className="p-4">18.5 – 22.9</td>
                  <td className="p-4 text-green-400">Lowest risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">25.0 – 29.9</td>
                  <td className="p-4">⚠️ Overweight</td>
                  <td className="p-4">23.0 – 27.4</td>
                  <td className="p-4 text-yellow-300">Increased risk</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-400">30.0 – 34.9</td>
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
                  <td className="p-4 font-bold text-red-600">40 and above</td>
                  <td className="p-4">Obesity Class III</td>
                  <td className="p-4">37.5+</td>
                  <td className="p-4 text-red-600">Extremely high risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — BMI CHART BY HEIGHT AND WEIGHT
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI Chart by Height and Weight — Quick Reference
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below shows pre-calculated BMI values for common height and weight
            combinations — one of the most-searched formats for BMI reference. Use this to
            instantly find your approximate BMI without any calculation, then use the tool
            above for a precise figure:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">50 kg / 110 lbs</th>
                  <th className="p-4 text-left font-semibold">60 kg / 132 lbs</th>
                  <th className="p-4 text-left font-semibold">70 kg / 154 lbs</th>
                  <th className="p-4 text-left font-semibold">80 kg / 176 lbs</th>
                  <th className="p-4 text-left font-semibold">90 kg / 198 lbs</th>
                  <th className="p-4 text-left font-semibold">100 kg / 220 lbs</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">155 cm / 5&apos;1&quot;</td>
                  <td className="p-4 text-blue-300">20.8</td>
                  <td className="p-4 text-green-400">25.0</td>
                  <td className="p-4 text-yellow-300">29.1</td>
                  <td className="p-4 text-orange-400">33.3</td>
                  <td className="p-4 text-red-400">37.5</td>
                  <td className="p-4 text-red-600">41.6</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">160 cm / 5&apos;3&quot;</td>
                  <td className="p-4 text-green-400">19.5</td>
                  <td className="p-4 text-green-400">23.4</td>
                  <td className="p-4 text-green-400">27.3</td>
                  <td className="p-4 text-yellow-300 font-bold">31.3</td>
                  <td className="p-4 text-orange-400">35.2</td>
                  <td className="p-4 text-red-400">39.1</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">165 cm / 5&apos;5&quot;</td>
                  <td className="p-4 text-green-400">18.4</td>
                  <td className="p-4 text-green-400">22.0</td>
                  <td className="p-4 text-green-400">25.7</td>
                  <td className="p-4 text-yellow-300">29.4</td>
                  <td className="p-4 text-orange-400">33.1</td>
                  <td className="p-4 text-red-400">36.7</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">170 cm / 5&apos;7&quot;</td>
                  <td className="p-4 text-blue-300">17.3</td>
                  <td className="p-4 text-green-400">20.8</td>
                  <td className="p-4 text-green-400">24.2</td>
                  <td className="p-4 text-green-400">27.7</td>
                  <td className="p-4 text-yellow-300">31.1</td>
                  <td className="p-4 text-orange-400">34.6</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">175 cm / 5&apos;9&quot;</td>
                  <td className="p-4 text-blue-300">16.3</td>
                  <td className="p-4 text-green-400">19.6</td>
                  <td className="p-4 text-green-400">22.9</td>
                  <td className="p-4 text-green-400">26.1</td>
                  <td className="p-4 text-yellow-300">29.4</td>
                  <td className="p-4 text-orange-400">32.7</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">180 cm / 5&apos;11&quot;</td>
                  <td className="p-4 text-blue-300">15.4</td>
                  <td className="p-4 text-green-400">18.5</td>
                  <td className="p-4 text-green-400">21.6</td>
                  <td className="p-4 text-green-400">24.7</td>
                  <td className="p-4 text-green-400">27.8</td>
                  <td className="p-4 text-yellow-300">30.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">183 cm / 6&apos;0&quot;</td>
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
            Colour key: <span className="text-blue-300">Blue</span> = Underweight ·{" "}
            <span className="text-green-400">Green</span> = Healthy Weight ·{" "}
            <span className="text-yellow-300">Yellow</span> = Overweight ·{" "}
            <span className="text-orange-400">Orange</span> = Obese Class I ·{" "}
            <span className="text-red-400">Red</span> = Obese Class II ·{" "}
            <span className="text-red-600">Dark Red</span> = Obese Class III
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — HEALTHY WEIGHT RANGE FOR YOUR HEIGHT
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Healthy Weight Range for Your Height — Ideal Weight Chart
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below shows the <strong>healthy weight range</strong> for common heights —
            calculated as the weights that produce a BMI of 18.5 to 24.9. Use this as your{" "}
            <strong>ideal weight chart</strong> to set realistic, science-backed weight goals.
            The calculator above also displays your personal healthy range the moment you enter
            your height:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">Healthy Weight Range (kg)</th>
                  <th className="p-4 text-left font-semibold">Healthy Weight Range (lbs)</th>
                  <th className="p-4 text-left font-semibold">BMI Range</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">152 cm / 5&apos;0&quot;</td>
                  <td className="p-4 font-bold text-green-400">43 – 58 kg</td>
                  <td className="p-4">95 – 128 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">157 cm / 5&apos;2&quot;</td>
                  <td className="p-4 font-bold text-green-400">46 – 61 kg</td>
                  <td className="p-4">101 – 135 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">165 cm / 5&apos;5&quot;</td>
                  <td className="p-4 font-bold text-green-400">50 – 67 kg</td>
                  <td className="p-4">111 – 149 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">170 cm / 5&apos;7&quot;</td>
                  <td className="p-4 font-bold text-green-400">53 – 72 kg</td>
                  <td className="p-4">117 – 159 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">175 cm / 5&apos;9&quot;</td>
                  <td className="p-4 font-bold text-green-400">57 – 76 kg</td>
                  <td className="p-4">125 – 168 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">178 cm / 5&apos;10&quot;</td>
                  <td className="p-4 font-bold text-green-400">59 – 79 kg</td>
                  <td className="p-4">130 – 174 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">183 cm / 6&apos;0&quot;</td>
                  <td className="p-4 font-bold text-green-400">62 – 84 kg</td>
                  <td className="p-4">137 – 184 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">188 cm / 6&apos;2&quot;</td>
                  <td className="p-4 font-bold text-green-400">65 – 88 kg</td>
                  <td className="p-4">144 – 194 lbs</td>
                  <td className="p-4 text-blue-300">18.5 – 24.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — BMI LIMITATIONS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI Limitations: When BMI Is Not Accurate
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            BMI is a valuable screening tool, but it has well-documented limitations for
            specific populations. Understanding these nuances is what separates a reliable
            health resource from a simplistic one:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">🏋️ Athletes and Bodybuilders</h4>
              <p className="text-gray-200 text-base">
                Highly muscular individuals — such as rugby players, powerlifters, and
                competitive bodybuilders — may register as overweight or obese on the BMI scale
                despite having very low body fat percentages. Muscle is significantly denser
                than fat, so BMI overestimates health risk in this group.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">🤰 Pregnancy</h4>
              <p className="text-gray-200 text-base">
                BMI is not a valid measure during pregnancy due to natural and necessary
                weight gain. Pregnant women should use pregnancy-specific weight gain guidelines
                provided by their obstetrician rather than standard BMI categories.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">👴 Older Adults</h4>
              <p className="text-gray-200 text-base">
                Elderly individuals tend to lose muscle mass (sarcopenia) while retaining or
                gaining fat — a process called "sarcopenic obesity." This means a person in
                their 70s or 80s can have a normal BMI while carrying a dangerously high
                proportion of body fat.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">👧 Children and Teenagers</h4>
              <p className="text-gray-200 text-base">
                Standard adult BMI categories do not apply to children or adolescents. For
                those under 18, healthcare providers use <strong>BMI-for-age percentiles</strong>,
                which account for normal growth patterns across different ages and biological
                sexes, as defined by the WHO Child Growth Standards.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">🌍 Ethnicity and South Asians</h4>
              <p className="text-gray-200 text-base">
                South Asian populations — including Pakistanis, Indians, and Bangladeshis —
                have been shown to develop metabolic complications like insulin resistance and
                cardiovascular disease at lower BMI values than Western populations. Adjusted
                thresholds of 23.0 for overweight and 27.5 for obese are recommended by
                several major health bodies for South Asian adults.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-orange-300 mb-3">📏 Fat Distribution</h4>
              <p className="text-gray-200 text-base">
                BMI does not indicate where fat is stored in the body. Visceral fat (stored
                around internal organs in the abdomen) is far more metabolically harmful than
                subcutaneous fat (stored under the skin). Waist circumference — above 90 cm
                for Asian men and 80 cm for Asian women — is a better predictor of cardiometabolic
                risk than BMI alone.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 7 — BMI FOR ADULTS, MEN, WOMEN, CHILDREN
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMI for Adults, Men, Women, and Children
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            BMI for Adults — Universal Ranges
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            For all adults aged 18 and over, the WHO applies the same BMI classification
            table regardless of age or sex. The five categories (Underweight, Healthy Weight,
            Overweight, Obesity Class I–III) remain constant. However, the clinical interpretation
            of BMI should always consider individual factors such as muscle mass, ethnicity,
            and waist circumference.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            BMI for Men and Women — How They Differ
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            While the BMI formula and category thresholds are the same for adult men and women,
            body composition differs significantly between the sexes:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mb-6">
            <li>
              <strong>Men</strong> naturally carry more muscle mass and less body fat. A man at
              BMI 22 might have 15–20% body fat, which is within the athletic to normal range.
            </li>
            <li>
              <strong>Women</strong> naturally carry a higher proportion of body fat — typically
              10–13% more than men — due to hormonal differences and reproductive physiology.
              A woman at BMI 22 might have 25–30% body fat, still within the normal range for
              females but much higher than an equivalent male.
            </li>
            <li>
              During <strong>menopause</strong>, women often experience a redistribution of fat
              toward the abdominal area, increasing cardiometabolic risk even without significant
              BMI change.
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            BMI for Kids and Teens — Age and Sex Percentiles
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For children and adolescents under 18, BMI is interpreted using
            <strong> age- and sex-specific percentile charts</strong>, not the fixed adult thresholds.
            The WHO and CDC define the following percentile-based categories for children:
          </p>

          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">BMI Percentile Range</th>
                  <th className="p-4 text-left font-semibold">Category (Children 2–18)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 text-blue-300">Below the 5th percentile</td>
                  <td className="p-4">Underweight</td>
                </tr>
                <tr>
                  <td className="p-4 text-green-400">5th to less than the 85th percentile</td>
                  <td className="p-4">✅ Healthy Weight</td>
                </tr>
                <tr>
                  <td className="p-4 text-yellow-300">85th to less than the 95th percentile</td>
                  <td className="p-4">⚠️ Overweight</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400">95th percentile and above</td>
                  <td className="p-4">Obese</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Paediatricians in Pakistan and worldwide use WHO Child Growth Standard charts to
            plot a child's BMI against these percentiles, accounting for both age and biological
            sex. If you are concerned about a child's BMI, always consult a qualified paediatrician.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 8 — HOW TO IMPROVE BMI
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Improve Your BMI Safely
          </h2>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
            <p className="text-gray-200 text-base italic">
              <strong>Medical disclaimer:</strong> The following is general wellness information,
              not medical advice. Always consult a qualified doctor or dietitian before making
              significant changes to your diet or exercise routine, especially if you have an
              existing health condition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-gray-800/40 p-7 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-blue-300 mb-4">
                If You Are Underweight (BMI Below 18.5)
              </h3>
              <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
                <li>
                  <strong>Calorie surplus:</strong> Aim to eat 300–500 calories more than
                  your TDEE per day using nutrient-dense whole foods.
                </li>
                <li>
                  <strong>Protein priority:</strong> Consume 1.6–2.2 g of protein per kg
                  of body weight to support lean muscle building.
                </li>
                <li>
                  <strong>Resistance training:</strong> Weight training 3–4 times per week
                  directs surplus calories into muscle rather than fat storage.
                </li>
                <li>
                  <strong>Frequent meals:</strong> Eating 5–6 smaller, calorie-dense meals
                  makes it easier to reach daily calorie goals without discomfort.
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/40 p-7 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold text-blue-300 mb-4">
                If You Are Overweight or Obese (BMI 25+)
              </h3>
              <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
                <li>
                  <strong>Moderate calorie deficit:</strong> A deficit of 300–500 kcal/day
                  produces safe, sustainable fat loss of 0.3–0.5 kg per week without
                  metabolic adaptation.
                </li>
                <li>
                  <strong>Mixed exercise:</strong> Combine 150 minutes of moderate cardio
                  (walking, cycling) per week with 2–3 resistance training sessions.
                </li>
                <li>
                  <strong>Sleep quality:</strong> Poor sleep raises cortisol and ghrelin
                  (hunger hormone), making fat loss much harder. Aim for 7–9 hours.
                </li>
                <li>
                  <strong>Hydration and protein:</strong> High protein intake (1.2–1.6 g/kg)
                  preserves muscle during a deficit. Staying well-hydrated also reduces
                  false hunger signals.
                </li>
              </ul>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mt-8">
            For a precise daily calorie target based on your activity level, use our{" "}
            <Link href="/calculators/health/tdee-calculator" className="text-blue-400 hover:underline">
              TDEE Calculator
            </Link>{" "}
            to find your Total Daily Energy Expenditure, and our{" "}
            <Link href="/calculators/health/bmr-calculator" className="text-blue-400 hover:underline">
              BMR Calculator
            </Link>{" "}
            to find the minimum calories your body needs at complete rest.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 9 — TRUST / E-E-A-T BYLINE
        ══════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-4 my-12 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control Engineering
              Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
            <span>📅 Published: Apr 1, 2026</span>
            <span>🔄 Updated: May 01, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 10 — MORE TOOLS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Explore More Health and Fitness Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Find Your Resting Calorie Burn (BMR)
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Discover exactly how many calories your body burns at complete rest using the
                Mifflin-St Jeor equation — the most accurate modern formula.
              </p>
              <Link
                href="/calculators/health/bmr-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open BMR Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Estimate Your Body Fat Percentage
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Go beyond BMI with the Navy tape measurement method — a far more actionable
                indicator of real body composition than weight alone.
              </p>
              <Link
                href="/calculators/health/body-fat-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open Body Fat Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Calculate Your Activity-Based Calorie Needs (TDEE)
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Turn your BMR into a real-world daily calorie target by factoring in your
                activity level — essential for any weight management plan.
              </p>
              <Link
                href="/calculators/health/tdee-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open TDEE Calculator →
              </Link>
            </div>
          </div>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Knowing your BMI is the first step — but it is just the beginning. Pair it with your BMR,
            body fat percentage, and TDEE to build a complete, data-driven picture of your health.
            Our free tools are fast, accurate, completely private, and built for real people in
            Sahiwal, across Pakistan, and around the world. Bookmark this page and take control
            of your health — one precise calculation at a time!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}