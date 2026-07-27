"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "Age Calculator",
    description: "Calculate your age in years, months, and days",
    href: "/calculators/time/age-calculator",
    category: "Time",
  },
  {
    name: "Date Calculator",
    description: "Add or subtract days from dates, calculate date differences",
    href: "/calculators/time/date-calculator",
    category: "Time",
  },
  {
    name: "Time Calculator",
    description: "Add and subtract time durations, convert time units",
    href: "/calculators/time/time-calculator",
    category: "Time",
  },
  {
    name: "Hours Calculator",
    description: "Calculate working hours, billing time, and time tracking",
    href: "/calculators/time/hours-calculator",
    category: "Time",
  },
];

export default function TimeCalculators() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = useMemo(
    () =>
      calculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-200" />
            </Link>

            <Clock className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold text-white">
              Time Calculators
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Calculate age, date differences, time durations, and working hours
            the clear way.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Most of the time online calculators just give you a number. They do
            not explain if they include the day, how they handle leap years or
            what it means when you calculate hours between two times that cross
            midnight. The Time Calculators are made to be clearer. Each one
            starts with the question people actually ask and shows the rules so
            the answer is what you expect.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder:text-gray-500"
          />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <Link prefetch={false} key={calc.href} href={calc.href}>
                <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800/50 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-green-600/10">
                      <Clock className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-xs font-semibold text-green-300 bg-green-900/40 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-300">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              No calculators found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Intro Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            The Age Calculator is the time from a birth date to today or another
            date, usually shown in years, months and days.
          </p>
          <p>
            The Date Calculator is the number of days between two calendar
            dates. Leap years and the exact end date matter.
          </p>
          <p>
            The Time Calculator is hours, minutes and seconds added or
            subtracted. It is not the same as calendar days.
          </p>
          <p>
            The Hours Calculator often needs start time, end time and break
            deductions. Crossing midnight changes the calculation.
          </p>
        </div>

        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-6">
          <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
            <li>
              These Time Calculators give the number the rules produce. They do
              not replace payroll rules that may define a day or hour
              differently.
            </li>
            <li>
              Every tool on this page follows calendar and time rules.
            </li>
            <li>
              The Age Calculator works from a birth date to a target date.
            </li>
            <li>
              The Date Calculator adds or subtracts days and finds the gap
              between two dates.
            </li>
            <li>
              The Time Calculator handles hours, minutes and seconds.
            </li>
            <li>
              The Hours Calculator is aimed at work shifts, billing and simple
              time tracking.
            </li>
          </ul>
        </div>
      </section>

      {/* Intro continued */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            You can use these Time Calculators to check dates, plan schedules or
            verify hours. They are not a substitute for payroll systems or legal
            definitions of working time in your country.
          </p>
        </div>
      </section>

      {/* How To Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
          How to Choose the Right Time Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          To choose the Time Calculator you need to know what you want to
          calculate.
        </p>
       <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
  <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
    <li>
      If you want your age in years, months and days, use the{" "}
      <Link
        href="/calculators/time/age-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Age Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you need to add or subtract days from a date or find how many days are
      between two dates, use the{" "}
      <Link
        href="/calculators/time/date-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Date Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you are adding or subtracting hours, minutes and seconds, use the{" "}
      <Link
        href="/calculators/time/time-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Time Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you are tracking work shifts, billing time or hours between two clock
      times, use the{" "}
      <Link
        href="/calculators/time/hours-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Hours Calculator</strong>
      </Link>
      .
    </li>
  </ul>
</div>
      </section>

      <WhoShouldUseSection />
      <KeyTermsSection />
      <ComparisonTableSection />
      <WorthUsingSection />
      <AccuracySection />
      <HowTheyWorkTogetherSection />
      <WorkedExampleSection />
      <TopicsSection />
      <CommonMistakesSection />
      <FAQSection />

      <Footer />
    </main>
  );
}

// ---------- REMAINING CONTENT SECTIONS ----------

function WhoShouldUseSection() {
  const useCases = [
    "Anyone who wants to know their exact age in years, months and days.",
    "People planning events who need to know how many days are left until a date.",
    "Students and parents calculating age for forms, sports or school cut-offs.",
    "Freelancers and employees tracking work hours or billing time.",
    "Anyone who needs to add or subtract a number of days from a calendar date.",
    "People converting or combining time durations like hours, minutes and seconds.",
  ];

  const cautionCases = [
    "If you have payroll or questions that depend on local labour rules you should check official definitions.",
    "Situations that require time zones, daylight saving transitions or leap-second precision are not handled by these Time Calculators.",
    "Age cut-offs for competitions or official documents should always be confirmed with the organising body’s rule.",
    "Billing systems that round time in ways like to the nearest 15 minutes may not be handled by these Time Calculators.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Who Should Use These Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        These tools are a fit for:
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        Where to double-check or go further
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {cautionCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function KeyTermsSection() {
  const terms = [
    {
      term: "Age",
      def: "The time lived from a birth date to a target date in years, months and days.",
    },
    {
      term: "Date difference",
      def: "The number of calendar days between two dates.",
    },
    {
      term: "Duration",
      def: "A length of time expressed in hours, minutes and seconds.",
    },
    {
      term: "Working hours",
      def: "Time spent at work often calculated from start and end times minus breaks.",
    },
    {
      term: "Leap year",
      def: "A year with 366 days that includes 29 February and affects age and date calculations.",
    },
    {
      term: "Inclusive or exclusive counting",
      def: "Whether both the start and end dates are counted when measuring a difference.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Key Terms
      </h2>
      <p className="text-gray-200 leading-relaxed mb-6 text-base">
        Some key terms you should know before you start calculating are:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-4 text-gray-200 text-base leading-relaxed">
          {terms.map((t) => (
            <li key={t.term}>
              <strong className="text-green-300">{t.term}</strong> &mdash;{" "}
              {t.def}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  const rows = [
    {
      calc: "Age",
      bestFor: "Age in years, months and days",
      weakness: "Depends on the target date you choose",
    },
    {
      calc: "Date",
      bestFor: "Days between dates or adding/subtracting days",
      weakness: "Leap years and inclusive counting can change the result",
    },
    {
      calc: "Time",
      bestFor: "Adding or subtracting hours, minutes and seconds",
      weakness: "Does not handle calendar dates by itself",
    },
    {
      calc: "Hours",
      bestFor: "Work shifts, billing time, hours between two clock times",
      weakness: "Breaks and midnight crossings need careful entry",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Comparison Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-green-900/70">
              <th className="p-4 text-left font-semibold">Calculator</th>
              <th className="p-4 text-left font-semibold">Best For</th>
              <th className="p-4 text-left font-semibold">Weakness</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            {rows.map((row) => (
              <tr key={row.calc}>
                <td className="p-4">{row.calc}</td>
                <td className="p-4">{row.bestFor}</td>
                <td className="p-4">{row.weakness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WorthUsingSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Are Time Calculators Still Worth Using?
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        You can count the days yourself. Leap years, different month lengths
        and shifts that cross midnight make manual counting slow and
        error-prone. A good Time Calculator removes the arithmetic so you can
        focus on whether the result makes sense for your situation.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Where Time Calculators fall short is context. They will tell you there
        are 45 days between two dates. They will not know whether your company
        counts the end day or how your local labour law defines a working day.
      </p>
      <h3 className="text-2xl font-semibold text-green-300 mt-10 mb-5">
        Calculator or official rules?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If you just need a number for planning or personal records a Time
        Calculator is perfect. If the answer affects pay, legal age or official
        deadlines confirm the rules that apply in your country or organisation.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        How Accurate Are Free Time Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        How accurate is an online time calculator?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        They are as accurate as the calendar rules and the dates or times you
        enter. Age, date difference and duration calculations are exact once
        the start point, end point and counting rules are fixed. Errors almost
        always come from the wrong end date, forgetting a leap day or mixing up
        inclusive versus exclusive counting.
      </p>
      <h3 className="text-2xl font-semibold text-green-300 mt-10 mb-5">
        Why do two calculators sometimes disagree?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        Common causes are different treatment of the end day, different leap
        year handling or one tool counting full 24-hour periods while another
        counts calendar days. Before comparing results check whether both tools
        use the same start and end rules.
      </p>
    </section>
  );
}

function HowTheyWorkTogetherSection() {
  const steps = [
    "Use the Age Calculator when you need years, months and days from a birth date.",
    "Use the Date Calculator to find days between two dates or to move a date forward or backward.",
    "Use the Time Calculator for pure duration arithmetic in hours, minutes and seconds.",
    "Use the Hours Calculator for work shifts, billing or hours between two clock times.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        How These Calculators Work Together
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These four Time Calculators cover the common personal and work time
        questions. A sensible order looks like this:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
        <ol className="space-y-3 text-gray-200 list-decimal list-inside text-base leading-relaxed">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WorkedExampleSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Suppose someone was born on 15 March 1998 and today is 28 July 2026. The
        Age Calculator returns 28 years, 4 months and 13 days.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        If you need the number of days from 1 June 2026 to 28 July 2026 the Date
        Calculator gives 57 days depending on whether the end date is counted.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        For a work shift that starts at 09:00 and ends at 17:30 with a 30-minute
        break the Hours Calculator shows 8 hours of work time.
      </p>
      <p className="text-gray-200 text-base leading-relaxed">
        If you add 3 hours 45 minutes to 2 hours 20 minutes with the Time
        Calculator the total duration is 6 hours 5 minutes.
      </p>
    </section>
  );
}

function TopicsSection() {
  const topics = [
    "Leap years affect age and date-difference results.",
    "Inclusive versus exclusive day counting changes the answer.",
    "Time zones and daylight saving are important when a simple Time Calculator is not enough.",
    "Rounding rules for billing like nearest 15 minutes are important.",
    "Age cut-offs used by schools, sports and official forms are important.",
    "Converting between hours and days/hours/minutes formats is important.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Other Time Ideas Worth Knowing
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CommonMistakesSection() {
  const mistakes = [
    {
      title: "Forgetting leap years",
      body: "A date range that includes 29 February can be one day longer than the same range in a non-leap year.",
    },
    {
      title: "Mixing inclusive and exclusive counting",
      body: "This can change the result by one day.",
    },
    {
      title: "Ignoring breaks in work-hour calculations",
      body: "A 9-to-5 shift is not automatically 8 hours if there is an unpaid lunch break.",
    },
    {
      title: "Crossing midnight without adjusting",
      body: "A shift from 22:00 to 06:00 is 8 hours, not a negative number.",
    },
    {
      title: "Using the wrong target date for age",
      body: "Age on a form is often calculated to a specific deadline, not to today’s date.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Common Mistakes
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-5 text-gray-200 text-base leading-relaxed">
          {mistakes.map((m) => (
            <li key={m.title}>
              <strong className="text-green-300">{m.title}.</strong> {m.body}
            </li>
          ))}
        </ul>
      </div>
      {/* ── TRUST / E-E-A-T BYLINE ── */}
      <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          RA
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            Written by Rana Muhammad Abdullah
          </p>
          <p className="text-gray-400 text-xs">
            MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control
            Engineering Student ·{" "}
            <a
              href="https://www.linkedin.com/in/abdullahsajjad06/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
          <span>📅 Published: Apr 1, 2026</span>
          <span>🔄 Updated: Jul 2, 2026</span>
          <span>✅ Verified accurate</span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "How do you calculate exact age?",
      a: "Subtract the birth date from the target date and express the result in years, months and days, taking month lengths and leap years into account. The Age Calculator does this automatically.",
    },
    {
      q: "How many days are between two dates?",
      a: "It depends on whether you count the end date. The Date Calculator can show the difference; just be consistent about inclusive or exclusive counting.",
    },
    {
      q: "Does a leap year change my age calculation?",
      a: "Yes. If the period includes 29 February, the total number of days is one higher than in a non-leap year. Good age calculators handle this automatically.",
    },
    {
      q: "How do I calculate hours worked?",
      a: "Enter the start time and end time, then subtract any unpaid breaks. If the shift crosses midnight, treat the end time as the next day. The Hours Calculator is built for this.",
    },
    {
      q: "What is the difference between date difference and time duration?",
      a: "Date difference counts calendar days between two dates. Time duration counts hours, minutes and seconds and does not care about calendar dates.",
    },
    {
      q: "Can I use these calculators for payroll?",
      a: "They are useful for checking and planning, but official payroll should follow your company’s system and local labour rules, which may round or define hours differently.",
    },
    {
      q: "Why do two age calculators sometimes give different results?",
      a: "Usually because they use a different target date, or one counts full months differently around month-end and leap days. Check the exact dates each tool is using.",
    },
    {
      q: "How do I add days to a date?",
      a: "Use the Date Calculator: enter the starting date and the number of days to add (or subtract). It returns the resulting calendar date.",
    },
    {
      q: "What if my shift goes past midnight?",
      a: "Count the hours from the start time to midnight, then from midnight to the end time, and add them. Most Hours Calculators handle this when you enter the correct end time on the next day.",
    },
    {
      q: "Is age calculated to today or to a specific date?",
      a: "You choose. Many forms need age on a deadline date, not on the day you fill the form. Always set the target date the organiser requires.",
    },
    {
      q: "Do time zones affect these calculators?",
      a: "The basic tools on this page work with the dates and times you enter and do not automatically convert time zones. For travel or distributed teams you may need to adjust the times first.",
    },
    {
      q: "How accurate is a date difference across many years?",
      a: "It is exact as long as leap years are handled correctly. The main source of disagreement between tools is the rule for counting the end day, not the calendar arithmetic itself.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-xl font-semibold text-green-300 mb-2">
              {item.q}
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}