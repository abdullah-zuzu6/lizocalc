import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import MonthsFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "How do I find the date a certain number of months from today?",
    answer:
      "Type the number of months, choose Add or Subtract, leave the date on today (it's filled in automatically), and hit Calculate. The result is worked out by moving forward or backward that many calendar months, keeping the same day of the month whenever that day exists in the new month.",
  },
  {
    question: "Can I calculate months from a date other than today?",
    answer:
      "Yes. Change the date field to any date you like, past or future, and the calculator will add or subtract your chosen number of months from that date instead of today.",
  },
  {
    question: "What happens if the day doesn't exist in the resulting month?",
    answer:
      "It gets pulled back to the last day of that month. For example, January 31 plus one month lands on February 28 (or the 29th in a leap year), not March 3, the same way spreadsheet formulas like Excel's EDATE handle it. The calculator flags this with a note whenever it happens.",
  },
  {
    question: "How many days is 6 months, or 12 months?",
    answer:
      "It depends on which months are involved, since months aren't a fixed length. 12 months is always exactly one year, either 365 or 366 days, but 6 months can be anywhere from about 181 to 184 days depending on which six months you're counting. This calculator shows the exact day count for whichever dates you enter.",
  },
  {
    question: "Is adding months the same as adding 30-day blocks?",
    answer:
      "No, and that's a common mix-up. Adding 1 month to January 15 gives February 15, a 31-day jump, not a fixed 30-day jump. This calculator works in true calendar months, not fixed day counts, which is what most deadlines, subscriptions, and contracts actually mean by \"months.\"",
  },
  {
    question: "Can I share my result with someone else?",
    answer:
      "Yes, once you calculate a result, use Copy Link under Share This Result. That link carries your number of months, direction, and date, so anyone who opens it sees the exact same result immediately.",
  },
];

export const metadata: Metadata = {
  title: "Months From Today Calculator – Add or Subtract Months",

  description:
    "Free months from today calculator. Find out what the date will be a set number of months from today, or from any date, with exact day-count conversion.",

  keywords: [
    "months from today calculator",
    "months from today",
    "what date is 6 months from today",
    "add months to date calculator",
    "subtract months from date",
    "date calculator months from now",
    "months ago calculator",
    "future date calculator months",
    "3 months from today",
    "12 months from today",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/months-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Months From Today Calculator | LizoCalc",
    description:
      "Find the date a set number of months from today, or from any date you choose. Free tool with EDATE-style month rollover handling and shareable results.",
    url: "https://www.lizocalc.com/calculators/time/months-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Months From Today Calculator | LizoCalc",
    description:
      "Free months from today calculator. Add or subtract months from any date and get the exact result date.",
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
      "@id": "https://www.lizocalc.com/calculators/time/months-from-today-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Months From Today Calculator", item: "https://www.lizocalc.com/calculators/time/months-from-today-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/months-from-today-calculator",
      url: "https://www.lizocalc.com/calculators/time/months-from-today-calculator",
      name: "Months From Today Calculator | LizoCalc",
      description: "Free months from today calculator. Find the date a set number of months from today or from any date, with exact day-count conversion.",
      inLanguage: "en",
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/months-from-today-calculator#breadcrumb" },
    },
  ],
};

const tocItems = [
  { id: "what-is-months-from-today", label: "What is a Months From Today Calculator" },
  { id: "how-it-works", label: "How it Works" },
  { id: "example-calculations", label: "Example Calculations" },
  { id: "quick-reference-table", label: "Quick Reference Table" },
  { id: "months-vs-days", label: "Months vs Days: Why They Differ" },
];

// ─────────────────────────────────────────────
//  AUTOMATED DATE HELPERS
//  These compute real, current dates every time the
//  page renders, instead of hardcoded example dates.
// ─────────────────────────────────────────────
function lastDayOfMonth(year: number, monthIndex: number) {
  // monthIndex is 0-based; day 0 of the next month = last day of this month
  return new Date(year, monthIndex + 1, 0).getDate();
}

// EDATE-style month math: keeps the same day of month, clamping to the
// last valid day when the target month is shorter (e.g. Jan 31 + 1 -> Feb 28).
function addMonths(base: Date, months: number) {
  const day = base.getDate();
  const targetMonthIndex = base.getMonth() + months;
  const target = new Date(base.getFullYear(), targetMonthIndex, 1);
  const clampedDay = Math.min(day, lastDayOfMonth(target.getFullYear(), target.getMonth()));
  target.setDate(clampedDay);
  return { date: target, clamped: clampedDay !== day };
}

function addDays(base: Date, days: number) {
  const result = new Date(base);
  result.setDate(result.getDate() + days);
  return result;
}

function formatLong(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function dayCountBetween(a: Date, b: Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((b.getTime() - a.getTime()) / msPerDay);
}

// Anchor every calculation to the current date at render time so the
// page always reflects "today," not a fixed example date.
const today = new Date();
const todayLabel = formatLong(today);

const forwardMonths = [1, 3, 6, 9, 12];
const forwardRows = forwardMonths.map((months) => {
  const { date } = addMonths(today, months);
  return { label: `${months} month${months === 1 ? "" : "s"} from today`, date: formatLong(date) };
});

const backwardMonths = [1, 3];
const backwardRows = backwardMonths.map((months) => {
  const { date } = addMonths(today, -months);
  return { label: `${months} month${months === 1 ? "" : "s"} before today`, date: formatLong(date) };
});

const quickReferenceMonths = [1, 2, 3, 6, 9, 12, 18, 24];
const quickReferenceRows = quickReferenceMonths.map((months) => {
  const { date, clamped } = addMonths(today, months);
  return { label: `${months} month${months === 1 ? "" : "s"}`, date: formatLong(date), clamped };
});

// Live "3 months vs 90 days" comparison for the months-vs-days table.
const threeMonthsOut = addMonths(today, 3).date;
const ninetyDaysOut = addDays(today, 90);
const dayGap = dayCountBetween(ninetyDaysOut, threeMonthsOut);

export default function MonthsFromTodayPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-months-from-today-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Months From Today Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find out what the date will be a set number of months from today, or from any date you choose.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <MonthsFromTodayCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>months from today calculator</strong> works out a future
          or past date by adding or subtracting a set number of calendar
          months from a starting point. Type how many months and pick a
          direction, and you&apos;ll get the exact result date, along with
          how many days that actually works out to.
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

        {/* What is a months from today calculator */}
        <section id="what-is-months-from-today" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is a Months From Today Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This tool tells you what date it&apos;ll be a certain number of
            months from now. Enter a number of months, and it adds (or
            subtracts) that from today&apos;s date to give you the exact
            result.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It sounds like it should work the same way as a{" "}
            <Link
              href="/calculators/time/days-from-today-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days from today calculator
            </Link>
            , just with a bigger unit. It doesn&apos;t. Months aren&apos;t a
            fixed length, so adding months to a date involves a different
            kind of math than adding days, and that difference trips
            people up more than you&apos;d expect.
          </p>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How it Works
          </h2>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Today&apos;s date is set automatically.</li>
              <li>Enter a number of months, and choose to add or subtract.</li>
              <li>
                The calculator moves the date forward or backward by that
                many calendar months, keeping the same day of the month
                where possible.
              </li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            &quot;Keeping the same day where possible&quot; is the part
            that needs explaining. If today is January 15 and you add 1
            month, you land on February 15, simple enough. But if today is
            January 31 and you add 1 month, there is no February 31. The
            calculator has to decide what to do, and, like most tools,
            defaults to the last valid day of the target month, which
            means January 31 plus 1 month lands on February 28 (or
            February 29 in a leap year), not March 3 or any other
            workaround.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            This matters because it&apos;s the single biggest source of
            confusion with month-based date math, and it&apos;s worth
            understanding before you rely on the result for something like
            a loan due date or a lease renewal.
          </p>
        </section>

        {/* Example calculations (automated) */}
        <section id="example-calculations" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example Calculations
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Today is <strong>{todayLabel}</strong>. Here&apos;s what a
            handful of common month counts land on, calculated live from
            today&apos;s date:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {forwardRows.map((row) => (
              <div
                key={row.label}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-3">
                  {row.label}
                </h3>
                <p className="text-green-300 font-mono text-center text-lg">
                  {row.date}
                </p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {backwardRows.map((row) => (
              <div
                key={row.label}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-3">
                  {row.label}
                </h3>
                <p className="text-green-300 font-mono text-center text-lg">
                  {row.date}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick reference table (automated) */}
        <section id="quick-reference-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference Table
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            This table updates automatically to today&apos;s date (
            <strong>{todayLabel}</strong>), so the results below are always
            current, not a fixed example. Rows marked with an asterisk were
            clamped to the last day of the target month.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Months from today
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {quickReferenceRows.map((row, index) => (
                  <tr
                    key={row.label}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">
                      {row.label}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.date}
                      {row.clamped && <span className="text-blue-300"> *</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Months vs days */}
        <section id="months-vs-days" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Months vs Days: Why They Give Different Answers
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A month can be 28, 29, 30, or 31 days, so &quot;3 months from
            now&quot; isn&apos;t the same as &quot;90 days from now,&quot;
            even though people often use them interchangeably. The gap can
            be a few days either way depending on exactly which months are
            involved.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-6">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Metric
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Months from today
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Days from today
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Unit length", months: "Variable (28-31 days)", days: "Fixed (always 24 hours)" },
                  {
                    metric: `"3 months" from ${today.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
                    months: formatLong(threeMonthsOut),
                    days: `90 days lands on ${formatLong(ninetyDaysOut)}`,
                  },
                  {
                    metric: "Best for",
                    months: "Billing cycles, leases, medical follow-ups described in months",
                    days: "Deadlines, return windows, contracts described in exact days",
                  },
                  {
                    metric: "Handles month-end dates",
                    months: "Rounds to the last valid day when needed",
                    days: "Not applicable, every day is counted individually",
                  },
                ].map((row, index) => (
                  <tr
                    key={row.metric}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">
                      {row.metric}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.months}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Right now, the gap between &quot;3 months from today&quot; and
            &quot;90 days from today&quot; works out to{" "}
            <strong>{Math.abs(dayGap)} day{Math.abs(dayGap) === 1 ? "" : "s"}</strong>
            . This is exactly why a lease that says &quot;3-month notice
            period&quot; and one that says &quot;90-day notice
            period&quot; can have slightly different deadlines even though
            they sound interchangeable. Need exact calendar days instead?
            Try the{" "}
            <Link
              href="/calculators/time/days-from-today-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days from today calculator
            </Link>
            .
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Business Days Calculator", href: "/calculators/time/business-days-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Day Of Week Calculator", href: "/calculators/time/day-of-week-calculator" },

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