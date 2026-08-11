import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Density of Common Materials: Wood, Steel, Concrete & More",
  description:
    "A reference table of everyday material densities, from wood and concrete to steel and glass, with context for each.",
  keywords: ["density of common materials", "density of wood", "density of concrete", "material density chart"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Density of Common Materials",
    description: "Reference densities for wood, concrete, glass, steel and more, with real-world context.",
    url: "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Density of Common Materials | LizoCalc",
    description: "A practical density reference table for everyday building and household materials.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-common-materials#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Density of Common Materials",
          item: "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
      url: "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
      name: "Density of Common Materials: Wood, Steel, Concrete & More | LizoCalc",
      description: "Reference density values for everyday building and household materials.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-common-materials#article",
      headline: "Density of Common Materials: Wood, Steel, Concrete & More",
      description: "A practical reference table of everyday material densities with real-world context.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/density-of-common-materials",
    },
  ],
};

export default function DensityOfCommonMaterialsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Density of Common Materials</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A cubic foot of concrete weighs about as much as an adult goat. A cubic foot of balsa wood weighs
            less than a bag of sugar. Same volume, wildly different weight — that gap is entirely down to
            density, and it&apos;s the reason architects, shippers, and hobbyists all keep density tables handy.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Below is a working reference for the materials people actually look up most — wood, concrete, glass,
            steel, and a few others that come up constantly in construction and DIY projects.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Material Density Reference Table
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Material</th>
                  <th className="p-4 text-left font-semibold">Density (kg/m³)</th>
                  <th className="p-4 text-left font-semibold">Density (lb/ft³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Balsa wood</td>
                  <td className="p-4">130–160</td>
                  <td className="p-4">8–10</td>
                </tr>
                <tr>
                  <td className="p-4">Pine (softwood)</td>
                  <td className="p-4">350–600</td>
                  <td className="p-4">22–37</td>
                </tr>
                <tr>
                  <td className="p-4">Oak (hardwood)</td>
                  <td className="p-4">700–900</td>
                  <td className="p-4">44–56</td>
                </tr>
                <tr>
                  <td className="p-4">Standard glass</td>
                  <td className="p-4">2,500</td>
                  <td className="p-4">156</td>
                </tr>
                <tr>
                  <td className="p-4">Concrete (normal)</td>
                  <td className="p-4">2,300–2,400</td>
                  <td className="p-4">144–150</td>
                </tr>
                <tr>
                  <td className="p-4">Aluminum</td>
                  <td className="p-4">2,700</td>
                  <td className="p-4">169</td>
                </tr>
                <tr>
                  <td className="p-4">Carbon steel</td>
                  <td className="p-4">7,850</td>
                  <td className="p-4">490</td>
                </tr>
                <tr>
                  <td className="p-4">Lead</td>
                  <td className="p-4">11,340</td>
                  <td className="p-4">708</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Wood is given as a range on purpose. Unlike a metal alloy with a tight, repeatable density, wood
            density depends on moisture content and how the specific tree grew, so two boards of the same
            species can differ by 10–15% just based on where the tree was harvested.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Concrete Number Isn&apos;t Fixed
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Concrete density depends heavily on the aggregate mix. Standard concrete using gravel or crushed
            stone lands around 2,300–2,400 kg/m³, but lightweight concrete made with expanded clay or shale
            aggregate can drop to 1,400–1,800 kg/m³, while heavyweight concrete used for radiation shielding
            (mixed with barite or magnetite aggregate) can push past 3,500 kg/m³.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is why structural engineers never assume a single "concrete density" and instead pull the
            actual mix design specs for a project before running load calculations.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Uses for These Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Shippers use material density to estimate freight weight before a truck even shows up. Woodworkers
            check density to predict how a species will handle carving or steam bending — denser woods resist
            tool cuts more but also hold detail better. Builders use concrete and steel densities to calculate
            structural loads before construction even starts, since getting this wrong means a foundation
            designed for the wrong weight.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you have a specific mass and volume and want an exact density instead of a table lookup, our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles that directly.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Reading
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            For a more precise look at one material, see our{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of water
            </Link>{" "}
            page, or check{" "}
            <Link
              href="/info/physics/density/what-is-bulk-density"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              what bulk density means
            </Link>{" "}
            if you&apos;re working with loose materials like sand, gravel, or soil rather than solid blocks.
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