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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-common-materials#article",
      headline: "Density of Common Materials: Wood, Steel, Concrete & More",
      description: "A practical reference table of everyday material densities with real-world context.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Pick up a cubic foot of concrete and you're holding about 150 pounds, roughly what an adult goat
            weighs. Pick up a cubic foot of balsa wood and it's under 10 pounds, less than a bag of sugar. Same
            size block, completely different weight in your hands, and the whole gap comes down to one thing:
            density.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It's why a structural beam gets sized the way it does, why a shipping quote is based on weight
            instead of box count, and why someone building a model plane picks their wood as much for how light
            it is as for the grain. Below is a working table for the materials people actually look up the
            most, plus enough context to know why each number sits where it does instead of just memorizing it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of these numbers are guesses. They come from standard engineering references and are the same
            figures you'd find on a materials data sheet or in a structural handbook, just laid out in one
            place instead of scattered across eight different PDFs.
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
                  <th className="p-4 text-left font-semibold">Floats on water?</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Balsa wood</td>
                  <td className="p-4">130–160</td>
                  <td className="p-4">8–10</td>
                  <td className="p-4">Yes, easily</td>
                </tr>
                <tr>
                  <td className="p-4">Pine (softwood)</td>
                  <td className="p-4">350–600</td>
                  <td className="p-4">22–37</td>
                  <td className="p-4">Yes</td>
                </tr>
                <tr>
                  <td className="p-4">Oak (hardwood)</td>
                  <td className="p-4">700–900</td>
                  <td className="p-4">44–56</td>
                  <td className="p-4">Barely, when dry</td>
                </tr>
                <tr>
                  <td className="p-4">Standard glass</td>
                  <td className="p-4">2,500</td>
                  <td className="p-4">156</td>
                  <td className="p-4">No</td>
                </tr>
                <tr>
                  <td className="p-4">Concrete (normal)</td>
                  <td className="p-4">2,300–2,400</td>
                  <td className="p-4">144–150</td>
                  <td className="p-4">No</td>
                </tr>
                <tr>
                  <td className="p-4">Aluminum</td>
                  <td className="p-4">2,700</td>
                  <td className="p-4">169</td>
                  <td className="p-4">No</td>
                </tr>
                <tr>
                  <td className="p-4">Carbon steel</td>
                  <td className="p-4">7,850</td>
                  <td className="p-4">490</td>
                  <td className="p-4">No</td>
                </tr>
                <tr>
                  <td className="p-4">Lead</td>
                  <td className="p-4">11,340</td>
                  <td className="p-4">708</td>
                  <td className="p-4">No</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Wood gets a range instead of one fixed number on purpose. A metal alloy is basically the same
            material everywhere you cut it, so its density barely moves. Wood isn't like that. It depends on
            moisture content, how the tree grew, even which part of the trunk the board came from. Two pieces
            of the exact same species can land 10 to 15 percent apart in weight just because of where and how
            they grew.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Working Out Weight From a Density Table
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The formula behind every number on that table is simple: density equals mass divided by volume, or
            written out,
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = m / V</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Flip it around and you can find the weight of a piece of material once you know its volume. Say
            you've got a slab of oak measuring 2m long, 0.3m wide, and 0.05m thick. That's a volume of 0.03 m³.
            Multiply that by oak's density, around 800 kg/m³ in the middle of its range, and you get 24 kg.
            That's the number you'd want before deciding whether one person can lift the board or whether
            you need help.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you'd rather skip the manual multiplication, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            will run that math for you, either solving for weight when you give it volume and density, or
            solving for density when you already know mass and volume and just want an exact figure instead of
            a table estimate.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Balsa Wood: A Light Material That Became a Supply Chain Headache
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Balsa is about a tenth as dense as oak, and that single fact turned it into a real supply-chain
            story a few years back. Wind turbine blades need a core material that's strong without adding much
            weight, because every extra kilogram out at the blade tip gets swung around dozens of times a
            minute. Balsa did that job well for decades, and Ecuador, which grows most of the world's
            commercial balsa, supplied it without much fuss.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Then 2020 happened. Global wind installations jumped 24 percent that year as developers in China
            and the US rushed to finish projects before subsidies expired, and balsa demand spiked right along
            with it. Ecuador's balsa exports hit around $570 million that year according to industry group
            AIMA, with most of it going straight into turbine blades. Prices had already doubled between
            mid-2019 and mid-2020, and the scramble for wood pushed loggers into parts of the Amazon where
            balsa isn't normally cut for sale. By 2021, turbine makers including Vestas had started
            redesigning blades around PET foam cores just to cut how much balsa they needed.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It's an odd thing to sit with: a material chosen for one physical property, low density, ended up
            reshaping trade routes and forcing engineering changes in about two years. Most numbers on a
            density chart don't carry that kind of weight, no pun intended.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Concrete Number Moves More Than People Assume
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Concrete's density depends a lot on what's mixed into it. Regular concrete with gravel or crushed
            stone sits around 2,300 to 2,400 kg/m³. Swap in expanded clay or shale and you get lightweight
            concrete down around 1,400 to 1,800 kg/m³. Go the other direction with barite or magnetite
            aggregate for radiation shielding, and you can end up past 3,500 kg/m³, more than double the
            lightweight version.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That's why an engineer never just assumes "concrete is 2,400" and moves on. They pull the actual
            mix design for the project before running any load calculations. Get the assumed density wrong on
            a slab and you can be off by hundreds of kilograms per cubic meter, and that adds up fast once
            you're talking about an entire foundation instead of one small sample.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where People Actually Use These Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Freight companies use material density to estimate weight before a truck even shows up, since
            shipping rates often depend on whichever is higher, actual weight or "dimensional weight" based on
            box size. Woodworkers check density to guess how a species will handle carving or steam bending:
            denser wood fights the tool more but holds fine detail better. Builders use concrete and steel
            figures to work out structural loads before a single wall goes up, because a foundation designed
            around the wrong weight is the kind of mistake you don't catch until it's expensive to fix.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you're dealing with loose material instead of a solid block, sand, gravel, soil, or grain, the
            math changes because of the air gaps between particles. That's a separate topic, covered in our
            guide to{" "}
            <Link
              href="/info/physics/density/what-is-bulk-density"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              bulk density
            </Link>
            , since a pile of loose sand and a solid block of the same sand pack down to different weights per
            cubic meter.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Aircraft designers sit on the opposite end of this from builders. Where a structural engineer wants
            enough density to be strong, an aerospace engineer is fighting for every gram they can shave off,
            which is why aluminum, at roughly a third the density of steel, still dominates airframes even
            though steel is stronger pound for pound in some applications. The trade-off between strength and
            weight is really just a trade-off in disguise for density and structural design.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Water Is the Reference Point Behind Most of This
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Most of these materials end up compared to water at some point, since anything denser than 1,000
            kg/m³ sinks and anything lighter floats. Balsa and pine float without trying. Oak barely floats
            when dry and can sink once it's soaked through, which is why old wooden boats needed regular
            maintenance to stay buoyant. If you want the exact numbers behind that comparison, including why
            water itself isn't a single fixed value the way this table might suggest,{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              water's density at different temperatures
            </Link>{" "}
            covers it in more detail.
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