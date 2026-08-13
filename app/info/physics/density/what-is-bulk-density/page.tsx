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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-bulk-density#article",
      headline: "What Is Bulk Density? Definition & Examples",
      description: "Bulk density defined and compared against particle density, with real material examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Scoop a cup of flour straight out of the bag and it weighs less than the same cup packed down tight
            with a spoon. Nothing about the flour changed in that process — you just changed how much air is
            sitting between the particles. That gap between &quot;how heavy the material itself is&quot; and
            &quot;how heavy a scoop of it feels&quot; is what bulk density is actually measuring, and it&apos;s
            a genuinely different number than the density of the individual particles on their own.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This comes up constantly with anything loose: soil, gravel, sand, flour, grain, coffee grounds,
            basically anything that isn&apos;t one solid, continuous chunk you could hold in one piece.
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
            The part that matters is &quot;including air gaps.&quot; Regular density measures only the volume
            the material itself physically occupies, with zero empty space counted. Bulk density measures the
            volume of the whole container the material is sitting in, particles plus every pocket of air wedged
            between them. Same material, two different numbers, depending on which volume you&apos;re using.
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
            Bulk density comes in lower than particle density every single time, sometimes by more than half.
            All of that missing weight is just air occupying space between the grains, not some difference in
            what the material is actually made of.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Example: How Much Does a Truckload Weigh
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say a construction supplier is loading gravel with a bulk density of 1,650 kg/m³ into a truck bed
            with 4 cubic meters of space. The load weighs approximately:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">Mass = Bulk Density × Volume</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">Mass = 1,650 × 4 = 6,600 kg</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s the number the site needs for weight limits and delivery planning, not the particle
            density of solid rock, which would badly overestimate how much actually fits given how much of that
            truck bed is really just air pockets between chunks of gravel. Get this wrong and you either
            underload a truck that could&apos;ve carried more, or blow past a legal weight limit without
            realizing it. If you&apos;ve got a mass and volume figure of your own and want to check the math,
            our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            runs the same division instantly.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Compaction Changes the Number
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Shake a jar of gravel for a few seconds and the pieces settle, squeezing out air pockets and letting
            smaller fragments slide down into gaps between the bigger ones. The mass sitting in that jar
            hasn&apos;t changed at all, but the volume drops because there&apos;s less trapped air, so bulk
            density climbs even though nothing was added.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly why soil scientists track loose bulk density separately from compacted bulk density
            when testing farmland. Heavily compacted soil, the kind you get from repeated tractor traffic across
            the same field, restricts root growth and slows water drainage, even though the individual soil
            particles themselves haven&apos;t changed in the slightest. The compaction is entirely a matter of
            how tightly packed everything is, not what it&apos;s made of.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Case: Why Boxes Overflow
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Food manufacturers run into this constantly with packaging. A box sized around the bulk density of
            loosely poured flour, right off the mixing line, will often overflow or need extra headspace once
            that same flour settles and compacts a bit during shipping and handling. That&apos;s not a
            packaging mistake exactly, it&apos;s bulk density doing what it does — the same mass taking up less
            volume once it&apos;s been jostled around for a few hundred miles on a truck.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where This Actually Shows Up in the Real World
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Construction crews lean on bulk density to estimate how much a truckload of gravel or sand is going
            to weigh before it even shows up on site, since ordering by volume alone can badly miss the actual
            delivered weight. Agronomists use soil bulk density as a fairly direct read on soil health, since
            dense, overly compacted soil holds less water and air for root systems to use. Grain elevators and
            silos are designed around the bulk density of whatever crop they&apos;re storing, since a structure
            built for wheat&apos;s bulk density would be way over-engineered, or possibly under-engineered, for
            something with a very different packing behavior like rice or shelled corn.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;re working with a solid, continuous material instead of a loose one, our{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of common materials
            </Link>{" "}
            page covers standard particle densities for that instead.
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