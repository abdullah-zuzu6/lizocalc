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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/is-density-a-physical-or-chemical-property#article",
      headline: "Is Density a Physical or Chemical Property?",
      description: "Why density counts as a physical property, with clear examples separating it from chemical properties.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Density is a physical property. You can measure it, watch it shift when you heat something up or
            squeeze it into a smaller space, and check it as many times as you want without changing what the
            substance actually is underneath. That last part is the real test, and it&apos;s what separates a
            physical property from a chemical one.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This question shows up in pretty much every intro chemistry and physics class for a reason.
            It&apos;s a decent way to tell whether someone actually understands the distinction or is just
            repeating a definition they memorized the night before.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Actually Separates the Two
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A physical property is something you can observe or measure without changing the substance&apos;s
            chemical identity. Melt an ice cube and you&apos;ve still got H₂O when you&apos;re done, you just
            changed which state it&apos;s sitting in. A chemical property, on the other hand, describes how a
            substance behaves when it reacts and turns into something else entirely. Burn a piece of wood and
            what&apos;s left is ash and gas, not wood anymore, not in any form you can turn back into a log by
            cooling it down.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density passes the physical-property test easily. Weigh a block of aluminum, measure how much space
            it takes up, work out mass over volume, and at the end of all that it&apos;s still aluminum,
            chemically unchanged, same metal you started with.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Physical vs Chemical, Side by Side
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
            Where People Usually Get Confused
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density shifts with temperature and pressure, and some people assume that anything that changes has
            to be a chemical property, since &quot;chemical&quot; sounds like the word for change. But changing
            under different physical conditions is exactly what a physical property is allowed to do. Heat a
            gas and its density drops because the molecules spread out, not because the gas turned into a
            different substance. The chemical formula never moved.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Compare that to rust forming on a piece of iron left out in the rain. That&apos;s a genuine chemical
            change, because the iron has actually become a new substance, iron oxide, with different properties
            than plain iron. There&apos;s no way to just cool rust back down and get iron again the way you can
            cool water back down into ice. Once the reaction happens, it&apos;s a one-way trip.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Real Case: Identifying Gold
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density earns its keep as a material identifier because it stays consistent for a given substance
            under fixed conditions. Pure gold sits at 19.32 g/cm³, which is unusually dense for a metal you can
            bend with your hands. A ring padded out with a cheaper metal like copper or silver reads noticeably
            lighter for its size, and jewelers have used exactly this trick for centuries to catch counterfeit
            or diluted gold before it&apos;s even melted down or tested chemically. You can run the same math
            yourself with our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>
            , plugging in a mass and volume to see whether the number lands anywhere near 19.32.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Geologists lean on the same logic out in the field, using density readings to narrow down what
            mineral they&apos;re holding before running any lab tests. Manufacturers use it for quality control
            too, checking that a finished batch of material matches the density expected for its stated
            composition, since a batch that&apos;s off usually means something went wrong in the mix.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of this works if density weren&apos;t a stable, physical property to begin with. If measuring
            it changed the substance every time, it would be useless as an identifier, and jewelers, geologists,
            and quality control inspectors would all be out of a fairly reliable tool.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where to Go From Here
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If you want to see the actual math behind calculating density from a mass and volume you&apos;ve
            already measured, the{" "}
            <Link
              href="/info/physics/density/mass-volume-density-relationship"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              mass, volume, and density relationship
            </Link>{" "}
            page walks through all three rearrangements of the formula with worked examples for each one.
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