import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import AgeCalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "How is my exact age calculated in years, months, and days?",
    answer:
      "Your exact age is determined by subtracting your birth date from the current date using the 'borrowing method.' You first compare days (borrowing from the previous month if needed), then months (borrowing 12 months from the year if needed), and finally the years. LizoCalc performs these complex Gregorian calendar checks automatically for a precise result."
  },
  {
    question: "How many days have I been alive?",
    answer:
      "To calculate your total days lived, count every calendar day from your date of birth to today, including leap days. The basic logic is: Total Days = (Years × 365) + Leap Days + Days since your last birthday. For a 30-year-old, this is approximately 10,957 days."
  },
  {
    question: "Does the age calculator account for leap years?",
    answer:
      "Yes. A precise age calculator recognizes that February has 29 days every four years. A year is a leap year if it is divisible by 4, except for century years unless they are also divisible by 400. LizoCalc handles leap year logic to ensure your total day count is 100% accurate."
  },
  {
    question: "What is my age if I was born on February 29th?",
    answer:
      "For leap year birthdays, the calculator tracks the actual date. In non-leap years, your official birthday is usually recognized as February 28th or March 1st depending on your jurisdiction. Our tool counts the exact number of days elapsed to maintain accuracy regardless of the legal definition."
  },
  {
    question: "Does my birthday count as a full day when calculating age?",
    answer:
      "Yes. In most legal systems, you are considered a year older for the entire 24-hour period of your birthday. Your age increments by one full year at the exact start (12:00 AM) of your birth date."
  },
  {
    question: "How can I calculate the age difference between two people?",
    answer:
      "To find the age gap, convert both individuals' birth dates into a total day count and subtract the smaller number from the larger one. This difference can then be converted back into years, months, and days to see exactly how much older one person is than the other."
  },
  {
    question: "Can I calculate age between two specific dates (not today)?",
    answer:
      "Yes. By changing the 'Current Date' field to any target date in the past or future, you can find the age between two historical events or calculate a retrospective age. This is highly useful for legal research and genealogical tracking."
  },
  {
    question: "How do doctors calculate age for newborns and infants?",
    answer:
      "For newborns, age is expressed in days for the first two weeks, then in weeks up to 2 months, and in months up to 2 years. For premature infants, doctors often use a 'corrected' or 'adjusted' age to account for the early birth until the child is about 2–3 years old."
  },
  {
    question: "Why do some age calculators show different results?",
    answer:
      "Differences usually occur based on how a tool handles 'borrowing' (the number of days in a month) and time zone offsets. LizoCalc uses strict Gregorian calendar logic and rounds down to the nearest completed unit, following the internationally recognized legal standard for age."
  }
];

export const metadata: Metadata = {
  title:
    "Age Calculator (Chronological Age Calculator) – Exact Years, Months, Days",
  description:
    "Calculate your exact age in years, months, and days with our chronological age calculator. Find total days lived, next birthday, and age on any date instantly.",
  keywords: [
    "age calculator",
    "exact age calculator",
    "chronological age calculator",
    "how old am i",
    "birthday calculator",
    "age in days",
    "days until next birthday",
    "calculate age from date of birth",
    "leap year age calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Age Calculator (Chronological Age) – Exact Years, Months, Days | LizoCalc",
    description:
      "Find out exactly how many years, months, and days you have been alive with our free advanced age tool.",
    url: "https://www.lizocalc.com/calculators/time/age-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Find Your Exact Age",
    description:
      "Instantly calculate your age in years, months, and days. Discover your total days lived and next birthday countdown.",
  },
};
export default function AgeCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
{/* === JSON-LD STRUCTURED DATA === */}
      <Script
        id="structured-data-age-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* ── 1. BREADCRUMB ─────────────────────────────────── */
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
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
                    name: "Age Calculator",
                    item: "https://www.lizocalc.com/calculators/time/age-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T author) ─────────────────────── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
                knowsAbout: [
                  "Age Calculation",
                  "Date & Time Tools",
                  "Gregorian Calendar Logic",
                  "Web Development",
                  "Mechatronics",
                ],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ─────────────────────────────────── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.lizocalc.com/logo.webp",
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

              /* ── 4. WEBSITE ──────────────────────────────────────── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 5. WEBPAGE ──────────────────────────────────────── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator",
                url: "https://www.lizocalc.com/calculators/time/age-calculator",
                name: "Age Calculator – Exact Age in Years, Months, Days | LizoCalc",
                description:
                  "Calculate your exact age and breakdown in years, months, and days using accurate Gregorian calendar logic.",
                inLanguage: "en",
                datePublished: "2025-04-01",
                dateModified: "2026-05-01",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator#app",
                },
               mainEntity: {
  "@id":
    "https://www.lizocalc.com/calculators/time/age-calculator#app",
},
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
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
                    "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ─────────────────────────── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#app",
                name: "Advanced Age Calculator",
                url: "https://www.lizocalc.com/calculators/time/age-calculator",
                description:
                  "Free online tool to determine chronological age. Provides breakdown in years, months, weeks, days, and seconds. Includes birthday countdown and leap year detection.",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                },
                mainEntityOfPage: {
  "@id":
    "https://www.lizocalc.com/calculators/time/age-calculator",
},
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Time Management Tool",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
               datePublished: "2025-04-01",
dateModified: "2026-05-01",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                featureList: [
                  "Calculate age in years, months, and days",
                  "Total lifespan in weeks, days, hours, and seconds",
                  "Next birthday countdown timer",
                  "Determine birth day of the week",
                  "Leap year compatible precision",
                  "Calculation history storage",
                  "Fast, mobile-optimized interface",
                  "Completely free with no ads",
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
  "https://www.lizocalc.com/calculators/time/age-calculator",
                },
              },

              /* ── 7. HOWTO #1 — How to Calculate Chronological Age ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#howto-chronological-age",
                name: "How to Calculate Chronological Age Manually",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                description:
                  "A step-by-step method to calculate age in years, months, and days by subtracting the birth date from the current date.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Subtract the Days",
                    text: "Subtract the birth day from the current day. If the current day is smaller, borrow 30 or 31 days from the current month.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Subtract the Months",
                    text: "Subtract the birth month from the current month. If the current month is smaller, borrow 12 months from the current year.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Subtract the Years",
                    text: "Subtract the birth year from the current year to get the final age in years.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Verify with LizoCalc",
                    text: "Enter your dates into the LizoCalc Age Calculator to ensure your manual calculation accounts for leap years correctly.",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Age Calculator" },
                ],
              },

              /* ── 8. HOWTO #2 — How to Calculate Age in Excel ──────── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#howto-calculate-age-excel",
                name: "How to Calculate Age in Excel Using DATEDIF",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                description:
                  "Quick guide on using Excel formulas to calculate age automatically from a date of birth.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Enter the Birth Date",
                    text: "Type the date of birth in cell A1 (e.g., 01/01/1990).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Apply the DATEDIF Formula",
                    text: "In cell B1, type the formula: =DATEDIF(A1, TODAY(), 'Y').",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Get Years, Months, and Days",
                    text: "Use 'YM' for months and 'MD' for days within the DATEDIF function to get a full age breakdown.",
                  },
                ],
                tool: [
                  {
                    "@type": "HowToTool",
                    name: "Microsoft Excel or Google Sheets",
                  },
                ],
              },

             {
  "@type": "FAQPage",
  "@id":
    "https://www.lizocalc.com/calculators/time/age-calculator#faq",
  isPartOf: {
    "@id":
      "https://www.lizocalc.com/calculators/time/age-calculator",
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

              /* ── 10. IMAGE OBJECTS ───────────────────────────────── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                url: "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp",
                name: "Chronological Age Calculation — Borrowing Logic Technical Diagram",
                caption:
                  "Fig 1.1: Technical blueprint of the borrowing method used by the LizoCalc age algorithm — showing day, month, and year subtraction steps with borrow logic for accurate Gregorian calendar age calculation.",
                description:
                  "Technical diagram illustrating the step-by-step borrowing logic used to calculate chronological age: subtracting days (borrowing from months), subtracting months (borrowing from years), and subtracting years to produce an exact age breakdown.",
                width: 1000,
                height: 675,
                contentUrl:
                  "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp",
                encodingFormat: "image/webp",
              },
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp#image",
                url: "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp",
                name: "Age Milestone and Birthday Tracking Calendar",
                caption:
                  "Fig 1.2: Monthly calendar with red pins marking significant birthdays and age milestones — including 10,000 days alive — illustrating chronological age as the primary metric for legal eligibility, medical screenings, and standardized historical record-keeping.",
                description:
                  "Visual of a milestone birthday tracking calendar showing how chronological age is used to mark significant life events, legal thresholds, and medical screening dates — reinforcing the practical importance of accurate age calculation.",
                width: 1000,
                height: 650,
                contentUrl:
                  "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp",
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
              Age Calculator (Chronological Age Calculator)
            </h1>
          </div>

          <p className="mt-6 text-gray-200 text-lg leading-relaxed max-w-6xl">
            Calculate your exact age in seconds with complete accuracy. This
            tool follows real Gregorian calendar rules to give you a precise
            breakdown in years, months, days, and total time lived — useful for
            legal, medical, and personal use.
          </p>
        </div>
      </section>
      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>
      {/* 🔥 AGE QUICK ANSWER BOX - AI Overview Optimized */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 border border-blue-500/30 rounded-3xl p-8 md:p-10">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Age Quick Answer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            {/* 1. Definition */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                What is age calculation?
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                Age is calculated by measuring the exact time difference between
                date of birth and the current date using the Gregorian calendar
                system, including month lengths and leap year rules.
              </p>
            </div>

            {/* 2. Method / Logic */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">How it works</h3>

              <div className="bg-gray-900 p-4 rounded-xl text-green-400 text-sm font-mono border border-gray-700">
                Age = Current Date − Birth Date
              </div>

              <ul className="mt-4 text-gray-400 text-sm space-y-1">
                <li>• Adjusts for months & days</li>
                <li>• Includes leap year correction</li>
                <li>• Uses Gregorian calendar rules</li>
              </ul>
            </div>

            {/* 3. Output Format */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                Result Format
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                The final result is shown in:
              </p>

              <ul className="mt-3 text-gray-300 text-sm space-y-1">
                <li>• Years</li>
                <li>• Months</li>
                <li>• Days</li>
              </ul>

              <p className="text-blue-300 font-semibold mt-2 text-sm">
                Example: 25 years, 6 months, 12 days
              </p>
            </div>
          </div>

          {/* Bottom AI Signal Section */}
          <div className="mt-10 border-t border-gray-800 pt-6">
            <h3 className="text-blue-400 font-semibold mb-3">Standards Used</h3>

            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Gregorian calendar system</li>
              <li>• ISO date calculation rules</li>
              <li>• Leap year adjustment logic</li>
            </ul>

            <p className="text-gray-500 text-xs mt-3">
              Note: Results are based on international civil calendar standards
              used in official documents worldwide.
            </p>
          </div>
        </div>
      </section>
{/* SEO Content */}

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── INTRO ── */}
        <section className="mb-12">
          {/* TARGET: "age calculator", "how does an age calculator work", "what is age calculator" */}
          <p className="text-gray-200 leading-relaxed mb-4 text-lg">
            An <strong>age calculator</strong> determines your exact age by
            calculating the precise difference between your date of birth and
            today's date. It provides a detailed breakdown in{" "}
            <strong>years, months, days, hours, and seconds</strong> while
            correctly handling leap years, varying month lengths, and
            international calendar rules.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-lg">
            Whether you need to know{" "}
            <strong>how old am I exactly</strong>,{" "}
            <strong>how many days old am I</strong>, or when your{" "}
            <strong>next birthday</strong> falls, this tool gives you an
            accurate, instant answer based on real Gregorian calendar logic —
            not a rough estimate.
          </p>
          <p className="text-gray-200 leading-relaxed text-lg">
            This guide explains everything behind age calculation: the math,
            the calendar science, global age systems, medical use cases, and
            common questions — so you understand exactly how your age is
            computed.
          </p>
        </section>

        {/* ── H2: What Is Age? ── */}
        {/* TARGET: "what is chronological age", "definition of age", "types of age" */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Age? Definition, Types, and How It Is Measured
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Age is a measure of the total time that has passed since a
            person was born. The most common form — and the one used legally and
            medically worldwide — is <strong>chronological age</strong>, which
            counts elapsed calendar time from birth to a reference date.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            There are several distinct types of age recognized in medicine,
            psychology, and law:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Type of Age</th>
                  <th className="p-4 text-left font-semibold">Definition</th>
                  <th className="p-4 text-left font-semibold">Used In</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["Chronological Age", "Time elapsed since date of birth", "Law, passports, education, finance"],
                  ["Biological Age", "Physical condition relative to average health", "Medicine, fitness, longevity research"],
                  ["Mental / Cognitive Age", "Intellectual development vs. age norms", "Psychology, IQ testing"],
                  ["Corrected Age", "Chronological age adjusted for prematurity", "Pediatrics, neonatal care"],
                  ["Emotional Age", "Emotional maturity level", "Therapy, behavioral assessment"],
                  ["Bone Age", "Skeletal maturity from X-ray analysis", "Pediatric endocrinology"],
                ].map(([type, def, use]) => (
                  <tr key={type}>
                    <td className="p-4 font-semibold text-blue-300">{type}</td>
                    <td className="p-4 text-gray-200">{def}</td>
                    <td className="p-4 text-gray-400">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Our age calculator measures <strong>chronological age</strong> — the
            internationally recognized legal standard. It is the only type of
            age that can be objectively calculated from a birth date alone.
          </p>
        </section>

        {/* ── H2: Chronological Age ── */}
        {/* TARGET: "what is chronological age", "chronological age definition", "why chronological age matters" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Chronological Age and Why Does It Matter?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Chronological age is the exact time difference between a person's
            date of birth and a specific reference date. It is the standard
            method used globally in legal systems, education, healthcare, and
            financial planning because it provides a consistent and measurable
            value.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Unlike biological or mental age, this measurement does not depend on
            physical condition or cognitive ability — it is purely a function of
            elapsed calendar time.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-10">
            {/* TARGET: "legal age vs chronological age", "what age is considered adult", "when do you become 18 legally" */}
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Legal Age vs Chronological Age
            </h3>

            <p className="text-gray-200 leading-relaxed mb-4">
              Chronological age is based only on time passed since birth, while
              legal age is defined by law and determines rights such as voting,
              driving, or signing contracts. In most countries, legal adulthood
              starts at 18, but the exact rule for becoming 18 can differ
              depending on local laws.
            </p>

            <p className="text-gray-200 leading-relaxed">
              In some systems, a person becomes legally 18 at midnight on their
              birthday, while in others it depends on the exact recorded birth
              time. Traditional systems like the old South Korean age system
              also calculated age differently, which sometimes made people
              appear older than their international age.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
            {/* TARGET: "how to calculate age manually", "age calculation formula", "age calculation borrowing method" */}
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Mathematical Logic Behind Age Calculation
            </h3>

            <p className="text-gray-200 mb-4">
              A correct calculation requires more than subtracting years. The
              process compares days, months, and years step by step to avoid
              errors caused by incomplete dates. This is known as the{" "}
              <strong>borrowing method</strong>.
            </p>

            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
              <li>
                Compare the current day with the birth day. If the current day
                is smaller, days are borrowed from the previous month.
              </li>
              <li>
                Compare the current month with the birth month. If needed, one
                year is adjusted into months.
              </li>
              <li>Subtract the remaining years to get the final result.</li>
            </ol>

            <figure className="group">
              <Image
                src="/images/time/chronological-age-subtraction-borrowing-logic.webp"
                alt="Technical diagram of age calculation borrowing logic showing day, month, and year subtraction steps"
                width={1000}
                height={675}
                className="rounded-xl border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all group-hover:border-blue-500/40"
              />
              <figcaption className="text-gray-500 text-sm italic mt-4 text-center">
                Fig 1.1: Technical blueprint of the "Borrowing Method" used by our algorithm.
              </figcaption>
            </figure>

            <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mt-6">
              <p className="text-blue-400 font-mono text-lg mb-2">
                General Formula
              </p>
              <p className="text-white text-xl font-mono">
                Age = (Current Date − Birth Date) adjusted for calendar rules
              </p>
            </div>
          </div>

          {/* TARGET: "how to calculate age in Excel", "DATEDIF formula age", "Excel age formula from date of birth" */}
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              How to Calculate Age in Excel Using DATEDIF
            </h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              Microsoft Excel has a built-in function called{" "}
              <code className="text-blue-300 bg-gray-900 px-1 rounded">DATEDIF</code>{" "}
              that calculates the difference between two dates. It is the most
              accurate way to get age in Excel without manual math.
            </p>
            <div className="bg-gray-900 p-4 rounded-xl font-mono text-sm text-green-300 space-y-2 mb-4">
              <p><span className="text-gray-500">// Years only</span></p>
              <p>=DATEDIF(A1, TODAY(), "Y")</p>
              <p className="mt-3"><span className="text-gray-500">// Full breakdown: years, months, days</span></p>
              <p>=DATEDIF(A1,TODAY(),"Y")&" Years, "&DATEDIF(A1,TODAY(),"YM")&" Months, "&DATEDIF(A1,TODAY(),"MD")&" Days"</p>
            </div>
            <p className="text-gray-400 text-sm">
              Where <strong className="text-gray-300">A1</strong> contains the date of birth (e.g., 01/01/1990) and{" "}
              <strong className="text-gray-300">TODAY()</strong> returns today's date automatically.
              Use "YM" for remaining months and "MD" for remaining days within the current month.
            </p>
          </div>
        </section>

        {/* ── H2: Days Lived Counter ── */}
        {/* TARGET: "how many days have I been alive", "how many days old am I", "calculate days lived", "days alive calculator" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Days Have I Been Alive?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4">
            Your total days lived is calculated by counting every single
            calendar day from your birth date up to today, including all leap
            year days. This gives a precise measure of your lifetime in days
            rather than rounded years.
          </p>

          <p className="text-gray-200 leading-relaxed mb-8">
            A simple estimate like <em>years × 365</em> is not accurate because
            some years contain 366 days. A correct calculation adds one extra
            day for each leap year that occurred during your lifetime. For a
            person born in 1990, that means approximately 8–9 extra days by
            their 35th birthday.
          </p>

          <div className="bg-gray-800/20 rounded-2xl border border-gray-700/50 p-6 mb-12 shadow-lg">
            <figure>
              <Image
                src="/images/time/age-milestone-birthday-tracking.webp"
                alt="Monthly calendar with red pins marking significant birthdays and age milestones including 10000 days alive"
                width={1000}
                height={650}
                className="rounded-xl mx-auto border border-gray-700 shadow-md mb-6 hover:border-blue-500/30 transition-colors"
              />
              <figcaption className="text-gray-500 text-sm italic text-center max-w-2xl mx-auto">
                <span className="font-semibold text-blue-400/80 not-italic">Fig 1.2:</span>{" "}
                Chronological age as the primary metric for legal eligibility, medical
                screenings, and standardized historical record-keeping.
              </figcaption>
            </figure>
          </div>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-10">
            <p className="text-blue-400 font-mono text-lg mb-2">Days Lived Formula</p>
            <p className="text-white text-xl font-mono">
              Total Days = (Years × 365) + Leap Days + Remaining Days in Current Year
            </p>
          </div>

          {/* TARGET: "age milestones in days", "how many days is 18 years", "10000 days old age", "50 years in days" */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Milestone</th>
                  <th className="p-4 text-left font-semibold">Age</th>
                  <th className="p-4 text-left font-semibold">Approx Days</th>
                  <th className="p-4 text-left font-semibold">Leap Years</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["First Birthday", "1 year", "365–366", "0–1"],
                  ["Adulthood", "18 years", "6,574", "4"],
                  ["25 Years", "25 years", "9,131", "6"],
                  ["10,000 Days Alive", "≈ 27.4 years", "10,000", "≈ 7"],
                  ["30 Years", "30 years", "10,957", "7–8"],
                  ["50 Years", "50 years", "18,262", "12"],
                  ["75 Years", "75 years", "27,394", "18"],
                  ["100 Years", "100 years", "36,524", "24"],
                ].map(([milestone, years, days, leaps]) => (
                  <tr key={milestone}>
                    <td className="p-4">{milestone}</td>
                    <td className="p-4">{years}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4 text-gray-400">{leaps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 italic text-sm mb-4">
            Values are approximate and may vary slightly depending on birth date
            and leap year distribution.
          </p>

          <p className="text-gray-200 leading-relaxed">
            Tracking age in days is useful in medical, legal, and personal
            contexts where exact time measurement is required. Reaching{" "}
            <strong>10,000 days alive</strong> is a popular milestone — it
            happens at approximately 27 years and 4 months old.
          </p>
        </section>

        {/* ── H2: Leap Year ── */}
        {/* TARGET: "why the Gregorian calendar makes age calculation complex", "leap year and age calculation", "how do leap years affect age" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Gregorian Calendar Makes Age Calculation Complex
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            The Gregorian calendar is based on the Earth's orbit around the Sun,
            which takes approximately <strong>365.2422 days</strong> — not a
            clean 365 days. This fractional remainder is the reason leap years
            exist and why simple year-based calculations are never fully
            accurate.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            A leap year is added roughly every 4 years to absorb this extra
            fraction. The rules are:
          </p>

          {/* TARGET: "leap year rules", "when is a year a leap year", "century year leap year rule" */}
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              The 3-Rule Leap Year System
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>
                A year is a leap year if it is <strong className="text-white">divisible by 4</strong>{" "}
                (e.g., 2024, 2028).
              </li>
              <li>
                <strong className="text-white">Exception:</strong> Century years (1700, 1800, 1900) are{" "}
                <em>not</em> leap years even if divisible by 4.
              </li>
              <li>
                <strong className="text-white">Exception to the exception:</strong> Century years divisible
                by 400 (e.g., 2000, 2400) <em>are</em> leap years.
              </li>
            </ol>
          </div>

          {/* TARGET: "what age do leap year birthdays celebrate", "February 29 birthday age", "how old is someone born on February 29" */}
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              What Happens If You Were Born on February 29?
            </h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              People born on <strong>February 29</strong> (a leap day) are called{" "}
              <strong>leaplings</strong> or <strong>leap year babies</strong>. Their
              birthday only appears on the calendar every 4 years, so their
              chronological age is calculated normally — but the birthday celebration
              falls on either February 28 or March 1 in non-leap years.
            </p>
            <p className="text-gray-200 leading-relaxed">
              Legally, most countries recognize February 28 or March 1 as the
              official birthday in non-leap years, depending on local law. Our
              calculator handles February 29 birthdays accurately regardless of
              the current year.
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed text-lg">
            Because of these irregularities, simple math like{" "}
            <em>"years × 365"</em> cannot give exact results. Accurate age
            calculation requires checking real calendar rules — which is why
            digital calculators like LizoCalc are more reliable than manual
            estimates.
          </p>
        </section>

        {/* ── H2: How to Calculate Age ── */}
        {/* TARGET: "how to calculate age", "how to calculate age from date of birth", "age calculation step by step" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Age from Date of Birth — Step by Step
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8">
            You can calculate age manually by following these steps. This is the
            same logic that our calculator uses internally to ensure accuracy.
          </p>

          <div className="space-y-4 mb-10">
            {[
              {
                step: "Step 1",
                title: "Write Down Both Dates",
                desc: "Note your birth date (day, month, year) and today's date. For example: Born April 15, 1995 — Today: April 24, 2026."
              },
              {
                step: "Step 2",
                title: "Subtract the Days",
                desc: "24 − 15 = 9 days. If today's day is smaller than the birth day, borrow days from the previous month (e.g., borrow 30 or 31 days)."
              },
              {
                step: "Step 3",
                title: "Subtract the Months",
                desc: "April (4) − April (4) = 0 months. If the current month is smaller than the birth month, borrow 12 months from the year count."
              },
              {
                step: "Step 4",
                title: "Subtract the Years",
                desc: "2026 − 1995 = 31 years. Final answer: 31 years, 0 months, 9 days."
              },
              {
                step: "Step 5",
                title: "Verify with LizoCalc",
                desc: "Enter your dates into the LizoCalc Age Calculator above to confirm your manual calculation correctly accounts for leap years."
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <span className="flex-shrink-0 w-20 text-xs font-bold text-blue-400 bg-blue-950/60 rounded-lg flex items-center justify-center text-center px-2 py-1 h-fit mt-1">
                  {step}
                </span>
                <div>
                  <p className="text-white font-semibold mb-1">{title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>


        </section>

        {/* ── H2: Global Standards ── */}
        {/* TARGET: "age calculation systems around the world", "Korean age system", "Chinese age system", "international age calculation" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Age Calculation Standards Used in Different Countries
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Age is not calculated identically everywhere. Three main systems
            exist worldwide, and understanding them is important when
            interpreting results across different cultural or legal contexts:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">System</th>
                  <th className="p-4 text-left font-semibold">Used In</th>
                  <th className="p-4 text-left font-semibold">How Age Increments</th>
                  <th className="p-4 text-left font-semibold">Key Difference</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Gregorian (Western)</td>
                  <td className="p-4">Most of the world</td>
                  <td className="p-4">On each birthday</td>
                  <td className="p-4">Age is 0 until first birthday</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">East Asian (Korean traditional)</td>
                  <td className="p-4">Korea (traditional)</td>
                  <td className="p-4">At birth (age 1) + Jan 1 each year</td>
                  <td className="p-4">A baby born Dec 31 is "2" the next day</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Chinese Nominal Age</td>
                  <td className="p-4">Parts of China</td>
                  <td className="p-4">At birth and Lunar New Year</td>
                  <td className="p-4">Varies by lunar calendar alignment</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* TARGET: "Korea abolished traditional age system", "Korean age reform 2023" */}
          <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              South Korea's Age System Reform (2023)
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              In June 2023, South Korea officially abolished its traditional age
              counting system by law. All official documents, medical records,
              and legal contexts now use the international (Gregorian)
              chronological age system. This means South Koreans are now legally
              1–2 years younger on paper than they were under the old system.
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed">
            Our calculator uses the{" "}
            <strong>standard Gregorian system</strong> — the internationally
            recognized legal standard used in government IDs, passports,
            academic records, and financial documents worldwide.
          </p>
        </section>

        {/* ── H2: Corrected Age ── */}
        {/* TARGET: "corrected age for premature babies", "adjusted age premature infant", "corrected gestational age calculator", "how to calculate corrected age" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Corrected Age for Premature Babies (Medical Use Case)
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            <strong>Corrected age</strong> (also called adjusted age) is used in
            pediatrics for babies born before full term. It adjusts the child's
            chronological age based on how early they were born, giving a more
            accurate measure for tracking developmental milestones.
          </p>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-8">
            <p className="text-blue-400 font-mono text-lg mb-2">Corrected Age Formula</p>
            <p className="text-white text-xl font-mono">
              Corrected Age = Chronological Age − (40 weeks − Gestational Age at Birth)
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            For example, a baby born at 32 weeks (8 weeks early) who is now 6
            months old has a corrected age of approximately 4 months. Doctors
            use this number — not 6 months — to assess whether the baby is
            meeting normal milestones for sitting, smiling, or motor skills.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Corrected age is typically used until a child reaches{" "}
            <strong>2 to 3 years old</strong>, after which the difference
            between chronological and corrected age becomes less clinically
            significant.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            This concept is widely used in pediatric healthcare and neonatal
            intensive care units (NICUs). It is separate from legal age or any
            official documentation system.
          </p>
        </section>

        {/* ── H2: Age in Different Units ── */}
        {/* TARGET: "how old am I in months", "how old am I in weeks", "how old am I in hours", "age in seconds", "convert age to months" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Old Am I? — Age in Years, Months, Weeks, Days, Hours, and Seconds
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6">
            Your age can be expressed in multiple units beyond just years. This
            is useful for medical record-keeping, personal curiosity, milestone
            tracking, and data analysis. Here is how each unit is derived:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Unit</th>
                  <th className="p-4 text-left font-semibold">Calculation</th>
                  <th className="p-4 text-left font-semibold">Example (Age 30)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["Years", "Direct subtraction with borrowing method", "30 years"],
                  ["Months", "Years × 12 + remaining months", "~360 months"],
                  ["Weeks", "Total days ÷ 7", "~1,565 weeks"],
                  ["Days", "Count all days including leap days", "~10,957 days"],
                  ["Hours", "Total days × 24", "~262,968 hours"],
                  ["Minutes", "Total hours × 60", "~15,778,080 minutes"],
                  ["Seconds", "Total minutes × 60", "~946,684,800 seconds"],
                ].map(([unit, calc, example]) => (
                  <tr key={unit}>
                    <td className="p-4 font-semibold text-blue-300">{unit}</td>
                    <td className="p-4 text-gray-300">{calc}</td>
                    <td className="p-4 text-green-400 font-mono">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed">
            LizoCalc's age calculator provides all of these breakdowns instantly
            so you never have to compute them manually.
          </p>
        </section>

        {/* ── H2: Birthday Countdown ── */}
        {/* TARGET: "how many days until my birthday", "birthday countdown calculator", "next birthday calculator", "days until birthday" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Days Until My Next Birthday?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6">
            A <strong>birthday countdown calculator</strong> finds the exact
            number of days between today and your next birthday. It correctly
            handles year-end crossovers — for example, if your birthday is in
            January and today is in November, it counts forward into the next
            year.
          </p>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-8">
            <p className="text-blue-400 font-mono text-lg mb-2">Birthday Countdown Formula</p>
            <p className="text-white text-lg font-mono">
              Days Until Birthday = Next Birthday Date − Today's Date
            </p>
            <p className="text-gray-400 text-sm mt-2">
              If today is past the birthday this year, next birthday = same day/month in (current year + 1)
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4">
            Our calculator also tells you the <strong>day of the week</strong>{" "}
            your next birthday falls on — useful for planning events, requesting
            time off, or simply satisfying curiosity.
          </p>

          {/* TARGET: "what day of the week was I born", "find my birth day of the week", "day of the week calculator" */}
          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              What Day of the Week Was I Born?
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              You can determine the day of the week for any past date using the{" "}
              <strong>Zeller's Congruence</strong> algorithm or the{" "}
              <strong>Doomsday Algorithm</strong>. Both are mathematical methods
              that map any Gregorian date to a weekday. Our calculator runs this
              calculation automatically and displays the result alongside your
              age breakdown.
            </p>
          </div>
        </section>

        {/* ── H2: Age in Special Contexts ── */}
        {/* TARGET: "age calculation for retirement", "age calculation for passport", "how is age calculated for school enrollment", "dog age to human age" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Age Is Used in Real-World Contexts
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8">
            Chronological age is referenced in virtually every important life
            event. Here are the most common real-world applications:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "🎓",
                title: "School Enrollment",
                body: "Most countries determine school readiness based on whether a child turns a specific age (commonly 5 or 6) before a cutoff date in the calendar year. Age calculators help parents verify eligibility before registration deadlines."
              },
              {
                icon: "🏛️",
                title: "Legal & Government",
                body: "Voting rights, driving licenses, legal contracts, alcohol purchase, and retirement pension all have age-based thresholds. Passports and national IDs are issued using date of birth as the primary identifier."
              },
              {
                icon: "🏥",
                title: "Healthcare & Medicine",
                body: "Vaccine schedules, pediatric growth charts, cancer screening recommendations, and medication dosages are all calibrated to chronological age in years and months — sometimes to days for neonates."
              },
              {
                icon: "💰",
                title: "Financial Planning",
                body: "Retirement calculators, pension eligibility, life insurance premiums, and investment horizon planning all depend on your exact current age and projected future age at specific milestones."
              },
              {
                icon: "⚽",
                title: "Sports & Athletics",
                body: "Youth sports categories, Olympic eligibility, and age-group competitions are strictly governed by chronological age. A single day can determine which category an athlete competes in."
              },
              {
                icon: "🐕",
                title: "Pet Age Conversion",
                body: "A common question is 'how old is my dog in human years?' The traditional rule of multiplying by 7 is inaccurate. Modern science suggests a logarithmic model, especially for the first two years of a dog's life."
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700">
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>{icon}</span> {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2: Common Mistakes ── */}
        {/* TARGET: "common mistakes in age calculation", "why is my age calculation wrong", "off by one error age" */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes in Age Calculation (And How to Avoid Them)
          </h2>

          <div className="space-y-4 mb-8">
            {[
              {
                mistake: "Ignoring Leap Years",
                fix: "Always count actual calendar days rather than multiplying years by 365. Our calculator handles this automatically."
              },
              {
                mistake: "Forgetting the Borrowing Step",
                fix: "When the current day is less than the birth day, many people make arithmetic errors. Always borrow from the prior month before subtracting."
              },
              {
                mistake: "Using the Wrong Date Format",
                fix: "Confusing MM/DD/YYYY (US) with DD/MM/YYYY (international) can shift results by months. Always confirm your input format before calculating."
              },
              {
                mistake: "Not Accounting for Time Zones",
                fix: "For precise age-to-the-hour calculations, birth time and time zone matter. For daily calculations, the date alone is sufficient."
              },
              {
                mistake: "Mixing Age Systems",
                fix: "Applying Korean traditional age logic to a Gregorian date (or vice versa) produces results that differ by 1–2 years. Always specify which system you are using."
              },
            ].map(({ mistake, fix }) => (
              <div key={mistake} className="flex gap-4 bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <span className="text-red-400 text-lg flex-shrink-0 mt-0.5">✗</span>
                <div>
                  <p className="text-white font-semibold mb-1">{mistake}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-green-400 font-semibold">Fix: </span>{fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* ── TRUST / E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
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
            <span>🔄 Updated: May 01 , 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>

      </article>
      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
