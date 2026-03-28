import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import Link from "next/link";
import AdvancedMacrosCalculator from './clientside'


const faqData = [
  {
    question: "What are macros and why are they important?",
    answer: "Macros, or macronutrients, are the three main components of food: protein, carbohydrates, and fats. While calories determine weight change, macros determine body composition. Protein builds muscle, carbohydrates provide energy for workouts, and fats support hormone production and cellular health.",
  },
  {
    question: "How do I calculate my daily macro ratio?",
    answer: "Macro ratios are calculated based on your total daily calories. A common 'Balanced' ratio is 40% carbs, 30% protein, and 30% fats. To calculate this for a 2,000-calorie diet: 800 calories from carbs (2,000 * 0.40), 600 from protein (2,000 * 0.30), and 600 from fats (2,000 * 0.30).",
  },
  {
    question: "How many calories are in a gram of protein, carbs, and fat?",
    answer: "To convert your macros into grams, use the 4-4-9 rule: Protein contains 4 calories per gram, carbohydrates contain 4 calories per gram, and fats contain 9 calories per gram. This is why high-fat foods are more 'calorie-dense' than high-protein or high-carb foods.",
  },
  {
    question: "How much protein do I need to build muscle?",
    answer: "For muscle hypertrophy, the general scientific recommendation is to consume between 1.6 to 2.2 grams of protein per kilogram of body weight. For a 75kg individual, this equals a daily range of 120g to 165g of protein (75 * 1.6 and 75 * 2.2).",
  },
  {
    question: "What is the best macro split for weight loss?",
    answer: "There is no single 'best' split, but many prefer a 'High Protein' ratio like 35% protein, 35% carbs, and 30% fats. High protein intake helps preserve lean muscle mass during a calorie deficit, ensuring that the weight lost comes primarily from body fat stores rather than muscle tissue.",
  },
  {
    question: "Do I need to track macros every single day?",
    answer: "While tracking macros provides precision for reaching specific fitness goals, it is often used as a learning tool. After 2 to 4 weeks of consistent tracking, most users develop 'intuitive eating' skills, allowing them to estimate portions and nutrient density without needing a calculator for every meal.",
  },
];

export const metadata: Metadata = {
  title: "Macro calculator: calculate your personal protein, carb, and fat goals",

description: "easily calculate your daily macros for weight loss, maintenance, or muscle gain. choose from keto, high protein, or balanced diet plans for instant results.",
  keywords: [
    "calculate macros for muscle gain",
    "macronutrient ratio calculator",
    "iifym macro calculator",
    "protein intake tool",
    "low carb macro ratio",
    "lizocalc macros tool",
    "bodybuilding macro split",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/macros-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Macros Calculator | Precise Nutrient Tracking",
    description:
      "Take control of your nutrition. Our advanced macros calculator provides the exact gram targets you need for protein, carbohydrates, and healthy fats.",
    url: "https://www.lizocalc.com/calculators/health/macros-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Macros Calculator | Your Perfect Split",
    description:
      "Instantly determine your daily macronutrient needs and meal plan ratios with our professional-grade health calculator.",
  },
};

export default function MacrosPage() {
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
                  "https://www.lizocalc.com/calculators/health/macros-calculator#breadcrumb",
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
                    name: "Macros Calculator",
                    item: "https://www.lizocalc.com/calculators/health/macros-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/health/macros-calculator",
                url: "https://www.lizocalc.com/calculators/health/macros-calculator",
                name: "Advanced Macros Calculator",
                description: "Use our advanced macros calculator to determine your optimal protein, fat, and carbohydrate intake to help you reach your fitness goals.",
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
                  "https://www.lizocalc.com/calculators/health/macros-calculator#app",
                name: "Advanced Macros Calculator",
                url: "https://www.lizocalc.com/calculators/health/macros-calculator",
                description:
                  "Advanced macros calculator to estimate daily protein, fat, and carbohydrate requirements.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Macros Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate daily protein, fat, and carb needs",
                  "Support for various diet types",
                  "Customizable macro ratios",
                  "Goal-based recommendations",
                  "User-friendly breakdown charts",
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
             Macro Calculator: Personalize Your Daily Protein, Carb, and Fat Targets
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedMacrosCalculator />
      </section>

      {/* SEO Content */}
   <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Macros Calculator</strong> — your personal guide to turning daily calories into the perfect balance of protein, carbohydrates, and fats — is one of the most powerful tools for anyone serious about fitness, fat loss, muscle gain, or simply feeling their best every day. Whether you’re a student in hitting the gym between classes, a professional balancing work and weekend training, a parent managing family meals, or an athlete chasing new personal records, knowing your ideal macronutrient ratio takes the guesswork out of nutrition and turns every meal into strategic fuel.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>macros calculator</strong> does all the heavy lifting. Enter your daily calorie goal (TDEE), pick your goal (lose, maintain, or gain), choose your preferred diet style, and instantly receive precise gram targets for protein, carbs, and fats — complete with live updates, visual pie charts, and clear explanations. The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last inputs (with your consent), uses metric-friendly defaults, and never shows any ads. Perfect for daily meal planning, contest prep, or teaching nutrition basics anywhere in the world. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/health/macros-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            macros calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Ideal Macronutrient Ratio
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step 1: Input Your Daily Calorie Goal (TDEE)
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Start by entering your Total Daily Energy Expenditure (TDEE) — the total calories your body burns in a typical day including activity. You can type it manually or pull it directly from our linked TDEE calculator. This number becomes the 100% foundation for every macro split. Example: A moderately active 75 kg adult might have a TDEE of 2,800 calories. Everything else is calculated from this single value.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
                Step 2: Choose Your Primary Goal: Lose, Maintain, or Gain
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Select your main objective. “Lose” automatically applies a safe 500-calorie daily deficit. “Maintain” keeps calories exactly at your TDEE. “Gain” adds a 500-calorie surplus for lean muscle building. The calculator instantly adjusts your total calories and redistributes the macros so you stay on track without starving or overeating.
              </p>

              <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
                Step 3: Select Your Preferred Diet Type
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Choose from four science-backed diet styles: Balanced, High Protein, Low Carb, or Ketogenic. Each style uses proven percentage splits that have helped millions worldwide reach their goals. The moment you select a style, the calculator shows your exact gram targets and updates the visual macro pie chart in real time.
              </p>

              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: After calculating, hit the <strong>Reset</strong> button to test different goals or diet types side-by-side — perfect for comparing how a high-protein plan feels versus a ketogenic approach before you commit.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Our Diet Preferences and Formulas
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Balanced Diet: The 30/40/30 Standard for Sustainability
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The most popular and easiest-to-follow split worldwide: 30% protein, 40% carbohydrates, 30% fats. It supports steady energy, muscle maintenance, and long-term adherence without extremes.
          </p>
          <p className="text-gray-200 text-base font-medium mb-6">
            Formula for a 2,500-calorie goal:<br />
            Protein: 30% of 2,500 = 750 cal ÷ 4 = <strong>187.5 g</strong><br />
            Carbs: 40% of 2,500 = 1,000 cal ÷ 4 = <strong>250 g</strong><br />
            Fats: 30% of 2,500 = 750 cal ÷ 9 = <strong>83 g</strong>
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            High Protein: Optimizing for Muscle Growth (40/35/25)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Designed for strength athletes and anyone prioritizing lean muscle: 40% protein, 35% carbs, 25% fats. Higher protein preserves muscle during fat loss and maximizes growth during bulking.
          </p>
          <p className="text-gray-200 text-base font-medium mb-6">
            Formula for a 2,500-calorie goal:<br />
            Protein: 40% of 2,500 = 1,000 cal ÷ 4 = <strong>250 g</strong><br />
            Carbs: 35% of 2,500 = 875 cal ÷ 4 = <strong>218.75 g</strong><br />
            Fats: 25% of 2,500 = 625 cal ÷ 9 = <strong>69 g</strong>
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Low Carb: Managing Insulin and Energy (35/20/45)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Ideal for fat loss and blood-sugar control: 35% protein, 20% carbs, 45% fats. Keeps insulin lower while still providing enough carbs for workouts.
          </p>
          <p className="text-gray-200 text-base font-medium mb-6">
            Formula for a 2,500-calorie goal:<br />
            Protein: 35% of 2,500 = 875 cal ÷ 4 = <strong>218.75 g</strong><br />
            Carbs: 20% of 2,500 = 500 cal ÷ 4 = <strong>125 g</strong><br />
            Fats: 45% of 2,500 = 1,125 cal ÷ 9 = <strong>125 g</strong>
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Ketogenic Strategy: High-Fat, Ultra-Low Carb (25/5/70)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            True keto for rapid fat burning and mental clarity: 25% protein, 5% carbs, 70% fats. Forces the body into ketosis by keeping carbs under 50 g on most days.
          </p>
          <p className="text-gray-200 text-base font-medium mb-6">
            Formula for a 2,500-calorie goal:<br />
            Protein: 25% of 2,500 = 625 cal ÷ 4 = <strong>156 g</strong><br />
            Carbs: 5% of 2,500 = 125 cal ÷ 4 = <strong>31 g</strong><br />
            Fats: 70% of 2,500 = 1,750 cal ÷ 9 = <strong>194 g</strong>
          </p>

          <div className="overflow-x-auto mt-12 mb-12">
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
                  <td className="p-4 font-medium">Balanced</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">Everyday sustainability</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">High Protein</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">35%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">Muscle building &amp; fat loss</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Low Carb</td>
                  <td className="p-4">35%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">45%</td>
                  <td className="p-4">Insulin control &amp; steady energy</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Ketogenic</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">5%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4">Maximum fat burn &amp; keto adaptation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Your Fitness Goals Change Your Caloric Intake
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Calculating a Healthy Deficit for Fat Loss (-500 Calories)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Subtract 500 calories from your TDEE to create a safe, sustainable weekly fat-loss rate of approximately 0.5 kg. Example: TDEE = 2,800 cal → Fat-loss calories = 2,300 cal. The macros calculator automatically reapplies your chosen percentages to this new total so you never guess portion sizes again.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Finding Your Maintenance Sweet Spot for Weight Stability
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Use your exact TDEE with zero adjustment. This is the gold standard for long-term body recomposition, performance athletes, or anyone happy with their current weight and shape. Your macros calculator keeps every gram perfectly balanced so energy, recovery, and hormones stay optimal.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Creating a Caloric Surplus for Lean Muscle Gain (+500 Calories)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Add 500 calories to your TDEE for a controlled lean bulk. Example: TDEE = 2,800 cal → Bulking calories = 3,300 cal. Pair this with the High Protein (40/35/25) split and progressive resistance training to ensure most of the surplus goes toward muscle, not fat.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Science of Macros: Why Grams Matter More Than Just Calories
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Protein: The Building Block (4 Calories per Gram)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Every gram of protein supplies 4 calories and is essential for repairing muscle tissue, producing enzymes and hormones, and keeping you full. Research shows 1.6–2.2 g of protein per kg of body weight maximizes muscle growth and preservation — exactly what our High Protein and Balanced splits deliver.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Carbohydrates: Your Body’s Preferred Fuel (4 Calories per Gram)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Carbs also provide 4 calories per gram and are the fastest source of energy for brain and muscles. They replenish glycogen stores after workouts and spare protein from being burned for fuel. Our Low Carb and Ketogenic options strategically lower carbs while the Balanced and High Protein plans keep them moderate for sustained performance.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Dietary Fats: Essential for Hormone Health (9 Calories per Gram)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Fats deliver 9 calories per gram — more than double protein or carbs — and are vital for testosterone production, vitamin absorption, joint health, and brain function. Even in low-fat plans we never drop below 20–25% to protect long-term hormonal balance and satiety.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mt-8">
            <h4 className="text-xl font-semibold text-blue-300 mb-3">Macro Calorie Math at a Glance</h4>
            <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
              <li><strong>Protein</strong>: grams × 4 = calories</li>
              <li><strong>Carbohydrates</strong>: grams × 4 = calories</li>
              <li><strong>Fats</strong>: grams × 9 = calories</li>
              <li>Total calories = (protein cal + carb cal + fat cal) — must equal your chosen goal calories</li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Take Your Fitness Further with Related Tools
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">TDEE Calculator: Discover Your Daily Energy Expenditure</h4>
              <p className="text-gray-200 text-base mb-4">
                Calculate your exact Total Daily Energy Expenditure using the Mifflin-St Jeor equation and five activity levels — the essential first step before using any macros plan.
              </p>
              <Link
                href="/calculators/health/tdee-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open TDEE Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">BMI Calculator: Assess Your Body Mass Index</h4>
              <p className="text-gray-200 text-base mb-4">
                Quickly check your current body composition category and set realistic macro targets based on your starting point.
              </p>
              <Link
                href="/calculators/health/bmi-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open BMI Calculator →
              </Link>
            </div>
          </div>

          <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
            Your macros are the blueprint for real results. Our free macros calculator is fast, accurate, science-backed, and built for anyone , across the globe, or anywhere in between who wants to stop guessing and start achieving. Bookmark it today, pair it with your TDEE and BMI tools, and watch your body transform — one perfectly balanced meal at a time!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}