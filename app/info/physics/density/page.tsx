import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is Density? Definition, Formula & Real Examples",
  description:
    "Density explained in plain terms: the formula, why ice floats, why ships don't sink, and how density is used in the real world.",
  keywords: ["what is density", "density definition", "density formula", "mass volume density"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "What Is Density?",
    description: "Density explained simply, with the formula, real-world examples, and why ice floats on water.",
    url: "https://www.lizocalc.com/info/physics/density",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Density? | LizoCalc",
    description: "Density, explained in plain language with real examples.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density",
      url: "https://www.lizocalc.com/info/physics/density",
      name: "What Is Density? Definition, Formula & Real Examples | LizoCalc",
      description: "Density explained in plain terms, with the formula and real-world examples.",
      inLanguage: "en",
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density#article",
      headline: "What Is Density? Definition, Formula & Real Examples",
      description: "What density means, the formula behind it, and how it shows up in everyday life.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-13",
      dateModified: "2026-08-13",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density",
    },
  ],
};

export default function WhatIsDensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">What Is Density?</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Pick up a bowling ball and a beach ball of the same size and you already understand density without
            ever learning the word for it. One feels impossibly heavy for how much space it takes up. The other
            feels almost weightless. Same size, wildly different weight, and that difference is exactly what
            density is describing.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            In plain terms, density tells you how much stuff is packed into a given amount of space. A material
            with a lot of mass crammed into a small volume is dense. A material with the same mass spread out
            over a much bigger volume isn&apos;t. It&apos;s one of the first physical properties kids run into,
            usually with the sink-or-float question, and it turns out to be one of the most useful numbers in
            science and engineering for the rest of your life after that.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Basic Formula
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = m / V</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density equals mass divided by volume, where ρ is the Greek letter rho, the standard symbol
            scientists use for density.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you weigh something and measure how much space it takes up, dividing one by the other gives you
            density. Water comes out to almost exactly 1 gram per cubic centimeter, which isn&apos;t a
            coincidence — the gram was originally defined around the mass of one cubic centimeter of water, back
            when the metric system was first being put together in the 1790s. That&apos;s part of why water
            makes such a convenient reference point for comparing everything else.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Same Substance Can Weigh Different Amounts
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Something that trips a lot of people up early on: mass and weight aren&apos;t quite the same thing,
            and density cares about mass specifically. Weight changes depending on gravity — an astronaut weighs
            a fraction of what they do on Earth once they&apos;re standing on the Moon. But their mass, how much
            actual matter is in their body, doesn&apos;t change at all. Density follows mass, not weight, which
            is why a rock&apos;s density is identical whether you measure it on Earth or the Moon, even though
            it would feel far lighter to pick up on the Moon.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Comparison Across Materials
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Material</th>
                  <th className="p-4 text-left font-semibold">Density (g/cm³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Air</td>
                  <td className="p-4">0.0012</td>
                </tr>
                <tr>
                  <td className="p-4">Ice</td>
                  <td className="p-4">0.92</td>
                </tr>
                <tr>
                  <td className="p-4">Water</td>
                  <td className="p-4">1.00</td>
                </tr>
                <tr>
                  <td className="p-4">Aluminum</td>
                  <td className="p-4">2.70</td>
                </tr>
                <tr>
                  <td className="p-4">Steel</td>
                  <td className="p-4">7.85</td>
                </tr>
                <tr>
                  <td className="p-4">Lead</td>
                  <td className="p-4">11.34</td>
                </tr>
                <tr>
                  <td className="p-4">Gold</td>
                  <td className="p-4">19.32</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Look at where water and ice land on that list and something interesting shows up: ice is less dense
            than liquid water, which is genuinely unusual for a solid. Almost every other substance gets denser
            when it freezes, since the molecules pack tighter together in solid form. Water does the opposite
            because of how its molecules arrange themselves into a hexagonal lattice when they freeze, leaving
            more open space than the liquid form has. That&apos;s the entire reason ice cubes float instead of
            sinking to the bottom of your glass, and it&apos;s also why lakes freeze from the top down instead
            of the bottom up, which matters more than it sounds like — a lake that froze from the bottom up
            would kill off everything living in it every winter.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Some Things Float and Others Sink
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density is what decides whether something floats in a given fluid, and the rule is straightforward
            once you see it: anything less dense than the fluid around it floats, anything more dense sinks.
            That&apos;s why a beach ball floats effortlessly on a swimming pool and a bowling ball drops straight
            to the bottom, and it&apos;s why oil sits in a visible layer on top of water instead of mixing in,
            since oil is less dense than water no matter how hard you shake the bottle.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is also how a massive steel ship manages to float despite steel itself being roughly eight
            times denser than water. The trick isn&apos;t the steel, it&apos;s the shape. A ship&apos;s hull is
            hollow, so the overall density of the ship, steel plus all the empty air space inside it, works out
            to less than the density of the water it&apos;s sitting in. Flatten that same amount of steel into a
            solid block instead and it sinks immediately, same material, same mass, completely different
            outcome, purely because the volume changed.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density in the Real World, Beyond the Classroom
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This one number quietly shows up in an enormous range of practical situations. Jewelers use it to
            catch fake gold, since pure gold has a very specific density and a ring padded out with a cheaper
            metal reads noticeably off. Geologists use it in the field to get a fast read on what kind of rock or
            mineral they&apos;re holding before running any lab tests. Shipping companies factor it into how
            they price and load cargo, since a truck or container can run out of usable space before it hits its
            weight limit, or the other way around, depending on how dense the goods are.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density even shows up in medicine. Bone density scans measure exactly what the name suggests,
            checking how tightly packed the mineral content of a person&apos;s bones actually is, since lower
            bone density is a warning sign for osteoporosis long before a fracture happens. None of that is
            really a separate concept from a rock sinking in water, it&apos;s the exact same relationship between
            mass and volume, just applied somewhere you might not expect it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density Isn&apos;t Fixed the Way You&apos;d Think
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            For solids, density barely changes under normal conditions, which is part of why it&apos;s such a
            reliable way to identify a material. But it isn&apos;t locked in stone for every state of matter.
            Gases are the extreme case: squeeze a gas into a smaller container and its density climbs noticeably,
            since you&apos;re packing the same number of molecules into less space. Heat a gas and it expands,
            spreading those same molecules out and dropping the density. That relationship is exact enough to
            have its own equation, laid out in more depth on our{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            page, which comes straight out of the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law
            </Link>
            .
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Liquids and solids shift with temperature too, just far less dramatically than gases do, since their
            molecules are already packed close together and don&apos;t have nearly as much room to spread out or
            compress.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density vs a Couple of Related Terms
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            People sometimes use &quot;density&quot; loosely for a few related ideas that are actually distinct.{" "}
            <Link
              href="/info/physics/density/specific-weight-units-explained"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Specific weight
            </Link>
            , for instance, factors gravity into the equation, describing weight per volume rather than mass per
            volume, which matters a lot more than you&apos;d guess once you&apos;re doing engineering
            calculations for tanks, dams, or pipe systems.{" "}
            <Link
              href="/info/physics/density/what-is-bulk-density"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Bulk density
            </Link>{" "}
            is another one, used for loose materials like soil, sand, or gravel, where the measured volume
            includes all the air pockets sitting between individual particles, not just the particles
            themselves.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;re working from mass and volume figures and want a quick answer instead of doing the
            division by hand, our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles it directly, and it also runs the reverse calculations if you already know density and need
            to solve for mass or volume instead. And if you&apos;re curious how density connects into gases
            specifically, or want to see the{" "}
            <Link
              href="/info/physics/density/is-density-a-physical-or-chemical-property"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              physical vs chemical property
            </Link>{" "}
            distinction laid out with real examples, those pages go into more depth on each piece of it.
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