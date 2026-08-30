import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import AgeCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";
import AuthorBio from "@/components/AuthorBio";


const faqData = [
  {
    question: "How is my exact age calculated in years, months, and days?",
    answer:
      "The calculator compares your birth date and target date column by column, days first, then months, then years, borrowing across columns wherever one runs short. If the target day is smaller than your birth day, it borrows a month's worth of days from the month before. If the target month is then smaller than your birth month, it borrows a year's worth of months. It's the same subtraction you'd do on paper, just without the risk of a slip.",
  },
  {
    question: "How many days old am I?",
    answer:
      "Enter your date of birth and leave the target date on today, and the result panel shows your total days lived alongside the years, months, and days breakdown. It counts every calendar day between the two dates, leap days included, so it stays accurate no matter how many leap years fall inside your lifespan.",
  },
  {
    question: "Why does this give a different number than \"years times 365\"?",
    answer:
      "Because a year isn't always 365 days. Every 4th year gets a 29th day in February to make up for Earth's orbit taking about 365.2422 days, not an even 365. Multiplying years by 365 ignores those extra days, and the gap grows the longer the span: over 30 years it's typically 7 or 8 days, over 50 years it's around 12. This calculator counts actual calendar days, so it doesn't drift.",
  },
  {
    question: "What happens if I was born on February 29?",
    answer:
      "Your age still increases by exactly one year on schedule, the same as everyone else. The only real question is which date, February 28 or March 1, a given form treats as your birthday in the 3 years out of 4 when February only has 28 days. Since this calculator works from elapsed days rather than a fixed birthday convention, your age and day count come out correct regardless of which rule a specific document uses.",
  },
  {
    question: "How many days until my next birthday?",
    answer:
      "That's shown right next to your age. The calculator finds the next occurrence of your birth month and day after your target date, and if that date already passed this year, it rolls the countdown forward to next year automatically, so it never shows a negative number.",
  },
  {
    question: "Can I calculate age on a date other than today?",
    answer:
      "Yes. The \"Age at Date\" field defaults to today but takes any date, past or future. That's useful for working out how old you were, or will be, on a specific date, such as a graduation, a policy start date, or a deadline written into a contract.",
  },
  {
    question: "Is age counted the same way in every country?",
    answer:
      "No. This calculator uses the Gregorian system, where age increases by one on each birthday, the standard for passports, school records, and most legal documents worldwide. A few places have used other conventions historically, such as counting a newborn as already 1 year old, or adding a year to everyone on New Year's Day rather than on individual birthdays. South Korea officially retired its traditional age system in June 2023 in favor of the Gregorian standard used here.",
  },
  {
    question: "Can I calculate my age using Excel?",
    answer:
      "Yes, with the DATEDIF function. You can pull the completed years, remaining months, and remaining days from a date of birth using three separate formulas, then combine them into one sentence with CONCAT.",
  },
  {
    question: "Can I share my age result with someone else?",
    answer:
      "Yes. After calculating, hit \"Copy Link\" under Share This Result. That link carries your birth date and target date, so anyone who opens it sees the exact same result without entering anything themselves.",
  },
];

export const metadata: Metadata = {
  title: "Age Calculator – Exact Age in Years, Months, and Days",

  description:
    "Free online age calculator. Enter a birth date and get your exact age in years, months, and days, plus total days, hours, minutes, and a countdown to your next birthday.",

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
    "age calculator excel datedif",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Age Calculator – Exact Age in Years, Months, and Days | LizoCalc",
    description:
      "Calculate your exact age in years, months, and days, plus total days, hours, minutes, and a countdown to your next birthday.",
    url: "https://www.lizocalc.com/calculators/time/age-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator – Exact Age in Years, Months, and Days | LizoCalc",
    description:
      "Free age calculator. Enter a birth date, get your exact age plus a countdown to your next birthday.",
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
      "@id": "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Age Calculator", item: "https://www.lizocalc.com/calculators/time/age-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/age-calculator",
      url: "https://www.lizocalc.com/calculators/time/age-calculator",
      name: "Age Calculator – Exact Age in Years, Months, and Days | LizoCalc",
      description: "Free online age calculator. Get your exact age in years, months, and days, plus total days, hours, minutes, and a countdown to your next birthday.",
      inLanguage: "en",
      datePublished: "2025-04-01",
      dateModified: "2026-08-31",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb" },
    },
  ],
};

const tocItems = [
  { id: "what-is-age-calculator", label: "What Is an Age Calculator" },
  { id: "how-age-is-calculated", label: "How Age Is Calculated" },
  { id: "leap-years-and-age", label: "Leap Years and Exact Age" },
  { id: "age-in-different-units", label: "How to Change Age Into Days, Hours, and Minutes" },
  { id: "what-you-can-do", label: "What You Can Do Using the Age Calculator" },
  { id: "days-per-month", label: "How Many Number of Days per Month" },
  { id: "age-in-excel", label: "How to Calculate Age From Birthdate in Excel" },
];

const daysPerMonth = [
  { month: "January", days: "31 days" },
  { month: "February", days: "28 days in a regular year" },
  { month: "February", days: "29 days in a leap year" },
  { month: "March", days: "31 days" },
  { month: "April", days: "30 days" },
  { month: "May", days: "31 days" },
  { month: "June", days: "30 days" },
  { month: "July", days: "31 days" },
  { month: "August", days: "31 days" },
  { month: "September", days: "30 days" },
  { month: "October", days: "31 days" },
  { month: "November", days: "30 days" },
  { month: "December", days: "31 days" },
];

export default function AgeCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-age-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Age Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find your exact age in years, months, and days, plus the total in days, hours, and minutes.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          An <strong>age calculator</strong> is used to calculate total time between two dates , first one is is date of birth and second one is that you target out. . After entering both dates , the result of your age will be
          in years, months, and days, along with the total
          in days, hours, and minutes, and a countdown to your next
          birthday.
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

        {/* What is an age calculator */}
        <section id="what-is-age-calculator" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is an Age Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            An age calculator calculate the total time between two dates .You can
            also use this age calculator to know about the questions like , how many
            years old I am, how many days they have been alive, or how long until
            the next birthday. The dates themselves are simple but the subtraction
            between them is not.This age calculate the total age between two dates
            and if you want to know the days between two dates , the use{" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between dates calculator
            </Link>{" "}
            that actually find the total days between two different dates
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Months don&apos;t hold the same number of days. February has 28
            most years and 29 every 4th year. April, June, September, and
            November have 30 and everything else has 31.
          </p>
        </section>

        {/* How age is calculated */}
        <section id="how-age-is-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Age Is Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The calculator compares your birth date and target date column
            by column, days first, then months, then years, borrowing
            wherever a column comes up short.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Enter your date of birth.</li>
              <li>Enter the date you want your age calculated on (today, by default).</li>
              <li>Compare the day numbers; if the target day is smaller, borrow a month&apos;s worth of days.</li>
              <li>Compare the month numbers; if the target month is smaller, borrow a year&apos;s worth of months.</li>
              <li>Subtract what&apos;s left in the years column for the final age.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: born August 15, 1995. Age calculated as of July 2, 2026.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The target day (2) is smaller than the birth day (15), so
            borrow a month: June has 30 days, so 30 + 2 − 15 = 17 days.
            That borrow drops the target month to June (6), which is
            smaller than August (8), so borrow a year: 12 + 6 − 8 = 10
            months. With a year now borrowed, the years column reads 2026
            − 1 − 1995 = 30.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            30 years, 10 months, 17 days
          </p>
        </section>

        {/* Leap years and age */}
        <section id="leap-years-and-age" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Leap Years and Exact Age
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A calendar year is 365 days, but Earth&apos;s trip around the
            sun takes about 365.2422 days. Leap years make up that extra
            quarter day.So, every 4th year gets a 29th day added to February,
            except century years like 1900, unless they are also divisible
            by 400, like 2000.
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-4 text-base">
            <li>
              A simple &quot;years × 365&quot; calculation is only a rough
              estimate. Because leap years add an extra day, the result can
              be off by about a day every four years. Over 30 years, that
              can add up to 7 or 8 days. That may not matter if you&apos;re
              just curious about your age, but it can matter when an exact
              date is important, such as when a form checks whether
              you&apos;ve reached a certain age.
            </li>
            <li>
              People born on February 29 have a slightly different
              situation. Since February 29 only comes around in leap years,
              they don&apos;t have that exact date on the calendar most
              years. Their age still goes up by one year each year, though.
              The only question is whether a particular form or rule treats
              February 28 or March 1 as their birthday in a non-leap year.
              This calculator works by counting the actual days between the
              dates, so the result isn&apos;t affected by that choice.
            </li>
          </ul>
        </section>

        {/* Age in different units */}
        <section id="age-in-different-units" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Change Age Into Days, Hours, and Minutes
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Years and months aren&apos;t always the easiest way to look at
            your age. You might need your age in total days for a
            deadline, or simply want to know how many hours or minutes
            you&apos;ve been alive.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base font-semibold">
            The calculation is simple:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base mb-8">
            <li>
              Total days: Count the actual calendar days between the birth
              date and today&apos;s date, including leap days.
            </li>
            <li>
              Total hours: Multiply the total days by 24.
            </li>
            <li>
              Total minutes: Multiply the total hours by 60.
            </li>
          </ul>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Example: 30 Years, 10 Months, and 17 Days
            </h3>
            <p className="text-gray-200 leading-relaxed mb-4 text-base">
              Let&apos;s say the age shown above is 30 years, 10 months,
              and 17 days. To express the same age in smaller units:
            </p>

            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              Step 1: Convert the age into total days
            </p>
            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              The calculator counts the actual calendar days in the full
              30-year, 10-month, and 17-day period. In this example:
            </p>
            <p className="text-green-300 font-mono text-base mb-4">
              30 years, 10 months, 17 days = 11,279 days
            </p>
            <p className="text-gray-200 leading-relaxed mb-4 text-base">
              The number isn&apos;t calculated by simply multiplying 30
              years by 365. The exact dates are used, so leap years and the
              different number of days in each month are included.
            </p>

            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              Step 2: Convert days into hours
            </p>
            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              There are 24 hours in one day:
            </p>
            <p className="text-green-300 font-mono text-base mb-2">
              11,279 × 24 = 270,696 hours
            </p>
            <p className="text-gray-200 leading-relaxed mb-4 text-base">
              So, 11,279 days = 270,696 hours.
            </p>

            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              Step 3: Convert hours into minutes
            </p>
            <p className="text-gray-200 leading-relaxed mb-2 text-base">
              There are 60 minutes in one hour:
            </p>
            <p className="text-green-300 font-mono text-base mb-2">
              270,696 × 60 = 16,241,760 minutes
            </p>
            <p className="text-gray-200 leading-relaxed mb-4 text-base">
              So, 11,279 days = 270,696 hours = 16,241,760 minutes.
            </p>

            <p className="text-gray-200 leading-relaxed text-base">
              All three numbers describe the same amount of time, just in
              different units. The calculator does these conversions for
              you automatically.
            </p>
          </div>
        </section>

        {/* What you can do with the calculator */}
        <section id="what-you-can-do" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What You Can Do Using the Age Calculator
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            This age calculator can do more than just tell you your age in
            years. Enter a date of birth and it can show your current age,
            help you check a child&apos;s age, and tell you exactly how
            much time is left until the next birthday.Want to know business
            days between two dates ? use this{" "}
            <Link
              href="/calculators/time/business-days-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              business days calculator
            </Link>
            .
          </p>

          <div className="space-y-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                What is My Age?
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Enter your date of birth and the calculator shows your
                current age in years, months, and days. It uses the dates
                you enter rather than a simple estimate, so the result also
                takes leap years and different month lengths into account.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                How Old is My Child?
              </h3>
              <p className="text-gray-200 leading-relaxed text-base">
                Parents can use the calculator to quickly check how old
                their child is. Enter the child&apos;s date of birth to see
                their exact age in years, months, and days. This can be
                useful when you need to know a child&apos;s age for school,
                activities, appointments, or just to keep track of their
                growth.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Days Until Your Next Birthday
              </h3>
              <p className="text-gray-200 leading-relaxed mb-3 text-base">
                The calculator also shows how much time is left until your
                next birthday. After entering your birth date, you can see
                the number of days remaining until your birthday arrives.
              </p>
              <p className="text-gray-200 leading-relaxed text-base">
                For example, if your birthday is 45 days away, the
                calculator will show that you have 45 days left. And you
                can also use{" "}
                <Link
                  href="/calculators/time/days-from-today-calculator"
                  className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                >
                  days from today calculator
                </Link>{" "}
                to check exact date after adding 45 days from today .Once
                your birthday passes, it automatically calculates the time
                remaining until your next one.
              </p>
            </div>
          </div>
        </section>

        {/* Days per month */}
        <section id="days-per-month" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Number of Days per Month ?
          </h2>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Month
                  </th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Number of Days
                  </th>
                </tr>
              </thead>
              <tbody>
                {daysPerMonth.map((row, index) => (
                  <tr
                    key={`${row.month}-${row.days}`}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"}
                  >
                    <td className="px-6 py-3 text-gray-200 text-base border-b border-gray-700/60">
                      {row.month}
                    </td>
                    <td className="px-6 py-3 text-gray-200 text-base border-b border-gray-700/60">
                      {row.days}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Age in Excel */}
        <section id="age-in-excel" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Age From Birthdate in Excel
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            If you want to calculate someone&apos;s age in Excel, you can
            do it with the DATEDIF function. This lets you get the
            completed years, months, and remaining days from a date of
            birth.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            First, enter the date of birth into a cell. For example, if the
            birthdate is in <strong>A1</strong>, you can use these
            formulas:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2 text-base">
                1. Find the completed years
              </p>
              <p className="text-green-300 font-mono text-base mb-2">
                =DATEDIF(A1,TODAY(),&quot;Y&quot;)
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
                This returns the person&apos;s age in full years.
              </p>
            </div>

            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2 text-base">
                2. Find the remaining months
              </p>
              <p className="text-green-300 font-mono text-base mb-2">
                =DATEDIF(A1,TODAY(),&quot;YM&quot;)
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
                This gives the number of complete months after the full
                years have been counted.
              </p>
            </div>

            <div className="bg-gray-800/40 p-5 rounded-xl border border-gray-700">
              <p className="text-blue-300 font-semibold mb-2 text-base">
                3. Find the remaining days
              </p>
              <p className="text-green-300 font-mono text-base mb-2">
                =DATEDIF(A1,TODAY(),&quot;MD&quot;)
              </p>
              <p className="text-gray-200 text-sm leading-relaxed">
                This shows the days left after the complete years and
                months have been removed.
              </p>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            For example, if the three formulas return 30, 10, and 17, the
            age is 30 years, 10 months, and 17 days.
          </p>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            You can also combine the three results into one sentence. If
            the years, months, and days are stored in cells A2, A3, and A4,
            use:
          </p>
          <p className="text-green-300 font-mono text-base mb-4">
            =CONCAT(A2,&quot; years, &quot;,A3,&quot; months, &quot;,A4,&quot; days&quot;)
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Excel will then display the result as a single line, such as
            30 years, 10 months, 17 days.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Age Calculator", href: "/calculators/time/age-calculator" },
              { label: "Days Between Dates Calculator", href: "/calculators/time/days-between-dates-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Date Calculator", href: "/calculators/time/date-calculator" },
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