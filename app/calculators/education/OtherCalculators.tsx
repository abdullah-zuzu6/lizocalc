"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "GPA Calculator",
    description: "Calculate your Grade Point Average and weighted GPA",
    href: "/calculators/education/gpa-calculator",
    category: "Education",
  },
  {
    name: "Grade Calculator",
    description:
      "Calculate the grade you need on a final exam to reach your target grade",
    href: "/calculators/education/grade-calculator",
    category: "Education",
  },
  {
    name: "CGPA Calculator",
    description: "Calculate your Cumulative Grade Point Average",
    href: "/calculators/education/cgpa-calculator",
    category: "Education",
  },
  {
    name: "Final Grade Calculator",
    description:
      "Calculate your final grade based on component weights and scores",
    href: "/calculators/education/final-grade-calculator",
    category: "Education",
  },
  {
    name: "Weighted Grade Calculator",
    description:
      "Calculate your weighted grade based on component weights and scores",
    href: "/calculators/education/weighted-grade-calculator",
    category: "Education",
  },
];

export default function OtherCalculators() {
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

            <GraduationCap className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold text-white">
              Education &amp; Grade Calculators
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Work out your GPA, CGPA, and grades the same way your
            registrar&apos;s office does.
          </p>
        </div>
      </section>

      {/* Quick Answer + Key Takeaways */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Online GPA calculators assume that your school uses a 4.0 scale.
            What if your school uses plus or minus grades or a different scale
            altogether? That is when these calculators do not work well. The
            numbers they give you will not match the numbers on your transcript.
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
            className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder:text-gray-500"
          />
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <Link prefetch={false} key={calc.href} href={calc.href}>
                <div className="p-6 rounded-2xl border border-gray-700 bg-gray-800/50 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-green-600/10">
                      <GraduationCap className="w-6 h-6 text-green-400" />
                    </div>
                    <span className="text-xs font-semibold text-green-300 bg-green-900/40 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-green-400 transition-colors">
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
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

        {/* Quick Answer + Key Takeaways */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
        
          <p>
            Your GPA is like a report card for one term. It is the average of
            your grades for that term. Your CGPA is like a report card for all
            your terms. It rolls all your grades together into one average.
          </p>
          
          <p>
            If you know what score you need on a final you will not overstudy
            or understudy for it. One bad semester will not ruin your CGPA. The
            math will make it seem like it is not so bad.
          </p>
          <p>
            All these calculators use the formula that your school&apos;s
            registrar uses. They multiply each grade&apos;s point value by its
            credit hours, add those up, and then divide by your credit hours.
            The GPA Calculator is for one term. The CGPA Calculator is for all
            your terms. The Grade and Final Grade calculators work backward
            from a target grade. The Weighted Grade Calculator is for classes
            with weights for assignments and exams.
          </p>
          <p>
            These calculators are meant to match how your school computes
            grades. They are not meant to predict how admissions offices or
            scholarship committees will read your transcript. Every school is
            different so you should treat the number as a calculation, not a
            verdict.
          </p>
        </div>
      </section>


      {/* How To Choose Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
          How to Choose the Right Education Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          These tools answer questions. Here is how to pick the one:
        </p>
        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
  <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
    <li>
      If you want your GPA for the term use the{" "}
      <Link
        href="/calculators/education/gpa-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">GPA Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know what score you need on a test or assignment use the{" "}
      <Link
        href="/calculators/education/grade-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Grade Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want your running average use the{" "}
      <Link
        href="/calculators/education/cgpa-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">CGPA Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you want to know what score you need on an exam use the{" "}
      <Link
        href="/calculators/education/final-grade-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Final Grade Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If your class has weights for assignments and exams use the{" "}
      <Link
        href="/calculators/education/weighted-grade-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Weighted Grade Calculator</strong>
      </Link>
      .
    </li>
    <li>
      If you are not sure which one to use try the{" "}
      <Link
        href="/calculators/education/weighted-grade-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Weighted Grade Calculator</strong>
      </Link>{" "}
      first. Then use the{" "}
      <Link
        href="/calculators/education/final-grade-calculator"
        className="text-green-300 underline underline-offset-2 hover:text-green-200"
      >
        <strong className="text-green-300">Final Grade Calculator</strong>
      </Link>{" "}
      to see what you need to do for the rest of the term.
    </li>
  </ul>
</div>
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
    "School and college students who want to know their GPA before report cards come out.",
    "Students who want to know how much a final exam can move their grade.",
    "Transfer students who want to know how their existing credits will affect their CGPA.",
    "Students who are applying for scholarships or honors programs.",
    "Parents who want to help their student figure out what they can still achieve.",
    "Academic advisors who want an accurate number to reference.",
  ];

  const cautionCases = [
    "Students at schools with non-standard grading scales should confirm the scale before trusting the output.",
    "Anyone estimating GPA for college admissions should check if the college recalculates GPA differently.",
    "Students with pass or fail grades should check if the calculator can handle those grades correctly.",
    "Graduate or professional program applicants should check if the program calculates GPA differently.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Who Should Use These Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        These tools are good for:
      </h3>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-10">
        <ul className="space-y-3 text-gray-200 list-disc list-inside text-base leading-relaxed">
          {useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        Where to double-check the numbers
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
      term: "GPA",
      def: "Your Grade Point Average for one term.",
    },
    {
      term: "CGPA",
      def: "Your GPA for all your terms.",
    },
    {
      term: "Quality points",
      def: "A grade's point value multiplied by its credit hours.",
    },
    {
      term: "Credit hours",
      def: "The weight assigned to a course.",
    },
    {
      term: "Weighted GPA",
      def: "Gives points for honors or AP courses.",
    },
    {
      term: "Unweighted GPA",
      def: "Calculated on a 4.0 scale.",
    },
    {
      term: "Grade point scale",
      def: "The table your school uses to convert letter grades to points.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Key Terms
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-4 text-gray-200 text-base leading-relaxed">
          {terms.map((t) => (
            <li key={t.term}>
              <strong className="text-green-300">{t.term}</strong> &mdash;{" "}
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
      calc: "GPA",
      bestFor: "Your average for one semester",
      weakness: "Does not account for terms",
    },
    {
      calc: "Grade",
      bestFor: "The score needed for a target grade",
      weakness: "Needs current scores and weights",
    },
    {
      calc: "CGPA",
      bestFor: "Your running average",
      weakness: "One bad term has impact",
    },
    {
      calc: "Final Grade",
      bestFor: "The score needed on an exam",
      weakness: "Assumes you know the exam's weight",
    },
    {
      calc: "Weighted Grade",
      bestFor: "Classes with weights",
      weakness: "Requires correct category weights",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Comparison Table
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-green-900/70">
              <th className="p-4 text-left font-semibold">Calculator</th>
              <th className="p-4 text-left font-semibold">What it is best for</th>
              <th className="p-4 text-left font-semibold">What it is not good for</th>
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
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Are GPA Calculators Still Worth Using?
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        You might wonder why you need a GPA calculator when you can just wait
        for the registrar to post your grades. But the thing is, by the time
        grades post it is too late to change anything. The value of a GPA
        calculator is that you can use it mid-semester to see if you can
        recover from a midterm or if you can still reach a scholarship&apos;s
        GPA requirement.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These tools fall short when it comes to context. A calculator can
        tell you that your GPA dropped. It cannot tell you why. That is when
        you need to talk to an advisor.
      </p>
      <h3 className="text-2xl font-semibold text-green-300 mt-10 mb-5">
        Calculator or academic advisor?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If you have a question that has a number for an answer a calculator is
        great. If you have a question about degree progress or how a grade
        affects financial aid you need to talk to an advisor.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        How Accurate Are Free GPA Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-green-300 mb-5">
        How accurate is an online GPA calculator?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        An online GPA calculator is as accurate as the grading scale and
        credit hours you enter. Errors happen when a calculator assumes a 4.0
        scale. Your school uses a different scale.
      </p>
      <h3 className="text-2xl font-semibold text-green-300 mt-10 mb-5">
        Why do two GPA calculators give me different numbers?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        It is usually because of a scale mismatch. One calculator might treat
        a B+ as 3.3 and another as 3.5. Before comparing results check your
        school&apos;s grade point scale.
      </p>
    </section>
  );
}

function HowTheyWorkTogetherSection() {
  const steps = [
    "Use the Weighted Grade Calculator to see where you stand in each class.",
    "Use the Grade Calculator to see what score you need on work.",
    "Use the GPA Calculator to see your term average.",
    "Use the Final Grade Calculator to lock in what you need on each exam.",
    "Roll that GPA into the CGPA Calculator to update your average.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        How These Calculators Work Together
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        These calculators build on each other over the course of a semester.
        Here is a sensible order to use them:
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
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Let us say you are taking four classes. You have an A in one class, a
        B+ in another, an A- in another, and a B in the one. On a 4.0 scale
        the GPA Calculator works out your quality points.
      </p>
      <p className="text-gray-200 text-base leading-relaxed">
        Now let us say your current grade in one class is 82%. You want to
        reach 85% overall. The Final Grade Calculator works backward to tell
        you what score you need on the exam.
      </p>
    </section>
  );
}

function TopicsSection() {
  const topics = [
    "Class rank compares your GPA to your classmates.",
    "Latin honors thresholds require a CGPA.",
    "Credit hours needed to graduate are based on your program's requirement.",
    "Percentage-to-GPA conversion is useful when a school reports grades as percentages.",
    "Academic probation and standing thresholds are usually tied to a minimum CGPA.",
    "Semester GPA vs. GPA trends show whether your performance is improving or slipping.",
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Other Academic Metrics Worth Knowing
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
      title: "Using the wrong grade point scale",
      body: "Not confirming your school's scale before trusting the output.",
    },
    {
      title: "Mixing up GPA and CGPA",
      body: "People often get GPA and CGPA mixed up. Your GPA is like a report card for one term. It shows how you did in that one term. Your CGPA on the other hand shows how you have done in all the terms you have completed so far. If you do really well in one term your GPA can go up quickly. It might not change your CGPA that much.",
    },
    {
      title: "Forgetting pass/fail courses",
      body: "Some people also forget about pass or fail courses. These are courses where you either pass or fail. They do not affect your GPA. You should check with your school to see how they handle these courses.",
    },
    {
      title: "Guessing at assignment weights",
      body: "Another mistake people make is guessing how much each assignment is worth. To calculate your grade correctly you need to know how much each assignment is worth. If you get this wrong your final grade can be wrong too. Even a small mistake can make a difference.",
    },
    {
      title: "Worrying too much about one bad grade",
      body: "People also worry much about one bad grade. If you get a grade in one course it will not hurt your CGPA that much. This is because your CGPA is based on all the courses you have taken so one bad grade will not make that much of a difference.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 border-t border-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Common Mistakes
      </h2>
      <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm">
        <ul className="space-y-5 text-gray-200 text-base leading-relaxed">
          {mistakes.map((m) => (
            <li key={m.title}>
              <strong className="text-green-300">{m.title}.</strong> {m.body}
            </li>
          ))}
        </ul>
      </div>
      {/* ── TRUST / E-E-A-T BYLINE ── */}
      <div className="flex items-center gap-4 mt-16 mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
        <div className="w-12 h-12 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
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
              className="text-green-400 hover:underline"
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
      q: "How do you calculate GPA by hand?",
      a: "Multiply each course's grade point value by its credit hours to get quality points, add up the quality points for all your courses, then divide by your total credit hours. That final number is your GPA.",
    },
    {
      q: "What is the difference between GPA and CGPA?",
      a: "GPA usually refers to your average for a single term or semester. CGPA (Cumulative GPA) is the same calculation run across every term you've completed, so it reflects your entire academic record rather than just the current one.",
    },
    {
      q: "Is a 3.5 GPA good?",
      a: "On a standard 4.0 scale, a 3.5 GPA is generally considered strong — it typically corresponds to a B+/A- average. Whether it's \"good enough\" for a specific goal depends on the context, since competitive programs and scholarships often set their own thresholds.",
    },
    {
      q: "How is weighted GPA different from unweighted GPA?",
      a: "An unweighted GPA treats every course the same, usually on a 4.0 scale. A weighted GPA gives extra points for honors, AP, or IB courses, often pushing the scale up to 5.0, to reflect that those courses are harder.",
    },
    {
      q: "How do I convert a percentage grade to GPA?",
      a: "It depends on your school's official conversion table, since schools don't all use the same cutoffs. As a common example, 90-100% often maps to a 4.0, 80-89% to a 3.0-3.9 range, and so on — but always check your institution's specific scale rather than assuming a generic one applies.",
    },
    {
      q: "Does GPA reset each semester?",
      a: "Your semester or term GPA is calculated fresh each term, but it doesn't erase anything — it simply reflects that term's courses. Your CGPA keeps accumulating across every term, so past grades continue to factor in there.",
    },
    {
      q: "What GPA do I need to get into college?",
      a: "This varies enormously by school and program, and many colleges also recalculate your GPA using their own methodology rather than accepting your transcript's number as-is. Check the specific admissions requirements for each school you're applying to rather than relying on a general benchmark.",
    },
    {
      q: "Can I raise my GPA in one semester?",
      a: "A single strong semester can raise your term GPA significantly, but its effect on your CGPA depends on how many credit hours you've already completed. The more credits already on your record, the more diluted the impact of any one term becomes.",
    },
    {
      q: "What score do I need on my final to get an A?",
      a: "That depends on your current grade and how much the final is worth. The Final Grade Calculator on this page works it out directly: enter your current grade, the final's weight, and your target grade, and it solves for the score you need.",
    },
    {
      q: "How many credit hours do I need to graduate?",
      a: "This is set by your specific degree program, not by a universal standard, and can range widely depending on the school and major. Check your degree audit or academic advisor for the exact number that applies to you.",
    },
    {
      q: "What is a passing GPA?",
      a: "Most schools set a minimum GPA (often around 2.0 on a 4.0 scale) to remain in good academic standing, though the exact threshold varies by institution and program. Falling below it can trigger academic probation rather than automatic failure.",
    },
    {
      q: "Do transfer credits count toward my CGPA?",
      a: "Often not in the way you'd expect — many schools count transfer credits toward your total credit hours but exclude the grades themselves from your CGPA calculation. Check your new school's transfer credit policy directly, since this varies a lot between institutions.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-green-500 border-b border-green-600 pb-4 mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-8">
        {faqs.map((item) => (
          <div key={item.q}>
            <h3 className="text-xl font-semibold text-green-300 mb-2">
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