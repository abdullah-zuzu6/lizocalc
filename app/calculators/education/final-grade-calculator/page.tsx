import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import FinalGradeCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Final Grade Calculator – What Score Do You Need on Your Final?",
  description:
    "Calculate your final course grade from weighted components, or work backward to find the exact score you need on your final exam to hit a target grade. Free, no sign-up.",
  keywords: [
    "final grade calculator",
    "what do i need on my final exam",
    "required final exam score",
    "weighted grade calculator",
    "course grade calculator",
    "how to calculate final grade",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Final Grade Calculator – What Score Do You Need on Your Final?",
    description:
      "Weigh your assignments, quizzes, and exams into a final grade, or solve backward for the score you need on your final exam.",
    url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Final Grade Calculator – What Score Do You Need on Your Final?",
    description:
      "Free final grade calculator with a built-in solver for the exact score you need on your final exam.",
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
      "@id": "https://www.lizocalc.com/calculators/education/final-grade-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Education", item: "https://www.lizocalc.com/calculators/education" },
        { "@type": "ListItem", position: 4, name: "Final Grade Calculator", item: "https://www.lizocalc.com/calculators/education/final-grade-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/education/final-grade-calculator",
      url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
      name: "Final Grade Calculator – What Score Do You Need on Your Final? | LizoCalc",
      description:
        "Free online final grade calculator. Weigh assignments, quizzes, and exams into a final grade, or solve backward for the score you need on your final exam.",
      inLanguage: "en",
      datePublished: "2026-05-01",
      dateModified: "2026-09-10",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/education/final-grade-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/education/final-grade-calculator#app",
      name: "Final Grade Calculator",
      url: "https://www.lizocalc.com/calculators/education/final-grade-calculator",
      description:
        "Free final grade calculator for weighing components into a course grade and solving for the score needed on a remaining final exam.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Final Grade Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate final course grade from weighted components",
        "Solve backward for the score needed on a final exam",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "how-to-use", label: "How to Use This Calculator" },
  { id: "what-is-it", label: "What a Final Grade Calculator Does" },
  { id: "the-formulas", label: "The Two Formulas" },
  { id: "worked-example", label: "Worked Example" },
  { id: "required-score-example", label: "Solving for a Required Score" },
  { id: "weighted-vs-unweighted", label: "Weighted vs Unweighted Grading" },
  { id: "grade-table", label: "Percentage to Letter Grade Table" },
];

const gradeTable = [
  { range: "97 – 100%", letter: "A+", points: "4.0" },
  { range: "93 – 96%", letter: "A", points: "4.0" },
  { range: "90 – 92%", letter: "A-", points: "3.7" },
  { range: "87 – 89%", letter: "B+", points: "3.3" },
  { range: "83 – 86%", letter: "B", points: "3.0" },
  { range: "80 – 82%", letter: "B-", points: "2.7" },
  { range: "77 – 79%", letter: "C+", points: "2.3" },
  { range: "73 – 76%", letter: "C", points: "2.0" },
  { range: "70 – 72%", letter: "C-", points: "1.7" },
  { range: "67 – 69%", letter: "D+", points: "1.3" },
  { range: "60 – 66%", letter: "D", points: "1.0" },
  { range: "Below 60%", letter: "F", points: "0.0" },
];

export default function FinalGradePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        id="structured-data-final-grade-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Final Grade Calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Weigh your assignments, quizzes, and exams into a final grade, or find the
            exact score you need on your final exam to hit a target.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <FinalGradeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A final grade calculator turns a list of weighted scores, assignments, quizzes,
          a midterm, a final exam, into one course grade. This page has two tools for
          that: the calculator above works forward from scores you already have, and the
          solver underneath it works backward from a grade you're aiming for to tell you
          what you need on the final.
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

        {/* How to use */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use This Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            In the main tool, add a row for each graded component, its weight as a
            percentage, and the score you got. Add or remove rows as needed, then hit
            Calculate Final Grade. Your weights should add up to 100%, the tool tells you
            if they don't.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Once you have a result, you can copy the number, or copy a share link that
            reproduces your exact component list for anyone who opens it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you haven't taken your final exam yet and want to know what score you need,
            skip straight to the second tool. Enter your grade going into the final, the
            final's weight, and your target grade, and it solves for the score directly.
          </p>
        </section>

        {/* What it does */}
        <section id="what-is-it" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What a Final Grade Calculator Does
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Most courses don't average every assignment equally. A final exam worth 40%
            of your grade matters far more than a quiz worth 5%, so a simple average of
            your scores gives you the wrong number. Weighted grading fixes that by
            multiplying each score by its share of the total before adding everything up.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This matters most right before a final exam, when you don't have a complete
            grade yet and want to know what's actually at stake. A 20-point gap between a
            60% and an 80% final exam score can mean the difference between a B and a C
            depending on how much weight that exam carries.
          </p>
        </section>

        {/* Formulas */}
        <section id="the-formulas" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Two Formulas
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Everything on this page comes down to two formulas, depending on which
            direction you're solving.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            Final grade from known scores
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose mb-6">
{`Final Grade = Σ(Score × Weight) ÷ Σ(Weight)`}
          </pre>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">
            Required score on the final
          </h3>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`Required Final = (Target Grade − Current Grade × Coursework Weight) ÷ Final Weight

Coursework Weight = 1 − Final Weight`}
          </pre>
        </section>

        {/* Worked example */}
        <section id="worked-example" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Four components: assignments at 20% (scored 88), quizzes at 15% (scored 92),
            a midterm at 25% (scored 76), and a final exam at 40% (scored 85). These are
            the calculator's default numbers, so you can check your own math against it.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Component</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Weight</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Score</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Contribution</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-3 text-gray-200">Assignments</td>
                  <td className="px-6 py-3 text-gray-200">20%</td>
                  <td className="px-6 py-3 text-gray-200">88%</td>
                  <td className="px-6 py-3 text-gray-200">17.6</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Quizzes</td>
                  <td className="px-6 py-3 text-gray-200">15%</td>
                  <td className="px-6 py-3 text-gray-200">92%</td>
                  <td className="px-6 py-3 text-gray-200">13.8</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Midterm Exam</td>
                  <td className="px-6 py-3 text-gray-200">25%</td>
                  <td className="px-6 py-3 text-gray-200">76%</td>
                  <td className="px-6 py-3 text-gray-200">19.0</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Final Exam</td>
                  <td className="px-6 py-3 text-gray-200">40%</td>
                  <td className="px-6 py-3 text-gray-200">85%</td>
                  <td className="px-6 py-3 text-gray-200">34.0</td>
                </tr>
                <tr className="font-bold bg-blue-900/40">
                  <td colSpan={3} className="px-6 py-3 text-right">Total</td>
                  <td className="px-6 py-3">84.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            The weights add up to 100%, so nothing needs adjusting. 17.6 + 13.8 + 19.0 +
            34.0 = 84.4%.
          </p>
        </section>

        {/* Required score example */}
        <section id="required-score-example" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving for a Required Score
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Say you're sitting at an 86% going into finals, the final is worth 30% of
            your grade, and you want a 90% overall.
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose mb-4">
{`Coursework Weight = 1 − 0.30 = 0.70
Required Final = (90 − 86 × 0.70) ÷ 0.30
               = (90 − 60.2) ÷ 0.30
               = 99.3%`}
          </pre>
          <p className="text-gray-200 leading-relaxed text-base">
            You'd need a 99.3% on the final. If that feels out of reach, try the same
            numbers with a target of 85 instead of 90, the solver above will show you a
            more realistic score.
          </p>
        </section>

        {/* Weighted vs unweighted */}
        <section id="weighted-vs-unweighted" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weighted vs Unweighted Grading
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Unweighted grading treats every score the same and just averages them.
            Weighted grading assigns each component a share of the total grade, so a
            final worth 40% has eight times the pull of a quiz worth 5%.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Most college and university courses use weighted grading, which is why this
            tool asks for a weight next to every score instead of just averaging them.
            Check your syllabus if you're not sure which one your course uses, it's
            usually spelled out under the grading policy.
          </p>
        </section>

        {/* Grade table */}
        <section id="grade-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Percentage to Letter Grade Table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A common 4.0-scale conversion, once you have your final percentage. Schools
            vary, some round A- up to a full 4.0, some set the pass mark lower than 60%,
            so check your syllabus if the number needs to match a transcript exactly.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Percentage</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Letter Grade</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Grade Points</th>
                </tr>
              </thead>
              <tbody>
                {gradeTable.map((row, index) => (
                  <tr
                    key={row.letter}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"}
                  >
                    <td className="px-6 py-3 text-gray-200 text-base border-b border-gray-700/60">
                      {row.range}
                    </td>
                    <td className="px-6 py-3 text-gray-200 text-base border-b border-gray-700/60">
                      {row.letter}
                    </td>
                    <td className="px-6 py-3 text-gray-200 text-base font-mono border-b border-gray-700/60">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Once you have a percentage, the{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              GPA calculator
            </Link>{" "}
            turns a full course list into a single grade point average.
          </p>
        </section>

        <section className="px-4 mt-16 flex justify-center">
          <SimilarCalculators
            title="Similar Education Calculators"
            links={[
              { label: "GPA Calculator", href: "/calculators/education/gpa-calculator" },
              { label: "CGPA Calculator", href: "/calculators/education/cgpa-calculator" },
              { label: "Grade Calculator", href: "/calculators/education/grade-calculator" },
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