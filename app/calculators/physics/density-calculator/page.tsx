import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import DensityCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

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
    title: "Free Density Calculator | Density in Multiple Units ",
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/physics/density-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/calculators/physics" },
        { "@type": "ListItem", position: 4, name: "Density Calculator", item: "https://www.lizocalc.com/calculators/physics/density-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/physics/density-calculator",
      url: "https://www.lizocalc.com/calculators/physics/density-calculator",
      name: "Density Calculator | LizoCalc",
      description: "Calculate density instantly using ρ = m ÷ V. Features unit conversions for kg/m³, g/cm³, and lb/ft³ with step-by-step solutions.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-08-20",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/physics/density-calculator#breadcrumb" },
    },
  ],
};

export default function DensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
     <script
  id="structured-data-density-calculator"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Density Calculator - Density in Multiple Units
            </h1>
              
          </div>
          <ShareBar/>
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
            <Link
              href="/info/physics/density"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Density
            </Link>{" "}
            is just a way of describing how tightly matter is packed into a
            given space. Pick up a golf ball and a table-tennis ball — same
            size, completely different weight in your hand. That difference,
            mass squeezed into the same volume, is density in its simplest
            form. It doesn&apos;t care how big or small something is, only
            how "crowded" the matter inside it happens to be.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Density Formula
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">
            Density (ρ) = Mass (m) ÷ Volume (V)
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s the whole equation, but the useful part is how you
            can flip it around depending on what you&apos;re missing. Know
            the density and the volume, you can back into the mass. Know the
            mass and the density, volume falls out just as easily. Once you
            get comfortable with the{" "}
            <Link
              href="/info/physics/density/mass-volume-density-relationship"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              relationship between mass, volume, and density
            </Link>
            , the calculator above just becomes a shortcut for algebra you
            already understand.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density Units You&apos;ll Run Into
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Labs tend to use g/cm³, engineers lean on kg/m³, and a lot of US
            material spec sheets still quote lb/ft³. None of that is
            arbitrary — it&apos;s just habit built around whatever field
            wrote the number down first. If you&apos;ve ever pulled a value
            off a datasheet and it wouldn&apos;t plug into your equation, you
            were probably staring at{" "}
            <Link
              href="/info/physics/density/specific-weight-units-explained"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              specific weight
            </Link>{" "}
            instead of density, or a unit that needed converting first. Our{" "}
            <Link
              href="/info/physics/density/density-unit-conversion-guide"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density unit conversion guide
            </Link>{" "}
            walks through the exact factors so you&apos;re not guessing.
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
            Comparing Real Materials
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Numbers on a chart only mean something once you compare them
            side by side. A block of aluminum and a block of lead the exact
            same size can differ in weight by a factor of four, and that gap
            is entirely density. It&apos;s also how jewelers catch fake gold
            and how scrap yards sort metal without cutting into it. If you
            want the full breakdown of{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density values for common materials
            </Link>
            , the table below is a good starting reference.
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
            bachelor&apos;s degree in applied chemistry from the University
            of Illinois and has been writing about advanced materials at SAM
            for over four years — so the numbers above are cross-checked
            against an industry source, not just pulled from a random table.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density in Liquids and Gases
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Solids hold their density fairly steady, but liquids and gases
            don&apos;t play by the same rules. The{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of water
            </Link>{" "}
            shifts slightly with temperature, which is why lab work always
            notes the conditions a measurement was taken under. Air is even
            more restless — the{" "}
            <Link
              href="/info/physics/density/density-of-air"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of air
            </Link>{" "}
            changes with altitude, humidity, and temperature all at once.
            For gases specifically, the{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            ties directly back to the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law (PV = nRT)
            </Link>
            , which is the equation chemists reach for the moment pressure
            and temperature enter the picture.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Few Related Ideas Worth Knowing
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            A common question is whether{" "}
            <Link
              href="/info/physics/density/is-density-a-physical-or-chemical-property"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density counts as a physical or chemical property
            </Link>{" "}
            — it&apos;s physical, since you can measure it without changing
            what the substance actually is. Grain silos and soil labs work
            with a related idea called{" "}
            <Link
              href="/info/physics/density/what-is-bulk-density"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              bulk density
            </Link>
            , which accounts for the air gaps between loose particles. And
            pilots deal with{" "}
            <Link
              href="/info/physics/density/what-is-density-altitude"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude
            </Link>{" "}
            every takeoff, since thinner air at higher elevations changes how
            much lift a wing can generate.
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
            <span>🔄 Updated: Aug 20, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}