import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DensityCalculator from "./clientside";

export const metadata: Metadata = {
  title: "Density Calculator - Density in Multiple Units",
  description:
  "Discover our user-friendly density calculator that allows you to input mass and volume in various units, providing results in  multiple density units for your convenience. Enter your values into the tool above, or read on below to see exactly how the math behind it works.",
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

// Structured data lives outside the component so it isn't recreated on
// every render, and so JSON.stringify only ever runs once per build for
// this static content.
const structuredData = {
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
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-08-01",
      mainEntity: {
        "@id":
          "https://www.lizocalc.com/calculators/physics/density-calculator#howto-calculate-density",
      },
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
      author: {
        "@type": "Person",
        name: "Rana Muhammad Abdullah",
        url: "https://www.linkedin.com/in/abdullahsajjad06/",
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
    // ── 4. HOWTO #1 — How to Calculate Density from Mass & Volume ──
    {
      "@type": "HowTo",
      "@id":
        "https://www.lizocalc.com/calculators/physics/density-calculator#howto-calculate-density",
      name: "How to Calculate Density from Mass and Volume",
      image: "https://www.lizocalc.com/logo.webp",
      description:
        "Step-by-step manual method to find density using the formula ρ = m ÷ V, with a fully worked example.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Measure Mass (m)",
          text: "Weigh the object using a balance or scale. Record the value in grams (g) or kilograms (kg).",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Determine Volume (V)",
          text: "For regular shapes, calculate volume from dimensions. For irregular objects, use water displacement.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Apply Formula (ρ = m / V)",
          text: "Divide the mass value by the volume value and attach the correct unit. Example: 193 g ÷ 10 cm³ = 19.3 g/cm³.",
        },
      ],
      tool: [{ "@type": "HowToTool", name: "LizoCalc Density Calculator" }],
    },

    // ── 5. HOWTO #2 — How to Find Density of an Irregular Object ──
    {
      "@type": "HowTo",
      "@id":
        "https://www.lizocalc.com/calculators/physics/density-calculator#howto-irregular-density",
      name: "How to Find the Density of an Irregular Object",
      image: "https://www.lizocalc.com/logo.webp",
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
      tool: [{ "@type": "HowToTool", name: "LizoCalc Density Calculator" }],
    },

    // ── 6. HOWTO #3 — How to Convert Density Units ────────
    {
      "@type": "HowTo",
      "@id":
        "https://www.lizocalc.com/calculators/physics/density-calculator#howto-convert-density-units",
      name: "How to Convert Density Units (g/cm³, kg/m³, lb/ft³)",
      image: "https://www.lizocalc.com/logo.webp",
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
      tool: [{ "@type": "HowToTool", name: "LizoCalc Density Calculator" }],
    },
  ],
};

export default function DensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* === STRUCTURED JSON-LD DATA ===
          Switched from next/script (strategy="beforeInteractive") to a
          plain <script> tag. JSON-LD is inert data — it never needs to
          execute, so it never needed Next's script-loading/priority
          machinery. beforeInteractive was forcing this into the
          render-blocking path; a plain tag just sits in the HTML for
          crawlers to read, with zero render cost. This was flagged as
          "Render-blocking requests — est savings 1,410ms" on mobile. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Calculate Density from Mass and Volume in Different Units
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
      
        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Density?
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            The density of a material is defined as its mass per unit volume.
            The density formula helps us understand how tightly things are
            packed inside something. It does not just look at how heavy an
            object is, but it also looks at the space the object takes up,
            which is called volume.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Density
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Measure Mass (m)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Weigh the object on a balance or scale and record the value in
                grams or kilograms.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Determine Volume (V)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Calculate volume from dimensions for regular shapes, or use
                water displacement for irregular ones.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full bg-blue-700 text-white font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-blue-300 mb-2">
                Apply Formula (ρ = m / V)
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Divide the mass by the volume and attach the correct unit to
                get your final density.
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
            The standard density formula is:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">
            Density (ρ) = Mass (m) ÷ Volume (V)
          </p>
          <p className="text-gray-200 leading-relaxed mb-8 text-base">
            Scientists use the Greek letter ρ (rho) to represent density.
            Depending on what you already know, you can rearrange this formula
            to find the missing value.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            The Three Density Formulas
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">To Find</th>
                  <th className="p-4 text-left font-semibold">Formula</th>
                  <th className="p-4 text-left font-semibold">When to Use</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Density</td>
                  <td className="p-4 font-mono text-green-300">ρ = m ÷ V</td>
                  <td className="p-4">
                    When you know the mass and volume of an object.
                  </td>
                </tr>
                <tr>
                  <td className="p-4">Mass</td>
                  <td className="p-4 font-mono text-green-300">m = ρ × V</td>
                  <td className="p-4">When you know the density and volume.</td>
                </tr>
                <tr>
                  <td className="p-4">Volume</td>
                  <td className="p-4 font-mono text-green-300">V = m ÷ ρ</td>
                  <td className="p-4">When you know the mass and density.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 text-base">
            If you need to work out mass or volume on their own, our{" "}
            <Link
              href="/calculators/physics/mass-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Mass Calculator
            </Link>{" "}
            and{" "}
            <Link
              href="/calculators/physics/weight-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Weight Calculator
            </Link>{" "}
            can handle those directly using the rearranged formulas above.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Types of Density (Mass, Weight, and Relative)
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            When we talk about density, we are not always talking about the
            same thing. This is where people get confused.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>Mass density</strong> is what people usually mean when
            they say density. It is the mass of something divided by its
            volume. We measure it in kilograms per meter or grams per cubic
            centimeter. This is the kind of density we use in the formula.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>Weight density</strong> is different. It is the{" "}
            <Link
              href="/calculators/physics/weight-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              weight
            </Link>{" "}
            of something per unit volume. This changes depending on where you
            are. For example something weighs differently on the Moon than it
            does on Earth. Its mass density stays the same.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            People get confused because we use the words weight and mass to
            mean the same thing in our daily lives. In physics they mean
            different things.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Relative density — we also call it specific gravity — compares the
            density of one substance to the density of another substance. We
            usually compare it to water at 4 degrees Celsius. This is because
            water has a density of 1 gram per cubic centimeter at that
            temperature.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mt-4">
            For example, if something has a density of 0.8 it is 80 percent
            as dense as water. This means it will float in water. Relative
            density is a comparison of two densities so it does not have any
            units.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Some Common Units for Density
          </h2>

          <div className="overflow-x-auto mt-8 mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Unit</th>
                  <th className="p-4 text-left font-semibold">kg/m³</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Gram per Cubic Centimeter (g/cm³)</td>
                  <td className="p-4">1,000</td>
                </tr>
                <tr>
                  <td className="p-4">Kilogram per Cubic Meter (kg/m³)</td>
                  <td className="p-4">1 (SI Unit)</td>
                </tr>
                <tr>
                  <td className="p-4">Pound per Cubic Foot (lb/cu ft)</td>
                  <td className="p-4">16.02</td>
                </tr>
                <tr>
                  <td className="p-4">Gram per Liter (g/L)</td>
                  <td className="p-4">1</td>
                </tr>
                <tr>
                  <td className="p-4">Kilogram per Liter (kg/L)</td>
                  <td className="p-4">1,000</td>
                </tr>
                <tr>
                  <td className="p-4">Ounce per Cubic Foot (oz/cu ft)</td>
                  <td className="p-4">1.001</td>
                </tr>
                <tr>
                  <td className="p-4">Pound per US Gallon (lb/US gal)</td>
                  <td className="p-4">119.83</td>
                </tr>
                <tr>
                  <td className="p-4">Ton (US) per Cubic Yard</td>
                  <td className="p-4">1,186.6</td>
                </tr>
                <tr>
                  <td className="p-4">Gram per Cubic Meter (g/m³)</td>
                  <td className="p-4">0.001</td>
                </tr>
                <tr>
                  <td className="p-4">Pound per Cubic Inch (lb/cu in)</td>
                  <td className="p-4">27,680</td>
                </tr>
                <tr>
                  <td className="p-4">Kilogram per Cubic Centimeter (kg/cm³)</td>
                  <td className="p-4">1,000,000</td>
                </tr>
                <tr>
                  <td className="p-4">Ounce per Cubic Inch (oz/cu in)</td>
                  <td className="p-4">1,730</td>
                </tr>
                <tr>
                  <td className="p-4">Pound per Imperial Gallon (lb/Imp gal)</td>
                  <td className="p-4">99.78</td>
                </tr>
                <tr>
                  <td className="p-4">Ton (UK) per Cubic Yard</td>
                  <td className="p-4">1,328.9</td>
                </tr>
                <tr>
                  <td className="p-4">Pound per Cubic Yard (lb/cu yd)</td>
                  <td className="p-4">0.5933</td>
                </tr>
                <tr>
                  <td className="p-4">Ounce per US Gallon (oz/US gal)</td>
                  <td className="p-4">7.489</td>
                </tr>
                <tr>
                  <td className="p-4">PSI per 1,000 Feet</td>
                  <td className="p-4">2.3067</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real-Life Examples of Density
          </h2>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            There are things that show us what density is. For example ships
            made of steel can float on water. This seems strange because
            steel is heavier than water. The shape of the ship is such that
            it traps a lot of air. So when we calculate the density of the
            ship including the steel, the air and the things it is carrying
            it is actually lighter than water. That is why the ship can
            float.
          </p>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Another example is when you mix oil and water. The oil stays on
            top of the water because it is lighter.
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-2 text-base ml-2 mb-4">
            <li>We can not mix oil with water because density of oil is lower.</li>
            <li>This is the reason oil stays on the surface.</li>
          </ul>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You can also see density at work when you look at soda cans. A
            regular soda can will sink in water. A diet soda can will float.
            This is because the sugar in the soda makes the can heavier. The
            artificial sweetener in the diet soda does not add much weight so
            the can is lighter. Density of diet soda is lower than soda that
            is why diet soda can floats.
          </p>

          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Hot air balloons are another example of density. When the air
            inside the balloon is heated it becomes lighter than the air
            outside. This makes the balloon rise up into the air because it
            is now less dense than the air around it.
          </p>
          <ol className="list-decimal list-inside text-gray-200 space-y-2 text-base ml-2 mb-4">
            <li>The balloon air is heated.</li>
            <li>The heated air is lighter.</li>
            <li>The balloon rises because density of air is lower than cooler air.</li>
          </ol>

          <p className="text-gray-200 leading-relaxed text-base">
            Jewelers use density to check if gold is pure. They do this by
            putting the gold in water and measuring how water it displaces.
            Pure gold has a specific density that is hard to fake. So if the
            density is not right the jeweler will know that the gold is not
            pure. Density of gold is used to catch fake gold.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Mistakes When Calculating Density and How to Avoid Them
          </h2>

          <p className="text-gray-200 leading-relaxed text-base mb-8">
            Density seems like the simplest formula in physics. Until you
            actually start to do the calculation. Most of the problems are
            not with the math. They are with the way things are set up
            before the math even begins.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Mistakes While Using Online Calculators
          </h3>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Online density calculators are useful but they are only as good
            as the information you put into them:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Mixing units without converting. Entering mass in pounds and
            volume in liters into a calculator that expects kilograms and
            cubic meters will give you a number that looks right but is
            completely wrong. Always check what units the calculator uses
            before entering your numbers.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Confusing mass and weight fields. Some calculators say "mass,"
            others say "weight," and people enter a number from a bathroom
            scale (which's weight) as if it were mass. On Earth this doesn't
            usually cause a problem but its still not correct and can be a
            real issue if you are working with different gravity
            environments.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Rounding early. A calculator might round a number before you use
            it in the step of a problem and that small rounding error adds up
            if you're doing several calculations in a row.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-10">
            Ignoring figures. A calculator will give you decimal places even
            if your original measurements only have a few. Showing all of
            them makes the result look more accurate than it actually is.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mb-5">
            Mistakes While Doing Physical or Manual Calculations
          </h3>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            I still remember this from my 9th-grade physics lab in 2022. We
            were asked to find the density of a metal block using the water
            displacement method. Put it into a graduated cylinder measure how
            much the water level rises and use that as the volume.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            I got a density value that was completely wrong compared to what
            the textbook said for the metal. I couldn't figure out why for
            most of the lab. It turned out I made two mistakes at the time.
            First I read the water level from an angle of looking straight on
            so I didn't read the meniscus correctly and got the wrong volume.
            Second I used the mass of the block that included a sticker tag
            still attached to it so my mass reading was not accurate either.
            Neither mistake was big by itself. Together they made my final
            density number very off.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That lab taught me something that no textbook explanation had
            explained before: density calculations are only as accurate as
            the measurements you take. The formula is simple. The real skill
            is in measuring mass and volume. Some common problems when doing
            calculations:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Air bubbles stuck on the object during water displacement, which
            makes the volume look bigger than it is.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Not considering the weight of the container when weighing a
            liquid or powder so the mass includes something it shouldn't.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Temperature changes that affect volume with liquids because most
            things expand when they get warmer.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            Using the formula for the volume of an irregular shape. Trying to
            use a cube or sphere formula for something that doesn't fit.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you are doing this by hand check that your tools are properly
            calibrated and take measurements more than once. It only takes
            two minutes and saves you from having to start over later.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Some Common Material Densities
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-8">
            Here are 12 of the most popular materials people look up, listed
            from heaviest to lightest by density:
          </p>

          <div className="overflow-x-auto mt-8 mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Material</th>
                  <th className="p-4 text-left font-semibold">Density (g/cm³)</th>
                  <th className="p-4 text-left font-semibold">Density (kg/m³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Gold</td>
                  <td className="p-4">19.32</td>
                  <td className="p-4">19320</td>
                </tr>
                <tr>
                  <td className="p-4">Tungsten</td>
                  <td className="p-4">19.25</td>
                  <td className="p-4">19250</td>
                </tr>
                <tr>
                  <td className="p-4">Lead</td>
                  <td className="p-4">11.34</td>
                  <td className="p-4">11340</td>
                </tr>
                <tr>
                  <td className="p-4">Silver</td>
                  <td className="p-4">10.49</td>
                  <td className="p-4">10490</td>
                </tr>
                <tr>
                  <td className="p-4">Copper</td>
                  <td className="p-4">8.96</td>
                  <td className="p-4">8960</td>
                </tr>
                <tr>
                  <td className="p-4">Nickel</td>
                  <td className="p-4">8.90</td>
                  <td className="p-4">8900</td>
                </tr>
                <tr>
                  <td className="p-4">Brass</td>
                  <td className="p-4">8.50</td>
                  <td className="p-4">8500</td>
                </tr>
                <tr>
                  <td className="p-4">Stainless Steel (304)</td>
                  <td className="p-4">7.93</td>
                  <td className="p-4">7930</td>
                </tr>
                <tr>
                  <td className="p-4">Steel (Carbon Steel)</td>
                  <td className="p-4">7.85</td>
                  <td className="p-4">7850</td>
                </tr>
                <tr>
                  <td className="p-4">Cast Iron</td>
                  <td className="p-4">6.90</td>
                  <td className="p-4">6900</td>
                </tr>
                <tr>
                  <td className="p-4">Titanium</td>
                  <td className="p-4">4.43</td>
                  <td className="p-4">4430</td>
                </tr>
                <tr>
                  <td className="p-4">Aluminum</td>
                  <td className="p-4">2.70</td>
                  <td className="p-4">2700</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed">
            About this data: I checked these values from{" "}
            <a
              href="https://www.samaterials.com/content/density-measurement-and-common-materials.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Stanford Advanced Materials (SAM)
            </a>{" "}
            as well. SAM, founded in 1994, is a US-based supplier of over
            10,000 advanced materials used across the aerospace, technology,
            and medical industries, headquartered in Santa Ana, California.
            The reference page is written by Chin Trento, who holds a
            bachelor's degree in applied chemistry from the University of
            Illinois and has been writing about advanced materials at SAM for
            over four years — so the numbers above are cross-checked against
            an industry source, not just pulled from a random table.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Calculate Density Using Excel
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            You do not need a calculator to figure out density. A simple
            formula in a spreadsheet can do the job. This is really useful if
            you are working with a lot of data from a lab or a list of
            materials.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You can start by making a list.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            * In column A write down the mass of each thing.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            * In column B write down the volume of each thing. Make sure you
            use the same units for everything.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-6">
            * In column C type in the formula: <code>=A2/B2</code>
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Then you can drag this formula down to all the rows. This way you
            can calculate the density of lots of things at the same time
            using the density formula in Excel. For the official reference on
            how Excel formulas work, see Microsoft's{" "}
            <a
              href="https://support.microsoft.com/en-us/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Overview of formulas in Excel
            </a>{" "}
            documentation.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Calculators
          </h2>
          <p className="text-gray-200 text-base mb-6">
            Pair your density practice with these other free calculators:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/physics/mass-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Mass Calculator
              </Link>{" "}
              — find mass when you know density and volume
            </li>
            <li>
              <Link
                href="/calculators/physics/weight-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Weight Calculator
              </Link>{" "}
              — calculate weight based on mass and gravity
            </li>
            <li>
              <Link
                href="/calculators/physics/speed-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Speed Calculator
              </Link>{" "}
              — find speed and distance with ease
            </li>
            <li>
              <Link
                href="/calculators/math/conversion-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Conversion Calculator
              </Link>{" "}
              — convert between metric and imperial units in one place
            </li>
          </ul>
        </section>

        {/* ── BYLINE ── */}
        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
            <p className="text-gray-300 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp;
              Control Engineering Student ·{" "}
              <a
                href="https://www.linkedin.com/in/abdullahsajjad06/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-300">
            <span>📅 Published: Apr 4, 2026</span>
            <span>🔄 Updated: Aug 01, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}