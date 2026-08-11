import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Is Density a Physical or Chemical Property?",
  description:
    "Density is a physical property, not a chemical one. Here's the distinction, why it matters, and how density is used to identify materials.",
  keywords: [
    "is density a physical property",
    "density physical or chemical property",
    "physical property examples",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Is Density a Physical or Chemical Property?",
    description: "Density is physical, not chemical — here's the reasoning and why the distinction matters.",
    url: "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Is Density Physical or Chemical? | LizoCalc",
    description: "The clear answer, plus how physical and chemical properties differ.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Physical or Chemical Property?",
          item: "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
      url: "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
      name: "Is Density a Physical or Chemical Property? | LizoCalc",
      description: "Explains why density is classified as a physical property and how that differs from chemical properties.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property#article",
      headline: "Is Density a Physical or Chemical Property?",
      description: "Why density counts as a physical property, with clear examples separating it from chemical properties.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property",
    },
  ],
};

export default function IsDensityPhysicalOrChemicalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Is Density a Physical or Chemical Property?</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density is a physical property. You can measure it, watch it change under heat or pressure, and
            observe it without altering what the substance actually is at a molecular level — and that&apos;s
            exactly the test that separates physical properties from chemical ones.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This question shows up in almost every intro chemistry and physics course because it&apos;s a good
            way to check whether a student actually understands the distinction, or is just memorizing
            definitions.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Actual Distinction
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A physical property can be observed or measured without changing the substance&apos;s chemical
            identity. Melt an ice cube and you still have H₂O — you just changed its state, not what it is at
            the molecular level. A chemical property, on the other hand, describes how a substance behaves when
            it undergoes a chemical reaction and becomes something else entirely. Burn a piece of wood and
            you&apos;re left with ash and gases — the wood is chemically transformed, not just changed in shape
            or state.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density passes the physical-property test cleanly. You can weigh a block of aluminum, measure its
            volume, and calculate density — and at the end, it&apos;s still aluminum. Nothing about its
            chemical makeup changed during the measurement.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Physical Properties</th>
                  <th className="p-4 text-left font-semibold">Chemical Properties</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Density</td>
                  <td className="p-4">Flammability</td>
                </tr>
                <tr>
                  <td className="p-4">Melting/boiling point</td>
                  <td className="p-4">Reactivity with acids</td>
                </tr>
                <tr>
                  <td className="p-4">Color</td>
                  <td className="p-4">Ability to oxidize (rust)</td>
                </tr>
                <tr>
                  <td className="p-4">Hardness</td>
                  <td className="p-4">Toxicity</td>
                </tr>
                <tr>
                  <td className="p-4">Electrical conductivity</td>
                  <td className="p-4">pH / acidity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why This Sometimes Confuses People
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density changes with temperature and pressure, and people sometimes assume that anything that
            "changes" must be chemical. But changing under different physical conditions is exactly what a
            physical property does — density shifting when you heat a gas doesn&apos;t alter its chemical
            formula, it just changes how tightly its molecules are packed.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Compare that to rust forming on iron. That&apos;s a chemical change — the iron literally becomes a
            new substance, iron oxide, with different properties than the original metal. There&apos;s no
            version of "heat it up and it turns back into plain iron" the way there is with, say, melting ice
            back into liquid water.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Practical Use: Identifying Materials by Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Because density is physical and stays consistent for a given substance under fixed conditions, it
            becomes a reliable identifier. Jewelers use it to check whether gold is genuine — pure gold has a
            density of 19.32 g/cm³, and a fake piece padded with a cheaper metal will measure noticeably lower
            or higher, depending on what it&apos;s cut with.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Geologists use the same logic to help identify unknown mineral samples in the field, and
            manufacturers use it for quality control, checking that a batch of material matches the expected
            density for its stated composition. None of this would work if density weren&apos;t a stable,
            repeatable physical property.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            See the Formula in Action
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If you want to calculate density from a mass and volume you&apos;ve measured, our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles it instantly, and our{" "}
            <Link
              href="/info/physics/density/mass-volume-density-relationship"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              mass, volume, and density relationship
            </Link>{" "}
            page walks through how the three values connect.
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