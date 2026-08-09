import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DaysFromTodayCalculator from "./clientside";

// Revalidate hourly so the server-rendered "today" never drifts far from
// real time, without going full force-dynamic and losing edge caching.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "21 Days From Today Calculator -Countdown",
  description:
    "Need the exact date 21 days out? Get it instantly, see how people actually search for this, and skip the finger-counting on your calendar.",
  keywords: [
    "21 days from today",
    "21 days from now",
    "what date is 21 days from today",
    "date calculator",
    "days from today calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "21 Days From Today - Date Calculator & Countdown",
    description:
      "Find out exactly what date is 21 days from today. Multiple formats, calendar view, live countdown timer. Free and instant.",
    url: "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "21 Days From Today - Instant Date Calculator",
    description:
      "What date is 21 days from today? Find out instantly with our free calculator.",
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

export default function TwentyOneDaysFromTodayPage() {
  // Server-rendered baseline so crawlers see a real, correct date in the
  // HTML without waiting on client JS. The client component re-derives
  // this in the visitor's own timezone on mount and takes over from there.
  const today = new Date();
  const target = addDays(today, 21);
  const fullDateStr = formatFull(target);
  const isoDateStr = formatISO(target);
  const todayISO = formatISO(today);

  const relatedDays = [7, 14, 21, 28,30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  const faqs = [
    {
      q: "What date is 21 days from today?",
      a: `21 days from today is ${fullDateStr}. This page recalculates automatically every day based on the current date.`,
    },
    {
      q: "Does this calculator account for leap years?",
      a: `Yes. The date engine accounts for leap years, varying month lengths, and other calendar edge cases when calculating the result.`,
    },
    {
      q: "Can I calculate dates in the past?",
      a: `Yes. Use the custom calculator below and switch the direction from "From" to "Before" to find a date that was 21 days ago, or any other number of days in the past.`,
    },
    {
      q: "How many months is 21 days?",
      a: `21 days is approximately 0.7 months, or exactly 3 weeks. The exact number of calendar months it spans can vary because months range from 28 to 31 days.`,
    },
    {
      q: "Can I use a starting date other than today?",
      a: `Yes. In the custom calculator, choose a specific start date instead of today to calculate any number of days from any date, in the past or future.`,
    },
    {
      q: "Does the calculation include today?",
      a: `No. The count starts from the day after the start date. So "21 days from today" means 21 full days counted starting tomorrow.`,
    },
    {
      q: "Why do I keep seeing '21 days to build a habit' everywhere?",
      a: `It comes from a 1960s plastic surgeon named Maxwell Maltz, who noticed his patients took about three weeks to get used to how their faces looked after surgery. He wrote it down as an observation, not a study, and somewhere along the way the internet turned it into a rule. Later research pegs real habit formation closer to two months on average, and it varies a lot by person and by habit. Three weeks is a fine number to aim for, just don't be surprised if it takes longer.`,
    },
    {
      q: "Is 21 business days the same as 3 weeks?",
      a: `No, and this trips people up constantly. Three calendar weeks is 21 days flat. Twenty-one business days skips every Saturday and Sunday along the way, which pushes the real span out to roughly 29-30 calendar days — closer to a month than three weeks.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id":
          "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator#breadcrumb",
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
            name: "21 Days From Today Calculator",
            item: "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
        url: "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
        name: "21 Days From Today | LizoCalc",
        description:
          "Calculate the date 21 days from today instantly, with a live countdown, every common date format, and a calendar view.",
        inLanguage: "en",
        datePublished: "2026-08-10",
        dateModified: todayISO,
        mainEntityOfPage: {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator#app",
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
        "@id": "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator#app",
        name: "21 Days From Today Calculator",
        url: "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator",
        description:
          "Free date calculator that instantly finds the date 21 days from today, with live countdown, multiple date formats, and a custom from/before calculator for any number of days.",
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
          "Instant calculation of the date 21 days from today",
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
          target: ["https://www.lizocalc.com/calculators/time/21-days-from-today-calculator"],
        },
      },
      {
        "@type": "FAQPage",
        "@id":
          "https://www.lizocalc.com/calculators/time/21-days-from-today-calculator#faq",
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
            21 Days From Today
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
            Why 21 days, specifically?
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Three weeks is a weirdly popular unit of time. Not as automatic as
            "a week" or "a month," but it shows up constantly once you start
            paying attention — a gym program, a court filing deadline, a
            course of antibiotics, a trial subscription that&apos;s about to
            start charging you. Nobody thinks in three-week chunks naturally,
            which is exactly why people end up here instead of doing it in
            their head.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Part of the reason 21 feels so familiar is that one specific myth
            got stuck to it decades ago: the idea that it takes 21 days to
            build a habit. That number comes from a plastic surgeon, Maxwell
            Maltz, who noticed in the 1960s that his patients took roughly
            three weeks to stop flinching at their own reflection after
            surgery. He wrote it down as a passing observation in a
            self-help book, and somewhere between then and now it got
            flattened into a hard rule that gets repeated in every fitness
            app and productivity newsletter. Actual research on habit
            formation puts the real average closer to two months, and it
            swings wildly depending on the habit and the person. Doesn&apos;t
            stop &quot;21-day challenge&quot; from being one of the most-searched
            phrases tied to this exact number, though.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Outside of habit trackers, 21 days keeps popping up in places
            with actual consequences attached. A lot of standard antibiotic
            courses run three weeks. Some visa processing estimates land in
            this range. Certain contract termination clauses specify 21 days&apos;
            notice instead of the more common 30. None of these are
            coincidences exactly, but they&apos;re not related to each other
            either — three weeks just happens to be a common &quot;long enough
            to matter, short enough to not drag on forever&quot; window that
            shows up independently across medicine, law, and fitness
            culture.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            There&apos;s also a practical reason 21 days lands in this
            in-between spot: it&apos;s long enough to actually change
            something — a habit, a diet, a treatment — but short enough
            that a business or a court can hold you to it without dragging
            things out for months. Thirty days feels like it belongs to
            landlords and student loans. Fourteen feels rushed. Twenty-one
            sits in the middle, and once one industry started using it,
            others copied the number without really thinking about why.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            I&apos;ve also noticed a lot of people land on this page from a
            recipe or a fermentation guide, of all things. Sourdough
            starters, kombucha batches, certain cured meats — a surprising
            number of food projects tell you to &quot;wait 21 days&quot; before
            checking on them. If that&apos;s you, same math applies: count
            forward from the day you started, not the day you&apos;re reading
            this, unless today is day one.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Whatever brought you here, the date at the top of this page is
            already worked out for you, recalculated against today&apos;s date
            in your own timezone. No need to count boxes on a paper
            calendar or trust your own arithmetic when a deadline&apos;s on the
            line.
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
                  const isCurrent = n === 21;
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