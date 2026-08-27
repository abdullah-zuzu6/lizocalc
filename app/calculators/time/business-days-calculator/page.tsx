import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import BusinessDaysCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "What counts as a business day?",
    answer:
      "A business day is any day normal business operations run, typically Monday through Friday, excluding Saturday, Sunday, and public holidays. The exact definition can vary by company, industry, and country, which is why this calculator lets you choose whether to exclude weekends, holidays, both, or neither.",
  },
  {
    question: "How do you calculate business days between two dates?",
    answer:
      "Count the total calendar days between the two dates, then subtract weekends and any public holidays that fall within that range. This calculator walks through every day in the range and applies your chosen exclusions automatically, then shows exactly which days were excluded and why.",
  },
  {
    question: "How is the date after a number of business days calculated?",
    answer:
      "Starting from your chosen date, the calculator steps forward (or backward) one day at a time, skipping weekends and holidays according to your settings, until it has passed the number of business days you asked for. The starting date itself isn't counted, only the days after it.",
  },
  {
    question: "Which public holidays does this calculator use?",
    answer:
      "The 11 U.S. federal holidays: New Year's Day, Martin Luther King Jr. Day, Presidents' Day, Memorial Day, Juneteenth, Independence Day, Labor Day, Indigenous Peoples' Day, Veterans Day, Thanksgiving, and Christmas Day. When a fixed-date holiday falls on a Saturday it's observed the Friday before, and on a Sunday it's observed the Monday after, matching official federal observance rules.",
  },
  {
    question: "Can I calculate business days without excluding holidays?",
    answer:
      "Yes, the Options dropdown lets you exclude weekends and holidays together, holidays only, weekends only, or neither, so the calculator can match whatever definition of \"business day\" your situation actually needs.",
  },
  {
    question: "Can I share my business days result with someone else?",
    answer:
      "Yes, after calculating a result, use Copy Link under Share This Result. That link carries your dates, direction, and exclusion settings, so anyone who opens it sees the exact same result.",
  },
];

export const metadata: Metadata = {
  title: "Business Days Calculator – Working Days Between Dates",

  description:
    "Free business days calculator. Find how many working days there are between two dates, or calculate the date after adding or subtracting business days, excluding weekends and U.S. holidays.",

  keywords: [
    "business days calculator",
    "working days calculator",
    "business days between two dates",
    "add business days to date",
    "subtract business days",
    "workday calculator",
    "how many business days",
    "excluding weekends and holidays calculator",
    "federal holidays calculator",
    "work days between dates",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/business-days-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Business Days Calculator | LizoCalc",
    description:
      "Find how many working days fall between two dates, or the date after adding/subtracting business days. Free tool with weekend and U.S. federal holiday exclusion options.",
    url: "https://www.lizocalc.com/calculators/time/business-days-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Business Days Calculator | LizoCalc",
    description:
      "Free business days calculator. Count working days between dates or add/subtract business days, excluding weekends and holidays.",
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
      "@id": "https://www.lizocalc.com/calculators/time/business-days-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Business Days Calculator", item: "https://www.lizocalc.com/calculators/time/business-days-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/business-days-calculator",
      url: "https://www.lizocalc.com/calculators/time/business-days-calculator",
      name: "Business Days Calculator | LizoCalc",
      description: "Free business days calculator. Find working days between two dates, or the date after adding or subtracting business days, excluding weekends and U.S. holidays.",
      inLanguage: "en",
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/business-days-calculator#breadcrumb" },
    },
  ],
};

const tocItems = [
  { id: "what-is-business-days", label: "What is a Business Days Calculator" },
  { id: "how-its-calculated", label: "How Business Days Are Calculated" },
  { id: "business-days-examples", label: "Business Days Examples" },
  { id: "business-vs-calendar", label: "Business Days vs Calendar Days" },
  { id: "federal-holidays", label: "U.S. Federal Holidays Used" },
  { id: "common-uses", label: "Common Uses for a Business Days Calculator" },
  { id: "business-days-by-country", label: "Business Days by Country" },
];

// 2026 U.S. federal holiday dates, used in the table below.
const federalHolidays2026 = [
  { name: "New Year's Day", date: "Thursday, January 1, 2026" },
  { name: "Martin Luther King Jr. Day", date: "Monday, January 19, 2026" },
  { name: "Presidents' Day", date: "Monday, February 16, 2026" },
  { name: "Memorial Day", date: "Monday, May 25, 2026" },
  { name: "Juneteenth", date: "Friday, June 19, 2026" },
  { name: "Independence Day", date: "Saturday, July 4, 2026 (observed Friday, July 3, 2026)" },
  { name: "Labor Day", date: "Monday, September 7, 2026" },
  { name: "Indigenous Peoples' Day", date: "Monday, October 12, 2026" },
  { name: "Veterans Day", date: "Wednesday, November 11, 2026" },
  { name: "Thanksgiving Day", date: "Thursday, November 26, 2026" },
  { name: "Christmas Day", date: "Friday, December 25, 2026" },
];

// "Business days vs calendar days" comparison table
const businessVsCalendarRows = [
  { metric: "Counts weekends", business: "No", calendar: "Yes" },
  { metric: "Counts holidays", business: "Optional, usually excluded", calendar: "Yes" },
  {
    metric: "Used for",
    business: "Contracts, shipping, payroll, legal deadlines",
    calendar: "General date math, age calculations, event planning",
  },
  { metric: "Typical week length", business: "5 days", calendar: "7 days" },
  { metric: "Example: 2 weeks from a Monday", business: "10 business days later", calendar: "14 calendar days later" },
];

// "Business days by country" table
const businessDaysByCountry = [
  { region: "United States, UK, EU, most of Asia", workWeek: "Monday-Friday", weekend: "Saturday-Sunday" },
  { region: "Saudi Arabia, UAE, Qatar", workWeek: "Sunday-Thursday", weekend: "Friday-Saturday" },
  { region: "Nepal", workWeek: "Sunday-Friday", weekend: "Saturday only" },
];

export default function BusinessDaysPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-business-days-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Business Days Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find how many working days fall between two dates, or the date after adding or subtracting business days.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BusinessDaysCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>business days calculator</strong> counts working days
          instead of plain calendar days. It does not count weekends or
          U.S. public holidays, and if you want to exclude public holidays
          too, you can select that from the dropdown. Use this calculator
          to find how many working days sit between two dates you&apos;ve
          entered, or to find the exact business (working) date after
          adding or subtracting a number of business days, by choosing one
          of the four options in the dropdown.
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

        {/* What is a business days calculator */}
        <section id="what-is-business-days" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is a Business Days Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A business days calculator tells you how many working days sit
            between two dates, or gives you an end date after adding or
            subtracting a set number of business days from a starting date.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator is different from a plain {" "}
            <Link
              href="/calculators/time/date-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
               date calculator
            </Link>
            .
            which counts every calendar day. If you&apos;re scheduling a
            project deadline, calculating payment terms, or planning
            shipping windows, calendar days can give you the wrong number.
            Business days give you the number that actually matters for
            work.
          </p>
        </section>

        {/* How it's calculated */}
        <section id="how-its-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Business Days Are Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The calculator takes a start date and an end date, or a number
            of days to add. It then:
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Counts forward or backward one day at a time.</li>
              <li>Skips Saturdays and Sundays.</li>
              <li>Skips any holidays you&apos;ve added to the exclusion list.</li>
              <li>Returns the resulting date or the total business day count.</li>
            </ol>
          </div>
        </section>

        {/* Examples */}
        <section id="business-days-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Business Days Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 1: Counting business days between two dates
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start date: March 3, 2026 (Tuesday). End date: March 13,
                2026 (Friday). Calendar days between: 10. Weekend days in
                range: 2 (March 7-8).
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                8 business days
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 2: Adding business days to a start date
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start date: August 26, 2026 (Wednesday). Add 10 business
                days. The calculator moves forward day by day, skipping
                August 29-30 and September 5-6 (weekends).
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                September 9, 2026
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 3: With a holiday excluded
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start date: December 22, 2026 (Tuesday). Add 5 business
                days. Holiday: December 25, 2026 (Christmas). Without the
                holiday, 5 business days would land on December 29.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                December 30, 2026
              </p>
            </div>
          </div>
        </section>

        {/* Business days vs calendar days */}
        <section id="business-vs-calendar" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Business Days vs Calendar Days
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Metric
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Business days
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Calendar days
                  </th>
                </tr>
              </thead>
              <tbody>
                {businessVsCalendarRows.map((row, index) => (
                  <tr
                    key={row.metric}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">
                      {row.metric}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.business}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.calendar}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Federal holidays */}
        <section id="federal-holidays" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            U.S. Federal Holidays in 2026
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            When holiday exclusion is turned on, this calculator uses the 11
            holidays defined in U.S. Code Title 5 § 6103: New Year&apos;s
            Day, Martin Luther King Jr. Day, Presidents&apos; Day, Memorial
            Day, Juneteenth, Independence Day, Labor Day, Indigenous
            Peoples&apos; Day, Veterans Day, Thanksgiving, and Christmas
            Day.
          </p>

          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Fixed-date holidays follow the standard federal observance rule:
            if the date falls on a Saturday, it&apos;s observed the Friday
            before, and if it falls on a Sunday, it&apos;s observed the
            Monday after. Company-specific holidays aren&apos;t included
            here, since those vary by employer, but the &quot;exclude
            weekends only&quot; option leaves room to account for those
            separately.
          </p>

          {/* 2026 holiday dates table */}
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Holiday
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Date in 2026
                  </th>
                </tr>
              </thead>
              <tbody>
                {federalHolidays2026.map((holiday, index) => (
                  <tr
                    key={holiday.name}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {holiday.name}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {holiday.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mt-6 text-sm">
            Independence Day falls on a Saturday in 2026, so it&apos;s
            observed on the preceding Friday, July 3. The other ten holidays
            in 2026 already fall on a weekday, so no date shift applies.
          </p>
        </section>

        {/* Common uses */}
        <section id="common-uses" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Uses for a Business Days Calculator
          </h2>

          <div className="space-y-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Shipping and delivery
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Most carriers quote delivery times in business days. 5-7
                business days from a Thursday order means the package could
                arrive anywhere from the following Thursday to the Monday
                after that, not the calendar week you&apos;d assume.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Payment and invoice terms
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Net 30 terms are sometimes written as 30 business days
                rather than 30 calendar days, especially in government and
                enterprise contracts.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Legal and contract deadlines
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Court filings, response periods, and notice requirements are
                frequently defined in business days. Missing a filing
                because you counted weekends as working days can have real
                consequences.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Payroll processing
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                HR teams use business day counts to calculate pay periods,
                especially when a pay date falls near a holiday and needs to
                shift to the nearest working day.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Project scheduling
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Sprint planning and project timelines quoted in
                &quot;working days&quot; need this calculation to convert
                into actual calendar dates for a Gantt chart or deadline.
              </p>
            </div>
          </div>
        </section>

        {/* Business days by country */}
        <section id="business-days-by-country" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Business Days by Country
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Business days assume a Monday-to-Friday work week, but that
            isn&apos;t universal. Some countries use a Sunday-to-Thursday
            week instead:
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Region
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Work week
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Weekend
                  </th>
                </tr>
              </thead>
              <tbody>
                {businessDaysByCountry.map((row, index) => (
                  <tr
                    key={row.region}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.region}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.workWeek}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.weekend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Enter your own dates or business day count above, and once
            calculated, share the result with a single link. Need calendar
            days instead of working days? Try the{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between two dates calculator
            </Link>
            .
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Day From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
              { label: "Day Of Week Calculator", href: "/calculators/time/day-of-week-calculator" },
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Age Calculator", href: "/calculators/time/age-calculator" },
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