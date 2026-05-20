import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import WeightedGradeCalculator from "./clientside";

const faqData = [
  {
    question: "What is a weighted grade calculator?",
    answer:
      "A weighted grade calculator computes your overall course grade by giving each assignment category a specific percentage weight. Instead of treating every assignment equally, it multiplies each score by its category weight (e.g., exams = 40%, homework = 30%, quizzes = 30%), sums those products, and divides by the total weight. This reflects how most real-world academic grading systems actually work.",
  },
  {
    question: "How do I calculate a weighted grade manually?",
    answer:
      "Use this formula: Weighted Grade = Σ(Score × Weight) / ΣWeights. Step 1: Multiply each assignment score by its weight (e.g., 88 × 0.40 = 35.2). Step 2: Repeat for every category. Step 3: Add all results together. Step 4: Divide by the sum of all weights (usually 1.0 or 100%). For example, if exams are 40% (score 88), homework 30% (score 95), and quizzes 30% (score 78): (88×0.4)+(95×0.3)+(78×0.3) = 35.2+28.5+23.4 = 87.1%.",
  },
  {
    question: "What is the difference between weighted and unweighted grades?",
    answer:
      "An unweighted grade treats every assignment equally — your overall grade is a simple average of all scores. A weighted grade assigns different levels of importance to different assignment types. For example, a final exam might count for 40% of your grade while daily homework only counts for 10%. Most college and high school courses use weighted grading because it better reflects mastery of the material.",
  },
  {
    question: "How much does a final exam affect my grade?",
    answer:
      "It depends entirely on the weight assigned by your professor. If your final exam is worth 30% and you currently have an 85% in the course, use this formula: Target Final Grade = (Desired Grade − Current Grade × Current Weight) / Final Exam Weight. For example, to achieve a 90% overall when your current grade is 85% at 70% weight: (90 − 85×0.70) / 0.30 = (90 − 59.5) / 0.30 = 101.7% — meaning it may not be mathematically possible.",
  },
  {
    question: "What grade do I need on my final exam to pass?",
    answer:
      "Use the formula: Required Final Score = (Target Overall Grade − (Current Grade × Pre-Final Weight)) / Final Exam Weight. For example, if your current grade is 72%, your pre-final work is worth 75% of the total grade, and your final exam is worth 25%, to pass with a 70%: Required Final = (70 − 72×0.75) / 0.25 = (70 − 54) / 0.25 = 64%. So you need at least a 64% on your final exam.",
  },
  {
    question:
      "Can I calculate weighted grades with different assignment weights?",
    answer:
      "Yes. Each assignment or category can have its own unique weight. The key rule is that all weights must add up to 100% (or 1.0 in decimal form). If your professor uses points instead of percentages, convert by dividing each assignment's points by the total possible points to get a percentage score first, then apply the weights. Our calculator handles both formats automatically.",
  },
  {
    question:
      "How do I calculate my semester grade with a weighted grading system?",
    answer:
      "List every grade category (homework, quizzes, midterm, final, projects), enter your average score for each, and note the weight percentage for each. Multiply score by weight for each category, then sum all results. For example: Homework 20% (avg 92%) + Quizzes 15% (avg 85%) + Midterm 25% (avg 79%) + Final 30% (avg 88%) + Project 10% (avg 95%) = 18.4+12.75+19.75+26.4+9.5 = 86.8%.",
  },
  {
    question: "What is a weighted average calculator used for in academics?",
    answer:
      "A weighted average calculator in academics helps students determine their true course grade when different assessments carry different importance. It's used for computing semester grades, predicting the impact of upcoming exams, understanding what score is needed to achieve a target grade, and tracking cumulative academic performance across multiple categories of work.",
  },
  {
    question: "How do weighted grades work in college vs high school?",
    answer:
      "In high school, weighted grades often refer to GPA weighting — AP or Honors courses count for more on a 5.0 scale instead of 4.0. In college, weighted grades usually refer to assignment category weights within a course (exams, labs, homework, participation). Our calculator handles the college-style assignment weight calculation. For GPA weighting, see our GPA Calculator.",
  },
  {
    question: "What happens if my assignment weights don't add up to 100%?",
    answer:
      "If your weights don't total 100%, the formula still works — you divide by the sum of actual weights used. For example, if you've only completed assignments worth 70% of the total grade so far, your current weighted grade = Σ(Score × Weight) / 0.70. This gives you your grade based on work completed to date. Our calculator automatically handles partial weight totals so you always get accurate mid-semester tracking.",
  },
];

export const metadata: Metadata = {
  title: "Weighted Grade Calculator | Calculate Your Grade Fast",
  description:
    "Free weighted grade calculator for students and teachers. Enter scores and weights to instantly find your course grade, final exam requirement, and semester GPA.",
  keywords: [
    "weighted grade calculator",
    "weighted average calculator",
    "grade calculator",
    "weighted grading system",
    "calculate weighted grade",
    "final grade calculator",
    "weighted score calculator",
    "grade percentage calculator",
    "semester grade calculator",
    "assignment grade calculator",
    "college weighted grade calculator",
    "weighted GPA calculator",
    "weighted grade calculator with percentages",
    "weighted grade calculator with final exam",
    "what grade do i need on my final",
  ],
  alternates: {
    canonical:
      "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Weighted Grade Calculator | LizoCalc",
    description:
      "Calculate your weighted course grade instantly. Supports any grading system — enter scores, weights, and get your final grade in seconds.",
    url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weighted Grade Calculator — Instant Course Grade",
    description:
      "Enter your assignment scores and weights to find your exact course grade. Free, accurate, works for any school.",
  },
};

export default function WeightedGradePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA === */}
      <Script
        id="structured-data-weighted-grade"
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
                  "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#breadcrumb",
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
                    name: "Weighted Grade Calculator",
                    item: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
                  },
                ],
              },

              /* ── 2. PERSON (E-E-A-T) ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and academic tool maker behind LizoCalc.",
                knowsAbout: [
                  "Academic Grading Systems",
                  "Weighted GPA Calculation",
                  "Educational Tools",
                  "Web Development",
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
                  "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
                url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
                name: "Weighted Grade Calculator — Calculate Your Course Grade Instantly",
                description:
                  "Free weighted grade calculator. Enter your scores and category weights to compute your exact course grade, see the impact of your final exam, and understand your semester standing.",
                inLanguage: "en",
                datePublished: "2026-05-21",
                dateModified: "2026-05-21",
                author: { "@id": "https://www.lizocalc.com/#author" },
                publisher: { "@id": "https://www.lizocalc.com/#org" },
                isPartOf: { "@id": "https://www.lizocalc.com/#website" },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#breadcrumb",
                },
                primaryImageOfPage: {
                  "@id":
                    "https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp#image",
                },
              },

              /* ── 6. SOFTWARE APPLICATION ── */
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#app",
                name: "Weighted Grade Calculator",
                url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
                description:
                  "Free weighted grade calculator to compute your course grade from multiple assignment categories with different percentage weights.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Grade Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                softwareVersion: "1.0",
                datePublished: "2026-05-21",
                dateModified: "2026-05-21",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                featureList: [
                  "Calculate weighted course grade from multiple categories",
                  "Support for percentage and point-based weights",
                  "Final exam requirement calculator",
                  "Works for high school, college, and university grading",
                  "Mobile-friendly, instant results",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                creator: { "@id": "https://www.lizocalc.com/#org" },
                potentialAction: {
                  "@type": "UseAction",
                  target:
                    "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
                },
              },

              /* ── 7. HOWTO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#howto",
                name: "How to Calculate Your Weighted Grade",
                description:
                  "Step-by-step guide to computing a weighted course grade using the LizoCalc Weighted Grade Calculator.",
                totalTime: "PT2M",
                image: {
                  "@id":
                    "https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp#image",
                },
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Add your assignment categories",
                    text: "Click 'Add Category' and enter each grading category your professor uses, such as Homework, Quizzes, Midterm Exam, Final Exam, and Projects.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter your score for each category",
                    text: "Type your current average score (as a percentage, 0–100) for each category you have completed.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Enter the weight for each category",
                    text: "Enter the weight percentage your professor assigns to each category. Make sure all weights add up to 100%.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read your weighted grade instantly",
                    text: "Your overall weighted course grade appears immediately, along with your letter grade and a breakdown by category contribution.",
                  },
                ],
              },

              /* ── 8. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#faq",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },

              /* ── 9. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp#image",
                url: "https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp",
                name: "Weighted Grade Formula Example with Score and Percentage Calculations",
                caption:
                  "Visual breakdown of the weighted grade formula: Weighted Grade = Σ(Score × Weight) / ΣWeights, illustrated with a real example showing homework, quiz, and exam contributions.",
                description:
                  "Infographic showing how weighted grades are calculated, with a worked example table displaying assignment categories, scores, weights, and their individual percentage contributions to the final grade.",
                width: 800,
                height: 500,
                contentUrl:
                  "https://www.lizocalc.com/images/education/weighted-grade-formula-example.webp",
                encodingFormat: "image/webp",
              },
            ],
          }),
        }}
      />

      {/* ── Hero Section ── */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Weighted Grade Calculator: Find Your Exact Course Grade Instantly
          </h1>
        </div>
      </section>

      {/* ── Calculator Tool ── */}
      <section className="px-4 py-8">
        <WeightedGradeCalculator />
      </section>

      {/* ── SEO Article ── */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        {/* ── QUICK ANSWER BOX (AI Overview trigger) ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-10">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Calculate a Weighted Grade
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To calculate a weighted grade, multiply each assignment score by its
            weight, add all results together, then divide by the total weight.
            Formula:{" "}
            <strong>Weighted Grade = Σ(Score × Weight) / ΣWeights</strong>.
            Example: Homework 95% at 30% weight + Midterm 82% at 35% weight +
            Final 88% at 35% weight ={" "}
            <strong>
              (95×0.30) + (82×0.35) + (88×0.35) = 28.5 + 28.7 + 30.8 = 88%
            </strong>
            .
          </p>
        </div>

        {/* ── INTRO ── */}
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>weighted grade calculator</strong> — also called a
          weighted average calculator, grade percentage calculator, or semester
          grade calculator — is the most essential academic tool for students
          who want to know exactly where they stand in any course. Most schools
          and colleges use a <strong>weighted grading system</strong> where
          different types of assignments count for different portions of your
          final grade. A single homework assignment and a final exam are not
          equal — and your grade calculator shouldn't treat them that way.
        </p>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          Whether you're a high school student tracking your semester GPA, a
          college student figuring out what score you need on your final, or a
          teacher building a transparent grading rubric, this guide explains
          everything — the formula, worked examples, comparison tables, and a
          complete step-by-step manual method.
        </p>

        {/* ════════════════════════════════════════
            SECTION 1 — WHAT ARE WEIGHTED GRADES
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Are Weighted Grades? — Weighted Grading System Explained
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A weighted grade is a final course score that accounts for the
            relative importance of each assignment type. In a{" "}
            <strong>weighted grading system</strong>, your professor assigns a
            percentage weight to every category — exams, homework,
            participation, labs, projects — and your performance in each
            category contributes proportionally to your overall grade.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            This is why you can score 100% on every homework assignment but
            still fail a course if you bomb the final exam — the final might be
            worth 40% while homework is only worth 10%.
          </p>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-8">
            <p className="text-white font-semibold text-lg mb-3">
              📌 Key Takeaway: Why Weighted Grades Matter
            </p>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
              <li>
                They reflect the academic importance of each assignment type
              </li>
              <li>
                They prevent low-stakes work from masking poor exam performance
              </li>
              <li>
                They give students a clear roadmap for where to focus effort
              </li>
              <li>
                They are the standard in virtually all college courses worldwide
              </li>
            </ul>
          </div>

          {/* Weighted vs Unweighted Comparison Table */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Weighted vs Unweighted Grades — Key Differences
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Factor</th>
                  <th className="p-4 text-left font-semibold">
                    Unweighted Grade
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Weighted Grade
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold">Calculation method</td>
                  <td className="p-4">Simple average of all scores</td>
                  <td className="p-4 text-green-300">
                    Each category × its assigned weight
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Assignment importance</td>
                  <td className="p-4">All assignments treated equally</td>
                  <td className="p-4 text-green-300">
                    Exams count more than homework
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Accuracy</td>
                  <td className="p-4">Can be misleading</td>
                  <td className="p-4 text-green-300">
                    Reflects actual academic mastery
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Used in</td>
                  <td className="p-4">Some K-8 schools</td>
                  <td className="p-4 text-green-300">
                    Most high schools & all colleges
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Formula</td>
                  <td className="p-4">Σ(Scores) / n</td>
                  <td className="p-4 text-green-300">
                    Σ(Score × Weight) / ΣWeights
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Example result</td>
                  <td className="p-4">95% HW + 60% Exam = 77.5% avg</td>
                  <td className="p-4 text-green-300">
                    95×0.1 + 60×0.4 = 33.5% from those two
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 2 — THE FORMULA
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Weighted Grade Formula — Explained Simply
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            The core <strong>weighted grade formula</strong> is:
          </p>

          <div className="bg-gray-900/70 p-6 rounded-2xl border border-blue-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            <span className="text-blue-400 font-bold">Weighted Grade</span> =
            Σ(Score × Weight) / ΣWeights
            <br />
            <br />
            Where:
            <br />
            &nbsp;&nbsp;Σ = "sum of"
            <br />
            &nbsp;&nbsp;Score = your percentage score in each category (0–100)
            <br />
            &nbsp;&nbsp;Weight = the decimal form of each category's weight
            (e.g., 40% → 0.40)
            <br />
            &nbsp;&nbsp;ΣWeights = total of all weights (should equal 1.0 or
            100%)
          </div>

          {/* Formula image */}
          <div className="rounded-2xl overflow-hidden border border-gray-700 my-8">
            <Image
              src="/images/education/weighted-grade-formula-example.webp"
              alt="Weighted grade formula example with score and percentage calculations"
              className="w-full object-cover"
              width={800}
              height={500}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            If all weights sum to exactly 1.0 (100%), you skip the division step
            — the sum of products is already your weighted grade. If your
            weights don't yet total 100% (mid-semester tracking), divide by the
            partial sum to get your grade so far.
          </p>
        </section>

        {/* ════════════════════════════════════════
            SECTION 3 — STEP BY STEP GUIDE
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Weighted Grades Manually — Step-by-Step Guide
          </h2>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-8">
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>
                <strong>List all grade categories</strong> from your syllabus
                (Homework, Quizzes, Midterm, Final, Labs, Projects, etc.)
              </li>
              <li>
                <strong>Note the weight</strong> assigned to each category
                (e.g., Final Exam = 40%)
              </li>
              <li>
                <strong>Calculate your average score</strong> in each category
                if there are multiple assignments
              </li>
              <li>
                <strong>Convert weights to decimals</strong> (40% → 0.40)
              </li>
              <li>
                <strong>Multiply each score by its weight</strong> (Score ×
                Weight)
              </li>
              <li>
                <strong>Add all products together</strong> — this is your
                weighted grade if weights sum to 1.0
              </li>
              <li>
                <strong>Divide by total weight</strong> if weights don't sum to
                100% (for mid-semester tracking)
              </li>
            </ol>
          </div>

          {/* Worked Example 1 — High School */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Real-World Example 1: High School Course Grade
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A typical high school grading breakdown with five categories:
          </p>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Your Score</th>
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">
                    Contribution (Score × Weight)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Homework</td>
                  <td className="p-4">92%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4 font-bold text-green-400">18.40</td>
                </tr>
                <tr>
                  <td className="p-4">Quizzes</td>
                  <td className="p-4">85%</td>
                  <td className="p-4">15%</td>
                  <td className="p-4 font-bold text-green-400">12.75</td>
                </tr>
                <tr>
                  <td className="p-4">Classwork / Participation</td>
                  <td className="p-4">98%</td>
                  <td className="p-4">10%</td>
                  <td className="p-4 font-bold text-green-400">9.80</td>
                </tr>
                <tr>
                  <td className="p-4">Midterm Exam</td>
                  <td className="p-4">78%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4 font-bold text-green-400">19.50</td>
                </tr>
                <tr>
                  <td className="p-4">Final Exam</td>
                  <td className="p-4">84%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4 font-bold text-green-400">25.20</td>
                </tr>
                <tr className="bg-blue-900/30">
                  <td className="p-4 font-bold text-white" colSpan={2}>
                    Total
                  </td>
                  <td className="p-4 font-bold text-yellow-300">100%</td>
                  <td className="p-4 font-bold text-yellow-300 text-base">
                    85.65% → B
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Worked Example 2 — College */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Real-World Example 2: College Course with Lab Component
          </h3>
          <div className="overflow-x-auto mt-4 mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Your Score</th>
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">Contribution</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Online Homework</td>
                  <td className="p-4">96%</td>
                  <td className="p-4">15%</td>
                  <td className="p-4 font-bold text-green-400">14.40</td>
                </tr>
                <tr>
                  <td className="p-4">Lab Reports</td>
                  <td className="p-4">88%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4 font-bold text-green-400">17.60</td>
                </tr>
                <tr>
                  <td className="p-4">Midterm 1</td>
                  <td className="p-4">74%</td>
                  <td className="p-4">15%</td>
                  <td className="p-4 font-bold text-green-400">11.10</td>
                </tr>
                <tr>
                  <td className="p-4">Midterm 2</td>
                  <td className="p-4">81%</td>
                  <td className="p-4">15%</td>
                  <td className="p-4 font-bold text-green-400">12.15</td>
                </tr>
                <tr>
                  <td className="p-4">Research Project</td>
                  <td className="p-4">91%</td>
                  <td className="p-4">10%</td>
                  <td className="p-4 font-bold text-green-400">9.10</td>
                </tr>
                <tr>
                  <td className="p-4">Final Exam</td>
                  <td className="p-4">79%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4 font-bold text-green-400">19.75</td>
                </tr>
                <tr className="bg-blue-900/30">
                  <td className="p-4 font-bold text-white" colSpan={2}>
                    Total
                  </td>
                  <td className="p-4 font-bold text-yellow-300">100%</td>
                  <td className="p-4 font-bold text-yellow-300 text-base">
                    84.10% → B
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 4 — FINAL EXAM CALCULATOR
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Grade Do I Need on My Final Exam?
          </h2>

          <p className="text-gray-200 text-base leading-relaxed mb-4">
            This is the most common question students have before finals week.
            The <strong>final exam grade calculator</strong> formula is:
          </p>

          <div className="bg-gray-900/70 p-6 rounded-2xl border border-blue-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            Required Final Score = (Target Grade − Current Grade × Pre-Final
            Weight) / Final Exam Weight
            <br />
            <br />
            Example:
            <br />
            &nbsp;&nbsp;Current grade: 80% | Pre-final weight: 70% | Final
            weight: 30% | Target: 85%
            <br />
            &nbsp;&nbsp;= (85 − 80 × 0.70) / 0.30
            <br />
            &nbsp;&nbsp;= (85 − 56) / 0.30
            <br />
            &nbsp;&nbsp;= 29 / 0.30
            <br />
            &nbsp;&nbsp;= <strong>96.7%</strong> needed on final
          </div>

          {/* Final Exam Impact Table */}
          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Final Exam Impact Examples — How Much Is My Final Worth?
          </h3>
          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Current Grade</th>
                  <th className="p-4 text-left font-semibold">
                    Pre-Final Weight
                  </th>
                  <th className="p-4 text-left font-semibold">Final Weight</th>
                  <th className="p-4 text-left font-semibold">Target</th>
                  <th className="p-4 text-left font-semibold">
                    Score Needed on Final
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">85%</td>
                  <td className="p-4">75%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">90% (A)</td>
                  <td className="p-4 font-bold text-yellow-300">105% ❌</td>
                </tr>
                <tr>
                  <td className="p-4">80%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">85% (B+)</td>
                  <td className="p-4 font-bold text-green-400">96.7% ✅</td>
                </tr>
                <tr>
                  <td className="p-4">72%</td>
                  <td className="p-4">75%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-green-400">64.0% ✅</td>
                </tr>
                <tr>
                  <td className="p-4">65%</td>
                  <td className="p-4">60%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-green-400">77.5% ✅</td>
                </tr>
                <tr>
                  <td className="p-4">90%</td>
                  <td className="p-4">80%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">93% (A)</td>
                  <td className="p-4 font-bold text-green-400">87.0% ✅</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400">55%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-red-400">101.7% ❌</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
            <p className="text-white font-semibold mb-2">
              📌 Key Takeaway: Final Exam Reality Check
            </p>
            <p className="text-gray-200 text-base">
              If the required score exceeds 100%, your target grade is
              mathematically impossible regardless of how well you do on the
              final. Use our calculator above to check your situation early —
              not the night before.
            </p>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 5 — COMMON MISTAKES
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes Students Make with Weighted Grades
          </h2>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Mistake</th>
                  <th className="p-4 text-left font-semibold">
                    Why It's Wrong
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Correct Approach
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Averaging all scores equally
                  </td>
                  <td className="p-4">
                    Ignores the weight each category carries
                  </td>
                  <td className="p-4 text-green-300">
                    Multiply each score by its weight first
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Weights not summing to 100%
                  </td>
                  <td className="p-4">
                    Missing categories give a falsely inflated grade
                  </td>
                  <td className="p-4 text-green-300">
                    Always verify your total weight = 100%
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Using points instead of percentages
                  </td>
                  <td className="p-4">
                    Raw points aren't comparable across categories
                  </td>
                  <td className="p-4 text-green-300">
                    Convert to % first: (earned / possible) × 100
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Forgetting incomplete categories
                  </td>
                  <td className="p-4">
                    Mid-semester grades are partial — weights don't total 100%
                  </td>
                  <td className="p-4 text-green-300">
                    Divide by completed weight only, not 1.0
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">
                    Ignoring the final exam weight
                  </td>
                  <td className="p-4">A 40% final can drop an A to a C</td>
                  <td className="p-4 text-green-300">
                    Calculate required final score before exam week
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 6 — GRADE SCALE REFERENCE
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Grade Scale Reference — Percentage to Letter Grade
          </h2>

          <div className="overflow-x-auto mt-4 mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">
                    Percentage Range
                  </th>
                  <th className="p-4 text-left font-semibold">Letter Grade</th>
                  <th className="p-4 text-left font-semibold">
                    GPA (4.0 Scale)
                  </th>
                  <th className="p-4 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-green-400">93–100%</td>
                  <td className="p-4 font-bold text-green-400">A</td>
                  <td className="p-4">4.0</td>
                  <td className="p-4">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-300">90–92%</td>
                  <td className="p-4 font-bold text-green-300">A−</td>
                  <td className="p-4">3.7</td>
                  <td className="p-4">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">87–89%</td>
                  <td className="p-4 font-bold text-blue-300">B+</td>
                  <td className="p-4">3.3</td>
                  <td className="p-4">Above Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">83–86%</td>
                  <td className="p-4 font-bold text-blue-300">B</td>
                  <td className="p-4">3.0</td>
                  <td className="p-4">Above Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-200">80–82%</td>
                  <td className="p-4 font-bold text-blue-200">B−</td>
                  <td className="p-4">2.7</td>
                  <td className="p-4">Above Average</td>
                </tr>
                <tr>
                  <td className="p-4">77–79%</td>
                  <td className="p-4">C+</td>
                  <td className="p-4">2.3</td>
                  <td className="p-4">Average</td>
                </tr>
                <tr>
                  <td className="p-4">73–76%</td>
                  <td className="p-4">C</td>
                  <td className="p-4">2.0</td>
                  <td className="p-4">Average</td>
                </tr>
                <tr>
                  <td className="p-4">70–72%</td>
                  <td className="p-4">C−</td>
                  <td className="p-4">1.7</td>
                  <td className="p-4">Average</td>
                </tr>
                <tr>
                  <td className="p-4 text-yellow-400">60–69%</td>
                  <td className="p-4 text-yellow-400">D</td>
                  <td className="p-4">1.0</td>
                  <td className="p-4">Below Average</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400">Below 60%</td>
                  <td className="p-4 text-red-400">F</td>
                  <td className="p-4">0.0</td>
                  <td className="p-4">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 7 — VOICE SEARCH / QUICK ANSWERS
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Voice Search Quick Answers — Common Student Questions
          </h2>

          <div className="space-y-4 mb-10">
            {[
              {
                q: "How do weighted grades work?",
                a: "Weighted grades assign each assignment type a percentage weight. Your score in each category is multiplied by its weight, and all results are summed. Categories worth more (like exams) impact your grade more than low-weight ones (like participation).",
              },
              {
                q: "What is the weighted grade formula?",
                a: "Weighted Grade = Σ(Score × Weight) / ΣWeights. Multiply each category score by its decimal weight, add all products, then divide by total weight (usually 1.0).",
              },
              {
                q: "How much does my final exam affect my grade?",
                a: "It depends on its assigned weight. A 25% final can shift your grade by up to 25 percentage points. Use the formula: Impact = (Final Exam Score − Current Grade) × Final Weight.",
              },
              {
                q: "What grade do I need on my final to pass?",
                a: "Required Final Score = (Target Grade − Current Grade × Pre-Final Weight) / Final Exam Weight. For example, needing a 70% with 65% current grade, 75% pre-final weight, 25% final weight: (70 − 65×0.75) / 0.25 = 85%.",
              },
              {
                q: "Is a 85% a B or a B+?",
                a: "On the standard US grading scale, 85% is a B (83–86%). Some schools with plus/minus grading count 85% as a B, while others may consider it B+. Check your school's specific grade cutoffs.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-800/50 p-5 rounded-xl border border-gray-700"
              >
                <p className="text-blue-300 font-semibold mb-2">🎙 {item.q}</p>
                <p className="text-gray-200 text-base">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            SECTION 8 — INTERNAL LINKS / MORE TOOLS
        ════════════════════════════════════════ */}
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Academic & Grade Calculators
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Pair this weighted grade calculator with our other free academic
            tools:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/education/gpa-calculator"
                className="text-blue-400 hover:underline"
              >
                GPA Calculator
              </Link>{" "}
              — Convert letter grades to a 4.0 GPA scale across all semesters
            </li>
            <li>
              <Link
                href="/calculators/math/percentage-calculator"
                className="text-blue-400 hover:underline"
              >
                Percentage Calculator
              </Link>{" "}
              — Convert raw scores to percentage grades instantly
            </li>
          </ul>
        </section>

        {/* ── E-E-A-T BYLINE ── */}
        <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs">
              MERN Stack Developer & Tool Maker · Mechatronics & Control
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
            <span>🔄 Updated: May 21, 2026</span>
            <span>✅ Formula verified</span>
          </div>
        </div>

        <p className="text-gray-300 italic text-center mt-8 text-lg font-medium leading-relaxed">
          Your grade is more than a number — it's the product of every
          assignment you've put effort into, weighted by what your professor
          values most. Use LizoCalc's Weighted Grade Calculator to stay ahead,
          plan smart, and walk into finals week with confidence.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}
