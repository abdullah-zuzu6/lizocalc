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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/mass-volume-density-relationship#article",
      headline: "Mass, Volume & Density: How They Relate",
      description: "How to move between mass, volume, and density using the density triangle and worked examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Mass, volume, and density are locked together by one equation, so if you know any two of them, the
            third one is always sitting right there waiting to be worked out. Most people learn density first,
            mass divided by volume, and then get stuck the second a question asks for mass or volume instead,
            purely because they never practiced flipping the formula the other way.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Once you&apos;ve seen all three versions laid out next to each other, it stops feeling like three
            separate things to memorize and turns into one relationship you can approach from whichever
            direction a problem happens to hand you.
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
            A lot of students remember these three with a simple triangle: mass sits at the top, density and
            volume sit side by side on the bottom row. Cover up whichever value you&apos;re solving for and the
            triangle tells you what to do with the two that are left. Cover m, and density and volume are
            sitting next to each other, so multiply them. Cover density or volume, and mass is sitting on top of
            the other one, so divide.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s a shortcut, not a substitute for actually understanding why the relationship works the way
            it does, but it&apos;s genuinely useful when you&apos;re moving fast through a problem set and
            don&apos;t want to re-derive the rearrangement from scratch every single time.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: Finding Volume From Mass and Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A block of aluminum weighs 540 g. Aluminum&apos;s density is 2.70 g/cm³. What&apos;s its volume?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">V = m ÷ ρ</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">V = 540 ÷ 2.70 = 200 cm³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That checks out at a glance too — a 200 cm³ block is roughly the size of a large bar of soap, which
            lines up with what a 540 gram chunk of aluminum would actually look like sitting on a table.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: Finding Mass From Volume and Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You&apos;ve got 350 mL of olive oil, and olive oil runs about 0.92 g/mL. What&apos;s the mass?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">m = ρ × V</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">m = 0.92 × 350 = 322 g</p>
          <p className="text-gray-200 leading-relaxed text-base">
            This is exactly how recipes that list ingredients by weight instead of volume get built. A baker
            weighing oil on a kitchen scale instead of using a measuring cup is basically running this formula
            backwards, starting from a density they already know.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Worked Case: Shipping and Packaging
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            This relationship comes up constantly in shipping, usually in a slightly hidden way. A courier
            quoting a delivery price often uses &quot;dimensional weight,&quot; which estimates mass from volume
            using an assumed average density for the kind of goods being shipped, because weighing every single
            package individually on a scale at every checkpoint isn&apos;t practical. If you&apos;re packing a
            box with something denser than the assumed average, like books, the actual mass ends up higher than
            the volume-based estimate suggests, and you can get charged based on whichever number is bigger,
            actual weight or the volume-based estimate. Knowing your material&apos;s real density ahead of time
            is the only way to catch that before it becomes a surprise on the invoice. Running the numbers
            yourself with our{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            before you ship something dense is a quick way to avoid that surprise.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When You&apos;d Actually Need Each Version
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Solving for density is the most common case by far, mostly because it&apos;s how you identify a
            material or check whether something is what it claims to be. Solving for mass comes up when you
            know what a material is and how much space it takes up but don&apos;t have a scale on hand, which is
            basically how rough shipping weight estimates get done before anything&apos;s actually loaded onto a
            truck. Solving for volume shows up in packaging and mixing work, when you know how much of something
            you have by weight and need to figure out how much container space it&apos;s going to take up.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Sanity Check Worth Building as a Habit
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Whichever direction you&apos;re solving in, it helps to have a rough number in your head for common
            substances before you even start: water sits at 1 g/cm³, aluminum around 2.7, steel somewhere near
            7.8, gold at 19.32. If your calculated answer lands wildly outside the range you&apos;d expect for
            whatever material you&apos;re working with, that&apos;s usually a sign a unit got mixed up
            somewhere, grams instead of kilograms, or cm³ instead of m³, rather than a sign the material itself
            is unusual.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Honestly, most mistakes in this kind of problem have nothing to do with the algebra and everything
            to do with units sneaking past unnoticed. If mass is in grams and volume is in cubic meters instead
            of cubic centimeters, the answer comes out wrong by a factor of a million and it won&apos;t
            necessarily look obviously wrong unless you already have a sense of what the right ballpark should
            be. Before you plug numbers in, it&apos;s worth taking five seconds to write down the units next to
            each value and check that they&apos;re actually going to cancel out to whatever unit you want
            density in, whether that&apos;s g/cm³, kg/m³, or lb/ft³.
          </p>
        </section>

        <section className="mt-20">
          <p className="text-gray-200 leading-relaxed text-base">
            Whichever of the three values you&apos;re chasing, our density calculator handles all three
            rearrangements automatically. Put in any two numbers you&apos;ve already measured and it solves for
            the third without you needing to remember which way the triangle points.
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