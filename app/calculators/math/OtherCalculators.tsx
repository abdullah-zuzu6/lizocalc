"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, Sigma } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "Scientific Calculator",
    description:
      "Advanced calculator with trigonometry, logarithms, and scientific functions",
    href: "/calculators/math/scientific-calculator",
    category: "Advanced",
  },
  {
    name: "Fraction Calculator",
    description:
      "Add, subtract, multiply, and divide fractions with simplification",
    href: "/calculators/math/fraction-calculator",
    category: "Basic",
  },
  {
    name: "Percentage Calculator",
    description:
      "Calculate percentages, discounts, markups, and percentage changes",
    href: "/calculators/math/percentage-calculator",
    category: "Basic",
  },
  {
    name: "Triangle Calculator",
    description: "Solve triangles using known sides and angles",
    href: "/calculators/math/triangle-calculator",
    category: "Advanced",
  },
  {
    name: "Pythagorean Theorem Calculator",
    description: "Solve right triangles using the Pythagorean theorem",
    href: "/calculators/math/pythagorean-theorem-calculator",
    category: "Advanced",
  },
  {
    name: "Half Life Calculator",
    description: "Calculate remaining substance after a given time period",
    href: "/calculators/math/half-life-calculator",
    category: "Advanced",
  },
  {
    name: "Binary Calculator",
    description:
      "Perform bitwise arithmetic and convert between binary, decimal, and hexadecimal",
    href: "/calculators/math/binary-calculator",
    category: "Advanced",
  },
  {
    name: "Hexadecimal Calculator",
    description: "Perform arithmetic operations on hexadecimal values",
    href: "/calculators/math/hexadecimal-calculator",
    category: "Advanced",
  },
  {
    name: "Least Common Multiple (LCM) Calculator",
    description: "Find the least common multiple of a set of integers",
    href: "/calculators/math/lcm-calculator",
    category: "Advanced",
  },
  {
    name: "Greatest Common Factor (GCF) Calculator",
    description: "Find the greatest common factor of a set of integers",
    href: "/calculators/math/gcf-calculator",
    category: "Advanced",
  },
  {
    name: "Permutation and Combination Calculator",
    description: "Calculate permutations and combinations of items",
    href: "/calculators/math/permutation-combination-calculator",
    category: "Advanced",
  },
  {
    name: "Z Score Calculator",
    description:
      "Calculate z-scores and percentile ranks for normally distributed data",
    href: "/calculators/math/z-score-calculator",
    category: "Advanced",
  },
  
];

export default function MathCalculators() {
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

            <Sigma className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold text-white">Math Calculators</h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            From percentages and fractions to LCM, z-scores, and scientific
            functions — clear tools for the problems you actually meet.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Math calculators online usually just give you a number. That is it.
            They do not show you how they got that number. They also do not
            tell you if you should be doing something in an order. They do not
            help you figure out if you should be using a permutation or a
            combination.
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
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder:text-gray-500"
          />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <Link prefetch={false} key={calc.href} href={calc.href}>
                <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-purple-600/10">
                      <Sigma className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-xs font-semibold text-purple-300 bg-purple-900/40 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors">
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
              className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-500 hover:shadow-lg transition-all"
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
            These tools are different. They start with the basics that you
            learn in class. They show you every step of the way. So you can
            trust the answer. You can explain it to someone else.
          </p>
        </div>

        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mt-6">
          <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
            <li>
              A percentage is a ratio that is out of 100. This is the idea that
              is used for discounts and markups and percentage change.
            </li>
            <li>
              Fractions are a little different. You have to make sure they have
              the same denominator before you can add or subtract them. You
              should always simplify them so they are in their simplest form.
            </li>
            <li>
              The common multiple or LCM is the smallest number that two or
              more numbers can divide into evenly. The greatest common factor
              or GCF is the number that can divide two or more numbers evenly.
              These two things are not the same thing.
            </li>
            <li>
              Permutations are when the order of things matters. Combinations
              are when the order does not matter. If you get these two things
              mixed up you will get a different answer.
            </li>
            <li>
              These calculators will give you the number that the formula says
              you should get. They are not a replacement for actually
              understanding the concept or for showing your work on a test.
            </li>
          </ul>
        </div>
      </section>

      {/* Intro continued */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Every tool on this page uses the definitions that you learn in
            school. The Percentage Calculator can do things like figure out
            what percentage of a number is another number or what the percentage
            change is between two numbers. The Fraction Calculator can add,
            subtract, multiply and divide fractions and it will simplify them
            for you. The LCM and GCF tools work with two or more numbers. The
            Scientific Calculator can do trig and logs and exponents. The Binary
            and Hexadecimal tools can convert between bases and do arithmetic.
          </p>
          <p>
            You can use these calculators to check your homework or to study
            for a test. They are not a replacement for learning the concepts or
            for doing the step by step work that your teacher wants you to do.
          </p>
        </div>
      </section>

      {/* How To Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
          How to Choose the Right Math Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          Each tool is for a kind of question. Here is how you can pick the
          one:
        </p>
        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
  <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
    <li>
      If you need to do something with percentages, use the{" "}
      <Link
        href="/calculators/math/percentage-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">Percentage Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you are working with fractions, use the{" "}
      <Link
        href="/calculators/math/fraction-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">Fraction Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you need to find the common multiple of some numbers, use the{" "}
      <Link
        href="/calculators/math/lcm-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">LCM Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you need to find the common factor, use the{" "}
      <Link
        href="/calculators/math/gcf-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">GCF Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If the order of things matters, use the{" "}
      <Link
        href="/calculators/math/permutation-combination-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">
          Permutation and Combination Calculator
        </strong>
      </Link>
      .
    </li>
    <li>
      If you are working with a triangle, start with the{" "}
      <Link
        href="/calculators/math/pythagorean-theorem-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">
          Pythagorean Theorem Calculator
        </strong>
      </Link>
      .
    </li>
    <li>
      If you need to do trig or logs or exponents, use the{" "}
      <Link
        href="/calculators/math/scientific-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">Scientific Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you are working with binary or hexadecimal, use the{" "}
      <Link
        href="/calculators/math/binary-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">Binary Calculator</strong>
      </Link>{" "}
      or{" "}
      <Link
        href="/calculators/math/hexadecimal-calculator"
        className="text-purple-300 underline underline-offset-2 hover:text-purple-200"
      >
        <strong className="text-purple-300">Hexadecimal Calculator</strong>
      </Link>
      .
    </li>
  </ul>
</div>
        <p className="text-gray-300 italic text-base leading-relaxed">
          If you are not sure where to start, try the Percentage Calculator or
          the Fraction Calculator. Then you can move on to the LCM or GCF or
          the Scientific Calculator.
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
    "Students who are checking their homework or studying for a test.",
    "Tutors who need to verify a student's work.",
    "Parents who are helping their kids with percentages or fractions or basic algebra.",
    "Anyone who needs to calculate discounts or tips or markups or percentage change.",
    "Students who are learning about base conversions or discrete math.",
    "People who are working with distributions and need to calculate a z-score.",
  ];

  const cautionCases = [
    "If you need to show all of your work on a test you should not just use a calculator.",
    "If you are working with significant figures or rounding rules or measurement uncertainty you will need to do more than just use a calculator.",
    "If you are taking a class that requires symbolic algebra or formal proofs you will need to do more than just use a calculator.",
    "If you are working on a word problem that requires you to understand the context you will need to do more than just use a calculator.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Who Should Use These Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-purple-300 mb-5">
        These tools are good for:
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-2xl font-semibold text-purple-300 mb-5">
        Where to Double-Check or Go Further
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
      term: "Percentage",
      def: "A ratio that's out of 100.",
    },
    {
      term: "Fraction",
      def: "A number that is expressed as a numerator over a denominator.",
    },
    {
      term: "LCM",
      def: "The smallest number that two or more numbers can divide into evenly.",
    },
    {
      term: "GCF",
      def: "The number that can divide two or more numbers evenly.",
    },
    {
      term: "Permutation",
      def: "An arrangement of things where the order matters.",
    },
    {
      term: "Combination",
      def: "A selection of things where the order does not matter.",
    },
    {
      term: "Z-score",
      def: "How many standard deviations a value is from the mean in a distribution.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Key Terms
      </h2>
      <p className="text-gray-200 leading-relaxed mb-6 text-base">
        Here are some terms that you should understand:
      </p>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-4 text-gray-200 text-base leading-relaxed">
          {terms.map((t) => (
            <li key={t.term}>
              <strong className="text-purple-300">{t.term}</strong> &mdash;{" "}
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
      calc: "Percentage",
      bestFor: "Discounts, markups, percent of, percent change",
      weakness: "Does not interpret word-problem context",
    },
    {
      calc: "Fraction",
      bestFor: "Adding, subtracting, multiplying, dividing fractions",
      weakness: "Assumes you enter fractions in the correct form",
    },
    {
      calc: "LCM / GCF",
      bestFor: "Shared multiples or factors of numbers",
      weakness: "Only works with integers",
    },
    {
      calc: "Perm / Comb",
      bestFor: "Counting arrangements or selections",
      weakness: "Wrong choice of permutation vs combination gives a wrong count",
    },
    {
      calc: "Scientific",
      bestFor: "Trig, logs, exponents, multi-step expressions",
      weakness: "Order of operations and mode still matter",
    },
    {
      calc: "Z-Score",
      bestFor: "Position of a value in a normal distribution",
      weakness: "Assumes the data are approximately normal",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Comparison Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-purple-900/70">
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
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Are Math Calculators Still Worth Using?
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        You should still learn how to do math by hand. Calculators can be
        helpful for checking your work and for doing things quickly.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Calculators are not good at making judgments. They will do what you
        tell them to do even if it is not what you meant to do.
      </p>
      <h3 className="text-2xl font-semibold text-purple-300 mt-10 mb-5">
        Working by Hand?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If you just need to calculate a number a calculator is fine. If you
        need to understand why something works you should use a calculator and
        also do the work by hand.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        How Accurate Are Free Math Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-purple-300 mb-5">
        How accurate is an online math calculator?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Online math calculators are as accurate as the formula and the inputs
        you give them. Errors usually come from entering the numbers or using
        the wrong mode.
      </p>
      <h3 className="text-2xl font-semibold text-purple-300 mt-10 mb-5">
        Why do two calculators sometimes disagree?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        Calculators might disagree if they are using different rounding or a
        different order of operations. Make sure you are using the same mode
        and the same formula when you compare results.
      </p>
    </section>
  );
}

function HowTheyWorkTogetherSection() {
  const steps = [
    "Use the Percentage or Fraction Calculator for everyday problems.",
    "Use LCM and GCF when you need to find shared multiples or factors.",
    "Use the Pythagorean or Triangle Calculator when you are working with triangles.",
    "Use Permutation and Combination when you are counting arrangements or selections.",
    "Use the Scientific Calculator for trig, logs, exponents or multi-step expressions.",
    "Use the Z Score Calculator when you need to place a value in a distribution.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        How These Calculators Work Together
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These tools cover most of the math tasks that you will do in school or
        in life. You can use them in an order like this:
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
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Let&apos;s say a jacket costs $80 and is marked down 25%. The
        Percentage Calculator will show you that the discount is $20 and the
        sale price is $60.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Now let&apos;s simplify the fraction 36/48. The Fraction Calculator
        will reduce it to 3/4.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        If you need to find the common multiple of 12 and 18 the LCM Calculator
        will return 36. The greatest common factor of 12 and 18 is 6.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        For counting, if you need to choose 3 books from 10 and the order does
        not matter the combination is C(10,3) = 120. If the order does matter
        the permutation is P(10,3) = 720.
      </p>
      <p className="text-gray-200 text-base leading-relaxed">
        Finally, if you have a test score of 85 with a class mean of 78 and a
        standard deviation of 4 the z-score is (85 − 78) / 4 = 1.75. That
        places the score above the mean in a normal distribution.
      </p>
    </section>
  );
}

function TopicsSection() {
  const topics = [
    "Order of operations — why calculators still need correct input grouping.",
    "Percent of versus percent change — two different questions that look similar.",
    "When to use LCM versus GCF.",
    "Permutation vs combination — the role of order.",
    "Degree mode versus radian mode on scientific calculators.",
    "How z-scores connect to percentiles in a distribution.",
    "Base conversion between binary, decimal and hexadecimal.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Other Math Ideas Worth Knowing
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
      title: "Mixing up percent of and percent change",
      body: "These are two different questions that look similar but produce different answers.",
    },
    {
      title: "Forgetting to simplify fractions",
      body: "Many teachers expect the answer in lowest terms even when the value is correct.",
    },
    {
      title: "Choosing permutation when you should be using combination",
      body: "If order does not matter use combinations. If order matters use permutations.",
    },
    {
      title: "Wrong mode on a calculator",
      body: "Trig functions in degree mode versus radian mode produce completely different results.",
    },
    {
      title: "Ignoring order of operations",
      body: "Entering an expression without the correct parentheses changes the result.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Common Mistakes
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-5 text-gray-200 text-base leading-relaxed">
          {mistakes.map((m) => (
            <li key={m.title}>
              <strong className="text-purple-300">{m.title}.</strong> {m.body}
            </li>
          ))}
        </ul>
      </div>
      {/* ── TRUST / E-E-A-T BYLINE ── */}
      <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="w-12 h-12 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
              className="text-purple-400 hover:underline"
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
      q: "What is the difference between LCM and GCF?",
      a: "LCM (Least Common Multiple) is the smallest positive number that is a multiple of each number in a set. GCF (Greatest Common Factor) is the largest positive number that divides each number in the set. LCM is useful for adding fractions; GCF is useful for simplifying them.",
    },
    {
      q: "When do I use permutation vs combination?",
      a: "Use permutations when order matters (for example, ranking or assigning distinct roles). Use combinations when order does not matter (for example, choosing a team or a set of items). The formulas and results are different.",
    },
    {
      q: "How do I calculate a percentage of a number?",
      a: "Multiply the number by the percentage written as a decimal. For example, 25% of 80 is 0.25 × 80 = 20. The Percentage Calculator also handles reverse percentages and percent change.",
    },
    {
      q: "Why does my scientific calculator give a different trig answer?",
      a: "Check whether it is in degree mode or radian mode. Sin(30) in degrees is 0.5; in radians it is a different value. Most school problems use degrees unless stated otherwise.",
    },
    {
      q: "What does a z-score tell me?",
      a: "A z-score says how many standard deviations a value is from the mean. A z-score of 0 is exactly average; positive values are above the mean and negative values are below. It is most meaningful when the data are roughly normal.",
    },
    {
      q: "How do I simplify a fraction?",
      a: "Divide the numerator and denominator by their greatest common factor. The Fraction Calculator does this automatically and shows the reduced form.",
    },
    {
      q: "Can I use these calculators on exams?",
      a: "That depends on your teacher or exam rules. Many tests allow basic calculators but not phones or unrestricted web tools. Even when a calculator is allowed, you are often still required to show steps.",
    },
    {
      q: "What is percent change?",
      a: "Percent change is (new value − old value) / old value × 100%. It can be positive (increase) or negative (decrease). It is different from simply finding a percentage of a number.",
    },
    {
      q: "How do binary and hexadecimal calculators help?",
      a: "They convert between bases and perform arithmetic in binary or hex. This is useful in computer science, digital electronics, and programming contexts where those bases are common.",
    },
    {
      q: "Is the Pythagorean theorem only for right triangles?",
      a: "Yes. The relationship a² + b² = c² holds for right triangles, where c is the hypotenuse. For other triangles you need different formulas (for example, the Law of Cosines).",
    },
    {
      q: "Why do two percentage calculators sometimes disagree?",
      a: "Usually because one is computing “percent of” while the other is computing “percent change,” or because of different rounding. Confirm both tools are answering the same question.",
    },
    {
      q: "Do I still need to learn the formulas if calculators exist?",
      a: "Yes. Calculators are fastest when you already understand the idea. Exams, word problems, and real situations still require you to choose the right method and interpret the result.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-purple-500 border-b border-purple-600 pb-4 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-xl font-semibold text-purple-300 mb-2">
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