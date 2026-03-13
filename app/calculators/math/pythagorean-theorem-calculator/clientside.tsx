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
  Zap,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type CalcResult = {
  a: string;
  b: string;
  c: string;
  solvingFor: string;
  area: string;
  steps: string[];
  error?: string;
};

export default function PythagoreanCalculator() {
  const [sideA, setSideA] = useState<string>("3");
  const [sideB, setSideB] = useState<string>("4");
  const [sideC, setSideC] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const relatedCalculators = [
    {
      name: "Triangle Solver",
      description: "Solve for non-right triangles",
      href: "/calculators/math/triangle-solver",
      icon: TriangleIcon,
    },
    {
      name: "Area Calculator",
      description: "Measure space within shapes",
      href: "/calculators/math/area-calculator",
      icon: Square,
    },
    {
      name: "GCF Calculator",
      description: "Greatest Common Factor",
      href: "/calculators/math/gcf-calculator",
      icon: ListFilter,
    },
  ];

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["pythag-calc"]?.data) {
      const data = history["pythag-calc"].data;
      setSideA(data.sideA || "");
      setSideB(data.sideB || "");
      setSideC(data.sideC || "");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("pythag-calc", { sideA, sideB, sideC });
    }
  }, [sideA, sideB, sideC, isMounted]);

  // --- Calculation Engine ---
  const results = useMemo((): CalcResult | { error: string } | null => {
    if (trigger === 0) return null;
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;
    const inputs = [a, b, c].filter((x) => x > 0).length;

    if (inputs < 2) return { error: "Please enter any two sides." };
    if (inputs === 3) return { error: "Leave one field empty to solve." };

    if (c > 0 && b > 0 && a === 0) {
      if (c <= b) return { error: "Hypotenuse must be longer than Side B." };
      const calcA = Math.sqrt(c ** 2 - b ** 2);
      return {
        a: calcA.toFixed(2),
        b: b.toFixed(2),
        c: c.toFixed(2),
        solvingFor: "Side A (Perpendicular)",
        area: (0.5 * calcA * b).toFixed(2),
        steps: [
          `a² + ${b}² = ${c}²`,
          `a² = ${c ** 2} - ${b ** 2}`,
          `a = √${(c ** 2 - b ** 2).toFixed(2)}`,
        ],
      };
    }
    if (c > 0 && a > 0 && b === 0) {
      if (c <= a) return { error: "Hypotenuse must be longer than Side A." };
      const calcB = Math.sqrt(c ** 2 - a ** 2);
      return {
        a: a.toFixed(2),
        b: calcB.toFixed(2),
        c: c.toFixed(2),
        solvingFor: "Side B (Base)",
        area: (0.5 * a * calcB).toFixed(2),
        steps: [
          `${a}² + b² = ${c}²`,
          `b² = ${c ** 2} - ${a ** 2}`,
          `b = √${(c ** 2 - a ** 2).toFixed(2)}`,
        ],
      };
    }
    if (a > 0 && b > 0 && c === 0) {
      const calcC = Math.sqrt(a ** 2 + b ** 2);
      return {
        a: a.toFixed(2),
        b: b.toFixed(2),
        c: calcC.toFixed(2),
        solvingFor: "Side C (Hypotenuse)",
        area: (0.5 * a * b).toFixed(2),
        steps: [
          `${a}² + ${b}² = c²`,
          `${a ** 2} + ${b ** 2} = c²`,
          `c = √${(a ** 2 + b ** 2).toFixed(2)}`,
        ],
      };
    }
    return null;
  }, [trigger]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-primary" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <InputGroup
                  label="Side A (Perpendicular)"
                  value={sideA}
                  onChange={setSideA}
                  placeholder="e.g. 3"
                />
                <InputGroup
                  label="Side B (Base)"
                  value={sideB}
                  onChange={setSideB}
                  placeholder="e.g. 4"
                />
                <InputGroup
                  label="Side C (Hypotenuse)"
                  value={sideC}
                  onChange={setSideC}
                  placeholder="Solve for me"
                  highlight
                />
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setTrigger((t) => t + 1);
                      setShowResults(true);
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all hover:opacity-90"
                  >
                    Solve Triangle <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setSideA("");
                      setSideB("");
                      setSideC("");
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS & QUICK STATS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center text-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    {results.solvingFor}
                  </p>
                  <h2 className="text-5xl lg:text-7xl font-black text-primary my-4 tracking-tighter italic">
                    {results.solvingFor.includes("A")
                      ? results.a
                      : results.solvingFor.includes("B")
                        ? results.b
                        : results.c}
                  </h2>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                    <Ruler size={14} className="text-primary" /> Steps
                  </h3>
                  <div className="space-y-2">
                    {results.steps.map((step, i) => (
                      <div
                        key={i}
                        className="flex justify-between p-2.5 bg-secondary/50 rounded-lg border border-border/50 font-mono text-xs font-bold"
                      >
                        <span className="text-primary">{i + 1}.</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[280px]">
                {results && "error" in results ? (
                  <div className="text-rose-500 space-y-2">
                    <Info size={40} className="mx-auto" />
                    <p className="text-sm font-bold uppercase tracking-widest">
                      {results.error}
                    </p>
                  </div>
                ) : (
                  <>
                    <TriangleIcon
                      size={48}
                      className="opacity-10 mb-4 text-primary"
                    />
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest italic">
                      Awaiting Triangle Data
                    </p>
                  </>
                )}
              </div>
            )}

            {/* --- THE ADDED QUICK STAT BOXES --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-5 rounded-xl border flex flex-col justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">
                  Calculated Area
                </p>
                <p className="text-2xl font-black text-primary">
                  {results && !("error" in results)
                    ? `${results.area} u²`
                    : "0.00"}
                </p>
              </div>
              <div className="bg-secondary/30 p-5 rounded-xl border flex flex-col justify-center">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">
                  Triangle Status
                </p>
                <p className="text-2xl font-black text-green-600 tracking-tighter italic">
                  RIGHT-ANGLED
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- THE ADDED EDUCATIONAL SECTION --- */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" /> How it works
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              The Pythagorean Theorem is a fundamental principle in geometry. It
              allows you to find the missing side of a{" "}
              <strong>right triangle</strong> as long as you know the other two
              lengths.
            </p>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-center">
              <code className="text-primary font-black text-xl italic tracking-widest">
                a² + b² = c²
              </code>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="font-bold text-xl mb-4">Quick Tips</h3>
            <div className="space-y-4">
              {[
                "Always leave the field you want to calculate empty.",
                "The Hypotenuse (Side C) is always the longest side.",
                "Ensure both units of measurement are the same for accuracy.",
              ].map((tip, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground items-start group"
                >
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <ChevronRight size={12} className="text-primary" />
                  </div>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

function InputGroup({ label, value, onChange, placeholder, highlight }: any) {
  return (
    <div className="group">
      <label className="text-[11px] font-black uppercase tracking-wider text-muted-foreground mb-1 block group-focus-within:text-primary transition-colors">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 bg-secondary rounded-lg border-2 focus:ring-4 outline-none transition-all font-bold text-lg ${highlight ? "ring-primary/10 border-primary/20 focus:border-primary" : "border-transparent focus:border-primary/40 focus:ring-primary/5"}`}
        placeholder={placeholder}
      />
    </div>
  );
}
