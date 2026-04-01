import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import GPACalculator from "./clientside";


const faqData = [
  {
    question: "How do I calculate my GPA on a 4.0 scale?",
    answer: "To calculate your GPA, first convert each letter grade to its numerical value (A=4, B=3, C=2, D=1, F=0). Multiply each grade value by the course's credit hours to find the 'Quality Points.' Finally, divide the sum of all quality points by the total number of credits. Formula: Total Quality Points / Total Credits = GPA.",
  },
  {
    question: "What is the difference between Weighted and Unweighted GPA?",
    answer: "An unweighted GPA is calculated on a standard 4.0 scale regardless of class difficulty. A weighted GPA gives extra points for advanced courses like AP, IB, or Honors. For example, an 'A' in a standard class is worth 4.0, but an 'A' in an AP class is often worth 5.0. This reflects the higher academic rigor of those subjects.",
  },
  {
    question: "How do I calculate my Semester GPA vs. Cumulative GPA?",
    answer: "A Semester GPA only includes grades from your current term. To find your Cumulative GPA, you must combine all quality points earned across all semesters and divide them by the total number of credits attempted throughout your entire academic career. Cumulative GPA = (Semester 1 Points + Semester 2 Points + ...) / (Total Combined Credits).",
  },
  {
    question: "How do I convert a percentage grade to a 4.0 GPA?",
    answer: "While scales vary by school, a common conversion is: 90-100% = 4.0 (A), 80-89% = 3.0 (B), 70-79% = 2.0 (C), 60-69% = 1.0 (D), and below 60% = 0.0 (F). To get a more precise decimal, use the formula: (Percentage / 20) - 1. For example, an 85% would be (85 / 20) - 1 = 3.25.",
  },
  {
    question: "How do 'Pass/Fail' classes affect my GPA?",
    answer: "In most grading systems, a 'Pass' grade awards you credit toward graduation but is excluded from your GPA calculation entirely. However, a 'Fail' in a pass/fail course is often treated as a 0.0 and will lower your GPA. It is always best to check your specific university handbook, as policies on 'No Credit' (NC) marks can vary.",
  },
  {
    question: "How can I raise my GPA before graduation?",
    answer: "To raise your GPA, you must earn grades higher than your current average in upcoming credits. You can calculate the required grades using this formula: Target Points = (Desired GPA * Total Future Credits) - Current Quality Points. Retaking a class you previously failed or performed poorly in is often the fastest way to see a significant GPA boost.",
  },
];
export const metadata: Metadata = {
  title: "GPA Calculator | Semester & Cumulative Grade Point Average",
  description: "Calculate your semester and cumulative GPA instantly with our free GPA calculator. Supports weighted and unweighted scales for students across all academic levels.",
  keywords: [
    "GPA calculator",
    "grade point average calculator",
    "semester GPA calculator",
    "cumulative GPA calculator",
    "4.0 scale GPA converter",
    "college GPA tracker",
    "high school GPA calculator",
    "weighted GPA calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/gpa-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "GPA Calculator | Accurate Academic Tracking | LizoCalc",
    description: "Plan your academic success with our free GPA calculator. Easily compute your semester or cumulative GPA for high school or college.",
    url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator | Track Your Academic Performance",
    description: "Quickly find your Grade Point Average for single or multiple semesters using LizoCalc's professional GPA tool.",
  },
};
export default function GPAPage() {
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
                  "https://www.lizocalc.com/calculators/education/gpa-calculator#breadcrumb",
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
                    name: "Education",
                    item: "https://www.lizocalc.com/calculators/education",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "GPA Calculator",
                    item: "https://www.lizocalc.com/calculators/education/gpa-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator",
  url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
  name: "GPA Calculator",
  description: "Use our GPA calculator to instantly compute your Grade Point Average for single or multiple semesters.",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "name": "LizoCalc",
    "url": "https://www.lizocalc.com"
  },
  "mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator#app"
}
},

              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/education/gpa-calculator#app",
                name: "GPA Calculator",
                url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
                description:
                  "Educational GPA calculator to compute semester and cumulative GPA accurately.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "GPA Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate semester GPA",
                  "Compute cumulative GPA",
                  "Support multiple grading scales",
                  "Instant calculation with accurate results",
                  "Simple and easy to use",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                "potentialAction": {
  "@type": "UseAction",
  "target": ["https://www.lizocalc.com/calculators/education/gpa-calculator"]
}
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
            GPA Calculator: Calculate Your Semester and Cumulative GPA Instantly
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <GPACalculator />

        
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>GPA Calculator</strong> (Grade Point Average calculator on a 4.0 scale) is one of the most essential academic tools for high school and university students in Pakistan — whether you're in preparing for FSc, A-Levels, or university admissions, a parent helping your child track intermediate results, or a college student monitoring semester performance for scholarships and job applications. Your GPA is not just a number — it's the key to university admissions (especially for engineering, medical, and top public/private universities in Punjab), merit-based scholarships, HEC equivalence certificates, and even first-job shortlisting.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required <strong>LizoCalc GPA Calculator</strong> makes it effortless to:
          <br />• Convert letter grades (A+, A, B+, etc.) or percentage marks to 4.0 scale points
          <br />• Calculate semester GPA and cumulative CGPA across multiple semesters
          <br />• Handle both unweighted (standard 4.0) and weighted scales (AP, honors, advanced classes)
          <br />• Get real-time updates as you enter courses and credits
          <br />The tool is fully mobile-friendly, works offline after first load (progressive web app style), remembers your grades across sessions (with your consent via functional cookies), supports Pakistani intermediate/university grading systems, and never shows ads. Perfect for students in every from the world  — anyone aiming for top merit lists or international applications. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/education/gpa-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            GPA Calculator page
          </Link>.
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your GPA on a 4.0 Scale
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step-by-Step: Converting Letter Grades to Grade Points
              </h3>
              <p className="text-gray-200 leading-relaxed text-base mb-4">
                Most Pakistani boards and universities use a 4.0 GPA scale similar to the US system. Typical conversion:
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5 mb-6">
                <li>A+ / 90–100% = 4.0</li>
                <li>A  / 85–89%  = 4.0 or 3.7 (depending on institution)</li>
                <li>B+ / 80–84%  = 3.3</li>
                <li>B  / 75–79%  = 3.0</li>
                <li>C+ / 70–74%  = 2.3</li>
                <li>C  / 65–69%  = 2.0</li>
                <li>D  / 60–64%  = 1.0</li>
                <li>F  / Below 60% = 0.0</li>
              </ul>
              <p className="text-gray-300 italic text-base">
                Pro tip: For intermediate (FSc/ICS) or university semesters in Punjab, always check your specific board/university handbook — some use slightly different cutoffs.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Understanding the Formula: Total Quality Points ÷ Total Credits
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            GPA = <strong>(Sum of (Grade Point × Credit Hours) for each course)</strong> ÷ <strong>Total Credit Hours</strong>
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Quality Points = Grade Point × Credit Hours<br />
            Semester GPA = Total Quality Points ÷ Total Credits Attempted
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How to Input Multiple Semesters for a Cumulative Result
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Add each semester separately — the tool automatically calculates cumulative GPA (CGPA) weighted by total credits across all terms.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Example calculation for a 15-credit hour semester
          </h4>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-3">
            <div>Course 1: Physics (4 credits) → A (4.0) → 16.0 quality points</div>
            <div>Course 2: Math (3 credits) → B+ (3.3) → 9.9 quality points</div>
            <div>Course 3: Chemistry (4 credits) → A- (3.7) → 14.8 quality points</div>
            <div>Course 4: English (3 credits) → B (3.0) → 9.0 quality points</div>
            <div className="pt-4 border-t border-gray-600 text-green-400 font-semibold">
              Total Quality Points = 49.7<br />
              Total Credits = 14<br />
              Semester GPA = <strong>49.7 ÷ 14 = 3.55</strong>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weighted vs. Unweighted GPA: What’s the Difference?
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Calculating Weighted GPA for AP, IB, and Honors Classes
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            In advanced programs (A-Levels, IB, or honors tracks in some Pakistani colleges), extra points are added:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>Honors / Advanced = +0.5 to grade point</li>
            <li>AP / IB Higher Level = +1.0 to grade point</li>
          </ul>
          <p className="text-gray-200 text-base mt-4">
            Example: A in AP Physics (5.0 instead of 4.0) × 4 credits = 20 quality points.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why Your High School GPA Might Be Higher Than 4.0
          </h3>
          <p className="text-gray-200 text-base">
            Weighted GPAs commonly reach 4.5–5.0+ when students take multiple advanced courses — this is normal and expected by top universities.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Colleges View Weighted vs. Unweighted Transcripts
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Most Pakistani universities (UET, NUST, PIEAS, LUMS, FAST) and international admissions look at both:
            <br />• Unweighted GPA — core academic strength
            <br />• Weighted GPA — rigor of coursework (honors/AP/IB)
            <br />Many recalculate GPA using their own scale — so accuracy in input matters.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Essential Features of the LizoCalc GPA Tool
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Real-Time Updates as You Add New Courses
          </h3>
          <p className="text-gray-200 text-base">
            Add or edit any course — GPA and CGPA recalculate instantly. No "Calculate" button needed.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Support for Standard 4.0 and Custom Weighted Scales
          </h3>
          <p className="text-gray-200 text-base">
            Toggle between unweighted 4.0 and weighted (+0.5 / +1.0) — or enter your own custom grade points if your board/university uses a different system.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Save Your Progress: Using Functional Cookies to Store Grades
          </h3>
          <p className="text-gray-200 text-base">
            Your current semester/courses are saved locally — continue editing tomorrow without re-entering everything.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Clean, Ad-Free Interface for Fast Academic Planning
          </h3>
          <p className="text-gray-200 text-base">
            No distractions — just grades, credits, and your GPA. 
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Pro Tips for Raising Your Cumulative GPA
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Impact of Retaking a Class on Your Total Average
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            In many Pakistani universities (and some intermediate boards), retaking a course replaces the old grade in CGPA calculation. A D (1.0) replaced with an A (4.0) in a 3-credit course boosts total quality points by +9 — huge impact on CGPA.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            How to Forecast Your Final GPA Before Graduation
          </h3>
          <p className="text-gray-200 text-base">
            Enter current completed credits + expected future semesters with target grades — instantly see what you need to maintain or achieve (e.g., 3.8+ for Dean's List or scholarship renewal).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Why Consistency in Credit-Heavy Courses Matters Most
          </h3>
          <p className="text-gray-200 text-base">
            A 4-credit major course has double the weight of a 2-credit elective. Getting A in high-credit subjects (Physics, Math, Engineering core) has 2× the impact on GPA compared to general education courses.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical GPA Calculation Examples
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Scenario</th>
                  <th className="p-4 text-left font-semibold">Courses & Grades</th>
                  <th className="p-4 text-left font-semibold">Total Credits</th>
                  <th className="p-4 text-left font-semibold">GPA / CGPA</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Single Semester (FSc Part-I style)</td>
                  <td className="p-4">Physics A (4cr), Math B+ (3cr), Chem A- (4cr), Eng B (3cr)</td>
                  <td className="p-4">14</td>
                  <td className="p-4 font-bold text-green-400">3.55</td>
                </tr>
                <tr>
                  <td className="p-4">University Semester with Weighted</td>
                  <td className="p-4">AP Physics A (4cr → 5.0), Math A (3cr → 4.0), others B average</td>
                  <td className="p-4">15</td>
                  <td className="p-4 font-bold text-green-400">4.18 (weighted)</td>
                </tr>
                <tr>
                  <td className="p-4">Cumulative after 3 semesters</td>
                  <td className="p-4">Sem1 3.2 (18cr), Sem2 3.6 (17cr), Sem3 3.8 (16cr)</td>
                  <td className="p-4">51</td>
                  <td className="p-4 font-bold text-green-400">3.52 CGPA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Academic Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your GPA tracking with these other free LizoCalc tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link href="/calculators/math/percentage-calculator" className="text-blue-400 hover:underline">
                Percentage Calculator 
              </Link> — for boards using % marks
            </li>
            <li>
              <Link href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
                Time Calculator
              </Link> — track study hours in decimal format
            </li>
            
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Your GPA shapes your academic future . LizoCalc GPA Calculator gives you accurate, real-time insight so you can plan smarter, study better, and achieve higher. Bookmark it today and stay ahead of your academic goals!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
