import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Blogs | LizoCalc",
  description:
    "Explore health guides including BMI, calorie calculations, weight formulas, and wellness resources on LizoCalc.",
  keywords: [
    "health blogs",
    "BMI calculator guide",
    "what is BMI",
    "body mass index",
    "health calculators",
    "lizocalc health",
  ],
  robots: {
    index: true,  
    follow: true,
  },
  alternates: {
    canonical: "https://www.lizocalc.com/blogs/health",
  },
  openGraph: {
    title: "Health Blogs | LizoCalc",
    description:
      "Health guides including BMI explanations, body mass index formulas, and calculator resources.",
    url: "https://www.lizocalc.com/blogs/health",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "What Is BMI? Meaning, Formula & BMI Categories ",
    slug: "what-is-bmi",
    description:
      "Understand BMI meaning, formula, healthy BMI ranges, limitations, and how to calculate BMI correctly.",
    date: "May 01, 2026",
    readTime: "5 min read",
  },
];

export default function HealthBlogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-14">
          <span className="text-primary font-semibold uppercase tracking-wide">
            Health
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
            Health Blog Guides
          </h1>

          <p className="max-w-2xl mx-auto text-muted-foreground">
            Helpful resources for BMI, calorie tracking, health formulas, and
            wellness calculators.
          </p>
        </div>

        {/* Featured */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>

          <Link href="/blogs/health/what-is-bmi">
            <div className="border border-border rounded-2xl p-8 bg-card hover:shadow-xl transition-all">
              <p className="text-primary font-medium mb-2">Featured</p>

              <h2 className="text-3xl font-bold mb-3">
                What Is BMI? Meaning, Formula & BMI Categories
              </h2>

              <p className="text-muted-foreground mb-4">
                Learn what BMI means, how body mass index is calculated, and how
                to interpret BMI categories correctly.
              </p>

              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>April 28, 2026</span>
                <span>5 min read</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Latest Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/health/${blog.slug}`}
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
              Try Health Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Calculate BMI, calories, body fat, and other health metrics
              instantly.
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