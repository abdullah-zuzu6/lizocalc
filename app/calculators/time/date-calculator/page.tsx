import  { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import DateCalculatorClient from "./clientside";
 


const faqData = [
  {
    question: "How do I calculate the number of days between two dates?",
    answer: "To calculate the duration between two dates, you subtract the earlier date from the later date. Mathematically, this is done by converting both dates into a total day count (or Unix timestamp) and finding the difference. Formula: Total Days = Date 2 - Date 1. If you include the end date in your count, simply add 1 to your final result.",
  },
  {
    question: "How can I add or subtract days from a specific date?",
    answer: "To find a future or past date, take your start date and add or subtract the desired number of days. For example, to find a date 45 days from today: Start Date + 45 days. If the sum of days exceeds the days in the current month, you carry the remainder over to the next month, repeating until the count is complete.",
  },
  {
    question: "What is the difference between calendar days and business days?",
    answer: "Calendar days include every day of the week (Monday through Sunday), while business days typically exclude Saturdays, Sundays, and public holidays. To calculate business days manually: Total Days - (Weekends) - (Holidays) = Business Days. Most projects use a standard 5-day work week for this calculation.",
  },
  {
    question: "How many weeks are in a specific date range?",
    answer: "To find the number of weeks between two dates, calculate the total number of days and divide by 7. Formula: Weeks = Total Days / 7. For example, if there are 210 days between two dates, the interval is exactly 30 weeks. If there is a remainder, those are the additional odd days (e.g., 212 days = 30 weeks and 2 days).",
  },
  {
    question: "How does a date calculator handle leap years?",
    answer: "A precise date calculator automatically identifies if the year is divisible by 4 (and not divisible by 100, unless also divisible by 400). When the date range spans across February 29th, the calculator adds an extra day to the total count. This ensures that calculations over multi-year periods remain accurate to the calendar.",
  },
  {
    question: "How do I calculate a date 90 days from now?",
    answer: "Calculating 90 days involves moving forward approximately three months, but the exact date depends on the specific months involved. Step 1: Start with the current date. Step 2: Add the days remaining in the current month. Step 3: Continue adding days from subsequent months until you reach 90. Example: From January 1st, 90 days later is April 1st (or March 31st in a leap year).",
  }
];
export const metadata: Metadata = {
  title: "Date Calculator | Days Between Dates, Days From Date & Date Difference",
description: "Calculate how many days, weeks, months & years between two dates — or find a date 30, 60, 90 days from today. Free date to date calculator with instant results.",
  keywords: [
    "date calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "duration calculator",
    "date difference calculator",
    "business days calculator",
    "calendar day counter",
    "time between dates",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/date-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Date Calculator | LizoCalc",
    description:
      "Calculate the exact number of days between dates or perform date arithmetic with our free, professional tool.",
    url: "https://www.lizocalc.com/calculators/time/date-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Date Calculator | Days Between Dates & Duration",
    description:
      "Easily find the duration between two dates or add/subtract time to find a future or past date instantly.",
  },
};
export default function DateCalculatorPage() {
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
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb",
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
                    name: "Time",
                    item: "https://www.lizocalc.com/calculators/time",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Date Calculator",
                    item: "https://www.lizocalc.com/calculators/time/date-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
                url: "https://www.lizocalc.com/calculators/time/date-calculator",
                name: "Date Calculator",
                description: "Use our free date calculator to find the exact number of days between two dates or add/subtract time from a specific date easily.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://www.lizocalc.com"
                },"mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app"
}
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app",
                name: "Date Calculator",
                url: "https://www.lizocalc.com/calculators/time/date-calculator",
                description: "Calculate duration between dates and add or subtract time accurately using the Gregorian calendar.",
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Date Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate days between two dates",
                  "Add time to a specific date",
                  "Subtract time from a specific date",
                  "Include/Exclude end day option",
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
  "target": ["https://www.lizocalc.com/calculators/time/date-calculator"]
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
              Date Calculator: Find the Exact Duration Between Two Dates
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DateCalculatorClient />
      </section>

      {/* SEO Content */}
   <article className="max-w-6xl mx-auto px-6 py-16 text-white">
 
      {/* ── INTRO ── */}
      <p className="text-gray-200 leading-relaxed mb-6 text-lg">
        The <strong>Date Calculator</strong> — also called the{" "}
        <strong>Date Difference Calculator</strong>, Days Between Dates tool, or{" "}
        <strong>day to day calculator</strong> — is one of the most practical
        everyday utilities. Whether you're a student calculating how many days are
        left until board exams, a government employee determining exact service
        duration for pension papers, a business owner counting days for project
        deadlines, or someone planning a family wedding or Umrah trip, knowing the
        precise number of days, weeks, months, or years between two dates eliminates
        guesswork and prevents costly mistakes.
      </p>
 
      <p className="text-gray-200 leading-relaxed mb-8 text-lg">
        Our completely free, no-registration-required <strong>LizoCalc Date
        Calculator</strong> instantly shows: total days between any two dates,
        breakdown in years + months + days, weeks &amp; weekdays count, and lets
        you add or subtract days, weeks, months, or years from any date — all with
        a beautiful mobile-friendly interface. The tool handles leap years perfectly,
        uses Gregorian calendar logic, and contains zero ads. Ideal for students in
        Punjab, professionals, lawyers, accountants, event planners, and everyday
        users.
      </p>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 1 — DATE DIFFERENCE / DAYS BETWEEN DATES
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Date Difference Calculator — Days Between Dates in Years, Months &amp; Weeks
        </h2>
 
        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8">
          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How Many Days From One Date to Another — Exact Days Between Two Specific Dates
          </h3>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Enter any start date and end date — the <strong>days between dates
            calculator</strong> instantly returns the exact number of days separating
            them. Whether you need to know <strong>how many days from date to
            date</strong>, run a <strong>countdown date to date</strong>, or simply{" "}
            <strong>count days from a specific date</strong>, our tool handles it all
            in one click. It works as a complete <strong>date difference calculator</strong>,{" "}
            <strong>day difference calculator</strong>, and{" "}
            <strong>date range calculator</strong> in one place.
          </p>
          <p className="text-gray-300 italic text-base">
            Example (as of today March 31, 2026):<br />
            From birth date 15 March 2000 → today = <strong>9,512 days</strong>
          </p>
        </div>
 
        {/* Breakdown */}
        <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
          Breaking Down Time: Calculate Years, Months, Weeks and Days Between Dates
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-6">
          Most people want more than just total days. Our{" "}
          <strong>years months days calculator</strong> shows a human-readable
          breakdown — making it easy to understand exactly how many years, months,
          and days separate any two dates:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mb-6">
          <li>Full years completed</li>
          <li>Remaining months</li>
          <li>Remaining days</li>
          <li>Total weeks (with decimal)</li>
          <li>Exact weekdays count (Monday–Friday)</li>
        </ul>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          This makes our tool a complete <strong>day month year calculator</strong>,{" "}
          <strong>month and year calculator</strong>, and{" "}
          <strong>weeks and days calculator</strong> all in one. Instead of bouncing
          between multiple tools, you get the full picture instantly — whether you
          need to <strong>calculate years months days</strong> from a service start
          date, or find out <strong>how many weeks date to date</strong> for a
          project schedule.
        </p>
 
        {/* Date difference examples table */}
        <div className="overflow-x-auto mt-8 mb-10">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">From Date</th>
                <th className="p-4 text-left font-semibold">To Date</th>
                <th className="p-4 text-left font-semibold">Total Days</th>
                <th className="p-4 text-left font-semibold">Weeks</th>
                <th className="p-4 text-left font-semibold">Years / Months / Days</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">15 Mar 2000</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">9,512</td>
                <td className="p-4">1,358.86</td>
                <td className="p-4">26y 0m 16d</td>
              </tr>
              <tr>
                <td className="p-4">1 Jan 2026</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">89</td>
                <td className="p-4">12.71</td>
                <td className="p-4">0y 2m 30d</td>
              </tr>
              <tr>
                <td className="p-4">1 Apr 2025</td>
                <td className="p-4">20 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">353</td>
                <td className="p-4">50.43</td>
                <td className="p-4">0y 11m 19d</td>
              </tr>
              <tr>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">8</td>
                <td className="p-4">1.14</td>
                <td className="p-4">0y 0m 8d</td>
              </tr>
            </tbody>
          </table>
        </div>
 
        {/* +1 day rule */}
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          The "+1 Day" Rule: Inclusive vs Exclusive in a Day to Day Calendar Calculator
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          There are two common ways people count days when using a{" "}
          <strong>day to day calendar calculator</strong>:
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-blue-300 mb-3">Exclusive (programming standard)</h4>
            <p className="text-gray-200 text-base">
              23 March – 25 March = <strong>2 days</strong><br />
              (does not include the end day)
            </p>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-blue-300 mb-3">Inclusive (real-world standard)</h4>
            <p className="text-gray-200 text-base">
              23 March – 25 March = <strong>3 days</strong><br />
              (includes both start and end day)
            </p>
          </div>
        </div>
        <p className="text-gray-200 text-base leading-relaxed mt-6">
          When a project must be delivered "within 30 days" or rent is due "after 15
          days notice", almost everyone in Pakistan (and most legal systems) uses
          inclusive counting. Our <strong>date to date calculator</strong> defaults to
          inclusive counting for practical real-world use — but you can toggle
          exclusive mode if needed.
        </p>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 2 — HOW MANY DAYS SINCE / DAYS SINCE CALCULATOR
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How Many Days Since Calculator — Count Days From Any Past Date to Today
        </h2>
 
        <p className="text-gray-200 text-base leading-relaxed mb-6">
          One of the most popular uses of our tool is as a{" "}
          <strong>how many days since calculator</strong> or{" "}
          <strong>days since calculator</strong>. Simply set your start date to any
          past event and the end date to today — and instantly find out{" "}
          <strong>how many days have passed since</strong> that moment. This works as
          a <strong>day since calculator</strong>, <strong>days since date</strong>{" "}
          tracker, and <strong>time since date</strong> counter all in one.
        </p>
 
        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-8">
          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Days Counter From Date: Practical "How Many Days Since" Examples
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
              <p className="text-gray-200 text-base space-y-2">
                <span className="block">
                  <strong className="text-blue-300">Since Pakistan Day (23 Mar 2026):</strong><br />
                  8 days ago (as of 31 Mar 2026)
                </span>
                <span className="block mt-3">
                  <strong className="text-blue-300">Since New Year 2026 (1 Jan 2026):</strong><br />
                  89 days
                </span>
              </p>
            </div>
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
              <p className="text-gray-200 text-base space-y-2">
                <span className="block">
                  <strong className="text-blue-300">Since your last birthday (born 15 Mar):</strong><br />
                  16 days
                </span>
                <span className="block mt-3">
                  <strong className="text-blue-300">Since Eid-ul-Fitr 2025 (1 Apr 2025):</strong><br />
                  365 days
                </span>
              </p>
            </div>
          </div>
        </div>
 
        {/* Days since table */}
        <div className="overflow-x-auto mt-6 mb-10">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Event / Start Date</th>
                <th className="p-4 text-left font-semibold">As Of (End Date)</th>
                <th className="p-4 text-left font-semibold">Days Since</th>
                <th className="p-4 text-left font-semibold">Weeks Since</th>
                <th className="p-4 text-left font-semibold">Months Since</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">New Year 2026 (1 Jan)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">89</td>
                <td className="p-4">12.71</td>
                <td className="p-4">~2.9</td>
              </tr>
              <tr>
                <td className="p-4">Pakistan Day (23 Mar)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">8</td>
                <td className="p-4">1.14</td>
                <td className="p-4">~0.3</td>
              </tr>
              <tr>
                <td className="p-4">Eid-ul-Fitr 2025 (1 Apr)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">365</td>
                <td className="p-4">52.14</td>
                <td className="p-4">~12</td>
              </tr>
              <tr>
                <td className="p-4">Independence Day (14 Aug 2025)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4 font-bold text-green-400">229</td>
                <td className="p-4">32.71</td>
                <td className="p-4">~7.5</td>
              </tr>
            </tbody>
          </table>
        </div>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          How Many Weeks Since a Date — Weeks Since Calculator
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          For those who think in weekly cycles, our tool also answers{" "}
          <strong>how many weeks since</strong> a specific date, or{" "}
          <strong>how many weeks has it been since</strong> an event. Simply divide
          total days by 7 — but our calculator does this automatically, showing full
          weeks plus remaining days:
        </p>
        <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
          Since 1 January 2026 → 31 March 2026<br />
          Total days: 89 ÷ 7 = <strong>12 full weeks + 5 days</strong><br />
          Weekdays (Mon–Fri only): <strong>64 working days</strong>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 3 — 90 DAYS / 60 DAYS / 45 DAYS FROM DATE
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          90 Days From 3/23/26, 60 Days, 45 Days — Add Days to Any Date Instantly
        </h2>
 
        <p className="text-gray-200 text-base leading-relaxed mb-6">
          Some of the most searched date questions are specific "X days from a date"
          queries. Here are the most popular ones answered instantly, with our{" "}
          <strong>days from date calculator</strong> logic shown:
        </p>
 
        {/* Big reference table — primary keyword magnet */}
        <div className="overflow-x-auto mt-4 mb-10">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Query</th>
                <th className="p-4 text-left font-semibold">Start Date</th>
                <th className="p-4 text-left font-semibold">Days Added</th>
                <th className="p-4 text-left font-semibold">Result Date</th>
                <th className="p-4 text-left font-semibold">Day of Week</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4 font-semibold text-yellow-300">90 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+90</td>
                <td className="p-4 font-bold text-green-400">21 Jun 2026</td>
                <td className="p-4">Sunday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">What is 90 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+90</td>
                <td className="p-4 font-bold text-green-400">21 Jun 2026</td>
                <td className="p-4">Sunday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">45 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+45</td>
                <td className="p-4 font-bold text-green-400">7 May 2026</td>
                <td className="p-4">Thursday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">15 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+15</td>
                <td className="p-4 font-bold text-green-400">7 Apr 2026</td>
                <td className="p-4">Tuesday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">21 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+21</td>
                <td className="p-4 font-bold text-green-400">13 Apr 2026</td>
                <td className="p-4">Monday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">28 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+28</td>
                <td className="p-4 font-bold text-green-400">20 Apr 2026</td>
                <td className="p-4">Monday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">40 days from 3/23/26</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+40</td>
                <td className="p-4 font-bold text-green-400">2 May 2026</td>
                <td className="p-4">Saturday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">60 days from date (3/23/26)</td>
                <td className="p-4">23 Mar 2026</td>
                <td className="p-4">+60</td>
                <td className="p-4 font-bold text-green-400">22 May 2026</td>
                <td className="p-4">Friday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">45 days from 4/1/25</td>
                <td className="p-4">1 Apr 2025</td>
                <td className="p-4">+45</td>
                <td className="p-4 font-bold text-green-400">16 May 2025</td>
                <td className="p-4">Friday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">90 days from 4/1/2025</td>
                <td className="p-4">1 Apr 2025</td>
                <td className="p-4">+90</td>
                <td className="p-4 font-bold text-green-400">30 Jun 2025</td>
                <td className="p-4">Monday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">90 days from today (31 Mar 2026)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+90</td>
                <td className="p-4 font-bold text-green-400">29 Jun 2026</td>
                <td className="p-4">Monday</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-yellow-300">60 days from today (31 Mar 2026)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+60</td>
                <td className="p-4 font-bold text-green-400">30 May 2026</td>
                <td className="p-4">Saturday</td>
              </tr>
            </tbody>
          </table>
        </div>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          90 Days From Date Calculator — Why 90-Day Periods Matter
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          The <strong>90 days from date</strong> calculation is one of the most
          commonly needed in business and law. A{" "}
          <strong>calculate 90 days</strong> query usually comes from:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
          <li>Visa validity windows (90-day tourist entry rules)</li>
          <li>Warranty and return period tracking</li>
          <li>Tax filing deadlines (FBR 90-day compliance window)</li>
          <li>Medical prescription or treatment follow-up periods</li>
          <li>Probation completion dates for new employees</li>
        </ul>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          60 Days From Date Calculator — Common 60-Day Use Cases
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          The <strong>60 days from date calculator</strong> and{" "}
          <strong>calculate 60 days from a date</strong> feature is widely used for:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
          <li>SECP regulatory filing deadlines (60-day compliance windows)</li>
          <li>Bank guarantee validity periods</li>
          <li>Credit card billing cycles</li>
          <li>Medical prescription renewal periods</li>
        </ul>
 
        <h4 className="text-xl font-bold text-blue-300 mt-5 mb-2">
          ISO-8601 Standardized Calendar Logic
        </h4>
        <p className="text-gray-200 text-base">
          Our tool follows proper calendar math — not just adding 90×24 hours. It
          correctly handles month boundaries and leap days so 31 Jan + 1 month =
          28/29 Feb (not 2 March).
        </p>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 4 — ADVANCED DATE ARITHMETIC
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Advanced Date Arithmetic: Add or Subtract Time With Our Day Calculator From Date
        </h2>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          How to Add Years, Months, or Weeks to a Date — Year and Date Calculator
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Need to know what date it will be 3 years and 4 months from today? Or
          180 days from your joining date? Our <strong>year and date calculator</strong>{" "}
          handles all of this precisely — accounting for leap years and varying month
          lengths automatically.
        </p>
        <p className="text-gray-200 text-base mb-6">
          Just enter base date → choose <strong>Add</strong> → enter number of
          years/months/weeks/days → calculate.
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Subtracting Time: Calculate Days Before a Date for Past Records
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-3">
          Our <strong>calculate days before date</strong> and{" "}
          <strong>date minus days calculator</strong> features are equally powerful.
          Very useful for:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
          <li>When was 90 days before today? (refund windows, medical history)</li>
          <li>What date was exactly 2 years ago? (anniversary reminders)</li>
          <li>When does a 3-year warranty expire?</li>
          <li>Calculate 60 days from a date for contract deadlines</li>
          <li>Find the date 1 year and 6 months before any reference date</li>
        </ul>
 
        {/* Add/subtract examples table */}
        <div className="overflow-x-auto mt-6 mb-10">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Operation</th>
                <th className="p-4 text-left font-semibold">Base Date</th>
                <th className="p-4 text-left font-semibold">Add / Subtract</th>
                <th className="p-4 text-left font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">+90 days (90 days from today)</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+90 days</td>
                <td className="p-4 font-bold text-green-400">29 Jun 2026</td>
              </tr>
              <tr>
                <td className="p-4">+60 days from today</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+60 days</td>
                <td className="p-4 font-bold text-green-400">30 May 2026</td>
              </tr>
              <tr>
                <td className="p-4">+30 days from today</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+30 days</td>
                <td className="p-4 font-bold text-green-400">30 Apr 2026</td>
              </tr>
              <tr>
                <td className="p-4">−1 year 6 months</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">−1y 6m</td>
                <td className="p-4 font-bold text-green-400">30 Sep 2024</td>
              </tr>
              <tr>
                <td className="p-4">+3 years 4 months</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+3y 4m</td>
                <td className="p-4 font-bold text-green-400">31 Jul 2029</td>
              </tr>
              <tr>
                <td className="p-4">+180 days</td>
                <td className="p-4">31 Mar 2026</td>
                <td className="p-4">+180 days</td>
                <td className="p-4 font-bold text-green-400">27 Sep 2026</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 5 — THE MATH / FORMULA
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Understanding the Math: How the Day to Day Calculator Works
        </h2>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          The Formula for Calendar Duration — How Many Days Between Dates
        </h3>
        <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
          totalMilliseconds = date2.getTime() − date1.getTime()<br />
          totalDays = Math.floor(totalMilliseconds / (1000 × 60 × 60 × 24))
        </div>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Converting Total Days to Weeks, Months and Years — Days Months Years Calculator
        </h3>
        <p className="text-gray-200 text-base mb-4">
          Simple conversions our <strong>days months years calculator</strong>{" "}
          displays automatically:
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
          <li>Weeks = totalDays ÷ 7</li>
          <li>Weekdays = totalDays − weekends</li>
          <li>Approximate years = totalDays ÷ 365.2425</li>
          <li>Months ≈ totalDays ÷ 30.4375 (average month)</li>
        </ul>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Handling Varying Month Lengths When Adding Days to a Date
        </h3>
        <p className="text-gray-200 text-base mb-6">
          When adding months we use proper calendar logic:<br />
          31 Jan + 1 month = 28 Feb (or 29 in leap year)<br />
          30 Apr + 1 month = 30 May (not 31 May)
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          How Many Years, Months and Days Between Two Dates — Step-by-Step Worked Example
        </h3>
        <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
          Start: 15 March 2000<br />
          End:   31 March 2026<br />
          ──────────────────────────────<br />
          Years:   26 (completed full years)<br />
          Months:  0  (remaining after full years)<br />
          Days:    16 (remaining after full months)<br />
          ──────────────────────────────<br />
          Total days:  9,512<br />
          Total weeks: 1,358.86 weeks<br />
          Weekdays:    ≈ 6,794 working days
        </div>
 
        {/* Leap year table — kept from original */}
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Automated Leap Year Handling for Precision Results
        </h3>
        <div className="overflow-x-auto mt-4 mb-8">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Year</th>
                <th className="p-4 text-left font-semibold">Leap?</th>
                <th className="p-4 text-left font-semibold">Reason</th>
                <th className="p-4 text-left font-semibold">Impact on Date Calculation</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">2024</td>
                <td className="p-4 text-green-400">Yes</td>
                <td className="p-4">÷4</td>
                <td className="p-4">Extra day added to elapsed days count</td>
              </tr>
              <tr>
                <td className="p-4">2025</td>
                <td className="p-4 text-red-400">No</td>
                <td className="p-4">—</td>
                <td className="p-4">Standard 365-day year</td>
              </tr>
              <tr>
                <td className="p-4">2028</td>
                <td className="p-4 text-green-400">Yes</td>
                <td className="p-4">÷4</td>
                <td className="p-4">Extra day added</td>
              </tr>
              <tr>
                <td className="p-4">1900</td>
                <td className="p-4 text-red-400">No</td>
                <td className="p-4">÷100 but not ÷400</td>
                <td className="p-4">No extra day — common calculator error source</td>
              </tr>
              <tr>
                <td className="p-4">2000</td>
                <td className="p-4 text-green-400">Yes</td>
                <td className="p-4">÷400</td>
                <td className="p-4">Extra day added correctly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 6 — MONTHS / WEEKS CALCULATOR
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Month to Date Calculator — Calculate Months Between Dates &amp; Weeks From Date
        </h2>
 
        <p className="text-gray-200 text-base leading-relaxed mb-6">
          Our <strong>month to date calculator</strong> and{" "}
          <strong>date calculator in months</strong> mode is ideal when you need to
          think in months rather than days. Our <strong>months and days calculator</strong>{" "}
          and <strong>months calculator between dates</strong> cover common scenarios:
        </p>
 
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-blue-300 mb-3">Months Calculator From Dates</h4>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
              <li>Pregnancy tracking (40 weeks = ~9 months)</li>
              <li>Loan tenure remaining</li>
              <li>Subscription duration</li>
              <li>Employee probation period</li>
              <li>Lease/rental agreement length</li>
            </ul>
          </div>
          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
            <h4 className="text-xl font-bold text-blue-300 mb-3">Month and Days Calculator — Example</h4>
            <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              1 Jan 2026 → 31 Mar 2026<br />
              = 2 months 30 days<br />
              = 89 total days<br />
              = 12.71 weeks
            </div>
          </div>
        </div>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Calculate Weeks From Date — How Many Weeks From Date to Date
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          For project managers, coaches, and teachers who think in weekly cycles,
          our <strong>calculate weeks from date</strong> and{" "}
          <strong>weeks from date to date</strong> feature converts any date range
          into exact weeks and remaining days:
        </p>
        <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
          Start: 1 January 2026<br />
          End:   31 March 2026<br />
          ──────────────────<br />
          Total days:  89<br />
          Full weeks:  12<br />
          Extra days:  5<br />
          Weekdays:    64
        </div>
 
        {/* Weeks/months conversion table */}
        <div className="overflow-x-auto mt-6 mb-8">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Duration</th>
                <th className="p-4 text-left font-semibold">Total Days</th>
                <th className="p-4 text-left font-semibold">Full Weeks</th>
                <th className="p-4 text-left font-semibold">Total Months (approx.)</th>
                <th className="p-4 text-left font-semibold">Weekdays</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">1 month</td>
                <td className="p-4">~30</td>
                <td className="p-4">4.29</td>
                <td className="p-4">1</td>
                <td className="p-4">~22</td>
              </tr>
              <tr>
                <td className="p-4">3 months</td>
                <td className="p-4">~91</td>
                <td className="p-4">13</td>
                <td className="p-4">3</td>
                <td className="p-4">~65</td>
              </tr>
              <tr>
                <td className="p-4">6 months</td>
                <td className="p-4">~182</td>
                <td className="p-4">26</td>
                <td className="p-4">6</td>
                <td className="p-4">~130</td>
              </tr>
              <tr>
                <td className="p-4">1 year</td>
                <td className="p-4">365</td>
                <td className="p-4">52.14</td>
                <td className="p-4">12</td>
                <td className="p-4">~261</td>
              </tr>
              <tr>
                <td className="p-4">2 years</td>
                <td className="p-4">730</td>
                <td className="p-4">104.29</td>
                <td className="p-4">24</td>
                <td className="p-4">~522</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 7 — FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Features of the LizoCalc Date and Time Calculator
        </h2>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          100% Gregorian Calendar Accuracy — Online Date Calculator for Any Day, Month, Year
        </h3>
        <p className="text-gray-200 text-base leading-relaxed">
          Full Gregorian rules including century leap-year exceptions (1900 not leap,
          2000 is leap). Whether used as a <strong>month calculator between dates</strong>,
          a <strong>year month day calculator</strong>, or simply to{" "}
          <strong>count days from date</strong>, accuracy is guaranteed across all
          date ranges from 1900 to 2100.
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Instant Mode-Switcher — Date and Calendar Calculator in One Interface
        </h3>
        <p className="text-gray-200 text-base">
          One-click switch between "Difference Between Dates" and "Add/Subtract Days"
          modes — no page reload. Functions as a complete{" "}
          <strong>date and calendar calculator</strong>,{" "}
          <strong>date and time calculator</strong>, and{" "}
          <strong>calendar to count days</strong> tool all in one interface.
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
          Mobile-Friendly Calendar Pickers — Calculator for Days Between Dates on Any Device
        </h3>
        <p className="text-gray-200 text-base">
          Native calendar popups on mobile + dropdowns for month/day/year — works
          perfectly on low-end Android phones. Whether you need a{" "}
          <strong>calculator for days between dates</strong>, a quick{" "}
          <strong>days to date calculator</strong>, or an{" "}
          <strong>end date calculator</strong>, you'll get instant results without
          any friction.
        </p>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 8 — REAL WORLD USES
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Real-World Uses for a Professional Days Between Dates Calculator
        </h2>
 
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Project Management: Calculate Number of Days From a Date for Deadlines
        </h3>
        <p className="text-gray-200 text-base mb-6">
          "Project must be completed within 45 working days" → calculate the exact
          end date excluding weekends. Use our{" "}
          <strong>calculate number of days from a date</strong> tool to set
          milestones at 25%, 50%, and 75% completion marks automatically.
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
          Legal and Financial: Interest Periods, Filing Deadlines &amp; No. of Days Calculator
        </h3>
        <p className="text-gray-200 text-base mb-6">
          Limitation period (3 years for many civil cases in Pakistan) • Income tax
          return filing deadlines • Bank loan EMI start/end dates • Cheque validity
          (6 months) • 60-day SECP compliance windows • Court-ordered payment
          schedules using our <strong>number of days calculator</strong> and{" "}
          <strong>date difference in days</strong> tool.
        </p>
 
        <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
          Personal Milestones: Anniversaries, Travel &amp; Countdown Date to Date
        </h3>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-8">
          <li>Days until next visa renewal (countdown date to date)</li>
          <li>Wedding anniversary countdown</li>
          <li>How long since moving to a new city</li>
          <li>Days until child's first birthday party</li>
          <li>Planning 10-day family trip to northern areas</li>
          <li>Ramadan / Eid countdown tracker</li>
        </ul>
 
        {/* Use-case lookup table */}
        <div className="overflow-x-auto mt-4 mb-10">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Use Case</th>
                <th className="p-4 text-left font-semibold">Tool Feature Needed</th>
                <th className="p-4 text-left font-semibold">Typical Period</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr>
                <td className="p-4">SECP regulatory compliance</td>
                <td className="p-4">60 days from date calculator</td>
                <td className="p-4">60 days</td>
              </tr>
              <tr>
                <td className="p-4">Visa validity tracking</td>
                <td className="p-4">90 days from date calculator</td>
                <td className="p-4">90 days</td>
              </tr>
              <tr>
                <td className="p-4">Pregnancy milestones</td>
                <td className="p-4">Weeks from date calculator</td>
                <td className="p-4">40 weeks</td>
              </tr>
              <tr>
                <td className="p-4">Employee probation end</td>
                <td className="p-4">Days from date calculator</td>
                <td className="p-4">90–180 days</td>
              </tr>
              <tr>
                <td className="p-4">Court limitation period</td>
                <td className="p-4">Years months days calculator</td>
                <td className="p-4">3 years</td>
              </tr>
              <tr>
                <td className="p-4">Cheque validity check</td>
                <td className="p-4">Days between dates calculator</td>
                <td className="p-4">6 months</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 9 — FAQ (new keyword-rich section)
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Date Difference &amp; Days Calculator
        </h2>
 
        <div className="space-y-8">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              What is 90 days from 3/23/2026?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              90 days from March 23, 2026 is <strong>June 21, 2026</strong> (Sunday).
              This is calculated by adding exactly 90 calendar days to March 23. If
              you need the business-days-only answer, 90 weekdays from 3/23/2026 falls
              later — our calculator shows both versions.
            </p>
          </div>
 
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              How many days between two dates — how does the calculation work?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              The tool subtracts the earlier date from the later date in milliseconds,
              then divides by 86,400,000 (milliseconds per day). The result is the
              exact <strong>number of days between dates</strong>. For a human-friendly
              breakdown, it then converts remaining days into full years, months, and
              leftover days using calendar-aware logic.
            </p>
          </div>
 
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              How do I calculate days since a specific past date?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              Set the start date to your past event and the end date to today (or leave
              it blank — the tool auto-fills today's date). The result shows total{" "}
              <strong>days since</strong> that date, plus weeks, months, and years.
              This is the <strong>how long has it been since calculator</strong>{" "}
              function, and it updates automatically every time you load the page.
            </p>
          </div>
 
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              Can I calculate the date a certain number of weeks after a date?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              Yes. The <strong>weeks after</strong> and{" "}
              <strong>week calculator from date</strong> feature works by converting
              weeks to days (weeks × 7) and adding to the base date. Example: 8 weeks
              after 23 March 2026 = 56 days later = <strong>18 May 2026</strong>.
              The tool also tells you the day of the week for the result date.
            </p>
          </div>
 
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              What is a "reverse date calculator" and does LizoCalc support it?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              A <strong>reverse date calculator</strong> (also called a{" "}
              <strong>back date calculator</strong> or{" "}
              <strong>calendar count backwards</strong> tool) starts from a known
              end date and subtracts days to find the start. For example: "What date
              is 90 days <em>before</em> June 21, 2026?" → March 23, 2026. Yes,
              LizoCalc supports this with the Subtract mode.
            </p>
          </div>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 10 — MASTER EXAMPLES TABLE
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Complete Date Calculation Examples — Days, Months and Years Calculator (2025–2026)
        </h2>
 
        <div className="overflow-x-auto mt-8 mb-12">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Scenario</th>
                <th className="p-4 text-left font-semibold">From</th>
                <th className="p-4 text-left font-semibold">To / ±</th>
                <th className="p-4 text-left font-semibold">Result</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              <tr><td className="p-4">Age today (born 2000)</td><td className="p-4">15 Mar 2000</td><td className="p-4">31 Mar 2026</td><td className="p-4 font-bold text-green-400">9,512 days</td></tr>
              <tr><td className="p-4">90 days from today</td><td className="p-4">31 Mar 2026</td><td className="p-4">+90 days</td><td className="p-4 font-bold text-green-400">29 Jun 2026</td></tr>
              <tr><td className="p-4">60 days from today</td><td className="p-4">31 Mar 2026</td><td className="p-4">+60 days</td><td className="p-4 font-bold text-green-400">30 May 2026</td></tr>
              <tr><td className="p-4">45 days from 3/23/26</td><td className="p-4">23 Mar 2026</td><td className="p-4">+45 days</td><td className="p-4 font-bold text-green-400">7 May 2026</td></tr>
              <tr><td className="p-4">15 days from 3/23/26</td><td className="p-4">23 Mar 2026</td><td className="p-4">+15 days</td><td className="p-4 font-bold text-green-400">7 Apr 2026</td></tr>
              <tr><td className="p-4">21 days from 3/23/26</td><td className="p-4">23 Mar 2026</td><td className="p-4">+21 days</td><td className="p-4 font-bold text-green-400">13 Apr 2026</td></tr>
              <tr><td className="p-4">1 year 6 months ago</td><td className="p-4">31 Mar 2026</td><td className="p-4">−1y 6m</td><td className="p-4 font-bold text-green-400">30 Sep 2024</td></tr>
              <tr><td className="p-4">Days between Eid-ul-Fitr</td><td className="p-4">1 Apr 2025</td><td className="p-4">20 Mar 2026</td><td className="p-4 font-bold text-green-400">353 days</td></tr>
              <tr><td className="p-4">45 days from 4/1/25</td><td className="p-4">1 Apr 2025</td><td className="p-4">+45 days</td><td className="p-4 font-bold text-green-400">16 May 2025</td></tr>
              <tr><td className="p-4">How many days since New Year</td><td className="p-4">1 Jan 2026</td><td className="p-4">31 Mar 2026</td><td className="p-4 font-bold text-green-400">89 days</td></tr>
            </tbody>
          </table>
        </div>
      </section>
 
      {/* ══════════════════════════════════════════════════════════
          SECTION 11 — MORE TOOLS
      ══════════════════════════════════════════════════════════ */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          More Time &amp; Date Tools to Explore
        </h2>
 
        <p className="text-gray-200 text-base mb-6">
          Combine with these other free LizoCalc tools:
        </p>
 
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
          <li>
            <a href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
              Time Calculator
            </a>{" "}
            — hours ↔ minutes ↔ seconds conversions
          </li>
          <li>
            <a href="/calculators/time/age-calculator" className="text-blue-400 hover:underline">
              Age Calculator
            </a>{" "}
            — exact age + life stats using our day month year calculator engine
          </li>
        </ul>
 
        <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
          Never miscount days again. Whether it's exams in Sahiwal, legal notices,
          project deadlines, or family events — LizoCalc Date Calculator gives you
          perfect accuracy every time. Bookmark it today!
        </p>
      </section>
 
    </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}