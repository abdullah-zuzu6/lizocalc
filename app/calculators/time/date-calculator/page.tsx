import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import DateCalculatorClient from "./clientside";
import DaysFromTodayWidget from "@/components/DaysFromTodayWidget";
import Image from "next/image";

// ─────────────────────────────────────────────
//  FAQ DATA  (simplified wording, kept keyword coverage)
// ─────────────────────────────────────────────
const faqData = [
  {
    question: "What is 90 days from today?",
    answer:
      "It depends on today's date, so the calculator above works it out for you automatically. For example: 90 days from March 23, 2026 lands on June 21, 2026 (a Sunday). 90 days from March 31, 2026 lands on June 29, 2026 (a Monday). If you want an exact answer for your own date, just type it into the 'Add Days' box above.",
  },
  {
    question: "What is 60 days from today?",
    answer:
      "This changes every day, so here are a few quick examples: 60 days from March 23, 2026 is May 22, 2026 (Friday). 60 days from March 31, 2026 is May 30, 2026 (Saturday). Type your own start date into the calculator above for an instant answer.",
  },
  {
    question: "What is 28 days from today?",
    answer:
      "28 days is exactly 4 weeks. For example, 28 days from March 23, 2026 is April 20, 2026 (Monday). This is a common time frame for things like monthly bills, prescription refills, or a 4-week work sprint.",
  },
  {
    question: "How do I calculate the number of days between two dates?",
    answer:
      "Subtract the earlier date from the later date. For example, from January 1 to January 10 is 9 days. If you want to count both the first and last day (say, for a rent period or a legal notice), just add 1 to that number. The calculator above does this for you and also shows the answer in years, months, and weeks.",
  },
  {
    question: "How can I add or subtract days from a specific date?",
    answer:
      "Switch to 'Add/Subtract Days' mode above. Enter your starting date, choose Add or Subtract, then enter how many days, weeks, months, or years. The tool follows the real calendar — so adding 1 month to January 31 correctly gives February 28 (or 29 in a leap year), not March 2.",
  },
  {
    question: "What is the difference between calendar days and business days?",
    answer:
      "Calendar days count every day, including weekends. Business days only count weekdays (Monday to Friday) and skip weekends and holidays. As a rough example, a 90-day period usually works out to around 64 business days once you remove the weekends.",
  },
  {
    question: "How does the date calculator handle leap years?",
    answer:
      "It follows the same rule your calendar does: a year is a leap year if it divides evenly by 4, unless it also divides by 100 — in which case it's only a leap year if it also divides by 400. So 2024 is a leap year, 1900 was not, and 2000 was. If your date range crosses February 29, the calculator counts that extra day correctly.",
  },
];

// ─────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: "Date to Date Calculator  — Days Between Dates, 90/60/30 Days From Today",
  description:
    "Free date calculator: find days between two dates, calculate 90, 60, 45, 30, or 28 days from any date, or count days since a past event. Instant results with leap year accuracy.",
  keywords: [
    "date calculator",
    "days between dates",
    "90 days from today",
    "180 days from today",
    "60 days from today",
    "30 days from today",
    "28 days from today",
    "days from date calculator",
    "date difference calculator",
    "how many days since",
    "add days to date",
    "subtract days from date",
    "date to date calculator",
    "calendar day counter",
    "business days calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/date-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Date Calculator — Days Between Dates & Days From Today | LizoCalc",
    description:
      "Calculate the exact number of days between two dates, find 90/60/30 days from any date, or count days since a past event. Free, instant, leap-year accurate.",
    url: "https://www.lizocalc.com/calculators/time/date-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Date Calculator — 90/60/30 Days From Today & Date Difference",
    description:
      "Instantly find 90, 60, 45, or 30 days from any date — or calculate the exact days between two dates. Free tool with full Gregorian calendar logic.",
  },
};

// ─────────────────────────────────────────────
//  STRUCTURED DATA (kept out of the render path)
// ─────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Date Calculator", item: "https://www.lizocalc.com/calculators/time/date-calculator" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#author",
      name: "Rana Muhammad Abdullah",
      url: "https://www.lizocalc.com/about",
      jobTitle: "MERN Stack Developer & Tool Maker",
      description: "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
      knowsAbout: ["Date Calculation", "Calendar Logic", "Day Counters", "Web Development", "Mechatronics"],
      sameAs: [
        "https://github.com/abdullah-zuzu6",
        "https://www.linkedin.com/in/abdullahsajjad06/",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://www.lizocalc.com/#org",
      name: "LizoCalc",
      url: "https://www.lizocalc.com",
      logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      foundingDate: "2026",
      founder: { "@id": "https://www.lizocalc.com/#author" },
      sameAs: [
        "https://github.com/abdullah-zuzu6",
        "https://www.linkedin.com/in/abdullahsajjad06/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      publisher: { "@id": "https://www.lizocalc.com/#org" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator",
      url: "https://www.lizocalc.com/calculators/time/date-calculator",
      name: "Date to Date Calculator — Days Between Dates, 90/60/30 Days From Today",
      description: "Free date calculator: find days between two dates, calculate 90, 60, 45, 30, or 28 days from any date, or count days since a past event.",
      inLanguage: "en",
      datePublished: "2026-04-04",
      dateModified: "2026-05-01",
      about: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app" },
      mainEntity: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app" },
      primaryImageOfPage: { "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image" },
      author: { "@id": "https://www.lizocalc.com/#author" },
      publisher: { "@id": "https://www.lizocalc.com/#org" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator#breadcrumb" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator#app",
      name: "Date Calculator",
      url: "https://www.lizocalc.com/calculators/time/date-calculator",
      description: "Calculate days between two dates, add or subtract days from any date, find 90/60/30 days from today, and count days since past events.",
      image: { "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image" },
      mainEntityOfPage: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator" },
      applicationCategory: "UtilityApplication",
      applicationSubCategory: "Date & Calendar Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      softwareVersion: "1.0",
      datePublished: "2026-04-04",
      dateModified: "2026-05-01",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate days between two dates",
        "Add or subtract days, weeks, months, years from any date",
        "Find 90, 60, 45, 30, 28 days from today automatically",
        "Count days since a past date",
        "Inclusive and exclusive day counting toggle",
        "Leap year accurate Gregorian calendar logic",
        "Business days (weekdays) counter",
        "Completely free with no ads",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@id": "https://www.lizocalc.com/#org" },
      potentialAction: {
        "@type": "UseAction",
        target: "https://www.lizocalc.com/calculators/time/date-calculator",
      },
    },
    {
      "@type": "HowTo",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator#howto",
      name: "How to Calculate Days Between Two Dates",
      image: { "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image" },
      isPartOf: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator" },
      description: "Step-by-step guide to finding the exact number of days between any two dates using LizoCalc Date Calculator.",
      totalTime: "PT1M",
      step: [
        { "@type": "HowToStep", position: 1, name: "Select the mode", text: "Choose 'Days Between Dates' to find a duration, or 'Add/Subtract Days' to find a future or past date." },
        { "@type": "HowToStep", position: 2, name: "Enter your start date", text: "Click the date picker or type your start date in MM/DD/YYYY format." },
        { "@type": "HowToStep", position: 3, name: "Enter your end date or number of days", text: "For duration mode, pick your end date. For add/subtract mode, enter the number of days, weeks, months, or years." },
        { "@type": "HowToStep", position: 4, name: "Read instant results", text: "Results appear immediately showing total days, weeks, months, years breakdown, and the day of the week for any result date." },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.lizocalc.com/calculators/time/date-calculator#faq",
      isPartOf: { "@id": "https://www.lizocalc.com/calculators/time/date-calculator" },
      mainEntity: (faqData || []).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "ImageObject",
      "@id": "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp#image",
      url: "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp",
      name: "Date Calculator — Days Between Dates Interface with 30, 60 and 90 Days From Today Buttons",
      caption:
        "LizoCalc Date Calculator showing a Starting Date calendar (green pin) and an Ending Date calendar (blue pin) connected by a double-headed arrow labeled Days Between Dates, with quick-select buttons for 30 Days, 60 Days, and 90 Days From Today.",
      description:
        "Flat-design infographic of the LizoCalc Date Calculator interface — illustrating how to find days between two dates using a start and end calendar picker, with quick buttons for the most searched periods: 30, 60, and 90 days from today.",
      width: 1390,
      height: 783,
      contentUrl: "https://www.lizocalc.com/images/time/date-calculator-days-between-dates.webp",
      encodingFormat: "image/webp",
    },
  ],
};

// ─────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────
export default function DateCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Plain <script> tag instead of next/script "beforeInteractive" —
          this JSON never blocks paint or hydration, it's only for crawlers. */}
      <script
        id="structured-data-date-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Date Calculator: Days Between Dates, Add Days &amp; Days From Today
          </h1>
        </div>
      </section>

      {/* ─── Calculator Tool ─── */}
      <section className="px-4 py-8">
        <DateCalculatorClient />
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-white">
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: Days From Today &amp; Date Calculator
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To find a future or past date, just add or subtract the days from today. For example,
            if today is April 24 and you need to know <strong>90 days from today</strong>, the
            calculator above works it out the moment you click Calculate — same for{" "}
            <strong>60 days from today</strong> or <strong>30 days from today</strong>.
            <br /><br />
            You can also find the <strong>exact number of days between two dates</strong>, like how
            many days are left until a deadline, or work out a date like{" "}
            <em>"45 days from March 10"</em>. Just type in your start date and the number of days.
          </p>
        </div>
      </section>

      {/* ─── Dynamic "X Days From Today" Widget ─── */}
      <DaysFromTodayWidget />

      {/* ═══════════════════════════════════════
          ARTICLE
      ═══════════════════════════════════════ */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-4 text-lg">
          A <strong>date calculator</strong> answers a simple question in different forms: how many
          days are between two dates, or what date do you land on if you add or subtract a number of
          days? People use it for a lot of everyday things — checking a{" "}
          <strong>visa deadline</strong>, working out a <strong>90-day tax window</strong>, or just
          finding out <strong>how many days since</strong> something happened, like a wedding or a
          job start date.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          This tool is free, needs no sign-up, and works on any phone or computer. It handles the
          tricky parts automatically — leap years, months with different lengths, all of it — so you
          don't have to count on your fingers or double-check with a paper calendar. It's built for
          everyday people: students counting days to an exam, freelancers tracking a contract
          deadline, or anyone who just typed <em>"what is 90 days from today"</em> into Google.
        </p>

        <figure className="my-10">
          <Image
            src="/images/time/date-calculator-days-between-dates.webp"
            alt="Date calculator interface showing Starting Date and Ending Date calendars with a double-headed arrow labeled Days Between Dates, and quick buttons for 30 Days, 60 Days, and 90 Days From Today"
            width={1390}
            height={783}
            className="rounded-2xl border border-gray-700 shadow-xl w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
          <figcaption className="text-sm text-gray-300 text-center mt-3 italic">
            <strong>Figure 1:</strong> Pick a Starting Date and Ending Date to see the exact days
            between them, or use the quick buttons for 30, 60, or 90 days from today.
          </figcaption>
        </figure>

        {/* ══════════════════════════════════════════════
            SECTION 1 — DAYS BETWEEN DATES
        ══════════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Days Between Two Dates
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Pick a start date and an end date and the calculator gives you the exact number of days
            between them — plus a breakdown in years, months, weeks, and a plain day count. For
            example, from January 1, 2026 to April 24, 2026 is 113 days, or about 3 months and 23
            days.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">From Date</th>
                  <th className="p-4 text-left font-semibold">To Date</th>
                  <th className="p-4 text-left font-semibold">Total Days</th>
                  <th className="p-4 text-left font-semibold">Weeks</th>
                  <th className="p-4 text-left font-semibold">Y / M / D</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["15 Mar 2000", "24 Apr 2026", "9,537", "1,362.43", "26y 1m 9d"],
                  ["1 Jan 2026", "24 Apr 2026", "113", "16.14", "0y 3m 23d"],
                  ["23 Mar 2026", "24 Apr 2026", "32", "4.57", "0y 1m 1d"],
                  ["1 Apr 2025", "24 Apr 2026", "388", "55.43", "1y 0m 23d"],
                ].map(([from, to, days, weeks, ymd]) => (
                  <tr key={from + to}>
                    <td className="p-4">{from}</td>
                    <td className="p-4">{to}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4">{weeks}</td>
                    <td className="p-4">{ymd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Should You Count the Last Day or Not?
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-2">Exclusive (Default)</h4>
              <p className="text-gray-200 text-sm">March 23 → March 25 = <strong>2 days</strong><br />You don't count the last day. This is how most software and timestamps count.</p>
            </div>
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-2">Inclusive (Real-life)</h4>
              <p className="text-gray-200 text-sm">March 23 → March 25 = <strong>3 days</strong><br />Both the first and last day count. This is how rent, notice periods, and contracts are usually counted.</p>
            </div>
          </div>
          <p className="text-gray-200 text-sm">
            Flip the "Include end day" switch in the calculator to choose which one you need. Most
            real-life deadlines — like a legal notice or a rental period — use the inclusive count.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2 — 90 / 180 / 60 / 45 / 30 / 28 DAYS FROM DATE
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            90, 180, 60, 45, 30 &amp; 28 Days From a Date
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Most people land on this page wanting one specific answer, like "what's 90 days from
            March 23?" Here's a quick lookup table with the most common ones, worked out using the
            real calendar — no rounding or guessing.
          </p>

          <div className="overflow-x-auto mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Query</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">Days</th>
                  <th className="p-4 text-left font-semibold">Result Date</th>
                  <th className="p-4 text-left font-semibold">Day of Week</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["90 days from 3/23/26", "Mar 23, 2026", "90", "Jun 21, 2026", "Sunday"],
                  ["180 days from 3/23/26", "Mar 23, 2026", "180", "Sep 19, 2026", "Saturday"],
                  ["60 days from 3/23/26", "Mar 23, 2026", "60", "May 22, 2026", "Friday"],
                  ["56 days from 3/20/26", "Mar 20, 2026", "56", "May 15, 2026", "Friday"],
                  ["90 days from 3/31/26", "Mar 31, 2026", "90", "Jun 29, 2026", "Monday"],
                  ["60 days from 3/31/26", "Mar 31, 2026", "60", "May 30, 2026", "Saturday"],
                  ["45 days from 3/31/26", "Mar 31, 2026", "45", "May 15, 2026", "Friday"],
                  ["90 days from 4/20/26", "Apr 20, 2026", "90", "Jul 19, 2026", "Sunday"],
                  ["90 days from 5/7/26", "May 7, 2026", "90", "Aug 5, 2026", "Wednesday"],
                  ["180 days from 5/7/26", "May 7, 2026", "180", "Nov 3, 2026", "Tuesday"],
                  ["45 days before 5/7/26", "May 7, 2026", "−45", "Mar 23, 2026", "Monday"],
                  ["90 days from 5/22/26", "May 22, 2026", "90", "Aug 20, 2026", "Thursday"],
                  ["60 days before 5/22/26", "May 22, 2026", "−60", "Mar 23, 2026", "Monday"],
                  ["180 days from 4/30/2026", "Apr 30, 2026", "180", "Oct 27, 2026", "Tuesday"],
                  ["60 days prior to 4/30/26", "Apr 30, 2026", "−60", "Mar 1, 2026", "Sunday"],
                  ["180 days from 04/13/2026", "Apr 13, 2026", "180", "Oct 10, 2026", "Saturday"],
                  ["90 days from 4/1/2025", "Apr 1, 2025", "90", "Jun 30, 2025", "Monday"],
                  ["45 days from 4/1/25", "Apr 1, 2025", "45", "May 16, 2025", "Friday"],
                  ["90 days from 6/30/2025", "Jun 30, 2025", "90", "Sep 28, 2025", "Sunday"],
                  ["90 days before 5/30/26", "May 30, 2026", "−90", "Mar 1, 2026", "Sunday"],
                  ["90 days before 6/29/26", "Jun 29, 2026", "−90", "Mar 31, 2026", "Tuesday"],
                ].map(([query, start, days, result, dow]) => (
                  <tr key={query}>
                    <td className="p-4 font-semibold text-yellow-300 text-xs">{query}</td>
                    <td className="p-4 text-gray-300">{start}</td>
                    <td className="p-4 text-gray-300">{days}</td>
                    <td className="p-4 font-bold text-green-400">{result}</td>
                    <td className="p-4 text-gray-300">{dow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3 — DAYS SINCE
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Days Since a Past Date
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Want to know how long ago something happened? Set your start date to the past event and
            the end date to today. It works well for tracking anniversaries, how long you've had a
            subscription, or how many days it's been since a specific milestone.
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Past Event</th>
                  <th className="p-4 text-left font-semibold">Start Date</th>
                  <th className="p-4 text-left font-semibold">Days Since (as of Apr 24, 2026)</th>
                  <th className="p-4 text-left font-semibold">Weeks</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["New Year 2026", "Jan 1, 2026", "113", "16.14"],
                  ["Pakistan Day", "Mar 23, 2026", "32", "4.57"],
                  ["Eid-ul-Fitr 2025", "Apr 1, 2025", "388", "55.43"],
                  ["Independence Day 2025", "Aug 14, 2025", "253", "36.14"],
                  ["New Year 2025", "Jan 1, 2025", "478", "68.29"],
                ].map(([event, start, days, weeks]) => (
                  <tr key={event}>
                    <td className="p-4">{event}</td>
                    <td className="p-4">{start}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4 text-gray-300">{weeks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4 — HOW IT WORKS
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How the Calculator Works
          </h2>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Finding the Days Between Two Dates
          </h3>
          <p className="text-gray-200 text-sm mb-3">
            It takes the two dates, converts them into a raw time value, and finds the difference in
            whole days. In plain terms: it's the same as counting every square on a calendar between
            the two dates.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4 mt-8">
            Turning Days Into Weeks, Months, and Years
          </h3>
          <p className="text-gray-200 text-sm mb-3">
            Once it has the total number of days, it divides that by 7 for weeks, and uses the real
            length of each month (28 to 31 days) to work out an accurate years/months/days
            breakdown — not just a rough average.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4 mt-8">
            Leap Years, Handled Automatically
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Year</th>
                  <th className="p-4 text-left font-semibold">Leap Year?</th>
                  <th className="p-4 text-left font-semibold">Why</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["2024", "✅ Yes", "Divides evenly by 4"],
                  ["2025", "❌ No", "Regular 365-day year"],
                  ["2026", "❌ No", "Regular 365-day year"],
                  ["2028", "✅ Yes", "Divides evenly by 4"],
                  ["1900", "❌ No", "Divides by 100 but not by 400"],
                  ["2000", "✅ Yes", "Divides by 400"],
                ].map(([y, l, r]) => (
                  <tr key={y}>
                    <td className="p-4 font-bold">{y}</td>
                    <td className="p-4">{l}</td>
                    <td className="p-4 text-gray-300">{r}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Adding Days Across Different Month Lengths
          </h3>
          <p className="text-gray-200 text-sm mb-2">
            For example: January 31 plus 1 month lands on February 28 (or 29 in a leap year) —
            not March 2. And April 30 plus 1 month lands on May 30, not May 31.
          </p>
          <p className="text-gray-300 text-sm">
            The calculator follows the real calendar month by month, instead of just adding "30
            days" every time — so the result is always correct, no matter which months are involved.
          </p>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5 — REAL-WORLD USES
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where 90, 180, 60 &amp; 30-Day Windows Show Up in Real Life
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "🛂",
                title: "Visa Stay Limits",
                body: "Many tourist visas allow you to stay for up to 90 days. Even one extra day can mean a fine. Use the calculator to work out your exact exit date from the day you arrived."
              },
              {
                icon: "📋",
                title: "180-Day Filing Deadlines",
                body: "Some tax and company filings give you 180 days from a set date — for example, from the end of the financial year."
              },
              {
                icon: "🏥",
                title: "Follow-Up Appointments",
                body: "Doctors often ask you to come back in 30, 60, or 90 days for a check-up or to renew a prescription."
              },
              {
                icon: "⚖️",
                title: "Legal Deadlines",
                body: "Notice periods and appeal windows are usually counted in exact days — courts don't accept 'about 3 months', they want the real number."
              },
              {
                icon: "💼",
                title: "Job Probation Periods",
                body: "A new employee's 60, 90, or 180-day probation period decides when they become eligible for full benefits."
              },
              {
                icon: "💳",
                title: "Banking Deadlines",
                body: "Things like cheque validity (usually 180 days) or a billing cycle (about 28 to 30 days) depend on exact date math."
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700">
                <h3 className="text-base font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>{icon}</span> {title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6 — WEEKS & MONTHS TABLE
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference: Days, Weeks &amp; Weekdays
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            If you think in weeks or months instead of raw day counts, here's a simple lookup table
            for the most common durations:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Duration</th>
                  <th className="p-4 text-left font-semibold">Total Days</th>
                  <th className="p-4 text-left font-semibold">Full Weeks</th>
                  <th className="p-4 text-left font-semibold">Weekdays</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["28 days (4 weeks)", "28", "4", "~20"],
                  ["30 days (1 month)", "30", "4.29", "~22"],
                  ["45 days", "45", "6.43", "~32"],
                  ["60 days (2 months)", "60", "8.57", "~43"],
                  ["90 days (3 months)", "90", "12.86", "~65"],
                  ["180 days (6 months)", "180", "25.71", "~130"],
                  ["365 days (1 year)", "365", "52.14", "~261"],
                ].map(([d, td, fw, wd]) => (
                  <tr key={d}>
                    <td className="p-4 font-semibold text-blue-300">{d}</td>
                    <td className="p-4">{td}</td>
                    <td className="p-4">{fw}</td>
                    <td className="p-4 text-green-400">{wd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 7 — INTERNAL LINKS
        ══════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
            More Free Time &amp; Date Tools
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link href="/calculators/time/age-calculator" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
                Age Calculator
              </Link>{" "}
              — your exact age in years, months, and days, plus total days lived
            </li>
            <li>
              <Link href="/calculators/time/hours-calculator" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
                Hours Calculator
              </Link>{" "}
              — time between two clock times, and decimal hours for payroll
            </li>
            <li>
              <Link href="/calculators/time/time-calculator" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
                Time Calculator
              </Link>{" "}
              — convert between hours, minutes, and seconds
            </li>
          </ul>

          <p className="text-gray-200 italic text-center mt-16 text-lg font-medium leading-relaxed">
            Never miscalculate a deadline again — whether it's a visa window, an exam date, a legal
            notice, or a project milestone, LizoCalc's Date Calculator gets it right every time.
          </p>
        </section>

        {/* ── BYLINE ── */}
        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-300 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp;
              Control Engineering Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-300">
            <span>📅 Published: Apr 4, 2026</span>
            <span>🔄 Updated: May 01, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>

      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}