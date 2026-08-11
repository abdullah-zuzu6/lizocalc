import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ideal Gas Law (PV = nRT) Explained Simply",
  description:
    "What PV = nRT actually means, what each letter stands for, and how the ideal gas law connects to gas density.",
  keywords: ["ideal gas law", "pv nrt", "pv = nrt explained"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "The Ideal Gas Law, Explained Without the Jargon",
    description: "PV = nRT broken into plain language, with a worked example and a link to gas density.",
    url: "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ideal Gas Law (PV = nRT) | LizoCalc",
    description: "A plain-language walkthrough of PV = nRT and how it ties into gas density.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Ideal Gas Law",
          item: "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
      url: "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
      name: "Ideal Gas Law (PV = nRT) Explained Simply | LizoCalc",
      description: "A plain-language walkthrough of the ideal gas law, each variable, and a worked example.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt#article",
      headline: "Ideal Gas Law (PV = nRT) Explained Simply",
      description: "What each letter in PV = nRT means and how the law connects to real gas density.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt",
    },
  ],
};

export default function IdealGasLawPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Ideal Gas Law (PV = nRT) Explained Simply</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            PV = nRT looks intimidating the first time you see it written on a whiteboard, but it&apos;s really
            just describing something you already understand intuitively: gas in a sealed container pushes
            harder when you heat it, and takes up more room if you let it expand. The equation just puts numbers
            to that idea.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s one equation, but it quietly runs a huge amount of everyday physics — how a car tire
            pressure changes overnight in the cold, why a can of compressed air feels freezing when you spray
            it, and why hot air balloons rise. It&apos;s also the equation that gas density itself is built
            on.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Each Letter Stands For
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Symbol</th>
                  <th className="p-4 text-left font-semibold">Meaning</th>
                  <th className="p-4 text-left font-semibold">Common Units</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-mono text-green-300">P</td>
                  <td className="p-4">Pressure</td>
                  <td className="p-4">Pa, atm, psi</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">V</td>
                  <td className="p-4">Volume</td>
                  <td className="p-4">m³, L</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">n</td>
                  <td className="p-4">Amount of gas</td>
                  <td className="p-4">moles</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">R</td>
                  <td className="p-4">Universal gas constant</td>
                  <td className="p-4">8.314 J/(mol·K)</td>
                </tr>
                <tr>
                  <td className="p-4 font-mono text-green-300">T</td>
                  <td className="p-4">Temperature</td>
                  <td className="p-4">kelvin</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            One thing that trips people up early on: temperature has to be in kelvin, not Celsius or Fahrenheit.
            Plug in Celsius by mistake and the whole calculation falls apart, since the equation assumes zero
            actually means zero — no molecular motion — which is what kelvin measures and Celsius doesn&apos;t.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Example
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say you have 2 moles of gas at a pressure of 101,325 Pa (standard atmospheric pressure) and a
            temperature of 300 K. What volume does it occupy?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">Rearranging for V:</p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">V = nRT / P</p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            V = (2 × 8.314 × 300) / 101,325 = 4,988.4 / 101,325 ≈ 0.0492 m³
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s about 49.2 liters — roughly the volume of a large cooler, for 2 moles of gas at room
            temperature and normal atmospheric pressure.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where Density Comes From
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The ideal gas law doesn&apos;t mention density directly, but it&apos;s hiding right there once you
            swap moles for mass. Since n = m / M (mass divided by molar mass), the equation can be rearranged
            into:
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">ρ = PM / (RT)</p>
          <p className="text-gray-200 leading-relaxed text-base">
            which is exactly the formula covered on our{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            page. It&apos;s the same equation, just rearranged to answer a different question — instead of
            &quot;how much space does this gas take up,&quot; it answers &quot;how much does a given volume of
            this gas weigh.&quot;
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why This Actually Matters
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            This one relationship is why hot air is less dense than cold air, why weather balloons expand as
            they climb into thinner, lower-pressure air, and why the{" "}
            <Link
              href="/info/physics/density/what-is-density-altitude"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude
            </Link>{" "}
            a pilot cares about shifts so much between a cold morning and a hot afternoon at the same airport.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            If you&apos;d rather skip the algebra and just get a number for air density at a given elevation
            and temperature, our{" "}
            <Link
              href="/calculators/physics/density-altitude-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density altitude calculator
            </Link>{" "}
            does this calculation for you.
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