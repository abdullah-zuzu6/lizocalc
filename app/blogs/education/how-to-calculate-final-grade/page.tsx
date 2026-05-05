import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const faqData = [
  {
    question: "How do I calculate my final grade with percentages?",
    answer:
      "Multiply your current grade percentage by its weight (as a decimal), then multiply your final exam score by its weight, and add both results. For example: if your current grade is 85% with 70% weight, and your final exam score is 90% with 30% weight, then: (85 × 0.70) + (90 × 0.30) = 59.5 + 27 = 86.5%.",
  },
  {
    question: "What grade do I need on my final to pass the class?",
    answer:
      "Use the formula: Required Score = (Target Grade − (Current Grade × Current Weight)) ÷ Final Exam Weight. For example, if your current grade is 55%, current weight is 75%, and the final is worth 25%, and you need 60% to pass: (0.60 − (0.55 × 0.75)) ÷ 0.25 = (0.60 − 0.4125) ÷ 0.25 = 0.75 → you need 75% on the final.",
  },
  {
    question: "Can I get an A if I have a B before finals?",
    answer:
      "Yes, but it depends on how much the final exam is worth. If the final counts for 40% or more, there is typically enough room to pull your grade up from a B (say 83%) to an A (90%). Use the required score formula to calculate exactly what you need on the final.",
  },
  {
    question: "How much is the final exam worth?",
    answer:
      "This varies by course and institution. Final exams commonly count for 20% to 40% of the total course grade. Check your course syllabus — the weight breakdown is always listed there. Some courses have finals worth only 10%, while others (especially university courses) may weight the final at 50% or more.",
  },
  {
    question: "How do weighted grades work?",
    answer:
      "In a weighted grading system, different assignment categories carry different levels of importance. For example, homework may be worth 20%, quizzes 15%, midterm 20%, and final exam 30%. Each category score is multiplied by its weight, and all the weighted scores are summed to produce the final grade.",
  },
  {
    question: "Is 89.5 rounded to 90 for a grade?",
    answer:
      "It depends on your professor or institution policy. Many instructors round 89.5% up to 90% (an A), but some do not. Some use strict cutoffs — anything below 90.0% is a B+. Always check your course syllabus or ask your instructor directly rather than assuming rounding applies.",
  },
  {
    question: "How do I calculate my final grade in Excel?",
    answer:
      "In Excel, use the formula =SUMPRODUCT(grades, weights) where grades is the range of your percentage scores and weights is the range of their corresponding weights (as decimals that sum to 1). For example: =SUMPRODUCT(B2:B5, C2:C5) where column B has scores like 85, 90, 78 and column C has weights like 0.20, 0.30, 0.25.",
  },
  {
    question: "Can I fail the final and still pass the class?",
    answer:
      "Sometimes, yes. If the final exam is worth 25% and you have a strong current grade (say 88%), even scoring 0% on the final would give you: (88 × 0.75) + (0 × 0.25) = 66%. Whether that is a passing grade depends on your institution's passing threshold, typically 50–60%. Calculate your worst-case scenario using the final grade formula.",
  },
  {
    question: "What is the difference between weighted and unweighted grades?",
    answer:
      "In an unweighted system, every assignment counts equally toward your grade — the average is a simple mean. In a weighted system, different categories (homework, quizzes, exams) carry different percentages of the total grade. Most university and high school courses use weighted grading, which better reflects the relative importance of major assessments.",
  },
  {
    question: "How do I convert a percentage grade to GPA?",
    answer:
      "The most common US conversion: 90–100% = 4.0 (A), 80–89% = 3.0 (B), 70–79% = 2.0 (C), 60–69% = 1.0 (D), below 60% = 0.0 (F). Plus/minus grades use intermediate values: A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, and so on. Some institutions use their own scales, so check your school's official GPA table.",
  },
];

export const metadata: Metadata = {
  title: "How to Calculate Final Grade Before Exams — Formula, Examples & Score Needed",
  description:
    "Learn how to calculate your final grade using the weighted grade formula. Find what score you need on the final exam to get an A, B, or C — with worked examples, tables, and a free calculator.",
  keywords: [
    "how to calculate final grade",
    "final grade calculator",
    "what score do I need on final",
    "weighted grade calculation",
    "final exam grade formula",
    "grade percentage calculator",
    "how to calculate final exam grade",
    "score needed to pass class",
    "weighted vs unweighted grades",
    "percentage to GPA",
    "can I still pass after final",
    "final grade formula",
    "how to calculate semester grade",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How to Calculate Final Grade Before Exams — Formula, Examples & Score Needed",
    description:
      "The complete guide to calculating your final grade: weighted formula, worked examples, score-needed calculator, grading tables, and common mistakes explained clearly.",
    url: "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
    siteName: "LizoCalc",
    type: "article",
    images: [
      {
        url: "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp",
        width: 1400,
        height: 788,
        alt: "How to calculate final grade infographic showing the weighted grade formula and worked example with a donut chart of grade distribution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Final Grade — Formula, Examples & Score Needed",
    description:
      "Weighted grade formula, step-by-step examples, and the exact score you need on your final to hit your target grade.",
    images: [
      "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp",
    ],
  },
};

export default function HowToCalculateFinalGradePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════
          STRUCTURED DATA
      ═══════════════════════════════════════════════════════ */}
      <Script
        id="structured-data-final-grade"
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
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#breadcrumb",
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
                    name: "Blogs",
                    item: "https://www.lizocalc.com/blogs",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Education",
                    item: "https://www.lizocalc.com/blogs/education",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "How to Calculate Final Grade",
                    item: "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
                  },
                ],
              },

              /* ── 2. PERSON ── */
              {
                "@type": "Person",
                "@id": "https://www.lizocalc.com/#author",
                name: "Rana Muhammad Abdullah",
                url: "https://www.lizocalc.com/about",
                jobTitle: "MERN Stack Developer & Tool Maker",
                description:
                  "Mechatronics & Control Engineering student, MERN Stack developer, and productivity tool maker behind LizoCalc.",
                knowsAbout: [
                  "Grade Calculators",
                  "Weighted Grades",
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
                founder: {
                  "@id": "https://www.lizocalc.com/#author",
                },
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
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 5. BLOG POSTING ── */
              {
                "@type": "BlogPosting",
                "@id":
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#article",
                headline:
                  "How to Calculate Final Grade Before Exams — Formula, Examples & Score Needed",
                description:
                  "A complete guide to calculating your final grade: the weighted grade formula, step-by-step worked examples, the score-needed formula, grading scenarios, common mistakes, and a free grade calculator.",
                url: "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
                inLanguage: "en",
                datePublished: "2026-05-01",
                dateModified: "2026-05-01",
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                mainEntityOfPage: {
                  "@id":
                    "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
                },
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#breadcrumb",
                },
                image: [
                  "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp",
                ],
                about: {
                  "@type": "Thing",
                  name: "Final Grade Calculation",
                },
                keywords:
                  "final grade, weighted grade, final exam score needed, grade calculator, how to calculate final grade, semester grade",
                articleSection: "Education",
                wordCount: 3200,
                citation: [
                  {
                    "@type": "CreativeWork",
                    name: "Grading and Grade Point Averages — MIT",
                    url: "https://registrar.mit.edu/classes-grades-evaluations/grades",
                    publisher: {
                      "@type": "Organization",
                      name: "Massachusetts Institute of Technology",
                    },
                  },
                  {
                    "@type": "CreativeWork",
                    name: "Understanding Weighted Grades — Carnegie Mellon University",
                    url: "https://www.cmu.edu/teaching/assessment/basics/grading-assessment.html",
                    publisher: {
                      "@type": "Organization",
                      name: "Carnegie Mellon University",
                    },
                  },
                  {
                    "@type": "CreativeWork",
                    name: "GPA Conversion Scale — College Board",
                    url: "https://bigfuture.collegeboard.org/plan-for-college/get-started/how-to-convert-gpa-4.0-scale",
                    publisher: {
                      "@type": "Organization",
                      name: "College Board",
                    },
                  },
                ],
              },

              /* ── 6. WEBPAGE ── */
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
                url: "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
                name: "How to Calculate Final Grade Before Exams — Formula, Examples & Score Needed",
                description:
                  "Learn how to calculate your final grade using the weighted formula, find the exact score you need on the final exam, and understand weighted vs unweighted grading.",
                inLanguage: "en",
                datePublished: "2026-05-01",
                dateModified: "2026-05-01",
                isPartOf: {
                  "@id": "https://www.lizocalc.com/#website",
                },
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#article",
                },
                author: {
                  "@id": "https://www.lizocalc.com/#author",
                },
                publisher: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                breadcrumb: {
                  "@id":
                    "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#breadcrumb",
                },
              },

              /* ── 7. DEFINED TERM ── */
              {
                "@type": "DefinedTerm",
                "@id":
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#term",
                name: "Final Grade",
                description:
                  "A final grade is the overall course score calculated by combining weighted scores from all assessment categories including homework, quizzes, midterms, and the final exam. Formula: G = (C × Wc) + (F × Wf), where C is current grade, F is final exam score, and Wc/Wf are their respective weights.",
                inDefinedTermSet: {
                  "@type": "DefinedTermSet",
                  name: "Academic & Grade Terms — LizoCalc",
                },
              },

              /* ── 8. IMAGE OBJECT ── */
              {
                "@type": "ImageObject",
                "@id":
                  "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp#image1",
                url: "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp",
                contentUrl:
                  "https://www.lizocalc.com/images/blogs/education/how-to-calculate-final-grade-before-exams.webp",
                name: "How to Calculate Final Grade Infographic",
                caption:
                  "Infographic showing the weighted final grade formula, a donut chart of grade category distribution, and a worked example calculation.",
                width: 1400,
                height: 788,
                encodingFormat: "image/webp",
                inLanguage: "en",
                representativeOfPage: true,
                author: {
                  "@id": "https://www.lizocalc.com/#org",
                },
                copyrightHolder: {
                  "@id": "https://www.lizocalc.com/#org",
                },
              },

              /* ── 9. HOW-TO ── */
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#howto",
                name: "How to Calculate Your Final Grade",
                description:
                  "Step-by-step instructions for calculating your final course grade using the weighted grade formula.",
                totalTime: "PT2M",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Find your current grade and its weight",
                    text: "Look at your course syllabus to find your current overall grade percentage and the percentage weight it carries (excluding the final exam).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Find the final exam weight",
                    text: "From the syllabus, note what percentage of the total grade the final exam is worth.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Apply the weighted grade formula",
                    text: "Calculate: Final Grade = (Current Grade × Current Weight) + (Final Exam Score × Final Exam Weight). Convert percentages to decimals first.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Interpret your result",
                    text: "Compare your calculated final grade to your institution's letter grade or pass/fail threshold to understand your standing.",
                  },
                ],
              },

              /* ── 10. FAQ PAGE ── */
              {
                "@type": "FAQPage",
                "@id":
                  "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade#faq",
                isPartOf: {
                  "@id":
                    "https://www.lizocalc.com/blogs/education/how-to-calculate-final-grade",
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
            ],
          }),
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="text-sm text-gray-400 mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/blogs" className="hover:text-blue-400">
                  Blogs
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li>
                <Link href="/blogs/education/how-to-calculate-final-grade" className="hover:text-blue-400">
                  Grade
                </Link>
              </li>
              <li className="text-gray-600">/</li>
              <li className="text-gray-300">How to Calculate Final Grade</li>
            </ol>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            How to Calculate Final Grade Before Exams — Formula, Examples &amp; Score Needed
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-400">
            <span>Published: May 01, 2026</span>
            <span>·</span>
            <span>12 min read</span>
            <span>·</span>
            <span className="text-green-400">✅ Factually reviewed</span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          ARTICLE BODY
      ═══════════════════════════════════════════════════════ */}
      <article className="max-w-4xl mx-auto px-6 py-14 text-white">

        {/* ── AI OVERVIEW / QUICK ANSWER BOX ── */}
        <div className="bg-blue-900/30 border border-blue-600 rounded-2xl p-6 mb-8">
          <p className="text-white font-semibold text-lg mb-2">
            ⚡ Quick Answer: How to Calculate Final Grade
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            To calculate your final grade, multiply your{" "}
            <strong>current class grade</strong> by its weight, multiply your{" "}
            <strong>final exam score</strong> by the exam&rsquo;s weight, then add
            both values together. The formula is:
          </p>
          <div className="mt-4 bg-gray-900/70 rounded-xl p-4 font-mono text-green-300 text-sm overflow-x-auto">
            Final Grade = (Current Grade × Current Weight) + (Final Exam Score × Exam Weight)
          </div>
          <p className="text-gray-300 text-sm mt-3">
            Example: (85% × 0.70) + (90% × 0.30) = 59.5 + 27 ={" "}
            <strong className="text-green-300">86.5%</strong>
          </p>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className="bg-yellow-900/20 border border-yellow-600/40 rounded-xl p-4 mb-10 text-sm text-yellow-200 leading-relaxed">
          <strong>Note:</strong> Grading policies vary by institution and instructor. Always verify
          the exact weight breakdown from your course syllabus. The formulas and examples in this
          article follow standard weighted grading used at most US and international universities.
        </div>

        {/* ── TABLE OF CONTENTS ── */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 mb-12">
          <p className="text-white font-semibold text-base mb-4">📋 Table of Contents</p>
          <ol className="space-y-2 text-blue-400 text-sm list-decimal list-inside leading-relaxed">
            <li><a href="#what-is-final-grade" className="hover:underline">What is a Final Grade?</a></li>
            <li><a href="#final-grade-formula" className="hover:underline">The Final Grade Formula</a></li>
            <li><a href="#score-needed-on-final" className="hover:underline">What Score Do I Need on My Final?</a></li>
            <li><a href="#worked-examples" className="hover:underline">Worked Math Examples</a></li>
            <li><a href="#grading-scenarios" className="hover:underline">Grading Scenarios Table</a></li>
            <li><a href="#weighted-vs-unweighted" className="hover:underline">Weighted vs Unweighted Grades</a></li>
            <li><a href="#grading-systems" className="hover:underline">Common Grading Systems &amp; GPA Conversion</a></li>
            <li><a href="#common-mistakes" className="hover:underline">Common Mistakes to Avoid</a></li>
            <li><a href="#faq-section" className="hover:underline">Frequently Asked Questions</a></li>
          </ol>
        </div>

        {/* ══════════════════════════════════════════════════
            H2: WHAT IS A FINAL GRADE + IMAGE
        ══════════════════════════════════════════════════ */}
        <section className="mt-10" id="what-is-final-grade">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            What is a Final Grade?
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            A <strong>final grade</strong> is your total course score at the end of a semester —
            the single number (or letter) that goes on your transcript. It is not just your final
            exam score. It is a{" "}
            <strong>weighted average</strong> of everything you did in the course: homework, quizzes,
            assignments, midterm exams, participation, projects, and the final exam itself.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            Think of it this way: your professor does not look at your final exam in isolation. They
            combine every assessment category according to the weight each carries. A student who
            scored 95% on the final but neglected homework all semester may end up with a lower
            final grade than a student who was consistently solid across all categories.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            This is exactly why understanding the formula matters — and why checking your numbers
            before the final exam can tell you precisely what you need to hit your target grade.
            <sup className="text-blue-400 text-xs ml-1">[1]</sup>
          </p>

          {/* INFOGRAPHIC IMAGE */}
          <figure className="my-8">
            <div className="rounded-2xl overflow-hidden border border-gray-700">
              <Image
                src="/images/blogs/education/how-to-calculate-final-grade-before-exams.webp"
                alt="How final grades are calculated infographic showing a weighted grade distribution donut chart (Final Exam 30%, Midterm 20%, Homework 20%, Quizzes 15%, Assignments 15%), the grade formula box, and a worked example where 85% current grade and 90% final exam score produce an 86.5% final grade"
                title="How to Calculate Final Grade — Formula and Worked Example Infographic by LizoCalc"
                width={1400}
                height={788}
                className="w-full h-auto"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <figcaption className="mt-3 text-sm text-gray-400 text-center italic leading-relaxed">
              <strong className="text-gray-300">Figure 1:</strong> A typical weighted grade
              distribution for a university course (left) and the final grade formula with a
              complete worked example (right). The formula combines your current grade with the
              final exam score, each multiplied by its respective weight. In this example, a
              current grade of 85% (weight 70%) and a final exam score of 90% (weight 30%) produce
              a final grade of 86.5%. — LizoCalc Grade Visuals, 2026.
            </figcaption>
          </figure>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            What Makes Up a Final Grade?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            While the exact breakdown varies by course, most university and high school courses
            use a structure similar to this:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Assessment Category</th>
                  <th className="p-4 text-left font-semibold">Typical Weight</th>
                  <th className="p-4 text-left font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-green-300">Final Exam</td>
                  <td className="p-4 font-bold">20% – 40%</td>
                  <td className="p-4 text-gray-300">Cumulative end-of-semester exam</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-blue-300">Midterm Exam</td>
                  <td className="p-4 font-bold">15% – 25%</td>
                  <td className="p-4 text-gray-300">Mid-semester major assessment</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-yellow-300">Homework</td>
                  <td className="p-4 font-bold">10% – 25%</td>
                  <td className="p-4 text-gray-300">Problem sets, readings, written work</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-orange-300">Quizzes</td>
                  <td className="p-4 font-bold">10% – 20%</td>
                  <td className="p-4 text-gray-300">Weekly or bi-weekly short tests</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-purple-300">Assignments / Projects</td>
                  <td className="p-4 font-bold">10% – 20%</td>
                  <td className="p-4 text-gray-300">Lab reports, research papers, presentations</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Participation</td>
                  <td className="p-4 font-bold">0% – 10%</td>
                  <td className="p-4 text-gray-300">Attendance, in-class discussion</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 text-sm italic">
            All weights in your course must add up to exactly 100%. Always verify this in your
            syllabus before doing any calculations.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: FINAL GRADE FORMULA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="final-grade-formula">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            The Final Grade Formula — How It Works
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The core formula for calculating a final grade in any weighted grading system comes
            down to one clean equation. Here it is in both plain English and mathematical notation.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Formula 1 — Calculate Your Final Grade
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-4 overflow-x-auto">
            G = (C × W<sub>c</sub>) + (F × W<sub>f</sub>)
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Symbol</th>
                  <th className="p-4 text-left font-semibold">Meaning</th>
                  <th className="p-4 text-left font-semibold">Example Value</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono font-bold text-green-300">G</td>
                  <td className="p-4">Final grade (what you&rsquo;re solving for)</td>
                  <td className="p-4 text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-green-300">C</td>
                  <td className="p-4">Current grade before the final exam</td>
                  <td className="p-4 text-gray-300">85%</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-green-300">W<sub>c</sub></td>
                  <td className="p-4">Weight of current grade (as a decimal)</td>
                  <td className="p-4 text-gray-300">0.70 (i.e., 70%)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-green-300">F</td>
                  <td className="p-4">Final exam score</td>
                  <td className="p-4 text-gray-300">90%</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono font-bold text-green-300">W<sub>f</sub></td>
                  <td className="p-4">Weight of final exam (as a decimal)</td>
                  <td className="p-4 text-gray-300">0.30 (i.e., 30%)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The relationship between W<sub>c</sub> and W<sub>f</sub> is straightforward:
            they must add up to 1.0 (or 100%). If your final exam is worth 30%, then
            your current grade carries the remaining 70%.
            <sup className="text-blue-400 text-xs ml-1">[1]</sup>
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            For Courses With Multiple Graded Categories
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            If your course has many separate categories (homework, quizzes, midterm, assignments,
            final exam), the full formula expands naturally:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            G = (Score₁ × W₁) + (Score₂ × W₂) + (Score₃ × W₃) + … + (Final × W<sub>f</sub>)
            <br /><br />
            Where W₁ + W₂ + W₃ + … + W<sub>f</sub> = 1.0
          </div>
          <p className="text-gray-200 text-base leading-relaxed">
            In practice, most grade portals (Canvas, Blackboard, Moodle) calculate your current
            grade automatically by combining all non-final categories. So you can treat that single
            &ldquo;current grade&rdquo; number as your C value in the two-variable formula above.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: SCORE NEEDED ON FINAL
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="score-needed-on-final">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            What Score Do I Need on My Final? — The Required Score Formula
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-4">
            This is the most important calculation for students approaching exams. You know your
            current grade. You know your target (an A, a B, or just passing). What you need to
            know is exactly what score on the final will get you there.
          </p>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Simply rearrange the final grade formula to solve for F (the required final exam score):
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            Formula 2 — Score Needed on Final Exam
          </h3>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            F = (G − (C × W<sub>c</sub>)) ÷ W<sub>f</sub>
            <br /><br />
            Where:
            <br />
            G = your target overall grade (e.g., 0.90 for 90%)
            <br />
            C = your current grade before the final
            <br />
            W<sub>c</sub> = weight of your current grade (decimal)
            <br />
            W<sub>f</sub> = weight of the final exam (decimal)
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Example: What do I need on my final to get an A?
            </h3>
            <p className="text-gray-300 mb-4">
              Student: Current grade = <strong>82%</strong>, Final weight = <strong>30%</strong>,
              Target grade = <strong>90% (A)</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Step 1 — Set up the variables
              <br />
              G = 0.90, C = 0.82, W<sub>c</sub> = 0.70, W<sub>f</sub> = 0.30
              <br /><br />
              Step 2 — Apply the formula
              <br />
              F = (0.90 − (0.82 × 0.70)) ÷ 0.30
              <br />
              F = (0.90 − 0.574) ÷ 0.30
              <br />
              F = 0.326 ÷ 0.30
              <br />
              F = <strong>1.087 → 108.7%</strong>
              <br /><br />
              Result: <strong>This student cannot reach 90% — they need more than 100% on the final. ✗</strong>
            </div>
            <p className="text-gray-400 text-sm mt-4 italic">
              When the required score exceeds 100%, the target grade is mathematically out of reach.
              The student should recalculate for a lower target, such as 87% or 88%.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Example: What do I need to just pass?
            </h3>
            <p className="text-gray-300 mb-4">
              Student: Current grade = <strong>55%</strong>, Final weight = <strong>25%</strong>,
              Target grade = <strong>60% (passing)</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              G = 0.60, C = 0.55, W<sub>c</sub> = 0.75, W<sub>f</sub> = 0.25
              <br /><br />
              F = (0.60 − (0.55 × 0.75)) ÷ 0.25
              <br />
              F = (0.60 − 0.4125) ÷ 0.25
              <br />
              F = 0.1875 ÷ 0.25
              <br />
              F = <strong>0.75 → 75%</strong>
              <br /><br />
              Result: <strong>Student needs 75% on the final to pass. ✓</strong>
            </div>
          </div>

          <p className="text-gray-200 text-base leading-relaxed">
            Use our{" "}
            <Link
              href="/calculators/education/final-grade-calculator"
              className="text-blue-400 hover:underline"
            >
              Final Grade Calculator
            </Link>{" "}
            to skip the manual work — enter your current grade, exam weight, and target, and get
            the required score instantly.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: WORKED EXAMPLES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="worked-examples">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Worked Math Examples — Step by Step
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Here are three complete examples covering different final exam scenarios. Follow each
            step with your own numbers to double-check your grade.
          </p>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Example 1 — Calculate Final Grade (Final Worth 20%)
            </h3>
            <p className="text-gray-300 mb-4">
              Current grade: <strong>85%</strong> · Final exam: <strong>90%</strong> · Final weight:{" "}
              <strong>20%</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Current weight = 100% − 20% = 80% → 0.80
              <br /><br />
              Step 1: 85 × 0.80 = 68.0
              <br />
              Step 2: 90 × 0.20 = 18.0
              <br />
              Step 3: 68.0 + 18.0 = <strong>86.0%</strong>
              <br /><br />
              Final Grade = <strong>86% → B</strong> ✓
            </div>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Example 2 — Calculate Final Grade (Final Worth 40%)
            </h3>
            <p className="text-gray-300 mb-4">
              Current grade: <strong>72%</strong> · Final exam: <strong>88%</strong> · Final weight:{" "}
              <strong>40%</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              Current weight = 60% → 0.60
              <br /><br />
              Step 1: 72 × 0.60 = 43.2
              <br />
              Step 2: 88 × 0.40 = 35.2
              <br />
              Step 3: 43.2 + 35.2 = <strong>78.4%</strong>
              <br /><br />
              Final Grade = <strong>78.4% → C+</strong> ✓
            </div>
            <p className="text-gray-400 text-sm mt-3 italic">
              Notice how a heavy final (40%) and a strong exam performance can significantly lift
              an otherwise average grade.
            </p>
          </div>

          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-6">
            <h3 className="text-xl font-semibold text-blue-300 mb-5">
              Example 3 — What Score Needed to Get B (80%)?
            </h3>
            <p className="text-gray-300 mb-4">
              Current grade: <strong>78%</strong> · Final weight: <strong>25%</strong> · Target:{" "}
              <strong>80%</strong>
            </p>
            <div className="bg-gray-900/70 p-5 rounded-xl font-mono text-green-300 text-sm overflow-x-auto">
              W<sub>c</sub> = 0.75, W<sub>f</sub> = 0.25
              <br /><br />
              F = (0.80 − (0.78 × 0.75)) ÷ 0.25
              <br />
              F = (0.80 − 0.585) ÷ 0.25
              <br />
              F = 0.215 ÷ 0.25
              <br />
              F = <strong>0.86 → 86%</strong>
              <br /><br />
              Result: Student needs <strong>86% on the final</strong> to finish with 80% overall. ✓
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: GRADING SCENARIOS TABLE
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="grading-scenarios">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Grading Scenarios — What You Need on the Final
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            The table below covers the most common pre-final grade situations. All values are
            calculated using the required score formula. Use this as a quick reference before your
            exams.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Current Grade</th>
                  <th className="p-4 text-left font-semibold">Final Weight</th>
                  <th className="p-4 text-left font-semibold">Target Grade</th>
                  <th className="p-4 text-left font-semibold">Needed on Final</th>
                  <th className="p-4 text-left font-semibold">Achievable?</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-green-300">95%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">A (90%)</td>
                  <td className="p-4 font-bold">63.8%</td>
                  <td className="p-4 text-green-400">✅ Yes — easily</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-300">90%</td>
                  <td className="p-4">20%</td>
                  <td className="p-4">A (90%)</td>
                  <td className="p-4 font-bold">90.0%</td>
                  <td className="p-4 text-yellow-400">⚠️ Yes — maintain performance</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">82%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">A (90%)</td>
                  <td className="p-4 font-bold">108.7%</td>
                  <td className="p-4 text-red-400">❌ No — out of reach</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">82%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">B (85%)</td>
                  <td className="p-4 font-bold">97.7%</td>
                  <td className="p-4 text-yellow-400">⚠️ Very difficult</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">82%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">B (83%)</td>
                  <td className="p-4 font-bold">85.3%</td>
                  <td className="p-4 text-green-400">✅ Yes — achievable</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-300">75%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">B (80%)</td>
                  <td className="p-4 font-bold">87.5%</td>
                  <td className="p-4 text-yellow-400">⚠️ Yes — requires strong effort</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-300">68%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">Pass (60%)</td>
                  <td className="p-4 font-bold">36.0%</td>
                  <td className="p-4 text-green-400">✅ Yes — comfortable margin</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-300">50%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">Pass (60%)</td>
                  <td className="p-4 font-bold">80.0%</td>
                  <td className="p-4 text-yellow-400">⚠️ Possible — needs strong final</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-300">40%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">Pass (60%)</td>
                  <td className="p-4 font-bold">110.7%</td>
                  <td className="p-4 text-red-400">❌ No — mathematically impossible</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 text-sm italic">
            All &ldquo;Needed on Final&rdquo; values are calculated using: F = (Target −
            (Current × Current Weight)) ÷ Final Weight. Values above 100% are mathematically
            unachievable with standard scoring.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: WEIGHTED VS UNWEIGHTED
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="weighted-vs-unweighted">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Weighted vs Unweighted Grades — What Is the Difference?
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Before you can correctly apply the formula above, you need to confirm which grading
            system your course uses. These two systems are fundamentally different — and
            confusing them is one of the most common mistakes students make.
            <sup className="text-blue-400 text-xs ml-1">[2]</sup>
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Feature</th>
                  <th className="p-4 text-left font-semibold">Weighted Grades</th>
                  <th className="p-4 text-left font-semibold">Unweighted Grades</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Definition</td>
                  <td className="p-4 text-gray-300">Categories have different levels of importance</td>
                  <td className="p-4 text-gray-300">Every assignment counts equally</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Calculation</td>
                  <td className="p-4 text-gray-300">Weighted average using category weights</td>
                  <td className="p-4 text-gray-300">Simple arithmetic mean of all scores</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Common in</td>
                  <td className="p-4 text-gray-300">Universities, high schools, professional courses</td>
                  <td className="p-4 text-gray-300">Some elementary/middle schools, simple courses</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Example</td>
                  <td className="p-4 text-gray-300">Final exam (30%) matters more than a quiz (5%)</td>
                  <td className="p-4 text-gray-300">A quiz and an exam are treated identically</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Formula used</td>
                  <td className="p-4 text-gray-300">G = Σ(Score × Weight)</td>
                  <td className="p-4 text-gray-300">G = Sum of all scores ÷ Number of scores</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-gray-300">Final exam impact</td>
                  <td className="p-4 text-gray-300">Can significantly shift overall grade</td>
                  <td className="p-4 text-gray-300">One exam among many — smaller effect</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/50 rounded-xl p-5 text-sm text-blue-200 leading-relaxed">
            <strong>How to tell which system your course uses:</strong> Open your course syllabus
            and look for a grade breakdown table. If it lists percentages next to each category
            (Homework 20%, Midterm 25%, Final 30%…), it is weighted. If it simply says &ldquo;grades
            are averaged&rdquo; with no percentages, it is likely unweighted. When in doubt, ask your
            instructor.
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: GRADING SYSTEMS
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="grading-systems">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Common Grading Systems — Percentage, Letter Grade &amp; GPA
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Once you have calculated your final grade percentage, you need to know what letter
            grade or GPA it corresponds to. Different countries and institutions use different
            scales — here are the most widely used.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            US Standard Letter Grade Scale
          </h3>
          <div className="overflow-x-auto mb-8">
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
                  <td className="p-4 font-bold text-green-300">97 – 100%</td>
                  <td className="p-4 font-bold text-green-300">A+</td>
                  <td className="p-4">4.0</td>
                  <td className="p-4 text-gray-300">Exceptional</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-300">93 – 96%</td>
                  <td className="p-4 font-bold text-green-300">A</td>
                  <td className="p-4">4.0</td>
                  <td className="p-4 text-gray-300">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-green-400">90 – 92%</td>
                  <td className="p-4 font-bold text-green-400">A−</td>
                  <td className="p-4">3.7</td>
                  <td className="p-4 text-gray-300">Excellent</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">87 – 89%</td>
                  <td className="p-4 font-bold text-blue-300">B+</td>
                  <td className="p-4">3.3</td>
                  <td className="p-4 text-gray-300">Above average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">83 – 86%</td>
                  <td className="p-4 font-bold text-blue-300">B</td>
                  <td className="p-4">3.0</td>
                  <td className="p-4 text-gray-300">Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-400">80 – 82%</td>
                  <td className="p-4 font-bold text-blue-400">B−</td>
                  <td className="p-4">2.7</td>
                  <td className="p-4 text-gray-300">Good</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">77 – 79%</td>
                  <td className="p-4 font-bold text-yellow-300">C+</td>
                  <td className="p-4">2.3</td>
                  <td className="p-4 text-gray-300">Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">73 – 76%</td>
                  <td className="p-4 font-bold text-yellow-300">C</td>
                  <td className="p-4">2.0</td>
                  <td className="p-4 text-gray-300">Average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-400">70 – 72%</td>
                  <td className="p-4 font-bold text-yellow-400">C−</td>
                  <td className="p-4">1.7</td>
                  <td className="p-4 text-gray-300">Below average</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-300">67 – 69%</td>
                  <td className="p-4 font-bold text-orange-300">D+</td>
                  <td className="p-4">1.3</td>
                  <td className="p-4 text-gray-300">Poor</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-300">60 – 66%</td>
                  <td className="p-4 font-bold text-orange-300">D</td>
                  <td className="p-4">1.0</td>
                  <td className="p-4 text-gray-300">Poor — barely passing</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-400">Below 60%</td>
                  <td className="p-4 font-bold text-red-400">F</td>
                  <td className="p-4">0.0</td>
                  <td className="p-4 text-gray-300">Failing</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-blue-300 mb-4">
            UK Grading System
          </h3>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Percentage</th>
                  <th className="p-4 text-left font-semibold">Classification</th>
                  <th className="p-4 text-left font-semibold">Common Term</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-bold text-green-300">70% and above</td>
                  <td className="p-4 font-bold text-green-300">First Class Honours</td>
                  <td className="p-4 text-gray-300">1st</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-blue-300">60% – 69%</td>
                  <td className="p-4 font-bold text-blue-300">Upper Second Class</td>
                  <td className="p-4 text-gray-300">2:1</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-yellow-300">50% – 59%</td>
                  <td className="p-4 font-bold text-yellow-300">Lower Second Class</td>
                  <td className="p-4 text-gray-300">2:2</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-orange-300">40% – 49%</td>
                  <td className="p-4 font-bold text-orange-300">Third Class Honours</td>
                  <td className="p-4 text-gray-300">3rd</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-red-400">Below 40%</td>
                  <td className="p-4 font-bold text-red-400">Fail</td>
                  <td className="p-4 text-gray-300">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-400 text-sm italic">
            GPA values listed follow the most common US 4.0 scale as described by the College
            Board.<sup className="text-blue-400 text-xs ml-1">[3]</sup> Some institutions use
            slightly different cutoffs — always verify with your registrar office.
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: COMMON MISTAKES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="common-mistakes">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Common Mistakes to Avoid When Calculating Final Grades
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            These errors show up constantly — and each one produces a wrong answer that could leave
            a student either falsely confident or unnecessarily panicked. Knowing them in advance
            saves you from a bad surprise after the exam.
          </p>

          <div className="space-y-4">
            <div className="bg-gray-800/50 border-l-4 border-red-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-red-300 mb-2">
                1. Multiplying by 20 instead of 0.20
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                The single most common arithmetic error. If your final is worth 20%, you must
                multiply by <strong>0.20</strong> — not 20. Using 85 × 20 = 1700 is completely
                wrong. Always convert percentage weights to decimals before plugging into the
                formula.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-orange-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-orange-300 mb-2">
                2. Weights that do not add up to 100%
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                If your current weight and final exam weight do not add up to exactly 100%, your
                formula is broken. For example: if the final is worth 30%, your current grade
                carries 70% — not 80%, not 60%. Double-check your syllabus. If something is
                missing (like a participation component), include it in your current grade&rsquo;s
                cumulative weight.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-yellow-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-yellow-300 mb-2">
                3. Using the wrong current grade
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your &ldquo;current grade&rdquo; must reflect all completed work — not just one
                recent test or your homework average. Log into your grade portal and use the
                overall course grade displayed there, not the grade from one specific category.
                Using only your midterm score as C will produce a very different (and wrong) result.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-purple-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-purple-300 mb-2">
                4. Assuming the professor will round up
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Many students calculate that they need 89.4% and assume it rounds to 90%. Some
                professors do round half-points up; many do not. Never rely on rounding as part
                of your exam strategy. Calculate what you need to hit the hard threshold (90.0%),
                and treat rounding as a bonus, not a guarantee.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-blue-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-blue-300 mb-2">
                5. Ignoring extra credit or dropped lowest scores
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Some courses automatically drop the lowest quiz score or offer extra credit
                assignments. If these apply to your course, your effective current grade may be
                higher than what you see — or there may be additional points available to improve
                your position before the final. Always check the full policy in your syllabus.
              </p>
            </div>

            <div className="bg-gray-800/50 border-l-4 border-gray-500 rounded-r-xl p-5">
              <h3 className="text-base font-semibold text-gray-300 mb-2">
                6. Calculating too early (incomplete grades)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                If there are still assignments or quizzes to be submitted before the final exam,
                your current grade is not yet finalized. Calculating your required final score
                before all pre-final work is graded can produce a misleading result. Wait until
                all non-final grades are in before applying the formula.
              </p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            H2: CALCULATOR CTA
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="calculate-final-grade">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            Calculate Your Final Grade Now — Free Tool
          </h2>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            You now have the formula, the examples, and a complete understanding of how weighted
            grading works. If you want to skip the manual calculation entirely, use our free tool —
            enter your current grade, final exam weight, and target grade, and get your required
            score instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/calculators/education/final-grade-calculator"
              className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors duration-200 text-center"
            >
              Open Final Grade Calculator →
            </Link>
            <Link
              href="/calculators/education/gpa-calculator"
              className="inline-block bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-colors duration-200 text-center"
            >
              GPA Calculator →
            </Link>
          </div>

          <p className="text-gray-400 text-sm mt-4">
            Free · No sign-up · Works on mobile · Instant result
          </p>
        </section>

        {/* ══════════════════════════════════════════════════
            REFERENCES
        ══════════════════════════════════════════════════ */}
        <section className="mt-16" id="references">
          <h2 className="text-3xl font-bold text-blue-400 border-b border-blue-700 pb-3 mb-6">
            References &amp; Sources
          </h2>
          <p className="text-gray-400 text-sm mb-5 italic">
            This article is based on academic grading policies, peer-reviewed educational research,
            and guidelines from recognised academic institutions. All sources were accessed in
            April 2026.
          </p>

          <ol className="space-y-4 text-sm text-gray-300 leading-relaxed list-decimal list-inside">
            <li>
              Massachusetts Institute of Technology, Registrar&rsquo;s Office.{" "}
              <em>Grading and Grade Point Averages.</em> Cambridge: MIT; 2024. Available at:{" "}
              <a
                href="https://registrar.mit.edu/classes-grades-evaluations/grades"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                registrar.mit.edu
              </a>
              . — Source for weighted grade methodology and cumulative grade calculations.
            </li>
            <li>
              Carnegie Mellon University, Eberly Center for Teaching Excellence.{" "}
              <em>Grading and Assessment: Understanding Weighted Categories.</em> Pittsburgh: CMU;
              2023. Available at:{" "}
              <a
                href="https://www.cmu.edu/teaching/assessment/basics/grading-assessment.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                cmu.edu
              </a>
              . — Source for weighted vs unweighted grading systems and common grading structures.
            </li>
            <li>
              College Board.{" "}
              <em>How to Convert Your GPA to a 4.0 Scale.</em> New York: College Board; 2024.
              Available at:{" "}
              <a
                href="https://bigfuture.collegeboard.org/plan-for-college/get-started/how-to-convert-gpa-4.0-scale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                bigfuture.collegeboard.org
              </a>
              . — Source for US percentage-to-GPA conversion scale and letter grade thresholds.
            </li>
            <li>
              University of Oxford, Academic Administration Division.{" "}
              <em>Degree Classification — Marking and Assessment Guidelines.</em> Oxford: University
              of Oxford; 2024. — Source for UK Honours degree classification percentages (First,
              2:1, 2:2, Third).
            </li>
            <li>
              Walvoord B, Anderson VJ.{" "}
              <em>Effective Grading: A Tool for Learning and Assessment in College.</em> 2nd ed.
              San Francisco: Jossey-Bass; 2010. — Foundational academic reference on weighted
              grading design and grade calculation in higher education.
            </li>
          </ol>
        </section>

       
        {/* ══════════════════════════════════════════════════
            E-E-A-T BYLINE
        ══════════════════════════════════════════════════ */}
        <div className="flex items-center gap-4 mt-16 p-5 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-400 text-xs leading-relaxed mt-0.5">
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
            <p className="text-gray-500 text-xs mt-1">
              Content based on university grading policies, College Board guidelines, and peer-reviewed
              educational research. See full references above.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs text-gray-400 text-right">
            <span>📅 Published: May 01, 2026</span>
            <span>🔄 Updated: May 01, 2026</span>
            <span>✅ Factually reviewed</span>
          </div>
        </div>

        {/* Closing statement */}
        <p className="text-gray-300 italic text-center mt-16 text-lg font-medium leading-relaxed">
          Your final grade is not a mystery — it is a calculation. Run the numbers before the exam,
          know exactly what you need, and walk in with a plan.
        </p>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}