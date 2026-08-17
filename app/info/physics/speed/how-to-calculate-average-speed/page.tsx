import { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Average Speed: Formula, Examples, and Common Mistakes",
  description:
    "The average speed formula explained with real worked examples: a marathon world record, a long-haul flight, and the classic word-problem mistake that trips people up.",
  keywords: [
    "average speed formula",
    "how to calculate average speed",
    "average speed calculator",
    "average speed vs total distance",
    "average speed word problems",
    "distance divided by time",
  ],
  alternates: {
    canonical: "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "How to Calculate Average Speed: Formula, Examples, and Common Mistakes",
    description:
      "The average speed formula explained with real worked examples, from marathon pacing to a 9,500-mile flight.",
    url: "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
    siteName: "LizoCalc",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Average Speed | LizoCalc",
    description: "The formula, three real worked examples, and the mistake almost everyone makes on word problems.",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Info", item: "https://www.lizocalc.com/info" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/info/physics" },
        { "@type": "ListItem", position: 4, name: "Speed", item: "https://www.lizocalc.com/info/physics/speed" },
        {
          "@type": "ListItem",
          position: 5,
          name: "Average Speed Calculation",
          item: "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
      url: "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
      name: "How to Calculate Average Speed: Formula, Examples, and Common Mistakes | LizoCalc",
      description:
        "How to calculate average speed using total distance divided by total time, with a marathon record and a long-haul flight worked out step by step.",
      inLanguage: "en",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      isPartOf: { "@type": "WebSite", name: "LizoCalc", url: "https://www.lizocalc.com" },
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
    },
    {
      "@type": "Article",
      "@id": "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed#article",
      headline: "How to Calculate Average Speed: Formula, Examples, and Common Mistakes",
      description: "The average speed formula, real worked examples, and the classic mistake in word problems.",
      image: "https://www.lizocalc.com/logo.webp",
      datePublished: "2026-08-17",
      dateModified: "2026-08-17",
      author: { "@type": "Person", name: "Rana Muhammad Abdullah", url: "https://www.linkedin.com/in/abdullahsajjad06/" },
      publisher: {
        "@type": "Organization",
        name: "LizoCalc",
        logo: { "@type": "ImageObject", url: "https://www.lizocalc.com/logo.webp" },
      },
      mainEntityOfPage: "https://www.lizocalc.com/info/physics/speed/how-to-calculate-average-speed",
    },
  ],
};

export default function AverageSpeedCalculationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">How to Calculate Average Speed</h1>
        </div>
      </section>

      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <section>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Ask someone how to calculate average speed and most will say some version of "distance divided by
            time." That's correct, and it's also where a lot of word problems quietly go wrong, because the
            distance and time in that formula have to be the totals for the whole trip, not a shortcut someone
            takes halfway through the problem. A runner who covers the first 5K in 20 minutes and the next 5K in
            25 minutes didn't average 22.5 minutes per 5K, even though that's the number most people reach for
            first.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Below is the formula itself, the mistake that shows up constantly on math tests and in real trip
            planning, and three worked examples using real, sourced figures: a marathon world record, an
            ordinary road trip, and the longest nonstop flight in commercial aviation.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Average Speed Formula
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Average speed is defined as total distance traveled divided by total time taken, a definition that
            shows up almost word for word across physics references, from Cuemath's algebra guides to
            GeeksforGeeks' kinematics notes<sup className="text-blue-300 text-xs">[1][2]</sup>:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4 font-mono bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            Average Speed = Total Distance ÷ Total Time
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That's it. There's no averaging of individual speed readings, no need to know exactly how fast
            something was moving at any single moment. All that matters is where the trip started, where it
            ended, and how much time passed in between. This is why average speed is described as a scalar
            quantity, it only cares about ground covered, not direction, which separates it from average
            velocity, a related but distinct concept that factors in displacement<sup className="text-blue-300 text-xs">[3]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            A speedometer, by contrast, shows instantaneous speed, whatever the vehicle is doing at that exact
            second. Average speed smooths all of that variation, the stoplights, the accelerating, the coasting,
            into a single number that describes the whole journey<sup className="text-blue-300 text-xs">[4]</sup>.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            The Mistake Almost Everyone Makes
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            The single most common error in average speed word problems is swapping "total distance over total
            time" for "the average of the speeds." Those two numbers are usually not the same, and standardized
            test writers know it, which is why some version of this question shows up constantly on the SAT,
            GRE, and in intro physics courses.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Here's the classic setup: a driver goes to a destination at 60 mph and comes straight back over the
            same route at 40 mph. What's the average speed for the round trip? The instinctive answer is 50 mph,
            splitting the difference. That's wrong, and it's wrong because the driver spends more time at the
            slower speed, so the slower speed pulls more weight in the total.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Work it with real numbers. Say the one-way distance is 120 miles. At 60 mph, that leg takes 2 hours.
            At 40 mph, the return leg takes 3 hours. Total distance is 240 miles, total time is 5 hours, so:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4 font-mono bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            240 miles ÷ 5 hours = 48 mph
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Not 50. Educational resources covering this exact formula flag the same warning, that you should
            never simply average individual speeds unless each leg took the same amount of time, and add up the
            distances and times separately whenever they don't<sup className="text-blue-300 text-xs">[5]</sup>.
            When every leg does take equal time, a straight average of the speeds happens to give the right
            answer, but that's a special case, not the rule, and word problems love exploiting the difference.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example 1: A Sub-Two-Hour Marathon
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            On April 26, 2026, Kenya's Sabastian Sawe won the London Marathon in 1:59:30, becoming the first
            person to run an official, record-eligible marathon in under two hours, taking 65 seconds off the
            previous world record held by the late Kelvin Kiptum<sup className="text-blue-300 text-xs">[6]</sup>.
            The marathon distance is fixed at 42.195 kilometers, about 26.2188 miles.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Converting the time first: 1:59:30 is 119.5 minutes, or 1.9917 hours. Plugging into the formula:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4 font-mono bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            42.195 km ÷ 1.9917 h ≈ 21.18 km/h
            <br />
            26.2188 mi ÷ 1.9917 h ≈ 13.16 mph
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            That lines up almost exactly with what World Athletics and Olympics.com reported after the race,
            an average speed of 21.2 km/h and a mile pace of about 4 minutes 33 seconds, held for 26 miles in a
            row<sup className="text-blue-300 text-xs">[7]</sup>. For contrast, RunRepeat's 2024 dataset put the
            worldwide median marathon finish time at roughly 4 hours 34 minutes<sup className="text-blue-300 text-xs">[8]</sup>.
            Run that same 26.2188-mile distance in 4.5667 hours and the average speed drops to about 5.74 mph,
            less than half of Sawe's pace. Same formula, same distance, wildly different result, because time is
            doing all the work.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example 2: A Real Road Trip Isn't Your Cruising Speed
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Interstate speed studies give a useful baseline for how fast people actually drive. A long-running
            Indiana Department of Transportation survey of rural interstates found an average operating speed of
            65.6 mph across all vehicle types, with cars alone averaging 66.6 mph<sup className="text-blue-300 text-xs">[9]</sup>.
            That's the speed a car is doing while it's moving. It is not the same as the average speed for an
            entire trip, because road trips include gas stops, traffic, and slower stretches near cities.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Take a 270-mile drive from Los Angeles to Las Vegas along I-15. Cruising the whole way at a steady 65
            mph would take about 4 hours 9 minutes. In practice, a stop for gas, food, and the slow crawl through
            the Cajon Pass and Barstow traffic often stretches the same trip to around 4 hours 30 minutes door to
            door. Using the formula:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4 font-mono bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            270 miles ÷ 4.5 hours = 60 mph
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The car may have spent most of that drive at 70-plus mph, but the trip's average speed comes out to
            60 mph once the stopped time is folded in. This is exactly why GPS-based trip data and highway
            engineering studies distinguish "operating speed," what the vehicle does while moving, from a trip's
            true average speed, which always includes the dead time<sup className="text-blue-300 text-xs">[9]</sup>.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Worked Example 3: The World's Longest Nonstop Flight
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Singapore Airlines flight SQ23/SQ24 between Singapore Changi and New York's JFK is the longest
            scheduled nonstop passenger route in the world, covering roughly 9,527 miles and scheduled at about
            18 hours 50 minutes outbound<sup className="text-blue-300 text-xs">[10]</sup>.
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            18 hours 50 minutes converts to 18.833 hours. Dividing:
          </p>
          <p className="text-gray-200 leading-relaxed text-base mb-4 font-mono bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            9,527 miles ÷ 18.833 hours ≈ 506 mph
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            That's the flight's average ground speed for the entire crossing, and it sits noticeably below the
            roughly 560 to 575 mph cruising speed of a typical Airbus A350. The gap comes from headwinds along
            parts of the great-circle route over the Arctic and Pacific, plus the climb and descent phases, which
            is a good reminder that average speed answers "how fast did the whole trip go," while a top cruising
            figure only describes one segment of it.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Comparing Average Speeds Across Real Trips
          </h2>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-900/70">
                  <th className="p-4 text-left font-semibold">Trip</th>
                  <th className="p-4 text-left font-semibold">Distance</th>
                  <th className="p-4 text-left font-semibold">Time</th>
                  <th className="p-4 text-left font-semibold">Average Speed</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                <tr>
                  <td className="p-4">Sawe, marathon world record (2026)</td>
                  <td className="p-4">26.22 mi</td>
                  <td className="p-4">1:59:30</td>
                  <td className="p-4">≈13.16 mph</td>
                </tr>
                <tr>
                  <td className="p-4">Median recreational marathoner (2024)</td>
                  <td className="p-4">26.22 mi</td>
                  <td className="p-4">≈4:34:00</td>
                  <td className="p-4">≈5.74 mph</td>
                </tr>
                <tr>
                  <td className="p-4">LA–Las Vegas road trip, with stops</td>
                  <td className="p-4">270 mi</td>
                  <td className="p-4">4:30:00</td>
                  <td className="p-4">60 mph</td>
                </tr>
                <tr>
                  <td className="p-4">Indiana rural interstate, cars (survey avg.)</td>
                  <td className="p-4">n/a</td>
                  <td className="p-4">n/a</td>
                  <td className="p-4">66.6 mph</td>
                </tr>
                <tr>
                  <td className="p-4">Singapore Airlines SQ23, Singapore–JFK</td>
                  <td className="p-4">9,527 mi</td>
                  <td className="p-4">18:50:00</td>
                  <td className="p-4">≈506 mph</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-400 text-sm">
            Sources: World Athletics and Olympics.com on the Sawe world record [6][7]; RunRepeat 2024 marathon
            finishing-time data via Runify [8]; Indiana rural interstate speed survey, Purdue University [9];
            SimpleFlying and The Points Guy on SQ23/SQ24 [10].
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why the Formula Trips People Up on Word Problems
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Almost every standardized-test average speed word problem is built around one trick: giving two
            speeds for equal distances, not equal times. Whenever a problem says "half the distance at one
            speed, the other half at another speed," you cannot average the two speeds directly, you have to
            find the time spent on each half and add everything up separately, exactly as study guides on the
            topic point out<sup className="text-blue-300 text-xs">[5]</sup>. Whenever a problem instead splits
            the trip by equal time, say, two hours at one speed and two hours at another, a plain average of the
            speeds does work, because both legs contribute equally to the total.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            The safest habit, whether it's a test question or a real trip, is to skip shortcuts and go back to
            the definition every time: add up every distance, add up every time, then divide. It's slower to
            write out, and it's the only version of the formula that can't be tricked.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Doing the Math Without the Arithmetic
          </h2>
          <p className="text-gray-200 leading-relaxed text-base mb-4">
            Every example above is the same two-step process: convert the time into one consistent unit, then
            divide total distance by total time. For a quick multi-leg trip, or for checking a word problem
            answer, our{" "}
            <Link
              href="/calculators/physics/speed-calculator"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed calculator
            </Link>{" "}
            handles the conversion and division instantly. For the broader physics of what speed represents and
            how it relates to velocity, see our{" "}
            <Link href="/info/physics/speed" className="text-blue-300 underline underline-offset-2 hover:text-blue-200">
              guide to understanding speed
            </Link>
            , our breakdown of{" "}
            <Link
              href="/info/physics/speed/speed-units"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              speed units
            </Link>{" "}
            like mph, knots, and km/h, and our page on{" "}
            <Link
              href="/info/physics/speed/speed-measurement"
              className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
            >
              how speed is actually measured
            </Link>{" "}
            by radar, GPS, and photo-finish cameras.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            References
          </h2>
          <ol className="text-gray-300 text-sm leading-relaxed list-decimal list-inside space-y-1">
            <li>Cuemath — Average Speed Formula, definition and worked examples</li>
            <li>GeeksforGeeks — Average Speed: Formula, Definition, Examples</li>
            <li>BYJU'S — Formula of Average Speed, average speed vs. average velocity</li>
            <li>Study.com — Average Speed: Definition, Formula & Calculation lesson</li>
            <li>Vedantu — Average Speed Formula Explained Simply, common-mistake guidance</li>
            <li>World Athletics — Sawe breaks two-hour barrier with 1:59:30 world record at London Marathon</li>
            <li>Olympics.com — Sabastian Sawe 2026 London Marathon breakdown: stats and splits</li>
            <li>Runify Blog — Marathon Finishing Time Statistics 2026, citing RunRepeat's State of US Marathons 2025</li>
            <li>Purdue University e-Pubs (JTRP) — Indiana rural interstate speed survey, 1983–1989</li>
            <li>SimpleFlying / The Points Guy — Singapore Airlines SQ23/SQ24 distance and scheduled flight time</li>
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