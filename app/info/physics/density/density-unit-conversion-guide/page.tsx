import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Density Unit Conversion Guide (kg/m³, g/cm³, lb/ft³ & More)",
  description:
    "Convert between density units with a full reference table and worked examples for kg/m³, g/cm³, lb/ft³, and lb/gal.",
  keywords: ["density unit conversion", "kg/m3 to lb/ft3", "g/cm3 to kg/m3"],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Density Unit Conversion Guide",
    description: "A full density unit conversion table plus two worked examples.",
    url: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Density Unit Conversion Guide | LizoCalc",
    description: "Convert kg/m³, g/cm³, lb/ft³ and more with this quick reference.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Density", item: "https://www.lizocalc.com/info/physics/density" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Density Unit Conversion Guide",
          item: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
      url: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
      name: "Density Unit Conversion Guide | LizoCalc",
      description: "Full density conversion table across metric and imperial units, with worked examples.",
      inLanguage: "en",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide#article",
      headline: "Density Unit Conversion Guide",
      description: "A practical reference for converting between common density units, with worked examples.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/density/density-unit-conversion-guide",
    },
  ],
};

export default function DensityUnitConversionGuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Density Unit Conversion Guide</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density gets reported in more units than just about any other measurement out there: kg/m³ in most
            science contexts, g/cm³ in a chemistry lab, lb/ft³ in US construction, lb/gal in shipping and fuel.
            Mixing these up happens all the time. It's one of the most common calculation mistakes students and
            engineers make, and the wrong answer can still look believable even when it's way off. Nobody
            plans to mix up units, it usually happens quietly between two spreadsheets, or two people who each
            assumed the other had already handled the conversion.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This page is meant to be a working reference: the conversion factors you actually need, without
            digging through a physics textbook to find them, plus a few worked examples so you can see the
            math in action instead of just staring at a table. If you've ever had a supplier hand you a spec
            sheet in one unit and a form that demands another, this is the page you bookmark.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Conversion Factors Table
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">From</th>
                  <th className="p-4 text-left font-semibold">To</th>
                  <th className="p-4 text-left font-semibold">Multiply By</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">1,000</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">0.001</td>
                </tr>
                <tr>
                  <td className="p-4">g/cm³</td>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">62.428</td>
                </tr>
                <tr>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">16.0185</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">lb/ft³</td>
                  <td className="p-4">0.062428</td>
                </tr>
                <tr>
                  <td className="p-4">lb/gal (US)</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">119.826</td>
                </tr>
                <tr>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">lb/gal (US)</td>
                  <td className="p-4">0.008345</td>
                </tr>
                <tr>
                  <td className="p-4">lb/in³</td>
                  <td className="p-4">kg/m³</td>
                  <td className="p-4">27,679.9</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: Converting Water Into lb/ft³
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Water at 20°C has a density of 998.2 kg/m³, which we cover in more detail on our{" "}
            <Link
              href="/info/physics/density/density-of-water"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              water density by temperature
            </Link>{" "}
            page. To convert that to lb/ft³:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">998.2 × 0.062428 ≈ 62.32 lb/ft³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            That's where the "water weighs about 62.4 lb/ft³" number you've probably heard comes from. It's
            based on the 4°C max-density value, not room temperature, which is why you'll sometimes see a
            slightly different figure depending on which reference temperature a source used.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: Converting Steel Density
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Carbon steel comes in at 7.85 g/cm³. Convert that to kg/m³:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">7.85 × 1,000 = 7,850 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Take that same number to lb/ft³: 7,850 × 0.062428 ≈ 490.1 lb/ft³, which matches the figure
            engineers use in US structural work. Steel sits alongside the other building materials on our{" "}
            <Link
              href="/info/physics/density/density-of-common-materials"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              common materials density chart
            </Link>
            .
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Example: A Fuel Tank in Two Unit Systems
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say a fuel supplier lists diesel at 850 kg/m³ and you need that number in lb/gal for a US shipping
            form. First convert to lb/ft³:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">850 × 0.062428 ≈ 53.06 lb/ft³</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Then convert kg/m³ straight to lb/gal using its own factor instead of chaining through feet:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">850 × 0.008345 ≈ 7.09 lb/gal</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Two different paths, same starting number, and they should land close together. Running a
            conversion two different ways and checking that both answers roughly agree is a decent habit any
            time the number matters for a form, invoice, or spec sheet someone else will rely on.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This kind of cross-check matters more in fuel and shipping than almost anywhere else, since tanks
            and tankers are often billed by volume but taxed or insured by weight. A density figure that's off
            by even a few percent, from a bad conversion rather than an actual change in the fuel, can throw
            off a fuel load calculation or a customs declaration in a way that's genuinely expensive to sort
            out after the fact.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Specific Gravity: The Unit That Isn't a Unit
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You'll also run into "specific gravity" on spec sheets, especially for liquids and chemicals, and
            it trips people up because it doesn't look like the other entries in the table above. Specific
            gravity is just a material's density divided by the density of water at 4°C, so it has no unit at
            all. A specific gravity of 1.0 means the material is exactly as dense as water. Above 1.0 sinks,
            below 1.0 floats.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That makes it handy to convert into an actual unit once you need one. Carbon steel has a specific
            gravity of about 7.85, and since water is 1,000 kg/m³, you get steel's density by multiplying:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">7.85 × 1,000 kg/m³ = 7,850 kg/m³</p>
          <p className="text-gray-200 leading-relaxed text-base">
            Same answer as the worked steel example above, just approached from a different starting number.
            If you ever see a spec sheet listing "SG" or "relative density" instead of kg/m³ or g/cm³, this is
            the conversion to reach for: multiply by 1,000 to get kg/m³, or by 62.428 to jump straight to
            lb/ft³.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A $327 Million Reminder That Units Matter
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Density isn't the only measurement that gets lost between unit systems, and the most expensive
            example on record is actually about force, not density, but the lesson still applies. In September
            1999, NASA's Mars Climate Orbiter burned up in the Martian atmosphere after nine months of travel.
            The investigation found that Lockheed Martin's navigation software worked in pound-seconds for
            thruster impulse, while the ground software at NASA's Jet Propulsion Laboratory expected
            newton-seconds. Nobody caught it. The spacecraft ended up around 105 miles closer to Mars than
            planned and broke apart on approach, a $327.6 million loss traced back to one unchecked unit
            conversion.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Density conversions carry the same risk, just at a smaller scale. Drop a spec sheet in lb/ft³ into
            a calculation expecting kg/m³ without converting, and you'll still get a number out. It just won't
            be the right one, and unlike NASA, most of us running that calculation don't have a review board
            checking our units before it matters.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The NASA case is dramatic because of the price tag, but the actual mechanism is boring and
            everyday: two teams, two unit systems, and no one cross-checking before the number got used. That's
            the same failure mode behind a mis-ordered shipment of concrete mix or a lab result that doesn't
            replicate. The fix isn't more advanced math. It's just double-checking which unit a number is in
            before you plug it into anything.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Sanity Check
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The most common mistake isn't picking the wrong factor. It's applying it backwards. Multiplying
            when you should divide, or the other way around, turns a normal-looking answer into one that's off
            by three orders of magnitude, and because the result still looks like a reasonable number, it's
            easy to miss.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            One check that catches most of these: g/cm³ values for solids are usually small, somewhere between
            1 and 20, while kg/m³ values for the same materials land in the thousands. If your converted
            number doesn't roughly fit that, double-check which direction you went before trusting it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Or Just Skip the Manual Math
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            If you'd rather not run these conversions by hand, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            takes a mass and volume and spits out the result in multiple units at once, which is usually
            quicker and less error-prone than working through the table above by hand.
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