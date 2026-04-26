import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import TimeCalculator from "./clientside";
import Image from "next/image";

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
const faqData = [
  {
    question: "How do I add hours and minutes together?",
    answer:
      "To add time durations, sum the minutes and hours separately. If the minutes total 60 or more, divide the minutes by 60; add the quotient to your hours and keep the remainder as your minutes. Example: 2h 45m + 1h 30m = 3h 75m. Since 75m = 1h 15m, the final total is 4h 15m.",
  },
  {
    question: "How do I calculate decimal hours for payroll?",
    answer:
      "To convert minutes to decimal hours for a timesheet, divide the number of minutes by 60. Formula: Decimal Hours = Hours + (Minutes / 60). For example, if you worked 8 hours and 15 minutes, the calculation is 8 + (15 / 60) = 8.25 hours.",
  },
  {
    question: "How do I calculate the time elapsed between two points in time?",
    answer:
      "To find the duration, subtract the start time from the end time. If the end time's minutes are less than the start time's, borrow 60 minutes from the end hour. For instance, to find the gap between 1:45 PM and 4:15 PM: 4:15 becomes 3:75. Then, (3 - 1) hours and (75 - 45) minutes equals 2 hours and 30 minutes.",
  },
  {
    question: "How does a time calculator handle crossing midnight?",
    answer:
      "When a time range crosses midnight, add 24 hours to the end time before subtracting. If you start at 10:00 PM (22:00) and end at 2:00 AM (02:00), the calculation is (2 + 24) - 22 = 4 hours. This ensures the duration is positive and accurate.",
  },
  {
    question: "How do I convert military time to a 12-hour format?",
    answer:
      "For military times from 13:00 to 23:59, subtract 12 to get the PM time. For 00:00 to 00:59, the time is 12:00 AM to 12:59 AM. For 01:00 to 12:00, the time remains the same but is labeled AM. Example: 17:30 - 12 = 5:30 PM.",
  },
  {
    question: "What is the formula for converting seconds into hours?",
    answer:
      "To convert seconds into a readable time format, use the formula: Hours = Total Seconds / 3600. To find the remaining minutes, take the remainder and divide by 60. For example, 7,260 seconds is 7,260 / 3,600 = 2 hours with 60 seconds (1 minute) left over, totaling 2 hours and 1 minute.",
  },
  {
    question: "How many seconds are in an hour?",
    answer:
      "There are exactly 3,600 seconds in one hour. This comes from multiplying 60 minutes × 60 seconds per minute = 3,600. So 2 hours = 7,200 seconds, and 8 hours = 28,800 seconds.",
  },
  {
    question: "How do I convert hours to minutes quickly?",
    answer:
      "To convert hours to minutes, multiply the number of hours by 60. For example, 3 hours = 3 × 60 = 180 minutes. For decimal hours like 2.5 hours, the calculation is 2.5 × 60 = 150 minutes.",
  },
  {
    question: "What is 1.5 hours in hours and minutes?",
    answer:
      "1.5 hours equals 1 hour and 30 minutes. The decimal 0.5 represents half of 60 minutes (0.5 × 60 = 30). This is the same as 90 total minutes or 5,400 total seconds.",
  },
];

/* ─────────────────────────────────────────────
   METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Time Calculator – Convert Hours, Minutes & Seconds Instantly",
  description:
    "Free time calculator to convert hours to minutes, minutes to seconds, and calculate decimal hours for payroll. Instant results — no sign-up needed.",

  keywords: [
    "time calculator",
    "convert hours to minutes",
    "hours to seconds converter",
    "decimal hours calculator",
    "minutes to seconds",
    "time duration calculator",
    "calculate total seconds",
    "how many seconds in an hour",
    "time conversion tool",
    "time unit converter",
    "hours minutes seconds calculator",
    "payroll time calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/time-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Time Calculator – Convert Hours, Minutes & Seconds | LizoCalc",
    description:
      "Instantly convert between hours, minutes, and seconds. Get decimal hours for billing, total seconds for science, and hh:mm:ss for timesheets — free & ad-free.",
    url: "https://www.lizocalc.com/calculators/time/time-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Time Calculator — Convert & Calculate Durations Instantly",
    description:
      "Convert hours to minutes, minutes to seconds, and get decimal hours for payroll — all in one free tool.",
  },
};

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function TimePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ══════════════════════════════════════════
          STRUCTURED DATA — JSON-LD
      ══════════════════════════════════════════ */}
      <Script
        id="structured-data-time-calculator"
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
                  "https://www.lizocalc.com/calculators/time/time-calculator#breadcrumb",
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
                    name: "Time Calculator",
                    item: "https://www.lizocalc.com/calculators/time/time-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T) ── */
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
                  "Unit Conversion",
                  "Web Development",
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
                founder: { "@id": "https://www.lizocalc.com/#author" },
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
                publisher: { "@id": "https://www.lizocalc.com/#org" },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/time-calculator",
                url: "https://www.lizocalc.com/calculators/time/time-calculator",
                name: "Time Calculator – Convert Hours, Minutes & Seconds Instantly",
                description:
                  "Free time calculator to convert hours to minutes, minutes to seconds, and get decimal hours for payroll and billing.",
                inLanguage: "en",
                datePublished: "2026-03-29",
                dateModified: "2026-04-26",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/time-calculator#app",
                },
                mainEntity: [
                  {
                    "@id":
                      "https://www.lizocalc.com/calculators/time/time-calculator#app",
                  },
                  {
                    "@id":
                      "https://www.lizocalc.com/calculators/time/time-calculator#howto",
                  },
                ],
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp#image",
                },
                author: { "@id": "https://www.lizocalc.com/#author" },
                publisher: { "@id": "https://www.lizocalc.com/#org" },
                isPartOf: { "@id": "https://www.lizocalc.com/#website" },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/time-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/time/time-calculator#app",
                name: "Time Calculator — Convert Hours, Minutes & Seconds",
                url: "https://www.lizocalc.com/calculators/time/time-calculator",
                description:
                  "Free online time calculator that converts between hours, minutes, and seconds. Provides decimal hours for payroll, total seconds for science, and hh:mm:ss format for timesheets.",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp#image",
                },
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Time & Unit Conversion Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "2.0",
                datePublished: "2026-03-29",
                dateModified: "2026-04-26",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                featureList: [
                  "Convert hours to minutes and seconds",
                  "Convert minutes to decimal hours",
                  "Calculate total seconds from hh:mm:ss",
                  "Real-time slider and manual input",
                  "Mobile-optimized touch-friendly interface",
                  "One-click reset",
                  "Cookie memory for returning users",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: { "@id": "https://www.lizocalc.com/#org" },
                potentialAction: {
                  "@type": "UseAction",
                  target: [
                    "https://www.lizocalc.com/calculators/time/time-calculator",
                  ],
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/time-calculator#howto",
                name: "How to Convert Hours, Minutes and Seconds Using LizoCalc",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/total-seconds-breakdown.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/time-calculator",
                },
                description:
                  "Step-by-step guide to converting time units and getting decimal hours instantly.",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Enter your hours",
                    text: "Drag the Hours slider or type a value directly. Supports whole numbers and decimals (e.g. 2.5 hours).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter your minutes",
                    text: "Drag the Minutes slider or type a value (0–59). The calculator accepts values above 59 for cumulative totals.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter your seconds",
                    text: "Set the Seconds slider or type the exact seconds. Decimal seconds are supported for scientific precision.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read your results instantly",
                    text: "All four outputs update in real time: hh:mm:ss format, total seconds, total minutes (decimal), and decimal hours — ready for payroll, billing, or science logging.",
                  },
                ],
              },

              //* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                mainEntity: (faqData || []).map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },

              /* ── 9. IMAGE OBJECTS ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp#image",
                url: "https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp",
                name: "Time Unit Conversion Flow — Hours to Minutes to Seconds",
                "caption": "Visual diagram showing the sexagesimal conversion chain: 1 Hour × 60 = 60 Minutes × 60 = 3,600 Seconds. Examples: 2 hours = 120 minutes; 1.5 hours = 90 minutes.",
                 description:
                  "Infographic illustrating the base-60 (sexagesimal) time system used for hours, minutes, and seconds — the foundation of all time unit conversions.",
                width: 800,
                height: 450,
                contentUrl:
                  "https://www.lizocalc.com/images/time/time-unit-conversion-flow.webp",
                encodingFormat: "image/webp",
              },
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/total-seconds-breakdown.webp#image",
                url: "https://www.lizocalc.com/images/time/total-seconds-breakdown.webp",
                name: "Converting Time to Total Seconds — Step-by-Step Breakdown",
                caption:
                  "Step-by-step infographic: 1 hour 30 minutes 45 seconds = 3,600 + 1,800 + 45 = 5,445 total seconds. Also shows total minutes (90.75) and decimal hours (1.5125).",
                description:
                  "Math breakdown infographic showing how to convert 1h 30m 45s into total seconds (5,445), total minutes (90.75), and decimal hours (1.5125) using the standard time formula.",
                width: 800,
                height: 450,
                contentUrl:
                  "https://www.lizocalc.com/images/time/total-seconds-breakdown.webp",
                encodingFormat: "image/webp",
              },
            ],
          }),
        }}
      />

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            Time Calculator — Convert Hours, Minutes &amp; Seconds Instantly
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-5xl">
            The fastest free online tool to convert hours to minutes, minutes to
            seconds, get decimal hours for payroll, and calculate total seconds
            for science — all in real time, no sign-up needed.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CALCULATOR TOOL
      ══════════════════════════════════════════ */}
      <section
        className="px-4 py-8"
        aria-label="Time unit conversion calculator"
      >
        <TimeCalculator />
      </section>

      {/* ══════════════════════════════════════════
          QUICK ANSWER BOX — AI Overview trigger
      ══════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-6 pt-8">
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Convert Hours, Minutes &amp; Seconds
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To convert a duration to total seconds use:{" "}
            <strong>
              Total Seconds = (Hours × 3,600) + (Minutes × 60) + Seconds
            </strong>
            . For decimal hours divide total seconds by 3,600. Example: 1 hour
            30 minutes 45 seconds = <strong>5,445 seconds</strong> ={" "}
            <strong>90.75 minutes</strong> ={" "}
            <strong>1.5125 decimal hours</strong>. Our calculator below does
            this for any duration instantly.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SEO ARTICLE CONTENT
      ══════════════════════════════════════════ */}
      <article
        className="max-w-6xl mx-auto px-6 py-16 text-white"
        itemScope
        itemType="https://schema.org/Article"
      >
        {/* ── INTRO ── */}
        <p
          className="text-gray-200 leading-relaxed mb-6 text-lg"
          itemProp="description"
        >
          The <strong>Time Calculator</strong> — also known as a
          hours-to-minutes converter, decimal time calculator, or total-seconds
          tool — is an essential utility for students, professionals,
          freelancers, video editors, researchers, and anyone who regularly
          converts, adds up, or breaks down time durations. Whether you are a
          student in Punjab calculating total study hours for board exam
          preparation, a freelancer billing clients in decimal hours, a YouTuber
          summing video lengths, or a lab technician converting experiment
          run-times into seconds, precise time conversion saves hours of manual
          arithmetic.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          LizoCalc's completely free, no-registration-required{" "}
          <strong>Time Calculator</strong> instantly converts any duration
          between hours ↔ minutes ↔ seconds, decimal hours (e.g. 2.75 h) ↔
          hh:mm:ss format, and total seconds for long durations. It features
          real-time sliders, high-precision manual entry, a clean mobile-first
          design, offline capability after first load, and remembers your last
          inputs with consent. It never shows ads. Jump right in on our{" "}
          <Link
            href="/calculators/time/time-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Time Calculator page
          </Link>
          .
        </p>

        {/* ══════════════════════════════════════════
            SECTION 1 — INSTANT TIME CONVERSION
        ══════════════════════════════════════════ */}
        <section className="mt-16" aria-labelledby="section-instant-conversion">
          <h2
            id="section-instant-conversion"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            Instant Time Conversion for Any Duration
          </h2>

          {/* Convert Hours to Seconds */}
          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Convert Hours to Total Seconds — Fast Reference
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Need to know how many seconds are in 8 hours of work? Or how
                many seconds long your podcast episode runs? Multiply hours by
                3,600.
              </p>
              <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-base">
                8 hours × 3,600 = <strong>28,800 seconds</strong>
                <br />1 hour × 3,600 = <strong>3,600 seconds</strong>
                <br />
                0.5 hours × 3,600 = <strong>1,800 seconds</strong>
              </div>
            </div>
          </div>

          {/* Complex durations */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Breaking Down Complex Durations into Total Minutes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Enter 2 hours 45 minutes 30 seconds — get total minutes instantly:
          </p>
          <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-base mb-6">
            2 h 45 min 30 s = <strong>165.5 total minutes</strong>
          </div>

          {/* Decimal hours for payroll */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating Decimal Hours for Payroll and Freelance Billing
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Many companies in Pakistan and internationally pay using decimal
            hours rather than mm:ss format. Our{" "}
            <strong>decimal hours calculator</strong> converts instantly:
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
            Why decimal hour precision matters for professional tracking
          </h4>
          <p className="text-gray-200 text-base">
            1 hour 36 minutes = <strong>1.60 hours</strong> (not 1.6 — the
            trailing zero matters). Rounding errors of even 0.01 hour can mean
            ₹50–200 difference per task when multiplied across dozens of entries
            in a month.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2 — HOW TO USE
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-how-to-use">
          <h2
            id="section-how-to-use"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            How to Use the LizoCalc Time Conversion Tool
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Adjusting Parameters with Interactive Range Sliders
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Drag the Hours, Minutes, or Seconds sliders — results update
                  live in real time
                </li>
                <li>
                  Watch decimal hours, total minutes, and total seconds change
                  instantly with every move
                </li>
                <li>
                  Perfect for quick estimates during meetings, study sessions,
                  or client calls
                </li>
              </ol>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Understanding the Results: From Total Seconds to Decimal Hours
          </h3>
          <p className="text-gray-200 text-base mb-4">
            All four output formats update simultaneously so you never have to
            do secondary conversions:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>hh:mm:ss format — for timesheets, video editors, and timers</li>
            <li>Total seconds — for programming, science, and APIs</li>
            <li>Total minutes (decimal) — for scheduling and meeting logs</li>
            <li>
              Decimal hours — most accurate format for payroll and billing
            </li>
          </ul>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-5">
            Step-by-Step Example: Converting 1h 30m 45s to All Units
          </h4>

          {/* Image 2 — total seconds breakdown */}
          <figure className="my-8">
            <Image
              src="/images/time/total-seconds-breakdown.webp"
              width={800}
              height={450}
              alt="Step-by-step infographic showing how to convert 1 hour 30 minutes 45 seconds into total seconds: 3600 + 1800 + 45 = 5445 seconds, 90.75 minutes, and 1.5125 decimal hours"
              className="rounded-2xl border border-gray-700 shadow-xl w-full h-auto"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 800px"
            />
            <figcaption className="text-sm text-gray-400 text-center mt-3 italic">
              <strong>Figure 1:</strong> Converting Time to Total Seconds — 1
              hour × 3,600 + 30 minutes × 60 + 45 seconds ={" "}
              <strong>5,445 total seconds</strong>. Also equals 90.75 total
              minutes and 1.5125 decimal hours.
            </figcaption>
          </figure>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-3 font-mono text-green-300">
            <div>1 hour → 3,600 s</div>
            <div>30 minutes → 1,800 s</div>
            <div>45 seconds → 45 s</div>
            <div className="pt-3 border-t border-gray-600">
              Total seconds = <strong>5,445</strong>
            </div>
            <div>
              Total minutes = <strong>90.75 min</strong>
            </div>
            <div>
              Decimal hours = <strong>1.5125 h</strong>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3 — MATHEMATICS
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-math">
          <h2
            id="section-math"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            The Mathematics Behind Time Unit Conversion
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Standard Time Formula:{" "}
            <span className="font-mono text-lg">
              Total Seconds = (Hours × 3600) + (Minutes × 60) + Seconds
            </span>
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The reverse formula — converting decimal hours back to hh:mm:ss — is
            equally important for payroll and timesheets:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            <div className="text-gray-400 mb-2">
              // Decimal hours → hh:mm:ss
            </div>
            totalSeconds = decimalHours × 3600
            <br />
            hours = Math.floor(totalSeconds / 3600)
            <br />
            remaining = totalSeconds % 3600
            <br />
            minutes = Math.floor(remaining / 60)
            <br />
            seconds = remaining % 60
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why 60 Is the Magic Number: The Sexagesimal System Explained
          </h3>

          {/* Image 1 — time unit conversion flow */}
          <figure className="my-8 flex justify-center">
            <div className="w-full max-w-2xl">
              <Image
                src="/images/time/time-unit-conversion-flow.webp"
                alt="Time unit conversion flow diagram: 1 Hour multiplied by 60 equals 60 Minutes, multiplied by 60 again equals 3600 Seconds. Examples shown: 2 hours = 120 minutes, 1.5 hours = 90 minutes"
                width={800}
                height={450}
                className="rounded-2xl border border-gray-700 shadow-lg w-full h-auto"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <figcaption className="text-sm text-gray-400 text-center mt-3 italic">
                <strong>Figure 2:</strong> The sexagesimal (base-60) conversion
                chain — Hours × 60 = Minutes × 60 = Seconds. This ancient
                Babylonian system is why there are exactly 3,600 seconds in an
                hour and 86,400 seconds in a day.
              </figcaption>
            </div>
          </figure>

          <p className="text-gray-200 text-base leading-relaxed">
            The base-60 (sexagesimal) system for minutes and seconds comes from
            ancient Babylonian mathematics, adopted by Greek astronomers, and
            preserved through modern timekeeping. That is why the conversion
            factors are always multiples of 60:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5 mt-4">
            <li>1 minute = 60 seconds</li>
            <li>1 hour = 60 minutes = 3,600 seconds</li>
            <li>1 day = 24 hours = 1,440 minutes = 86,400 seconds</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Accuracy Check: Handling High-Precision Decimal Fractions
          </h3>
          <p className="text-gray-200 text-base">
            Our calculator preserves full precision (up to 4–5 decimal places in
            decimal hours) so 1 hour 22.5 minutes shows correctly as{" "}
            <strong>1.3750 hours</strong> — critical for scientific logging and
            accurate invoicing.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4 — KEY FEATURES
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-features">
          <h2
            id="section-features"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            Key Features of Our Professional Time Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Real-Time Results with High-Performance Logic
          </h3>
          <p className="text-gray-200 text-base">
            Every slider movement or keystroke updates all output values
            instantly — no "Calculate" button needed. The tool runs entirely in
            your browser for maximum speed.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Mobile-Optimized Interface for Fast Field Calculations
          </h3>
          <p className="text-gray-200 text-base">
            Large touch-friendly sliders and number inputs work perfectly on
            low-end Android phones common across Pakistan and South Asia. The
            layout adapts cleanly to any screen size.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            One-Click Reset for Multiple Time-Shift Calculations
          </h3>
          <p className="text-gray-200 text-base">
            Clear everything instantly when switching between tasks — from study
            time to video editing to workout tracking. Each reset is a clean
            slate with no residual values.
          </p>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5 — PRACTICAL APPLICATIONS
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-applications">
          <h2
            id="section-applications"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            Practical Applications for Time Calculation
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Media Production: Calculating Total Video Run-Times
          </h3>
          <p className="text-gray-200 text-base">
            YouTube and TikTok creators: add up clips (3:45, 1:22, 4:58…) to get
            total runtime in hh:mm:ss and decimal hours for ad revenue estimates
            and content scheduling.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Academic Science: Converting Experimental Data into Seconds
          </h3>
          <p className="text-gray-200 text-base">
            Physics and Chemistry students at colleges across Pakistan: convert
            reaction times, pendulum periods, or titration durations into total
            seconds for graphing, data tables, and lab report calculations.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Daily Productivity: Tracking Task Durations and Deadlines
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>
              Pomodoro / time-blocking: convert focused sessions to decimal
              hours for daily logs
            </li>
            <li>
              Freelance billing: 3 h 40 min = 3.67 billable hours at your hourly
              rate
            </li>
            <li>
              Workout logging: total weekly gym time in minutes for fitness
              tracking apps
            </li>
            <li>
              Exam preparation: how many total hours studied this month toward
              board exams
            </li>
            <li>
              Sleep tracking: convert bedtime to wake-up time into decimal hours
              for health apps
            </li>
          </ul>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6 — QUICK REFERENCE TABLE
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-reference-table">
          <h2
            id="section-reference-table"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            Quick Reference: Time Conversion Table (Hours, Minutes, Seconds)
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Use this table to quickly look up the most common time conversions —
            from hh:mm:ss to decimal hours and total seconds — without typing a
            single value into the calculator:
          </p>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <caption className="text-gray-400 text-xs text-left mb-2 pb-2">
                Time conversion reference table: hh:mm:ss format → total
                seconds, total minutes, and decimal hours.
              </caption>
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold" scope="col">
                    hh:mm:ss
                  </th>
                  <th className="p-4 text-left font-semibold" scope="col">
                    Total Seconds
                  </th>
                  <th className="p-4 text-left font-semibold" scope="col">
                    Total Minutes
                  </th>
                  <th className="p-4 text-left font-semibold" scope="col">
                    Decimal Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">0:01:00</td>
                  <td className="p-4">60</td>
                  <td className="p-4">1.00</td>
                  <td className="p-4 font-bold text-green-400">0.0167</td>
                </tr>
                <tr>
                  <td className="p-4">0:15:00</td>
                  <td className="p-4">900</td>
                  <td className="p-4">15.00</td>
                  <td className="p-4 font-bold text-green-400">0.2500</td>
                </tr>
                <tr>
                  <td className="p-4">0:30:00</td>
                  <td className="p-4">1,800</td>
                  <td className="p-4">30.00</td>
                  <td className="p-4 font-bold text-green-400">0.5000</td>
                </tr>
                <tr>
                  <td className="p-4">0:45:30</td>
                  <td className="p-4">2,730</td>
                  <td className="p-4">45.50</td>
                  <td className="p-4 font-bold text-green-400">0.7583</td>
                </tr>
                <tr>
                  <td className="p-4">1:00:00</td>
                  <td className="p-4">3,600</td>
                  <td className="p-4">60.00</td>
                  <td className="p-4 font-bold text-green-400">1.0000</td>
                </tr>
                <tr>
                  <td className="p-4">1:22:30</td>
                  <td className="p-4">4,950</td>
                  <td className="p-4">82.50</td>
                  <td className="p-4 font-bold text-green-400">1.3750</td>
                </tr>
                <tr>
                  <td className="p-4">1:30:45</td>
                  <td className="p-4">5,445</td>
                  <td className="p-4">90.75</td>
                  <td className="p-4 font-bold text-green-400">1.5125</td>
                </tr>
                <tr>
                  <td className="p-4">2:30:00</td>
                  <td className="p-4">9,000</td>
                  <td className="p-4">150.00</td>
                  <td className="p-4 font-bold text-green-400">2.5000</td>
                </tr>
                <tr>
                  <td className="p-4">4:00:00</td>
                  <td className="p-4">14,400</td>
                  <td className="p-4">240.00</td>
                  <td className="p-4 font-bold text-green-400">4.0000</td>
                </tr>
                <tr>
                  <td className="p-4">8:00:00</td>
                  <td className="p-4">28,800</td>
                  <td className="p-4">480.00</td>
                  <td className="p-4 font-bold text-green-400">8.0000</td>
                </tr>
                <tr>
                  <td className="p-4">8:15:45</td>
                  <td className="p-4">29,745</td>
                  <td className="p-4">495.75</td>
                  <td className="p-4 font-bold text-green-400">8.2625</td>
                </tr>
                <tr>
                  <td className="p-4">24:00:00</td>
                  <td className="p-4">86,400</td>
                  <td className="p-4">1,440.00</td>
                  <td className="p-4 font-bold text-green-400">24.0000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 7 — COMMON CONVERSIONS (high-volume queries)
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-common-conversions">
          <h2
            id="section-common-conversions"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            Most Searched Time Conversions — Answered Instantly
          </h2>

          <p className="text-gray-200 text-base mb-8">
            Below are direct answers to the most-searched time conversion
            questions — verified with the same formula our calculator uses:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "How many minutes in an hour?",
                a: "1 hour = 60 minutes. Formula: Hours × 60 = Minutes.",
              },
              {
                q: "How many seconds in an hour?",
                a: "1 hour = 3,600 seconds. Formula: Hours × 3,600 = Seconds.",
              },
              {
                q: "How many seconds in a minute?",
                a: "1 minute = 60 seconds. Formula: Minutes × 60 = Seconds.",
              },
              {
                q: "How many minutes in a day?",
                a: "1 day = 1,440 minutes (24 hours × 60 minutes per hour).",
              },
              {
                q: "How many seconds in a day?",
                a: "1 day = 86,400 seconds (24 hours × 3,600 seconds per hour).",
              },
              {
                q: "What is 1.5 hours in minutes?",
                a: "1.5 hours = 90 minutes. Formula: 1.5 × 60 = 90.",
              },
              {
                q: "What is 2.5 hours in minutes?",
                a: "2.5 hours = 150 minutes. Formula: 2.5 × 60 = 150.",
              },
              {
                q: "What is 45 minutes in decimal hours?",
                a: "45 minutes = 0.75 decimal hours. Formula: 45 ÷ 60 = 0.75.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
                itemScope
                itemType="https://schema.org/Question"
              >
                <p className="font-semibold text-blue-300 mb-2" itemProp="name">
                  {q}
                </p>
                <p
                  className="text-gray-200 text-sm"
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <span itemProp="text">{a}</span>
                </p>
              </div>
            ))}
          </div>

          {/* E-E-A-T BYLINE */}
          <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
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
              <span>📅 Published: Mar 29, 2026</span>
              <span>🔄 Updated: Apr 26, 2026</span>
              <span>✅ Verified accurate</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 8 — MORE TOOLS
        ══════════════════════════════════════════ */}
        <section className="mt-20" aria-labelledby="section-more-tools">
          <h2
            id="section-more-tools"
            className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8"
          >
            More Time &amp; Productivity Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your time conversions with these other free LizoCalc
            calculators for a complete productivity toolkit:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/time/hours-calculator"
                className="text-blue-400 hover:underline"
              >
                Hours Calculator
              </Link>{" "}
              — find the exact duration between any two clock times, with AM/PM
              support and midnight crossover
            </li>
            <li>
              <Link
                href="/calculators/time/date-calculator"
                className="text-blue-400 hover:underline"
              >
                Date Calculator
              </Link>{" "}
              — days, weeks, and months between any two calendar dates
            </li>
            <li>
              <Link
                href="/calculators/age-calculator"
                className="text-blue-400 hover:underline"
              >
                Age Calculator
              </Link>{" "}
              — exact age in years, months, days, and total lifetime hours
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Stop wasting time on manual calculations. LizoCalc Time Calculator
            gives you instant, accurate time conversions every time — whether
            you need seconds for science, decimal hours for billing, or minutes
            for scheduling. Bookmark it today and make every minute count!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
