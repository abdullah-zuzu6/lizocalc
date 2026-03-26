"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  RotateCcw, 
  ListFilter, 
  CheckCircle2, 
  Layers, 
  Heart, 
  Info,
  ArrowRight
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function FractionCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // --- Input States ---
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "div">("add");

  const calculatorInfo = {
    name: "Fraction Calculator",
    href: "/calculators/math/fraction-calculator",
    category: "Mathematics",
  };

  const gcd = (a: number, b: number): number => (!b ? Math.abs(a) : gcd(b, a % b));

  const simplify = (n: number, d: number) => {
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  };

  // --- Initialize & Load ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["fraction-calc"]?.data) {
      const data = history["fraction-calc"].data;
      setNum1(data.num1 ?? 1);
      setDen1(data.den1 ?? 2);
      setNum2(data.num2 ?? 1);
      setDen2(data.den2 ?? 3);
      setOperation(data.operation ?? "add");
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("fraction-calc", { num1, den1, num2, den2, operation });
  }, [num1, den1, num2, den2, operation, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    let n = 0;
    let d = 1;

    switch (operation) {
      case "add":
        n = num1 * den2 + num2 * den1;
        d = den1 * den2;
        break;
      case "sub":
        n = num1 * den2 - num2 * den1;
        d = den1 * den2;
        break;
      case "mul":
        n = num1 * num2;
        d = den1 * den2;
        break;
      case "div":
        n = num1 * den2;
        d = den1 * num2;
        break;
    }

    if (d === 0) return null;
    const simplified = simplify(n, d);
    return {
      numerator: simplified.n,
      denominator: simplified.d,
      decimal: simplified.n / simplified.d,
    };
  }, [num1, den1, num2, den2, operation]);

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

              <div className="space-y-6">
                {/* FRACTION 1 */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block ml-1">Fraction 1</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => { setNum1(Number(e.target.value)); setShowResults(false); }}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="h-px w-4 bg-border shrink-0" />
                    <input
                      type="number"
                      value={den1}
                      onChange={(e) => { setDen1(Number(e.target.value)); setShowResults(false); }}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* OPERATION SELECTOR */}
                <div className="flex justify-center py-2">
                  <select
                    value={operation}
                    onChange={(e) => { setOperation(e.target.value as any); setShowResults(false); }}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer outline-none ring-4 ring-blue-500/10"
                  >
                    <option value="add">Addition (+)</option>
                    <option value="sub">Subtraction (-)</option>
                    <option value="mul">Multiplication (×)</option>
                    <option value="div">Division (÷)</option>
                  </select>
                </div>

                {/* FRACTION 2 */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block ml-1">Fraction 2</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => { setNum2(Number(e.target.value)); setShowResults(false); }}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="h-px w-4 bg-border shrink-0" />
                    <input
                      type="number"
                      value={den2}
                      onChange={(e) => { setDen2(Number(e.target.value)); setShowResults(false); }}
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate Result <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => { setShowResults(false); setNum1(1); setDen1(2); setNum2(1); setDen2(3); setOperation("add"); }}
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
            {showResults && results ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="bg-card border rounded-xl p-8 text-center shadow-sm relative overflow-hidden">
                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-4">Simplified Result</p>
                  
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="text-4xl font-black text-foreground opacity-40">
                      {num1}/{den1} {operation === "add" ? "+" : operation === "sub" ? "-" : operation === "mul" ? "×" : "÷"} {num2}/{den2}
                    </div>
                    <ArrowRight className="text-blue-500" size={24} />
                    <div className="flex flex-col items-center">
                      <span className="text-6xl font-black text-blue-600 tracking-tighter">{results.numerator}</span>
                      <div className="h-1.5 w-full bg-blue-600 rounded-full my-1" />
                      <span className="text-6xl font-black text-blue-600 tracking-tighter">{results.denominator}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-xs font-bold text-muted-foreground">
                    Decimal Equivalent: <span className="text-foreground">{results.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                  </div>
                </div>

                {/* STEP BY STEP EXPLANATION */}
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                    <Info size={20} className="text-blue-600" /> Mathematical Process
                  </h3>
                  <div className="bg-secondary/30 p-6 rounded-xl border border-border">
                    <p className="text-[10px] font-black text-muted-foreground uppercase mb-4 text-center tracking-widest">General Formula Used</p>
                    <div className="text-lg font-mono text-center text-blue-600 font-bold overflow-x-auto py-2">
                      {operation === "add" && ("$$\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}$$")}
                      {operation === "sub" && ("$$\\frac{a}{b} - \\frac{c}{d} = \\frac{ad - bc}{bd}$$")}
                      {operation === "mul" && ("$$\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}$$")}
                      {operation === "div" && ("$$\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\times d}{b \\times c}$$")}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                <Layers size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Compute fractions with step-by-step logic</p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "LCM Calculator", description: "Find Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: Layers },
          { name: "GCF Calculator", description: "Greatest Common Factor", href: "/calculators/math/gcf-calculator", icon: Layers },
        ]} />
      </section>
    </main>
  );
}