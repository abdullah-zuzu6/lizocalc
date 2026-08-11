import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Density Unit Conversion Guide (kg/m³, g/cm³, lb/ft³ & More)",
  description:
    "Convert between density units with a full reference table and worked examples for kg/m³, g/cm³, lb/ft³, and lb/gal.",
  keywords: ["density unit conversion", "kg/m3 to lb/ft3", "g/cm3 to kg/m3"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Density Unit Conversion Guide",
    description: "A full density unit conversion table plus two worked examples.",
    url: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Density Unit Conversion Guide | LizoCalc",
    description: "Convert kg/m³, g/cm³, lb/ft³ and more with this quick reference.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Density Unit Conversion Guide",
          item: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
      url: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
      name: "Density Unit Conversion Guide | LizoCalc",
      description: "Full density conversion table across metric and imperial units, with worked examples.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide#article",
      headline: "Density Unit Conversion Guide",
      description: "A practical reference for converting between common density units, with worked examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
    },
  ],
};

export default function DensityUnitConversionGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Density Unit Conversion Guide</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density gets reported in more units than almost any other physical quantity — kg/m³ in most
            scientific contexts, g/cm³ in chemistry labs, lb/ft³ in US construction, and lb/gal in shipping and
            fuel industries. Mixing these up isn&apos;t rare; it&apos;s one of the most common calculation
            errors students and engineers run into.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This page is a working reference — the conversion factors you actually need, without digging
            through a full physics textbook.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Conversion Factors Table
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">From</th>
                  <th className="p-4 text-left font-semibold">To</th>
                  <th className="p-4 text-left font-semibold">Multiply By</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">1,000</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">0.001</td>
                </tr>
                <tr>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">62.428</td>
                </tr>
                <tr>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">16.0185</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">0.062428</td>
                </tr>
                <tr>
                  <td className="p-4">lb/gal (US)</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">119.826</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">lb/gal (US)</td>
                  <td className="p-4">0.008345</td>
                </tr>
                <tr>
                  <td className="p-4">lb/in³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">27,679.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example 1: Water in Different Units
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Water at 20°C has a density of 998.2 kg/m³. Convert that to lb/ft³:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            998.2 × 0.062428 ≈ 62.32 lb/ft³
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s where the commonly quoted "water weighs about 62.4 lb/ft³" figure comes from — it&apos;s
            based on the 4°C maximum-density value, not room temperature, which is why you&apos;ll sometimes
            see slightly different numbers depending on which reference temperature a source used.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example 2: Steel Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Carbon steel has a density of 7.85 g/cm³. Convert that to kg/m³:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">7.85 × 1,000 = 7,850 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Now convert that same figure to lb/ft³: 7,850 × 0.062428 ≈ 490.1 lb/ft³ — matching the standard
            reference value engineers use in US structural calculations.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Mistake Worth Watching For
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The most common conversion error isn&apos;t picking the wrong factor — it&apos;s applying it in the
            wrong direction. Multiplying when you should divide (or vice versa) turns a reasonable-looking
            answer into one that&apos;s off by three orders of magnitude, and because the result still looks
            like a "normal" number, it&apos;s easy to miss.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A quick sanity check: g/cm³ values for solids are usually small (1–20), while kg/m³ values for the
            same materials are in the thousands. If your converted number doesn&apos;t roughly match that
            pattern, double-check which direction you converted.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Skip the Manual Math
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            outputs results in multiple units automatically, so you don&apos;t have to run these conversions by
            hand each time. For reference values to plug in, see{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of water
            </Link>{" "}
            or{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of common materials
            </Link>
            .
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