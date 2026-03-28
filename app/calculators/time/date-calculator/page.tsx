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
  title: "Date Calculator | Days Between Dates & Add/Subtract Time",
  description:"Calculate the exact duration between two dates or add/subtract years, months, and days to find a future date. Free, precise tool with leap year support.",
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
    canonical: "https://lizocalc.com/calculators/time/date-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Date Calculator | LizoCalc",
    description:
      "Calculate the exact number of days between dates or perform date arithmetic with our free, professional tool.",
    url: "https://lizocalc.com/calculators/time/date-calculator",
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
                "@id": "https://lizocalc.com/calculators/time/date-calculator#breadcrumb",
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
                    name: "Time ",
                    item: "https://lizocalc.com/calculators/time",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Date Calculator",
                    item: "https://lizocalc.com/calculators/time/date-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/time/date-calculator",
                url: "https://lizocalc.com/calculators/time/date-calculator",
                name: "Date Calculator",
                description: "Use our free date calculator to find the exact number of days between two dates or add/subtract time from a specific date easily.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id": "https://lizocalc.com/calculators/time/date-calculator#app",
                name: "Date Calculator",
                url: "https://lizocalc.com/calculators/time/date-calculator",
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
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Date Calculator</strong> (also called Date Difference Calculator or Days Between Dates tool) is one of the most practical everyday utilities — whether you're a student calculating how many days are left until board exams, a government employee determining exact service duration for pension papers, a business owner counting days for project deadlines, or someone simply planning a family wedding or Umrah trip. Knowing the precise number of days, weeks, months or years between two dates eliminates guesswork and prevents costly mistakes.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required <strong>LizoCalc Date Calculator</strong> instantly shows:
          <br />• Total days between any two dates
          <br />• Breakdown in years + months + days
          <br />• Weeks & weekdays count
          <br />• Add/subtract days, weeks, months or years from any date
          <br />• Beautiful mobile-friendly interface with calendar pickers
          <br />The tool is fully offline-capable after first load, remembers recent dates (with consent), handles leap years perfectly, uses Gregorian calendar logic, and contains zero ads. Ideal for students in Punjab, professionals, lawyers, accountants, event planners and everyday users. Try it now on our{" "}
          <Link 
            href="/calculators/time/date-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Date Calculator page
          </Link >.
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calculate Date Difference in Days, Weeks, and Months
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Measuring Total Days Between Two Specific Dates
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Enter any start date and end date — the calculator instantly returns the exact number of days that separate them.
              </p>
              <p className="text-gray-300 italic text-base">
                Example (as of today March 23, 2026):<br />
                From your birth 15 March 2000 → today = <strong>9,579 days</strong>
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Breaking Down Time: Years, Months, and Weeks Remaining
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Most people want more than just total days. Our tool also shows a human-readable breakdown:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mb-6">
            <li>Full years completed</li>
            <li>Remaining months</li>
            <li>Remaining days</li>
            <li>Total weeks (with decimal)</li>
            <li>Exact weekdays count (Monday–Friday)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The "+1 Day" Rule: Including the End Date in Your Calculation
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            There are two common ways people count days:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Exclusive (most common in programming)</h4>
              <p className="text-gray-200 text-base">
                23 March – 25 March = <strong>2 days</strong><br />
                (does not include the end day)
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">Inclusive (most common in real life)</h4>
              <p className="text-gray-200 text-base">
                23 March – 25 March = <strong>3 days</strong><br />
                (includes both start and end day)
              </p>
            </div>
          </div>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Why adding the end day is essential for project deadlines
          </h4>
          <p className="text-gray-200 text-base leading-relaxed">
            When a project must be delivered "within 30 days" or rent is due "after 15 days notice", almost everyone in Pakistan (and most legal systems) uses <strong>inclusive counting</strong>. Our calculator defaults to inclusive counting for practical real-world use — but you can toggle exclusive mode if needed.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Advanced Date Arithmetic: Add or Subtract Time
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How to Add Years, Months, or Weeks to a Specific Date
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Need to know what date it will be 3 years and 4 months from today? Or 180 days from your joining date?
          </p>
          <p className="text-gray-200 text-base">
            Just enter base date → choose <strong>Add</strong> → enter number of years/months/weeks/days → calculate.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Subtracting Time: Calculating Past Dates for Records
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Very useful for:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>When was 90 days before today? (important for refund windows, medical history)</li>
            <li>What date was exactly 2 years ago? (anniversary reminders)</li>
            <li>When does a 3-year warranty expire?</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Finding a Date 90 Days From Now: Practical Examples
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Today: 23 March 2026<br />
            +90 days → 21 June 2026
          </div>

          <h4 className="text-xl font-bold text-blue-300 mt-5 mb-2">
            Calculating the result using ISO-8601 standardized logic
          </h4>
          <p className="text-gray-200 text-base">
            Our tool follows proper calendar math — not just adding 90×24 hours. It correctly handles month boundaries and leap days so 31 Jan + 1 month = 28/29 Feb (not 2 March).
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Features and Accuracy of the LizoCalc Date Tool
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            100% Verified Gregorian Calendar Accuracy
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Full Gregorian rules including century leap year exceptions (1900 not leap, 2000 is leap).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Automated Leap Year Handling for Precision Results
          </h3>
          <div className="overflow-x-auto mt-6 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Year</th>
                  <th className="p-4 text-left font-semibold">Leap?</th>
                  <th className="p-4 text-left font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">2024</td><td className="p-4 text-green-400">Yes</td><td className="p-4">÷4</td></tr>
                <tr><td className="p-4">2025</td><td className="p-4 text-red-400">No</td><td className="p-4">—</td></tr>
                <tr><td className="p-4">2028</td><td className="p-4 text-green-400">Yes</td><td className="p-4">÷4</td></tr>
                <tr><td className="p-4">1900</td><td className="p-4 text-red-400">No</td><td className="p-4">÷100 but not ÷400</td></tr>
                <tr><td className="p-4">2000</td><td className="p-4 text-green-400">Yes</td><td className="p-4">÷400</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Clean Interface with Instant Mode-Switcher for Better UX
          </h3>
          <p className="text-gray-200 text-base">
            One-click switch between "Difference Between Dates" and "Add/Subtract Days" modes — no page reload.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Mobile-Friendly Date Pickers for Quick Entry
          </h3>
          <p className="text-gray-200 text-base">
            Native calendar popups on mobile + dropdowns for month/day/year — works perfectly on low-end Android phones .
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding the Math: How Date Calculation Works
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Formula for Calendar Duration: (Date 2 − Date 1)
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            totalMilliseconds = date2.getTime() − date1.getTime()<br />
            totalDays = Math.floor(totalMilliseconds / (1000 × 60 × 60 × 24))
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Converting Milliseconds to Days, Weeks, and Years
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Simple conversions we display:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Weeks = totalDays / 7</li>
            <li>Weekdays = totalDays − weekends</li>
            <li>Approximate years = totalDays / 365.2425</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Handling Varying Month Lengths in Date Shifts
          </h3>
          <p className="text-gray-200 text-base">
            When adding months we use proper calendar logic:<br />
            31 Jan + 1 month = 28 Feb (or 29 in leap year)<br />
            30 Apr + 1 month = 30 May (not 31 May)
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real-World Uses for a Professional Date Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Project Management: Setting Deadlines and Milestones
          </h3>
          <p className="text-gray-200 text-base">
            "Project must be completed within 45 working days" → calculate exact end date excluding weekends.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Legal and Financial: Calculating Interest Periods or Filing Dates
          </h3>
          <p className="text-gray-200 text-base">
            • Limitation period (3 years for many civil cases in Pakistan)<br />
            • Income tax return filing deadlines<br />
            • Bank loan EMI start/end dates<br />
            • Cheque validity (6 months)
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Personal Milestones: Tracking Travel, Anniversaries, and Events
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Days until next visa renewal</li>
            <li>Wedding anniversary countdown</li>
            <li>How long since moving to a new city</li>
            <li>Days until child's first birthday party</li>
            <li>Planning 10-day family trip to northern areas</li>
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Date Calculation Examples (March 2026)
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
                <tr><td className="p-4">Age today (born 2000)</td><td className="p-4">15 Mar 2000</td><td className="p-4">23 Mar 2026</td><td className="p-4 font-bold text-green-400">9,579 days</td></tr>
                <tr><td className="p-4">90 days from today</td><td className="p-4">23 Mar 2026</td><td className="p-4">+90 days</td><td className="p-4 font-bold text-green-400">21 Jun 2026</td></tr>
                <tr><td className="p-4">1 year 6 months ago</td><td className="p-4">23 Mar 2026</td><td className="p-4">−1y 6m</td><td className="p-4 font-bold text-green-400">23 Sep 2024</td></tr>
                <tr><td className="p-4">Days between Eid-ul-Fitr</td><td className="p-4">1 Apr 2025</td><td className="p-4">20 Mar 2026</td><td className="p-4 font-bold text-green-400">353 days</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Time & Date Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine with these other free LizoCalc tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link  href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
                Time Calculator
              </Link > — hours ↔ minutes ↔ seconds conversions
            </li>
            <li>
              <Link  href="/calculators/age-calculator" className="text-blue-400 hover:underline">
                Age Calculator
              </Link > — exact age + life stats
            </li>
           
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Never miscount days again. Whether it's exams in Sahiwal, legal notices, project deadlines or family events — LizoCalc Date Calculator gives you perfect accuracy every time. Bookmark it today!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}