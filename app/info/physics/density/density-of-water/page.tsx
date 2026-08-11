import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Density of Water at Different Temperatures",
  description:
    "Exact density of water from freezing to boiling, why it peaks at 4°C, and what that means in practice.",
  keywords: ["density of water", "density of water at 20 degrees celsius", "water density chart"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/density-of-water",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Density of Water at Different Temperatures",
    description: "A full temperature chart for water density, plus why 4°C is the densest point.",
    url: "https://www.lizocalc.com/info/physics/density/density-of-water",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Density of Water Chart | LizoCalc",
    description: "Water density values from 0°C to 100°C, explained.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-water#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Density of Water",
          item: "https://www.lizocalc.com/info/physics/density/density-of-water",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-water",
      url: "https://www.lizocalc.com/info/physics/density/density-of-water",
      name: "Density of Water at Different Temperatures | LizoCalc",
      description: "Water density values across the full liquid temperature range, with the 4°C anomaly explained.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-water#article",
      headline: "Density of Water at Different Temperatures",
      description: "Water density values from 0°C to 100°C and why it peaks at 4°C instead of at freezing.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/density-of-water",
    },
  ],
};

export default function DensityOfWaterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Density of Water at Different Temperatures</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Most people learn that water has a density of 1 g/cm³ and leave it there. That number is close
            enough for everyday use, but it&apos;s only exactly true at one specific temperature — 4°C — and it
            shifts, sometimes by a meaningful amount, everywhere else on the scale.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This matters more than it sounds like it should. Lab work, aquarium calculations, and anything
            involving precise fluid measurements can be thrown off if you assume water is always exactly 1
            g/cm³ regardless of temperature.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Water Density by Temperature
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Temperature</th>
                  <th className="p-4 text-left font-semibold">Density (g/cm³)</th>
                  <th className="p-4 text-left font-semibold">Density (kg/m³)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">0°C (ice point)</td>
                  <td className="p-4">0.9998</td>
                  <td className="p-4">999.8</td>
                </tr>
                <tr>
                  <td className="p-4">4°C (max density)</td>
                  <td className="p-4">1.0000</td>
                  <td className="p-4">1,000.0</td>
                </tr>
                <tr>
                  <td className="p-4">20°C (room temp)</td>
                  <td className="p-4">0.9982</td>
                  <td className="p-4">998.2</td>
                </tr>
                <tr>
                  <td className="p-4">40°C</td>
                  <td className="p-4">0.9922</td>
                  <td className="p-4">992.2</td>
                </tr>
                <tr>
                  <td className="p-4">60°C</td>
                  <td className="p-4">0.9832</td>
                  <td className="p-4">983.2</td>
                </tr>
                <tr>
                  <td className="p-4">80°C</td>
                  <td className="p-4">0.9718</td>
                  <td className="p-4">971.8</td>
                </tr>
                <tr>
                  <td className="p-4">100°C (boiling)</td>
                  <td className="p-4">0.9584</td>
                  <td className="p-4">958.4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Between 4°C and 100°C, water loses about 4.2% of its density just from heating. That&apos;s not a
            rounding error — it&apos;s enough to throw off a sensitive measurement if you&apos;re not accounting
            for it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why 4°C Is the Peak, Not 0°C
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Almost every substance gets denser as it cools, right down to its freezing point. Water breaks that
            pattern. It keeps getting denser as it cools from boiling point down to 4°C, like normal — but then,
            oddly, it starts expanding again as it approaches 0°C.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The reason comes down to hydrogen bonding. As water approaches freezing, its molecules start
            arranging into the open, hexagonal lattice structure that becomes ice, and that structure takes up
            more space than the more randomly packed liquid does. It&apos;s the same reason ice floats instead
            of sinking — solid water is actually less dense than liquid water, which is unusual for a solid vs.
            its own liquid phase.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why This Matters Beyond the Classroom
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This is the entire reason lakes freeze from the top down instead of the bottom up. As surface water
            cools past 4°C, it becomes slightly less dense and stays on top instead of sinking, letting ice form
            at the surface while liquid water — still near 4°C, its densest point — sits underneath. Fish and
            other aquatic life survive winter because of this quirk in water&apos;s density curve.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It also matters for anyone doing precise lab work. If a protocol calls for measuring a liquid by
            volume and converting to mass using water&apos;s density as a reference, using 1.000 g/cm³ at room
            temperature (around 20°C, where the real value is closer to 0.998) introduces a small but avoidable
            error.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Related Reading
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            For how water compares to metals, wood, and other everyday substances, see our{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density of common materials
            </Link>{" "}
            page. If you need to convert these figures into pounds per gallon or another unit, our{" "}
            <Link
              href="/info/physics/density/density-unit-conversion-guide"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              unit conversion guide
            </Link>{" "}
            covers that directly, and our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            can handle the math for any mass and volume you enter.
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