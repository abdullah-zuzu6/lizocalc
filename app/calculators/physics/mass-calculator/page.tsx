import { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import MassCalculator from "./clientside";
import ShareBar from "@/components/Sharebar";
import AuthorBio from "@/components/AuthorBio";



const faqData = [
  {
    question: "What is the formula to find mass using density and volume?",
    answer:
      "Multiply density by volume: m = ρ × V. m is mass, ρ (rho) is density, and V is volume. Say you've got 2 liters of water, that's 2,000 cm³, and water's density is 1 g/cm³. Multiply those and you get 2,000 grams, or 2 kg. Simple as that.",
  },
  {
    question: "What is the difference between mass and weight?",
    answer:
      "Mass is how much matter is in something, and it doesn't change no matter where you are. Weight is gravity pulling on that mass, so it does change. The formula is W = m × g. Your mass on the Moon is identical to your mass on Earth, but you'd weigh a lot less there because the Moon's gravity, about 1.62 m/s², is much weaker than Earth's 9.8 m/s².",
  },
  {
    question: "How do you calculate the mass of a chemical solution?",
    answer:
      "In chemistry you usually work from moles and molar mass: m = n × M, where n is the number of moles and M is the molar mass in g/mol. Take 2 moles of water. Water's molar mass is 18.015 g/mol, so 2 × 18.015 gives you 36.03 grams.",
  },
  {
    question: "How can I find mass if I only know force and acceleration?",
    answer:
      "That's Newton's second law rearranged. F = m × a becomes m = F / a. So if a 50 newton force accelerates something at 5 m/s², divide 50 by 5 and the mass comes out to 10 kg.",
  },
  {
    question: "Why is mass considered an 'intrinsic property' of matter?",
    answer:
      "Because it doesn't budge when the surroundings do. Heat a gas and its volume changes. Move to another planet and your weight changes. But the actual amount of matter, the mass, stays put unless you physically add or remove some of it.",
  },
  {
    question: "How do you convert between Imperial and Metric mass units?",
    answer:
      "Multiply pounds by 0.453592 to get kilograms, or multiply kilograms by 2.20462 to get pounds back. A 150 lb person, for example, comes out to roughly 68.04 kg.",
  },
];
 

export const metadata: Metadata = {
  title: "Mass Calculator – Find Mass from Density & Volume ",

  description:
    "Free online mass calculator using m = ρ × V. Instantly calculate mass from density and volume with unit conversion (kg, g, lb, oz).",

  keywords: [
    "mass calculator",
    "calculate mass from density and volume",
    "mass formula m = rho x V",
    "physics mass calculator online",
    "density volume mass calculator",
    "mass calculator kg grams pounds",
    "mass calculator for students",
    "mass calculator engineering",
    "how to calculate mass",
    "mass weight difference calculator",
  ],

  alternates: {
    canonical: "https://www.lizocalc.com/calculators/physics/mass-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
    description:
      "Calculate mass from density and volume instantly. Supports kg, g, lb, oz and more. Free physics tool with step-by-step working for students and engineers.",
    url: "https://www.lizocalc.com/calculators/physics/mass-calculator",
    siteName: "LizoCalc",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
    description:
      "Free physics mass calculator. Enter density & volume, get mass instantly in any unit. Step-by-step working included.",
  },
};

// ─────────────────────────────────────────────
//  STRUCTURED DATA (kept out of the render path)
//  Simplified to Breadcrumb + WebPage only, matching the
//  age-calculator schema format.
// ─────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.lizocalc.com/calculators/physics/mass-calculator#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.lizocalc.com" },
        { "@type": "ListItem", position: 2, name: "Calculators", item: "https://www.lizocalc.com/calculators" },
        { "@type": "ListItem", position: 3, name: "Physics", item: "https://www.lizocalc.com/calculators/physics" },
        { "@type": "ListItem", position: 4, name: "Mass Calculator", item: "https://www.lizocalc.com/calculators/physics/mass-calculator" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.lizocalc.com/calculators/physics/mass-calculator",
      url: "https://www.lizocalc.com/calculators/physics/mass-calculator",
      name: "Mass Calculator – Find Mass from Density & Volume | LizoCalc",
      description: "Free online mass calculator using m = ρ × V. Enter density and volume in any unit and instantly get mass in kg, g, lb, or oz with step-by-step working.",
      inLanguage: "en",
      datePublished: "2026-04-01",
      dateModified: "2026-08-20",
      breadcrumb: { "@id": "https://www.lizocalc.com/calculators/physics/mass-calculator#breadcrumb" },
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
  { id: "what-is-mass", label: "What is Mass" },
  { id: "mass-formula", label: "What is the Formula for Mass" },
  { id: "mass-from-volume", label: "How to Find Mass from Volume" },
  { id: "mass-from-density", label: "How to Find Mass from Density" },
  { id: "mass-vs-weight", label: "Why is Mass Different from Weight" },
  { id: "mass-examples", label: "Mass Calculation Examples" },
];

export default function MassCalculatorPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Smooth-scroll for the in-page jump links below */}
      <style>{`html { scroll-behavior: smooth; }`}</style>

      <Navbar />

      <script
        id="structured-data-mass-calculator"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

     {/* Hero Section */}
<section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="flex items-center gap-3">
      <h1 className="text-3xl md:text-4xl font-bold">
        Mass Calculator
      </h1>
    </div>

    <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl">
      Calculate mass easily using density and volume.
    </p>

    <ShareBar />
  </div>
</section>
      {/* Calculator Tool */}
      <section className="px-4 py-8">
        <MassCalculator />
      </section>

      {/* SEO Content */}
      <article className="max-w-6xl mx-auto px-6 py-16 text-white">
        <p className="text-gray-200 leading-relaxed mb-10 text-lg">
          A <strong>mass calculator</strong> is use to calculate the mass of
          an object by using density and volume. The logic behind it is very
          simple if know the right formula for mass calculation, you can do
          it by hand in very few minutes.
        </p>


        {/* Jump-to-section navigation block */}
        <nav
          aria-label="Table of contents"
          className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 sm:p-7 mb-16"
        >
          <AuthorBio/>
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

        {/* What is mass */}
        <section id="what-is-mass" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is Mass
          </h2>
          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Mass is the amount of matter in an object. It&apos;s measured in
            kilograms (kg) in the <strong>SI system</strong>, or grams (g)
            for smaller amounts. For example a brick or block, a bag of
            sugar, a car engine. The most common thing for each that they
            have a fixed mass that does not change if you change it from one
            place to another.
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Mass is not the same as <strong>weight</strong>, this is the most
            common error when people think that both mass and weight are
            same. So before using this mass calculator keep the thing that
            you are using this for mass calculation on the basis of density
            and volume, not measuring weight.
          </p>
        </section>

        {/* What is the formula for mass */}
        <section id="mass-formula" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            What is the Formula for Mass
          </h2>

          <div className="md:float-right md:ml-8 mb-6 w-full max-w-[260px] mx-auto md:mx-0">
            <Image
              src="/images/physics/mass-formula-pic.webp"
              alt="Mass formula diagram"
              width={400}
              height={400}
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            There are 3 formulas for mass calculation:
          </p>

          <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base mb-6">
            <li>
              <strong>From density and volume</strong>: m = ρ × V
            </li>
            <li>
              <strong>From force and acceleration</strong> (Newton&apos;s
              second law): m ={" "}
              <Fraction numerator="F" denominator="a" />
            </li>
            <li>
              <strong>From moles and molar mass</strong> (chemistry): m = n ×
              M
            </li>
          </ol>

          <p className="text-gray-200 leading-relaxed text-base clear-none">
            In the first formula, <strong>ρ (rho)</strong> stands for  <Link
                href="/info/physics/density"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                density 
              </Link>, usually in kg/m³ or g/cm³, and V is volume, and this is
            the formula that we use in this calculator, you can select the
            different units for volume and density as well and also can
            select multiple units for calculated mass outputs. In the
            second, F is force in newtons and a is acceleration in m/s². In
            the third, n is the number of moles and M is molar mass in g/mol.
          </p>
        </section>

        {/* How to find mass from volume */}
        <section id="mass-from-volume" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Find Mass from Volume
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            Only volume can not give you mass. You also need density,
            because mass and volume relate through density:{" "}
            <strong>m = ρ × V</strong>.
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <h3 className="text-lg font-semibold text-blue-300 mb-4">
              Steps:
            </h3>
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>Measure or look up the volume of the object, in m³ or cm³.</li>
              <li>Find the density of the material, in kg/m³ or g/cm³.</li>
              <li>Just simple Multiply.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: a block of oak measures 0.02 m³. Oak has a density of
            about 750 kg/m³.
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            m = 750 × 0.02 = 15 kg
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Same block made of lead (density 11,340 kg/m³) would have a mass
            of 226.8 kg, even though the volume is identical. Volume actually
            tells you the size. <strong>Density</strong> tells you what
            fills that size.
          </p>
        </section>

        {/* How to find mass from density */}
        <section id="mass-from-density" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            How to Find Mass from Density
          </h2>

          <p className="text-gray-200 leading-relaxed mb-6 text-base">
            This is the same formula used in reverse when volume is unknown.
            However, most density-to-mass problems give you the density and
            volume first, so you can simply multiply them to find the mass:
          </p>

          <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 mb-6">
            <ol className="list-decimal list-inside text-gray-200 space-y-3 text-base">
              <li>First confirm the density value and its units.</li>
              <li>
                Then confirm the volume set units according to the
                density&apos;s units (convert cm³ to m³, or g/cm³ to kg/m³,
                as needed).
              </li>
              <li>After this just multiply density by volume.</li>
            </ol>
          </div>

          <p className="text-gray-200 leading-relaxed mb-2 text-base">
            Example: seawater has a density of roughly 1,025 kg/m³. A
            container holding 0.5 m³ of seawater has a mass of:
          </p>
          <p className="text-gray-200 font-mono text-lg mb-4">
            m = 1,025 × 0.5 = 512.5 kg
          </p>
          <p className="text-gray-200 leading-relaxed text-base">
            Fresh water, at a density of 1,000 kg/m³, would give 500 kg for
            the same volume. The 25 kg difference comes entirely from
            dissolved salt.
          </p>
        </section>

        {/* Why is mass different from weight */}
        <section id="mass-vs-weight" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Why is Mass Different from Weight
          </h2>

          <div className="md:float-right md:ml-8 mb-6 w-full max-w-[260px] mx-auto md:mx-0">
            <Image
              src="/images/physics/mass-vs-weight.webp"
              alt="Mass vs weight comparison"
              width={400}
              height={400}
              className="w-full h-auto rounded-xl border border-gray-700"
            />
          </div>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            Mass basically calculate the matter. Weight measures the force
            gravity exerts on that matter.{" "}
            <strong>Weight = mass × gravitational</strong> acceleration (W =
            mg).
          </p>

          <p className="text-gray-200 leading-relaxed mb-4 text-base">
            On <strong>Earth</strong>, gravitational acceleration is about{" "}
            <strong>9.81 m/s².</strong> But on the Moon, it is about{" "}
            <strong>1.62 m/s²</strong> which is one-sixth of Earth&apos;s
            gravitational acceleration. A 70 kg astronaut has a mass of 70 kg
            everywhere, but when we talk about weight then it is about 686
            newtons on Earth and only about 113 newtons on the{" "}
            <strong>Moon</strong>.
          </p>

          <p className="text-gray-200 leading-relaxed text-base clear-none">
            This is why a mass calculator that works from weight needs the
            correct gravitational acceleration for the location like moon,
            mars etc. If you calculate mass from density and volume and you
            think do measured weight then it is incorrect.
          </p>
        </section>

        {/* Mass calculation examples */}
        <section id="mass-examples" className="scroll-mt-24 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            Mass Calculation Examples
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 1: Volume and density.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A cube of aluminum is 0.1 m on each side, so its volume is
                0.001 m³. Since aluminum has a density of 2,700 kg/m³:
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>m</strong> = 2,700 × 0.001 = 2.7 kg
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 2: Weight and gravity.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A package weighs 98.1 N on Earth. Since Earth&apos;s gravity
                is about 9.81 m/s²:
              </p>
              <p className="text-green-300 font-mono text-center text-lg flex items-center justify-center flex-wrap">
                <strong>m</strong>&nbsp;=&nbsp;
                <Fraction numerator="98.1" denominator="9.81" />
                &nbsp;= 10 kg
              </p>
            </div>

            <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700">
              <h3 className="text-lg font-semibold text-blue-300 mb-3">
                <strong>Example 3: Moles and molar mass.</strong>
              </h3>
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                A chemistry sample contains 2.5 moles of sodium chloride
                (NaCl). Its molar mass is 58.44 g/mol:
              </p>
              <p className="text-green-300 font-mono text-center text-lg">
                <strong>m</strong> = 2.5 × 58.44 = 146.1 g
              </p>
            </div>
          </div>

          <p className="text-gray-200 leading-relaxed mt-8 text-base">
            The point is very simple, first select the formula that you want
            to use, and just calculate according to these one.See the relationship between  <Link
                href="/info/physics/mass-volume-density-relationship"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                mass, density, and volume.
              </Link>
          </p>
        </section>

        {/* <section className="mt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
            More Physics Tools to Explore
          </h2>

          <p className="text-gray-200 text-base mb-6">
            Complement your mass calculations with these free tools:
          </p>

          <ul className="list-disc list-inside text-gray-200 space-y-3 text-base">
            <li>
              <Link
                href="/calculators/physics/density-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Density Calculator
              </Link>{" "}
              — find density from mass and volume
            </li>
          </ul>
        </section> */}
      </article>

      <FAQ items={faqData} />

      <Footer />
    </main>
  );
}