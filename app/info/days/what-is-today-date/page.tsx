import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import WhatIsTodayDate from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

// Revalidate hourly so the server-rendered "today" never drifts far from
// real time, without going full force-dynamic and losing edge caching.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "What Is Today's Date? - Current Date & Calendar",
  description:
    "See today's date in every common format, plus the day of the week, day of the year, current week number, and how many days are left in the year.",
  keywords: [
    "what is today's date",
    "current date",
    "today's date",
    "what day is it",
    "date today",
    "today's date in numbers",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/info/days/what-is-today-date",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "What Is Today's Date? - Current Date & Calendar",
    description:
      "Today's date in every common format, the day of the week, day of the year, week number, and days left in the year. Free and instant.",
    url: "https://www.lizocalc.com/info/days/what-is-today-date",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "What Is Today's Date?",
    description:
      "Find today's date in every common format, plus day of the week, day of the year, and week number.",
  },
};

// ── Helpers (server-side, run at request/revalidation time) ───────────────
function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatFull(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatISO(d: Date) {
  return d.toISOString().split("T")[0];
}

function formatUS(d: Date) {
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())}-${d.getFullYear()}`;
}

function formatEU(d: Date) {
  return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
}

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
}

function weekOfYear(d: Date) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

type Faq = { q: string; a: string };

export default function WhatIsTodayDatePage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const fullDateStr = formatFull(today);
  const isoDateStr = formatISO(today);
  const year = today.getFullYear();
  const totalDaysInYear = isLeapYear(year) ? 366 : 365;
  const doy = dayOfYear(today);
  const daysLeft = totalDaysInYear - doy;
  const weeksLeft = Math.floor(daysLeft / 7);
  const weeksLeftRemDays = daysLeft % 7;
  const weekNum = weekOfYear(today);
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  const numberFormats = [
    { label: "MM-DD-YYYY", value: formatUS(today), note: "Common in the United States" },
    { label: "DD-MM-YYYY", value: formatEU(today), note: "Common in most other countries" },
    { label: "YYYY-MM-DD", value: isoDateStr, note: "ISO 8601 international standard" },
  ];

  const faqs: Faq[] = [
    {
      q: "What is today's date?",
      a: `Today's date is ${fullDateStr}. This page recalculates automatically every day, so it's always accurate whenever you check it.`,
    },
    {
      q: "What is today's date in numbers?",
      a: `In numbers, today is ${isoDateStr} using the ISO 8601 (YYYY-MM-DD) format, ${formatUS(
        today
      )} in the US MM-DD-YYYY format, and ${formatEU(
        today
      )} in the DD-MM-YYYY format used across most of the world.`,
    },
    {
      q: "What day of the week is it today?",
      a: `Today is ${weekday}. The stat row above also shows the day number, week number, and how many days are left in ${year}.`,
    },
    {
      q: "Why do different countries write dates differently?",
      a: `The United States commonly orders dates as month-day-year, while most of the rest of the world uses day-month-year. Because that can cause confusion, the ISO 8601 standard defines a single unambiguous year-month-day format for international use.`,
    },
    {
      q: "How do I get today's date in Excel or Google Sheets?",
      a: `Enter =TODAY() into any cell. It returns the current date and updates automatically every time the sheet opens or recalculates, so it always reflects the real current date rather than a fixed value.`,
    },
    {
      q: "Does this page account for my time zone?",
      a: `Yes. The date shown updates on load to match your device's local time zone rather than a fixed server time, so it stays correct even right around midnight.`,
    },
  ];

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
      "@id": "https://www.lizocalc.com/info/days/what-is-today-date#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Days", item: "https://www.lizocalc.com/info/days" },
        { "@type": "ListItem", position: 4, name: "What Is Today's Date?", item: "https://www.lizocalc.com/info/days/what-is-today-date" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/days/what-is-today-date",
      url: "https://www.lizocalc.com/info/days/what-is-today-date",
      name: "What Is Today's Date? | LizoCalc",
      description:
        "See today's date in every common format, the day of the week, day of the year, current week number, and days left in the year.",
      inLanguage: "en",
      datePublished: "2026-09-01",
      dateModified: isoDateStr,
      breadcrumb: { "@id": "https://www.lizocalc.com/info/days/what-is-today-date#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.lizocalc.com/info/days/what-is-today-date#faq",
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
          <h1 className="text-3xl md:text-4xl font-bold">What Is Today&apos;s Date?</h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {fullDateStr}
          </p>
          <AuthorBio />
          <ShareBar />
        </div>
      </section>

      {/* Tool */}
      <section className="px-4 py-8">
        <WhatIsTodayDate initialFullDate={fullDateStr} initialISODate={isoDateStr} />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── INTRO ── */}
        <section className="mt-4">
          <p className="text-gray-200 leading-relaxed text-lg">
            Today&apos;s date is <strong>{fullDateStr}</strong> — day {doy} of{" "}
            {totalDaysInYear} in {year}. This page updates itself every day, so
            whenever you land here it reflects the real current date in your
            own time zone rather than a fixed server time. Need a date a few
            days out instead? Try our{" "}
            <Link
              href="/info/days/7-days-from-today"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              7 days from today calculator
            </Link>{" "}
            or our{" "}
            <Link
              href="/info/days/30-days-from-today"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              30 days from today calculator
            </Link>
            .
          </p>
        </section>

        {/* ── TODAY'S DATE IN NUMBERS ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Today&apos;s Date in Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            Written as digits, today&apos;s date looks a little different
            depending on where in the world you are:
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-6">
            <table className="w-full text-left border-collapse min-w-[520px]">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-sm sm:text-base font-semibold">Format</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Today</th>
                  <th className="p-4 text-sm sm:text-base font-semibold">Where It&apos;s Used</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {numberFormats.map((f) => (
                  <tr key={f.label}>
                    <td className="p-4 font-semibold">{f.label}</td>
                    <td className="p-4 font-mono">{f.value}</td>
                    <td className="p-4 text-gray-300">{f.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The United States generally orders a date month first, then day,
            then year (MM-DD-YYYY). Most of the rest of the world flips the
            first two and leads with the day (DD-MM-YYYY).
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That mismatch is exactly why a date like 03-04-2026 is
            ambiguous on its own — it could mean March 4th or April 3rd
            depending on the convention in use. The ISO 8601 standard exists
            to remove that guesswork by always ordering a date as
            year-month-day, largest unit first, which is why{" "}
            <strong>{isoDateStr}</strong> is the safest way to write
            today&apos;s date in a spreadsheet, filename, or database.
          </p>
        </section>

        {/* ── MORE ABOUT TODAY'S DATE ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More About Today&apos;s Date
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Beyond the calendar date itself, a few other numbers describe
            where today falls inside the year:
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Metric</th>
                  <th className="p-4 text-left font-semibold">Value</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Day of the Week</td>
                  <td className="p-4 font-bold text-blue-300">{weekday}</td>
                </tr>
                <tr>
                  <td className="p-4">Day of the Year</td>
                  <td className="p-4 font-bold text-blue-300">
                    {doy} of {totalDaysInYear}
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Week Number</td>
                  <td className="p-4 font-bold text-blue-300">{weekNum} of 52/53</td>
                </tr>
                <tr>
                  <td className="p-4">Month Number</td>
                  <td className="p-4 font-bold text-blue-300">{today.getMonth() + 1} of 12</td>
                </tr>
                <tr>
                  <td className="p-4">Days Left in {year}</td>
                  <td className="p-4 font-bold text-blue-300">{daysLeft} days</td>
                </tr>
                <tr>
                  <td className="p-4">Weeks Left in {year}</td>
                  <td className="p-4 font-bold text-blue-300">
                    {weeksLeft} weeks and {weeksLeftRemDays} days
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            These figures are handy for planning around fiscal quarters,
            payroll cycles, project deadlines, or anything else that&apos;s
            tracked by week or day number rather than by calendar date.{" "}
            {year} {isLeapYear(year) ? "is" : "is not"} a leap year, which is
            why it has {totalDaysInYear} days.
          </p>
        </section>

        {/* ── HOW TO CALCULATE IN EXCEL / SHEETS ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Get Today&apos;s Date in Excel or Google Sheets
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Both Excel and Google Sheets use the same formula for pulling
            today&apos;s date into a cell:
          </p>
          <p className="text-gray-200 leading-relaxed text-base font-mono bg-gray-800/50 inline-block px-3 py-1 rounded-lg mb-4">
            =TODAY()
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The result refreshes automatically whenever the sheet
            recalculates, so it&apos;s a reliable way to timestamp a row or
            build a formula that&apos;s always relative to the present day —
            for example, <code className="text-blue-300">=TODAY()-A1</code>{" "}
            to find how many days have passed since a date in cell A1.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you need the current date and time together, use{" "}
            <code className="text-blue-300">=NOW()</code> instead. Both
            formulas recalculate every time the spreadsheet opens or a
            change triggers a recalculation, so they&apos;re never a
            hardcoded value.
          </p>
        </section>

        {/* ── FAQ ── */}
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
            title="Similar Date & Time Calculators"
            links={[
              { label: "7 Days From Today", href: "/info/days/7-days-from-today" },
              { label: "14 Days From Today", href: "/info/days/14-days-from-today" },
              { label: "30 Days From Today", href: "/info/days/30-days-from-today" },
              { label: "90 Days From Today", href: "/info/days/90-days-from-today" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
            ]}
            seeAllHref="/calculators/time"
          />
        </section>

      </article>

      <Footer />
    </main>
  );
}