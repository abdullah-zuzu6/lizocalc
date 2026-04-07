import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import NoPrefetchLink from "@/components/NoPrefetchLink";
import AgeCalculator from "./clientside";


const faqData = [
  {
    question: "How is my exact age calculated?",
    answer: "Your exact age is determined by calculating the difference between your birth date and the current date. To find this manually, subtract the birth year from the current year, then adjust based on whether your birthday has occurred yet in the current year. The standard formula is: Age = Current Year - Birth Year (minus 1 if the current month/day is before your birth month/day).",
  },
  {
    question: "How many days have I been alive?",
    answer: "To calculate your total days lived, multiply your age in years by 365 and add the number of days passed since your last birthday. Crucially, you must add 1 extra day for every leap year you have lived through. The logic follows: Total Days = (Years × 365) + Leap Days + Days since last birthday.",
  },
  {
    question: "Does the age calculator account for leap years?",
    answer: "Yes, a precise age calculator accounts for leap years by recognizing that February has 29 days every four years. A year is a leap year if it is divisible by 4, except for century years unless they are divisible by 400. This ensures your 'age in days' remains 100% accurate over long periods.",
  },
  {
    question: "How do I calculate my age in months or weeks?",
    answer: "To find your age in months, multiply your total years by 12 and add the months passed since your last birthday. For weeks, divide your total days lived by 7. For example, if you are 25 years and 6 months old, your age in months is (25 × 12) + 6 = 306 months.",
  },
  {
    question: "What is my age if I was born on February 29th?",
    answer: "If you were born on a leap day (February 29th), your legal age usually increments on March 1st during non-leap years. However, for calculation purposes, the tool counts the exact number of days elapsed. You effectively celebrate a 'true' birthday only once every 1,461 days.",
  },
  {
    question: "How can I calculate the age difference between two people?",
    answer: "To find the age gap, convert both individuals' birth dates into a total day count or 'Unix timestamp' and subtract the smaller number from the larger one. Step 1: Calculate Total Days for Person A. Step 2: Calculate Total Days for Person B. Step 3: Difference = |A - B|. This result can then be converted back into years, months, and days.",
  }
];
export const metadata: Metadata = {
  title: "Age Calculator (Chronological Age Calculator) – Exact Years, Months, Days",
  description:"Calculate your exact age in years, months, and days with our chronological age calculator. Find total days lived, next birthday, and age on any date instantly.",
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
   title: "Age Calculator (Chronological Age) – Exact Years, Months, Days | LizoCalc",
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
     {/* === JSON-LD STRUCTURED DATA === */}
<Script
  id="structured-data"
  type="application/ld+json"
  strategy="beforeInteractive"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [

        // ── 1. BREADCRUMB ──────────────────────────────────────
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
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

        // ── 2. WEBPAGE ─────────────────────────────────────────
        {
          "@type": "WebPage",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator",
          url: "https://www.lizocalc.com/calculators/time/age-calculator",
          name: "Age Calculator – Exact Age in Years, Months, Days | LizoCalc",
          description:
            "Calculate your exact age and the time remaining until your next birthday. Find out how many days, hours, and seconds you have lived with our high-precision age tool.",
          inLanguage: "en",
          datePublished: "2025-04-01",
          dateModified: "2026-04-08",
          isPartOf: {
            "@type": "WebSite",
            name: "LizoCalc",
            url: "https://www.lizocalc.com",
          },
          mainEntity: {
            "@id": "https://www.lizocalc.com/calculators/time/age-calculator#howto-chronological-age"
          },
          mainEntityOfPage: {
            "@type": "SoftwareApplication",
            "@id": "https://www.lizocalc.com/calculators/time/age-calculator#app",
          },
        },

        // ── 3. SOFTWARE APPLICATION ────────────────────────────
        {
          "@type": "SoftwareApplication",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator#app",
          name: "Advanced Age Calculator",
          url: "https://www.lizocalc.com/calculators/time/age-calculator",
          image: "https://www.lizocalc.com/logo.webp",
          description:
            "Free online tool to determine chronological age. Provides breakdown in years, months, weeks, days, and seconds. Includes birthday countdown and leap year detection.",
          applicationCategory: "UtilitiesApplication",
          applicationSubCategory: "Time Management Tool",
          operatingSystem: "Any",
          inLanguage: "en",
          browserRequirements: "Requires JavaScript. Works on all modern browsers.",
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
            "@type": "Organization",
            name: "LizoCalc",
            url: "https://www.lizocalc.com",
            logo: "https://www.lizocalc.com/logo.webp"
          },
          potentialAction: {
            "@type": "UseAction",
            target: [
              "https://www.lizocalc.com/calculators/time/age-calculator",
            ],
          },
        },

        // ── 4. HOWTO #1 — How to Calculate Chronological Age ────────
        {
          "@type": "HowTo",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator#howto-chronological-age",
          name: "How to Calculate Chronological Age Manually",
          image: "https://www.lizocalc.com/logo.webp",
          description: "A step-by-step method to calculate age in years, months, and days by subtracting the birth date from the current date.",
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
            }
          ],
          tool: [{ "@type": "HowToTool", name: "LizoCalc Age Calculator" }],
        },

        // ── 5. HOWTO #2 — How to Calculate Age in Excel ───────────────
        {
          "@type": "HowTo",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator#howto-calculate-age-excel",
          name: "How to Calculate Age in Excel Using DATEDIF",
          image: "https://www.lizocalc.com/logo.webp",
          description: "Quick guide on using Excel formulas to calculate age automatically from a date of birth.",
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
            }
          ],
          tool: [{ "@type": "HowToTool", name: "Microsoft Excel or Google Sheets" }],
        },

        // ── 6. HOWTO #3 — How to Find Age on a Specific Date ──────────
        {
          "@type": "HowTo",
          "@id": "https://www.lizocalc.com/calculators/time/age-calculator#howto-age-specific-date",
          name: "How to Determine Your Age on a Specific Date in the Future",
          image: "https://www.lizocalc.com/logo.webp",
          description: "Learn how to find out how old you will be on a specific future event or historical date.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Identify the Target Date",
              text: "Select the specific future date (e.g., a retirement date or upcoming holiday).",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Calculate Year Difference",
              text: "Subtract your birth year from the target year.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Check the Anniversary",
              text: "If the target date month/day comes before your birthday in that year, subtract one year from the total.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Use LizoCalc for Accuracy",
              text: "Change the 'Age at Date' field on LizoCalc to your target date for an instant, error-free result.",
            }
          ],
          tool: [{ "@type": "HowToTool", name: "LizoCalc Age Calculator" }],
        },

        // ── 7. FAQ PAGE ────────────────────────────────────────
        {
          "@type": "FAQPage",
          mainEntity: faqData.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        },

      ],
    }),
  }}
/>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            
            <h1 className="text-3xl md:text-4xl font-bold">Age Calculator (Chronological Age Calculator) – Find Exact Age in Years, Months & Days</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>

      {/* SEO Content */}
  
    <article className="max-w-6xl mx-auto px-6 py-16 text-white">

      {/* ── INTRO ── */}
      <section className="mb-12">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          Calculating your <strong>exact age today</strong> goes far beyond counting birthdays. Whether
          you need a verified figure for a job application, competitive exam eligibility, medical
          records, insurance policy, or a personal milestone, mental math and approximate guesses can
          cause real-world problems. Our <strong>online age calculator</strong> delivers a
          high-precision, multi-unit breakdown — years, months, weeks, days, hours, and minutes —
          accounting for every leap year and calendar irregularity the Gregorian system introduces.
        </p>
        <p className="text-gray-200 leading-relaxed text-lg">
          At LizoCalc, this is not a simple birth date counter. It is a full{" "}
          <strong>chronological age calculator</strong> and <strong>time-tracking engine</strong> built
          for accuracy-first users: students verifying exam cutoffs, parents tracking infant
          development, HR managers checking contract clauses, and anyone curious about just how many
          days they have actually been alive.
        </p>
      </section>

      {/* ── H2: Chronological Age ── */}
      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          What Is Chronological Age and Why Does It Matter?
        </h2>
        <p className="text-gray-200 leading-relaxed mb-4 text-base">
          <strong>Chronological age</strong> is the precise measure of time elapsed between your date
          of birth and any reference date — past, present, or future. It is the universal legal
          standard used in government records, academic institutions, healthcare systems, and financial
          planning worldwide. Unlike biological age (which reflects your body's health state) or
          mental age (a psychological metric), chronological age is fixed, objective, and verifiable.
        </p>
        <p className="text-gray-200 leading-relaxed mb-8 text-base">
          Understanding your chronological age in multiple units is increasingly important. A
          newborn's development is tracked in weeks. School admission cut-offs are measured in exact
          days. Retirement benefits are calculated down to the specific month. An{" "}
          <strong>accurate age calculator</strong> that handles all these units simultaneously removes
          any ambiguity.
        </p>

        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Mathematical Logic Behind Age Calculation
          </h3>
          <p className="text-gray-200 mb-4">
            Age is not simply "current year minus birth year." That shortcut ignores whether the
            current date has passed your birthday in the current year, producing errors of up to 364
            days. The correct algorithm uses a three-part subtraction across days, months, and years
            with borrowing logic:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
            <li>
              Subtract the birth day from the current day. If the result is negative, borrow 1 month
              and add the days in the previous month.
            </li>
            <li>
              Subtract the birth month from the current month (after any borrowing). If negative,
              borrow 1 year.
            </li>
            <li>
              Subtract the birth year from the remaining current year to get the final completed
              years.
            </li>
          </ol>
          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center">
            <p className="text-blue-400 font-mono text-lg mb-2">General Age Formula:</p>
            <p className="text-white text-xl font-mono">
              Age = (Date_Current − Date_Birth) adjusted for Leap Years and month lengths
            </p>
          </div>
        </div>
      </section>

      {/* ── H2: Days Lived Counter ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How Many Days Have I Been Alive? The Total Days Counter Explained
        </h2>
        <p className="text-gray-200 leading-relaxed mb-4">
          One of the most searched queries in this space is{" "}
          <strong>"how many days old am I?"</strong> — and for good reason. Seeing your entire life
          expressed as a single, growing number of days provides a perspective that years alone cannot.
          Every person alive today has lived through a unique count of sunrises, and knowing that exact
          number has become a popular personal milestone marker.
        </p>
        <p className="text-gray-200 leading-relaxed mb-8">
          The calculation is precise because it accounts for every leap year between your birth and
          today. A person turning 30 on a non-leap year will have lived through 7 or 8 leap years
          depending on their birth date, adding extra days that a naive multiplication of 30 × 365
          would miss entirely.
        </p>

        <div className="overflow-x-auto mb-6">
          <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-blue-900/70">
                <th className="p-4 text-left font-semibold">Life Milestone</th>
                <th className="p-4 text-left font-semibold">Age (Years)</th>
                <th className="p-4 text-left font-semibold">Total Days (Approx)</th>
                <th className="p-4 text-left font-semibold">Leap Years Counted</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800/50 divide-y divide-gray-700">
              {[
                ["First Birthday", "1", "365 or 366", "0 or 1"],
                ["Legal Adulthood", "18", "6,574", "4"],
                ["Silver Jubilee", "25", "9,131", "6"],
                ["10,000-Day Milestone", "≈ 27.4", "10,000", "≈ 7"],
                ["Golden Jubilee", "50", "18,262", "12"],
                ["Diamond Jubilee", "75", "27,394", "18"],
                ["Century Milestone", "100", "36,524", "24"],
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

        <p className="text-gray-400 italic text-sm mb-6">
          Values assume birth on a standard non-leap date. Actual totals vary by ±1–2 days based on
          birth month and year.
        </p>
        <p className="text-gray-200 leading-relaxed">
          The <strong>10,000-day milestone</strong> — reached at roughly age 27 years and 4 months —
          has become a culturally popular celebration, a way of marking nearly three decades of lived
          experience with a satisfying round number. Our <strong>birthday age calculator</strong> shows
          your next major day milestone automatically.
        </p>
      </section>

      {/* ── H2: Age on a Specific Date ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How to Calculate Your Age on a Specific Future or Past Date
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6">
          Not every age question is about right now. Planning for <strong>pension eligibility</strong>,
          checking <strong>retirement benefit thresholds</strong>, verifying{" "}
          <strong>visa age requirements</strong>, or preparing for academic enrollment all require
          knowing your exact age on a specific date in the future or past. Our "Age at Date" feature
          handles this by accepting any reference date — not just today.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Why the Leap Year Algorithm Matters for Future Age
        </h3>
        <p className="text-gray-200 mb-6">
          A common mistake in manual future-age calculation is using a flat 365-day year. Over
          decades, this causes errors of days to weeks. Our <strong>precise age calculator</strong>{" "}
          applies the full Gregorian leap year ruleset:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              title: "Rule 1 — Divisible by 4",
              color: "border-blue-500",
              text: "If the year divides evenly by 4, it is a potential leap year (e.g., 2024, 2028).",
            },
            {
              title: "Rule 2 — Divisible by 100",
              color: "border-yellow-500",
              text: "If the year also divides by 100, it loses leap status (e.g., 1900 was not a leap year).",
            },
            {
              title: "Rule 3 — Divisible by 400",
              color: "border-green-500",
              text: "If the year divides by 400, leap status is fully restored (e.g., 2000 was a leap year).",
            },
          ].map(({ title, color, text }) => (
            <div
              key={title}
              className={`bg-gray-800/50 p-5 rounded-xl border-l-4 ${color} border border-gray-700`}
            >
              <h4 className="text-blue-300 font-semibold mb-2">{title}</h4>
              <p className="text-gray-300 text-sm">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-gray-200 leading-relaxed">
          This three-rule system means that between 1801 and 2100 there are exactly 97 leap years per
          400-year cycle — not 100. Ignoring this introduces a cumulative error that compounds over
          long time spans, which is exactly the kind of inaccuracy that disqualifies a simple estimate
          from professional use.
        </p>
      </section>

      {/* ── H2: Age Converter ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Professional Age Converter: Years, Months, Weeks, Days, Hours, and Minutes
        </h2>
        <p className="text-gray-200 leading-relaxed mb-8">
          In healthcare, law, and personal analytics, a single unit of age is rarely enough. A{" "}
          <strong>professional age converter</strong> translates your total lifespan into every
          meaningful unit simultaneously. Here is how each conversion works and where each unit is
          most commonly used:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              badge: "Clinical / infant tracking",
              title: "Age in Weeks",
              formula: "Weeks = Total Days ÷ 7",
              desc:
                "Used in neonatal medicine, prenatal development tracking, and pediatric vaccination schedules. A baby described as '32 weeks corrected age' is understood precisely by every healthcare provider worldwide.",
            },
            {
              badge: "Personal milestone",
              title: "Age in Days",
              formula: "Days = Σ days in each calendar year lived",
              desc:
                "The most granular whole-number unit. Used for day-of-life counting in NICU settings, personal milestone tracking, and precise legal age verification where months alone are insufficient.",
            },
            {
              badge: "Time perspective",
              title: "Age in Hours",
              formula: "Hours = Total Days × 24",
              desc:
                "A striking way to frame your lived experience. A 30-year-old has lived approximately 262,980 hours. Popular in motivational and productivity contexts.",
            },
            {
              badge: "Full precision",
              title: "Age in Minutes",
              formula: "Minutes = Total Days × 1,440",
              desc:
                "The highest-resolution unit in common use. Used in certain medical contexts where sub-hour precision is required, such as post-operative age of a premature infant.",
            },
          ].map(({ badge, title, formula, desc }) => (
            <div
              key={title}
              className="bg-blue-900/20 p-6 rounded-2xl border border-blue-800/50"
            >
              <span className="inline-block text-xs font-semibold bg-blue-900/60 text-blue-300 px-3 py-1 rounded-full mb-3">
                {badge}
              </span>
              <h4 className="text-xl font-bold text-blue-300 mb-2">{title}</h4>
              <p className="text-white font-mono text-sm bg-gray-900/60 px-4 py-2 rounded-lg mb-3">
                {formula}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── H2: Who Uses It ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Who Uses an Online Age Calculator — and for What?
        </h2>
        <p className="text-gray-200 leading-relaxed mb-8">
          The range of people who need a <strong>free accurate age calculator</strong> is broader than
          it might appear. Below are the most common real-world use cases grouped by audience:
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Students and Exam Applicants</h3>
        <ul className="space-y-3 mb-8">
          {[
            {
              label: "Competitive exam eligibility:",
              text:
                "Most government and civil service exams publish an age cutoff 'as of' a specific advertisement date. Being off by even a single day can invalidate an application. A chronological age check against that exact date is essential.",
            },
            {
              label: "University enrollment:",
              text:
                "Undergraduate and postgraduate programs in many countries set minimum and maximum age windows. Applicants need their age calculated to the day of the application deadline, not just the current year.",
            },
            {
              label: "Scholarship and fellowship applications:",
              text:
                "Many research fellowships specify 'must be under 35 as of the submission deadline.' Our calculator gives the exact figure for any custom reference date.",
            },
          ].map(({ label, text }) => (
            <li
              key={label}
              className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-blue-500 text-gray-200 text-sm leading-relaxed"
            >
              <strong className="text-white">{label}</strong> {text}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Parents and Healthcare Users</h3>
        <ul className="space-y-3 mb-8">
          {[
            {
              label: "Pediatric vaccine scheduling:",
              text:
                "Immunization programs are staged at 6 weeks, 10 weeks, 14 weeks, and so on from birth. Parents and nurses use a weeks-based age calculator to confirm correct timing.",
            },
            {
              label: "School admission cut-offs:",
              text:
                "Many school systems require a child to have reached a specific age before a set date (commonly August 31 or September 1). Parents need exact-day precision to know whether their child qualifies.",
            },
            {
              label: "Developmental milestone tracking:",
              text:
                "Pediatric assessments reference age in months for the first three years of life. Our age in months calculator removes the guesswork.",
            },
          ].map(({ label, text }) => (
            <li
              key={label}
              className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-teal-500 text-gray-200 text-sm leading-relaxed"
            >
              <strong className="text-white">{label}</strong> {text}
            </li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold text-blue-300 mb-4">HR Professionals and Legal Teams</h3>
        <ul className="space-y-3 mb-8">
          {[
            {
              label: "Retirement processing:",
              text:
                "In most public-sector employment systems globally, the pension trigger is an exact birthday — often the 60th or 65th. HR departments need a date-specific age calculator to project the precise retirement date months in advance.",
            },
            {
              label: "Contract age clauses:",
              text:
                "Employment contracts, insurance policies, and legal agreements routinely include age-based provisions. Verifying compliance requires more than a year estimate.",
            },
            {
              label: "Background verification:",
              text:
                "Identity and age verification in onboarding workflows often requires confirming that a person has reached a specific age threshold as of a specific date.",
            },
          ].map(({ label, text }) => (
            <li
              key={label}
              className="bg-gray-800/60 p-4 rounded-lg border-l-4 border-purple-500 text-gray-200 text-sm leading-relaxed"
            >
              <strong className="text-white">{label}</strong> {text}
            </li>
          ))}
        </ul>
      </section>
     
      {/* ── H2: Global Standards ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Age Calculation Standards Used in Different Countries
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6">
          Age is not calculated identically everywhere. Three main systems exist worldwide, and
          understanding them is important when interpreting results across different cultural or legal
          contexts:
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

        <p className="text-gray-200 leading-relaxed">
          Our calculator uses the <strong>standard Gregorian system</strong> — the internationally
          recognized legal standard used in government IDs, passports, academic records, and financial
          documents worldwide.
        </p>
      </section>

      {/* ── H2: Common Misconceptions ── */}
      <section className="mt-20">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          Frequently Misunderstood Facts About Age and Time Calculation
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6">
          Several common assumptions about <strong>age calculation</strong> produce incorrect results.
          Here are the most important misconceptions to understand before relying on manual estimates:
        </p>

        <ol className="space-y-4">
          {[
            {
              myth: '"I subtract birth year from current year to get my age."',
              fix:
                "This gives the age you will reach by year-end, not your current completed age. If your birthday is in December and it is currently January, this method overstates your age by almost a full year.",
            },
            {
              myth: '"Every 4 years is a leap year."',
              fix:
                "Not true. 1900 was not a leap year. 2000 was. 2100 will not be. Flat 4-year assumptions introduce errors in long-range calculations.",
            },
            {
              myth: '"Months are all roughly 30 days."',
              fix:
                "Months range from 28 to 31 days. Using 30 as a constant produces errors of up to 3 days per month, compounding to weeks over a full year.",
            },
            {
              myth: '"My age in weeks is just my age in years times 52."',
              fix:
                "A year contains 52.18 weeks on average (52.29 in a leap year). Over multiple decades, the rounding error accumulates to several weeks of inaccuracy.",
            },
            {
              myth: '"I can estimate my 10,000th day by adding 10,000 to my birth year."',
              fix:
                "The actual date must be computed day-by-day through the calendar, accounting for every leap year in between. Our calculator shows your exact 10,000-day date instantly.",
            },
          ].map(({ myth, fix }, i) => (
            <li
              key={i}
              className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
            >
              <p className="text-red-400 font-semibold mb-1 text-sm">Common Myth:</p>
              <p className="text-white italic mb-3">{myth}</p>
              <p className="text-red-300 font-semibold mb-1 text-sm">The Reality:</p>
              <p className="text-gray-300 text-sm leading-relaxed">{fix}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── FOOTER NOTE ── */}
      <section className="mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-400 italic text-sm">
          LizoCalc's <strong>chronological age calculator</strong> is updated for 2026 and fully
          compliant with Gregorian calendar standards. Accurate for students, parents, HR
          professionals, and anyone who needs a precise, multi-unit age result for any date — past,
          present, or future.
        </p>
      </section>

    </article>
  

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}