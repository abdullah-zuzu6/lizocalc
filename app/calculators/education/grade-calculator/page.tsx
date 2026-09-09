import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import AdvancedGradeCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Grade Calculator – Weighted Grade & Final Exam Predictor",
  description:
    "Calculate your weighted grade from assignments, quizzes, and exams. Enter grades as a number or a letter, find what you need on the final, and share the result with a link.",
  keywords: [
    "grade calculator",
    "weighted grade calculator",
    "final grade calculator",
    "what grade do I need on my final",
    "class grade tracker",
    "semester grade calculator",
    "college grade calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/grade-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Grade Calculator – Weighted Grade & Final Exam Predictor",
    description:
      "Enter assignment grades and weights to get your current grade instantly, then find the score you need on remaining work.",
    url: "https://www.lizocalc.com/calculators/education/grade-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grade Calculator – Weighted Grade & Final Exam Predictor",
    description:
      "Free weighted grade calculator. Get your current grade and the score you need on what's left.",
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
      "@id": "https://www.lizocalc.com/calculators/education/grade-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Education", item: "https://www.lizocalc.com/calculators/education" },
        { "@type": "ListItem", position: 4, name: "Grade Calculator", item: "https://www.lizocalc.com/calculators/education/grade-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/education/grade-calculator",
      url: "https://www.lizocalc.com/calculators/education/grade-calculator",
      name: "Grade Calculator – Weighted Grade & Final Exam Predictor | LizoCalc",
      description:
        "Calculate a weighted course grade from assignments and exams, and find the score needed on remaining work to hit a target grade.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-09-10",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/education/grade-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/education/grade-calculator#app",
      name: "Grade Calculator",
      url: "https://www.lizocalc.com/calculators/education/grade-calculator",
      description:
        "Free weighted grade calculator that accepts numeric or letter grades and predicts the score needed on remaining work.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Grade Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate weighted grade from assignments, quizzes, and exams",
        "Accepts grades as a number or a letter",
        "Final exam score predictor",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "what-it-calculates", label: "What This Calculates" },
  { id: "weighted-grade-formula", label: "The Weighted Grade Formula" },
  { id: "how-to-use", label: "Entering Grades and Weights" },
  { id: "worked-example", label: "A Worked Example" },
  { id: "final-exam-predictor", label: "Final Exam Predictor" },
  { id: "points-vs-percentage", label: "Points vs Percentage Grading" },
  { id: "zero-impact", label: "How a Zero Affects Your Grade" },
  { id: "common-mistakes", label: "Common Calculation Mistakes" },
];

export default function GradePage() {
  return (
    <main className="min-h-screen bg-background">
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-grade-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Grade Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Work out your current weighted grade, and what you need on
            what's left to hit a target.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <AdvancedGradeCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          This calculator takes your assignment grades and their weights and
          gives you a single current grade, weighted the way your
          instructor actually weights the course. Add a target grade and
          the weight of what's left, and it also tells you the score you
          need on the remaining work. Grades can be entered as a number or
          a letter, so you don't need to convert a B+ to 87 in your head
          before typing it in.
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

        {/* What this calculates */}
        <section id="what-it-calculates" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What This Calculates
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Most courses don't grade everything equally. A final exam
            might be worth 30% of your grade while a homework set is worth
            2%. Averaging your raw scores ignores that difference and gives
            you a number that doesn't match what's on your transcript.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This tool multiplies each grade by its weight instead, so a
            30%-weighted exam actually moves your grade 15 times more than
            a 2%-weighted homework set. That's the same math your school
            uses to post your official grade.
          </p>
        </section>

        {/* Formula */}
        <section id="weighted-grade-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Weighted Grade Formula
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            For each assignment, multiply the grade by its weight. Add
            those up, then divide by the total weight of everything you've
            entered.
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-4 overflow-x-auto">
            Current Grade = Σ (Grade × Weight) ÷ Σ Weight
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Dividing by the total weight entered, not by 100, is what keeps
            the number accurate before the course is finished. If you've
            only been graded on 50% of the course so far, your current
            grade should reflect that 50%, not get diluted by the other
            half that hasn't happened yet.
          </p>
        </section>

        {/* How to use */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Entering Grades and Weights
          </h2>
          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Add a row for each graded item: assignments, quizzes, exams, projects.</li>
              <li>Type the grade as a number (90) or a letter (B+). Both work in the same field.</li>
              <li>Enter that item's weight as a percentage of the total course grade.</li>
              <li>The assignment name is optional. It's there so you can keep track of which row is which.</li>
              <li>Press Calculate to see your current grade.</li>
            </ol>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            The Final Grade Planning fields below the assignment list are
            optional. Leave them blank if you only want your current grade.
            Fill in a goal and the weight of what's left to also see the
            score you need on it.
          </p>
        </section>

        {/* Worked example */}
        <section id="worked-example" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Example
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Say exams are worth 60% of the grade so far and homework is
            worth 40%. Your exam average is 78%, your homework average is
            92%.
          </p>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-2 font-mono text-green-300 mb-4">
            <div>Exams: 78 × 60 = 4,680</div>
            <div>Homework: 92 × 40 = 3,680</div>
            <div className="pt-3 border-t border-gray-600">
              Total = 4,680 + 3,680 = 8,360<br />
              Total weight = 60 + 40 = 100<br />
              Current grade = 8,360 ÷ 100 = <strong>83.6%</strong>
            </div>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Now say the final exam is still ahead, worth 30% of the total
            course grade, and your goal is an 85% overall. The 60/40 split
            above only accounted for 70% of the course, so plug 30 into
            "weight of remaining work" and 85 into the goal field to see
            what you'd need on that final.
          </p>
        </section>

        {/* Final exam predictor */}
        <section id="final-exam-predictor" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Final Exam Predictor
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The required score comes from your goal, your current grade,
            and how much weight is left:
          </p>
          <div className="bg-gray-900/70 p-6 rounded-2xl border border-gray-700 font-mono text-green-300 text-sm mb-6 overflow-x-auto">
            Required % = (Goal − Locked-in contribution) ÷ (Remaining weight ÷ 100)
          </div>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Example: your grade is 72% going into finals, the final is
            worth 35%, and your goal is 85% overall.
          </p>
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-sm space-y-2 font-mono text-green-300">
            <div>Locked-in contribution = 72 × 0.65 = 46.8</div>
            <div>Required = (85 − 46.8) ÷ 0.35 = 109.14%</div>
          </div>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            A required score over 100% means that specific goal isn't
            reachable on the final alone. That's useful to know before
            finals week, not during it: either the goal needs adjusting, or
            the gap needs closing somewhere else, like extra credit if your
            instructor offers it.
          </p>
        </section>

        {/* Points vs percentage */}
        <section id="points-vs-percentage" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Points vs Percentage Grading
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Some courses grade on raw points: total points earned divided
            by total points possible, no separate weight assigned to
            categories. Others grade on weighted percentages, where a
            "Projects" category is worth a fixed 25% of the grade no matter
            how many individual points it contains.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If your course uses raw points, convert each item to a
            percentage first (42 out of 50 is 84%) and give every item
            equal weight. If it's weighted by category, use the actual
            weight from your syllabus for each item.
          </p>
        </section>

        {/* Zero impact */}
        <section id="zero-impact" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How a Zero Affects Your Grade
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A missed assignment scored as 0 pulls harder on your average
            than most people expect, because it still carries its full
            weight. Four scores of 100% and one 0%, all weighted equally,
            average to 80%, not the 95%+ four good scores alone would
            suggest.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Recovering from a zero takes more than one strong score to
            offset. Enter it as 0 in the calculator to see exactly how much
            it's costing you, and what the remaining assignments would need
            to look like to recover.
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
                Averaging scores instead of weighting them
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Adding up raw percentages and dividing by the count only
                works if every item has equal weight. A 40%-weighted final
                and a 2%-weighted quiz are not equal.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Weights that don't add up to 100%
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                If entered assignments plus remaining work don't total
                100%, the required-score projection will be off. Check your
                syllabus weights against what you've entered.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Treating "current grade" as the final grade
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your current grade only reflects work that's been graded so
                far. It will move, sometimes a lot, once the remaining
                weight is filled in with actual scores.
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">
                Forgetting a course's grade-replacement rules
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Some instructors drop your lowest score or let a final exam
                replace a weak midterm. If your syllabus has a rule like
                that, leave the dropped item out of the calculator rather
                than entering it as a zero.
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
              <Link href="/calculators/education/gpa-calculator" className="text-blue-400 underline hover:text-blue-300">
                GPA Calculator
              </Link>{" "}
              — convert course grades to a 4.0-scale semester GPA
            </li>
            <li>
              <Link href="/calculators/education/cgpa-calculator" className="text-blue-400 underline hover:text-blue-300">
                CGPA Calculator
              </Link>{" "}
              — combine semester GPAs into a cumulative GPA
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