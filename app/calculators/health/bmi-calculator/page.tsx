import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedBMICalculator from './clientside'



const faqData = [
  {
    question: "How do I calculate my BMI manually?",
    answer: "To calculate your Body Mass Index (BMI) using the metric system, divide your weight in kilograms by your height in meters squared. The formula is: BMI = kg/m². For example, if you weigh 70kg and are 1.75m tall, the calculation is 70 / (1.75 * 1.75), resulting in a BMI of 22.86.",
  },
  {
    question: "What are the standard BMI weight categories for adults?",
    answer: "According to the World Health Organization (WHO), BMI results are generally classified into four main categories: Underweight (below 18.5), Normal weight (18.5 to 24.9), Overweight (25 to 29.9), and Obesity (30 or higher). These ranges help identify potential health risks associated with body mass.",
  },
  {
    question: "Is BMI an accurate measure of health for athletes?",
    answer: "While useful for the general population, BMI has limitations for athletes because it does not distinguish between muscle mass and body fat. Since muscle is denser than fat, highly muscular individuals may receive an 'Overweight' or 'Obese' score despite having low body fat levels and excellent cardiovascular health.",
  },
  {
    question: "How much weight should I lose to reach a 'Normal' BMI?",
    answer: "To find your target weight, multiply the bottom of the normal BMI range (18.5) and the top (24.9) by your height in meters squared. For a person 1.8m tall, the healthy range is between 60kg (18.5 * 3.24) and 80.7kg (24.9 * 3.24). Subtracting these from your current weight provides your weight loss goal.",
  },
  {
    question: "Does the BMI formula change for children and teenagers?",
    answer: "The base calculation for children is the same as adults (kg/m²), but the interpretation is different. For those under 20, BMI is plotted on a growth chart as a percentile relative to others of the same age and sex. A child is considered 'Overweight' if their BMI is in the 85th to 95th percentile.",
  },
  {
    question: "Why is tracking BMI important for long-term wellness?",
    answer: "Tracking your BMI is a simple, non-invasive screening tool to monitor weight trends over time. Consistently high BMI scores are statistically linked to increased risks of chronic conditions such as Type 2 diabetes, hypertension, and heart disease, making it a helpful starting point for clinical health discussions.",
  },
];
export const metadata: Metadata = {
 title: " Bmi calculator: check your body mass index & healthy weight",

description: "calculate your body mass index instantly with our free bmi calculator. supports metric and imperial units, provides your ponderal index, and shows your ideal weight range based on age and gender.",
  keywords: [
    "bmi calculator with age",
    "calculate body mass index",
    "bmi healthy weight range",
    "adult bmi category tool",
    "free health index calculator",
    "lizocalc bmi tool",
    "metric bmi formula",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/health/bmi-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced BMI Calculator | Accurate Health Tool",
    description:
      "Check your Body Mass Index (BMI) instantly. Our advanced calculator provides precise weight categories and health tracking for adults.",
    url: "https://lizocalc.com/calculators/health/bmi-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced BMI Calculator | Free Health Tracking",
    description:
      "Instantly determine your BMI and understand your weight category with our professional-grade health calculator.",
  },
};

export default function BMIPage() {
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
                  "https://lizocalc.com/calculators/health/bmi-calculator#breadcrumb",
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
                    name: "BMI Calculator",
                    item: "https://lizocalc.com/calculators/health/bmi-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/health/bmi-calculator",
                url: "https://lizocalc.com/calculators/health/bmi-calculator",
                name: "Advanced BMI Calculator",
                description: "Use our advanced BMI calculator to instantly determine your Body Mass Index and understand your weight category based on height and weight.",
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
                  "https://lizocalc.com/calculators/health/bmi-calculator#app",
                name: "Advanced BMI Calculator",
                url: "https://lizocalc.com/calculators/health/bmi-calculator",
                description:
                  "Advanced BMI calculator to estimate body mass index and provide health weight category insights.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "BMI Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate Body Mass Index (BMI)",
                  "Determine weight category (Underweight, Normal, Overweight, Obese)",
                  "Support for metric and imperial units",
                  "Health-focused results explanation",
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
              BMI Calculator: Check Your Body Mass Index & Ideal Weight Range
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedBMICalculator/>
        
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Body Mass Index (BMI) Calculator</strong> — also known as the Quetelet Index — is one of the most important and frequently used tools in health, fitness, nutrition science, and even school biology classes across the world. Whether you&apos;re a student in Sahiwal, Punjab, Pakistan preparing for your Class 8 or 9 health project, a busy parent in Lahore or Karachi tracking your family&apos;s wellness, a teacher creating lesson plans on preventive healthcare, a gym enthusiast in Islamabad setting realistic goals, or simply someone who wants to understand their weight in relation to height, the BMI calculator delivers instant, science-backed insights. It works seamlessly for people of every age and background, helping millions worldwide make informed decisions about diet, exercise, and long-term health.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required <strong>BMI calculator</strong> takes all the hard work out of the process. Enter your weight and height in either Metric (kg/cm) or Imperial (lbs/ft &amp; in) units, optionally add your age and gender for personalised healthy-weight ranges, click the large &ldquo;Calculate BMI&rdquo; button, and receive your score instantly — complete with clear health categories, Ponderal Index, suggested weight range, and easy-to-read explanations. The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last measurements (with your consent), handles every unit combination flawlessly, and never shows any ads. Perfect for quick daily checks, exam preparation in Pakistani schools, doctor visit prep, or long-term fitness tracking. Jump right in and try it now on our{" "}
    <Link
      href="/calculators/health/bmi-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      BMI calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Use the BMI Calculator with Metric or Imperial Units
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Switching Between Metric (kg/cm) and Imperial (lbs/ft) Modes
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          The calculator features a prominent unit toggle at the top of the form. Tap &ldquo;Metric&rdquo; for kilograms and centimetres (standard in Pakistan, India, Europe, and most of Asia) or &ldquo;Imperial&rdquo; for pounds and feet/inches (widely used in the USA, UK, and Canada). The fields instantly update — no need to restart or convert manually. Your previous values are automatically converted so you never lose data when switching modes.
        </p>
        <p className="text-gray-300 italic text-base">
          Pro tip: If you live in Sahiwal and measure your height in feet at the local clinic but weigh yourself in kg on a home scale, just switch units mid-entry — the tool handles the conversion behind the scenes for perfect accuracy.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Entering Your Age and Gender for Accurate Results
        </h3>
        <p className="text-gray-200 leading-relaxed text-base mb-4">
          While the core BMI formula works for adults 20+, adding your exact age and gender unlocks refined healthy-weight ranges and Ponderal Index interpretation. For children and teenagers the tool automatically switches to age- and gender-adjusted percentiles (following WHO and CDC guidelines). Women and men have slightly different ideal ranges due to natural differences in muscle mass and body composition.
        </p>
        <p className="text-gray-200 leading-relaxed text-base">
          Example: A 35-year-old male in Sahiwal entering 85 kg and 175 cm will see a healthy range of 65–82 kg, while a 35-year-old female with identical height and weight receives a slightly adjusted range accounting for typical body-fat distribution.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Step-by-Step Guide to Calculating Your BMI
        </h3>
        <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
          <li>Select your preferred units (Metric or Imperial) using the big toggle switch.</li>
          <li>Enter your weight — kilograms or pounds.</li>
          <li>Enter your height — centimetres, or feet and inches (the tool auto-converts feet to total inches).</li>
          <li>Optionally input your age (in years) and select gender for personalised insights.</li>
          <li>Press the large, eye-catching <strong>Calculate BMI</strong> button.</li>
          <li>Instantly view your BMI score, health category, Ponderal Index, and suggested healthy weight range in bold, colour-coded results.</li>
          <li>Scroll down for the full mathematical breakdown and formula explanations.</li>
          <li>Tap <strong>Reset</strong> to clear everything and start fresh — ideal when checking multiple family members.</li>
        </ol>
        <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
          Pro tip: The tool auto-detects invalid entries (negative numbers, letters), gives friendly warnings for extreme values, and works perfectly on slow 3G/4G networks common in rural Punjab.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Understanding Your BMI Results and Health Categories
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      What Your BMI Score Means: Underweight, Normal, Overweight, or Obese
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-6">
      The World Health Organization (WHO) defines four standard adult categories. Your score is instantly matched to the correct category with clear colour coding (green = healthy, yellow = caution, red = action needed).
    </p>

    <div className="overflow-x-auto mt-6 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">BMI Range</th>
            <th className="p-4 text-left font-semibold">Category</th>
            <th className="p-4 text-left font-semibold">Health Interpretation</th>
            <th className="p-4 text-left font-semibold">Common in Pakistan?</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4 font-mono">&lt; 18.5</td>
            <td className="p-4 font-bold text-amber-400">Underweight</td>
            <td className="p-4">May indicate malnutrition or high metabolism. Consult doctor.</td>
            <td className="p-4">Common in rural Sahiwal due to dietary gaps</td>
          </tr>
          <tr>
            <td className="p-4 font-mono">18.5 – 24.9</td>
            <td className="p-4 font-bold text-green-400">Normal / Healthy</td>
            <td className="p-4">Lowest risk of weight-related diseases. Excellent range!</td>
            <td className="p-4">Target for most urban professionals in Lahore &amp; Karachi</td>
          </tr>
          <tr>
            <td className="p-4 font-mono">25.0 – 29.9</td>
            <td className="p-4 font-bold text-yellow-400">Overweight</td>
            <td className="p-4">Increased risk of diabetes, hypertension. Start lifestyle changes.</td>
            <td className="p-4">Very common due to sugary drinks &amp; fried snacks</td>
          </tr>
          <tr>
            <td className="p-4 font-mono">&ge; 30.0</td>
            <td className="p-4 font-bold text-red-400">Obese</td>
            <td className="p-4">Higher risk of heart disease, joint issues. Seek medical advice.</td>
            <td className="p-4">Rising in Pakistan per recent national surveys</td>
          </tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Beyond the Score: Interpreting Your Ponderal Index (kg/m³)
    </h3>
    <p className="text-gray-200 leading-relaxed text-base mb-4">
      The Ponderal Index (PI) improves on classic BMI by using height cubed instead of squared, making it more accurate for very tall or very short individuals and growing children. Normal adult PI range is approximately 11–14 kg/m³. Your calculator displays both values side-by-side for deeper insight.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Tracking Your Suggested Healthy Weight Range
    </h3>
    <p className="text-gray-200 leading-relaxed text-base">
      Based on your height, age, and gender, the tool instantly shows the minimum and maximum healthy weight in both kg and lbs. Example: For a 30-year-old male who is 170 cm tall, the healthy range is 62–79 kg (137–174 lbs). Track progress month after month directly in the results panel.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      The Math Behind the Tool: BMI and Ponderal Index Formulas
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      How the Metric BMI Formula Works
    </h3>
    <p className="text-gray-200 text-base mb-4">
      The original formula developed by Belgian mathematician Adolphe Quetelet in 1832 is beautifully simple:
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">
      Formula:{" "}
      <span className="font-mono text-green-300">
        BMI = weight (kg) / [height (m)]²
      </span>
    </h4>
    <p className="text-gray-200 text-base">
      Example: 75 kg, 1.75 m tall → BMI = 75 / (1.75 × 1.75) = 75 / 3.0625 = <strong>24.5</strong> (Healthy range).
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Calculating BMI Using Feet, Inches, and Pounds
    </h3>
    <p className="text-gray-200 text-base mb-4">
      The Imperial version includes a conversion factor of 703 to keep the scale consistent with the metric system:
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">
      Formula:{" "}
      <span className="font-mono text-green-300">
        BMI = 703 × weight (lbs) / [height (in)]²
      </span>
    </h4>
    <p className="text-gray-200 text-base">
      Example: 165 lbs, 5 ft 9 in (69 inches) → BMI = 703 × 165 / (69 × 69) = 115995 / 4761 ≈ <strong>24.4</strong>.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      The Difference Between BMI and the Ponderal Index
    </h3>
    <p className="text-gray-200 text-base mb-4">
      BMI uses height squared; Ponderal Index uses height cubed, making PI more sensitive to extreme heights.
    </p>
    <h4 className="text-xl font-bold text-blue-300 mb-2">
      Ponderal Index Formula:{" "}
      <span className="font-mono text-green-300">
        PI = weight (kg) / [height (m)]³
      </span>
    </h4>
    <p className="text-gray-200 text-base">
      Normal PI range: 11–14 kg/m³. Values above 14 indicate higher body density; below 11 may suggest lower density.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Why Knowing Your Body Mass Index Matters
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Identifying Potential Health Risks Associated with BMI
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Decades of global research (including large-scale studies in Pakistan by the Pakistan Medical Research Council) link BMI categories to specific risks:
    </p>
    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
      <li>Underweight → weakened immunity, osteoporosis, fertility issues</li>
      <li>Overweight/Obese → Type-2 diabetes (now epidemic in Punjab), heart disease, hypertension, fatty liver</li>
      <li>High BMI in Sahiwal youth correlates strongly with childhood obesity trends reported by local health departments</li>
    </ul>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Using BMI as a Starting Point for Fitness Goals
    </h3>
    <p className="text-gray-200 text-base">
      BMI is the perfect first checkpoint before starting any diet or gym programme. Set a realistic target (e.g., move from 28.5 to 23.0 in 6 months), then pair it with our free{" "}
      <Link
        href="/calculators/health/calorie-calculator"
        className="text-blue-400 hover:underline"
      >
        Calorie Calculator
      </Link>{" "}
      and{" "}
      <Link
        href="/calculators/health/bmr-calculator"
        className="text-blue-400 hover:underline"
      >
        BMR Calculator
      </Link>{" "}
      for a complete roadmap.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Limitations of BMI: Age, Muscle Mass, and Gender Factors
    </h3>
    <p className="text-gray-200 text-base leading-relaxed">
      BMI is a screening tool, not a perfect diagnosis. It does not distinguish muscle from fat, so athletes and bodybuilders often appear &ldquo;overweight&rdquo; despite being very healthy. Older adults lose muscle mass, so a &ldquo;normal&rdquo; BMI may still hide health issues. Gender differences in fat distribution mean women can carry slightly more weight healthily than men at the same BMI. Always combine BMI with waist circumference, blood tests, and professional medical advice — especially important for families in Pakistan where diabetes runs in families.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Real-World BMI Examples &amp; Quick Reference
    </h2>

    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Person (Sahiwal Example)</th>
            <th className="p-4 text-left font-semibold">Weight &amp; Height</th>
            <th className="p-4 text-left font-semibold">BMI</th>
            <th className="p-4 text-left font-semibold">Category &amp; Advice</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr>
            <td className="p-4">School student, 15 yrs</td>
            <td className="p-4">52 kg, 162 cm</td>
            <td className="p-4 font-bold text-green-400">19.8</td>
            <td className="p-4">Healthy — keep active with cricket!</td>
          </tr>
          <tr>
            <td className="p-4">Office worker, 32 yrs male</td>
            <td className="p-4">92 kg, 172 cm</td>
            <td className="p-4 font-bold text-yellow-400">31.1</td>
            <td className="p-4">Obese — reduce sugary tea, walk 10k steps</td>
          </tr>
          <tr>
            <td className="p-4">Housewife, 45 yrs female</td>
            <td className="p-4">68 kg, 158 cm</td>
            <td className="p-4 font-bold text-green-400">27.3</td>
            <td className="p-4">Overweight — try our calorie calculator for balanced desi meals</td>
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
      Pair your BMI insights with these other free, fast calculators from our collection:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li>
        <Link
          href="/calculators/health/calorie-calculator"
          className="text-blue-400 hover:underline"
        >
          Calorie Calculator
        </Link>{" "}
        — daily calorie needs for weight loss or gain
      </li>
      <li>
        <Link
          href="/calculators/health/bmr-calculator"
          className="text-blue-400 hover:underline"
        >
          BMR &amp; TDEE Calculator
        </Link>{" "}
        — basal metabolic rate and total daily energy
      </li>
      
      <li>
        <Link
          href="/calculators/health/body-fat-calculator"
          className="text-blue-400 hover:underline"
        >
          Body Fat Percentage Calculator
        </Link>{" "}
        — Navy method and tape-measure formula
      </li>
    </ul>

    <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
      Understanding your BMI is the first step toward a healthier, longer life — whether you&apos;re in Sahiwal, Punjab or anywhere else in the world. Our BMI calculator is fast, accurate, completely free, and always ready whenever you need it. Bookmark it today and start your wellness journey with confidence!
    </p>
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}