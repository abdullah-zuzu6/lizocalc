import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education Blogs | LizoCalc",
  description:
    "Explore education guides, grade calculators, GPA tips, exam strategies, and academic resources on LizoCalc.",
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
    title: "Education Blogs | LizoCalc",
    description:
      "Read helpful education blogs including final grade calculation, GPA tips, and study strategies.",
    url: "https://www.lizocalc.com/blogs/education",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "How to Calculate Final Grade Before Exams->",
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

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-2xl font-bold mb-3">
              Try Education Calculators
            </h2>

            <p className="text-muted-foreground mb-5">
              Calculate grades, GPA, percentages, and more instantly.
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