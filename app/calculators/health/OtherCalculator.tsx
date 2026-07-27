"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index based on height and weight",
    href: "/calculators/health/bmi-calculator",
    category: "Health",
  },
  {
    name: "Calorie Calculator",
    description:
      "Estimate daily calorie needs based on activity level and goals",
    href: "/calculators/health/calorie-calculator",
    category: "Health",
  },
  {
    name: "Body Fat Calculator",
    description: "Estimate body fat percentage using various methods",
    href: "/calculators/health/body-fat-calculator",
    category: "Health",
  },
  {
    name: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate and daily energy expenditure",
    href: "/calculators/health/bmr-calculator",
    category: "Health",
  },
  {
    name: "TDEE Calculator",
    description:
      "Calculate Total Daily Energy Expenditure based on activity level",
    href: "/calculators/health/tdee-calculator",
    category: "Health",
  },
  {
    name: "Macros Calculator",
    description: "Calculate protein, carbs, and fats needed for your goals",
    href: "/calculators/health/macros-calculator",
    category: "Health",
  },
  {
    name: "Calorie Deficit Calculator",
    description:
      "Calculate the calorie deficit needed to reach your weight loss goals",
    href: "/calculators/health/calorie-deficit-calculator",
    category: "Health",
  },
  {
    name: "Sleep Calculator",
    description: "Calculate your ideal sleep duration based on age and lifestyle",
    href: "/calculators/health/sleep-calculator",
    category: "Health",
  },
];

export default function FitnessCalculators() {
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

            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold text-white">
              Fitness &amp; Health Calculators
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Track your fitness goals with our health calculators.
          </p>
        </div>
      </section>

      {/* Quick Answer + Key Takeaways */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Health calculators estimate things like how many calories you
            need, your resting metabolism, and your body composition, using
            your weight, height, age, and activity level. This page has
            eight calculators &mdash; BMI, calorie, body fat, BMR, TDEE,
            macros, calorie deficit, and sleep &mdash; each built on the
            formulas dietitians and clinicians actually use.
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
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder:text-gray-500"
          />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <Link prefetch={false} key={calc.href} href={calc.href}>
                <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800/50 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-red-600/10">
                      <Heart className="w-6 h-6 text-red-400" />
                    </div>
                    <span className="text-xs font-semibold text-red-300 bg-red-900/40 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-red-400 transition-colors">
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
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>
{/* Intro Section — goes after Hero, before search bar */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Most online health calculators don&apos;t show you how they
            arrive at an answer, or what that answer actually means. LizoCalc
            was built to be transparent &mdash; every calculator here shows
            you the formula behind it, why it was chosen, and what the
            result means for you.
          </p>
        </div>
           <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-6">
          <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
            <li>
              BMI checks your weight relative to your height. It can&apos;t
              tell whether that weight is muscle or fat.
            </li>
            <li>
              BMR is the number of calories your body uses at rest. TDEE
              adds the calories you burn from being active.
            </li>
            <li>
              A calorie deficit goal is only as good as your honesty about
              how active you actually are.
            </li>
            <li>
              Set your macro split after you set your calorie target, not
              before.
            </li>
            <li>
              These tools give you an estimate, not a diagnosis. If you have
              a medical condition, are pregnant, or have a history of
              disordered eating, use these tools alongside a doctor, not
              instead of one.
            </li>
          </ul>
        </div>
      </section>
      {/* Intro Section continued */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Every calculator on this page uses formulas that dietitians,
            trainers, and clinicians actually rely on, including BMI,
            calorie, body fat, BMR, TDEE, macros, calorie deficit, and sleep
            calculators. BMR and TDEE use the Mifflin-St Jeor equation, which
            most nutrition experts consider more accurate than older
            formulas. Body fat uses the U.S. Navy tape-measurement method.
            Calorie deficit is based on how many calories you need to cut to
            reach a weight-loss goal.
          </p>
          <p>
            These calculators are tools, not a replacement for what a
            doctor tells you. They can answer questions like what you should
            eat to lose weight, or what your resting metabolic rate is. If
            you have a medical condition, are pregnant, or have a history of
            disordered eating, listen to a doctor or dietitian &mdash; not
            just a calculator.
          </p>
        </div>
      </section>

      {/* How To Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
          How to Choose the Right Health Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          To choose the right calculator, you need to know what you&apos;re
          trying to find out. Here&apos;s a quick guide:
        </p>
       <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
  <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
    <li>
      If you want to know if your weight is healthy for your height, use the{" "}
      <Link
        href="/calculators/health/bmi-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">BMI Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know how many calories to eat per day, use the{" "}
      <Link
        href="/calculators/health/calorie-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">Calorie Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know your body fat percentage, use the{" "}
      <Link
        href="/calculators/health/body-fat-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">Body Fat Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know your resting metabolic rate, use the{" "}
      <Link
        href="/calculators/health/bmr-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">BMR Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know how many calories you burn in a typical day, use the{" "}
      <Link
        href="/calculators/health/tdee-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">TDEE Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to split your calories into protein, carbs, and fat, use the{" "}
      <Link
        href="/calculators/health/macros-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">Macros Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to lose weight, use the{" "}
      <Link
        href="/calculators/health/calorie-deficit-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">Calorie Deficit Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know how much sleep you need, use the{" "}
      <Link
        href="/calculators/health/sleep-calculator"
        className="text-red-300 underline underline-offset-2 hover:text-red-200"
      >
        <strong className="text-red-300">Sleep Calculator</strong>
      </Link>
      .
    </li>
  </ul>
</div>
        <p className="text-gray-300 italic text-base leading-relaxed">
          Not sure which one fits? Start with the BMR Calculator and the
          TDEE Calculator &mdash; BMR gives you your resting baseline, and
          TDEE builds on that to give you your real daily number.
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
    "People who want to know how many calories to eat and keep track of their weight.",
    "Athletes who want a read on their body composition.",
    "People new to fitness who want a starting point.",
    "Parents who want a sense of whether a teenager's growth looks healthy.",
    "Trainers who want a quick reference for clients.",
    "Anyone who's had a life change and needs to recalculate their calorie needs.",
  ];

  const cautionCases = [
    "Breastfeeding women, who need calorie and weight guidelines tailored to nursing.",
    "People with a history of disordered eating, who should get support from a doctor.",
    "Teenagers, whose growth is better tracked with pediatric growth charts.",
    "People managing a diagnosed health condition, who need a doctor's guidance.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Who Should Use These Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-red-300 mb-5">
        These tools are a good fit for:
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-2xl font-semibold text-red-300 mb-5">
        Who shouldn&apos;t rely on these calculators alone
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
    { term: "BMI", def: "A way to check your weight relative to your height." },
    {
      term: "BMR",
      def: "The number of calories your body uses when you're at rest.",
    },
    {
      term: "TDEE",
      def: "The number of calories your body uses per day, including activity.",
    },
    { term: "Macros", def: "Protein, carbs, and fat — the three main nutrient types." },
    {
      term: "Calorie deficit",
      def: "Eating fewer calories than you burn, which leads to weight loss.",
    },
    { term: "Lean body mass", def: "Your total weight minus your fat mass." },
    {
      term: "Body fat percentage",
      def: "How much of your total weight is made up of fat.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Key Terms
      </h2>
      <p className="text-gray-200 leading-relaxed mb-6 text-base">
        A few words worth knowing before you dive in:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-4 text-gray-200 text-base leading-relaxed">
          {terms.map((t) => (
            <li key={t.term}>
              <strong className="text-red-300">{t.term}</strong> &mdash;{" "}
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
      calc: "BMI",
      bestFor: "Quick weight check",
      weakness: "Can't tell muscle from fat",
    },
    {
      calc: "Calorie Calculator",
      bestFor: "Daily calorie target",
      weakness: "Relies on how active you say you are",
    },
    {
      calc: "Body Fat",
      bestFor: "Body composition",
      weakness: "Navy method is less precise than clinical methods",
    },
    {
      calc: "BMR",
      bestFor: "Resting calorie needs",
      weakness: "Doesn't include daily activity",
    },
    {
      calc: "TDEE",
      bestFor: "Daily calorie needs",
      weakness: "Built on a BMR and activity estimate",
    },
    {
      calc: "Macros",
      bestFor: "Splitting calories into protein, carbs, and fat",
      weakness: "Only as good as your calorie target",
    },
    {
      calc: "Calorie Deficit",
      bestFor: "Weight-loss planning",
      weakness: "Assumes a steady rate of loss",
    },
    {
      calc: "Sleep",
      bestFor: "Sleep planning",
      weakness: "Doesn't account for sleep quality",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Comparison Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-red-900/70">
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
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Are Health Calculators Still Worth Using?
      </h2>
      <h3 className="text-2xl font-semibold text-red-300 mb-5">
        Are health calculators useful in 2026?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        More useful than ever, if anything &mdash; there&apos;s a lot of
        fitness advice online that&apos;s really just someone&apos;s
        opinion. The apps look nicer, but the underlying question hasn&apos;t
        changed: what result do you get when you enter your numbers into the
        formula? A calculator answers that in seconds, and because the math
        is transparent, you can verify it yourself.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Where calculators fall short is judgment. A BMI or daily-energy
        number can&apos;t tell you whether you&apos;re stuck because of
        water retention, because you&apos;re less active than you think, or
        because something else is going on that&apos;s worth a doctor&apos;s
        attention. That&apos;s where a trainer, dietitian, or doctor comes
        in.
      </p>
      <h3 className="text-2xl font-semibold text-red-300 mt-10 mb-5">
        Do you need a calculator or a professional?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If you just want to know how many calories to eat or what your
        resting metabolism is, a calculator gives you that instantly and for
        free. If you have a chronic condition, a relevant medical history,
        or want a read on how your body has changed after months of
        tracking, talk to a professional. Most people benefit from both: run
        the numbers yourself, then talk through what they mean with someone
        qualified.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        How Accurate Are Free Online Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-red-300 mb-5">
        How accurate are free health calculators?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        It comes down to which formula the calculator uses, not whether
        it&apos;s free or paid. A calculator built on the Mifflin-St Jeor
        equation gives results close to what you&apos;d get measured in a
        doctor&apos;s office. Results get less accurate if a tool uses an
        older formula, or if you pick the wrong activity level. Every
        calculator on this site states which formula it uses directly on
        the page.
      </p>
      <h3 className="text-2xl font-semibold text-red-300 mt-10 mb-5">
        Why do different calculators give different answers for the same
        numbers?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        Usually hidden assumptions. Two tools can disagree on the same
        inputs because one uses Mifflin-St Jeor and the other uses the older
        Harris-Benedict formula. Before comparing results across tools,
        check which formula each one assumes. If the formulas match and the
        answers still differ, one of the tools has an error.
      </p>
    </section>
  );
}

function HowTheyWorkTogetherSection() {
  const steps = [
    "Start with your BMI to get a rough sense of where you stand.",
    "Check your body fat percentage to see what your weight is actually made of.",
    "Calculate your BMR to see how many calories your body burns at rest.",
    "Estimate your TDEE to find out how many calories you burn in a typical day.",
    "Set a weight goal and calculate the calorie target that gets you there.",
    "Plan your meals by working out your protein, carb, and fat needs.",
    "Track your sleep, since it affects your energy, recovery, and appetite.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        How These Calculators Work Together
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These calculators aren&apos;t meant to be used in isolation &mdash;
        here&apos;s a sensible order to run them in when you&apos;re
        building a plan:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
        <ol className="space-y-3 text-gray-200 list-decimal list-inside text-base leading-relaxed">
          {steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </div>
      <p className="text-gray-200 text-base leading-relaxed">
        If two numbers seem to conflict &mdash; say, your BMI reads as
        overweight but your body fat percentage looks athletic &mdash; the
        body fat number is usually the more reliable one, since it accounts
        for things BMI can&apos;t.
      </p>
    </section>
  );
}

function WorkedExampleSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Say you&apos;re a 30-year-old man who weighs 80 kg and is 178 cm
        tall, and you want to lose 5 kg in 10 weeks. Running that through
        the calculators gives you:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-red-900/70">
              <th className="p-4 text-left font-semibold">Step</th>
              <th className="p-4 text-left font-semibold">Result</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            <tr>
              <td className="p-4">Resting metabolism (BMR)</td>
              <td className="p-4">1,780 cal/day</td>
            </tr>
            <tr>
              <td className="p-4">Daily calorie needs (TDEE)</td>
              <td className="p-4">2,760 cal/day</td>
            </tr>
            <tr>
              <td className="p-4">Deficit needed to lose 5 kg in 10 weeks</td>
              <td className="p-4">550 cal/day</td>
            </tr>
            <tr>
              <td className="p-4">Resulting calorie target</td>
              <td className="p-4">2,210 cal/day</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-200 text-base leading-relaxed">
        From there, the Macros Calculator can break that 2,210-calorie
        target into protein, carbs, and fat. This pace is realistic and
        sustainable. Trying to lose the same 5 kg in 4 weeks instead of 10
        would need a much larger deficit &mdash; one that&apos;s hard to
        stick to and isn&apos;t always healthy.
      </p>
    </section>
  );
}

function TopicsSection() {
  const topics = [
    "Your waist-to-height ratio, which can say more about health risk than BMI alone.",
    "Your body surface area, which doctors use to calculate medication dosing.",
    "Your heart rate training zones, useful for planning workouts.",
    "How much protein you need, especially important if you're building muscle.",
    "How much water you need, which depends on your weight and activity level.",
    "What a healthy weight range looks like for you — it's a range, not one number.",
    "Your MET values, which help estimate calories burned across different activities.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Other Health Metrics Worth Knowing
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
      title: "Overestimating how active you are",
      body: "Sitting at a desk all day doesn't make you moderately active just because you go for the occasional walk. Be honest, since your TDEE and calorie target depend on it.",
    },
    {
      title: "Setting a goal to lose weight too quickly",
      body: "Trying to lose too much in too little time means a deficit that's hard to sustain, which usually means falling off the plan entirely.",
    },
    {
      title: "Not eating enough protein",
      body: "Protein matters even more when you're in a calorie deficit — it helps preserve muscle while you lose weight.",
    },
    {
      title: "Treating BMI as the only number that matters",
      body: "Look at body fat percentage alongside BMI to get a fuller picture of your health, especially if you carry more muscle than average.",
    },
    {
      title: "Neglecting sleep",
      body: "Skimping on sleep affects recovery, appetite, and energy levels, which can undercut progress from diet and training alike.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Common Mistakes
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-5 text-gray-200 text-base leading-relaxed">
          {mistakes.map((m) => (
            <li key={m.title}>
              <strong className="text-red-300">{m.title}.</strong> {m.body}
            </li>
          ))}
        </ul>
      </div>
      {/* ── TRUST / E-E-A-T BYLINE ── */}
      <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="w-12 h-12 rounded-full bg-red-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
              className="text-red-400 hover:underline"
            >
              LinkedIn
            </a>
          </p>
        </div>
        <div className="ml-auto flex flex-wrap gap-3 text-xs text-gray-400">
          <span>📅 Published: Apr 1, 2026</span>
          <span>🔄 Updated: Jul 2, 2026</span>
          <span>✅ Verified accurate</span>
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: "Which health calculator should I use first?",
      a: "The BMI Calculator and the Calorie Calculator are good starting points. BMI gives you a quick sense of where you stand, and the Calorie Calculator gives you a number to plan meals around. The Body Fat Calculator and the Calorie Deficit Calculator are more useful once you have a specific goal in mind.",
    },
    {
      q: "Are online health calculators accurate?",
      a: "They're accurate as long as the underlying formula is sound and you're honest with your inputs. Even the best BMR and TDEE formulas can be off by around 10%, so results depend heavily on how accurately you report your activity level. Treat these as a solid starting point, not a perfect measurement.",
    },
    {
      q: "Why do different websites give different results for the same numbers?",
      a: "Usually because they're using different formulas or different assumptions about activity level. A site using the Harris-Benedict formula will typically give a higher BMR than one using Mifflin-St Jeor. Checking which formula a site uses explains most of the discrepancy.",
    },
    {
      q: "Can these calculators replace a doctor?",
      a: "No. These calculators are built on population-level formulas and can't account for your medical history, medications, or diagnosed conditions. This matters even more if you're pregnant, have a history of disordered eating, or manage a chronic condition.",
    },
    {
      q: "Which formula is most accurate for BMR?",
      a: "The Mifflin-St Jeor equation is generally considered more accurate than the older Harris-Benedict formula, and it's the one used for the BMR and TDEE calculators on this page.",
    },
    {
      q: "How often should I recalculate?",
      a: "Every 4–6 weeks if you're actively trying to lose or gain weight, or any time your weight shifts by more than about 5 kg. Your BMR and TDEE change as your body composition changes.",
    },
    {
      q: "What's the difference between BMR and TDEE?",
      a: "BMR is the number of calories your body burns at rest. TDEE adds in the calories you burn from daily activity. When you're setting a calorie target for weight loss or gain, use your TDEE, not your BMR.",
    },
    {
      q: "How is the Calorie Deficit Calculator different from the Calorie Calculator?",
      a: "The Calorie Calculator estimates how many calories you should eat to maintain your current weight. The Calorie Deficit Calculator works backward from a weight-loss goal and a timeframe to tell you how large a deficit you need.",
    },
    {
      q: "Is BMI a reliable health measure?",
      a: "BMI is a useful screening tool used by many health organizations, but it doesn't measure body fat directly. It works reasonably well at a population level, but it can be misleading for people who carry more muscle than average.",
    },
    {
      q: "How accurate is the Body Fat Calculator?",
      a: "The U.S. Navy tape-measurement method used here is reasonably accurate and correlates well with clinical measurements, though it's not as precise as methods like DEXA scanning. It's a solid tool for tracking your own progress over time.",
    },
    {
      q: "How do I know if my macro split is right for me?",
      a: "There's no single right answer — it depends on your goals, training style, and how your body responds. A good starting point is hitting your protein target first, then adjusting carbs and fat based on how you feel and perform.",
    },
    {
      q: "Why does my calorie deficit target keep changing?",
      a: "As you lose weight, your BMR and TDEE both drop, since a smaller body burns fewer calories at rest and during activity. Recalculating periodically keeps your deficit target aligned with where your body actually is now.",
    },
    {
      q: "How much sleep do I actually need?",
      a: "Most adults need about 7–9 hours per night, though this varies by age — teenagers generally need more, and older adults sometimes need somewhat less. The Sleep Calculator can help you work out what time to go to bed based on your wake time.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-red-500 border-b border-red-600 pb-4 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-xl font-semibold text-red-300 mb-2">
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