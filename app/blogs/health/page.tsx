import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI & Health Numbers, Explained Simply |Blogs",
  description:
    "What BMI actually measures, where it falls short, and how to read your number without the textbook language.",
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
    title: "BMI & Health Numbers, Explained Simply | LizoCalc",
    description:
      "Health guides including BMI explanations, body mass index formulas, and calculator resources.",
    url: "https://www.lizocalc.com/blogs/health",
    siteName: "LizoCalc",
    type: "website",
  },
};

const blogs = [
  {
    title: "What Is BMI? Meaning, Formula & BMI Categories",
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

        {/* A number, not a verdict */}
        <section className="mb-16 max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">A number, not a verdict</h2>
          <p className="text-gray-200 leading-relaxed mb-4">
            BMI gets treated like a diagnosis more often than it deserves to
            be. In reality it&apos;s a fairly crude ratio — your weight
            divided by the square of your height — that was developed in the
            1830s by a Belgian mathematician studying population averages, not
            individual health outcomes. It was never designed to tell one
            specific person whether their body is healthy. It was designed to
            let researchers compare weight distributions across large groups
            of people, which is a very different job than the one it&apos;s
            been asked to do ever since doctors&apos; offices adopted it as a
            quick screening number. You can run the formula yourself on our{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              BMI Calculator
            </Link>
            .
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            That history matters because it explains BMI&apos;s biggest blind
            spot: it can&apos;t tell the difference between muscle and fat.
            A powerlifter and someone who is sedentary and carrying excess
            body fat can land on the exact same BMI number despite having
            completely different body compositions and completely different
            health profiles. That&apos;s exactly the gap our{" "}
            <Link
              href="/calculators/health/body-fat-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Body Fat Calculator
            </Link>{" "}
            is built to close — it looks at composition rather than just the
            weight-to-height ratio. Bone density, frame size, age, and even
            where on the body fat is distributed all affect health risk in
            ways BMI simply doesn&apos;t account for, because it only ever
            has two inputs to work with.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            None of that makes BMI useless — it's still why doctors,
            insurers, and researchers keep using it. It's cheap to calculate,
            requires no special equipment beyond a scale and a tape measure,
            and at a population level it does correlate reasonably well with
            certain health risks. The problem shows up specifically at the
            individual level, and specifically at the edges of the scale,
            where an athlete gets flagged as "overweight" or an older adult
            with low muscle mass gets read as "healthy" when neither label
            fits what's actually going on with their body. Pairing it with a{" "}
            <Link
              href="/calculators/health/bmr-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              BMR
            </Link>{" "}
            or{" "}
            <Link
              href="/calculators/health/tdee-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              TDEE
            </Link>{" "}
            reading usually paints a fuller picture than BMI on its own.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4">
            Our guides in this section try to hold both of those things at
            once — walking through the formula and the standard categories
            clearly, while being upfront about where the number stops being
            useful. If you fall into the "overweight" or "underweight" range
            on a BMI calculator, that's worth paying attention to, but it's
            one data point among several, alongside things like waist
            circumference, body fat percentage, and how you actually feel day
            to day, not a standalone verdict on your health. If you're
            tracking a weight goal, our{" "}
            <Link
              href="/calculators/health/calorie-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Calorie Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/health/calorie-deficit-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Calorie Deficit Calculator
            </Link>{" "}
            are usually more directly useful than BMI alone.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Going forward, expect this section to grow into related
            questions people ask alongside BMI — how BMI differs across age
            groups and sexes, what a{" "}
            <Link
              href="/calculators/health/macros-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              macro breakdown
            </Link>{" "}
            adds on top of a raw calorie number, and how something as
            unrelated-seeming as our{" "}
            <Link
              href="/calculators/health/sleep-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              Sleep Calculator
            </Link>{" "}
            fits into the same overall health picture. The throughline for
            all of it stays the same: explain what a number is actually
            measuring before telling you what to do about it. For the full
            list, see our{" "}
            <Link
              href="/calculators/health"
              className="text-blue-400 underline hover:text-blue-300"
            >
              health calculators
            </Link>{" "}
            page or the complete{" "}
            <Link
              href="/calculators"
              className="text-blue-400 underline hover:text-blue-300"
            >
              calculator directory
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

        {/* More topics */}
        <div className="mt-14 max-w-3xl">
          <p className="text-gray-200 leading-relaxed">
            Also tracking grades or a loan? Check our{" "}
            <Link
              href="/blogs/education"
              className="text-blue-400 underline hover:text-blue-300"
            >
              education guides
            </Link>{" "}
            or our{" "}
            <Link
              href="/blogs/finance"
              className="text-blue-400 underline hover:text-blue-300"
            >
              finance guides
            </Link>
            .
          </p>
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

            <Link href="/calculators/health">
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