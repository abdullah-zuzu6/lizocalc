import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "200 Days From Today Calculator -Countdown",
  description:
    "Need the date 200 days from today? Get it instantly, plus a live countdown and calendar view — skip the mental math and the six-months-plus guessing.",
  keywords: [
    "200 days from today",
    "200 days from now",
    "what date is 200 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "200 Days From Today - Date Calculator & Countdown",
    description:
      "Find the exact date 200 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "200 Days From Today - Instant Date Calculator",
    description:
      "What date is 200 days from today? Get the answer instantly, free.",
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

export default function TwoHundredDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 200);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 200 days from today?",
      a: `200 days from today is ${fullDateStr}. That's live — it recalculates every day, so you're seeing the correct date for whatever day you're actually reading this.`,
    },
    {
      q: "Is 200 days the same as 6 months?",
      a: `Not quite. 200 days is closer to 6.6 months, so it runs a bit past the 6-month mark. If someone tells you "about 6 months," this calculator is how you find out whether that's 195 days or 210 — it's rarely exactly 200.`,
    },
    {
      q: "What's a 200-day moving average?",
      a: `It's a term from stock trading, not this calculator directly, but it's one of the more common reasons people search "200 days" at all. Traders average a stock's closing price over the last 200 trading days to smooth out short-term noise and spot the longer trend. If you're trying to work out what date 200 trading days (not calendar days) back or forward lands on, remember trading days skip weekends and market holidays, so the real span runs noticeably longer than 200 calendar days.`,
    },
    {
      q: "How many weeks is 200 days?",
      a: `200 days is 28 weeks and 4 days.`,
    },
    {
      q: "Does 200 days from today include today?",
      a: `No. Today is day zero, and the count starts the following day, so the date above is a genuine 200 full days out.`,
    },
    {
      q: "Does 200 days include weekends and holidays?",
      a: `Yes — this is calendar days by default, so weekends and holidays are counted normally. If you're working from a "200 business days" figure instead, the real calendar date lands quite a bit later, usually around 280 days out.`,
    },
    {
      q: "Can I calculate 200 days from a date other than today?",
      a: `Yes, use the "From a specific date" option in the calculator above and set your own start date instead of today.`,
    },
    {
      q: "How do I find the date 200 days ago?",
      a: `Switch the direction toggle from "From" to "Before" and it'll run the same 200-day count backward from today.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator#breadcrumb",
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
            name: "200 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
        name: "200 Days From Today | LizoCalc",
        description:
          "Calculate the date 200 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator#app",
        name: "200 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 200 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 200 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/200-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/200-days-from-today-calculator#faq",
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
            200 Days From Today
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
            Understanding 200-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            200 is a round number, but the date it lands on almost never
            feels round — it's past 6 months but well short of 7, sitting in
            that awkward middle ground where a rough guess is usually off by
            a week or two. That's the exact gap this calculator closes.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            200 days works out to <strong>28 weeks and 4 days</strong>, or
            roughly 6.6 months. The "roughly" matters here — six calendar
            months in a row can run anywhere from about 181 to 186 days
            depending on which months you cross, so "200 days" and "6.6
            months" aren't interchangeable when you actually need a precise
            date.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above is calculated from your device's local date and
            already accounts for leap years, so you don't need to check
            whether February gets its extra day this time around.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where 200 Days Shows Up (Hint: Stock Charts)
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ask a trader why 200 matters and you'll get a fast answer: the
            200-day moving average. It's one of the most widely watched
            technical indicators in investing — it smooths a stock's price
            over its last 200 trading days to show the longer-term trend
            instead of the daily noise, and a lot of traders treat the
            stock's position relative to that line as a signal on its own.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That's trading days, though, not calendar days — and this
            calculator works in calendar days. 200 trading days actually
            spans close to 280 calendar days once you factor in weekends and
            market holidays, so if you're trying to line up a chart date
            with a real-world date, don't plug 200 straight into this tool
            expecting a match.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Outside of finance, 200 days is common for longer construction
            permits, some visa processing windows, and academic terms that
            run close to two-thirds of a calendar year. The math is the same
            either way — today plus 200 — this calculator just gives you the
            actual date instead of the ballpark.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 200 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            Here's how to work it out on paper if you don't have the
            calculator handy:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>Note today's date and how many days remain in the current month.</li>
            <li>
              Subtract that from 200. Whatever's left carries over into next
              month.
            </li>
            <li>
              Walk forward month by month, subtracting each month's full
              length from your running total, until what's left is smaller
              than the next month — write each month down as you go, since
              this is a long enough stretch that it's easy to lose count.
            </li>
            <li>
              Whatever number remains at that point is the day of the month
              you land on.
            </li>
            <li>
              Check whether a February falls in that window and whether it's
              a leap year, since that's the most common source of a one-day
              error over a stretch this long.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            Over 200 days, a manual count has plenty of room to go wrong.
            The calculator above gets you the exact date without the
            running tally.
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
                  const isCurrent = n === 200;
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
                href="/calculators/time/120-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                120 Days From Today Calculator
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