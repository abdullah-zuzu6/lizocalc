import { Metadata } from "next";
import PythagoreanCalculator from "./clientside"; // Ensure this matches your client component filename
import { Triangle as TriangleIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const faqData = [
  {
    question: "What is the Pythagorean Theorem?",
    answer:
      "The Pythagorean Theorem is a fundamental principle in geometry that states in a right-angled triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides (a² + b² = c²).",
  },
  {
    question: "Can this calculator find sides other than the hypotenuse?",
    answer:
      "Yes. By rearranging the formula, you can find the base or perpendicular side. To find a side, simply leave that field blank and enter the values for the other two known sides.",
  },
];

export const metadata: Metadata = {
  title: "Pythagorean Theorem Calculator | Solve Right Triangles",
  description:
    "Calculate the hypotenuse, base, or perpendicular side of a right triangle instantly using our Pythagorean Theorem calculator with step-by-step steps.",

  keywords: [
    "pythagorean theorem calculator",
    "hypotenuse calculator",
    "right triangle solver",
    "calculate triangle sides",
    "a2 b2 c2 calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Pythagorean Theorem Calculator | LizoCalc",
    description:
      "Free Pythagorean calculator to solve triangle sides with an easy-to-use interface and formulas.",
    url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Pythagorean Theorem Calculator | LizoCalc",
    description:
      "Solve for a, b, or c in any right-angled triangle with our free Pythagorean Theorem calculator.",
  },
};

export default function PythagoreanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED DATA === */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Math Calculators",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Pythagorean Theorem Calculator",
                    item: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                name: "Pythagorean Theorem Calculator",
                description: "Estimate the missing sides of a right triangle instantly with our Pythagorean Theorem calculator.",
                "inLanguage": "en",
                "isPartOf": {
                  "@type": "WebSite",
                  "name": "LizoCalc",
                  "url": "https://lizocalc.com"
                }
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator#app",
                name: "Pythagorean Theorem Calculator",
                url: "https://lizocalc.com/calculators/math/pythagorean-theorem-calculator",
                description:
                  "Online math tool to solve for the hypotenuse, base, or perpendicular using the Pythagorean Theorem.",
                applicationCategory: "MathApplication",
                applicationSubCategory: "Geometry Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Solve for Hypotenuse (c)",
                  "Solve for Perpendicular (a)",
                  "Solve for Base (b)",
                  "Step-by-step calculation steps",
                  "Triangle area calculation",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-primary/10">
              <TriangleIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Pythagorean Theorem Calculator
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <PythagoreanCalculator />
      </section>

      {/* SEO Content */}
      <article
        className="max-w-6xl mx-auto px-6 py-16 
        prose prose-blue prose-lg lg:prose-xl
        prose-headings:font-extrabold
        prose-h2:text-primary
        prose-h2:border-b-2
        prose-h2:border-primary/20
        prose-h2:pb-2
        prose-p:text-muted-foreground
        prose-p:leading-relaxed"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Understanding the Pythagorean Theorem
        </h2>

        <p>
          The Pythagorean Theorem is one of the most famous rules in mathematics, 
          attributed to the ancient Greek mathematician Pythagoras. It provides 
          the relationship between the sides of a right-angled triangle.
        </p>

        <h3>How it works</h3>
        <p>
          When you have a triangle with a 90-degree angle, you can use the formula 
          <strong> a² + b² = c²</strong>. Here, &quot;c&quot; represents the hypotenuse, 
          while &quot;a&quot; and &quot;b&quot; are the other two sides. Our calculator 
          automatically rearranges this formula based on which side you are trying to find.
        </p>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}