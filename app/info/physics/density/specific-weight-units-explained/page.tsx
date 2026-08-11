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
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/specific-weight-units-explained#article",
      headline: "Specific Weight Units Explained (With Table)",
      description: "How specific weight differs from density and how its common units convert.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
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
            Specific weight gets confused with density constantly, and it&apos;s an easy mix-up because the two
            numbers are related and often close in casual conversation. But they&apos;re not the same thing, and
            mixing them up in an engineering calculation gives you a wrong answer, not just an imprecise one.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density is mass per unit volume. Specific weight is weight per unit volume. The difference is
            gravity — weight depends on it, mass doesn&apos;t.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">γ = ρ × g</p>
          <p className="text-gray-200 leading-relaxed text-base">
            γ (gamma) is specific weight, ρ is density, and g is gravitational acceleration (9.81 m/s² on
            Earth). Since g is constant almost everywhere you&apos;d do this calculation, specific weight tracks
            density closely on Earth — but the values and units are still separate things, and you&apos;ll see
            engineering references quote specific weight where you might expect density, especially in fluid
            mechanics and civil engineering.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Specific Weight Units
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
            Worked Example: Water
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Water has a density of 1,000 kg/m³. Its specific weight on Earth:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">γ = 1,000 × 9.81 = 9,810 N/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Convert that to pound-force per cubic foot and you land at roughly 62.4 lbf/ft³ — a number
            you&apos;ll see constantly in plumbing and civil engineering references, since it&apos;s the basis
            for calculating hydrostatic pressure on tanks, dams, and pipe systems.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When Specific Weight Actually Matters
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density tells you how tightly packed a material is. Specific weight tells you how much force
            gravity applies to that material per unit volume — which is what actually matters when
            you&apos;re calculating the pressure a fluid exerts on the wall of a tank, or the load a soil layer
            places on a foundation.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            On the Moon, an object&apos;s density wouldn&apos;t change at all, but its specific weight would
            drop to about a sixth of the Earth value, since gravity there is roughly 1.62 m/s² instead of 9.81.
            That distinction is exactly why engineers working on lunar or space applications track specific
            weight and mass density as two separate figures instead of using them interchangeably.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Concepts
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If you want the mass-based version of this rather than the weight-based one, our{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of water
            </Link>{" "}
            page covers the full range of temperatures, and{" "}
            <Link
              href="/info/physics/density/density-unit-conversion-guide"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              our unit conversion guide
            </Link>{" "}
            covers density unit conversions specifically, separate from specific weight.
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