import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const AdvancedCalorieCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});

const faqData = [
  {
    question: "How are daily calories calculated?",
    answer:
      "The daily calorie requirement is calculated using established equations like Mifflin-St Jeor, factoring in your age, gender, weight, height, and activity level.",
  },
  {
    question: "Can I adjust for weight loss or gain?",
    answer:
      "Yes, our calculator includes goal-setting options to show you how many calories to consume for weight loss, maintenance, or muscle gain.",
  },
];

export const metadata: Metadata = {
 title: "Calorie calculator - find your bmr and tdee in seconds",
description: "calculate your daily calorie needs with our bmr and tdee tool. input your age, weight, and activity level to get personalized results for weight management.",
  keywords: [
    "daily calorie intake calculator",
    "calculate calories for weight loss",
    "tdee and macro calculator",
    "maintenance calorie tool",
    "energy expenditure calculator",
    "lizocalc calorie tracker",
    "weight gain calorie needs",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/calorie-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Calorie Calculator | Accurate Energy Tool",
    description:
      "Find exactly how many calories you need to reach your fitness goals. Our advanced calculator provides precise targets for maintenance, loss, or gain.",
    url: "https://lizocalc.com/calculators/health/calorie-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Calorie Calculator | Daily Energy Needs",
    description:
      "Instantly calculate your daily calorie budget and macronutrient split with our professional-grade health calculator.",
  },
};

export default function CaloriePage() {
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
                  "https://lizocalc.com/calculators/health/calorie-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Health ",
                    item: "https://lizocalc.com/calculators/health",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Calorie Calculator",
                    item: "https://lizocalc.com/calculators/health/calorie-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/calorie-calculator",
                url: "https://lizocalc.com/calculators/health/calorie-calculator",
                name: "Advanced Calorie Calculator",
                description: "Use our advanced calorie calculator to estimate your daily energy needs, track macros, and reach your fitness goals instantly.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/health/calorie-calculator#app",
                name: "Advanced Calorie Calculator",
                url: "https://lizocalc.com/calculators/health/calorie-calculator",
                description:
                  "Advanced calorie calculator to estimate daily energy expenditure, macro requirements, and fitness goals.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Calorie Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate daily calorie needs (TDEE)",
                  "Estimate macronutrient breakdown",
                  "Support for weight loss and muscle gain goals",
                  "Adjustable activity levels",
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
                  url: "https://lizocalc.com",
                },
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
Calorie calculator: find your bmr and daily energy expenditure            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedCalorieCalculator />
      </section>

      {/* SEO Content */}
   <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Calorie and TDEE Calculator</strong> — your complete daily calorie needs tool — is one of the most powerful and practical resources for fitness, weight management, and healthy living. Whether you're a student in Sahiwal, Punjab, Pakistan juggling studies and gym goals, a busy professional in Lahore or Karachi trying to lose stubborn belly fat, a homemaker in Islamabad planning family meals, or anyone across Pakistan and the world who wants science-backed control over their body composition, this free calculator removes all the guesswork.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required{" "}
    <strong>calorie calculator and TDEE calculator</strong> instantly computes your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the proven Harris-Benedict formula. Just enter a few details, choose your activity level, and get personalized calorie targets for weight loss, maintenance, or muscle gain — complete with real-time updates, clean results, and zero ads. The tool is fully mobile-friendly, works offline after first load (progressive web app style), automatically saves your last inputs (with your cookie consent), supports both metric and imperial units, and is perfect for quick daily tracking. Whether you're in Sahiwal planning your next meal or traveling abroad, jump right in and try it now on our{" "}
    <NoPrefetchLink
      href="/calculators/nutrition/calorie-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      Calorie &amp; TDEE Calculator page
    </NoPrefetchLink>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use the Calorie and TDEE Calculator
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 1: Enter your physical parameters (age, weight, height)
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Start by typing your age in years, current weight (in kg or lbs), and height (in cm or feet/inches). These three values form the foundation of the Harris-Benedict equation and directly influence your BMR. The calculator automatically converts units if you switch between metric and imperial — perfect for users in Pakistan who prefer kilograms and centimetres or those comfortable with pounds and inches.
        </p>
        <p className="text-gray-200 text-base italic">
          Pro tip: For the most accurate results, use your most recent measurements taken first thing in the morning after waking up.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 2: Select your gender for formula accuracy
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Choose male or female. The Harris-Benedict formula uses different constants for each gender because men typically have higher muscle mass and therefore burn more calories at rest. This single selection can change your BMR by 10–15% — a huge difference when setting realistic calorie goals.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 3: Choose your activity level from sedentary to extra active
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-6">
          Select how active you are on an average week. The calculator instantly applies the correct multiplier to convert your BMR into TDEE. Options range from Sedentary (desk job, little exercise) all the way to Extra Active (intense training or physically demanding job 6–7 days per week).
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
          <li>Sedentary – office work, minimal movement</li>
          <li>Lightly active – light exercise 1–3 days/week</li>
          <li>Moderately active – moderate exercise 3–5 days/week</li>
          <li>Very active – hard exercise 6–7 days/week</li>
          <li>Extra active – athlete-level training or labour-intensive job</li>
        </ul>
        <p className="text-gray-300 italic mt-6 text-base">
          Pro tip: Be honest with your selection. Overestimating activity is one of the most common reasons people stall on their weight-loss journey.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Understanding Your Results: BMR vs. TDEE
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      What is Basal Metabolic Rate (BMR)?
    </h3>
    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      BMR is the number of calories your body burns every day just to stay alive — breathing, circulating blood, regulating temperature, and maintaining organs — while you are completely at rest. For most people, BMR accounts for 60–75% of total daily calorie burn. Knowing your exact BMR is the first step toward science-based nutrition instead of guessing.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How Total Daily Energy Expenditure (TDEE) is calculated
    </h3>
    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      TDEE = BMR × Activity Multiplier. This simple multiplication turns your resting calorie burn into a realistic daily target that includes walking, work, workouts, and even digestion. The result tells you exactly how many calories you need to maintain, lose, or gain weight.
    </p>

    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Activity Level</th>
            <th className="p-4 text-left font-semibold">Multiplier</th>
            <th className="p-4 text-left font-semibold">Description</th>
            <th className="p-4 text-left font-semibold">Example Daily Burn (for 70 kg male, age 30)</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">Sedentary</td>
            <td className="p-4 font-mono text-green-400">1.2×</td>
            <td className="p-4">Little or no exercise, desk job</td>
            <td className="p-4 font-bold">≈ 2,340 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Moderately Active</td>
            <td className="p-4 font-mono text-green-400">1.55×</td>
            <td className="p-4">Moderate exercise 3–5 days/week</td>
            <td className="p-4 font-bold">≈ 3,020 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Very Active</td>
            <td className="p-4 font-mono text-green-400">1.725×</td>
            <td className="p-4">Hard exercise 6–7 days/week</td>
            <td className="p-4 font-bold">≈ 3,360 kcal</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      The Harris-Benedict Formula Used in This Tool
    </h3>
    <p className="text-gray-200 text-base leading-relaxed mb-4">
      This tool uses the revised Harris-Benedict equation, one of the most validated formulas worldwide. It was developed in 1919 and later refined for modern populations.
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">For Men:</h4>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl mb-6">
      BMR = 88.362 + (13.397 × weight in kg) + (4.799 × height in cm) − (5.677 × age in years)
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">For Women:</h4>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl">
      BMR = 447.593 + (9.247 × weight in kg) + (3.098 × height in cm) − (4.330 × age in years)
    </p>
    <p className="text-gray-300 italic text-base mt-4">
      Example: 30-year-old male, 70 kg, 175 cm → BMR = 1,950 kcal. With moderate activity (1.55×) his TDEE becomes 3,022 kcal/day.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Personalized Calorie Goals for Weight Management
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Calories needed for weight loss (caloric deficit)
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      Safe and sustainable fat loss happens at a 500–750 kcal daily deficit below your TDEE. This typically equals 0.5–0.75 kg (1–1.5 lb) of fat loss per week. Never drop below 1,200 kcal (women) or 1,500 kcal (men) without medical supervision.
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl">
      Example: TDEE = 3,000 kcal → Weight-loss target = 2,300–2,500 kcal/day
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Maintenance calories: staying at your current weight
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      Simply eat at your exact TDEE. This is the sweet spot for athletes who want to stay lean while performing at peak levels or for anyone who has reached their ideal weight and wants to keep it.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Calories for muscle gain (caloric surplus)
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      A modest surplus of 250–500 kcal above TDEE, paired with progressive resistance training and high protein (1.6–2.2 g per kg body weight), supports clean muscle growth with minimal fat gain.
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-4 rounded-xl">
      Example: TDEE = 3,000 kcal → Muscle-gain target = 3,250–3,500 kcal/day
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-10">
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-green-400 mb-3">Weight Loss</h4>
        <p className="text-4xl font-bold text-white">−500 kcal</p>
        <p className="text-gray-300 text-sm">0.5 kg/week fat loss</p>
      </div>
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-400 mb-3">Maintenance</h4>
        <p className="text-4xl font-bold text-white">= TDEE</p>
        <p className="text-gray-300 text-sm">Stay exactly where you are</p>
      </div>
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-orange-400 mb-3">Muscle Gain</h4>
        <p className="text-4xl font-bold text-white">+300 kcal</p>
        <p className="text-gray-300 text-sm">Lean bulk with minimal fat</p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Features of Our Advanced Calorie Tool
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Automatic data saving with functional cookie preferences
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      With your consent, the calculator stores your last age, weight, height, gender, and activity level using secure, functional cookies. Next time you visit — whether from your phone in Sahiwal or laptop in Karachi — your numbers load instantly so you can track progress week after week without re-entering data. You can clear or manage cookies anytime from the settings panel.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Real-time activity level multipliers
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      As soon as you click a new activity level, the entire result updates instantly. No page refresh, no waiting — perfect for experimenting with “what if I train 5 days instead of 3?”
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Mobile-friendly interface for quick tracking
    </h3>
    <p className="text-gray-200 text-base mb-6">
      Built with a clean, touch-first design that works beautifully on every smartphone, tablet, or desktop. Large buttons, readable numbers, and dark-mode friendly colours make daily logging effortless whether you’re at the gym in Sahiwal or meal-prepping at home.
    </p>

    <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
      Sedentary (1.2× multiplier)
    </h4>
    <p className="text-gray-200 text-base">Office job, driving, minimal walking. Most common for students and remote workers in Pakistan.</p>

    <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
      Moderately Active (1.55× multiplier)
    </h4>
    <p className="text-gray-200 text-base">Gym 3–5 days a week + daily steps. Ideal for beginners building sustainable habits.</p>

    <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
      Very Active (1.725× multiplier)
    </h4>
    <p className="text-gray-200 text-base">Intense training 6–7 days, sports, or physically demanding jobs. Perfect for serious athletes and bodybuilders.</p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Real-World Calorie Examples &amp; Quick Tips
    </h2>
    <p className="text-gray-200 text-base mb-6">
      Let’s see the calculator in action with real examples relevant to people in Pakistan and worldwide.
    </p>
    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Person</th>
            <th className="p-4 text-left font-semibold">BMR</th>
            <th className="p-4 text-left font-semibold">Activity</th>
            <th className="p-4 text-left font-semibold">TDEE</th>
            <th className="p-4 text-left font-semibold">Goal</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">Sahiwal student, male, 22 y, 68 kg, 172 cm</td>
            <td className="p-4 font-bold text-green-400">1,820 kcal</td>
            <td className="p-4">Moderately active</td>
            <td className="p-4 font-bold">2,821 kcal</td>
            <td className="p-4">Weight loss → 2,321 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Karachi working mom, female, 35 y, 62 kg, 158 cm</td>
            <td className="p-4 font-bold text-green-400">1,410 kcal</td>
            <td className="p-4">Sedentary</td>
            <td className="p-4 font-bold">1,692 kcal</td>
            <td className="p-4">Maintenance → 1,692 kcal</td>
          </tr>
          <tr>
            <td className="p-4">Lahore gym-goer, male, 28 y, 80 kg, 180 cm</td>
            <td className="p-4 font-bold text-green-400">1,980 kcal</td>
            <td className="p-4">Very active</td>
            <td className="p-4 font-bold">3,415 kcal</td>
            <td className="p-4">Muscle gain → 3,715 kcal</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="text-gray-300 italic text-center mt-8 text-lg">
      Pair your calorie tracking with our other free tools for complete nutrition mastery.
    </p>
    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base mt-6">
      <li>
        <NoPrefetchLink
          href="/calculators/health/bmi-calculator"
          className="text-blue-400 hover:underline"
        >
          BMI Calculator
        </NoPrefetchLink>{" "}
        — see where your weight fits on the healthy scale
      </li>
      <li>
        <NoPrefetchLink
          href="/calculators/nutrition/macro-calculator"
          className="text-blue-400 hover:underline"
        >
          Macro Calculator
        </NoPrefetchLink>{" "}
        — split your calories into protein, carbs, and fats
      </li>
      <li>
        <NoPrefetchLink
          href="/calculators/nutrition/body-fat-calculator"
          className="text-blue-400 hover:underline"
        >
          Body Fat Calculator
        </NoPrefetchLink>{" "}
        — track visible progress beyond the scale
      </li>
    </ul>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Common Questions About Calorie &amp; TDEE Calculators
    </h2>
    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      How accurate is the Harris-Benedict formula?
    </h3>
    <p className="text-gray-200 text-base">
      Studies show it predicts BMR within ±5–10% for most healthy adults. Combine it with consistent tracking of weight and measurements for even better real-world accuracy.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
      Should I eat exactly my TDEE every day?
    </h3>
    <p className="text-gray-200 text-base">
      No — flexibility is key. Many people use a weekly average so they can enjoy family dinners or weekend treats while still hitting long-term goals.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
      Can I use this calorie calculator if I’m pregnant or breastfeeding?
    </h3>
    <p className="text-gray-200 text-base">
      The base formula works, but add the extra calories recommended by your doctor (usually +300–500 kcal). Always consult a healthcare professional for special conditions.
    </p>
  </section>

  <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
    Master your calories, master your results. Our free Calorie and TDEE Calculator is fast, accurate, completely private, and always ready — whether you’re in Sahiwal, Pakistan or anywhere else in the world. Bookmark it today and take the guesswork out of your fitness journey forever!
  </p>
</article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}