import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "365 Days From Today - Calculator & Countdown",
  description:
    "Need the date 365 days from today? Get it instantly, plus a live countdown and calendar view — and find out why it's not always 'this date next year.'",
  keywords: [
    "365 days from today",
    "365 days from now",
    "what date is 365 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "365 Days From Today - Calculator & Countdown",
    description:
      "Find the exact date 365 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "365 Days From Today - Instant Date Calculator",
    description:
      "What date is 365 days from today? Get the answer instantly, free.",
  },
};

// ── Helpers (server-side, run at request/revalidation time) ───────────────
function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatFull(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatISO(d: Date) {
  return d.toISOString().split("T")[0];
}

export default function ThreeHundredSixtyFiveDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 365);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 365 days from today?",
      a: `365 days from today is ${fullDateStr}. That's live — this recalculates every day, so it's showing the correct answer for whatever day you're actually visiting.`,
    },
    {
      q: "Is 365 days from today the same as \"this date, next year\"?",
      a: `Almost always, but not quite guaranteed. If a leap year's February 29 falls inside that 365-day window, the date you land on will be one day earlier than "this date next year" would suggest. Most years this isn't an issue, but it's worth checking if precision matters — a contract renewal or anniversary date, for instance.`,
    },
    {
      q: "Why isn't 365 days always exactly one year?",
      a: `Because a calendar year isn't always 365 days — leap years have 366. So "365 days from today" and "one year from today" only match up perfectly when there's no leap day in between. Cross one, and they're a day apart.`,
    },
    {
      q: "How many weeks is 365 days?",
      a: `365 days is 52 weeks and 1 day — which is also why the same date shifts one weekday later each year (two days later across a leap year).`,
    },
    {
      q: "Does 365 days from today include today?",
      a: `No. Today counts as day zero, and the count begins tomorrow, so the date above is a genuine 365 full days out.`,
    },
    {
      q: "Does 365 days include weekends?",
      a: `Yes, this is calendar days, so weekends and holidays are counted normally — 365 calendar days will always include roughly 104 weekend days no matter where you start.`,
    },
    {
      q: "What's the difference between 365 days from today and 1 year from today in a calendar app?",
      a: `Most calendar apps calculate "1 year from today" by matching the exact calendar date the following year, which can be either 365 or 366 days away depending on leap years. "365 days from today" always counts a fixed number of days, so the two can quietly diverge by a day.`,
    },
    {
      q: "Can I calculate 365 days from a date other than today?",
      a: `Yes — use the "From a specific date" option in the calculator above and pick any start date, past or future.`,
    },
    {
      q: "How do I find what date was 365 days ago?",
      a: `Switch the direction toggle from "From" to "Before." Same 365-day count, running backward from today instead of forward.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
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
            name: "365 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
        name: "365 Days From Today | LizoCalc",
        description:
          "Calculate the date 365 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator#app",
        },
        isPartOf: {
          "@type": "WebSite",
          name: "LizoCalc",
          url: "https://www.lizocalc.com",
        },
        author: {
          "@type": "Person",
          name: "Rana Muhammad Abdullah",
          url: "https://www.linkedin.com/in/abdullahsajjad06/",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator#app",
        name: "365 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 365 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
        applicationCategory: "UtilitiesApplication",
        applicationSubCategory: "Date Calculator",
        operatingSystem: "Any",
        inLanguage: "en",
        browserRequirements: "Requires JavaScript. Works on all modern browsers.",
        audience: {
          "@type": "Audience",
          audienceType: "General public, Businesses, Students",
        },
        featureList: [
          "Instant calculation of the date 365 days from today",
          "Live countdown timer (days, hours, minutes, seconds)",
          "Multiple date formats: full, US, European, ISO 8601, short",
          "Custom calculator for any number of days, before or after any start date",
          "Calendar view highlighting the target date",
          "One-tap copy of any date format",
          "Mobile-friendly, zero ads",
        ],
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
        potentialAction: {
          "@type": "UseAction",
          target: ["https://www.lizocalc.com/calculators/time/365-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/365-days-from-today-calculator#faq",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            365 Days From Today
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {formatFull(today)}
          </p>
          <ShareBar/>
             
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DaysFromTodayCalculator
          initialTodayISO={todayISO}
          initialTargetISO={isoDateStr}
          initialFullDate={fullDateStr}
        />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section className="mt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding 365-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            365 days sounds like the easiest calculation on this entire
            site — surely it's just "the same date, next year"? Most of the
            time, yes. But not always, and the exception is the kind of
            thing that quietly throws off a contract renewal date or an
            anniversary if nobody catches it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            365 days is <strong>52 weeks and 1 day</strong>. That extra day
            is why your birthday, for instance, lands one weekday later
            every year — and it's also the reason "365 days from today" and
            "this date next year" aren't always identical. If a February 29
            falls inside the window, the two-day count and the calendar-date
            count split by a day.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator counts actual days, not calendar dates, so it's
            already accounting for that leap year offset — the result above
            reflects your device's local date and handles the leap-day
            math automatically.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why "365 Days From Today" Isn't Always Next Year's Date
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Here's the part that trips people up: a regular year has 365
            days, but a leap year has 366. Software and calendar apps
            sometimes calculate "1 year from today" by jumping straight to
            the same month and day next year — which quietly assumes 365 or
            366 days depending on whether a leap year sits in between. A
            strict "365 days from today" count doesn't make that assumption;
            it just adds 365, full stop.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            In practice, that means if your 365-day window crosses a
            February 29, "365 days from today" lands one day earlier than
            "this date next year" would. It's a small gap, but it matters
            for things like insurance renewal dates, one-year warranty
            expirations, lease terms, and court or filing deadlines that
            specifically say "365 days" rather than "one year" — the two
            phrasings aren't always interchangeable, and which one your
            document uses can actually change your deadline by a day.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It also shows up in 365-day challenges — savings challenges,
            fitness streaks, daily habit trackers — where people plan the
            "finish date" assuming it lines up with the calendar date they
            started on. Most years it does. Leap years are the exception
            worth double-checking.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 365 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            If you're working this out by hand, here's the approach that
            avoids the leap-year trap:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>
              Start by assuming the answer is "the same date next year" —
              that's correct in most years and gets you close instantly.
            </li>
            <li>
              Check whether a February 29 falls anywhere between today and
              that date next year. If it does, subtract one day from your
              answer.
            </li>
            <li>
              If you'd rather count it out fully instead of using the
              shortcut, subtract the days left in the current month from
              365, then walk forward month by month the same way you would
              for any other day count.
            </li>
            <li>
              Either way, double check the leap year math at the end — it's
              the one part of a 365-day count that a "same date next year"
              shortcut can get wrong.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            For anything where a single day actually matters — a legal
            deadline, a renewal date — skip the shortcut and let the
            calculator above handle it exactly.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference: Other Day Counts From Today
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Need a different number of days? Here is where each one lands
            starting from today.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Days From Today</th>
                  <th className="p-4 text-left font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {relatedDays.map((n) => {
                  const d = addDays(today, n);
                  const isCurrent = n === 365;
                  return (
                    <tr key={n} className={isCurrent ? "bg-blue-900/30" : ""}>
                      <td className="p-4">
                        {isCurrent ? (
                          <span className="font-bold text-blue-300">
                            {n} days from today
                          </span>
                        ) : (
                          <Link
                            href={`/calculators/time/${n}-days-from-today-calculator`}
                            className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                          >
                            {n} days from today
                          </Link>
                        )}
                      </td>
                      <td className="p-4">
                        {d.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
         
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  {f.q}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Calculators
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Pair this with our other date tools:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/time/90-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                90 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/150-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                150 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/200-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                200 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/250-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                250 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/300-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                300 Days From Today Calculator
              </Link>
            </li>
          </ul>
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
            <div className="text-gray-300 text-xs">
              MERN Stack Developer,Researcher &amp; Tool Maker · Mechatronics &amp;
              Control Engineering Student at UET·{" "}
              <a
                href="https://github.com/abdullah-zuzu6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Github
              </a>
              <span className="text-gray-300 text-xs"> &amp; </span>
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-300">
            <span>📅 Published: Aug 10, 2026</span>
            <span>🔄 Updated daily</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}