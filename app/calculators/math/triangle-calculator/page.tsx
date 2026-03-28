import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import TriangleCalculator from "./clientside";
import Link from "next/link";


const faqData = [
  {
    question: "How can I calculate the area of a triangle if I don't know the height?",
    answer: "If you only know the lengths of all three sides (a, b, and c), you use Heron’s Formula. First, calculate the semi-perimeter $s = (a + b + c) / 2$. Then, the area is $\\sqrt{s(s-a)(s-b)(s-c)}$. For a triangle with sides 3, 4, and 5, $s = 6$, and the area is $\\sqrt{6(6-3)(6-4)(6-5)} = \\sqrt{36} = 6$.",
  },
  {
    question: "What is the Law of Sines and when should I use it?",
    answer: "The Law of Sines states that $\\frac{a}{\\sin(A)} = \\frac{b}{\\sin(B)} = \\frac{c}{\\sin(C)}$. You should use this in a triangle calculator when you know two angles and one side (AAS or ASA) or two sides and a non-included angle (SSA). It allows you to find missing side lengths or angles proportionally.",
  },
  {
    question: "How do I find a missing side using the Law of Cosines?",
    answer: "The Law of Cosines is best for 'Side-Angle-Side' (SAS) scenarios. The formula is $c^2 = a^2 + b^2 - 2ab \\cos(C)$. For example, if side $a=5$, $b=7$, and the included angle $C=60^\\circ$, you would calculate $c^2 = 25 + 49 - 2(5)(7)(0.5)$, meaning $c = \\sqrt{39} \\approx 6.24$.",
  },
  {
    question: "Can a triangle have two right angles or two obtuse angles?",
    answer: "No, that is mathematically impossible in Euclidean geometry. The sum of all internal angles in a triangle must exactly equal 180°. Since a right angle is 90° and an obtuse angle is $>90°$, having two would either meet or exceed the 180° limit before the third angle is even added.",
  },
  {
    question: "What information do I need to fully solve a triangle?",
    answer: "To calculate all sides and angles, you generally need at least three pieces of information, and at least one of them must be a side length. Common combinations include Side-Side-Side (SSS), Side-Angle-Side (SAS), or Angle-Side-Angle (ASA). Knowing only three angles (AAA) will tell you the shape, but not the actual size.",
  },
  {
    question: "How do you determine if three side lengths can actually form a triangle?",
    answer: "A triangle can only exist if the sum of the two shortest sides is strictly greater than the longest side (the Triangle Inequality Theorem). For instance, sides of 2, 3, and 10 cannot form a triangle because $2 + 3$ is less than 10; the two shorter sides would never meet to close the shape.",
  },
];
export const metadata: Metadata = {
  title: "Triangle Calculator | Solve Sides, Angles, Area & Perimeter",
  description:
    "Solve any triangle instantly. Calculate missing sides, angles, area, and height using Law of Sines, Cosines, and Heron's formula with step-by-step steps.",

  keywords: [
    "triangle calculator",
    "solve triangle sides and angles",
    "triangle area calculator heron's formula",
    "right triangle solver",
    "isosceles triangle calculator",
    "calculate triangle perimeter",
    "missing side of a triangle finder",
    "geometry triangle solver",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/triangle-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Triangle Calculator | LizoCalc",
    description:
      "A complete geometry tool to find the area, perimeter, and missing dimensions of any triangle type.",
    url: "https://lizocalc.com/calculators/math/triangle-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Triangle Calculator | LizoCalc",
    description:
      "Instantly calculate triangle properties. Perfect for students and engineers needing quick, accurate geometry solutions.",
  },
};
export default function TrianglePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === SINGLE JSON-LD SCRIPT (BEST PRACTICE) === */}
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
                  "https://lizocalc.com/calculators/math/triangle-calculator#breadcrumb",
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
                    name: "Math ",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Triangle Calculator",
                    item: "https://lizocalc.com/calculators/math/triangle-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id": "https://lizocalc.com/calculators/math/triangle-calculator",
                url: "https://lizocalc.com/calculators/math/triangle-calculator",
                name: "Triangle Calculator",
                description:
                  "Use our triangle calculator to compute area, perimeter, sides, height, and angles instantly.",
                inLanguage: "en",
                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://lizocalc.com",
                },
              },
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://lizocalc.com/calculators/math/triangle-calculator#app",
                name: "Triangle Calculator",
                url: "https://lizocalc.com/calculators/math/triangle-calculator",
                description:
                  "Advanced triangle calculator to compute area, perimeter, height, angles, and sides.",
                applicationCategory: "MathApplication",
                applicationSubCategory: "Triangle Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements: "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate triangle area",
                  "Calculate perimeter",
                  "Calculate height",
                  "Calculate angles",
                  "Calculate sides",
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
            
            <h1 className="text-3xl md:text-4xl font-bold">Triangle Calculator | Solve Sides, Angles, Area & Perimeter</h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <TriangleCalculator />
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Triangle Solver</strong> — your complete <strong>triangle calculator</strong> — makes solving any triangle fast and accurate. Whether you need to find the <strong>area of a triangle</strong>, calculate missing sides and angles using the <strong>law of sines</strong> or <strong>law of cosines</strong>, verify the <strong>Pythagorean theorem</strong> in a <strong>right triangle</strong>, or explore <strong>triangle properties</strong> like <strong>inradius</strong>, <strong>circumradius</strong>, <strong>centroid</strong>, <strong>incenter</strong> or <strong>circumcenter</strong>, this free tool has you covered.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Perfect for students  studying <strong>triangle formulas</strong> for board exams, engineers calculating rafter lengths, surveyors using triangulation, or anyone needing quick <strong>area of triangle</strong> results. Our <strong>triangle solver</strong> supports SSS, SAS, ASA, AAS, SSA (including the ambiguous case), computes <strong>Heron's formula</strong> using the <strong>semi-perimeter</strong>, and displays <strong>triangle area</strong>, <strong>incircle</strong>, <strong>circumcircle</strong> radius and more. No registration, mobile-friendly, offline-capable after first load, and completely ad-free. Start solving now on our{" "}
    <Link
      href="/calculators/math/triangle-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      Triangle Calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Solve Any Triangle Using Our Tool
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Input Side Lengths and Angles – Works for All Triangle Types
        </h3>
        <p className="text-gray-200 text-base mb-4">
          Enter sides a, b, c (opposite angles A, B, C) and/or angles. The <strong>triangle calculator</strong> automatically detects SSS, SAS, ASA, AAS or SSA cases and solves using <strong>law of sines</strong>, <strong>law of cosines</strong> or <strong>Pythagorean theorem</strong> for <strong>right-angled triangles</strong>.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          SAS – Two Sides and Included Angle
        </h3>
        <p className="text-gray-200 text-base mb-4">
          Classic case for roof pitch or vector problems. Uses <strong>law of cosines</strong> to find third side.
        </p>
        <div className="font-mono text-green-300 bg-gray-900/70 p-5 rounded-xl text-center text-xl mb-4">
          c² = a² + b² − 2ab cos C
        </div>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          SSS – Three Sides → Find All Angles & Area
        </h3>
        <p className="text-gray-200 text-base">
          Great for land surveying or checking <strong>triangle inequality</strong>. Tool computes angles, <strong>triangle area</strong> via <strong>Heron's formula</strong> (using <strong>semi-perimeter</strong>), <strong>inradius</strong> and <strong>circumradius</strong>.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h4 className="text-xl font-bold text-blue-300 mb-3">
          Why at least one side is required
        </h4>
        <p className="text-gray-200 text-base">
          Pure angle input (AAA) only gives similar triangles. One side is needed to determine actual size and compute <strong>triangle area</strong>, <strong>circumradius</strong>, <strong>inradius</strong>, etc.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Essential Triangle Formulas & Properties
    </h2>

    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Heron's Formula – Area of Triangle</h3>
        <p className="text-gray-200 mb-3">
          Area = √[s(s−a)(s−b)(s−c)] where <strong>semi-perimeter</strong> s = (a+b+c)/2
        </p>
        <div className="font-mono text-green-300 text-center text-lg">
          Area of triangle = √[s(s − a)(s − b)(s − c)]
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Law of Sines</h3>
        <div className="font-mono text-green-300 text-2xl text-center my-4">
          a / sin A = b / sin B = c / sin C = 2R
        </div>
        <p className="text-gray-200">
          R = <strong>circumradius</strong> of the <strong>circumcircle</strong>
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Law of Cosines</h3>
        <div className="font-mono text-green-300 text-xl text-center my-4">
          c² = a² + b² − 2ab cos C
        </div>
        <p className="text-gray-200">
          Reduces to <strong>Pythagorean theorem</strong> when C = 90° in a <strong>right-angled triangle</strong>.
        </p>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Inradius & Circumradius</h3>
        <p className="text-gray-200">
          <strong>Inradius</strong> r = Area / s<br />
          <strong>Circumradius</strong> R = abc / (4 × Area)
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Triangle Properties – Acute, Obtuse, Right, Isosceles & Equilateral
    </h2>

    <div className="space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Right-Angled Triangle & Pythagorean Theorem
        </h3>
        <p className="text-gray-200">
          In a <strong>right triangle</strong> (one angle = 90°), <strong>Pythagorean theorem</strong> applies: a² + b² = c² (c = hypotenuse).
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Isosceles Triangle & Equilateral Triangle
        </h3>
        <p className="text-gray-200">
          <strong>Isosceles triangle</strong>: two equal sides → two equal base angles.<br />
          <strong>Equilateral triangle</strong>: all sides equal, all angles 60°, height = (√3/2) × side.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Acute, Right & Obtuse Triangle Classification
        </h3>
        <p className="text-gray-200">
          Largest angle opposite longest side:<br />
          • All angles &lt; 90° → <strong>acute triangle</strong><br />
          • One angle = 90° → <strong>right triangle</strong><br />
          • One angle &gt; 90° → <strong>obtuse triangle</strong>
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Triangle Inequality & Troubleshooting
    </h2>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 mb-10">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Triangle Inequality Theorem
      </h3>
      <p className="text-gray-200 mb-4">
        For any triangle: sum of any two sides must be greater than the third side.
      </p>
      <ul className="list-disc list-inside text-gray-200 space-y-2">
        <li>a + b &gt; c</li>
        <li>a + c &gt; b</li>
        <li>b + c &gt; a</li>
      </ul>
      <p className="text-gray-200 mt-4">
        Example: sides 2, 3, 6 → 2 + 3 = 5 &lt; 6 → cannot form a triangle.
      </p>
    </div>

    <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700">
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Ambiguous Case (SSA)
      </h3>
      <p className="text-gray-200">
        Two sides + non-included angle may produce 0, 1 or 2 possible triangles. Our <strong>triangle solver</strong> detects and shows all valid solutions.
      </p>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Practical Uses of the Triangle Calculator
    </h2>

    <ul className="list-disc list-inside text-gray-200 space-y-4 text-base">
      <li>Construction: roof pitch, rafter length, checking <strong>right triangle</strong> corners</li>
      <li>Surveying & Navigation: triangulation with <strong>law of sines</strong></li>
      <li>School / College: <strong>area of triangle</strong>, <strong>Heron's formula</strong>, <strong>Pythagorean theorem</strong> problems</li>
      <li>Physics: resolving forces, projectile angles</li>
    </ul>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Math Tools to Explore
    </h2>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li><Link href="/calculators/math/pythagorean-theorem-calculator" className="text-blue-400 hover:underline">Pythagorean Theorem Calculator</Link></li>
      <li><Link href="/calculators/math/scientific-calculator" className="text-blue-400 hover:underline">Scientific Calculator</Link></li>
    </ul>

    <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
      Master every <strong>triangle property</strong> — from <strong>equilateral triangle</strong> symmetry to <strong>obtuse triangle</strong> calculations — with our free, accurate <strong>triangle solver</strong>. Bookmark this <strong>triangle calculator</strong> today and solve geometry problems faster in whole world  or anywhere!
    </p>
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}