import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "How do I find the date a certain number of days from today?",
    answer:
      "Type the number of days, choose Add or Subtract, leave the date field on today (it's filled in automatically), and hit Calculate. The result date is worked out by adding or subtracting that many calendar days, accounting for different month lengths and leap years automatically.",
  },
  {
    question: "Can I calculate days from a date other than today?",
    answer:
      "Yes. Change the date field to any date you like, past or future, and the calculator will add or subtract your chosen number of days from that date instead of today.",
  },
  {
    question: "How do I find a date in the past, like 30 days ago?",
    answer:
      "Switch the direction to Subtract, enter 30 in the days field, and calculate. That gives you the date 30 days before whichever date is in the date field.",
  },
  {
    question: "What date formats does this calculator show?",
    answer:
      "The result appears as a full written date with the weekday, plus five copyable formats: month day year, day month year, a short US-style M/D/YY, a short international D/M/YY, and ISO format (YYYY-MM-DD).",
  },
  {
    question: "Does this calculator count weekends and holidays?",
    answer:
      "By default it counts every calendar day, weekends included. If you specifically need working days only, skipping weekends and holidays, use a dedicated business days calculator instead.",
  },
  {
    question: "Can I share my result with someone else?",
    answer:
      "Yes, once you calculate a result, use Copy Link under Share This Result. That link carries your number of days, direction, and date, so anyone who opens it sees the exact same result immediately.",
  },
];

export const metadata: Metadata = {
  title: "Days From Today Calculator – Add or Subtract Days",

  description:
    "Free days from today calculator. Find out what the date will be a set number of days from today, or from any date, in multiple formats including ISO.",

  keywords: [
    "days from today calculator",
    "days from today",
    "what date is 30 days from today",
    "add days to date calculator",
    "subtract days from date",
    "date calculator days from now",
    "days ago calculator",
    "future date calculator",
    "45 days from today",
    "90 days from today",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Days From Today Calculator | LizoCalc",
    description:
      "Find the date a set number of days from today, or from any date you choose. Free tool with multiple date formats and shareable results.",
    url: "https://www.lizocalc.com/calculators/time/days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Days From Today Calculator | LizoCalc",
    description:
      "Free days from today calculator. Add or subtract days from any date and get the result in multiple formats.",
  },
};

// ─────────────────────────────────────────────
//  STRUCTURED DATA
// ─────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#person-abdullah",
      name: "Rana Muhammad Abdullah",
      url: "https://www.linkedin.com/in/abdullahsajjad06/",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/time/days-from-today-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Days From Today Calculator", item: "https://www.lizocalc.com/calculators/time/days-from-today-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/days-from-today-calculator",
      url: "https://www.lizocalc.com/calculators/time/days-from-today-calculator",
      name: "Days From Today Calculator | LizoCalc",
      description:
        "Free days from today calculator. Find the date a set number of days from today or from any date, shown in multiple formats.",
      inLanguage: "en",
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/days-from-today-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
  ],
};

const tocItems = [
  { id: "what-is-days-from-today", label: "What is a Days From Today Calculator" },
  { id: "how-it-works", label: "How it Works" },
  { id: "example-calculations", label: "Example Calculations" },
  { id: "quick-reference-table", label: "Quick Reference Table" },
  { id: "calendar-vs-business-days", label: "Calendar Days vs Business Days" },
];

// ─────────────────────────────────────────────
//  AUTOMATED DATE HELPERS
//  These compute real, current dates every time the
//  page renders, instead of hardcoded example dates.
// ─────────────────────────────────────────────
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

// Force the reference calculations onto the current calendar date at
// render time so the page always reflects "today", not a fixed date.
const today = new Date();

const quickReferenceDays = [7, 14, 21, 30, 45, 60, 90, 120, 180, 365];
const quickReferenceRows = quickReferenceDays.map((days) => ({
  label: `${days} days`,
  date: formatLong(addDays(today, days)),
}));

const exampleDaysForward = [30, 60, 90, 100, 180, 365];
const exampleForwardRows = exampleDaysForward.map((days) => ({
  label: `${days} days from today`,
  date: formatLong(addDays(today, days)),
}));

const exampleDaysBackward = [30, 90];
const exampleBackwardRows = exampleDaysBackward.map((days) => ({
  label: `${days} days before today`,
  date: formatLong(addDays(today, -days)),
}));

const todayLabel = formatLong(today);

export default function DaysFromTodayPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-days-from-today-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Days From Today Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find out what the date will be a set number of days from today, or from any date you choose.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DaysFromTodayCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>days from today calculator</strong> works out a future
          or past date by adding or subtracting a set number of days from a
          starting point. Type in how many days, pick a direction, and
          you&apos;ll get the exact date back in several formats you can
          copy straight into a document, form, or message.
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

        {/* What is a days from today calculator */}
        <section id="what-is-days-from-today" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is a Days From Today Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This tool answers a single question: what date is it going to
            be a certain number of days from now? Enter a number, and the
            calculator adds or subtracts that many days from today&apos;s
            date and gives you the result.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s the reverse of a{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between two dates calculator
            </Link>
            . Instead of &quot;how many days between these two dates,&quot;
            it&apos;s &quot;what date will it be if I count forward or
            backward from today.&quot; Both tools solve the same underlying
            math, just starting from different information.
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
              <li>
                Today&apos;s date is set automatically based on the current
                date, so you don&apos;t need to enter a starting point.
              </li>
              <li>Type the number of days you want to count.</li>
              <li>Choose whether to add or subtract, then calculate.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Some versions let you switch between calendar days and business
            days. Calendar days count every day on the calendar, weekends
            included. Business days skip Saturdays and Sundays, and
            sometimes public holidays too, which changes the result
            significantly for longer ranges. &quot;30 days from today&quot;
            and &quot;30 business days from today&quot; can land more than
            a week and a half apart.
          </p>
        </section>

        {/* Example calculations */}
        <section id="example-calculations" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example Calculations
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Today is <strong>{todayLabel}</strong>. Here&apos;s what a
            handful of common day counts land on, calculated live from
            today&apos;s date:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {exampleForwardRows.map((row) => (
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {exampleBackwardRows.map((row) => (
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

          <p className="text-gray-200 leading-relaxed text-base">
            Notice that 100 days lands almost exactly a month after 90 days
            does, since 10 extra days is close to but not exactly a third
            of a month. Small mental math like &quot;3 months is 90
            days&quot; gets close but isn&apos;t precise, which is exactly
            why a calculator is more reliable than estimating.
          </p>
        </section>

        {/* Quick reference table (automated) */}
        <section id="quick-reference-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference Table
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            This table updates automatically to today&apos;s date (
            <strong>{todayLabel}</strong>), so the results below are always
            current, not a fixed example.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Days from today
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Calendar days vs business days */}
        <section id="calendar-vs-business-days" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calendar Days vs Business Days From Today
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Metric
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Calendar days
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Business days
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: "Counts weekends", calendar: "Yes", business: "No" },
                  { metric: "Counts holidays", calendar: "Yes", business: "Usually excluded" },
                  {
                    metric: "30 days from a Thursday",
                    calendar: "Lands on a date 30 days later regardless of weekday",
                    business: "Lands roughly 6 weeks later since weekends are skipped",
                  },
                  {
                    metric: "Best for",
                    calendar: "Return windows, subscription periods, general deadlines",
                    business: "Contract terms, legal notices, shipping estimates",
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
                      {row.calendar}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.business}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Need working days only, skipping weekends and U.S. federal
            holidays? Try the{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              business days calculator
            </Link>{" "}
            instead. Enter your own number of days above, and once
            calculated, share the result with a single link.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Days From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Months From Today Calculator", href: "/calculators/time/months-from-today-calculator" },
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