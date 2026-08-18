import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import { DialogOverlay } from "@/components/ui/dialog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "28 Days From Today - Calculator & Countdown",
  description:
    "28 days isn't the same as 'a month' — get the exact date, see why the two drift apart, and check what this number actually means for rehab timelines and billing cycles.",
  keywords: [
    "28 days from today",
    "28 days from now",
    "what date is 28 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "28 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 28 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "28 Days From Today - Instant Date Calculator",
    description:
      "What date is 28 days from today? Find out instantly with our free calculator.",
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

export default function TwentyEightDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 28);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 28 days from today?",
      a: `28 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 28 days ago, or any other number of days in the past.`,
    },
    {
      q: "Is 28 days the same as a month?",
      a: `Not quite. 28 days is exactly 4 weeks, but a calendar month is usually longer — 30 or 31 days, except for February in a non-leap year. If someone tells you "come back in a month," they almost always mean the calendar month, which lands a few days later than this calculator's result.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "28 days from today" means 28 full days counted starting tomorrow.`,
    },
    {
      q: "Why do rehab and treatment programs use 28 days specifically?",
      a: `It's mostly a leftover from how insurance companies historically standardized inpatient treatment billing around a four-week block, not because 28 days is the ideal length for every person. Actual program lengths vary a lot by facility, by individual, and by what's being treated — "28-day program" is more of a historical label at this point than a fixed clinical rule.`,
    },
    {
      q: "My subscription bills every 4 weeks — why does the date keep moving earlier?",
      a: `Because 4 weeks is 28 days, and a calendar month is almost always longer than that. Each cycle, the billing date creeps about 2-3 days earlier relative to the calendar month, until eventually you get an extra charge in a year that a monthly plan wouldn't have. It's not a billing error, it's just 28 days doing what 28 days does.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator#breadcrumb",
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
            name: "28 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
        name: "28 Days From Today | LizoCalc",
        description:
          "Calculate the date 28 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator#app",
        name: "28 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 28 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 28 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/28-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/28-days-from-today-calculator#faq",
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
        <DialogOverlay className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            28 Days From Today
          </h1>
          <p className="text-gray-300 mt-2 text-sm md:text-base">
            Calculated for today · {formatFull(today)}
          </p>
          <ShareBar/>
        </DialogOverlay>
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
            Understanding 28-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Twenty-eight days sounds like it should mean &quot;a month,&quot; and
            most of the time people use it that way without thinking twice.
            It isn&apos;t, though — it&apos;s exactly 4 weeks, no more, no less,
            which only lines up with a calendar month in February of a
            non-leap year. Every other month, you&apos;re looking at a gap of
            two to three days between &quot;28 days from now&quot; and &quot;a month from
            now.&quot;
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That gap is small enough to ignore for casual planning, but it
            compounds in ways people don&apos;t expect. A subscription billed
            &quot;every 4 weeks&quot; instead of monthly will land on 13 payments a
            year instead of 12, because 28-day cycles drift earlier against
            the calendar every time. Medication schedules, menstrual cycle
            tracking, and payroll cycles that run on fixed day counts all
            behave the same way — steadily sliding earlier relative to the
            actual month, until eventually the gap is obvious.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above already does the actual counting for you,
            worked out against today in your own timezone, so you&apos;re not
            relying on a rough guess for something that might have money or
            a real appointment attached to it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Recovery and Rehab Timelines
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Twenty-eight days is also the traditional length of a lot of
            inpatient rehabilitation and addiction treatment programs in
            the U.S., often just called &quot;28-day programs.&quot; The number
            isn&apos;t arbitrary — it maps roughly to a four-week structure that
            insurance companies historically standardized around, not
            necessarily because 28 days is medically optimal for every
            person.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Program lengths have shifted over the years and vary by
            facility and individual need, so if you or someone you know is
            looking into treatment, the &quot;28 days&quot; label is more of a
            historical convention than a fixed clinical requirement.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Four Weeks vs. One Month — Which One Do You Actually Need?
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Before you use 28 days as a stand-in for &quot;a month,&quot; stop and
            ask what the original instruction actually meant. A doctor who
            says &quot;come back in a month&quot; almost certainly means the
            calendar month — so if today&apos;s August 9, they mean roughly
            September 9, not September 6. A subscription that says &quot;every
            4 weeks&quot; really does mean 28 days, drifting earlier each
            cycle.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This distinction has real financial consequences. Payroll,
            rent, and most billing cycles run on calendar months. Fitness
            challenges, cycle tracking, and some clinical trial protocols
            run on fixed 28-day blocks. Mixing the two up is an easy,
            common mistake — and one that&apos;s worth double-checking any
            time money or a real appointment is on the line, rather than
            assuming &quot;a month&quot; and &quot;28 days&quot; are interchangeable. They&apos;re
            close, but they&apos;re not the same thing, and the gap between them
            adds up faster than people expect.
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
                  const isCurrent = n === 28;
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
                href="/calculators/time/45-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                45 Days From Today Calculator
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