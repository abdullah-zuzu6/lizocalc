import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import CGPACalculator from "./clientside";
import Image from "next/image";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "CGPA Calculator – Calculate Cumulative GPA by Semester",

  description:
    "Calculate your CGPA from semester GPAs and credit hours, on any grading scale. Get an instant result, plan a target CGPA, and share the calculation with a link.",

  keywords: [
    "CGPA calculator",
    "calculate CGPA from SGPA",
    "cumulative grade point average calculator",
    "4.0 scale CGPA calculator",
    "university CGPA calculator",
    "semester GPA to CGPA",
    "CGPA to percentage converter",
    "weighted cumulative GPA",
    "how to calculate CGPA",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "CGPA Calculator – Calculate Cumulative GPA by Semester",
    description:
      "Enter your semester GPAs and credit hours to get a weighted CGPA instantly. Works on 4.0, 5.0, 10.0, or percentage scales.",
    url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
    siteName: "LizoCalc",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.lizocalc.com/images/cgpa-formula-diagram.webp",
        width: 1200,
        height: 630,
        alt: "CGPA formula: cumulative grade point average from semester GPA and credit hours",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CGPA Calculator – Calculate Cumulative GPA by Semester",
    description:
      "Free CGPA calculator. Enter semester GPAs and credits, get your cumulative GPA instantly, and share the result.",
    images: ["https://www.lizocalc.com/images/cgpa-formula-diagram.webp"],
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
      "@id": "https://www.lizocalc.com/calculators/education/cgpa-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Education", item: "https://www.lizocalc.com/calculators/education" },
        { "@type": "ListItem", position: 4, name: "CGPA Calculator", item: "https://www.lizocalc.com/calculators/education/cgpa-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/education/cgpa-calculator",
      url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
      name: "CGPA Calculator – Calculate Cumulative GPA by Semester | LizoCalc",
      description:
        "Calculate cumulative GPA from semester GPAs and credit hours, on any grading scale, with a shareable result link.",
      inLanguage: "en",
      datePublished: "2026-04-10",
      dateModified: "2026-09-10",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/education/cgpa-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/education/cgpa-calculator#app",
      name: "CGPA Calculator",
      url: "https://www.lizocalc.com/calculators/education/cgpa-calculator",
      description:
        "Free CGPA calculator that computes cumulative GPA from semester GPAs and credit hours, on any grading scale.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "CGPA Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate cumulative GPA from semester GPAs and credit hours",
        "Works on 4.0, 5.0, 10.0, or percentage grading scales",
        "Target CGPA planner for remaining semesters",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "what-is-cgpa", label: "What CGPA Measures" },
  { id: "cgpa-formula", label: "The CGPA Formula" },
  { id: "how-to-calculate", label: "How to Calculate CGPA" },
  { id: "worked-example", label: "A Worked Example" },
  { id: "cgpa-vs-gpa-vs-sgpa", label: "CGPA vs GPA vs SGPA" },
  { id: "grading-scales", label: "4.0, 5.0, and 10.0 Scales" },
  { id: "f-grades-retakes", label: "F Grades and Retakes" },
  { id: "common-mistakes", label: "Common Calculation Mistakes" },
];

const scaleTable = [
  { grade: "A / A+", range: "93–100%", gpa: "4.0" },
  { grade: "A-", range: "90–92%", gpa: "3.7" },
  { grade: "B+", range: "87–89%", gpa: "3.3" },
  { grade: "B", range: "83–86%", gpa: "3.0" },
  { grade: "B-", range: "80–82%", gpa: "2.7" },
  { grade: "C+", range: "77–79%", gpa: "2.3" },
  { grade: "C", range: "73–76%", gpa: "2.0" },
  { grade: "D", range: "60–69%", gpa: "1.0" },
  { grade: "F", range: "Below 60%", gpa: "0.0" },
];

export default function GPAPage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-cgpa-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            CGPA Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Work out your cumulative GPA from semester grades and credit
            hours, on any grading scale.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator */}
      <section className="px-4 py-8">
        <CGPACalculator />
      </section>

      {/* Quick answer box, written for people scanning fast or landing from a search snippet */}
      <section className="px-4 pb-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950 via-gray-950 to-gray-950 border border-blue-500/30 rounded-3xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            CGPA Quick Answer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div>
              <h3 className="text-blue-400 font-semibold mb-3">
                What is CGPA?
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                CGPA is your GPA across every semester so far, weighted by
                how many credit hours each semester carried.
              </p>
            </div>

            <div>
              <h3 className="text-blue-400 font-semibold mb-3">CGPA Formula</h3>
              <div className="bg-gray-900 p-4 rounded-xl text-green-400 text-sm font-mono border border-gray-700">
                CGPA = Σ (SGPA × Credits) ÷ Total Credits
              </div>
              <ul className="mt-4 text-gray-400 text-sm space-y-1">
                <li>SGPA: semester GPA</li>
                <li>Credits: credit hours for that semester</li>
                <li>Σ: sum across all semesters</li>
              </ul>
            </div>

            <div>
              <h3 className="text-blue-400 font-semibold mb-3">Example</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Semester 1: 3.8 GPA, 20 credits
                <br />
                Semester 2: 3.4 GPA, 22 credits
              </p>
              <p className="text-yellow-400 font-semibold mt-2 text-sm">
                CGPA = (3.8×20 + 3.4×22) ÷ 42 = 3.59
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6">
            <h3 className="text-blue-400 font-semibold mb-3">
              CGPA Range Guide (4.0 Scale)
            </h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>3.5 – 4.0: usually the cutoff for honors lists and scholarships</li>
              <li>3.0 – 3.5: the minimum most employers screen for</li>
              <li>2.5 – 3.0: below the typical honors and scholarship threshold</li>
              <li>Below 2.5: many programs require academic probation review at this range</li>
            </ul>
            <p className="text-gray-500 text-xs mt-3">
              Thresholds vary by university. Check your school's academic
              policy for the exact numbers that apply to you.
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white selection:bg-blue-500/30">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A CGPA calculator adds up your grade points from every semester,
          weights them by credit hours, and divides by your total credits.
          The math is simple. Doing it by hand across 6 or 8 semesters is
          where people make mistakes, usually by forgetting to weight a
          semester properly or mixing two different grading scales. This
          tool does the weighting for you and gives a shareable link so you
          can send the exact result to someone else.
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

        {/* What CGPA measures */}
        <section id="what-is-cgpa" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What CGPA Measures
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            CGPA stands for cumulative grade point average. It's a single
            number that summarizes your academic record from your first
            semester up to now, across every course and every term.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It's different from a plain average of your semester GPAs. A
            semester with 21 credit hours should count for more than one
            with 12, so CGPA weights each semester's GPA by its credit load
            before dividing. Two semesters with the same GPA but different
            credit hours pull the CGPA by different amounts.
          </p>
        </section>

        {/* CGPA formula */}
        <section id="cgpa-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The CGPA Formula
          </h2>

          <div className="md:float-right md:ml-8 mb-6 w-full max-w-[260px] mx-auto md:mx-0">
            <Image
              src="/images/cgpa-formula-diagram.webp"
              alt="CGPA formula diagram: sum of SGPA times credits, divided by total credits"
              width={400}
              height={400}
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            CGPA = Σ (SGPA × Credits) ÷ Total Credits.
          </p>
          <p className="text-gray-200 leading-relaxed text-base clear-none">
            Multiply each semester's GPA by that semester's credit hours to
            get its quality points. Add up the quality points from every
            semester, then divide by the total credit hours attempted. The
            result is your CGPA. This is exactly what the calculator above
            does when you press Calculate CGPA.
          </p>
        </section>

        {/* How to calculate */}
        <section id="how-to-calculate" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate CGPA
          </h2>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>List every semester you've completed, with that semester's GPA and its total credit hours.</li>
              <li>Multiply each semester's GPA by its credit hours to get quality points for that semester.</li>
              <li>Add the quality points from all semesters together.</li>
              <li>Add the credit hours from all semesters together.</li>
              <li>Divide total quality points by total credit hours. That's your CGPA.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Round only the final answer. Rounding each semester's quality
            points before adding them up introduces small errors that add up
            across 6 or more semesters.
          </p>
        </section>

        {/* Worked example */}
        <section id="worked-example" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Example
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The calculator above loads with 3 sample semesters. Here's the
            math behind that starting example.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Semester</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">GPA</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Credits</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Quality Points</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-3 text-gray-200">Semester 1</td>
                  <td className="px-6 py-3 text-gray-200">3.45</td>
                  <td className="px-6 py-3 text-gray-200">15</td>
                  <td className="px-6 py-3 text-gray-200">51.75</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Semester 2</td>
                  <td className="px-6 py-3 text-gray-200">3.70</td>
                  <td className="px-6 py-3 text-gray-200">16</td>
                  <td className="px-6 py-3 text-gray-200">59.20</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Semester 3</td>
                  <td className="px-6 py-3 text-gray-200">3.20</td>
                  <td className="px-6 py-3 text-gray-200">14</td>
                  <td className="px-6 py-3 text-gray-200">44.80</td>
                </tr>
                <tr className="font-bold bg-blue-900/40">
                  <td className="px-6 py-3">Total</td>
                  <td className="px-6 py-3">—</td>
                  <td className="px-6 py-3">45</td>
                  <td className="px-6 py-3">155.75</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            155.75 divided by 45 credits gives a CGPA of 3.461. Notice
            Semester 2 pulls the average up the most, not because it has the
            highest GPA by much, but because it carries the most credit
            hours.
          </p>
        </section>

        {/* CGPA vs GPA vs SGPA */}
        <section id="cgpa-vs-gpa-vs-sgpa" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            CGPA vs GPA vs SGPA
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            These three terms get used loosely, and that's where a lot of
            confusion starts.
          </p>
          <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 space-y-3">
            <p className="text-gray-200">
              <strong>SGPA</strong> is your grade point average for one
              semester only, based on that semester's courses and credits.
            </p>
            <p className="text-gray-200">
              <strong>GPA</strong> is used two ways depending on context: it
              can mean the same thing as SGPA (one term), or it can mean
              your overall average, which is what most US transcripts
              actually show.
            </p>
            <p className="text-gray-200">
              <strong>CGPA</strong> always means cumulative: every semester
              you've completed, combined into one weighted number.
            </p>
          </div>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            You need your SGPA for each semester before you can find your
            CGPA. Use the{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              GPA calculator
            </Link>{" "}
            to get a single semester's number first if you don't already
            have it from your transcript.
          </p>
        </section>

        {/* Grading scales */}
        <section id="grading-scales" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            4.0, 5.0, and 10.0 Scales
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The 4.0 scale is common in the US and Canada. Many universities
            in India, Pakistan, and parts of Europe use a 10.0 scale
            instead, and a handful of weighted-honors systems run on a 5.0
            scale. There's no single global standard.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The calculator above doesn't force a scale. It just multiplies
            whatever GPA number you enter by credit hours and divides by
            total credits, so it works the same way whether your transcript
            uses 4.0, 5.0, 10.0, or a percentage. Just keep every semester
            you enter on the same scale as the others.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead className="bg-blue-600 text-white font-bold uppercase text-xs md:text-sm">
                <tr>
                  <th className="p-4 md:p-6 whitespace-nowrap">Letter Grade</th>
                  <th className="p-4 md:p-6 whitespace-nowrap">Percentage Range</th>
                  <th className="p-4 md:p-6 text-center whitespace-nowrap">4.0 Scale GPA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {scaleTable.map((row) => (
                  <tr key={row.grade} className="hover:bg-blue-500/10 transition-colors">
                    <td className="p-4 md:p-6 font-bold whitespace-nowrap">{row.grade}</td>
                    <td className="p-4 md:p-6 whitespace-nowrap text-gray-300">{row.range}</td>
                    <td className="p-4 md:p-6 text-center text-green-400 font-mono">{row.gpa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            This table is a common US 4.0 mapping. Your school's official
            scale is on the back of your transcript and can differ from
            this one.
          </p>
        </section>

        {/* F grades and retakes */}
        <section id="f-grades-retakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            F Grades and Retakes
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            An F is worth 0 grade points, but the credit hours for that
            course still count in the denominator. A 3-credit F in an
            otherwise strong semester lowers that semester's GPA more than
            people expect, because it adds 0 quality points while still
            adding 3 credits to the total.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            If you retake the course, most universities apply grade
            replacement: the new grade replaces the F in your CGPA
            calculation, though the original attempt usually still shows on
            your transcript. Some schools average the two attempts instead
            of replacing. Check your school's specific retake policy before
            assuming which applies.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            After a rough semester, the Target CGPA planner below the
            calculator works out the GPA you'd need across your remaining
            credits to still hit a specific goal.
          </p>
        </section>

        {/* Common mistakes */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Calculation Mistakes
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Averaging GPAs without weighting
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adding up 4 semester GPAs and dividing by 4 only works if
                every semester carried the same credit hours. If they
                didn't, that number is off, sometimes by a lot.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Mixing grading scales
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A transfer semester on a 10.0 scale mixed in with semesters
                on a 4.0 scale produces a meaningless average. Convert
                everything to one scale first.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Dropping failed courses from the total
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Leaving out an F's credit hours because the course "didn't
                count" inflates the CGPA. Unless your school's policy says
                otherwise, those credits stay in the denominator.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Rounding too early
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Rounding each semester's quality points before summing them
                compounds error across a full transcript. Round only the
                final CGPA.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-4 mb-16">
          <h2 className="text-2xl font-bold text-blue-500 mb-4">
            Related calculators
          </h2>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/education/gpa-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                GPA Calculator
              </Link>{" "}
              — find a single semester's GPA from course grades and credits
            </li>
            <li>
              <Link
                href="/calculators/education/grade-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Grade Calculator
              </Link>{" "}
              — work out the grade you need on remaining assignments and exams
            </li>
          </ul>
        </section>

         <section className="px-4 mt-16 flex justify-center">
                 <SimilarCalculators
                   title="Similar Education Calculators"
                   links={[
                     { label: "Grade Calculator", href: "/calculators/education/grade-calculator" },
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