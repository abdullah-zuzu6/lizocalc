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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/gas-density-formula#article",
      headline: "Gas Density Formula: ρ = PM / RT Explained",
      description: "How the gas density formula is derived from the ideal gas law, with a worked example.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            A brick has one density. Pick it up, weigh it, measure it, and that number doesn&apos;t move around
            on you. Gas doesn&apos;t work that way. Trap the same gas in a smaller box and the density goes up.
            Warm it up and the density drops. Let it escape into open air and technically it doesn&apos;t even
            have a density anymore because it just keeps spreading out. That&apos;s the whole reason gases get
            their own formula instead of borrowing the plain mass-over-volume trick that works fine for a brick
            or a puddle of water.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The good news is the formula isn&apos;t some separate thing you have to memorize cold. It falls
            straight out of the ideal gas law once you rearrange a couple of terms, so if you already know
            PV = nRT, you&apos;re most of the way there already.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where ρ = PM / RT Actually Comes From
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Start with the ideal gas law itself, which we cover in more depth on our{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law page
            </Link>
            :
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">PV = nRT</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Moles isn&apos;t a unit anyone measures directly with a scale. What you actually have is mass, so
            swap n for m / M, where M is molar mass:
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">PV = (m / M) RT</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density is just mass divided by volume, ρ = m / V, so the goal is to get m/V by itself on one side.
            Move the V over and divide both sides by R:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = PM / RT</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s it. Three steps of algebra and you&apos;ve turned an equation about volume into one
            about weight per cubic meter. Nothing mysterious happened in between — it&apos;s the same physics,
            just pointed at a different question.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Each Letter Is Doing
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
          <p className="text-gray-200 leading-relaxed text-base">
            The one that trips people up is M. It&apos;s not the mass of your particular sample, it&apos;s the
            molar mass of whatever gas you&apos;re working with, which is a fixed number you look up. Air&apos;s
            average molar mass is about 0.02897 kg/mol because air is a mix of nitrogen, oxygen, and a bit of
            everything else, so what you&apos;re using is a weighted average, not one clean molecule&apos;s
            weight.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Running the Numbers for Air
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Dry air&apos;s average molar mass is 0.02897 kg/mol. At sea level, standard pressure is 101,325 Pa,
            and let&apos;s use 15°C, which converts to 288.15 K.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            ρ = (101,325 × 0.02897) / (8.314 × 288.15)
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">ρ = 2,935.4 / 2,395.4</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">ρ ≈ 1.225 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That number should look familiar if you&apos;ve ever seen &quot;standard air density&quot; quoted
            anywhere, because that&apos;s exactly what it is. It&apos;s a decent sanity check too. If your
            calculation lands anywhere near 1.2, you probably did it right. If you get something wildly off,
            like 12 or 0.012, go back and check whether you plugged in Celsius by mistake instead of kelvin,
            because that&apos;s the single most common way this calculation goes sideways.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Now swap in helium, which has a molar mass of about 0.004 kg/mol, keeping pressure and temperature
            the same:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            ρ = (101,325 × 0.004) / (8.314 × 288.15)
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">ρ ≈ 0.169 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Helium comes out to roughly a seventh the density of air. That&apos;s the entire reason a helium
            balloon floats. It&apos;s not magic, it&apos;s just a gas with a much lighter molar mass sitting
            inside air that&apos;s about seven times heavier for the same volume, so buoyancy does the rest.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Table of Common Gases
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
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Look down that middle column and the pattern in the last column pretty much writes itself: heavier
            molar mass means denser gas, assuming pressure and temperature stay put. It&apos;s also why CO₂
            pools near the floor in a stuffy, badly ventilated room instead of mixing evenly through the air,
            and why hydrogen and helium just drift straight up and out through any gap they can find.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;ve got a mass and a volume sitting in front of you instead of pressure and temperature,
            you don&apos;t need to run any of this algebra by hand. Our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            takes those two numbers and spits out the density directly, gas or otherwise, without you touching
            the ideal gas law at all.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Any of This Actually Matters Outside a Classroom
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This isn&apos;t just a formula that shows up on a quiz and then disappears from your life. Pilots
            and flight planners use it constantly when they&apos;re working out how thin the air is at a given
            airport on a hot afternoon, because a less dense atmosphere means an aircraft needs more runway and
            climbs slower, and that&apos;s not something you want to get wrong. HVAC engineers lean on the same
            relationship when sizing ductwork and fans for buildings in different climates, since air at a
            mountain elevation or in a heat wave behaves noticeably differently than air at sea level on a mild
            day.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Scuba divers run into a version of this too, even if nobody calls it out by name. The air in a tank
            compressed to a few thousand psi is dramatically denser than the air you&apos;re breathing standing
            on a dock, which is exactly why a tank holds enough air for an hour-long dive despite being a
            container you can carry on your back.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Gut Check Before You Trust Your Answer
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Two habits will save you from most mistakes here. First, temperature always goes in as kelvin, never
            Celsius, because the ideal gas law assumes zero means zero molecular motion, and Celsius doesn&apos;t
            hit zero at the same point kelvin does. Second, keep your units consistent all the way through — if
            pressure is in pascals, R needs to be 8.314 J/(mol·K), not the version in L·atm, or your answer
            comes out off by several orders of magnitude and you won&apos;t necessarily notice unless you stop
            and sanity-check the number against something you already know, like air sitting at roughly 1.2
            kg/m³.
          </p>
        </section>

        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Written by Rana Muhammad Abdullah</p>
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
            <span>📅 Published: Aug 14, 2026</span>
            <span>🔄 Updated: Aug 14, 2026</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}