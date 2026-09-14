import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import AdvancedBMRCalculator from "./clientside";
import Image from "next/image";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "What is a good BMR?",
    answer:
      "There's no universal 'good' BMR — it depends on your body size, age, and sex. Most adult men land between 1,600 and 1,900 calories a day at rest, and most adult women land between 1,300 and 1,600. A higher number usually just means more lean muscle, not better health. Your own BMR matters more as a planning input than as a score to chase.",
  },
  {
    question: "How do I calculate BMR manually?",
    answer:
      "Use the Mifflin-St Jeor equation. For men: BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age) + 5. For women: subtract 161 instead of adding 5. Example: a 25-year-old man, 70 kg, 175 cm comes out to (10×70) + (6.25×175) − (5×25) + 5 = 1,673.75 calories a day.",
  },
  {
    question: "Is a higher BMR better?",
    answer:
      "Not automatically. A higher BMR burns more at rest, which can make weight maintenance a little easier, but it's only one input. What actually decides your weight is whether your total intake matches your TDEE. Someone with a high BMR can still gain fat by eating consistently above it.",
  },
  {
    question: "What is the difference between BMR and BMI?",
    answer:
      "BMR measures energy — how many calories your body burns at complete rest each day. BMI measures a ratio of weight to height and sorts you into underweight, healthy, overweight, or obese categories. One is a calorie number, the other is a screening tool. They don't measure the same thing and shouldn't be confused. Check your own BMI with our BMI calculator.",
  },
  {
    question: "Does age affect BMR?",
    answer:
      "Yes, it drops roughly 1 to 2% per decade after age 20. The main cause is sarcopenia, the gradual loss of skeletal muscle that speeds up after 50. Since muscle burns more at rest than fat, less muscle means a lower BMR. Falling testosterone and growth hormone add to the decline. Strength training is the most reliable way to slow it down.",
  },
  {
    question: "How many calories should I eat based on my BMR?",
    answer:
      "Don't eat at or below your BMR for long stretches — that's where metabolic adaptation starts. Instead, multiply your BMR by an activity factor (1.2 for sedentary up to 1.9 for extremely active) to get your TDEE, then adjust from there: subtract 300 to 500 for weight loss, match it for maintenance, add 300 to 500 for muscle gain. Our TDEE calculator does this automatically.",
  },
  {
    question: "Can I lose weight using BMR?",
    answer:
      "BMR is the starting point, not the finish line. Work out your TDEE (BMR × activity multiplier), then set a moderate deficit of 300 to 500 calories below it. That produces safe fat loss of roughly 0.3 to 0.5 kg a week without wrecking your metabolism. Our calorie deficit calculator will run these numbers for you directly.",
  },
  {
    question: "What is Basal Metabolic Rate (BMR) and how is it calculated?",
    answer:
      "BMR is the minimum number of calories your body needs to keep running while completely at rest — breathing, circulation, cell repair, temperature control. The Mifflin-St Jeor equation is the standard way to estimate it: 10 × weight (kg) + 6.25 × height (cm) − 5 × age, then +5 for men or −161 for women.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR is your resting energy floor. TDEE (Total Daily Energy Expenditure) adds in everything else — walking, workouts, digestion, fidgeting. Multiply BMR by an activity factor from 1.2 (sedentary) to 1.9 (extremely active) to get TDEE, and base your actual food intake on that number, not BMR alone.",
  },
  {
    question: "Does caffeine or spicy food actually speed up BMR?",
    answer:
      "A little, briefly. Caffeine and capsaicin from peppers can raise calorie burn by roughly 5 to 8% for a short window, but the body adapts fast, especially with regular caffeine use. It's a minor effect at best — nowhere near a substitute for resistance training and consistent eating habits.",
  },
  {
    question: "How does my BMR affect my macro split?",
    answer:
      "Your BMR (through your TDEE) sets the total calorie budget; your macro split decides how those calories are divided between protein, carbs, and fat. A common starting point is 1.6 to 2.2 g of protein per kg of body weight, with the rest split between carbs and fat based on your goal and preference. Our macros calculator turns your BMR-based calorie target into gram amounts.",
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
      "@id":
        "https://www.lizocalc.com/calculators/health/bmr-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Health", item: "https://www.lizocalc.com/calculators/health" },
        { "@type": "ListItem", position: 4, name: "BMR Calculator", item: "https://www.lizocalc.com/calculators/health/bmr-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/health/bmr-calculator",
      url: "https://www.lizocalc.com/calculators/health/bmr-calculator",
      name: "BMR Calculator – Calculate Your Basal Metabolic Rate Accurately",
      description:
        "Use our free BMR calculator to find your Basal Metabolic Rate using the Mifflin-St Jeor equation. Get daily calorie needs and understand how age, weight, height, and sex affect BMR.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-09-14",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/health/bmr-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/health/bmr-calculator#app",
      name: "BMR Calculator",
      url: "https://www.lizocalc.com/calculators/health/bmr-calculator",
      description:
        "Free BMR calculator using the Mifflin-St Jeor equation, with TDEE multipliers, weight goal calorie targets, and shareable results.",
      applicationCategory: "HealthApplication",
      applicationSubCategory: "BMR Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate BMR using the Mifflin-St Jeor equation",
        "Daily, monthly, and yearly calorie projections",
        "Male and female specific formulas",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "what-is-bmr", label: "What Is BMR" },
  { id: "bmr-formula", label: "The BMR Formula" },
  { id: "manual-calculation", label: "Manual Calculation Examples" },
  { id: "bmr-tdee-multipliers", label: "TDEE Activity Multipliers" },
  { id: "weight-goal-calories", label: "Calories for Weight Goals" },
  { id: "bmr-by-age-weight", label: "BMR by Age & Weight" },
  { id: "bmr-vs-tdee", label: "BMR vs TDEE" },
  { id: "factors-affecting-bmr", label: "What Affects Your BMR" },
  { id: "increase-bmr", label: "How to Increase BMR" },
  { id: "how-to-use", label: "How to Use the Calculator" },
];

export default function BMRPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-bmr-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
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
            Find out how many calories your body burns at complete rest, based on your age, gender, height, and weight.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMRCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body needs just to stay alive at
          complete rest — no walking, no digesting food, nothing. For most adults it accounts for 60 to 70% of every
          calorie burned in a day, which makes it the biggest single piece of the calorie puzzle even if you train
          hard. The sections below walk through the formula, worked examples, how BMR turns into a real daily calorie
          target, and what actually moves the number up or down.
        </p>

        {/* Table of contents */}
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

        {/* ── QUICK ANSWER ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-16">
          <p className="text-white font-semibold text-lg mb-2">
            Quick answer: what is BMR?
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            BMR is the number of calories your body needs each day to keep basic functions running — breathing,
            circulation, cell repair, temperature control — while completely at rest. The Mifflin-St Jeor formula:{" "}
            <strong>
              Men: BMR = 10W + 6.25H − 5A + 5 · Women: BMR = 10W + 6.25H − 5A − 161
            </strong>{" "}
            (W = weight in kg, H = height in cm, A = age in years).
          </p>
        </div>

        {/* ══════════════════════════════════════════
            WHAT IS BMR
        ══════════════════════════════════════════ */}
        <section id="what-is-bmr" className="scroll-mt-24 mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is BMR (Basal Metabolic Rate)?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Basal Metabolic Rate is the minimum energy your body spends per day to keep essential processes going
            while completely still: no movement, no food digestion, no exercise. It covers your heartbeat, breathing,
            body temperature, hormone production, cell repair, and brain activity — the cost of simply being alive.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            For most adults, BMR makes up roughly 60 to 70% of total daily energy expenditure. That's the largest
            single share of your calorie burn, even ahead of exercise, which is why nutrition planning starts here
            rather than with a workout schedule.
          </p>

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
                Your <strong>liver alone takes 21 to 25% of your BMR</strong>, running metabolism and detox around
                the clock. The brain takes another 20%. Add in the heart, kidneys, digestive system, and skeletal
                muscle and that's your entire resting energy bill, running 24 hours a day whether you're awake or
                asleep.
              </p>
              <p className="text-gray-200 text-base leading-relaxed">
                Five things drive that number: age, gender, body composition, genetics, and hormones — all baked
                into the Mifflin-St Jeor formula this calculator uses.
              </p>
            </div>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base leading-relaxed">
              A person with a BMR of 1,700 cal/day burns about 70 calories an hour doing nothing at all. That number
              is the floor every nutrition plan should build from.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FORMULA
        ══════════════════════════════════════════ */}
        <section id="bmr-formula" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR Formula — The Mifflin-St Jeor Equation Explained
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This calculator uses the <strong>Mifflin-St Jeor equation</strong>, published in 1990 in the{" "}
            <em>American Journal of Clinical Nutrition</em> and now the formula most dietitians and nutrition bodies
            default to. A well-known 2005 review that checked predictive equations against measured resting energy
            expenditure found Mifflin-St Jeor came closer to actual measured values than older formulas across most
            people tested — which is the main reason it replaced Harris-Benedict as the default.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">Formula for men</h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR (male) = (10 × W) + (6.25 × H) − (5 × A) + 5
            <br />
            <br />
            W = weight in kilograms (kg)
            <br />
            H = height in centimetres (cm)
            <br />
            A = age in years
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">Formula for women</h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR (female) = (10 × W) + (6.25 × H) − (5 × A) − 161
            <br />
            <br />
            W = weight in kilograms (kg)
            <br />
            H = height in centimetres (cm)
            <br />
            A = age in years
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The only thing that changes between the two is the last constant: +5 for men, −161 for women. That
            accounts for average differences in body composition — men typically carry more lean muscle, which
            raises resting calorie burn.
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Formula term</th>
                  <th className="p-4 text-left font-semibold">What it represents</th>
                  <th className="p-4 text-left font-semibold">Why it's there</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-green-300">10 × W</td>
                  <td className="p-4">10 calories per kg of body weight</td>
                  <td className="p-4">Reflects total tissue mass — organs, muscle, fat, bone</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">6.25 × H</td>
                  <td className="p-4">6.25 calories per cm of height</td>
                  <td className="p-4">Taller bodies have more surface area and organ volume</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">−5 × A</td>
                  <td className="p-4">5 calories subtracted per year of age</td>
                  <td className="p-4">Captures the natural slowdown from age-related muscle loss</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">+5 (men)</td>
                  <td className="p-4">Male-specific constant</td>
                  <td className="p-4">Higher average muscle mass and testosterone</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">−161 (women)</td>
                  <td className="p-4">Female-specific constant</td>
                  <td className="p-4">Lower average muscle mass, different hormone profile</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Harris-Benedict — the older alternative
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Before Mifflin-St Jeor, the Harris-Benedict equation (1919, revised 1984) was the standard, and you'll
            still find it in older textbooks and some calculators today:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-yellow-300 text-sm mb-6 overflow-x-auto">
            Harris-Benedict (men) = 88.362 + (13.397 × W) + (4.799 × H) − (5.677 × A)
            <br />
            Harris-Benedict (women) = 447.593 + (9.247 × W) + (3.098 × H) − (4.330 × A)
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            Harris-Benedict tends to overestimate BMR for sedentary people, sometimes by a wide margin, especially
            in overweight and obese individuals. That's the practical reason this calculator defaults to
            Mifflin-St Jeor rather than showing both.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            MANUAL CALCULATION
        ══════════════════════════════════════════ */}
        <section id="manual-calculation" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Manual BMR Calculation — Step-by-Step Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Example 1: Male, 70 kg, 175 cm, age 25
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR = (10 × 70) + (6.25 × 175) − (5 × 25) + 5
            <br />
            BMR = 700 + 1,093.75 − 125 + 5
            <br />→ <strong>BMR = 1,673.75 cal/day</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example 2: Female, 60 kg, 160 cm, age 30
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            BMR = (10 × 60) + (6.25 × 160) − (5 × 30) − 161
            <br />
            BMR = 600 + 1,000 − 150 − 161
            <br />→ <strong>BMR = 1,289 cal/day</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Common BMR values — quick reference table
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Pre-calculated BMR figures for some of the most commonly searched weight, height, age, and gender
            combinations, using Mifflin-St Jeor:
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
                <tr><td className="p-4 font-semibold text-blue-300">Male</td><td className="p-4">70 kg</td><td className="p-4">175 cm</td><td className="p-4">25</td><td className="p-4 font-bold text-green-400">1,674</td></tr>
                <tr><td className="p-4 font-semibold text-blue-300">Male</td><td className="p-4">75 kg</td><td className="p-4">175 cm</td><td className="p-4">30</td><td className="p-4 font-bold text-green-400">1,699</td></tr>
                <tr><td className="p-4 font-semibold text-blue-300">Male</td><td className="p-4">80 kg</td><td className="p-4">178 cm</td><td className="p-4">35</td><td className="p-4 font-bold text-green-400">1,763</td></tr>
                <tr><td className="p-4 font-semibold text-blue-300">Male</td><td className="p-4">90 kg</td><td className="p-4">180 cm</td><td className="p-4">40</td><td className="p-4 font-bold text-green-400">1,855</td></tr>
                <tr><td className="p-4 font-semibold text-pink-300">Female</td><td className="p-4">55 kg</td><td className="p-4">160 cm</td><td className="p-4">25</td><td className="p-4 font-bold text-green-400">1,289</td></tr>
                <tr><td className="p-4 font-semibold text-pink-300">Female</td><td className="p-4">60 kg</td><td className="p-4">163 cm</td><td className="p-4">30</td><td className="p-4 font-bold text-green-400">1,357</td></tr>
                <tr><td className="p-4 font-semibold text-pink-300">Female</td><td className="p-4">65 kg</td><td className="p-4">165 cm</td><td className="p-4">35</td><td className="p-4 font-bold text-green-400">1,389</td></tr>
                <tr><td className="p-4 font-semibold text-pink-300">Female</td><td className="p-4">70 kg</td><td className="p-4">168 cm</td><td className="p-4">40</td><td className="p-4 font-bold text-green-400">1,424</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TDEE MULTIPLIERS
        ══════════════════════════════════════════ */}
        <section id="bmr-tdee-multipliers" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            From BMR to Maintenance Calories — TDEE Activity Multipliers
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            BMR only tells you your resting floor. To get your real daily number —{" "}
            <strong>Total Daily Energy Expenditure (TDEE)</strong> — multiply BMR by an activity factor. This is the
            number that should actually drive your food intake, not BMR by itself.
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
                  <th className="p-4 text-left font-semibold">Activity level</th>
                  <th className="p-4 text-left font-semibold">Multiplier</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                  <th className="p-4 text-left font-semibold">Example (BMR 1,700)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-semibold text-yellow-300">Sedentary</td><td className="p-4 font-bold text-blue-300">× 1.2</td><td className="p-4">Desk job, little or no exercise</td><td className="p-4 font-bold text-green-400">2,040 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">Lightly active</td><td className="p-4 font-bold text-blue-300">× 1.375</td><td className="p-4">Light exercise 1–3 days/week</td><td className="p-4 font-bold text-green-400">2,338 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">Moderately active</td><td className="p-4 font-bold text-blue-300">× 1.55</td><td className="p-4">Gym 3–5 days/week</td><td className="p-4 font-bold text-green-400">2,635 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">Very active</td><td className="p-4 font-bold text-blue-300">× 1.725</td><td className="p-4">Hard training 6–7 days/week or physical job</td><td className="p-4 font-bold text-green-400">2,933 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">Extra active</td><td className="p-4 font-bold text-blue-300">× 1.9</td><td className="p-4">Athlete, daily intense training, heavy labour</td><td className="p-4 font-bold text-green-400">3,230 cal</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Worked example</h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Male · 70 kg · 175 cm · age 25 → BMR = 1,674 cal/day
              <br />
              Activity: moderately active (gym 4×/week) → × 1.55
              <br />
              TDEE = 1,674 × 1.55 = <strong>2,595 cal/day</strong>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            A common mistake is picking the wrong activity level — training hard 4 days a week but sitting at a desk
            the rest of the time is usually "lightly active," not "very active," since the multiplier covers your
            whole day, not just the gym hour. For the full breakdown with all five levels applied automatically, use
            the{" "}
            <Link href="/calculators/health/tdee-calculator" className="text-blue-400 hover:underline">
              TDEE Calculator
            </Link>
            .
          </p>
        </section>

        {/* ══════════════════════════════════════════
            WEIGHT GOALS
        ══════════════════════════════════════════ */}
        <section id="weight-goal-calories" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calories for Weight Loss, Maintenance, and Muscle Gain
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Once you have your TDEE, use it to set a daily calorie target for your specific goal:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Goal</th>
                  <th className="p-4 text-left font-semibold">Daily calories</th>
                  <th className="p-4 text-left font-semibold">Weekly result</th>
                  <th className="p-4 text-left font-semibold">Example (TDEE 2,500)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-bold text-red-400">Aggressive fat loss</td><td className="p-4">TDEE − 750</td><td className="p-4">~0.7 kg lost/week</td><td className="p-4 font-bold text-orange-300">1,750 cal</td></tr>
                <tr><td className="p-4 font-bold text-yellow-300">Moderate fat loss</td><td className="p-4">TDEE − 500</td><td className="p-4">~0.5 kg lost/week</td><td className="p-4 font-bold text-green-400">2,000 cal</td></tr>
                <tr><td className="p-4 font-bold text-yellow-300">Mild fat loss</td><td className="p-4">TDEE − 250</td><td className="p-4">~0.25 kg lost/week</td><td className="p-4 font-bold text-green-400">2,250 cal</td></tr>
                <tr><td className="p-4 font-bold text-green-400">Maintenance</td><td className="p-4">TDEE</td><td className="p-4">Weight stable</td><td className="p-4 font-bold text-green-400">2,500 cal</td></tr>
                <tr><td className="p-4 font-bold text-blue-300">Lean muscle gain</td><td className="p-4">TDEE + 300</td><td className="p-4">~0.25 kg muscle/week</td><td className="p-4 font-bold text-blue-300">2,800 cal</td></tr>
                <tr><td className="p-4 font-bold text-blue-300">Muscle gain (bulk)</td><td className="p-4">TDEE + 500</td><td className="p-4">~0.5 kg/week (some fat)</td><td className="p-4 font-bold text-blue-300">3,000 cal</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base leading-relaxed">
              Don't eat below your BMR for extended periods — it can trigger metabolic adaptation, where your body
              lowers resting calorie burn to conserve energy. The safe floor for most adults is around 1,200 cal/day
              for women and 1,500 cal/day for men. Run your own numbers with the{" "}
              <Link href="/calculators/health/calorie-deficit-calculator" className="text-blue-400 hover:underline">
                calorie deficit calculator
              </Link>{" "}
              and split your target into grams with the{" "}
              <Link href="/calculators/health/macros-calculator" className="text-blue-400 hover:underline">
                macros calculator
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BY AGE / WEIGHT
        ══════════════════════════════════════════ */}
        <section id="bmr-by-age-weight" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR by Age and Weight — Reference Tables
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">Average BMR by age group</h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Approximate ranges based on typical height and weight distributions for adult men and women:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Age group</th>
                  <th className="p-4 text-left font-semibold">Average BMR — male</th>
                  <th className="p-4 text-left font-semibold">Average BMR — female</th>
                  <th className="p-4 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-semibold text-yellow-300">18–25</td><td className="p-4 font-bold text-green-400">1,700 – 1,900 cal</td><td className="p-4 font-bold text-green-400">1,400 – 1,600 cal</td><td className="p-4 text-gray-400">Peak muscle mass years</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">26–35</td><td className="p-4 font-bold text-green-400">1,650 – 1,850 cal</td><td className="p-4 font-bold text-green-400">1,350 – 1,550 cal</td><td className="p-4 text-gray-400">Slight decline begins</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">36–50</td><td className="p-4 font-bold text-yellow-300">1,550 – 1,750 cal</td><td className="p-4 font-bold text-yellow-300">1,250 – 1,450 cal</td><td className="p-4 text-gray-400">Muscle loss accelerates</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">51–65</td><td className="p-4 font-bold text-orange-400">1,450 – 1,650 cal</td><td className="p-4 font-bold text-orange-400">1,150 – 1,350 cal</td><td className="p-4 text-gray-400">Menopause / andropause effects</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">65+</td><td className="p-4 font-bold text-orange-400">1,300 – 1,550 cal</td><td className="p-4 font-bold text-orange-400">1,050 – 1,250 cal</td><td className="p-4 text-gray-400">Significant sarcopenia risk</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Approximate BMR by body weight — male, age 30, 175 cm
          </h3>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Body weight</th>
                  <th className="p-4 text-left font-semibold">Approx BMR</th>
                  <th className="p-4 text-left font-semibold">Sedentary TDEE (×1.2)</th>
                  <th className="p-4 text-left font-semibold">Moderate TDEE (×1.55)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-semibold text-yellow-300">50 kg</td><td className="p-4 font-bold text-green-400">1,355 cal</td><td className="p-4">1,626 cal</td><td className="p-4">2,100 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">60 kg</td><td className="p-4 font-bold text-green-400">1,455 cal</td><td className="p-4">1,746 cal</td><td className="p-4">2,255 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">70 kg</td><td className="p-4 font-bold text-green-400">1,555 cal</td><td className="p-4">1,866 cal</td><td className="p-4">2,410 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">80 kg</td><td className="p-4 font-bold text-green-400">1,655 cal</td><td className="p-4">1,986 cal</td><td className="p-4">2,565 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">90 kg</td><td className="p-4 font-bold text-green-400">1,755 cal</td><td className="p-4">2,106 cal</td><td className="p-4">2,720 cal</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">100 kg</td><td className="p-4 font-bold text-green-400">1,855 cal</td><td className="p-4">2,226 cal</td><td className="p-4">2,875 cal</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BMR VS TDEE
        ══════════════════════════════════════════ */}
        <section id="bmr-vs-tdee" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            BMR vs TDEE — What's the Difference?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Mixing these two up is one of the most common mistakes in nutrition planning:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Metric</th>
                  <th className="p-4 text-left font-semibold">Full name</th>
                  <th className="p-4 text-left font-semibold">What it measures</th>
                  <th className="p-4 text-left font-semibold">Use it for</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-bold text-blue-300">BMR</td><td className="p-4">Basal Metabolic Rate</td><td className="p-4">Calories at complete rest — zero movement, zero digestion</td><td className="p-4">Your metabolic floor. Never eat below this for long</td></tr>
                <tr><td className="p-4 font-bold text-green-400">TDEE</td><td className="p-4">Total Daily Energy Expenditure</td><td className="p-4">Everything burned in a real day, activity included</td><td className="p-4">Setting your actual food intake target</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">Same person, different numbers</h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Male · 75 kg · 175 cm · age 30
              <br />
              BMR = 1,699 cal/day (bed-bound all day)
              <br />
              <br />
              Sedentary office job → TDEE = 1,699 × 1.2 = <strong>2,039 cal</strong>
              <br />
              Gym 4×/week → TDEE = 1,699 × 1.55 = <strong>2,633 cal</strong>
              <br />
              Daily training → TDEE = 1,699 × 1.725 = <strong>2,931 cal</strong>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            The gap between sedentary and very active adds almost 900 calories of daily burn for the exact same
            person and the exact same BMR. Using BMR alone without the activity multiplier will underestimate how
            much you actually need.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            FACTORS
        ══════════════════════════════════════════ */}
        <section id="factors-affecting-bmr" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Affects Your BMR? — 6 Key Factors
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Age</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                BMR drops roughly 1 to 2% per decade after 20, mostly from sarcopenia — gradual muscle loss that
                starts in your late 20s and speeds up after 50. Less muscle means fewer resting calories burned.
                Declining testosterone and growth hormone add to the slowdown.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Gender</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Men typically have a higher BMR than women at the same height, weight, and age, mostly because of
                higher average lean muscle mass and testosterone. Women naturally carry more body fat, which burns
                fewer calories at rest than muscle does.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Muscle mass</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Muscle burns roughly 6 kcal per kg per day at rest, versus about 2 kcal per kg for fat. Two people at
                the same weight but different body composition can have BMRs that differ by 200 to 400 calories a
                day. Building muscle is the most reliable way to raise BMR permanently.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Body weight and height</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Larger bodies need more energy to maintain. Every extra kg adds about 10 calories a day to BMR, and
                every extra cm of height adds about 6.25 calories — which is exactly what the formula's coefficients
                represent.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Genetics</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Genetics explain a sizable share of the variation in resting metabolic rate between people of similar
                size — differences in thyroid function, mitochondrial efficiency, and lean mass distribution all play
                a part. You can't change your genes, but training and diet still move the number within that range.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Hormones</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Thyroid hormones (T3 and T4) regulate metabolic rate directly. Hypothyroidism can cut BMR by 30 to
                40%; hyperthyroidism raises it. Cortisol, insulin, leptin, and sex hormones all play a role too. If
                you suspect a thyroid or hormone issue, that's a conversation for a doctor, not a calculator.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW TO INCREASE BMR
        ══════════════════════════════════════════ */}
        <section id="increase-bmr" className="scroll-mt-20 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Increase BMR Naturally
          </h2>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-8">
            <p className="text-gray-200 text-base leading-relaxed">
              There's no overnight metabolism hack. The methods below produce real, measurable results, but only
              over weeks and months of consistency.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Resistance training — the most effective method
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              Every kilogram of new muscle adds roughly 13 calories a day to your resting burn. Small on its own, but
              5 kg of muscle gained over a year or two through consistent training adds around 65 calories a day — or
              roughly 24,000 calories a year. For anyone with gym access, progressive resistance training 3 to 4
              times a week is the single best long-term investment in your metabolism.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">High protein intake</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Protein has the highest thermic effect of food — your body spends 20 to 30% of protein calories just
                digesting it, versus 5 to 10% for carbs and 0 to 3% for fat. 1.6 to 2.2 g per kg of body weight also
                supports muscle repair, which protects your BMR long-term. See how this fits your calorie target with
                the{" "}
                <Link href="/calculators/health/macros-calculator" className="text-blue-400 hover:underline">
                  macros calculator
                </Link>
                .
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Quality sleep — 7 to 9 hours</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Chronic sleep loss under 6 hours lowers BMR and raises cortisol and ghrelin, the hunger hormone, even
                with identical calorie intake. Growth hormone, a key driver of muscle repair, is released mostly
                during deep sleep. Check how your sleep habits stack up with the{" "}
                <Link href="/calculators/health/sleep-calculator" className="text-blue-400 hover:underline">
                  sleep calculator
                </Link>
                .
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Adequate hydration</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Even mild dehydration, around 1 to 2% of body weight, can reduce metabolic rate. Drinking cold water
                gives a small, short-lived thermogenic bump as your body warms it up. Aim for 2.5 to 3.5 litres a
                day depending on climate and activity.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">Avoid long sedentary stretches</h4>
              <p className="text-gray-200 text-base leading-relaxed">
                Extended sitting suppresses lipoprotein lipase, an enzyme involved in fat metabolism. Standing and
                walking for a couple of minutes every hour helps maintain metabolic rate through the day, especially
                for anyone at a desk job for 8 to 10 hours.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            HOW TO USE
        ══════════════════════════════════════════ */}
        <section id="how-to-use" className="scroll-mt-24 mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the BMR Calculator
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>Select your biological gender — this applies the right Mifflin-St Jeor constant (+5 male, −161 female).</li>
              <li>Slide <strong>Age</strong> to your current age in years. Results update live as you move it.</li>
              <li>Set <strong>Weight</strong> in kilograms. Weigh yourself in the morning before eating for the most consistent number.</li>
              <li>Set <strong>Height</strong> in centimetres, measured without shoes.</li>
              <li>Read your daily, monthly, and yearly BMR instantly — no calculate button required.</li>
              <li>Use <strong>Share Result</strong> to copy a link that reproduces the exact same numbers for anyone who opens it.</li>
              <li>Hit <strong>Reset</strong> to start fresh, useful for comparing family members or testing muscle-gain scenarios.</li>
            </ol>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Daily, monthly, and yearly BMR
          </h3>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Output</th>
                  <th className="p-4 text-left font-semibold">Formula</th>
                  <th className="p-4 text-left font-semibold">Example (BMR 1,700)</th>
                  <th className="p-4 text-left font-semibold">Best used for</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-bold text-green-400">Daily BMR</td><td className="p-4 font-mono text-sm">Mifflin-St Jeor output</td><td className="p-4 font-bold">1,700 cal</td><td className="p-4">Daily diet planning, calorie floor</td></tr>
                <tr><td className="p-4 font-bold text-blue-300">Monthly BMR</td><td className="p-4 font-mono text-sm">Daily × 30.44</td><td className="p-4 font-bold">51,748 cal</td><td className="p-4">Grocery budgeting, monthly tracking</td></tr>
                <tr><td className="p-4 font-bold text-yellow-300">Yearly BMR</td><td className="p-4 font-mono text-sm">Daily × 365.25</td><td className="p-4 font-bold">620,925 cal</td><td className="p-4">Long-term fitness planning</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Explore more tools ── */}
        <section className="px-4 mt-20 mb-6 flex justify-center">
          <SimilarCalculators
            title="Explore More Health & Fitness Calculators"
            links={[
              { label: "BMI Calculator", href: "/calculators/health/bmi-calculator" },
              { label: "Calorie Calculator", href: "/calculators/health/calorie-calculator" },
              { label: "TDEE Calculator", href: "/calculators/health/tdee-calculator" },
              { label: "Body Fat Calculator", href: "/calculators/health/body-fat-calculator" },
              { label: "Calorie Deficit Calculator", href: "/calculators/health/calorie-deficit-calculator" },
              { label: "Macros Calculator", href: "/calculators/health/macros-calculator" },
              { label: "Sleep Calculator", href: "/calculators/health/sleep-calculator" },
            ]}
            seeAllHref="/calculators/health"
          />
        </section>

        <p className="text-gray-300 text-center mt-16 text-lg leading-relaxed">
          Your BMR is the number every other calorie decision builds on. Bookmark this calculator, come back after
          a weight change or birthday, and keep your targets current.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}