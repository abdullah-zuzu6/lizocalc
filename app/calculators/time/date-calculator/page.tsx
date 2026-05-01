import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import DateCalculatorClient from "./clientside";
import DaysFromTodayWidget from "@/components/DaysFromTodayWidget";// NEW dynamic component below
import Image from "next/image";


// ─────────────────────────────────────────────
//  FAQ DATA  (keyword-rich, PAA / AI Overview targets)
// ─────────────────────────────────────────────
const faqData = [
  {
    question: "What is 90 days from today?",
    answer:
      "90 days from today depends on the current date. The calculator above auto-computes it using today's real date. For reference: 90 days from March 23, 2026 is June 21, 2026 (Sunday). 90 days from March 31, 2026 is June 29, 2026 (Monday). 90 days from April 20, 2026 is July 19, 2026. To get an exact result for any start date, use the 'Add Days' mode and enter your specific date.",
  },
  
  {
    question: "What is 60 days from today?",
    answer:
      "60 days from today changes daily. Key examples: 60 days from March 23, 2026 = May 22, 2026 (Friday). 60 days from March 31, 2026 = May 30, 2026 (Saturday). 60 days from April 20, 2026 = June 19, 2026. Enter your specific start date in the calculator above to get an instant, accurate result.",
  },
  
  {
    question: "What is 28 days from today?",
    answer:
      "28 days equals exactly 4 weeks. Examples: 28 days from March 23, 2026 = April 20, 2026 (Monday). 28 days from March 31, 2026 = April 28, 2026 (Tuesday). This calculation is commonly used for monthly billing cycles, prescription renewals, and 4-week project sprints.",
  },
  {
    question: "How do I calculate the number of days between two dates?",
    answer:
      "To calculate the duration between two dates, subtract the earlier date from the later date. The formula converts both dates into a total day count and finds the difference: Total Days = Date 2 − Date 1. To include the end date in your count (inclusive counting), add 1 to the result. Our calculator handles this automatically and also returns a breakdown in years, months, days, and total weeks.",
  },
 
  {
    question: "How can I add or subtract days from a specific date?",
    answer:
      "Switch to 'Add/Subtract Days' mode in the calculator. Enter your base date, choose Add or Subtract, then enter the number of days, weeks, months, or years. The tool uses proper Gregorian calendar logic — so adding 1 month to January 31 gives February 28 (or 29 in a leap year), not March 2.",
  },
  {
    question: "What is the difference between calendar days and business days?",
    answer:
      "Calendar days include every day of the week (Monday through Sunday). Business days exclude weekends (Saturday, Sunday) and public holidays. Formula: Business Days = Total Days − Weekends − Holidays. A standard 90-calendar-day period contains approximately 64 business days (weekdays only), depending on which weekends and holidays fall in that range.",
  },
  {
    question: "How does the date calculator handle leap years?",
    answer:
      "The calculator automatically detects leap years using three rules: (1) divisible by 4 = leap year, (2) except century years divisible by 100 — not a leap year, (3) except century years also divisible by 400 — leap year again. When a date range spans February 29, the extra day is counted. This prevents common errors like the 1900 leap-year mistake found in older spreadsheet tools.",
  },
];


// ─────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Date to Date Calculator  — Days Between Dates, 90/60/30 Days From Today",
  description:
    "Free date calculator: find days between two dates, calculate 90, 60, 45, 30, or 28 days from any date, or count days since a past event. Instant results with leap year accuracy.",
  keywords: [
    "date calculator",
    "days between dates",
    "90 days from today",
    "180 days from today",
    "60 days from today",
    "30 days from today",
    "28 days from today",
    "days from date calculator",
    "date difference calculator",
    "how many days since",
    "add days to date",
    "subtract days from date",
    "date to date calculator",
    "calendar day counter",
    "business days calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/date-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Date Calculator — Days Between Dates & Days From Today | LizoCalc",
    description:
      "Calculate the exact number of days between two dates, find 90/60/30 days from any date, or count days since a past event. Free, instant, leap-year accurate.",
    url: "https://www.lizocalc.com/calculators/time/date-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Calculator — 90/60/30 Days From Today & Date Difference",
    description:
      "Instantly find 90, 60, 45, or 30 days from any date — or calculate the exact days between two dates. Free tool with full Gregorian calendar logic.",
  },
};


// ─────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────
export default function DateCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
{/* ═══════════════════════════════════════
          JSON-LD — native <script> tag (no next/script needed for structured data)
      ═══════════════════════════════════════ */}
      <Script
        id="structured-data-date-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [

              /* ── 1. BREADCRUMB ── */
              {
                "@type": "BreadcrumbList",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
                  { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
                  { "@type": "ListItem", position: 3, name: "Time", item: "https://www.lizocalc.com/calculators/time" },
                  { "@type": "ListItem", position: 4, name: "Date Calculator", item: "https://www.lizocalc.com/calculators/time/date-calculator" },
                ],
              },

              /* ── 2. PERSON (E-E-A-T) ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description: "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
                knowsAbout: ["Date Calculation", "Calendar Logic", "Day Counters", "Web Development", "Mechatronics"],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
                foundingDate: "2026",
                founder: { "@id": "https://www.lizocalc.com/#author" },
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 4. WEBSITE ── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: { "@id": "https://www.lizocalc.com/#org" },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
                url: "https://www.lizocalc.com/calculators/time/date-calculator",
                name: "Date to Date Calculator — Days Between Dates, 90/60/30 Days From Today",
                description: "Free date calculator: find days between two dates, calculate 90, 60, 45, 30, or 28 days from any date, or count days since a past event.",
                inLanguage: "en",
                datePublished: "2026-04-04",
                dateModified: "2026-05-01",
                about: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app" },
                mainEntity: {
  "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app",
},
                primaryImageOfPage: {
                  "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image",
                },
                author: { "@id": "https://www.lizocalc.com/#author" },
                publisher: { "@id": "https://www.lizocalc.com/#org" },
                isPartOf: { "@id": "https://www.lizocalc.com/#website" },
                breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb" },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app",
                name: "Date Calculator",
                url: "https://www.lizocalc.com/calculators/time/date-calculator",
                description: "Calculate days between two dates, add or subtract days from any date, find 90/60/30 days from today, and count days since past events.",
                image: {
                  "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image",
                },
                mainEntityOfPage: {
  "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
},
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Date & Calendar Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-04-04",
                dateModified: "2026-05-01",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate days between two dates",
                  "Add or subtract days, weeks, months, years from any date",
                  "Find 90, 60, 45, 30, 28 days from today automatically",
                  "Count days since a past date",
                  "Inclusive and exclusive day counting toggle",
                  "Leap year accurate Gregorian calendar logic",
                  "Business days (weekdays) counter",
                  "Completely free with no ads",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@id": "https://www.lizocalc.com/#org" },
                potentialAction: {
                  "@type": "UseAction",
                 target: "https://www.lizocalc.com/calculators/time/date-calculator",
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id": "https://www.lizocalc.com/calculators/time/date-calculator#howto",
                name: "How to Calculate Days Between Two Dates",
                image: {
                  "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image",
                },
                isPartOf: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator" },
                description: "Step-by-step guide to finding the exact number of days between any two dates using LizoCalc Date Calculator.",
                totalTime: "PT1M",
                step: [
                  { "@type": "HowToStep", position: 1, name: "Select the mode", text: "Choose 'Days Between Dates' to find a duration, or 'Add/Subtract Days' to find a future or past date." },
                  { "@type": "HowToStep", position: 2, name: "Enter your start date", text: "Click the date picker or type your start date in MM/DD/YYYY format." },
                  { "@type": "HowToStep", position: 3, name: "Enter your end date or number of days", text: "For duration mode, pick your end date. For add/subtract mode, enter the number of days, weeks, months, or years." },
                  { "@type": "HowToStep", position: 4, name: "Read instant results", text: "Results appear immediately showing total days, weeks, months, years breakdown, and the day of the week for any result date." },
                ],
              },

             {
  "@type": "FAQPage",
  "@id": "https://www.lizocalc.com/calculators/time/date-calculator#faq",
  isPartOf: {
    "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
  },
  mainEntity: (faqData || []).map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
},

              /* ── 9. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image",
                url: "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp",
                name: "Date Calculator — Days Between Dates Interface with 30, 60 and 90 Days From Today Buttons",
                caption:
                  "LizoCalc Date Calculator showing a Starting Date calendar (green pin) and an Ending Date calendar (blue pin) connected by a double-headed arrow labeled Days Between Dates, with quick-select buttons for 30 Days, 60 Days, and 90 Days From Today.",
                description:
                  "Flat-design infographic of the LizoCalc Date Calculator interface — illustrating how to find days between two dates using a start and end calendar picker, with quick buttons for the most searched periods: 30, 60, and 90 days from today.",
                width: 1390,
                height: 783,
                contentUrl:
                  "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp",
                encodingFormat: "image/webp",
              },
            ],
          }),
        }}
      />

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Date Calculator: Days Between Dates, Add Days &amp; Days From Today
          </h1>
        </div>
      </section>

      {/* ─── Calculator Tool ─── */}
      <section className="px-4 py-8">
        <DateCalculatorClient />
      </section>
<section className="max-w-6xl mx-auto px-6 py-16 text-white">
  {/* ── DIRECT ANSWER BOX ── */}
  <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
    <p className="text-white font-semibold text-lg mb-2">
      ⚡ Quick Answer: Days From Today & Date Calculator
    </p>
    <p className="text-gray-200 text-base leading-relaxed">
      To calculate a future or past date, simply add or subtract days from today. 
      For example, <strong>90 days from today</strong>, <strong>60 days from today</strong>, 
      or <strong>30 days from today</strong> are automatically updated in the calculator above 
      based on the current date.
      <br /><br />
      You can also find the <strong>exact number of days between two dates</strong> or calculate 
      a custom result like <em>45 days from a specific date</em> using the date calculator tool. 
      Just enter your start date and the number of days to get an accurate result instantly.
    </p>
  </div>
</section>

      {/* ─── Dynamic "X Days From Today" Widget ─── */}
      <DaysFromTodayWidget />

      {/* ═══════════════════════════════════════
          SEO ARTICLE
      ═══════════════════════════════════════ */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

      
        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-4 text-lg">
          The <strong>Date Calculator</strong> — also called a{" "}
          <strong>date difference calculator</strong>,{" "}
          <strong>days between dates calculator</strong>, or{" "}
          <strong>date to date calculator</strong> — is the most practical
          everyday time tool available. Whether you need to know{" "}
          <strong>how many days until a deadline</strong>, find{" "}
          <strong>90 days from a specific date</strong> for a visa window,
          track <strong>180 days for a tax compliance period</strong>, or
          simply count <strong>how many days since</strong> a past event — this
          tool gives you an instant, exact answer with full Gregorian calendar
          accuracy.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          LizoCalc's date calculator is completely free, requires no sign-up,
          works on any device, and handles leap years, month-end boundaries, and
          all edge cases automatically. It covers every use case: students
          counting days to exams, professionals tracking contract deadlines,
          legal practitioners computing limitation periods, and anyone asking{" "}
          <em>"what is 90 days from 3/23/26?"</em> or{" "}
          <em>"how many days since my last renewal?"</em>
        </p>
    <figure className="my-10">
  <Image
    src="/images/time/date-calculator-days-between-dates.webp"
    alt="Date calculator interface showing Starting Date and Ending Date calendars with a double-headed arrow labeled Days Between Dates, and quick buttons for 30 Days, 60 Days, and 90 Days From Today"
    width={1390}
    height={783}
    className="rounded-2xl border border-gray-700 shadow-xl w-full h-auto"
    loading="eager"
    priority
    sizes="(max-width: 768px) 100vw, 1200px"
  />
  <figcaption className="text-sm text-gray-400 text-center mt-3 italic">
    <strong>Figure 1:</strong> LizoCalc Date Calculator — select a Starting Date and Ending Date to instantly find the exact days between them, or use the quick buttons to calculate 30, 60, or 90 days from today.
  </figcaption>
</figure>
        {/* ══════════════════════════════════════════════
            SECTION 1 — DATE DIFFERENCE / DAYS BETWEEN DATES
        ══════════════════════════════════════════════ */}
        <section className="mt-16">
          {/* TARGET: "date difference calculator", "how many days between two dates", "days between dates" */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Date Difference Calculator — Exact Days Between Any Two Dates
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Enter any start date and end date — the{" "}
            <strong>days between dates calculator</strong> instantly returns the
            exact number of days, a breakdown in years, months and days, total
            weeks, and a weekday count. It works as a complete{" "}
            <strong>date range calculator</strong>,{" "}
            <strong>day difference calculator</strong>, and{" "}
            <strong>duration calculator</strong> in one place.
          </p>

      

          {/* Date diff examples table */}
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">From Date</th>
                  <th className="p-4 text-left font-semibold">To Date</th>
                  <th className="p-4 text-left font-semibold">Total Days</th>
                  <th className="p-4 text-left font-semibold">Weeks</th>
                  <th className="p-4 text-left font-semibold">Y / M / D</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["15 Mar 2000", "24 Apr 2026", "9,537", "1,362.43", "26y 1m 9d"],
                  ["1 Jan 2026", "24 Apr 2026", "113", "16.14", "0y 3m 23d"],
                  ["23 Mar 2026", "24 Apr 2026", "32", "4.57", "0y 1m 1d"],
                  ["1 Apr 2025", "24 Apr 2026", "388", "55.43", "1y 0m 23d"],
                ].map(([from, to, days, weeks, ymd]) => (
                  <tr key={from + to}>
                    <td className="p-4">{from}</td>
                    <td className="p-4">{to}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4">{weeks}</td>
                    <td className="p-4">{ymd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Inclusive vs exclusive */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Inclusive vs Exclusive Day Counting — Which Should You Use?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-2">Exclusive (Default)</h4>
              <p className="text-gray-200 text-sm">March 23 → March 25 = <strong>2 days</strong><br />End day not counted. Used in programming, timestamp math.</p>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-2">Inclusive (Real-world)</h4>
              <p className="text-gray-200 text-sm">March 23 → March 25 = <strong>3 days</strong><br />Both start and end counted. Used in legal notices, rent periods, contracts.</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">
            Toggle inclusive/exclusive mode in the calculator. Most legal and
            real-world deadlines use inclusive counting — both days count.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — 90 / 180 / 60 / 45 / 30 / 28 DAYS FROM DATE
            (Primary keyword cluster from Search Console)
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          {/* TARGET: "90 days from 3/23/26", "what is 90 days from 3/23/26", "180 days from 3/23/26", "45 days from 3/23/26" etc. */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            90, 180, 60, 45, 30 &amp; 28 Days From a Date — Complete Reference Table
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The most searched date queries on this page involve adding a fixed
            number of days to a specific start date. All results below are
            calculated using exact Gregorian calendar logic — not estimates.
            For <strong>90 days from today</strong> or any other date,
            use the dynamic widget above or the table here as a quick reference.
          </p>

          {/* ── Primary keyword magnet table — covers ~80% of search console queries ── */}
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Query</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">Days</th>
                  <th className="p-4 text-left font-semibold">Result Date</th>
                  <th className="p-4 text-left font-semibold">Day of Week</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  // March 23 cluster (top volume)
                  ["90 days from 3/23/26", "Mar 23, 2026", "90", "Jun 21, 2026", "Sunday"],
                  ["180 days from 3/23/26", "Mar 23, 2026", "180", "Sep 19, 2026", "Saturday"],
                  ["60 days from 3/23/26", "Mar 23, 2026", "60", "May 22, 2026", "Friday"],
                  
                  ["56 days from 3/20/26", "Mar 20, 2026", "56", "May 15, 2026", "Friday"],
                  // March 31 cluster
                  ["90 days from 3/31/26", "Mar 31, 2026", "90", "Jun 29, 2026", "Monday"],
                  ["60 days from 3/31/26", "Mar 31, 2026", "60", "May 30, 2026", "Saturday"],
                  ["45 days from 3/31/26", "Mar 31, 2026", "45", "May 15, 2026", "Friday"],
                  // April 20 cluster
                  ["90 days from 4/20/26", "Apr 20, 2026", "90", "Jul 19, 2026", "Sunday"],
                  // May 7 cluster
                  ["90 days from 5/7/26", "May 7, 2026", "90", "Aug 5, 2026", "Wednesday"],
                  ["180 days from 5/7/26", "May 7, 2026", "180", "Nov 3, 2026", "Tuesday"],
                  ["45 days before 5/7/26", "May 7, 2026", "−45", "Mar 23, 2026", "Monday"],
                  // May 22 cluster
                  ["90 days from 5/22/26", "May 22, 2026", "90", "Aug 20, 2026", "Thursday"],
                  ["60 days before 5/22/26", "May 22, 2026", "−60", "Mar 23, 2026", "Monday"],
                  // April 30 cluster
                  ["180 days from 4/30/2026", "Apr 30, 2026", "180", "Oct 27, 2026", "Tuesday"],
                  ["60 days prior to 4/30/26", "Apr 30, 2026", "−60", "Mar 1, 2026", "Sunday"],
                  // April 13 cluster
                  ["180 days from 04/13/2026", "Apr 13, 2026", "180", "Oct 10, 2026", "Saturday"],
                  // April 1, 2025
                  ["90 days from 4/1/2025", "Apr 1, 2025", "90", "Jun 30, 2025", "Monday"],
                  ["45 days from 4/1/25", "Apr 1, 2025", "45", "May 16, 2025", "Friday"],
                  // June 30, 2025
                  ["90 days from 6/30/2025", "Jun 30, 2025", "90", "Sep 28, 2025", "Sunday"],
                  // Jan 1, 2026
                
                  ["90 days before 5/30/26", "May 30, 2026", "−90", "Mar 1, 2026", "Sunday"],
                  ["90 days before 6/29/26", "Jun 29, 2026", "−90", "Mar 31, 2026", "Tuesday"],
                ].map(([query, start, days, result, dow]) => (
                  <tr key={query}>
                    <td className="p-4 font-semibold text-yellow-300 text-xs">{query}</td>
                    <td className="p-4 text-gray-300">{start}</td>
                    <td className="p-4 text-gray-400">{days}</td>
                    <td className="p-4 font-bold text-green-400">{result}</td>
                    <td className="p-4 text-gray-400">{dow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Individual keyword answer blocks — AEO / AI Overview targets */}
          <div className="space-y-5">

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — DAYS SINCE CALCULATOR
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          {/* TARGET: "how many days since", "days since calculator", "day since 30/10/56", "days since date" */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Since Calculator — Count Days From Any Past Date to Today
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Use the <strong>how many days since calculator</strong> by setting
            your start date to any past event and the end date to today. The
            tool instantly returns <strong>days since</strong> that moment —
            useful as a <strong>day counter from date</strong>, a{" "}
            <strong>time since date</strong> tracker, or a{" "}
            <strong>datecounter</strong> for anniversaries, subscriptions, and
            personal milestones.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Past Event</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">Days Since (as of Apr 24, 2026)</th>
                  <th className="p-4 text-left font-semibold">Weeks</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["New Year 2026", "Jan 1, 2026", "113", "16.14"],
                  ["Pakistan Day", "Mar 23, 2026", "32", "4.57"],
                  ["Eid-ul-Fitr 2025", "Apr 1, 2025", "388", "55.43"],
                  ["Independence Day 2025", "Aug 14, 2025", "253", "36.14"],
                  ["New Year 2025", "Jan 1, 2025", "478", "68.29"],
                ].map(([event, start, days, weeks]) => (
                  <tr key={event}>
                    <td className="p-4">{event}</td>
                    <td className="p-4">{start}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4 text-gray-400">{weeks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4 — MATH & FORMULA
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          {/* TARGET: "how does date calculator work", "date difference formula", "how many days between dates formula" */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How the Date Calculator Works — Formula &amp; Calendar Logic
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Days Between Two Dates — The Formula
          </h3>
          <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            totalMs = date2.getTime() − date1.getTime()<br />
            totalDays = Math.floor(totalMs / (1000 × 60 × 60 × 24))
          </div>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Converting Days to Weeks, Months, Years
          </h3>
          <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm mb-8 overflow-x-auto">
            Weeks = totalDays ÷ 7<br />
            Weekdays = totalDays − (Saturdays + Sundays)<br />
            Approx years = totalDays ÷ 365.2425<br />
            Avg months ≈ totalDays ÷ 30.4375
          </div>

          {/* Leap year table */}
          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Automated Leap Year Handling
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Year</th>
                  <th className="p-4 text-left font-semibold">Leap?</th>
                  <th className="p-4 text-left font-semibold">Rule</th>
                  <th className="p-4 text-left font-semibold">Impact on Calculation</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["2024", "✅ Yes", "÷ 4", "Extra day counted in ranges crossing Feb 29"],
                  ["2025", "❌ No", "—", "Standard 365-day year"],
                  ["2026", "❌ No", "—", "Standard 365-day year"],
                  ["2028", "✅ Yes", "÷ 4", "Extra day counted"],
                  ["1900", "❌ No", "÷100 not ÷400", "Common calculator error source"],
                  ["2000", "✅ Yes", "÷ 400", "Correctly counted as leap year"],
                ].map(([y, l, r, i]) => (
                  <tr key={y}>
                    <td className="p-4 font-bold">{y}</td>
                    <td className="p-4">{l}</td>
                    <td className="p-4 text-gray-400">{r}</td>
                    <td className="p-4 text-gray-300">{i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Varying Month Lengths When Adding Days
          </h3>
          <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm mb-4">
            Jan 31 + 1 month = Feb 28 (or Feb 29 in leap year — NOT March 2)<br />
            Apr 30 + 1 month = May 30 (NOT May 31)
          </div>
          <p className="text-gray-400 text-sm">
            Our calculator uses proper calendar-aware month addition, not simple
            "add 30 days" logic — so results are always correct regardless of
            which months are involved.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5 — WHY 90-DAY PERIODS MATTER
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          {/* TARGET: "why 90 days matters", "90 day period uses", "180 day compliance" */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why 90, 180, 60 &amp; 30-Day Periods Matter — Real-World Uses
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "🛂",
                title: "90-Day Visa Windows",
                body: "Most tourist and on-arrival visas allow a 90-day maximum stay. Overstaying even one day triggers fines or bans. Use the calculator to track your exact exit deadline from any entry date."
              },
              {
                icon: "📋",
                title: "180-Day Compliance Periods",
                body: "SECP filings, FBR tax compliance, and corporate annual report deadlines often operate on 180-day windows from a trigger event or fiscal year end."
              },
              {
                icon: "🏥",
                title: "60-Day Medical Follow-ups",
                body: "Prescription renewals, post-surgery check-ups, and chronic disease management protocols commonly use 30, 60, or 90-day follow-up windows."
              },
              {
                icon: "⚖️",
                title: "Legal Limitation Periods",
                body: "Civil limitation periods (3 years for many contract claims in Pakistan), notice periods, and appeal deadlines require precise day counting — courts do not accept approximate estimates."
              },
              {
                icon: "💼",
                title: "Employee Probation Tracking",
                body: "Standard probation periods of 60, 90, or 180 days determine when a new hire becomes eligible for permanent status, benefits, or statutory protections."
              },
              {
                icon: "💳",
                title: "Bank & Finance Deadlines",
                body: "Cheque validity (6 months / 180 days), credit card billing cycles (28–30 days), loan EMI schedules, and bank guarantee expiry dates all require exact date arithmetic."
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700">
                <h3 className="text-base font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>{icon}</span> {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Use-case lookup table */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Use Case</th>
                  <th className="p-4 text-left font-semibold">Calculator Mode</th>
                  <th className="p-4 text-left font-semibold">Typical Period</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["Visa stay validity", "90 days from entry date", "90 days"],
                  ["SECP regulatory filing", "180 days from event date", "180 days"],
                  ["Bank guarantee expiry", "60 days from issuance", "60 days"],
                  ["Probation completion", "Days from joining date", "90–180 days"],
                  ["Court limitation period", "Years/months from event", "3 years"],
                  ["Cheque validity", "Days between dates", "180 days"],
                  ["Pregnancy (due date)", "Weeks from LMP", "40 weeks"],
                  ["Project milestone", "Days from start date", "30/45/60/90 days"],
                ].map(([use, mode, period]) => (
                  <tr key={use}>
                    <td className="p-4">{use}</td>
                    <td className="p-4 text-blue-300">{mode}</td>
                    <td className="p-4 text-green-400 font-semibold">{period}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6 — MONTHS & WEEKS CALCULATOR
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          {/* TARGET: "month to date calculator", "weeks from date", "months between dates", "calculate weeks from date" */}
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Months &amp; Weeks Between Dates — Complete Conversion Table
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            For those who think in weekly or monthly cycles — project managers,
            teachers, coaches, medical professionals — here is a quick
            conversion reference for the most common durations:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Duration</th>
                  <th className="p-4 text-left font-semibold">Total Days</th>
                  <th className="p-4 text-left font-semibold">Full Weeks</th>
                  <th className="p-4 text-left font-semibold">Weekdays</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["28 days (4 weeks)", "28", "4", "~20"],
                  ["30 days (1 month)", "30", "4.29", "~22"],
                  ["45 days", "45", "6.43", "~32"],
                  ["60 days (2 months)", "60", "8.57", "~43"],
                  ["90 days (3 months)", "90", "12.86", "~65"],
                  ["180 days (6 months)", "180", "25.71", "~130"],
                  ["365 days (1 year)", "365", "52.14", "~261"],
                ].map(([d, td, fw, wd]) => (
                  <tr key={d}>
                    <td className="p-4 font-semibold text-blue-300">{d}</td>
                    <td className="p-4">{td}</td>
                    <td className="p-4">{fw}</td>
                    <td className="p-4 text-green-400">{wd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 7 — INTERNAL LINKS
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
            More Free Time &amp; Date Tools
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link href="/calculators/time/age-calculator" className="text-blue-400 hover:underline">
                Age Calculator
              </Link>{" "}
              — exact age in years, months, days + total days lived &amp; birthday countdown
            </li>
            <li>
              <Link href="/calculators/time/hours-calculator" className="text-blue-400 hover:underline">
                Hours Calculator
              </Link>{" "}
              — time duration between two clock times, decimal hours for payroll
            </li>
            <li>
              <Link href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
                Time Calculator
              </Link>{" "}
              — hours ↔ minutes ↔ seconds unit conversions
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
            Never miscalculate a deadline again. Whether it's visa windows, exam
            countdowns, legal notice periods, or project milestones — LizoCalc
            Date Calculator gives you perfect accuracy every time.
          </p>
        </section>

        {/* ── E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp;
              Control Engineering Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
            <span>📅 Published: Apr 4, 2026</span>
            <span>🔄 Updated: May 01 , 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>

      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}