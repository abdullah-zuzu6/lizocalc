"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, BarChart3 } from "lucide-react";
import Link from "next/link";

const calculators = [
  {
    name: "Mortgage Calculator",
    description:
      "Calculate monthly mortgage payments, total interest, and amortization schedules",
    href: "/calculators/financial/mortgage-calculator",
    category: "Loan",
  },
  {
    name: "Loan Calculator",
    description: "Determine loan payments, APR, and total interest costs",
    href: "/calculators/financial/loan-calculator",
    category: "Loan",
  },
  {
    name: "Auto Loan Calculator",
    description:
      "Calculate car loan payments with different terms and interest rates",
    href: "/calculators/financial/auto-loan-calculator",
    category: "Loan",
  },
  {
    name: "Interest Calculator",
    description:
      "Calculate simple and compound interest on investments and savings",
    href: "/calculators/financial/interest-calculator",
    category: "Interest",
  },
  {
    name: "Payment Calculator",
    description: "Calculate payment schedules and installment plans",
    href: "/calculators/financial/payment-calculator",
    category: "Payment",
  },
  {
    name: "Compound Interest",
    description:
      "Convert interest rates and compare APY across different compounding frequencies.",
    href: "/calculators/financial/compound-interest-calculator",
    category: "Financial",
  },
  {
    name: "Inflation Calculator",
    description:
      "Calculate the effect of inflation on purchasing power over time.",
    href: "/calculators/financial/inflation-calculator",
    category: "Financial",
  },
  {
    name: "Salary Calculator",
    description:
      "Professional tool for adjusted and unadjusted income projections.",
    href: "/calculators/financial/salary-calculator",
    category: "Financial",
  },
  {
    name: "ROI Calculator",
    description: "Calculate return on investment and annualized returns.",
    href: "/calculators/financial/roi-calculator",
    category: "Financial",
  },
];

export default function FinancialCalculators() {
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

            <BarChart3 className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-white">
              Financial Calculators
            </h1>
          </div>

          <p className="text-lg text-gray-300 mb-8">
            Manage your finances with our collection of professional
            calculators.
          </p>
        </div>
      </section>

      {/* Intro Section — goes after Hero, before search bar */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            I made these calculators because I had a problem. I was using
            financial calculators online and they weren&apos;t very good. Some
            hid their formulas or rounded numbers in ways that didn&apos;t make
            sense. They also buried the numbers I wanted under a lot of ads and
            popups.
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
                      <BarChart3 className="w-6 h-6 text-blue-400" />
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

      {/* Intro Section continued */}
      <section className="py-4 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-gray-200 leading-relaxed space-y-4 text-lg">
          <p>
            Every calculator on this page uses the formulas that lenders and
            banks actually use for their work, including mortgage, loan, auto
            loan, interest, payment, compound interest, inflation, salary, and
            ROI calculators, among others. They rely on standard loan and
            mortgage math, along with proper compounding for interest and
            savings growth. I didn&apos;t simplify the math to make it easier to
            code &mdash; if you use the numbers from your bank&apos;s paperwork,
            the results should match.
          </p>
          <p>
            However, these calculators are tools, not advice. They can answer
            &ldquo;what happens if&rdquo; questions &mdash; for example, what a
            mortgage will really cost after 30 years, or what a loan&apos;s real
            APR is once fees are included. For things like taxes or long-term
            planning, talk to a licensed professional.
          </p>
        </div>
      </section>

      {/* How To Choose Section — goes after Search/Grid section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How to Choose the Right Financial Calculator
        </h2>
        <p className="text-gray-200 leading-relaxed mb-6 text-base">
          To choose the right calculator, you need to know what you&apos;re
          looking for. Here&apos;s a quick guide:
        </p>
        <div className="bg-gray-800/50 p-7 rounded-2xl border border-gray-700 shadow-sm mb-6">
          <ul className="space-y-4 text-gray-200 list-disc list-inside text-base leading-relaxed">
            <li>
              If you&apos;re buying a home or comparing loan terms, use the{" "}
              <Link
                href="/calculators/financial/mortgage-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Mortgage Calculator</strong>
              </Link>
            </li>
            <li>
              If you&apos;re comparing loan offers, use the{" "}
              <Link
                href="/calculators/financial/loan-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Loan Calculator</strong>.
              </Link>
            </li>
            <li>
              If you&apos;re financing a car and want to manage your auto loan
              easily, use the{" "}
              <Link
                href="/calculators/financial/auto-loan-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Auto Loan Calculator</strong>.
              </Link>
            </li>
            <li>
              If you want to know the interest on savings or a remaining loan
              balance, use the{" "}
              <Link
                href="/calculators/financial/interest-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Interest Calculator</strong>.
              </Link>
            </li>
            <li>
              If you want to work out a payment schedule, use the{" "}
              <Link
                href="/calculators/financial/payment-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Payment Calculator</strong>.
              </Link>
            </li>
            <li>
              If you want to know how much your savings or investments will grow
              over time, use the{" "}
              <Link
                href="/calculators/financial/compound-interest-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">
                  {" "}
                  Compound Interest Calculator
                </strong>
                .
              </Link>
            </li>
            <li>
              If you want to know what money will be worth in the future, use
              the{" "}
              <Link
                href="/calculators/financial/inflation-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Inflation Calculator</strong>.
              </Link>
            </li>
            <li>
              If you want to compare your gross pay to your take-home pay, use
              the{" "}
              <Link
                href="/calculators/financial/salary-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">Salary Calculator</strong>.
              </Link>
            </li>
            <li>
              <Link
                href="/calculators/financial/roi-calculator"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                <strong className="text-blue-300">ROI Calculator</strong>.
              </Link>
              If you want to know whether an investment paid off, use the{" "}
            </li>
          </ul>
        </div>
        <p className="text-gray-300 italic text-base leading-relaxed">
          Not sure which one fits? Try the Loan Calculator and the Interest
          Calculator side by side &mdash; comparing both can help you decide
          faster.
        </p>
      </section>

      <WorthUsingSection />
      <AccuracySection />
      <WorkedExampleSection />
      <CommonMistakesSection />
      <FAQSection />

      <Footer />
    </main>
  );
}

// ---------- REMAINING CONTENT SECTIONS ----------

function WorthUsingSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Are Financial Calculators Still Worth Using?
      </h2>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        Are financial calculators useful in 2026?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Yes &mdash; arguably more useful than ever. The apps look nicer, but the
        underlying question hasn&apos;t changed: what&apos;s the output for this
        input? A calculator answers that in seconds, using a formula you can
        verify yourself.
      </p>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Where calculators fall short is judgment. They can&apos;t tell you how
        much risk you can tolerate when deciding between paying off debt or
        investing &mdash; that&apos;s where a financial planner comes in.
      </p>
      <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
        Do you need a calculator or a financial planner?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        If your question has a numeric answer &mdash; &ldquo;what&apos;s my
        monthly payment&rdquo; or &ldquo;how much interest will I pay&rdquo;
        &mdash; a calculator gives you that instantly and for free. If it
        depends on personal circumstances, like retirement timing or tax
        strategy, you need a planner. Most people benefit from both: run the
        numbers yourself, then talk it through with a planner.
      </p>
    </section>
  );
}

function AccuracySection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        How Accurate Are Free Online Calculators?
      </h2>
      <h3 className="text-2xl font-semibold text-blue-300 mb-5">
        How accurate are free financial calculators?
      </h3>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Worth asking before trusting any number on a website. Accuracy comes
        down to whether a calculator uses the correct formula, not whether
        it&apos;s free or paid. A mortgage calculator built on proper
        amortization math will match your bank&apos;s amortization schedule.
        Free tools usually go wrong by rounding interest rates incorrectly or
        ignoring compounding frequency. Every calculator on this site states its
        compounding assumption directly on the page.
      </p>
      <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-5">
        Why do different calculators give different answers for the same
        numbers?
      </h3>
      <p className="text-gray-200 text-base leading-relaxed">
        Usually hidden assumptions. Two tools might disagree on the same
        investment question because one compounds annually and the other
        monthly. Before comparing results across tools, check what each one
        assumes about compounding frequency and whether inflation is included.
        If those match and the answers still differ, one of the tools has an
        error.
      </p>
    </section>
  );
}

function WorkedExampleSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
        Worked Example
      </h2>
      <p className="mb-6 text-gray-200 text-base leading-relaxed">
        Let&apos;s compare a 30-year vs. 15-year mortgage. Say you&apos;re
        financing $300,000 at a 6.5% interest rate. Running that through the
        Mortgage Calculator gives you:
      </p>
      <div className="overflow-x-auto mb-8">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left font-semibold">Term</th>
              <th className="p-4 text-left font-semibold">Monthly Payment</th>
              <th className="p-4 text-left font-semibold">
                Total Interest Paid
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            <tr>
              <td className="p-4">30-year</td>
              <td className="p-4">$1,896.20</td>
              <td className="p-4">$382,633</td>
            </tr>
            <tr>
              <td className="p-4">15-year</td>
              <td className="p-4">$2,613.32</td>
              <td className="p-4">$170,398</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-gray-200 text-base leading-relaxed">
        The 15-year payment runs about $717 more per month, but it saves roughly
        $212,235 in interest over the life of the loan &mdash; a difference
        that&apos;s easy to miss if you&apos;re only looking at the monthly
        payment. Whether the shorter term makes sense depends on whether your
        budget can absorb the higher payment without cutting into savings or
        your emergency fund. That&apos;s a judgment call the calculator
        can&apos;t make for you.
      </p>
    </section>
  );
}

function CommonMistakesSection() {
  const mistakes = [
    {
      title: "Ignoring fees and closing costs",
      body: 'A loan or mortgage calculator shows principal and interest, not origination fees or closing costs. Check whether you\'re looking at the "sticker" payment or the fully loaded one.',
    },
    {
      title: "Mixing up effective interest rates",
      body: "A 6% rate compounded monthly isn't the same as 6% compounded annually. The Compound Interest Calculator can show you the difference.",
    },
    {
      title: "Treating a projection as a guarantee",
      body: "An ROI or investment growth number assumes a fixed rate for the entire period. Real returns move around year to year, so treat the output as an estimate, not a prediction.",
    },
    {
      title: "Forgetting inflation on long-term numbers",
      body: "$50,000 in 20 years won't buy what $50,000 buys today. Run any long-term goal through the Inflation Calculator alongside your main calculation.",
    },
    {
      title: "Using gross salary instead of net",
      body: "When budgeting off the Salary Calculator, it's the take-home number after tax withholding that matters for monthly planning, not the headline salary figure.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
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
      q: "Is a financial calculator, like a TI-84 or HP, still worth buying?",
      a: "For most people, no. A web-based calculator does the math instantly and for free. Physical financial calculators still matter for people pursuing specific professional certifications like the CFP exam. For everyday budgeting, loan, or savings questions, an online tool is faster and just as accurate.",
    },
    {
      q: "Should I use a spreadsheet or a calculator?",
      a: "It depends on what you want to do. Spreadsheets are more flexible for testing scenarios or tracking something over time. A calculator is faster when you just need an answer. Many people use both: a calculator to check a number and a spreadsheet to track it over time.",
    },
    {
      q: "How much will $10,000 be worth in 20 years?",
      a: "It depends on the growth rate and compounding frequency. At 7% per year compounded annually, $10,000 grows to about $38,700 in 20 years. Use the Compound Interest Calculator to test your own numbers.",
    },
    {
      q: "What is the difference between a loan calculator and a payment calculator?",
      a: "A loan calculator shows the full picture of a loan: the amount borrowed, interest rate, term, and total interest. A payment calculator breaks an amount down into smaller payments, useful for things like payment plans and financed purchases.",
    },
    {
      q: "Do these calculators account for taxes?",
      a: "The Salary Calculator includes tax withholding to estimate take-home pay. The other calculators, like the mortgage and loan calculators, do the math without taxes since tax situations vary by person. Talk to a tax professional for tax-specific questions.",
    },
    {
      q: "Why does my bank's mortgage payment estimate differ from this calculator?",
      a: "The difference usually comes from added costs like property tax escrow, PMI, or HOA fees that the calculator doesn't include. The base principal-and-interest number should match; the bank adds other costs on top.",
    },
    {
      q: "How often should I recheck these numbers?",
      a: "Recheck anytime your interest rate, term, or loan amount changes. It's also worth rechecking your loan and mortgage numbers whenever interest rates shift, since that can affect refinancing options.",
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
            <p className="text-gray-200 text-base leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
