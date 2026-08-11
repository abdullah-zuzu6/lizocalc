import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Density of Air: Values, Formula & What Changes It",
  description:
    "How dense is air, really? See the standard values, what makes air thinner or thicker, and how temperature and altitude change it.",
  keywords: ["density of air", "air density formula", "how dense is air"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/density-of-air",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Density of Air: What It Actually Is",
    description: "Standard air density values and the factors — heat, altitude, humidity — that change them.",
    url: "https://www.lizocalc.com/info/physics/density/density-of-air",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Density of Air Explained | LizoCalc",
    description: "The real numbers behind air density and what makes it change.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-air#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Density of Air",
          item: "https://www.lizocalc.com/info/physics/density/density-of-air",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-air",
      url: "https://www.lizocalc.com/info/physics/density/density-of-air",
      name: "Density of Air: Values, Formula & What Changes It | LizoCalc",
      description: "Standard air density figures and the variables — temperature, pressure, humidity — that shift them.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-air#article",
      headline: "Density of Air: Values, Formula & What Changes It",
      description: "How dense air actually is, with standard values and the main factors that change it.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/density-of-air",
    },
  ],
};

export default function DensityOfAirPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Density of Air: Values, Formula &amp; What Changes It</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            At sea level, at 15°C, dry air has a density of about 1.225 kg/m³. That&apos;s the number most
            textbooks quote as &quot;standard,&quot; and it&apos;s the baseline everything else gets compared
            against. Air is nowhere near as heavy as water or steel, obviously, but it isn&apos;t weightless
            either — a room measuring 4m x 4m x 3m holds roughly 59 kg of air, which is close to the weight of
            an actual adult sitting in that room.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            What throws people off is that this number moves around constantly. Air density on a mountaintop in
            winter looks nothing like air density at a beach in July, and that difference matters for
            everything from aircraft performance to how far a baseball actually carries.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Standard Air Density at Different Altitudes
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Altitude</th>
                  <th className="p-4 text-left font-semibold">Temperature (ISA)</th>
                  <th className="p-4 text-left font-semibold">Air Density</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Sea level (0 ft)</td>
                  <td className="p-4">15°C</td>
                  <td className="p-4">1.225 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">5,000 ft</td>
                  <td className="p-4">5.1°C</td>
                  <td className="p-4">1.056 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">10,000 ft</td>
                  <td className="p-4">-4.8°C</td>
                  <td className="p-4">0.905 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">20,000 ft</td>
                  <td className="p-4">-24.6°C</td>
                  <td className="p-4">0.653 kg/m³</td>
                </tr>
                <tr>
                  <td className="p-4">36,000 ft (cruise)</td>
                  <td className="p-4">-56.5°C</td>
                  <td className="p-4">0.364 kg/m³</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            Notice the drop isn&apos;t small. By 20,000 feet, air is roughly half as dense as it is at sea
            level. That&apos;s why unpressurized cabins need supplemental oxygen above certain altitudes — it
            isn&apos;t that the air is a different gas up there, there&apos;s just a lot less of it packed into
            the same lungful.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Actually Changes Air Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Three things move this number around: temperature, pressure, and humidity.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Heat air up. It expands, so the same mass takes up more room and density drops. Squeeze the pressure up (like at elevation, where the weight of the atmosphere above you is pressing down harder) and molecules get packed closer together so density rises. Humidity works the way from what most people guess. Water vapor molecules are actually lighter than the nitrogen and oxygen molecules they displace so humid air is slightly less dense than dry air at the same temperature and pressure not more.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is the exact relationship the{" "}
            <Link
              href="/info/physics/density/what-is-density-altitude"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude
            </Link>{" "}
            concept is built on. A hot humid low-pressure day gives you air that behaves like its at a higher elevation, than the ground actually sits at.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula Behind the Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Air density comes straight out of the ideal gas law, rearranged to solve for density instead of
            volume:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = P / (R × T)</p>
          <p className="text-gray-200 leading-relaxed text-base">
            where P is pressure, T is temperature in kelvin, and R is the specific gas constant for dry air
            (287.05 J/(kg·K)). The full derivation, with worked numbers, is on our{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            page, and the underlying law itself is broken down on the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law
            </Link>{" "}
            page if you want the reasoning from scratch.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why This Matters Beyond Aviation
          </h2>
         <p className="text-gray-200 leading-relaxed text-base mb-4">
  Pilots aren&apos;t the only ones who care about air density. Cyclists and runners also notice the
  difference when training at high-altitude camps. They can feel that the air is thinner because
  there is less oxygen in each breath they take.
</p>

<p className="text-gray-200 leading-relaxed text-base mb-4">
  Baseball players who hit at Coors Field, which sits at an elevation of about 5,200 feet, notice
  that the baseball can travel much farther than it would at sea level. This happens because there
  is less air resistance dragging on the baseball at higher elevations.
</p>

<p className="text-gray-200 leading-relaxed text-base">
  HVAC engineers also have to consider air density when designing ductwork. They may need to size
  ductwork differently depending on how dense the air is in the area where they are working. The
  same fan can move a different amount of air depending on its density, making air density an
  important factor when designing HVAC systems.
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