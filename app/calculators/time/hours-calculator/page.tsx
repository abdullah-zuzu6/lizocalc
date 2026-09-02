import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import HoursCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";
import AuthorBio from "@/components/AuthorBio";


const faqData = [
  {
    question: "How do I calculate the number of hours between two times?",
    answer:
      "Subtract the start time from the end time. 9:00 AM to 5:30 PM is 8 hours 30 minutes. If the end time is earlier than the start time, such as a night shift running from 10:00 PM to 6:00 AM, treat the end time as landing the next day: add 24 hours to it before subtracting. This calculator handles that automatically, so you can enter either a same-day or overnight pair of times without doing the adjustment yourself.",
  },
  {
    question: "How do I convert minutes into decimal hours?",
    answer:
      "Divide the minutes by 60 and add the result to the whole hours. 45 minutes is 45 ÷ 60 = 0.75, so 6 hours 45 minutes becomes 6.75. The mistake people make most often is reading the minutes straight off the clock, 30 minutes as 0.30 rather than 0.50. That 0.20 gap sounds small until it's multiplied by an hourly rate across a month of timesheets.",
  },
  {
    question: "Why is 7:30 equal to 7.50 hours and not 7.30?",
    answer:
      "Because an hour has 60 minutes, not 100. Converting 30 minutes to a decimal means 30 ÷ 60, which is 0.50, not 0.30. The same logic applies to any minute value: 15 minutes is 0.25, 20 minutes is about 0.33, 45 minutes is 0.75. Treating the minutes as if the clock ran on a 100-minute hour is the single most common error in manual payroll math.",
  },
  {
    question: "How do I calculate overtime hours?",
    answer:
      "In most standard workweeks, overtime is whatever's worked beyond 40 hours: Total Hours − 40 = Overtime Hours. Someone who logs 46.5 hours in a week has 6.5 hours of overtime. Overtime rules and pay multipliers vary by country, industry, and employment contract, so check your specific agreement for the rate that applies once you have the hour count.",
  },
  {
    question: "How do I find a percentage of a number of hours?",
    answer:
      "Multiply the hours by the percentage as a decimal. 75% of 8 hours is 8 × 0.75 = 6 hours. To convert that decimal result back into hours and minutes, take the fractional part and multiply by 60: 0.4 hours × 60 = 24 minutes, so 8.4 hours is 8 hours 24 minutes. This comes up often in attendance tracking and partial-day pay calculations.",
  },
  {
    question: "How many hours are in a month or a year?",
    answer:
      "It depends on the length of the month or year. A month runs from 672 hours (28 days) to 744 hours (31 days), averaging around 730.5. A year is 8,760 hours in a regular 365-day year or 8,784 hours in a 366-day leap year, averaging about 8,766.",
  },
  {
    question: "What's the difference between total hours and decimal hours?",
    answer:
      "Total hours is a whole number, the number of complete 60-minute blocks in the span, with any leftover minutes dropped. Decimal hours keeps that leftover time as a fraction, so 8 hours 30 minutes shows as a total of 8 whole hours but as 8.50 decimal hours. Payroll and invoicing systems almost always want the decimal figure, since it can be multiplied directly by an hourly rate.",
  },
  {
    question: "Can I share a calculated result with someone else?",
    answer:
      "Yes. Once you've calculated a result, hit \"Copy Link\" under Share This Result. That link carries your exact start and end times (or dates, in Dates & Times mode), so anyone who opens it sees the same result without re-entering anything.",
  },
];

export const metadata: Metadata = {
  title: "Hours Calculator – Find the Exact Time Between Two Times",
  description:
    "Free hours calculator. Find the exact duration between two times or two full dates, with decimal hours, total minutes, and overnight shift support.",

  keywords: [
    "hours calculator",
    "time difference calculator",
    "calculate hours between times",
    "duration calculator",
    "shift hours calculator",
    "decimal hours converter",
    "hours between two dates",
    "overtime calculator",
    "percentage of hours calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/hours-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hours Calculator – Find the Exact Time Between Two Times | LizoCalc",
    description:
      "Find the exact duration between two times or two full dates, with decimal hours, total minutes, and overnight shift support.",
    url: "https://www.lizocalc.com/calculators/time/hours-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hours Calculator | LizoCalc",
    description:
      "Free hours calculator with decimal hours, total minutes, and support for shifts that cross midnight or span multiple days.",
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
      "@id": "https://www.lizocalc.com/calculators/time/hours-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Hours Calculator", item: "https://www.lizocalc.com/calculators/time/hours-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/hours-calculator",
      url: "https://www.lizocalc.com/calculators/time/hours-calculator",
      name: "Hours Calculator – Find the Exact Time Between Two Times | LizoCalc",
      description:
        "Free hours calculator. Find the exact duration between two times or two full dates, with decimal hours, total minutes, and overnight shift support.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-08-31",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/hours-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
  ],
};
const tocItems = [
  { id: "what-is-hours-calculator", label: "What is an hour ?" },
  { id: "how-hours-are-calculated", label: "How Hours Between Two Times Are Calculated" },
  { id: "hours-in-different-periods", label: "Whart are hours in different time periods ?" },
  { id: "decimal-hours-conversion", label: "Converting Minutes to Decimal Hours" },
  { id: "overtime-and-percentages", label: "Overtime and Percentages of Hours" },
  { id: "percentage-examples", label: "Some Examples" },
  { id: "total-hours-table", label: "Total Hours Between Two Times" },
];

const timePeriodsTable = [
  { description: "Hours in a day", hours: ["24"] },
  { description: "Hours in a week", hours: ["168"] },
  {
    description: "Hours in a month",
    hours: [
      "672 h is equal to 28-day month",
      "696 h is equal to 29-day month",
      "720 h is equal to 30-day month",
      "744 h is equal to 31-day month",
      "730.5 h on average",
    ],
  },
  {
    description: "Hours in a year",
    hours: ["8,760 h for a 365-day year", "8,784 h for a 366-day year", "8,766 h on average"],
  },
  {
    description: "Hours in a decade",
    hours: [
      "87,648 h  for a 2-leap-year decade",
      "87,672 h for a 3-leap-year decade",
      "87,660 h on average",
    ],
  },
  { description: "Hours in a century", hours: ["876,600"] },
];

const decimalTable = [
  { minutes: "5 min", decimal: "0.08" },
  { minutes: "10 min", decimal: "0.17" },
  { minutes: "15 min", decimal: "0.25" },
  { minutes: "20 min", decimal: "0.33" },
  { minutes: "30 min", decimal: "0.50" },
  { minutes: "36 min", decimal: "0.60" },
  { minutes: "45 min", decimal: "0.75" },
  { minutes: "50 min", decimal: "0.83" },
];

// 4-column layout: two "Examples / Total Time" pairs side by side
const percentageExampleRows = [
  { leftExample: "70% of 3 hours", leftTotal: "2 hours 6 minutes", rightExample: "85% of 5 hours", rightTotal: "4 hours 15 minutes" },
  { leftExample: "70% of 4 hours", leftTotal: "2 hours 48 minutes", rightExample: "85% of 6 hours", rightTotal: "5 hours 6 minutes" },
  { leftExample: "70% of 5 hours", leftTotal: "3 hours 30 minutes", rightExample: "85% of 7 hours", rightTotal: "5 hours 57 minutes" },
  { leftExample: "70% of 6 hours", leftTotal: "4 hours 12 minutes", rightExample: "85% of 8 hours", rightTotal: "6 hours 48 minutes" },
  { leftExample: "70% of 7 hours", leftTotal: "4 hours 54 minutes", rightExample: "85% of 12 hours", rightTotal: "10 hours 12 minutes" },
  { leftExample: "70% of 7.5 hours", leftTotal: "5 hours 15 minutes", rightExample: "94% of 2 hours", rightTotal: "1 hour 52 minutes 48 seconds" },
  { leftExample: "70% of 8 hours", leftTotal: "5 hours 36 minutes", rightExample: "94% of 3 hours", rightTotal: "2 hours 49 minutes 12 seconds" },
  { leftExample: "70% of 12 hours", leftTotal: "8 hours 24 minutes", rightExample: "94% of 4 hours", rightTotal: "3 hours 45 minutes 36 seconds" },
  { leftExample: "80% of 7.5 hours", leftTotal: "6 hours", rightExample: "94% of 5 hours", rightTotal: "4 hours 42 minutes" },
  { leftExample: "84% of 4 hours", leftTotal: "3 hours 21 minutes 36 seconds", rightExample: "94% of 6 hours", rightTotal: "5 hours 38 minutes 24 seconds" },
  { leftExample: "84% of 6 hours", leftTotal: "5 hours 2 minutes 24 seconds", rightExample: "94% of 7 hours", rightTotal: "6 hours 34 minutes 48 seconds" },
  { leftExample: "84% of 7 hours", leftTotal: "5 hours 52 minutes 48 seconds", rightExample: "94% of 8 hours", rightTotal: "7 hours 31 minutes 12 seconds" },
  { leftExample: "84% of 8 hours", leftTotal: "6 hours 43 minutes 12 seconds", rightExample: "94% of 12 hours", rightTotal: "11 hours 16 minutes 48 seconds" },
  { leftExample: "84% of 15 hours", leftTotal: "12 hours 36 minutes", rightExample: "94% of 15 hours", rightTotal: "14 hours 6 minutes" },
];

// 6-column layout: two "Start / End / Total" triples side by side
const totalHoursRows = [
  { lStart: "7:00 AM", lEnd: "2:00 PM", lTotal: "7 hours", rStart: "9:00 AM", rEnd: "7:00 PM", rTotal: "10 hours" },
  { lStart: "7:00 AM", lEnd: "3:00 PM", lTotal: "8 hours", rStart: "9:00 AM", rEnd: "8:00 PM", rTotal: "11 hours" },
  { lStart: "7:00 AM", lEnd: "4:00 PM", lTotal: "9 hours", rStart: "10:00 AM", rEnd: "4:00 PM", rTotal: "6 hours" },
  { lStart: "7:00 AM", lEnd: "5:00 PM", lTotal: "10 hours", rStart: "10:00 AM", rEnd: "5:00 PM", rTotal: "7 hours" },
  { lStart: "7:00 AM", lEnd: "6:00 PM", lTotal: "11 hours", rStart: "10:00 AM", rEnd: "6:00 PM", rTotal: "8 hours" },
  { lStart: "8:00 AM", lEnd: "3:00 PM", lTotal: "7 hours", rStart: "10:00 AM", rEnd: "7:00 PM", rTotal: "9 hours" },
  { lStart: "8:00 AM", lEnd: "4:00 PM", lTotal: "8 hours", rStart: "10:00 AM", rEnd: "8:00 PM", rTotal: "10 hours" },
  { lStart: "8:00 AM", lEnd: "5:00 PM", lTotal: "9 hours", rStart: "11:00 AM", rEnd: "5:00 PM", rTotal: "6 hours" },
  { lStart: "8:00 AM", lEnd: "6:00 PM", lTotal: "10 hours", rStart: "11:00 AM", rEnd: "6:00 PM", rTotal: "7 hours" },
  { lStart: "8:00 AM", lEnd: "7:00 PM", lTotal: "11 hours", rStart: "11:00 AM", rEnd: "7:00 PM", rTotal: "8 hours" },
  { lStart: "9:00 AM", lEnd: "3:00 PM", lTotal: "6 hours", rStart: "11:00 AM", rEnd: "8:00 PM", rTotal: "9 hours" },
  { lStart: "9:00 AM", lEnd: "4:00 PM", lTotal: "7 hours", rStart: "12:00 PM", rEnd: "5:00 PM", rTotal: "5 hours" },
  { lStart: "9:00 AM", lEnd: "5:00 PM", lTotal: "8 hours", rStart: "12:00 PM", rEnd: "6:00 PM", rTotal: "6 hours" },
  { lStart: "9:00 AM", lEnd: "6:00 PM", lTotal: "9 hours", rStart: "12:00 PM", rEnd: "7:00 PM", rTotal: "7 hours" },
  { lStart: "9:00 AM", lEnd: "7:00 PM", lTotal: "10 hours", rStart: "12:00 PM", rEnd: "8:00 PM", rTotal: "8 hours" },
];

export default function HoursPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-hours-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Hours Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find the exact duration between two times in hours , minutes and decimal hours.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HoursCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          An <strong>hours calculator</strong> works out the exact gap
          between a start time and an end time, in hours, minutes, and
          decimal format. Use Time Only mode for a same-day or overnight
          shift, or switch to Dates &amp; Times mode when the span crosses
          more than one day.
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

        {/* What is an hour */}
        <section id="what-is-hours-calculator" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is an hour?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            An hour is a unit of time used to measure how long something takes. One hour has 60 minutes, and each minute has 60 seconds. This means one hour contains 3,600 seconds.

We use hours every day to talk about time and duration. For example, you might work for 8 hours, sleep for 7 hours, travel for 3 hours, or wait for 2 hours.

An hour is also one of the main parts of a day. A full day has 24 hours. The first 12 hours are usually written as AM, from midnight until noon, while the next 12 hours are written as PM, from noon until midnight.
          </p>
         
        </section>

        {/* How hours are calculated */}
        <section id="how-hours-are-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Hours Between Two Times Are Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            For a same-day span, it's a direct subtraction. 9:00 AM to 5:30
            PM is 8 hours 30 minutes, no adjustment needed.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              When the shift crosses midnight:
            </h3>
            <p className="text-gray-200 leading-relaxed mb-3 text-base">
              A night shift running from 10:00 PM to 6:00 AM can't be
              subtracted directly, since 6:00 AM comes before 10:00 PM on
              the clock. The fix is to treat the end time as landing on
              the next day by adding 24 hours before subtracting:
            </p>
            <p className="text-gray-200 font-mono text-base">
              (6:00 AM + 24h) − 10:00 PM = 8 hours
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            This calculator applies that adjustment automatically whenever
            the end time you enter is earlier than the start time, so
            overnight shifts don't need any special handling on your end.
          </p>
        </section>

        {/* Hours in different time periods */}
        <section id="hours-in-different-periods" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Whart are hours in different time periods ?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Description
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {timePeriodsTable.map((row, index) => (
                  <tr key={row.description} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium align-top">
                      {row.description}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.hours.map((line, i) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Decimal hours conversion */}
        <section id="decimal-hours-conversion" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Converting Minutes to Decimal Hours
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Divide the minutes by 60 and add the result to the whole
            hours. 6 hours 36 minutes becomes 6 + (36 ÷ 60) = 6.60. The
            error that trips people up most: reading the minutes straight
            off the clock, treating 30 minutes as 0.30 instead of 0.50,
            because an hour has 60 minutes, not 100.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-6">
            <table className="w-full text-left border-collapse min-w-[320px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Minutes
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Decimal Hours
                  </th>
                </tr>
              </thead>
              <tbody>
                {decimalTable.map((row, index) => (
                  <tr key={row.minutes} className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-medium">
                      {row.minutes}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.decimal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Going the other way, from a decimal back to a clock time,
            works the same in reverse: multiply the fractional part by 60.
            9.167 hours is 9 whole hours plus 0.167 × 60 ≈ 10 minutes, so
            9 hours 10 minutes. This calculator gives you both directions
            at once, so neither conversion needs to be done by hand.Use{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200 font-semibold"
            >
              business days calculator
            </Link>{" "}
            to find working daye between two dates.
          </p>
        </section>

        {/* Overtime and percentages */}
        <section id="overtime-and-percentages" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Overtime and Percentages of Hours
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            In most standard workweeks, overtime is whatever's worked past
            40 hours:
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            Total Hours − 40 = Overtime Hours
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Someone who logs 46.5 hours in a week has 6.5 hours of
            overtime. Overtime thresholds and pay multipliers vary by
            country, industry, and contract, so check your specific
            agreement for the rate once you have the hour count.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A related calculation, less common but still frequent in
            attendance and partial-day pay records, is finding a
            percentage of a number of hours. Multiply the hours by the
            percentage as a decimal:
          </p>
          <p className="text-gray-200 font-mono text-lg">
            8 hours × 0.75 = 6 hours (75% of 8 hours)
          </p>
        </section>

        {/* Some examples table - 4 columns */}
        <section id="percentage-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Some examples are given in below table
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Examples</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Time</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Examples</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Time</th>
                </tr>
              </thead>
              <tbody>
                {percentageExampleRows.map((row, index) => (
                  <tr
                    key={`${row.leftExample}-${row.rightExample}`}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-semibold">{row.leftExample}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-semibold">{row.leftTotal}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-semibold">{row.rightExample}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800 font-semibold">{row.rightTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Total hours between two times - 6 columns */}
        <section id="total-hours-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Total hours between two times
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Start Time</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">End Time</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Hours</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Start Time</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">End Time</th>
                  <th className="p-3 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {totalHoursRows.map((row, index) => (
                  <tr
                    key={`${row.lStart}-${row.lEnd}-${row.rStart}-${row.rEnd}`}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.lStart}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.lEnd}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.lTotal}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.rStart}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.rEnd}</td>
                    <td className="p-3 text-sm sm:text-base text-gray-200 border-b border-gray-800">{row.rTotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
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