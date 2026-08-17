import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Speed Units Explained: From mph to Mach and Everything Between",
  description:
    "A plain-language guide to speed units: mph to kph, knots to mph, meters per second to mph, and what Mach speed actually means, with a sourced conversion table.",
  keywords: [
    "mph to kph",
    "knots to mph",
    "speed unit converter",
    "what is mach speed",
    "meters per second to mph",
    "speed units list",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/speed/speed-units",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Speed Units Explained",
    description: "From mph to Mach: how speed units work, where they came from, and how to convert between them.",
    url: "https://www.lizocalc.com/info/physics/speed/speed-units",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speed Units Explained | LizoCalc",
    description: "mph, kph, knots, m/s, and Mach, explained with real numbers.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/speed/speed-units#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Speed", item: "https://www.lizocalc.com/info/physics/speed" },
        { "@type": "ListItem", position: 5, name: "Speed Units", item: "https://www.lizocalc.com/info/physics/speed/speed-units" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/speed/speed-units",
      url: "https://www.lizocalc.com/info/physics/speed/speed-units",
      name: "Speed Units Explained: From mph to Mach and Everything Between | LizoCalc",
      description: "How mph, km/h, knots, m/s, and Mach work, where they came from, and how to convert between them.",
      inLanguage: "en",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/speed/speed-units#article",
      headline: "Speed Units Explained: From mph to Mach and Everything Between",
      description: "A guide to the units used to measure speed, their history, and how to convert between them.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/speed/speed-units",
    },
  ],
};

export default function SpeedUnitsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">Speed Units Explained</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Rent a car in London after growing up driving in Ohio and the first thing that throws you off
            isn&apos;t the roundabouts. It&apos;s the speedometer. The needle sits in a spot that looks
            alarmingly high until you remember the numbers on British signs are miles per hour too, same as
            home, just written on a different colored sign. Cross into France a few hours later and every
            number on the dashboard suddenly means something different, because now you&apos;re reading
            kilometers per hour, and 110 isn&apos;t nearly as fast as it sounds.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That mismatch, the same physical speed described by wildly different-looking numbers depending on
            which unit is in play, trips up more than tourists. It's part of why so many people search "mph to
            kph" or "meters per second to mph" instead of doing the math by hand. Every speed unit in use
            today grew out of a specific trade, a specific country, or a specific branch of science, and
            knowing where each one came from makes the conversions much easier to hold onto.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Metric Baseline: m/s and km/h
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Meters per second is the scientific default, the unit built directly into the International
            System of Units. It became the official SI unit for speed when the General Conference on Weights
            and Measures established the SI system in 1960<sup className="text-blue-300 text-xs">[2]</sup>,
            and it has stayed the reference point ever since, because both the meter and the second are
            defined against fixed physical constants rather than a physical object kept in a vault. One meter
            per second converts to exactly 3.6 kilometers per hour<sup className="text-blue-300 text-xs">[1]</sup>,
            a clean number that falls straight out of the definitions: a kilometer is 1,000 meters, an hour is
            3,600 seconds, and 1,000 divided by 3,600 times 3,600 just simplifies to 3.6.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Kilometers per hour is the unit most of the world actually drives by. Interestingly, it wasn&apos;t
            the immediate choice even in metric countries. Early French usage in the 1800s favored the
            myriametre, 10,000 meters, over the kilometer, and "myriametres per hour" shows up in French
            technical writing from 1802 before kilometers per hour eventually won out as the practical
            standard for road and rail speeds. Today it&apos;s the unit on speed limit signs across most of
            Europe, Asia, Africa, Australia, and Latin America, everywhere except a small handful of countries
            that stuck with miles.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Miles Per Hour: The Imperial Holdout
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Miles per hour survives almost entirely because of history rather than logic. It's a British
            imperial and U.S. customary unit, and the mile itself traces back through the Roman mille passus,
            a thousand double paces, long before anyone was measuring vehicle speed with it. Britain
            formalized the imperial system in 1824, and the American colonies had already inherited British
            measurement habits well before that, so when cars arrived a century later, mph was simply the
            unit already sitting on the shelf.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The exact conversion is fixed rather than approximate: one mile per hour equals exactly 1.609344
            kilometers per hour and exactly 0.44704 meters per second, both defined precisely once the
            international yard and pound were tied to metric units in the mid-20th century
            <sup className="text-blue-300 text-xs">[1]</sup>. Today, mph
            remains the standard for road speed limits mainly in the United States, the United Kingdom,
            Liberia, and Myanmar, along with a scattering of smaller territories with close historical ties to
            Britain or the U.S. Britain converted most of its official measurements to metric decades ago but
            kept miles on road signs, partly because re-signing an entire national road network is an
            enormous, expensive undertaking that no government has found politically worth doing. The same
            logic largely explains why the U.S. never finished its own metrication push in the 1970s: millions
            of miles of roads, mile-marker systems, and speedometers were already built around mph, and
            switching them all over never cleared the cost-benefit bar.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Knots: Speed Measured the Way Sailors Invented It
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Knots are the odd one out, and the name is literal. From the late 16th century, sailors measured
            a ship&apos;s speed with a device called a chip log: a wedge-shaped board tied to a rope with
            evenly spaced knots along its length. Crews would toss the board off the stern and let the rope
            play out freely while timing it with a sandglass, usually run for around 28 seconds, then count
            how many knots slipped through their hands in that interval, according to the U.S. National Oceanic
            and Atmospheric Administration<sup className="text-blue-300 text-xs">[3]</sup>. That count,
            directly, gave the ship&apos;s speed, and the name stuck long after the rope and sandglass were
            replaced by GPS<sup className="text-blue-300 text-xs">[4]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            One knot equals exactly one nautical mile per hour, and the nautical mile itself isn&apos;t
            arbitrary. It's defined as one minute of arc along a great circle of the Earth, roughly one minute
            of latitude, which is why it lines up so neatly with nautical charts and why aviation adopted it
            alongside shipping<sup className="text-blue-300 text-xs">[5]</sup>. Today one knot works out to
            roughly 1.15 statute mph and exactly 1.852 kilometers per hour, and it remains the standard speed
            unit in marine navigation and in aviation worldwide, on ships, private boats, and every commercial
            aircraft's airspeed indicator, regardless of which country built the plane.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Is Mach Speed, Really?
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Mach isn&apos;t a fixed speed at all, which surprises a lot of people the first time they look
            into it. It's a ratio: an object's speed divided by the local speed of sound. Mach 1 means moving
            exactly as fast as sound travels through the surrounding air at that altitude and temperature,
            Mach 2 means twice that, and so on. Because the speed of sound itself drops as air gets colder at
            altitude, from roughly 1,225 km/h at sea level down to around 1,060 km/h at 40,000 feet
            <sup className="text-blue-300 text-xs">[6]</sup>, the same aircraft can sit at a different Mach
            number without changing its actual ground speed at all.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The unit honors Ernst Mach, an Austrian physicist who in 1887 photographed the shock wave forming
            around a bullet moving faster than sound, laying the groundwork for how scientists understood
            supersonic flow<sup className="text-blue-300 text-xs">[6]</sup>. Mach himself never coined the
            term that carries his name. That came later, in 1929, when the Swiss aeronautical engineer Jakob
            Ackeret named the ratio "Mach number" during a lecture in Zurich, thirteen years after Mach had
            died, and the term didn&apos;t appear in English publications until 1932
            <sup className="text-blue-300 text-xs">[5]</sup>. Because it's a ratio rather than a fixed speed,
            Mach numbers stay the same no matter whether the underlying speed is expressed in knots, mph, or
            meters per second.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Speed Units at a Glance
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Unit</th>
                  <th className="p-4 text-left font-semibold">Equal to 1 unit in other units</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">1 meter per second (m/s)</td>
                  <td className="p-4">3.6 km/h · 2.23694 mph · 1.94384 knots</td>
                </tr>
                <tr>
                  <td className="p-4">1 kilometer per hour (km/h)</td>
                  <td className="p-4">0.277778 m/s · 0.621371 mph · 0.539957 knots</td>
                </tr>
                <tr>
                  <td className="p-4">1 mile per hour (mph)</td>
                  <td className="p-4">1.609344 km/h · 0.44704 m/s · 0.868976 knots</td>
                </tr>
                <tr>
                  <td className="p-4">1 knot (kn)</td>
                  <td className="p-4">1.852 km/h · 0.514444 m/s · 1.15078 mph</td>
                </tr>
                <tr>
                  <td className="p-4">Mach 1 (sea level, 15°C)</td>
                  <td className="p-4">~1,225 km/h · ~761 mph · ~661 knots</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">
            Sources: NIST Guide for the Use of the International System of Units, Appendix B [1]; Wikipedia
            unit pages for meter per second, kilometer per hour, mile per hour, and knot [2]; Encyclopedia.com
            and Pilot Institute for the Mach 1 range across altitude [6].
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            When Units Get Mixed Up: The Gimli Glider
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Unit confusion isn&apos;t just an inconvenience for travelers. On July 23, 1983, Air Canada Flight
            143, a Boeing 767 flying from Montreal to Edmonton, ran completely out of fuel at 41,000 feet and
            had to glide, engines dead, to an emergency landing at a former air base in Gimli, Manitoba. The
            aircraft became known afterward as the Gimli Glider. The root cause wasn&apos;t mechanical. The
            767 was the first aircraft in Air Canada&apos;s fleet built to track fuel in kilograms, part of
            Canada&apos;s broader, unfinished shift to the metric system at the time. With the automatic fuel
            gauge broken, ground crew calculated the load by hand using a dripstick measurement and a density
            conversion factor, but they used 1.77, the figure for pounds per liter, instead of roughly 0.8,
            the correct figure for kilograms per liter, according to Canada&apos;s national broadcaster CBC
            <sup className="text-blue-300 text-xs">[7]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The math looked reasonable on paper. In reality, the plane took off with about 10,100 kilograms of
            fuel on board instead of the 22,300 kilograms it needed, roughly half of what the flight required,
            and nobody caught the error because the same mistaken conversion was repeated at the next stop in
            Ottawa<sup className="text-blue-300 text-xs">[8]</sup>. Captain Robert Pearson, who happened to be
            an experienced glider pilot in his spare time, managed to bring the aircraft down safely with no
            fatalities. Investigators later pointed to the
            mixed-unit transition itself as much as any single person's math, since the fleet was flying a
            hybrid of pounds-based and kilograms-based aircraft during the changeover, and every additional
            unit conversion in a manual process is another chance for the wrong factor to slip in.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Choosing the Right Unit for the Job
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            In practice, the unit you reach for usually depends on the setting rather than any real technical
            requirement. Road speeds get km/h almost everywhere and mph in a handful of holdout countries.
            Wind speed reports mix m/s, km/h, and knots depending on the source, which is why marine and
            aviation forecasts often look unfamiliar to a driver checking the weather app before a commute.
            Air traffic control runs on knots worldwide, regardless of the aircraft&apos;s country of origin,
            because international aviation standardized on it decades ago for consistency across borders.
            Scientific papers default to meters per second because it plugs directly into other SI-based
            formulas without a conversion step.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            None of that stops the units from needing to talk to each other constantly. A pilot converting
            knots to mph for a passenger announcement, an engineer converting meters per second to mph for a
            wind-load calculation, a runner converting a race pace to km/h to compare against a friend's
            imperial watch: the underlying physical quantity never changes, only the label on it does. A{" "}
            <Link
              href="/calculators/physics/speed-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed calculator
            </Link>{" "}
            handles the arithmetic instantly, but knowing where each unit actually comes from is what keeps
            the numbers from feeling arbitrary. For the broader question of what speed itself means before it
            gets attached to any particular unit, our{" "}
            <Link
              href="/info/physics/speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              guide to understanding speed
            </Link>{" "}
            covers the formula and the physics side of it, and the practical side of clocking real-world
            speeds is covered separately on our{" "}
            <Link
              href="/info/physics/speed/speed-measurement"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed measurement
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            References
          </h2>
          <ol className="text-gray-300 text-sm leading-relaxed list-decimal list-inside space-y-1">
            <li>NIST — Guide for the Use of the International System of Units (SI), Appendix B and Chapter 6</li>
            <li>Wikipedia — Metre per second, Kilometres per hour, Miles per hour, Knot (unit), Mach number</li>
            <li>NOAA National Ocean Service — "What is a knot?" and nautical mile / knot definitions</li>
            <li>History.com — "Why is a ship's speed measured in knots?"</li>
            <li>Aerospaceweb.org — history of the knot, the nautical mile, and the naming of Mach number</li>
            <li>Encyclopedia.com and Pilot Institute — Mach number and speed of sound across altitude</li>
            <li>CBC Archives — "When a metric mix-up led to the 'Gimli Glider' emergency"</li>
            <li>Wikipedia — Gimli Glider incident report summary</li>
          </ol>
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
            <span>📅 Published: Aug 17, 2026</span>
            <span>🔄 Updated: Aug 17, 2026</span>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}