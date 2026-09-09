import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import GPACalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "GPA Calculator – Find Your Grade Point Average Instantly",
  description:
    "Calculate your GPA from letter grades and credit hours, see the quality-point math behind the number, and find out what grades you need going forward. Free, no sign-up.",
  keywords: [
    "GPA calculator",
    "grade point average calculator",
    "how to calculate GPA",
    "cumulative GPA calculator",
    "4.0 scale GPA converter",
    "college GPA calculator",
    "high school GPA calculator",
    "GPA planning calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/education/gpa-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "GPA Calculator – Find Your Grade Point Average Instantly",
    description:
      "Enter your courses, credits, and grades to get your GPA, then use the built-in planner to see what you need going forward.",
    url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GPA Calculator – Find Your Grade Point Average Instantly",
    description:
      "Free GPA calculator with a quality-point breakdown and a planner for future semesters.",
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
      "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Education", item: "https://www.lizocalc.com/calculators/education" },
        { "@type": "ListItem", position: 4, name: "GPA Calculator", item: "https://www.lizocalc.com/calculators/education/gpa-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator",
      url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
      name: "GPA Calculator – Find Your Grade Point Average Instantly | LizoCalc",
      description:
        "Free online GPA calculator. Enter courses, credit hours, and letter grades to get your GPA, the quality-point math behind it, and a planner for future semesters.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-09-10",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/education/gpa-calculator#app",
      name: "GPA Calculator",
      url: "https://www.lizocalc.com/calculators/education/gpa-calculator",
      description:
        "Free GPA calculator that converts letter grades and credit hours into a 4.0-scale grade point average.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "GPA Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Calculate GPA from letter grades and credit hours",
        "Quality-point breakdown per course",
        "Built-in planner for future semester GPA targets",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "how-to-use", label: "How to Use the GPA Calculator" },
  { id: "what-is-gpa", label: "What Is GPA" },
  { id: "gpa-formula", label: "The GPA Formula" },
  { id: "grade-conversion-table", label: "Letter Grade to GPA Table" },
  { id: "weighted-vs-unweighted", label: "Weighted vs Unweighted GPA" },
  { id: "semester-vs-cumulative", label: "Semester GPA vs Cumulative GPA" },
  { id: "worked-example", label: "Worked Example" },
  { id: "planning-ahead", label: "Planning Your Future GPA" },
];

const gradeTable = [
  { letter: "A+ / A", points: "4.0" },
  { letter: "A-", points: "3.7" },
  { letter: "B+", points: "3.3" },
  { letter: "B", points: "3.0" },
  { letter: "B-", points: "2.7" },
  { letter: "C+", points: "2.3" },
  { letter: "C", points: "2.0" },
  { letter: "C-", points: "1.7" },
  { letter: "D+", points: "1.3" },
  { letter: "D", points: "1.0" },
  { letter: "D-", points: "0.7" },
  { letter: "F", points: "0.0" },
];

export default function GPAPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        id="structured-data-gpa-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">GPA Calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Add your courses, credits, and grades to get your GPA on a 4.0 scale, then
            plan out what you need in future semesters.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <GPACalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A GPA calculator turns your letter grades and credit hours into a single number
          on a 4.0 scale. Add a row for each course, pick the grade you got, and it totals
          the quality points and divides by your credits, the same math your registrar
          runs at the end of every term.
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
            How to Use the GPA Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Type a course name if you want one, set its credit hours, and pick the grade
            from the dropdown. Hit "+ add more courses" for extra rows, or the trash icon
            to drop one you don't need.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Click Calculate Now and your GPA shows up with the total credits it's based
            on. From there you can copy the number, copy a share link that reproduces
            your exact course list for anyone who opens it, or scroll down to the planner
            to see what you'd need in upcoming credits to hit a target.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Your entries save automatically in your browser, so if you close the tab and
            come back later, your courses are still there.
          </p>
        </section>

        {/* What is GPA */}
        <section id="what-is-gpa" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is GPA
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            GPA stands for grade point average. It converts every letter grade you earn
            into a number, weights it by how many credit hours the course was worth, and
            averages the whole thing into a single score, usually somewhere between 0.0
            and 4.0.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A 3-credit course counts three times as much toward your GPA as a 1-credit
            course. That's the part people forget: a B+ in a 4-credit lab class moves
            your GPA a lot more than an A in a 1-credit seminar does.
          </p>
        </section>

        {/* GPA formula */}
        <section id="gpa-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The GPA Formula
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Each grade first gets multiplied by its credit hours to give you quality
            points. Add up the quality points from every course, then divide by your
            total credits.
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose mb-4">
{`Quality Points = Grade Points × Credit Hours
GPA = Total Quality Points ÷ Total Credits`}
          </pre>
          <p className="text-gray-200 leading-relaxed text-base">
            Grade points come from a conversion table, not straight from the letter
            itself. The table below is the same one this calculator uses.
          </p>
        </section>

        {/* Grade conversion table */}
        <section id="grade-conversion-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Letter Grade to GPA Table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            This is the standard 4.0 scale most US colleges use. Some schools round A-
            up to a full 4.0 instead of 3.7, so check your registrar's page if your
            number needs to match a transcript exactly.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Letter Grade
                  </th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Grade Points
                  </th>
                </tr>
              </thead>
              <tbody>
                {gradeTable.map((row, index) => (
                  <tr
                    key={row.letter}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"}
                  >
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
        </section>

        {/* Weighted vs unweighted */}
        <section id="weighted-vs-unweighted" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weighted vs Unweighted GPA
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            An unweighted GPA treats every course the same: an A is 4.0 whether it's gym
            class or AP Chemistry. A weighted GPA adds extra points for harder courses,
            typically +0.5 for honors and +1.0 for AP or IB, so an A in AP Chemistry can
            count as a 5.0 instead of a 4.0.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This calculator runs the standard unweighted scale. If your school weights
            advanced courses, bump that course's grade up before you enter it, for
            example pick a higher grade to approximate the bonus, or do the addition on
            paper and enter the adjusted quality points separately. Weighted GPAs above
            4.0 are normal and don't mean the number is wrong.
          </p>
        </section>

        {/* Semester vs cumulative */}
        <section id="semester-vs-cumulative" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Semester GPA vs Cumulative GPA
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The math doesn't change between the two. Only which courses you type in
            does.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            List just this term's courses and you get your semester GPA. List every
            course you've taken since you started, across every term, and you get your
            cumulative GPA. If you already know last semester's GPA and total credits,
            you don't need to re-enter every old course, the planner further down lets
            you start from that number instead.
          </p>
        </section>

        {/* Worked example */}
        <section id="worked-example" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Four courses: Biology, 4 credits, grade A. Calculus, 3 credits, grade B+.
            History, 3 credits, grade B-. Spanish, 2 credits, grade A-.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Course</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Credits</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Grade</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Quality Points</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-3 text-gray-200">Biology</td>
                  <td className="px-6 py-3 text-gray-200">4</td>
                  <td className="px-6 py-3 text-gray-200">A (4.0)</td>
                  <td className="px-6 py-3 text-gray-200">16.0</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Calculus</td>
                  <td className="px-6 py-3 text-gray-200">3</td>
                  <td className="px-6 py-3 text-gray-200">B+ (3.3)</td>
                  <td className="px-6 py-3 text-gray-200">9.9</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">History</td>
                  <td className="px-6 py-3 text-gray-200">3</td>
                  <td className="px-6 py-3 text-gray-200">B- (2.7)</td>
                  <td className="px-6 py-3 text-gray-200">8.1</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">Spanish</td>
                  <td className="px-6 py-3 text-gray-200">2</td>
                  <td className="px-6 py-3 text-gray-200">A- (3.7)</td>
                  <td className="px-6 py-3 text-gray-200">7.4</td>
                </tr>
                <tr className="font-bold bg-blue-900/40">
                  <td colSpan={3} className="px-6 py-3 text-right">Totals</td>
                  <td className="px-6 py-3">41.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            12 total credits, 41.4 total quality points. 41.4 ÷ 12 = 3.45. Punch these
            same four courses into the calculator above and you'll get the same 3.450.
          </p>
        </section>

        {/* Planning ahead */}
        <section id="planning-ahead" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Planning Your Future GPA
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Working out where your GPA already stands is only half the question. The
            "Plan Your Future GPA" tool above does the other half: tell it your current
            GPA, your current credits, the GPA you're aiming for, and how many credits
            you have left, and it tells you the average you need across those remaining
            credits.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Example: you're sitting at a 3.2 after 60 credits and want to graduate at a
            3.5 with 30 credits left. The planner works out that you'd need roughly a
            4.1 average across those last 30 credits, above a 4.0 ceiling, so it flags
            the target as out of reach and shows you the real number instead of a false
            "yes."
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you just calculated a GPA above, click "Use my calculated GPA above" in
            the planner and it fills in the current GPA and credits for you, so you're
            not retyping numbers you already have.
          </p>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            Working from percentage grades instead of letters? The{" "}
            <Link
              href="/calculators/math/percentage-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              percentage calculator
            </Link>{" "}
            handles the conversion math, and the{" "}
            <Link
              href="/calculators/education/grade-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              grade calculator
            </Link>{" "}
            is built for weighting individual assignments and exams within one course,
            rather than averaging whole courses together.
          </p>
        </section>

        <section className="px-4 mt-16 flex justify-center">
          <SimilarCalculators
            title="Similar Education Calculators"
            links={[
              { label: "CGPA Calculator", href: "/calculators/education/cgpa-calculator" },
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