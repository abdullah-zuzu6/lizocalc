import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import TriangleCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Triangle Calculator | Solve Sides, Angles, Area & Perimeter",
  description:
    "Solve any triangle from SSS, SAS, or ASA/AAS. Get every side, angle, the area, and the perimeter, worked out with the Law of Cosines, Law of Sines, and Heron's formula, then share the result with a link.",
  keywords: [
    "triangle calculator",
    "solve triangle sides and angles",
    "triangle area calculator heron's formula",
    "law of cosines calculator",
    "law of sines calculator",
    "triangle inequality theorem",
    "SSA ambiguous case",
    "geometry triangle solver",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/triangle-calculator",
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
    title: "Triangle Calculator | LizoCalc",
    description:
      "Solve any triangle's sides, angles, area, and perimeter, with the Law of Cosines and Law of Sines worked out step by step.",
    url: "https://www.lizocalc.com/calculators/math/triangle-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Triangle Calculator | LizoCalc",
    description:
      "Enter 3 values, get every side and angle plus area and perimeter, and share the result with a link.",
  },
};

const tocItems = [
  { id: "triangle-basics", label: "What Defines A Triangle" },
  { id: "solving-methods", label: "The Solving Methods This Tool Uses" },
  { id: "law-of-cosines", label: "The Law Of Cosines" },
  { id: "law-of-sines", label: "The Law Of Sines" },
  { id: "area-formulas", label: "Finding The Area, Three Ways" },
  { id: "other-measurements", label: "Perimeter, Inradius, Circumradius" },
  { id: "triangle-types", label: "Classifying A Triangle" },
  { id: "triangle-inequality", label: "The Triangle Inequality" },
  { id: "ambiguous-case", label: "The Ambiguous Case (SSA)" },
  { id: "common-mistakes", label: "Common Mistakes" },
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
      "@id": "https://www.lizocalc.com/calculators/math/triangle-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Triangle Calculator", item: "https://www.lizocalc.com/calculators/math/triangle-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/triangle-calculator",
      url: "https://www.lizocalc.com/calculators/math/triangle-calculator",
      name: "Triangle Calculator",
      description:
        "Solve any triangle's sides, angles, area, and perimeter from SSS, SAS, or ASA/AAS, and share the result with a link.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/triangle-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/triangle-calculator#app",
      name: "Triangle Calculator",
      url: "https://www.lizocalc.com/calculators/math/triangle-calculator",
      description:
        "Solves a triangle's missing sides and angles from three known values (SSS, SAS, or ASA/AAS), and computes area, perimeter, and triangle type.",
      applicationCategory: "MathApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Solve triangle sides and angles from SSS, SAS, or ASA/AAS",
        "Calculate triangle area using Heron's formula",
        "Calculate perimeter and classify the triangle type",
        "Shareable result link",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/triangle-calculator"],
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

/** A single formula row, laid out left-to-right so fractions sit inline. */
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

export default function TrianglePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-triangle-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Triangle calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Enter any 3 values on the diagram, including at least one side, and get every
            remaining side, angle, the area, and the perimeter. Once it's solved, copy a link
            to the result instead of re-entering the same numbers.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <TriangleCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A triangle only needs 3 known values to be fully determined, as long as one of them
          is a side. Which formula solves it, Law of Cosines or Law of Sines, depends entirely
          on which 3 values you have. Everything below shows both formulas worked out by hand,
          plus where each one applies and where it doesn't.
        </p>

        <nav aria-label="Table of contents" className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16">
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

        {/* TRIANGLE BASICS */}
        <section id="triangle-basics" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What defines a triangle
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A triangle has 3 sides and 3 angles, and the 3 angles always add up to 180°, no
            matter how stretched or skewed the shape is. That single fact, A + B + C = 180°, is
            what makes it possible to solve for a missing angle once the other two are known.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This calculator (and this page) uses the standard labeling: vertices A, B, and C,
            with side a opposite vertex A, side b opposite vertex B, and side c opposite vertex
            C. "Opposite" matters, side a is the one that doesn't touch corner A, it's the side
            stretched across from it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Only right triangles get to use the plain Pythagorean theorem, a² + b² = c². Every
            other triangle, called an oblique triangle, needs the Law of Cosines or the Law of
            Sines instead. Both of those reduce back down to the Pythagorean theorem in the
            special case where one angle is exactly 90°, which is covered in the Law of Cosines
            section below.
          </p>
        </section>

        {/* SOLVING METHODS */}
        <section id="solving-methods" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The solving methods this tool uses
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Depending on which 3 values you fill in, the calculator picks one of three
            methods automatically.
          </p>
          <ul className="text-gray-200 space-y-4 text-base mb-8 list-none">
            <li>
              <strong className="text-blue-300">SSS (3 sides)</strong>: all three sides known,
              no angles. Solved with the Law of Cosines, once per angle.
            </li>
            <li>
              <strong className="text-blue-300">SAS (2 sides + the angle between them)</strong>:
              the included angle sits between the two known sides. Solved with the Law of
              Cosines to find the third side, then the Law of Sines for the remaining angles.
            </li>
            <li>
              <strong className="text-blue-300">ASA / AAS (2 angles + 1 side)</strong>: the third
              angle comes free from the 180° rule, then the Law of Sines finds both missing
              sides.
            </li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            One combination this calculator does not solve automatically is SSA, two sides and
            an angle that isn't between them. That's the ambiguous case: the same 3 numbers can
            describe zero, one, or two different valid triangles, so there isn't always a single
            answer to hand back. It's covered on its own, with a worked example, in{" "}
            <Link href="#ambiguous-case" className="text-blue-400 hover:underline">
              the ambiguous case section
            </Link>{" "}
            further down.
          </p>
        </section>

        {/* LAW OF COSINES */}
        <section id="law-of-cosines" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Law of Cosines
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The Law of Cosines connects all three sides to one angle. It's the tool for SSS and
            SAS, the two cases where the Law of Sines doesn't have enough to start with (Law of
            Sines needs an angle-side pair that are opposite each other, which neither SSS nor
            SAS gives you right away).
          </p>
          <FormulaBlock>
            <FormulaLine><span>c² = a² + b² − 2ab cos C</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-2 text-base">
            Worked example, SAS: side a = 8, side b = 6, included angle C = 50°.
          </p>
          <FormulaBlock>
            <FormulaLine><span>c² = 8² + 6² − 2(8)(6) cos 50°</span></FormulaLine>
            <FormulaLine><span>c² = 64 + 36 − 96(0.643)</span></FormulaLine>
            <FormulaLine><span>c² = 100 − 61.71 = 38.29</span></FormulaLine>
            <FormulaLine><span>c ≈ 6.19</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-2 text-base">
            With c known, the same formula rearranged finds angle A:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>cos A =</span>
              <Frac n="b² + c² − a²" d="2bc" />
            </FormulaLine>
            <FormulaLine>
              <span>cos A =</span>
              <Frac n="36 + 38.29 − 64" d="2(6)(6.19)" />
              <span>= 0.139</span>
            </FormulaLine>
            <FormulaLine><span>A ≈ 82.0°, so B = 180° − 50° − 82.0° = 48.0°</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            When angle C happens to be 90°, cos 90° is 0, and the whole formula collapses to
            c² = a² + b², the plain Pythagorean theorem. The Law of Cosines is really the
            Pythagorean theorem with a correction term for every angle that isn't a right angle.
          </p>
        </section>

        {/* LAW OF SINES */}
        <section id="law-of-sines" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Law of Sines
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The Law of Sines says the ratio of a side to the sine of its opposite angle is the
            same for all three sides of a triangle. It's the tool for ASA and AAS, where two
            angles and a side are known and the missing pieces are found by proportion instead
            of by the longer Law of Cosines route.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <Frac n="a" d="sin A" />
              <span>=</span>
              <Frac n="b" d="sin B" />
              <span>=</span>
              <Frac n="c" d="sin C" />
              <span>= 2R</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-2 text-base">
            Worked example, ASA: angle A = 50°, angle B = 60°, included side c = 10.
          </p>
          <FormulaBlock>
            <FormulaLine><span>C = 180° − 50° − 60° = 70°</span></FormulaLine>
            <FormulaLine>
              <Frac n="c" d="sin C" />
              <span>=</span>
              <Frac n="10" d="sin 70°" />
              <span>= 10.64</span>
            </FormulaLine>
            <FormulaLine><span>a = 10.64 × sin 50° ≈ 8.15</span></FormulaLine>
            <FormulaLine><span>b = 10.64 × sin 60° ≈ 9.22</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            That constant ratio, 2R, is worth knowing even outside triangle-solving: R is the
            radius of the circle that passes through all three corners of the triangle (the
            circumscribed circle), so the Law of Sines quietly links every oblique triangle back
            to a specific circle.
          </p>
        </section>

        {/* AREA */}
        <section id="area-formulas" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding the area, three ways
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Which area formula is fastest depends on what you already know. This calculator
            uses Heron's formula internally, since it always has all three sides available by
            the time it computes area, regardless of which case (SSS, SAS, or ASA/AAS) it
            started from.
          </p>

          <h3 className="text-xl font-semibold text-blue-300 mb-3">Heron's formula (from 3 sides)</h3>
          <FormulaBlock>
            <FormulaLine>
              <span>s =</span>
              <Frac n="a + b + c" d="2" />
            </FormulaLine>
            <FormulaLine><span>Area = √[ s(s − a)(s − b)(s − c) ]</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 mb-2 text-base">
            For a 5-6-7 triangle: s = (5 + 6 + 7) / 2 = 9.
          </p>
          <FormulaBlock>
            <FormulaLine><span>Area = √[9(9 − 5)(9 − 6)(9 − 7)]</span></FormulaLine>
            <FormulaLine><span>Area = √[9 × 4 × 3 × 2] = √216 ≈ 14.70</span></FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">Two sides and the included angle</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            No need to find the third side first if all you want is the area. This is the
            fastest option straight out of an SAS input.
          </p>
          <FormulaBlock>
            <FormulaLine><span>Area = ½ ab sin C</span></FormulaLine>
            <FormulaLine><span>Area = ½ (8)(6) sin 50° = 24 × 0.766 ≈ 18.39</span></FormulaLine>
          </FormulaBlock>

          <h3 className="text-xl font-semibold text-blue-300 mt-10 mb-3">Base and height</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The familiar one from school, and still the quickest when you can actually measure a
            perpendicular height, like for a triangular plot of land or a roof truss.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>Area =</span>
              <Frac n="base × height" d="2" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            All three give the exact same answer for the same triangle; the differences are only
            about which measurements you happen to already have.
          </p>
        </section>

        {/* OTHER MEASUREMENTS */}
        <section id="other-measurements" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Perimeter, inradius, circumradius
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The perimeter is just the three sides added together, and this calculator reports it
            directly alongside the area. A few other measurements aren't shown in the result
            panel, but follow immediately from the area and sides it does give you.
          </p>
          <FormulaBlock>
            <FormulaLine><span>Perimeter = a + b + c</span></FormulaLine>
            <FormulaLine>
              <span>Inradius, r =</span>
              <Frac n="Area" d="s" />
            </FormulaLine>
            <FormulaLine>
              <span>Circumradius, R =</span>
              <Frac n="abc" d="4 × Area" />
            </FormulaLine>
            <FormulaLine>
              <span>Height to side a, h</span>
              <sub className="text-xs">a</sub>
              <span>=</span>
              <Frac n="2 × Area" d="a" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The inradius is the radius of the largest circle that fits inside the triangle,
            touching all three sides. The circumradius is the radius of the circle that passes
            through all three corners, the same R from the Law of Sines ratio above. Take the
            area and the three sides from this calculator's result and plug them into whichever
            of these you need.
          </p>
        </section>

        {/* TYPES */}
        <section id="triangle-types" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Classifying a triangle
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Every triangle gets two independent labels: one based on its sides, one based on its
            angles. This calculator's Type field only reports the side-based one.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">By side length</h3>
          <ul className="text-gray-200 space-y-2 text-base mb-8 list-disc list-inside">
            <li><strong className="text-blue-300">Scalene</strong>: all three sides different lengths.</li>
            <li><strong className="text-blue-300">Isosceles</strong>: exactly two sides equal, which also means their two opposite angles are equal.</li>
            <li><strong className="text-blue-300">Equilateral</strong>: all three sides equal, which forces every angle to be exactly 60°.</li>
          </ul>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">By angle</h3>
          <ul className="text-gray-200 space-y-2 text-base list-disc list-inside">
            <li><strong className="text-blue-300">Acute</strong>: every angle under 90°.</li>
            <li><strong className="text-blue-300">Right</strong>: one angle exactly 90°, where the Pythagorean theorem applies directly.</li>
            <li><strong className="text-blue-300">Obtuse</strong>: one angle over 90°.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            A triangle can never have two right angles or two obtuse angles at once, since either
            combination would already reach or pass 180° before the third angle is added in.
          </p>
        </section>

        {/* TRIANGLE INEQUALITY */}
        <section id="triangle-inequality" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The triangle inequality
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Not every set of three side lengths can actually close into a triangle. The two
            shorter sides have to add up to more than the longest one, or they simply can't
            reach each other.
          </p>
          <FormulaBlock>
            <FormulaLine><span>a + b &gt; c</span></FormulaLine>
            <FormulaLine><span>a + c &gt; b</span></FormulaLine>
            <FormulaLine><span>b + c &gt; a</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Sides 2, 3, and 6 fail this: 2 + 3 = 5, which is less than 6. Enter those three
            numbers into the SSS fields and the calculator rejects them rather than returning a
            wrong answer, since no such triangle exists to solve.
          </p>
        </section>

        {/* SSA */}
        <section id="ambiguous-case" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The ambiguous case (SSA)
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            SSA means two sides and an angle that is opposite one of them, not sitting between
            them. Unlike SSS, SAS, and ASA/AAS, this combination doesn't always pin down a single
            triangle. Depending on the numbers, it can produce zero, one, or two valid triangles.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Worked example: side a = 7, side b = 10, angle A = 40° (opposite side a).
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>sin B =</span>
              <Frac n="b sin A" d="a" />
              <span>=</span>
              <Frac n="10 × sin 40°" d="7" />
              <span>= 0.918</span>
            </FormulaLine>
            <FormulaLine><span>B ≈ 66.7° or B ≈ 180° − 66.7° = 113.3°</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-2 text-base">
            Both are worth checking, because sine is positive for both an acute and an obtuse
            angle:
          </p>
          <ul className="text-gray-200 space-y-2 text-base mb-6 list-disc list-inside">
            <li>B = 66.7° gives C = 180° − 40° − 66.7° = 73.3°, still positive: a valid triangle.</li>
            <li>B = 113.3° gives C = 180° − 40° − 113.3° = 26.7°, also still positive: a second valid triangle.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            Both triangles are correct answers to the same 3 starting numbers. This calculator
            doesn't attempt SSA automatically, since returning just one of two valid triangles
            would be misleading. If your data fits SSA, work through both angle possibilities as
            shown above, then run whichever one you need back through the SSS or ASA fields to
            get the rest of that triangle's sides and area.
          </p>
        </section>

        {/* COMMON MISTAKES */}
        <section id="common-mistakes" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common mistakes
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Mismatching a side with the wrong angle is the most frequent one. Side a is opposite
            angle A, not next to it; plugging a into a formula that expected the side between two
            known angles produces a triangle that doesn't actually match your original
            measurements.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Mixing degrees and radians is the second. This calculator only accepts degrees. If
            you're working from a formula or another tool that outputs radians, convert first
            (multiply by 180/π) before typing the angle in.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            And treating AAA (three angles, no sides) as solvable: it isn't, not fully. Three
            angles only fix the triangle's shape, not its size, since any two similar triangles
            share the same three angles no matter how big or small they are. At least one side is
            required, which is why this calculator's Solve button won't accept an angles-only
            input.
          </p>
        </section>
         <section className="px-4 mb-16 flex justify-center">
                  <SimilarCalculators
                    title="Similar Math Calculators"
                    links={[
                      { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
                      { label: "Half-Life Calculator", href: "/calculators/math/half-life-calculator" },
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