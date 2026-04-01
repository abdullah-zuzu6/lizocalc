import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import Link from "next/link";
import AdvancedTDEECalculator from './clientside'


const faqData = [
  {
    question: "What is TDEE and how is it different from BMR?",
    answer: "TDEE stands for Total Daily Energy Expenditure. While BMR (Basal Metabolic Rate) is the energy your body burns at rest just to stay alive, TDEE accounts for everything else: exercise, walking, working, and even digesting food. TDEE is the total amount of calories you burn in a 24-hour period.",
  },
  {
    question: "How do I calculate my TDEE using activity multipliers?",
    answer: "TDEE is calculated by multiplying your BMR by a Physical Activity Level (PAL) factor. Common multipliers include: Sedentary (BMR * 1.2), Lightly Active (BMR * 1.375), Moderately Active (BMR * 1.55), Very Active (BMR * 1.725), and Extra Active (BMR * 1.9).",
  },
  {
    question: "What is TEF and how does it affect my TDEE?",
    answer: "TEF, or the Thermic Effect of Food, is the energy required to digest, absorb, and process nutrients. It usually accounts for about 10% of your TDEE. Protein has the highest thermic effect, meaning your body burns more calories processing chicken or lentils than it does processing fats or simple sugars.",
  },
  {
    question: "Why does my TDEE change even if my weight stays the same?",
    answer: "Your TDEE is highly dynamic. It can fluctuate based on your NEAT (Non-Exercise Activity Thermogenesis), which includes fidgeting, standing, and moving around throughout the day. If you are tired or stressed, your NEAT often drops, lowering your overall TDEE even if you didn't miss your workout.",
  },
  {
    question: "Should I eat my TDEE to maintain my current weight?",
    answer: "Yes. Your TDEE is essentially your 'maintenance calories.' If you consume exactly your TDEE, your weight should remain stable. To lose weight, you subtract calories from this number (usually 500); to gain muscle, you add calories (usually 200 to 500) to this number.",
  },
  {
    question: "How accurate are TDEE calculators for active individuals?",
    answer: "Most TDEE calculators provide an excellent estimate, but they can have a 10% to 15% margin of error. Factors like muscle mass, genetics, and hormonal health play a role. The most accurate way to find your true TDEE is to track your intake and weight for 3 weeks and adjust based on real-world results.",
  },
];

export const metadata: Metadata = {
 title: "Tdee calculator: find your maintenance calories & macro split",

description: "Calculate your total daily energy expenditure (tdee) using the mifflin-st jeor formula. get personalized bmr, bmi, and daily macro goals for protein, carbs, and fats.",
  keywords: [
    "total daily energy expenditure",
    "calculate maintenance calories",
    "tdee with activity multiplier",
    "daily burn rate calculator",
    "metabolic health tool",
    "lizocalc tdee tracker",
    "accurate tdee formula",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/tdee-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced TDEE Calculator | Accurate Maintenance Tool",
    description:
      "Find your true daily calorie burn. Our advanced TDEE calculator accounts for BMR and physical activity to help you master your weight goals.",
    url: "https://www.lizocalc.com/calculators/health/tdee-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced TDEE Calculator | LizoCalc",
    description:
      "Determine your daily energy expenditure and calorie budget with our professional-grade health calculator.",
  },
};

export default function TDEEPage() {
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
                  "https://www.lizocalc.com/calculators/health/tdee-calculator#breadcrumb",
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
                    name: "TDEE Calculator",
                    item: "https://www.lizocalc.com/calculators/health/tdee-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/health/tdee-calculator",
                url: "https://www.lizocalc.com/calculators/health/tdee-calculator",
                name: "Advanced TDEE Calculator",
                description: "Use our advanced TDEE calculator to estimate your Total Daily Energy Expenditure, understand your caloric maintenance level, and reach your fitness goals.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                },"mainEntityOfPage": {
    "@type": "SoftwareApplication",
    "@id": "https://www.lizocalc.com/calculators/health/tdee-calculator#app"
  }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/health/tdee-calculator#app",
                name: "Advanced TDEE Calculator",
                url: "https://www.lizocalc.com/calculators/health/tdee-calculator",
                description:
                  "Advanced TDEE calculator to estimate daily energy expenditure and caloric maintenance levels.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "TDEE Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Total Daily Energy Expenditure (TDEE)",
                  "Determine daily maintenance calories",
                  "Activity level adjustments",
                  "Support for weight loss and muscle gain goals",
                  "Metric and imperial unit support",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                "potentialAction": {
    "@type": "UseAction",
    "target": ["https://www.lizocalc.com/calculators/health/tdee-calculator"]
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
Tdee calculator: discover your daily maintenance calories and macro needs            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedTDEECalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>TDEE Calculator</strong> — your complete Total Daily Energy Expenditure tool — is one of the most accurate and essential resources for fitness, body recomposition, and long-term health. Whether you’re a student balancing studies and training, a professional chasing sustainable fat loss, an athlete optimizing performance, or anyone worldwide who wants data-driven control over their nutrition, this free calculator delivers precise calorie and macro targets in seconds.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required{" "}
    <strong>TDEE calculator and macro tool</strong> uses the industry-standard Mifflin-St Jeor formula to calculate your Basal Metabolic Rate (BMR) and then applies the correct activity multiplier to reveal your true daily calorie burn. Enter your details once and instantly receive personalized maintenance calories, deficit targets for fat loss, surplus targets for muscle gain, plus a smart macro split — all with real-time updates and zero ads. The tool is fully mobile-friendly, works offline after first load (progressive web app style), automatically saves your history (with your functional cookie consent), and is perfect for daily tracking anywhere in the world. Jump right in and try it now on our{" "}
    <Link
      href="/calculators/health/tdee-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      TDEE Calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Calculate Your Total Daily Energy Expenditure
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Inputting your body parameters: age, weight, and height
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Enter your age in years, current weight (kg or lbs), and height (cm or feet/inches). These three inputs are the core of the Mifflin-St Jeor equation. The calculator instantly handles unit conversion so you can switch between metric and imperial without losing accuracy — ideal for users anywhere who prefer their local measurement system.
        </p>
        <p className="text-gray-200 text-base italic">
          Pro tip: Use measurements taken first thing in the morning, after using the bathroom, for the highest precision.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Choosing the right activity level for accurate results
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-6">
          Select your typical weekly activity. The tool multiplies your BMR by the correct factor to produce your real-world TDEE. Choosing honestly prevents under- or over-estimating calories and keeps your progress on track.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
          <li>Sedentary – desk job, little to no exercise</li>
          <li>Lightly active – light exercise or walking 1–3 days/week</li>
          <li>Moderately active – moderate exercise or sports 3–5 days/week</li>
          <li>Very active – hard training 6–7 days/week</li>
          <li>Extra active (athlete) – intense daily training or physical job</li>
        </ul>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Understanding the male vs. female metabolic calculation
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          The Mifflin-St Jeor formula applies different constants for men and women because of natural differences in muscle mass and hormonal profiles. This single choice can shift your BMR by 100–200 calories per day, making gender selection critical for correct results.
        </p>
        <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
          Sedentary (1.2×) vs. athlete (1.9×) activity multipliers
        </h4>
        <p className="text-gray-200 text-base">
          A sedentary office worker multiplies BMR by 1.2. A competitive athlete training multiple sessions daily multiplies by 1.9. The gap between these two multipliers can exceed 1,000 calories — the difference between weight loss and weight gain if you pick the wrong level.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Advanced Features of Our TDEE &amp; Macro Tool
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Basal Metabolic Rate (BMR) vs. TDEE: what’s the difference?
    </h3>
    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      BMR is the calories you burn at complete rest (breathing, heart beating, organ function). TDEE is your BMR multiplied by your real-life activity level — it includes workouts, walking, NEAT (non-exercise activity thermogenesis), and even digestion. Most people underestimate TDEE by 300–600 calories because they forget NEAT and daily movement.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Automatic BMI calculation for a quick health snapshot
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      As soon as you enter weight and height, the tool instantly shows your Body Mass Index with a color-coded health category (underweight, normal, overweight, obese). This gives you an immediate context for your TDEE results without opening another tab.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Customized daily macro split: protein, carbs, and fats
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      After calculating TDEE, choose your goal (loss, maintenance, gain) and the tool instantly breaks your calories into grams of protein, carbohydrates, and fats using evidence-based ratios. High-protein options for muscle preservation, balanced splits for general health, or carb-cycling presets — all updated live.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Smart history saving: access your results via functional cookies
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      With your consent, the calculator securely saves your last inputs and results using functional cookies. Return anytime — from any device — and your previous calculations load instantly so you can track weekly changes, compare progress, or adjust goals without re-entering data.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How the Mifflin-St Jeor Formula Works
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      The math behind your calorie maintenance level
    </h3>
    <p className="text-gray-200 text-base leading-relaxed mb-4">
      The Mifflin-St Jeor equation is the most accurate predictive formula for BMR in healthy adults. It replaced the older Harris-Benedict formula because it was validated on larger, more diverse populations.
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">For Men:</h4>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl mb-6">
      BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) + 5
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">For Women:</h4>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl">
      BMR = (10 × weight in kg) + (6.25 × height in cm) − (5 × age in years) − 161
    </p>
    <p className="text-gray-200 text-base mt-4">
      TDEE is then calculated as: <span className="font-mono text-green-300">TDEE = BMR × Activity Multiplier</span>
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Step-by-step example: a 25-year-old at 70 kg
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Male, 25 years old, 70 kg, 175 cm, moderately active (1.55× multiplier):
    </p>
    <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base leading-relaxed mb-6">
      <li>BMR = (10 × 70) + (6.25 × 175) − (5 × 25) + 5 = 700 + 1,093.75 − 125 + 5 = <strong>1,673.75 kcal</strong></li>
      <li>TDEE = 1,673.75 × 1.55 = <strong>2,594 kcal</strong> per day</li>
    </ol>
    <p className="text-gray-300 italic text-base">
      This 25-year-old needs roughly 2,594 calories to maintain weight. For fat loss he would target 2,094 kcal; for muscle gain around 2,844 kcal.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Why the Mifflin-St Jeor formula is the fitness industry standard
    </h3>
    <p className="text-gray-200 text-base leading-relaxed">
      Published in 1990 and repeatedly validated in peer-reviewed studies, it has the lowest average error rate (±5–10 %) compared with lab-measured metabolic rates. Trainers, dietitians, and apps worldwide rely on it because it works across ages 18–80, both genders, and a wide range of body compositions.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use Your Results for Weight Loss or Muscle Gain
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Setting a caloric deficit for sustainable fat loss
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      Subtract 300–750 calories from your TDEE for a moderate, muscle-preserving deficit. This creates 0.25–0.75 kg (0.5–1.5 lb) of weekly fat loss while keeping energy levels high and hunger manageable.
    </p>
    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Goal</th>
            <th className="p-4 text-left font-semibold">Adjustment</th>
            <th className="p-4 text-left font-semibold">Weekly Fat Loss</th>
            <th className="p-4 text-left font-semibold">Example (TDEE 2,600 kcal)</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">Mild deficit</td>
            <td className="p-4 font-mono text-green-400">−300 kcal</td>
            <td className="p-4">0.25 kg</td>
            <td className="p-4 font-bold">2,300 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Moderate deficit</td>
            <td className="p-4 font-mono text-green-400">−500 kcal</td>
            <td className="p-4">0.5 kg</td>
            <td className="p-4 font-bold">2,100 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Aggressive deficit</td>
            <td className="p-4 font-mono text-green-400">−750 kcal</td>
            <td className="p-4">0.75 kg</td>
            <td className="p-4 font-bold">1,850 kcal</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Calculating a caloric surplus for effective muscle building
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      Add 250–500 calories above TDEE for a lean bulk. Combined with progressive overload training and high protein, this supports 0.25–0.5 kg of muscle gain per month with minimal fat accumulation.
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl">
      Example: TDEE 2,600 kcal → Lean bulk target = 2,850–3,100 kcal
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Adjusting your protein intake for body recomposition
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      For simultaneous fat loss and muscle gain (recomp), keep calories near maintenance or a tiny deficit while setting protein at 1.8–2.2 g per kg of body weight. The rest of the macros can be split 40–50 % carbs and 25–35 % fats depending on training volume and personal preference. The TDEE &amp; macro tool automatically calculates these optimized splits the moment you select “recomposition” mode.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Real-World TDEE Examples &amp; Quick Tips
    </h2>
    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Profile</th>
            <th className="p-4 text-left font-semibold">BMR</th>
            <th className="p-4 text-left font-semibold">Activity</th>
            <th className="p-4 text-left font-semibold">TDEE</th>
            <th className="p-4 text-left font-semibold">Recommended Goal</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">25 y male, 70 kg, 175 cm</td>
            <td className="p-4 font-bold text-green-400">1,674 kcal</td>
            <td className="p-4">Moderate (1.55×)</td>
            <td className="p-4 font-bold">2,594 kcal</td>
            <td className="p-4">Fat loss → 2,094 kcal</td>
          </tr>
          <tr>
            <td className="p-4">32 y female, 58 kg, 162 cm</td>
            <td className="p-4 font-bold text-green-400">1,312 kcal</td>
            <td className="p-4">Sedentary (1.2×)</td>
            <td className="p-4 font-bold">1,574 kcal</td>
            <td className="p-4">Maintenance → 1,574 kcal</td>
          </tr>
          <tr>
            <td className="p-4">28 y male athlete, 82 kg, 180 cm</td>
            <td className="p-4 font-bold text-green-400">1,912 kcal</td>
            <td className="p-4">Athlete (1.9×)</td>
            <td className="p-4 font-bold">3,633 kcal</td>
            <td className="p-4">Muscle gain → 3,883 kcal</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Health Tools to Explore
    </h2>

    <p className="text-gray-200 text-base mb-6">
      Pair your TDEE tracking with these other free, fast calculators from our collection:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li>
        <Link
          href="/calculators/health/bmi-calculator"
          className="text-blue-400 hover:underline"
        >
          BMI Calculator
        </Link>{" "}
        — instant body-mass index and health category
      </li>
      <li>
        <Link
          href="/calculators/health/body-fat-calculator"
          className="text-blue-400 hover:underline"
        >
          Body Fat Calculator
        </Link>{" "}
        — estimate your body-fat percentage from measurements
      </li>
      <li>
        <Link
          href="/calculators/health/macros-calculator"
          className="text-blue-400 hover:underline"
        >
          Macro Calculator
        </Link>{" "}
        — fine-tune protein, carbs, and fats after your TDEE
      </li>
      <li>
        <Link
          href="/calculators/health/calorie-calculator"
          className="text-blue-400 hover:underline"
        >
          Calorie Calculator
        </Link>{" "}
        — cross-check your daily intake against TDEE goals
      </li>
    </ul>
  </section>

  <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
    Master your TDEE, master your body. Our free TDEE Calculator is fast, accurate, science-backed, and always available — whether you train in the gym, work from home, or travel the world. Bookmark it today and turn every meal into progress.
  </p>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}