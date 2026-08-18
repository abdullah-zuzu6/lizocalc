import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "45 Days From Today - Calculator & Countdown",
  description:
    "45 days from today, worked out to the exact date — plus why that number keeps showing up in 1031 exchanges, mattress trials, and insurance claims.",
  keywords: [
    "45 days from today",
    "45 days from now",
    "what date is 45 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "45 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 45 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "45 Days From Today - Instant Date Calculator",
    description:
      "What date is 45 days from today? Find out instantly with our free calculator.",
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

export default function FortyFiveDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 45);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21,28,30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 45 days from today?",
      a: `45 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Is 45 days the same as 6 weeks?",
      a: `Not quite — 6 weeks is 42 days, so 45 days runs 3 days longer. People round it to "about six weeks" in conversation, but if a deadline is actually on the line, that 3-day gap is worth caring about.`,
    },
    {
      q: "What's the 45-day rule for a 1031 exchange?",
      a: `If you're selling investment property and want to defer capital gains tax through a 1031 exchange, the IRS gives you 45 calendar days from the closing date of the sold property to formally identify replacement properties in writing. It's a hard deadline — weekends, holidays, and "I forgot" don't extend it — which is exactly why this specific search brings a lot of people to this page.`,
    },
    {
      q: "Why do mattress and furniture companies offer 45-day trials?",
      a: `Six-ish weeks is roughly how long it takes most people to adjust to sleeping on a new mattress, so brands picked a number long enough to cover that adjustment period and short enough to still sound like a real, limited-time offer rather than an open-ended return policy.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 45 days ago, or any other number of days in the past.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "45 days from today" means 45 full days counted starting tomorrow.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#breadcrumb",
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
            name: "45 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
        name: "45 Days From Today | LizoCalc",
        description:
          "Calculate the date 45 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#app",
        name: "45 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 45 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 45 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/45-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/45-days-from-today-calculator#faq",
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
            45 Days From Today
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
            Understanding 45-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Forty-five days sits in an odd spot on the calendar — too long
            to picture in your head the way you can with a week or two, too
            short to just round up to &quot;two months&quot; and call it close
            enough. It&apos;s six weeks and change, which is exactly the kind
            of number that gets rounded wrong in casual conversation and
            then causes a problem later when someone actually checks the
            date on a document.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            People round 45 days down to &quot;about six weeks&quot; constantly, and
            most of the time that&apos;s fine. Six weeks is 42 days, though,
            three days short of the real number, and three days is more
            than enough to blow past a filing window or miss a trial
            return date if you&apos;re working off a rounded estimate instead
            of the actual date.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date at the top of this page skips all of that rounding.
            It&apos;s calculated straight from today&apos;s date in your own
            timezone, so whatever you&apos;re counting toward, you&apos;ve got the
            real day, not an estimate.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where 45 Days Actually Shows Up
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This isn&apos;t a random number people use for planning — a few
            specific rules built around it are the reason a lot of visitors
            end up on this page.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            If you&apos;ve sold an investment property and you&apos;re trying to
            defer capital gains tax through a 1031 exchange, the IRS gives
            you exactly 45 calendar days from your closing date to identify,
            in writing, which replacement properties you&apos;re considering.
            It doesn&apos;t pause for weekends. It doesn&apos;t care that day 45
            lands on Thanksgiving. Real estate investors searching this
            exact number are usually counting down to that deadline, and
            missing it can undo the entire tax benefit of the exchange.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Outside of tax law, plenty of mattress and furniture companies
            settle on 45-night trial periods, since that&apos;s roughly how
            long it takes a body to adjust to a new mattress — long enough
            to feel like a fair shot, short enough to still push people
            toward a decision instead of sitting on the fence for a season.
            Several states also require insurance companies to respond to
            a claim within 45 days, which is why claim-status searches and
            date calculators end up next to each other in search results
            more than you&apos;d expect.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of these are related to each other. They just all landed
            on the same number, independently, for their own reasons — long
            enough to matter, short enough to hold someone accountable to
            it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 45 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            If you want to check the math yourself, or you&apos;re somewhere
            without internet and need to sanity-check a deadline on paper,
            here&apos;s roughly how it works.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say today is August 9th. August has 31 days, so there are 22
            days left in the month after today (31 minus 9). That leaves
            45 minus 22, or 23 days, to carry into September. September has
            30 days, so 23 fits inside it with no leftover — landing you on
            September 23rd. If your 23 days had overshot September&apos;s
            length, you&apos;d carry the remainder into October the same way,
            month by month, until the days run out.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s not hard, but it is exactly the kind of arithmetic where
            people lose track by a day or two, especially if February or a
            31-day month is somewhere in the stretch. For anything with
            actual money or a legal deadline attached — a 1031 exchange
            identification date is the obvious example — it&apos;s worth
            double-checking against the calculator above rather than
            trusting your own count.
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
                  const isCurrent = n === 45;
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