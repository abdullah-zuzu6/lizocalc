import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is Bulk Density? Definition & Examples",
  description:
    "Bulk density explained: how it differs from particle density, why it matters for soil and powders, with a comparison table.",
  keywords: ["what is bulk density", "bulk density vs particle density", "bulk density formula"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "What Is Bulk Density?",
    description: "Bulk density vs. particle density, explained with real materials and a comparison table.",
    url: "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Bulk Density? | LizoCalc",
    description: "The difference between bulk and particle density, explained simply.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-bulk-density#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "What Is Bulk Density?",
          item: "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
      url: "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
      name: "What Is Bulk Density? Definition & Examples | LizoCalc",
      description: "Bulk density explained, with the formula and a comparison against particle density.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-bulk-density#article",
      headline: "What Is Bulk Density? Definition & Examples",
      description: "Bulk density defined and compared against particle density, with real material examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/what-is-bulk-density",
    },
  ],
};

export default function WhatIsBulkDensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">What Is Bulk Density?</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Scoop a cup of flour straight from the bag and it weighs less than the same cup packed down firmly.
            Nothing about the flour itself changed — you just changed how much air is sitting between the
            particles. That&apos;s bulk density, and it&apos;s a different measurement than the density of the
            individual particles themselves.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It comes up constantly with loose materials — soil, gravel, sand, powders, grain — anything that
            isn&apos;t one solid, continuous piece.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">
            Bulk Density = Mass of Sample ÷ Total Volume (Including Air Gaps)
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The key phrase there is "including air gaps." Regular density measures the volume of the material
            itself with no empty space counted. Bulk density measures the volume of the whole container the
            material fills — particles plus every pocket of air between them.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Bulk Density vs. Particle Density
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Material</th>
                  <th className="p-4 text-left font-semibold">Bulk Density (kg/m³)</th>
                  <th className="p-4 text-left font-semibold">Particle Density (kg/m³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Dry sand</td>
                  <td className="p-4">1,400–1,600</td>
                  <td className="p-4">~2,650</td>
                </tr>
                <tr>
                  <td className="p-4">Topsoil</td>
                  <td className="p-4">1,100–1,300</td>
                  <td className="p-4">~2,600</td>
                </tr>
                <tr>
                  <td className="p-4">Gravel</td>
                  <td className="p-4">1,500–1,800</td>
                  <td className="p-4">~2,700</td>
                </tr>
                <tr>
                  <td className="p-4">Wheat flour</td>
                  <td className="p-4">450–600</td>
                  <td className="p-4">~1,500</td>
                </tr>
                <tr>
                  <td className="p-4">Portland cement</td>
                  <td className="p-4">1,400–1,600</td>
                  <td className="p-4">~3,150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Notice bulk density always comes in lower than particle density, sometimes by more than half. All
            of that missing weight is just air sitting between the grains.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Compaction Changes the Number
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Shake a jar of gravel and the pieces settle, squeezing out air pockets and letting smaller pieces
            slide into gaps between larger ones. The mass in the jar doesn&apos;t change, but the volume drops
            because there&apos;s less trapped air, so bulk density goes up.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly why soil scientists distinguish between loose bulk density and compacted bulk
            density when testing farmland — heavily compacted soil (from tractor traffic, for example) restricts
            root growth and water drainage, even though the soil particles themselves haven&apos;t changed at
            all.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where This Matters in Practice
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Construction crews use bulk density to estimate how much a truckload of gravel or sand actually
            weighs before it&apos;s delivered. Agronomists use soil bulk density as a direct indicator of soil
            health — dense, compacted soil holds less water and air for root systems. Food manufacturers rely
            on it for packaging design, since a box sized for the bulk density of loosely poured flour will
            overflow if the flour settles and compacts during shipping.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;re working with a solid, continuous material rather than a loose one, our{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of common materials
            </Link>{" "}
            page covers standard particle densities instead, and our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            can run the math for either case once you have a mass and volume figure.
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