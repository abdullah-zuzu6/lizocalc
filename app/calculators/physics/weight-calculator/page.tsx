import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

import Link from "next/link";
import WeightCalculator from "./clientside";


const faqData = [
  {
    question: "What is the formula for calculating weight?",
    answer: "Weight is the force exerted on an object by gravity. The standard formula is $W = m \times g$, where $W$ is weight (measured in Newtons), $m$ is the object's mass (in kilograms), and $g$ is the acceleration due to gravity. On Earth, $g$ is approximately $9.807 m/s^2$.",
  },
  {
    question: "How do you convert mass to weight on Earth?",
    answer: "To find your weight in Newtons on Earth, multiply your mass in kilograms by $9.8$. For example, if an object has a mass of $10 kg$, its weight is $10 \times 9.8 = 98 Newtons$. If you are looking for 'weight' in pounds (lbs), that is actually a measure of force in the Imperial system, where $1 kg$ of mass equals approximately $2.204 lbs$ of force at Earth's surface.",
  },
  {
    question: "Why does my weight change on different planets but my mass doesn't?",
    answer: "Mass is the total amount of 'stuff' (atoms) inside you, which never changes. Weight, however, depends entirely on the gravitational pull of where you are standing. For instance, because the Moon's gravity is only $1.62 m/s^2$, you would weigh about $16.5\%$ of what you do on Earth, even though your mass remains identical.",
  },
  {
    question: "How do I calculate weight from density and volume?",
    answer: "If you don't know the mass, you can calculate weight by first finding the mass ($m = \rho \times V$) and then multiplying by gravity. The full formula is $W = \rho \times V \times g$. For example, $1 m^3$ of lead (density $\approx 11,340 kg/m^3$) would weigh $11,340 \times 1 \times 9.8 = 111,132 Newtons$.",
  },
  {
    question: "Is weight measured in Kilograms or Newtons?",
    answer: "In scientific terms, weight is a force and should be measured in Newtons ($N$). However, in everyday life, we commonly use Kilograms ($kg$) or Pounds ($lbs$) to describe weight. A weight calculator helps bridge this gap by converting mass-based measurements into the actual gravitational force (weight) for different environments.",
  },
  {
    question: "How does altitude affect weight calculation?",
    answer: "Gravity weakens as you move further from the Earth's center. While the change is tiny, you actually weigh slightly less at the top of Mount Everest than at sea level. For high-precision engineering calculations, the value of $g$ is adjusted based on the Inverse Square Law: $g$ decreases as the square of the distance from the center of the Earth increases.",
  },
];
export const metadata: Metadata = {
  title: "Weight Calculator: Calculate Mass to Weight (N & lbs) Across Planets",
  description:
    "Use our free weight calculator to instantly calculate the weight of an object based on its mass and gravitational force using the W = m × g formula.",

  keywords: [
    "weight calculator",
    "mass to weight calculator",
    "gravity weight calculator",
    "physics weight calculator",
    "object weight calculator",
    "calculate weight in newtons",
    "weight on different planets calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics/weight-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Weight Calculator | LizoCalc",
    description:
      "Free physics weight calculator to calculate weight using mass and gravity with professional formulas and instant unit conversions.",
    url: "https://www.lizocalc.com/calculators/physics/weight-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Weight Calculator | LizoCalc",
    description:
      "Calculate weight using mass and gravity instantly with our professional physics weight calculator.",
  },
};
export default function WeightPage() {
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
                  "https://www.lizocalc.com/calculators/physics/weight-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://www.lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://www.lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Physics",
                    item: "https://www.lizocalc.com/calculators/physics",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Weight Calculator",
                    item: "https://www.lizocalc.com/calculators/physics/weight-calculator",
                  },
                ],
              },
              {
  "@type": "WebPage",
  "@id": "https://www.lizocalc.com/calculators/physics/weight-calculator",
  url: "https://www.lizocalc.com/calculators/physics/weight-calculator",
  name: "Weight Calculator",
  description: "Use our weight calculator to determine the weight of an object using mass and gravity instantly.",
  "inLanguage": "en",
  "isPartOf": {
    "@type": "WebSite",
    "name": "LizoCalc",
    "url": "https://www.lizocalc.com"
  }
},

              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/weight-calculator#app",
                name: "Weight Calculator",
                url: "https://www.lizocalc.com/calculators/physics/weight-calculator",
                description:
                  "Physics weight calculator to calculate the weight of an object using mass and gravitational acceleration.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Physics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on modern browsers.",
                featureList: [
                  "Calculate weight using mass and gravity",
                  "Instant physics calculation",
                  "Supports different gravity values",
                  "Accurate scientific calculation",
                  "Simple and fast tool",
                ],
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
                creator: {
                  "@type": "Organization",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
                "mainEntityOfPage": {
  "@type": "SoftwareApplication",
  "@id": "https://www.lizocalc.com/calculators/physics/weight-calculator#app"
}
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
            
            <h1 className="text-3xl md:text-4xl font-bold">
            Weight Calculator: Convert Mass to Gravitational Force Instantly
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <WeightCalculator />

        
      </section>

      {/* SEO Content */}
     <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Planetary Weight Calculator</strong> — also widely known
          as the Gravity Weight Calculator or Solar System Weight Calculator —
          is one of the most important and frequently used concepts in elementary,
          middle school, high school, and even college physics. Whether you're
          a student in Sahiwal working on your class 9 or 10 physics homework,
          a parent helping your child understand why astronauts float on the Moon,
          a teacher preparing examples for the blackboard, an athlete calculating
          training loads on different planets for science projects, or just someone
          curious about space travel, knowing how to calculate weight on other worlds
          makes learning physics exciting and less frustrating.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>planetary weight calculator</strong> takes all the hard work out of the
          process. Simply enter your mass in kilograms, choose any planet (or enter custom gravity),
          click the calculate button, and get instant results — complete with a clean result display,
          highlighted formula breakdown, automatic conversion from Newtons to pounds (lbs), and
          (when you expand it) step-by-step explanations using the universal formula{" "}
          <span className="font-mono text-green-300">W = m × g</span>.
          The tool is fully mobile-friendly, works offline after first load (progressive web app style),
          remembers your last mass and planet (with your consent), handles large inputs, supports all
          major planets plus the Moon, and never shows any ads. Perfect for quick homework checks,
          board exam preparation (Punjab Board, CBSE, Matric/FSc), science fair projects, or everyday
          space curiosity. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/physics/weight-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Planetary Weight Calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Planetary Weight Calculator
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Quick &amp; Easy Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Type your mass in kilograms into the input field (example: <code>70</code> kg).
                </li>
                <li>
                  Choose a planet from the beautiful dropdown presets (Earth, Moon, Mars, Jupiter,
                  Mercury, Venus, Saturn, Uranus, Neptune) — or enter a custom gravity value.
                </li>
                <li>
                  Press the large, eye-catching <strong>Calculate Weight</strong> button.
                </li>
                <li>
                  Instantly see the result displayed in big, bold text at the top: weight in Newtons (N)
                  and automatically converted to pounds (lbs).
                </li>
                <li>
                  Look below for the formula breakdown — mass, gravity, and final weight are all highlighted
                  clearly with unit conversions shown.
                </li>
                <li>
                  Want to see the working? Expand the detailed steps section to view the full{" "}
                  <span className="font-mono text-green-300">W = m × g</span> calculation and manual steps.
                </li>
                <li>
                  Finished? Hit the <strong>Reset</strong> button to clear everything instantly — perfect
                  when you're comparing weight on 8 different planets for a school project.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool automatically normalizes mass units, filters out invalid entries
                (like letters or negative mass), gives gentle warnings for extreme values, supports
                multiple planets at once for comparison, and saves your last calculation history locally
                so you never lose your work. Perfect for Sahiwal students preparing for physics practicals.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Mass vs. Weight: Understanding the Fundamental Difference
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Many students confuse mass and weight, but they are completely different.{" "}
            <strong>Mass</strong> is the amount of matter in an object and is measured in kilograms (kg).
            It never changes — whether you're on Earth, Mars, or floating in space.{" "}
            <strong>Weight</strong> is the gravitational force pulling on that mass and is measured
            in Newtons (N) or pounds (lbs). It changes depending on the planet's gravity.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Why Does Mass Stay Constant While Weight Changes?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed mb-6">
            Mass is an intrinsic property — it only depends on how many atoms are in you. Weight,
            however, depends on two things: your mass and the local gravitational acceleration{" "}
            <span className="font-mono text-green-300">g</span>. On the Moon,{" "}
            <span className="font-mono text-green-300">g</span> is only 1/6th of Earth's, so you weigh
            six times less — but your mass is still exactly the same 70 kg.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating Weight on Earth, Mars, and Jupiter
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Example: A 70 kg student in Sahiwal.
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
            <li>On Earth (<span className="font-mono text-green-300">g = 9.807 m/s²</span>): Weight = 686.5 N</li>
            <li>On Mars (<span className="font-mono text-green-300">g = 3.711 m/s²</span>): Weight = 259.8 N</li>
            <li>On Jupiter (<span className="font-mono text-green-300">g = 24.79 m/s²</span>): Weight = 1,735.3 N</li>
          </ul>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Science of Gravity: How Weight Changes Across the Solar System
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Gravity is the invisible force that keeps planets in orbit and gives us weight.
            Each planet has a different mass and radius, so each has its own surface gravity.
            Our planetary weight calculator uses the latest accepted values from NASA and ESA.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Comparing Planetary Gravity: From Mercury to Jupiter
          </h3>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Planet / Moon</th>
                  <th className="p-4 text-left font-semibold">Gravity (m/s²)</th>
                  <th className="p-4 text-left font-semibold">70 kg Weight (N)</th>
                  <th className="p-4 text-left font-semibold">70 kg Weight (lbs)</th>
                  <th className="p-4 text-left font-semibold">% of Earth Weight</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Mercury</td>
                  <td className="p-4 font-mono text-green-300">3.70</td>
                  <td className="p-4">259.0</td>
                  <td className="p-4">58.2</td>
                  <td className="p-4">37.7%</td>
                </tr>
                <tr>
                  <td className="p-4">Venus</td>
                  <td className="p-4 font-mono text-green-300">8.87</td>
                  <td className="p-4">620.9</td>
                  <td className="p-4">139.6</td>
                  <td className="p-4">90.4%</td>
                </tr>
                <tr>
                  <td className="p-4">Earth</td>
                  <td className="p-4 font-mono text-green-300">9.807</td>
                  <td className="p-4">686.5</td>
                  <td className="p-4">154.3</td>
                  <td className="p-4">100%</td>
                </tr>
                <tr>
                  <td className="p-4">Moon</td>
                  <td className="p-4 font-mono text-green-300">1.62</td>
                  <td className="p-4">113.4</td>
                  <td className="p-4">25.5</td>
                  <td className="p-4">16.5%</td>
                </tr>
                <tr>
                  <td className="p-4">Mars</td>
                  <td className="p-4 font-mono text-green-300">3.711</td>
                  <td className="p-4">259.8</td>
                  <td className="p-4">58.4</td>
                  <td className="p-4">37.8%</td>
                </tr>
                <tr>
                  <td className="p-4">Jupiter</td>
                  <td className="p-4 font-mono text-green-300">24.79</td>
                  <td className="p-4">1,735.3</td>
                  <td className="p-4">390.1</td>
                  <td className="p-4">252.8%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Gravity Values Used in Our Planetary Database
          </h4>
          <p className="text-gray-200 text-base">
            All values are standardized from NASA planetary fact sheets (2024–2025 data). Earth uses the
            precise average <span className="font-mono text-green-300">9.807 m/s²</span> at sea level.
            You can also enter custom values for hypothetical planets or exoplanets.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            How to Use Planetary Presets for Instant Gravity Inputs
          </h3>
          <p className="text-gray-200 text-base">
            Just tap the planet name — the calculator instantly loads the correct{" "}
            <span className="font-mono text-green-300">g</span> value. No need to remember numbers!
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step Calculation: Using the Weight Formula (W = m × g)
          </h2>

          <p className="text-gray-200 text-base mb-6">
            The universal formula for weight is extremely simple yet powerful. It works everywhere
            in the universe.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mb-2">
            Formula:{" "}
            <span className="font-mono text-green-300">W = m × g</span>
          </h4>
          <p className="text-gray-200 text-base mb-6">
            Where <strong>W</strong> = weight (Newtons), <strong>m</strong> = mass (kg),
            <strong>g</strong> = gravitational acceleration (m/s²).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Physics Made Simple: Solving for Force (N) with Mass (kg)
          </h3>
          <p className="text-gray-200 text-base mb-4">
            The calculator does the multiplication instantly, but here's how you do it manually:
          </p>
          <p className="text-gray-200 text-base">
            70 kg × 9.807 m/s² = <strong>686.49 N</strong> (on Earth)
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Understanding the Role of the Gravitational Constant (9.807 m/s²)
          </h3>
          <p className="text-gray-200 text-base">
            This is not the universal gravitational constant G (6.67430 × 10⁻¹¹). This{" "}
            <span className="font-mono text-green-300">9.807 m/s²</span> is the local acceleration
            due to Earth's gravity at sea level. Every planet has its own value.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Example: Finding the Weight of a 70kg Person on the Moon
          </h3>
          <p className="text-gray-200 text-base">
            Mass = 70 kg<br />
            Moon g = 1.62 m/s²<br />
            Weight = 70 × 1.62 = <strong>113.4 N</strong> (only 16.5% of Earth weight!)
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            How to Calculate Gravitational Force Manually
          </h4>
          <p className="text-gray-200 text-base">
            Step 1: Write down mass in kg.<br />
            Step 2: Look up or select <span className="font-mono text-green-300">g</span>.<br />
            Step 3: Multiply.<br />
            Step 4: (Optional) Convert N to lbs by dividing by 4.448.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Converting Newtons to Pounds: Metric and Imperial Systems Explained
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In Pakistan and most countries we use the metric system (Newtons), but many
            international websites and NASA use pounds. Our calculator shows both instantly.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-5 mb-3">
            Normalizing Mass Units for Precision Calculations
          </h4>
          <p className="text-gray-200 text-base">
            The tool only accepts kilograms for mass (standard SI unit). If you enter pounds,
            it automatically converts using 1 kg = 2.20462 lbs so your result is always precise.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Interpreting Results in Newtons (N) vs. Pounds (lbs)
          </h4>
          <p className="text-gray-200 text-base">
            1 Newton ≈ 0.2248 pounds-force.<br />
            Example: 686.5 N (Earth) = <strong>154.3 lbs</strong>.<br />
            On Jupiter: 1,735.3 N = <strong>390.1 lbs</strong> — you would feel more than 2.5 times heavier!
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real-World Applications of Gravitational Force Calculations
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Space Mission Planning &amp; Astronaut Training
          </h3>
          <p className="text-gray-200 text-base">
            NASA uses the same formula to calculate how much an astronaut will weigh on Mars
            before sending rovers or planning human missions.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Sports Science &amp; Fitness on Other Planets
          </h3>
          <p className="text-gray-200 text-base">
            Olympic athletes and scientists simulate low-gravity training using the Moon's{" "}
            <span className="font-mono text-green-300">1.62 m/s²</span> to prepare for future missions.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Engineering &amp; Physics Board Exams
          </h3>
          <p className="text-gray-200 text-base">Common Matric/FSc questions include:</p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-5">
            <li>What would a 50 kg bag weigh on Mars?</li>
            <li>Why do astronauts need less fuel to jump on the Moon?</li>
            <li>Calculating escape velocity using gravity values</li>
            <li>Designing habitats for low-gravity environments</li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Your Local Calculation History is Saved
          </h3>
          <p className="text-gray-200 text-base">
            With your permission, the calculator stores your last 5 calculations in your browser
            so you can quickly compare “My weight on Earth vs Mars” for revision.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Physics Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your planetary weight practice with these other free, fast calculators from
            our collection:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            
            <li>
              <Link
                href="/calculators/math/conversion-calculator"
                className="text-blue-400 hover:underline"
              >
                Conversion Converter
              </Link>{" "}
              — N to lbs, kg to lbs, and more
            </li>
            <li>
              <Link
                href="/calculators/math/scientific-calculator"
                className="text-blue-400 hover:underline"
              >
                Scientific Calculator
              </Link>{" "}
              — exponents, roots, trigonometry, and motion formulas
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Master mass, weight, and gravity — our planetary weight calculator is fast, accurate,
            completely free, and always ready whenever you need it. Bookmark it today and make your
            physics homework, exam prep, or space dreams so much easier!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
