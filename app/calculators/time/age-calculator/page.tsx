import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import AgeCalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "Is BMI discrimination in hiring actually illegal?",
    answer:
      "Mostly, no — not under federal law. There's no federal statute that puts weight or BMI in the same protected category as race, sex, age, or disability. Statewide, only Michigan has an explicit ban, on the books since 1976. Washington state gets there a different way: its courts have ruled that obesity counts as a disability under state law, which gives it indirect protection. New Jersey came close in 2026 — a bill banning it passed the state Senate but was still sitting in the Assembly as of this writing, so it isn't law yet. Beyond that, protection depends entirely on your city: New York City, San Francisco, Washington D.C., Santa Cruz, Madison, Binghamton, Urbana, and Miami Beach all ban it locally. Everywhere else, it's legal under normal at-will employment rules. If you think this applies to your situation, check your specific state and city — this is general information, not legal advice, and an employment lawyer in your area can tell you where you actually stand.",
  },
  {
    question:
      "Which states protect employees from weight-based hiring discrimination?",
    answer:
      "Just one has a law that says so directly: Michigan, since 1976. Washington state effectively has protection too, but it works through a different door — its Supreme Court ruled that obesity qualifies as a disability under the state's anti-discrimination law, so weight-based hiring decisions can be challenged that way instead of under a standalone weight law. New Jersey is the closest to becoming the second true statewide ban, with a bill that cleared the Senate in early 2026 and is awaiting an Assembly vote. Massachusetts and Vermont have both introduced similar bills over the years without getting them passed. Outside of these, weight protection in the U.S. exists almost entirely at the city level — worth checking if you live somewhere with a local human rights ordinance, since city law can protect you even when your state doesn't.",
  },
  {
    question:
      "Do airlines, military, and police use BMI requirements for hiring?",
    answer:
      "Yes, but they can get away with it for a specific legal reason: courts generally allow physical standards when a role has a genuine, provable connection to the job itself — this is usually called a bona fide occupational qualification. The military sets height, weight, and body-fat limits tied directly to fitness and deployability. Police academies commonly run physical agility tests, and some still screen recruits using BMI or body-fat measurements at intake. Airlines used to enforce strict weight limits on flight attendants decades ago, most of which got struck down by lawsuits — pilots still go through medical screening that touches on weight indirectly, mainly because higher BMI raises sleep apnea risk, which matters for flight safety certification. The common thread: these employers can point to a specific, job-related reason for the standard, which is a very different legal position than an office employer screening candidates by BMI with no job-performance link at all.",
  },
  {
    question: "Can employers ask about my health or weight during interviews?",
    answer:
      "They're not supposed to ask directly, and doing so puts them on shaky legal ground even outside states with explicit weight protections. The ADA already bars employers from asking disability-related questions before making a job offer, and if your weight connects to a medical condition, a direct weight question can bump into that rule. In cities with height/weight protections, asking about it outright is even more clearly off-limits. What employers are legally allowed to ask, and usually do instead, is whether you can perform specific physical requirements of the job — 'can you lift 50 pounds' rather than 'how much do you weigh.' If an interviewer asks about your weight or BMI directly and the role has nothing to do with physical performance, that's worth noting and, depending on where you live, may be something you can raise a concern about.",
  },
  {
    question: "How do I know if I was rejected for being overweight?",
    answer:
      "Honestly, it's hard to know for certain — almost no employer states it outright, since doing so would hand you the exact proof you'd need. What tends to show up instead: getting rejected right after an in-person or video interview when a phone-only round went fine, vague feedback about 'culture fit' or 'customer-facing image' with nothing specific behind it, or watching a clearly less-qualified candidate get the role. None of these prove weight was the reason on their own. If you suspect it, write down dates, exact wording used, the job posting, and how your qualifications compared to whoever got hired, if you can find that out. That record matters most in places where weight discrimination is actually illegal — Michigan, Washington state, or one of the cities listed above — since without legal protection in place, even strong documentation may not lead anywhere beyond confirming what happened to you.",
  },
  {
    question: "Can I be fired for gaining weight at work?",
    answer:
      "In most of the country, yes — at-will employment means an employer can let you go for almost any reason that isn't specifically protected, and weight isn't protected in most places. The exceptions line up with the same short list: Michigan, Washington state, and a handful of cities. One separate wrinkle worth knowing: if the weight gain is connected to a medical condition, pregnancy, or a disability, you may have protection — not because of the weight itself, but because of the underlying condition the ADA or pregnancy discrimination laws already cover. It's also worth watching for cases where a comment about weight is really covering for a different, illegal reason — age or disability discrimination, for example — since that's often the angle that actually holds up if it ever goes to a complaint or a lawsuit.",
  },
  {
    question: "Can employers track employee BMI after hiring?",
    answer:
      "Yes, usually through workplace wellness programs — biometric screenings or health risk assessments, often tied to a discount on your insurance premium if you take part. These programs are supposed to follow ADA and GINA rules around being genuinely voluntary and keeping your results confidential and separate from your regular personnel file. In practice, how strictly that gets enforced varies a lot by employer. What crosses a line clearly, even in states with no weight-discrimination law at all, is an employer pulling your wellness-program BMI data to make a firing, promotion, or assignment decision — that typically overlaps with disability discrimination rules regardless of whether weight itself is protected where you live.",
  },
  {
    question:
      "Are there jobs that hire based on qualifications only, not appearance?",
    answer:
      "No hiring process is completely blind to appearance, but some come a lot closer than others. Roles filled through a structured process — take-home tests, standardized scoring rubrics, panel interviews with a fixed scorecard, or blind resume review — leave much less room for weight or looks to quietly factor in, simply because there's a defined thing being measured instead of a general impression. Remote-first roles help too, since a chunk of the process happens over text or async video before anyone's full presence is really 'in the room.' Software engineering, accounting, and many government civil-service jobs that use standardized scoring tend to lean this way. Jobs filled mostly through informal networking or a loose 'is this person a good fit' interview carry more room for appearance bias to creep in, intentionally or not.",
  },
];

export const metadata: Metadata = {
  title:
    "Age Calculator (Chronological Age Calculator) – Exact Years, Months, Days",
  description:
    "Calculate your exact age in years, months, and days with our chronological age calculator. Find total days lived, next birthday, and age on any date instantly.",
  keywords: [
    "age calculator",
    "exact age calculator",
    "chronological age calculator",
    "how old am i",
    "birthday calculator",
    "age in days",
    "days until next birthday",
    "calculate age from date of birth",
    "leap year age calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/time/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title:
      "Age Calculator (Chronological Age) – Exact Years, Months, Days | LizoCalc",
    description:
      "Find out exactly how many years, months, and days you have been alive with our free advanced age tool.",
    url: "https://www.lizocalc.com/calculators/time/age-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Find Your Exact Age",
    description:
      "Instantly calculate your age in years, months, and days. Discover your total days lived and next birthday countdown.",
  },
};

export default function AgeCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      {/* === JSON-LD STRUCTURED DATA ===
          Moved to afterInteractive: this JSON blob doesn't need to block
          the page from becoming interactive, and loading it eagerly was
          competing with real content for render time (flagged as a
          render-blocking / legacy-JS cost in PageSpeed). */}
      <Script
        id="structured-data-age-calculator"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* ── 1. BREADCRUMB ─────────────────────────────────── */
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.lizocalc.com",
                  },
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
                    name: "Age Calculator",
                    item: "https://www.lizocalc.com/calculators/time/age-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T author) ─────────────────────── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
                knowsAbout: [
                  "Age Calculation",
                  "Date & Time Tools",
                  "Gregorian Calendar Logic",
                  "Web Development",
                  "Mechatronics",
                ],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ─────────────────────────────────── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.lizocalc.com/logo.webp",
                },
                foundingDate: "2026",
                founder: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 4. WEBSITE ──────────────────────────────────────── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 5. WEBPAGE ──────────────────────────────────────── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator",
                url: "https://www.lizocalc.com/calculators/time/age-calculator",
                name: "Age Calculator – Exact Age in Years, Months, Days | LizoCalc",
                description:
                  "Calculate your exact age and breakdown in years, months, and days using accurate Gregorian calendar logic.",
                inLanguage: "en",
                datePublished: "2025-04-01",
                dateModified: "2026-07-02",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator#app",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator#app",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                },
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ─────────────────────────── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#app",
                name: "Advanced Age Calculator",
                url: "https://www.lizocalc.com/calculators/time/age-calculator",
                description:
                  "Free online tool to determine chronological age. Provides breakdown in years, months, weeks, days, and seconds. Includes birthday countdown and leap year detection.",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                },
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Time Management Tool",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2025-04-01",
                dateModified: "2026-07-02",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                featureList: [
                  "Calculate age in years, months, and days",
                  "Total lifespan in weeks, days, hours, and seconds",
                  "Next birthday countdown timer",
                  "Determine birth day of the week",
                  "Leap year compatible precision",
                  "Calculation history storage",
                  "Fast, mobile-optimized interface",
                  "Completely free with no ads",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
              },

              /* ── 7. HOWTO #1 — How to Calculate Chronological Age ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#howto-chronological-age",
                name: "How to Calculate Chronological Age Manually",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                description:
                  "A step-by-step method to calculate age in years, months, and days by subtracting the birth date from the current date.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Subtract the Days",
                    text: "Subtract the birth day from the current day. If the current day is smaller, borrow 30 or 31 days from the current month.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Subtract the Months",
                    text: "Subtract the birth month from the current month. If the current month is smaller, borrow 12 months from the current year.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Subtract the Years",
                    text: "Subtract the birth year from the current year to get the final age in years.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Verify with LizoCalc",
                    text: "Enter your dates into the LizoCalc Age Calculator to ensure your manual calculation accounts for leap years correctly.",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Age Calculator" },
                ],
              },

              /* ── 8. HOWTO #2 — How to Calculate Age in Excel ──────── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#howto-calculate-age-excel",
                name: "How to Calculate Age in Excel Using DATEDIF",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                description:
                  "Quick guide on using Excel formulas to calculate age automatically from a date of birth.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Enter the Birth Date",
                    text: "Type the date of birth in cell A1 (e.g., 01/01/1990).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Apply the DATEDIF Formula",
                    text: "In cell B1, type the formula: =DATEDIF(A1, TODAY(), 'Y').",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Get Years, Months, and Days",
                    text: "Use 'YM' for months and 'MD' for days within the DATEDIF function to get a full age breakdown.",
                  },
                ],
                tool: [
                  {
                    "@type": "HowToTool",
                    name: "Microsoft Excel or Google Sheets",
                  },
                ],
              },

              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/time/age-calculator#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/time/age-calculator",
                },
                mainEntity: (faqData || []).map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },

              /* ── 10. IMAGE OBJECTS ───────────────────────────────── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp#image",
                url: "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp",
                name: "Chronological Age Calculation — Borrowing Logic Technical Diagram",
                caption:
                  "Fig 1.1: Technical blueprint of the borrowing method used by the LizoCalc age algorithm — showing day, month, and year subtraction steps with borrow logic for accurate Gregorian calendar age calculation.",
                description:
                  "Technical diagram illustrating the step-by-step borrowing logic used to calculate chronological age: subtracting days (borrowing from months), subtracting months (borrowing from years), and subtracting years to produce an exact age breakdown.",
                width: 1000,
                height: 675,
                contentUrl:
                  "https://www.lizocalc.com/images/time/chronological-age-subtraction-borrowing-logic.webp",
                encodingFormat: "image/webp",
              },
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp#image",
                url: "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp",
                name: "Age Milestone and Birthday Tracking Calendar",
                caption:
                  "Fig 1.2: Monthly calendar with red pins marking significant birthdays and age milestones — including 10,000 days alive — illustrating chronological age as the primary metric for legal eligibility, medical screenings, and standardized historical record-keeping.",
                description:
                  "Visual of a milestone birthday tracking calendar showing how chronological age is used to mark significant life events, legal thresholds, and medical screening dates — reinforcing the practical importance of accurate age calculation.",
                width: 1000,
                height: 650,
                contentUrl:
                  "https://www.lizocalc.com/images/time/age-milestone-birthday-tracking.webp",
                encodingFormat: "image/webp",
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Age Calculator (Chronological Age Calculator)
            </h1>
          </div>

          <p className="mt-6 text-gray-200 text-lg leading-relaxed max-w-6xl">
            Enter a birth date below and get your exact age in years, months,
            and days — not a rounded guess. The math follows real Gregorian
            calendar rules (leap years, varying month lengths, all of it), which
            is the same standard used on Pakistani ID documents, school
            admission forms, and job application age limits.
          </p>
        </div>
      </section>
      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AgeCalculator />
      </section>
      {/* 🔥 AGE QUICK ANSWER BOX - AI Overview Optimized */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 border border-blue-500/30 rounded-3xl p-8 md:p-10">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Age Quick Answer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            {/* 1. Definition */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                What is age calculation?
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                It's the exact gap in time between your date of birth and today,
                worked out using real Gregorian calendar rules — actual month
                lengths and leap years — instead of a rough estimate.
              </p>
            </div>

            {/* 2. Method / Logic */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">How it works</h3>

              <div className="bg-gray-900 p-4 rounded-xl text-green-400 text-sm font-mono border border-gray-700">
                Age = Current Date − Birth Date
              </div>

              <ul className="mt-4 text-gray-400 text-sm space-y-1">
                <li>• Adjusts for months & days</li>
                <li>• Includes leap year correction</li>
                <li>• Uses Gregorian calendar rules</li>
              </ul>
            </div>

            {/* 3. Output Format */}
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                Result Format
              </h3>

              <p className="text-gray-300 text-sm leading-relaxed">
                The final result is shown in:
              </p>

              <ul className="mt-3 text-gray-300 text-sm space-y-1">
                <li>• Years</li>
                <li>• Months</li>
                <li>• Days</li>
              </ul>

              <p className="text-blue-300 font-semibold mt-2 text-sm">
                Example: 30 years, 10 months, 17 days
              </p>
            </div>
          </div>

          {/* Bottom AI Signal Section */}
          <div className="mt-10 border-t border-gray-800 pt-6">
            <h3 className="text-blue-400 font-semibold mb-3">Standards Used</h3>

            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Gregorian calendar system</li>
              <li>• ISO date calculation rules</li>
              <li>• Leap year adjustment logic</li>
            </ul>

            <p className="text-gray-500 text-xs mt-3">
              Note: Results are based on international civil calendar standards
              used in official documents worldwide.
            </p>
          </div>
        </div>
      </section>
      {/* SEO Content */}

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        {/* ── INTRO ── */}
        <section className="mb-12">
          <p className="text-gray-200 leading-relaxed mb-4 text-lg">
            Most people only need one number from an age calculator, but the way
            you get to that number matters more than it seems. A rough "years
            times 365" estimate drifts by a full day roughly every four years
            because of leap years — harmless for casual curiosity, but a real
            problem if you're filling out a form that checks age against a hard
            cutoff.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-lg">
            This calculator does the actual calendar math: it compares your
            birth date and today's date day-by-day, month-by-month, and
            year-by-year, borrowing across months and years exactly the way
            you'd do it by hand on paper — except it never makes an arithmetic
            slip.
          </p>
          <p className="text-gray-200 leading-relaxed text-lg">
            Below, I've walked through the logic itself, a full worked example
            with real numbers, where age calculation actually trips people up in
            Pakistan specifically (NADRA records, school admission cutoffs,
            FPSC/PPSC age limits), and the medical use of "corrected age" for
            babies born early.
          </p>
        </section>

        {/* ── H2: Worked Example ── */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Full Worked Example
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Numbers are easier to trust than a formula on its own, so here's a
            complete example using real dates — not a rounded, made-up one.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-6">
            <p className="text-gray-200 leading-relaxed mb-3">
              <strong>Birth date:</strong> August 15, 1995 &nbsp;|&nbsp;{" "}
              <strong>Target date:</strong> July 2, 2026
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm">
              <li>
                Days: the target day (2) is smaller than the birth day (15), so
                we borrow a month. June has 30 days, so 2 + 30 = 32, and 32 − 15
                = <strong className="text-white">17 days</strong>.
              </li>
              <li>
                Months: because we borrowed a month above, the target month
                effectively drops to June (6). 6 is smaller than the birth month
                (8), so we borrow a year: 6 + 12 = 18, and 18 − 8 ={" "}
                <strong className="text-white">10 months</strong>.
              </li>
              <li>
                Years: Since one year was borrowed during the previous step, the
                calculation becomes 2026 − 1 − 1995 ={" "}
                <strong className="text-white">30 years</strong>.
              </li>
            </ol>
            <p className="text-gray-200 leading-relaxed mt-4">
              Final result: <strong>30 years, 10 months, 17 days</strong>.
              Converted to total days lived (30 years × 365, plus 8 leap days
              for 1996, 2000, 2004, 2008, 2012, 2016, 2020, and 2024, plus the
              321 remaining days), that comes out to approximately{" "}
              <strong>11,279 days</strong> — not the 11,270 you'd get from a
              naive "years × 365" estimate, a 9-day gap purely from ignoring
              leap years.
            </p>
          </div>
        </section>

        {/* ── H2: What Is Age? ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Age? Definition, Types, and How It Is Measured
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The type of "age" people usually mean — the one on your CNIC, your
            passport, your school admission form — is{" "}
            <strong>chronological age</strong>: elapsed calendar time from birth
            to today, nothing more. But it isn't the only kind of "age" in use.
            A few others show up often enough to be worth knowing:
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Type of Age</th>
                  <th className="p-4 text-left font-semibold">Definition</th>
                  <th className="p-4 text-left font-semibold">Used In</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  [
                    "Chronological Age",
                    "Time elapsed since date of birth",
                    "Law, passports, education, finance",
                  ],
                  [
                    "Biological Age",
                    "Physical condition relative to average health",
                    "Medicine, fitness, longevity research",
                  ],
                  [
                    "Mental / Cognitive Age",
                    "Intellectual development vs. age norms",
                    "Psychology, IQ testing",
                  ],
                  [
                    "Corrected Age",
                    "Chronological age adjusted for prematurity",
                    "Pediatrics, neonatal care",
                  ],
                  [
                    "Emotional Age",
                    "Emotional maturity level",
                    "Therapy, behavioral assessment",
                  ],
                  [
                    "Bone Age",
                    "Skeletal maturity from X-ray analysis",
                    "Pediatric endocrinology",
                  ],
                ].map(([type, def, use]) => (
                  <tr key={type}>
                    <td className="p-4 font-semibold text-blue-300">{type}</td>
                    <td className="p-4 text-gray-200">{def}</td>
                    <td className="p-4 text-gray-400">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            This calculator measures chronological age — the only type that can
            be worked out from a birth date alone, without a doctor,
            psychologist, or X-ray involved.
          </p>
        </section>

        {/* ── H2: Chronological Age ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Chronological Age and Why Does It Matter?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Chronological age is just elapsed time — it doesn't care about
            health, maturity, or anything else about the person. That's exactly
            why it's the number governments, schools, and banks rely on: it's
            the one age that two different people, calculating separately, will
            always agree on (assuming they both use the same calendar system).
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Legal age is a different thing built on top of it — it's whatever a
            specific law says you can or can't do once you cross a
            chronological-age threshold.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              Legal Age vs Chronological Age
            </h3>

            <p className="text-gray-200 leading-relaxed mb-4">
              In Pakistan, someone becomes a legal adult at 18 for most purposes
              — voting under the Elections Act, and the age used on CNIC
              issuance. But the threshold isn't universal even within one
              country: the legal marriage age differs by province (Sindh set it
              at 18 for both sexes; other provinces still allow 16 for women
              under certain conditions), and the age for a learner's driving
              permit is 18 as well, but for a full car license some provinces
              allow 18 while motorcycle permits can be issued from 15. The
              chronological age calculation itself never changes — what changes
              is which threshold a specific law is checking it against.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Mathematical Logic Behind Age Calculation
            </h3>

            <p className="text-gray-200 mb-4">
              A correct calculation needs more than "current year minus birth
              year." It compares days, then months, then years, borrowing across
              columns exactly the way you'd subtract 47 from 82 on paper. This
              is the <strong>borrowing method</strong>, and it's the same logic
              worked through with real numbers in the example above.
            </p>

            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
              <li>
                Compare the current day with the birth day. If the current day
                is smaller, borrow a month's worth of days from the previous
                month.
              </li>
              <li>
                Compare the current month with the birth month. If needed,
                borrow a year's worth of months.
              </li>
              <li>Subtract the remaining years to get the final result.</li>
            </ol>

            <figure className="group">
              <Image
                src="/images/time/chronological-age-subtraction-borrowing-logic.webp"
                alt="This Technical diagram of age calculation borrowing logic showing days, months, and years subtraction steps to make calculation easy "
                width={1000}
                height={675}
                className="rounded-xl border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all group-hover:border-blue-500/40"
              />
              <figcaption className="text-gray-500 text-sm italic mt-4 text-center">
                Fig 1.1: The "borrowing method" this calculator runs internally.
              </figcaption>
            </figure>

            <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mt-6">
              <p className="text-blue-400 font-mono text-lg mb-2">
                General Formula
              </p>
              <p className="text-white text-xl font-mono">
                Age = (Current Date − Birth Date) Varies with respect to
                calendar rules
              </p>
            </div>
          </div>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              How to Calculate Age in Excel Using DATEDIF
            </h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              If you're doing this for a batch of records — say, checking ages
              for a class list or a payroll sheet — Excel's{" "}
              <code className="text-blue-300 bg-gray-900 px-1 rounded">
                DATEDIF
              </code>{" "}
              function does the same borrowing logic without you needing to
              re-derive it for every row.
            </p>
            <div className="bg-gray-900 p-4 rounded-xl font-mono text-sm text-green-300 space-y-2 mb-4">
              <p>
                <span className="text-gray-500">// Years only</span>
              </p>
              <p>=DATEDIF(A1, TODAY(), "Y")</p>
              <p className="mt-3">
                <span className="text-gray-500">
                  // Full breakdown: years, months, days
                </span>
              </p>
              <p>
                =DATEDIF(A1,TODAY(),"Y")&" Years, "&DATEDIF(A1,TODAY(),"YM")&"
                Months, "&DATEDIF(A1,TODAY(),"MD")&" Days"
              </p>
            </div>
            <p className="text-gray-400 text-sm">
              Where <strong className="text-gray-300">A1</strong> holds the date
              of birth (e.g., 15/08/1995) and{" "}
              <strong className="text-gray-300">TODAY()</strong> auto-updates to
              the current date. One catch worth knowing: DATEDIF is an
              undocumented Excel function — it works fine, but it won't show up
              in Excel's formula autocomplete, so don't assume you typed it
              wrong if it doesn't suggest itself.
            </p>
          </div>
        </section>

        {/* ── H2: Days Lived Counter ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Days Have I Been Alive?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4">
            Add up every calendar day from birth to today, leap days included.
            The example above — born August 15, 1995, calculated as of July 2,
            2026 — lands at approximately 11,279 days.
          </p>

          <p className="text-gray-200 leading-relaxed mb-8">
            Simply multiplying the number of years by 365 leaves out the extra
            days added during leap years. Over a 30-year span that's 8 missing
            days, as shown above — small on its own, but it's exactly the kind
            of error that makes a manually-calculated age off by a week or more
            once someone's past 40 or 50.
          </p>

          <div className="bg-gray-800/20 rounded-2xl border border-gray-700/50 p-6 mb-12 shadow-lg">
            <figure>
              <Image
                src="/images/time/age-milestone-birthday-tracking.webp"
                alt="Monthly calendar with red pins marking significant birthdays and age milestones including 10000 days alive"
                width={1000}
                height={650}
                className="rounded-xl mx-auto border border-gray-700 shadow-md mb-6 hover:border-blue-500/30 transition-colors"
              />
              <figcaption className="text-gray-500 text-sm italic text-center max-w-2xl mx-auto">
                <span className="font-semibold text-blue-400/80 not-italic">
                  Fig 1.2:
                </span>{" "}
                Milestone tracking matters most where an exact day, not a
                rounded year, is what a form or screening actually checks.
              </figcaption>
            </figure>
          </div>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-10">
            <p className="text-blue-400 font-mono text-lg mb-2">
              Days Lived Formula
            </p>
            <p className="text-white text-xl font-mono">
              Total Days = (Years × 365) + Leap Days + Remaining Days in Current
              Year
            </p>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Milestone</th>
                  <th className="p-4 text-left font-semibold">Age</th>
                  <th className="p-4 text-left font-semibold">Approx Days</th>
                  <th className="p-4 text-left font-semibold">Leap Years</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  ["First Birthday", "1 year", "365–366", "0–1"],
                  ["Adulthood", "18 years", "6,574", "4"],
                  ["25 Years", "25 years", "9,131", "6"],
                  ["10,000 Days Alive", "≈ 27.4 years", "10,000", "≈ 7"],
                  ["30 Years", "30 years", "10,957", "7–8"],
                  ["50 Years", "50 years", "18,262", "12"],
                  ["75 Years", "75 years", "27,394", "18"],
                  ["100 Years", "100 years", "36,524", "24"],
                ].map(([milestone, years, days, leaps]) => (
                  <tr key={milestone}>
                    <td className="p-4">{milestone}</td>
                    <td className="p-4">{years}</td>
                    <td className="p-4 font-bold text-green-400">{days}</td>
                    <td className="p-4 text-gray-400">{leaps}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 italic text-sm mb-4">
            Values depend on exact birth date and which leap years fall inside
            the span — treat these as reference points, not an exact match for
            every birth date.
          </p>

          <p className="text-gray-200 leading-relaxed">
            10,000 days alive is a milestone people genuinely track — it lands
            around 27 years and 4 months, give or take a few days depending on
            how many leap years fell in that specific window.
          </p>
        </section>

        {/* ── H2: Leap Year ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Gregorian Calendar Makes Age Calculation Complex
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            Earth's orbit takes about 365.2422 days, not a clean 365 — that
            leftover roughly-quarter-day is the entire reason leap years exist,
            and the entire reason "years × 365" is never quite right.
          </p>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            The rule for which years get the extra day:
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              The 3-Rule Leap Year System
            </h3>
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li>
                A year qualifies as a{" "}
                <strong className="text-white">leap year</strong> when it can be
                divided evenly by <strong className="text-white">4</strong>,
                such as 2024 or 2028.
              </li>
              <li>
                <strong className="text-white">Exception:</strong> Century years
                (1700, 1800, 1900) are <em>not</em> leap years even if divisible
                by 4.
              </li>
              <li>
                <strong className="text-white">
                  Exception to the exception:
                </strong>{" "}
                Century years divisible by 400 (e.g., 2000, 2400) <em>are</em>{" "}
                leap years.
              </li>
            </ol>
          </div>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              What Happens If You Were Born on February 29?
            </h3>
            <p className="text-gray-200 leading-relaxed mb-3">
              People born on <strong>February 29</strong> are called{" "}
              <strong>leaplings</strong>. Their chronological age still
              increases by exactly one year every 365 or 366 days like anyone
              else's — the only real question is which date their birthday
              "shows up" on in the three years out of four when February only
              has 28 days.
            </p>
            <p className="text-gray-200 leading-relaxed">
              Most countries default to February 28, some default to March 1;
              this calculator counts elapsed days precisely regardless of which
              convention a specific form uses, so it stays accurate either way.
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed text-lg">
            The upshot: a rough "years × 365" estimate isn't wrong by much, but
            it's never exactly right, and the gap grows every year you add. If a
            form or a legal deadline needs an exact day count, this is the part
            of the math that actually matters.
          </p>
        </section>

        {/* ── H2: How to Calculate Age ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Learn How to Work Out Your Age from Your Birth Date
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8">
            Here's the same process from the worked example above, laid out as a
            general checklist you can apply to any pair of dates.
          </p>

          <div className="space-y-4 mb-10">
            {[
              {
                step: "Step 1",
                title: "Write Down Both Dates",
                desc: "Note your birth date (day, month, year) and today's date. For example: Born August 15, 1995 — Today: July 2, 2026.",
              },
              {
                step: "Step 2",
                title: "Subtract the Days",
                desc: "If today's day number is smaller than the birth day number, borrow a month's worth of days from the month before, then subtract.",
              },
              {
                step: "Step 3",
                title: "Subtract the Months",
                desc: "If the current month (after any borrowing above) is smaller than the birth month, borrow 12 months from the year count.",
              },
              {
                step: "Step 4",
                title: "Subtract the Years",
                desc: "Whatever's left in the years column, after any borrowing above, is your final age in completed years.",
              },
              {
                step: "Step 5",
                title: "Cross-Check with the Calculator",
                desc: "Plug the same two dates into the tool above — if your manual answer doesn't match, it's almost always a missed borrow step or a leap year you didn't account for.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex gap-4 bg-gray-800/30 rounded-xl p-5 border border-gray-700"
              >
                <span className="flex-shrink-0 w-20 text-xs font-bold text-blue-400 bg-blue-950/60 rounded-lg flex items-center justify-center text-center px-2 py-1 h-fit mt-1">
                  {step}
                </span>
                <div>
                  <p className="text-white font-semibold mb-1">{title}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2: Global Standards ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Age Calculation Standards Used in Different Countries
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Age isn't a universal calculation worldwide. If you're comparing a
            birth-year figure from a family member abroad, or reading an
            international document, it helps to know which system produced the
            number:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">System</th>
                  <th className="p-4 text-left font-semibold">Used In</th>
                  <th className="p-4 text-left font-semibold">
                    How Age Increments
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Key Difference
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-blue-300">
                    Gregorian (Western)
                  </td>
                  <td className="p-4">Most of the world, including Pakistan</td>
                  <td className="p-4">On each birthday</td>
                  <td className="p-4">Age is 0 until first birthday</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">
                    East Asian (Korean traditional)
                  </td>
                  <td className="p-4">Korea (traditional, now retired)</td>
                  <td className="p-4">At birth (age 1) + Jan 1 each year</td>
                  <td className="p-4">
                    A baby born Dec 31 is "2" the next day
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">
                    Chinese Nominal Age
                  </td>
                  <td className="p-4">Parts of China</td>
                  <td className="p-4">At birth and Lunar New Year</td>
                  <td className="p-4">Varies by lunar calendar alignment</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">
              South Korea's Age System Reform (2023)
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              In June 2023, South Korea legally retired its traditional age
              system. Official documents now use the standard international
              (Gregorian) age — the same system this calculator uses — which
              made most South Koreans 1–2 years "younger" on paper overnight,
              purely as a documentation change, not an actual change in how old
              anyone was.
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed">
            This calculator uses the <strong>Gregorian system</strong> — the
            standard for government IDs, passports, academic records, and
            financial documents in Pakistan and internationally.
          </p>
        </section>

        {/* ── H2: Corrected Age ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Corrected Age for Premature Babies (Medical Use Case)
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-lg">
            <strong>Corrected age</strong> (also called adjusted age) exists
            because chronological age alone unfairly measures a premature baby
            against full-term milestones. It adjusts for how early the baby
            arrived, so development gets compared to the right baseline.
          </p>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-8">
            <p className="text-blue-400 font-mono text-lg mb-2">
              Corrected Age Formula
            </p>
            <p className="text-white text-xl font-mono">
              Corrected Age = Chronological Age − (40 weeks − Gestational Age at
              Birth)
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Concretely: a baby born at 32 weeks — 8 weeks early — who is now 6
            months (24 weeks) old chronologically has a corrected age of about 4
            months (16 weeks). A pediatrician tracks milestones like sitting up
            or first smiles against that 4-month baseline, not 6 months, because
            otherwise a perfectly on-track premature baby would look "behind."
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Doctors typically stop using corrected age once a child reaches{" "}
            <strong>2 to 3 years old</strong> — by then the gap between
            chronological and corrected age stops being clinically meaningful.
          </p>

          <p className="text-gray-200 leading-relaxed text-base">
            This is strictly a pediatric healthcare concept and has no bearing
            on legal age or official documentation — a birth certificate always
            records the actual birth date, not a "corrected" one.
          </p>
        </section>

        {/* ── H2: Age in Different Units ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Old Am I? — Age in Years, Months, Weeks, Days, Hours, and
            Seconds
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6">
            Years aren't always the most useful unit. Weeks matter for infant
            development tracking; days matter for legal deadlines; hours and
            seconds are mostly for satisfying curiosity — but the underlying
            calculation is identical, just converted to a different scale. Using
            the worked example (30 years, 10 months, 17 days as of July 2,
            2026):
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Unit</th>
                  <th className="p-4 text-left font-semibold">Calculation</th>
                  <th className="p-4 text-left font-semibold">
                    Example (30y 10m 17d)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {[
                  [
                    "Years",
                    "Direct subtraction with borrowing method",
                    "30 years",
                  ],
                  ["Months", "Years × 12 + remaining months", "~370 months"],
                  ["Weeks", "Total days ÷ 7", "~1,611 weeks"],
                  [
                    "Days",
                    "Count all days including leap days",
                    "~11,279 days",
                  ],
                  ["Hours", "Total days × 24", "~270,696 hours"],
                  ["Minutes", "Total hours × 60", "~16,241,760 minutes"],
                  ["Seconds", "Total minutes × 60", "~974,505,600 seconds"],
                ].map(([unit, calc, example]) => (
                  <tr key={unit}>
                    <td className="p-4 font-semibold text-blue-300">{unit}</td>
                    <td className="p-4 text-gray-300">{calc}</td>
                    <td className="p-4 text-green-400 font-mono">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed">
            The calculator above gives you all of these instantly for your own
            dates — no need to redo the arithmetic by hand.
          </p>
        </section>

        {/* ── H2: Birthday Countdown ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Many Days Until My Next Birthday?
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6">
            This works out the gap between today and the next occurrence of your
            birth month/day — and correctly rolls into next year if your
            birthday already passed this year. If today is November and your
            birthday is in January, the countdown correctly points to next
            January, not a negative number.
          </p>

          <div className="bg-gray-900/80 p-6 rounded-xl border border-blue-900/50 text-center mb-8">
            <p className="text-blue-400 font-mono text-lg mb-2">
              Birthday Countdown Formula
            </p>
            <p className="text-white text-lg font-mono">
              Days Until Birthday = Next Birthday Date − Today's Date
            </p>
            <p className="text-gray-400 text-sm mt-2">
              If today is past the birthday this year, next birthday = same
              day/month in (current year + 1)
            </p>
          </div>

          <p className="text-gray-200 leading-relaxed mb-4">
            The calculator also shows the <strong>day of the week</strong> your
            next birthday lands on — handy for booking a venue or putting in a
            leave request before the date fills up.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              What Day of the Week Was I Born?
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">
              This uses <strong>Zeller's Congruence</strong> — a formula that
              maps any Gregorian calendar date directly to a weekday without
              needing to count forward through every year in between. It's the
              same underlying math a paper "perpetual calendar" trick uses, just
              automated.
            </p>
          </div>
        </section>

        {/* ── H2: Age in Special Contexts ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Age Is Used in Real-World Contexts
          </h2>

          <p className="text-gray-200 leading-relaxed mb-8">
            Where this actually comes up, beyond curiosity:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              {
                icon: "🎓",
                title: "School Enrollment",
                body: "Most school systems, including many private schools in Pakistan, set a hard age cutoff for a given grade — commonly turning 5 or 6 by a specific date in the academic year. A child born a week after the cutoff often has to wait a full year, so parents check this precisely rather than assuming closest birthday counts.",
              },
              {
                icon: "🏛️",
                title: "Legal & Government",
                body: "CNIC issuance, voting eligibility, and driving license categories in Pakistan are all tied to specific chronological-age thresholds, and NADRA records depend entirely on the birth date submitted at registration — see the FAQ below on what to do if your ID and your actual age don't match.",
              },
              {
                icon: "🏥",
                title: "Healthcare & Medicine",
                body: "Vaccine schedules (like Pakistan's EPI immunization timeline), growth charts, and medication dosing for children are calibrated to age in months, sometimes weeks for newborns — a few weeks' difference genuinely changes a recommended dose.",
              },
              {
                icon: "💰",
                title: "Financial Planning",
                body: "Life insurance premiums in Pakistan are priced partly off your exact age at the policy start date, and pension eligibility (for government employees, typically at 60) is checked against your recorded birth date, not the year alone.",
              },
              {
                icon: "⚽",
                title: "Sports & Athletics",
                body: "Youth cricket and football age-group categories in Pakistan run on strict cutoff dates — a player born one day after the cutoff plays a full age bracket below or above where their skill level might otherwise place them.",
              },
              {
                icon: "🐕",
                title: "Pet Age Conversion",
                body: "The old 'multiply by 7' rule for dog years is inaccurate, especially early on — a 1-year-old dog is closer to a 15-year-old human than a 7-year-old, since dogs mature much faster in their first two years and the ratio slows down after that.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="bg-gray-800/40 p-5 rounded-2xl border border-gray-700"
              >
                <h3 className="text-lg font-semibold text-blue-300 mb-2 flex items-center gap-2">
                  <span>{icon}</span> {title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── H2: Common Mistakes ── */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes in Age Calculation (And How to Avoid Them)
          </h2>

          <div className="space-y-4 mb-8">
            {[
              {
                mistake: "Ignoring Leap Years",
                fix: "Count actual calendar days rather than multiplying years by 365 — as shown in the worked example, that's an 8-day gap over just 30 years.",
              },
              {
                mistake: "Forgetting the Borrowing Step",
                fix: "This is where most manual calculations go wrong. If today's day number is smaller than the birth day number, you have to borrow from the month before — skip it and the day count comes out negative or wrong.",
              },
              {
                mistake: "Using the Wrong Date Format",
                fix: "Pakistan uses DD/MM/YYYY, but a lot of software defaults to the US MM/DD/YYYY format. 03/08/2026 means August 3rd in one format and March 8th in the other — always double-check which format a form or tool expects before entering dates.",
              },
              {
                mistake: "Not Accounting for Time Zones",
                fix: "Only matters if you're calculating age down to the exact hour (for a very precise medical or legal timestamp). For anything measured in days or more, the date alone is enough — don't overcomplicate it.",
              },
              {
                mistake: "Mixing Age Systems",
                fix: "Applying Korean traditional age logic to a Gregorian birth date (or the reverse) produces a result that's off by 1-2 years — always confirm which system a specific document or record is using before comparing two ages.",
              },
            ].map(({ mistake, fix }) => (
              <div
                key={mistake}
                className="flex gap-4 bg-gray-800/30 rounded-xl p-5 border border-gray-700"
              >
                <span className="text-red-400 text-lg flex-shrink-0 mt-0.5">
                  ✗
                </span>
                <div>
                  <p className="text-white font-semibold mb-1">{mistake}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-green-400 font-semibold">Fix: </span>
                    {fix}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST / E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control
              Engineering Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
            <span>📅 Published: Apr 1, 2026</span>
            <span>🔄 Updated: Jul 2, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>
      </article>
      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
