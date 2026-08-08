import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs Hub| Guides for School, Money & Health",
  description:
    "Plain-English breakdowns of the math behind grades, loans, and BMI — written by the same people who built the calculators.",
  keywords: [
    "calculator blogs",
    "finance guides",
    "education blogs",
    "health blogs",
    "BMI guide",
    "loan payment guide",
    "final grade guide",
    "LizoCalc blogs",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.lizocalc.com/blogs",
  },
  openGraph: {
    title: "Calculator Guides for School, Money & Health | LizoCalc",
    description:
      "Plain-English guides on grades, loans, and health — written to actually answer the question, not pad a word count.",
    url: "https://www.lizocalc.com/blogs",
    siteName: "LizoCalc",
    type: "website",
  },
};

const categories = [
  { name: "Education", slug: "education" },
  { name: "Finance", slug: "finance" },
  { name: "Health", slug: "health" },
];

const blogs = [
  {
    title: "How to Calculate Final Grade Before Exams",
    slug: "how-to-calculate-final-grade",
    category: "education",
    description:
      "Learn how to calculate final grades using weighted formulas and exam percentages.",
  },
  {
    title: "How to Calculate Your Loan Payment Step by Step",
    slug: "loan-payment-calculate-guide",
    category: "finance",
    description:
      "Calculate loan payments with formulas, amortization schedules, and examples.",
  },
  {
    title: "What Is BMI? Meaning, Formula & BMI Categories",
    slug: "what-is-bmi",
    category: "health",
    description:
      "Understand BMI meaning, formula, healthy BMI ranges, and limitations.",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="px-6 py-12 max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            LizoCalc Blog Hub
          </h1>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore practical guides, formulas, calculators, and step-by-step
            tutorials for education, finance, and health topics.
          </p>
        </div>

        <section className="mb-16 max-w-3xl mx-auto">
          <p className="text-gray-200 leading-relaxed mb-4">
            Most calculator sites bolt a blog onto the homepage because
            somewhere in an SEO checklist it said to. Ours came together the
            other way around. We built the{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              GPA Calculator
            </Link>{" "}
            first, and within a week we were getting messages from students
            asking why their number didn&apos;t match what their university
            registrar had on file. Same thing happened with the{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Loan Calculator
            </Link>{" "}
            — two people would plug in the exact same loan amount, rate, and
            term, and somehow expect different monthly payments, because the
            calculator they used last year rounded differently or compounded
            on a different schedule.
          </p>
          <p className="text-gray-200 leading-relaxed">
            The same pattern shows up around our{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              BMI Calculator
            </Link>{" "}
            too — someone gets a slightly different category on one site
            versus another, not because either calculator is wrong, but
            because the cutoff points different health authorities use
            aren&apos;t identical. Even something as basic as our{" "}
            <Link
              href="/calculators/math/percentage-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Percentage Calculator
            </Link>{" "}
            gets questions like this, usually from someone comparing a result
            against a different tool that rounds at a different decimal
            place.
          </p>
        </section>

        {/* Categories */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/blogs/${cat.slug}`}>
                <div className="p-6 rounded-xl border border-border bg-card hover:shadow-lg transition-all hover:scale-[1.02]">
                  <h3 className="text-lg font-semibold">{cat.name}</h3>

                  <p className="text-sm text-muted-foreground mt-2">
                    Explore {cat.name} articles
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.category}/${blog.slug}`}
              >
                <article className="p-6 rounded-xl border border-border bg-card hover:shadow-xl transition-all hover:scale-[1.02]">
                  <span className="text-sm font-medium text-primary uppercase">
                    {blog.category}
                  </span>

                  <h3 className="text-xl font-bold mt-2 mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-muted-foreground text-sm">
                    {blog.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 mt-5 max-w-3xl mx-auto">
          <p className="text-gray-200 leading-relaxed mb-4">
            None of that is a bug. It&apos;s just that the plain formulas
            everyone assumes are universal actually have a handful of
            variations baked in — how a school rounds a 2.95, whether a bank
            compounds monthly or daily on tools like our{" "}
            <Link
              href="/calculators/financial/compound-interest-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Compound Interest Calculator
            </Link>
            , whether a Pass/Fail class even touches your GPA at all, or how
            a{" "}
            <Link
              href="/calculators/education/weighted-grade-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              weighted grade
            </Link>{" "}
            actually shifts once you add an AP or honors course. So instead
            of writing a generic "how to use our calculator" post for each
            tool, we started writing down the actual reasoning: why the
            numbers work the way they do, and where they commonly go
            sideways.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            That&apos;s what you&apos;ll find across the three sections
            below. Our{" "}
            <Link
              href="/blogs/education"
              className="text-blue-400 underline hover:text-blue-300"
            >
              education guides
            </Link>{" "}
            cover grades, GPA, and the credit-hour math that confuses almost
            everyone the first time they see it spelled out. Our{" "}
            <Link
              href="/blogs/finance"
              className="text-blue-400 underline hover:text-blue-300"
            >
              finance guides
            </Link>{" "}
            cover loans, interest, and the kind of debt questions people
            usually only ask once they&apos;re already mid-decision. Our{" "}
            <Link
              href="/blogs/health"
              className="text-blue-400 underline hover:text-blue-300"
            >
              health guides
            </Link>{" "}
            focus on BMI for now — what it&apos;s actually measuring, and
            just as importantly, what it isn&apos;t.
          </p>
          <p className="text-gray-200 leading-relaxed">
            If you&apos;d rather skip the reading and go straight to a tool,
            our{" "}
            <Link
              href="/calculators"
              className="text-blue-400 underline hover:text-blue-300"
            >
              full calculator directory
            </Link>{" "}
            lists everything we&apos;ve built, including quick ones like the{" "}
            <Link
              href="/calculators/time/age-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Age Calculator
            </Link>{" "}
            and the{" "}
            <Link
              href="/calculators/financial/mortgage-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Mortgage Calculator
            </Link>
            . We&apos;re not trying to hit a word count on any of these
            guides — some run long because the topic needs the space, others
            stay short because the honest answer really is short. Either way,
            the goal is the same: you should leave with the actual number
            worked out, not a vague sense that you should "consult a
            professional" and figure it out yourself.
          </p>
        </section>

        {/* How we write these */}
        <section className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How these guides get written</h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            Every guide on this site starts from a real question someone
            actually asked — in our inbox, in a comment, or in a search query
            that led people to a calculator without an explanation attached.
            We check the math by hand before publishing anything, usually
            against two or three independent sources, because grading
            policies and lending formulas change often enough that last
            year&apos;s explanation can be quietly wrong this year.
          </p>
          <p className="text-gray-200 leading-relaxed">
            If you spot something that&apos;s out of date or doesn&apos;t
            match your specific school or lender&apos;s policy, that&apos;s
            worth knowing — institutional rules vary more than any single
            article can capture, and we&apos;d rather you catch a discrepancy
            than assume our number overrides your transcript or your loan
            agreement.
          </p>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try LizoCalc Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Solve calculations faster with free online calculators and guides.
            </p>

            <Link href="/calculators">
              <button className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">
                Explore Calculators
              </button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}