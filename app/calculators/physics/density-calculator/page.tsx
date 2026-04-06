import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import DensityCalculator from "./clientside";

const faqData = [
  {
    question: "What is the formula for calculating density?",
    answer:
      "Density is defined as the mass of an object divided by its volume. To calculate it manually, you can use the standard formula: $\\rho = \\frac{m}{V}$. In this equation, $\\rho$ (rho) represents density, $m$ is the mass, and $V$ is the volume. For example, if an object has a mass of 200g and a volume of 40cm³, its density would be $5g/cm^3$.",
  },
  {
    question: "How do I use a density calculator for irregular objects?",
    answer:
      "For objects without straight edges, you first find the mass using a scale. Then, determine the volume using the water displacement method: 1. Fill a graduated cylinder with a known amount of water. 2. Submerge the object. 3. Subtract the initial volume from the new volume. Once you have these two figures, simply input them into the density calculator to get your result.",
  },
  {
    question: "Why does the density of a substance change with temperature?",
    answer:
      "As temperature increases, most substances expand, causing their volume to increase while their mass stays the same. Since density is inversely proportional to volume, an increase in temperature typically results in a decrease in density. This is why warm air rises above cool air—it is literally less dense!",
  },
  {
    question: "What is the difference between density and specific gravity?",
    answer:
      "While density is an absolute measure of mass per unit volume (e.g., $kg/m^3$), specific gravity is a dimensionless ratio. It compares the density of a substance to the density of a reference material, usually water at 4°C. If a substance has a specific gravity greater than 1, it will sink in water; if less than 1, it will float.",
  },
  {
    question: "How do I convert density from g/cm³ to kg/m³?",
    answer:
      "Converting between metric density units is a matter of powers of ten. To convert $g/cm^3$ to $kg/m^3$, you multiply the value by 1,000. For instance, the density of water is approximately $1g/cm^3$, which is equivalent to $1,000kg/m^3$. A density calculator can handle these conversions instantly to avoid manual calculation errors.",
  },
  {
    question: "Can a density calculator help identify a material?",
    answer:
      "Yes! Because density is an intensive property (it doesn't change regardless of how much material you have), it acts like a 'fingerprint.' By calculating the density of an unknown metal and comparing it to a standard density chart—where Gold is $19.3g/cm^3$ and Silver is $10.5g/cm^3$—you can accurately predict what the material is.",
  },
];
export const metadata: Metadata = {
  title: "Density Calculator - Calculate Density, Mass & Volume with Units",
  description:
    "Free online density calculator – instantly calculate density, mass, or volume using ρ = m/V. Supports kg/m³, g/cm³, lb/ft³ and more units.",

  keywords: [
    "density calculator",
    "calculate density",
    "density mass volume calculator",
    "density formula calculator",
    "physics density calculator",
  ],

  alternates: {
    canonical:
      "https://www.lizocalc.com/calculators/physics/density-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Free Density Calculator | Mass, Volume & Density Tool",
    description:
      "Instantly calculate density (ρ = m/V), mass, or volume with multiple units. Free physics tool for students.",
    url: "https://www.lizocalc.com/calculators/physics/density-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Density Calculator - Mass & Volume Tool | LizoCalc",
    description:
      "Free density calculator with multiple units. Solve for density, mass, or volume instantly.",
  },
};
export default function DensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED JSON-LD DATA === */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              // ── 1. BREADCRUMB ──────────────────────────────────────
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#breadcrumb",
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
                    name: "Density Calculator",
                    item: "https://www.lizocalc.com/calculators/physics/density-calculator",
                  },
                ],
              },

              // ── 2. WEBPAGE ─────────────────────────────────────────
              {
                "@type": "WebPage",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator",
                url: "https://www.lizocalc.com/calculators/physics/density-calculator",
                name: "Density Calculator | LizoCalc",
                description:
                  "Calculate density instantly using ρ = m ÷ V. Features unit conversions for kg/m³, g/cm³, and lb/ft³ with step-by-step solutions.",
                  "inLanguage": "en",
  "datePublished": "2026-04-01",
  "dateModified": "2026-04-06",
                // 1. Tell Google the "Answer" to show in Search Results (HowTo #2)
                mainEntity: {
                  "@id":
                    "https://www.lizocalc.com/calculators/physics/density-calculator#howto-calculate-density",
                },

                // 2. Tell Google this page IS the calculator tool
                mainEntityOfPage: {
                  "@type": "SoftwareApplication",
                  "@id":
                    "https://www.lizocalc.com/calculators/physics/density-calculator#app",
                },

                isPartOf: {
                  "@type": "WebSite",
                  name: "LizoCalc",
                  url: "https://www.lizocalc.com",
                },
              },

              // ── 3. SOFTWARE APPLICATION ────────────────────────────
              {
                "@type": "SoftwareApplication",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#app",
                name: "Density Calculator",
                url: "https://www.lizocalc.com/calculators/physics/density-calculator",
                description:
                  "Free online density calculator using ρ = m ÷ V. Calculate density from mass and volume, find missing mass, or solve for volume. Supports g/cm³, kg/m³, lb/ft³ and more with automatic unit conversion.",
                applicationCategory: "EducationalApplication",
                applicationSubCategory: "Physics Calculator",
                operatingSystem: "Any",
                inLanguage: "en",
                browserRequirements:
                  "Requires JavaScript. Works on all modern browsers.",
                audience: {
                  "@type": "Audience",
                  audienceType: "Students, Engineers, Scientists, Teachers",
                },
                featureList: [
                  "Calculate density from mass and volume using ρ = m ÷ V",
                  "Solve for missing mass using m = ρ × V",
                  "Solve for missing volume using V = m ÷ ρ",
                  "Supports g/cm³, kg/m³, lb/ft³, g/L density units",
                  "Auto unit conversion between metric and imperial systems",
                  "Step-by-step calculation breakdown",
                  "Calculation history (last 10 results)",
                  "Works offline after first load",
                  "Mobile-friendly, zero ads",
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
                potentialAction: {
                  "@type": "UseAction",
                  target: [
                    "https://www.lizocalc.com/calculators/physics/density-calculator",
                  ],
                },
              },
              // ── 4. HOWTO #1 — How to Use the Density Calculator ───
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#howto-use-calculator",
                name: "How to Use the Density Calculator",
                image: "https://www.lizocalc.com/logo.webp", // Required
                description:
                  "Step-by-step guide to calculating density from mass and volume using the LizoCalc free online density calculator.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Enter the Mass",
                    text: "Type the mass value into the first field (example: 500) and select the mass unit from the dropdown — g, kg, lb, or tonne.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Enter the Volume",
                    text: "Type the volume value into the second field (example: 250) and choose the volume unit — cm³, m³, L, ft³, or in³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Select Output Density Unit",
                    text: "Choose your desired output density unit from the list — g/cm³, kg/m³, lb/ft³, or g/L.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Click Calculate Density",
                    text: "Press the Calculate Density button. The calculator converts all inputs to SI units, applies ρ = m ÷ V, then converts the result to your selected output unit.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "View the Result",
                    text: "See the density result displayed in large bold text along with the applied formula. Example: 500 g ÷ 250 cm³ = 2 g/cm³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 6,
                    name: "Check the Step-by-Step Explanation",
                    text: "Scroll below the result to see a full breakdown of the calculation including all unit conversions performed.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 7,
                    name: "Review Calculation History",
                    text: "Open the Calculation History tab to review your last 10 results, each saved with timestamp, inputs, and units.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 8,
                    name: "Reset for the Next Calculation",
                    text: "Press the Reset button to clear all fields instantly and begin a fresh calculation.",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Density Calculator" },
                ],
              },

              // ── 5. HOWTO #2 — How to Calculate Density from Mass & Volume ──
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#howto-calculate-density",
                name: "How to Calculate Density from Mass and Volume",
                image: "https://www.lizocalc.com/logo.webp", // Required
                description:
                  "Step-by-step manual method to find density using the formula ρ = m ÷ V, with a fully worked example.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Write Down the Formula",
                    text: "Use the formula ρ = m ÷ V, where ρ (rho) is density, m is mass in kg or g, and V is volume in m³ or cm³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Measure the Mass",
                    text: "Weigh the object using a balance or scale. Record the value in grams (g) or kilograms (kg).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Measure the Volume",
                    text: "For regular shapes, calculate volume from dimensions. For irregular objects, use water displacement.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Make Sure Units Match",
                    text: "Use compatible units before dividing. If mass is in grams and volume is in cm³, the result will be in g/cm³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Divide Mass by Volume",
                    text: "Divide the mass value by the volume value. Example: 193 g ÷ 10 cm³ = 19.3 g/cm³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 6,
                    name: "Write the Unit and Verify",
                    text: "Always write the density unit with your answer (g/cm³ or kg/m³).",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Density Calculator" },
                ],
              },

              // ── 6. HOWTO #3 — How to Find Density of an Irregular Object ──
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#howto-irregular-density",
                name: "How to Find the Density of an Irregular Object",
                image: "https://www.lizocalc.com/logo.webp", // Required
                description:
                  "Step-by-step method to calculate the density of any irregular-shaped object using water displacement and Archimedes' principle.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Weigh the Object",
                    text: "Place the irregular object on a balance or scale and record its mass in grams (g) or kilograms (kg).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Fill a Graduated Cylinder with Water",
                    text: "Pour water into a graduated cylinder and record the initial water level.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Submerge the Object Fully",
                    text: "Carefully lower the object into the water so it is fully submerged.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Read the New Water Level",
                    text: "Read the new water level. The difference is the volume of the object.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Calculate Displaced Volume",
                    text: "Subtract the initial level from the new level to get the object's volume.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 6,
                    name: "Enter Values into LizoCalc",
                    text: "Enter mass and volume into the LizoCalc Density Calculator for the final result.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 7,
                    name: "Identify the Material",
                    text: "Compare your result to standard density tables (e.g., Water = 1, Gold = 19.3) to identify the substance.",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Density Calculator" },
                ],
              },

              // ── 7. HOWTO #4 — How to Convert Density Units ────────
              {
                "@type": "HowTo",
                "@id":
                  "https://www.lizocalc.com/calculators/physics/density-calculator#howto-convert-density-units",
                name: "How to Convert Density Units (g/cm³, kg/m³, lb/ft³)",
                image: "https://www.lizocalc.com/logo.webp", // Required
                description:
                  "Step-by-step guide to converting density between metric and imperial units with exact conversion factors.",
                step: [
                  {
                    "@type": "HowToStep",
                    position: 1,
                    name: "Identify Your Starting Unit",
                    text: "Identify your current unit (e.g., g/cm³ or lb/ft³).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 2,
                    name: "Choose Your Target Unit",
                    text: "Select the unit you need (e.g., kg/m³ for SI standard).",
                  },
                  {
                    "@type": "HowToStep",
                    position: 3,
                    name: "Apply the Conversion Factor",
                    text: "1 g/cm³ = 1000 kg/m³ | 1 g/cm³ = 62.428 lb/ft³.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 4,
                    name: "Multiply by the Factor",
                    text: "Multiply your value by the factor to get the result.",
                  },
                  {
                    "@type": "HowToStep",
                    position: 5,
                    name: "Use LizoCalc for Instant Conversion",
                    text: "Enter your inputs into the LizoCalc Density Calculator to convert units automatically.",
                  },
                ],
                tool: [
                  { "@type": "HowToTool", name: "LizoCalc Density Calculator" },
                ],
              },
              // ── 8. FAQ PAGE ────────────────────────────────────────
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
              Density Calculator – Calculate Density, Mass & Volume
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <DensityCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          The <strong>Density Calculator</strong> is one of the most essential
          tools in physics and everyday science. Density tells us exactly how
          much mass is packed into a given volume — the reason a tiny piece of
          gold feels heavier than a large block of wood, why ships float, and
          how engineers choose materials for bridges, aircraft, and buildings.
          Whether you’re a student preparing for your Class 9 or 10 Punjab Board
          physics exam, a Matric/FSc student tackling numericals, a teacher
          explaining buoyancy and Archimedes’ principle, an engineer checking
          material specifications, or simply someone who wants to understand why
          ice floats on water, our free online density calculator makes every
          calculation instant, accurate, and crystal clear.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8 text-lg">
          Our completely free, no-registration-required{" "}
          <strong>density calculator</strong> does all the heavy lifting. Just
          enter the mass and volume, pick your units (g, kg, lb, cm³, m³, ft³,
          etc.), and get the density instantly — complete with automatic unit
          conversion, step-by-step working, highlighted formula, and a full
          calculation history that saves your last 10 results (with your
          consent). The tool is fully mobile-friendly, works offline after first
          load, handles irregular objects via volume displacement, converts
          between SI and Imperial systems automatically, and never shows ads.
          Perfect for board exam practice, engineering projects, or quick lab
          checks. Jump right in and try it now on our{" "}
          <Link
            href="/calculators/physics/density-calculator"
            className="text-blue-400 hover:underline font-semibold"
          >
            Density Calculator page
          </Link>
          .
        </p>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Use the Online Density Calculator
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-300 mb-5">
                Quick &amp; Easy Step-by-Step Guide
              </h3>
              <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
                <li>
                  Type the mass into the first field (example: <code>500</code>)
                  and select the unit (g, kg, lb, etc.).
                </li>
                <li>
                  Enter the volume in the second field (example:{" "}
                  <code>250</code> cm³ or m³) and pick its unit.
                </li>
                <li>
                  Choose the desired output density unit (g/cm³, kg/m³, lb/ft³,
                  etc.).
                </li>
                <li>
                  Press the large <strong>Calculate Density</strong> button.
                </li>
                <li>
                  Instantly see the result in big bold text with the exact
                  formula applied.
                </li>
                <li>
                  Scroll down for step-by-step explanation and unit conversion
                  details.
                </li>
                <li>
                  Want to reuse a previous calculation? Open the{" "}
                  <strong>Calculation History</strong> tab — your last 10
                  results are saved automatically.
                </li>
                <li>
                  Finished? Hit <strong>Reset</strong> to start fresh for the
                  next numerical.
                </li>
              </ol>
              <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
                Pro tip: The tool automatically converts between any units,
                warns you about division by zero, filters invalid entries, and
                remembers your preferred units so you can solve entire
                worksheets in seconds.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Understanding the Density Formula:{" "}
            <span className="font-mono text-green-300">ρ = m / V</span>
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Density (symbol <span className="font-mono">ρ</span>, Greek letter
            rho) is defined as mass per unit volume. The formula is:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">
            ρ = m / V
          </p>
          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            where <strong>m</strong> is mass (in kg or g) and <strong>V</strong>{" "}
            is volume (in m³ or cm³). The result is usually expressed in kg/m³
            (SI unit) or g/cm³.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Calculating Density from Mass and Volume
          </h3>
          <p className="text-gray-200 text-base mb-4">
            This is the most common use. Example: A 500 g block occupies 250
            cm³. Density = 500 g / 250 cm³ = <strong>2 g/cm³</strong>.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Finding Mass when Density and Volume are Known
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Rearrange the formula:{" "}
            <span className="font-mono text-green-300">m = ρ × V</span>.
            Example: Steel has density 7.85 g/cm³ and volume 100 cm³ → mass =
            785 g.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Determining Volume using Density and Mass
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Rearrange:{" "}
            <span className="font-mono text-green-300">V = m / ρ</span>.
            Example: 1000 g of water (density 1 g/cm³) occupies exactly 1000
            cm³.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Supported Units for Mass, Volume, and Density
          </h2>

          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Quantity</th>
                  <th className="p-4 text-left font-semibold">Common Units</th>
                  <th className="p-4 text-left font-semibold">SI Unit</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Mass</td>
                  <td className="p-4">g, kg, lb, tonne</td>
                  <td className="p-4">kg</td>
                </tr>
                <tr>
                  <td className="p-4">Volume</td>
                  <td className="p-4">cm³, m³, L, ft³, in³</td>
                  <td className="p-4">m³</td>
                </tr>
                <tr>
                  <td className="p-4">Density</td>
                  <td className="p-4">g/cm³, kg/m³, lb/ft³, g/L</td>
                  <td className="p-4">kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Converting Between g/cm³, kg/m³, and lb/ft³
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Our calculator does this instantly, but here are the exact
            relationships:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
            <li>
              <span className="font-mono text-green-300">
                1 g/cm³ = 1000 kg/m³
              </span>{" "}
              (standard conversion)
            </li>
            <li>
              <span className="font-mono text-green-300">
                1 kg/m³ ≈ 0.062428 lb/ft³
              </span>
            </li>
            <li>
              <span className="font-mono text-green-300">
                1 g/cm³ ≈ 62.428 lb/ft³
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Understanding SI Units vs. Imperial Measurement Systems
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            SI (International System) uses kg/m³ — the standard in Pakistan’s
            board exams, universities, and global science. Imperial (lb/ft³) is
            still used in some US engineering contexts. Our tool converts
            seamlessly so you never lose marks for wrong units.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Step-by-Step Calculation Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            How to Calculate the Density of Liquids vs. Solids
          </h3>
          <p className="text-gray-200 text-base">
            For solids: measure mass on a balance, volume by dimensions or
            displacement. For liquids: use a measuring cylinder for volume and
            balance for mass. Example: 250 ml (250 cm³) of oil has mass 225 g →
            density = 0.9 g/cm³.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How to find the density of an irregular object?
          </h3>
          <p className="text-gray-200 text-base">
            Use Archimedes’ principle: submerge in water, measure displaced
            volume. Mass = 150 g, displaced volume = 50 cm³ → density = 3 g/cm³.
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Example 1: Gold Bar
          </h4>
          <p className="text-gray-200 text-base font-mono">
            Mass = 193 g, Volume = 10 cm³
            <br />ρ = 193 / 10 = <strong>19.3 g/cm³</strong>
          </p>

          <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
            Example 2: Steel Block (Imperial)
          </h4>
          <p className="text-gray-200 text-base font-mono">
            Mass = 17.35 lb, Volume = 0.5 ft³
            <br />ρ = 17.35 / 0.5 = <strong>34.7 lb/ft³</strong> (≈ 7850 kg/m³
            after conversion)
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Density Matters in Physics and Engineering
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Common Densities: From Water to Steel and Gold
          </h3>
          <div className="overflow-x-auto mt-8 mb-12">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Material</th>
                  <th className="p-4 text-left font-semibold">
                    Density (kg/m³)
                  </th>
                  <th className="p-4 text-left font-semibold">
                    Density (g/cm³)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Air (20°C)</td>
                  <td className="p-4">1.204</td>
                  <td className="p-4">0.001204</td>
                </tr>
                <tr>
                  <td className="p-4">Water (4°C)</td>
                  <td className="p-4">1000</td>
                  <td className="p-4">1.000</td>
                </tr>
                <tr>
                  <td className="p-4">Ice</td>
                  <td className="p-4">917</td>
                  <td className="p-4">0.917</td>
                </tr>
                <tr>
                  <td className="p-4">Aluminium</td>
                  <td className="p-4">2700</td>
                  <td className="p-4">2.70</td>
                </tr>
                <tr>
                  <td className="p-4">Steel</td>
                  <td className="p-4">7850</td>
                  <td className="p-4">7.85</td>
                </tr>
                <tr>
                  <td className="p-4">Gold</td>
                  <td className="p-4">19300</td>
                  <td className="p-4">19.30</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            What is the Difference Between Density and Specific Gravity?
          </h3>
          <p className="text-gray-200 text-base">
            Density is absolute (kg/m³). Specific gravity is the ratio of a
            substance’s density to water’s density (dimensionless). Specific
            gravity of gold = 19.3. Our calculator shows both when you choose
            “specific gravity” output.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            Why Does Temperature Affect Density Calculations?
          </h3>
          <p className="text-gray-200 text-base leading-relaxed">
            Most substances expand when heated, increasing volume while mass
            stays constant → density decreases. Water is unusual: density is
            maximum at 4°C. Always note the temperature for accurate lab work.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
            How to Use Your Calculation History to Track Results
          </h3>
          <p className="text-gray-200 text-base">
            Every time you calculate, the result is saved with timestamp,
            inputs, and units. Click any past entry to reload it instantly —
            perfect for comparing materials or revising for exams.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Frequently Asked Questions about Density
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Is 1 g/cm³ the same as 1000 kg/m³?
          </h3>
          <p className="text-gray-200 text-base">
            Yes — exactly. This is the density of water and the most common
            conversion you will use in Punjab Board exams.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            What happens to density if the volume is zero?
          </h3>
          <p className="text-gray-200 text-base">
            Mathematically it becomes undefined (division by zero). Our
            calculator shows a clear warning and prevents the calculation.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Standard Density of Water at Room Temperature
          </h3>
          <p className="text-gray-200 text-base">
            At 20°C (typical room temperature), water density is approximately{" "}
            <strong>998 kg/m³</strong> or 0.998 g/cm³. Many textbooks round it
            to 1000 kg/m³ for simplicity.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Why is my result showing in Newtons instead of Kilograms?
          </h3>
          <p className="text-gray-200 text-base">
            Density uses mass (kg), not weight (Newtons). If you accidentally
            entered weight instead of mass, divide by 9.8 m/s² first. Our tool
            always expects mass.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-8 mb-5">
            Can the calculator handle gases and liquids?
          </h3>
          <p className="text-gray-200 text-base">
            Yes — just enter the correct mass and volume (or use STP conditions
            for gases). Try air: 1.2 kg/m³.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Physics Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Pair your density practice with these other free calculators:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/physics/weight-calculator"
                className="text-blue-400 hover:underline"
              >
                Weight Calculator
              </Link>{" "}
              — calculate weight based on mass and gravity
            </li>
            <li>
              <Link
                href="/calculators/physics/speed-calculator"
                className="text-blue-400 hover:underline"
              >
                Speed Calculator
              </Link>
              -Find speed and distance with ease
            </li>
          </ul>

          <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
            Master density today — our free density calculator is fast,
            accurate, unit-smart, and always ready for your next physics
            numerical, board exam, or engineering project. Bookmark it and make
            every calculation effortless!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
