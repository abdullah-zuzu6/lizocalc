"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Ruler,
  RotateCcw,
  Info,
  ListFilter,
  Triangle as TriangleIcon,
  CheckCircle2,
  Square,
  BarChart3,
  ChevronRight,
  Heart,
  Calculator,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

// --- Types ---
type CalcResult = {
  a: string;
  b: string;
  c: string;
  solvingFor: string;
  area: string;
  steps: string[];
};

export default function PythagoreanCalculator() {
  const [sideA, setSideA] = useState<string>("3");
  const [sideB, setSideB] = useState<string>("4");
  const [sideC, setSideC] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const calculatorInfo = {
    name: "Pythagorean Calculator",
    href: "/calculators/math/pythagorean-calculator",
    category: "Math",
  };

  const relatedCalculators = [
    {
      name: "Triangle Calculator",
      description: "Solve for non-right triangles",
      href: "/calculators/math/triangle-calculator",
      icon: TriangleIcon,
    },
    {
      name: "GCF Calculator",
      description: "Greatest Common Factor",
      href: "/calculators/math/gcf-calculator",
      icon: ListFilter,
    },
  ];

  // --- Persistence & Saved Status ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["pythag-calc"]?.data) {
      const data = history["pythag-calc"].data;
      setSideA(data.sideA || "");
      setSideB(data.sideB || "");
      setSideC(data.sideC || "");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const results = useMemo((): CalcResult | { error: string } | null => {
    if (trigger === 0) return null;
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const inputs = [a, b, c].filter((x) => x > 0).length;

    if (inputs < 2) return { error: "Please enter any two sides to calculate the third." };
    if (inputs === 3) return { error: "Leave one field empty to solve for that side." };

    if (c > 0 && b > 0 && a === 0) {
      if (c <= b) return { error: "Hypotenuse (C) must be longer than Side B." };
      const calcA = Math.sqrt(c ** 2 - b ** 2);
      return {
        a: calcA.toFixed(2), b: b.toFixed(2), c: c.toFixed(2),
        solvingFor: "Side A",
        area: (0.5 * calcA * b).toFixed(2),
        steps: [`a² + ${b}² = ${c}²`, `a² = ${c ** 2} - ${b ** 2}`, `a = √${(c ** 2 - b ** 2).toFixed(2)}`],
      };
    }
    if (c > 0 && a > 0 && b === 0) {
      if (c <= a) return { error: "Hypotenuse (C) must be longer than Side A." };
      const calcB = Math.sqrt(c ** 2 - a ** 2);
      return {
        a: a.toFixed(2), b: calcB.toFixed(2), c: c.toFixed(2),
        solvingFor: "Side B",
        area: (0.5 * a * calcB).toFixed(2),
        steps: [`${a}² + b² = ${c}²`, `b² = ${c ** 2} - ${a ** 2}`, `b = √${(c ** 2 - a ** 2).toFixed(2)}`],
      };
    }
    if (a > 0 && b > 0 && c === 0) {
      const calcC = Math.sqrt(a ** 2 + b ** 2);
      return {
        a: a.toFixed(2), b: b.toFixed(2), c: calcC.toFixed(2),
        solvingFor: "Hypotenuse",
        area: (0.5 * a * b).toFixed(2),
        steps: [`${a}² + ${b}² = c²`, `${a ** 2} + ${b ** 2} = c²`, `c = √${(a ** 2 + b ** 2).toFixed(2)}`],
      };
    }
    return null;
  }, [trigger, sideA, sideB, sideC]);

  const handleSolve = () => {
    setTrigger((t) => t + 1);
    setShowResults(true);
    saveCalculatorHistory("pythag-calc", { sideA, sideB, sideC });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground tracking-tight">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black italic flex items-center gap-3">
              <Calculator className="text-blue-600" size={36} /> Pythagorean Solver
            </h1>
            <p className="text-muted-foreground mt-2">Calculate sides, area, and steps for right-angled triangles.</p>
          </div>
          <button 
            onClick={handleToggleSave}
            className={`p-4 rounded-2xl transition-all border ${
              isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground border-transparent"
            }`}
          >
            <Heart size={24} className={isSaved ? "fill-current" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUTS */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-3xl border p-8 shadow-sm space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                <Square size={14} className="fill-current" /> Triangle Sides
              </h2>
              
              <div className="space-y-4">
                <InputField label="Side a (Height)" value={sideA} onChange={setSideA} />
                <InputField label="Side b (Base)" value={sideB} onChange={setSideB} />
                <InputField label="Side c (Hypotenuse)" value={sideC} onChange={setSideC} isHypotenuse />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button onClick={handleSolve} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  Calculate Result <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => { setSideA(""); setSideB(""); setSideC(""); setShowResults(false); setTrigger(0); }} 
                  className="w-full py-3 bg-secondary text-muted-foreground rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                    <TriangleIcon className="absolute -bottom-10 -right-10 opacity-10 rotate-12" size={240} />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Solved For: {results.solvingFor}</p>
                    <h2 className="text-7xl font-black tracking-tighter italic">
                      {results.solvingFor === "Side A" ? results.a : results.solvingFor === "Side B" ? results.b : results.c}
                    </h2>
                  </div>

                  <div className="bg-card border rounded-[2.5rem] p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                        <BarChart3 size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Properties</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Area</p>
                            <p className="text-3xl font-black">{results.area} <small className="text-sm font-normal text-muted-foreground italic">u²</small></p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Type</p>
                            <p className="text-xl font-black text-green-600">RIGHT-ANGLED</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-3xl p-8">
                    <h3 className="text-xs font-black text-muted-foreground uppercase mb-6 tracking-widest flex items-center gap-2">
                        <Ruler size={16} className="text-blue-600" /> Mathematical Breakdown
                    </h3>
                    <div className="grid gap-3">
                        {results.steps.map((step, i) => (
                            <div key={i} className="flex justify-between items-center p-5 bg-secondary/30 rounded-2xl border border-border/50 font-mono">
                                <span className="text-[10px] font-black uppercase text-blue-600/50">Step {i + 1}</span>
                                <span className="text-lg font-bold tracking-tight">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-2 border-dashed border-border rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                {results && "error" in results ? (
                  <div className="text-red-500 animate-pulse flex flex-col items-center">
                    <Info size={48} className="mb-4" />
                    <p className="font-black uppercase tracking-widest text-sm">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <TriangleIcon size={80} className="text-blue-600 opacity-10 mb-6" />
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] italic text-muted-foreground">Waiting for Geometry</h3>
                    <p className="text-sm text-muted-foreground/60 mt-2 max-w-xs leading-relaxed">Enter any two side lengths to solve for the remaining side and triangle area.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* CONCEPT SECTION */}
        <div className="mt-16 bg-card border rounded-[3rem] p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-3xl font-black italic mb-6">The Geometric Concept</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                        Proposed by the Greek philosopher Pythagoras, the theorem is a fundamental relation in Euclidean geometry among the three sides of a right triangle. It states that the area of the square whose side is the hypotenuse is equal to the sum of the areas of the squares on the other two sides.
                    </p>
                    <div className="inline-block p-6 bg-blue-600 text-white rounded-3xl font-black text-3xl italic tracking-widest shadow-xl shadow-blue-500/20">
                        a² + b² = c²
                    </div>
                </div>
                <div className="relative aspect-square max-w-[300px] mx-auto">
                    
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t pt-12">
                <TipItem text="Side C (Hypotenuse) is always opposite the 90° angle." />
                <TipItem text="This formula only applies to right-angled triangles." />
                <TipItem text="Calculated values are rounded to 2 decimal places." />
            </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

function InputField({ label, value, onChange, isHypotenuse }: any) {
  return (
    <div className="group">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter length..."
        className={`w-full px-6 py-4 bg-secondary/50 rounded-2xl border-2 outline-none transition-all font-black text-xl ${
          isHypotenuse 
            ? "border-blue-600/20 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10" 
            : "border-transparent focus:border-blue-600/40 focus:bg-background"
        }`}
      />
    </div>
  );
}

function TipItem({ text }: { text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 bg-blue-600 rounded-full p-1"><ChevronRight size={12} className="text-white" /></div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">{text}</p>
        </div>
    );
}