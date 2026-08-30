import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import DateCalculatorClient from "./clientside";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";
import AuthorBio from "@/components/AuthorBio";


// ─────────────────────────────────────────────
//  FAQ DATA
// ─────────────────────────────────────────────
const faqData = [
  {
    question: "How do I find the number of days between two dates?",
    answer:
      "Switch to the Difference tab, enter a start date and an end date, then hit Calculate. You'll get the total day count plus a breakdown in years, months, weeks, and days. If the end date is earlier than the start date, the calculator swaps them and tells you it did.",
  },
  {
    question: "What's the difference between inclusive and exclusive counting?",
    answer:
      "Exclusive counting is the default: March 23 to March 25 is 2 days, since only the gap between the dates counts. Inclusive counting adds 1 and counts both endpoints, so the same range becomes 3 days. Rent periods, notice periods, and contracts usually use inclusive counting, so turn on \"Include end date\" for those.",
  },
  {
    question: "How do I add months to a date without it landing on the wrong day?",
    answer:
      "The Add & Subtract tab handles this for you. January 31 plus 1 month lands on February 28 in a normal year, or February 29 in a leap year, never March. The calculator clamps the day to the real length of the target month instead of just tacking on 30 days.",
  },
  {
    question: "Can I add or subtract years, months, weeks, and days at once?",
    answer:
      "Yes. Fill in any combination of the four fields and pick Add or Subtract. Years and months are applied first using the real calendar, then weeks and days are added on top.",
  },
  {
    question: "How does the calculator handle leap years?",
    answer:
      "It follows the standard rule: a year is a leap year if it divides evenly by 4, unless it also divides by 100, in which case it needs to divide by 400 too. So 2024 and 2028 are leap years, 1900 wasn't, and 2000 was. Any range that crosses February 29 counts that day correctly.",
  },
  {
    question: "Why do date formats like 08/09/2026 cause confusion?",
    answer:
      "Because the same string is read differently depending on the country, software, or system. MM/DD/YYYY, DD/MM/YYYY, and YYYY-MM-DD can all produce a different date from the same digits, which is why it's worth checking the expected format before entering dates into a form, spreadsheet, or database.",
  },
  {
    question: "Can I share a calculation with someone else?",
    answer:
      "Yes. After you calculate a result, use Copy Link under Share This Result. The link carries your dates and settings, so whoever opens it sees the exact same inputs and result you did.",
  },
];

// ─────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Date Calculator – Difference or Add & Subtract Time",
  description:
    "Free date calculator. Find the exact difference between two dates, or add or subtract years, months, weeks, and days from any date. Leap-year accurate, no sign-up.",
  keywords: [
    "date calculator",
    "days between dates",
    "date difference calculator",
    "add days to date",
    "subtract days from date",
    "add months to date",
    "date to date calculator",
    "years months days calculator",
    "date format calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/date-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Date Calculator | LizoCalc",
    description:
      "Find the exact difference between two dates, or add or subtract years, months, weeks, and days from any date. Free, instant, and leap-year accurate.",
    url: "https://www.lizocalc.com/calculators/time/date-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Calculator | LizoCalc",
    description:
      "Find the difference between two dates, or add or subtract years, months, weeks, and days from any date.",
  },
};

// ─────────────────────────────────────────────
//  STRUCTURED DATA
// ─────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Date Calculator", item: "https://www.lizocalc.com/calculators/time/date-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
      url: "https://www.lizocalc.com/calculators/time/date-calculator",
      name: "Date Calculator | LizoCalc",
      description: "Free date calculator. Find the difference between two dates, or add or subtract years, months, weeks, and days from any date.",
      inLanguage: "en",
      datePublished: "2026-04-04",
      dateModified: "2026-08-31",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb" },
    },
  ],
};

const tocItems = [
  { id: "how-its-calculated", label: "How Date is Calculated" },
  { id: "date-calculator-examples", label: "Date Calculator Examples" },
  { id: "difference-vs-add-subtract", label: "Camparison Of Date Difference vs Add & Subtract" },
  { id: "date-formats-usecase", label: "Date Formates and usecase" },
  { id: "where-to-use", label: "Where to Use a Date Calculator" },
];

const modeComparisonRows = [
  { metric: "What it answers", difference: "How many days between two dates", addSubtract: "What date you land on after a shift" },
  { metric: "Inputs", difference: "A start date and an end date", addSubtract: "A date, a direction, and years/months/weeks/days" },
  { metric: "Typical output", difference: "Total days, plus years/months/weeks/days", addSubtract: "A single resulting date" },
  { metric: "Used for", difference: "Deadlines, ages, time since an event", addSubtract: "Due dates, renewal dates, expiry dates" },
  { metric: "Example", difference: "Jan 1 to Apr 24 is 113 days", addSubtract: "Jan 31 + 1 month is Feb 28" },
];

const dateFormatRows = [
  { format: "MM/DD/YYYY", example: "08/30/2026", use: "United States, online forms" },
  { format: "DD/MM/YYYY", example: "30/08/2026", use: "Pakistan, UK, India, many other countries" },
  { format: "YYYY-MM-DD", example: "2026-08-30", use: "Databases, programming, international systems" },
  { format: "DD-MM-YYYY", example: "30-08-2026", use: "Forms and documents in many countries" },
  { format: "DD Month YYYY", example: "30 August 2026", use: "Letters, official documents, readable text" },
  { format: "Month DD, YYYY", example: "August 30, 2026", use: "Common in American English" },
];

const leapYearRows = [
  { year: "2024", isLeap: "Yes", why: "Divides evenly by 4" },
  { year: "2025", isLeap: "No", why: "Regular 365-day year" },
  { year: "2026", isLeap: "No", why: "Regular 365-day year" },
  { year: "2028", isLeap: "Yes", why: "Divides evenly by 4" },
  { year: "1900", isLeap: "No", why: "Divides by 100 but not by 400" },
  { year: "2000", isLeap: "Yes", why: "Divides by 400" },
];

// ─────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────
export default function DateCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-date-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Date Calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find the exact difference between two dates, or add or subtract years, months, weeks, and days from any date.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8" aria-label="Date difference and add/subtract calculator">
        <DateCalculatorClient />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>date calculator</strong> does one of two things , it tells you how many
          days between two dates, or it can find what date will be after adding or
          subtracting time from a starting point. Pick Difference for the first
          job and Add &amp; Subtract for the second. Both handle leap years and real
          month lengths automatically, and any result you calculate can be turned
          into a link so someone else sees the same numbers.
        </p>

        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Table Of Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base"
                >
                  <span aria-hidden="true">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

      

        {/* How Date is Calculated */}
        <section id="how-its-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Date is Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In Difference mode, the calculator subtracts the earlier date
            from the later one to get a raw day count, then works out an
            accurate years/months/days breakdown by walking the real
            calendar rather than assuming every month is 30 days.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In Add &amp; Subtract mode, years and months are applied first.
            If that step would land on a day that doesn&apos;t exist in the
            target month, the day gets pulled back to the last real day of
            that month. Weeks and days are then added on top of that
            result.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <p className="text-gray-200 text-sm leading-relaxed">
              Example: April 30 plus 1 month lands on May 30, not May 31,
              because April only has 30 days to begin with. January 31 plus
              1 month lands on February 28, or February 29 in a leap year.
            </p>
          </div>
        </section>

        {/* Examples */}
        <section id="date-calculator-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Date Calculator Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Example 1: Finding a gap</h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start date: January 1. End date: April 24, same year. A
                straightforward difference with no rollover involved.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">113 days</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Example 2: Adding months</h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Starting date: January 31. Add 1 month. February doesn't
                have a 31st, so the result is clamped to the last day of
                February.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">February 28</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">Example 3: Subtracting weeks</h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Starting date: June 15. Subtract 6 weeks to find when a
                6-week countdown began.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">May 4</p>
            </div>
          </div>
        </section>

       
        {/* Comparison Of Date Difference vs Add & Subtract */}
        <section id="difference-vs-add-subtract" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Camparison Of Date Difference vs Add &amp; Subtract
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The two modes answer different questions, so it&apos;s worth knowing
            which one fits before you start entering dates.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Metric</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Difference</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Add &amp; Subtract</th>
                </tr>
              </thead>
              <tbody>
                {modeComparisonRows.map((row, index) => (
                  <tr key={row.metric} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">{row.metric}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.difference}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.addSubtract}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Date Formates and usecase */}
        <section id="date-formats-usecase" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Date Formates and usecase
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Dates look simple but the way they are written can change from
            one country, software, or situation to another. For example,
            08/09/2026 could mean August 9, 2026 in one place and September
            8, 2026 in another.
          </p>

          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            That is why choosing the right date format matters, especially
            when working with forms, spreadsheets, websites, databases,
            travel documents, or international teams.Use{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200 font-semibold"
            >
              Days between two dates calculator
            </Link>{" "}
            to find the time duration between two dates
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Date Format</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Example</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Common Use</th>
                </tr>
              </thead>
              <tbody>
                {dateFormatRows.map((row, index) => (
                  <tr key={row.format} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-bold">{row.format}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-mono">{row.example}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Where to Use a Date Calculator */}
        <section id="where-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where to Use a Date Calculator
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            A date calculator can be useful whenever you need to add or
            subtract days, weeks, or months from a specific date. Instead
            of counting days on a calendar by hand, you can enter the dates
            and get the result in seconds. Here are some common situations
            where a date calculator can help.
          </p>

          <div className="space-y-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                💼 Project Management and Billing
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-base">
                Dates are very important when you are working on projects
                or managing contracts. A small mistake can sometimes lead
                to a missed deadline or late payment.
              </p>
              <p className="text-gray-200 leading-relaxed mb-3 text-base">
                So you can use this calculator for :
              </p>
              <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base">
                <li>Project planning.</li>
                <li>Payment deadlines.</li>
                <li>Contract dates.</li>
              </ol>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                👶 Pregnancy and Medical Tracking
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-base">
                Date calculations can also be useful for tracking important
                medical or pregnancy-related dates fastely. Many healthcare
                professionals use different methods depending on the
                situation, so a calculator should be treated as a planning
                tool rather than a medical diagnosis.You can also{" "}
                <Link
                  href="/calculators/time/days-from-today-calculator"
                  className="text-blue-300 underline underline-offset-2 hover:text-blue-200 font-semibold"
                >
                  use days from today calculator
                </Link>{" "}
                to calculate days from specific date.
              </p>
              <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base">
                <li>Estimated due date.</li>
                <li>Pregnancy milestones.</li>
                <li>Appointments.</li>
              </ol>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                🏛 Legal and Regulatory Deadlines
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-base">
                Legal and government matters often come with strict
                deadlines. A date calculator can make it easier to work out
                a date without manually counting every day.
              </p>
              <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base mb-4">
                <li>Filing deadlines.</li>
                <li>Visa and travel records.</li>
                <li>Record checks.</li>
              </ol>
              <p className="text-gray-200 leading-relaxed text-base">
                Always check the specific rules that apply to your case
                because some legal deadlines exclude weekends, holidays, or
                the starting day.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                ✈️ Personal Plans and Milestones
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4 text-base">
                You don&apos;t need to use a date calculator only for work.
                It can be handy for everyday plans too.
              </p>
              <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base">
                <li>Vacation planning.</li>
                <li>Age calculations.</li>
                <li>Personal goals.</li>
              </ol>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Whether you are planning a project, checking a deadline, or
            simply counting down to an important day, a date calculator can
            save time and reduce the chance of making a simple counting
            mistake.
          </p>
        </section>

      
        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Age Calculator", href: "/calculators/time/age-calculator" },
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Business Days Calculator", href: "/calculators/time/business-days-calculator" },
            ]}
            seeAllHref="/calculators/time"
          />
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}