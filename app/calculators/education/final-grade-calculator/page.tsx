import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import FinalGradeCalculator from "./clientside";
import Image from "next/image";

const faqData = [
  {
    question: "How do I calculate my final grade?",
    answer:
      "To calculate your final course grade, multiply your current grade by its weight in the course, then add the product of your final exam score and its weight. The formula is: Final Grade = (Current Grade × Coursework Weight) + (Final Exam Score × Final Exam Weight). For example, if your current grade is 85%, coursework is worth 70%, you scored 90% on the final worth 30%: Final Grade = (85 × 0.70) + (90 × 0.30) = 59.5 + 27 = 86.5%.",
  },
  {
    question: "What do I need on my final exam to get an A?",
    answer:
      "To find the score needed on your final exam to achieve an A (90%), use the formula: Required Final = (Target Grade − (Current Grade × Coursework Weight)) ÷ Final Exam Weight. For example, if your current grade is 86% and the final is worth 30%: Required Final = (90 − (86 × 0.70)) ÷ 0.30 = (90 − 60.2) ÷ 0.30 = 99.3%. You would need a 99.3% on your final exam.",
  },
  {
    question: "Can I fail the final exam and still pass the class?",
    answer:
      "Yes, it is possible to fail the final exam and still pass the class if your current grade is high enough. For example, if your current grade is 85% and the final is worth 20%, even scoring 0% on the final gives you: Final Grade = (85 × 0.80) + (0 × 0.20) = 68%. That is still a passing grade. However, if the final is worth 50% or more, a failed exam significantly risks your overall pass. Use the calculator above to check your specific scenario.",
  },
  {
    question: "How do weighted grades work?",
    answer:
      "Weighted grading means different assessments contribute different percentages to your final course grade. For example, if homework is 10%, quizzes 15%, midterm 20%, projects 25%, and final exam 30% — each score is multiplied by its weight before being summed. A 90% on the final exam (worth 30%) contributes 90 × 0.30 = 27 points to your overall grade, while a 90% on homework (worth 10%) contributes only 9 points.",
  },
  {
    question: "What is a passing grade?",
    answer:
      "A passing grade varies by institution and country. In most US universities and Pakistani degree programmes, a grade of 50% or D is the minimum passing mark for individual courses, though many programmes require a minimum of 60% or C to earn course credit. For Grade Point Average (GPA) purposes, a D (60–69%) often carries a 1.0 GPA value and may not satisfy major or prerequisite requirements even if it technically 'passes'.",
  },
  {
    question: "How much does the final exam affect my overall grade?",
    answer:
      "The impact of your final exam depends entirely on its percentage weight. If the final is worth 20%, a 30-point swing in your exam score (e.g., 60% vs 90%) changes your overall grade by only 6 percentage points. If the final is worth 50%, that same 30-point swing changes your overall grade by 15 points. The heavier the final, the more critical every percentage point on exam day becomes.",
  },
  {
    question: "How do I calculate my semester grade?",
    answer:
      "To calculate your semester grade, identify the weight of each graded component (homework, quizzes, midterm, projects, final exam) and ensure they total 100%. Multiply each component's score by its weight (as a decimal) and sum all results. Example: Homework 10% (score 88), Quizzes 15% (score 82), Midterm 20% (score 79), Projects 25% (score 91), Final 30% (score 85). Semester Grade = (88×0.10) + (82×0.15) + (79×0.20) + (91×0.25) + (85×0.30) = 8.8 + 12.3 + 15.8 + 22.75 + 25.5 = 85.15%.",
  },
  {
    question: "What grade do I need on my final if I have an 89?",
    answer:
      "It depends on the final exam weight and your target grade. If you have an 89% currently and the final is worth 30%, and you want a 90% (A): Required Final = (90 − (89 × 0.70)) ÷ 0.30 = (90 − 62.3) ÷ 0.30 = 92.3%. You need at least 92.3% on the final to achieve an A. If you only want to maintain a B (80%), Required Final = (80 − 62.3) ÷ 0.30 = 59%. You could score as low as 59% on the final and still keep your B.",
  },
  {
    question: "What is the difference between weighted and unweighted grades?",
    answer:
      "Unweighted grades treat every assignment equally — your final grade is the simple average of all scores. Weighted grades assign different importance (percentage weight) to different assessment types. Most university and college courses use weighted grading because a final exam should carry more impact than a single homework assignment. Our calculator handles weighted grading automatically.",
  },
  {
    question: "What if I need more than 100% on my final exam?",
    answer:
      "If the calculator shows you need more than 100% on your final exam, it means achieving your target grade is mathematically impossible given your current grade and the remaining weight. In this case, you should consider whether you can still pass with a lower target (e.g., aim for a B instead of an A), speak to your professor about extra credit opportunities, or focus on other remaining assignments that may still be gradeable before the final.",
  },
];

export const metadata: Metadata = {
  title: "Final Grade Calculator – What Score Do You Need on Your Final Exam?",
  description:
    "Use our free final grade calculator to find the exam score you need to reach your target course grade. Includes weighted grade formula, common grade scenarios, letter grade chart, and grading systems for Pakistan, US, and UK.",

  keywords: [
    "final grade calculator",
    "what do i need on my final exam",
    "final exam score calculator",
    "grade needed on final",
    "weighted grade calculator",
    "course grade calculator",
    "exam grade calculator",
    "how to calculate final grade",
    "semester grade calculator",
    "grade calculator pakistan",
    "lizocalc final grade tool",
  ],

  alternates: {
    canonical:
      "https://www.lizocalc.com/calculators/education/final-grade-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Final Grade Calculator – Find the Exam Score You Need | LizoCalc",
    description:
      "Calculate the exact score you need on your final exam to hit your target course grade. Includes weighted grade formula, scenario tables, and letter grade charts.",
    url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Final Grade Calculator – What Score Do You Need on Your Final?",
    description:
      "Enter your current grade, final exam weight, and target grade to instantly find the score you need on your final exam.",
  },
};

export default function FinalGradePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT === */}
      <Script
        id="structured-data-final-grade-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              /* ── 1. BREADCRUMB ── */
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/education/final-grade-calculator#breadcrumb",
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
                    name: "Final Grade Calculator",
                    item: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T author) ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and academic tool maker behind LizoCalc.",
                knowsAbout: [
                  "Grade Calculation",
                  "Weighted Grading",
                  "Academic Tools",
                  "Web Development",
                  "Mechatronics",
                ],
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 3. ORGANIZATION ── */
              {
                "@type": "Organization",
                "@id": "https://www.lizocalc.com/#org",
                name: "LizoCalc",
                url: "https://www.lizocalc.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.lizocalc.com/logo.png",
                },
                foundingDate: "2026",
                founder: { "@id": "https://www.lizocalc.com/#author" },
                sameAs: [
                  "https://github.com/abdullah-zuzu6",
                  "https://www.linkedin.com/in/abdullahsajjad06/",
                ],
              },

              /* ── 4. WEBSITE ── */
              {
                "@type": "WebSite",
                "@id": "https://www.lizocalc.com/#website",
                url: "https://www.lizocalc.com",
                name: "LizoCalc",
                publisher: { "@id": "https://www.lizocalc.com/#org" },
              },

              /* ── 5. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                name: "Final Grade Calculator – What Score Do You Need on Your Final Exam?",
                description:
                  "Use our free final grade calculator to find the exact exam score needed to reach your target course grade. Includes weighted grade formula, common scenarios, and letter grade charts.",
                inLanguage: "en",
                datePublished: "2026-05-01",
                dateModified: "2026-05-01",
                about: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator#app",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator#app",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp#image",
                },
                author: { "@id": "https://www.lizocalc.com/#author" },
                publisher: { "@id": "https://www.lizocalc.com/#org" },
                isPartOf: { "@id": "https://www.lizocalc.com/#website" },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator#breadcrumb",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/education/final-grade-calculator#app",
                name: "Final Grade Calculator",
                url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                description:
                  "Free final grade calculator to determine the exact exam score needed to achieve a target course grade using weighted grading formulas.",
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                },
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp#image",
                },
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Grade Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-05-01",
                dateModified: "2026-05-01",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate required final exam score for any target grade",
                  "Weighted grade formula (current grade + final exam weight)",
                  "Instant results with no button press needed",
                  "Pass/fail scenario analysis",
                  "Supports any course grading breakdown",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: { "@id": "https://www.lizocalc.com/#org" },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/education/final-grade-calculator#howto",
                name: "How to Calculate What You Need on Your Final Exam",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp#image",
                },
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator",
                },
                description:
                  "Step-by-step guide to calculating your required final exam score using the LizoCalc Final Grade Calculator",
                totalTime: "PT1M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Enter your current grade",
                    text: "Type your current course grade as a percentage (e.g., 85%). This is your grade before the final exam.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter your final exam weight",
                    text: "Enter the percentage weight of your final exam in the course (e.g., 30 for 30%). Check your course syllabus for this number.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter your target grade",
                    text: "Enter the final course grade you want to achieve (e.g., 90 for an A). This is your goal, not your current grade.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read your required exam score instantly",
                    text: "The calculator instantly shows the minimum score you need on your final exam, your letter grade projection, and whether your goal is achievable.",
                  },
                ],
              },

              /* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/education/final-grade-calculator#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/final-grade-calculator",
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

              /* ── 9. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp#image",
                url: "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp",
                name: "Academic Coursework Percentage Breakdown — Total Grade Composition Chart",
                caption:
                  "Weighted grade composition donut chart showing: Final Exam 30%, Major Assignments & Projects 25%, Midterm Exam 20%, Quizzes 15%, and Homework & Exercises 10% — based on an example undergraduate syllabus.",
                description:
                  "A visual breakdown of a typical weighted course grade structure showing how final exams, midterms, projects, quizzes, and homework each contribute a specific percentage to the total course grade of 100%.",
                width: 1200,
                height: 750,
                contentUrl:
                  "https://www.lizocalc.com/images/education/weighted-final-grade-breakdown.webp",
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
              Final Grade Calculator – Calculate What Score You Need on Your
              Final Exam
            </h1>
          </div>
          <p className="text-gray-300 mt-3 text-lg">
            Find your current grade, final exam weight, and required score to
            reach your target course grade — instantly.
          </p>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <FinalGradeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">

        {/* ── DIRECT ANSWER BOX (AI Overview trigger) ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Find What You Need on Your Final Exam
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To calculate the score needed on your final exam, subtract your
            current weighted grade contribution from your target grade, then
            divide by the final exam percentage weight:{" "}
            <strong>
              Required Final = (Target Grade − (Current Grade × Coursework
              Weight)) ÷ Final Exam Weight
            </strong>
            . Example: Current grade 86%, final worth 30%, target 90% →
            Required Final = (90 − (86 × 0.70)) ÷ 0.30 ={" "}
            <strong>99.3%</strong>.
          </p>
        </div>

        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Final Grade Calculator</strong> — also called an exam
          score calculator, <strong>course grade calculator</strong>, grade
          predictor, or{" "}
          <strong>what do I need on my final exam calculator</strong> — is one
          of the most searched academic tools during exam season. Whether you
          are a university student in Lahore trying to secure an A, a college
          student in Karachi protecting a scholarship GPA, or a high school
          student in Sahiwal making sure you pass — knowing the exact score you
          need on your final exam removes uncertainty and lets you study
          strategically, not blindly.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-login-required{" "}
          <strong>final grade calculator</strong> handles all weighted grading
          scenarios instantly. Enter your current grade, your final exam weight
          percentage, and your target course grade — and get your required exam
          score in real time. Mobile-friendly, ad-free, 100% private, and built
          for students across Pakistan and around the world. Use it now at our{" "}
          <Link
            href="/calculators/education/final-grade-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Final Grade Calculator page
          </Link>
          .
        </p>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1 — WHAT IS A FINAL GRADE CALCULATOR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is a Final Grade Calculator?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A <strong>final grade calculator</strong> is an academic tool that
            answers one of the most common student questions before exam season:{" "}
            <em>
              &quot;What score do I need on my final exam to get the grade I
              want?&quot;
            </em>{" "}
            It uses the weighted grading formula built into virtually every
            university, college, and school course to reverse-engineer the
            minimum exam performance required given your existing grade and your
            target outcome.
          </p>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Unlike a simple average calculator, a final grade calculator
            accounts for the <strong>percentage weight</strong> that your final
            exam carries in your overall course grade. In most academic
            institutions — from universities in Islamabad to colleges across the
            US — the final exam is the single largest weighted component,
            typically carrying 25–40% of the total course grade. Getting this
            calculation right is the difference between studying smart and
            studying blind.
          </p>

          {/* Infographic Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center my-10">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/education/weighted-final-grade-breakdown.webp"
                alt="Academic coursework percentage breakdown donut chart showing total grade composition: Final Exam 30%, Major Assignments and Projects 25%, Midterm Exam 20%, Quizzes 15%, Homework and Exercises 10% — based on an example undergraduate syllabus"
                className="w-full object-cover"
                width={1200}
                height={750}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-3">
              <p className="text-gray-200 text-base leading-relaxed">
                The chart above shows a typical undergraduate course grade
                breakdown. Notice that the{" "}
                <strong>final exam alone accounts for 30%</strong> — the single
                largest component — while homework only contributes 10%. This
                means one great exam performance can recover an entire semester
                of mediocre assignment scores, and one poor exam can undo weeks
                of consistent work.
              </p>
              <p className="text-gray-200 text-base leading-relaxed">
                Understanding how each component is weighted is why a{" "}
                <strong>weighted final grade calculator</strong> is far more
                useful than simply averaging your scores. Every percentage
                point you earn is not equal — it depends entirely on which
                component you earned it in.
              </p>
            </div>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base font-medium leading-relaxed">
              <strong>Key insight:</strong> A final grade calculator works in
              two directions. Use it to find the <em>minimum</em> exam score
              needed to reach your target — but also use it to answer{" "}
              <em>&quot;what happens if I score X on the final?&quot;</em> by
              entering your projected exam score as the target and solving
              backwards. Both uses are equally valuable for exam-week planning.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2 — THE FORMULA
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Final Grade Formula — The Exact Equations Explained
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Formula 1: Required Final Exam Score
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            This is the primary formula — it calculates the minimum score you
            need on your final exam to achieve a specific target course grade:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Required Final = (Target Grade − (Current Grade × Coursework
            Weight)) ÷ Final Exam Weight
            <br />
            <br />
            Where:
            <br />
            Target Grade = the overall course grade you want to achieve (%)
            <br />
            Current Grade = your grade before the final exam (%)
            <br />
            Coursework Weight = 1 − Final Exam Weight (as a decimal)
            <br />
            Final Exam Weight = the percentage weight of the final (as a
            decimal)
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Formula 2: Final Course Grade (Weighted Average)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            This formula calculates your actual final course grade when you
            already know your final exam score:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Final Course Grade = (Current Grade × Coursework Weight) + (Final
            Exam Score × Final Exam Weight)
            <br />
            <br />
            Where:
            <br />
            Coursework Weight = 1 − Final Exam Weight (as a decimal)
            <br />
            Final Exam Weight = the decimal form of final exam percentage
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            What Each Variable Means
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Variable</th>
                  <th className="p-4 text-left font-semibold">What It Is</th>
                  <th className="p-4 text-left font-semibold">Where to Find It</th>
                  <th className="p-4 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-green-300">Current Grade</td>
                  <td className="p-4">Your cumulative course grade before the final exam</td>
                  <td className="p-4">Student portal, LMS (Blackboard, Canvas, etc.)</td>
                  <td className="p-4 font-bold text-yellow-300">86%</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">Final Exam Weight</td>
                  <td className="p-4">The percentage of your total grade the final exam is worth</td>
                  <td className="p-4">Course syllabus — usually listed in the grading section</td>
                  <td className="p-4 font-bold text-yellow-300">30% → 0.30</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">Coursework Weight</td>
                  <td className="p-4">Everything except the final exam</td>
                  <td className="p-4">1 minus the final exam weight</td>
                  <td className="p-4 font-bold text-yellow-300">70% → 0.70</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">Target Grade</td>
                  <td className="p-4">The final course grade you want to achieve</td>
                  <td className="p-4">Your personal goal (e.g., 90 for an A)</td>
                  <td className="p-4 font-bold text-yellow-300">90%</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">Required Final</td>
                  <td className="p-4">The minimum exam score you need</td>
                  <td className="p-4">Output of the formula / calculator</td>
                  <td className="p-4 font-bold text-green-400">99.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3 — WORKED EXAMPLES
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Manual Final Grade Examples — Step-by-Step Calculations
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Example 1: What Do I Need on My Final to Get an A?
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Student wants an A (90%)
            <br />
            Current Grade = 86% · Final Exam Weight = 30%
            <br />
            Coursework Weight = 1 − 0.30 = 0.70
            <br />
            <br />
            Required Final = (90 − (86 × 0.70)) ÷ 0.30
            <br />
            = (90 − 60.2) ÷ 0.30
            <br />
            = 29.8 ÷ 0.30
            <br />→ <strong>Required Final = 99.3%</strong>
            <br />
            <br />
            This student needs a 99.3% on the final to achieve an A.
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example 2: Can I Get a B if I Score 70% on the Final?
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Student has 88% currently · Final worth 25% · Scores 70%
            <br />
            Coursework Weight = 1 − 0.25 = 0.75
            <br />
            <br />
            Final Course Grade = (88 × 0.75) + (70 × 0.25)
            <br />
            = 66 + 17.5
            <br />→ <strong>Final Grade = 83.5% — B ✅</strong>
            <br />
            <br />
            Yes, even a 70% on the final is enough to keep a solid B.
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example 3: What If I Need to Just Pass? (60% Target)
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Student has 58% · Final worth 25% · Target = 60%
            <br />
            Coursework Weight = 0.75
            <br />
            <br />
            Required Final = (60 − (58 × 0.75)) ÷ 0.25
            <br />
            = (60 − 43.5) ÷ 0.25
            <br />
            = 16.5 ÷ 0.25
            <br />→ <strong>Required Final = 66%</strong>
            <br />
            <br />
            This student needs a 66% on the final to just pass.
          </div>

          {/* ── COMMON SCENARIOS TABLE ── */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Common Grade Scenarios — Quick Reference Table
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Below are the most-searched final grade calculation scenarios,
            pre-solved using the required final formula. Use this as a reference
            or enter your own numbers in the calculator above:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Current Grade</th>
                  <th className="p-4 text-left font-semibold">Final Weight</th>
                  <th className="p-4 text-left font-semibold">Target Grade</th>
                  <th className="p-4 text-left font-semibold">Required Final</th>
                  <th className="p-4 text-left font-semibold">Achievable?</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">85%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">90%</td>
                  <td className="p-4 font-bold text-red-400">110.0%</td>
                  <td className="p-4 text-red-400">❌ Impossible</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">88%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">90%</td>
                  <td className="p-4 font-bold text-orange-400">94.7%</td>
                  <td className="p-4 text-yellow-300">⚠️ Tough</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">86%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">90%</td>
                  <td className="p-4 font-bold text-orange-400">99.3%</td>
                  <td className="p-4 text-yellow-300">⚠️ Tough</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">80%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">85%</td>
                  <td className="p-4 font-bold text-green-400">96.7%</td>
                  <td className="p-4 text-yellow-300">⚠️ Tough</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">72%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">75%</td>
                  <td className="p-4 font-bold text-green-400">79.5%</td>
                  <td className="p-4 text-green-400">✅ Achievable</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">65%</td>
                  <td className="p-4">35%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4 font-bold text-green-400">79.2%</td>
                  <td className="p-4 text-green-400">✅ Achievable</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">58%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">60%</td>
                  <td className="p-4 font-bold text-green-400">66.0%</td>
                  <td className="p-4 text-green-400">✅ Achievable</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">75%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">80%</td>
                  <td className="p-4 font-bold text-green-400">105.0%</td>
                  <td className="p-4 text-red-400">❌ Impossible</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">92%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">90%</td>
                  <td className="p-4 font-bold text-green-400">83.4%</td>
                  <td className="p-4 text-green-400">✅ Easy</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">50%</td>
                  <td className="p-4">50%</td>
                  <td className="p-4">60%</td>
                  <td className="p-4 font-bold text-green-400">70.0%</td>
                  <td className="p-4 text-green-400">✅ Achievable</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-4">
              What If I Need More Than 100%?
            </h3>
            <p className="text-gray-200 text-base leading-relaxed mb-3">
              When the calculator returns a required final score above 100%, it
              means your target grade is{" "}
              <strong>mathematically impossible</strong> given your current
              grade and the remaining exam weight. What to do:
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Current Grade = 75% · Final Weight = 20% · Target = 90%
              <br />
              Required Final = (90 − (75 × 0.80)) ÷ 0.20 = (90 − 60) ÷ 0.20 =
              150%
              <br />
              <br />
              → This means: even a perfect 100% exam score would only give:
              <br />
              Final Grade = (75 × 0.80) + (100 × 0.20) = 60 + 20 = 80%
              <br />
              <br />→{" "}
              <strong>
                Lower your target to 80% or focus on extra credit opportunities.
              </strong>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4 — GRADE NEEDED TO PASS
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Grade Do I Need to Pass My Class?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Passing a course typically requires a minimum overall grade of 50%
            or 60% depending on the institution. This section answers the most
            common pass-or-fail final exam scenarios — use the calculator above
            for your exact numbers:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Current Grade</th>
                  <th className="p-4 text-left font-semibold">Final Weight</th>
                  <th className="p-4 text-left font-semibold">Pass at 60%</th>
                  <th className="p-4 text-left font-semibold">Pass at 50%</th>
                  <th className="p-4 text-left font-semibold">Risk Level</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">55%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4 font-bold text-orange-400">Need 70.7%</td>
                  <td className="p-4 font-bold text-green-400">Need 53.3%</td>
                  <td className="p-4 text-yellow-300">⚠️ Moderate</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">50%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4 font-bold text-orange-400">Need 90.0%</td>
                  <td className="p-4 font-bold text-green-400">Need 50.0%</td>
                  <td className="p-4 text-red-400">🔴 High</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">45%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4 font-bold text-orange-400">Need 82.5%</td>
                  <td className="p-4 font-bold text-green-400">Need 57.5%</td>
                  <td className="p-4 text-red-400">🔴 High</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">62%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4 font-bold text-green-400">Need 55.5%</td>
                  <td className="p-4 font-bold text-green-400">Need 11.0%</td>
                  <td className="p-4 text-green-400">✅ Low</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">70%</td>
                  <td className="p-4">35%</td>
                  <td className="p-4 font-bold text-green-400">Need 34.3%</td>
                  <td className="p-4 font-bold text-green-400">Already safe</td>
                  <td className="p-4 text-green-400">✅ Safe</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border-l-4 border-blue-500 rounded-r-xl p-5 mb-6">
            <p className="text-gray-200 text-base font-medium leading-relaxed">
              <strong>Pakistan-specific note:</strong> In most Pakistani
              universities (HEC-affiliated), a minimum of 50% overall is
              required to pass a course, with a CGPA of at least 2.0 needed to
              remain in good academic standing. Many degree programmes require a
              minimum of 60% in core subjects. Always check your specific
              institution&apos;s policy — requirements vary between BSCS, BBA,
              MBBS, and engineering programmes.
            </p>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5 — LETTER GRADE TABLE
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Letter Grade Chart — Percentage to Letter Grade Conversion
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Once you know your projected final course grade percentage, use
            the table below to identify your corresponding letter grade and
            GPA value across the three most common grading systems used by
            students on LizoCalc:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Percentage</th>
                  <th className="p-4 text-left font-semibold">Letter Grade</th>
                  <th className="p-4 text-left font-semibold">GPA (4.0 Scale)</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-green-400">97 – 100%</td>
                  <td className="p-4 font-bold text-green-400">A+</td>
                  <td className="p-4 font-bold text-blue-300">4.0</td>
                  <td className="p-4">Outstanding / Perfect</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">93 – 96%</td>
                  <td className="p-4 font-bold text-green-400">A</td>
                  <td className="p-4 font-bold text-blue-300">4.0</td>
                  <td className="p-4">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">90 – 92%</td>
                  <td className="p-4 font-bold text-green-400">A−</td>
                  <td className="p-4 font-bold text-blue-300">3.7</td>
                  <td className="p-4">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">87 – 89%</td>
                  <td className="p-4 font-bold text-blue-300">B+</td>
                  <td className="p-4 font-bold text-blue-300">3.3</td>
                  <td className="p-4">Very Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">83 – 86%</td>
                  <td className="p-4 font-bold text-blue-300">B</td>
                  <td className="p-4 font-bold text-blue-300">3.0</td>
                  <td className="p-4">Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">80 – 82%</td>
                  <td className="p-4 font-bold text-blue-300">B−</td>
                  <td className="p-4 font-bold text-blue-300">2.7</td>
                  <td className="p-4">Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">77 – 79%</td>
                  <td className="p-4 font-bold text-yellow-300">C+</td>
                  <td className="p-4 font-bold text-yellow-300">2.3</td>
                  <td className="p-4">Above Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">73 – 76%</td>
                  <td className="p-4 font-bold text-yellow-300">C</td>
                  <td className="p-4 font-bold text-yellow-300">2.0</td>
                  <td className="p-4">Average / Satisfactory</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">70 – 72%</td>
                  <td className="p-4 font-bold text-yellow-300">C−</td>
                  <td className="p-4 font-bold text-yellow-300">1.7</td>
                  <td className="p-4">Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-400">67 – 69%</td>
                  <td className="p-4 font-bold text-orange-400">D+</td>
                  <td className="p-4 font-bold text-orange-400">1.3</td>
                  <td className="p-4">Below Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-400">60 – 66%</td>
                  <td className="p-4 font-bold text-orange-400">D</td>
                  <td className="p-4 font-bold text-orange-400">1.0</td>
                  <td className="p-4">Passing — Minimum</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-400">Below 60%</td>
                  <td className="p-4 font-bold text-red-400">F</td>
                  <td className="p-4 font-bold text-red-400">0.0</td>
                  <td className="p-4">Failing — No Credit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 6 — GPA IMPACT
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Final Grades Affect Your GPA
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Every course grade you earn contributes to both your{" "}
            <strong>semester GPA</strong> and your{" "}
            <strong>cumulative GPA (CGPA)</strong> — the most important
            academic metric for scholarships, postgraduate admissions, and
            employment in Pakistan and internationally. Understanding the GPA
            impact of each final grade helps you prioritise which exams matter
            most.
          </p>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-8 mb-8">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              GPA Calculation Formula
            </h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Semester GPA = Σ (Grade Points × Credit Hours) ÷ Total Credit
              Hours
              <br />
              <br />
              Example:
              <br />
              Course A: A (4.0) × 3 credit hours = 12.0
              <br />
              Course B: B+ (3.3) × 3 credit hours = 9.9
              <br />
              Course C: C (2.0) × 2 credit hours = 4.0
              <br />
              Total Credits = 8 · Total Points = 25.9
              <br />→ <strong>Semester GPA = 25.9 ÷ 8 = 3.24</strong>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            GPA Impact of Dropping One Letter Grade on the Final
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Scenario</th>
                  <th className="p-4 text-left font-semibold">Course Grade</th>
                  <th className="p-4 text-left font-semibold">Grade Points</th>
                  <th className="p-4 text-left font-semibold">GPA Impact (3 credits)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Nailed the final → A</td>
                  <td className="p-4 font-bold text-green-400">93%+</td>
                  <td className="p-4 font-bold text-green-400">4.0</td>
                  <td className="p-4">+12.0 points</td>
                </tr>
                <tr>
                  <td className="p-4">Missed A by a bit → B+</td>
                  <td className="p-4 font-bold text-blue-300">87–89%</td>
                  <td className="p-4 font-bold text-blue-300">3.3</td>
                  <td className="p-4">+9.9 points (−0.23 vs A)</td>
                </tr>
                <tr>
                  <td className="p-4">Dropped further → B</td>
                  <td className="p-4 font-bold text-blue-300">83–86%</td>
                  <td className="p-4 font-bold text-blue-300">3.0</td>
                  <td className="p-4">+9.0 points (−0.38 vs A)</td>
                </tr>
                <tr>
                  <td className="p-4">Struggled → C</td>
                  <td className="p-4 font-bold text-yellow-300">73–76%</td>
                  <td className="p-4 font-bold text-yellow-300">2.0</td>
                  <td className="p-4">+6.0 points (−0.75 vs A)</td>
                </tr>
                <tr>
                  <td className="p-4">Failed → F</td>
                  <td className="p-4 font-bold text-red-400">Below 60%</td>
                  <td className="p-4 font-bold text-red-400">0.0</td>
                  <td className="p-4 text-red-400">+0 points (−1.5 vs A)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 7 — WEIGHTED VS UNWEIGHTED
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weighted vs Unweighted Grades — Key Differences
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The method your course uses to calculate grades determines which
            formula applies. Most university and college courses use weighted
            grading:
          </p>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-left font-semibold">Weighted Grading</th>
                  <th className="p-4 text-left font-semibold">Unweighted Grading</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold">Definition</td>
                  <td className="p-4">Each assessment type has a different percentage contribution</td>
                  <td className="p-4">Every assignment/test counts equally toward the final average</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Formula</td>
                  <td className="p-4 font-mono text-green-300 text-xs">Σ(Score × Weight) for each category</td>
                  <td className="p-4 font-mono text-green-300 text-xs">Σ(All Scores) ÷ Number of Scores</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Where used</td>
                  <td className="p-4">Universities, colleges, most secondary schools</td>
                  <td className="p-4">Some primary schools, simple courses</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Final exam impact</td>
                  <td className="p-4 font-bold text-yellow-300">High — carries defined % weight (e.g., 30%)</td>
                  <td className="p-4">Equal to every other assessment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Calculator needed?</td>
                  <td className="p-4 font-bold text-green-400">✅ Yes — use our tool above</td>
                  <td className="p-4">Simple average is sufficient</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-4">
              Why Weighted Grading Matters — A Real Comparison
            </h3>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Student scores: Homework 90%, Quiz 70%, Midterm 75%, Final 85%
              <br />
              <br />
              Unweighted average: (90+70+75+85) ÷ 4 = 80.0%
              <br />
              <br />
              Weighted (HW 10%, Quiz 15%, Midterm 20%, Final 30%, Projects 25%
              assumed 80%):
              <br />
              = (90×0.10) + (70×0.15) + (75×0.20) + (80×0.25) + (85×0.30)
              <br />
              = 9 + 10.5 + 15 + 20 + 25.5 = <strong>80.0%</strong>
              <br />
              <br />
              In this case they match — but with different score distributions
              the difference can be significant.
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 8 — GRADING SYSTEMS BY COUNTRY
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Grading Systems Around the World — US, UK, and Pakistan
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            United States Grading System
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The US uses a letter grade system (A through F) mapped to a 4.0 GPA
            scale. Final exams typically carry 20–40% of the course grade.
            Passing is generally 60% (D), though many programmes require a C
            (70%) for credit in major courses:
          </p>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Percentage</th>
                  <th className="p-4 text-left font-semibold">Letter Grade</th>
                  <th className="p-4 text-left font-semibold">GPA Points</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">90 – 100%</td><td className="p-4 font-bold text-green-400">A</td><td className="p-4">4.0</td></tr>
                <tr><td className="p-4">80 – 89%</td><td className="p-4 font-bold text-blue-300">B</td><td className="p-4">3.0</td></tr>
                <tr><td className="p-4">70 – 79%</td><td className="p-4 font-bold text-yellow-300">C</td><td className="p-4">2.0</td></tr>
                <tr><td className="p-4">60 – 69%</td><td className="p-4 font-bold text-orange-400">D</td><td className="p-4">1.0</td></tr>
                <tr><td className="p-4">Below 60%</td><td className="p-4 font-bold text-red-400">F</td><td className="p-4">0.0</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            United Kingdom Grading System (Undergraduate Degree Classes)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            UK universities use degree classification rather than letter grades
            for final awards. Final exams are typically worth 50–80% at UK
            institutions:
          </p>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Percentage</th>
                  <th className="p-4 text-left font-semibold">Classification</th>
                  <th className="p-4 text-left font-semibold">Common Name</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">70%+</td><td className="p-4 font-bold text-green-400">First Class Honours</td><td className="p-4">First / 1st</td></tr>
                <tr><td className="p-4">60 – 69%</td><td className="p-4 font-bold text-blue-300">Upper Second Class</td><td className="p-4">2:1</td></tr>
                <tr><td className="p-4">50 – 59%</td><td className="p-4 font-bold text-yellow-300">Lower Second Class</td><td className="p-4">2:2</td></tr>
                <tr><td className="p-4">40 – 49%</td><td className="p-4 font-bold text-orange-400">Third Class Honours</td><td className="p-4">Third / 3rd</td></tr>
                <tr><td className="p-4">Below 40%</td><td className="p-4 font-bold text-red-400">Fail</td><td className="p-4">No Award</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Pakistan Grading System (HEC Framework)
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Pakistani universities follow the Higher Education Commission (HEC)
            grading framework. Most degree programmes use a 4.0 GPA scale with
            the following percentage-to-grade mapping:
          </p>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Marks / Percentage</th>
                  <th className="p-4 text-left font-semibold">Grade</th>
                  <th className="p-4 text-left font-semibold">GPA Points</th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-semibold text-yellow-300">85 – 100%</td><td className="p-4 font-bold text-green-400">A</td><td className="p-4 font-bold text-green-400">4.0</td><td className="p-4">Excellent</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">80 – 84%</td><td className="p-4 font-bold text-green-400">A−</td><td className="p-4 font-bold text-green-400">3.7</td><td className="p-4">Very Good</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">75 – 79%</td><td className="p-4 font-bold text-blue-300">B+</td><td className="p-4 font-bold text-blue-300">3.3</td><td className="p-4">Good</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">71 – 74%</td><td className="p-4 font-bold text-blue-300">B</td><td className="p-4 font-bold text-blue-300">3.0</td><td className="p-4">Good</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">68 – 70%</td><td className="p-4 font-bold text-blue-300">B−</td><td className="p-4 font-bold text-blue-300">2.7</td><td className="p-4">Above Average</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">64 – 67%</td><td className="p-4 font-bold text-yellow-300">C+</td><td className="p-4 font-bold text-yellow-300">2.3</td><td className="p-4">Average</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">61 – 63%</td><td className="p-4 font-bold text-yellow-300">C</td><td className="p-4 font-bold text-yellow-300">2.0</td><td className="p-4">Satisfactory</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">58 – 60%</td><td className="p-4 font-bold text-yellow-300">C−</td><td className="p-4 font-bold text-yellow-300">1.7</td><td className="p-4">Pass</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">54 – 57%</td><td className="p-4 font-bold text-orange-400">D+</td><td className="p-4 font-bold text-orange-400">1.3</td><td className="p-4">Pass</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">50 – 53%</td><td className="p-4 font-bold text-orange-400">D</td><td className="p-4 font-bold text-orange-400">1.0</td><td className="p-4">Minimum Pass</td></tr>
                <tr><td className="p-4 font-semibold text-yellow-300">Below 50%</td><td className="p-4 font-bold text-red-400">F</td><td className="p-4 font-bold text-red-400">0.0</td><td className="p-4">Fail</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 9 — HOW TO USE THE CALCULATOR
        ══════════════════════════════════════════════════════════ */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Final Grade Calculator — Step-by-Step
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
            <h3 className="text-2xl font-semibold text-blue-300 mb-5">
              Get Your Required Exam Score in Under 30 Seconds
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>
                <strong>Enter your current grade</strong> — type the percentage
                grade you have right now in the course, before the final exam.
                Find this in your student portal, LMS (Canvas, Blackboard,
                Google Classroom), or calculate it from your graded assignments.
              </li>
              <li>
                <strong>Enter your final exam weight</strong> — this is the
                percentage of your total course grade that the final exam is
                worth. Find it in your course syllabus, usually listed under
                &quot;Grading Policy&quot; or &quot;Assessment Breakdown.&quot;
              </li>
              <li>
                <strong>Enter your target grade</strong> — the overall course
                percentage you want to finish with (e.g., 90 for an A, 80 for a
                B, 60 to pass). This is your goal, not your current grade.
              </li>
              <li>
                <strong>Read your result instantly</strong> — the required final
                exam score appears immediately, along with your projected letter
                grade and a pass/fail indicator. No button press needed.
              </li>
              <li>
                <strong>Test different scenarios</strong> — change the target
                grade to see how a lower goal affects the required exam score.
                This helps you decide whether to aim for an A or protect a B.
              </li>
            </ol>
            <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
              Pro tip: If your required score shows as over 100%, your original
              target is out of reach. Simply lower the target grade until you
              find a realistic and achievable goal — then study specifically for
              that score.
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Common Final Exam Score Questions — Answered
          </h3>

          <div className="grid md:grid-cols-2 gap-6 mt-6 mb-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                What do I need on my final if I have an 89?
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-xs overflow-x-auto">
                Final worth 30% · Target A (90%)
                <br />
                = (90 − (89 × 0.70)) ÷ 0.30
                <br />= (90 − 62.3) ÷ 0.30
                <br />→ <strong>Need 92.3%</strong>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                What if the final is worth 40%?
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-xs overflow-x-auto">
                Current 75% · Final worth 40% · Target B (80%)
                <br />
                = (80 − (75 × 0.60)) ÷ 0.40
                <br />= (80 − 45) ÷ 0.40
                <br />→ <strong>Need 87.5%</strong>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                Can I pass if I fail my final?
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-xs overflow-x-auto">
                Current 80% · Final worth 20% · Score 40%
                <br />
                Grade = (80 × 0.80) + (40 × 0.20)
                <br />= 64 + 8
                <br />→ <strong>Final Grade = 72% — Pass ✅</strong>
              </div>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-lg font-bold text-blue-300 mb-3">
                What do I need on my final to get an A if I have a 92?
              </h4>
              <div className="bg-gray-900/70 p-4 rounded-xl font-mono text-green-300 text-xs overflow-x-auto">
                Current 92% · Final worth 25% · Target 90%
                <br />
                = (90 − (92 × 0.75)) ÷ 0.25
                <br />= (90 − 69) ÷ 0.25
                <br />→ <strong>Need 84.0% — Easy ✅</strong>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            SECTION 10 — MORE EDUCATION TOOLS
        ══════════════════════════════════════════════════════════ */}

        {/* ── TRUST / E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 my-12 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
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
            <span>📅 Published: May 01, 2026</span>
            <span>🔄 Updated: May 01, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Education &amp; Academic Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Combine with these other free LizoCalc tools:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                GPA Calculator
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Calculate your semester and cumulative GPA instantly using your
                course grades and credit hours — perfect for scholarship
                eligibility checks.
              </p>
              <Link
                href="/calculators/education/gpa-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open GPA Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Grade Average Calculator
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Calculate the simple or weighted average of all your assignment
                and test scores across an entire semester — great for tracking
                ongoing course performance.
              </p>
              <Link
                href="/calculators/education/grade-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open Grade Calculator →
              </Link>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-2xl border border-gray-700">
              <h4 className="text-xl font-bold text-blue-300 mb-3">
                Percentage Calculator
              </h4>
              <p className="text-gray-200 text-base mb-4">
                Instantly convert marks to percentages, find percentage
                increase or decrease, or calculate what percentage one number
                is of another — all in one place.
              </p>
              <Link
                href="/calculators/math/percentage-calculator"
                className="text-blue-400 hover:underline font-semibold inline-flex items-center"
              >
                Open Percentage Calculator →
              </Link>
            </div>
          </div>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Knowing the exact score you need on your final exam turns exam
            preparation from guesswork into a precise, achievable target. Our
            free Final Grade Calculator is fast, accurate, completely private,
            and built for students in Sahiwal, across Pakistan, and around the
            world. Bookmark it today — and walk into your final exam knowing
            exactly what you need.
          </p>
        </section>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}