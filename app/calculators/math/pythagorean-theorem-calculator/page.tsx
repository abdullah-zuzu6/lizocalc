import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import PythagoreanCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Pythagorean Theorem Calculator",
  description:
    "Solve for the hypotenuse or a missing leg of any right triangle. See the 4-step working, the triangle's area, and share the result with one link.",
  keywords: [
    "pythagorean theorem calculator",
    "hypotenuse calculator",
    "right triangle solver",
    "a2 b2 c2 calculator",
    "pythagorean triples",
    "triangle area calculator",
    "converse of the pythagorean theorem",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Pythagorean Theorem Calculator",
    description:
      "Solve for the hypotenuse or a missing leg of a right triangle, with a full 4-step breakdown and a shareable result link.",
    url: "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pythagorean Theorem Calculator",
    description:
      "Find a missing triangle side instantly, with the working shown step by step.",
  },
};

const tocItems = [
  { id: "what-it-says", label: "What the Pythagorean Theorem Says" },
  { id: "the-formula", label: "The Pythagorean Theorem Formula" },
  { id: "how-to-use", label: "How to Use the Pythagorean Theorem Calculator" },
  { id: "solving-hypotenuse", label: "Solving for the Hypotenuse (Side C)" },
  { id: "solving-leg", label: "Solving for a Missing Leg (Side A or B)" },
  { id: "triangle-area", label: "Finding the Triangle's Area" },
  { id: "proof", label: "Why the Theorem Is True: A Quick Proof" },
  { id: "pythagorean-triples", label: "Pythagorean Triples Worth Memorizing" },
  { id: "converse", label: "The Converse: Checking If a Triangle Is Right-Angled" },
  { id: "real-world-uses", label: "Real-World Uses of the Pythagorean Theorem" },
  { id: "common-mistakes", label: "Common Mistakes to Avoid" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.lizocalc.com/#website",
      url: "https://www.lizocalc.com",
      name: "LizoCalc",
      inLanguage: "en",
    },
    {
      "@type": "Person",
      "@id": "https://www.lizocalc.com/#person-abdullah",
      name: "Rana Muhammad Abdullah",
      url: "https://www.linkedin.com/in/abdullahsajjad06/",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Pythagorean Theorem Calculator", item: "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator",
      url: "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator",
      name: "Pythagorean Theorem Calculator",
      description:
        "Solve for the hypotenuse or a missing leg of a right triangle, with the working shown step by step.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator#app",
      name: "Pythagorean Theorem Calculator",
      url: "https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator",
      description:
        "Solves a² + b² = c² for any missing side of a right triangle, shows the 4-step working and the triangle's area, and generates a shareable result link.",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Solve for the hypotenuse (c)",
        "Solve for either leg (a or b)",
        "4-step mathematical breakdown",
        "Triangle area calculation",
        "Shareable result link",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/pythagorean-theorem-calculator"],
      },
    },
  ],
};

/** Textbook-style stacked fraction: numerator over denominator, separated by a rule. */
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1.5 leading-none text-sm">
      <span className="px-1 pb-1">{n}</span>
      <span className="px-1 pt-1 border-t-2 border-current">{d}</span>
    </span>
  );
}

/** A single formula row, laid out left-to-right so terms and exponents sit inline. */
function FormulaLine({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center flex-wrap gap-1">{children}</div>;
}

/** Dark code-style box holding one or more FormulaLine rows, stacked vertically. */
function FormulaBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm space-y-3">
      {children}
    </div>
  );
}

export default function PythagoreanPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-pythagorean-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Pythagorean theorem calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Enter any 2 sides of a right triangle to solve the third. See the 4-step working, the
            triangle's area, and share the finished result with one link.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <PythagoreanCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          The Pythagorean theorem is one equation, a² + b² = c², but it answers a surprising
          number of practical questions once you know how to point it. Below, each way of using it
          is worked out by hand, along with a short proof of why the equation holds at all.
        </p>

        <nav aria-label="Table of contents" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16">
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">Table Of Contents</h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base">
                  <span aria-hidden="true">-&gt;</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* WHAT IT SAYS */}
        <section id="what-it-says" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What the Pythagorean Theorem Says
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A right triangle has one 90° angle. The 2 shorter sides that meet at that angle are
            called legs, usually labeled a and b. The side opposite the right angle, always the
            longest of the 3, is the hypotenuse, labeled c.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The theorem states that if you build a square on each of the 3 sides, the area of the
            square on the hypotenuse exactly equals the combined area of the squares on the 2 legs.
            Written as an equation instead of areas, that's a² + b² = c², and it holds for every
            right triangle that exists, regardless of size.
          </p>
        </section>

        {/* THE FORMULA */}
        <section id="the-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Pythagorean Theorem Formula
          </h2>
          <FormulaBlock>
            <FormulaLine><span>a² + b² = c²</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-4 text-base">
            a and b are the legs, in either order, since addition doesn't care which one you call
            which. c is always the hypotenuse. Rearranged to solve for each variable:
          </p>
          <FormulaBlock>
            <FormulaLine><span>c = √(a² + b²)</span></FormulaLine>
            <FormulaLine><span>a = √(c² − b²)</span></FormulaLine>
            <FormulaLine><span>b = √(c² − a²)</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Notice the pattern: solving for the hypotenuse adds the 2 known squares, while solving
            for a leg subtracts. Mixing those up, adding when you should subtract, is the single
            most common arithmetic slip with this formula.
          </p>
        </section>

        {/* HOW TO USE */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Pythagorean Theorem Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Each side has 2 boxes: a plain number and a number under a √ symbol. A side's value is
            whatever you put in the first box plus the square root of whatever you put in the
            second, so 2 in the first box and 5 in the second means that side equals 2 + √5. Most
            of the time you'll only need the first box; the √ box exists for sides that are
            genuinely irrational, like the diagonal of a non-square rectangle, where typing a
            rounded decimal would lose precision.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Fill in both boxes for any 2 of the 3 sides, decimals are fine in either box, and
            leave both boxes on the third side completely empty. That empty pair is what tells the
            calculator which side to solve for.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Press Calculate Result. The solved side appears in large type on the left, the
            triangle's area appears on the right, and a Mathematical Breakdown panel underneath
            walks through all 4 steps of the arithmetic, from the raw equation down to the final
            square root.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A Share This Result panel appears once a result is showing. The link it generates
            encodes the 2 known sides, so anyone who opens it lands on the exact same calculation
            already solved.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Filling in all 3 fields, or leaving 2 or more blank, returns a message asking you to
            leave exactly one field empty. If the value you entered as the hypotenuse is shorter
            than a leg, the calculator flags that too, since the hypotenuse is always the longest
            side in a right triangle.
          </p>
        </section>

        {/* SOLVING FOR HYPOTENUSE */}
        <section id="solving-hypotenuse" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving for the Hypotenuse (Side C)
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Known: both legs. Square each one, add the squares, then take the square root of the
            sum.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">Example: a = 6, b = 8.</p>
          <FormulaBlock>
            <FormulaLine><span>c = √(6² + 8²)</span></FormulaLine>
            <FormulaLine><span>c = √(36 + 64)</span></FormulaLine>
            <FormulaLine><span>c = √100</span></FormulaLine>
            <FormulaLine><span>c = 10</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            6, 8, 10 is exactly the 3-4-5 triple doubled, which is why the numbers come out this
            clean; most real-world measurements won't land on a whole number, and that's expected.
          </p>
        </section>

        {/* SOLVING FOR A LEG */}
        <section id="solving-leg" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Solving for a Missing Leg (Side A or B)
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Known: the hypotenuse and 1 leg. Square both, subtract the leg's square from the
            hypotenuse's square, then take the square root of what's left.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">Example: c = 13, b = 5.</p>
          <FormulaBlock>
            <FormulaLine><span>a = √(13² − 5²)</span></FormulaLine>
            <FormulaLine><span>a = √(169 − 25)</span></FormulaLine>
            <FormulaLine><span>a = √144</span></FormulaLine>
            <FormulaLine><span>a = 12</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The subtraction only works in this order, hypotenuse squared minus leg squared, since
            c is always the largest of the 3 values. Subtracting the other way produces a negative
            number under the square root, which has no real solution.
          </p>
        </section>

        {/* TRIANGLE AREA */}
        <section id="triangle-area" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding the Triangle's Area
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Once both legs are known, either given directly or solved above, the area follows the
            standard triangle formula, simplified because the 2 legs of a right triangle are
            already perpendicular to each other:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>Area =</span>
              <Frac n="1" d="2" />
              <span>× a × b</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-3 mt-6 text-base">
            Example: legs 9 and 12.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>Area =</span>
              <Frac n="1" d="2" />
              <span>× 9 × 12 = 54</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            9, 12, 15 is a 3-4-5 triple scaled by 3, and the calculator's area figure always uses
            the actual leg values, whether you typed them in directly or they came from solving the
            hypotenuse or a leg first.
          </p>
        </section>

        {/* PROOF */}
        <section id="proof" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Theorem Is True: A Quick Proof
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            One of the shortest proofs uses rearrangement instead of algebra tricks. Take 4 copies
            of the same right triangle, legs a and b, hypotenuse c, and arrange them inside a big
            square with side length (a + b), each triangle tucked into a corner, hypotenuses facing
            inward. The empty space left in the middle is itself a smaller square, with side length
            c.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The big square's area can be measured 2 different ways: directly, as (a + b)², or as
            the sum of its pieces, the 4 triangles plus the small central square. Since both
            descriptions measure the same area, they must be equal:
          </p>
          <FormulaBlock>
            <FormulaLine><span>(a + b)² = 4 ×</span><Frac n="1" d="2" /><span>ab + c²</span></FormulaLine>
            <FormulaLine><span>a² + 2ab + b² = 2ab + c²</span></FormulaLine>
            <FormulaLine><span>a² + b² = c²</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The 2ab term cancels from both sides, leaving exactly the Pythagorean theorem. This
            particular argument dates back at least to ancient Chinese mathematics and doesn't
            require anything beyond expanding a squared binomial.
          </p>
        </section>

        {/* TRIPLES */}
        <section id="pythagorean-triples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Pythagorean Triples Worth Memorizing
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A Pythagorean triple is a set of 3 whole numbers that satisfies a² + b² = c² exactly,
            with no rounding. Recognizing them saves time, since any multiple of a known triple is
            also a triple, 3-4-5 scaled by 2 is 6-8-10, scaled by 3 is 9-12-15, and so on.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Triple</th>
                  <th className="p-4 text-left">a</th>
                  <th className="p-4 text-left">b</th>
                  <th className="p-4 text-left">c</th>
                  <th className="p-4 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4 font-bold">3-4-5</td><td className="p-4">3</td><td className="p-4">4</td><td className="p-4">5</td><td className="p-4">Smallest and most recognizable triple</td></tr>
                <tr><td className="p-4 font-bold">5-12-13</td><td className="p-4">5</td><td className="p-4">12</td><td className="p-4">13</td><td className="p-4">Second smallest "primitive" triple</td></tr>
                <tr><td className="p-4 font-bold">8-15-17</td><td className="p-4">8</td><td className="p-4">15</td><td className="p-4">17</td><td className="p-4">Primitive; not a multiple of a smaller triple</td></tr>
                <tr><td className="p-4 font-bold">7-24-25</td><td className="p-4">7</td><td className="p-4">24</td><td className="p-4">25</td><td className="p-4">Primitive; hypotenuse is 1 more than a leg</td></tr>
                <tr><td className="p-4 font-bold">6-8-10</td><td className="p-4">6</td><td className="p-4">8</td><td className="p-4">10</td><td className="p-4">3-4-5 scaled ×2</td></tr>
                <tr><td className="p-4 font-bold">9-12-15</td><td className="p-4">9</td><td className="p-4">12</td><td className="p-4">15</td><td className="p-4">3-4-5 scaled ×3</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            A triple is called "primitive" when a, b, and c share no common factor, meaning it
            isn't just a scaled-up version of a smaller triple. 5-12-13, 8-15-17, and 7-24-25 are
            all primitive; 6-8-10 and 9-12-15 are not, since both reduce back to 3-4-5.
          </p>
        </section>

        {/* CONVERSE */}
        <section id="converse" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Converse: Checking If a Triangle Is Right-Angled
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The theorem also runs in reverse. If you already have all 3 side lengths of a triangle
            and want to know whether it contains a right angle, check whether the 2 shorter sides
            squared and added equal the longest side squared. If they do, the triangle is
            guaranteed to be right-angled, no protractor required.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example: does a triangle with sides 8, 15, 17 have a right angle?
          </p>
          <FormulaBlock>
            <FormulaLine><span>8² + 15² = 64 + 225 = 289</span></FormulaLine>
            <FormulaLine><span>17² = 289</span></FormulaLine>
            <FormulaLine><span>289 = 289 → right triangle, confirmed</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-3 text-base">
            Compare that to a triangle with sides 5, 6, 7:
          </p>
          <FormulaBlock>
            <FormulaLine><span>5² + 6² = 25 + 36 = 61</span></FormulaLine>
            <FormulaLine><span>7² = 49</span></FormulaLine>
            <FormulaLine><span>61 ≠ 49 → not a right triangle</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            When the sum of the smaller squares comes out larger than the largest square, like it
            did here, the triangle is obtuse instead. When it comes out smaller, the triangle is
            acute. That comparison is a quick way to classify any triangle once you know its 3
            sides.
          </p>
        </section>

        {/* REAL WORLD USES */}
        <section id="real-world-uses" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real-World Uses of the Pythagorean Theorem
          </h2>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Squaring a corner in construction</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Builders check that a corner is exactly 90° by measuring 3 units along one wall and 4
            along the adjacent wall; the diagonal between those 2 marks should be exactly 5 units
            if the corner is square. Any multiple of 3-4-5 works the same way at larger scale, 30
            feet, 40 feet, and a 50-foot diagonal, for example.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Screen and display sizing</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            A monitor or TV's advertised size is the diagonal measurement, which is the hypotenuse
            of a right triangle formed by the screen's width and height. A 16:9 screen that's 12
            inches wide by 6.75 inches tall has a diagonal of √(12² + 6.75²) ≈ 13.8 inches.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Straight-line distance between 2 points</h3>
          <p className="text-gray-200 leading-relaxed text-base">
            The distance formula used in navigation, mapping, and coordinate geometry, d = √((x₂ −
            x₁)² + (y₂ − y₁)²), is the Pythagorean theorem applied to the horizontal and vertical
            gap between 2 points, treating that gap as the 2 legs of a right triangle and the
            straight-line distance as the hypotenuse.
          </p>
        </section>

        {/* COMMON MISTAKES */}
        <section id="common-mistakes" className="scroll-mt-24 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes to Avoid
          </h2>
          <ul className="text-gray-200 space-y-3 text-base list-disc list-inside">
            <li>
              Applying the formula to a triangle that isn't right-angled. a² + b² = c² only holds
              when one angle is exactly 90°; for any other triangle, use the Law of Cosines
              instead.
            </li>
            <li>
              Mislabeling the hypotenuse. c always sits opposite the right angle and is always the
              longest side; labeling a leg as c produces a negative number under the square root
              when solving for a missing leg.
            </li>
            <li>
              Stopping at the squared value. c² = 100 is not the same as c = 100; the final step,
              taking the square root, is easy to forget under time pressure.
            </li>
            <li>
              Adding instead of subtracting, or the reverse. Solving for the hypotenuse adds the 2
              known squares; solving for a leg subtracts the known leg's square from the
              hypotenuse's square. Swapping these gives a plausible-looking but wrong answer.
            </li>
          </ul>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "Triangle Calculator", href: "/calculators/math/triangle-calculator" },
              { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
              { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}