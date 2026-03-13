"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Hash,
  RotateCcw,
 
  ListFilter,
  BarChart3,
  TrendingDown,
  Layers,
  CheckCircle2,
  Calculator,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type ProbResult = {
  permutation: string;
  combination: string;
  permutationRep: string;
  combinationRep: string;
  n: number;
  r: number;
};

export default function PermutationCombinationCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalN, setTotalN] = useState<string>("10");
  const [selectR, setSelectR] = useState<string>("3");

  const relatedCalculators = [
    {
      name: "Probability Solver",
      description: "Event likelihood math",
      href: "/calculator/probability",
      icon: BarChart3,
    },
    {
      name: "LCM Calculator",
      description: "Least Common Multiple",
      href: "/calculator/lcm",
      icon: Hash,
    },
  ];

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["perm-comb-calc"]?.data) {
      const { n, r } = history["perm-comb-calc"].data;
      setTotalN(n || "10");
      setSelectR(r || "3");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("perm-comb-calc", { n: totalN, r: selectR });
    }
  }, [totalN, selectR, isMounted]);

  const bigFactorial = (num: number): bigint => {
    let result = BigInt(1);
    for (let i = 2; i <= num; i++) result *= BigInt(i);
    return result;
  };

  const results = useMemo((): ProbResult | { error: string } | null => {
    const n = parseInt(totalN);
    const r = parseInt(selectR);

    if (isNaN(n) || isNaN(r)) return null;
    if (n < 0 || r < 0) return { error: "Numbers must be positive." };
    if (r > n) return { error: "r cannot exceed n." };
    if (n > 500) return { error: "n too large (Max 500)." };

    try {
      const nFact = bigFactorial(n);
      const rFact = bigFactorial(r);
      const nrFact = bigFactorial(n - r);
      const p = nFact / nrFact;
      const c = p / rFact;
      let pRep = BigInt(1);
      for (let i = 0; i < r; i++) pRep *= BigInt(n);
      const cRep = bigFactorial(n + r - 1) / (rFact * bigFactorial(n - 1));

      return {
        permutation: p.toLocaleString(),
        combination: c.toLocaleString(),
        permutationRep: pRep.toLocaleString(),
        combinationRep: cRep.toLocaleString(),
        n,
        r,
      };
    } catch (e) {
      return { error: "Calculation overflow." };
    }
  }, [totalN, selectR]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
   
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Total Items (n)</label>
                  <input
                    type="number"
                    value={totalN}
                    onChange={(e) => {
                      setTotalN(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">
                    Items to Select (r)
                  </label>
                  <input
                    type="number"
                    value={selectR}
                    onChange={(e) => {
                      setSelectR(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold text-lg"
                  />
                </div>
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setTotalN("");
                      setSelectR("");
                      setShowResults(false);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center">
                  <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">
                    Combinations (nCr)
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 text-center my-4">
                    {results.combination}
                  </h2>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                    <TrendingDown size={14} className="text-blue-500" /> Stats
                  </h3>
                  <div className="space-y-3">
                    <StatRow
                      label="Permutations (nPr)"
                      value={results.permutation}
                    />
                    <StatRow
                      label="Comb. (Repetition)"
                      value={results.combinationRep}
                    />
                    <StatRow
                      label="Perm. (Repetition)"
                      value={results.permutationRep}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                {results && "error" in results ? (
                  <p className="text-red-500 font-bold">{results.error}</p>
                ) : (
                  <>
                    <Layers size={48} className="opacity-10 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                      Enter values to calculate
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-blue-600" /> Concept
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Permutations account for order (e.g., race rankings), while
              combinations represent distinct groups (e.g., choosing a
              committee).
            </p>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">Quick Tips</h3>
            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
              <li>nCr = n! / (r! * (n-r)!)</li>
              <li>nPr = n! / (n-r)!</li>
            </ul>
          </div>
        </div>
        <RelatedCalculators calculators={relatedCalculators} />
      </section>
  
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-2 bg-secondary/50 rounded-lg border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-sm font-black text-blue-600">{value}</span>
    </div>
  );
}
