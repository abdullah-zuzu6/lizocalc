import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedBMRCalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "What is a good BMR?",
    answer:
      "A 'good' BMR depends entirely on your body size, age, and sex. As a general reference, most adult men have a BMR between 1,600 and 1,900 calories per day, while most adult women range from 1,300 to 1,600 calories per day. A higher BMR typically means you burn more calories at rest — usually because you have more lean muscle mass. Rather than chasing a 'high' BMR, focus on understanding your own number and using it to set accurate calorie targets.",
  },
  {
    question: "How do I calculate BMR manually?",
    answer:
      "Use the Mifflin-St Jeor equation — the most accurate modern formula. For men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5. For women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) − 161. Example for a 25-year-old male, 70 kg, 175 cm: (10×70) + (6.25×175) − (5×25) + 5 = 700 + 1,093.75 − 125 + 5 = 1,673.75 calories per day.",
  },
  {
    question: "Is a higher BMR better?",
    answer:
      "Not necessarily. A higher BMR means your body burns more calories at rest, which can make it slightly easier to maintain a healthy weight. However, BMR is just one factor. What matters most is that your total calorie intake (TDEE) aligns with your health goals — whether that is weight loss, maintenance, or muscle gain. People with high BMR can still gain body fat if they consistently eat above their TDEE.",
  },
  {
    question: "What is the difference between BMR and BMI?",
    answer:
      "BMR (Basal Metabolic Rate) measures how many calories your body burns at complete rest per day — it is an energy metric. BMI (Body Mass Index) is a ratio of weight to height that categorises whether your weight falls in the underweight, healthy, overweight, or obese range — it is a body composition screening tool. They measure very different things. BMR tells you about your calorie needs; BMI tells you about your weight category relative to height.",
  },
  {
    question: "Does age affect BMR?",
    answer:
      "Yes. BMR declines approximately 1–2% per decade after the age of 20. The primary reason is sarcopenia — the gradual, age-related loss of skeletal muscle mass. Since muscle tissue burns significantly more calories at rest than fat tissue, losing muscle directly reduces BMR. Hormonal changes, particularly declining levels of testosterone and growth hormone, also contribute. Regular strength training is the most effective way to slow this decline.",
  },
  {
    question: "How many calories should I eat based on my BMR?",
    answer:
      "You should never eat at or below your BMR for extended periods, as this risks triggering metabolic adaptation ('starvation mode'). Instead, calculate your TDEE by multiplying your BMR by your activity level (e.g., BMR × 1.2 for sedentary, × 1.55 for moderately active). For weight loss, subtract 300–500 calories from your TDEE. For maintenance, eat at your TDEE. For muscle gain, add 300–500 calories above your TDEE.",
  },
  {
    question: "Can I lose weight using BMR?",
    answer:
      "Yes — BMR is the starting point for any evidence-based weight loss plan. Calculate your TDEE (BMR × activity multiplier), then create a moderate calorie deficit of 300–500 kcal/day below your TDEE. This produces safe fat loss of approximately 0.3–0.5 kg per week without sacrificing muscle mass or crashing your metabolism. Never eat below your BMR without medical supervision, as it slows metabolism and leads to nutrient deficiencies.",
  },
  {
    question: "What is Basal Metabolic Rate (BMR) and how is it calculated?",
    answer:
      "BMR is the minimum number of calories your body needs to function while at complete rest — covering vital processes like breathing, circulation, cell repair, and temperature regulation. The most accurate modern formula is the Mifflin-St Jeor Equation. For men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) − 161.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is the energy burned at complete rest — your metabolic 'idle speed'. TDEE (Total Daily Energy Expenditure) accounts for all calories burned including physical activity, digestion, and daily movement. To find your TDEE, multiply your BMR by an activity factor: 1.2 for sedentary, 1.375 for light activity, 1.55 for moderate activity, 1.725 for very active, and 1.9 for extremely active. TDEE is the number you should base all weight management decisions on.",
  },
  {
    question: "Does caffeine or spicy food actually speed up BMR?",
    answer:
      "Caffeine and capsaicin (found in peppers) can cause a temporary thermogenic effect, increasing calorie burn by roughly 5–8% for a short window of time. However, the body adapts quickly, especially with regular caffeine consumption. These effects are minor at best and cannot substitute for consistent resistance training and a balanced diet for long-term metabolic health.",
  },
];

export const metadata: Metadata = {
  title: "BMR Calculator – Calculate Your Basal Metabolic Rate Accurately",
  description:
    "Use our free BMR calculator to find your Basal Metabolic Rate using the Mifflin-St Jeor equation. Includes TDEE multipliers, weight goal calorie tables, BMR by age charts, and the male and female formula explained.",

  keywords: [
    "bmr calculator",
    "basal metabolic rate calculator",
    "calculate bmr",
    "bmr formula",
    "mifflin st jeor equation",
    "resting metabolic rate",
    "daily calorie needs calculator",
    "bmr and tdee calculator",
    "how to calculate bmr",
    "bmr calculator pakistan",
    "lizocalc bmr tool",
    "metabolic rate for weight loss",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/bmr-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "BMR Calculator – Basal Metabolic Rate & Daily Calorie Needs",
    description:
      "Find out exactly how many calories your body burns at rest. Includes Mifflin-St Jeor formula, TDEE activity multipliers, and weight goal calorie targets.",
    url: "https://www.lizocalc.com/calculators/health/bmr-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator – Precise Basal Metabolic Rate & Resting Calories",
    description:
      "Instantly calculate your BMR using the Mifflin-St Jeor equation. Includes TDEE multipliers, weight goal targets, and BMR by age and weight reference tables.",
  },
};

export default function BMRPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT === */}
      <Script
        id="structured-data-bmr-calculator"
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
                  "https://www.lizocalc.com/calculators/health/bmr-calculator#breadcrumb",
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
                    name: "BMR Calculator",
                    item: "https://www.lizocalc.com/calculators/health/bmr-calculator",
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
                  "BMR Calculation",
                  "Metabolism",
                  "Calorie Needs",
                  "Mifflin-St Jeor Equation",
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
                founder: { "@id": "https://www.lizocalc.com/#author" },
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
                publisher: { "@id": "https://www.lizocalc.com/#org" },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmr-calculator",
                url: "https://www.lizocalc.com/calculators/health/bmr-calculator",
                name: "BMR Calculator – Calculate Your Basal Metabolic Rate Accurately",
                description:
                  "Use our free BMR calculator to find your Basal Metabolic Rate using the Mifflin-St Jeor equation. Includes TDEE multipliers, weight goal calorie tables, and BMR by age reference charts.",
                inLanguage: "en",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator#app",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator#app",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp#image",
                },
                author: { "@id": "https://www.lizocalc.com/#author" },
                publisher: { "@id": "https://www.lizocalc.com/#org" },
                isPartOf: { "@id": "https://www.lizocalc.com/#website" },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmr-calculator#app",
                name: "BMR Calculator",
                url: "https://www.lizocalc.com/calculators/health/bmr-calculator",
                description:
                  "Free BMR calculator using the Mifflin-St Jeor equation to determine daily resting calorie needs with TDEE activity multipliers and weight goal targets.",
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator",
                },
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp#image",
                },
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMR Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor",
                  "Instant daily, monthly, and yearly calorie estimates",
                  "Gender-specific formula constants for accuracy",
                  "Metric units (kg, cm) — perfect for Pakistan",
                  "Intuitive sliders with live result updates",
                  "Reset for quick family or client comparisons",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: { "@id": "https://www.lizocalc.com/#org" },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/health/bmr-calculator",
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmr-calculator#howto",
                name: "How to Calculate Your Basal Metabolic Rate",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator",
                },
                description:
                  "Step-by-step guide to calculating your BMR using the LizoCalc BMR Calculator",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Select your biological gender",
                    text: "Choose Male or Female using the toggle — this applies the correct Mifflin-St Jeor constant (+5 for men, −161 for women) for accurate results.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Set your age",
                    text: "Slide the Age handle to your current age in years. Age directly affects BMR due to gradual muscle loss over time.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter your weight in kg",
                    text: "Adjust the Weight slider to your current body weight in kilograms. Weigh yourself in the morning for the most accurate reading.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Enter your height in cm",
                    text: "Move the Height slider to your height in centimetres. Measure without shoes standing straight against a wall.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Read your instant results",
                    text: "Your daily BMR, monthly estimate, and yearly projection appear instantly — ready to use for diet planning, calorie tracking, or TDEE calculation.",
                  },
                ],
              },

              /* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/health/bmr-calculator#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/health/bmr-calculator",
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
                  "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp#image",
                url: "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp",
                name: "Basal Metabolic Rate Infographic — Energy Consumption by Organ System at Rest",
                caption:
                  "Detailed BMR infographic showing how major organs — brain (20%), liver (21–25%), skeletal muscle (15–22%), heart (9–10%), kidneys (7–8%), and digestive system (10%) — consume resting energy, plus key factors affecting BMR.",
                description:
                  "An anatomical BMR infographic illustrating the percentage of resting calories consumed by each major organ system, the five primary factors affecting BMR (age, gender, body composition, genetics, and hormones), and the relationship between BMR, cellular processes, and daily calorie needs.",
                width: 1200,
                height: 750,
                contentUrl:
                  "https://www.lizocalc.com/images/health/bmr-metabolism-calculator.webp",
                encodingFormat: "image/webp",
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
              BMR Calculator – Calculate Your Basal Metabolic Rate
            </h1>
          </div>
          <p className="text-gray-300 mt-3 text-lg">
            Calculate how many calories your body burns at complete rest using
            age, gender, height, and weight.
          </p>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMRCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── DIRECT ANSWER BOX (AI Overview trigger) ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: What Is BMR?
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            <strong>BMR (Basal Metabolic Rate)</strong> is the number of calories
            your body needs daily to maintain basic life functions — breathing,
            circulation, cell repair, and temperature regulation — while at
            complete rest. For most adults, BMR accounts for{" "}
            <strong>60–70% of total daily calorie burn</strong>. Use the
            Mifflin-St Jeor formula:{" "}
            <strong>
              Men: BMR = 10W + 6.25H − 5A + 5 · Women: BMR = 10W + 6.25H −
              5A − 161
            </strong>{" "}
            (W = weight kg, H = height cm, A = age years).
          </p>
        </div>

        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Basal Metabolic Rate (BMR)</strong> — also called resting
          metabolic rate, resting calorie burn, or metabolic baseline — is the
          single most important number for anyone serious about managing their
          weight, planning their nutrition, or understanding how their body uses
          energy. Your BMR is the number of calories your body burns every 24
          hours simply to stay alive: heart pumping, lungs breathing, kidneys
          filtering, brain functioning — all while you lie completely still.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>BMR calculator</strong> uses the gold-standard
          Mifflin-St Jeor equation to deliver your precise daily, monthly, and
          yearly resting calorie estimates in seconds. Simply select your gender,
          slide your age, weight, and height, and get instant live results.
          Mobile-friendly, ad-free, 100% private, and built with metric units
          perfectly suited for Pakistan. Whether you are planning your diet in
          Sahiwal, tracking calories for a fitness goal, or using it in a
          nutrition class — this is the tool. Jump right in and try it now on
          our{" "}
          <Link
            href="/calculators/health/bmr-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            BMR calculator page
          </Link>
          .
        </p>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — WHAT IS BMR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is BMR (Basal Metabolic Rate)?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            <strong>Basal Metabolic Rate (BMR)</strong> is the minimum number of
            calories your body burns per day to sustain essential life processes
            while in a state of complete rest — no movement, no food digestion,
            no exercise. It represents the energy cost of simply being alive:
            keeping your heart beating, lungs breathing, maintaining body
            temperature, producing hormones, repairing cells, and powering your
            brain.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For most adults, BMR accounts for approximately{" "}
            <strong>60–70% of total daily energy expenditure</strong> — making
            it by far the largest single component of calorie burn, even for
            people who exercise regularly. This means your body burns the
            majority of its daily calories before you even get out of bed.
          </p>

          {/* BMR Infographic Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/health/bmr-metabolism-calculator.webp"
                alt="Basal Metabolic Rate infographic showing energy consumption by organ: brain 20%, liver 21–25%, skeletal muscle 15–22%, heart 9–10%, kidneys 7–8%, digestive system 10% — along with the five factors affecting BMR: age, gender, body composition, genetics, hormones"
                className="w-full object-cover"
                width={1200}
                height={750}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3">
              <p className="text-gray-200 text-base leading-relaxed">
                The infographic above shows exactly how your resting calories are
                distributed across organ systems. Your{" "}
                <strong>liver alone consumes 21–25% of your BMR</strong> —
                running metabolism, detox, and energy storage around the clock.
                The brain takes another 20%. Together with the heart, kidneys,
                digestive system, and skeletal muscle, these organs account for
                your entire resting energy expenditure — 24 hours a day, 7 days
                a week, even while you sleep.
              </p>
              <p className="text-gray-200 text-base leading-relaxed">
                The five key factors affecting BMR are: <strong>age</strong>,{" "}
                <strong>gender</strong>, <strong>body composition</strong>,{" "}
                <strong>genetics</strong>, and <strong>hormones</strong> — all
                captured by the Mifflin-St Jeor formula used in this calculator.
              </p>
            </div>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base font-medium leading-relaxed">
              <strong>Key insight:</strong> Your body burns calories even while
              you are sleeping — this is your BMR at work. A person with a BMR
              of 1,700 cal/day burns roughly 70 calories per hour doing
              absolutely nothing. Understanding this number is the foundation of
              every evidence-based nutrition and weight management plan.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — BMR FORMULA
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR Formula — The Mifflin-St Jeor Equation Explained
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Our calculator uses the <strong>Mifflin-St Jeor equation</strong> —
            the most accurate and widely validated BMR formula available today,
            recommended by major dietetic associations worldwide including the
            Academy of Nutrition and Dietetics. It was developed in 1990 and
            shown to be significantly more accurate than older formulas for
            modern, diverse populations.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Mifflin-St Jeor Formula for Men
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR (male) = (10 × W) + (6.25 × H) − (5 × A) + 5
            <br />
            <br />
            Where:
            <br />
            W = weight in kilograms (kg)
            <br />
            H = height in centimetres (cm)
            <br />
            A = age in years
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Mifflin-St Jeor Formula for Women
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR (female) = (10 × W) + (6.25 × H) − (5 × A) − 161
            <br />
            <br />
            Where:
            <br />
            W = weight in kilograms (kg)
            <br />
            H = height in centimetres (cm)
            <br />
            A = age in years
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The only difference between the male and female formulas is the
            final constant: <strong>+5 for men</strong> and{" "}
            <strong>−161 for women</strong>. This accounts for physiological
            differences in average body composition — men carry proportionally
            more muscle mass, which raises resting calorie burn.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            What Each Term in the Formula Means
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Formula Term</th>
                  <th className="p-4 text-left font-semibold">What It Represents</th>
                  <th className="p-4 text-left font-semibold">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-green-300">10 × W</td>
                  <td className="p-4">10 calories per kg of body weight</td>
                  <td className="p-4">Reflects total tissue mass — organs, muscle, fat, and bone</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">6.25 × H</td>
                  <td className="p-4">6.25 calories per cm of height</td>
                  <td className="p-4">Taller people have more surface area and organ volume</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">−5 × A</td>
                  <td className="p-4">Subtract 5 calories per year of age</td>
                  <td className="p-4">Captures natural metabolic slowdown due to muscle loss with age</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">+5 (men)</td>
                  <td className="p-4">Male-specific constant</td>
                  <td className="p-4">Accounts for higher average muscle mass and testosterone levels</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">−161 (women)</td>
                  <td className="p-4">Female-specific constant</td>
                  <td className="p-4">Reflects lower average muscle mass and different hormonal profile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Harris-Benedict Equation — The Older Alternative
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Before Mifflin-St Jeor, the{" "}
            <strong>Harris-Benedict equation</strong> (originally 1919, revised
            1984) was the dominant BMR formula. It is still commonly referenced
            in older textbooks and some online tools. While less accurate for
            modern populations, it broadens your understanding of how BMR
            formulas have evolved:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-yellow-300 text-sm mb-6 overflow-x-auto">
            Harris-Benedict (Men) = 88.362 + (13.397 × W) + (4.799 × H) − (5.677 × A)
            <br />
            Harris-Benedict (Women) = 447.593 + (9.247 × W) + (3.098 × H) − (4.330 × A)
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Studies comparing both formulas consistently show Mifflin-St Jeor
            has a prediction error of approximately ±10%, versus ±15–20% for
            Harris-Benedict — especially for overweight and obese individuals.
            Our calculator uses Mifflin-St Jeor as the default for this reason.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — WORKED EXAMPLE
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Manual BMR Calculation — Step-by-Step Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Example 1: Male, 70 kg, 175 cm, Age 25
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR = (10 × 70) + (6.25 × 175) − (5 × 25) + 5
            <br />
            BMR = 700 + 1,093.75 − 125 + 5
            <br />→ <strong>BMR = 1,673.75 cal/day</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example 2: Female, 60 kg, 160 cm, Age 30
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR = (10 × 60) + (6.25 × 160) − (5 × 30) − 161
            <br />
            BMR = 600 + 1,000 − 150 − 161
            <br />→ <strong>BMR = 1,289 cal/day</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Common BMR Examples — Quick Reference Table
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below provides pre-calculated BMR values for the most
            commonly searched combinations of weight, height, age, and gender —
            using the Mifflin-St Jeor equation:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Gender</th>
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">Height</th>
                  <th className="p-4 text-left font-semibold">Age</th>
                  <th className="p-4 text-left font-semibold">BMR (cal/day)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Male</td>
                  <td className="p-4">70 kg</td>
                  <td className="p-4">175 cm</td>
                  <td className="p-4">25</td>
                  <td className="p-4 font-bold text-green-400">1,674</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Male</td>
                  <td className="p-4">75 kg</td>
                  <td className="p-4">175 cm</td>
                  <td className="p-4">30</td>
                  <td className="p-4 font-bold text-green-400">1,699</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Male</td>
                  <td className="p-4">80 kg</td>
                  <td className="p-4">178 cm</td>
                  <td className="p-4">35</td>
                  <td className="p-4 font-bold text-green-400">1,763</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Male</td>
                  <td className="p-4">90 kg</td>
                  <td className="p-4">180 cm</td>
                  <td className="p-4">40</td>
                  <td className="p-4 font-bold text-green-400">1,855</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-pink-300">Female</td>
                  <td className="p-4">55 kg</td>
                  <td className="p-4">160 cm</td>
                  <td className="p-4">25</td>
                  <td className="p-4 font-bold text-green-400">1,289</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-pink-300">Female</td>
                  <td className="p-4">60 kg</td>
                  <td className="p-4">163 cm</td>
                  <td className="p-4">30</td>
                  <td className="p-4 font-bold text-green-400">1,357</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-pink-300">Female</td>
                  <td className="p-4">65 kg</td>
                  <td className="p-4">165 cm</td>
                  <td className="p-4">35</td>
                  <td className="p-4 font-bold text-green-400">1,389</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-pink-300">Female</td>
                  <td className="p-4">70 kg</td>
                  <td className="p-4">168 cm</td>
                  <td className="p-4">40</td>
                  <td className="p-4 font-bold text-green-400">1,424</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — ACTIVITY MULTIPLIERS / TDEE
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Maintenance Calories From BMR — TDEE Activity
            Multipliers
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            BMR alone tells you your resting calorie floor. To find your{" "}
            <strong>Total Daily Energy Expenditure (TDEE)</strong> — the actual
            number of calories you burn in a real day including all movement and
            activity — multiply your BMR by the appropriate activity factor
            below. TDEE is the number all weight management decisions should be
            based on, not BMR alone.
          </p>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <p className="text-green-300 font-mono text-base font-semibold">
              TDEE = BMR × Activity Multiplier
            </p>
          </div>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Activity Level</th>
                  <th className="p-4 text-left font-semibold">Multiplier</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                  <th className="p-4 text-left font-semibold">Example (BMR 1,700)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Sedentary</td>
                  <td className="p-4 font-bold text-blue-300">× 1.2</td>
                  <td className="p-4">Desk job, little or no exercise, mostly sitting</td>
                  <td className="p-4 font-bold text-green-400">2,040 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Lightly Active</td>
                  <td className="p-4 font-bold text-blue-300">× 1.375</td>
                  <td className="p-4">Light exercise 1–3 days/week, walking ~5,000 steps</td>
                  <td className="p-4 font-bold text-green-400">2,338 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Moderately Active</td>
                  <td className="p-4 font-bold text-blue-300">× 1.55</td>
                  <td className="p-4">Moderate exercise or gym 3–5 days/week</td>
                  <td className="p-4 font-bold text-green-400">2,635 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Very Active</td>
                  <td className="p-4 font-bold text-blue-300">× 1.725</td>
                  <td className="p-4">Hard training 6–7 days/week or physical job</td>
                  <td className="p-4 font-bold text-green-400">2,933 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Extra Active</td>
                  <td className="p-4 font-bold text-blue-300">× 1.9</td>
                  <td className="p-4">Athlete, daily intense training, heavy labour job</td>
                  <td className="p-4 font-bold text-green-400">3,230 cal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Real Example: Finding TDEE from BMR
            </h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Male · 70 kg · 175 cm · Age 25 → BMR = 1,674 cal/day
              <br />
              Activity: Moderately Active (gym 4×/week) → × 1.55
              <br />
              TDEE = 1,674 × 1.55 = <strong>2,595 cal/day</strong>
              <br />
              <br />
              This is the number to base all calorie decisions on.
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            For the full activity-level calorie calculation with all five
            multipliers applied automatically, use our dedicated{" "}
            <Link
              href="/calculators/health/tdee-calculator"
              className="text-blue-400 hover:underline"
            >
              TDEE Calculator
            </Link>
            .
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — WEIGHT GOALS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calories for Weight Loss, Maintenance, and Muscle Gain
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Once you have your TDEE, use it directly to set your daily calorie
            target based on your specific health goal. The table below shows the
            evidence-based calorie adjustments used by nutritionists and
            dietitians worldwide:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Goal</th>
                  <th className="p-4 text-left font-semibold">Daily Calories</th>
                  <th className="p-4 text-left font-semibold">Weekly Result</th>
                  <th className="p-4 text-left font-semibold">Example (TDEE 2,500)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-red-400">Aggressive Fat Loss</td>
                  <td className="p-4">TDEE − 750</td>
                  <td className="p-4">~0.7 kg fat lost/week</td>
                  <td className="p-4 font-bold text-orange-300">1,750 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">Moderate Fat Loss</td>
                  <td className="p-4">TDEE − 500</td>
                  <td className="p-4">~0.5 kg fat lost/week</td>
                  <td className="p-4 font-bold text-green-400">2,000 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">Mild Fat Loss</td>
                  <td className="p-4">TDEE − 250</td>
                  <td className="p-4">~0.25 kg fat lost/week</td>
                  <td className="p-4 font-bold text-green-400">2,250 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">✅ Maintenance</td>
                  <td className="p-4">TDEE</td>
                  <td className="p-4">Weight stable</td>
                  <td className="p-4 font-bold text-green-400">2,500 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">Lean Muscle Gain</td>
                  <td className="p-4">TDEE + 300</td>
                  <td className="p-4">~0.25 kg muscle/week</td>
                  <td className="p-4 font-bold text-blue-300">2,800 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">Muscle Gain (Bulk)</td>
                  <td className="p-4">TDEE + 500</td>
                  <td className="p-4">~0.5 kg/week (some fat)</td>
                  <td className="p-4 font-bold text-blue-300">3,000 cal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base font-medium leading-relaxed">
              <strong>Critical rule:</strong> Never eat below your BMR for
              extended periods. Eating below BMR can trigger metabolic
              adaptation — your body lowers its resting calorie burn to conserve
              energy, making long-term weight loss progressively harder. The
              safe floor for most adults is 1,200 cal/day for women and 1,500
              cal/day for men.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — BMR BY AGE AND WEIGHT REFERENCE TABLES
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR by Age and Weight — Reference Tables
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Average BMR by Age Group
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below shows average BMR ranges by age group based on
            typical height and weight distributions for adult men and women. Use
            this to see where your BMR sits relative to your peers:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Age Group</th>
                  <th className="p-4 text-left font-semibold">Average BMR — Male</th>
                  <th className="p-4 text-left font-semibold">Average BMR — Female</th>
                  <th className="p-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">18–25</td>
                  <td className="p-4 font-bold text-green-400">1,700 – 1,900 cal</td>
                  <td className="p-4 font-bold text-green-400">1,400 – 1,600 cal</td>
                  <td className="p-4 text-gray-400">Peak muscle mass years</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">26–35</td>
                  <td className="p-4 font-bold text-green-400">1,650 – 1,850 cal</td>
                  <td className="p-4 font-bold text-green-400">1,350 – 1,550 cal</td>
                  <td className="p-4 text-gray-400">Slight decline begins</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">36–50</td>
                  <td className="p-4 font-bold text-yellow-300">1,550 – 1,750 cal</td>
                  <td className="p-4 font-bold text-yellow-300">1,250 – 1,450 cal</td>
                  <td className="p-4 text-gray-400">Muscle loss accelerates</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">51–65</td>
                  <td className="p-4 font-bold text-orange-400">1,450 – 1,650 cal</td>
                  <td className="p-4 font-bold text-orange-400">1,150 – 1,350 cal</td>
                  <td className="p-4 text-gray-400">Hormonal changes (menopause, andropause)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">65+</td>
                  <td className="p-4 font-bold text-orange-400">1,300 – 1,550 cal</td>
                  <td className="p-4 font-bold text-orange-400">1,050 – 1,250 cal</td>
                  <td className="p-4 text-gray-400">Significant sarcopenia risk</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Approximate BMR by Body Weight — Male Reference (Age 30, 175 cm)
          </h3>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Body Weight</th>
                  <th className="p-4 text-left font-semibold">Approx BMR (Male)</th>
                  <th className="p-4 text-left font-semibold">Sedentary TDEE (×1.2)</th>
                  <th className="p-4 text-left font-semibold">Moderate TDEE (×1.55)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">50 kg</td>
                  <td className="p-4 font-bold text-green-400">1,355 cal</td>
                  <td className="p-4">1,626 cal</td>
                  <td className="p-4">2,100 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">60 kg</td>
                  <td className="p-4 font-bold text-green-400">1,455 cal</td>
                  <td className="p-4">1,746 cal</td>
                  <td className="p-4">2,255 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">70 kg</td>
                  <td className="p-4 font-bold text-green-400">1,555 cal</td>
                  <td className="p-4">1,866 cal</td>
                  <td className="p-4">2,410 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">80 kg</td>
                  <td className="p-4 font-bold text-green-400">1,655 cal</td>
                  <td className="p-4">1,986 cal</td>
                  <td className="p-4">2,565 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">90 kg</td>
                  <td className="p-4 font-bold text-green-400">1,755 cal</td>
                  <td className="p-4">2,106 cal</td>
                  <td className="p-4">2,720 cal</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">100 kg</td>
                  <td className="p-4 font-bold text-green-400">1,855 cal</td>
                  <td className="p-4">2,226 cal</td>
                  <td className="p-4">2,875 cal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 7 — BMR vs TDEE
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR vs TDEE — What&apos;s the Difference?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            BMR and TDEE are both calorie measurements, but they answer
            completely different questions. Confusing them is one of the most
            common mistakes people make when planning their nutrition:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Metric</th>
                  <th className="p-4 text-left font-semibold">Full Name</th>
                  <th className="p-4 text-left font-semibold">What It Measures</th>
                  <th className="p-4 text-left font-semibold">Use This For</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-blue-300">BMR</td>
                  <td className="p-4">Basal Metabolic Rate</td>
                  <td className="p-4">Calories burned at complete rest — zero movement, zero digestion</td>
                  <td className="p-4">Understanding your metabolic baseline · Never eat below this</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">TDEE</td>
                  <td className="p-4">Total Daily Energy Expenditure</td>
                  <td className="p-4">All calories burned in a real day including activity and digestion</td>
                  <td className="p-4">Setting weight loss, maintenance, or muscle gain calorie targets</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Real-World Comparison: Same Person, Different Numbers
            </h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Male · 75 kg · 175 cm · Age 30
              <br />
              BMR = 1,699 cal/day (resting, bed-bound all day)
              <br />
              <br />
              This same person at different activity levels:
              <br />
              Sedentary office job → TDEE = 1,699 × 1.2 = <strong>2,039 cal</strong>
              <br />
              Gym 4×/week → TDEE = 1,699 × 1.55 = <strong>2,633 cal</strong>
              <br />
              Daily training → TDEE = 1,699 × 1.725 = <strong>2,931 cal</strong>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            The difference between a sedentary and very active lifestyle adds
            nearly <strong>900 calories of daily burn</strong> for the same
            person with the same BMR. This is why activity level matters
            enormously for weight management, and why using BMR alone — without
            the TDEE multiplier — leads to underestimating true calorie needs.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 8 — FACTORS AFFECTING BMR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Affects Your BMR? — 6 Key Factors
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-8">
            Your BMR is not fixed — it is influenced by multiple biological and
            physiological factors. Understanding what drives your metabolic rate
            up or down empowers you to make smarter health decisions:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                🎂 Age
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                BMR declines approximately <strong>1–2% per decade</strong>{" "}
                after age 20. The primary driver is sarcopenia — the gradual
                loss of skeletal muscle that begins in your late 20s and
                accelerates after 50. Less muscle means fewer calories burned
                at rest. Hormonal changes (declining testosterone and growth
                hormone) further reduce metabolic rate with age.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                ⚥ Gender
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Men have higher BMR than women of the same height, weight, and
                age — primarily because men carry a higher proportion of lean
                muscle mass and have higher testosterone levels. Women naturally
                carry more body fat, which is less metabolically active than
                muscle. This difference is captured in the Mifflin-St Jeor
                constants (+5 for men, −161 for women).
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                💪 Muscle Mass (Body Composition)
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Muscle tissue burns significantly more calories at rest than fat
                tissue — roughly <strong>6 kcal per kg of muscle per day</strong>{" "}
                versus about 2 kcal per kg of fat. This is why two people of
                identical weight but different body compositions can have BMRs
                that differ by 200–400 calories per day. Building muscle is the
                single most effective way to raise your BMR permanently.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                ⚖️ Body Weight and Height
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Larger bodies — whether taller or heavier — require more energy
                to maintain. Every extra kilogram of body weight adds
                approximately <strong>10 calories per day</strong> to BMR, and
                every extra centimetre of height adds about{" "}
                <strong>6.25 calories</strong>. This is why BMR scales up with
                body size regardless of body fat percentage.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                🧬 Genetics
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Genetic factors account for an estimated{" "}
                <strong>40–80% of variability</strong> in resting metabolic
                rate between individuals of similar size and composition.
                Variations in genes controlling thyroid hormone production,
                mitochondrial efficiency, and lean mass distribution all
                influence BMR. You cannot change your genetics, but you can
                maximise what you have through training and nutrition.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                🔬 Hormones
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Thyroid hormones (T3 and T4) are the master regulators of
                metabolic rate. Hypothyroidism (underactive thyroid) can reduce
                BMR by 30–40%. Hyperthyroidism raises it significantly.
                Cortisol (stress hormone), insulin, leptin, and sex hormones
                (testosterone, oestrogen) all modulate how efficiently your
                body burns calories at rest. If you suspect a hormonal issue,
                consult an endocrinologist.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 9 — HOW TO INCREASE BMR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Increase BMR Naturally — Evidence-Based Methods
          </h2>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
            <p className="text-gray-200 text-base italic">
              <strong>Note:</strong> There are no "metabolism hacks" that
              produce meaningful, lasting BMR increases overnight. The methods
              below are all evidence-based and produce real, measurable results
              over weeks and months. Avoid clickbait supplements and
              unsubstantiated "superfoods."
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              1. Resistance Training — The Most Effective Method
            </h3>
            <p className="text-gray-200 text-base leading-relaxed mb-4">
              Building lean muscle is the only reliable way to permanently raise
              your BMR. Every kilogram of new muscle you add burns approximately{" "}
              <strong>13 additional calories per day at rest</strong>. While
              this sounds small, adding 5 kg of muscle through consistent
              training (achievable in 1–2 years for most people) raises your
              resting burn by around 65 calories per day — or 24,000 calories
              per year. For anyone in Sahiwal or across Pakistan with access to
              a gym, progressive overload resistance training 3–4 times per week
              is the single best long-term metabolic investment.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                🥩 High Protein Intake
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Protein has the highest <em>thermic effect of food</em> — your
                body burns 20–30% of protein calories just to digest it, versus
                5–10% for carbohydrates and 0–3% for fat. Consuming 1.6–2.2 g
                of protein per kg of bodyweight daily also supports muscle
                repair and synthesis, indirectly raising BMR through lean mass
                preservation.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                😴 Quality Sleep — 7 to 9 Hours
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Chronic sleep deprivation (under 6 hours) reduces BMR,
                increases cortisol and ghrelin (hunger hormone), and promotes
                fat storage — even with identical calorie intake. Growth
                hormone — a key driver of muscle synthesis and fat
                mobilisation — is released primarily during deep sleep. Poor
                sleep is one of the most underappreciated causes of metabolic
                slowdown.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                💧 Adequate Hydration
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Even mild dehydration (1–2% of body weight) can reduce
                metabolic rate. Studies have shown that drinking 500 ml of cold
                water can temporarily boost BMR by 24–30% for 60–90 minutes —
                partly due to the thermogenic effect of warming the water to
                body temperature. Aim for 2.5–3.5 litres per day depending on
                climate and activity, particularly important in Sahiwal&apos;s
                hot summers.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                🚶 Avoid Prolonged Sedentary Behaviour
              </h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Extended sitting suppresses an enzyme called lipoprotein lipase
                (LPL) that regulates fat metabolism. Regular movement breaks —
                even standing up and walking for 2–5 minutes every hour — help
                maintain metabolic rate throughout the day. This is especially
                important for Pakistani office workers and students who may sit
                for 8–10 hours daily.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 10 — HOW TO USE THE CALCULATOR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the BMR Calculator — Step-by-Step
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Using the Parameters Panel in 60 Seconds
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>
                Open the BMR calculator and locate the clean{" "}
                <strong>Parameters Panel</strong> on the left (desktop) or top
                (mobile).
              </li>
              <li>
                Select your biological gender using the large toggle — this
                applies the correct Mifflin-St Jeor constant (+5 male, −161
                female).
              </li>
              <li>
                Slide the <strong>Age</strong> handle to your current age in
                years. The result updates live with every adjustment.
              </li>
              <li>
                Adjust the <strong>Weight</strong> slider to your body weight in
                kilograms. Weigh yourself in the morning before eating for the
                most consistent reading.
              </li>
              <li>
                Move the <strong>Height</strong> slider to your height in
                centimetres. Measure without shoes, standing straight.
              </li>
              <li>
                Read your <strong>Daily BMR</strong>, Monthly estimate, and
                Yearly projection instantly — all three update simultaneously
                with no Calculate button needed.
              </li>
              <li>
                Hit <strong>Reset</strong> to clear all fields and start fresh —
                ideal for comparing family members or testing different
                weight/muscle-gain scenarios.
              </li>
            </ol>
            <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
              Pro tip: The calculator auto-validates inputs and prevents
              unrealistic values (e.g., weight below 20 kg), so you can focus on
              your health goals instead of fighting the interface.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Understanding Daily, Monthly, and Yearly BMR Estimates
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The calculator returns three time-frame projections automatically:
          </p>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Output</th>
                  <th className="p-4 text-left font-semibold">Formula</th>
                  <th className="p-4 text-left font-semibold">Example (BMR 1,700)</th>
                  <th className="p-4 text-left font-semibold">Best Used For</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-green-400">Daily BMR</td>
                  <td className="p-4 font-mono text-sm">Mifflin-St Jeor output</td>
                  <td className="p-4 font-bold">1,700 cal</td>
                  <td className="p-4">Daily diet planning, calorie floor</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">Monthly BMR</td>
                  <td className="p-4 font-mono text-sm">Daily × 30.44</td>
                  <td className="p-4 font-bold">51,748 cal</td>
                  <td className="p-4">Grocery budgeting, monthly tracking</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">Yearly BMR</td>
                  <td className="p-4 font-mono text-sm">Daily × 365.25</td>
                  <td className="p-4 font-bold">620,925 cal</td>
                  <td className="p-4">Long-term fitness goal projection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── TRUST / E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 my-12 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control
              Engineering Student ·{" "}
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
            SECTION 11 — MORE TOOLS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Explore More Health and Fitness Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Check Your Body Mass Index (BMI)
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Instantly see if you fall in the underweight, normal, overweight,
                or obese category according to WHO and Pakistani health
                guidelines. Includes a full BMI chart by height and weight.
              </p>
              <Link
                href="/calculators/health/bmi-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open BMI Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Estimate Your Body Fat Percentage
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Using the Navy tape measurement method — far more actionable
                than BMI alone for real body composition tracking and fat loss
                monitoring.
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
                Turn your BMR into a real-world daily calorie target with five
                activity levels — essential for weight loss, maintenance, or
                muscle gain planning.
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
            Your BMR is the foundation of every smart health and nutrition
            decision. Our free BMR calculator is fast, accurate, completely
            private, and built for real people in Sahiwal, across Pakistan, and
            around the world. Bookmark it today and take full control of your
            metabolism, weight goals, and long-term fitness — one precise
            calculation at a time!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}