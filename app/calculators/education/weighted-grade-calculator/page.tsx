import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import WeightedGradeCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Weighted Grade Calculator – Course Grade by Category",

  description:
    "Calculate your course grade from category weights like exams, homework, and labs. See a worked example, find the score you need on your final, and check common weighting mistakes.",

  keywords: [
    "weighted grade calculator",
    "weighted average calculator",
    "weighted grading system",
    "calculate weighted grade",
    "final grade calculator",
    "college weighted grade calculator",
    "grade category weights",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Weighted Grade Calculator – Course Grade by Category",
    description:
      "Enter your grade categories and weights to get your course grade instantly, then find what you need on the final.",
    url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weighted Grade Calculator – Course Grade by Category",
    description:
      "Free weighted grade calculator. Enter category scores and weights, get your exact course grade.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#person-abdullah",
      name: "Rana Muhammad Abdullah",
      url: "https://www.linkedin.com/in/abdullahsajjad06/",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Education", item: "https://www.lizocalc.com/calculators/education" },
        { "@type": "ListItem", position: 4, name: "Weighted Grade Calculator", item: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
      url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
      name: "Weighted Grade Calculator – Course Grade by Category | LizoCalc",
      description:
        "Calculate a course grade from category weights, see the effect of a final exam, and check the score needed to hit a target grade.",
      inLanguage: "en",
      datePublished: "2026-05-21",
      dateModified: "2026-09-10",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/education/weighted-grade-calculator#app",
      name: "Weighted Grade Calculator",
      url: "https://www.lizocalc.com/calculators/education/weighted-grade-calculator",
      description:
        "Free weighted grade calculator that turns category scores and weights into a single course grade.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Weighted Grade Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate course grade from category weights",
        "Worked examples for weighted grading systems",
        "Score needed on the final exam calculator",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "what-are-weighted-grades", label: "What Weighted Grades Are" },
  { id: "the-formula", label: "The Weighted Grade Formula" },
  { id: "step-by-step", label: "Step by Step, By Hand" },
  { id: "worked-examples", label: "Two Worked Examples" },
  { id: "final-exam", label: "What You Need on the Final" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "grade-scale", label: "Percentage to Letter Grade" },
];

export default function WeightedGradePage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <Script
        id="structured-data-weighted-grade"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Weighted Grade Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Turn category scores and weights, like 40% exams and 20%
            homework, into one course grade.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <WeightedGradeCalculator />
      </section>

      {/* Quick answer, written for people scanning fast or landing from a search snippet */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-blue-900/30 border border-blue-600 rounded-2xl p-6 md:p-8">
          <p className="text-white font-semibold text-lg mb-2">
            How to calculate a weighted grade
          </p>
          <p className="text-gray-200 text-base leading-relaxed">
            Multiply each category's score by its weight, add the results,
            then divide by the total weight. Formula: weighted grade =
            Σ(score × weight) ÷ Σweight. Example: homework 95% at 30%
            weight, midterm 82% at 35%, final 88% at 35%. (95×0.30) +
            (82×0.35) + (88×0.35) = 28.5 + 28.7 + 30.8 = 88%.
          </p>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Most college courses, and a lot of high school ones, don't grade
          every assignment equally. A final exam might be 40% of your
          grade while daily homework is 10%. This calculator takes your
          score in each category and its weight, and gives you the actual
          course grade those numbers add up to, not a plain average that
          treats a quiz the same as a final.
        </p>

        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Table Of Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base"
                >
                  <span aria-hidden="true">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* What weighted grades are */}
        <section id="what-are-weighted-grades" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Weighted Grades Are
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            In a weighted grading system, your instructor assigns each
            category, exams, homework, participation, labs, projects, a
            percentage of your total grade. Your score in each category
            counts toward the final grade in proportion to that weight.
          </p>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            That's why a student can score 100% on every homework set and
            still end up with a C: if homework is 10% of the grade and the
            final exam is 40%, one bad final does more damage than a
            semester of perfect homework can fix.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Weighted vs unweighted grading
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Factor</th>
                  <th className="p-4 text-left font-semibold">Unweighted</th>
                  <th className="p-4 text-left font-semibold">Weighted</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold">Calculation</td>
                  <td className="p-4">Simple average of all scores</td>
                  <td className="p-4 text-green-300">Each category × its weight</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Assignment importance</td>
                  <td className="p-4">Every item counts the same</td>
                  <td className="p-4 text-green-300">Exams count more than homework</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Formula</td>
                  <td className="p-4">Σ(scores) ÷ n</td>
                  <td className="p-4 text-green-300">Σ(score × weight) ÷ Σweight</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Common in</td>
                  <td className="p-4">Some elementary and middle schools</td>
                  <td className="p-4 text-green-300">Most high schools and virtually all colleges</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* The formula */}
        <section id="the-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Weighted Grade Formula
          </h2>

          <div className="bg-gray-900/70 p-6 rounded-2xl border border-blue-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            Weighted Grade = Σ(Score × Weight) ÷ ΣWeight
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Σ means "sum of." Score is your percentage in that category, 0
            to 100. Weight is that category's share of the grade, as a
            decimal (40% becomes 0.40). ΣWeight is the total of every
            weight you've entered, which should reach 1.0, or 100%, by the
            end of the course.
          </p>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            If your weights already total 100%, the sum of the products is
            your grade and there's nothing left to divide by. Mid-semester,
            when some categories haven't happened yet, divide by whatever
            partial weight you have entered so far.
          </p>

          <div className="rounded-2xl overflow-hidden border border-gray-700">
            <Image
              src="/images/education/weighted-grade-formula-example.webp"
              alt="Weighted grade formula: score times weight, summed and divided by total weight"
              className="w-full h-auto object-cover"
              width={800}
              height={500}
              loading="lazy"
              quality={75}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        </section>

        {/* Step by step */}
        <section id="step-by-step" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step by Step, By Hand
          </h2>
          <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
            <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
              <li>List every category from your syllabus: homework, quizzes, midterm, final, labs, whatever applies.</li>
              <li>Write down the weight for each one, straight from the syllabus.</li>
              <li>Work out your average score in each category if it has more than one assignment.</li>
              <li>Convert each weight to a decimal: 40% becomes 0.40.</li>
              <li>Multiply each category's score by its weight.</li>
              <li>Add the results together.</li>
              <li>If the weights you used don't total 100%, divide the sum by the total weight instead of treating it as final.</li>
            </ol>
          </div>
        </section>

        {/* Worked examples */}
        <section id="worked-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Two Worked Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            A typical high school breakdown
          </h3>
          <div className="overflow-x-auto mb-10">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Score</th>
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">Contribution</th>
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
                  <td className="p-4">Participation</td>
                  <td className="p-4">98%</td>
                  <td className="p-4">10%</td>
                  <td className="p-4 font-bold text-green-400">9.80</td>
                </tr>
                <tr>
                  <td className="p-4">Midterm exam</td>
                  <td className="p-4">78%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4 font-bold text-green-400">19.50</td>
                </tr>
                <tr>
                  <td className="p-4">Final exam</td>
                  <td className="p-4">84%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4 font-bold text-green-400">25.20</td>
                </tr>
                <tr className="bg-blue-900/30">
                  <td className="p-4 font-bold text-white" colSpan={2}>Total</td>
                  <td className="p-4 font-bold text-yellow-300">100%</td>
                  <td className="p-4 font-bold text-yellow-300 text-base">85.65% (B)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            A college course with a lab component
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Category</th>
                  <th className="p-4 text-left font-semibold">Score</th>
                  <th className="p-4 text-left font-semibold">Weight</th>
                  <th className="p-4 text-left font-semibold">Contribution</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Online homework</td>
                  <td className="p-4">96%</td>
                  <td className="p-4">15%</td>
                  <td className="p-4 font-bold text-green-400">14.40</td>
                </tr>
                <tr>
                  <td className="p-4">Lab reports</td>
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
                  <td className="p-4">Research project</td>
                  <td className="p-4">91%</td>
                  <td className="p-4">10%</td>
                  <td className="p-4 font-bold text-green-400">9.10</td>
                </tr>
                <tr>
                  <td className="p-4">Final exam</td>
                  <td className="p-4">79%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4 font-bold text-green-400">19.75</td>
                </tr>
                <tr className="bg-blue-900/30">
                  <td className="p-4 font-bold text-white" colSpan={2}>Total</td>
                  <td className="p-4 font-bold text-yellow-300">100%</td>
                  <td className="p-4 font-bold text-yellow-300 text-base">84.10% (B)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Final exam */}
        <section id="final-exam" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What You Need on the Final
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The formula for the score you need on a remaining exam:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-blue-700 font-mono text-green-300 text-base mb-6 overflow-x-auto">
            Required Final Score = (Target Grade − Current Grade × Pre-Final Weight) ÷ Final Weight
          </div>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Example: your current grade is 80%, that's built from 70% of
            the course, the final is worth the remaining 30%, and you want
            an 85% overall.
            (85 − 80×0.70) ÷ 0.30 = (85 − 56) ÷ 0.30 = 96.7% needed on the
            final.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How that plays out at different starting points
          </h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Current grade</th>
                  <th className="p-4 text-left font-semibold">Pre-final weight</th>
                  <th className="p-4 text-left font-semibold">Final weight</th>
                  <th className="p-4 text-left font-semibold">Target</th>
                  <th className="p-4 text-left font-semibold">Score needed</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">85%</td>
                  <td className="p-4">75%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">90% (A)</td>
                  <td className="p-4 font-bold text-red-400">105%, not reachable</td>
                </tr>
                <tr>
                  <td className="p-4">80%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">85% (B+)</td>
                  <td className="p-4 font-bold text-green-400">96.7%</td>
                </tr>
                <tr>
                  <td className="p-4">72%</td>
                  <td className="p-4">75%</td>
                  <td className="p-4">25%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-green-400">64.0%</td>
                </tr>
                <tr>
                  <td className="p-4">65%</td>
                  <td className="p-4">60%</td>
                  <td className="p-4">40%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-green-400">77.5%</td>
                </tr>
                <tr>
                  <td className="p-4 text-red-400">55%</td>
                  <td className="p-4">70%</td>
                  <td className="p-4">30%</td>
                  <td className="p-4">70% (C)</td>
                  <td className="p-4 font-bold text-red-400">101.7%, not reachable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            When the required score passes 100%, the target isn't
            reachable on the final alone, no matter how well you do. Worth
            checking a week or two out, not the night before, while there's
            still time to talk to an instructor about extra credit or
            adjust the goal.
          </p>
        </section>

        {/* Common mistakes */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Mistake</th>
                  <th className="p-4 text-left font-semibold">Why it's wrong</th>
                  <th className="p-4 text-left font-semibold">Fix</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold text-red-400">Averaging every score equally</td>
                  <td className="p-4">Ignores the weight each category actually carries</td>
                  <td className="p-4 text-green-300">Multiply each score by its weight first</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">Weights that don't add up to 100%</td>
                  <td className="p-4">A missing category inflates or deflates the result</td>
                  <td className="p-4 text-green-300">Check your entered weights sum to what the syllabus says</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">Entering raw points instead of percentages</td>
                  <td className="p-4">42 out of 50 isn't comparable to 88 out of 100 without converting first</td>
                  <td className="p-4 text-green-300">Convert to a percentage: (earned ÷ possible) × 100</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">Dividing by 100% mid-semester</td>
                  <td className="p-4">If only 70% of the course has been graded, dividing by the full 100% understates your grade</td>
                  <td className="p-4 text-green-300">Divide by the weight actually completed so far</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-red-400">Not checking the final's weight until finals week</td>
                  <td className="p-4">A 40% final can turn an A into a C on its own</td>
                  <td className="p-4 text-green-300">Work out the required score as soon as the syllabus is out</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Grade scale */}
        <section id="grade-scale" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Percentage to Letter Grade
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Percentage</th>
                  <th className="p-4 text-left font-semibold">Letter</th>
                  <th className="p-4 text-left font-semibold">4.0 GPA</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">93–100%</td><td className="p-4">A</td><td className="p-4">4.0</td></tr>
                <tr><td className="p-4">90–92%</td><td className="p-4">A-</td><td className="p-4">3.7</td></tr>
                <tr><td className="p-4">87–89%</td><td className="p-4">B+</td><td className="p-4">3.3</td></tr>
                <tr><td className="p-4">83–86%</td><td className="p-4">B</td><td className="p-4">3.0</td></tr>
                <tr><td className="p-4">80–82%</td><td className="p-4">B-</td><td className="p-4">2.7</td></tr>
                <tr><td className="p-4">77–79%</td><td className="p-4">C+</td><td className="p-4">2.3</td></tr>
                <tr><td className="p-4">73–76%</td><td className="p-4">C</td><td className="p-4">2.0</td></tr>
                <tr><td className="p-4">70–72%</td><td className="p-4">C-</td><td className="p-4">1.7</td></tr>
                <tr><td className="p-4">60–69%</td><td className="p-4">D</td><td className="p-4">1.0</td></tr>
                <tr><td className="p-4">Below 60%</td><td className="p-4">F</td><td className="p-4">0.0</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            This is a common US mapping. Your school's cutoffs, and whether
            it uses plus/minus grades at all, can differ. Check your
            syllabus.
          </p>
        </section>

        <section className="mt-4 mb-16">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Related calculators
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link href="/calculators/education/grade-calculator" className="text-blue-400 underline hover:text-blue-300">
                Grade Calculator
              </Link>{" "}
              — track individual assignments instead of fixed categories
            </li>
            <li>
              <Link href="/calculators/education/gpa-calculator" className="text-blue-400 underline hover:text-blue-300">
                GPA Calculator
              </Link>{" "}
              — convert a course grade to a 4.0-scale GPA
            </li>
            <li>
              <Link href="/calculators/math/percentage-calculator" className="text-blue-400 underline hover:text-blue-300">
                Percentage Calculator
              </Link>{" "}
              — convert raw points to a percentage score
            </li>
          </ul>
        </section>

       <section className="px-4 mt-16 flex justify-center">
                 <SimilarCalculators
                   title="Similar Education Calculators"
                   links={[
                     { label: "CGPA Calculator", href: "/calculators/education/cgpa-calculator" },
                     { label: "Final Grade Calculator", href: "/calculators/education/final-grade-calculator" },
                     { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
                   ]}
                   seeAllHref="/calculators/education"
                 />
               </section>
      </article>

      <Footer />
    </main>
  );
}