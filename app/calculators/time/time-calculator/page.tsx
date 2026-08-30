import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import TimeCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";
import AuthorBio from "@/components/AuthorBio";


const faqData = [
  {
    question: "How do I find the time between two dates?",
    answer:
      "Switch to the Duration tab, enter a start date and time and an end date and time, then hit Calculate. You'll get the gap broken into days, hours, minutes, and seconds, plus totals in hours, minutes, and seconds if you need a single number for a timesheet or invoice.",
  },
  {
    question: "What does \"count only workdays\" do?",
    answer:
      "It removes any time that falls on a Saturday or Sunday from the total. If your start or end time lands in the middle of a weekend day, only the Monday-to-Friday portion of that day counts, so the result still lines up with a normal work week.",
  },
  {
    question: "Can I leave out the time and just use dates?",
    answer:
      "Yes. Leave both time fields at their default and the calculator treats each date as starting at midnight. If you only care about whole days between two dates rather than an exact duration, our days between dates calculator is built for that.",
  },
  {
    question: "How do I convert hours and minutes into decimal hours?",
    answer:
      "Switch to the Convert tab and enter your hours, minutes, and seconds. The result shows total hours as a decimal, for example 1 hour 30 minutes converts to 1.50 hours, which is the format most payroll and invoicing systems expect.",
  },
  {
    question: "What's the difference between 12-hour and 24-hour time?",
    answer:
      "The 12-hour clock repeats 1 through 12 twice a day and uses AM/PM to tell them apart. The 24-hour clock counts straight from 00:00 to 23:59, so 1:00 PM becomes 13:00 and there's no AM/PM to mix up. Enter times in either format and the calculator reads them correctly.",
  },
  {
    question: "Why does my duration show a negative or reversed result?",
    answer:
      "If the end date and time you entered come before the start, the calculator swaps them automatically and tells you it did so, so you still get a positive duration rather than an error.",
  },
  {
    question: "Can I share a calculation with someone else?",
    answer:
      "Yes. After you calculate a result, use Copy Link under Share This Result. The link carries your dates, times, and settings, so whoever opens it sees the exact same inputs and result you did.",
  },
  {
    question: "Does this calculator account for time zones?",
    answer:
      "No, it works entirely in your device's local time. If your start and end points are in different time zones, convert both to the same zone before entering them, or the duration will be off by the zone difference.",
  },
];

export const metadata: Metadata = {
  title: "Time Calculator – Time Duration & Hours, Minutes, Seconds Converter",

  description:
    "Free time calculator. Find the exact duration between two dates and times, or convert hours, minutes, and seconds into decimal hours and total seconds.",

  keywords: [
    "time calculator",
    "time duration calculator",
    "time between two dates",
    "hours minutes seconds calculator",
    "convert hours to minutes",
    "decimal hours calculator",
    "elapsed time calculator",
    "workday time calculator",
    "time difference calculator",
    "12 hour to 24 hour converter",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/time-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Time Calculator | LizoCalc",
    description:
      "Find the exact duration between two dates and times, or convert hours, minutes, and seconds. Free, with a workdays-only option and shareable results.",
    url: "https://www.lizocalc.com/calculators/time/time-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Time Calculator | LizoCalc",
    description:
      "Find the duration between two dates and times, or convert hours, minutes, and seconds into decimal hours.",
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
      "@id": "https://www.lizocalc.com/calculators/time/time-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Time Calculator", item: "https://www.lizocalc.com/calculators/time/time-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/time-calculator",
      url: "https://www.lizocalc.com/calculators/time/time-calculator",
      name: "Time Calculator | LizoCalc",
      description: "Free time calculator. Find the duration between two dates and times, or convert hours, minutes, and seconds.",
      inLanguage: "en",
      datePublished: "2026-03-29",
      dateModified: "2026-08-31",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/time-calculator#breadcrumb" },
    },
  ],
};

const tocItems = [
  { id: "what-is-time", label: "What Is Time?" },
  { id: "how-its-calculated", label: "How Time Is Calculated" },
  { id: "time-calculator-examples", label: "Time Calculator Examples" },
  { id: "duration-vs-conversion", label: "Duration vs Conversion" },
  { id: "12-vs-24-hour", label: "12-Hour vs 24-Hour Time" },
  { id: "quick-reference", label: "Quick Reference Table" },
];

const durationVsConversionRows = [
  { metric: "What it answers", duration: "How much time sits between two moments", conversion: "What a set duration equals in other units" },
  { metric: "Inputs", duration: "A start date and time, an end date and time", conversion: "Hours, minutes, and seconds" },
  { metric: "Typical output", duration: "Days, hours, minutes, seconds, plus totals", conversion: "Total seconds, total minutes, decimal hours" },
  { metric: "Used for", duration: "Elapsed time, deadlines, shift length", conversion: "Payroll, billing, video and audio length" },
  { metric: "Example", duration: "9:00 AM to 5:45 PM is 8h 45m", conversion: "8h 45m equals 8.75 hours" },
];

const clockFormatRows = [
  { twelve: "12:00 AM", twentyFour: "00:00" },
  { twelve: "6:00 AM", twentyFour: "06:00" },
  { twelve: "12:00 PM", twentyFour: "12:00" },
  { twelve: "1:00 PM", twentyFour: "13:00" },
  { twelve: "6:00 PM", twentyFour: "18:00" },
  { twelve: "11:59 PM", twentyFour: "23:59" },
];

const referenceRows = [
  { hms: "0:00:30", seconds: "30", minutes: "0.50", hours: "0.0083" },
  { hms: "0:01:00", seconds: "60", minutes: "1.00", hours: "0.0167" },
  { hms: "0:05:00", seconds: "300", minutes: "5.00", hours: "0.0833" },
  { hms: "0:15:00", seconds: "900", minutes: "15.00", hours: "0.2500" },
  { hms: "0:30:00", seconds: "1,800", minutes: "30.00", hours: "0.5000" },
  { hms: "0:45:30", seconds: "2,730", minutes: "45.50", hours: "0.7583" },
  { hms: "1:00:00", seconds: "3,600", minutes: "60.00", hours: "1.0000" },
  { hms: "1:30:45", seconds: "5,445", minutes: "90.75", hours: "1.5125" },
  { hms: "2:00:00", seconds: "7,200", minutes: "120.00", hours: "2.0000" },
  { hms: "4:30:00", seconds: "16,200", minutes: "270.00", hours: "4.5000" },
  { hms: "8:00:00", seconds: "28,800", minutes: "480.00", hours: "8.0000" },
  { hms: "8:15:45", seconds: "29,745", minutes: "495.75", hours: "8.2625" },
  { hms: "12:00:00", seconds: "43,200", minutes: "720.00", hours: "12.0000" },
  { hms: "16:00:00", seconds: "57,600", minutes: "960.00", hours: "16.0000" },
  { hms: "24:00:00", seconds: "86,400", minutes: "1,440.00", hours: "24.0000" },
];

export default function TimePage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-time-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">Time Calculator</h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find how much time sits between two dates and times, or convert hours, minutes, and seconds into decimal hours.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8" aria-label="Time duration and conversion calculator">
        <TimeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>time calculator</strong> does two related jobs. It tells
          you how much time actually passed between a start point and an end
          point, and it converts a duration you already know into whatever
          unit you need next. Pick the Duration tab for the first job and the
          Convert tab for the second. Both share your date and time settings,
          and once you have a result you can copy a link that carries the
          exact same inputs.
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

        {/* What Is Time */}
        <section id="what-is-time" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Time?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Time is how we measure the gap between one moment and another.
            A clock splits that gap into hours, minutes, and seconds. A
            calendar splits it into days, weeks, months, and years.
            Both measure the same thing, just at a different resolution.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Most people reach for a time calculator for one of two reasons.
            Either they need to know how long something took or will take,
            like a flight, a shift, or a phone call, or they already have a
            duration and need it written a different way, like turning 1
            hour 22 minutes into 1.37 decimal hours for a client invoice.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This tool covers both. Enter a start and end date and time to
            get the exact gap, or enter hours, minutes, and seconds to
            convert them. If you only need whole calendar days instead of
            an exact duration, the{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between two dates calculator
            </Link>{" "}
            handles that. To add or subtract time from a single date instead
            of comparing two, use the{" "}
            <Link
              href="/calculators/time/date-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              date calculator
            </Link>
            . Everything here runs in your browser on your device's local
            clock, so nothing gets sent anywhere, and your last inputs are
            remembered automatically.
          </p>
        </section>

        {/* How it's calculated */}
        <section id="how-its-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Time Is Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In Duration mode, the calculator subtracts your start moment from
            your end moment and breaks the gap into days, hours, minutes, and
            seconds. If you turn on "count only workdays," it steps through
            the range one calendar day at a time and drops any portion that
            falls on a Saturday or Sunday before adding up the rest.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            That day-by-day approach matters when a shift starts on a Friday
            afternoon and ends on a Monday morning: only the Friday hours
            before midnight and the Monday hours after midnight get counted,
            and the whole weekend in between is dropped.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In Convert mode, the math is simpler: total seconds equals hours
            times 3,600, plus minutes times 60, plus seconds. Total minutes
            and decimal hours come from dividing that number down.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6 font-mono text-green-300 text-sm">
            <div>Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds</div>
            <div>Total Minutes = Total Seconds ÷ 60</div>
            <div>Decimal Hours = Total Seconds ÷ 3,600</div>
          </div>
        </section>

        {/* Examples */}
        <section id="time-calculator-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Time Calculator Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 1: A work shift
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start: 9:00 AM. End: 5:45 PM, same day. That's a straight
                subtraction with no days involved.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">8h 45m</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 2: Crossing a weekend
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Start: Friday 4:00 PM. End: Monday 9:00 AM. With "count only
                workdays" on, Saturday and Sunday drop out of the total.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">17h</p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                Example 3: Converting for an invoice
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A task logged as 2 hours 45 minutes 30 seconds, converted to
                decimal hours for billing.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">2.7583 h</p>
            </div>
          </div>
        </section>

        {/* Duration vs Conversion */}
        <section id="duration-vs-conversion" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Duration vs Conversion
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The two tabs answer different questions, so it helps to know
            which one you actually need before you start typing dates.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Metric</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Duration</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {durationVsConversionRows.map((row, index) => (
                  <tr key={row.metric} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">{row.metric}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.duration}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            A rough rule: if you're staring at two dates on a calendar, use
            Duration. If you're staring at a number like "3h 20m" and need it
            in a different shape, use Convert.
          </p>
        </section>

        {/* 12-Hour vs 24-Hour Time */}
        <section id="12-vs-24-hour" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            12-Hour vs 24-Hour Time
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The 12-hour clock splits the day into two 12-hour blocks, AM
            and PM, and repeats 1 through 12 twice. The 24-hour clock
            counts straight through from 00:00 to 23:59, so every hour of
            the day gets its own number and there's no AM/PM to track.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            To convert PM to 24-hour time, add 12 to the hour, except for
            12 PM, which stays 12:00. Midnight is 12:00 AM in 12-hour
            format and 00:00 in 24-hour format.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-6">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">12-Hour</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">24-Hour</th>
                </tr>
              </thead>
              <tbody>
                {clockFormatRows.map((row, index) => (
                  <tr key={row.twelve} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-mono">{row.twelve}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-mono">{row.twentyFour}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The US, UK, Canada, and Australia default to 12-hour time in
            daily conversation. Most of Europe, Latin America, and Asia
            print schedules, transport timetables, and official documents
            in 24-hour time, even in places where people say "6 o'clock"
            out loud. Military and aviation systems use 24-hour time
            everywhere, since mixing up 6 AM and 6 PM on a flight schedule
            is the kind of mistake that actually costs something.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            This calculator reads either format. If a project deadline is
            written as a specific time and date and you need to know your
            exact age or a target date on a certain day, the{" "}
            <Link
              href="/calculators/time/age-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              age calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/time/hours-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              hours calculator
            </Link>{" "}
            cover the date and clock-time side of that separately.
          </p>
        </section>

        {/* Quick reference table */}
        <section id="quick-reference" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Time Conversion Table
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A few common durations and what they equal in seconds, minutes,
            and decimal hours, for a quick check without touching the
            calculator above.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[480px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">hh:mm:ss</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Seconds</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Minutes</th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Decimal Hours</th>
                </tr>
              </thead>
              <tbody>
                {referenceRows.map((row, index) => (
                  <tr key={row.hms} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-mono">{row.hms}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.seconds}</td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.minutes}</td>
                    <td className="p-4 text-sm sm:text-base border-b border-gray-800 font-bold text-green-400">{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Need the number of whole calendar days instead of hours and
            minutes? Try the{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between two dates calculator
            </Link>
            , or check{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              business days calculator
            </Link>{" "}
            if weekends need to be excluded from the count.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
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