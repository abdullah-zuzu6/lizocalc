import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import NoPrefetchLink from "@/components/NoPrefetchLink";
import AgeCalculator from "./clientside";


const faqData = [
  {
    question: "How is my exact age calculated?",
    answer: "Your exact age is determined by calculating the difference between your birth date and the current date. To find this manually, subtract the birth year from the current year, then adjust based on whether your birthday has occurred yet in the current year. The standard formula is: Age = Current Year - Birth Year (minus 1 if the current month/day is before your birth month/day).",
  },
  {
    question: "How many days have I been alive?",
    answer: "To calculate your total days lived, multiply your age in years by 365 and add the number of days passed since your last birthday. Crucially, you must add 1 extra day for every leap year you have lived through. The logic follows: Total Days = (Years × 365) + Leap Days + Days since last birthday.",
  },
  {
    question: "Does the age calculator account for leap years?",
    answer: "Yes, a precise age calculator accounts for leap years by recognizing that February has 29 days every four years. A year is a leap year if it is divisible by 4, except for century years unless they are divisible by 400. This ensures your 'age in days' remains 100% accurate over long periods.",
  },
  {
    question: "How do I calculate my age in months or weeks?",
    answer: "To find your age in months, multiply your total years by 12 and add the months passed since your last birthday. For weeks, divide your total days lived by 7. For example, if you are 25 years and 6 months old, your age in months is (25 × 12) + 6 = 306 months.",
  },
  {
    question: "What is my age if I was born on February 29th?",
    answer: "If you were born on a leap day (February 29th), your legal age usually increments on March 1st during non-leap years. However, for calculation purposes, the tool counts the exact number of days elapsed. You effectively celebrate a 'true' birthday only once every 1,461 days.",
  },
  {
    question: "How can I calculate the age difference between two people?",
    answer: "To find the age gap, convert both individuals' birth dates into a total day count or 'Unix timestamp' and subtract the smaller number from the larger one. Step 1: Calculate Total Days for Person A. Step 2: Calculate Total Days for Person B. Step 3: Difference = |A - B|. This result can then be converted back into years, months, and days.",
  }
];
export const metadata: Metadata = {
  title: "Age Calculator – Days Lived, Next Birthday Countdown",
  description:
    "Calculate your exact age, total days lived, and countdown to your next birthday. A fast, free, and precise tool for chronological age calculation.",

  keywords: [
    "age calculator",
    "exact age calculator",
    "chronological age calculator",
    "how old am i",
    "birthday calculator",
    "age in days",
    "days until next birthday",
    "calculate age from date of birth",
    "leap year age calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Exact Age Calculator | LizoCalc",
    description:
      "Find out exactly how many years, months, and days you have been alive with our free advanced age tool.",
    url: "https://www.lizocalc.com/calculators/time/age-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Find Your Exact Age",
    description:
      "Instantly calculate your age in years, months, and days. Discover your total days lived and next birthday countdown.",
  },
};
export default function AgeCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === JSON-LD STRUCTURED DATA === */}
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
                "@id": "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Time ", item: "https://www.lizocalc.com/calculators/time" },
                  { "@type": "ListItem", position: 4, name: "Age Calculator", item: "https://www.lizocalc.com/calculators/time/age-calculator" },
                ],
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.lizocalc.com/calculators/time/age-calculator#app",
                name: "Advanced Age Calculator",
                url: "https://www.lizocalc.com/calculators/time/age-calculator",
                description: "Calculate exact age, total days lived, and countdown to next birthday.",
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any",
                inLanguage: "en",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
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
            
            <h1 className="text-3xl md:text-4xl font-bold">Age Calculator | Find Your Age in Years, Months & Days</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>accurate age calculator</strong> — also widely known as the chronological age tool, life timer, or days-lived counter — is one of the most practical and frequently used tools in everyday life. Whether you're a student from every wheer can  filling out school or college admission forms, a parent calculating your child's exact age for vaccinations and CNIC applications, a professional planning retirement milestones, or simply someone who wants to know exactly how many days, hours, and minutes you've been on this planet, precise age calculation removes all guesswork. Our completely free LizoCalc Age Tool makes it instant, accurate down to the day (and even the second), and beautifully simple.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>age calculator</strong> takes the complexity out of date math. Simply enter your birth date (and an optional target date), click calculate, and receive your chronological age in years, months, and days — plus lifetime statistics (total days lived, hours, minutes), a real-time ticking life counter, next birthday countdown, and future age projections. The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your last birth date (with your consent), handles any Gregorian calendar date, automatically accounts for leap years, and never shows ads. Perfect for students in Punjab, legal paperwork, health tracking, travel planning, or just celebrating your 10,000-day milestone. Jump right in and try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/time/age-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Age Calculator page
          </NoPrefetchLink>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Accurate Age Calculation and Life Breakdown
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Calculate Your Chronological Age Down to the Day
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-6">
                Our LizoCalc Age Tool instantly tells you your exact chronological age — not just "32 years old," but "32 years, 4 months, and 12 days." This precision matters in Pakistan where official documents, school admissions, driving licenses, and even job applications often require age in completed years and days. Just pick your birth date and the tool does the rest.
              </p>
              <p className="text-gray-200 leading-relaxed text-base">
                Pro tip: You can also calculate your age "as of" any future or past date — perfect for students  preparing age certificates or parents checking eligibility for government schemes.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              How Our Algorithm Handles Leap Years and Varying Month Lengths
            </h3>
            <p className="text-gray-200 text-base leading-relaxed mb-6">
              Most simple calculators ignore leap years and get the age wrong by 1–2 days every four years. Our algorithm uses the full Gregorian calendar rules:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mb-6">
              <li>A year is a leap year if divisible by 4</li>
              <li>But not if divisible by 100 — unless also divisible by 400</li>
              <li>February has 29 days in leap years, 28 otherwise</li>
              <li>Months have 28–31 days as per standard calendar</li>
            </ul>
            <p className="text-gray-200 text-base leading-relaxed">
              This ensures 100% accuracy even for people born on 29 February or when calculating across centuries.
            </p>

            <div className="overflow-x-auto mt-8 mb-8">
              <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-blue-900/70">
                    <th className="p-4 text-left font-semibold">Year</th>
                    <th className="p-4 text-left font-semibold">Leap?</th>
                    <th className="p-4 text-left font-semibold">Days in Year</th>
                    <th className="p-4 text-left font-semibold">Effect on Age Calc</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                  <tr>
                    <td className="p-4">2024</td>
                    <td className="p-4 font-bold text-green-400">Yes (÷4)</td>
                    <td className="p-4">366</td>
                    <td className="p-4">Extra day counted</td>
                  </tr>
                  <tr>
                    <td className="p-4">1900</td>
                    <td className="p-4 font-bold text-red-400">No (÷100 but not ÷400)</td>
                    <td className="p-4">365</td>
                    <td className="p-4">No extra day</td>
                  </tr>
                  <tr>
                    <td className="p-4">2000</td>
                    <td className="p-4 font-bold text-green-400">Yes (÷400)</td>
                    <td className="p-4">366</td>
                    <td className="p-4">Extra day counted</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            The Formula: Subtracting Birth Date from Target Date
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            At its core, the calculation is simple yet powerful:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Total Days Lived = (Target Date − Birth Date) in milliseconds ÷ (1000 × 60 × 60 × 24)
            <br />
            Then convert remaining days into years, months, and days using calendar-aware subtraction.
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            The tool also calculates total hours = total days × 24 and total minutes = total hours × 60 for your complete lifetime statistics.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Step-by-Step Calculation Example
          </h4>
          <p className="text-gray-200 text-base mb-4">
            Birth date: 15 March 1995<br />
            Target date: 23 March 2026 (today in this example)
          </p>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-3">
            <div>1. Calculate raw day difference → 11,325 days</div>
            <div>2. Convert to years: 31 full years (1995–2026)</div>
            <div>3. Remaining days after 31 years: 8 days (15 March to 23 March)</div>
            <div>4. Months: 0 (same month)</div>
            <div>5. Result: <strong>31 years, 0 months, 8 days</strong></div>
            <div className="pt-4 border-t border-gray-600 text-green-400 font-semibold">
              Total days lived: 11,325 • Total hours: 271,800 • Total minutes: 16,308,000
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Discover Your Lifetime Statistics: Days, Hours, and Minutes
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Total Days Lived: Celebrating Your 10,000 Days Milestone
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Many people never know when they hit 10,000 days old — roughly 27 years and 4 months. Our tool highlights this milestone instantly. For someone born in 1995, their 10,000th day fell around 2022. The calculator shows a special badge when you reach 5,000, 10,000, 15,000, or 20,000 days — perfect for birthday surprises or personal reflection.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Converting Years into Total Hours and Minutes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Beyond years and days, we give you the full temporal footprint:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
            <li>Total hours lived = Total days × 24</li>
            <li>Total minutes lived = Total hours × 60</li>
            <li>Even total seconds (for the truly curious)</li>
          </ul>
          <p className="text-gray-200 text-base mt-6">
            Example: A 30-year-old has lived roughly 10,957 days, 262,968 hours, and 15,778,080 minutes. Seeing these big numbers is surprisingly motivating!
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Real-Time Life Counter: A Detailed Temporal Breakdown
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Leave the page open and watch the counter tick up every second — exactly how many seconds you have lived since birth. The breakdown updates in real time: years/months/days + total days + hours + minutes + seconds. It's like having a personal life clock on your screen.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Next Birthday Countdown &amp; Milestone Planning
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How Many Days Until Your Next Birthday?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            The tool automatically calculates days, hours, and minutes until your next birthday. Example: If today is 23 March 2026 and you were born on 15 March, you have 357 days until your next birthday (turning 32 in 2027). The countdown updates live.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Planning for Future Ages at Specific Dates
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Want to know how old you'll be on 1 January 2030? Or on your child's 18th birthday? Enter any future date and instantly see "You will be 38 years, 9 months, and 12 days old." Perfect for retirement planning or family milestone parties.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Using the "Age at the Date of" Feature for Travel and Legal Planning
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Students applying for visas, couples planning weddings abroad, or families checking driving-license eligibility use this feature daily. Enter the exact date of travel or legal event and know your precise age on that day — no more manual counting.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Advanced Features of the LizoCalc Age Tool
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Gregorian Calendar Integration for Precise Results
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Full support for the Gregorian calendar used worldwide (including Pakistan). Handles dates from year 1900 to 2100 with perfect leap-year and month-length accuracy. No more errors for February 29 babies.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Instant Reset and Parameter Adjustment
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            One-tap "Reset" button clears everything instantly — ideal when helping multiple family members or working through a list of dates. You can also switch between "Age Today" and "Age at Date" modes without reloading the page.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Interactive Calendar Picker for Seamless Date Entry
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            No typing required. Click the calendar icon, pick your birth date visually, and the tool auto-fills. Works beautifully on mobile phones — perfect for students and parents in  using their smartphones on the go.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Precision Matters in Age Calculation
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Legal Documentation and Chronological Age Requirements
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            In Pakistan, many official processes require exact age: CNIC issuance at 18, driving license at 18, voting rights, school/college admissions, and pension calculations. A one-day error can delay paperwork. Our tool ensures zero mistakes.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Health Tracking and Age-Specific Biological Milestones
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Doctors track childhood growth charts, vaccination schedules, and adult health screenings by exact age. Knowing you are "exactly 12 years and 3 months" helps parents and physicians make better decisions. The tool also highlights common biological milestones (e.g., 10,000 days ≈ end of youth phase).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Educational Insights: Understanding the Math Behind the Time
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Students in class 6–10 in Sahiwal and across Punjab learn about calendars, leap years, and date arithmetic. Our detailed explanations turn the calculator into a learning tool — showing every step so you truly understand how time is measured.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Age Calculation Examples at a Glance
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Birth Date</th>
                  <th className="p-4 text-left font-semibold">Target Date</th>
                  <th className="p-4 text-left font-semibold">Exact Age</th>
                  <th className="p-4 text-left font-semibold">Total Days Lived</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">01 Jan 2000</td>
                  <td className="p-4">23 Mar 2026</td>
                  <td className="p-4 font-bold text-green-400">26y 2m 22d</td>
                  <td className="p-4">9,579</td>
                </tr>
                <tr>
                  <td className="p-4">29 Feb 2004</td>
                  <td className="p-4">23 Mar 2026</td>
                  <td className="p-4 font-bold text-green-400">22y 0m 23d</td>
                  <td className="p-4">8,080</td>
                </tr>
                <tr>
                  <td className="p-4">15 Mar 2015</td>
                  <td className="p-4">23 Mar 2026</td>
                  <td className="p-4 font-bold text-green-400">11y 0m 8d</td>
                  <td className="p-4">4,036</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Life Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your age calculations with these other free, fast tools from LizoCalc:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <NoPrefetchLink
                href="/calculators/time/date-calculator"
                className="text-blue-400 hover:underline"
              >
                Date Difference Calculator
              </NoPrefetchLink>{" "}
              — exact days between any two dates
            </li>
            
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Time is the one thing we can never get back. Make every day count with the most accurate, beautiful, and completely free age calculator on the internet. Bookmark the LizoCalc Age Tool today and never guess your age again!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}