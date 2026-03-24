import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const HoursCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});


const faqData = [
  {
    question: "How do I calculate total hours worked in a day?",
    answer: "To find your daily total, subtract your start time from your end time and then subtract any unpaid break duration. For example, if you start at 8:30 AM and finish at 5:00 PM with a 30-minute lunch break: (5:00 PM - 8:30 AM) = 8 hours 30 minutes. Subtracting the 30-minute break leaves you with exactly 8.00 hours worked.",
  },
  {
    question: "How do I subtract a 30-minute lunch break from my total hours?",
    answer: "To subtract a break accurately, convert the break into a fraction of an hour or subtract the minutes directly from your total. Since 30 minutes is 0.5 hours (30 / 60 = 0.5), if your raw time is 8 hours and 15 minutes (8.25), your net time is 8.25 - 0.5 = 7.75 hours, which equals 7 hours and 45 minutes.",
  },
  {
    question: "How can I convert my total hours and minutes into a decimal format?",
    answer: "To convert time to a decimal for billing or payroll, divide the minutes by 60 and add the result to the whole hours. The formula is: Total Hours + (Minutes / 60). For example, 6 hours and 36 minutes becomes 6 + (36 / 60) = 6.6 hours. This format is standard for most digital invoicing and payroll systems.",
  },
  {
    question: "How do I calculate overtime hours?",
    answer: "Overtime is typically any time worked beyond 40 hours in a standard 7-day work week. To calculate it, use the formula: Total Hours - 40 = Overtime Hours. If you worked 47.5 hours this week, you have 7.5 hours of overtime. Depending on local laws, these 7.5 hours are often paid at a 'time-and-a-half' rate (1.5x your hourly wage).",
  },
  {
    question: "What is the best way to add multiple time shifts together?",
    answer: "The most efficient way is to sum all minutes first, then all hours. Convert every 60 minutes into 1 additional hour. For example, two shifts of 4h 45m and 3h 25m total 7h 70m. Since 70 minutes is 1h 10m, the combined total is 8 hours and 10 minutes.",
  },
  {
    question: "How do I calculate hours if my shift crosses midnight?",
    answer: "When a shift starts one day and ends the next, add 24 to the end time to make the subtraction possible. If you start at 9:00 PM (21:00) and end at 5:00 AM (05:00), calculate: (5 + 24) - 21 = 8 hours. This adjustment ensures your duration remains a positive number despite the date change.",
  }
];

export const metadata: Metadata = {
  title: "Hours Calculator: Find the Exact Time Duration Between Two Times",
  description:
    "Calculate the exact hours and minutes between two times. Features AM/PM support, midnight crossover, and total decimal hours for easy payroll tracking.",

  keywords: [
    "hours calculator",
    "time difference calculator",
    "calculate hours between times",
    "duration calculator",
    "shift hours calculator",
    "work hours counter",
    "elapsed time calculator",
    "decimal hours converter",
    "time duration tool",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/time/hours-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Hours & Time Duration Calculator | LizoCalc",
    description:
      "Find the exact time difference between two points. Perfect for shift tracking, project management, and daily duration calculations.",
    url: "https://lizocalc.com/calculators/time/hours-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hours Calculator - Accurate Time Difference",
    description:
      "Quickly calculate elapsed time and total hours between any two times with our free, professional calculator.",
  },
};

export default function HoursPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT (BEST PRACTICE) === */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/time/hours-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Time ",
                    item: "https://lizocalc.com/calculators/time",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Hours Calculator",
                    item: "https://lizocalc.com/calculators/time/hours-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/time/hours-calculator",
                url: "https://lizocalc.com/calculators/time/hours-calculator",
                name: "Hours Calculator",
                description: "Use our hours calculator to find the exact duration between two times, including AM/PM support and midnight crossover calculation.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/time/hours-calculator#app",
                name: "Hours Calculator",
                url: "https://lizocalc.com/calculators/time/hours-calculator",
                description:
                  "Free hours calculator to determine the exact time duration between two times, supporting overnight calculations.",
                applicationCategory: "UtilityApplication",
                applicationSubCategory: "Time Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate duration between two times",
                  "Supports AM/PM format",
                  "Handles overnight (midnight) shifts",
                  "Provides result in decimal hours and minutes",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
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
             Hours Calculator: Find the Exact Time Duration Between Two Times
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <HoursCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Hours Calculator</strong> (also called elapsed time calculator, work hours calculator, or decimal time converter) is one of the most practical time-tracking tools — especially for freelancers in Sahiwal, office employees preparing monthly timesheets, students logging study hours for board exams or university assignments, project managers tracking task durations, and small business owners calculating employee wages or billable client time. Whether you're figuring out how many hours you worked from 9:15 AM to 5:40 PM or converting 7 hours 45 minutes into decimal format for payroll, getting the math right every time prevents underbilling, overworking, or disputes.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required <strong>LizoCalc Hours Calculator</strong> instantly computes:
          <br />• Exact hours and minutes between any start and end time
          <br />• Decimal hours (perfect for invoicing & payroll in Pakistan)
          <br />• Total minutes breakdown
          <br />• Support for AM/PM, 12-hour & 24-hour formats
          <br />• Overnight shift & multi-day calculation handling
          <br />• One-click "Set to Now" button for real-time tracking
          The tool is fully mobile-friendly, works offline after first load (progressive web app), remembers your recent time entries (with your consent), and never shows ads. Ideal for freelancers in Punjab, government employees, tuition teachers, content creators, and students preparing for Matric/FSc exams. Jump right in and try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/time/hours-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Hours Calculator page
          </NoPrefetchLink>.
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Accurate Elapsed Time Calculation Made Simple
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                How to Calculate Hours and Minutes Between AM and PM
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Select start time (e.g., 9:30 AM) and end time (e.g., 6:15 PM) — the calculator automatically handles AM/PM crossover and gives you <strong>8 hours 45 minutes</strong>.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Instant Conversion to Decimal Hours for Payroll and Billing
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Same duration becomes <strong>8.75 hours</strong> — ready to multiply by your hourly rate (e.g., Rs. 1,200/hr → Rs. 10,500 for the day).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Using the "Set to Now" Feature for Real-Time Tracking
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Click "Set Start to Now" when you begin work/study, then later click "Set End to Now" — perfect for tracking live sessions, freelance calls, or Pomodoro-style focus blocks.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Why decimal time precision is vital for professional timesheets
          </h4>
          <p className="text-gray-200 text-base">
            Many Pakistani companies, Upwork clients, and FBR-compliant invoicing systems require decimal hours. A small rounding error (7:36 → 7.6 instead of 7.60) can lead to hundreds or thousands of rupees difference per month.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step: How to Use the Hours Calculator
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Setting Your Start and End Times with 12-Hour Selection
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Choose 12-hour or 24-hour format from the toggle</li>
                <li>Select hours (1–12), minutes (00–59), and AM/PM</li>
                <li>Repeat for end time</li>
                <li>Results appear instantly — no calculate button needed</li>
              </ol>
            </div>

            <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
              Handling Overnight Durations and 24-Hour Shifts
            </h3>
            <p className="text-gray-200 text-base leading-relaxed mb-4">
              Start: 10:00 PM   End: 6:30 AM next day → <strong>8 hours 30 minutes</strong> (8.50 decimal hours)
            </p>

            <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
              Understanding Total Duration vs. Total Minutes Results
            </h3>
            <p className="text-gray-200 text-base">
              You get both formats:
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
              <li>Human-readable: 8 hours 45 minutes</li>
              <li>Total minutes: 525 minutes</li>
              <li>Decimal hours: 8.75 h</li>
            </ul>

            <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
              Visualizing the time gap: How our algorithm processes AM/PM shifts
            </h4>
            <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
              if endTime &lt; startTime:<br />
                  endTime += 24 hours<br />
              totalMinutes = (endTime - startTime) / 60,000<br />
              hours = Math.floor(totalMinutes / 60)<br />
              minutes = totalMinutes % 60<br />
              decimal = hours + (minutes / 60)
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Math of Time: Understanding Decimal Hours
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Formula: How to Convert Minutes into Decimal Format
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            decimalHours = fullHours + (extraMinutes / 60)
            <br /><br />
            Example: 7 hours 36 minutes<br />
            36 ÷ 60 = 0.6<br />
            → <strong>7.60 hours</strong>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why 7:30 is 7.50 Hours: Common Time Conversion Mistakes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Common error: thinking 30 minutes = 0.3 hours (wrong!)<br />
            Correct: 30 ÷ 60 = <strong>0.50</strong>
          </p>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Clock Time</th>
                  <th className="p-4 text-left font-semibold">Minutes</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">Correct / Wrong</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">7:15</td><td className="p-4">15 min</td><td className="p-4 font-bold text-green-400">7.25 h</td><td className="p-4">Correct</td></tr>
                <tr><td className="p-4">7:30</td><td className="p-4">30 min</td><td className="p-4 font-bold text-green-400">7.50 h</td><td className="p-4">Correct</td></tr>
                <tr><td className="p-4">7:45</td><td className="p-4">45 min</td><td className="p-4 font-bold text-green-400">7.75 h</td><td className="p-4">Correct</td></tr>
                <tr><td className="p-4">7:36</td><td className="p-4">36 min</td><td className="p-4 font-bold text-green-400">7.60 h</td><td className="p-4">Correct</td></tr>
                <tr><td className="p-4">7:36</td><td className="p-4">36 min</td><td className="p-4 text-red-400">7.36 h</td><td className="p-4">Common mistake</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Precision Logic: Ensuring 100% Accuracy in Time Math
          </h3>
          <p className="text-gray-200 text-base">
            We use millisecond-precision internally and round decimal hours to 4 places — accurate enough for even the strictest payroll or tax audits in Pakistan.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why LizoCalc is the Best Tool for Time Tracking
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            One-Click "Zap" Feature to Sync with Your Current Time
          </h3>
          <p className="text-gray-200 text-base">
            "Zap Start" and "Zap End" buttons instantly fill current time — ideal when you forget to note the exact start of a meeting or study session.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Smart Memory: Functional Cookies Remember Your Last Entries
          </h3>
          <p className="text-gray-200 text-base">
            Your most recent start/end times are saved locally so you can continue tracking across tabs or phone sessions.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Mobile-First Design for Quick Calculations on the Go
          </h3>
          <p className="text-gray-200 text-base">
            Large touch targets, clear AM/PM toggle, and instant feedback — perfect for field workers, tuition teachers, and students using budget Android phones in Sahiwal.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            100% Free and Private: No Data Stored on Servers
          </h3>
          <p className="text-gray-200 text-base">
            All calculations happen in your browser. No account, no tracking, no data leaves your device.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real-World Applications for an Hours Calculator
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Freelancers and Contractors: Calculating Billable Work Hours
          </h3>
          <p className="text-gray-200 text-base">
            Upwork / Fiverr / local clients: log time accurately → convert to decimal → multiply by rate → generate clean invoices.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Project Managers: Tracking Task Durations and Milestones
          </h3>
          <p className="text-gray-200 text-base">
            "Task A took 3h 40m" → compare against estimates → improve future sprint planning.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Students: Managing Study Sessions and Pomodoro Timers
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Log 2h 25m Math + 1h 40m Physics → total 4.08 hours studied today</li>
            <li>Track weekly study hours for board exam preparation</li>
            <li>Measure Pomodoro focus blocks (25 min = 0.42 h)</li>
            <li>Calculate tuition teaching hours for monthly income</li>
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Reference: Common Durations in Decimal Hours
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Clock Duration</th>
                  <th className="p-4 text-left font-semibold">Total Minutes</th>
                  <th className="p-4 text-left font-semibold">Decimal Hours</th>
                  <th className="p-4 text-left font-semibold">Use Case Example</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">8 hours</td><td className="p-4">480</td><td className="p-4 font-bold text-green-400">8.00 h</td><td className="p-4">Full office day</td></tr>
                <tr><td className="p-4">7 h 30 min</td><td className="p-4">450</td><td className="p-4 font-bold text-green-400">7.50 h</td><td className="p-4">Standard school + tuition</td></tr>
                <tr><td className="p-4">9 h 15 min</td><td className="p-4">555</td><td className="p-4 font-bold text-green-400">9.25 h</td><td className="p-4">Long freelance session</td></tr>
                <tr><td className="p-4">4 h 45 min</td><td className="p-4">285</td><td className="p-4 font-bold text-green-400">4.75 h</td><td className="p-4">Exam preparation block</td></tr>
                <tr><td className="p-4">10 h 40 min</td><td className="p-4">640</td><td className="p-4 font-bold text-green-400">10.67 h</td><td className="p-4">Night shift example</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Time & Productivity Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine with these other free LizoCalc tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <NoPrefetchLink href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
                Time Calculator
              </NoPrefetchLink> — hours ↔ minutes ↔ seconds conversions
            </li>
            <li>
              <NoPrefetchLink href="/calculators/time/date-calculator" className="text-blue-400 hover:underline">
                Date Calculator
              </NoPrefetchLink> — days between dates & add/subtract time
            </li>
            <li>
              <NoPrefetchLink href="/calculators/time/age-calculator" className="text-blue-400 hover:underline">
                Age Calculator
              </NoPrefetchLink> — exact age in years + total days/hours lived
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Accurate time tracking is the foundation of productivity, fair billing, and effective study habits. Whether you're freelancing from Sahiwal, managing projects, or preparing for board exams — LizoCalc Hours Calculator gives you precise, decimal-ready results every single time. Bookmark it today and take control of every hour!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}