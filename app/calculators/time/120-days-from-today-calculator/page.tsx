import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "120 Days From Today - Calculator & Countdown",
  description:
    "120 days from today, down to the exact date — plus why that number shows up in mortgage foreclosure rules, prescription refills, and disability insurance.",
  keywords: [
    "120 days from today",
    "120 days from now",
    "what date is 120 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "120 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 120 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "120 Days From Today - Instant Date Calculator",
    description:
      "What date is 120 days from today? Find out instantly with our free calculator.",
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

export default function OneHundredTwentyDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 120);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21,28,30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 120 days from today?",
      a: `120 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Is 120 days the same as 4 months?",
      a: `Close, but not exact. Four calendar months is somewhere between 120 and 123 days depending on which months you're crossing, so "120 days" and "4 months" only line up perfectly in rare cases. If a deadline says "120 days," go by the actual day count, not a rough month estimate.`,
    },
    {
      q: "What's the 120-day rule for mortgage foreclosure?",
      a: `Under federal mortgage servicing rules (Regulation X), a loan servicer generally can't start the foreclosure process until a borrower's payment is more than 120 days past due. It's meant to give homeowners a real window to apply for loss mitigation or catch up before foreclosure proceedings can even begin — which is why this exact search brings a lot of people here who are counting down a payment deadline.`,
    },
    {
      q: "Why do some prescriptions come in 120-day supplies?",
      a: `Mail-order pharmacies, including the VA's, often offer longer supply options like 90 or 120 days for stable, ongoing medications, since it cuts down on refill trips and shipping. Not every plan or drug qualifies, so it's worth checking with your pharmacy before assuming a longer supply is available.`,
    },
    {
      q: "What is a 120-day elimination period in disability insurance?",
      a: `It's the waiting period between when you become disabled and when benefit payments actually start. A 120-day elimination period means roughly four months of no payout after the disability begins, which is why policies with longer elimination periods usually come with lower premiums — you're taking on more of the early risk yourself.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 120 days ago, or any other number of days in the past.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "120 days from today" means 120 full days counted starting tomorrow.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator#breadcrumb",
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
            name: "120 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
        name: "120 Days From Today | LizoCalc",
        description:
          "Calculate the date 120 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator#app",
        name: "120 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 120 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 120 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/120-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/120-days-from-today-calculator#faq",
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
            120 Days From Today
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
            Understanding 120-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A hundred and twenty days gets rounded down to &quot;four months&quot;
            in everyday conversation more often than not, and honestly,
            it&apos;s close enough for a lot of purposes. But close isn&apos;t the
            same as exact, and 120 days is really 17 weeks and change — the
            precise calendar date it lands on depends entirely on which
            months you&apos;re crossing along the way, since four calendar
            months can run anywhere from about 118 to 123 days depending on
            the mix of 28, 30, and 31-day months in between.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That gap matters more than people expect once a real deadline
            is attached to it. A mortgage servicer counting toward the
            120-day foreclosure threshold isn&apos;t working off &quot;around four
            months&quot; — they&apos;re counting actual days past due, one at a
            time. Same with insurance elimination periods, prescription
            refill windows, or any other rule written with the number 120
            in it instead of the word &quot;month.&quot;
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date above is worked out from today&apos;s date in your own
            timezone, no rounding involved, so if you&apos;ve got something
            riding on the exact day, you&apos;re not stuck estimating.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where 120 Days Actually Shows Up
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A handful of specific rules use this exact number, and they&apos;re
            usually the reason someone lands on this page instead of just
            eyeballing a calendar.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The best-known one is probably the federal mortgage servicing
            rule under Regulation X: a loan servicer generally can&apos;t
            begin the foreclosure process until a borrower is more than 120
            days past due. It exists specifically to give homeowners time
            to apply for loss mitigation or work something out before the
            legal process starts, which is why people tracking a missed
            payment often search this exact number, day by day.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Outside of mortgages, mail-order pharmacies — including the VA
            — sometimes offer 120-day supplies for stable, long-term
            medications, mainly to cut down on how often someone has to
            reorder. And disability insurance policies commonly offer a
            120-day elimination period as one of several waiting-period
            options: roughly four months with no benefit payout after a
            disability starts, in exchange for a lower monthly premium.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Different industries, same number, no real connection between
            them — 120 days just happens to be a common &quot;long enough to
            be meaningful, short enough to still be a deadline&quot; window
            across finance, healthcare, and insurance.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 120 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            If you&apos;d rather check the math yourself, or you just want to
            confirm the calculator, here&apos;s how it plays out.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say today is August 9th. August has 31 days, so 22 days remain
            in the month after today. That leaves 120 minus 22, or 98 days,
            still to count. September (30 days) uses up 30 of those,
            leaving 68. October (31 days) uses up another 31, leaving 37.
            November (30 days) uses up 30 more, leaving 7. Those final 7
            days land you on December 7th.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It works, but it&apos;s four separate subtraction steps across four
            different months, and it only takes one arithmetic slip
            anywhere in that chain to end up a day or two off. For anything
            with real consequences attached — a foreclosure deadline is the
            obvious one — it&apos;s worth trusting the calculator above over a
            manual count.
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
                  const isCurrent = n === 120;
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
                href="/calculators/time/150-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                150 Days From Today Calculator
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