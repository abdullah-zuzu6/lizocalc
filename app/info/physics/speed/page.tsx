import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What Is Speed? A Complete Guide to Understanding Speed",
  description:
    "Speed explained in plain terms: the definition, the formula, speed vs velocity, how speed is measured, and real recorded speeds from Usain Bolt to the speed of light.",
  keywords: [
    "what is speed",
    "speed definition",
    "types of speed",
    "speed vs velocity",
    "how is speed measured",
    "speed examples in real life",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/speed",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "What Is Speed?",
    description:
      "Speed explained simply, with the formula, real recorded speeds, and how speed is actually measured.",
    url: "https://www.lizocalc.com/info/physics/speed",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is Speed? | LizoCalc",
    description: "Speed, explained in plain language with real numbers.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/speed#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Speed", item: "https://www.lizocalc.com/info/physics/speed" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/speed",
      url: "https://www.lizocalc.com/info/physics/speed",
      name: "What Is Speed? A Complete Guide to Understanding Speed | LizoCalc",
      description: "Speed explained in plain terms, with the formula and real recorded examples.",
      inLanguage: "en",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/speed#article",
      headline: "What Is Speed? A Complete Guide to Understanding Speed",
      description: "What speed means, how it's measured, and how it shows up in the real world.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/speed",
    },
  ],
};

export default function WhatIsSpeedPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">What Is Speed?</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
           Stand at the edge of a highway. Watch two cars go by. One car goes by fast it takes just a couple of seconds. The other car takes as long to cover the same part of the road. You do not need to know a lot about physics to figure out which car is faster. This feeling, how fast something moves is what speed is about long before someone puts a number on it.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
           The way physicists define speed is a more exact version of this everyday idea: how much ground something covers in a certain amount of time. It sounds really simple. It is, but that is why speed is used everywhere from the time it takes a runner to finish a race to the speed of a storm that a weather app tells you is moving across the coast. Speed is what matters, like the speed of the cars the speed of the runner and the speed of the storm.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula Behind Speed
          </h2>
          <p className="text-center text-3xl font-mono text-green-300 my-6">v = d / t</p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Speed equals distance divided by time. Cover 100 kilometers in two hours and your speed averages
            out to 50 km/h. Run 100 meters in 9.58 seconds, and your average speed for that sprint comes out
            to a little over 10 meters per second, even though you were moving much faster than that at some
            points and much slower at others.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Units matter here more than people expect. Scientists default to meters per second because it
            fits neatly into the International System of Units, where the meter and the second are both
            defined against fixed physical constants rather than a piece of metal in a vault somewhere. Drivers
            think in km/h or mph. Sailors and pilots use knots, one nautical mile per hour. Convert between
            them and the underlying idea, distance over time, never changes; only the labels do. Anyone
            working through the conversions by hand instead of by feel can run the numbers through a{" "}
            <Link
              href="/calculators/physics/speed-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed calculator
            </Link>{" "}
            and skip the arithmetic entirely.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Speed vs Velocity: The Difference People Skip Over
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Speed and velocity get used as if they&apos;re interchangeable, and in casual conversation that&apos;s
            fine. In physics they aren&apos;t the same thing. Speed only tells you how fast something is
            going. Velocity tells you how fast and in which direction. A car circling a roundabout at a
            steady 30 km/h has constant speed but constantly changing velocity, because its direction keeps
            shifting even while the number on the dashboard doesn&apos;t move.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That distinction is the reason speed is described as a scalar quantity, just a magnitude, while
            velocity is a vector, magnitude plus direction. It sounds like a technicality until you&apos;re
            trying to figure out why two objects moving at identical speed can still be on a collision course,
            or why a plane flying into a headwind can maintain the same airspeed reading yet cover less ground
            per hour than it would with the wind behind it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Types of Speed: Average, Instantaneous, and Constant
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Not all speed is measured the same way, and the types of speed worth knowing come down to what
            moment you&apos;re looking at. Average speed covers a whole trip or a whole race: total distance
            divided by total time, with every acceleration and every slowdown folded into one number.
            Instantaneous speed is the reading at one exact moment, the number a speedometer or a radar gun
            actually shows you right now, not averaged over anything.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The two rarely match. A marathon runner might average 12 km/h over 42 kilometers while briefly
            hitting 18 km/h on a downhill stretch and dropping under 10 km/h near the end. Constant speed,
            where the instantaneous reading never changes, mostly exists in physics problems and cruise
            control settings rather than real-world motion. For a closer look at how these figures are worked
            out in practice, the difference between{" "}
            <Link
              href="/info/physics/speed/instantaneous-vs-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              instantaneous and average speed
            </Link>{" "}
            and the steps for{" "}
            <Link
              href="/info/physics/speed/how-to-calculate-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              calculating average speed
            </Link>{" "}
            both go into more detail than fits here.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How Speed Is Actually Measured
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The oldest method is the simplest one: clock a known distance with a stopwatch and divide. That&apos;s
            more or less how early scientists worked, and it&apos;s still how track and field events were
            timed for most of the 20th century, hand-held stopwatches and human reaction time included.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Modern measurement mostly relies on the Doppler effect, the same shift in wave frequency that
            makes a passing ambulance siren sound higher on approach and lower as it pulls away. Police radar
            guns bounce microwaves off a moving vehicle and read the frequency shift to back out its speed.
            The device traces back to World War II radar work by engineers John Barker Sr. and Ben Midlock at
            the Automatic Signal Company in Norwalk, Connecticut, who had built a Doppler unit out of
            soldered coffee cans to measure the sink rate of landing aircraft. After the war they adapted the
            same idea for road traffic, and in 1947 the town of Glastonbury, Connecticut became the site of
            the first radar speed trap, according to accounts of the device&apos;s history from Kustom Signals
            <sup className="text-blue-300 text-xs">[6]</sup>. Commercial units followed within a few years,
            and by the mid-1950s dozens of U.S. police departments had adopted radar enforcement.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Sports timing has moved well past stopwatches too. Elite sprint races now use laser tracking that
            samples a runner&apos;s position hundreds of times per second, which is how researchers were able
            to pin down exactly where Usain Bolt hit his top speed during his world-record run, not just how
            fast he crossed the line<sup className="text-blue-300 text-xs">[1]</sup>. GPS collars do
            something similar for wildlife research, logging position and acceleration many times a second on
            animals that would never tolerate a stopwatch and a human with a clipboard nearby
            <sup className="text-blue-300 text-xs">[2]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Measuring extreme speeds pushed science further still. The first real attempt to measure the
            speed of light came from the Danish astronomer Ole Rømer in 1676, who noticed that eclipses of
            Jupiter&apos;s moon Io arrived later than predicted when Earth was farther from Jupiter in its
            orbit, and earlier when it was closer. From that timing gap he worked out that light had to travel
            at a finite, enormous speed rather than arrive instantly, the first evidence that light itself
            takes time to get anywhere. Measurements got steadily more precise over the following three
            centuries, using rotating mirrors, toothed wheels, and eventually lasers locked to atomic clocks,
            until 1983, when the world&apos;s metrology authority, the Conférence Générale des Poids et
            Mesures, fixed the speed of light at exactly 299,792,458 meters per second and redefined the meter
            itself around that number instead of the other way around<sup className="text-blue-300 text-xs">[7]</sup>.
            More on how instruments and methods
            differ for different situations is covered on our{" "}
            <Link
              href="/info/physics/speed/speed-measurement"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed measurement
            </Link>{" "}
            page, and the various{" "}
            <Link
              href="/info/physics/speed/speed-units"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed units
            </Link>{" "}
            in use around the world get their own breakdown as well.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real Recorded Speeds, Side by Side
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Subject</th>
                  <th className="p-4 text-left font-semibold">Speed</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Average human walking pace</td>
                  <td className="p-4">~5 km/h (3.1 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">Usain Bolt, peak speed (Berlin, 2009)</td>
                  <td className="p-4">44.7 km/h (27.8 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">Fastest wild cheetah sprint on GPS record</td>
                  <td className="p-4">93 km/h (58 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">Boeing 787 cruising speed</td>
                  <td className="p-4">~903 km/h (561 mph, Mach 0.85)</td>
                </tr>
                <tr>
                  <td className="p-4">Speed of sound (dry air, 20°C, sea level)</td>
                  <td className="p-4">1,235 km/h (767 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">Thrust SSC land speed record (1997)</td>
                  <td className="p-4">1,228 km/h (763 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">International Space Station, orbital speed</td>
                  <td className="p-4">~28,000 km/h (17,500 mph)</td>
                </tr>
                <tr>
                  <td className="p-4">Speed of light in a vacuum</td>
                  <td className="p-4">1,079,252,849 km/h (299,792,458 m/s)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">
            Sources: ScienceABC biomechanics coverage of Bolt&apos;s 2009 Berlin run [1]; National Geographic
            reporting on Alan Wilson&apos;s Royal Veterinary College cheetah GPS-collar study [2]; FlySafe and
            SimpleFlying aircraft speed data [8]; NIST physical reference data for the speed of sound [7];
            Thrust SSC team and Coventry Transport Museum records [4]; NASA orbital data for the ISS [9];
            BIPM&apos;s 1983 definition of the meter for the speed of light [7].
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Breaking the Sound Barrier on the Ground: The Thrust SSC Story
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            On October 15, 1997, in Nevada&apos;s Black Rock Desert, a British jet-powered car called Thrust
            SSC recorded an average speed of 1,228 km/h (763 mph) over a measured mile, driven by Royal Air
            Force fighter pilot Andy Green. It remains the current world land speed record and the first time
            a wheeled vehicle officially exceeded the speed of sound, breaking it on both the outbound and
            return runs to satisfy the record&apos;s rules. The car, 16.5 meters long and powered by two
            afterburning Rolls-Royce Spey turbofans borrowed from the F-4 Phantom fighter jet, generated
            around 223 kilonewtons of thrust and burned roughly 18 liters of fuel every second at full power,
            according to the Thrust SSC team&apos;s own technical records<sup className="text-blue-300 text-xs">[4]</sup>.
            Green had set an earlier mark of 714 mph just weeks before, on September 25, 1997, during the same
            test campaign, before the team pushed further and cleared the sound barrier for good.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The date wasn&apos;t an accident either. The record fell exactly 50 years and one day after Chuck
            Yeager first broke the sound barrier in the air, flying the Bell X-1 rocket plane in 1947
            <sup className="text-blue-300 text-xs">[5]</sup>. Two record attempts, half a century apart, both
            built around the same underlying question: what does it actually take to move faster than sound
            travels through air.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What Limits How Fast Something Can Go
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Every fast-moving thing runs into some kind of ceiling, and the ceiling usually comes down to
            power against resistance. Sprinters are limited by how much force their muscles can generate
            against the ground and how much of that force gets eaten up by air resistance; researchers
            modeling Bolt&apos;s Berlin run found that over 90 percent of the energy he produced went toward
            fighting drag rather than pushing him forward, which is a large part of why sprint records fall
            in tiny fractions of a second rather than large jumps<sup className="text-blue-300 text-xs">[1]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Cheetahs run into a similar wall from a different angle. A widely repeated figure puts their top
            speed at 70 mph, based on a single measurement taken decades ago on a flat, track-like surface.
            When Alan Wilson and colleagues at the Royal Veterinary College fitted GPS-and-accelerometer
            collars on wild cheetahs in Botswana&apos;s Okavango Delta and tracked them across hundreds of real
            hunts, the fastest recorded run came in at 58 mph, since wild terrain, thick cover, and the risk
            of injury all cut into what the animal could theoretically manage on an open track
            <sup className="text-blue-300 text-xs">[2]</sup>. A captive cheetah named Sarah, radar-timed by
            keepers at the Cincinnati Zoo, hit 61 mph over a certified 100-meter course in 2012
            <sup className="text-blue-300 text-xs">[3]</sup>, closer to the old anecdotal figure, but still
            short of it. For land
            vehicles, the wall is closer to a literal one: air resistance rises so sharply at high speed that
            each additional mile per hour costs disproportionately more thrust, which is exactly why a car
            capable of 763 mph needed the output of a fighter jet rather than an engine.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Speed Examples in Real Life
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Most of the speed figures people deal with day to day sit in a fairly narrow band. Highway traffic
            runs somewhere between 90 and 120 km/h depending on the country and the road. A typical cyclist on
            flat ground holds around 20 to 25 km/h. Commercial jets settle into cruise at roughly Mach 0.78 to
            0.85 once they reach altitude, which for aircraft like the Boeing 787 and Airbus A350 works out to
            somewhere near 900 km/h, according to cruising-speed data compiled by aviation reference sites
            FlySafe and SimpleFlying<sup className="text-blue-300 text-xs">[8]</sup>. None of that is close to
            the extremes, and that&apos;s the point:
            everyday speed lives in a small, familiar window compared to what physics allows.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Weather forecasting depends on speed too, tracking how fast a storm system or a wind front is
            advancing to predict when it will arrive somewhere. So does shipping and logistics, where
            average transit speed determines delivery windows as much as distance does. Even biology leans on
            it: reaction time studies, nerve conduction velocity, blood flow rate through an artery, all of
            these are speed measurements wearing a different name, distance covered per unit of time, just
            applied to a nerve impulse or a blood cell instead of a car or a sprinter.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            References
          </h2>
          <ol className="text-gray-300 text-sm leading-relaxed list-decimal list-inside space-y-1">
            <li>ScienceABC — biomechanics analysis of Usain Bolt&apos;s 2009 Berlin 100m world record</li>
            <li>National Geographic — Alan Wilson / Royal Veterinary College GPS-collar cheetah speed study</li>
            <li>Cincinnati Zoo &amp; Botanical Garden — radar-timed cheetah speed record announcement</li>
            <li>Thrust SSC team technical records and Coventry Transport Museum</li>
            <li>Born To Engineer &amp; autoevolution — Thrust SSC land speed record history</li>
            <li>Kustom Signals — history of the radar speed gun</li>
            <li>NIST / BIPM — definition of the meter and the fixed value of the speed of light</li>
            <li>FlySafe and SimpleFlying — commercial aircraft cruising speed data</li>
            <li>NASA — International Space Station orbital speed</li>
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