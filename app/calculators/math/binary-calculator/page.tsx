import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import BinaryCalculator from "./clientside";
import Link from "next/link";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";
import SimilarCalculators from "@/components/Similarcalculator";

export const metadata: Metadata = {
  title: "Binary Calculator Online – Convert Binary Values",
  description:
    "Use our free online binary calculator to convert binary to decimal and decimal to binary, perform fast addition, subtraction, multiplication, and division, and view results instantly. Perfect for students, developers, and anyone learning binary arithmetic",
  keywords: [
    "binary calculator online",
    "binary to decimal converter tool",
    "decimal to binary calculator free",
    "binary arithmetic calculator online",
    "convert binary numbers instantly",
    "binary addition subtraction calculator",
    "fast binary converter tool",
    "binary number system calculator",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/calculators/math/binary-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Binary Calculator – Fast & Accurate Converter",
    description:
      "Easily convert binary to decimal and perform binary calculations online with this fast and accurate tool.",
    url: "https://www.lizocalc.com/calculators/math/binary-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Calculator – Convert Binary Instantly",
    description:
      "Use this free binary calculator to convert and calculate binary numbers quickly and accurately.",
  },
};

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
      "@id": "https://www.lizocalc.com/calculators/math/binary-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Math", item: "https://www.lizocalc.com/calculators/math" },
        { "@type": "ListItem", position: 4, name: "Binary Calculator", item: "https://www.lizocalc.com/calculators/math/binary-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/math/binary-calculator",
      url: "https://www.lizocalc.com/calculators/math/binary-calculator",
      name: "Binary Calculator – Fast & Accurate Converter | LizoCalc",
      description:
        "Free online binary calculator for binary addition, subtraction, multiplication, division, and conversion between binary and decimal.",
      inLanguage: "en",
      datePublished: "2025-06-01",
      dateModified: "2026-09-06",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/math/binary-calculator#breadcrumb" },
      isPartOf: { "@id": "https://www.lizocalc.com/#website" },
      author: { "@id": "https://www.lizocalc.com/#person-abdullah" },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.lizocalc.com/calculators/math/binary-calculator#app",
      name: "Binary Calculator",
      url: "https://www.lizocalc.com/calculators/math/binary-calculator",
      description:
        "Free binary calculator for binary arithmetic and converting binary to decimal or decimal to binary.",
      applicationCategory: "UtilitiesApplication",
      applicationSubCategory: "Binary Calculator",
      operatingSystem: "Any",
      inLanguage: "en",
      browserRequirements: "Requires JavaScript. Works on modern browsers.",
      featureList: [
        "Binary addition",
        "Binary subtraction",
        "Binary multiplication",
        "Binary division",
        "Convert binary to decimal",
        "Convert decimal to binary",
        "Shareable result links",
      ],
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@type": "Organization", name: "LizoCalc", url: "https://www.lizocalc.com" },
    },
  ],
};

const tocItems = [
  { id: "how-to-use", label: "How to Use the Binary Calculator" },
  { id: "what-are-binary-numbers", label: "What Are Binary Numbers" },
  { id: "binary-decimal-conversion-table", label: "Binary/Decimal Conversion Table" },
  { id: "binary-to-decimal", label: "Binary to Decimal Conversion" },
  { id: "decimal-to-binary", label: "Decimal to Binary Conversion" },
  { id: "binary-addition", label: "Binary Addition" },
  { id: "binary-subtraction", label: "Binary Subtraction" },
  { id: "binary-multiplication", label: "Binary Multiplication" },
  { id: "binary-division", label: "Binary Division" },
];

const conversionTable = [
  { decimal: 1, binary: "1" },
  { decimal: 2, binary: "10" },
  { decimal: 3, binary: "11" },
  { decimal: 4, binary: "100" },
  { decimal: 5, binary: "101" },
  { decimal: 6, binary: "110" },
  { decimal: 7, binary: "111" },
  { decimal: 8, binary: "1000" },
  { decimal: 9, binary: "1001" },
  { decimal: 10, binary: "1010" },
  { decimal: 11, binary: "1011" },
  { decimal: 12, binary: "1100" },
  { decimal: 13, binary: "1101" },
  { decimal: 14, binary: "1110" },
  { decimal: 15, binary: "1111" },
  { decimal: 16, binary: "10000" },
  { decimal: 17, binary: "10001" },
  { decimal: 18, binary: "10010" },
  { decimal: 19, binary: "10011" },
  { decimal: 20, binary: "10100" },
];

export default function BinaryCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <script
        id="structured-data-binary-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Binary Calculator
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Add, subtract, multiply, and divide binary numbers, and convert between binary and decimal.
          </p>
          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <Suspense fallback={<div className="text-center">Loading tool...</div>}>
          <BinaryCalculator />
        </Suspense>
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A binary calculator works out binary addition, subtraction, multiplication, and division,
          and converts values between binary and decimal. Type two binary numbers, pick an
          operation, and it shows the result in binary along with its decimal value, so you can
          check your own working either way.
        </p>

        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Table Of Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base"
                >
                  <span aria-hidden="true">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* How to use */}
        <section id="how-to-use" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Binary Calculator
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Type a binary number into Value A and another into Value B. The boxes only accept 0
            and 1, so anything else gets stripped out as you type.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Pick an operation: addition, subtraction, multiplication, or division. Hit Compute
            and the result shows up in binary, with the matching decimal value right below it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you have a result, you can copy a share link that carries both values and the
            operator, so anyone who opens it sees the same calculation. Reset clears everything
            and starts you over.
          </p>
        </section>

        {/* What are binary numbers */}
        <section id="what-are-binary-numbers" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Are Binary Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Binary is a base-2 number system. It only uses two digits, 0 and 1, where decimal
            uses ten (0 through 9). Computers run on binary because a transistor only has two
            reliable states, off and on, and those map directly onto 0 and 1.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Every digit in a binary number is called a bit. Like decimal, binary is a positional
            system: each bit is worth a power of 2 based on where it sits, counting from the
            right. In decimal, the digit 3 in 300 is worth 3 hundreds. In binary, a 1 in the
            third position from the right is worth 4, because that position holds 2 squared.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The{" "}
            <Link
              href="/calculators/math/hexadecimal-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              hexadecimal calculator
            </Link>{" "}
            covers base 16, which lines up neatly with binary since every 4 bits make one hex
            digit.
          </p>
        </section>

        {/* Conversion table 1-20 */}
        <section id="binary-decimal-conversion-table" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary/Decimal Conversion Table
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Here's decimal 1 through 20 next to their binary values. It's worth memorizing the
            first 8 or so, since the pattern of doubling repeats at every higher range.
          </p>
          <div className="overflow-x-auto rounded-xl border border-gray-700">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Decimal
                  </th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">
                    Binary
                  </th>
                </tr>
              </thead>
              <tbody>
                {conversionTable.map((row, index) => (
                  <tr
                    key={row.decimal}
                    className={index % 2 === 0 ? "bg-gray-800/20" : "bg-gray-800/40"}
                  >
                    <td className="px-6 py-3 text-gray-200 text-base border-b border-gray-700/60">
                      {row.decimal}
                    </td>
                    <td className="px-6 py-3 text-gray-200 text-base font-mono border-b border-gray-700/60">
                      {row.binary}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Notice each binary value in the table above is one bit longer once the decimal
            number passes a power of 2 (after 1, after 3, after 7, after 15).
          </p>
        </section>

        {/* Binary to Decimal */}
        <section id="binary-to-decimal" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary to Decimal: Positional Power-of-2 Method
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            To read a binary number as decimal, give each bit a position, starting at 0 on the
            far right. Raise 2 to that position, multiply by the bit, and add up every column.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Take 1101. It has 4 bits, so the positions run 3, 2, 1, 0 from left to right.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Position</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Power of 2</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Bit</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Value</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-3 text-gray-200">3</td>
                  <td className="px-6 py-3 text-gray-200">2³ = 8</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">8</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">2</td>
                  <td className="px-6 py-3 text-gray-200">2² = 4</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">4</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">2¹ = 2</td>
                  <td className="px-6 py-3 text-gray-200">0</td>
                  <td className="px-6 py-3 text-gray-200">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">0</td>
                  <td className="px-6 py-3 text-gray-200">2⁰ = 1</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                </tr>
                <tr className="font-bold bg-blue-900/40">
                  <td colSpan={3} className="px-6 py-3 text-right">Total</td>
                  <td className="px-6 py-3">13</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Add the value column: 8 plus 4 plus 0 plus 1 comes to 13. So 1101 in binary equals
            13 in decimal. Only the positions holding a 1 count toward the total, which is why a
            binary number with mostly zeros converts to a small decimal value even when it has
            plenty of digits.
          </p>
        </section>

        {/* Decimal to Binary */}
        <section id="decimal-to-binary" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Decimal to Binary: Repeated Division by 2
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Going the other way, divide the decimal number by 2 and write down the remainder,
            which will always be 0 or 1. Divide the quotient by 2 again, and keep going until
            the quotient hits 0. Read the remainders from bottom to top, and that's the binary
            value.
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Take 26 as an example.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-700 mb-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Step</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Division</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Quotient</th>
                  <th className="px-6 py-3 text-blue-300 font-semibold text-base border-b border-gray-700">Remainder</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">26 ÷ 2</td>
                  <td className="px-6 py-3 text-gray-200">13</td>
                  <td className="px-6 py-3 text-gray-200">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">2</td>
                  <td className="px-6 py-3 text-gray-200">13 ÷ 2</td>
                  <td className="px-6 py-3 text-gray-200">6</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">3</td>
                  <td className="px-6 py-3 text-gray-200">6 ÷ 2</td>
                  <td className="px-6 py-3 text-gray-200">3</td>
                  <td className="px-6 py-3 text-gray-200">0</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">4</td>
                  <td className="px-6 py-3 text-gray-200">3 ÷ 2</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-gray-200">5</td>
                  <td className="px-6 py-3 text-gray-200">1 ÷ 2</td>
                  <td className="px-6 py-3 text-gray-200">0</td>
                  <td className="px-6 py-3 text-gray-200">1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-200 leading-relaxed text-base">
            Reading the remainder column from the bottom row up gives 11010. Check it against
            the positional method above and it holds up: 16 plus 8 plus 0 plus 2 plus 0 comes to
            26. The scientific calculator and the fraction calculator on this site use the same
            kind of step-by-step layout if you want more practice with worked examples.
          </p>
        </section>

        {/* Binary Addition */}
        <section id="binary-addition" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary Addition
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Binary addition has four rules: 0 plus 0 is 0, 0 plus 1 is 1, 1 plus 0 is 1, and 1
            plus 1 is 0 with a carry of 1 into the next column. That carry is the only part that
            trips people up, since it behaves the same way carrying works in decimal once a
            column adds up to 10 or more.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Add 10110 (22) and 01111 (15), column by column from the right, carrying whenever a
            column hits 2.
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`  carry      1  1  1  1
             0  1  0  1  1  0
           +  0  0  1  1  1  1
           ----------------------
             1  0  0  1  0  1`}
          </pre>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The rightmost column, 0 plus 1, gives 1 with nothing to carry. The next column, 1
            plus 1, gives 0 and carries a 1. That carry keeps landing in the next column for the
            rest of the sum. The result, 100101, equals 37, which checks out against 22 plus 15.
          </p>
        </section>

        {/* Binary Subtraction */}
        <section id="binary-subtraction" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary Subtraction
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Subtraction rules: 0 minus 0 is 0, 1 minus 0 is 1, 1 minus 1 is 0, and 0 minus 1
            needs a borrow. When you borrow, the 0 becomes 2 for that column (since you're
            borrowing a full unit from the next column over), and the column you borrowed from
            drops by 1.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Subtract 01011 (11) from 11010 (26).
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`  borrow     1  1  1  1
             1  1  0  1  0
           -  0  1  0  1  1
           ----------------------
             0  1  1  1  1`}
          </pre>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            Starting from the right, 0 minus 1 forces a borrow: the column becomes 2 minus 1,
            which is 1, and the next column loses 1 before it does its own subtraction. That
            chain of borrowing runs through most of this example. The result, 01111, is 15, and
            26 minus 11 is indeed 15.
          </p>
        </section>

        {/* Binary Multiplication */}
        <section id="binary-multiplication" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary Multiplication
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Binary multiplication only has two facts to remember: anything times 0 is 0, and
            anything times 1 is itself. For each bit in the bottom number, you either write down
            a row of zeros or copy the top number, shifted left by that bit's position, then add
            every row together.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Multiply 1101 (13) by 110 (6).
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`           1  1  0  1
        ×        1  1  0
        ------------------
           0  0  0  0
        1  1  0  1
     1  1  0  1
     -------------------
     1  0  0  1  1  1  0`}
          </pre>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The rightmost bit of 110 is 0, so the first row is all zeros. The next bit is 1, so
            the second row is 1101 shifted one place left. The last bit is also 1, so the third
            row is 1101 shifted two places left. Adding the three rows gives 1001110, which is
            78, matching 13 times 6.
          </p>
        </section>

        {/* Binary Division */}
        <section id="binary-division" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary Division
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Binary division works the same way long division does in decimal. You bring down
            digits from the dividend one at a time, and each time you bring one down, you check
            whether what you're holding is large enough to subtract the divisor from. If it is,
            that position in the quotient gets a 1 and you subtract. If not, it gets a 0 and you
            bring down the next digit.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Divide 100101 (37) by 101 (5).
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-loose">
{`               1  1  1
           --------------
  101  )  1  0  0  1  0  1
              1  0  1
              --------
               1  0  0  1
                  1  0  1
                  ------
                   1  0  0  0
                      1  0  1
                      ------
                       0  1  1`}
          </pre>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            The first 3 digits of the dividend, 100, are smaller than the divisor, 101, so
            nothing gets subtracted yet. Bringing down the next digit gives 1001, which is
            larger than the divisor, so the quotient gets a 1 and 101 comes out, leaving 100.
            That pattern repeats for the last two digits. The quotient reads 111, which is 7,
            with a remainder of 011, which is 2. That matches 37 divided by 5: 7 with 2 left
            over.
          </p>
          <p className="text-gray-200 leading-relaxed mt-4 text-base">
            Need the same kind of remainder logic for whole numbers instead of binary? The{" "}
            <Link
              href="/calculators/math/gcf-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              GCF calculator
            </Link>{" "}
            and the{" "}
            <Link
              href="/calculators/math/lcm-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              LCM calculator
            </Link>{" "}
            both lean on division and remainders to get their answers.
          </p>
        </section>

        <section className="px-4 mb-16 flex justify-center">
          <SimilarCalculators
            title="Similar Math Calculators"
            links={[
              { label: "Hexadecimal Calculator", href: "/calculators/math/hexadecimal-calculator" },
              { label: "LCM Calculator", href: "/calculators/math/lcm-calculator" },
              { label: "GCF Calculator", href: "/calculators/math/gcf-calculator" },
              { label: "Scientific Calculator", href: "/calculators/math/scientific-calculator" },
            ]}
            seeAllHref="/calculators/math"
          />
        </section>
      </article>

      <Footer />
    </main>
  );
}