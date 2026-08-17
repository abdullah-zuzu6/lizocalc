"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Atom } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "Density Calculator",
    description: "Calculate density, mass, or volume from the other two values",
    href: "/calculators/physics/density-calculator",
    category: "Physics",
  },
  {
    name: "Mass Calculator",
    description: "Calculate mass from weight and gravity, or solve related force problems",
    href: "/calculators/physics/mass-calculator",
    category: "Physics",
  },
  {
    name: "Speed Calculator",
    description: "Calculate average speed, travel time, or distance from the other two",
    href: "/calculators/physics/speed-calculator",
    category: "Physics",
  },
  
];

export default function PhysicsCalculators() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCalculators = useMemo(
    () =>
      calculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6 text-gray-200" />
            </Link>

            <Atom className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">
              Physics Calculators
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Solve density, mass, speed, and weight problems the same way a
            lab notebook or textbook expects.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Physics calculators turn the core relationships you already know
            &mdash; density equals mass over volume, weight equals mass times
            gravity, speed equals distance over time &mdash; into fast,
            checkable numbers. This page has four focused tools built on those
            definitions so you can solve homework, lab data, or everyday
            estimates without hunting through a formula sheet.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-500"
          />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <Link prefetch={false} key={calc.href} href={calc.href}>
                <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800/50 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-600/10">
                      <Atom className="w-6 h-6 text-blue-400" />
                    </div>
                    <span className="text-xs font-semibold text-blue-300 bg-blue-900/40 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-300">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">
              No calculators found matching &quot;{searchQuery}&quot;
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Intro Section */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Physics calculators that you find online usually just give you a
            number. That is it. They do not show the units. They do not warn
            you about the difference between mass and weight. They also do not
            let you change the gravity or the density of materials.
          </p>
          <p>
            These tools are different. They start with the definition that you
            learn in your first year of physics class and they keep the units
            clear so that your answer is what your teacher or lab instructor
            expects.
          </p>
        </div>

        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-6">
          <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
            <li>
              Density is mass divided by volume. The same thing can have
              different density values if you use different units.
            </li>
            <li>
              Mass is the amount of matter in something. Weight is the force of
              gravity on that mass. They are not the same thing.
            </li>
            <li>
              Average speed is the distance traveled divided by the total time
              taken. It is not the same as how something is moving at a
              particular moment.
            </li>
            <li>
              The weight of something on a planet or moon is different because
              the gravity is different. The mass is the same.
            </li>
            <li>
              These calculators give you the number that the formula gives.
              They do not replace the report you have to write in your lab
              class or the feedback you get from your instructor.
            </li>
          </ul>
        </div>
      </section>

      {/* Intro continued */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Every tool on this page uses the relationships that you learn in
            your first physics class. The Mass Calculator can also handle it
            when you know the force and the acceleration. The Weight Calculator
            lets you change the gravity so that you can see how the weight of
            the mass is different on the Moon or on Mars.
          </p>
          <p>
            These calculators are for checking your homework or getting ready
            for your lab class. They are not a replacement for understanding
            where the formulas come from or for the mistakes that can happen in
            experiments.
          </p>
        </div>
      </section>

      {/* How To Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How to Choose the Right Physics Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          Each tool answers a question. Here is how you can pick the one:
        </p>
       <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
  <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
    <li>
      If you know two of mass, volume and density and you need to find the
      third, use the{" "}
      <Link
        href="/calculators/physics/density-calculator"
        className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
      >
        <strong className="text-blue-300">Density Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you need to find mass from weight and gravity, use the{" "}
      <Link
        href="/calculators/physics/mass-calculator"
        className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
      >
        <strong className="text-blue-300">Mass Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you know how far something traveled and how long it took, use the{" "}
      <Link
        href="/calculators/physics/speed-calculator"
        className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
      >
        <strong className="text-blue-300">Speed Calculator</strong>
      </Link>
      .
    </li>
    
  </ul>
</div>
        <p className="text-gray-300 italic text-base leading-relaxed">
          If you are not sure where to start, begin with the Density Calculator
          if you have a sample from your lab class. Start with the Weight
          Calculator if you are comparing how heavy something would be on
          different planets.
        </p>
      </section>

      <WhoShouldUseSection />
      <KeyTermsSection />
      <ComparisonTableSection />
      <WorthUsingSection />
      <AccuracySection />
      <HowTheyWorkTogetherSection />
      <WorkedExampleSection />
      <TopicsSection />
      <CommonMistakesSection />
      <FAQSection />

      <Footer />
    </main>
  );
}

// ---------- REMAINING CONTENT SECTIONS ----------

function WhoShouldUseSection() {
  const useCases = [
    "School and college students who are checking their homework or lab work.",
    "Lab partners who need to find the density or mass of something while they are doing their experiment.",
    "Tutors who want a tool that can help them check their students' work.",
    "People who like to make things and want to know the mass of the materials they are using.",
    "Anyone who is curious about how heavy they would be on the Moon or on Mars.",
    "Students who are getting ready for a test and want to practice using the formulas.",
  ];

  const cautionCases = [
    "If you still need to show where the formulas come from and how the units work, you should look at your textbook or notes.",
    "If you are working with significant figures or mistakes that can happen in experiments, you should not just use the calculator.",
    "If you are taking a class that needs more complex formulas, you should not rely only on these calculators.",
    "If the gravity or temperature of something is affecting the result in a way a simple constant cannot capture, dig deeper than the calculator.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Who Should Use These Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        These tools are good for:
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Where to double-check or go further
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {cautionCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function KeyTermsSection() {
  const terms = [
    {
      term: "Density",
      def: "Mass per unit volume.",
    },
    {
      term: "Mass",
      def: "The amount of matter in something.",
    },
    {
      term: "Weight",
      def: "The force of gravity on that mass.",
    },
    {
      term: "Average speed",
      def: "The distance traveled divided by the total time taken.",
    },
    {
      term: "Gravity",
      def: "The force that pulls things towards each other.",
    },
    {
      term: "Volume",
      def: "The space that something takes up.",
    },
    {
      term: "Force",
      def: "The push or pull on something.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Key Terms
      </h2>
      <p className="text-gray-200 leading-relaxed mb-6 text-base">
        Here are some terms that you should know:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-4 text-gray-200 text-base leading-relaxed">
          {terms.map((t) => (
            <li key={t.term}>
              <strong className="text-blue-300">{t.term}</strong> &mdash;{" "}
              {t.def}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ComparisonTableSection() {
  const rows = [
    {
      calc: "Density",
      bestFor: "Finding density, mass or volume when you know the other two",
      weakness: "Assumes that the density is the same everywhere",
    },
    {
      calc: "Mass",
      bestFor: "Converts weight to mass or solves problems with force and acceleration",
      weakness: "Needs the correct value of gravity",
    },
    {
      calc: "Speed",
      bestFor: "Average speed, distance or time for something that is moving at a constant speed",
      weakness: "Does not handle acceleration or instantaneous speed",
    },
    {
      calc: "Weight",
      bestFor: "Weight on Earth or other planets from a known mass",
      weakness: "Uses a single value for gravity",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Comparison Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left font-semibold">Calculator</th>
              <th className="p-4 text-left font-semibold">Best For</th>
              <th className="p-4 text-left font-semibold">Weakness</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            {rows.map((row) => (
              <tr key={row.calc}>
                <td className="p-4">{row.calc}</td>
                <td className="p-4">{row.bestFor}</td>
                <td className="p-4">{row.weakness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WorthUsingSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Are Physics Calculators Still Worth Using?
      </h2>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Why not just use the formula by hand?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        You should still use the formula by hand. The calculator is just
        faster and makes fewer mistakes when you already know how the formula
        works.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Where calculators are not helpful is when you need to understand the
        context. They can give you the density of aluminum. They cannot tell
        you if the sample is wet or if the volume is not correct.
      </p>
      <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
        Calculator or textbook derivation?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If the question is what number do you get when you plug in the values,
        the calculator is perfect. If the question is why the formula works
        that way, you should look at your textbook or notes.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        How Accurate Are Free Physics Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        How accurate is a physics calculator?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        As accurate as the formula and the numbers you put in. The
        relationships between density, mass, speed and weight are exact.
        Mistakes usually happen when you mix the units or use the wrong value
        of gravity.
      </p>
      <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
        Why do two calculators sometimes disagree?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        This can happen when the calculators use different values for gravity
        or different units. Before you compare the results you should check
        which value of gravity each calculator uses and whether they are using
        the same units.
      </p>
    </section>
  );
}

function HowTheyWorkTogetherSection() {
  const steps = [
    "Use the Density Calculator when you have a sample and need to find the density, mass or volume.",
    "Use the Mass Calculator when you know the weight or force and need to find the mass.",
    "Use the Speed Calculator for speed, distance or time problems.",
    "Use the Weight Calculator to convert a known mass into weight on Earth or another planet.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        How These Calculators Work Together
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These four tools cover the common relationships in introductory
        physics. Here is how you can use them:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
        <ol className="space-y-3 text-gray-200 list-decimal list-inside text-base leading-relaxed">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WorkedExampleSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Suppose you have a block of aluminum with a mass of 270 grams and a
        volume of 100 cubic centimeters. The Density Calculator gives:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left font-semibold">Quantity</th>
              <th className="p-4 text-left font-semibold">Value</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            <tr>
              <td className="p-4">Mass</td>
              <td className="p-4">270 grams</td>
            </tr>
            <tr>
              <td className="p-4">Volume</td>
              <td className="p-4">100 cubic centimeters</td>
            </tr>
            <tr>
              <td className="p-4">Density</td>
              <td className="p-4">2.70 grams per cubic centimeter</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        That matches the accepted density of aluminum. Now convert the mass to
        kilograms. Use the Weight Calculator with the gravity of Earth. The
        weight on Earth is about 2.65 newtons. Change the gravity to the
        Moon&apos;s value and the weight drops to about 0.44 newtons.
      </p>
      <p className="text-gray-200 text-base leading-relaxed">
        For motion, suppose a car travels 120 kilometers in 1.5 hours. The
        Speed Calculator returns a speed of 80 kilometers per hour.
      </p>
    </section>
  );
}

function TopicsSection() {
  const topics = [
    "Specific gravity is the density of a substance divided by the density of water.",
    "Buoyancy and Archimedes’ principle depend on the difference in density.",
    "The gravity on Earth is not exactly the same everywhere.",
    "You should be careful when converting units.",
    "Average speed is not the same as instantaneous speed.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Other Physics Ideas Worth Knowing
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CommonMistakesSection() {
  const mistakes = [
    {
      title: "Treating mass and weight as the same thing",
      body: "Mass and weight are related but not identical. Mixing them up is one of the most common errors in introductory physics.",
    },
    {
      title: "Mixing units in one calculation",
      body: "Putting grams with cubic meters or kilometers with seconds without converting produces wrong answers.",
    },
    {
      title: "Using the wrong value of gravity",
      body: "Different problems and textbooks use 9.8, 9.81, or even 10 m/s². Always check which value is expected.",
    },
    {
      title: "Confusing average speed with instantaneous speed",
      body: "Average speed is total distance over total time. It does not tell you how fast something was moving at one exact moment.",
    },
    {
      title: "Forgetting that density can depend on temperature",
      body: "Most simple problems treat density as constant, but real materials expand or contract with temperature.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Common Mistakes
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-5 text-gray-200 text-base leading-relaxed">
          {mistakes.map((m) => (
            <li key={m.title}>
              <strong className="text-blue-300">{m.title}.</strong> {m.body}
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-6 text-gray-200 text-base leading-relaxed">
        You should be careful. Make sure you are using the right units and the
        right value of gravity. You should also make sure you understand where
        the formulas come from and how they work.
      </p>
      {/* ── TRUST / E-E-A-T BYLINE ── */}
      <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="w-12 h-12 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
          RA
        </div>
        <div>
          <p className="text-white font-semibold text-sm">
            Written by Rana Muhammad Abdullah
          </p>
          <p className="text-gray-400 text-xs">
            MERN Stack Developer &amp; Tool Maker · Mechatronics &amp; Control
            Engineering Student ·{" "}
            <a
              href="https://www.linkedin.com/in/abdullahsajjad06/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
          <span>📅 Published: Apr 1, 2026</span>
          <span>🔄 Updated: Jul 28, 2026</span>
          <span>✅ Verified accurate</span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "What is the difference between mass and weight?",
      a: "Mass is the amount of matter in an object and is measured in kilograms. Weight is the gravitational force acting on that mass (W = mg) and is measured in newtons. Your mass stays the same on the Moon; your weight does not.",
    },
    {
      q: "How do you calculate density?",
      a: "Density equals mass divided by volume (ρ = m / V). Make sure mass and volume use consistent units — for example grams and cubic centimeters, or kilograms and cubic meters.",
    },
    {
      q: "Why is my density value different from the textbook table?",
      a: "Common reasons are temperature differences, impurities in the sample, measurement error in volume, or mixed units. Textbook values are usually given at a standard temperature (often 20 °C).",
    },
    {
      q: "How much would I weigh on the Moon?",
      a: "Roughly one-sixth of your Earth weight, because the Moon’s surface gravity is about 1.62 m/s² compared with Earth’s 9.81 m/s². Enter your mass into the Weight Calculator and select the Moon to see the exact number.",
    },
    {
      q: "Is average speed the same as velocity?",
      a: "No. Average speed is a scalar (distance over time). Velocity is a vector and includes direction. The Speed Calculator on this page computes average speed.",
    },
    {
      q: "What value of g should I use?",
      a: "Most introductory courses accept 9.8 m/s² or 9.81 m/s². Some problems simplify to 10 m/s². Always check what your textbook or instructor specifies.",
    },
    {
      q: "Can I use these calculators for lab reports?",
      a: "They are excellent for checking arithmetic and units, but a formal lab report still needs your measured data, uncertainty analysis, and the derivation or method you used. Do not submit calculator output as a substitute for your own work.",
    },
    {
      q: "How do I convert g/cm³ to kg/m³?",
      a: "Multiply by 1000. For example, the density of water is 1 g/cm³, which equals 1000 kg/m³.",
    },
    {
      q: "Does mass change with location?",
      a: "No. Mass is independent of gravity. Only weight changes when you move to a different planet or moon.",
    },
    {
      q: "What is specific gravity?",
      a: "Specific gravity is the ratio of a substance’s density to the density of water (usually at 4 °C). It is a dimensionless number and is often used in material identification.",
    },
    {
      q: "Why do two speed calculators give slightly different answers?",
      a: "Usually a difference in rounding, unit conversion, or whether the tool treats the motion as constant speed versus average speed over a changing path. Confirm both tools are solving the same form of the equation.",
    },
    {
      q: "Can density be used to identify an unknown material?",
      a: "Yes, within limits. Measure mass and volume, compute density, then compare with a reliable density table. Many materials have overlapping ranges, so density alone is rarely definitive without other tests.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-xl font-semibold text-blue-300 mb-2">
              {item.q}
            </h3>
            <p className="text-gray-200 text-base leading-relaxed">
              {item.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}