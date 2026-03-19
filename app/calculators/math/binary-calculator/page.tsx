import { Metadata } from "next";
import dynamic from "next/dynamic"; // <-- import dynamic
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

const BinaryCalculator = dynamic(() => import("./clientside"), { ssr: false });

export const faqData = [
  {
    question: "How do you add two binary numbers?",
    answer:
      "Binary addition follows four specific rules: 0+0=0, 0+1=1, 1+0=1, and 1+1=10 (write 0, carry 1). For example, to add 1010 (10) and 1100 (12): \n1. Rightmost bit: 0 + 0 = 0 \n2. Second bit: 1 + 0 = 1 \n3. Third bit: 0 + 1 = 1 \n4. Leftmost bit: 1 + 1 = 10 \nThe result is 10110 in binary, which equals 22 in decimal.",
  },
  {
    question: "How can I convert Binary to Decimal manually?",
    answer:
      "To convert binary to decimal, multiply each digit by 2 raised to the power of its position (starting from 0 on the right) and sum the results. \nExample for 1011: \n(1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) \n= 8 + 0 + 2 + 1 = 11. \nOur binary calculator automates this process to ensure 100% accuracy for long strings.",
  },
  {
    question: "What is the easiest way to convert Decimal to Binary?",
    answer:
      "The most reliable method is 'Short Division by 2'. \n1. Divide the decimal number by 2. \n2. Record the remainder (0 or 1). \n3. Divide the quotient by 2 again. \n4. Repeat until the quotient is 0. \nThe binary value is the list of remainders read from bottom to top. For instance, 13 becomes 1101 in binary.",
  },
  {
    question: "How does a Binary Calculator handle negative numbers?",
    answer:
      "Most digital systems use 'Two’s Complement' for negative numbers. To find the negative of a binary number: \n1. Invert all bits (change 0s to 1s and 1s to 0s). \n2. Add 1 to the result. \nThis allows computers to perform subtraction using addition logic, making the hardware more efficient.",
  },
  {
    question: "Why are binary calculations important in computing?",
    answer:
      "Binary is the fundamental language of computers because electronic circuits use logic gates representing two states: On (1) and Off (0). Every piece of data, from HD videos to complex software, is processed as a series of binary digits (bits). Using a binary calculator helps developers and mechatronics students verify low-level logic.",
  },
  {
    question: "Can I convert Binary directly to Hexadecimal?",
    answer:
      "Yes! Since 2⁴ = 16, one hex digit represents exactly four binary bits. \nStep 1: Split the binary string into groups of four (e.g., 1011 0101). \nStep 2: Convert each group: 1011 = B and 0101 = 5. \nResult: 10110101 in binary = B5 in Hexadecimal.",
  },
];
export const metadata: Metadata = {
  title: "Binary Calculator Online – Free Online Tool to Convert & Calculate",
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
    canonical: "https://lizocalc.com/calculators/math/binary-calculator",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Binary Calculator – Fast & Accurate Converter",
    description:
      "Easily convert binary to decimal and perform binary calculations online with this fast and accurate tool.",
    url: "https://lizocalc.com/calculators/math/binary-calculator",
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

export default function BinaryCalculatorPage() {
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
                  "https://lizocalc.com/calculators/math/binary-calculator#breadcrumb",
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
                    name: "Math",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Binary Calculator",
                    item: "https://lizocalc.com/calculators/math/binary-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id":
                  "https://lizocalc.com/calculators/math/binary-calculator",
                url: "https://lizocalc.com/calculators/math/binary-calculator",
                name: "Binary Calculator",
                description:
                  "Use our binary calculator to perform binary arithmetic and convert binary numbers to decimal and decimal numbers to binary.",
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
                  "https://lizocalc.com/calculators/math/binary-calculator#app",
                name: "Binary Calculator",
                url: "https://lizocalc.com/calculators/math/binary-calculator",
                description:
                  "Free binary calculator for performing binary arithmetic and converting binary to decimal or decimal to binary.",
                applicationCategory: "UtilitiesApplication",
                applicationSubCategory: "Binary Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Binary addition",
                  "Binary subtraction",
                  "Binary multiplication",
                  "Binary division",
                  "Convert binary to decimal",
                  "Convert decimal to binary",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
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
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Binary Calculator – Convert, Calculate & Analyze Binary Numbers
            Instantly
          </h1>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <BinaryCalculator /> {/* dynamically imported, client-side only */}
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-4">
          Computers speak binary — the foundation of all digital logic,
          programming, CPUs, memory addressing, and data representation. Our
          completely free binary calculator lets you perform accurate binary
          addition, subtraction, multiplication, division, plus instant
          conversions to decimal (base-10) and hexadecimal (base-16). Save your
          calculation history locally, enjoy a clean dark-mode UI, error-proof
          inputs, and mobile responsiveness. Perfect for computer science
          students, software developers, digital electronics learners,
          competitive programmers, or anyone wanting to understand how machines
          really calculate.
        </p>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mt-16 border-b border-blue-600 pb-4 mb-8">
            How to Use the Binary Calculator Effectively
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                1. Enter Only Valid Binary Numbers (0s & 1s)
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Type or paste binary strings into both input boxes. The tool
                strictly enforces binary rules — only digits <strong>0</strong>{" "}
                and <strong>1</strong> are accepted. Any invalid character
                (letters, 2–9, spaces, symbols) triggers an immediate clear
                error message.
              </p>
              <p className="text-gray-300 italic">
                Tip: Great for copying binary from code, registers, memory
                dumps, or logic simulators.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                2. Select the Desired Operation
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">Pick one:</p>
              <ul className="list-disc list-inside text-gray-200 space-y-2 pl-6">
                <li>
                  <strong>Addition (+)</strong> — Bit-by-bit with carry
                </li>
                <li>
                  <strong>Subtraction (−)</strong> — Bit-by-bit with borrow
                </li>
                <li>
                  <strong>Multiplication (×)</strong> — Shift-and-add style
                </li>
                <li>
                  <strong>Division (÷)</strong> — Integer division via repeated
                  subtraction
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                3. Click “Calculate” – See Triple-Format Results
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Results appear instantly in:
              </p>
              <ul className="list-disc list-inside text-gray-200 space-y-2 pl-6">
                <li>
                  <strong>Binary</strong> — Raw arithmetic result
                </li>
                <li>
                  <strong>Decimal</strong> — Easy-to-read base-10 value
                </li>
                <li>
                  <strong>Hexadecimal</strong> — Compact 0x format (programming
                  favorite)
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                4. Reset for Instant New Calculations
              </h3>
              <p className="text-gray-200 leading-relaxed">
                One-click reset clears inputs and output — ideal for testing
                sequences of problems quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Standout Features of This Free Binary Calculator
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                ⚡ Instant & Precise Binary Operations
              </h4>
              <p className="text-gray-200">
                Handles large bit lengths without slowdown.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                ↔ Full Conversions (Bin ↔ Dec ↔ Hex)
              </h4>
              <p className="text-gray-200">One-click multi-base visibility.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                📜 Local History via Browser Cookies
              </h4>
              <p className="text-gray-200">
                Review previous calculations anytime.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                🧼 Modern Dark, Responsive Design
              </h4>
              <p className="text-gray-200">
                Comfortable for long sessions on phone, tablet, or desktop.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                🔒 100% Free • No Ads • No Login
              </h4>
              <p className="text-gray-200">Unlimited use, privacy-focused.</p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-semibold text-blue-300 mb-3">
                🛡️ Smart Input Validation & Guidance
              </h4>
              <p className="text-gray-200">
                Teaches binary rules through helpful errors.
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gray-800/40 rounded-xl border border-gray-700">
            <p className="text-gray-200 mb-4">Need more number system tools?</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/calculators/math/hexadecimal-calculator"
                className="inline-flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-300 hover:text-blue-200 transition-colors"
              >
                → Try Hex Calculator
              </a>
              <a
                href="/calculators/math/lcm-calculator"
                className="inline-flex items-center px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-purple-300 hover:text-purple-200 transition-colors"
              >
                → LCM Calculator (Least Common Multiple)
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary ↔ Decimal Conversions – Detailed with Multiple Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Binary to Decimal: Positional Power-of-2 Method
          </h3>

          <p className="text-gray-200 mb-4">
            Every position in a binary number represents a power of 2. We always
            start counting positions from the <strong>rightmost bit</strong>{" "}
            (called the Least Significant Bit – LSB), which is 2⁰ = 1.
          </p>

          <p className="text-gray-200 mb-6">
            Formula:
            <br />
            <strong>Decimal = Σ (bit × 2^position)</strong>, where position
            starts at 0 from the right.
          </p>

          <p className="text-gray-200 font-medium mb-4">
            Example 1: Convert <strong>1011₂</strong> (binary) to decimal (₁₀)
          </p>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm md:text-base text-white border border-gray-600 border-collapse rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="p-3 md:p-4 text-left font-semibold whitespace-nowrap">
                    Bit (from right to left)
                  </th>
                  <th className="p-3 md:p-4 text-left font-semibold whitespace-nowrap">
                    Position
                  </th>
                  <th className="p-3 md:p-4 text-left font-semibold whitespace-nowrap">
                    Power of 2
                  </th>
                  <th className="p-3 md:p-4 text-left font-semibold whitespace-nowrap">
                    Calculation
                  </th>
                  <th className="p-3 md:p-4 text-left font-semibold whitespace-nowrap">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="p-3 md:p-4">
                    1 <span className="text-xs opacity-70">(LSB)</span>
                  </td>
                  <td className="p-3 md:p-4">0</td>
                  <td className="p-3 md:p-4">2⁰ = 1</td>
                  <td className="p-3 md:p-4">1 × 1</td>
                  <td className="p-3 md:p-4">1</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4">1</td>
                  <td className="p-3 md:p-4">1</td>
                  <td className="p-3 md:p-4">2¹ = 2</td>
                  <td className="p-3 md:p-4">1 × 2</td>
                  <td className="p-3 md:p-4">2</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4">0</td>
                  <td className="p-3 md:p-4">2</td>
                  <td className="p-3 md:p-4">2² = 4</td>
                  <td className="p-3 md:p-4">0 × 4</td>
                  <td className="p-3 md:p-4">0</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4">
                    1 <span className="text-xs opacity-70">(MSB)</span>
                  </td>
                  <td className="p-3 md:p-4">3</td>
                  <td className="p-3 md:p-4">2³ = 8</td>
                  <td className="p-3 md:p-4">1 × 8</td>
                  <td className="p-3 md:p-4">8</td>
                </tr>
                <tr className="font-bold bg-blue-900/40">
                  <td colSpan={4} className="p-3 md:p-4 text-right">
                    Total Decimal Value
                  </td>
                  <td className="p-3 md:p-4">11</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-300 text-sm mt-3 italic">
            Quick reminder: 1011₂ = 8 + 2 + 1 = 11₁₀
          </p>

          <p className="text-gray-400 text-sm mt-4">
            Only the 1s contribute to the final value — that's why binary is so
            efficient for computers!
          </p>

          {/* Quick Reference Table – Updated (only Decimal + Binary) */}
          <div className="mt-10">
            <p className="text-gray-200 font-medium mb-4">
              Quick Reference: Decimal 0–20 and Their Binary Equivalents
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-white border border-gray-600 border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-900/70">
                    <th className="p-3 text-left font-semibold">Decimal</th>
                    <th className="p-3 text-left font-semibold">Binary</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                  <tr>
                    <td className="p-3">0</td>
                    <td className="p-3 font-mono">0</td>
                  </tr>
                  <tr>
                    <td className="p-3">1</td>
                    <td className="p-3 font-mono">1</td>
                  </tr>
                  <tr>
                    <td className="p-3">2</td>
                    <td className="p-3 font-mono">10</td>
                  </tr>
                  <tr>
                    <td className="p-3">3</td>
                    <td className="p-3 font-mono">11</td>
                  </tr>
                  <tr>
                    <td className="p-3">4</td>
                    <td className="p-3 font-mono">100</td>
                  </tr>
                  <tr>
                    <td className="p-3">5</td>
                    <td className="p-3 font-mono">101</td>
                  </tr>
                  <tr>
                    <td className="p-3">6</td>
                    <td className="p-3 font-mono">110</td>
                  </tr>
                  <tr>
                    <td className="p-3">7</td>
                    <td className="p-3 font-mono">111</td>
                  </tr>
                  <tr>
                    <td className="p-3">8</td>
                    <td className="p-3 font-mono">1000</td>
                  </tr>
                  <tr>
                    <td className="p-3">9</td>
                    <td className="p-3 font-mono">1001</td>
                  </tr>
                  <tr>
                    <td className="p-3">10</td>
                    <td className="p-3 font-mono">1010</td>
                  </tr>
                  <tr>
                    <td className="p-3">11</td>
                    <td className="p-3 font-mono">1011</td>
                  </tr>
                  <tr>
                    <td className="p-3">12</td>
                    <td className="p-3 font-mono">1100</td>
                  </tr>
                  <tr>
                    <td className="p-3">13</td>
                    <td className="p-3 font-mono">1101</td>
                  </tr>
                  <tr>
                    <td className="p-3">14</td>
                    <td className="p-3 font-mono">1110</td>
                  </tr>
                  <tr>
                    <td className="p-3">15</td>
                    <td className="p-3 font-mono">1111</td>
                  </tr>
                  <tr>
                    <td className="p-3">16</td>
                    <td className="p-3 font-mono">10000</td>
                  </tr>
                  <tr>
                    <td className="p-3">17</td>
                    <td className="p-3 font-mono">10001</td>
                  </tr>
                  <tr>
                    <td className="p-3">18</td>
                    <td className="p-3 font-mono">10010</td>
                  </tr>
                  <tr>
                    <td className="p-3">19</td>
                    <td className="p-3 font-mono">10011</td>
                  </tr>
                  <tr>
                    <td className="p-3">20</td>
                    <td className="p-3 font-mono">10100</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-3 italic">
              Simple binary representation (no leading zeros)
            </p>
          </div>

          <p className="text-gray-200 mt-10 mb-4">
            Example 2: Larger number — 110101₂ = 32 + 16 + 4 + 1 = 53₁₀
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Decimal to Binary: Repeated Division by 2
          </h3>
          <p className="text-gray-200 mb-4">Record remainders bottom → top.</p>

          <p className="text-gray-200 font-medium mb-4">
            Example: 29₁₀ → binary
          </p>
          <ul className="list-decimal list-inside text-gray-200 space-y-1.5 pl-6 mb-6">
            <li>
              29 ÷ 2 = 14 rem <strong>1</strong>
            </li>
            <li>
              14 ÷ 2 = 7 rem <strong>0</strong>
            </li>
            <li>
              7 ÷ 2 = 3 rem <strong>1</strong>
            </li>
            <li>
              3 ÷ 2 = 1 rem <strong>1</strong>
            </li>
            <li>
              1 ÷ 2 = 0 rem <strong>1</strong>
            </li>
          </ul>
          <p className="text-green-400 font-bold">Binary: 11101</p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Binary Arithmetic Operations – Full Examples & Rules
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Binary Addition Rules & Example
          </h3>
          <p className="text-gray-200 mb-4">
            0+0=0, 0+1=1, 1+0=1, 1+1=0 carry 1
          </p>
          <p className="text-gray-200 font-medium mb-3">
            Example: 1101₂ (13) + 1011₂ (11)
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-tight">
            1 1 0 1 (carry: 1 1 0) 1 1 0 1 + 1 0 1 1 --------- 1 1 0 0 0 → 24₁₀
          </pre>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Binary Subtraction Rules & Example
          </h3>
          <p className="text-gray-200 mb-4">
            0-0=0, 1-0=1, 1-1=0, 0-1=1 borrow 1 (becomes 10-1=1)
          </p>
          <p className="text-gray-200 font-medium mb-3">
            Example: 11010₂ (26) − 1011₂ (11)
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm leading-tight">
            1 1 0 1 0 - 1 0 1 1 --------- 1 0 0 1 1 → 19₁₀
          </pre>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Binary Multiplication Example
          </h3>
          <p className="text-gray-200 mb-4">
            Like decimal — shift & add when bit=1
          </p>
          <p className="text-gray-200 font-medium mb-3">
            Example: 1011₂ (11) × 101₂ (5)
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm">
            1011 × 101 ------ 1011 (×1) 0000 (×0 shifted) 1011 (×1 shifted
            twice) ------ 110111 → 55₁₀
          </pre>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Binary Division (Integer) Example
          </h3>
          <p className="text-gray-200 mb-4">
            Repeated subtraction or long division style.
          </p>
          <p className="text-gray-200 font-medium mb-3">
            Example: 110110₂ (54) ÷ 11₂ (3)
          </p>
          <pre className="bg-gray-900 p-5 rounded-lg overflow-x-auto text-green-300 font-mono text-sm">
            Dividend: 110110 Divisor: 11 Quotient: 10010 (18₁₀) Remainder: 0
          </pre>
          <p className="text-gray-200 mt-4">
            Note: Tool supports positive integers only. For signed/binary
            negative numbers, consider two's complement tools separately.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Results Format & Common Troubleshooting
          </h2>

          <p className="text-gray-200 mb-6">
            Results shown in three bases for easy verification and learning:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3">
            <li>
              <strong>Binary:</strong> Direct computation output
            </li>
            <li>
              <strong>Decimal:</strong> Standard base-10 equivalent
            </li>
            <li>
              <strong>Hexadecimal:</strong> 0x format (memory, colors, bitwise
              debugging)
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Fixing Common Issues
          </h3>
          <ul className="list-disc list-inside text-gray-200 space-y-3">
            <li>
              <strong>Invalid Input Error:</strong> Only 0 & 1 allowed — remove
              other characters
            </li>
            <li>
              <strong>Division by Zero:</strong> Shows clear warning — change
              divisor
            </li>
            <li>
              <strong>Negative Results:</strong> Unsigned calculator only — for
              negatives use two's complement elsewhere
            </li>
            <li>
              <strong>Unexpected Result?:</strong> Verify inputs/operator →
              reset → re-calculate
            </li>
          </ul>

          <p className="text-gray-300 mt-12 text-center italic text-lg">
            Jump in now — practice binary arithmetic, conversions, and build
            real confidence in how computers think!
          </p>
        </section>
      </article>

      {/* FAQ Section */}
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
