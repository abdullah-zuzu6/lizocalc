import { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import SpeedCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";

// Plain-language FAQ copy — no LaTeX, no $ signs, nothing that needs
// backslash-escaping. Kept as short, direct answers to real questions
// people type into search, not textbook definitions.
const faqData = [
  {
    question: "How do I calculate speed from distance and time?",
    answer:
      "Divide the distance by the time it took to cover it. If you drove 150 km in 3 hours, your speed is 150 divided by 3, which is 50 km/h. The calculator above does this automatically and also lets you solve the other way around, working out distance or time if speed is what you already know.",
  },
  {
    question: "What units does this speed calculator support?",
    answer:
      "Distance can be entered in kilometers, meters, miles, yards, feet, or nautical miles. Speed results come out in km/h, mph, m/s, ft/s, and knots at the same time, plus a running pace in minutes per kilometer. Use the unit converter section further down the page if you already have a speed and just need it in a different unit.",
  },
  {
    question: "Is speed the same thing as velocity?",
    answer:
      "Not quite. Speed only tells you how fast something is moving. Velocity tells you how fast and in which direction. A car doing 100 km/h has a speed of 100 km/h no matter which way it's pointed, but its velocity would be written as 100 km/h north, or whichever direction it's actually heading.",
  },
  {
    question: "How do I convert km/h to mph or m/s?",
    answer:
      "To go from km/h to mph, multiply by 0.6214. To go from km/h to m/s, divide by 3.6. So 90 km/h works out to roughly 56 mph, or 25 m/s. You don't have to remember either number though — just type the value into the Speed Converter above and it handles both conversions instantly.",
  },
  {
    question: "How do you work out average speed for a trip with stops?",
    answer:
      "Add up every kilometer you drove, then add up every hour that passed including the stops, and divide the two totals. A drive that covers 270 km over 4 hours of driving plus a 30-minute break comes to 270 divided by 4.5, or 60 km/h average — even though your speedometer read higher while you were actually moving.",
  },
  {
    question: "Why doesn't my result match what my phone or GPS shows?",
    answer:
      "GPS apps calculate instantaneous speed from your position changing many times a second, so it reacts to every acceleration, turn, and red light. This calculator gives average speed over the whole distance and time you enter, which is usually lower than your peak GPS reading and is what's used in most school and exam problems.",
  },
  {
    question: "What's considered a fast running or walking speed?",
    answer:
      "A typical walking pace is around 5 km/h, and most recreational runners sit somewhere between 8 and 12 km/h. Elite marathoners average close to 20 km/h over the full 42 km, and top sprinters briefly hit over 37 km/h during a 100-meter race. Plug your own distance and time into the calculator above to see where you land.",
  },
];

export const metadata: Metadata = {
  title: "Speed Calculator - Speed in Multiple Units",

  description:
    "Calculate speed, distance, or time instantly with support for km/h, mph, m/s, ft/s, and knots. Includes a free speed unit converter and step-by-step examples.",

  keywords: [
    "speed calculator",
    "speed distance time calculator",
    "speed unit converter",
    "calculate speed formula",
    "average speed calculator",
    "km/h to mph converter",
    "velocity calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics/speed-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Speed Calculator-Speed in Multiple Units | LizoCalc",
    description:
      "Free speed, distance, and time calculator with automatic unit conversion between km/h, mph, m/s, ft/s, and knots.",
    url: "https://www.lizocalc.com/calculators/physics/speed-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Speed Calculator | LizoCalc",
    description:
      "Calculate speed, distance, or time instantly with our free multi-unit speed calculator and converter.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.lizocalc.com/calculators/physics/speed-calculator#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.lizocalc.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Calculators",
          item: "https://www.lizocalc.com/calculators",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Physics",
          item: "https://www.lizocalc.com/calculators/physics",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Speed Calculator",
          item:
            "https://www.lizocalc.com/calculators/physics/speed-calculator",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id":
        "https://www.lizocalc.com/calculators/physics/speed-calculator",
      url:
        "https://www.lizocalc.com/calculators/physics/speed-calculator",
      name: "Speed Calculator – Calculate Speed, Distance & Time | LizoCalc",
      description:
        "Free online speed calculator using v = d ÷ t. Calculate speed, distance, or time in km/h, mph, m/s, ft/s, or knots with automatic unit conversion.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-08-25",
      breadcrumb: {
        "@id":
          "https://www.lizocalc.com/calculators/physics/speed-calculator#breadcrumb",
      },
    },
  ],
};

// Small reusable "textbook style" fraction — numerator over denominator,
// used instead of the ÷ sign wherever the source content divides.
function Fraction({ numerator, denominator }: { numerator: string; denominator: string }) {
  return (
    <span className="inline-flex flex-col items-center mx-1.5 align-middle text-green-300 leading-tight">
      <span className="px-1.5 pb-0.5 border-b-2 border-green-300">{numerator}</span>
      <span className="px-1.5 pt-0.5">{denominator}</span>
    </span>
  );
}

const tocItems = [
  { id: "what-is-speed", label: "What is Speed, Distance & Time" },
  { id: "speed-formula", label: "What is the Formula for Speed" },
  { id: "speed-in-physics", label: "How to Find Speed in Physics" },
  { id: "speed-vs-velocity", label: "Difference Between Speed & Velocity" },
  { id: "average-speed-vs-velocity", label: "Average Speed vs Average Velocity" },
  { id: "common-units", label: "Common Units of Speed" },
  { id: "speed-examples", label: "Speed Calculation Examples" },
];

export default function SpeedCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Smooth-scroll for the in-page jump links below */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-speed-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold">
              Speed Calculator
            </h1>
          </div>

          <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
            Calculate speed easily using distance and time.
          </p>

          <ShareBar />
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <SpeedCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>speed calculator</strong> finds the speed of something
          based on two things: the distance it covered and the time it took
          to cover it. The formula itself is easy, but getting the right
          result means using the right definition. Speed, velocity,
          instantaneous speed, and average speed are all different things,
          even though people mix them together in everyday conversation.
        </p>

        {/* Jump-to-section navigation block */}
        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-300 mb-4">
            Table Of Contents
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {tocItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-blue-300 underline underline-offset-2 hover:text-blue-200 text-base"
                >
                  <span aria-hidden="true">→</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* What is speed, distance, and time */}
        <section id="what-is-speed" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is Speed, Distance & Time
          </h2>

          <div className="md:float-right md:ml-8 mb-6 w-full max-w-[260px] mx-auto md:mx-0">
            <Image
              src="/images/physics/speed-calculator-img.webp"
              alt="Speed calculator diagram"
              width={400}
              height={400}
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The {" "}
             <Link
              href="/info/physics/speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              Speed 
            </Link>  {" "} 
             is how far an object travels from one place to another in
            a given amount of time. Distance is the total length of the
            path covered from the starting point to the end point, and it
            can be measured in meters, kilometers, or miles. Time is the
            duration of travel, from when the object starts moving to when
            it comes to rest, and it can be measured in seconds, minutes,
            or hours.
          </p>
          <p className="text-gray-200 leading-relaxed text-base clear-none">
            Want a deeper breakdown of the different units involved? See our
            page on{" "}
            <Link
              href="/info/physics/speed/speed-units"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed units
            </Link>
            .
          </p>
        </section>

        {/* What is the formula for speed */}
        <section id="speed-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is the Formula for Speed
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            The following formula is used to calculate speed from distance
            and time:
          </p>

          <p className="text-green-300 font-mono text-center text-lg flex items-center justify-center flex-wrap mb-6">
            <strong>Speed</strong>&nbsp;=&nbsp;
            <Fraction numerator="Distance" denominator="Time" />
          </p>

          <p className="text-gray-200 leading-relaxed text-base clear-none">
            For example, if a cyclist covers 30 kilometers in 2 hours, their
            speed is 15 km/h. If a runner completes 100 meters in 9.58
            seconds — Usain Bolt&apos;s world record from the 2009 World
            Championships in Berlin — their speed is 10.44 m/s. So speed can
            be measured under very different conditions, but the formula
            behind it never changes.
          </p>
        </section>

        {/* How to find speed in physics */}
        <section id="speed-in-physics" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Find Speed in Physics
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            In physics, speed is defined the same way, but the units
            usually default to meters per second (m/s), since that&apos;s
            the SI base unit for velocity and speed calculations.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Measure the distance from the starting place to the end place, in meters.</li>
              <li>While covering that distance, measure the time taken, in seconds.</li>
              <li>Divide the distance by the time.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: a car travels 500 meters in 25 seconds.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            Speed = 500 ÷ 25 = 20 m/s
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            To convert that to km/h, multiply by 3.6: 20 × 3.6 = 72 km/h.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            For motion that changes over a trip, it helps to tell the
            difference between instantaneous speed — what a speedometer
            shows at a given moment — and average speed, which is total
            distance divided by total time for the whole trip. A speed
            calculator that only takes a single start and end reading is
            calculating average speed. Our guide on{" "}
            <Link
              href="/info/physics/speed/instantaneous-vs-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              instantaneous versus average speed
            </Link>{" "}
            explains why your GPS reading and your average speed almost
            never match. The speed of sound in dry air at 20°C is about 343
            m/s, and the speed of light in a vacuum is 299,792,458 m/s — a
            fixed constant used to define the meter itself since 1983.
          </p>
        </section>

        {/* Difference between speed and velocity */}
        <section id="speed-vs-velocity" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Difference Between Speed & Velocity
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Speed is a scalar — it only has magnitude. Velocity is a vector
            — it has magnitude and direction. A car moving at 60 km/h has a
            speed of 60 km/h no matter which way it&apos;s pointed, but its
            velocity would be written as &quot;60 km/h north&quot; or
            &quot;60 km/h east&quot;, because direction is part of
            velocity.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This difference matters once you start calculating. Velocity is
            displacement divided by time, where displacement is the
            straight-line distance between the starting point and the
            ending point, direction included. Speed is distance divided by
            time, with no direction attached. When motion is a straight
            line in one direction, speed and the magnitude of velocity are
            the same number. When motion includes a turn, a curve, or a
            return trip, the two values start to diverge.
          </p>
        </section>

        {/* Average speed vs average velocity */}
        <section id="average-speed-vs-velocity" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Average Speed vs Average Velocity
          </h2>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Average speed uses distance. Average velocity uses displacement.
            The two give different results whenever the path isn&apos;t a
            straight line in one direction.
          </p>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Take a runner who completes one lap of a 400-meter track in 80
            seconds, ending back at the starting line. Average speed equals
            400 divided by 80, or 5 meters per second. Average velocity
            equals 0 divided by 80, or 0 meters per second, since the
            runner&apos;s displacement is zero — they started and ended at
            the same point, even though they covered 400 meters of actual
            distance.
          </p>
          <p className="text-gray-200 leading-relaxed text-base clear-none">
            This is a good way to remember why the two can&apos;t be used
            interchangeably: average velocity can be zero for motion that
            clearly happened, while average speed never is, unless the
            object never moved. Our guide on{" "}
            <Link
              href="/info/physics/speed/how-to-calculate-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              how to calculate average speed
            </Link>{" "}
            walks through more worked examples, including trips with stops.
          </p>
        </section>

        {/* Common units of speed */}
        <section id="common-units" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8 text-center">
            Common Units of Speed
          </h2>

          <div className="overflow-x-auto mt-8 mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold"></th>
                  <th className="p-4 text-left font-semibold">m/s</th>
                  <th className="p-4 text-left font-semibold">km/h</th>
                  <th className="p-4 text-left font-semibold">mph</th>
                  <th className="p-4 text-left font-semibold">kn</th>
                  <th className="p-4 text-left font-semibold">ft/s</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4 font-semibold">1 meter/second [m/s] =</td>
                  <td className="p-4">1</td>
                  <td className="p-4">3.6</td>
                  <td className="p-4">2.236928</td>
                  <td className="p-4">1.943844</td>
                  <td className="p-4">3.280840</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">1 kilometer/hour [km/h] =</td>
                  <td className="p-4">0.277778</td>
                  <td className="p-4">1</td>
                  <td className="p-4">0.621369</td>
                  <td className="p-4">0.539957</td>
                  <td className="p-4">0.911344</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">1 mile/hour [mph] =</td>
                  <td className="p-4">0.44704</td>
                  <td className="p-4">1.60935</td>
                  <td className="p-4">1</td>
                  <td className="p-4">0.868979</td>
                  <td className="p-4">1.466672</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">1 knot [kn] =</td>
                  <td className="p-4">0.514444</td>
                  <td className="p-4">1.852</td>
                  <td className="p-4">1.150775</td>
                  <td className="p-4">1</td>
                  <td className="p-4">1.687810</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">1 foot/second [ft/s] =</td>
                  <td className="p-4">0.3048</td>
                  <td className="p-4">1.09728</td>
                  <td className="p-4">0.681816</td>
                  <td className="p-4">0.592484</td>
                  <td className="p-4">1</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">
              Read a row as "1 unit equals this many of each column unit."
              For example, 1 mph equals 0.44704 m/s.
            </p>
          </div>
        </section>

        {/* Speed calculation examples */}
        <section id="speed-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Speed Calculation Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 1: Basic speed.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A train travels 240 km in 3 hours.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>Speed</strong> = 240 ÷ 3 = 80 km/h
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 2: Converting units.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A sprinter runs 200 meters in 19.19 seconds, the world
                record set by Usain Bolt in 2009.
              </p>
              <p className="text-green-300 font-mono text-center text-lg flex items-center justify-center flex-wrap">
                <strong>Speed</strong>&nbsp;=&nbsp;
                <Fraction numerator="200" denominator="19.19" />
                &nbsp;≈ 10.42 m/s
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 3: Average speed on a round trip.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A delivery driver drives 40 km to a warehouse in 1 hour,
                then drives back the same 40 km in 1.5 hours because of
                traffic.
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>Speed</strong> = 80 ÷ 2.5 = 32 km/h
              </p>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            Note that average velocity for that same round trip is 0 km/h,
            since the driver ends up back where they started — even though
            average speed for the trip works out to 32 km/h. First pick
            whether you need speed or velocity, then plug your own numbers
            into the calculator above.
          </p>
        </section>

      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}