import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import TimeCalculator from "./clientside";

const faqData = [
  {
    question: "How do I add hours and minutes together?",
    answer: "To add time durations, sum the minutes and hours separately. If the minutes total 60 or more, divide the minutes by 60; add the quotient to your hours and keep the remainder as your minutes. Example: 2h 45m + 1h 30m = 3h 75m. Since 75m = 1h 15m, the final total is 4h 15m.",
  },
  {
    question: "How do I calculate decimal hours for payroll?",
    answer: "To convert minutes to decimal hours for a timesheet, divide the number of minutes by 60. Formula: Decimal Hours = Hours + (Minutes / 60). For example, if you worked 8 hours and 15 minutes, the calculation is 8 + (15 / 60) = 8.25 hours.",
  },
  {
    question: "How do I calculate the time elapsed between two points in time?",
    answer: "To find the duration, subtract the start time from the end time. If the end time's minutes are less than the start time's, borrow 60 minutes from the end hour. For instance, to find the gap between 1:45 PM and 4:15 PM: 4:15 becomes 3:75. Then, (3 - 1) hours and (75 - 45) minutes equals 2 hours and 30 minutes.",
  },
  {
    question: "How does a time calculator handle crossing midnight?",
    answer: "When a time range crosses midnight, add 24 hours to the end time before subtracting. If you start at 10:00 PM (22:00) and end at 2:00 AM (02:00), the calculation is (2 + 24) - 22 = 4 hours. This ensures the duration is positive and accurate.",
  },
  {
    question: "How do I convert military time to a 12-hour format?",
    answer: "For military times from 13:00 to 23:59, subtract 12 to get the PM time. For 00:00 to 00:59, the time is 12:00 AM to 12:59 AM. For 01:00 to 12:00, the time remains the same but is labeled AM. Example: 17:30 - 12 = 5:30 PM.",
  },
  {
    question: "What is the formula for converting seconds into hours?",
    answer: "To convert seconds into a readable time format, use the formula: Hours = Total Seconds / 3600. To find the remaining minutes, take the remainder and divide by 60. For example, 7,260 seconds is 7,260 / 3,600 = 2 hours with 60 seconds (1 minute) left over, totaling 2 hours and 1 minute.",
  }
];

export const metadata: Metadata = {
  title: "Time Calculator – Convert Hours ↔ Minutes ↔ Seconds",
  description:
    "Free advanced time calculator to add or subtract time durations and convert between hours, minutes, and seconds with precision and ease.",

  keywords: [
    "time calculator",
    "convert time",
    "hours to minutes",
    "time duration calculator",
    "calculate time difference",
    "minutes to seconds converter",
    "add time durations",
    "total time counter",
    "time math calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/time-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Time Duration & Conversion Calculator | LizoCalc",
    description:
      "Easily calculate total time and convert between units with our fast and accurate online time tool.",
    url: "https://www.lizocalc.com/calculators/time/time-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Time Calculator - Convert & Calculate Durations",
    description:
      "Perform complex time arithmetic and unit conversions instantly with our free, professional time tool.",
  },
};

export default function TimePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA FOR TIME CALCULATOR === */}
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
                "@id": "https://www.lizocalc.com/calculators/time/time-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Time", item: "https://www.lizocalc.com/calculators/time" },
                  { "@type": "ListItem", position: 4, name: "Time Calculator", item: "https://www.lizocalc.com/calculators/time/time-calculator" },

                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/time/time-calculator",
                url: "https://www.lizocalc.com/calculators/time/time-calculator",
                name: "Time Calculator",
                description: "Easily convert and calculate time durations in hours, minutes, and seconds.",
                inLanguage: "en",
                isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
                "mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/time/time-calculator#app"
}
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.lizocalc.com/calculators/time/time-calculator#app",
                "name": "Advanced Time Calculator",
                "url": "https://www.lizocalc.com/calculators/time/time-calculator",
                "description": "Calculate duration between times, add or subtract time, and convert between various time units.",
                "applicationCategory": "UtilitiesApplication",
                "applicationSubCategory": "Time Calculator",
                "operatingSystem": "Any",
                "inLanguage": "en",
                "browserRequirements": "Requires JavaScript. Works on modern browsers.",
                "offers": { 
                  "@type": "Offer", 
                  "price": "0", 
                  "priceCurrency": "USD" 
                },
                "creator": { 
                  "@type": "Organization", 
                  "name": "LizoCalc", 
                  "url": "https://www.lizocalc.com" 
                },
                "potentialAction": {
                  "@type": "UseAction",
                  "target": ["https://www.lizocalc.com/calculators/time/time-calculator"]
                }
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
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
            Time Calculator – Convert Hours ↔ Minutes ↔ Seconds 
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <TimeCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Time Calculator</strong> — also known as hours to minutes converter, decimal time calculator, or total seconds tool — is an essential utility for students, professionals, freelancers, video editors, researchers, and anyone who needs to convert, add up, or break down time durations quickly and accurately. Whether you're a student calculating total study hours for board exam preparation, a freelancer billing clients by the hour, a YouTuber summing video lengths, or a lab technician converting experiment run-times into seconds, precise time conversion saves hours of manual math.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required <strong>LizoCalc Time Calculator</strong> instantly converts any duration between:
          <br />• Hours ↔ Minutes ↔ Seconds
          <br />• Decimal hours (e.g. 2.75 h) ↔ hh:mm:ss format
          <br />• Total seconds for long durations
          <br />It features real-time sliders, high-precision manual entry, clean mobile-first design, offline capability after first load, remembers your last inputs (with consent), and never shows ads. Perfect for students in Punjab, content creators, payroll staff, science students, and daily productivity tracking. Jump right in and try it now on our{" "}
          <Link 
            href="/calculators/time/time-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Time Calculator page
          </Link >.
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Instant Time Conversion for Any Duration
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Convert Hours to Total Seconds Instantly
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Need to know how many seconds are in 8 hours of work? Or how many seconds long your podcast episode is?
              </p>
              <p className="text-gray-300 italic text-base">
                Example: 8 hours = <strong>28,800 seconds</strong>
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Breaking Down Complex Durations into Total Minutes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Enter 2 hours 45 minutes 30 seconds → get total minutes instantly:
          </p>
          <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-base mb-6">
            2 h 45 min 30 s = <strong>165.5 minutes</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating Decimal Hours for Payroll and Billing
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Many companies in Pakistan (and internationally) pay using decimal hours rather than mm:ss format.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
            Why decimal hour precision matters for professional tracking
          </h4>
          <p className="text-gray-200 text-base">
            1 hour 36 minutes = <strong>1.60 hours</strong> (not 1.6)<br />
            Rounding errors of even 0.01 hour can mean ₹50–200 difference per task when multiplied across many entries.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the LizoCalc Time Conversion Tool
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Adjusting Parameters with Interactive Range Sliders
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Drag the Hours, Minutes, or Seconds sliders — results update live</li>
                <li>Watch decimal hours, total minutes, and total seconds change instantly</li>
                <li>Perfect for quick estimates during meetings or study sessions</li>
              </ol>
            </div>

            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Manual Entry for High-Precision Time Inputs
              </h3>
              <p className="text-gray-200 text-base">
                Type exact values (supports decimals too — e.g. 2.5 hours or 45.75 minutes).
              </p>
            </div>

            <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
              Understanding the Results: From Seconds to Decimal Hours
            </h3>
            <p className="text-gray-200 text-base mb-4">
              All four views update simultaneously:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
              <li>hh:mm:ss format</li>
              <li>Total seconds</li>
              <li>Total minutes (decimal)</li>
              <li>Decimal hours (most accurate for billing)</li>
            </ul>

            <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
              Step-by-Step Example: Converting 1h 30m 45s to Units
            </h4>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-3 font-mono text-green-300">
              <div>1 hour = 3600 s</div>
              <div>30 minutes = 1800 s</div>
              <div>45 seconds = 45 s</div>
              <div className="pt-3 border-t border-gray-600">Total = <strong>5,445 seconds</strong></div>
              <div>Total minutes = <strong>90.75 min</strong></div>
              <div>Decimal hours = <strong>1.5125 h</strong></div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Mathematics Behind Time Unit Conversion
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Standard Time Formula: <span className="font-mono">Total Seconds = (Hours × 3600) + (Minutes × 60) + Seconds</span>
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Reverse formula (decimal hours → hh:mm:ss):
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            totalSeconds = decimalHours × 3600<br />
            hours = Math.floor(totalSeconds / 3600)<br />
            remaining = totalSeconds % 3600<br />
            minutes = Math.floor(remaining / 60)<br />
            seconds = remaining % 60
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why 60 is the Magic Number: Understanding Sexagesimal Systems
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            The base-60 (sexagesimal) system for minutes and seconds comes from ancient Babylonian mathematics and survives today in time and angular measurement. That's why:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mt-4">
            <li>1 minute = 60 seconds</li>
            <li>1 hour = 60 minutes = 3600 seconds</li>
            <li>1 day = 24 hours = 86,400 seconds</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Accuracy Check: Handling High-Precision Decimal Fractions
          </h3>
          <p className="text-gray-200 text-base">
            Our calculator preserves full precision (up to 4–5 decimal places in decimal hours) so 1 hour 22.5 minutes shows correctly as <strong>1.3750 hours</strong> — critical for scientific logging and accurate invoicing.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Key Features of Our Professional Time Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Real-Time Results with High-Performance Logic
          </h3>
          <p className="text-gray-200 text-base">
            Every slider movement or keystroke updates all values instantly — no "Calculate" button needed for most use cases.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Mobile-Optimized Interface for Fast Field Calculations
          </h3>
          <p className="text-gray-200 text-base">
            Large touch-friendly sliders and number inputs work perfectly on low-end Android phones common world .
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            One-Click Reset for Multiple Time-Shift Calculations
          </h3>
          <p className="text-gray-200 text-base">
            Clear everything instantly when switching between different tasks (study time → video editing → workout tracking).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Functional Cookie Memory: Picking Up Where You Left Off
          </h3>
          <p className="text-gray-200 text-base">
            Your last entered duration is remembered (with your consent) so you can continue calculations across browser sessions.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Applications for Time Calculation
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Media Production: Calculating Total Video Run-Times
          </h3>
          <p className="text-gray-200 text-base">
            YouTube / TikTok creators: add up 12 clips (3:45, 1:22, 4:58…) → get total runtime in hh:mm:ss and decimal hours for ad revenue estimates.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Academic Science: Converting Experimental Data into Seconds
          </h3>
          <p className="text-gray-200 text-base">
            Physics / Chemistry students in  colleges: convert reaction times, pendulum periods, or titration durations into total seconds for graphing and calculations.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Daily Productivity: Tracking Task Durations and Deadlines
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Pomodoro / time-blocking: convert focused sessions to decimal hours</li>
            <li>Freelance billing: 3 h 40 min = 3.67 billable hours</li>
            <li>Workout logging: total weekly gym time in minutes</li>
            <li>Exam preparation: how many total hours studied this month</li>
            <li>Sleep tracking: convert bedtime to wake-up into decimal hours</li>
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference Time Conversion Table
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">hh:mm:ss</th>
                  <th className="p-4 text-left font-semibold">Total Seconds</th>
                  <th className="p-4 text-left font-semibold">Total Minutes</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">1:00:00</td><td className="p-4">3,600</td><td className="p-4">60.00</td><td className="p-4 font-bold text-green-400">1.0000</td></tr>
                <tr><td className="p-4">0:45:30</td><td className="p-4">2,730</td><td className="p-4">45.50</td><td className="p-4 font-bold text-green-400">0.7583</td></tr>
                <tr><td className="p-4">2:30:00</td><td className="p-4">9,000</td><td className="p-4">150.00</td><td className="p-4 font-bold text-green-400">2.5000</td></tr>
                <tr><td className="p-4">1:22:30</td><td className="p-4">4,950</td><td className="p-4">82.50</td><td className="p-4 font-bold text-green-400">1.3750</td></tr>
                <tr><td className="p-4">8:15:45</td><td className="p-4">29,745</td><td className="p-4">495.75</td><td className="p-4 font-bold text-green-400">8.2625</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Time & Productivity Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your time conversions with these other free LizoCalc calculators:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link  href="/calculators/time/date-calculator" className="text-blue-400 hover:underline">
                Date Calculator
              </Link > — days / weeks / months between dates
            </li>
            <li>
              <Link  href="/calculators/age-calculator" className="text-blue-400 hover:underline">
                Age Calculator
              </Link > — exact age + lifetime days/hours/minutes
            </li>
           
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Stop wasting time on manual calculations. LizoCalc Time Calculator gives you instant, accurate time conversions every time. Bookmark it today and make every minute count!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}