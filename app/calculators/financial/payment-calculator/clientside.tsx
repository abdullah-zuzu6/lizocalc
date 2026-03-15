"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Hash,
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  CheckCircle2,
  Receipt,
  Landmark,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function PaymentCalculator() {
  const [totalAmount, setTotalAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(1);
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const totalPeriods = years * 12 + months;

  const relatedCalculators = [
    {
      name: "Interest Calculator",
      description: "Compound interest solver",
      href: "/calculator/interest",
      icon: BarChart3,
    },
    {
      name: "Loan Calculator",
      description: "Calculate loan payments",
      href: "/calculator/loan",
      icon: Receipt,
    },
    {
      name: "LCM Calculator",
      description: "Find common multiples",
      href: "/calculators/math/lcm",
      icon: Hash,
    },
  ];

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["payment-adv"]?.data) {
      const d = history["payment-adv"].data;
      setTotalAmount(d.totalAmount || 10000);
      setYears(d.years || 1);
      setMonths(d.months || 0);
      setInterestRate(d.interestRate || 0);
      setCurrency(d.currency || "USD");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("payment-adv", {
      totalAmount,
      years,
      months,
      interestRate,
      currency,
    });
  }, [totalAmount, years, months, interestRate, currency, isMounted]);

  const schedule = useMemo(() => {
    if (!showResults || totalPeriods <= 0) return [];

    let balance = totalAmount;
    const monthlyRate = interestRate / 100 / 12;
    const pmt =
      interestRate > 0
        ? (totalAmount *
            (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods))) /
          (Math.pow(1 + monthlyRate, totalPeriods) - 1)
        : totalAmount / totalPeriods;

    const fullSchedule = Array.from({ length: totalPeriods }, (_, i) => {
      const interest = balance * monthlyRate;
      const principal = pmt - interest;
      balance -= principal;
      return {
        period: i + 1,
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        remaining: Math.max(0, balance).toFixed(2),
      };
    });

    if (viewMode === "monthly") return fullSchedule;

    const yearly: any[] = [];
    for (let i = 0; i < fullSchedule.length; i += 12) {
      const chunk = fullSchedule.slice(i, i + 12);
      yearly.push({
        period: Math.floor(i / 12) + 1,
        interest: chunk
          .reduce((acc, c) => acc + parseFloat(c.interest), 0)
          .toFixed(2),
        principal: chunk
          .reduce((acc, c) => acc + parseFloat(c.principal), 0)
          .toFixed(2),
        remaining: chunk[chunk.length - 1].remaining,
      });
    }
    return yearly;
  }, [totalAmount, totalPeriods, interestRate, showResults, viewMode]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium">Currency Code</label>
                  <input
                    maxLength={3}
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                    className="w-full mt-1 p-3 bg-secondary rounded-md border uppercase font-bold"
                    placeholder="USD"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Total Amount</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(Number(e.target.value))}
                    className="w-full mt-1 p-3 bg-secondary rounded-md border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Years</label>
                    <input
                      type="number"
                      min="0"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-secondary rounded-md border"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Months</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full mt-1 p-2 bg-secondary rounded-md border"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Annual Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full mt-1 p-3 bg-secondary rounded-md border"
                  />
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold"
                  >
                    Calculate
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setYears(1);
                      setMonths(0);
                      setTotalAmount(10000);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md text-xs"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults ? (
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center">
                  <h3 className="font-bold">
                    Amortization Table ({totalPeriods} periods)
                  </h3>
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value as any)}
                    className="bg-secondary p-2 rounded text-xs font-bold"
                  >
                    <option value="monthly">Monthly View</option>
                    <option value="yearly">Yearly View</option>
                  </select>
                </div>
                <div className="overflow-y-auto max-h-[400px]">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-secondary/50 text-muted-foreground uppercase text-[10px] sticky top-0 z-10">
                      <tr>
                        <th className="p-4">
                          {viewMode === "monthly" ? "Month" : "Year"}
                        </th>
                        <th className="p-4">Principal</th>
                        <th className="p-4">Interest</th>
                        <th className="p-4">Remaining</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schedule.map((row) => (
                        <tr key={row.period} className="border-t">
                          <td className="p-4 font-bold">{row.period}</td>
                          <td className="p-4">
                            {row.principal} {currency}
                          </td>
                          <td className="p-4">
                            {row.interest} {currency}
                          </td>
                          <td className="p-4 font-mono">
                            {row.remaining} {currency}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
                Adjust parameters and calculate to view schedule
              </div>
            )}

            
          </div>
        </div>
        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}
