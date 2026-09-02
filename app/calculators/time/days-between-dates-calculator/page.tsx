import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import DaysBetweenDatesCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "How do you calculate the number of days between two dates?",
    answer:
      "Subtract the earlier date from the later one, that's the calendar-day gap between them. For example, from March 1 to March 10 is 9 days. That count doesn't include either the start date or the end date on its own, so tick the include boxes on this calculator if you want either date counted too.",
  },
  {
    question: "Does the days calculator count the first and last day?",
    answer:
      "Not by default. By default it gives you the gap between the two dates, the same number you'd get subtracting one date from the other. Check \"Include the start date\" to count day one, check \"Include the end date\" to count the last day too, and check both for the full inclusive span.",
  },
  {
    question: "How many weeks is 30, 60, or 90 days?",
    answer:
      "Divide by 7. 30 days is 4 weeks and 2 days, 60 days is 8 weeks and 4 days, and 90 days is 12 weeks and 6 days. This calculator works out the weeks-and-days breakdown automatically once you enter your two dates.",
  },
  {
    question: "How do I calculate days between dates including both start and end date?",
    answer:
      "Tick both checkboxes on the calculator, \"Include the start date\" and \"Include the end date.\" That adds one day for each, which gives you the full inclusive count, the way you'd count if you were marking off every day on a calendar including the first and the last.",
  },
  {
    question: "Why do date calculators sometimes give different totals for the same two dates?",
    answer:
      "Because they're not all counting the same thing. Some tools count only the gap between dates, others include one end or both. That's a one-day, or even two-day, swing depending on the convention. This calculator gives you both options as checkboxes so you can match whichever convention you need.",
  },
  {
    question: "Can I share my days-between-dates result with someone else?",
    answer:
      "Yes, after you calculate a result, hit \"Copy Link\" under Share This Result. That link carries your two dates and checkbox choices, so anyone who opens it sees the exact same result without re-entering anything.",
  },
];

export const metadata: Metadata = {
  title: "Days Between Two Dates Calculator – Date Duration Calculator",

  description:
    "Free online days between two dates calculator. Instantly find the total days, weeks, hours, minutes, and seconds between any two dates, with options to include the start or end date.",

  keywords: [
    "days between two dates calculator",
    "date duration calculator",
    "calculate days between dates",
    "how many days between two dates",
    "date difference calculator",
    "weeks between two dates",
    "days calculator online",
    "date range calculator",
    "inclusive date calculator",
    "number of days between dates",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/days-between-dates-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Days Between Two Dates Calculator | LizoCalc",
    description:
      "Calculate the exact number of days, weeks, hours, minutes and seconds between two dates. Free tool with inclusive-date options and shareable results.",
    url: "https://www.lizocalc.com/calculators/time/days-between-dates-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Days Between Two Dates Calculator | LizoCalc",
    description:
      "Free date duration calculator. Enter two dates, get the exact days, weeks, hours, minutes and seconds between them.",
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
      "@id": "https://www.lizocalc.com/calculators/time/days-between-dates-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Days Between Two Dates Calculator", item: "https://www.lizocalc.com/calculators/time/days-between-dates-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/days-between-dates-calculator",
      url: "https://www.lizocalc.com/calculators/time/days-between-dates-calculator",
      name: "Days Between Two Dates Calculator | LizoCalc",
      description:
        "Free online days between two dates calculator. Get the total days, weeks, hours, minutes and seconds between any two dates, with inclusive start/end date options.",
      inLanguage: "en",
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/days-between-dates-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
  ],
};

const tocItems = [
  { id: "what-is-days-calculator", label: "What is a Days Between Dates Calculator" },
  { id: "how-days-are-counted", label: "How Days Between Two Dates Are Counted" },
  { id: "inclusive-exclusive-dates", label: "Including the Start or End Date" },
  { id: "days-weeks-conversion", label: "Converting Days to Weeks, Hours & Minutes" },
  { id: "days-examples", label: "Days Between Dates Examples" },
  { id: "days-common-ranges", label: "Days Between Common Date Ranges" },
  { id: "days-calculator-uses", label: "What People Use This For" },
];

// "Days between common date ranges" table
const commonDateRanges = [
  { range: "1 week", days: "7" },
  { range: "2 weeks", days: "14" },
  { range: "1 month", days: "28-31" },
  { range: "1 quarter", days: "90-92" },
  { range: "6 months", days: "181-184" },
  { range: "1 year", days: "365 (366 in a leap year)" },
  { range: "5 years", days: "1,826-1,827" },
  { range: "10 years", days: "3,652-3,653" },
];

// "What people use this for" cards
const commonUses = [
  {
    title: "Tracking pregnancy weeks",
    body: "Due dates and weekly milestones are counted in days and weeks from the last menstrual period, and small counting mistakes grow over a 280-day pregnancy.",
  },
  {
    title: "Countdowns to events",
    body: "Weddings, trips, product launches, and exams are all counted down in days. A calculator keeps the number correct as the date gets closer instead of recalculating by hand every few days.",
  },
  {
    title: "Project duration",
    body: "Figuring out how long a project has been running, or how many days are left until a deadline, especially when the project spans months that don't all have the same length.",
  },
  {
    title: "Age in days",
    body: "Some medical dose calculations, legal filings, and even novelty gifts (\"you've been alive for 10,000 days\") use day counts instead of years and months.",
  },
  {
    title: "Return windows",
    body: "A 90-day return policy or a one-year warranty requires an end date, and calculating that by hand across many months is where mistakes happen most.",
  },
  {
    title: "Insurance and visa applications",
    body: "Many forms ask for the number of days between two events, such as days spent outside the country or days since a policy began, and an off-by-one mistake can delay processing.",
  },
];

export default function DaysBetweenDatesPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-days-between-dates-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Days Between Two Dates Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find the exact number of days, weeks, hours, minutes, and seconds between any two dates.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DaysBetweenDatesCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>days between two dates calculator</strong> works out how
          much time sits between a start date and an end date. Pick your two
          dates, decide whether the first or last day should count, and it
          hands you the total in days, weeks, hours, minutes, and seconds.
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

        {/* What is a days between dates calculator */}
        <section id="what-is-days-calculator" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is a Days Between Dates Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            It&apos;s a tool that measures the span between two calendar
            dates, a start date and an end date, and turns it into a total
            you can actually use: how many days until an event, how many
            days a project ran for, how many days old a contract is, or how
            many days are left until a deadline.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            It sounds simple until you actually try to do it by hand.
            February has 28 days most years and 29 every fourth year. Some
            months have 30 days, some have 31. If you&apos;re counting from
            January 15 to April 22, you&apos;d need to add up the remaining
            days in January, all of February, all of March, and the days in
            April up to the 22nd. One mistake in any of those and your total
            is off, a calculator removes that risk entirely.Want to know the {" "}
            <Link
              href="/calculators/time/days-from-today-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days from today ?
            </Link>
            .
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The tricky part isn&apos;t the subtraction, it&apos;s deciding
            whether the first day and the last day themselves get counted.
            Different situations call for different answers, which is why
            this calculator gives you checkboxes for both instead of
            guessing for you.
          </p>
        </section>

        {/* How days are counted */}
        <section id="how-days-are-counted" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Days Between Two Dates Are Counted
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            By default, the calculator gives you the calendar-day gap
            between your two dates, the same number you&apos;d get by
            subtracting the start date from the end date directly.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Enter the start date.</li>
              <li>Enter the end date.</li>
              <li>Choose whether to include either date, then calculate.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: from January 1 to January 10.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            10 − 1 = 9 days
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That 9-day gap doesn&apos;t count January 1 or January 10 as
            days in their own right, it&apos;s purely the distance between
            them. Whether that&apos;s the right number for your situation
            depends on what you&apos;re measuring, which is exactly what the
            include checkboxes are for.
          </p>
        </section>

        {/* Inclusive / exclusive dates */}
        <section id="inclusive-exclusive-dates" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Including the Start or End Date
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Checking <strong>&quot;Include the start date&quot;</strong>{" "}
            counts the first date as day one. Checking{" "}
            <strong>&quot;Include the end date&quot;</strong> counts the
            last date as well. Each box adds exactly one day to the total,
            independently of the other, so you can tick either one or both.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Neither box checked: just the gap between the dates.</li>
              <li>Only start checked: the gap, plus the first day.</li>
              <li>Only end checked: the gap, plus the last day.</li>
              <li>Both checked: the full inclusive span, first day through last day.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: booking a hotel from March 1 to March 5, where both the
            check-in day and the check-out day should count as nights or
            days on the invoice.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            (5 − 1) + 1 + 1 = 6 days
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Without either box checked, the same two dates give 4 days, the
            gap alone. Neither answer is &quot;wrong&quot;, they&apos;re
            just answering different questions, which is why it&apos;s worth
            checking which convention a form, contract, or deadline actually
            expects.
          </p>
        </section>

        {/* Days to weeks/hours/minutes conversion */}
        <section id="days-weeks-conversion" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Converting Days to Weeks, Hours & Minutes
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Once you&apos;ve got a total day count, the rest is straight
            multiplication and division:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base mb-6">
            <li>
              <strong>Weeks</strong>: divide the total days by 7. The
              remainder is the leftover days that don&apos;t make a full
              week.
            </li>
            <li>
              <strong>Hours</strong>: multiply the total days by 24.
            </li>
            <li>
              <strong>Minutes</strong>: multiply the total days by 1,440
              (24 × 60).
            </li>
            <li>
              <strong>Seconds</strong>: multiply the total days by 86,400
              (24 × 60 × 60).
            </li>
          </ul>

          <p className="text-gray-200 leading-relaxed text-base">
            This calculator works all four out automatically the moment you
            hit Calculate, right alongside the headline day count.
          </p>
        </section>

        {/* Examples */}
        <section id="days-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Between Dates Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 1: Simple gap.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                From June 1 to June 30, neither date included:
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>Days</strong> = 30 − 1 = 29
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 2: Both dates included.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A project running from June 1 to June 30, counting both the
                first and last day worked:
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>Days</strong> = 29 + 1 + 1 = 31
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 3: Days to weeks.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                45 total days, broken into full weeks plus the remainder:
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                45 ÷ 7 = 6 wk, 3 d
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 4: Across a leap year
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start: January 1, 2028. End: March 1, 2028. 2028 is a leap
                year, so February has 29 days that year. In a non-leap
                year, the same range would come out to 59 days, this is the
                most common place people get tripped up doing the math by
                hand.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                60 days
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 5: Across a full year
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start: August 27, 2025. End: August 27, 2026. No leap day
                (February 29) falls within that specific window, so the
                count lands on a plain 365.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                365 days
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 6: A month that isn&apos;t 30 days
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start: February 1. End: March 1, non-leap year. A calendar
                &quot;month&quot; apart isn&apos;t a fixed number of days,
                it depends which months you land on.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                28 days
              </p>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Enter your own two dates above, choose whichever counting
            convention fits your situation, and share the result with a
            single link once it&apos;s calculated.
          </p>
        </section>

        {/* Days between common date ranges */}
        <section id="days-common-ranges" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Between Common Date Ranges
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A quick reference for how common time spans translate into
            days. The ranges vary because months, quarters, and years
            aren&apos;t a fixed length, February to March is a shorter gap
            than May to June, even though both are one month apart on the
            calendar.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Range
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Days (approximate)
                  </th>
                </tr>
              </thead>
              <tbody>
                {commonDateRanges.map((row, index) => (
                  <tr
                    key={row.range}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">
                      {row.range}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
           <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Need working days instead of calendar days? Try the{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              business days calculator
            </Link>
            , which skips weekends and U.S. federal holidays automatically.
          </p>
        </section>

        {/* What people use this for */}
        <section id="days-calculator-uses" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What People Use This For
          </h2>

          <div className="space-y-6">
            {commonUses.map((use) => (
              <div
                key={use.title}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  {use.title}
                </h3>
                <p className="text-gray-200 leading-relaxed text-base">
                  {use.body}
                </p>
              </div>
            ))}
          </div>

         
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
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