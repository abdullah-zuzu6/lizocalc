import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";


import AdvancedBodyFatCalculator from './clientside'

const faqData = [
  {
    question: "How is body fat percentage calculated?",
    answer:
      "Body fat percentage is calculated using body measurements (like neck, waist, and hip circumference) combined with your height and weight via standardized formulas.",
  },
  {
    question: "Is this measurement accurate?",
    answer:
      "While it provides a reliable estimate for fitness tracking, it is an approximation and may vary compared to clinical methods like DEXA scans.",
  },
];

export const metadata: Metadata = {
 title: " Body fat calculator - best method & lean mass tracker",
description: "calculate your body fat percentage, lean body mass, and total fat weight using the u.s. navy circumference method. get instant, precise results for men and women.",
  keywords: [
    "body fat percentage calculator",
    "navy method body fat tool",
    "calculate lean body mass",
    "body composition tracker",
    "waist to neck ratio calculator",
    "lizocalc fitness tools",
    "us navy body fat formula",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/body-fat-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Body Fat Calculator | Accurate Composition Tool",
    description:
      "Track your fitness journey by calculating your body fat percentage. Our advanced tool uses professional formulas for precise body composition results.",
    url: "https://www.lizocalc.com/calculators/health/body-fat-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Body Fat Calculator | Track Lean Muscle",
    description:
      "Instantly determine your body fat percentage and fitness category with our professional-grade measurement calculator.",
  },
};

export default function BodyFatPage() {
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
                  "https://www.lizocalc.com/calculators/health/body-fat-calculator#breadcrumb",
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
                    name: "Body Fat Calculator",
                    item: "https://www.lizocalc.com/calculators/health/body-fat-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/health/body-fat-calculator",
                url: "https://www.lizocalc.com/calculators/health/body-fat-calculator",
                name: "Advanced Body Fat Calculator",
                description: "Use our advanced body fat calculator to estimate your body composition and track your fitness progress based on body measurements.",
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
                  "https://www.lizocalc.com/calculators/health/body-fat-calculator#app",
                name: "Advanced Body Fat Calculator",
                url: "https://www.lizocalc.com/calculators/health/body-fat-calculator",
                description:
                  "Advanced body fat calculator to estimate body fat percentage and body composition.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Body Fat Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate body fat percentage",
                  "Track body composition changes",
                  "Support for neck, waist, and hip measurements",
                  "Gender-specific calculation formulas",
                  "Fitness level categorization",
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
Body Fat Calculator: Track Your Body Composition Easily            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBodyFatCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Body Fat Calculator</strong> — powered by the accurate and widely trusted U.S. Navy circumference method — is one of the most practical and powerful tools for anyone serious about fitness, weight management, or overall health. Whether you're a busy professional in Sahiwal, Punjab, Pakistan, trying to shed those extra kilos after long office hours, a student hitting the local gym in Punjab, a homemaker tracking progress from home, or an athlete anywhere in the world aiming for peak performance, knowing your exact body fat percentage changes everything. It goes far beyond the bathroom scale and gives you real insight into fat mass versus lean muscle mass.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>body fat calculator</strong> takes all the guesswork out of the process. Simply select your gender, enter your height, weight, neck, waist (and hip for women), choose inches or centimeters, and click calculate. You’ll get instant results — body fat percentage, fat weight, lean mass, and clear explanations — all displayed in a clean, mobile-friendly interface that works offline after first load (progressive web app style). No ads, no data collection, and it remembers your last measurements with your consent. Perfect for daily tracking, exam prep for fitness certifications, or real-life health goals in Sahiwal or across the globe. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/fitness/body-fat-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            body fat calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Body Fat Percentage with the U.S. Navy Method
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Required Measurements: Neck, Waist, and Hip (for Women)
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                The U.S. Navy method is beautifully simple because it only needs a flexible measuring tape and a few precise circumferences. Men require neck and waist (abdomen) measurements plus height and weight. Women add one more — the hip circumference — because fat distribution differs between genders. All measurements should be taken while standing straight, breathing normally, and using the same tape each time for consistency.
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
                <li><strong>Neck:</strong> Measure just below the Adam’s apple (larynx) at the narrowest point. Keep the tape level and snug but not tight.</li>
                <li><strong>Waist (Abdomen):</strong> For men, measure at the navel (belly button). For women, measure at the narrowest point above the hips, usually 2–3 cm above the navel. Pull the tape snug without compressing the skin.</li>
                <li><strong>Hip (Women only):</strong> Measure at the widest part of the buttocks, feet together, tape parallel to the floor.</li>
                <li><strong>Height &amp; Weight:</strong> Use your most recent accurate height (in inches or cm) and current weight (kg or lbs).</li>
              </ul>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: Take each measurement three times and use the average. Measure first thing in the morning after using the bathroom for the most consistent results .
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step-by-Step Guide: How to Use the Parameters Panel
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Select your gender (Male or Female) — this automatically adjusts the formula and shows/hides the hip field.</li>
                <li>Choose your preferred unit system: Inches + Pounds (USC) or Centimeters + Kilograms (Metric). The calculator instantly converts everything.</li>
                <li>Enter your height and current body weight.</li>
                <li>Input your neck circumference, waist (abdomen), and hip (women only).</li>
                <li>Click the large, eye-catching <strong>Calculate Body Fat</strong> button.</li>
                <li>Instantly see your body fat percentage, total fat weight, and lean body mass displayed in bold at the top.</li>
                <li>Scroll down for the full breakdown — including how the U.S. Navy formula was applied, comparison to healthy ranges, and visual progress tips.</li>
                <li>Finished? Hit the <strong>Reset</strong> button to clear everything instantly — perfect when testing different “what-if” scenarios or logging weekly results.</li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool automatically validates entries, warns if measurements seem unrealistic (e.g., neck larger than waist), and works perfectly on mobile so you can measure and calculate right in your gym or bedroom.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Understanding Your Results: Fat Weight vs. Lean Mass
              </h3>
              <p className="text-gray-200 text-base mb-4">
                Once calculated, you’ll see three key numbers:
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
                <li><strong>Body Fat Percentage (%BF):</strong> The percentage of your total weight that is fat.</li>
                <li><strong>Fat Weight:</strong> Your total body fat in kg or lbs (simply %BF × total weight).</li>
                <li><strong>Lean Mass:</strong> Everything that is not fat — muscle, bones, organs, water (total weight − fat weight).</li>
              </ul>
              <p className="text-gray-200 text-base">
                Example: A 75 kg man with 18% body fat has <strong>13.5 kg fat weight</strong> and <strong>61.5 kg lean mass</strong>. Tracking lean mass over time shows whether you’re gaining muscle or just losing water weight.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Use the Circumference Method for Body Composition?
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Science Behind the U.S. Navy Body Fat Formula
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Developed by researchers at the Naval Health Research Center in San Diego, the U.S. Navy method was validated against the gold-standard underwater weighing (hydrostatic weighing) that measures <strong>body density</strong>. The formulas predict density from simple tape measurements and then convert it into body fat percentage using the Siri equation:
          </p>
          <p className="text-gray-200 text-base font-mono bg-gray-900 p-3 rounded-xl mb-6">
            % Body Fat = (495 / Body Density) − 450
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            The direct circumference equations (used in our calculator) were derived through multiple regression analysis on hundreds of Navy personnel. They correlate extremely well (r = 0.90) with lab results and have a standard error of only ±3.5%. This makes it one of the most reliable non-invasive methods available worldwide — from  fitness centers to U.S. military bases.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Male vs. Female Calculation Logic: Why Measurements Differ
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Men and women store fat differently. Men carry more abdominal fat (android pattern), so the formula uses only neck and waist. Women have more gluteal/hip fat (gynoid pattern), so the hip measurement is added to capture that distribution accurately.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Men’s Formula (inches)</h4>
              <p className="text-gray-200 text-base font-mono">
                %BF = 86.010 × log₁₀(abdomen − neck) − 70.041 × log₁₀(height) + 36.76
              </p>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Women’s Formula (inches)</h4>
              <p className="text-gray-200 text-base font-mono">
                %BF = 163.205 × log₁₀(waist + hip − neck) − 97.684 × log₁₀(height) − 78.387
              </p>
            </div>
          </div>
          <p className="text-gray-200 text-base mt-6">
            The metric versions are mathematically equivalent and automatically applied in our calculator when you choose cm/kg.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Benefits of Non-Invasive Body Fat Tracking at Home
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            No expensive DEXA scans, no calipers that pinch, no need for a lab. Just a ₹200 measuring tape and 5 minutes. It’s accurate enough for tracking trends, completely private, and empowers millions of people in Pakistan and worldwide to take control of their health without leaving home.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Interpreting Your Body Fat and Lean Mass Results
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            What Is a Healthy Body Fat Percentage for Men and Women?
          </h3>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Men</th>
                  <th className="p-4 text-left font-semibold">Women</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Essential Fat</td>
                  <td className="p-4 font-bold text-green-400">2–5%</td>
                  <td className="p-4 font-bold text-green-400">10–13%</td>
                </tr>
                <tr>
                  <td className="p-4">Athletes</td>
                  <td className="p-4 font-bold text-green-400">6–13%</td>
                  <td className="p-4 font-bold text-green-400">14–20%</td>
                </tr>
                <tr>
                  <td className="p-4">Fitness</td>
                  <td className="p-4 font-bold text-green-400">14–17%</td>
                  <td className="p-4 font-bold text-green-400">21–24%</td>
                </tr>
                <tr>
                  <td className="p-4">Average / Acceptable</td>
                  <td className="p-4 font-bold text-green-400">18–24%</td>
                  <td className="p-4 font-bold text-green-400">25–31%</td>
                </tr>
                <tr>
                  <td className="p-4">Obese / High Risk</td>
                  <td className="p-4 font-bold text-red-400">≥25%</td>
                  <td className="p-4 font-bold text-red-400">≥32%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base">These ranges shift slightly higher with age (see next section). Use our calculator to see exactly where you stand.</p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Tracking Lean Mass: Why It Matters for Your Fitness Goals
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Losing weight is easy on the scale — but losing muscle is the real danger. Lean mass is what keeps your metabolism high, protects your joints, and gives you strength. By tracking lean mass every 4–6 weeks with the body fat calculator, you can ensure your fat-loss plan is actually improving your body composition, not just shrinking you.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            How Age and Weight Influence Your Body Density Calculations
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Although the U.S. Navy formula itself does not include age as a direct input, healthy body fat ranges increase slightly with age because natural muscle loss (sarcopenia) and hormonal changes affect body density. Heavier individuals also tend to have higher absolute fat mass even at the same percentage. The calculator shows both % and absolute kg/lbs so you can see the full picture and adjust your goals realistically whether you’re 25 or 55.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Advanced Tools for Your Fitness Journey
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Beyond Body Fat: Using the BMI Calculator for Overall Health
          </h3>
          <p className="text-gray-200 text-base">
            Body fat percentage is more accurate than BMI alone, but combining both gives the complete story. Our{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 hover:underline"
            >
              BMI Calculator
            </Link>{" "}
            uses the same height and weight inputs so you can cross-check results instantly and understand whether your weight is healthy relative to your height.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Combining Body Fat Data with a Calorie Calculator for Weight Loss
          </h3>
          <p className="text-gray-200 text-base">
            Once you know your lean mass and body fat, plug those numbers into our{" "}
            <Link
              href="/calculators/health/calorie-calculator"
              className="text-blue-400 hover:underline"
            >
              Calorie Calculator
            </Link>{" "}
            to get a personalized daily calorie target for fat loss while protecting muscle. Example: A person with 65 kg lean mass and moderate activity may need 2,400 calories to maintain weight but only 1,900–2,100 to lose 0.5 kg of pure fat per week. Track weekly with the body fat calculator and watch your lean mass stay stable or rise while fat drops — the ultimate sign of sustainable progress.
          </p>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Our body fat calculator is fast, accurate, completely free, and always ready. Bookmark it today, measure once a week, and turn your fitness goals into measurable success!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}