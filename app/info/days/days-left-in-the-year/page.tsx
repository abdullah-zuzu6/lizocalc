import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysLeftInYear from "./clientside";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";

// Revalidate hourly so the server-rendered "today" never drifts far from
// real time, without going full force-dynamic and losing edge caching.
export const revalidate = 3600;

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
}

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

// Days remaining in the calendar year that `d` itself falls in — handles
// a range that crosses a New Year's boundary correctly, since each row
// uses its own date's year length (365 or 366).
function daysLeftInYearFor(d: Date) {
  const total = isLeapYear(d.getFullYear()) ? 366 : 365;
  return total - dayOfYear(d);
}

// Days left in the year as of the last day of a given month (0-11) —
// powers the month-by-month breakdown promised in the page description.
function daysLeftAfterEndOfMonth(year: number, monthIndex: number) {
  const endOfMonth = new Date(year, monthIndex + 1, 0);
  const total = isLeapYear(year) ? 366 : 365;
  return total - dayOfYear(endOfMonth);
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Computed once at build/request time so metadata and structured data can
// reference the live day count without duplicating client logic.
const today = new Date();
const year = today.getFullYear();
const totalDaysInYear = isLeapYear(year) ? 366 : 365;
const daysLeft = totalDaysInYear - dayOfYear(today);
const weeksLeft = Math.floor(daysLeft / 7);
const weeksLeftRemDays = daysLeft % 7;

export const metadata: Metadata = {
  title: `How Many Days Are Left in ${year}? - Time Left in Year`,
  description: `There are ${daysLeft} days left in ${year}. See the exact count, weeks remaining, percent of the year complete, and a month-by-month breakdown.`,
  keywords: [
    "days left in the year",
    `days left in ${year}`,
    "how many days left in the year",
    "days remaining in year",
    "year countdown",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/info/days/days-left-in-year",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: `How Many Days Are Left in ${year}?`,
    description: `${daysLeft} days left in ${year} — that's ${weeksLeft} weeks and ${weeksLeftRemDays} days. See the live count, percent complete, and a month-by-month breakdown.`,
    url: "https://www.lizocalc.com/info/days/days-left-in-year",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `How Many Days Are Left in ${year}?`,
    description: `${daysLeft} days left in ${year}. See the live count and a month-by-month breakdown.`,
  },
};

// ── Helpers (server-side, run at request/revalidation time) ───────────────
function formatFull(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatMedium(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatISO(d: Date) {
  return d.toISOString().split("T")[0];
}

type Faq = { q: string; a: string };

export default function DaysLeftInYearPage() {
  // Server-rendered baseline so crawlers see a real, correct count in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const fullDateStr = formatFull(today);
  const isoDateStr = formatISO(today);

  // Chart Rows: an 11-day window centered on today (5 days back, 5 days
  // forward), each showing that date and how many days are left in its
  // own calendar year. Fully automatic — recalculates every revalidation.
  const chartRange = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

  // Month-by-Month Breakdown: from the current month through December,
  // showing how many days will be left in the year once each month ends.
  const currentMonthIndex = today.getMonth();
  const monthBreakdown = Array.from(
    { length: 12 - currentMonthIndex },
    (_, i) => currentMonthIndex + i
  ).map((monthIndex) => ({
    monthIndex,
    name: MONTH_NAMES[monthIndex],
    isCurrent: monthIndex === currentMonthIndex,
    daysLeftAfter: daysLeftAfterEndOfMonth(year, monthIndex),
  }));

  const faqs: Faq[] = [
    {
      q: `How many days are left in ${year}?`,
      a: `There are ${daysLeft} days left in ${year} as of ${fullDateStr}. That works out to ${weeksLeft} weeks and ${weeksLeftRemDays} days. This page recalculates automatically every day.`,
    },
    {
      q: "How do you calculate the days remaining in the year by hand?",
      a: `Subtract today's day-of-month from the number of days in the current month to get what's left there, then add up the full days in every month still to come before December, plus the days into December itself. A shortcut is to subtract today's day-of-year number from 365, or 366 in a leap year.`,
    },
    {
      q: "Does a leap year change the count?",
      a: `Yes. A leap year adds an extra day to February, which pushes the total for the year to 366 instead of 365 and adds one more day to the count at any point after February 29th.`,
    },
    {
      q: "How many weeks are left in the year?",
      a: `Divide the number of days left by 7. The result above already shows both the days remaining and that same figure broken into whole weeks plus leftover days.`,
    },
    {
      q: "How do I find days left in the year using Excel or Google Sheets?",
      a: `Use a formula that subtracts today's date from December 31st of the current year, such as =DATE(YEAR(TODAY()),12,31)-TODAY(). The result is the number of days remaining.`,
    },
    {
      q: "Does this account for my time zone?",
      a: `Yes. The count updates on load to match your device's local time zone rather than a fixed server time.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.lizocalc.com/info/days/days-left-in-year#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Info",
            item: "https://www.lizocalc.com/info",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Days",
            item: "https://www.lizocalc.com/info/days",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `Days Left in ${year}`,
            item: "https://www.lizocalc.com/info/days/days-left-in-year",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/info/days/days-left-in-year",
        url: "https://www.lizocalc.com/info/days/days-left-in-year",
        name: `How Many Days Are Left in ${year}? | LizoCalc`,
        description: `See exactly how many days, weeks, and hours are left in ${year}, plus a month-by-month breakdown of the remaining days.`,
        inLanguage: "en",
datePublished: "2026-09-01",     
 dateModified: isoDateStr,
        isPartOf: {
          "@type": "WebSite",
          name: "LizoCalc",
          url: "https://www.lizocalc.com",
        },
        author: {
          "@type": "Person",
          name: "Rana Muhammad Abdullah",
          url: "https://www.linkedin.com/in/abdullahsajjad06/",
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.lizocalc.com/info/days/days-left-in-year#faq",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            How Many Days Are Left in {year}?
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {fullDateStr}
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 py-8">
        <DaysLeftInYear initialFullDate={fullDateStr} initialISODate={isoDateStr} />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section className="mt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Counting Down the Rest of {year}
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The number at the top of this page updates every day on its
            own, counting down from January 1st to December 31st. It&apos;s
            pulled from your device&apos;s clock, so it&apos;s accurate to your own
            time zone rather than a server sitting somewhere else, and it
            starts from{" "}
            <Link
              href="/info/days/what-is-today-date"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              today&apos;s date
            </Link>
            .
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Below the headline number you&apos;ll find the same span expressed
            as weeks and days, an approximate hour count, how much of the
            year has already passed as a percentage, and a month-by-month
            look at exactly how many days remain in each stretch between
            now and New Year&apos;s Eve.
          </p>
        </section>

        {/* ── DAYS LEFT IN THE YEAR CHART ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Left in {year} Chart
          </h2>
          <p className="text-gray-200 text-base mb-6">
            The following chart shows the days remaining in the year from
            today and the days immediately surrounding it. It recalculates
            automatically, so it&apos;s always current.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-sm sm:text-base font-semibold">Start Date</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Days Left in the Year</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {chartRange.map((n) => {
                  const rowDate = addDays(today, n);
                  const isToday = n === 0;
                  return (
                    <tr key={n} className={isToday ? "bg-blue-900/40" : ""}>
                      <td className="p-4 font-semibold">
                        {formatMedium(rowDate)}
                        {isToday && (
                          <span className="ml-2 text-[10px] font-black uppercase text-blue-300 tracking-widest">
                            Today
                          </span>
                        )}
                      </td>
                      <td className="p-4">{daysLeftInYearFor(rowDate)} days</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── MONTH-BY-MONTH BREAKDOWN ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Left in {year}, Month by Month
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Here&apos;s how the countdown shrinks as each remaining month
            wraps up — useful for planning anything with a year-end
            deadline. If you need the days remaining in just the current
            month instead, our{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between dates calculator
            </Link>{" "}
            can work that out for any two dates you choose.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-sm sm:text-base font-semibold">Month Ends</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Days Left in {year} After</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {monthBreakdown.map((m) => (
                  <tr key={m.monthIndex} className={m.isCurrent ? "bg-blue-900/40" : ""}>
                    <td className="p-4 font-semibold">
                      {m.name} 30/31, {year}
                      {m.isCurrent && (
                        <span className="ml-2 text-[10px] font-black uppercase text-blue-300 tracking-widest">
                          This Month
                        </span>
                      )}
                    </td>
                    <td className="p-4">{m.daysLeftAfter} days</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Days Left in the Year Yourself
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            There are a couple of ways to get this number without a tool.
            The most direct is day-of-year math: figure out what day number
            today is (January 1st is day 1), then subtract that from 365,
            or 366 in a leap year.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The other way is month by month. Subtract today&apos;s date from
            the total number of days in the current month to see what&apos;s
            left there, then add the full day count of every month still to
            come before December.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you have the day total, dividing by 7 gives you the number
            of full weeks remaining, with whatever&apos;s left over as extra
            days. Prefer not to do the math by hand? Our{" "}
            <Link
              href="/calculators/time/date-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              date calculator
            </Link>{" "}
            will add or subtract any number of days, weeks, or months from
            any starting date.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Leap Years Matter Here
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A normal year has 365 days. A leap year adds one extra day —
            February 29th — bringing the total to 366. That means the same
            calendar date can have a slightly different number of days left
            after it depending on whether the current year is a leap year.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The count on this page automatically accounts for that, so
            there&apos;s nothing extra to adjust for.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding Days Left in the Year With a Spreadsheet
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Both Excel and Google Sheets can do this with a single formula.
            Enter the following into any empty cell:
          </p>
          <p className="text-gray-200 leading-relaxed text-base font-mono bg-gray-800/50 inline-block px-3 py-1 rounded-lg mb-4">
            =DATE(YEAR(TODAY()),12,31)-TODAY()
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That builds a date for December 31st of the current year and
            subtracts today&apos;s date from it, returning the exact number of
            days remaining. It updates automatically whenever the sheet
            recalculates. If you'd rather count toward a different
            deadline than December 31st, our{" "}
            <Link
              href="/calculators/time/days-from-today-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days from today calculator
            </Link>{" "}
            works the same way for any target date.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">{f.q}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── SIMILAR CALCULATORS ── */}
        <section className="px-0 mt-20 mb-4 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Days From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
              { label: "Business Days Calculator", href: "/calculators/time/business-days-calculator" },
            ]}
            seeAllHref="/calculators/time"
          />
        </section>

      </article>

      <Footer />
    </main>
  );
}