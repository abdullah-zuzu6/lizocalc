"use client";

import { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  CheckCircle2,
  Receipt,
  Heart,
  TrendingUp,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function PaymentCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // --- Input States ---
  const [totalAmount, setTotalAmount] = useState<number>(10000);
  const [years, setYears] = useState<number>(1);
  const [months, setMonths] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [currency, setCurrency] = useState<string>("USD");
  const [viewMode, setViewMode] = useState<"monthly" | "yearly">("monthly");

  const totalPeriods = years * 12 + months;

  const calculatorInfo = {
    name: "Payment Calculator",
    href: "/calculators/financial/payment-calculator",
    category: "Financial",
  };

  // --- Initialize & Load ---
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
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-save on change ---
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

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Amortization Logic ---
  const { schedule, summary } = useMemo(() => {
    if (!showResults || totalPeriods <= 0) return { schedule: [], summary: null };

    let balance = totalAmount;
    const monthlyRate = interestRate / 100 / 12;
    const pmt =
      interestRate > 0
        ? (totalAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPeriods))) /
          (Math.pow(1 + monthlyRate, totalPeriods) - 1)
        : totalAmount / totalPeriods;

    const fullSchedule = Array.from({ length: totalPeriods }, (_, i) => {
      const interest = balance * monthlyRate;
      const principal = pmt - interest;
      balance -= principal;
      return {
        period: i + 1,
        interest: interest,
        principal: principal,
        remaining: Math.max(0, balance),
      };
    });

    const totalPaid = pmt * totalPeriods;
    const totalInterest = totalPaid - totalAmount;

    const displaySchedule = viewMode === "monthly" 
      ? fullSchedule 
      : Array.from({ length: Math.ceil(totalPeriods / 12) }, (_, i) => {
          const chunk = fullSchedule.slice(i * 12, (i + 1) * 12);
          return {
            period: i + 1,
            interest: chunk.reduce((acc, c) => acc + c.interest, 0),
            principal: chunk.reduce((acc, c) => acc + c.principal, 0),
            remaining: chunk[chunk.length - 1].remaining,
          };
        });

    return {
      schedule: displaySchedule,
      summary: {
        monthlyPayment: pmt.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        totalCost: totalPaid.toFixed(2),
      }
    };
  }, [totalAmount, totalPeriods, interestRate, showResults, viewMode]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Currency</label>
                    <input
                      maxLength={3}
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-black text-center focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Principal Amount</label>
                    <input
                      type="number"
                      value={totalAmount}
                      onChange={(e) => setTotalAmount(Number(e.target.value))}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Duration (Years)</label>
                    <input
                      type="number"
                      min="0"
                      value={years}
                      onChange={(e) => setYears(Number(e.target.value))}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Months</label>
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Annual Interest Rate (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                  />
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate Payment <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setYears(1);
                      setMonths(0);
                      setTotalAmount(10000);
                      setInterestRate(0);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && summary ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Monthly Payment</p>
                    <h2 className="text-3xl font-black text-blue-600">{currency} {summary.monthlyPayment}</h2>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Interest</p>
                    <h2 className="text-3xl font-black text-foreground">{currency} {summary.totalInterest}</h2>
                  </div>
                  <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Total Cost</p>
                    <h2 className="text-3xl font-black text-foreground">{currency} {summary.totalCost}</h2>
                  </div>
                </div>

                <div className="bg-card border rounded-xl overflow-hidden shadow-sm transition-all duration-500">
                  <div className="p-4 border-b bg-secondary/20 flex justify-between items-center">
                    <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
                      <TrendingUp size={14} className="text-blue-600" /> Amortization Table
                    </h3>
                    <select
                      value={viewMode}
                      onChange={(e) => setViewMode(e.target.value as any)}
                      className="bg-background border px-3 py-1.5 rounded-lg text-[10px] font-black uppercase outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="monthly">Monthly View</option>
                      <option value="yearly">Yearly View</option>
                    </select>
                  </div>
                  <div className="overflow-y-auto max-h-[450px]">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-secondary/50 text-[10px] font-black uppercase text-muted-foreground sticky top-0 z-10">
                        <tr>
                          <th className="p-4">{viewMode === "monthly" ? "Month" : "Year"}</th>
                          <th className="p-4 text-right">Principal</th>
                          <th className="p-4 text-right">Interest</th>
                          <th className="p-4 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {schedule.map((row) => (
                          <tr key={row.period} className="border-t hover:bg-secondary/10 transition-colors">
                            <td className="p-4 font-black text-blue-600">{row.period}</td>
                            <td className="p-4 text-right font-medium">{row.principal.toFixed(2)}</td>
                            <td className="p-4 text-right text-muted-foreground">{row.interest.toFixed(2)}</td>
                            <td className="p-4 text-right font-mono font-bold">{row.remaining.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                <Receipt size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Calculate to generate amortization schedule</p>
              </div>
            )}

            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Info size={20} className="text-blue-600" /> How Payments are Structured
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Amortization is the process of spreading out a loan into a series of fixed payments. At the beginning of the term, a higher percentage of your payment goes toward **interest**. As the balance decreases, more of your payment is applied to the **principal**.
              </p>
              <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-3 text-center tracking-widest">Standard Amortization Formula</p>
               <div className="text-lg font-mono text-center text-blue-600 font-bold overflow-x-auto">
  {"$$ A = P \\frac{r(1+r)^n}{(1+r)^n - 1} $$"}
</div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "Interest Calculator", description: "Compound interest solver", href: "/calculators/financial/interest-calculator", icon: BarChart3 },
          { name: "Loan Calculator", description: "Quick loan breakdown", href: "/calculators/financial/loan-calculator", icon: Receipt },
        ]} />
      </section>
    </main>
  );
}