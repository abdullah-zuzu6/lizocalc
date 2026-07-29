import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grade & GPA Guides That Actually Help|Blogs",
  description:
    "The formulas behind your GPA and final grade, explained the way we wish a teacher had explained them the first time.",
  keywords: [
    "education blogs",
    "grade calculator guide",
    "final grade calculator",
    "study tips",
    "gpa calculator",
    "lizocalc education",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/education",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Grade & GPA Guides That Actually Help | LizoCalc",
    description:
      "Read helpful education blogs including final grade calculation, GPA tips, and study strategies.",
    url: "https://www.lizocalc.com/blogs/education",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "How to Calculate Final Grade Before Exams",
    slug: "how-to-calculate-final-grade",
    description:
      "Learn how to calculate your final grade step by step using formulas, examples, and grade percentages.",
    date: "May 1, 2026",
    readTime: "6 min read",
  },
];

export default function EducationBlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Education
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            Education Blog Guides
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground">
            Helpful guides for grades, GPA, exams, study planning, and academic
            calculators.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>

          <Link href="/blogs/education/how-to-calculate-final-grade">
            <div className="border border-border rounded-2xl p-8 bg-card hover:shadow-xl transition-all">
              <p className="text-primary font-medium mb-2">Featured</p>

              <h2 className="text-3xl font-bold mb-3">
                How to Calculate Final Grade Before Exams
              </h2>

              <p className="text-muted-foreground mb-4">
                Learn the exact formula, weighted grade system, and examples to
                predict your exam result before finals.
              </p>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>May 1, 2026</span>
                <span>6 min read</span>
              </div>
            </div>
          </Link>
        </div>

        {/* What we cover here */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">What we actually cover here</h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            Grades feel simple right up until you&apos;re the one staring at a
            spreadsheet with credit hours in one column and letter grades in
            another, trying to figure out what you need on a final to keep a
            scholarship. We&apos;ve sat with that exact spreadsheet enough
            times to know that people rarely get tripped up by the arithmetic
            itself. It&apos;s the assumptions underneath the arithmetic that
            cause the confusion — whether a Pass/Fail course counts toward
            GPA at all, whether your school rounds a 2.951 up to a 3.0 or
            truncates it, whether a retaken course replaces the old grade in
            your{" "}
            <Link
              href="/calculators/education/cgpa-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              cumulative GPA
            </Link>{" "}
            or just sits alongside it.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            A lot of that comes down to which system you&apos;re in. A
            student working through FSc or A-Levels in Pakistan is dealing
            with a different conversion table than a first-year at a US state
            school, and both of those differ again from a UK university using
            classification bands instead of a 4.0 scale. We try to be
            specific about which system a guide applies to rather than
            flattening everything into one universal formula that quietly
            doesn&apos;t match your transcript. Our{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              GPA Calculator
            </Link>{" "}
            handles both weighted and unweighted scales for exactly this
            reason.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            The GPA formula itself is genuinely simple — multiply each
            grade&apos;s point value by its credit hours, add those up, and
            divide by total credits. What&apos;s not simple is everything
            around that formula: how a{" "}
            <Link
              href="/calculators/education/weighted-grade-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              weighted course
            </Link>{" "}
            like AP or IB shifts the scale upward, how a single
            semester&apos;s{" "}
            <Link
              href="/calculators/education/grade-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              grade
            </Link>{" "}
            gets folded into a cumulative figure across four years, and how
            much a 4-credit core course can move your average compared to a
            1-credit elective. Most of the confusion we hear about
            isn&apos;t "what&apos;s the formula," it&apos;s "why doesn&apos;t
            my number match what I expected," and that second question
            usually has a specific, findable answer.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            Final grade calculation runs into a similar issue, just from a
            different angle. Most students know their current grade is some
            average of assignments, quizzes, and exams — but almost nobody
            has actually done the algebra to figure out what score they need
            on the last exam to land at a specific final grade, especially
            once you factor in that the final might be worth 30% or 40% of
            the total rather than counting equally with everything else. Our{" "}
            <Link
              href="/calculators/education/final-grade-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Final Grade Calculator
            </Link>{" "}
            solves exactly that equation, and it&apos;s one of the most
            useful things you can work out before walking into an exam
            rather than after.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Going forward, this section will expand to cover things like
            weighted grade scales in more depth, how GPA requirements for
            specific scholarships and university programs actually work, and
            the mechanics of academic probation and grade forgiveness
            policies — the kind of questions that come up right before a
            deadline, not the kind you&apos;d find in a general textbook
            chapter on grading. If you want the full set of tools rather than
            reading through the reasoning first, our{" "}
            <Link
              href="/calculators/education"
              className="text-blue-400 underline hover:text-blue-300"
            >
              education calculators
            </Link>{" "}
            page lists all five in one place, alongside our{" "}
            <Link
              href="/calculators"
              className="text-blue-400 underline hover:text-blue-300"
            >
              full calculator directory
            </Link>
            .
          </p>
        </section>

        {/* Latest Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/education/${blog.slug}`}
              >
                <article className="border border-border rounded-xl p-6 bg-card hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold mb-2">{blog.title}</h3>

                  <p className="text-muted-foreground text-sm mb-4">
                    {blog.description}
                  </p>

                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* More topics */}
        <div className="mt-14 max-w-3xl">
          <p className="text-gray-200 leading-relaxed">
            Working on a money question alongside your academics? Our{" "}
            <Link
              href="/blogs/finance"
              className="text-blue-400 underline hover:text-blue-300"
            >
              finance guides
            </Link>{" "}
            cover loans and interest, and our{" "}
            <Link
              href="/blogs/health"
              className="text-blue-400 underline hover:text-blue-300"
            >
              health guides
            </Link>{" "}
            cover BMI and related metrics.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try Education Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Calculate grades, GPA, percentages, and more instantly.
            </p>

            <Link href="/calculators/education">
              <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90">
                Explore Calculators
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}