import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "90 Days From Today Calculator -Countdown",
  description:
    "Need the date 90 days from today? Get it instantly, plus a live countdown and calendar view — no scrolling through a paper calendar counting boxes.",
  keywords: [
    "90 days from today",
    "90 days from now",
    "what date is 90 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "90 Days From Today - Date Calculator & Countdown",
    description:
      "Find the exact date 90 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "90 Days From Today - Instant Date Calculator",
    description:
      "What date is 90 days from today? Get the answer instantly, free.",
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

export default function NinetyDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 90);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 90 days from today?",
      a: `90 days from today is ${fullDateStr}. That's live — it recalculates every day, so you're always seeing the correct answer for today, not a number that was baked in when the page was written.`,
    },
    {
      q: "Is 90 days the same as 3 months?",
      a: `Roughly, yes — but not always exactly. 90 days is close to 3 calendar months, but the actual gap depends on which months you're crossing. Three months of 31, 30, and 31 days adds up to 92 days, not 90. If your deadline literally says "90 days," trust the day count, not a rough "3 months" guess.`,
    },
    {
      q: "Does 90 days from today include today itself?",
      a: `No. Today counts as day zero, and the 90-day count starts the following day. So the date shown is genuinely 90 full days out, not 89.`,
    },
    {
      q: "Is the 90-day count calendar days or business days?",
      a: `Calendar days, by default — weekends and holidays are included. If you're dealing with something that specifically says "90 business days" (some government processing times use this), the actual calendar date will land later, usually around 126–130 days out depending on holidays.`,
    },
    {
      q: "What's the Schengen 90/180-day rule?",
      a: `It's a travel rule, not related to this calculator directly, but it's the most common reason people search "90 days from today." Under it, you can spend up to 90 days in the Schengen Area within any rolling 180-day period. If you're trying to work out your own 90-day window for a trip, use the calculator above with your entry date as the start date.`,
    },
    {
      q: "Why do jobs use a 90-day probation period instead of 60 or 30?",
      a: `Ninety days is long enough to actually see how someone performs past the initial training curve, which is why it's the most common probation length in the U.S. — more common than 30 or 60 days for most full-time roles.`,
    },
    {
      q: "Can I calculate 90 days from a date that isn't today?",
      a: `Yes. Use the "From a specific date" option in the calculator and pick any start date — past or future — and it'll give you the date 90 days out from that instead of from today.`,
    },
    {
      q: "How do I find what date was 90 days ago?",
      a: `Flip the direction toggle from "From" to "Before" in the calculator above. Same 90-day math, just counted backward from today instead of forward.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator#breadcrumb",
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
            name: "90 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
        name: "90 Days From Today | LizoCalc",
        description:
          "Calculate the date 90 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator#app",
        name: "90 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 90 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 90 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/90-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/90-days-from-today-calculator#faq",
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
            90 Days From Today
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
            Understanding 90-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ninety days is a strange length of time to picture in your head
            — long enough that "just count it on a calendar" stops being
            realistic, but short enough that people genuinely need the exact
            date, not a rough guess. A quarter, a probation period, a visa
            window, a prescription refill — all of it hinges on getting this
            one number right.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ninety days works out to roughly 3 months, or 12 weeks and 6
            days, but "roughly" is doing some work in that sentence. Three
            calendar months can be anywhere from 89 to 92 days depending on
            which months you're passing through, so a "3 months from today"
            guess and an actual "90 days from today" date won't always
            match.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above is based on your device's local date and factors
            in leap years automatically, so you don't have to remember
            whether February gets an extra day this time around.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where the 90-Day Mark Actually Comes From
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ninety days isn't a random number — it lines up with a quarter
            of a year, which is exactly why businesses use it for reporting,
            reviews, and planning cycles instead of picking an arbitrary
            stretch of time. Once you notice it, you'll see 90 days show up
            in a handful of very specific places.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            It's the most common new-hire probation period in the U.S. —
            long enough to judge performance past the training-wheels phase.
            It's also the standard length for a lot of prescription refills,
            the window insurers give you to file certain claims, and the
            basis of the Schengen "90 days in any 180" travel rule that
            trips up a lot of long-stay travelers. Court systems and
            government agencies lean on it too, for everything from
            eviction notices in some states to visa processing estimates.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The math behind all of these is identical — today plus 90 days —
            but knowing which rule you're actually dealing with matters more
            than the calculation itself, since some of them (like the
            Schengen rule) count on a rolling basis rather than a flat
            countdown.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 90 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            If you're without the calculator and need a rough answer right
            now, here's how to work it out by hand without losing track
            halfway through:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>Note today's date and how many days are left in the current month.</li>
            <li>
              Subtract that from 90. What's left is how many more days you
              still need to count once you cross into next month.
            </li>
            <li>
              Move forward one full month at a time, subtracting each
              month's length from your running total, until what's left is
              smaller than the next month.
            </li>
            <li>
              That remaining number is the day of the month your 90-day
              mark lands on.
            </li>
            <li>
              If February sits anywhere inside that 90-day stretch, check
              whether it's a leap year before you lock in the date — that's
              where most manual counts go wrong.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            It's fiddly enough that a lot of people give up halfway through
            and just guess. If the date actually matters — a visa deadline,
            a probation review, a filing window — use the calculator above
            instead of trusting a mental estimate.
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
                  const isCurrent = n === 90;
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
            <li>
              <Link
                href="/calculators/time/365-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                365 Days From Today Calculator
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