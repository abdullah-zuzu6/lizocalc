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
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/density/ideal-gas-law-pv-nrt#article",
      headline: "Ideal Gas Law (PV = nRT) Explained Simply",
      description: "What each letter in PV = nRT means and how the law connects to real gas density.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-14",
      dateModified: "2026-08-14",
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
            PV = nRT looks like something out of a chemistry final, four letters and a couple of constants
            mashed together, but underneath it&apos;s describing something you already understand from ordinary
            life. Gas in a sealed container pushes back harder when you heat it. Gas takes up more room when you
            let it expand. That&apos;s genuinely all this equation is doing, it&apos;s just doing it with
            numbers instead of a shrug and a &quot;yeah, that tracks.&quot;
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            It&apos;s one line, but it&apos;s quietly running more of your day than you&apos;d guess. It&apos;s
            why a car tire loses a couple psi on a cold morning. It&apos;s why a can of compressed air gets
            frost on it after you spray it for ten seconds straight. It&apos;s why a hot air balloon climbs. And
            it&apos;s the exact equation that gas density is built out of, which we cover in more detail on the{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula page
            </Link>
            .
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Breaking Down Each Letter
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
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The one everyone trips over sooner or later is T. Temperature has to go in as kelvin, full stop, not
            Celsius and definitely not Fahrenheit. The reasoning isn&apos;t arbitrary: the equation assumes zero
            means zero molecular motion, and kelvin is the scale where zero actually means that. Celsius hits
            zero at the freezing point of water, which is a completely different, arbitrary reference point, so
            plugging in Celsius directly gives you a wrong answer that often doesn&apos;t even look obviously
            wrong at first glance.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            R itself throws people off too, mostly because there isn&apos;t just one version of it floating
            around. If you&apos;re working in pascals and cubic meters, R is 8.314 J/(mol·K). If you&apos;re
            working in liters and atmospheres, which shows up a lot in older chemistry textbooks, R becomes
            0.0821 L·atm/(mol·K). Mixing the wrong R with the wrong units is probably the single most common way
            people get this equation wrong, more than any conceptual misunderstanding.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Working Through an Example
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Say you&apos;ve got 2 moles of gas sitting at standard atmospheric pressure, 101,325 Pa, and a
            temperature of 300 K. What volume does it take up?
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">Rearrange for V:</p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">V = nRT / P</p>
          <p className="text-gray-200 leading-relaxed text-base mb-2">
            V = (2 × 8.314 × 300) / 101,325 = 4,988.4 / 101,325 ≈ 0.0492 m³
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That&apos;s about 49.2 liters, roughly the size of a large camping cooler, for 2 moles of an
            ordinary gas sitting at room temperature and normal air pressure. If you want a feel for scale, one
            mole of gas at standard temperature and pressure takes up about 22.4 liters, so 2 moles landing near
            49 liters checks out just from that alone.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Where Density Is Hiding Inside This Equation
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The ideal gas law never mentions density directly, not once, but it&apos;s sitting right there the
            moment you swap moles for mass. Since n equals m divided by molar mass M, you can substitute that
            in:
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">PV = (m / M) RT</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            And since density ρ equals m / V, rearranging the equation to isolate m/V gives you:
          </p>
          <p className="text-center text-2xl font-mono text-green-300 my-4">ρ = PM / (RT)</p>
          <p className="text-gray-200 leading-relaxed text-base">
            which is exactly the{" "}
            <Link
              href="/info/physics/density/gas-density-formula"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              gas density formula
            </Link>{" "}
            covered on its own page in more depth. It&apos;s the same equation wearing a different outfit —
            instead of answering &quot;how much room does this gas need,&quot; it answers &quot;how much does a
            cubic meter of this gas weigh.&quot; If you&apos;ve already got a mass and a volume measured and
            just want the density number without redoing any of this algebra, the{" "}
            <Link
              href="/calculators/physics/density-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              density calculator
            </Link>{" "}
            handles that conversion instantly.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Quick Real-World Case: Weather Balloons
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Weather balloons are a genuinely good example of PV = nRT playing out in real time instead of on
            paper. A balloon gets filled with helium at ground level, where pressure is high and the balloon
            stays relatively small and tight. As it climbs, atmospheric pressure drops fast — by the time
            it&apos;s up around 30 km, pressure has fallen to roughly 1% of what it was at sea level. Since n,
            the amount of helium inside, stays fixed (nothing&apos;s leaking or being added), and temperature
            changes only modestly by comparison, the volume has to expand dramatically to keep the equation
            balanced. That&apos;s why weather balloons visibly swell as they rise and eventually burst once the
            skin can&apos;t stretch any further, typically somewhere between 30 and 40 km up.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Any of This Is Worth Knowing
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Beyond weather balloons, this relationship explains why hot air is lighter than cold air (heat a gas
            at constant pressure and it expands, which drops its density, which is the entire principle behind a
            hot air balloon lifting off). It explains why aerosol cans warn against storing them somewhere hot,
            since heating the gas inside raises pressure toward the point where the can could rupture. And
            it&apos;s the backbone of density altitude calculations that pilots run before takeoff, since a hot,
            humid, high-elevation airport effectively has thinner air than the altimeter alone would suggest,
            which eats into how much runway and climb performance an aircraft actually has available.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            A Word on When the &quot;Ideal&quot; Part Breaks Down
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Real gases aren&apos;t perfectly ideal, and it&apos;s worth knowing roughly where the approximation
            starts to wobble. At very high pressures, gas molecules get squeezed close enough together that the
            volume they themselves take up stops being negligible, which the ideal gas law assumes away. At very
            low temperatures, molecules slow down enough that the attractive forces between them start
            mattering, pulling the gas toward condensing into a liquid, something the equation has no way to
            account for. For everyday ranges — room temperature, normal atmospheric pressure, the kind of
            numbers you&apos;d run into in a kitchen, a car, or a weather report — the ideal gas law is accurate
            enough that engineers and scientists use it constantly without a second thought.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of this requires memorizing anything beyond the one equation and being careful about units. Get
            pressure, volume, moles, and temperature into consistent units, keep temperature in kelvin, and
            PV = nRT will get you through gas problems in chemistry, meteorology, aviation, or basically anywhere
            gases behave the way ideal gases are assumed to behave.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Quick Unit Conversions You&apos;ll Actually Need
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            Since R changes depending on which units you&apos;re using, it helps to keep a couple of conversions
            handy instead of re-deriving them mid-problem. One atmosphere equals 101,325 Pa, or roughly 14.7
            psi, or 760 mmHg (torr), all describing the exact same pressure. One mole of any ideal gas at
            standard temperature and pressure, 0°C and 1 atm, occupies 22.4 liters, a number worth memorizing
            since it gives you a fast sanity check on volume answers without running the full equation. Get
            comfortable switching between these and PV = nRT stops being a formula you look up and turns into
            something you can just use.
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