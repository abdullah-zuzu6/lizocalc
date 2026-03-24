import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const AdvancedGradeCalculator= dynamic(() => import("./clientside"), {
  ssr: false,
});
const faqData = [
  {
    question: "How do I calculate my weighted grade?",
    answer: "To calculate a weighted grade, multiply the average of each category (e.g., Homework, Exams) by its weight decimal. Then, add those totals together. For example, if Exams are 60% and you have a 90%, and Homework is 40% with an 80%, your grade is: (90 * 0.60) + (80 * 0.40) = 54 + 32 = 86%.",
  },
  {
    question: "What grade do I need on my final exam to pass?",
    answer: "You can find your required final exam grade using this formula: (Target Grade - (Current Grade * (100% - Final Weight))) / Final Weight. If you have an 85%, want a 90% overall, and the final is worth 20%, you need: (90 - (85 * 0.80)) / 0.20 = (90 - 68) / 0.20 = 110%. You'll need extra credit!",
  },
  {
    question: "How do I convert a percentage to a letter grade?",
    answer: "Most schools use a standard 10-point scale: 90-100% is an A, 80-89% is a B, 70-79% is a C, 60-69% is a D, and below 60% is an F. Some institutions use a +/- system where a B+ starts at 87% and an A- starts at 90%. Always check your course syllabus for the specific grading curve used by your instructor.",
  },
  {
    question: "Does a 0 on an assignment ruin my grade?",
    answer: "A zero has a high impact because it pulls down your average significantly. For instance, if you have four 100% scores and one 0%, your average drops to 80% (B-). To recover, you must earn high scores on future assignments to 'dilute' the zero's weight. Using a grade calculator helps you see exactly how many 100s you need to get back to an A.",
  },
  {
    question: "How do I calculate my current class standing before finals?",
    answer: "To find your current grade, sum the points you've earned and divide by the total points possible so far. If categories are weighted, calculate the average for each completed category, multiply by their relative weights, and divide the total by the percentage of the course grade already completed. This gives you your 'running' average.",
  },
  {
    question: "What is the difference between a points-based and weighted system?",
    answer: "In a points-based system, every point carries the same value (Total Points Earned / Total Points Possible). In a weighted system, certain categories like 'Final Projects' are worth a specific percentage of your total grade regardless of how many individual points they contain. Weighted systems allow instructors to prioritize mastery over busywork.",
  },
];

export const metadata: Metadata = {
  title: " Grade Calculator | Weighted & Final Grade Predictor",
  description: "Estimate your semester GPA and project final exam requirements with our advanced grade calculator. Track academic performance using weighted categories and custom scales.",
  keywords: [
    "grade calculator",
    "weighted grade calculator",
    "final grade calculator",
    "class grade tracker",
    "advanced academic calculator",
    "semester grade projector",
    "college course grade calculator",
    "high school grade tool",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/education/grade-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Advanced Grade Calculator | Track & Project Your Grades | LizoCalc",
    description: "Take control of your academic success. Use our advanced tool to calculate weighted averages and find out exactly what you need on your final exam.",
    url: "https://lizocalc.com/calculators/education/grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced Grade Calculator | Professional Academic Tools",
    description: "Project your final grades and manage weighted course categories with LizoCalc's professional-grade academic calculator.",
  },
};

export default function GradePage() {
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
                  "https://lizocalc.com/calculators/education/grade-calculator#breadcrumb",
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
                    name: "Education Calculators",
                    item: "https://lizocalc.com/calculators/education",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Grade Calculator",
                    item: "https://lizocalc.com/calculators/education/grade-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/education/grade-calculator",
                url: "https://lizocalc.com/calculators/education/grade-calculator",
                name: "Advanced Grade Calculator",
                description: "Use our advanced grade calculator to estimate your semester GPA, track academic performance, and project final grades instantly.",
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
                  "https://lizocalc.com/calculators/education/grade-calculator#app",
                name: "Advanced Grade Calculator",
                url: "https://lizocalc.com/calculators/education/grade-calculator",
                description:
                  "Advanced grade calculator to estimate semester GPA, weighted grades, and track academic progress.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Grade Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate semester GPA",
                  "Support for weighted grades",
                  "Track multiple courses",
                  "Instant academic standing projection",
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
Grade Calculator: Track Your Class Standing and Final Exam Goals            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedGradeCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Grade Calculator</strong> (also known as current grade tracker, final exam predictor, or weighted grade calculator) is an indispensable tool for students  — especially those in condition preparing for Matric, FSc, A-Levels, or university semesters. Whether you're anxiously checking your current standing after midterms, forecasting what you need on finals to secure an A, or planning how much weight each assignment category carries, knowing your exact grade at any moment removes stress and helps you study smarter. In competitive academic environments like Punjab boards, university merit lists, and scholarship applications, even 0.5–1% can make the difference between first division and second, or qualifying for UET/NUST/LUMS.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required <strong>LizoCalc Grade Calculator</strong> lets you:
          <br />• Instantly see your current grade as you enter assignments
          <br />• Use weighted categories (exams 50%, quizzes 20%, assignments 30%, etc.)
          <br />• Predict final exam scores needed to reach any target grade
          <br />• Handle both points-based and percentage-based grading
          <br />• Support complex syllabi with multiple categories
          <br />The tool is mobile-optimized, works offline after first load, saves your course data locally via functional cookies (with your consent), updates in real-time, and contains zero ads. Perfect for intermediate students in Sahiwal, university undergraduates, tuition-going kids, and parents tracking progress. Try it now on our{" "}
          <NoPrefetchLink
            href="/calculators/academic/grade-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Grade Calculator page
          </NoPrefetchLink>.
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Your Current Grade Instantly
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Step-by-Step: Adding Your Assignments and Categories
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>Create categories matching your syllabus (Exams, Quizzes, Assignments, Projects, Attendance)</li>
                <li>Enter weight percentage for each category (must total 100%)</li>
                <li>Add individual scores: assignment name, points earned / total points or percentage</li>
                <li>Watch your current grade update live as you type</li>
              </ol>
              
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            The Weighted Average Formula
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Your overall grade is the sum of each category's contribution:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Current Grade (%) = (Category1 Score × Category1 Weight) + (Category2 Score × Category2 Weight) + ...
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How to Input Points-Based vs. Percentage-Based Grades
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The tool supports both systems:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
            <li><strong>Points-based</strong>: Enter earned / total (e.g., 42 / 50) → auto-converts to %</li>
            <li><strong>Percentage-based</strong>: Directly enter 85% for a quiz</li>
          </ul>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Example: Calculating a grade with 60% Exams and 40% Homework
          </h4>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-3 font-mono text-green-300">
            <div>Exams (60% weight): 78% average so far</div>
            <div>Homework (40% weight): 92% average</div>
            <div className="pt-4 border-t border-gray-600">
              Exam contribution = 78 * 0.60 = 46.8%<br />
              Homework contribution = 92 * 0.40 = 36.8%<br />
              Current Grade = <strong>46.8 + 36.8 = 83.6%</strong>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Final Grade Predictor: What Score Do You Need on the Final?
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Using the "What If" Feature to Project Your Semester Result
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Enter your current grade and the weight of the final exam → input different final scores to see your projected semester grade instantly.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating the Minimum Final Exam Grade to Pass
          </h3>
          <p className="text-gray-200 text-base">
            Set your target (e.g., 70% to pass or 85% for A) — the tool tells you exactly what you need on finals.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Understanding the Final Exam Weight Impact on Your Total Grade
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A 30% final exam has massive leverage. If you're currently at 65% and finals are 30%, you still have room to reach 80% overall.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-6 mb-3">
            The "Final Exam Panic" Formula
          </h4>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Required Final % = (Goal - (Current * (1 - w))) / w<br /><br />
            Where:<br />
            • Goal = desired final grade (%)<br />
            • Current = current grade before final (%)<br />
            • w = final exam weight (decimal, e.g. 0.35 for 35%)<br /><br />
            Example:<br />
            Goal = 85%, Current = 72%, w = 0.35<br />
            Required = (85 - (72 * 0.65)) / 0.35<br />
            = (85 - 46.8) / 0.35<br />
            = 38.2 / 0.35<br />
            = <strong>109.14%</strong> (impossible → adjust goal or accept lower grade)
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Advanced Features for Professional Academic Tracking
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Dynamic Category Creation for Complex Course Syllabi
          </h3>
          <p className="text-gray-200 text-base">
            Add as many categories as your syllabus requires (e.g., Midterm 25%, Final 40%, Labs 15%, Quizzes 10%, Attendance 10%).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Real-Time Grade Updates with Instant Calculation Logic
          </h3>
          <p className="text-gray-200 text-base">
            Change any score or weight — your current grade and final projections update immediately.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Save Your Data: Privacy-First Persistence with Functional Cookies
          </h3>
          <p className="text-gray-200 text-base">
            Your course setup, assignments, and scores are saved locally in your browser — continue tomorrow without re-entering.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Mobile-Optimized Interface for Fast Updates During Class
          </h3>
          <p className="text-gray-200 text-base">
            Large input fields, quick-add buttons, and instant feedback — perfect for entering quiz scores right after class on your phone.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding Different Grading Scales and Systems
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Standard 4.0 GPA Scale vs. Percentage Grading
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Many Pakistani intermediate boards still use raw percentages, while universities often convert to 4.0 GPA. Our tool shows both views.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Plus/Minus Grading Affects Your Cumulative Standing
          </h3>
          <p className="text-gray-200 text-base">
            A- (3.7) vs A (4.0) makes a big difference in CGPA over multiple courses — especially in credit-heavy subjects.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            The Difference Between Weighted and Unweighted Gradebooks
          </h3>
          <p className="text-gray-200 text-base">
            Unweighted treats all courses equally. Weighted gives extra points for honors/AP/advanced classes — common in A-Levels and some top colleges.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Grading Scenarios & Calculations 
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Scenario</th>
                  <th className="p-4 text-left font-semibold">Current %</th>
                  <th className="p-4 text-left font-semibold">Final Weight</th>
                  <th className="p-4 text-left font-semibold">Target Grade</th>
                  <th className="p-4 text-left font-semibold">Required on Final</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">FSc Midterm Check</td>
                  <td className="p-4">68%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">75% (Pass + margin)</td>
                  <td className="p-4 font-bold text-green-400">86.25%</td>
                </tr>
                <tr>
                  <td className="p-4">University Semester</td>
                  <td className="p-4">82%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">90% (A grade)</td>
                  <td className="p-4 font-bold text-green-400">106% → impossible, aim 88%</td>
                </tr>
                <tr>
                  <td className="p-4">Heavy Final Weight</td>
                  <td className="p-4">55%</td>
                  <td className="p-4">50%</td>
                  <td className="p-4">70% to pass</td>
                  <td className="p-4 font-bold text-green-400">85%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Academic & Time Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine grade tracking with these free LizoCalc companions:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <NoPrefetchLink href="/calculators/education/gpa-calculator" className="text-blue-400 hover:underline">
                GPA Calculator
              </NoPrefetchLink> — convert grades to 4.0 scale & track CGPA
            </li>
            <li>
              <NoPrefetchLink href="/calculators/time/time-calculator" className="text-blue-400 hover:underline">
                Time Calculator
              </NoPrefetchLink> — convert study hours to decimal for productivity logs
            </li>
           
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
           LizoCalc Grade Calculator gives you crystal-clear insight, final-exam predictions, and stress-free planning so you can focus on learning instead of worrying. Bookmark it today — your academic edge starts here!
          </p>
        </section>
      </article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}