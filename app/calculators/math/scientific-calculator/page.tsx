
import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import dynamic from "next/dynamic";
import NoPrefetchLink from "@/components/NoPrefetchLink";

const CasioCalculatorAdvanced= dynamic(() => import("./clientside"), {
  ssr: false,
});


const faqData = [
  {
    question: "What is the difference between DEG, RAD, and GRAD modes?",
    answer: "These modes determine how the calculator interprets angles. DEG (Degrees) is standard for basic geometry, where a circle is 360°. RAD (Radians) is used in calculus and physics, where a circle is $2\pi$. GRAD (Gradients) divides a right angle into 100 units. Using the wrong mode—such as calculating $\sin(90)$ in Radians instead of Degrees—will result in an incorrect value.",
  },
  {
    question: "How do I calculate a square root or Nth root on a scientific calculator?",
    answer: "For a standard square root, press the $\sqrt{x}$ key followed by the number. For higher roots (like a cube root), use the $\sqrt[y]{x}$ or $x^{1/y}$ function. For example, to find the cube root of 27, you would input $27^{(1/3)}$, which equals 3. Ensure you use parentheses around the fraction exponent for accuracy.",
  },
  {
    question: "What does the 'log' and 'ln' button do on my calculator?",
    answer: "The 'log' button calculates the common logarithm (base 10), whereas 'ln' calculates the natural logarithm (base $e \approx 2.718$). If you need to solve $10^x = 100$, you use $\log(100) = 2$. If you are working with exponential growth or decay in science, you will almost always use the 'ln' key.",
  },
  {
    question: "How do I use scientific notation (E or EE) correctly?",
    answer: "The 'EE' or 'EXP' key represents 'times 10 to the power of.' To enter $6.02 \times 10^{23}$, you type 6.02, press EE, and then type 23. Do not manually type $\times 10$ before pressing the EE key, as this will result in an entry that is ten times larger than intended.",
  },
  {
    question: "Why does my scientific calculator give me a fraction instead of a decimal?",
    answer: "Many modern calculators use 'MathPrint' or 'Natural Display' to provide exact answers like $1/3$ or $\pi$ instead of approximations. To convert this to a decimal, look for a toggle key often labeled 'S-D', 'F-D', or a double arrow ($\approx$). Pressing this will instantly switch the output to $0.333...$ or $3.141...$.",
  },
  {
    question: "How do I calculate permutations and combinations (nCr and nPr)?",
    answer: "These keys help you calculate possibilities without manual factorials. Use nPr for permutations (where order matters) and nCr for combinations (where order doesn't). To find how many ways to pick 2 items from 5, you enter $5\text{ nCr }2$. Mathematically, this solves $\frac{5!}{2!(5-2)!}$, which equals 10.",
  },
];
export const metadata: Metadata = {
  title: "Scientific Calculator Online | Fast & Precise Engineering Solver",
  description:
    "Free advanced scientific calculator for trigonometry, logarithms, and roots. Features DEG/RAD modes, memory functions, and step-by-step history tracking.",

  keywords: [
    "scientific calculator online",
    "advanced math calculator",
    "trigonometry calculator",
    "logarithm calculator",
    "online engineering calculator",
    "sin cos tan calculator",
    "casio style online calculator",
    "radian to degree calculator",
  ],

  alternates: {
    canonical: "https://lizocalc.com/calculators/math/scientific-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Scientific Calculator | LizoCalc",
    description:
      "Perform complex calculations including trig, logs, and exponents with our professional-grade scientific calculator.",
    url: "https://lizocalc.com/calculators/math/scientific-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Scientific Calculator | LizoCalc",
    description:
      "A powerful, free online scientific calculator for students and professionals. Solve advanced equations instantly.",
  },
};

export default function ScientificPage() {
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
                  "https://lizocalc.com/calculators/math/scientific-calculator#breadcrumb",
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
                    name: "Scientific Calculator",
                    item: "https://lizocalc.com/calculators/math/scientific-calculator",
                  },
                ],
              },

              {
                "@type": "WebPage",
                "@id":
                  "https://lizocalc.com/calculators/math/scientific-calculator",
                url: "https://lizocalc.com/calculators/math/scientific-calculator",
                name: "Scientific Calculator",
                description:
                  "Free scientific calculator for advanced math operations including trigonometry, logarithms, and square roots.",
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
                  "https://lizocalc.com/calculators/math/scientific-calculator#app",
                name: "Scientific Calculator",
                url: "https://lizocalc.com/calculators/math/scientific-calculator",
                description:
                  "Online scientific calculator that supports trigonometry, logarithms, square roots, and advanced mathematical calculations.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Math Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Trigonometric calculations",
                  "Logarithms and natural logs",
                  "Square root and exponent operations",
                  "Memory functions (M+, M-, MR, MC)",
                  "Calculation history",
                  "Degree and radian modes",
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

      {/* HERO */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
           

            <h1 className="text-3xl md:text-4xl font-bold">
             Scientific Calculator Online | Fast & Precise Engineering Solver
            </h1>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="px-4 py-8">
        <CasioCalculatorAdvanced />
      </section>

      {/* SEO CONTENT */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>advanced scientific calculator</strong> — packed with trigonometric functions, logarithmic functions, exponential functions, memory operations, inverse trig, factorial, scientific notation, and precise order of operations — is essential for students, engineers, physicists, and professionals. Whether you're a student in Sahiwal preparing for Matric, FSc, ECAT, or board exams, a teacher demonstrating formulas, or someone solving real-world calculations, this free online scientific calculator delivers fast, accurate results every time.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required <strong>scientific calculator</strong> handles basic arithmetic operations (addition, subtraction, multiplication, division), parentheses, exponents (x², e^x, 10^x), roots (√x), reciprocals (1/x), logarithms (log, ln natural log), trigonometric functions (sin, cos, tan, sinh, cosh, tanh), inverse trig (asin, acos, atan), factorial (n!, fact), percent (%), sign change (±), absolute value (abs), scientific notation, degrees/radians toggle, real-time preview, Ans key, memory keys (M+, M-, MR), calculation history feature, and keyboard shortcuts. Fully mobile-friendly, works offline after first load, no ads, remembers preferences (with consent). Perfect for homework, exam prep, physics problems, engineering formulas, and daily math. Jump right in and try it now on our{" "}
    <NoPrefetchLink
      href="/calculators/math/scientific-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      scientific calculator page
    </NoPrefetchLink>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Navigate the Advanced Scientific Functions
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Switching Between Degrees (DEG) and Radians (RAD)
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Angle mode dramatically affects sin, cos, tan, and inverse trig results. Our advanced scientific calculator features a clear DEG/RAD toggle button at the top.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
          <li><strong>DEG</strong> — ideal for school trigonometry (sin 90° = 1, tan 45° = 1)</li>
          <li><strong>RAD</strong> — standard in physics, calculus, engineering (sin(π/2) = 1)</li>
          <li>Current mode is always highlighted so you avoid common calculation errors.</li>
        </ul>
        <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
          Pro tip: The calculator remembers your last selected mode — perfect for long study or work sessions.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Mastering the Memory Keys: M+, M-, and MR
        </h3>
        <p className="text-gray-200 text-base leading-relaxed mb-4">
          Save intermediate results for reuse in complex multi-step problems involving exponents, logarithms, or trigonometric functions.
        </p>
        <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
          <li><strong>M+</strong> — adds displayed result to memory</li>
          <li><strong>M-</strong> — subtracts displayed result from memory</li>
          <li><strong>MR</strong> — recalls stored value (use in any expression with parentheses, division, multiplication)</li>
        </ul>
        <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
          Combine memory with Ans for powerful chaining in physics and engineering calculations.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h4 className="text-xl font-bold text-blue-300 mb-5">
          How to clear your calculation history instantly
        </h4>
        <p className="text-gray-200 text-base">
          Press the large <strong>AC</strong> button once to clear the current expression. Press twice (or long-press) to instantly wipe the entire history feature, memory, and reset everything — ideal when switching topics or during timed tests.
        </p>
      </div>

      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Using Keyboard Shortcuts for Faster Math
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-200 text-base mb-3 font-medium">Speed up your workflow with these essential shortcuts:</p>
            <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
              <li><kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Enter</kbd> or <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">=</kbd> → compute result</li>
              <li><kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Esc</kbd> → clear current input</li>
              <li><kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">↑</kbd> / <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">↓</kbd> → scroll calculation history</li>
              <li><kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">Ctrl</kbd> + <kbd className="bg-gray-700 px-2 py-0.5 rounded text-xs">M</kbd> → recall memory (MR)</li>
            </ul>
          </div>
          <div className="bg-gray-900/50 p-5 rounded-xl border border-gray-700">
            <p className="text-green-400 text-sm font-mono">Quick example: 2.5 * (cos(60) + ln(e^3)) → press Enter for instant result</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Solving Trigonometry and Inverse Functions
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Calculating Sine, Cosine, and Tangent
    </h3>
    <p className="text-gray-200 text-base leading-relaxed mb-6">
      Enter angle then press sin, cos, or tan. Always verify DEG/RAD mode for correct trigonometric function results.
    </p>
    <div className="bg-gray-800/50 p-6 rounded-2xl mb-8 overflow-x-auto">
      <table className="min-w-full text-sm text-white">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left">Angle</th>
            <th className="p-4 text-left">sin</th>
            <th className="p-4 text-left">cos</th>
            <th className="p-4 text-left">tan</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          <tr><td className="p-4 font-mono">30° (DEG)</td><td className="p-4 text-green-400 font-mono">0.5000</td><td className="p-4 text-green-400 font-mono">0.8660</td><td className="p-4 text-green-400 font-mono">0.5774</td></tr>
          <tr><td className="p-4 font-mono">π/3 rad (RAD)</td><td className="p-4 text-green-400 font-mono">0.8660</td><td className="p-4 text-green-400 font-mono">0.5000</td><td className="p-4 text-green-400 font-mono">1.7321</td></tr>
          <tr><td className="p-4 font-mono">90° (DEG)</td><td className="p-4 text-green-400 font-mono">1.0000</td><td className="p-4 text-green-400 font-mono">0.0000</td><td className="p-4 text-green-400 font-mono">undefined</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Finding Angles with Inverse Trig (sin⁻¹, cos⁻¹, tan⁻¹)
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Use asin, acos, atan (also labeled sin⁻¹, cos⁻¹, tan⁻¹ or arctangent) to find unknown angles from ratios.
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-5 rounded-xl mb-6">
      asin(0.5) = 30° (in DEG mode)<br />
      acos(0) = 90°<br />
      atan(∞) = 90° (approaches)
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      When to use Radians vs. Degrees in Physics
    </h3>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Degrees (DEG)</h4>
        <p className="text-gray-200">Most school-level trigonometry, right-triangle problems, Matric/FSc exams in Pakistan.</p>
      </div>
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Radians (RAD)</h4>
        <p className="text-gray-200">Angular velocity, wave equations, calculus derivatives, circular motion, advanced physics & engineering.</p>
      </div>
    </div>

    <h4 className="text-xl font-bold text-blue-300 mt-12 mb-5">
      Troubleshooting "Error" messages in trigonometric inputs
    </h4>
    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
      <li>asin / acos of value outside [-1, 1] → domain error</li>
      <li>tan(90°) or tan(π/2) → undefined (division by zero)</li>
      <li>Wrong mode selected → wildly incorrect values</li>
      <li>Solution: Check DEG/RAD indicator, use parentheses, verify input range.</li>
    </ul>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Logarithmic and Exponential Calculations
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      The Difference Between Log (Base 10) and Ln (Natural Log)
    </h3>
    <p className="text-gray-200 text-base leading-relaxed mb-6">
      <strong>log</strong> = logarithm base 10 — common in pH, decibels, Richter scale.<br />
      <strong>ln</strong> = natural logarithm (base e ≈ 2.71828) — used in exponential growth/decay, continuous compounding, calculus.
    </p>
    <div className="bg-gray-800/50 p-6 rounded-2xl font-mono text-green-300 text-sm">
      log(1000) = 3<br />
      ln(e^5) = 5<br />
      10^log(2) = 2
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Working with e and Exponential (exp) Functions
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Use <strong>e^x</strong> (or exp(x)) for continuous exponential functions. Dedicated e button available.
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-5 rounded-xl">
      e^1 ≈ 2.71828<br />
      e^0 = 1<br />
      e^ln(7) = 7
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Calculating Squares (x²), Roots (√x), and Reciprocals (1/x)
    </h3>
    <ul className="list-disc list-inside text-gray-200 space-y-4 text-base ml-5">
      <li><strong>x²</strong> — instant squaring (faster than x*x)</li>
      <li><strong>√x</strong> — square root; extend to cube root with x^(1/3)</li>
      <li><strong>1/x</strong> — reciprocal — useful in fractions, resistance, optics formulas</li>
    </ul>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Features for Students and Professionals
    </h2>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gray-800/40 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Real-Time Result Preview as You Type</h3>
        <p className="text-gray-200">See accurate results update live as you type — excellent for verifying order of operations before final equals press.</p>
      </div>
      <div className="bg-gray-800/40 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Using the "Ans" Key for Multi-Step Equations</h3>
        <p className="text-gray-200">Press <strong>Ans</strong> to insert previous result into new calculation — perfect for iterative physics or chained logarithmic problems.</p>
      </div>
      <div className="bg-gray-800/40 p-7 rounded-2xl border border-gray-700">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">Reviewing Your Calculation History for Accuracy</h3>
        <p className="text-gray-200">Scroll through past expressions and results. Tap any entry to reload and modify — great for checking work or reusing formulas.</p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Practical Math Examples and Tutorials
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      How to calculate compound interest using exponents
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Formula: A = P × (1 + r/n)^(n×t)
    </p>
    <div className="font-mono bg-gray-900 p-6 rounded-2xl text-green-300 text-sm leading-relaxed">
      Example: Rs. 15,000 at 7% compounded monthly for 4 years<br />
      15000 × (1 + 0.07/12)^(12×4) ≈ Rs. 19,802.14
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Solving for unknown sides in a right triangle
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Opposite = Hypotenuse × sin(θ)<br />
      Adjacent = Hypotenuse × cos(θ)<br />
      Hypotenuse = Opposite / sin(θ)
    </p>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-6 rounded-2xl">
      Hypotenuse = 13 cm, θ = 53° → Opposite = 13 × sin(53°) ≈ 10.4 cm<br />
      Adjacent = 13 × cos(53°) ≈ 7.8 cm
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Converting scientific notation into standard decimals
    </h3>
    <p className="text-gray-200 text-base font-mono bg-gray-900 p-6 rounded-2xl">
      3.45 × 10^5 = 345000<br />
      6.78 × 10^{-4} = 0.000678<br />
      Type 6.78e-4 or 3.45E5 — calculator displays both formats automatically.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Math Tools to Explore
    </h2>

    <p className="text-gray-200 text-base mb-6">
      Enhance your calculations with these other free tools from our collection:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li>
        <NoPrefetchLink href="/calculators/math/gcf-calculator" className="text-blue-400 hover:underline">
          GCF Calculator
        </NoPrefetchLink> — greatest common factor & prime factorization
      </li>
      <li>
        <NoPrefetchLink href="/calculators/math/lcm-calculator" className="text-blue-400 hover:underline">
          LCM Calculator
        </NoPrefetchLink> — least common multiple
      </li>
      <li>
        <NoPrefetchLink href="/calculators/math/fraction-calculator" className="text-blue-400 hover:underline">
          Fraction Calculator
        </NoPrefetchLink> — operations + automatic simplification
      </li>
      <li>
        <NoPrefetchLink href="/calculators/math/percentage-calculator" className="text-blue-400 hover:underline">
          Percentage Calculator
        </NoPrefetchLink> — increases, decreases, discounts, ratios
      </li>
    </ul>

    <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
      Conquer trigonometry, logarithms, exponents, scientific notation, and advanced math — our powerful scientific calculator is fast, accurate, completely free, and always available.
    </p>
  </section>
</article>
      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}