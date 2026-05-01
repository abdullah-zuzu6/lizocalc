import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import HoursCalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "How do I calculate total hours worked in a day?",
    answer:
      "To find your daily total, subtract your start time from your end time and then subtract any unpaid break duration. For example, if you start at 8:30 AM and finish at 5:00 PM with a 30-minute lunch break: (5:00 PM - 8:30 AM) = 8 hours 30 minutes. Subtracting the 30-minute break leaves you with exactly 8.00 hours worked.",
  },
  {
    question: "How do I subtract a 30-minute lunch break from my total hours?",
    answer:
      "To subtract a break accurately, convert the break into a fraction of an hour or subtract the minutes directly from your total. Since 30 minutes is 0.5 hours (30 / 60 = 0.5), if your raw time is 8 hours and 15 minutes (8.25), your net time is 8.25 - 0.5 = 7.75 hours, which equals 7 hours and 45 minutes.",
  },
  {
    question:
      "How can I convert my total hours and minutes into a decimal format?",
    answer:
      "To convert time to a decimal for billing or payroll, divide the minutes by 60 and add the result to the whole hours. The formula is: Total Hours + (Minutes / 60). For example, 6 hours and 36 minutes becomes 6 + (36 / 60) = 6.6 hours. This format is standard for most digital invoicing and payroll systems.",
  },
  {
    question: "How do I calculate overtime hours?",
    answer:
      "Overtime is typically any time worked beyond 40 hours in a standard 7-day work week. To calculate it, use the formula: Total Hours - 40 = Overtime Hours. If you worked 47.5 hours this week, you have 7.5 hours of overtime. Depending on local laws, these 7.5 hours are often paid at a 'time-and-a-half' rate (1.5x your hourly wage).",
  },
  {
    question: "What is the best way to add multiple time shifts together?",
    answer:
      "The most efficient way is to sum all minutes first, then all hours. Convert every 60 minutes into 1 additional hour. For example, two shifts of 4h 45m and 3h 25m total 7h 70m. Since 70 minutes is 1h 10m, the combined total is 8 hours and 10 minutes.",
  },
  {
    question: "How do I calculate hours if my shift crosses midnight?",
    answer:
      "When a shift starts one day and ends the next, add 24 to the end time to make the subtraction possible. If you start at 9:00 PM (21:00) and end at 5:00 AM (05:00), calculate: (5 + 24) - 21 = 8 hours. This adjustment ensures your duration remains a positive number despite the date change.",
  },
  {
    question: "How many hours is 9 to 5?",
    answer:
      "A 9 AM to 5 PM shift is exactly 8 hours (480 minutes). In decimal format this is 8.00 hours. If a 30-minute unpaid lunch break is deducted, the paid duration becomes 7.5 hours (7 hours 30 minutes).",
  },
  {
    question: "What is 7.5 hours in hours and minutes?",
    answer:
      "7.5 hours equals 7 hours and 30 minutes. The decimal 0.5 represents half of 60 minutes (0.5 × 60 = 30 minutes). This is a common payroll duration for a standard half-day shift.",
  },
  {
    question: "How do I calculate hours worked for payroll in Pakistan?",
    answer:
      "For Pakistani payroll, convert your worked time into decimal hours by dividing minutes by 60 and adding to full hours. Multiply decimal hours by your hourly rate. For example, 8 hours 45 minutes = 8.75 hours. At Rs 1,200/hour, earnings = Rs 10,500.",
  },
];

export const metadata: Metadata = {
  title: "Hours Calculator: Find the Exact Time Between Two Times",
  description:
    "Calculate the exact hours and minutes between two times. Features AM/PM support, midnight crossover, and total decimal hours for easy payroll tracking.",

  keywords: [
    "hours calculator",
    "time difference calculator",
    "calculate hours between times",
    "duration calculator",
    "shift hours calculator",
    "work hours counter",
    "elapsed time calculator",
    "decimal hours converter",
    "time duration tool",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/hours-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hours & Time Duration Calculator | LizoCalc",
    description:
      "Find the exact time difference between two points. Perfect for shift tracking, project management, and daily duration calculations.",
    url: "https://www.lizocalc.com/calculators/time/hours-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hours Calculator - Accurate Time Difference",
    description:
      "Quickly calculate elapsed time and total hours between any two times with our free, professional calculator.",
  },
};

export default function HoursPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT — UPDATED SCHEMA === */}
      <Script
        id="structured-data-hours-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* ── 1. BREADCRUMB ── */
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/time/hours-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.lizocalc.com",
                  },
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
                    name: "Hours Calculator",
                    item: "https://www.lizocalc.com/calculators/time/hours-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T author) ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
                knowsAbout: [
                  "Time Calculation",
                  "Payroll Tools",
                  "Decimal Hours",
                  "Web Development",
                  "Mechatronics",
                ],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.lizocalc.com/logo.png",
                },
                foundingDate: "2026",
                founder: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 4. WEBSITE ── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/hours-calculator",
                url: "https://www.lizocalc.com/calculators/time/hours-calculator",
                name: "Hours Calculator: Find the Exact Duration Between Two Times",
                description:
                  "Use our hours calculator to find the exact duration between two times, including AM/PM support and midnight crossover calculation.",
                inLanguage: "en",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator#app",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator#app",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp#image",
                },
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/time/hours-calculator#app",
                name: "Hours Calculator",
                url: "https://www.lizocalc.com/calculators/time/hours-calculator",
                description:
                  "Free hours calculator to determine the exact time duration between two times, supporting overnight calculations.",
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator",
                },
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp#image",
                },
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Time Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-04-01",
                dateModified: "2026-05-01",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate duration between two times",
                  "Supports AM/PM format",
                  "Handles overnight (midnight) shifts",
                  "Provides result in decimal hours and minutes",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/time/hours-calculator",
                },
              },

              /* ── 7. HOWTO (AI Overview trigger) ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/hours-calculator#howto",
                name: "How to Calculate Hours Between Two Times",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator",
                },
                description:
                  "Step-by-step guide to calculating elapsed time using the LizoCalc Hours Calculator",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Choose your time format",
                    text: "Select 12-hour (AM/PM) or 24-hour format using the toggle at the top of the calculator.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter your start time",
                    text: "Select hours (1–12), minutes (00–59), and AM or PM for your shift start time.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter your end time",
                    text: "Repeat the same selection for your end time. For overnight shifts, select the next-day AM time — the calculator handles midnight crossover automatically.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read your results instantly",
                    text: "Results appear immediately showing total duration in hours and minutes, total minutes, and decimal hours — ready for payroll or billing.",
                  },
                ],
              },

              /* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/hours-calculator#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/hours-calculator",
                },
                mainEntity: (faqData || []).map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },

              /* ── 9. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp#image",
                url: "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp",
                name: "Alarm Clock Showing 7:30 — Decimal Hours Conversion Illustration",
                caption:
                  "Minimalist alarm clock at 7:30, illustrating that 7 hours 30 minutes equals 7.50 decimal hours — not 7.30. The most common payroll conversion mistake, solved.",
                description:
                  "Visual aid showing the difference between clock time (7:30) and decimal hours (7.50) — a common source of payroll errors when converting minutes to decimal format for billing.",
                width: 600,
                height: 400,
                contentUrl:
                  "https://www.lizocalc.com/images/time/alarm-clock-minimal.webp",
                encodingFormat: "image/webp",
              },
            ],
          }),
        }}
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Hours Calculator: Find the Exact Duration Between Two Times
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HoursCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        {/* ── DIRECT ANSWER BOX (AI Overview trigger) ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Calculate Hours Between Two Times
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To calculate hours between two times, subtract the start time from
            the end time. For example, <strong>9:00 AM to 5:30 PM</strong> = 8
            hours 30 minutes (<strong>8.50 decimal hours</strong>). For
            overnight shifts, add 24 hours to the end time before subtracting.
            To get decimal format for payroll, divide remaining minutes by 60
            and add to the whole hours.
          </p>
        </div>

        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Hours Calculator</strong> — also called an elapsed time
          calculator, <strong>hours between two times calculator</strong>, work
          hours calculator, or <strong>hourly time converter</strong> — is one
          of the most practical time-tracking tools available. Whether you're a
          freelancer calculating billable hours, an office employee preparing
          monthly timesheets, a student logging study sessions for board exams,
          a project manager tracking task durations, or a small business owner
          computing employee wages, getting the math right every time prevents
          underbilling, overworking, and disputes. Our tool works as a complete{" "}
          <strong>time calculator between hours</strong>,{" "}
          <strong>hours converter</strong>, and decimal time tool all in one
          place.
        </p>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — HOURS BETWEEN TWO TIMES
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Hours Between Two Times — Calculate Elapsed Time Instantly
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              How to Calculate Hours and Minutes Between AM and PM Times
            </h3>
            <p className="text-gray-200 leading-relaxed text-base mb-4">
              Select start time (e.g., 9:30 AM) and end time (e.g., 6:15 PM) —
              the <strong>hours between two times</strong> calculator
              automatically handles AM/PM crossover and gives you{" "}
              <strong>8 hours 45 minutes</strong>. It works as a full{" "}
              <strong>time calculator with hours and minutes</strong>, showing
              total duration, total minutes, and decimal hours simultaneously.
            </p>
            <p className="text-gray-200 text-base">
              Use it as an <strong>hours in between calculator</strong> for any
              shift pattern — standard office hours, split shifts, tutoring
              sessions, or freelance work blocks.
            </p>
          </div>

          {/* Popular "how many hours from X to Y" reference table */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            How Many Hours Between Common Time Pairs — Quick Reference
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Below are the most-searched <strong>hour to hour</strong> duration
            questions answered instantly. Use these as a reference or enter any
            custom time in our <strong>hours between calculator</strong> above:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Start Time</th>
                  <th className="p-4 text-left font-semibold">End Time</th>
                  <th className="p-4 text-left font-semibold">
                    Hours &amp; Minutes
                  </th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">Total Minutes</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">8:00 AM</td>
                  <td className="p-4 font-semibold text-yellow-300">3:36 PM</td>
                  <td className="p-4 font-bold text-green-400">7 h 36 min</td>
                  <td className="p-4 font-bold text-blue-300">7.60 h</td>
                  <td className="p-4">456 min</td>
                </tr>
                <tr>
                  <td className="p-4">8:30 AM</td>
                  <td className="p-4">6:30 PM</td>
                  <td className="p-4 font-bold text-green-400">10 h 0 min</td>
                  <td className="p-4 font-bold text-blue-300">10.00 h</td>
                  <td className="p-4">600 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">8:00 AM</td>
                  <td className="p-4 font-semibold text-yellow-300">3:36 PM</td>
                  <td className="p-4 font-bold text-green-400">7 h 36 min</td>
                  <td className="p-4 font-bold text-blue-300">7.60 h</td>
                  <td className="p-4">456 min</td>
                </tr>
                <tr>
                  <td className="p-4">9:00 AM</td>
                  <td className="p-4">6:00 PM</td>
                  <td className="p-4 font-bold text-green-400">9 h 0 min</td>
                  <td className="p-4 font-bold text-blue-300">9.00 h</td>
                  <td className="p-4">540 min</td>
                </tr>
                {/* Target: "7.6 hours from 9am" */}
                <tr>
                  <td className="p-4">9:00 AM</td>
                  <td className="p-4">4:36 PM</td>
                  <td className="p-4 font-bold text-green-400">7 h 36 min</td>
                  <td className="p-4 font-bold text-blue-300">7.60 h</td>
                  <td className="p-4">456 min</td>
                </tr>
                {/* Target: "10:00 am to 6:30 pm" & "8:30 to 6:30" */}
                <tr>
                  <td className="p-4 text-yellow-300">10:00 AM</td>
                  <td className="p-4 text-yellow-300">6:30 PM</td>
                  <td className="p-4 font-bold text-green-400">8 h 30 min</td>
                  <td className="p-4 font-bold text-blue-300">8.50 h</td>
                  <td className="p-4">510 min</td>
                </tr>
                {/* Target: "9.167 hours in hours and minutes" */}
                <tr>
                  <td className="p-4 italic">Conversion</td>
                  <td className="p-4">9.167 Decimal</td>
                  <td className="p-4 font-bold text-green-400">9 h 10 min</td>
                  <td className="p-4 font-bold text-blue-300">9.167 h</td>
                  <td className="p-4">550 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">6:30 AM</td>
                  <td className="p-4 font-semibold text-yellow-300">
                    10:30 AM
                  </td>
                  <td className="p-4 font-bold text-green-400">4 h 0 min</td>
                  <td className="p-4 font-bold text-blue-300">4.00 h</td>
                  <td className="p-4">240 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">8:45 AM</td>
                  <td className="p-4 font-semibold text-yellow-300">4:45 PM</td>
                  <td className="p-4 font-bold text-green-400">8 h 0 min</td>
                  <td className="p-4 font-bold text-blue-300">8.00 h</td>
                  <td className="p-4">480 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">1:30 AM</td>
                  <td className="p-4 font-semibold text-yellow-300">9:30 AM</td>
                  <td className="p-4 font-bold text-green-400">8 h 0 min</td>
                  <td className="p-4 font-bold text-blue-300">8.00 h</td>
                  <td className="p-4">480 min</td>
                </tr>
                <tr>
                  <td className="p-4">9:15 AM</td>
                  <td className="p-4">5:40 PM</td>
                  <td className="p-4 font-bold text-green-400">8 h 25 min</td>
                  <td className="p-4 font-bold text-blue-300">8.42 h</td>
                  <td className="p-4">505 min</td>
                </tr>
                <tr>
                  <td className="p-4">10:00 PM</td>
                  <td className="p-4">6:30 AM</td>
                  <td className="p-4 font-bold text-green-400">8 h 30 min</td>
                  <td className="p-4 font-bold text-blue-300">8.50 h</td>
                  <td className="p-4">510 min</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              7.6 Hours From 8 AM — What Time Is That?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed mb-3">
              A frequently searched query: <strong>7.6 hours from 8 AM</strong>.
              Here's the step-by-step answer:
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Start: 8:00 AM
              <br />
              7.6 hours = 7 hours + (0.6 × 60) = 7 hours 36 minutes
              <br />
              8:00 AM + 7h 36min = <strong>3:36 PM</strong>
            </div>
            <p className="text-gray-200 text-base mt-4">
              So <strong>7.6 hours from 8 AM = 3:36 PM</strong>. Our{" "}
              <strong>time calculator in hours</strong> handles this conversion
              automatically in both directions — forward (start + duration = end
              time) and backward (end − start = duration).
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — DECIMAL HOURS / CONVERT TIME TO HOURS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Convert Time to Hours — Decimal Hours Formula &amp; Common Mistakes
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Formula: How to Convert Time Into Hours (Decimal Format)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Our <strong>time to hours converter</strong> uses this exact formula
            to <strong>convert time into hours</strong> decimal format:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            decimalHours = fullHours + (extraMinutes ÷ 60)
            <br />
            <br />
            Example: 7 hours 36 minutes
            <br />
            36 ÷ 60 = 0.6
            <br />→ <strong>7.60 hours</strong>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            This is how to <strong>time convert to hours</strong> for any
            duration. The same logic applies whether you're using a{" "}
            <strong>time calculator to hours</strong> for payroll, billing, or
            study tracking. For related unit conversions, see our{" "}
            <Link
              href="/calculators/time/time-calculator"
              className="text-blue-400 hover:underline"
            >
              Time Calculator
            </Link>{" "}
            which handles hours ↔ minutes ↔ seconds conversions.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why 7:30 is 7.50 Hours — Common Time Conversion Mistakes
          </h3>

          {/* Image 2: Decimal Precision Visual */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/time/alarm-clock-minimal.webp"
                alt="Minimalist alarm clock showing 7:30 — illustrating that 7 hours 30 minutes equals 7.50 decimal hours, not 7.30, a common payroll mistake"
                className="w-full h-64 object-cover"
                width={600}
                height={400}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <p className="text-gray-200 text-base leading-relaxed">
              Common error: thinking 30 minutes = 0.3 hours (wrong!)
              <br />
              Correct: 30 ÷ 60 ={" "}
              <span className="text-green-400 font-bold text-xl">0.50</span>
              <br />
              <br />
              This is the single most common mistake people make when doing
              manual decimal conversion — and why a dedicated{" "}
              <strong>hours duration calculator</strong> pays for itself
              immediately.
            </p>
          </div>

          {/* Decimal conversion table */}
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Clock Time</th>
                  <th className="p-4 text-left font-semibold">Minutes</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">
                    Correct / Wrong
                  </th>
                  <th className="p-4 text-left font-semibold">
                    At Rs 1,200/hr
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">7:15</td>
                  <td className="p-4">15 min</td>
                  <td className="p-4 font-bold text-green-400">7.25 h</td>
                  <td className="p-4">✅ Correct</td>
                  <td className="p-4">Rs 8,700</td>
                </tr>
                <tr>
                  <td className="p-4">7:30</td>
                  <td className="p-4">30 min</td>
                  <td className="p-4 font-bold text-green-400">7.50 h</td>
                  <td className="p-4">✅ Correct</td>
                  <td className="p-4">Rs 9,000</td>
                </tr>
                <tr>
                  <td className="p-4">7:45</td>
                  <td className="p-4">45 min</td>
                  <td className="p-4 font-bold text-green-400">7.75 h</td>
                  <td className="p-4">✅ Correct</td>
                  <td className="p-4">Rs 9,300</td>
                </tr>
                <tr>
                  <td className="p-4">7:36</td>
                  <td className="p-4">36 min</td>
                  <td className="p-4 font-bold text-green-400">7.60 h</td>
                  <td className="p-4">✅ Correct</td>
                  <td className="p-4">Rs 9,120</td>
                </tr>
                <tr>
                  <td className="p-4">7:36</td>
                  <td className="p-4">36 min</td>
                  <td className="p-4 text-red-400">7.36 h</td>
                  <td className="p-4">❌ Common mistake</td>
                  <td className="p-4 text-red-400">Rs 8,832 (wrong!)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Percentage of Hours — What 70%, 84%, 85%, 94% of 7 Hours Equals
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A lesser-known use of the <strong>how many hours calculator</strong>{" "}
            is computing a percentage of a work period — common in productivity
            tracking, attendance records, and partial-day pay calculations:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Query</th>
                  <th className="p-4 text-left font-semibold">Calculation</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">
                    Hours &amp; Minutes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    70% of 7 hours
                  </td>
                  <td className="p-4">7 × 0.70</td>
                  <td className="p-4 font-bold text-green-400">4.90 h</td>
                  <td className="p-4">4 h 54 min</td>
                </tr>
                {/* Target: "94% of 6 hours" (Top Query) */}
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    94% of 6 hours
                  </td>
                  <td className="p-4">6 × 0.94</td>
                  <td className="p-4 font-bold text-green-400">5.64 h</td>
                  <td className="p-4">5 h 38 min</td>
                </tr>
                {/* Target: "85% of 12 hours" & "70% of 8 hours" */}
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    85% of 12 hours
                  </td>
                  <td className="p-4">12 × 0.85</td>
                  <td className="p-4 font-bold text-green-400">10.20 h</td>
                  <td className="p-4">10 h 12 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    70% of 8 hours
                  </td>
                  <td className="p-4">8 × 0.70</td>
                  <td className="p-4 font-bold text-green-400">5.60 h</td>
                  <td className="p-4">5 h 36 min</td>
                </tr>
                {/* Target: "7.6 times 90" (Top Multiplier) */}
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    7.6 times 90
                  </td>
                  <td className="p-4">7.6 × 90</td>
                  <td className="p-4 font-bold text-green-400">684.00</td>
                  <td className="p-4 italic text-gray-400">Payroll Result</td>
                </tr>
                {/* Target: "7.25 times 80" */}
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    7.25 times 80
                  </td>
                  <td className="p-4">7.25 × 80</td>
                  <td className="p-4 font-bold text-green-400">580.00</td>
                  <td className="p-4 italic text-gray-400">Units Total</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    70% of 7.5 hours
                  </td>
                  <td className="p-4">7.5 × 0.70</td>
                  <td className="p-4 font-bold text-green-400">5.25 h</td>
                  <td className="p-4">5 h 15 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    84% of 7 hours
                  </td>
                  <td className="p-4">7 × 0.84</td>
                  <td className="p-4 font-bold text-green-400">5.88 h</td>
                  <td className="p-4">5 h 53 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    85% of 7 hours
                  </td>
                  <td className="p-4">7 × 0.85</td>
                  <td className="p-4 font-bold text-green-400">5.95 h</td>
                  <td className="p-4">5 h 57 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    94% of 7 hours
                  </td>
                  <td className="p-4">7 × 0.94</td>
                  <td className="p-4 font-bold text-green-400">6.58 h</td>
                  <td className="p-4">6 h 35 min</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">
                    7.25 × 30 (rate)
                  </td>
                  <td className="p-4">7.25 × 30</td>
                  <td className="p-4 font-bold text-green-400">Rs/$ 217.50</td>
                  <td className="p-4">Billing result</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Precision Logic: 100% Accuracy for Payroll and Tax Audits
          </h3>
          <p className="text-gray-200 text-base">
            We use millisecond-precision internally and round decimal hours to 4
            places — accurate enough for even the strictest payroll or tax
            audits in Pakistan. Many Pakistani companies, Upwork clients, and
            FBR-compliant invoicing systems require decimal hours. A small
            rounding error (7:36 → 7.6 instead of 7.60) can mean hundreds of
            rupees difference per month.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — HOW TO USE / FEATURES
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Time Calculator Between Hours and Minutes
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Setting Start and End Times — Step-by-Step Guide
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>Choose 12-hour or 24-hour format from the toggle</li>
              <li>Select hours (1–12), minutes (00–59), and AM/PM</li>
              <li>Repeat for end time</li>
              <li>
                Results appear instantly — the{" "}
                <strong>time calculator between hours and minutes</strong> shows
                duration, decimal hours, and total minutes with no calculate
                button needed
              </li>
            </ol>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Understanding Total Duration vs. Total Minutes in Our Hours Elapsed
            Calculator
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The <strong>hours elapsed calculator</strong> returns three output
            formats simultaneously — because different use cases need different
            formats:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
            <li>Human-readable: 8 hours 45 minutes</li>
            <li>Total minutes: 525 minutes</li>
            <li>Decimal hours: 8.75 h</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Using &quot;Set to Now&quot; for Real-Time Duration Tracking
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Click &quot;Set Start to Now&quot; when you begin work/study, then
            later click &quot;Set End to Now&quot; — perfect for tracking live
            sessions, freelance calls, or Pomodoro-style focus blocks. The{" "}
            <strong>time between hours</strong> is calculated from your device
            clock with zero manual entry.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculate No. of Hours Across 12-Hour and 24-Hour Formats
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Toggle between 12-hour (AM/PM) and 24-hour (military) time. When you
            need to <strong>calculate no of hours</strong> for government
            timesheets or medical records in Pakistan, 24-hour format removes
            any ambiguity about AM/PM. The tool handles both with identical
            accuracy. For exact date-based durations, pair this with our{" "}
            <Link
              href="/calculators/time/date-calculator"
              className="text-blue-400 hover:underline"
            >
              Date Calculator
            </Link>
            .
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Smart Memory, Mobile-First Design &amp; 100% Private
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Your most recent start/end times are saved locally so you can
            continue tracking across tabs or phone sessions. Large touch
            targets, clear AM/PM toggle, and instant feedback make this{" "}
            <strong>duration hours calculator</strong> perfect for field
            workers, tuition teachers, and students on budget Android phones.
            All calculations happen in your browser — no data leaves your
            device.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — AVERAGE HOURS / MULTI-SESSION
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Average Hours Calculator — Track Multiple Sessions &amp; Weekly
            Totals
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How to Calculate Average Hours Worked Per Day
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            To <strong>calculate average hours</strong> across a work week, add
            up each day's decimal hours and divide by the number of days worked.
            Our <strong>average hours calculator</strong> logic:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Day 1: 9:00 AM → 5:30 PM = 8.50 h
            <br />
            Day 2: 8:45 AM → 5:15 PM = 8.50 h
            <br />
            Day 3: 9:15 AM → 6:00 PM = 8.75 h
            <br />
            Day 4: 8:30 AM → 4:45 PM = 8.25 h
            <br />
            Day 5: 9:00 AM → 5:00 PM = 8.00 h
            <br />
            ─────────────────────────────
            <br />
            Total: 42.00 h ÷ 5 days = <strong>8.40 h average per day</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating 9.167 Hours in Hours and Minutes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Another common query:{" "}
            <strong>9.167 hours in hours and minutes</strong>. Converting a
            decimal back to clock format:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            9.167 hours
            <br />
            Full hours: 9
            <br />
            Remaining: 0.167 × 60 = 10.02 minutes ≈ <strong>10 minutes</strong>
            <br />
            Result: <strong>9 hours 10 minutes</strong>
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            This reverse conversion — <strong>calculate hours from time</strong>{" "}
            back to clock format — is just as important as the forward
            direction. Our tool handles both automatically. To also compute how
            many years, months, and days that spans, try our{" "}
            <Link
              href="/calculators/time/age-calculator"
              className="text-blue-400 hover:underline"
            >
              Age Calculator
            </Link>
            .
          </p>

          {/* Multi-session table */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Real-World Applications — Time Duration Calculator for Every Use
            Case
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Use Case</th>
                  <th className="p-4 text-left font-semibold">Start → End</th>
                  <th className="p-4 text-left font-semibold">Duration</th>
                  <th className="p-4 text-left font-semibold">Decimal</th>
                  <th className="p-4 text-left font-semibold">
                    Billing / Outcome
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Freelance project</td>
                  <td className="p-4">9:30 AM → 6:15 PM</td>
                  <td className="p-4 font-bold text-green-400">8 h 45 min</td>
                  <td className="p-4">8.75 h</td>
                  <td className="p-4">Rs 10,500 @ Rs 1,200/h</td>
                </tr>
                <tr>
                  <td className="p-4">Office shift</td>
                  <td className="p-4">8:00 AM → 5:00 PM</td>
                  <td className="p-4 font-bold text-green-400">9 h 0 min</td>
                  <td className="p-4">9.00 h</td>
                  <td className="p-4">Standard workday log</td>
                </tr>
                <tr>
                  <td className="p-4">Night shift</td>
                  <td className="p-4">10:40 PM → 9:20 AM</td>
                  <td className="p-4 font-bold text-green-400">10 h 40 min</td>
                  <td className="p-4">10.67 h</td>
                  <td className="p-4">Overtime pay calculation</td>
                </tr>
                <tr>
                  <td className="p-4">Study session (Math)</td>
                  <td className="p-4">2:25 PM → 4:50 PM</td>
                  <td className="p-4 font-bold text-green-400">2 h 25 min</td>
                  <td className="p-4">2.42 h</td>
                  <td className="p-4">Board exam prep log</td>
                </tr>
                <tr>
                  <td className="p-4">Study session (Physics)</td>
                  <td className="p-4">5:00 PM → 6:40 PM</td>
                  <td className="p-4 font-bold text-green-400">1 h 40 min</td>
                  <td className="p-4">1.67 h</td>
                  <td className="p-4">Combined: 4.09 h today</td>
                </tr>
                <tr>
                  <td className="p-4">Pomodoro block (25 min)</td>
                  <td className="p-4">3:00 PM → 3:25 PM</td>
                  <td className="p-4 font-bold text-green-400">0 h 25 min</td>
                  <td className="p-4">0.42 h</td>
                  <td className="p-4">Focus session unit</td>
                </tr>
                <tr>
                  <td className="p-4">Tuition class</td>
                  <td className="p-4">4:00 PM → 7:30 PM</td>
                  <td className="p-4 font-bold text-green-400">3 h 30 min</td>
                  <td className="p-4">3.50 h</td>
                  <td className="p-4">Monthly fee calculation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — QUICK REFERENCE DECIMAL TABLE
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference: Common Durations in Decimal Hours — Time Duration
            Calculator
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Use this table to quickly <strong>calculate how many hours</strong>{" "}
            any common work or study period represents in decimal format — ready
            for payroll, billing, or timesheet entry:
          </p>

          <div className="overflow-x-auto mt-4 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">
                    Clock Duration
                  </th>
                  <th className="p-4 text-left font-semibold">Total Minutes</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">
                    Use Case Example
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">8 hours</td>
                  <td className="p-4">480</td>
                  <td className="p-4 font-bold text-green-400">8.00 h</td>
                  <td className="p-4">Full office day</td>
                </tr>
                <tr>
                  <td className="p-4">7 h 30 min</td>
                  <td className="p-4">450</td>
                  <td className="p-4 font-bold text-green-400">7.50 h</td>
                  <td className="p-4">Standard school + tuition</td>
                </tr>
                <tr>
                  <td className="p-4">9 h 15 min</td>
                  <td className="p-4">555</td>
                  <td className="p-4 font-bold text-green-400">9.25 h</td>
                  <td className="p-4">Long freelance session</td>
                </tr>
                <tr>
                  <td className="p-4">4 h 45 min</td>
                  <td className="p-4">285</td>
                  <td className="p-4 font-bold text-green-400">4.75 h</td>
                  <td className="p-4">Exam preparation block</td>
                </tr>
                <tr>
                  <td className="p-4">10 h 40 min</td>
                  <td className="p-4">640</td>
                  <td className="p-4 font-bold text-green-400">10.67 h</td>
                  <td className="p-4">Night shift example</td>
                </tr>
                <tr>
                  <td className="p-4">5 h 20 min</td>
                  <td className="p-4">320</td>
                  <td className="p-4 font-bold text-green-400">5.33 h</td>
                  <td className="p-4">Half-day freelance</td>
                </tr>
                <tr>
                  <td className="p-4">6 h 10 min</td>
                  <td className="p-4">370</td>
                  <td className="p-4 font-bold text-green-400">6.17 h</td>
                  <td className="p-4">Short office shift</td>
                </tr>
                <tr>
                  <td className="p-4">12 h 0 min</td>
                  <td className="p-4">720</td>
                  <td className="p-4 font-bold text-green-400">12.00 h</td>
                  <td className="p-4">Double shift / event day</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* ── TRUST / E-E-A-T BYLINE ── */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
              RA
            </div>
            <div>
              <p className="text-white font-semibold text-sm">
                Written by Rana Muhammad Abdullah
              </p>
              <p className="text-gray-400 text-xs">
                MERN Stack Developer &amp; Tool Maker · Mechatronics &amp;
                Control Engineering Student ·{" "}
                <a
                  href="https://www.linkedin.com/in/abdullahsajjad06/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
              </p>
            </div>
            <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
              <span>📅 Published: Apr 1, 2026</span>
              <span>🔄 Updated: May 01, 2026</span>
              <span>✅ Verified accurate</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — MORE TOOLS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Time &amp; Productivity Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine with these other free LizoCalc tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/time/time-calculator"
                className="text-blue-400 hover:underline"
              >
                Time Calculator
              </Link>{" "}
              — hours ↔ minutes ↔ seconds conversions
            </li>
            <li>
              <Link
                href="/calculators/time/date-calculator"
                className="text-blue-400 hover:underline"
              >
                Date Calculator
              </Link>{" "}
              — days between dates &amp; add/subtract time
            </li>
            <li>
              <Link
                href="/calculators/time/age-calculator"
                className="text-blue-400 hover:underline"
              >
                Age Calculator
              </Link>{" "}
              — exact age in years + total days/hours lived
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Accurate time tracking is the foundation of productivity, fair
            billing, and effective study habits. Whether you're freelancing,
            managing projects, or preparing for board exams — LizoCalc Hours
            Calculator gives you precise, decimal-ready results every single
            time. Bookmark it today and take control of every hour!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
