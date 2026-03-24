import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const AdvancedBMRCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});

const faqData = [
  {
    question: "What is Basal Metabolic Rate (BMR) and how is it calculated?",
    answer: "BMR is the minimum number of calories your body needs to function while at complete rest. Most modern calculators use the Mifflin-St Jeor Equation. For men: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age) + 5. For women: BMR = (10 * weight in kg) + (6.25 * height in cm) - (5 * age) - 161.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer: "While BMR is the energy burned at rest, TDEE (Total Daily Energy Expenditure) accounts for your daily physical activity. To find your TDEE, you multiply your BMR by an activity factor (e.g., 1.2 for sedentary or 1.55 for moderately active). TDEE is the real number you should use for weight management goals.",
  },
  {
    question: "Can I increase my BMR to burn more calories?",
    answer: "Yes, the most effective way to raise your BMR is by increasing lean muscle mass. Muscle tissue is more metabolically active than fat, meaning it burns more calories even when you are sleeping. Other factors include staying hydrated and ensuring adequate protein intake to support muscle repair.",
  },
  {
    question: "Why does BMR decrease as we get older?",
    answer: "BMR typically drops by 1% to 2% per decade after age 20. This is primarily due to 'sarcopenia,' or the natural loss of muscle mass, and changes in hormonal levels. This is why maintaining a strength training routine is crucial for keeping your metabolism high as you age.",
  },
  {
    question: "How many calories should I eat based on my BMR?",
    answer: "If your goal is weight loss, you should consume fewer calories than your TDEE, but rarely fewer than your BMR. Eating below your BMR for extended periods can trigger 'starvation mode,' where your body slows down its metabolism to conserve energy, making long-term weight loss harder.",
  },
  {
    question: "Does caffeine or spicy food actually speed up BMR?",
    answer: "Caffeine and capsaicin (found in peppers) can cause a temporary 'thermogenic' spike, increasing calorie burn by about 5% to 8% for a short window. However, these effects are minor and not a substitute for consistent exercise and a balanced diet for metabolic health.",
  },
];
export const metadata: Metadata = {
 title: "Bmr calculator: calculate your basal metabolic rate accurately",

description: "use our free bmr calculator to determine your basal metabolic rate using the mifflin-st jeor equation. get instant daily, monthly, and yearly calorie estimates.",
  keywords: [
    "bmr calculator with activity level",
    "calculate basal metabolic rate",
    "daily calorie needs calculator",
    "mifflin st jeor formula tool",
    "resting energy expenditure",
    "lizocalc bmr tool",
    "metabolic rate for weight loss",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/bmr-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced BMR Calculator | Accurate Metabolism Tool",
    description:
      "Find out how many calories your body burns at rest. Our advanced BMR calculator provides precise results for personalized diet and fitness planning.",
    url: "https://lizocalc.com/calculators/health/bmr-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced BMR Calculator | Precise Resting Calories",
    description:
      "Instantly determine your BMR and resting metabolic rate with our professional-grade health calculator.",
  },
};
export default function BMRPage() {
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
                  "https://lizocalc.com/calculators/health/bmr-calculator#breadcrumb",
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
                    name: "BMR Calculator",
                    item: "https://lizocalc.com/calculators/health/bmr-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/bmr-calculator",
                url: "https://lizocalc.com/calculators/health/bmr-calculator",
                name: "Advanced BMR Calculator",
                description: "Use our advanced BMR calculator to estimate your Basal Metabolic Rate and understand how many calories your body burns at rest.",
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
                  "https://lizocalc.com/calculators/health/bmr-calculator#app",
                name: "Advanced BMR Calculator",
                url: "https://lizocalc.com/calculators/health/bmr-calculator",
                description:
                  "Advanced BMR calculator to determine resting metabolic rate and daily baseline energy needs.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMR Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Basal Metabolic Rate (BMR)",
                  "Scientific estimation formulas",
                  "Support for metric and imperial units",
                  "Baseline calorie requirements analysis",
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
BMR Calculator: Find Your Basal Metabolic Rate and Daily Calorie Needs            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMRCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Basal Metabolic Rate (BMR)</strong> — also known as your body’s resting calorie burn — is one of the most important numbers for anyone serious about health, fitness, or weight management. Whether you’re a student in Sahiwal, Punjab, Pakistan, hitting the gym after college classes at Government College Sahiwal, a busy professional in Lahore or Karachi trying to lose those extra kilos before Eid, a homemaker planning nutritious family meals with roti and sabzi, or an athlete training for the next cricket season, knowing your exact BMR helps you understand how many calories your body needs just to stay alive and function at complete rest — no exercise, no digestion, no movement.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>BMR calculator</strong> takes all the guesswork out of the process. Simply select your gender, adjust the intuitive sliders for age, weight (in kg), and height (in cm), and get your precise BMR instantly — complete with daily, monthly, and yearly estimates, live result updates, and easy-to-understand science. The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last inputs (with your consent), uses metric units perfect for Pakistan standards, handles every age and body size, and never shows any ads. Perfect for quick diet planning, fat-loss tracking, or even nutrition lessons in Pakistani schools and universities. Jump right in and try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/health/bmr-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            BMR calculator page
          </NoPrefetchLink>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your BMR with Precision
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step-by-Step: Using the Parameters Panel
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Open the BMR calculator and locate the clean <strong>Parameters Panel</strong> on the left (desktop) or top (mobile).
                </li>
                <li>
                  Select your biological gender using the large toggle or radio buttons — this is the first and most important step for accuracy.
                </li>
                <li>
                  Slide the <strong>Age</strong> handle to your current age in years (the value updates live).
                </li>
                <li>
                  Adjust the <strong>Weight</strong> slider to your current body weight in kilograms (perfect for Pakistani scales that use kg).
                </li>
                <li>
                  Move the <strong>Height</strong> slider to your height in centimeters (most common unit across Pakistan and the world).
                </li>
                <li>
                  Watch the results panel update instantly with your Daily BMR, Monthly estimate, and Yearly projection.
                </li>
                <li>
                  Finished or want to try new numbers? Hit the big <strong>Reset</strong> button to clear everything and start fresh — ideal for comparing family members or different goals.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The calculator auto-validates inputs, prevents unrealistic values (e.g., weight below 20 kg), and gives gentle guidance if you enter extreme numbers so you can focus on your health goals instead of fighting the interface.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Selecting Your Gender for Biological Accuracy
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Gender selection is not just a formality — it accounts for fundamental physiological differences. Men typically have higher muscle mass and testosterone levels, which raise resting calorie burn. Women have different body composition and hormonal profiles. Choosing correctly ensures the Mifflin-St Jeor equation applies the right constants. In Pakistan, where both men and women follow similar diets but have different activity patterns (office jobs vs. household work), this step makes your BMR result truly personal and actionable.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Adjusting Age, Weight, and Height Sliders
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The sliders are designed for instant feedback. Age affects BMR because metabolism naturally slows after 20 (roughly 1–2 % per decade due to gradual muscle loss). Weight and height directly scale with body size — every extra kilogram of muscle burns more calories even at rest. Use your most recent measurements: weigh yourself in the morning after waking (empty stomach), measure height without shoes against a wall. For students in Sahiwal or anywhere in Punjab, these sliders make it easy to recalculate after Ramadan fasting, wedding season weight changes, or consistent gym training.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Your BMR Results: Daily, Monthly, and Yearly Estimates
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            What Your Daily BMR (cal/day) Says About Your Resting State
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Your daily BMR number (displayed in bold, large font) tells you exactly how many calories your body burns in 24 hours while lying completely still — heart beating, lungs breathing, organs functioning, but zero physical activity or food digestion. Example: A 30-year-old male, 75 kg, 175 cm tall from Sahiwal gets approximately 1,700 cal/day. That is his true “idle” burn. Anything you eat above this (plus activity) either fuels movement or gets stored as fat.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Long-term Planning: Monthly and Yearly Caloric Requirements
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The calculator automatically multiplies your daily BMR by 30.44 (average month length) for monthly needs and by 365.25 (average year) for yearly needs. This helps with long-term planning — budgeting groceries in Pakistan where monthly food costs matter, or setting yearly fat-loss targets before the next cricket season. Monthly estimate = Daily BMR × 30.44. Yearly estimate = Daily BMR × 365.25. These projections make it easy to see the impact of even small daily changes over time.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How to Reset and Recalculate Your Data
          </h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The prominent <strong>Reset</strong> button instantly clears all sliders and returns the calculator to default values (30-year-old male, 70 kg, 170 cm). Use it when switching between family members, testing “what-if” scenarios (e.g., after gaining muscle), or simply starting a fresh calculation. The entire process takes under 10 seconds, making it perfect for teachers demonstrating in class or coaches tracking multiple clients.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Science Behind the Calculator: The Mifflin-St Jeor Equation
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Male BMR Formula Explained
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The calculator uses the most accurate modern formula:
          </p>
          <p className="text-gray-200 text-base mb-4 font-medium">
            <span className="font-mono text-green-300">BMR (male) = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) + 5</span>
          </p>
          <p className="text-gray-200 text-base">
            Each term has meaning: 10 × weight reflects muscle and organ mass; 6.25 × height accounts for surface area; −5 × age captures the natural metabolic slowdown; +5 is the male-specific constant. Try it: 75 kg, 175 cm, 30 years → 10×75 = 750; 6.25×175 = 1,093.75; −5×30 = −150; +5 = total <strong>1,698.75 cal/day</strong>.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Female BMR Formula Explained
          </h3>
          <p className="text-gray-200 text-base mb-4">
            For women the constant changes to reflect lower average muscle mass:
          </p>
          <p className="text-gray-200 text-base mb-4 font-medium">
            <span className="font-mono text-green-300">BMR (female) = 10 × weight (kg) + 6.25 × height (cm) − 5 × age (years) − 161</span>
          </p>
          <p className="text-gray-200 text-base">
            Same logic except the final −161 adjustment. Example: 60 kg, 160 cm, 30 years → 600 + 1,000 − 150 − 161 = <strong>1,289 cal/day</strong>. This is why accurate gender selection matters.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why We Use Mifflin-St Jeor Instead of Harris-Benedict
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The Mifflin-St Jeor equation (1990) is proven more accurate in over 20 peer-reviewed studies than the older 1919 Harris-Benedict formula, especially for modern populations that include overweight individuals and diverse ethnic groups. It has a lower prediction error (±10 % vs. ±15–20 %). Here is a quick comparison:
          </p>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Aspect</th>
                  <th className="p-4 text-left font-semibold">Mifflin-St Jeor</th>
                  <th className="p-4 text-left font-semibold">Harris-Benedict (Revised)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Year Developed</td>
                  <td className="p-4">1990</td>
                  <td className="p-4">1984 (revised)</td>
                </tr>
                <tr>
                  <td className="p-4">Accuracy for Today’s Population</td>
                  <td className="p-4 font-bold text-green-400">±10 % error</td>
                  <td className="p-4">±15–20 % error</td>
                </tr>
                <tr>
                  <td className="p-4">Best For</td>
                  <td className="p-4">All body sizes including overweight</td>
                  <td className="p-4">Lean individuals only</td>
                </tr>
                <tr>
                  <td className="p-4">Used in Our Calculator?</td>
                  <td className="p-4 font-bold text-green-400">Yes — default</td>
                  <td className="p-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Knowing Your Basal Metabolic Rate Matters for Health
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Using BMR for Weight Loss and Calorie Deficits
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            BMR is the foundation of every sustainable fat-loss plan. To lose weight safely you create a moderate deficit from your <strong>Total Daily Energy Expenditure (TDEE)</strong>, not just BMR. But BMR tells you the absolute minimum you must never go below (usually 1,200 cal/day for women, 1,500 for men) to avoid metabolic slowdown. Example: If your BMR is 1,600 and you are lightly active (TDEE ≈ 1,920), eating 1,600–1,700 calories creates a safe 200–300 calorie daily deficit — enough to lose 0.25–0.5 kg per week without crashing your energy.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How BMR Changes with Age and Muscle Mass
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            After age 20, BMR drops approximately 1–2 % per decade because we lose muscle (sarcopenia). Building 1 kg of new muscle through strength training (common in Pakistani gyms) can add roughly 13 extra calories burned at rest every single day. That is why resistance training is the best long-term investment for anyone in Sahiwal or across Pakistan who wants to stay lean into their 40s and 50s.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Relationship Between BMR and Total Daily Energy Expenditure (TDEE)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            BMR is the base. TDEE = BMR × Activity Multiplier. Common multipliers used worldwide (and in our sister calculator):
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Sedentary (office job) → ×1.2</li>
            <li>Lightly active (walking 5,000 steps) → ×1.375</li>
            <li>Moderately active (gym 3–4× week) → ×1.55</li>
            <li>Very active (daily training) → ×1.725</li>
            <li>Extra active (athlete or labour job) → ×1.9</li>
          </ul>
          <p className="text-gray-200 text-base mt-4">
            Link directly to our <NoPrefetchLink href="/calculators/health/tdee-calculator" className="text-blue-400 hover:underline">activity-based calorie needs calculator</NoPrefetchLink> for the full picture.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Explore More Health and Fitness Tools
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Check Your Body Mass Index (BMI)</h4>
              <p className="text-gray-200 text-base mb-4">
                Instantly see if you fall in the underweight, normal, overweight, or obese category according to WHO and Pakistani health guidelines.
              </p>
              <NoPrefetchLink
                href="/calculators/health/bmi-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open BMI Calculator →
              </NoPrefetchLink>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Estimate Your Body Fat Percentage</h4>
              <p className="text-gray-200 text-base mb-4">
                Using Navy method or tape measurements — far more useful than BMI alone for real body composition tracking.
              </p>
              <NoPrefetchLink
                href="/calculators/health/body-fat-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open Body Fat Calculator →
              </NoPrefetchLink>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Calculate Your Activity-Based Calorie Needs</h4>
              <p className="text-gray-200 text-base mb-4">
                Turn your BMR into real-world TDEE with five activity levels tailored for desk jobs, gym-goers, and athletes across Pakistan.
              </p>
              <NoPrefetchLink
                href="/calculators/health/tdee-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open TDEE Calculator →
              </NoPrefetchLink>
            </div>
          </div>

          <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
            Your BMR is the foundation of every smart health decision. Our free BMR calculator is fast, accurate, completely private, and built for real people in Sahiwal, across Pakistan, and around the world. Bookmark it today and take control of your metabolism, weight goals, and long-term fitness — one precise calculation at a time!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}