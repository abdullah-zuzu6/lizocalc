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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-water#article",
      headline: "Density of Water at Different Temperatures",
      description: "Water density values from 0°C to 100°C and why it peaks at 4°C instead of at freezing.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Most people learn that water is 1 g/cm³ and leave it there. That's close enough for everyday stuff,
            but it's only exactly true at one temperature, 4°C, and it moves around quite a bit everywhere
            else on the scale.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That shift is bigger than it sounds. Lab work, aquarium math, anything needing a precise fluid
            measurement can come out slightly wrong if you just assume water is always 1 g/cm³ no matter the
            temperature. It's also the reason lakes freeze the way they do, and why the water at the bottom
            stays cold all year, which is worth understanding on its own.
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
            Between 4°C and 100°C, water loses about 4.2 percent of its density just from being heated. That's
            not a rounding error you can ignore. It's enough to throw off a sensitive measurement, and it's the
            same reason a gallon of hot water weighs a bit less than a gallon of cold water.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why 4°C, Not 0°C
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Almost everything gets denser as it cools, all the way down to its freezing point. Water doesn't
            play by that rule. It keeps getting denser as it cools from boiling all the way down to 4°C, same
            as anything else, then starts expanding again as it gets closer to 0°C.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That's hydrogen bonding at work. As water gets close to freezing, its molecules start locking into
            the open, hexagonal shape that becomes ice, and that shape takes up more room than the loosely
            packed liquid does. It's the same reason ice floats instead of sinking. Solid water is less dense
            than liquid water, which is backwards from how most solids act around their own liquid form.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Turning the Table Into Real Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density, mass, and volume all connect through one simple equation:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = m / V</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say you fill a 2-liter (0.002 m³) bottle with water straight from a hot tap at 60°C instead of cold
            water at 20°C. Using the table above, the hot water weighs 0.002 × 983.2 = 1.9664 kg, while the
            cold water weighs 0.002 × 998.2 = 1.9964 kg. That's a 30-gram difference for the exact same bottle,
            just from temperature. It's small, but it's exactly the kind of gap that throws off a lab result if
            nobody accounts for it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you're working with a different volume or temperature than what's in the table, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            will do that multiplication for you and hand back an exact mass instead of an estimate.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Lake That Flips Over Twice a Year
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The clearest real-world example of this quirk is something limnologists call turnover, and Lake
            Superior is one of the most studied cases of it. Through summer, warm water floats on top of colder
            water below, since anything above 4°C is less dense. As fall cools the surface down, that top layer
            gets denser and eventually matches the temperature underneath, around 4°C through the whole
            column, and that's when wind can mix the lake from top to bottom in what's called fall turnover.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A 2024 study in Limnology and Oceanography, led by researcher Jordan Austin, looked at what
            actually controls the timing of this in Lake Superior. It found that because water's density barely
            changes near the 4°C mark, temperature alone doesn't stabilize the water column right away. The
            wind has to die down first before winter stratification can set in. That's part of why fall
            turnover behaves so differently from the more predictable spring version.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This twice-a-year mixing is also what keeps deep lakes alive. It pulls oxygen down to the bottom
            and drags nutrients back up top. Without water's odd density curve near freezing, most cold-climate
            lakes would freeze solid from the bottom up instead of the top down, and not much would survive
            that.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Salt Water Is a Different Number Entirely
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Everything above is for fresh water. Add salt and the density jumps, because you're packing extra
            dissolved mass into the same volume. Average ocean water, at about 3.5 percent salinity, sits
            around 1,025 kg/m³ at the surface, roughly 2.5 percent denser than fresh water at the same
            temperature. That's why floating in the ocean is noticeably easier than floating in a swimming
            pool. Your body is displacing water that weighs more per liter, so it takes less of you underwater
            to hold you up.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The Dead Sea takes this to an extreme. At roughly 34 percent salinity, close to ten times ocean
            salt levels, its water density runs around 1,240 kg/m³. That's dense enough that a person can lie
            back on the surface and read a book without kicking, which is the whole reason it's a tourist
            photo cliché in the first place.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where This Trips Up Lab Work
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Anyone doing careful measurement runs into this sooner or later. If a protocol has you converting a
            liquid's volume to mass using water's density as the reference, using 1.000 g/cm³ at room
            temperature, around 20°C, where the real number is closer to 0.998, introduces a small but
            avoidable error.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            To see how water stacks up against wood, steel, and other everyday materials, our{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              common materials density chart
            </Link>{" "}
            covers that comparison directly. And if you need these numbers in pounds per gallon or another
            unit instead of g/cm³, the{" "}
            <Link
              href="/info/physics/density/density-unit-conversion-guide"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density unit conversion guide
            </Link>{" "}
            walks through the conversion factors with a couple of worked examples.
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