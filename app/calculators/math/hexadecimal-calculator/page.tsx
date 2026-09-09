import { Metadata } from "next";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Script from "next/script";
import Link from "next/link";
import HexCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Hexadecimal Calculator",
  description:
    "Add, subtract, multiply, and divide hex values, then see the result in hex, decimal, and 8-bit binary. Includes a hex-to-decimal converter, a decimal-to-hex converter, and a full hexadecimal multiplication table.",
  keywords: [
    "hexadecimal calculator",
    "hex calculator",
    "hex arithmetic calculator",
    "hex to decimal converter",
    "decimal to hex converter",
    "hex addition subtraction multiplication division",
    "hexadecimal multiplication table",
    "base 16 calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
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
    title: "Hexadecimal Calculator",
    description:
      "Add, subtract, multiply, and divide hex values and see the result in hex, decimal, and binary. Includes hex-decimal conversion tools and a multiplication table.",
    url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexadecimal Calculator",
    description:
      "Add, subtract, multiply, and divide hex values, convert hex to decimal and back, and check your work against a full multiplication table.",
  },
};

const tocItems = [
  { id: "what-is-hexadecimal", label: "What Is Hexadecimal (Base-16)?" },
  { id: "reading-hex-values", label: "How to Read Hex Values: From 0-9 to A-F" },
  { id: "how-to-use", label: "How to Use the Hexadecimal Calculator" },
  { id: "hex-arithmetic", label: "Performing Hex Arithmetic: Add, Subtract, Multiply, and Divide" },
  { id: "hex-addition", label: "Hex Addition" },
  { id: "hex-subtraction", label: "Hex Subtraction" },
  { id: "hex-multiplication", label: "Hex Multiplication" },
  { id: "hex-division", label: "Hex Division" },
  { id: "multiplication-table", label: "Hexadecimal Multiplication Table" },
  { id: "hex-to-decimal", label: "Using the Hex to Decimal Conversion Tool" },
  { id: "decimal-to-hex", label: "Converting Decimal Numbers Back to Hex (Base-16)" },
  { id: "hex-system-explained", label: "Hexadecimal System Explained" },
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
      "@id": "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Hexadecimal Calculator", item: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
      url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
      name: "Hexadecimal Calculator",
      description:
        "Add, subtract, multiply, and divide hex values, and convert between hex, decimal, and binary.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-09",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/hexadecimal-calculator#app",
      name: "Hexadecimal Calculator",
      url: "https://www.lizocalc.com/calculators/math/hexadecimal-calculator",
      description:
        "Adds, subtracts, multiplies, and divides hexadecimal values, and converts between hex, decimal, and 8-bit binary.",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Add, subtract, multiply, and divide hexadecimal values",
        "View results in hex, decimal, and 8-bit binary",
        "Convert hexadecimal to decimal",
        "Convert decimal to hexadecimal",
        "Full hexadecimal multiplication table for manual checks",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
      potentialAction: {
        "@type": "UseAction",
        target: ["https://www.lizocalc.com/calculators/math/hexadecimal-calculator"],
      },
    },
  ],
};

/**
 * Textbook-style stacked fraction: numerator over denominator, separated by a rule.
 */
function Frac({
  n,
  d,
  size = "text-sm",
}: {
  n: React.ReactNode;
  d: React.ReactNode;
  size?: string;
}) {
  return (
    <span className={`inline-flex flex-col items-center align-middle mx-1 leading-none ${size}`}>
      <span className="px-1 pb-0.5">{n}</span>
      <span className="px-1 pt-0.5 border-t border-current">{d}</span>
    </span>
  );
}

/** Raised exponent, sized down and lifted so it sits at the top-right of the base. */
function Exp({ children }: { children: React.ReactNode }) {
  return (
    <sup className="relative -top-2 text-[0.7em] ml-0.5 inline-flex items-center">
      {children}
    </sup>
  );
}

/** A single formula line, laid out left-to-right so fractions and exponents sit inline. */
function FormulaLine({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center flex-wrap gap-1">{children}</div>;
}

/** Dark code-style box that holds one or more FormulaLine rows, stacked vertically. */
function FormulaBlock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm space-y-3 ${className}`}
    >
      {children}
    </div>
  );
}

/** Long-form column arithmetic, set in a monospace block so digits line up the way they do on paper. */
function ColumnMath({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-green-300 font-mono text-base sm:text-lg rounded-lg p-5 overflow-x-auto leading-7 whitespace-pre">
      {children}
    </pre>
  );
}

function toHexDigit(n: number): string {
  return n.toString(16).toUpperCase();
}

// Build the 1x1 through 10x10 (hex) multiplication grid, i.e. 1 through 16 in decimal.
const MUL_TABLE_SIZE = 16;
const mulHeaders = Array.from({ length: MUL_TABLE_SIZE }, (_, i) => toHexDigit(i + 1));
const mulRows = mulHeaders.map((rowLabel, ri) => ({
  label: rowLabel,
  cells: mulHeaders.map((_, ci) => toHexDigit((ri + 1) * (ci + 1))),
}));

export default function HexadecimalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Script
        id="structured-data-hex-calculator"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Hexadecimal calculator</h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Add, subtract, multiply, or divide two hex values and get the answer in hex, decimal,
            and 8-bit binary at once. Below, every operation is worked out digit by digit so you
            can see exactly how the carries and borrows happen in base 16.
          </p>
          <ShareBar />
        </div>
      </section>

      <section className="px-4 py-8">
        <HexCalculator />
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          Most hex tools stop at a single conversion box. This one runs full arithmetic on hex
          operands directly, then breaks the answer into decimal and binary automatically. The
          sections below explain how each operation actually works by hand, not just what button
          to press.
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

        {/* WHAT IS HEXADECIMAL */}
        <section id="what-is-hexadecimal" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Hexadecimal (Base-16)?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Hexadecimal is a base-16 number system. It uses 16 symbols instead of the 10 you'd
            use in decimal: 0 through 9 cover the first ten values, then A, B, C, D, E, and F
            stand in for 10 through 15.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Every digit in a hex number represents a power of 16, the same way every digit in a
            decimal number represents a power of 10. Reading from right to left, the first digit
            counts ones, the next counts sixteens, the next counts two-hundred-fifty-sixes, and so
            on.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Position (from the right)</th>
                  <th className="p-4 text-left">Power of 16</th>
                  <th className="p-4 text-left">Decimal value</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">1st digit</td><td className="p-4">16⁰</td><td className="p-4">1</td></tr>
                <tr><td className="p-4">2nd digit</td><td className="p-4">16¹</td><td className="p-4">16</td></tr>
                <tr><td className="p-4">3rd digit</td><td className="p-4">16²</td><td className="p-4">256</td></tr>
                <tr><td className="p-4">4th digit</td><td className="p-4">16³</td><td className="p-4">4,096</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Computers use hex because it lines up with binary cleanly. 4 binary bits, called a
            nibble, can hold exactly 16 values, from 0000 to 1111, which is precisely the range one
            hex digit covers. A byte is 8 bits, so it always maps to exactly 2 hex digits. That's
            why memory addresses, color codes, and low-level data almost always show up in hex:
            0xFF is easier to read and type than 11111111, and both mean 255.
          </p>
        </section>

        {/* READING HEX VALUES */}
        <section id="reading-hex-values" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Read Hex Values: From 0-9 to A-F
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            The digits 0 through 9 mean exactly what they mean in decimal. Past 9, hex keeps
            counting with letters instead of rolling over to two digits the way decimal would.
            A is 10, B is 11, C is 12, D is 13, E is 14, and F is 15. Only at 16 does hex need a
            second digit, written as 10.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Hex digit</th>
                  <th className="p-4 text-left">Decimal value</th>
                  <th className="p-4 text-left">4-bit binary (nibble)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">0</td><td className="p-4">0</td><td className="p-4">0000</td></tr>
                <tr><td className="p-4">1</td><td className="p-4">1</td><td className="p-4">0001</td></tr>
                <tr><td className="p-4">2</td><td className="p-4">2</td><td className="p-4">0010</td></tr>
                <tr><td className="p-4">3</td><td className="p-4">3</td><td className="p-4">0011</td></tr>
                <tr><td className="p-4">4</td><td className="p-4">4</td><td className="p-4">0100</td></tr>
                <tr><td className="p-4">5</td><td className="p-4">5</td><td className="p-4">0101</td></tr>
                <tr><td className="p-4">6</td><td className="p-4">6</td><td className="p-4">0110</td></tr>
                <tr><td className="p-4">7</td><td className="p-4">7</td><td className="p-4">0111</td></tr>
                <tr><td className="p-4">8</td><td className="p-4">8</td><td className="p-4">1000</td></tr>
                <tr><td className="p-4">9</td><td className="p-4">9</td><td className="p-4">1001</td></tr>
                <tr><td className="p-4">A</td><td className="p-4">10</td><td className="p-4">1010</td></tr>
                <tr><td className="p-4">B</td><td className="p-4">11</td><td className="p-4">1011</td></tr>
                <tr><td className="p-4">C</td><td className="p-4">12</td><td className="p-4">1100</td></tr>
                <tr><td className="p-4">D</td><td className="p-4">13</td><td className="p-4">1101</td></tr>
                <tr><td className="p-4">E</td><td className="p-4">14</td><td className="p-4">1110</td></tr>
                <tr><td className="p-4">F</td><td className="p-4">15</td><td className="p-4">1111</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Hex letters are not case-sensitive, but uppercase (A-F) is the more common convention
            in documentation and in most calculators, including this one, which auto-uppercases
            whatever you type.
          </p>
        </section>

        {/* HOW TO USE */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Hexadecimal Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The main panel has two input boxes, Operand A and Operand B, each of which only
            accepts hex characters (0 to 9, A to F). Between them sits an operator dropdown with 4
            choices: addition, subtraction, multiplication, and division.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Editing either field clears the results panel until you press Calculate Hex. That's on
            purpose. It stops the calculator from showing an answer that no longer matches what's
            in the boxes.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Press Calculate Hex and the results panel fills in with 4 numbers: the hex result at
            the top, the decimal equivalent just below it, the 8-bit binary form under that, and a
            calculation path line, such as{" "}
            <code className="bg-gray-900 px-2 py-1 rounded text-green-300">0x1A + 0xF2</code>, so
            you can confirm exactly what was run. Small copy icons next to the hex and decimal
            values let you grab either one without retyping it.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Reset clears both operands and hides the results. The heart icon in the header saves
            the tool to your saved calculators list, and your last inputs are remembered
            automatically the next time you open the page.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Below the main calculator sit 2 smaller tools built for one-directional conversions:
            Hex to Decimal and Decimal to Hex, covered in their own sections further down this
            page.
          </p>
        </section>

        {/* HEX ARITHMETIC OVERVIEW */}
        <section id="hex-arithmetic" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Performing Hex Arithmetic: Add, Subtract, Multiply, and Divide
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Hex arithmetic follows the same logic as decimal arithmetic. The only real change is
            the base: a column carries or borrows at 16 instead of at 10.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The calculator itself takes a shortcut. It converts both operands to decimal, runs the
            operation, and converts the answer back to hex, which is fast but skips the digit-by-
            digit steps a person works through by hand. The 4 sections below walk through that
            process directly in hex, worked out the way you'd do it on paper.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Two limits are worth knowing before you rely on the results. Subtraction that would
            produce a negative number returns an error instead of an answer, since this calculator
            treats hex values as unsigned. Division by 0 is blocked the same way, and returns
            "Cannot divide by zero."
          </p>
        </section>

        {/* HEX ADDITION */}
        <section id="hex-addition" className="scroll-mt-24 mb-14">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Hex Addition</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Add each column from right to left. Whenever a column's sum reaches 16 or more,
            subtract 16, write down what's left, and carry 1 into the next column, exactly the way
            a decimal carry happens once a column passes 9.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example: 0x1A + 0xF2, the calculator's own default values.
          </p>
          <ColumnMath>{`   1A
 + F2
------
  10C`}</ColumnMath>
          <ul className="text-gray-200 space-y-2 text-base mt-4 mb-4 list-none">
            <li>Ones column: A + 2 = 10 + 2 = 12, which is C. No carry, since 12 is under 16.</li>
            <li>Sixteens column: 1 + F = 1 + 15 = 16. Write 0, carry 1.</li>
            <li>The carried 1 becomes the leading digit of the answer.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            Check it in decimal: 0x1A is 26, 0xF2 is 242, and 26 + 242 = 268, which converts back
            to 0x10C.
          </p>
        </section>

        {/* HEX SUBTRACTION */}
        <section id="hex-subtraction" className="scroll-mt-24 mb-14">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Hex Subtraction</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Subtract each column from right to left. When the top digit is smaller than the
            bottom digit, borrow 16 from the next column to the left, the same way decimal
            subtraction borrows 10.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example without a borrow: 0xFF − 0x1A.
          </p>
          <ColumnMath>{`   FF
 - 1A
------
   E5`}</ColumnMath>
          <ul className="text-gray-200 space-y-2 text-base mt-4 mb-6 list-none">
            <li>Ones column: F − A = 15 − 10 = 5.</li>
            <li>Sixteens column: F − 1 = 15 − 1 = 14, which is E.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Example with a borrow: 0x20 − 0x1F.
          </p>
          <ColumnMath>{`   20
 - 1F
------
   01`}</ColumnMath>
          <ul className="text-gray-200 space-y-2 text-base mt-4 mb-4 list-none">
            <li>Ones column: 0 − F. Since 0 is smaller, borrow 16 from the next column: 16 − 15 = 1.</li>
            <li>Sixteens column: the 2 just lost 1 to the borrow, leaving 1. 1 − 1 = 0.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            Check it in decimal: 0x20 is 32, 0x1F is 31, and 32 − 31 = 1, which is 0x1.
          </p>
        </section>

        {/* HEX MULTIPLICATION */}
        <section id="hex-multiplication" className="scroll-mt-24 mb-14">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Hex Multiplication</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Multiply digit by digit the same way you would in decimal, looking up each digit pair
            in the multiplication table further down this page, then add the partial products
            together using hex addition, carrying at 16.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Simple case, single digit by single digit: 0xA × 0xB.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>0xA × 0xB = 10 × 11 = 110 = 0x6E</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 mb-3 text-base">
            Multi-digit case: 0x1A × 0x2B, worked out as 2 partial products, the way long
            multiplication works in decimal.
          </p>
          <ColumnMath>{`    1A
  × 2B
  ----
   11E   (1A × B)
+  340   (1A × 2, shifted one place left)
  ----
   45E`}</ColumnMath>
          <ul className="text-gray-200 space-y-2 text-base mt-4 mb-4 list-none">
            <li>1A × B: A × B = 6E (write E, carry 6). 1 × B = B, plus the carried 6 = 11 (write 1, carry 1). The final carry gives 11E.</li>
            <li>1A × 2: A × 2 = 14 (write 4, carry 1). 1 × 2 = 2, plus the carried 1 = 3. That gives 34, shifted one digit left to 340 because the 2 sits in the sixteens place of 2B.</li>
            <li>Add the two partial products: 11E + 340 = 45E.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            Check it in decimal: 0x1A is 26, 0x2B is 43, and 26 × 43 = 1,118, which converts back
            to 0x45E.
          </p>
        </section>

        {/* HEX DIVISION */}
        <section id="hex-division" className="scroll-mt-24 mb-16">
          <h3 className="text-2xl font-semibold text-blue-300 mb-4">Hex Division</h3>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Hex long division follows the same steps as decimal long division, just with a base-16
            quotient. This calculator specifically returns the integer part of the quotient only.
            It floors the result, so a division that doesn't come out even still returns a whole
            hex number with the remainder dropped.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">
            Even division: 0x64 ÷ 0x4.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>0x64 ÷ 0x4 = 100 ÷ 4 = 25 = 0x19</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-6 mb-3 text-base">
            Division with a remainder: 0x2A ÷ 0x4.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>0x2A ÷ 0x4 = 42 ÷ 4 = 10.5</span>
            </FormulaLine>
            <FormulaLine>
              <span>floor(10.5) = 10 = 0xA</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The 0.5 left over never appears in the result. If you need the remainder for something
            like a checksum or a hash function, subtract quotient × divisor from the original
            value: 42 − (10 × 4) = 2, so the remainder here is 0x2.
          </p>
        </section>

        {/* MULTIPLICATION TABLE */}
        <section id="multiplication-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Hexadecimal Multiplication Table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            This table lists every product from 1×1 up to 10×10 in hex, which covers 1 through 16
            in decimal. Find the row for one factor and the column for the other; the cell where
            they cross is the hex product, the same lookup used in the multiplication examples
            above.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-xs sm:text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-2 sm:p-3 text-center border-r border-gray-700">×</th>
                  {mulHeaders.map((h) => (
                    <th key={h} className="p-2 sm:p-3 text-center">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {mulRows.map((row) => (
                  <tr key={row.label}>
                    <td className="p-2 sm:p-3 text-center font-bold bg-blue-900/40 border-r border-gray-700">
                      {row.label}
                    </td>
                    {row.cells.map((cell, i) => (
                      <td key={i} className="p-2 sm:p-3 text-center font-mono">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            The diagonal running from the top-left to the bottom-right holds the squares: 1×1,
            2×2, 3×3, and so on up to 10×10 (which is 16×16 decimal, 256, written as 0x100). Every
            value on that diagonal doubles the growth pattern you'd see in a decimal times table,
            because 16 is 4 doublings of 2, not just 1 step past 15.
          </p>
        </section>

        {/* HEX TO DECIMAL */}
        <section id="hex-to-decimal" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Using the Hex to Decimal Conversion Tool
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The Hex to Decimal box under the main calculator does one job. Type a hex value,
            letters and numbers only, since anything else is stripped out as you type, and press
            Convert.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Behind that button, the conversion is a sum. Each digit is multiplied by 16 raised to
            its position, counting from 0 on the right, and the results are added together.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>N =</span>
              <span className="ml-1">Σ dᵢ × 16</span>
              <Exp>i</Exp>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-3 mt-6 text-base">
            Example: converting 0x2F.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>0x2F = (2 × 16</span>
              <Exp>1</Exp>
              <span>) + (F × 16</span>
              <Exp>0</Exp>
              <span>)</span>
            </FormulaLine>
            <FormulaLine>
              <span>= (2 × 16) + (15 × 1)</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 32 + 15</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 47</span>
            </FormulaLine>
          </FormulaBlock>
          <p className="text-gray-200 leading-relaxed mb-3 mt-6 text-base">
            Example with 3 digits: converting 0x3E8.
          </p>
          <FormulaBlock>
            <FormulaLine>
              <span>0x3E8 = (3 × 16</span>
              <Exp>2</Exp>
              <span>) + (E × 16</span>
              <Exp>1</Exp>
              <span>) + (8 × 16</span>
              <Exp>0</Exp>
              <span>)</span>
            </FormulaLine>
            <FormulaLine>
              <span>= (3 × 256) + (14 × 16) + (8 × 1)</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 768 + 224 + 8</span>
            </FormulaLine>
            <FormulaLine>
              <span>= 1,000</span>
            </FormulaLine>
          </FormulaBlock>
        </section>

        {/* DECIMAL TO HEX */}
        <section id="decimal-to-hex" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Converting Decimal Numbers Back to Hex (Base-16)
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The Decimal to Hex box reverses the process. Enter a decimal number and press Convert
            to get the hex equivalent, shown with a 0x prefix.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            By hand, the method is repeated division. Divide the number by 16, write down the
            remainder, divide the quotient by 16 again, and repeat until the quotient reaches 0.
            Reading the remainders from bottom to top gives the hex value.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">Example: converting 47.</p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Step</th>
                  <th className="p-4 text-left">Division</th>
                  <th className="p-4 text-left">Remainder</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">1</td><td className="p-4">47 ÷ 16 = 2</td><td className="p-4">15 (F)</td></tr>
                <tr><td className="p-4">2</td><td className="p-4">2 ÷ 16 = 0</td><td className="p-4">2</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Read the remainders bottom to top: 2, then F. That gives 0x2F, matching the example
            from the section above.
          </p>
          <p className="text-gray-200 leading-relaxed mb-3 text-base">Example: converting 1,000.</p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">Step</th>
                  <th className="p-4 text-left">Division</th>
                  <th className="p-4 text-left">Remainder</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">1</td><td className="p-4">1,000 ÷ 16 = 62</td><td className="p-4">8</td></tr>
                <tr><td className="p-4">2</td><td className="p-4">62 ÷ 16 = 3</td><td className="p-4">14 (E)</td></tr>
                <tr><td className="p-4">3</td><td className="p-4">3 ÷ 16 = 0</td><td className="p-4">3</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mt-6 text-base">
            Read bottom to top again: 3, E, 8, giving 0x3E8, matching the second example from the
            Hex to Decimal section.
          </p>
        </section>

        {/* HEX SYSTEM EXPLAINED */}
        <section id="hex-system-explained" className="scroll-mt-24 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Hexadecimal System Explained
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Binary, decimal, and hex all count the same values. They just group digits
            differently, which changes how compact and how readable a number looks.
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left">System</th>
                  <th className="p-4 text-left">Base</th>
                  <th className="p-4 text-left">Digits used</th>
                  <th className="p-4 text-left">Decimal 26</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr><td className="p-4">Binary</td><td className="p-4">2</td><td className="p-4">0–1</td><td className="p-4">11010</td></tr>
                <tr><td className="p-4">Decimal</td><td className="p-4">10</td><td className="p-4">0–9</td><td className="p-4">26</td></tr>
                <tr><td className="p-4">Hexadecimal</td><td className="p-4">16</td><td className="p-4">0–9, A–F</td><td className="p-4">1A</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Hex shows up constantly in computing because 2 hex digits map to exactly 1 byte, 0x00
            through 0xFF, covering 0 to 255. A few places you'll run into it without necessarily
            calling it "hexadecimal":
          </p>
          <ul className="text-gray-200 space-y-2 text-base mb-6 list-disc list-inside">
            <li>CSS and design tools use 6-digit hex codes for color, such as #FF5733, where FF is red, 57 is green, and 33 is blue.</li>
            <li>Memory addresses and pointers in debuggers and low-level code are printed in hex because it's shorter than binary and maps directly to it.</li>
            <li>MAC addresses on network hardware are written as 6 pairs of hex digits, like 00:1A:2B:3C:4D:5E.</li>
            <li>Error codes, file signatures, and hash digests (MD5, SHA) are usually shown as hex strings.</li>
          </ul>
          <p className="text-gray-200 leading-relaxed text-base">
            Take the CSS example further: #FF5733 splits into 3 bytes. FF is 255 (full red), 57 is
            87 (a little green), and 33 is 51 (a little blue), which together make the burnt-orange
            color you'd see in a swatch. The same hex-to-decimal math from earlier on this page is
            what a browser runs to turn that code into the color on your screen.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "Binary Calculator", href: "/calculators/math/binary-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
              { label: "Percentage Calculator", href: "/calculators/math/percentage-calculator" },
              { label: "Half-Life Calculator", href: "/calculators/math/half-life-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}