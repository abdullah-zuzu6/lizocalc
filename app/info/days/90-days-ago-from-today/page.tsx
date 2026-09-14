import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysAgoFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What date was 90 Days Ago From Today?",
  description:
    "What date was 90 days ago? Get the exact answer in seconds, plus every common date format, a calendar view, and a quick way to check it yourself.",
  keywords: [
    "90 days ago from today",
    "90 days ago from now",
    "what date was 90 days ago",
    "date calculator",
    "days ago calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/info/days/90-days-ago-from-today",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "90 Days Ago From Today - Date Calculator",
    description:
      "Find out exactly what date was 90 days ago from today. Multiple formats, calendar view, instant answer. Free and instant.",
    url: "https://www.lizocalc.com/info/days/90-days-ago-from-today",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "90 Days Ago From Today - Instant Date Calculator",
    description: "What date was 90 days ago from today? Find out instantly with our free calculator.",
  },
};

// ── Helpers (server-side, run at request/revalidation time) ───────────────
function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function subtractDays(base: Date, days: number) {
  return addDays(base, -days);
}

// Subtracts `count` weekdays (skips Sat/Sun), so this stays in sync with
// the real calendar — no hardcoded weekday name anywhere.
function subtractWeekdays(base: Date, count: number) {
  const d = new Date(base);
  let removed = 0;
  while (removed < count) {
    d.setDate(d.getDate() - 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) removed++;
  }
  return d;
}

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

function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatISO(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function NinetyDaysAgoFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = subtractDays(today, 90);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  // Relative Dates Table: a window around today, each row showing that
  // day's date and what date was 90 days before it.
  const relativeRange = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  // Other Day Counts Ago From Today.
  const quickReferenceDays = [45, 60, 90, 120, 150, 180];

  const weekdayTarget = subtractWeekdays(today, 90);

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
        "@id": "https://www.lizocalc.com/info/days/90-days-ago-from-today#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
          { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
          { "@type": "ListItem", position: 3, name: "Time", item: "https://www.lizocalc.com/calculators/time" },
          {
            "@type": "ListItem",
            position: 4,
            name: "90 Days Ago From Today",
            item: "https://www.lizocalc.com/info/days/90-days-ago-from-today",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/info/days/90-days-ago-from-today",
        url: "https://www.lizocalc.com/info/days/90-days-ago-from-today",
        name: "90 Days Ago From Today | LizoCalc",
        description:
          "Calculate the date 90 days ago from today instantly, with every common date format and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-09-01",
        dateModified: todayISO,
        breadcrumb: { "@id": "https://www.lizocalc.com/info/days/90-days-ago-from-today#breadcrumb" },
        isPartOf: { "@id": "https://www.lizocalc.com/#website" },
        author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
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
          <h1 className="text-3xl md:text-4xl font-bold">What date was 90 Days Ago From Today?</h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {formatFull(today)}
          </p>
          <AuthorBio />
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DaysAgoFromTodayCalculator
          initialTodayISO={todayISO}
          initialTargetISO={isoDateStr}
          initialFullDate={fullDateStr}
        />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        {/* ── INTRO ── */}
        <section className="mt-4">
          <p className="text-gray-200 leading-relaxed text-lg">
            The date 90 days ago from today was <strong>{fullDateStr}</strong>, which was 12
            weeks and 6 days ago. This calculation is made using{" "}
            <Link
              href="/info/days/what-is-today-date"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              today&apos;s
            </Link>{" "}
            date, which is {formatFull(today)}. You can check this result against our{" "}
            <Link
              href="/calculators/time/date-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              date calculator
            </Link>{" "}
            or our{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between dates calculator
            </Link>
            .
          </p>
        </section>

        {/* ── RELATIVE DATES TABLE ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Relative Dates Table
          </h2>
          <p className="text-gray-200 text-base mb-6">
            A quick look at the days surrounding today, and what date each one lands on when you
            count 90 days back from it.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-sm sm:text-base font-semibold">Days From Today</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Date</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">-90 Days</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {relativeRange.map((n) => {
                  const rowDate = addDays(today, n);
                  const minusNinety = subtractDays(rowDate, 90);
                  const isToday = n === 0;
                  return (
                    <tr key={n} className={isToday ? "bg-blue-900/40" : ""}>
                      <td className="p-4 font-semibold">
                        {isToday ? "Today" : n < 0 ? `${n} days` : `+${n} days`}
                      </td>
                      <td className="p-4">{formatMedium(rowDate)}</td>
                      <td className="p-4">{formatMedium(minusNinety)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── HOW TO CALCULATE ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 90 Days Ago From Today
          </h2>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            To find the date 90 days ago, count backward exactly 90 calendar days from today. All
            seven days of the week count, so weekends and holidays are part of the total.
          </p>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ninety days is often rounded off to three months, but the two rarely match exactly.
            Months run anywhere from 28 to 31 days, so subtracting three calendar months usually
            lands on a different date than subtracting 90 days.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            Based on today&apos;s date, {formatFull(today)}, the date 90 days ago was{" "}
            <strong>{fullDateStr}</strong>.
          </p>
        </section>

        {/* ── WHY PEOPLE LOOK THIS UP ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why People Look Up a Date 90 Days in the Past
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            Counting backward comes up more often than counting forward. A few situations where
            this date matters:
          </p>
          <ul className="text-gray-200 leading-relaxed text-base space-y-4 list-none">
            <li>
              <strong>Medical history.</strong> Doctors, pharmacies, and insurers often ask when a
              symptom started, a prescription was filled, or a procedure happened. Knowing the
              exact date beats scrolling back through a phone calendar.
            </li>
            <li>
              <strong>Store returns and warranties.</strong> Many retailers set their return or
              exchange window at 90 days from the purchase date, so this date marks whether an
              item still qualifies.
            </li>
            <li>
              <strong>Bank and credit card disputes.</strong> Chargeback and fraud-dispute windows
              are usually measured from the transaction date, and 90 days is a common cutoff banks
              and card networks use.
            </li>
            <li>
              <strong>Employment and HR.</strong> Probationary periods, 90-day reviews, and
              background-check lookback windows are typically set from a hire date or an incident
              date.
            </li>
            <li>
              <strong>Travel and visas.</strong> Rules like the Schengen Area&apos;s 90-in-180-day
              policy require travelers to know exactly which date sits 90 days back, to see how
              much of their allowance is left.
            </li>
            <li>
              <strong>Habits, fitness, and recovery.</strong> Ninety days is a common length for
              fitness challenges, sobriety milestones, and habit-building goals, so people check
              this date to see how far into a streak they are.
            </li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            Exact windows vary by store, bank, employer, or country, so treat this as a starting
            point and confirm the specific policy that applies to your situation.
          </p>
        </section>

        {/* ── OTHER DAY COUNTS AGO FROM TODAY ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Other Day Counts Ago From Today
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Need a different number of days? Here is where each one lands counting back from
            today.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Days Ago From Today</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {quickReferenceDays.map((n) => {
                  const d = subtractDays(today, n);
                  const isCurrent = n === 90;
                  return (
                    <tr key={n} className={isCurrent ? "bg-blue-900/30" : ""}>
                      <td className="p-4">
                        {isCurrent ? (
                          <span className="font-bold text-blue-300">{n} days ago from today</span>
                        ) : (
                          <Link
                            href={`/info/days/${n}-days-ago-from-today`}
                            className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                          >
                            {n} days ago from today
                          </Link>
                        )}
                      </td>
                      <td className="p-4">{formatShort(d)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 90 WEEKDAYS AGO FROM TODAY ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            90 Weekdays Ago From Today
          </h2>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ninety weekdays counts business days only, so Saturdays and Sundays are skipped. With
            five weekdays in a normal workweek, 90 weekdays cover 18 full workweeks.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6 text-center">
            <p className="text-[10px] font-bold uppercase text-gray-300 mb-2 tracking-widest">
              Date 90 Weekdays Ago
            </p>
            <p className="text-2xl font-black text-blue-300">{formatFull(weekdayTarget)}</p>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Counting back from {formatFull(today)}, 90 weekdays ago was{" "}
            <strong>{formatFull(weekdayTarget)}</strong>. This calculation skips weekends but does
            not remove public holidays. If holidays also need to come out of the count, use our{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              business days calculator
            </Link>{" "}
            instead.
          </p>
        </section>

        {/* ── 90 DAYS IN OTHER UNITS ── */}
        <section className="mt-20 flex justify-center">
          <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 max-w-xl w-full text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">
              90 Days Time in Other Units
            </h2>
            <p className="text-gray-200 leading-relaxed text-base mb-6">
              Ninety days is the same amount of time as:
            </p>
            <ul className="text-gray-200 space-y-3 text-base list-none">
              <li>12 weeks and 6 days</li>
              <li>
                2,160 hours — see our{" "}
                <Link
                  href="/calculators/time/hours-calculator"
                  className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                >
                  hours calculator
                </Link>
              </li>
              <li>129,600 minutes</li>
              <li>7,776,000 seconds</li>
            </ul>
          </div>
        </section>

        {/* ── SIMILAR CALCULATORS ── */}
        <section className="px-0 mt-20 mb-4 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "90 Days From Today", href: "/info/days/90-days-from-today" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Business Days Calculator", href: "/calculators/time/business-days-calculator" },
              { label: "Days From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
            ]}
            seeAllHref="/calculators/time"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}