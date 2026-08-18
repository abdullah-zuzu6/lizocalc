import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

// Revalidate hourly so the server-rendered "today" never drifts far from
// real time, without going full force-dynamic and losing edge caching.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "7 Days From Today - Calculator & Countdown",
  description:
    "What's the date 7 days from now? Get the exact answer in seconds, plus a live countdown, calendar view, and a quick trick for doing the math yourself.",
  keywords: [
    "7 days from today",
    "7 days from now",
    "what date is 7 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "7 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 7 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "7 Days From Today - Instant Date Calculator",
    description:
      "What date is 7 days from today? Find out instantly with our free calculator.",
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

type FaqSource = { url: string };
type Faq = { q: string; a: string; sources?: FaqSource[] };

export default function SevenDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 7);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21,28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs: Faq[] = [
    {
      q: "What date is 7 days from today?",
      a: `7 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 7 days ago, or any other number of days in the past.`,
    },
    {
      q: "How many months is 7 days?",
      a: `7 days is approximately 0.2 months, or exactly 1 week. The exact number of calendar months it spans can vary because months range from 28 to 31 days.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "7 days from today" means 7 full days counted starting tomorrow.`,
    },
    {
      q: "How many hours are in 7 days?",
      a: `Exactly 168 hours (24 hours × 7 days).`,
    },
    {
      q: "How many business days/weekdays are in 7 days?",
      a: `It depends on when you start, but counting 7 weekdays and skipping weekends pushes the date further out than 7 calendar days would.`,
    },
    {
      q: "How do I calculate a date 7 days from now?",
      a: `Add 7 to the current calendar day number, then adjust the month if that total overflows the number of days in the current month.`,
    },
    {
      q: "How do I use a formula for 7 days from today in Google Sheets?",
      a: `Use =TODAY() + 7 in a cell to dynamically track a date that's always one week ahead, updating automatically each day.`,
      
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator#breadcrumb",
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
            name: "7 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
        name: "7 Days From Today | LizoCalc",
        description:
          "Calculate the date 7 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator#app",
        name: "7 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 7 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 7 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/7-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/7-days-from-today-calculator#faq",
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
            7 Days From Today
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
            Understanding 7-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A week out doesn&apos;t sound like much until you actually need the
            exact date — a return shipping window, a follow-up appointment,
            the last day of a free trial before it starts billing you. &quot;About
            a week from now&quot; is fine for small talk, but it&apos;s not something
            you want to build a deadline around.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Seven days is exactly one week, nothing more and nothing less.
            Where people trip up is assuming every month behaves the same
            way — it doesn&apos;t. Land near the end of a 31-day month and your
            7-day count rolls straight into the next month; land in February
            during a leap year and the math shifts again. None of this is
            complicated, but it&apos;s the kind of thing that&apos;s easy to get wrong
            by a day if you&apos;re counting on your fingers.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s really the whole point of this page: type nothing, scroll
            up, and the date is already sitting there, recalculated against
            your own local time so it&apos;s right no matter where you&apos;re
            reading this from.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Reasons to Calculate 7 Days
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                title: "Business Deadlines",
                text: "Sprint check-ins, a client's 'get back to me in a week,' or the date a proposal expires — all easier to hold people to when you have the exact date, not a vague estimate.",
              },
              {
                title: "Legal & Compliance",
                text: "Notice periods, response windows, and visa or filing deadlines are often written as a fixed number of days — miss the date by one and it can actually matter.",
              },
              {
                title: "Fitness & Health",
                text: "A one-week check-in on a new habit, a course of medication, or the point where you're supposed to reassess an injury.",
              },
              {
                title: "Probationary Periods",
                text: "New hires and trial periods are frequently measured in short, fixed day counts — useful to know exactly when a review is due.",
              },
              {
                title: "Financial Planning",
                text: "Short-term CD maturity, a card's grace period, or a payment due date that's a set number of days from an invoice.",
              },
              {
                title: "Travel Planning",
                text: "Working out a return date, or how long a short-stay visa window actually gives you on the ground.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate It Yourself, No Tool Needed
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You don&apos;t need an app for this, honestly. Here&apos;s the mental
            math:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Take today&apos;s date. Add 7 to the day number. If the result is
            less than or equal to the number of days in the current month,
            you&apos;re done — that&apos;s your date, same month. If it goes over,
            subtract the number of days in the current month from your
            total, and that remainder becomes the day number in the next
            month.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Example: today is August 27. August has 31 days. 27 + 7 = 34.
            34 − 31 = 3. Answer: September 3.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s genuinely the whole trick. Once you know the day count
            for each month (30 days has September, April, June, and
            November — the rest have 31, except February), you can do this
            in your head faster than typing it into a search bar.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calendar Days vs. Business Days
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This is the one that actually causes arguments. &quot;7 days&quot; and
            &quot;7 business days&quot; are not the same thing, and companies exploit
            that ambiguity constantly.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Seven calendar days from a Sunday just lands you on the
            following Sunday. Simple.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Seven business days skips weekends entirely, so you&apos;re really
            looking at a span closer to nine or ten calendar days depending
            on where you start. If a shipping site tells you &quot;7 business
            days&quot; starting on a Thursday, you&apos;re not getting your package
            the following Thursday — you&apos;re getting it more like the
            Monday after next, because two weekends get eaten up along the
            way.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            I learned this the hard way waiting on a passport renewal that
            was quoted at &quot;6-8 business days.&quot; I counted calendar days like
            an idiot, showed up at a travel agency assuming it&apos;d be ready,
            and it wasn&apos;t. Read the fine print. If a business doesn&apos;t
            specify, assume they mean business days — companies are rarely
            in a hurry to make their timelines look longer than they are.
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
                  const isCurrent = n === 7;
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
                {f.sources && f.sources.length > 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    Source
                    {f.sources.length > 1 ? "s" : ""}:{" "}
                    {f.sources.map((s, i) => (
                      <span key={s.url}>
                        {i > 0 && ", "}
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
                        >
                          [{i + 1}]
                        </a>
                      </span>
                    ))}
                  </p>
                )}
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
                href="/calculators/time/28-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                28 Days From Today Calculator
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