import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs | LizoCalc",
  description:
    "Explore LizoCalc blogs covering education, finance, and health guides with formulas, calculators, and practical examples.",
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
  alternates: {
    canonical: "https://www.lizocalc.com/blogs",
  },
  openGraph: {
    title: "Blogs | LizoCalc",
    description:
      "Helpful calculator guides for education, finance, and health topics.",
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

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try LizoCalc Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Solve calculations faster with free online calculators and guides.
            </p>

            <Link href="/">
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