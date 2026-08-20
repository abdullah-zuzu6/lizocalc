import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import SpeedCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";

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
      dateModified: "2026-08-20",
      breadcrumb: {
        "@id":
          "https://www.lizocalc.com/calculators/physics/speed-calculator#breadcrumb",
      },
    },
  ],
};
export default function SpeedCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

    
      <script
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
          <ShareBar/>
        </div>
      </section>

      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <SpeedCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-6 text-lg">
          Type in a distance and a time, and the calculator above works out
          how fast that is — in km/h, mph, m/s, ft/s, and knots, all at
          once. No more converting by hand or hunting for a formula sheet.
          It also solves the problem in reverse through the Speed Converter
          section, so if you already know a speed and just need it in a
          different unit, that's covered too.
        </p>

        <section className="mt-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Formula Behind the Numbers
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Speed equals distance divided by time. That's the whole
            equation. A car covering 240 km in 4 hours is moving at 240
            divided by 4, or 60 km/h. Change either number and the speed
            changes with it — cover the same distance faster and the speed
            goes up, take longer and it goes down.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The same relationship rearranges to find the other two values.
            Know speed and time? Distance equals speed times time. Know
            speed and distance? Time equals distance divided by speed. The
            calculator switches between these automatically depending on
            which two numbers you fill in.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why So Many Units?
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Different fields default to different units, and switching
            between them by hand is where most mistakes creep in. Road
            travel is usually described in km/h or mph depending on the
            country, physics and engineering problems lean on m/s, sailing
            and aviation use knots, and American track and field results
            often show up in ft/s. Rather than pick one and make you convert
            everything else yourself, this calculator gives you all five at
            once.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Distance works the same way — enter it in kilometers, meters,
            miles, yards, feet, or nautical miles, and the math underneath
            handles the conversion before it ever reaches the speed formula.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Average Speed on a Trip with Stops
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Average speed is not the average of your speeds along the way —
            it's total distance divided by total time, stops included. Say
            you drive 150 km from Sahiwal to Lahore in 2 hours, stop for 30
            minutes, then cover another 120 km to Faisalabad in 2 hours.
            Total distance is 270 km, total time is 4.5 hours, so the
            average speed for the whole trip is 60 km/h, even though your
            speedometer read closer to 75 while you were actually driving.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            This distinction trips up a lot of students and it's worth
            understanding beyond just this calculator. Our guide on{" "}
            <Link
              href="/info/physics/speed/how-to-calculate-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              how to calculate average speed
            </Link>{" "}
            walks through more worked examples, and the piece on{" "}
            <Link
              href="/info/physics/speed/instantaneous-vs-average-speed"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              instantaneous versus average speed
            </Link>{" "}
            explains why your GPS reading and your average speed almost
            never match.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Real Speeds for Comparison
          </h2>
          <div className="overflow-x-auto mt-8 mb-4">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Scenario</th>
                  <th className="p-4 text-left font-semibold">km/h</th>
                  <th className="p-4 text-left font-semibold">mph</th>
                  <th className="p-4 text-left font-semibold">m/s</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Average walking pace</td>
                  <td className="p-4">5.0</td>
                  <td className="p-4">3.1</td>
                  <td className="p-4">1.4</td>
                </tr>
                <tr>
                  <td className="p-4">Recreational jogging</td>
                  <td className="p-4">9.5</td>
                  <td className="p-4">5.9</td>
                  <td className="p-4">2.6</td>
                </tr>
                <tr>
                  <td className="p-4">Usain Bolt's 100 m world record</td>
                  <td className="p-4">37.6</td>
                  <td className="p-4">23.4</td>
                  <td className="p-4">10.4</td>
                </tr>
                <tr>
                  <td className="p-4">Highway car speed</td>
                  <td className="p-4">110</td>
                  <td className="p-4">68</td>
                  <td className="p-4">30.6</td>
                </tr>
                <tr>
                  <td className="p-4">Speed of sound at sea level</td>
                  <td className="p-4">1,235</td>
                  <td className="p-4">767</td>
                  <td className="p-4">343</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-3">
              Figures rounded for readability; sound speed varies slightly
              with air temperature.
            </p>
          </div>
          <p className="text-gray-200 leading-relaxed text-base">
            For more on how speed is actually measured in different fields,
            from radar guns to photo timing gates, see our page on{" "}
            <Link
              href="/info/physics/speed/speed-measurement"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed measurement
            </Link>
            , or browse the full breakdown of{" "}
            <Link
              href="/info/physics/speed/speed-units"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed units
            </Link>{" "}
            and where each one is used.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Speed Isn't Velocity
          </h2>
          <p className="text-gray-200 leading-relaxed text-base">
            The two get used interchangeably in everyday speech, but physics
            treats them differently. Speed only cares about magnitude — how
            fast. Velocity adds direction on top of that. A plane cruising
            at 500 mph has a speed of 500 mph regardless of where it's
            headed; its velocity would be written as 500 mph on a specific
            heading. Every calculation on this page solves for speed, which
            is what nearly all school, exam, and everyday problems actually
            ask for.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Tools Worth Bookmarking
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            If speed problems are part of a bigger physics assignment, a few
            of our other calculators tend to come up in the same breath:
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base ml-5">
            <li>
              <Link
                href="/calculators/time/time-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Time Calculator
              </Link>{" "}
              — work out journey duration on its own
            </li>
          </ul>
        </section>
           {/* ── BYLINE ── */}
        <div className="flex items-center gap-4 mt-12 mb-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            RA
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              Written by Rana Muhammad Abdullah
            </p>
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
            <span>📅 Published: Apr 4, 2026</span>
            <span>🔄 Updated: Aug 20, 2026</span>
            <span>✅ Verified accurate</span>
          </div>
        </div>
      </article>

      <FAQ items={faqData} />
      <Footer />
    </main>
  );
}