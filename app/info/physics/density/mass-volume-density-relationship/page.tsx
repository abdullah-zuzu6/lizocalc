import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mass, Volume & Density: How They Relate",
  description:
    "How mass, volume, and density connect through ρ = m/V, with the triangle trick and worked examples for each rearrangement.",
  keywords: [
    "mass volume density relationship",
    "how to find volume if you have density and mass",
    "density triangle",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Mass, Volume & Density: How They Relate",
    description: "The relationship between mass, volume, and density, with the triangle method and worked examples.",
    url: "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mass, Volume & Density Relationship | LizoCalc",
    description: "How to rearrange ρ = m/V to solve for any of the three variables.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Mass, Volume & Density Relationship",
          item: "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
      url: "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
      name: "Mass, Volume & Density: How They Relate | LizoCalc",
      description: "How mass, volume, and density connect, with rearranged formulas and worked examples.",
      inLanguage: "en",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship#article",
      headline: "Mass, Volume & Density: How They Relate",
      description: "How to move between mass, volume, and density using the density triangle and worked examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-12",
      dateModified: "2026-08-12",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship",
    },
  ],
};

export default function MassVolumeDensityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Mass, Volume &amp; Density: How They Relate</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Mass, volume, and density are locked together by one equation, which means if you know any two of
            them, you can always find the third. Most people learn density first — mass divided by volume — but
            get stuck the moment a problem asks for mass or volume instead, because they haven&apos;t practiced
            rearranging the formula.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you see all three versions side by side, it stops being three separate things to memorize and
            becomes one relationship you can approach from any direction.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Three Formulas
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">To Find</th>
                  <th className="p-4 text-left font-semibold">Formula</th>
                  <th className="p-4 text-left font-semibold">You Need</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Density (ρ)</td>
                  <td className="p-4 font-mono text-green-300">ρ = m ÷ V</td>
                  <td className="p-4">Mass and volume</td>
                </tr>
                <tr>
                  <td className="p-4">Mass (m)</td>
                  <td className="p-4 font-mono text-green-300">m = ρ × V</td>
                  <td className="p-4">Density and volume</td>
                </tr>
                <tr>
                  <td className="p-4">Volume (V)</td>
                  <td className="p-4 font-mono text-green-300">V = m ÷ ρ</td>
                  <td className="p-4">Mass and density</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Triangle Trick
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A lot of students remember these three formulas using a simple triangle: put mass (m) at the top,
            density (ρ) and volume (V) at the bottom, side by side. Cover whichever value you&apos;re solving
            for, and the triangle shows you the operation. Cover m, and ρ and V are left side by side — multiply
            them. Cover ρ or V, and m sits over the other one — divide.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s a shortcut, not a substitute for understanding why the formula works, but it&apos;s useful
            when you&apos;re working through a problem quickly and don&apos;t want to re-derive the rearrangement
            every time.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example: Finding Volume From Mass and Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A block of aluminum has a mass of 540 g. Aluminum&apos;s density is 2.70 g/cm³. What&apos;s its
            volume?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">V = m ÷ ρ</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">V = 540 ÷ 2.70 = 200 cm³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That checks out — a 200 cm³ block of aluminum is roughly the size of a large bar of soap, which
            matches what a 540 g piece of aluminum would look like in real life.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example: Finding Mass From Volume and Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You have 350 mL of olive oil, which has a density of about 0.92 g/mL. What&apos;s the mass?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">m = ρ × V</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">m = 0.92 × 350 = 322 g</p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly how kitchen recipes that list ingredients by weight instead of volume are converted
            — a baker weighing out oil on a scale is really just running this formula in reverse from what a
            measuring cup would tell them.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When You Actually Need Each Version
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Solving for density is the most common case, used any time you want to identify a material or check
            purity. Solving for mass comes up when you know a material and its volume but don&apos;t have a
            scale handy — shipping estimates work this way constantly. Solving for volume is common in
            packaging and mixing, when you know how much of something you have by weight and need to figure out
            how much container space it&apos;ll take up.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Whichever direction you&apos;re solving, our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles all three rearrangements automatically — enter any two values and it solves for the third.
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