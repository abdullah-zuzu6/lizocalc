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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/density-of-air#article",
      headline: "Density of Air: Values, Formula & What Changes It",
      description: "How dense air actually is, with standard values and the main factors that change it.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            Stand at sea level on a mild day and the air around you weighs about 1.225 kg for every cubic
            meter. That&apos;s the number you&apos;ll see in almost every textbook, and it&apos;s the baseline
            everything else on this page gets measured against. Air isn&apos;t heavy the way water or steel is,
            but it&apos;s not weightless either. A bedroom that&apos;s 4m by 4m by 3m holds close to 59 kg of
            air. That&apos;s roughly what a grown adult weighs, just spread out invisibly through the whole
            room instead of sitting in a chair.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That 1.225 number doesn&apos;t hold still though. Climb a mountain, fly in a plane, or just wait for
            a hot afternoon, and the air around you gets noticeably thinner. That difference is the whole
            reason planes need runway length calculations, why pilots watch density altitude before takeoff,
            and why a baseball hit in Denver goes further than the same swing in Miami.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Standard Air Density by Altitude
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Altitude</th>
                  <th className="p-4 text-left font-semibold">Temperature (ISA)</th>
                  <th className="p-4 text-left font-semibold">Air Density</th>
                  <th className="p-4 text-left font-semibold">% of Sea Level</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Sea level (0 ft)</td>
                  <td className="p-4">15°C</td>
                  <td className="p-4">1.225 kg/m³</td>
                  <td className="p-4">100%</td>
                </tr>
                <tr>
                  <td className="p-4">5,000 ft</td>
                  <td className="p-4">5.1°C</td>
                  <td className="p-4">1.056 kg/m³</td>
                  <td className="p-4">86%</td>
                </tr>
                <tr>
                  <td className="p-4">10,000 ft</td>
                  <td className="p-4">-4.8°C</td>
                  <td className="p-4">0.905 kg/m³</td>
                  <td className="p-4">74%</td>
                </tr>
                <tr>
                  <td className="p-4">20,000 ft</td>
                  <td className="p-4">-24.6°C</td>
                  <td className="p-4">0.653 kg/m³</td>
                  <td className="p-4">53%</td>
                </tr>
                <tr>
                  <td className="p-4">36,000 ft (cruise)</td>
                  <td className="p-4">-56.5°C</td>
                  <td className="p-4">0.364 kg/m³</td>
                  <td className="p-4">30%</td>
                </tr>
                <tr>
                  <td className="p-4">~128,000 ft (edge of space)</td>
                  <td className="p-4">below -60°C</td>
                  <td className="p-4">&lt; 0.01 kg/m³</td>
                  <td className="p-4">under 1%</td>
                </tr>
              </tbody>
            </table>
            <p className="text-gray-400 text-xs mt-2">Sea level through 36,000 ft from the International Standard Atmosphere (ISA) model.</p>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            The drop isn&apos;t gentle. By 20,000 feet, air has already lost about half of what it weighed at
            sea level. That&apos;s why cabins need to stay pressurized past certain altitudes and why climbers
            on Everest carry oxygen tanks. The air up there is the same mix of gases you&apos;re breathing right
            now, there&apos;s just a lot less of it packed into each lungful.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Three Things That Actually Move This Number
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Temperature, pressure, and humidity do basically all the work here, and only one of them behaves
            the way most people expect.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Heat air up and it spreads out, so the same mass fills more space and density drops. That&apos;s
            straightforward. Raise the pressure, which is what happens as you go down toward sea level since
            there&apos;s more atmosphere stacked above you, and the molecules get pushed closer together, so
            density goes up. Also straightforward.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Humidity is the one that trips people up, because it works backwards from what most people guess.
            A water vapor molecule (H₂O) is lighter than the nitrogen (N₂) and oxygen (O₂) molecules it
            displaces in the air. So when humid air pushes some of that heavier nitrogen and oxygen out of the
            way, the air actually gets a little lighter, not heavier. Humid air is slightly less dense than dry
            air at the same temperature and pressure. It just doesn&apos;t feel that way because humidity makes
            heat feel worse on your skin, which people mix up with the air itself feeling &quot;heavier.&quot;
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Put those three together and you get days where the air behaves like it&apos;s sitting at a much
            higher elevation than the ground actually measures. Hot, humid, and low pressure all push density
            down at once, which is exactly what pilots are checking for before a summer takeoff at a
            high-altitude airport.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula, and How to Use It Yourself
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Air density comes straight out of the ideal gas law, just rearranged to solve for density instead
            of volume:
          </p>
          <p className="text-center text-3xl font-mono text-green-300 my-6">ρ = P / (R × T)</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Here P is pressure in pascals, T is temperature in kelvin, and R is the specific gas constant for
            dry air, 287.05 J/(kg·K). Plug in sea-level pressure (101,325 Pa) and 288.15 K (15°C) and you land
            right back on 1.225 kg/m³.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            You don&apos;t need to do that arithmetic by hand every time. If you&apos;ve got your own pressure
            and temperature numbers to run, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            takes those two inputs and gives you the result directly, no manual substitution needed.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            For the full derivation with more worked numbers, our{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            page goes through it step by step, and the{" "}
            <Link
              href="/info/physics/density/ideal-gas-law-pv-nrt"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              ideal gas law
            </Link>{" "}
            page builds the whole thing up from scratch if you want the reasoning behind it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Jump That Only Worked Because the Air Was Almost Gone
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            On October 14, 2012, Felix Baumgartner stepped out of a capsule 38,969 meters above New Mexico, a
            little over 24 miles up, as part of the Red Bull Stratos project. He fell for over four minutes
            before opening his parachute, and about 34 seconds into the fall he broke the sound barrier,
            eventually hitting a peak speed of roughly 1,357 km/h, which worked out to around Mach 1.25.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            A skydiver jumping from a normal altitude, under 5 km, tops out around 200 km/h because air
            resistance builds up fast and caps their speed at terminal velocity. Baumgartner went more than six
            times faster than that, and the only reason it was possible is exactly what&apos;s in the table
            above: at his jump altitude, air density was less than 1 percent of what it is at sea level. With
            almost nothing there to push against, gravity kept accelerating him well past the speed limit that
            normal air would have imposed. He later described not being able to feel the air at all for the
            first 35 seconds of the fall, simply because there wasn&apos;t enough of it there to feel.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s a strange kind of proof: an entire physics concept demonstrated live, on video, by one
            person falling through the exact numbers on a reference table.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where This Shows Up Outside Aviation
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Runners and cyclists training at high-altitude camps feel this directly. Thinner air means less
            oxygen in every breath, which is the entire point of altitude training in the first place.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Baseball at Coors Field in Denver, sitting around 5,200 feet, is famous for the same reason. Thinner
            air means less drag on the ball, so fly balls carry noticeably farther than they would at sea
            level. It&apos;s a big part of why the ballpark has a reputation for high-scoring games.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            HVAC engineers deal with the same variable from the other direction. A fan rated to move a certain
            volume of air per minute moves a different mass of air depending on local density, so ductwork
            sized for sea level doesn&apos;t automatically perform the same way once you're up at elevation.
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