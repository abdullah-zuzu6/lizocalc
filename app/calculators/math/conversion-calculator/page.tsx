import { Metadata } from "next";
import ConversionCalculator from "./clientside";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Script from "next/script";

export const faqData = [
  {
    question:
      "How do I convert meters to feet using the conversion calculator?",
    answer:
      "Enter your value in meters, select 'Meters (m)' as the From unit and 'Feet (ft)' as the To unit under the Length category, then click Convert Now. Our free conversion calculator instantly shows the result with up to 6 decimal places for maximum precision.",
  },
  {
    question: "What is the formula for converting Celsius to Fahrenheit?",
    answer:
      "The exact formula is (°C × 9/5) + 32. Our temperature converter applies this automatically so you never need to remember it. For example, 100°C becomes 212°F.",
  },
  {
    question: "Does the conversion calculator save my previous calculations?",
    answer:
      "Yes! Using browser cookies, it remembers your last category, value, and units so you can pick up right where you left off without retyping everything.",
  },
  {
    question: "Can I convert kg to lbs and grams to ounces in one tool?",
    answer:
      "Absolutely. Switch to the Weight category and choose any combination – kilograms to pounds, grams to ounces, or even metric tons to pounds. All conversions are accurate and instant.",
  },
  {
    question: "How accurate is the online unit converter for temperature?",
    answer:
      "Our tool uses the official non-linear formulas for Celsius, Fahrenheit, and Kelvin, giving results rounded to 6 decimal places. It’s more precise than most phone apps.",
  },
  {
    question:
      "Why should I use this free conversion calculator instead of Google?",
    answer:
      "It’s ad-free, works offline once loaded, saves your history, and gives you three categories (length, weight, temperature) with clear metric-to-imperial support in one clean interface.",
  },
];

export const metadata: Metadata = {
  title: "Conversion Calculator - Free Unit Converter Online",
  description:
    "Free online conversion calculator for quick & accurate unit conversions. Convert length (m ↔ ft), weight (kg ↔ lb), temperature (°C ↔ °F) and more instantly.",
  keywords: [
    "conversion calculator",
    "unit converter",
    "online unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "metric to imperial converter",
    "free conversion tool",
    "measurement converter",
    "kg to lbs converter",
  ],
  alternates: {
    canonical: "https://lizocalc.com/calculators/math/conversion-calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Conversion Calculator – Free Unit Converter | LizoCalc",
    description:
      "Instantly convert length, weight, temperature & more with our free, accurate online conversion calculator. Metric and imperial supported.",
    url: "https://lizocalc.com/calculators/math/conversion-calculator",
    siteName: "LizoCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conversion Calculator – Free Unit Converter | LizoCalc",
    description:
      "Convert measurements fast: length, weight, °C to °F & more – try our free conversion calculator now!",
  },
};

export default function ConversionCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Structured Data – unchanged */}
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                "@id":
                  "https://lizocalc.com/calculators/math/conversion-calculator#breadcrumb",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: "https://lizocalc.com",
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Calculators",
                    item: "https://lizocalc.com/calculators",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: "Math",
                    item: "https://lizocalc.com/calculators/math",
                  },
                  {
                    "@type": "ListItem",
                    position: 4,
                    name: "Conversion Calculator",
                    item: "https://lizocalc.com/calculators/math/conversion-calculator",
                  },
                ],
              },
              {
                "@type": "WebPage",
                "@id":
                  "https://lizocalc.com/calculators/math/conversion-calculator",
                url: "https://lizocalc.com/calculators/math/conversion-calculator",
                name: "Conversion Calculator",
                description:
                  "Free online unit converter for length, weight, and temperature with metric and imperial support.",
                inLanguage: "en",
              },
              {
                "@type": "SoftwareApplication",
                name: "Conversion Calculator",
                url: "https://lizocalc.com/calculators/math/conversion-calculator",
                description:
                  "Free conversion calculator for instant length, weight, and temperature conversions.",
                applicationCategory: "UtilitiesApplication",
                featureList: [
                  "Length converter (meters to feet)",
                  "Weight converter (kg to lbs)",
                  "Temperature converter (°C to °F)",
                  "Metric to imperial converter",
                  "Instant results with 6 decimal precision",
                ],
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqData.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: { "@type": "Answer", text: item.answer },
                })),
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
           
            <h1 className="text-3xl md:text-4xl font-bold">
              Free Conversion Calculator – Instant Length, Weight & Temperature
              Converter
            </h1>
          </div>
        </div>
      </section>

      {/* Calculator Component */}
      <section className="px-4 py-8">
        <ConversionCalculator />
      </section>

      {/* Expanded Content – ~1350+ words */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-8">
          Switching between metric and imperial units is something most people
          need to do regularly — whether you're planning an international trip,
          following a foreign recipe, measuring for home improvement, shipping
          packages overseas, or studying science and engineering. Our free
          online conversion calculator makes this task effortless. With support
          for length (meters ↔ feet, kilometers ↔ miles, centimeters ↔ inches),
          weight (kilograms ↔ pounds, grams ↔ ounces, metric tons ↔ pounds), and
          temperature (Celsius ↔ Fahrenheit ↔ Kelvin), you get fast, precise
          conversions right in your browser. Results appear instantly after one
          click, with accuracy up to 6 decimal places. Best of all? It's 100%
          free, ad-free, mobile-friendly, and remembers your last inputs using
          browser cookies so you don't have to re-enter everything next time.
        </p>

        <p className="text-gray-200 leading-relaxed mb-8">
          Unlike search engine quick converters that show only one result at a
          time and often include ads, our dedicated unit converter gives you
          full control. Choose exactly what you want to convert, switch
          categories in seconds, and see clean, large-result displays that are
          easy to read even on small phone screens. Whether you're a student
          learning the metric system, a chef adapting American recipes to metric
          measurements, a traveler calculating distances for a road trip in
          Europe, or an engineer working on international projects, this
          conversion calculator saves time and reduces mistakes.
        </p>

        <section>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 mt-16 border-b border-blue-600 pb-4 mb-8">
            How to Use the Conversion Calculator
          </h2>

          <div className="mt-8 space-y-10">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Enter Your Value and Select Units
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Start by typing any number — whole or decimal — into the Value
                field. Positive and negative values are both supported (useful
                for temperature differences or signed measurements). Next, use
                the two dropdown menus to pick your starting unit ("From") and
                target unit ("To"). The options change automatically depending
                on the category you're in.
              </p>
              <p className="text-gray-300 italic">
                Tip: You can paste values directly from spreadsheets, emails, or
                notes — the field accepts numeric input only for clean results.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Switch Between Length, Weight, and Temperature Modes
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                At the top of the calculator you'll see three clear buttons:
                Length, Weight, and Temperature. Click any one to instantly load
                the appropriate units. This design prevents confusion — you
                won't accidentally try to convert kilograms into feet.
              </p>
              <p className="text-gray-200">
                Length covers everyday distance measurements (travel,
                construction, sports). Weight handles mass for cooking, fitness,
                shipping and industrial use. Temperature is essential for
                weather, science, cooking and medical applications.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Get Instant Results with One Click
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                After setting everything, press the big "Convert Now" button.
                Within a fraction of a second the result appears in large, bold
                text with the target unit clearly shown. The precision goes up
                to six decimal places, which is especially helpful for
                scientific work or when small differences matter (e.g., precise
                ingredient measurements in baking).
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-semibold text-blue-300 mb-4">
                Reset the Calculator to Start Fresh
              </h3>
              <p className="text-gray-200 leading-relaxed">
                Finished one set of conversions? Hit the "Reset" button to clear
                the value and return to default settings (1 as value, first unit
                selected). This makes it very convenient when comparing multiple
                values quickly.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Choose Your Conversion Category
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            The strength of this free conversion calculator lies in its focused
            yet powerful three-category design. Each category is carefully
            selected because these are the most frequently needed conversions in
            daily life, education, travel, and professional settings.
          </p>
          <ul className="list-disc list-inside text-gray-200 space-y-3 pl-6 mb-6">
            <li>
              <strong>Length</strong> — distances and dimensions (travel
              planning, home projects, sports statistics, map reading)
            </li>
            <li>
              <strong>Weight / Mass</strong> — body weight, ingredients,
              packages, industrial materials
            </li>
            <li>
              <strong>Temperature</strong> — weather forecasts, cooking recipes,
              scientific experiments, medical readings
            </li>
          </ul>
          <p className="text-gray-200">
            Switching categories takes one click and refreshes only the
            necessary parts of the interface — keeping everything fast even on
            slower connections.
          </p>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Length Conversions – Metric to Imperial and More
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Length conversion is one of the most common needs — especially when
            dealing with international products, real estate listings, sports
            events, or road signs in different countries. Our length converter
            supports the most practical units used worldwide.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Meters to Feet and Inches Conversion
          </h3>
          <p className="text-gray-200 mb-4">
            Conversion factor: 1 meter = 3.280839895 feet. This is the exact
            international standard. Example: a room 4.2 meters long = 13.7795
            feet (or approximately 13 feet 9.35 inches).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Kilometers to Miles – Quick Distance Switch
          </h3>
          <p className="text-gray-200 mb-4">
            1 kilometer = 0.621371192 miles. Very useful for runners (5 km race
            = 3.10686 miles) or drivers comparing fuel efficiency ratings
            between European and American cars.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Centimeters to Inches for Everyday Use
          </h3>
          <p className="text-gray-200 mb-6">
            1 cm = 0.393700787 inches. Common for screen sizes (phone 15.6 cm ≈
            6.14 inches), clothing measurements, and paper sizes.
          </p>

          <div className="overflow-x-auto mt-8">
            <table className="min-w-full text-sm text-white border border-gray-600 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="p-3 text-left">From Unit</th>
                  <th className="p-3 text-left">To Unit</th>
                  <th className="p-3 text-left">Exact Factor</th>
                  <th className="p-3 text-left">Example (10 units)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="p-3">Meters</td>
                  <td className="p-3">Feet</td>
                  <td className="p-3">3.280839895</td>
                  <td className="p-3">32.8084 ft</td>
                </tr>
                <tr>
                  <td className="p-3">Kilometers</td>
                  <td className="p-3">Miles</td>
                  <td className="p-3">0.621371192</td>
                  <td className="p-3">6.2137 mi</td>
                </tr>
                <tr>
                  <td className="p-3">Centimeters</td>
                  <td className="p-3">Inches</td>
                  <td className="p-3">0.393700787</td>
                  <td className="p-3">3.937 in</td>
                </tr>
                <tr>
                  <td className="p-3">Inches</td>
                  <td className="p-3">Centimeters</td>
                  <td className="p-3">2.54</td>
                  <td className="p-3">25.4 cm</td>
                </tr>
                <tr>
                  <td className="p-3">Feet</td>
                  <td className="p-3">Meters</td>
                  <td className="p-3">0.3048</td>
                  <td className="p-3">3.048 m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Weight Section – expanded similarly with more explanation */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Weight Conversions – Kg to Lbs, Grams, Ounces & Beyond
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Weight (or mass) conversions are essential in fitness tracking,
            international shipping, grocery shopping, laboratory work, and
            industrial manufacturing. Our weight converter covers the units most
            people actually use daily.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Kilograms to Pounds (kg to lbs) Converter
          </h3>
          <p className="text-gray-200 mb-4">
            Factor: 1 kg = 2.20462262185 lbs. Example: 70 kg person = 154.3236
            lbs. Very common for body weight tracking when switching between gym
            apps or doctor records from different countries.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Grams to Ounces – Precise Small-Weight Conversion
          </h3>
          <p className="text-gray-200 mb-4">
            1 g = 0.03527396195 oz. Ideal when following American baking recipes
            that list butter or flour in ounces while your scale uses grams.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Metric Tons to Pounds for Heavy Loads
          </h3>
          <p className="text-gray-200 mb-6">
            1 t = 2204.62262185 lbs. Useful for freight forwarders, farmers, or
            anyone dealing with bulk materials like grain, sand, or recycled
            metal.
          </p>

          <div className="overflow-x-auto mt-8">
            <table className="min-w-full text-sm text-white border border-gray-600 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-900/60">
                  <th className="p-3 text-left">From</th>
                  <th className="p-3 text-left">To</th>
                  <th className="p-3 text-left">Factor</th>
                  <th className="p-3 text-left">Example (50 units)</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                <tr>
                  <td className="p-3">Kilograms</td>
                  <td className="p-3">Pounds</td>
                  <td className="p-3">2.204622622</td>
                  <td className="p-3">110.231 lb</td>
                </tr>
                <tr>
                  <td className="p-3">Grams</td>
                  <td className="p-3">Ounces</td>
                  <td className="p-3">0.035273962</td>
                  <td className="p-3">1.7637 oz</td>
                </tr>
                <tr>
                  <td className="p-3">Metric Tons</td>
                  <td className="p-3">Pounds</td>
                  <td className="p-3">2204.622622</td>
                  <td className="p-3">110231 lb</td>
                </tr>
                <tr>
                  <td className="p-3">Pounds</td>
                  <td className="p-3">Kilograms</td>
                  <td className="p-3">0.45359237</td>
                  <td className="p-3">22.6796 kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Temperature – already quite detailed, minor expansion */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Temperature Conversions – Celsius, Fahrenheit & Kelvin
          </h2>
          <p className="text-gray-200 leading-relaxed mb-6">
            Temperature scales differ significantly around the world. Most
            countries use Celsius for weather and daily life, while the United
            States primarily uses Fahrenheit. Kelvin is the scientific standard
            (absolute zero = 0 K). Our temperature converter handles all three
            seamlessly using exact mathematical formulas.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Celsius to Fahrenheit (°C to °F) Formula Explained
          </h3>
          <p className="text-gray-200 mb-4">
            <strong>(°C × 9/5) + 32</strong>. Example: Comfortable room
            temperature 22°C → (22 × 1.8) + 32 = 71.6°F.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Fahrenheit to Celsius – Weather & Cooking Conversions
          </h3>
          <p className="text-gray-200 mb-4">
            <strong>(°F - 32) × 5/9</strong>. Oven temperature 350°F → (350 -
            32) × 5/9 ≈ 176.67°C.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Kelvin to Celsius – Scientific Temperature Switch
          </h3>
          <p className="text-gray-200 mb-6">
            <strong>K - 273.15</strong>. Room temperature 293.15 K = 20°C. Very
            useful in physics, chemistry, and astronomy.
          </p>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 mt-8">
            <h4 className="text-xl font-semibold text-blue-300 mb-4">
              Expanded Temperature Reference Table
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-white border border-gray-600 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-blue-900/60">
                    <th className="p-3 text-left">Description</th>
                    <th className="p-3 text-left">Celsius</th>
                    <th className="p-3 text-left">Fahrenheit</th>
                    <th className="p-3 text-left">Kelvin</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/40 divide-y divide-gray-700">
                  <tr>
                    <td className="p-3">Absolute Zero</td>
                    <td className="p-3">-273.15</td>
                    <td className="p-3">-459.67</td>
                    <td className="p-3">0</td>
                  </tr>
                  <tr>
                    <td className="p-3">Freezing Point of Water</td>
                    <td className="p-3">0</td>
                    <td className="p-3">32</td>
                    <td className="p-3">273.15</td>
                  </tr>
                  <tr>
                    <td className="p-3">Room Temperature (average)</td>
                    <td className="p-3">20–22</td>
                    <td className="p-3">68–72</td>
                    <td className="p-3">293–295</td>
                  </tr>
                  <tr>
                    <td className="p-3">Body Temperature</td>
                    <td className="p-3">37</td>
                    <td className="p-3">98.6</td>
                    <td className="p-3">310.15</td>
                  </tr>
                  <tr>
                    <td className="p-3">Boiling Point of Water</td>
                    <td className="p-3">100</td>
                    <td className="p-3">212</td>
                    <td className="p-3">373.15</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why Use Our Free Online Conversion Tool?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Accurate Results with Up to 6 Decimal Places
              </h3>
              <p className="text-gray-200">
                Uses precise constants (not rounded approximations) so
                engineers, scientists, and professionals can trust the output.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Saves Your Last Conversion (No Re-Entering Data)
              </h3>
              <p className="text-gray-200">
                Thanks to privacy-respecting browser storage, your previous
                settings load automatically on return visits.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Clean, Mobile-Friendly Design for Fast Use
              </h3>
              <p className="text-gray-200">
                Responsive layout, large buttons, high-contrast text — works
                smoothly on phones during travel or shopping.
              </p>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Completely Free – No Ads or Sign-up Required
              </h3>
              <p className="text-gray-200">
                Unlimited use without interruptions or data collection prompts.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gray-800/40 rounded-xl border border-gray-700">
            <p className="text-gray-200 mb-4 font-medium">
              Exploring more measurement or math tools?
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/calculators/physics/density-calculator"
                className="inline-flex items-center px-4 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 rounded-lg text-emerald-300 hover:text-emerald-200 transition-colors"
              >
                → Density Calculator (mass/volume)
              </a>
              <a
                href="/calculators/math/scientific-calculator"
                className="inline-flex items-center px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 rounded-lg text-blue-300 hover:text-blue-200 transition-colors"
              >
                → Scientific Calculator
              </a>
              <a
                href="/calculators/math/percentage-calculator"
                className="inline-flex items-center px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 rounded-lg text-purple-300 hover:text-purple-200 transition-colors"
              >
                → Percentage Calculator
              </a>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Common Conversions & Quick Examples
          </h2>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            How Many Feet in a Meter? Real Example
          </h3>
          <p className="text-gray-200 mb-6">
            Standard: 1 m = 3.28084 ft. Basketball hoop height 3.05 m = 10 feet
            exactly (common international regulation height).
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Convert 100 kg to Pounds – Step-by-Step
          </h3>
          <p className="text-gray-200 mb-6">
            100 × 2.204622622 = 220.4622622 lbs. Typical weight of an adult male
            panda or a large motorcycle.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            32°F to Celsius – Everyday Temperature Check
          </h3>
          <p className="text-gray-200 mb-6">
            (32 - 32) × 5/9 = 0°C — the exact freezing point of water at
            standard pressure.
          </p>

          <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
            Quick Travel Example: 500 km to Miles
          </h3>
          <p className="text-gray-200">
            500 × 0.621371192 ≈ 310.6856 miles. Roughly the driving distance
            from Paris to Brussels and back.
          </p>

          <p className="text-gray-300 italic text-center mt-12 text-lg">
            Stop searching tabs — bookmark this free conversion calculator and
            convert anything instantly whenever you need it!
          </p>
        </section>
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}
