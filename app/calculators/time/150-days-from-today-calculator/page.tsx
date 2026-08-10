import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "150 Days From Today - Calculator & Countdown",
  description:
    "Need the date 150 days from today? Get it instantly, plus a live countdown and calendar view — no flipping through five calendar pages to count it out.",
  keywords: [
    "150 days from today",
    "150 days from now",
    "what date is 150 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "150 Days From Today - Calculator & Countdown",
    description:
      "Find the exact date 150 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "150 Days From Today - Instant Date Calculator",
    description:
      "What date is 150 days from today? Get the answer instantly, free.",
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

export default function OneHundredFiftyDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 150);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 150 days from today?",
      a: `150 days from today is ${fullDateStr}. That's live — this page checks the current date and recalculates every day, so whatever day you're reading this, the answer above is correct for that day.`,
    },
    {
      q: "Is 150 days the same as 5 months?",
      a: `Not exactly. 150 days is close to 5 months, but the actual gap depends on which months you're passing through — five months in a row can run anywhere from about 148 to 153 days. If a deadline specifically says "150 days," go by the day count rather than eyeballing "5 months" on a calendar.`,
    },
    {
      q: "How many weeks is 150 days?",
      a: `150 days is 21 weeks and 3 days. If you're tracking something in weekly increments — a training block, a treatment plan, a project timeline — that's the number to use.`,
    },
    {
      q: "Does the 150-day count start from today or tomorrow?",
      a: `Tomorrow. Today counts as day zero, and the countdown begins the next day, so the date above really is 150 full days from now, not 149.`,
    },
    {
      q: "Why do immigration and legal cases quote a 150-day processing time?",
      a: `Government agencies often give a wide window like this because case complexity varies a lot, and 150 days gives them room without promising something they can't guarantee. If you've been told your case will take "150 days," plug today's date (or your filing date) into the calculator above to see roughly where that lands.`,
    },
    {
      q: "Is 150 days a full growing season?",
      a: `For a lot of crops, yes — corn and similar grain crops are often bred around a roughly 150-day maturity window, which is one reason this number shows up so often in farming and gardening planning.`,
    },
    {
      q: "Does 150 days include weekends and holidays?",
      a: `Yes, by default this is straight calendar days. If you're working with a "150 business days" figure instead, expect the real calendar date to land noticeably later — usually around 210 days out, depending on weekends and holidays in between.`,
    },
    {
      q: "Can I calculate 150 days from a date other than today?",
      a: `Yes — use the "From a specific date" option in the calculator above and set any start date you need, past or future, instead of today.`,
    },
    {
      q: "How do I find what date was 150 days ago?",
      a: `Switch the direction toggle from "From" to "Before" in the calculator. Same 150-day count, just run backward from today instead of forward.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator#breadcrumb",
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
            name: "150 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
        name: "150 Days From Today | LizoCalc",
        description:
          "Calculate the date 150 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator#app",
        name: "150 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 150 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 150 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/150-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/150-days-from-today-calculator#faq",
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
            150 Days From Today
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
            Understanding 150-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            150 days is far enough out that nobody's counting it on their
            fingers. It stretches across five different months, sometimes
            six depending on where you start, and by the time you're deep
            into a manual count, it's easy to lose track of which month you
            were even on. That's usually when people give up and search for
            a calculator instead.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            150 days comes out to about{" "}
            <strong>21 weeks and 3 days</strong>, which is close to but not
            exactly 5 months — the real number depends on which specific
            months fall inside that window, since some run 28 days and
            others run 31. That's the gap that trips up mental math.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The result above is based on your device's local date and
            handles leap years automatically, so you're not stuck double
            checking whether February has 28 or 29 days this time around.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where a 150-Day Window Actually Comes From
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            150 days doesn't map neatly onto a season or a quarter the way
            30, 90, or 180 do, which is part of why people usually land on
            this number for a specific, practical reason rather than
            picking it out of thin air.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            It's a common estimate government agencies give for processing
            certain immigration petitions and benefit claims, since the real
            timeline varies case by case and 150 days is a middle-ground
            figure they can quote without overpromising. Farmers use it too
            — a lot of grain crops, corn especially, are bred around roughly
            a 150-day maturity window from planting to harvest. It also
            lines up closely with a full academic semester, including
            breaks, which is why some school and program timelines land
            near it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of that changes the arithmetic — it's still just today plus
            150 — but it explains why this specific number keeps showing up
            in searches instead of a rounder figure like 5 months.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 150 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            No calculator on hand? Here's how to work it out on paper
            without losing your place halfway through five months:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>Write down today's date and count how many days are left in the current month.</li>
            <li>
              Subtract that from 150. What's left is how many more days you
              need once you cross into next month.
            </li>
            <li>
              Move forward one full month at a time, subtracting each
              month's length from your running total — this is the step
              where people lose count, so jot down each month as you go
              instead of trying to hold it all in your head.
            </li>
            <li>
              Once the number remaining is smaller than the next month's
              length, that's your day of the month.
            </li>
            <li>
              Check whether February falls anywhere in the stretch and
              whether it's a leap year — over a span this long, it's easy to
              miss.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            Realistically, five months of manual counting is where most
            people make a mistake without noticing. The calculator above
            skips all of that and just gives you the answer.
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
                  const isCurrent = n === 150;
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
                href="/calculators/time/30-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                30 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/60-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                60 Days From Today Calculator
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
            <li>
              <Link
                href="/calculators/time/120-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                120 Days From Today Calculator
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/time/180-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                180 Days From Today Calculator
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