"use client";

import { useState, useMemo } from "react";
import NoPrefetchLink from "@/components/NoPrefetchLink";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, ArrowLeft, BarChart3 } from "lucide-react";

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
    name: "401k Calculator",
    description: "Calculate 401k contributions and retirement savings",
    href: "/calculators/financial/401k-calculator",
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
  {
    name: "Credit Card Calculator",
    description:
      "Calculate credit card payments, interest charges, and payoff timelines.",
    href: "/calculators/financial/credit-card-calculator",
    category: "Financial",
  },
  {
    name: "Sales Tax Calculator",
    description: "Calculate sales tax amounts and total costs",
    href: "/calculators/financial/sales-tax-calculator",
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
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            {/* Back Button */}
            <NoPrefetchLink
              href="/"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </NoPrefetchLink>

            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold">Financial Calculators</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Manage your finances with our collection of professional
            calculators.
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <NoPrefetchLink key={calc.href} href={calc.href}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-blue-600/10">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                    </div>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {calc.description}
                  </p>
                </div>
              </NoPrefetchLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No calculators found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

