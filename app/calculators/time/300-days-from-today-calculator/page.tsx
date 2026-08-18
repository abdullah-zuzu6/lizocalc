import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "300 Days From Today - Calculator & Countdown",
  description:
    "Need the date 300 days from today? Get it instantly, plus a live countdown and calendar view — no counting nearly a year of boxes by hand.",
  keywords: [
    "300 days from today",
    "300 days from now",
    "what date is 300 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "300 Days From Today - Calculator & Countdown",
    description:
      "Find the exact date 300 days from today in one click, with a live countdown and every common date format.",
    url: "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "300 Days From Today - Instant Date Calculator",
    description:
      "What date is 300 days from today? Get the answer instantly, free.",
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

export default function ThreeHundredDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 300);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 300 days from today?",
      a: `300 days from today is ${fullDateStr}. That's live — it recalculates every day, so it's showing the correct answer for whichever day you're actually visiting.`,
    },
    {
      q: "Is 300 days the same as 10 months?",
      a: `Roughly, yes — 300 days is close to 9.9 months. Ten calendar months in a row usually run somewhere between 300 and 306 days depending on which months you cross, so "300 days" tends to land a touch short of a clean "10 months."`,
    },
    {
      q: "Is 300 days almost a full year?",
      a: `Getting there, but not quite — 300 days is 65 days short of a full 365-day year, or a little over 9 weeks short.`,
    },
    {
      q: "How many weeks is 300 days?",
      a: `300 days is 42 weeks and 6 days.`,
    },
    {
      q: "Why do people track '300 days' as a milestone?",
      a: `It shows up a lot in recovery and sobriety communities, where people count and celebrate specific day milestones — 30, 60, 90, 100, 300, and eventually 365 days. If that's what brought you here, plugging in your start date with the "From a specific date" option will tell you exactly when your 300-day mark lands.`,
    },
    {
      q: "Why do some cities claim '300 days of sunshine' a year?",
      a: `It's a common tourism and real-estate claim in sunny climates like Denver or parts of Arizona — though it's worth knowing the claim usually counts any day with at least some sun, not 300 fully cloudless days, and weather data sometimes tells a slightly less flattering story than the marketing.`,
    },
    {
      q: "Does 300 days from today include today?",
      a: `No — today is day zero, and the count begins tomorrow, so the date above is a genuine 300 full days out.`,
    },
    {
      q: "Can I calculate 300 days from a date other than today?",
      a: `Yes, use the "From a specific date" option in the calculator above and set any start date instead of today.`,
    },
    {
      q: "How do I find what date was 300 days ago?",
      a: `Switch the direction toggle from "From" to "Before" — same 300-day count, running backward instead of forward.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator#breadcrumb",
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
            name: "300 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
        name: "300 Days From Today | LizoCalc",
        description:
          "Calculate the date 300 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator#app",
        name: "300 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 300 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 300 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/300-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/300-days-from-today-calculator#faq",
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
            300 Days From Today
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
            Understanding 300-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            300 days is long enough to feel like "basically a year" without
            actually being one — it's 65 days short, close to two and a
            half months short if you're rounding. At that length, nobody's
            counting boxes on a calendar; you either know the date or you
            look it up.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            300 days works out to <strong>42 weeks and 6 days</strong>, or
            close to 9.9 months. Like any figure this size, the exact number
            of calendar months it spans shifts depending on where you start
            counting, since months run anywhere from 28 to 31 days.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above is based on your device's local date and
            accounts for leap years automatically, so a February 29 landing
            inside that window won't throw off the count.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What People Actually Track With a 300-Day Countdown
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            300 doesn't correspond to a fixed rule the way 60 or 90 days
            do — it's usually a personal or milestone number rather than a
            legal one. The most common place it shows up is recovery and
            sobriety tracking, where day counts like 30, 60, 90, 100, and
            300 get called out specifically as things worth marking before
            the bigger one-year mark at 365. If that's why you're here, plug
            your actual start date into the "From a specific date" option
            above and it'll tell you exactly when day 300 lands.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            It also turns up in tourism marketing — cities in sunnier
            climates love claiming "300 days of sunshine a year," Denver and
            parts of Arizona among them. It's worth knowing that claim
            usually counts any day with partial sun, not 300 cloudless
            skies, so take it as a rough vibe rather than a strict weather
            statistic.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Longer academic years, some extended project timelines, and
            year-long subscriptions with a grace period near the end also
            land in this range. The math behind all of it is the same —
            today plus 300 — this calculator just saves you from counting it
            out by hand.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 300 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            If you're doing this by hand, here's a way to keep track over
            such a long stretch without losing your place:
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base ml-2">
            <li>Write down today's date and how many days are left in the current month.</li>
            <li>
              Subtract that from 300. What's left carries into next month.
            </li>
            <li>
              Go month by month, subtracting each one's length and writing
              down your running total as you go — at this length, trying to
              hold the count in your head is basically guaranteed to
              introduce an error somewhere.
            </li>
            <li>
              Once what's left is smaller than the next month, that's your
              day of the month.
            </li>
            <li>
              Check for a February inside that window, and whether it's a
              leap year — over 300 days you could cross two Februaries, so
              it's worth double-checking both.
            </li>
          </ol>
          <p className="text-gray-200 leading-relaxed text-base mt-6">
            At this length, hand-counting is really more of a puzzle than a
            calculation. The tool above just gives you the answer.
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
                  const isCurrent = n === 300;
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