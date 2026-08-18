import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "14 Days From Today - Calculator & Countdown",
  description:
    "Find out exactly what date is 14 days from today. Free instant calculator with a live countdown, every date format, and a calendar view — try it now.",
  keywords: [
    "14 days from today",
    "14 days from now",
    "what date is 14 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "14 Days From Today - Calculator & Countdown",
    description:
      "Find out exactly what date is 14 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "14 Days From Today - Instant Date Calculator",
    description:
      "What date is 14 days from today? Find out instantly with our free calculator.",
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

export default function FourteenDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 14);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21,28, 30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 14 days from today?",
      a: `14 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 14 days ago, or any other number of days in the past.`,
    },
    {
      q: "How many months is 14 days?",
      a: `14 days is approximately 0.5 months, or exactly 2 weeks. The exact number of calendar months it spans can vary because months range from 28 to 31 days.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "14 days from today" means 14 full days counted starting tomorrow.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator#breadcrumb",
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
            name: "14 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
        name: "14 Days From Today | LizoCalc",
        description:
          "Calculate the date 14 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator#app",
        name: "14 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 14 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 14 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/14-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/14-days-from-today-calculator#faq",
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
            14 Days From Today
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
            Understanding 14-Day Calculations
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Two weeks is a strange unit — long enough that you can&apos;t just
            eyeball it on a calendar the way you can with &quot;next Tuesday,&quot;
            but short enough that people still try to guess instead of
            actually counting. That guess is where the day-off errors creep
            in.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Fourteen days is exactly two full weeks, so whatever day of the
            week it is today, the date 14 days out lands on that same day
            of the week. What throws people off is the month boundary in
            between — if today sits anywhere past the middle of the month,
            your 14-day count is almost guaranteed to spill into the next
            month, and if February is involved, a leap year can shift the
            landing date by a day depending on the year.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The number above already accounts for all of that, calculated
            against today&apos;s date in your own timezone, so you don&apos;t have
            to keep a mental calendar in your head.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real Situations Where 14 Days Actually Matters
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Some of these are higher stakes than they first look:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>Medical isolation windows.</strong> Certain infectious
            illness guidance uses 14-day windows, and cutting it short by
            even a couple of days defeats the purpose of the isolation in
            the first place.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>HELOC and mortgage rescission periods.</strong> Some loan
            disclosures give borrowers a set number of days to review terms
            before they&apos;re binding, and missing that window can lock you
            into terms you didn&apos;t fully agree to.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>Landlord notice requirements.</strong> Many states
            require landlords to give tenants a minimum number of days&apos;
            notice before entering a unit or ending a tenancy, and 14 days
            is a common threshold. Miscounting it can make an eviction
            notice legally defective — which sometimes works in the
            tenant&apos;s favor if the landlord got the math wrong.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>Return windows on big-ticket items.</strong> Electronics,
            furniture, and appliances often carry a strict 14-day return
            policy that&apos;s shorter than the 30- or 90-day windows you might
            be used to for smaller purchases. People assume all returns work
            the same way and get burned by this constantly.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            <strong>Two weeks&apos; notice at work.</strong> The unofficial
            standard for resigning gracefully. Not legally required in most
            places, but socially it&apos;s treated almost like a rule, and
            counting it wrong — starting the clock from your last day
            instead of your notice date — can create real friction with an
            employer.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Calendar Days, Not Business Days — Usually
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Here&apos;s where 14 days gets interesting compared to something
            like 7 days. Because two weeks spans two full weekends, the
            difference between &quot;14 calendar days&quot; and &quot;14 business days&quot;
            is enormous.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Fourteen calendar days is just two weeks, straight through,
            weekends included. Fourteen business days, on the other hand,
            skips every Saturday and Sunday in between, which stretches the
            actual span out to nearly three calendar weeks — closer to 19
            or 20 days depending on where you start and whether any
            holidays fall in that stretch.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            I&apos;ve seen people get genuinely upset over this when a visa
            office quotes &quot;14 business days&quot; and they mentally translate
            that to two weeks. It&apos;s not two weeks. It&apos;s closer to a month,
            sometimes with a public holiday thrown in to stretch it
            further. Always ask, or check the fine print, whether the
            number they gave you is calendar or business days. Government
            offices and shipping companies almost never volunteer this
            distinction, probably because the answer makes their timeline
            look worse.
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
                  const isCurrent = n === 14;
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