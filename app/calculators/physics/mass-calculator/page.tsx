import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";
import Link from "next/link";
import MassCalculator from "./clientside";

const faqData = [
  {
    question: "What is the formula to find mass using density and volume?",
    answer: "To find the mass of an object, you multiply its density by its volume. The standard formula is $m = \rho \times V$, where $m$ is mass, $\rho$ (rho) is density, and $V$ is volume. For example, if you have 2 liters ($2,000 cm^3$) of water with a density of $1 g/cm^3$, the mass is exactly $2,000 grams$ or $2 kilograms$.",
  },
  {
  question: "What is the difference between mass and weight?",
  answer: "Mass is the amount of matter in an object and remains constant anywhere in the universe. Weight, however, is the force of gravity acting on that mass. The relationship is defined by $W = m \\times g$. While your mass is the same on Earth and the Moon, you would weigh much less on the Moon because its gravitational acceleration ($g$) is only about $1.62 m/s^2$ compared to Earth's $9.8 m/s^2$."
},
  {
    question: "How do you calculate the mass of a chemical solution?",
    answer: "In chemistry, mass is often calculated using molar mass and the number of moles. The formula is $m = n \times M$, where $n$ is the amount of substance in moles and $M$ is the molar mass (g/mol). For instance, to find the mass of 2 moles of Water ($H_2O$), you multiply 2 by its molar mass ($18.015 g/mol$) to get $36.03 grams$.",
  },
  {
    question: "How can I find mass if I only know force and acceleration?",
    answer: "Based on Newton's Second Law of Motion, mass can be determined if you know the force applied and the resulting acceleration. By rearranging $F = m \times a$, we get $m = F / a$. If a force of $50 Newtons$ causes an object to accelerate at $5 m/s^2$, the mass of that object is $10 kg$.",
  },
  {
    question: "Why is mass considered an 'intrinsic property' of matter?",
    answer: "Mass is intrinsic because it does not depend on external factors like location, temperature, or pressure. Unlike volume, which can change if you heat a gas, or weight, which changes based on gravity, the number of atoms and molecules (the mass) stays the same unless matter is physically added or removed.",
  },
  {
    question: "How do you convert between Imperial and Metric mass units?",
    answer: "Mass calculators typically use conversion factors to switch between systems. To convert pounds (lbs) to kilograms (kg), you multiply by $0.453592$. Conversely, to go from kilograms to pounds, you multiply by $2.20462$. For example, a $150 lb$ person has a mass of approximately $68.04 kg$.",
  },
];
export const metadata: Metadata = {
  title: "Mass Calculator – Find Mass from Density & Volume ",

  description:
    "Free online mass calculator using m = ρ × V. Instantly calculate mass from density and volume with unit conversion (kg, g, lb, oz). Step-by-step results for students & engineers.",

  keywords: [
    "mass calculator",
    "calculate mass from density and volume",
    "mass formula m = rho x V",
    "physics mass calculator online",
    "density volume mass calculator",
    "mass calculator kg grams pounds",
    "mass calculator for students",
    "mass calculator engineering",
    "how to calculate mass",
    "mass weight difference calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics/mass-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
    description:
      "Calculate mass from density and volume instantly. Supports kg, g, lb, oz and more. Free physics tool with step-by-step working for students and engineers.",
    url: "https://www.lizocalc.com/calculators/physics/mass-calculator",
    siteName: "LizoCalc",
    type: "website",
   
  },

  twitter: {
    card: "summary_large_image",
    title: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
    description:
      "Free physics mass calculator. Enter density & volume, get mass instantly in any unit. Step-by-step working included.",
  },
};

export default function MassCalculatorPage() {
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

        // ── 1. BREADCRUMB ──────────────────────────────────────
        {
          "@type": "BreadcrumbList",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#breadcrumb",
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
              name: "Mass Calculator",
              item: "https://www.lizocalc.com/calculators/physics/mass-calculator",
            },
          ],
        },

        // ── 2. WEBPAGE ─────────────────────────────────────────
        {
          "@type": "WebPage",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator",
          url: "https://www.lizocalc.com/calculators/physics/mass-calculator",
          name: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
          description:
            "Free online mass calculator using m = ρ × V. Enter density and volume in any unit and instantly get mass in kg, g, lb, or oz with step-by-step working.",
          inLanguage: "en",
          datePublished: "2025-01-01",
          dateModified: "2026-04-05",
          isPartOf: {
            "@type": "WebSite",
            name: "LizoCalc",
            url: "https://www.lizocalc.com",
          },
          mainEntityOfPage: {
            "@type": "SoftwareApplication",
            "@id":
              "https://www.lizocalc.com/calculators/physics/mass-calculator#app",
          },
        },

        // ── 3. SOFTWARE APPLICATION ────────────────────────────
        {
          "@type": "SoftwareApplication",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#app",
          name: "Mass Calculator",
          url: "https://www.lizocalc.com/calculators/physics/mass-calculator",
          description:
            "Free physics mass calculator using m = ρ × V. Calculate mass from density and volume with automatic unit conversion across kg, g, lb, oz and more.",
          applicationCategory: "EducationalApplication",
          applicationSubCategory: "Physics Calculator",
          operatingSystem: "Any",
          inLanguage: "en",
          browserRequirements:
            "Requires JavaScript. Works on all modern browsers.",
          audience: {
            "@type": "Audience",
            audienceType: "Students, Engineers, Scientists",
          },
          featureList: [
            "Calculate mass from density and volume using m = ρ × V",
            "Supports kg, g, lb, oz, tonne, mg, carat output units",
            "Auto unit conversion across metric and imperial systems",
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
              "https://www.lizocalc.com/calculators/physics/mass-calculator",
            ],
          },
        },

        // ── 4. HOWTO #1 — How to Use the Calculator ───────────
        // Targets: "how to use mass calculator", "how to calculate mass online"
        {
          "@type": "HowTo",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#howto-use-calculator",
          name: "How to Use the Mass Calculator",
          description:
            "Step-by-step guide to calculating mass from density and volume using the LizoCalc free online mass calculator.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Enter Density",
              text: "Enter the density value in the first field (example: 7.85) and select the unit from the dropdown — kg/m³, g/cm³, lb/ft³, lb/gal, g/L, or oz/in³.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Enter Volume",
              text: "Input the volume value in the second field (example: 0.2) and choose the volume unit — m³, cm³, L, ft³, in³, gal, or ml.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Select Output Unit",
              text: "Select your desired output mass unit from the list — kg, g, lb, mg, oz, tonne, or carat.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Click Calculate Mass",
              text: "Click the Calculate Mass button. The calculator normalizes all inputs to SI units, applies the formula m = ρ × V, then converts the result to your selected output unit.",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "View the Result",
              text: "View the instant result in large, bold text with the applied formula shown clearly below the answer.",
            },
            {
              "@type": "HowToStep",
              position: 6,
              name: "Check Step-by-Step Explanation",
              text: "Scroll below the result to see the detailed step-by-step explanation including all unit conversions performed.",
            },
            {
              "@type": "HowToStep",
              position: 7,
              name: "Review Calculation History",
              text: "Open the Calculation History panel to review your last 10 results, each stored with timestamp, inputs, and units.",
            },
            {
              "@type": "HowToStep",
              position: 8,
              name: "Reset for Next Calculation",
              text: "Press the Reset button to clear all fields instantly and start a fresh calculation.",
            },
          ],
          tool: [
            {
              "@type": "HowToTool",
              name: "LizoCalc Mass Calculator",
            },
          ],
        },

        // ── 5. HOWTO #2 — How to Calculate Mass from Density & Volume ──
        // Targets: "how to calculate mass from density and volume",
        //          "how do I find mass with density and volume",
        //          "mass formula steps", "m = rho x V explained"
        {
          "@type": "HowTo",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#howto-calculate-mass",
          name: "How to Calculate Mass from Density and Volume",
          description:
            "Learn the step-by-step manual method to find mass using the physics formula m = ρ × V, with a worked example.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Write Down the Formula",
              text: "Use the formula m = ρ × V, where m is mass (kg), ρ (rho) is density (kg/m³), and V is volume (m³). This is derived from the density equation ρ = m ÷ V rearranged to make mass the subject.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Identify the Density",
              text: "Find or look up the density of the material. Examples: water = 1000 kg/m³, steel = 7850 kg/m³, aluminium = 2700 kg/m³, gold = 19300 kg/m³, air = 1.204 kg/m³.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Measure or Find the Volume",
              text: "Measure the object's volume. For regular shapes, use geometry (length × width × height for a box). For liquids, use a graduated cylinder. For irregular objects, use water displacement.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Convert Units to Match",
              text: "Make sure density and volume are in compatible units before calculating. Example: if density is in kg/m³ then volume must be in m³. Key conversions: 1 g/cm³ = 1000 kg/m³, 1 L = 0.001 m³, 1 ft³ = 0.0283168 m³.",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "Multiply Density by Volume",
              text: "Multiply the density value by the volume value. Example: steel beam with density 7850 kg/m³ and volume 0.12 m³ → mass = 7850 × 0.12 = 942 kg.",
            },
            {
              "@type": "HowToStep",
              position: 6,
              name: "Write the Unit with Your Answer",
              text: "Always write the unit alongside the numerical answer (kg, g, lb). The unit confirms your calculation is correct. If units cancel correctly, your answer is reliable.",
            },
          ],
          tool: [
            {
              "@type": "HowToTool",
              name: "LizoCalc Mass Calculator",
            },
          ],
        },

        // ── 6. HOWTO #3 — How to Find Mass of an Irregular Object ──
        // Targets: "how to find mass of irregular object",
        //          "water displacement mass calculation",
        //          "Archimedes principle mass", "irregular shape mass"
        {
          "@type": "HowTo",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#howto-irregular-object",
          name: "How to Find the Mass of an Irregular Object",
          description:
            "Step-by-step method to calculate the mass of any irregular-shaped object using water displacement (Archimedes' principle) and density.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Get a Graduated Cylinder",
              text: "Fill a graduated cylinder or measuring jug with a known amount of water. Record the initial water level — for example, 200 ml.",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Submerge the Object Fully",
              text: "Carefully lower the irregular object into the water so it is fully submerged. Make sure it does not touch the sides or bottom. Use a string if needed to hold it under.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Read the New Water Level",
              text: "Read the new water level after the object is fully submerged. Example: water rose from 200 ml to 265 ml.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Calculate the Displaced Volume",
              text: "Subtract the initial water level from the new level. This equals the volume of your object. Example: 265 ml − 200 ml = 65 ml = 65 cm³ = 0.000065 m³.",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "Look Up the Material Density",
              text: "Identify what material the object is made of and look up its density. Examples: copper = 8960 kg/m³, glass = 2500 kg/m³, rock/granite = 2700 kg/m³, iron = 7870 kg/m³.",
            },
            {
              "@type": "HowToStep",
              position: 6,
              name: "Enter Values in LizoCalc",
              text: "Enter the displaced volume (65 cm³) and the material density into the LizoCalc Mass Calculator, select your output unit, and click Calculate to instantly get the mass.",
            },
            {
              "@type": "HowToStep",
              position: 7,
              name: "Verify the Result",
              text: "Cross-check by weighing the object on a scale if available. The calculated mass and the weighed mass should match closely, confirming both your volume measurement and material density were accurate.",
            },
          ],
          tool: [
            {
              "@type": "HowToTool",
              name: "LizoCalc Mass Calculator",
            },
          ],
        },

        // ── 7. HOWTO #4 — How to Convert Mass Units ───────────
        // Targets: "how to convert kg to pounds", "kg to lb conversion steps",
        //          "how to convert grams to ounces", "mass unit conversion"
        {
          "@type": "HowTo",
          "@id":
            "https://www.lizocalc.com/calculators/physics/mass-calculator#howto-convert-units",
          name: "How to Convert Mass Units (kg, g, lb, oz, tonne)",
          description:
            "Step-by-step guide to converting mass between metric and imperial units with key conversion factors and worked examples.",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Identify Your Starting Unit",
              text: "Note which unit your mass is currently in. Common units: kilograms (kg), grams (g), milligrams (mg), pounds (lb), ounces (oz), tonnes (t), carats (ct).",
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Choose Your Target Unit",
              text: "Decide which unit you need to convert to. For scientific work use kg. For US/UK everyday use choose lb or oz. For very small masses use mg or g.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Apply the Correct Conversion Factor",
              text: "Use these exact conversion factors: 1 kg = 1000 g | 1 kg = 2.20462 lb | 1 kg = 35.274 oz | 1 lb = 453.592 g | 1 lb = 16 oz | 1 tonne = 1000 kg | 1 carat = 0.0002 kg | 1 oz = 28.3495 g.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Multiply or Divide",
              text: "To convert to a smaller unit multiply (kg → g: multiply by 1000). To convert to a larger unit divide (g → kg: divide by 1000). Example: 5 kg to pounds = 5 × 2.20462 = 11.023 lb.",
            },
            {
              "@type": "HowToStep",
              position: 5,
              name: "Use LizoCalc for Instant Conversion",
              text: "For automatic conversion without manual calculation, enter your density and volume into LizoCalc Mass Calculator, select your desired output unit (kg, g, lb, oz, tonne, mg, or carat), and the result is instantly converted for you.",
            },
          ],
          tool: [
            {
              "@type": "HowToTool",
              name: "LizoCalc Mass Calculator",
            },
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
              Mass Calculator: Solve for Mass Using Density and Volume
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <MassCalculator />
      </section>

      {/* SEO Content */}
    <article className="max-w-6xl mx-auto px-6 py-16 text-white">
  <p className="text-gray-200 leading-relaxed mb-6 text-lg">
    The <strong>Mass Calculator</strong> — powered by the fundamental relationship between mass, density, and volume — is an indispensable tool for physics students, engineers, and anyone dealing with material properties. Mass tells us how much matter is present in an object, and when combined with density and volume, it becomes the key to solving countless problems in mechanics, buoyancy, material selection, and everyday science.
  </p>

  <p className="text-gray-200 leading-relaxed mb-8 text-lg">
    Our completely free, no-registration-required <strong>mass calculator</strong> handles everything instantly. Simply enter density and volume (or mass and density to find volume), select your units (kg/m³, g/cm³, lb/ft³, lb/gal, and many more), and get the mass in your chosen unit — complete with automatic unit conversion, step-by-step working, formula highlighting, and a calculation history that saves your last 10 results (with consent). Fully mobile-friendly, works offline after first load, supports irregular objects via displacement, and zero ads. Ideal for exam prep, lab reports, or quick checks. Try it now on our{" "}
    <Link
      href="/calculators/physics/mass-calculator"
      className="text-blue-400 hover:underline font-semibold"
    >
      Mass Calculator page
    </Link>
    .
  </p>

  <section className="mt-16">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      How to Calculate Mass with Our Online Tool
    </h2>

    <div className="mt-8 space-y-10">
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <h3 className="text-2xl font-semibold text-blue-300 mb-5">
          Quick & Easy Step-by-Step Guide
        </h3>
        <ol className="list-decimal list-inside text-gray-200 space-y-4 text-base leading-relaxed">
          <li>Enter the density value in the first field (example: <code>7.85</code>) and select the unit (kg/m³, g/cm³, lb/ft³, etc.).</li>
          <li>Input the volume in the second field (example: <code>0.2</code> m³ or cm³) and choose its unit.</li>
          <li>Select your desired output mass unit (kg, g, lb, etc.).</li>
          <li>Click the prominent <strong>Calculate Mass</strong> button.</li>
          <li>View the instant result in large, bold text with the applied formula shown clearly.</li>
          <li>Check below for detailed step-by-step explanation and any unit conversions performed.</li>
          <li>Review past calculations? Open the <strong>Calculation History</strong> panel — your recent results are stored automatically.</li>
          <li>Ready for the next problem? Press <strong>Reset</strong> to clear the fields instantly.</li>
        </ol>
        <p className="text-gray-300 italic mt-6 text-base leading-relaxed">
          Pro tip: The calculator normalizes all units internally (to SI where needed), warns about zero volume, rejects invalid inputs, and remembers your favorite units for faster workflow during long study sessions or lab work.
        </p>
      </div>
    </div>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      The Physics of Mass: Understanding the Formula <span className="font-mono text-green-300">m = ρ × V</span>
    </h2>

    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      Mass (m) is the amount of matter in an object and remains constant regardless of location. It is calculated using density (ρ) and volume (V):
    </p>
    <p className="text-center text-3xl font-mono text-green-300 my-6">
      m = ρ × V
    </p>
    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      This is the rearranged form of the density formula (ρ = m / V). Mass is an intrinsic property, unlike weight, which depends on gravity.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Understanding the Relationship Between Mass, Volume, and Density
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Density describes how tightly packed the matter is. Higher density means more mass in the same volume. Lower density objects (like wood or ice) float in higher density fluids (like water).
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      Converting Density and Volume to Mass Instantly
    </h3>
    <p className="text-gray-200 text-base mb-4">
      Our tool handles complex conversions automatically. Example: Density 7850 kg/m³, Volume 0.05 m³ → Mass = 392.5 kg.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Extensive Unit Support: From Metric to Imperial Systems
    </h2>

    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Quantity</th>
            <th className="p-4 text-left font-semibold">Supported Units</th>
            <th className="p-4 text-left font-semibold">SI Base</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr><td className="p-4">Density</td><td className="p-4">kg/m³, g/cm³, lb/ft³, lb/gal, g/L, oz/in³</td><td className="p-4">kg/m³</td></tr>
          <tr><td className="p-4">Volume</td><td className="p-4">m³, cm³, L, ft³, in³, gal, ml</td><td className="p-4">m³</td></tr>
          <tr><td className="p-4">Mass</td><td className="p-4">kg, g, lb, mg, oz, tonne, carat</td><td className="p-4">kg</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How to Use Different Units Like lb/gal, kg/m³, and cm³
    </h3>
    <p className="text-gray-200 text-base leading-relaxed">
      Enter any combination — the calculator converts internally. Key conversions: 1 g/cm³ = 1000 kg/m³, 1 lb/ft³ ≈ 16.0185 kg/m³, 1 lb/gal ≈ 119.826 kg/m³.
    </p>

    <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
      How does the calculator handle unit normalization?
    </h4>
    <p className="text-gray-200 text-base">
      All inputs are converted to SI units (kg, m³), calculation is performed, then output is converted to your selected unit — ensuring maximum accuracy even across mixed systems.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Step-by-Step Calculation Examples for Students
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Calculating the Mass of Liquids vs. Solids
    </h3>
    <p className="text-gray-200 text-base">
      Solids: Use measured volume or dimensions. Liquids: Use graduated cylinder for volume. Example (liquid): Density of diesel 850 kg/m³, 5 L (0.005 m³) → Mass = 4.25 kg.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
      How to Find the Mass of an Object in Kilograms, Grams, or Pounds
    </h3>
    <p className="text-gray-200 text-base">
      Enter density and volume, select output unit. Irregular object: Use water displacement for volume.
    </p>

    <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
      Example 1: Steel Beam (Metric)
    </h4>
    <p className="text-gray-200 text-base font-mono">
      Density = 7850 kg/m³, Volume = 0.12 m³<br />
      m = 7850 × 0.12 = <strong>942 kg</strong>
    </p>

    <h4 className="text-xl font-bold text-blue-300 mt-8 mb-3">
      Example 2: Gasoline Barrel (Imperial to Metric)
    </h4>
    <p className="text-gray-200 text-base font-mono">
      Density = 6.3 lb/gal, Volume = 55 gal<br />
      Mass = 6.3 × 55 = <strong>346.5 lb</strong> (≈ 157.2 kg)
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Advanced Rearrangements & Related Formulas Every Student Should Know
    </h2>

    <p className="text-gray-200 leading-relaxed mb-6 text-base">
      The mass formula is just one piece of the puzzle. Mastering all three rearrangements helps you solve almost every numerical in chapters like Properties of Matter, Fluid Statics, and Material Science.
    </p>

    <div className="grid md:grid-cols-3 gap-6 mt-8">
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Find Mass</h4>
        <p className="text-center text-2xl font-mono text-green-300 my-4">
          m = ρ × V
        </p>
        <p className="text-gray-200 text-sm">Most common use — given density & volume</p>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Find Density</h4>
        <p className="text-center text-2xl font-mono text-green-300 my-4">
          ρ = m / V
        </p>
        <p className="text-gray-200 text-sm">Used in lab experiments & identification of substances</p>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Find Volume</h4>
        <p className="text-center text-2xl font-mono text-green-300 my-4">
          V = m / ρ
        </p>
        <p className="text-gray-200 text-sm">Helpful in buoyancy & capacity problems</p>
      </div>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Related Important Formulas in Physics
    </h3>
    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
      <li>Weight → <span className="font-mono text-green-300">W = m × g</span> (g ≈ 9.81 m/s² in Pakistan)</li>
      <li>Buoyant force → <span className="font-mono text-green-300">F_b = ρ_fluid × V_submerged × g</span></li>
      <li>Relative density / Specific gravity → <span className="font-mono text-green-300">RD = ρ_substance / ρ_water</span> (dimensionless)</li>
      <li>Percentage relative density → RD × 100%</li>
      <li>Apparent weight in liquid → <span className="font-mono text-green-300">W_app = W - F_b</span></li>
    </ul>

    <p className="text-gray-200 italic mt-6">
      Pro tip for board exams: Always write the formula first with units, substitute values with correct units, then solve. This habit can save 2–3 marks per question.
    </p>
  </section>

  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      Real-World Applications of Mass and Density Calculations
    </h2>

    <h3 className="text-2xl font-semibold text-blue-300 mb-5">
      Standard Density Reference Values for Common Materials
    </h3>
    <div className="overflow-x-auto mt-8 mb-12">
      <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-blue-900/70">
            <th className="p-4 text-left font-semibold">Material</th>
            <th className="p-4 text-left font-semibold">Density (kg/m³)</th>
            <th className="p-4 text-left font-semibold">Density (g/cm³)</th>
            <th className="p-4 text-left font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800/50 divide-y divide-gray-700">
          <tr><td className="p-4">Air (20°C)</td><td className="p-4">1.204</td><td className="p-4">0.001204</td><td className="p-4">Dry air</td></tr>
          <tr><td className="p-4">Water (4°C)</td><td className="p-4">1000</td><td className="p-4">1.000</td><td className="p-4">Maximum density</td></tr>
          <tr><td className="p-4">Ice (0°C)</td><td className="p-4">917</td><td className="p-4">0.917</td><td className="p-4">Floats on water</td></tr>
          <tr><td className="p-4">Gasoline</td><td className="p-4">720–775</td><td className="p-4">0.72–0.775</td><td className="p-4">Approx. 737</td></tr>
          <tr><td className="p-4">Aluminium</td><td className="p-4">2700</td><td className="p-4">2.70</td><td className="p-4">Light metal</td></tr>
          <tr><td className="p-4">Steel / Iron</td><td className="p-4">7850</td><td className="p-4">7.85</td><td className="p-4">Common structural</td></tr>
          <tr><td className="p-4">Gold</td><td className="p-4">19300</td><td className="p-4">19.30</td><td className="p-4">Very dense</td></tr>
          <tr><td className="p-4">Mercury</td><td className="p-4">13600</td><td className="p-4">13.60</td><td className="p-4">Liquid metal</td></tr>
        </tbody>
      </table>
    </div>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Everyday & Professional Uses of Mass Calculations
    </h3>

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">School / College Level</h4>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
          <li>Verifying purity of metals (gold, copper) in practicals</li>
          <li>Calculating buoyant force in Archimedes’ principle experiments</li>
          <li>Finding volume of irregular objects (stone, wooden block)</li>
          <li>Solving numericals on floating & sinking</li>
          <li>Comparing densities in identification tests</li>
        </ul>
      </div>

      <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
        <h4 className="text-xl font-bold text-blue-300 mb-3">Engineering & Industry</h4>
        <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
          <li>Estimating weight of steel beams, concrete, and rebar</li>
          <li>Fuel quantity calculation in tanks (kg or tonnes)</li>
          <li>Material requirement for casting, forging, 3D printing</li>
          <li>Checking if a ship/submarine will float (average density)</li>
          <li>Quality control in pharmaceutical & chemical industries</li>
        </ul>
      </div>
    </div>

    <h4 className="text-xl font-bold text-blue-300 mt-10 mb-3">
      Quick Real-Life Example: Petrol Pump Scam Check
    </h4>
    <p className="text-gray-200 text-base">
      Petrol density ≈ 730–750 kg/m³. If a 20-liter (0.02 m³) dispenser gives you only 14 kg instead of expected ~15 kg, it may be delivering less fuel. Use our calculator to verify quickly.
    </p>

    <h3 className="text-2xl font-semibold text-blue-300 mt-12 mb-5">
      Using Calculation History to Track Your Physics Lab Results
    </h3>
    <p className="text-gray-200 text-base">
      Save time in labs: Every calculation is logged with timestamp, inputs, and units. Reload any entry to repeat or compare — great for error checking or reporting.
    </p>
  </section>


  <section className="mt-20">
    <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
      More Physics Tools to Explore
    </h2>

    <p className="text-gray-200 text-base mb-6">
      Complement your mass calculations with these free tools:
    </p>

    <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
      <li>
        <Link
          href="/calculators/physics/density-calculator"
          className="text-blue-400 hover:underline"
        >
          Density Calculator
        </Link>{" "}
        — find density from mass and volume
      </li>
      
      
    </ul>

    <p className="text-gray-300 italic text-center mt-20 text-lg font-medium leading-relaxed">
      Master mass, density, and volume today — our free mass calculator is accurate, unit-smart, fast, and always available for your next physics problem, board exam, or engineering task. 
    </p>
  </section>
</article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
