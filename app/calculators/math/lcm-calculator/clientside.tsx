"use client";

import { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  TrendingDown,
  Layers,
  CheckCircle2,
  Heart,
  Hash,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

type LCMResult = {
  lcm: number;
  numbers: number[];
  primeFactors: { [key: number]: string };
};

export default function LCMCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // --- Input States ---
  const [inputValues, setInputValues] = useState<string>("12, 18, 24");

  const calculatorInfo = {
    name: "LCM Calculator",
    href: "/calculators/math/lcm-calculator",
    category: "Mathematics",
  };

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => (!b ? Math.abs(a) : getGCD(b, a % b));
  const getLCM = (a: number, b: number): number =>
    a === 0 || b === 0 ? 0 : Math.abs(a * b) / getGCD(a, b);

  const getPrimeFactors = (n: number) => {
    const factors: { [key: number]: number } = {};
    let d = 2;
    let temp = Math.abs(n);
    while (temp >= 2) {
      if (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1;
        temp /= d;
      } else {
        d++;
      }
    }
    return factors;
  };

  // --- Initialize & Load ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["lcm-calc"]?.data) {
      setInputValues(history["lcm-calc"].data.inputValues || "12, 18, 24");
      setTrigger(1);
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("lcm-calc", { inputValues });
  }, [inputValues, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const results = useMemo((): LCMResult | { error: string } | null => {
    if (trigger === 0) return null;

    const nums = inputValues
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n !== 0);

    if (nums.length < 2) return { error: "Please enter at least two numbers." };

    try {
      const finalLCM = nums.reduce((acc, curr) => getLCM(acc, curr));

      const factorMap: { [key: number]: string } = {};
      nums.forEach((n) => {
        const factors = getPrimeFactors(n);
        factorMap[n] = Object.entries(factors)
          .map(([base, exp]) => `${base}${exp > 1 ? `^${exp}` : ""}`)
          .join(" × ");
      });

      return {
        lcm: finalLCM,
        numbers: nums,
        primeFactors: factorMap,
      };
    } catch (e) {
      return { error: "Calculation error. Numbers may be too large." };
    }
  }, [trigger, inputValues]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
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
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Number Set (Comma Separated)
                  </label>
                  <textarea
                    value={inputValues}
                    onChange={(e) => {
                      setInputValues(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-4 py-4 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 outline-none transition-all font-bold text-lg min-h-[120px] resize-none"
                    placeholder="12, 18, 24..."
                  />
                  <p className="text-[10px] text-muted-foreground uppercase mt-3 tracking-widest text-center">
                    Enter positive or negative integers
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Find LCM <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setInputValues("");
                      setShowResults(false);
                      setTrigger(0);
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
            {showResults && results && !("error" in results) ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-8 flex flex-col justify-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Hash size={120} strokeWidth={3} />
                    </div>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Least Common Multiple
                    </p>
                    <h2 className="text-5xl md:text-7xl font-black text-blue-600 tracking-tighter leading-none break-all">
                      {results.lcm.toLocaleString()}
                    </h2>
                  </div>

                  <div className="bg-card border rounded-xl p-6 shadow-sm flex flex-col">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-4 tracking-[0.2em] flex items-center gap-2">
                      <TrendingDown size={14} className="text-blue-500" /> Prime Factorization
                    </h3>
                    <div className="space-y-2 overflow-auto max-h-[180px] pr-2 custom-scrollbar">
                      {Object.entries(results.primeFactors).map(([num, factors]) => (
                        <div
                          key={num}
                          className="flex justify-between items-center p-3 bg-secondary/30 rounded-lg border border-border/50 group hover:border-blue-200 transition-colors"
                        >
                          <span className="text-sm font-black text-foreground">{num}</span>
                          <span className="text-xs font-mono text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">
                            {factors}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Items Count", value: results.numbers.length },
                    { label: "Smallest In Set", value: Math.min(...results.numbers) },
                    { label: "Largest In Set", value: Math.max(...results.numbers) },
                    { label: "Algorithm", value: "GCD/LCM" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-secondary/20 p-4 rounded-xl border border-border/50 text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[350px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                {"error" in (results || {}) ? (
                  <div className="text-center px-6">
                    <Info size={40} className="mx-auto text-red-400 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-red-500">
                      {(results as any).error}
                    </p>
                  </div>
                ) : (
                  <>
                    <Layers size={48} className="opacity-10 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest">
                      Input your numbers to find the common multiple
                    </p>
                  </>
                )}
              </div>
            )}

            {/* LEARNING CONTENT */}
            <div className="bg-card border rounded-xl p-8 shadow-sm">
              <h3 className="font-black text-xl mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" /> Understanding LCM
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                The Least Common Multiple is the smallest number that is a multiple of two or more numbers. 
                For example, the LCM of 3 and 4 is 12 because 12 is the first number that appears in both 
                of their multiplication tables.
              </p>
              
              

              <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                <p className="text-[10px] font-black text-muted-foreground uppercase mb-4 text-center tracking-widest">
                  The Relation Formula
                </p>
                <div className="text-lg font-mono text-center text-blue-600 font-bold overflow-x-auto py-2">
                  {"$$ LCM(a, b) = \\frac{|a \\cdot b|}{GCD(a, b)} $$"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "GCF Calculator", description: "Find Greatest Common Factor", href: "/calculators/math/gcf-calculator", icon: Layers },
          { name: "Fraction Calculator", description: "Simplify & solve fractions", href: "/calculators/math/fraction-calculator", icon: Hash },
        ]} />
      </section>
    </main>
  );
}