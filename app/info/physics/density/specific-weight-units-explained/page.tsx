import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Specific Weight Units Explained (With Table)",
  description:
    "Specific weight vs. density, the units each one uses, and a conversion table between N/m³, lbf/ft³, and more.",
  keywords: ["specific weight units", "specific weight vs density", "specific weight formula"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Specific Weight Units, Explained Clearly",
    description: "How specific weight differs from density, and how to convert between common units.",
    url: "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Specific Weight Units Explained | LizoCalc",
    description: "Density vs. specific weight, with a full unit conversion table.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Specific Weight Units",
          item: "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
      url: "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
      name: "Specific Weight Units Explained (With Table) | LizoCalc",
      description: "Specific weight vs. density, unit definitions, and a conversion table.",
      inLanguage: "en",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained#article",
      headline: "Specific Weight Units Explained (With Table)",
      description: "How specific weight differs from density and how its common units convert.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained",
    },
  ],
};

export default function SpecificWeightUnitsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Specific Weight Units Explained</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Specific weight gets mixed up with density constantly, and it&apos;s an easy mix-up to make since
            the two numbers are related and often close enough in casual conversation that nobody notices the
            difference. But they&apos;re not the same thing, and confusing them in an actual engineering
            calculation gives you a genuinely wrong answer, not just a sloppy one that&apos;s close enough.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density is mass per unit volume. Specific weight is weight per unit volume. The difference comes
            down to gravity, plain and simple — weight depends on it, mass doesn&apos;t.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">γ = ρ × g</p>
          <p className="text-gray-200 leading-relaxed text-base">
            γ, gamma, is specific weight. ρ is density. g is gravitational acceleration, 9.81 m/s² here on
            Earth. Since g stays constant almost everywhere you&apos;d actually run this calculation, specific
            weight tracks pretty closely with density in day-to-day use. But the values and the units are still
            genuinely separate quantities, and you&apos;ll run into engineering references quoting specific
            weight in places where you might have expected plain density instead, especially in fluid mechanics
            and civil engineering.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Units for Specific Weight
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Unit</th>
                  <th className="p-4 text-left font-semibold">System</th>
                  <th className="p-4 text-left font-semibold">Equivalent (N/m³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Newton per cubic meter (N/m³)</td>
                  <td className="p-4">SI</td>
                  <td className="p-4">1</td>
                </tr>
                <tr>
                  <td className="p-4">Pound-force per cubic foot (lbf/ft³)</td>
                  <td className="p-4">Imperial</td>
                  <td className="p-4">157.087</td>
                </tr>
                <tr>
                  <td className="p-4">Kilogram-force per cubic meter (kgf/m³)</td>
                  <td className="p-4">Gravitational metric</td>
                  <td className="p-4">9.807</td>
                </tr>
                <tr>
                  <td className="p-4">Pound-force per cubic inch (lbf/in³)</td>
                  <td className="p-4">Imperial</td>
                  <td className="p-4">271,447</td>
                </tr>
                <tr>
                  <td className="p-4">Dyne per cubic centimeter (dyn/cm³)</td>
                  <td className="p-4">CGS</td>
                  <td className="p-4">10</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Working Through Water
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Water&apos;s density is 1,000 kg/m³. Its specific weight on Earth:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">γ = 1,000 × 9.81 = 9,810 N/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Convert that over to pound-force per cubic foot and you land at roughly 62.4 lbf/ft³, a number that
            shows up constantly in plumbing and civil engineering, since it&apos;s the starting point for
            working out hydrostatic pressure on tanks, dams, and pipe systems. If you ever need to double-check
            a density figure like this one against a mass and volume you&apos;ve measured yourself, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles that part directly.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Case: Sizing a Water Tank Wall
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say you&apos;re checking the pressure at the bottom of a water tank that&apos;s 3 meters deep.
            Hydrostatic pressure at depth h is P = γ × h, using specific weight rather than density directly,
            since pressure is fundamentally a force-based quantity, not a mass-based one.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">P = 9,810 × 3 = 29,430 Pa</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s about 29.4 kPa of pressure pushing on the tank wall at the very bottom, roughly four
            times atmospheric pressure just from the water sitting above it. This is exactly the kind of
            calculation an engineer runs before specifying wall thickness or reinforcement for a tank,
            reservoir, or dam, and it only works cleanly because specific weight already has gravity baked into
            it. Try the same calculation with plain density instead of specific weight and you&apos;ll get a
            number in the wrong units entirely, off by a factor of 9.81, which is a mistake that&apos;s
            surprisingly easy to make if you&apos;re not paying close attention to which formula you actually
            need.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Specific Weight Actually Matters
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density tells you how tightly packed a material&apos;s particles are. Specific weight tells you how
            much force gravity applies to that material per unit of volume, and that second number is what
            actually matters when you&apos;re calculating the pressure a fluid puts on a tank wall, or the load
            a layer of soil places on a building&apos;s foundation. Structural and civil engineers work in
            specific weight constantly for exactly this reason, since force, not mass, is what a wall or a
            foundation has to physically resist.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            On the Moon, an object&apos;s density wouldn&apos;t shift by even a fraction of a percent, since
            density has nothing to do with gravity at all. But its specific weight would drop to roughly a sixth
            of the Earth value, since lunar gravity comes in around 1.62 m/s² instead of 9.81 m/s². That&apos;s
            exactly why engineers working on lunar landers, off-world habitats, or any hardware meant to operate
            outside Earth&apos;s gravity track specific weight and mass density as two genuinely separate
            numbers, rather than treating them as interchangeable the way you can mostly get away with here on
            Earth.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Way to Keep Them Straight
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If a number is described in newtons, pounds-force, or dynes divided by a volume, that&apos;s
            specific weight, and gravity is baked into it. If a number is described in kilograms, grams, or
            pounds-mass divided by a volume, that&apos;s density, and gravity has nothing to do with it. Reading
            the unit itself is usually a faster way to tell the two apart than trying to remember which formula
            came from where, especially under time pressure on an exam or out in the field where you don&apos;t
            have a textbook handy to double check.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Pages Worth a Look
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If you want the mass-based version of all this instead of the weight-based one, our{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of water
            </Link>{" "}
            page covers the full range of temperatures and how density shifts with each one, and the{" "}
            <Link
              href="/info/physics/density/density-unit-conversion-guide"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density unit conversion guide
            </Link>{" "}
            covers converting between different density units specifically, kept separate from specific weight
            so the two don&apos;t get tangled together.
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