import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Blogs | LizoCalc",
  description:
    "Read finance guides on loan payments, interest formulas, budgeting, and personal finance calculators on LizoCalc.",
  keywords: [
    "finance blogs",
    "loan payment calculator",
    "loan payment guide",
    "interest calculator",
    "finance calculators",
    "lizocalc finance",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/finance",
  },
  openGraph: {
    title: "Finance Blogs | LizoCalc",
    description:
      "Finance guides including loan payment calculation, interest formulas, and budgeting tips.",
    url: "https://www.lizocalc.com/blogs/finance",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "How to Calculate Your Loan Payment Step by Step->",
    slug: "loan-payment-calculate-guide",
    description:
      "Learn how to calculate monthly loan payments using formulas, amortization examples, and practical finance tips.",
    date: "May 01, 2026",
    readTime: "7 min read",
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try Finance Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Calculate loans, interest, percentages, and budgets instantly.
            </p>

            <Link href="/">
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