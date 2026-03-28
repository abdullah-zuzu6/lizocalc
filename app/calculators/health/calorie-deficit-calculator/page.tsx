import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import Link from "next/link";
import AdvancedCalorieDeficitCalculator from './clientside'

const faqData = [
  {
    question: "What is a calorie deficit and how does it work?",
    answer: "A calorie deficit occurs when you consume fewer calories than your body burns in a day (your Total Daily Energy Expenditure, or TDEE). When this happens, your body is forced to use stored energy—primarily body fat—to make up the difference, resulting in weight loss over time.",
  },
  {
    question: "How do I calculate a safe calorie deficit for weight loss?",
    answer: "A standard safe deficit is 500 calories per day, which typically leads to a loss of 0.5kg (1lb) per week. The formula is: Daily Target = TDEE - Deficit. For example, if your TDEE is 2,500 calories, a 500-calorie deficit would mean eating 2,000 calories daily.",
  },
  {
    question: "Is there a limit to how low I can drop my calories?",
    answer: "Yes. Health professionals generally advise that men should not consume fewer than 1,500 calories per day, and women should not go below 1,200, unless under medical supervision. Dropping below these levels can lead to muscle loss, nutrient deficiencies, and a significantly slowed metabolism.",
  },
  {
    question: "How many calories are in one pound of body fat?",
    answer: "Scientific research generally estimates that 1 pound of body fat is equivalent to approximately 3,500 calories. This is why a daily deficit of 500 calories (500 * 7 days = 3,500) is the most common recommendation for losing one pound of fat per week.",
  },
  {
    question: "Can I create a deficit through exercise instead of food?",
    answer: "Absolutely. A deficit is the sum of 'Calories In' minus 'Calories Out.' You can achieve this by eating less (diet), moving more (exercise), or a combination of both. Combining a 250-calorie dietary reduction with 250 calories burned through cardio is often more sustainable than dieting alone.",
  },
  {
    question: "Why am I not losing weight even in a calculated deficit?",
    answer: "Weight loss is rarely linear. Common reasons include water retention from high sodium intake, 'hidden calories' in oils and sauces that aren't being tracked, or a decrease in NEAT (Non-Exercise Activity Thermogenesis) where your body moves less naturally because it is tired from the deficit.",
  },
];

export const metadata: Metadata = {
  title: "Calorie deficit calculator: find your macros for fat loss or muscle gain",

description: "calculate your daily calorie deficit and macro split instantly. choose from ketogenic, high-protein, or balanced diet plans to reach your weight goals based on your tdee.",
  keywords: [
    "calorie deficit for fat loss",
    "calculate weight loss timeline",
    "daily calorie reduction tool",
    "safe calorie deficit calculator",
    "sustainable weight loss plan",
    "lizocalc deficit tool",
    "burn fat calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Calorie Deficit Calculator | Sustainable Fat Loss",
    description:
      "Find your perfect calorie deficit for effective weight loss. Our advanced tool helps you reach your goals safely without crashing your metabolism.",
    url: "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Calorie Deficit Calculator | LizoCalc",
    description:
      "Calculate your daily calorie deficit and estimated weight loss date with our professional-grade health calculator.",
  },
};

export default function CalorieDeficitPage() {
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
                  "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator#breadcrumb",
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
                    name: "Health ",
                    item: "https://www.lizocalc.com/calculators/health",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Calorie Deficit Calculator",
                    item: "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
                url: "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
                name: "Advanced Calorie Deficit Calculator",
                description: "Use our advanced calorie deficit calculator to determine the daily caloric intake needed to reach your weight loss goals sustainably.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator#app",
                name: "Advanced Calorie Deficit Calculator",
                url: "https://www.lizocalc.com/calculators/health/calorie-deficit-calculator",
                description:
                  "Advanced calorie deficit calculator to determine daily intake for sustainable weight loss.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Calorie Deficit Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate required calorie deficit",
                  "Estimate daily calorie target for weight loss",
                  "Safe rate-of-loss recommendations",
                  "TDEE-based calculations",
                  "Support for customized weight goals",
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
Calorie Deficit & Macro Calculator: Reach Your Goal Weight Faster            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedCalorieDeficitCalculator />
      </section>

      {/* SEO Content */}
   <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Calorie Deficit Calculator</strong> — your complete guide to sustainable fat loss, muscle preservation, and personalised nutrition — is one of the most powerful and science-backed tools in modern fitness and weight management. Whether you&apos;re a busy professional aiming to shed stubborn fat, an athlete optimising body composition, a beginner starting your first transformation journey, or someone simply wanting to understand how many calories you truly need each day, this calculator removes the guesswork. It combines your Total Daily Energy Expenditure (TDEE), your exact goal (lose, maintain, or gain), and your preferred diet style into one easy-to-follow daily target complete with precise macronutrient grams.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required <strong>calorie deficit calculator</strong> does all the heavy lifting for you. Input your stats once, choose your goal and diet preference, and instantly receive your custom calorie target plus a full macro split (protein, carbs, and fats in grams). The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last inputs (with your consent), supports every popular diet from balanced to keto, and never shows any ads. Perfect for daily meal planning, weekly progress tracking, or long-term body recomposition. Jump right in and try it now on our{" "}
    <Link
      href="/calculators/health/calorie-deficit-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      calorie deficit calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Calculate Your Calorie Deficit and Macro Split
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 1: Input Your Total Daily Energy Expenditure (TDEE)
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Your TDEE is the total number of calories your body burns in a day including exercise. The calculator offers a built-in TDEE estimator or lets you paste your own value from our sister tool. Simply enter your age, gender, weight, height, and activity level — from sedentary to very active — and the tool instantly computes your accurate TDEE using the proven Mifflin-St Jeor equation multiplied by your activity factor.
        </p>
        <p className="text-gray-300 italic text-base">
          Pro tip: If you already know your TDEE from previous tracking, you can override the automatic calculation for even more precision.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 2: Select Your Primary Goal (Lose, Maintain, or Gain)
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Choose “Lose Fat” for a safe calorie deficit, “Maintain Weight” to stay exactly where you are, or “Gain Muscle” for a controlled surplus. The calculator automatically applies the most evidence-based adjustment: a 500-calorie daily deficit for sustainable fat loss (roughly 0.5 kg or 1 lb per week), zero change for maintenance, or a 250–500 calorie surplus for lean gains.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step 3: Choose a Diet Preference: From Keto to High-Protein
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          Pick your preferred eating style and the calculator instantly adjusts the macronutrient ratios. Options include Balanced Diet, High-Protein, Ketogenic, Low-Carb, and more. No matter which plan you select, the tool recalculates everything in real time so your daily grams of protein, carbs, and fats perfectly match both your calorie target and your chosen diet philosophy.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Understanding the Results: Target Calories vs. Macronutrient Grams
        </h3>
        <p className="text-gray-200 leading-relaxed text-base">
          The results panel displays your exact daily calorie target in large, bold text, followed by a clean breakdown of protein, carbohydrate, and fat grams. Colour-coded bars show the percentage split at a glance, and a one-click “Copy to Clipboard” button lets you save the numbers for your meal-tracking app. You also receive a suggested daily range so you can stay flexible while still hitting your goal.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Advanced Features: Personalized Diet Preferences &amp; Ratios
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      The Balanced Diet: Standard 30/40/30 Macro Split
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      The most popular and sustainable choice for long-term success. This split delivers approximately 30% of calories from protein, 40% from carbohydrates, and 30% from fats — the perfect mix for steady energy, muscle maintenance, and overall health.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      High-Protein Plan: Fueling Muscle Recovery with a 40% Protein Intake
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      Ideal for anyone lifting weights or in a calorie deficit. By bumping protein to 40% of total calories (with the remaining 30% carbs and 30% fats), this plan maximises muscle retention and keeps you feeling full longer.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Going Ketogenic: Understanding the 70% Fat and 5% Carb Ratio
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      The classic keto macro split: roughly 70–75% fat, 5–10% carbohydrates, and 15–25% protein. The calculator automatically keeps net carbs under 50 g per day while prioritising healthy fat sources to keep you in nutritional ketosis.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Low-Carb Strategy: Balancing Fats and Proteins for Sustained Energy
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      A flexible middle ground — typically 20–30% carbs, 30–40% protein, and 35–45% fat. This approach reduces insulin spikes while still providing enough carbohydrates for workouts and daily performance.
    </p>

    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Diet Style</th>
            <th className="p-4 text-left font-semibold">Protein %</th>
            <th className="p-4 text-left font-semibold">Carbs %</th>
            <th className="p-4 text-left font-semibold">Fats %</th>
            <th className="p-4 text-left font-semibold">Best For</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">Balanced</td>
            <td className="p-4 font-mono">30%</td>
            <td className="p-4 font-mono">40%</td>
            <td className="p-4 font-mono">30%</td>
            <td className="p-4">General health &amp; sustainability</td>
          </tr>
          <tr>
            <td className="p-4">High-Protein</td>
            <td className="p-4 font-mono">40%</td>
            <td className="p-4 font-mono">30%</td>
            <td className="p-4 font-mono">30%</td>
            <td className="p-4">Muscle preservation in a deficit</td>
          </tr>
          <tr>
            <td className="p-4">Ketogenic</td>
            <td className="p-4 font-mono">20%</td>
            <td className="p-4 font-mono">5%</td>
            <td className="p-4 font-mono">75%</td>
            <td className="p-4">Fat adaptation &amp; appetite control</td>
          </tr>
          <tr>
            <td className="p-4">Low-Carb</td>
            <td className="p-4 font-mono">35%</td>
            <td className="p-4 font-mono">25%</td>
            <td className="p-4 font-mono">40%</td>
            <td className="p-4">Steady energy without ketosis</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      The Math Behind the Calculator: Calories to Grams Explained
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Why 500 Calories? The Standard Deficit for Sustainable Weight Loss
    </h3>
    <p className="text-gray-200 text-base mb-4">
      A daily deficit of 500 calories is the gold standard recommended by nutrition experts worldwide because it produces approximately 0.5 kg (1 lb) of fat loss per week without crashing your metabolism or triggering extreme hunger. The calculator uses this exact figure for the “Lose Fat” goal, but you can manually adjust the deficit size if you prefer a more aggressive or gentler approach.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      The 4-4-9 Rule: How We Convert Calories into Protein, Carbs, and Fats
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Each macronutrient provides a specific amount of energy per gram:
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">
      Formula:{" "}
      <span className="font-mono text-green-300">
        Protein = 4 kcal/g • Carbohydrates = 4 kcal/g • Fat = 9 kcal/g
      </span>
    </h4>
    <p className="text-gray-200 text-base">
      Once your total daily calories and macro percentages are known, the calculator divides the calorie contribution of each macro by its energy value to give you the exact gram targets.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Calculation Example: A 2500 Calorie TDEE for Fat Loss
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Let&apos;s walk through a complete example:
    </p>
    <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
      <li>TDEE = 2500 kcal</li>
      <li>Goal = Lose Fat → 500 kcal deficit</li>
      <li>Target calories = 2000 kcal</li>
      <li>Balanced 30/40/30 split</li>
    </ul>
    <p className="text-gray-200 text-base mt-6">
      Protein calories: 30% of 2000 = 600 kcal → 600 ÷ 4 = <strong>150 g protein</strong><br />
      Carbohydrate calories: 40% of 2000 = 800 kcal → 800 ÷ 4 = <strong>200 g carbs</strong><br />
      Fat calories: 30% of 2000 = 600 kcal → 600 ÷ 9 = <strong>67 g fat</strong>
    </p>
    <p className="text-gray-200 text-base mt-4">
      The calculator performs this entire sequence instantly and shows you the final numbers every single time.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Why Macros Matter More Than Just Calories
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      The Role of Protein in Muscle Preservation During a Deficit
    </h3>
    <p className="text-gray-200 text-base mb-4">
      When you eat in a calorie deficit your body can break down muscle tissue for energy. A higher protein intake (1.6–2.2 g per kg of body weight or 30–40% of calories) signals your body to spare muscle, supports recovery from training, and keeps you feeling satisfied longer.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How Carbohydrates Fuel Your Daily Performance
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Carbs are your body&apos;s preferred quick energy source — especially for high-intensity workouts, brain function, and daily activity. The right carbohydrate amount prevents fatigue, improves workout quality, and replenishes glycogen stores so you can train consistently even while losing fat.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Healthy Fats: Essential for Hormonal Balance and Satiety
    </h3>
    <p className="text-gray-200 text-base leading-relaxed">
      Dietary fat is vital for hormone production (testosterone, estrogen, thyroid), vitamin absorption, and keeping you full between meals. The calculator always reserves enough calories for healthy fats (at least 0.5 g per kg of body weight) so your endocrine system stays optimised and cravings stay under control.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Real-World Calorie Deficit Examples
    </h2>

    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Profile</th>
            <th className="p-4 text-left font-semibold">TDEE</th>
            <th className="p-4 text-left font-semibold">Goal</th>
            <th className="p-4 text-left font-semibold">Target Calories</th>
            <th className="p-4 text-left font-semibold">Macro Split (g)</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">Office worker, moderate activity</td>
            <td className="p-4">2200 kcal</td>
            <td className="p-4">Lose Fat</td>
            <td className="p-4">1700 kcal</td>
            <td className="p-4">128P / 170C / 56F (Balanced)</td>
          </tr>
          <tr>
            <td className="p-4">Gym enthusiast, 5× training</td>
            <td className="p-4">2800 kcal</td>
            <td className="p-4">Lose Fat</td>
            <td className="p-4">2300 kcal</td>
            <td className="p-4">230P / 173C / 77F (High-Protein)</td>
          </tr>
          <tr>
            <td className="p-4">Keto dieter</td>
            <td className="p-4">2400 kcal</td>
            <td className="p-4">Lose Fat</td>
            <td className="p-4">1900 kcal</td>
            <td className="p-4">95P / 24C / 158F (Keto)</td>
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
      Pair your calorie deficit plan with these other free, accurate calculators from our collection:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li>
        <Link
          href="/calculators/health/bmr-calculator"
          className="text-blue-400 hover:underline"
        >
          BMR &amp; TDEE Calculator
        </Link>{" "}
        — calculate your exact daily calorie burn
      </li>
      <li>
        <Link
          href="/calculators/health/bmi-calculator"
          className="text-blue-400 hover:underline"
        >
          BMI Calculator
        </Link>{" "}
        — understand your current body composition
      </li>
      
      <li>
        <Link
          href="/calculators/health/body-fat-calculator"
          className="text-blue-400 hover:underline"
        >
          Body Fat Percentage Calculator
        </Link>{" "}
        — track your fat-loss progress accurately
      </li>
    </ul>

    <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
      Mastering your calorie deficit and macro split is the fastest, most sustainable way to reach your body goals. Our calorie deficit calculator is fast, accurate, completely free, and ready whenever you need it. Bookmark this page and start building the exact nutrition plan that matches your lifestyle today!
    </p>
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}