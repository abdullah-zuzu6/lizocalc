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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Density altitude is the altitude the air actually behaves like it&apos;s at, based on how thin or
            thick it really is, not whatever number your altimeter or a map happens to show. Two airports can
            sit at the exact same elevation and still have completely different density altitudes on the same
            afternoon, purely because one is hotter or more humid than the other.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It sounds like a minor technicality right up until you&apos;re the one trying to get a fully loaded
            plane off a short runway on a 95°F day. Pilots, flight instructors, and airport operators track it
            constantly because it directly changes how an aircraft performs — not how it looks written down on
            paper, but how it actually behaves once it&apos;s in the air trying to climb.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Three Altitudes, Not One
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            People mix these three up constantly, so it&apos;s worth separating them plainly.{" "}
            <strong>True altitude</strong> is your actual height above sea level, the number you&apos;d read
            straight off a topographic map. <strong>Pressure altitude</strong> is what your altimeter shows once
            it&apos;s set to standard pressure, 29.92 inHg, which adjusts for the day&apos;s barometric pressure
            but nothing else. <strong>Density altitude</strong> goes a step further and adjusts pressure
            altitude for temperature too. On a day hotter than standard, density altitude climbs above the
            field&apos;s real elevation. On a cold day, it drops below it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Heat Pushes It Up
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Warm air expands. The molecules spread further apart from each other, so a given volume of hot air
            weighs less than the same volume of cold air sitting in the same spot. Less mass packed into that
            space means lower density, and thinner air behaves, for practical flying purposes, like the plane
            is sitting at a higher altitude than it&apos;s actually parked at.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A field at 2,000 feet elevation on a cold winter morning might have a density altitude close to sea
            level. That same exact field on a 100°F afternoon in July could push a density altitude of 5,000
            feet or more. Nothing about the runway or the surrounding terrain changed between those two mornings
            — the air itself just got thinner.
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
            Same runway, same elevation, roughly a 5,000-foot swing in how the air actually behaves depending on
            what time of day you show up. That swing is the entire reason this number gets tracked in the first
            place instead of pilots just relying on the field elevation printed on a chart.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Case: Why a Hot Afternoon Grounds Flights a Cool Morning Wouldn&apos;t
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Take a small single-engine aircraft with a published takeoff distance of 1,200 feet at sea level,
            standard conditions. At a density altitude of 6,500 feet, the same aircraft might need something
            closer to 2,400 feet of runway to get airborne, roughly double, because the engine is making less
            power in thin air, the propeller is biting into less mass per revolution, and the wings need more
            speed to generate the same lift. A 3,000-foot mountain strip that felt like plenty of runway at
            sunrise can turn genuinely marginal, or outright unsafe for a loaded aircraft, by early afternoon
            once the temperature climbs and density altitude follows it up. This is a real, documented category
            of accident in general aviation, and it&apos;s exactly why flight schools drill density altitude
            calculations into student pilots well before they&apos;re ever handed the keys to fly solo.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What High Density Altitude Actually Does to a Flight
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Thinner air works against an aircraft in three ways at once on a hot day. Engine power drops because
            there&apos;s less oxygen reaching each cylinder stroke. Propeller and rotor efficiency drops because
            the blades are biting into less mass with every turn. And wings need to move faster through thin
            air to generate the same amount of lift they&apos;d get more easily in cooler, denser air. Stack
            those three together and you get longer takeoff rolls, weaker climb rates, and noticeably less
            margin for error, especially at high-elevation airports during summer afternoons.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly why mountain airstrips in places like Colorado or Nevada get a reputation for being
            tricky once the afternoon heat sets in, even though the physical runway itself hasn&apos;t changed
            one bit since the cool morning hours.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How It Connects Back to Air Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Density altitude is really just a way of expressing{" "}
            <Link
              href="/info/physics/density/density-of-air"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              air density
            </Link>{" "}
            in altitude terms that pilots are already trained to read and think in, instead of a raw kg/m³
            figure that wouldn&apos;t mean much on its own in a cockpit. The physics behind it comes straight
            out of the{" "}
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
            itself comes from — and if you want to check a density figure against a mass and volume
            you&apos;ve measured directly, our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles that separately, without needing any of the altitude-specific charts pilots use.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Getting a Rough Number Without a Chart
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Pilots use official charts and onboard instruments for exact numbers before a real flight, but a
            rough rule of thumb helps build intuition: density altitude climbs by roughly 120 feet for every
            degree Fahrenheit above the standard temperature for that elevation. Standard temperature at sea
            level is about 59°F and drops around 3.5°F per thousand feet of elevation. Run a field at 3,000 feet
            through that and standard temperature works out to roughly 48.5°F, so hitting 100°F on a summer
            afternoon puts you about 51.5 degrees above standard, which lines up reasonably well with the
            roughly 3,500-foot jump shown in the table above. It&apos;s not a substitute for a real density
            altitude chart or an onboard computer, but it&apos;s a fast gut check worth having in your head
            before you even reach for one.
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