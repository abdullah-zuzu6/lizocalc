import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "60 Days From Today Calculator -Countdown",
  description:
    "Need the exact date 60 days from today? Type it in and you'll get the date, a countdown, and a calendar view — no counting on your fingers required.",
  keywords: [
    "60 days from today",
    "60 days from now",
    "what date is 60 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "60 Days From Today - Date Calculator & Countdown",
    description:
      "Find the exact date 60 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "60 Days From Today - Instant Date Calculator",
    description:
      "What date is 60 days from today? Get the answer instantly, free.",
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

export default function SixtyDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 60);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 60 days from today?",
      a: `60 days from today is ${fullDateStr}. That updates automatically every day, so whenever you land on this page, you're seeing the correct date for that day — not a cached number from last week.`,
    },
    {
      q: "Is 60 days the same as 2 months?",
      a: `Close, but not exact. 60 days is roughly 2 months, but it's not identical to "2 calendar months from today," because months don't all have the same number of days. If your deadline says "60 days," go with the day count — that's what this calculator gives you. If it says "2 months," use a calendar-month calculator instead, since the two can land a day or two apart.`,
    },
    {
      q: "Does the 60-day count include today?",
      a: `No. Today is day zero. The count starts tomorrow, so "60 days from today" means 60 full days after today, not 59.`,
    },
    {
      q: "What day of the week will it be in 60 days?",
      a: `Check the result above — it shows the full weekday along with the date. Since 60 isn't divisible by 7, the day of the week will be different from today; you can't just guess it, you have to count.`,
    },
    {
      q: "Does 60 days from today count weekends?",
      a: `Yes, by default this is calendar days, so weekends and holidays are included. If you actually need business days only (common for legal notices, HR paperwork, and some contracts), that's a different calculation — 60 business days lands roughly 84–86 calendar days out, depending on where the weekends and any holidays fall.`,
    },
    {
      q: "Why do contracts and notices use 60 days instead of 2 months?",
      a: `Because "60 days" is unambiguous and "2 months" isn't. A 60-day notice period, a 60-day return window, or a 60-day HIPAA breach notification deadline all mean exactly 60 days, full stop — no arguing over whether a short month counts the same as a long one.`,
    },
    {
      q: "Can I calculate 60 days from a date other than today?",
      a: `Yes — use the "From a specific date" option in the calculator above. Pick any start date, forward or backward, and it'll give you the date 60 days out from that, not from today.`,
    },
    {
      q: "How do I calculate 60 days ago instead of 60 days from today?",
      a: `Switch the direction toggle in the calculator from "From" to "Before." Same math, just running backward from today instead of forward.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator#breadcrumb",
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
            name: "60 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
        name: "60 Days From Today | LizoCalc",
        description:
          "Calculate the date 60 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator#app",
        name: "60 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 60 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 60 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/60-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/60-days-from-today-calculator#faq",
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
            60 Days From Today
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {formatFull(today)}
          </p>
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
            Understanding 60-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Sixty days shows up more often than you'd think — a return
            window, a notice period on a lease, a probation stretch at a new
            job. It's long enough that nobody trusts themselves to count it
            in their head, and short enough that a mistake actually matters.
            That's the gap this calculator fills.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Sixty days works out to about 8 weeks and 4 days, or roughly two
            months — but "roughly" is the operative word. Months aren't a
            fixed length, so 60 days from March 1st lands somewhere
            different than 60 days from a date that crosses into a 31-day
            month. If you count it manually, that's usually where the
            off-by-a-day errors creep in.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above is calculated from your device's local date, and
            it handles leap years on its own — you don't need to remember
            whether this is a leap year or check if February gets an extra
            day.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why 60 Days Specifically (Not 30, Not 90)
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            There's a reason "60 days" keeps showing up on paperwork instead
            of "2 months." A calendar month is a moving target — 28 days one
            time, 31 the next — and when money, legal rights, or a lease are
            on the line, nobody wants that kind of ambiguity. A day count is
            fixed. 60 days is always 60 days, no matter which months it
            crosses.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You'll run into it constantly in a few specific places: most
            U.S. states require 60 days' notice before a landlord can raise
            rent significantly or end a longer lease. HIPAA gives covered
            entities 60 days to notify people after a data breach. A lot of
            store return policies quietly extended from 30 to 60 days in
            recent years. And 60-day performance reviews or probation
            periods are common enough at new jobs that HR departments treat
            them as standard, not an exception.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of that changes the math — it's still just today plus 60
            days — but knowing why the number shows up helps you double-check
            you're reading the deadline correctly in the first place.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 60 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            If you don't have the calculator handy — say you're on the phone
            and need a rough answer right now — here's how to do it on
            paper without losing track:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>Write down today's date and how many days are left in the current month.</li>
            <li>
              Subtract that from 60. Whatever's left is how many more days
              you need to count once you hit the 1st of next month.
            </li>
            <li>
              Walk forward month by month, subtracting each month's full
              length from your remaining total, until what's left is
              smaller than the next month.
            </li>
            <li>
              Whatever number you have left at that point is the day of the
              month your answer lands on.
            </li>
            <li>
              If February falls anywhere in that 60-day stretch, check
              whether it's a leap year before you finalize the date — that
              extra day trips people up more than anything else in this
              process.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            Honestly, it only takes one mistake on a legal or financial
            deadline to make you never want to do this by hand again. That's
            what the calculator above is for.
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
                  const isCurrent = n === 60;
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
                href="/calculators/time/7-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                7 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/14-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                14 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/21-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                21 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/30-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                30 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/90-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                90 Days From Today Calculator
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