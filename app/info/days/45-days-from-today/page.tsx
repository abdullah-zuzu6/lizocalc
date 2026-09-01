import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What date is 45 Days From Today? - Countdown",
  description:
    "What's the date 45 days from now? Get the exact answer in seconds, plus a live countdown, calendar view, and a quick trick for doing the math yourself.",
  keywords: [
    "45 days from today",
    "45 days from now",
    "what date is 45 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "45 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 45 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "45 Days From Today - Instant Date Calculator",
    description:
      "What date is 45 days from today? Find out instantly with our free calculator.",
  },
};

// ── Helpers (server-side, run at request/revalidation time) ───────────────
function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

// Adds `count` weekdays (skips Sat/Sun), so this is always in sync with
// the real calendar — no hardcoded weekday name anywhere.
function addWeekdays(base: Date, count: number) {
  const d = new Date(base);
  let added = 0;
  while (added < count) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
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

export default function FortyFiveDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 45);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  // Relative Dates Table: a window around today, each row showing that
  // day's date and what date is 45 days further out from it.
  const relativeRange = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6];

  // Other Day Counts From Today.
  const quickReferenceDays = [45, 60, 90, 120, 150, 180];

  const weekdayTarget = addWeekdays(today, 45);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
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
            name: "45 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
        name: "45 Days From Today | LizoCalc",
        description:
          "Calculate the date 45 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-09-01",
        dateModified: todayISO,
        breadcrumb: {
          "@id": "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#breadcrumb",
        },
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
            What date is 45 Days From Today?
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {formatFull(today)}
          </p>
          <AuthorBio />
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DaysFromTodayCalculator
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
            The date 45 days from today is <strong>{fullDateStr}</strong>,
            which is 6 weeks and 3 days from now. This calculation is made
            using{" "}
            <Link
              href="/info/days/what-is-today-date"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              today&apos;s
            </Link>{" "}
            date, which is {formatFull(today)}. You can validate this
            result using our{" "}
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
            A quick look at the days surrounding today, and what date each
            one lands on 45 days further out.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-sm sm:text-base font-semibold">Days From Today</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Date</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">+45 Days</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {relativeRange.map((n) => {
                  const rowDate = addDays(today, n);
                  const plusForty = addDays(rowDate, 45);
                  const isToday = n === 0;
                  return (
                    <tr key={n} className={isToday ? "bg-blue-900/40" : ""}>
                      <td className="p-4 font-semibold">
                        {isToday ? "Today" : n < 0 ? `${n} days` : `+${n} days`}
                      </td>
                      <td className="p-4">{formatMedium(rowDate)}</td>
                      <td className="p-4">{formatMedium(plusForty)}</td>
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
    How to Calculate 45 Days From Today
  </h2>

  <p className="text-gray-200 leading-relaxed text-base mb-4">
    Forty-five days is a little more than six weeks. To find the exact date,
    start with today and count forward 45 calendar days, continuing into the
    next month whenever the current month ends.
  </p>

  <p className="text-gray-200 leading-relaxed text-base mb-4">
    This type of calculation includes every calendar day. Weekends and
    holidays are not removed, so the result represents a full 45-day period
    rather than 45 working days.
  </p>

  <p className="text-gray-200 leading-relaxed text-base">
    Today is {formatFull(today)}, and 45 days after today is
    <strong> {fullDateStr}</strong>.
  </p>
</section>

        {/* ── OTHER DAY COUNTS FROM TODAY ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Other Day Counts From Today
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Need a different number of days? Here is where each one lands
            starting from today.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Days From Today</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {quickReferenceDays.map((n) => {
                  const d = addDays(today, n);
                  const isCurrent = n === 45;
                  return (
                    <tr key={n} className={isCurrent ? "bg-blue-900/30" : ""}>
                      <td className="p-4">
                        {isCurrent ? (
                          <span className="font-bold text-blue-300">
                            {n} days from today
                          </span>
                        ) : (
                          <Link
                            href={`/info/days/${n}-days-from-today`}
                            className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                          >
                            {n} days from today
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
{/* ── 45 WORKING DAYS FROM TODAY ── */}
<section className="mt-20">
  <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
    45 Working Days From Today
  </h2>

  <p className="text-gray-200 leading-relaxed text-base mb-4">
    A working-day calculation counts weekdays from Monday through Friday and
    leaves Saturdays and Sundays out. Because 45 weekdays equal nine
    five-day workweeks, the final date will be later than 45 calendar days
    from today.
  </p>

  <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6 text-center">
    <p className="text-[10px] font-bold uppercase text-gray-300 mb-2 tracking-widest">
      Date After 45 Working Days
    </p>
    <p className="text-2xl font-black text-blue-300">
      {formatFull(weekdayTarget)}
    </p>
  </div>

  <p className="text-gray-200 leading-relaxed text-base">
    From {formatFull(today)}, counting 45 weekdays gives
    <strong> {formatFull(weekdayTarget)}</strong>. This result does not
    remove public holidays. For deadlines that also exclude holidays, use our{" "}
    <Link
      href="/calculators/time/business-days-calculator"
      className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
    >
      business days calculator
    </Link>
    .
  </p>
</section>

        {/* ── 45 DAYS IN OTHER UNITS ── */}
        <section className="mt-20 flex justify-center">
          <div className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 max-w-xl w-full text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 mb-4">
              45 Days Time in Other Units
            </h2>
            <p className="text-gray-200 leading-relaxed text-base mb-6">
              Forty-five days is the same amount of time as:
            </p>
            <ul className="text-gray-200 space-y-3 text-base list-none">
              <li>6 weeks and 3 days</li>
              <li>
                1,080 hours — see our{" "}
                <Link
                  href="/calculators/time/hours-calculator"
                  className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                >
                  hours calculator
                </Link>
              </li>
              <li>64,800 minutes</li>
              <li>3,888,000 seconds</li>
            </ul>
          </div>
        </section>

        {/* ── SIMILAR CALCULATORS ── */}
        <section className="px-0 mt-20 mb-4 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "120 Days From Today", href: "/info/days/120-days-from-today" },
              { label: "150 Days From Today", href: "/info/days/150-days-from-today" },
              { label: "Days From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
              { label: "Months From Today Calculator", href: "/calculators/time/months-from-today-calculator" },
            ]}
            seeAllHref="/calculators/time"
          />
        </section>

      </article>

      <Footer />
    </main>
  );
}