import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import DayOfWeekCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

const faqData = [
  {
    question: "How do I find out what day of the week a date falls on?",
    answer:
      "Enter the date and hit Calculate. The calculator works out the weekday, which day of the year it is, how many days are left in the year, and how many times that weekday has occurred so far.",
  },
  {
    question: "Can this calculator find the weekday for a date in the past or future?",
    answer:
      "Yes, it works for any date, whether it's decades in the past or years in the future. The date field isn't limited to the current year.",
  },
  {
    question: "How is the day of the week actually calculated?",
    answer:
      "The standard method is Zeller's congruence, an algorithm that turns a day, month, and year into a weekday number using modular arithmetic. It accounts for leap years and the fact that different months and centuries shift the calendar in predictable ways.",
  },
  {
    question: "What does 'day of the year' mean?",
    answer:
      "It's the date's position counting from January 1st of that year. January 1st is day 1, December 31st is day 365 (or 366 in a leap year). This calculator shows that count alongside how many days remain in the year.",
  },
  {
    question: "What does '#34 Monday in 2026' mean?",
    answer:
      "It means that specific date is the 34th time a Monday has occurred in 2026, counting from January 1st. The calculator also shows the same count within just that month, for example the 4th Monday in August.",
  },
  {
    question: "Is a leap year handled correctly?",
    answer:
      "Yes. In a leap year the calculator uses 366 total days instead of 365, which shifts the day-of-year count, the days-remaining count, and every weekday after February 29th by one day compared to a non-leap year.",
  },
  {
    question: "Why doesn't the same date fall on the same weekday every year?",
    answer:
      "A regular year has 365 days, which is 52 weeks plus 1 extra day, so most dates move forward by one weekday from one year to the next. When a leap year falls between the two dates you're comparing, the extra day in February pushes the date forward by two weekdays instead of one.",
  },
];

export const metadata: Metadata = {
  title: "Day of the Week Calculator – Find Any Date's Weekday",

  description:
    "Free day of the week calculator. Enter any date and instantly find its weekday, day of the year, days left in the year, and weekday occurrence count.",

  keywords: [
    "day of the week calculator",
    "what day of the week was I born",
    "find day of the week from date",
    "weekday calculator",
    "day of the year calculator",
    "what day was this date",
    "Zeller's congruence calculator",
    "days left in the year",
    "what day of the week is it",
    "date to weekday calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/day-of-week-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Day of the Week Calculator | LizoCalc",
    description:
      "Enter any date and find out which day of the week it falls on, plus the day of the year, days remaining, and how many times that weekday has occurred.",
    url: "https://www.lizocalc.com/calculators/time/day-of-week-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Day of the Week Calculator | LizoCalc",
    description:
      "Free day of the week calculator. Find the weekday for any date, plus day-of-year and year-progress stats.",
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
      "@id": "https://www.lizocalc.com/calculators/time/day-of-week-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Date & Time", item: "https://www.lizocalc.com/calculators/time" },
        { "@type": "ListItem", position: 4, name: "Day of the Week Calculator", item: "https://www.lizocalc.com/calculators/time/day-of-week-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/time/day-of-week-calculator",
      url: "https://www.lizocalc.com/calculators/time/day-of-week-calculator",
      name: "Day of the Week Calculator | LizoCalc",
      description:
        "Free day of the week calculator. Enter any date and find its weekday, day of the year, days left in the year, and weekday occurrence count.",
      inLanguage: "en",
      datePublished: "2026-08-28",
      dateModified: "2026-08-28",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/time/day-of-week-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
  ],
};
const tocItems = [
  { id: "how-its-calculated", label: "How the Weekday is Calculated" },
  { id: "day-of-year-explained", label: "Day of the Year & Days Remaining" },
  { id: "weekday-occurrence", label: "Weekday Occurrence in a Month or Year" },
  { id: "example-lookups", label: "Example Lookups" },
  { id: "why-weekday-changes", label: "Why the Same Date Isn't the Same Weekday Every Year" },
  { id: "details-about-each-day", label: "Details About Each Day" },
];

// Example date-to-weekday lookups
const exampleLookups = [
  { date: "July 4, 1776", day: "Thursday" },
  { date: "January 1, 2000", day: "Saturday" },
  { date: "November 11, 1918", day: "Monday" },
  { date: "June 6, 1944", day: "Tuesday" },
  { date: "December 25, 2026", day: "Friday" },
  { date: "August 27, 2026", day: "Thursday" },
  { date: "January 1, 2030", day: "Tuesday" },
];

// Facts about each day of the week
const dayDetails = [
  {
    day: "Monday",
    facts: [
      "Monday has historically been a common down day for the S&P 500, and some analysts have found it shows up more often as a losing day than the rest of the week.",
      "A widely cited 2011 survey found people report spending more time complaining on Mondays than on any other day, more than half an hour on average compared to well under that on other days.",
      "Research has also linked Mondays to a higher number of reported suicides compared with other days of the week, a pattern epidemiologists have studied for decades.",
    ],
  },
  {
    day: "Tuesday",
    facts: [
      "Recruiters have long noticed that Tuesday is when most job seekers submit applications, likely because people use Monday to catch up and plan before actually applying.",
      "Tuesday, October 29, 1929, is remembered as Black Tuesday, the day the stock market crashed and effectively kicked off the Great Depression.",
    ],
  },
  {
    day: "Wednesday",
    facts: [
      "In the U.S., Wednesday is nicknamed \"Hump Day\" since it sits in the middle of a standard workweek.",
      "Ash Wednesday usually brings to mind the Christian observance that kicks off Lent, but the name also belongs to a set of devastating bushfires that swept through southeastern Australia in February 1983, one of the deadliest bushfire events in the country's history, killing 75 people and causing hundreds of millions of dollars in damage.",
    ],
  },
  {
    day: "Thursday",
    facts: [
      "Maundy Thursday, also called Holy Thursday, falls right before Good Friday in the Christian calendar and marks the day of the Last Supper.",
      "College students and young professionals have their own tradition for Thursday, \"Thirsty Thursday,\" treating it as an unofficial start to the weekend a day early.",
    ],
  },
  {
    day: "Friday",
    facts: [
      "Black Friday, the day after Thanksgiving, kicks off the holiday shopping season in the U.S. and is notorious for chaotic crowds chasing doorbuster deals. It isn't always harmless either: in 2008, a store employee in New York was fatally trampled by a crowd rushing the doors.",
      "Good Friday marks the crucifixion of Jesus in the Christian calendar and falls two days before Easter Sunday.",
    ],
  },
  {
    day: "Saturday",
    facts: [
      "In Israel, Saturday is the Sabbath, so it functions as a day of rest, with most businesses and public transit shut down.",
      "Australia and New Zealand hold their elections on Saturdays, a scheduling choice meant to make it easier for people to get to the polls without missing work.",
      "Swedish tradition includes \"Lördagsgodis,\" or \"Saturday candy,\" where kids are only allowed to eat sweets on Saturdays, a habit meant to cut down on sugar the rest of the week.",
    ],
  },
  {
    day: "Sunday",
    facts: [
      "Not every culture starts the week on Monday. In much of the Middle East, Sunday is treated as the first day of the week rather than the last.",
      "For Christians, Sunday is the day of worship and rest, referred to as the Sabbath or the Lord's Day.",
      "Most banks around the world are closed on Sundays, one of the few things that holds true across a huge range of countries and banking systems.",
      "Super Bowl Sunday is one of the single biggest sporting events on the planet, drawing huge television audiences well beyond the U.S. every year.",
    ],
  },
];

export default function DayOfWeekPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-day-of-week-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Day of the Week Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Enter any date and find out exactly which day of the week it falls on.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DayOfWeekCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>day of the week calculator</strong> tells you which
          weekday, Sunday through Saturday, a given date lands on. You can
          enter any date, past, present, or future, and it also works out
          where that date sits in the year: which day number it is, how many
          days are left, and how many times that particular weekday has
          already occurred in the year.
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


        {/* How it's calculated */}
        <section id="how-its-calculated" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How the Weekday is Calculated
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The calculation is based on the Gregorian calendar, which is used
            in almost every country. This calculator takes the  <Link
              href="/calculators/time/date-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              date 
            </Link> you
            enter and runs it through a day-of-week algorithm,
            mathematically this is often done with{" "}
            <strong>Zeller&apos;s congruence</strong> or a similar formula,
            to return the correct weekday, no calendar lookup required.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              What it accounts for:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Different month lengths, including February in leap years.</li>
              <li>The Gregorian calendar&apos;s century and leap-year rules.</li>
              <li>January and February being treated as the 13th and 14th months of the previous year in the formula.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            It accounts for leap years automatically, since those shift the
            day-of-week pattern for every date after February in a leap
            year. It also correctly handles the transition between the
            Julian and Gregorian calendars if you&apos;re looking up dates
            from before the mid-1500s to early 1900s, depending on the
            country, though this mostly matters for historians rather than
            everyday use. You don&apos;t need to run the formula by hand,
            the calculator above does it instantly, but it&apos;s the same
            underlying logic that search engines, spreadsheets, and calendar
            apps rely on.
          </p>
        </section>

        {/* Day of year explained */}
        <section id="day-of-year-explained" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Day of the Year & Days Remaining
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Every date has a position in its year, counting from January 1st
            as day 1. This calculator shows that count, plus how many days
            are left until the year ends, and a progress bar for how much of
            the year has passed by that date.If you want to calculate dates between two dates then try   {" "}
            <Link
              href="/calculators/time/days-between-dates-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              days between dates  calculator.
            </Link>
             
          </p>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: August 24 in a non-leap year.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            Day 236 of 365 — 129 days left
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            In a leap year, the total shifts to 366 days, and any date from
            March onward moves one day later in the count than it would in
            a non-leap year, since February gained an extra day.
          </p>
        </section>

        {/* Weekday occurrence */}
        <section id="weekday-occurrence" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weekday Occurrence in a Month or Year
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Along with the weekday itself, the calculator counts how many
            times that same weekday has occurred, both within the month and
            within the year, up to and including the date you entered.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Count from the 1st of the month or year forward.</li>
              <li>Every 7 days marks another occurrence of the same weekday.</li>
              <li>The date you entered is included in its own count.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            This is the same logic behind phrases like &quot;the second
            Tuesday of the month&quot; or &quot;the last Friday of the
            year&quot;, both common in scheduling recurring meetings,
            holidays, and payment dates.
          </p>
        </section>

        {/* Example lookups */}
        <section id="example-lookups" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example Lookups
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A few dates, run through the calculator above, show how the
            weekday can land anywhere in the week regardless of the era:
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse min-w-[420px]">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Date
                  </th>
                  <th className="p-4 text-sm sm:text-base font-semibold text-blue-300 border-b border-gray-700">
                    Day of the week
                  </th>
                </tr>
              </thead>
              <tbody>
                {exampleLookups.map((row, index) => (
                  <tr
                    key={row.date}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-transparent"}
                  >
                    <td className="p-4 text-sm sm:text-base text-gray-200 border-b border-gray-800">
                      {row.date}
                    </td>
                    <td className="p-4 text-sm sm:text-base text-green-300 font-mono border-b border-gray-800">
                      {row.day}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why the same date isn't the same weekday every year */}
        <section id="why-weekday-changes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Same Date Isn&apos;t the Same Weekday Every Year
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A regular year has 365 days, which is 52 weeks plus 1 extra day.
            That extra day pushes each date forward by one weekday from one
            year to the next. So if your birthday falls on a Wednesday this
            year, it will usually land on a Thursday next year.
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The pattern breaks around leap years. When a leap year falls
            between two dates you&apos;re comparing, the date jumps forward
            by 2 weekdays instead of 1, because February 29 adds an extra
            day into the count.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            Here&apos;s a concrete example. December 25 was a Thursday in
            2025. No leap day fell between December 25, 2025, and December
            25, 2026, so it shifted forward by exactly 1 weekday, landing on
            Friday in 2026. But compare December 25, 2027 (Saturday) to
            December 25, 2028 (Monday), and it jumps by 2 weekdays instead of
            1, because 2028 is a leap year and February 29 falls in between
            those two December dates.
          </p>
        </section>

        {/* Details about each day */}
        <section id="details-about-each-day" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Details About Each Day
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {dayDetails.map((item) => (
              <div
                key={item.day}
                className="bg-gray-800/40 p-6 rounded-xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-3">
                  {item.day}
                </h3>
                <ul className="text-gray-200 text-sm leading-relaxed space-y-3 list-disc list-inside">
                  {item.facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Time Calculators"
            links={[
              { label: "Business Days Calculator", href: "/calculators/time/business-days-calculator" },
              { label: "Days From Today Calculator", href: "/calculators/time/days-from-today-calculator" },
              { label: "Time Calculator", href: "/calculators/time/time-calculator" },
              { label: "Hours Calculator", href: "/calculators/time/hours-calculator" },
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