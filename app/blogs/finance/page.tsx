import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan & Money Guides |Blogs",
  description:
    "How loan payments, interest, and debt actually work — written for people who just want a straight answer.",
  keywords: [
    "finance blogs",
    "loan payment calculator",
    "loan payment guide",
    "interest calculator",
    "finance calculators",
    "lizocalc finance",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/finance",
  },
  openGraph: {
    title: "Loan & Money Guides Without the Jargon | LizoCalc",
    description:
      "Finance guides including loan payment calculation, interest formulas, and budgeting tips.",
    url: "https://www.lizocalc.com/blogs/finance",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "How to Calculate Your Loan Payment Step by Step",
    slug: "loan-payment-calculate-guide",
    description:
      "Learn how to calculate monthly loan payments using formulas, amortization examples, and practical finance tips.",
    date: "May 01, 2026",
    readTime: "7 min read",
  },
  {
    title:
      "Debt Consolidation Loans Explained — Pros, Cons, Interest Rates & How They Work",
    slug: "debt-consolidation-loan-guide",
    description:
      "Learn how debt consolidation loans work, including interest rates, monthly payments, pros, cons, repayment examples, and smart strategies to reduce debt faster.",
    date: "May 22, 2026",
    readTime: "14 min read",
  },
];

export default function FinanceBlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Finance
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            Finance Blog Guides
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground">
            Practical guides for loans, interest calculations, budgeting, and
            financial planning.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>

          <Link href="/blogs/finance/loan-payment-calculate-guide">
            <div className="border border-border rounded-2xl p-8 bg-card hover:shadow-xl transition-all">
              <p className="text-primary font-medium mb-2">Featured</p>

              <h2 className="text-3xl font-bold mb-3">
                How to Calculate Your Loan Payment Step by Step
              </h2>

              <p className="text-muted-foreground mb-4">
                Understand monthly payment formulas, interest rates, amortization,
                and real loan examples.
              </p>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>April 30, 2026</span>
                <span>7 min read</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Money math, without the sales pitch */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Money math, without the sales pitch</h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            Nearly every loan calculator you find online belongs to a bank, a
            credit union, or a lending platform, which means the explanation
            attached to it tends to stop right before the part that might
            talk you out of borrowing. That&apos;s not a conspiracy — it&apos;s
            just how a business built around originating loans is going to
            frame the numbers. We don&apos;t sell loans, so there&apos;s no
            incentive here to make a monthly payment look smaller than it is
            or to gloss over what a loan costs across its full term instead of
            just its first month. Our{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Loan Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/financial/mortgage-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Mortgage Calculator
            </Link>{" "}
            both show the full breakdown, not just the number that looks good
            on a monthly statement.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            The monthly payment on a loan is really just one number pulled out
            of a bigger equation involving principal, interest rate, and term
            length, and changing any one of those three moves the other two
            in ways that aren&apos;t always intuitive. Stretch a loan from
            three years to five and the monthly payment drops, which feels
            like a win — until you add up the total interest paid and realize
            you&apos;ve handed over meaningfully more money to borrow the same
            amount. That trade-off is at the center of almost every loan
            decision people ask us about, and it&apos;s something a{" "}
            <Link
              href="/calculators/financial/payment-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              monthly payment figure
            </Link>{" "}
            alone will never show you. If you&apos;re shopping specifically
            for a car loan, our{" "}
            <Link
              href="/calculators/financial/auto-loan-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Auto Loan Calculator
            </Link>{" "}
            runs the same trade-off with vehicle-specific terms.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            Amortization is the other piece that trips people up, mostly
            because it&apos;s counterintuitive by design. Early payments on a
            loan are mostly interest, with only a small sliver going toward
            the actual principal — which is why paying off a loan early feels
            disproportionately slow for the first year or two, then suddenly
            speeds up. Once you can see the full amortization schedule laid
            out, that stops being confusing and starts being useful: it tells
            you exactly how much an extra payment now is worth later, because
            it&apos;s attacking principal at a point where interest hasn&apos;t
            eaten most of the payment yet. Our{" "}
            <Link
              href="/calculators/financial/interest-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Interest Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/financial/compound-interest-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Compound Interest Calculator
            </Link>{" "}
            both make that schedule visible instead of hiding it behind a
            single monthly figure.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            Debt consolidation sits in a slightly different category, because
            it&apos;s less about a formula and more about a decision under
            pressure. Combining several high-interest debts into one loan with
            a single lower rate can genuinely save money and simplify your
            finances — but it can also just as easily stretch a shorter debt
            into a longer one, or reset a payoff clock right as you were
            close to being done. The guides in this section try to walk
            through both outcomes side by side with real numbers, rather than
            presenting consolidation as an automatic improvement, because
            whether it actually helps depends heavily on the specific rates
            and terms involved. It&apos;s also worth running the numbers
            through our{" "}
            <Link
              href="/calculators/financial/inflation-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Inflation Calculator
            </Link>{" "}
            if you&apos;re consolidating over a long time horizon, since
            what a dollar is worth today isn&apos;t what it&apos;ll be worth
            when the loan is paid off.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Over time we&apos;ll be adding more here on topics like variable
            versus fixed interest rates, how a{" "}
            <Link
              href="/calculators/financial/salary-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              salary
            </Link>{" "}
            or income change affects what you can safely borrow, how{" "}
            <Link
              href="/calculators/financial/roi-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              return on investment
            </Link>{" "}
            factors into a "pay off debt vs. invest" decision, and the real
            math behind refinancing — always with the arithmetic shown in
            full, not summarized into a single "it depends" paragraph. For
            the complete list of tools, our{" "}
            <Link
              href="/calculators/financial"
              className="text-blue-400 underline hover:text-blue-300"
            >
              finance calculators
            </Link>{" "}
            page and full{" "}
            <Link
              href="/calculators"
              className="text-blue-400 underline hover:text-blue-300"
            >
              calculator directory
            </Link>{" "}
            are both worth a look.
          </p>
        </section>

        {/* Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/finance/${blog.slug}`}
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
            Studying alongside managing money? Check our{" "}
            <Link
              href="/blogs/education"
              className="text-blue-400 underline hover:text-blue-300"
            >
              education guides
            </Link>{" "}
            for GPA and grade calculations, or our{" "}
            <Link
              href="/blogs/health"
              className="text-blue-400 underline hover:text-blue-300"
            >
              health guides
            </Link>{" "}
            for BMI and related metrics.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try Finance Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Calculate loans, interest, percentages, and budgets instantly.
            </p>

            <Link href="/calculators/financial">
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