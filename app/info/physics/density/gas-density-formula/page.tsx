import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gas Density Formula: ρ = PM / RT Explained",
  description:
    "The gas density formula derived step by step from the ideal gas law, with a worked example for air.",
  keywords: ["gas density formula", "density of gas equation", "how to calculate gas density"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/gas-density-formula",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Gas Density Formula, Step by Step",
    description: "How ρ = PM / RT is derived, and a worked example calculating the density of air.",
    url: "https://www.lizocalc.com/info/physics/density/gas-density-formula",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gas Density Formula | LizoCalc",
    description: "The gas density equation, derived and applied with real numbers.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/gas-density-formula#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Gas Density Formula",
          item: "https://www.lizocalc.com/info/physics/density/gas-density-formula",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/gas-density-formula",
      url: "https://www.lizocalc.com/info/physics/density/gas-density-formula",
      name: "Gas Density Formula: ρ = PM / RT Explained | LizoCalc",
      description: "Step-by-step derivation of the gas density formula with a worked example.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/gas-density-formula#article",
      headline: "Gas Density Formula: ρ = PM / RT Explained",
      description: "How the gas density formula is derived from the ideal gas law, with a worked example.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/gas-density-formula",
    },
  ],
};

export default function GasDensityFormulaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Gas Density Formula: ρ = PM / RT Explained</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Gases don&apos;t have a fixed density the way a block of steel does. Squeeze a gas into a smaller
            container and its density goes up. Heat it and it goes down. That&apos;s the whole reason gas
            density needs its own formula instead of the simple mass-divided-by-volume approach that works for
            solids and liquids.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The formula itself isn&apos;t complicated once you see where it comes from — it&apos;s just the
            ideal gas law rearranged to answer a slightly different question.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Deriving the Formula
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Start with the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law
            </Link>
            :
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">PV = nRT</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Moles (n) equal mass divided by molar mass: n = m / M. Substitute that in:
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">PV = (m / M) RT</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density is mass over volume (ρ = m / V), so rearrange to isolate m/V:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = PM / RT</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s the whole derivation. Three lines of algebra and you go from "how much space does this
            gas fill" to "how heavy is a cubic meter of it."
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Each Symbol Means Here
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Symbol</th>
                  <th className="p-4 text-left font-semibold">Meaning</th>
                  <th className="p-4 text-left font-semibold">Units</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-green-300">ρ</td>
                  <td className="p-4">Gas density</td>
                  <td className="p-4">kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">P</td>
                  <td className="p-4">Pressure</td>
                  <td className="p-4">Pa</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">M</td>
                  <td className="p-4">Molar mass of the gas</td>
                  <td className="p-4">kg/mol</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">R</td>
                  <td className="p-4">Universal gas constant</td>
                  <td className="p-4">8.314 J/(mol·K)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">T</td>
                  <td className="p-4">Temperature</td>
                  <td className="p-4">kelvin</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example: Density of Dry Air
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Dry air has an average molar mass of about 0.02897 kg/mol. At sea level (P = 101,325 Pa) and 15°C
            (288.15 K):
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            ρ = (101,325 × 0.02897) / (8.314 × 288.15)
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">ρ = 2,935.4 / 2,395.4</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">ρ ≈ 1.225 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That matches the standard air density figure exactly, which is a good sanity check that the formula
            is being applied correctly. If you swap in the numbers for helium (molar mass 0.004 kg/mol) at the
            same pressure and temperature, you&apos;d get roughly 0.169 kg/m³ — about a seventh the density of
            air, which is exactly why helium balloons rise.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Gas Densities at Standard Conditions
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Gas</th>
                  <th className="p-4 text-left font-semibold">Molar Mass (kg/mol)</th>
                  <th className="p-4 text-left font-semibold">Density at 0°C, 1 atm</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Hydrogen</td>
                  <td className="p-4">0.00202</td>
                  <td className="p-4">0.0899 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">Helium</td>
                  <td className="p-4">0.00400</td>
                  <td className="p-4">0.1786 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">Nitrogen</td>
                  <td className="p-4">0.02801</td>
                  <td className="p-4">1.2506 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">Air (dry)</td>
                  <td className="p-4">0.02897</td>
                  <td className="p-4">1.2929 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">Oxygen</td>
                  <td className="p-4">0.03200</td>
                  <td className="p-4">1.4290 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">Carbon dioxide</td>
                  <td className="p-4">0.04401</td>
                  <td className="p-4">1.9768 kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            The pattern is straightforward — heavier molar mass means denser gas, all else being equal, which is
            also why CO₂ tends to pool near the floor of a poorly ventilated room while helium and hydrogen
            escape upward.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where This Formula Actually Gets Used
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Beyond the classroom, this exact equation is what pilots and flight planners rely on when working
            out{" "}
            <Link
              href="/info/physics/density/what-is-density-altitude"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude
            </Link>
            , and what HVAC engineers use to size airflow systems for different climates. For a quick answer
            without doing the algebra by hand, our{" "}
            <Link
              href="/calculators/physics/density-altitude-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude calculator
            </Link>{" "}
            applies this same formula behind the scenes.
          </p>
        </section>

        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Written by Rana Muhammad Abdullah</p>
            <p className="text-gray-300 text-xs">
              MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control Engineering Student
            </p>
          </div>
          <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-300">
            <span>📅 Published: Aug 12, 2026</span>
            <span>🔄 Updated: Aug 12, 2026</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}