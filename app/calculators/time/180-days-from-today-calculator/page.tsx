import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "180 Days From Today Calculator -Countdown",
  description:
    "180 days from today, worked out to the exact date — plus why that number runs your passport's 6-month rule and the Schengen 90/180 clock.",
  keywords: [
    "180 days from today",
    "180 days from now",
    "what date is 180 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "180 Days From Today - Date Calculator & Countdown",
    description:
      "Find out exactly what date is 180 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "180 Days From Today - Instant Date Calculator",
    description:
      "What date is 180 days from today? Find out instantly with our free calculator.",
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

export default function OneHundredEightyDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 180);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21,28,30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 180 days from today?",
      a: `180 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Is 180 days the same as 6 months?",
      a: `Close, but not exact. Six calendar months from today usually lands a few days later than 180 days, because the months in between average a bit over 30 days apiece. If a rule specifically says "180 days," use the actual day count — don't just count 6 boxes forward on a calendar and assume it's the same thing.`,
    },
    {
      q: "What's the Schengen 90/180-day rule?",
      a: `If you're a visitor to the Schengen Area on a short-stay basis, you're allowed up to 90 days inside any rolling 180-day window. The 180 days aren't a fixed block that resets on a set date — it's a sliding window that moves with you, so every day you check, the calculator looks back exactly 180 days and counts how many of those you already spent inside the zone. It trips people up constantly because it doesn't work like a simple calendar quarter.`,
    },
    {
      q: "Why do passports need 6 months of validity left?",
      a: `A lot of countries won't let you enter, or even board a flight, if your passport expires within 6 months of your travel date — even if your actual trip is much shorter. It's a border-control buffer rule, not a reflection of how long your trip is, and it catches people off guard because the passport itself still looks "valid" right up until the airline checks the date against that 6-month cutoff.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 180 days ago, or any other number of days in the past.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "180 days from today" means 180 full days counted starting tomorrow.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator#breadcrumb",
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
            name: "180 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
        name: "180 Days From Today | LizoCalc",
        description:
          "Calculate the date 180 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator#app",
        name: "180 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 180 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 180 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/180-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/180-days-from-today-calculator#faq",
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
            180 Days From Today
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
            Understanding 180-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            180 days gets called &quot;six months&quot; so often that people forget
            those two things aren&apos;t actually the same number. Six calendar
            months, counted the normal way, almost always lands a few days
            past the 180-day mark, because most months run longer than 30
            days — only April, June, September, and November hit exactly
            30, and February usually comes in under that.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That small gap doesn&apos;t matter for a birthday or a casual
            check-in. It matters a lot when a border agent, an insurance
            policy, or a court is working off the literal day count instead
            of &quot;around six months.&quot; A few days one way or the other has
            actually gotten travelers turned away at airports and missed
            people out of coverage windows — not because they did anything
            wrong, but because they trusted the rounded version of the
            number instead of the real one.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date shown above skips the rounding entirely. It&apos;s the
            actual 180th day from today, worked out against your own
            timezone, not an approximation.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where 180 Days Actually Shows Up
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A handful of very specific rules are built around exactly this
            number, and they&apos;re the reason most people end up on this
            page in the first place.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Travelers in the Schengen Area run into the 90/180-day rule
            constantly: you can spend up to 90 days inside the zone within
            any rolling 180-day window. It&apos;s not a fixed block that resets
            on January 1st or your entry date — it&apos;s a moving window that
            slides forward with every day that passes, which is exactly why
            people trying to count it by hand keep getting it wrong and
            end up overstaying without realizing it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Passports run into their own version of this. Plenty of
            countries require your passport to have at least 6 months of
            validity left beyond your travel dates, or they&apos;ll deny entry
            — sometimes even deny boarding at check-in — regardless of how
            short your actual trip is. People assume &quot;valid&quot; means
            usable, and then find out at the gate that it doesn&apos;t, because
            the airline is checking against that 180-day buffer, not the
            expiration date printed on the passport itself.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Beyond travel, 180-day windows show up in probate claim
            deadlines, some insurance appeal periods, and job-related
            benefit waiting periods. None of these industries borrowed the
            number from each other — six months just keeps landing as the
            spot regulators and companies pick when they want something
            long enough to be fair, but not indefinite.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate 180 Days From Today Manually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The fastest shortcut is to add 6 calendar months first, then
            pull the date back a handful of days to correct for the fact
            that most months are longer than 30 days.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say today is August 9th. Six months forward lands you on
            February 9th of next year. But 180 actual days from August 9th
            lands a few days earlier than that — around February 4th or
            5th, depending on the exact stretch of months in between and
            whether a leap year sneaks a February 29th into the count. The
            only fully accurate way to know which side of that gap you land
            on is to count the real days, month by month, rather than
            trusting the &quot;six months&quot; shortcut.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;re doing this by hand for something that actually
            matters — a visa window, a legal filing, an insurance deadline
            — don&apos;t stop at the six-month approximation. Count the days,
            or just check the number at the top of this page, which already
            did the counting for you.
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
                  const isCurrent = n === 180;
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
                href="/calculators/time/150-days-from-today-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                150 Days From Today Calculator
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