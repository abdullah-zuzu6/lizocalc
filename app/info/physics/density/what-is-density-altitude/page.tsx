import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is Density Altitude? Simple Explanation",
  description:
    "Density altitude explained in plain terms: what it means, why pilots track it, and how heat and elevation change it.",
  keywords: [
    "what is density altitude",
    "density altitude explained",
    "density altitude aviation",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "What Is Density Altitude?",
    description:
      "A plain-language breakdown of density altitude, why it matters for flying, and how to think about it.",
    url: "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Density Altitude? | LizoCalc",
    description: "Plain-language guide to density altitude and why it changes with heat and elevation.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-density-altitude#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "What Is Density Altitude?",
          item: "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
      url: "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
      name: "What Is Density Altitude? | LizoCalc",
      description:
        "Explains density altitude in plain terms, how it differs from pressure altitude, and why hot days matter for aircraft performance.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: {
        "@type": "Person",
        name: "Rana Muhammad Abdullah",
        url: "https://www.linkedin.com/in/abdullahsajjad06/",
      },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/what-is-density-altitude#article",
      headline: "What Is Density Altitude?",
      description:
        "A plain-language breakdown of density altitude, how it's different from true altitude, and why it matters for aircraft performance.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: {
        "@type": "Person",
        name: "Rana Muhammad Abdullah",
        url: "https://www.linkedin.com/in/abdullahsajjad06/",
      },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/what-is-density-altitude",
    },
  ],
};

export default function WhatIsDensityAltitudePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">What Is Density Altitude?</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density altitude is the altitude the air actually feels like it&apos;s at, based on how thin or thick
            it is, not what your altimeter or a map says. Two airports can sit at the exact same elevation and
            still have completely different density altitudes on the same afternoon, just because one is hotter
            or more humid than the other.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It sounds like a small technicality until you&apos;re the one trying to get a fully loaded plane off a
            short runway on a 95°F day. Pilots, flight instructors, and airport operators track it constantly
            because it directly changes how an aircraft performs — not how it looks on paper, but how it actually
            behaves in the air.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Density Altitude vs. Pressure Altitude vs. True Altitude
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            People mix these three up constantly, so it helps to separate them plainly.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            <strong>True altitude</strong> is your actual height above sea level, the number on a topographic
            map. <strong>Pressure altitude</strong> is what your altimeter reads when it&apos;s set to standard
            pressure (29.92 inHg), which corrects for the day&apos;s barometric pressure but nothing else.{" "}
            <strong>Density altitude</strong> goes one step further and adjusts pressure altitude for
            temperature. On a day that&apos;s hotter than standard, density altitude goes up. On a cold day, it
            drops below the field&apos;s actual elevation.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            You can run the numbers yourself using our{" "}
            <Link
              href="/calculators/physics/density-altitude-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude calculator
            </Link>{" "}
            — plug in field elevation, temperature, and pressure, and it does the adjustment for you instead of
            working through the chart by hand.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why It Changes With Heat
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Warm air expands. The molecules spread further apart, so a given volume of hot air weighs less than
            the same volume of cold air. Less mass packed into that space means lower density, and thinner air
            behaves, for practical purposes, like the airplane is flying at a higher altitude than it&apos;s
            actually sitting at.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A field sitting at 2,000 feet elevation on a cold winter morning might have a density altitude close
            to sea level. That same field on a 100°F afternoon in July could have a density altitude pushing
            5,000 feet or more. Nothing about the runway or the terrain changed — the air itself just got
            thinner.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: Same Airport, Two Different Days
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Condition</th>
                  <th className="p-4 text-left font-semibold">Field Elevation</th>
                  <th className="p-4 text-left font-semibold">Temperature</th>
                  <th className="p-4 text-left font-semibold">Approx. Density Altitude</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Cold morning</td>
                  <td className="p-4">3,000 ft</td>
                  <td className="p-4">30°F</td>
                  <td className="p-4">~1,600 ft</td>
                </tr>
                <tr>
                  <td className="p-4">Hot afternoon</td>
                  <td className="p-4">3,000 ft</td>
                  <td className="p-4">100°F</td>
                  <td className="p-4">~6,500 ft</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Same runway, same elevation, roughly a 5,000-foot swing in how the air actually behaves. That&apos;s
            the entire reason this number gets tracked instead of just relying on field elevation alone.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What High Density Altitude Actually Does
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Thinner air affects three things at once, and they all work against you on a hot day: engine power
            drops because there&apos;s less oxygen per cylinder stroke, propeller and rotor efficiency drops
            because the blades are biting into less mass, and wings need to move faster through the thin air to
            generate the same lift. Put those together and you get longer takeoff rolls, weaker climb rates, and
            less margin for error, especially at high-elevation airports in summer.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly why mountain airstrips in places like Colorado or Nevada get a reputation for being
            tricky in the afternoon heat, even though the runway itself hasn&apos;t changed at all since sunrise.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How It Connects to Air Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Density altitude is really just a way of expressing{" "}
            <Link
              href="/info/physics/density/density-of-air"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              air density
            </Link>{" "}
            in altitude terms that pilots are already used to reading. The underlying physics comes straight
            from the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law
            </Link>
            , which is also where the{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            comes from. If you want the math behind why hot, humid air is less dense than cool, dry air, that
            page walks through it step by step.
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