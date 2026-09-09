import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import LCMCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "LCM Calculator",
  description:
    "Find the least common multiple of two or more numbers and see the steps in 6 different methods: listing multiples, prime factorization, the cake/ladder method, division, GCF, and a Venn diagram.",
  keywords: [
    "lcm calculator",
    "least common multiple calculator",
    "lcm of two numbers",
    "lcm of three numbers",
    "prime factorization lcm",
    "cake method lcm",
    "ladder method lcm",
    "lcm venn diagram",
    "gcf lcm formula",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/lcm-calculator",
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
    title: "LCM Calculator",
    description:
      "Find the least common multiple of two or more numbers with steps shown in 6 methods, from listing multiples to a Venn diagram.",
    url: "https://www.lizocalc.com/calculators/math/lcm-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LCM Calculator",
    description:
      "Find the LCM of any set of numbers, with steps shown in 6 different methods and a shareable result link.",
  },
};

const tocItems = [
  { id: "what-is-lcm", label: "What Is the Least Common Multiple (LCM)?" },
  { id: "lcm-formula", label: "The LCM Formula: Using GCD for Accuracy" },
  { id: "how-to-use", label: "How to Use the LCM Calculator" },
  { id: "listing-multiples", label: "Finding LCM by Listing Multiples" },
  { id: "prime-factorization", label: "Finding LCM by Prime Factorization" },
  { id: "cake-ladder", label: "Finding LCM by the Cake / Ladder Method" },
  { id: "division-method", label: "Finding LCM by the Division Method" },
  { id: "gcf-method", label: "Finding LCM Using the GCF (GCD) Method" },
  { id: "venn-diagram", label: "Finding LCM with a Venn Diagram" },
  { id: "three-or-more", label: "LCM of Three or More Numbers" },
  { id: "where-used", label: "Where LCM Actually Gets Used" },
  { id: "examples-table", label: "LCM Examples Table" },
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
      "@id": "https://www.lizocalc.com/calculators/math/lcm-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "LCM Calculator", item: "https://www.lizocalc.com/calculators/math/lcm-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/lcm-calculator",
      url: "https://www.lizocalc.com/calculators/math/lcm-calculator",
      name: "LCM Calculator",
      description:
        "Find the least common multiple of two or more numbers with steps in 6 methods.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/lcm-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/lcm-calculator#app",
      name: "LCM Calculator",
      url: "https://www.lizocalc.com/calculators/math/lcm-calculator",
      description:
        "Finds the least common multiple of a set of numbers and shows the work in 6 methods: listing multiples, prime factorization, the cake/ladder method, division, GCF, and a Venn diagram.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Find the LCM of 2 or more numbers",
        "Step-by-step listing multiples method",
        "Step-by-step prime factorization method",
        "Cake / ladder method table",
        "Division method table",
        "GCF (GCD) formula method",
        "Venn diagram for 2 or 3 numbers",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/lcm-calculator"],
      },
    },
  ],
};

function Frac({ n, d, size = "text-sm" }: { n: React.ReactNode; d: React.ReactNode; size?: string }) {
  return (
    <span className={`inline-flex flex-col items-center align-middle mx-1 leading-none ${size}`}>
      <span className="px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5 border-t border-current">{d}</span>
    </span>
  );
}

function FormulaLine({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center flex-wrap gap-1">{children}</div>;
}

function FormulaBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm space-y-3 ${className}`}>
      {children}
    </div>
  );
}

export default function LCMPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-lcm-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">LCM calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Find the least common multiple of 2 or more numbers, and pick how you want to see the
            work: listing multiples, prime factorization, the cake/ladder method, division, GCF,
            or a Venn diagram.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <LCMCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Most LCM tools give you one method and one number. This one solves any set of numbers
          and lets you switch between 6 solving methods on the same result, so you can check your
          homework against whichever method your class actually uses.
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

        {/* WHAT IS LCM */}
        <section id="what-is-lcm" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is the Least Common Multiple (LCM)?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The least common multiple of a set of numbers is the smallest positive number that
            every number in the set divides into evenly. It's also called the lowest common
            multiple, and for fractions specifically, the least common denominator.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Take 4 and 6. The multiples of 4 are 4, 8, 12, 16, 20, 24. The multiples of 6 are 6,
            12, 18, 24. Both lists hit 12 first, so LCM(4, 6) = 12. Notice that 24 also shows up in
            both lists, but 12 got there first, which is exactly what "least" means here.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The LCM is never smaller than the largest number in the set, since it has to be a
            multiple of that number too. If a number you calculated turns out smaller than one of
            your inputs, something's off, that's actually a sign you calculated the greatest common
            factor (GCF) instead.
          </p>
        </section>

        {/* LCM FORMULA */}
        <section id="lcm-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The LCM Formula: Using GCD for Accuracy
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            For 2 numbers, the LCM connects directly to the greatest common divisor (GCD), also
            called the greatest common factor:
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>LCM(a, b) =</span>
              <Frac n="|a × b|" d="GCD(a, b)" />
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-3 mt-6 text-base">
            Example: LCM(12, 18).
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>GCD(12, 18) = 6</span>
            </FormulaLine>
            <FormulaLine>
              <span>LCM(12, 18) =</span>
              <Frac n="12 × 18" d="6" />
              <span>=</span>
              <Frac n="216" d="6" />
              <span>= 36</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            This formula only takes 2 numbers at a time. Section{" "}
            <a href="#three-or-more" className="text-blue-400 hover:underline">
              LCM of Three or More Numbers
            </a>{" "}
            below shows how to chain it for longer lists.
          </p>
        </section>

        {/* HOW TO USE */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the LCM Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Type your numbers into the Number Set box, separated by commas or spaces, for example{" "}
            <code className="bg-gray-900 px-2 py-1 rounded text-green-300">12, 18, 24</code>.
            Negative numbers work too, since the LCM only cares about magnitude.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Just above the Find LCM button sits a Show Steps Using dropdown with 6 options:
            Prime Factorization, Listing Multiples, Cake / Ladder Method, Division Method, GCF
            (GCD) Method, and Venn Diagram. Pick one before or after calculating, since switching
            it afterward re-draws the steps instantly without needing to recalculate.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Press Find LCM and the results panel fills in with the LCM itself, a quick prime
            factorization of every number you entered, a small stats row, and a full Step-by-Step
            Solution panel that matches whichever method is selected in the dropdown.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once a result is showing, a Share This Result box appears with a link that encodes
            your numbers and the selected method. Anyone who opens that link lands on the same
            result, already calculated, without retyping anything.
          </p>
        </section>

        {/* LISTING MULTIPLES */}
        <section id="listing-multiples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM by Listing Multiples
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This is the method most people learn first, because it needs no extra rules, just
            counting. Write out the multiples of each number, in order, until the same value
            appears in every list. That value is the LCM.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example: LCM(12, 18, 24), the calculator's own default numbers.
          </p>
          <FormulaBlock>
            <FormulaLine><span>Multiples of 12: 12, 24, 36, 48, 60, 72</span></FormulaLine>
            <FormulaLine><span>Multiples of 18: 18, 36, 54, 72</span></FormulaLine>
            <FormulaLine><span>Multiples of 24: 24, 48, 72</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            72 is the first number shared by all 3 lists, so LCM(12, 18, 24) = 72. This method
            works fine for small numbers, but it gets slow once a number climbs into the hundreds,
            since you'd be writing out a long list just to spot the first match.
          </p>
        </section>

        {/* PRIME FACTORIZATION */}
        <section id="prime-factorization" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM by Prime Factorization
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Break every number down into its prime factors, written as powers. Then build the LCM
            by taking the highest power of each prime that shows up anywhere in the set, and
            multiplying those together.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Same example: LCM(12, 18, 24).
          </p>
          <FormulaBlock>
            <FormulaLine><span>12 = 2² × 3</span></FormulaLine>
            <FormulaLine><span>18 = 2 × 3²</span></FormulaLine>
            <FormulaLine><span>24 = 2³ × 3</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-3 text-base">
            The highest power of 2 across all 3 is 2³ (from 24). The highest power of 3 is 3²
            (from 18).
          </p>
          <FormulaBlock>
            <FormulaLine><span>LCM = 2³ × 3² = 8 × 9 = 72</span></FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            This is the method most textbooks treat as the reliable default, since it doesn't
            depend on how big the numbers are, only on how many distinct primes they contain.
          </p>
        </section>

        {/* CAKE / LADDER */}
        <section id="cake-ladder" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM by the Cake / Ladder Method
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The cake method, also called the ladder method, arranges the numbers in a row and
            divides the whole row by the smallest prime that divides at least one of them. Numbers
            that don't divide evenly get carried straight down unchanged. Repeat with the next
            prime once the current one stops working, until every number in the row is 1.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example: LCM(12, 18, 24), shown exactly as the calculator's ladder table lays it out.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden font-mono">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-3 text-left">Divide by</th>
                  <th className="p-3 text-center">a</th>
                  <th className="p-3 text-center">b</th>
                  <th className="p-3 text-center">c</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-3">2</td><td className="p-3 text-center">12</td><td className="p-3 text-center">18</td><td className="p-3 text-center">24</td></tr>
                <tr><td className="p-3">2</td><td className="p-3 text-center">6</td><td className="p-3 text-center">9</td><td className="p-3 text-center">12</td></tr>
                <tr><td className="p-3">2</td><td className="p-3 text-center">3</td><td className="p-3 text-center">9</td><td className="p-3 text-center">6</td></tr>
                <tr><td className="p-3">3</td><td className="p-3 text-center">3</td><td className="p-3 text-center">9</td><td className="p-3 text-center">3</td></tr>
                <tr><td className="p-3">3</td><td className="p-3 text-center">1</td><td className="p-3 text-center">3</td><td className="p-3 text-center">1</td></tr>
                <tr className="font-bold text-blue-300"><td className="p-3">—</td><td className="p-3 text-center">1</td><td className="p-3 text-center">1</td><td className="p-3 text-center">1</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            5 divisions were needed: 2, 2, 2, 3, 3. Multiply them together and the answer matches
            the other 2 methods above:
          </p>
          <FormulaBlock className="mt-4">
            <FormulaLine><span>LCM = 2 × 2 × 2 × 3 × 3 = 72</span></FormulaLine>
          </FormulaBlock>
        </section>

        {/* DIVISION METHOD */}
        <section id="division-method" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM by the Division Method
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The division method is the same set of divisions as the cake/ladder method above,
            just written as a running table instead of a stacked cake. Some textbooks teach it
            under this name specifically because it reads left to right like long division, rather
            than top to bottom.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Using the calculator's dropdown to switch to Division Method on the same 12, 18, 24
            example redraws the identical divisions in a plain table, divisor column on the left,
            with a header row naming each number instead of unlabeled columns. The math and the
            final answer, 72, don't change, only the layout does.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Having both views matters mainly for matching your homework format: some courses grade
            the ladder shape, others expect a table with a header row. The calculator produces
            both from the same computation so you can check either one.
          </p>
        </section>

        {/* GCF METHOD */}
        <section id="gcf-method" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM Using the GCF (GCD) Method
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            This method applies the LCM/GCD formula from earlier on this page one pair at a time.
            Find the LCM of the first 2 numbers, then find the LCM of that result and the 3rd
            number, and keep going until every number in the set has been folded in.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example: LCM(12, 18, 24), worked pairwise.
          </p>
          <FormulaBlock>
            <FormulaLine><span>Step 1: GCD(12, 18) = 6</span></FormulaLine>
            <FormulaLine>
              <span>LCM(12, 18) =</span>
              <Frac n="12 × 18" d="6" />
              <span>= 36</span>
            </FormulaLine>
          </FormulaBlock>
          <FormulaBlock className="mt-4">
            <FormulaLine><span>Step 2: GCD(36, 24) = 12</span></FormulaLine>
            <FormulaLine>
              <span>LCM(36, 24) =</span>
              <Frac n="36 × 24" d="12" />
              <span>= 72</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The order you fold numbers in doesn't change the final answer, since LCM is
            associative. Folding 24 in before 18 would still land on 72.
          </p>
        </section>

        {/* VENN DIAGRAM */}
        <section id="venn-diagram" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Finding LCM with a Venn Diagram
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            A Venn diagram version of prime factorization puts each number's prime factors in its
            own circle. Where circles overlap, only the primes shared by both (or all) numbers go
            in that shared region, each written once for however many times it repeats across the
            set. The LCM is the product of every prime shown anywhere in the diagram.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            This calculator draws Venn diagrams for exactly 2 or 3 numbers, since a clean circle
            diagram past 3 sets stops being readable. Here's how the regions work out for LCM(12,
            18, 24):
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-3 text-left">Region</th>
                  <th className="p-3 text-left">Primes placed there</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-3">Only in 12</td><td className="p-3">none</td></tr>
                <tr><td className="p-3">Only in 18</td><td className="p-3">3</td></tr>
                <tr><td className="p-3">Only in 24</td><td className="p-3">2</td></tr>
                <tr><td className="p-3">12 and 24, not 18</td><td className="p-3">2</td></tr>
                <tr><td className="p-3">12 and 18, not 24</td><td className="p-3">none</td></tr>
                <tr><td className="p-3">18 and 24, not 12</td><td className="p-3">none</td></tr>
                <tr><td className="p-3">All 3 numbers</td><td className="p-3">2, 3</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Collect every prime from every region: 2, 2, 2, 3, 3, the same 5 factors the ladder
            method found. Multiplying them gives 2³ × 3² = 72 again.
          </p>
        </section>

        {/* THREE OR MORE */}
        <section id="three-or-more" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            LCM of Three or More Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Every method on this page extends past 2 numbers the same way. Listing multiples just
            needs a longer list per number. Prime factorization and the Venn diagram both take the
            highest power of each prime across the whole set, not just a pair. The ladder,
            division, and GCF methods all fold numbers in one at a time, exactly like the 12, 18,
            24 example above.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The calculator itself has no fixed limit on how many numbers you enter, though the
            Venn diagram view switches to a text explanation once you pass 3 numbers, since drawing
            a readable circle diagram for 4 or more sets isn't practical. The other 5 methods keep
            working at any size.
          </p>
        </section>

        {/* WHERE USED */}
        <section id="where-used" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where LCM Actually Gets Used
          </h2>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Adding and subtracting fractions</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            You can't add 1/6 and 1/8 directly, since the pieces are different sizes. Converting
            both to the least common denominator, LCM(6, 8) = 24, gives 4/24 and 3/24, which add
            cleanly to 7/24.
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Scheduling and repeating events</h3>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            If one bus route repeats every 6 days and another every 10 days, both routes line up
            again on day LCM(6, 10) = 30. The same math answers questions like "when do 2 blinking
            lights flash together again" or "when do 2 shift schedules land on the same day off."
          </p>
          <h3 className="text-xl font-semibold text-blue-300 mb-3">Gear ratios and rotating parts</h3>
          <p className="text-gray-200 leading-relaxed text-base">
            In mechanical design, the LCM of 2 gears' tooth counts tells an engineer how many
            rotations pass before the same 2 teeth mesh again, which matters for predicting wear
            patterns on specific teeth.
          </p>
        </section>

        {/* EXAMPLES TABLE */}
        <section id="examples-table" className="scroll-mt-24 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            LCM Examples Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Numbers</th>
                  <th className="p-4 text-left">LCM</th>
                  <th className="p-4 text-left">Fastest method for this set</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">6, 8</td><td className="p-4">24</td><td className="p-4">Listing Multiples</td></tr>
                <tr><td className="p-4">12, 18</td><td className="p-4">36</td><td className="p-4">GCF Method</td></tr>
                <tr><td className="p-4">15, 20</td><td className="p-4">60</td><td className="p-4">Cake / Ladder Method</td></tr>
                <tr><td className="p-4">12, 18, 24</td><td className="p-4">72</td><td className="p-4">Prime Factorization</td></tr>
                <tr><td className="p-4">4, 6, 10</td><td className="p-4">60</td><td className="p-4">Venn Diagram</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The "fastest method" column is a suggestion, not a rule. Every method on this page
            reaches the same answer for every row; some just take fewer steps depending on how many
            numbers you have and how large they are.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
              { label: "Fraction Calculator", href: "/calculators/math/fraction-calculator" },
              { label: "Hexadecimal Calculator", href: "/calculators/math/hexadecimal-calculator" },
              { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}