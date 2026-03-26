"use client";

import { useState, useEffect } from "react";
import {
  RotateCcw,
  Car,
  TrendingUp,
  DollarSign,
  Calendar,
  Heart,
  PieChart,
  Wallet,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function AutoLoanCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // --- States ---
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(6000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(5);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Auto Loan Calculator",
    href: "/calculators/financial/auto-loan-calculator",
    category: "Financial",
  };

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();

    if (history["auto-loan-calc"]?.data) {
      const d = history["auto-loan-calc"].data;
      setVehiclePrice(d.vehiclePrice || 30000);
      setDownPayment(d.downPayment || 6000);
      setInterestRate(d.interestRate || 6.5);
      setLoanTerm(d.loanTerm || 5);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Auto-Save to History ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("auto-loan-calc", {
      vehiclePrice,
      downPayment,
      interestRate,
      loanTerm,
    });
  }, [vehiclePrice, downPayment, interestRate, loanTerm, isMounted]);

  // --- Calculation Engine ---
  const principal = Math.max(0, vehiclePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  const monthlyPayment =
    monthlyRate === 0
      ? principal / numberOfPayments
      : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPaid = monthlyPayment * numberOfPayments;
  const totalInterest = Math.max(0, totalPaid - principal);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-[2rem] border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Car className="text-blue-600" size={22} /> Parameters
              </h2>

              <div className="space-y-8">
                {[
                  { label: "Vehicle Price", val: vehiclePrice, set: setVehiclePrice, min: 5000, max: 150000, step: 500, prefix: "$" },
                  { label: "Down Payment", val: downPayment, set: setDownPayment, min: 0, max: vehiclePrice, step: 100, prefix: "$" },
                  { label: "Interest Rate", val: interestRate, set: setInterestRate, min: 0.1, max: 25, step: 0.1, suffix: "%" },
                  { label: "Loan Term", val: loanTerm, set: setLoanTerm, min: 1, max: 10, step: 1, suffix: " Years" },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        {item.label}
                      </label>
                      <div className="flex items-center gap-1 font-black text-blue-600 text-sm">
                        {item.prefix}{item.val}{item.suffix}
                      </div>
                    </div>
                    <input
                      type="range"
                      min={item.min}
                      max={item.max}
                      step={item.step}
                      value={item.val}
                      onChange={(e) => item.set(Number(e.target.value))}
                      className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="relative">
                      <input
                        type="number"
                        value={item.val}
                        onChange={(e) => item.set(Number(e.target.value))}
                        className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                      />
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setVehiclePrice(30000);
                      setDownPayment(6000);
                      setInterestRate(6.5);
                      setLoanTerm(5);
                    }}
                    className="w-full py-3 bg-secondary text-muted-foreground rounded-2xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Monthly Payment", val: monthlyPayment, color: "text-blue-600", icon: Wallet },
                { label: "Total Interest", val: totalInterest, color: "text-amber-500", icon: TrendingUp },
                { label: "Total Paid", val: totalPaid, color: "text-emerald-500", icon: DollarSign },
              ].map((res, i) => (
                <div key={i} className="bg-card border rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                  <res.icon className={`absolute -right-2 -top-2 w-16 h-16 opacity-5 group-hover:opacity-10 transition-opacity ${res.color}`} />
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-3">
                    {res.label}
                  </p>
                  <h3 className={`text-3xl font-black ${res.color} tracking-tight`}>
                    ${res.val.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </h3>
                  <p className="text-[10px] font-bold text-muted-foreground mt-1">
                    ${res.val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SUMMARY CARD */}
              <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
                <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-8 tracking-[0.2em] flex items-center gap-2">
                  <PieChart size={16} className="text-blue-500" /> Payment Breakdown
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-2xl border border-transparent hover:border-blue-500/10 transition-colors">
                    <span className="text-sm font-bold">Principal Amount</span>
                    <span className="font-black text-foreground">${principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-2xl border border-transparent hover:border-blue-500/10 transition-colors">
                    <span className="text-sm font-bold">Loan Duration</span>
                    <span className="font-black text-foreground">{numberOfPayments} <span className="text-[10px] text-muted-foreground ml-1 uppercase">months</span></span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-2xl border border-transparent hover:border-blue-500/10 transition-colors">
                    <span className="text-sm font-bold">Interest Percentage</span>
                    <span className="font-black text-amber-500">
                      {((totalInterest / totalPaid) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* INFO CARD */}
              <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-center">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Info size={14} className="text-blue-600" /> Pro Tip
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Increasing your down payment by even <span className="font-bold text-foreground">$1,000</span> can significantly reduce your total interest paid over the life of the loan.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-dashed">
                    <p className="text-[10px] font-bold text-muted-foreground leading-loose italic">
                      Calculations are based on fixed-rate amortized loans and do not include taxes, title, or registration fees which vary by location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "Loan Calculator",
              description: "Personal loan payments",
              href: "/calculators/financial/loan-calculator",
              icon: DollarSign,
            },
            {
              name: "Mortgage Calculator",
              description: "Home financing",
              href: "/calculators/financial/mortgage-calculator",
              icon: Calendar,
            },
          ]}
        />
      </section>
    </main>
  );
}

const Info = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);