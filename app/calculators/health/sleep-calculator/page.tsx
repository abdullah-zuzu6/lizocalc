import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import AdvancedSleepCalculator from './clientside'


const faqData = [
  {
    question: "How does a sleep calculator determine the best time to wake up?",
    answer: "A sleep calculator uses the concept of 90-minute sleep cycles. Since waking up mid-cycle leads to grogginess (sleep inertia), the tool calculates times that align with the end of a cycle. For example, if you go to bed at 10:00 PM, waking up at 5:30 AM (5 cycles) or 7:00 AM (6 cycles) is often better than waking up at 6:15 AM.",
  },
  {
    question: "How many sleep cycles do I need per night for optimal health?",
    answer: "Most healthy adults require between 5 and 6 full sleep cycles per night, totaling 7.5 to 9 hours of rest. While 4 cycles (6 hours) may be manageable for some, consistently getting fewer than 5 cycles can lead to cognitive decline, weakened immunity, and increased stress levels.",
  },
  {
    question: "How long does it take the average person to fall asleep?",
    answer: "Sleep calculators typically factor in a 14-minute 'sleep latency' period. This is the average time it takes a healthy person to transition from full wakefulness to light sleep. If you are using a manual calculation, you should add these 14 minutes to your total sleep time goal.",
  },
  {
    question: "What is sleep inertia and why do I feel tired after 8 hours?",
    answer: "Sleep inertia is the heavy, disoriented feeling you get when an alarm wakes you during Deep Sleep (Stage 3). Even if you slept for 8 hours, if your alarm goes off while you are in a deep cycle rather than REM or Light sleep, your brain struggles to transition to wakefulness immediately.",
  },
  {
    question: "Is it better to get 6 hours of sleep or 7 hours?",
    answer: "Mathematically, 6 hours (exactly 4 cycles) is often better than 7 hours (4 cycles plus 1 hour). Waking up at the 7-hour mark interrupts a deep sleep cycle, whereas 6 hours allows you to complete a full cycle, potentially leaving you feeling more refreshed despite the shorter duration.",
  },
  {
    question: "Can I use a sleep calculator to fix my circadian rhythm?",
    answer: "Yes. By consistently calculating your bedtime based on a fixed wake-up time, you train your 'internal clock' or circadian rhythm. To improve results, combine your calculated sleep times with 15 minutes of morning sunlight exposure to help regulate your body's natural melatonin production.",
  },
];

export const metadata: Metadata = {
 title: "Sleep calculator - find the perfect time to wake up & sleep cycles",

description: "calculate your ideal bedtime or wake-up time based on 90-minute sleep cycles. avoid grogginess and wake up refreshed with our easy-to-use sleep cycle tool.",
  keywords: [
    "sleep cycle calculator",
    "best time to wake up",
    "bedtime calculator for adults",
    "90 minute sleep cycles",
    "how to stop waking up tired",
    "lizocalc sleep tool",
    "rem sleep phase tracker",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/health/sleep-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Advanced Sleep Calculator | Better Rest & Recovery",
    description:
      "Stop waking up groggy. Use our advanced calculator to time your sleep cycles perfectly and improve your daily energy levels.",
    url: "https://www.lizocalc.com/calculators/health/sleep-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Advanced Sleep Calculator | Perfect Wake Up Times",
    description:
      "Instantly calculate when to go to bed based on your wake-up time with our professional-grade sleep cycle tool.",
  },
};

export default function SleepPage() {
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
                  "https://www.lizocalc.com/calculators/health/sleep-calculator#breadcrumb",
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
                    name: "Sleep Calculator",
                    item: "https://www.lizocalc.com/calculators/health/sleep-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/health/sleep-calculator",
                url: "https://www.lizocalc.com/calculators/health/sleep-calculator",
                name: "Advanced Sleep Calculator",
                description: "Use our advanced sleep calculator to find the best times to go to bed and wake up, helping you wake up feeling refreshed by timing your sleep cycles.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                },
                "mainEntityOfPage": {
    "@type": "SoftwareApplication",
    "@id": "https://www.lizocalc.com/calculators/health/sleep-calculator#app"
  }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/health/sleep-calculator#app",
                name: "Advanced Sleep Calculator",
                url: "https://www.lizocalc.com/calculators/health/sleep-calculator",
                description:
                  "Advanced sleep calculator to determine optimal bedtimes and wake-up times using sleep cycle logic.",
                applicationCategory: "HealthApplication",
                applicationSubCategory: "Sleep Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate optimal bedtime",
                  "Calculate ideal wake-up times",
                  "Sleep cycle-based recommendations",
                  "Improve sleep quality and wakefulness",
                  "Easy to use planning tool",
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
    "target": ["https://www.lizocalc.com/calculators/health/sleep-calculator"]
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
             Sleep Calculator: Optimize Your Sleep Cycles to Wake Up Refreshed
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedSleepCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Sleep Cycle Calculator</strong> — also known as the sleep calculator or sleep timing calculator — is one of the smartest and most effective tools for anyone who wants deeper, more restorative rest without spending hours in bed. Whether you’re a busy professional juggling deadlines, a student preparing for exams, a parent managing family routines, or an athlete optimizing recovery, knowing exactly when to go to bed or wake up can transform how you feel every single day. It removes the guesswork from sleep and aligns your schedule with your body’s natural 90-minute sleep cycles.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>sleep calculator</strong> makes it effortless. Choose between “Wake Up” or “Bed Time” mode, enter your target time with AM/PM, and get instant recommendations for the best sleep windows — complete with cycle count, total sleep hours, and a clear quality rating (Excellent, Good, or Fair). The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last times (with consent), and never shows ads. Perfect for daily planning, shift workers, or anyone worldwide who wants to wake up refreshed instead of groggy. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/health/sleep-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            sleep calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Sleep Cycle Calculator for Better Rest
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Choosing Between 'Wake Up' and 'Bed Time' Modes
              </h3>
              <p className="text-gray-200 leading-relaxed mb-6 text-base">
                The calculator offers two smart modes so you can plan sleep no matter which end of the night you already know. 
                <strong>Wake Up mode</strong> is perfect when you have a fixed alarm (school, work, or flight). It tells you the ideal bedtimes that will let you complete full sleep cycles before waking. 
                <strong>Bed Time mode</strong> is ideal when you know when you’re going to sleep but need the best wake-up times to feel alert. Simply tap the mode you need — the interface instantly updates the input fields and suggestions.
              </p>
              <p className="text-gray-300 italic text-base leading-relaxed">
                Pro tip: Most people start with Wake Up mode because it gives the most practical “go to bed by” recommendations for real-world schedules.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                How to Input Your Target Time and Period (AM/PM)
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Select your preferred mode — Wake Up or Bed Time.</li>
                <li>Choose your time format: 12-hour (with AM/PM toggle) or 24-hour for international users.</li>
                <li>Enter the exact hour and minute using the intuitive time picker or type it directly (e.g., 7:00 AM or 19:00).</li>
                <li>The calculator automatically adds the 15-minute falling-asleep buffer and shows multiple cycle options instantly.</li>
                <li>Review the color-coded results: green for Excellent, blue for Good, amber for Fair.</li>
                <li>Tap any suggested time to copy it to your clipboard or set a reminder.</li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool auto-detects your local time zone and converts everything seamlessly.
              </p>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Understanding Your Results: Excellent vs. Fair Sleep Quality
              </h3>
              <p className="text-gray-200 text-base mb-4">
                Results are clearly labeled with quality ratings based on completed sleep cycles:
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
                <li><strong>Excellent</strong> — 5 or 6 full cycles (7.5–9 hours of actual sleep). You wake in light sleep stage, feeling refreshed and mentally sharp.</li>
                <li><strong>Good</strong> — 4 or 7 cycles (6–10.5 hours). Solid rest, but may need a short adjustment period.</li>
                <li><strong>Fair</strong> — 3 or 8+ cycles. Still better than random sleep, but not optimal for long-term energy.</li>
              </ul>
              <p className="text-gray-200 text-base mt-6">
                Each result also shows total sleep duration and exact cycle count so you can match it to your lifestyle.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Science Behind the 90-Minute Sleep Cycle
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why Waking Up Between Cycles Prevents Sleep Inertia
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Human sleep follows roughly 90-minute cycles that repeat 4–6 times per night. Each cycle moves through light sleep → deep sleep → REM sleep and back to light sleep. Waking during deep sleep (stage 3) causes sleep inertia — that heavy, groggy feeling that can last up to 2 hours. Waking at the end of a cycle (light sleep) lets you rise naturally, alert, and energized.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            The 15-Minute Buffer: Why Our Formula Includes Falling-Asleep Time
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            On average it takes 10–20 minutes to fall asleep. Our calculator uses a scientifically backed 15-minute buffer so the cycle math is realistic. The formula is simple and transparent:
          </p>
          <p className="text-gray-200 text-base font-mono bg-gray-900 p-3 rounded-xl mb-6">
            Total time in bed = 15 minutes + (number of cycles × 90 minutes)
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            This buffer is why the calculator never suggests unrealistic “go to bed exactly at X” times — it builds in real human biology.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            How 5 to 6 Full Cycles Lead to "Excellent" Sleep Quality
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Five cycles equal 7.5 hours of sleep plus the 15-minute buffer (total ~7 hours 45 minutes in bed). Six cycles equal 9 hours of sleep plus buffer (~9 hours 15 minutes in bed). Both land you in light sleep at the end of the final cycle, matching the natural recommendation from sleep researchers worldwide for adults aged 18–64.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step Calculation Examples
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Cycles</th>
                  <th className="p-4 text-left font-semibold">Sleep Duration</th>
                  <th className="p-4 text-left font-semibold">Total Time in Bed</th>
                  <th className="p-4 text-left font-semibold">Quality Rating</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold">4</td>
                  <td className="p-4">6 hours</td>
                  <td className="p-4">6 h 15 min</td>
                  <td className="p-4 font-bold text-amber-400">Fair</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">5</td>
                  <td className="p-4">7.5 hours</td>
                  <td className="p-4">7 h 45 min</td>
                  <td className="p-4 font-bold text-green-400">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">6</td>
                  <td className="p-4">9 hours</td>
                  <td className="p-4">9 h 15 min</td>
                  <td className="p-4 font-bold text-green-400">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold">7</td>
                  <td className="p-4">10.5 hours</td>
                  <td className="p-4">10 h 45 min</td>
                  <td className="p-4 font-bold text-amber-400">Good / Fair</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Example: If I Need to Wake Up at 7:00 AM, When Should I Sleep?
          </h3>
          <p className="text-gray-200 text-base">
            Using Wake Up mode and 12-hour format:
          </p>
          <p className="text-gray-200 text-base mb-4">
            Target wake time: 7:00 AM<br />
            For 5 cycles (Excellent): 7:00 AM − 7 h 45 min = <strong>11:15 PM</strong><br />
            For 6 cycles (Excellent): 7:00 AM − 9 h 15 min = <strong>9:45 PM</strong>
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example: If I Go to Bed at 11:00 PM, What Are My Best Wake-Up Times?
          </h3>
          <p className="text-gray-200 text-base">
            Using Bed Time mode:
          </p>
          <p className="text-gray-200 text-base mb-4">
            Bed time: 11:00 PM + 15 min buffer = asleep by 11:15 PM<br />
            5 cycles (Excellent): 11:15 PM + 7.5 h = <strong>6:45 AM</strong><br />
            6 cycles (Excellent): 11:15 PM + 9 h = <strong>8:15 AM</strong>
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating Total Sleep Hours vs. Number of Cycles
          </h3>
          <p className="text-gray-200 text-base">
            The calculator always shows both numbers side-by-side so you can choose the option that fits your life. Remember: quality matters more than quantity. Five high-quality cycles beat eight fragmented ones every time.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Benefits of Using a Sleep Timing Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Reducing Morning Grogginess and Daytime Fatigue
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            By waking at the end of a cycle you eliminate sleep inertia. Users report feeling awake within minutes instead of needing two coffees and 30 minutes of struggle. This benefit alone improves productivity and mood for millions worldwide.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Improving Cognitive Function and Mental Clarity
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Completing full cycles ensures proper REM and deep sleep stages. Studies show this boosts memory consolidation, problem-solving, and focus — exactly what students, professionals, and creatives need every day.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Aligning Your Internal Clock for Natural Energy Boosts
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Consistent cycle-based timing strengthens your circadian rhythm. You’ll notice natural energy peaks in the morning and steady focus throughout the day without the usual afternoon crash.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Optimize Your Health with More Tools
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Tracking Physical Health with the BMI Calculator
          </h3>
          <p className="text-gray-200 text-base">
            Great sleep pairs perfectly with great body composition. Use our{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 hover:underline"
            >
              BMI Calculator
            </Link>{" "}
            with the same height and weight data to see how better rest supports healthy weight management and overall wellness.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Managing Daily Schedules and Time Productivity
          </h3>
          <p className="text-gray-200 text-base">
            Once you lock in your optimal sleep window, plug those times into your daily planner. The sleep calculator becomes the foundation for a productive schedule — helping you block deep-work hours, protect family time, and maintain consistent energy from morning to night.
          </p>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Whether you’re planning your week from a quiet corner or a bustling city anywhere on the planet, our sleep calculator is fast, accurate, completely free, and always ready. Bookmark it today, follow the cycles, and start waking up truly refreshed every single morning!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}