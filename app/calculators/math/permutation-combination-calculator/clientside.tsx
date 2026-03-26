"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Hash,
  RotateCcw,
  ListFilter,
  TrendingDown,
  Layers,
  CheckCircle2,
  Calculator,
  Heart,
  ChevronRight,
  Info
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
  getConsentPreference,
} from "@/lib/storage";

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
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalN, setTotalN] = useState<string>("10");
  const [selectR, setSelectR] = useState<string>("3");
  const hasLoadedHistory = useRef(false);

  const calculatorInfo = {
    name: "Permutation & Combination",
    href: "/calculators/math/permutation-combination-calculator",
    category: "Math",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["perm-comb-calc"]?.data) {
      const { n, r } = history["perm-comb-calc"].data;
      setTotalN(n || "10");
      setSelectR(r || "3");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    hasLoadedHistory.current = true;
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- 2. AUTO-SAVE TO COOKIES ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
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
    if (n < 0 || r < 0) return { error: "Values must be positive." };
    if (r > n) return { error: "Subset (r) cannot exceed total (n)." };
    if (n > 500) return { error: "Input exceeds limit (Max 500)." };

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
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-[2.5rem] border p-8 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={22} /> Probability Specs
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Total Items (n)</label>
                  <input
                    type="number"
                    value={totalN}
                    onChange={(e) => { setTotalN(e.target.value); setShowResults(false); }}
                    placeholder="10"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Items to Select (r)</label>
                  <input
                    type="number"
                    value={selectR}
                    onChange={(e) => { setSelectR(e.target.value); setShowResults(false); }}
                    placeholder="3"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/10"
                  >
                    Solve Combinatorics <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => { setTotalN(""); setSelectR(""); setShowResults(false); }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    <RotateCcw size={14} /> Clear Values
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
                  <Layers className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">Distinct Combinations (nCr)</p>
                  <h2 className="text-6xl font-black mt-4 break-all tracking-tighter leading-none">
                    {results.combination}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-[2rem] p-8 space-y-4 shadow-sm">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <TrendingDown size={14} className="text-blue-500" /> Key Metrics
                    </h3>
                    <div className="space-y-2">
                      <StatRow label="Permutations (nPr)" value={results.permutation} />
                      <StatRow label="Comb. (With Rep)" value={results.combinationRep} />
                      <StatRow label="Perm. (With Rep)" value={results.permutationRep} />
                    </div>
                  </div>

                  <div className="bg-secondary/30 rounded-[2rem] p-8 flex flex-col justify-center border border-dashed">
                    <div className="flex items-start gap-4 text-sm">
                      <div className="bg-blue-600 text-white p-2 rounded-lg"><Info size={16}/></div>
                      <div>
                        <p className="font-bold mb-1">Interpretation</p>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          There are {results.combination} ways to pick {results.r} items from {results.n} where order doesn't matter.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                {results && "error" in results ? (
                  <p className="text-red-500 font-black text-xl tracking-tight uppercase">{results.error}</p>
                ) : (
                  <>
                    <Layers size={60} className="opacity-5 mb-6" />
                    <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                      Define n and r to compute arrangement possibilities
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-[2.5rem] p-10 shadow-sm group">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calculator size={24} className="text-blue-600" />
            </div>
            <h3 className="font-black text-xl mb-4 tracking-tight">The Core Difference</h3>
            <p className="text-muted-foreground text-sm leading-loose">
              <strong>Permutations</strong> are used when the order of selection matters (e.g., first, second, and third place). 
              <strong>Combinations</strong> are used when you just need to know how many distinct groups can be formed, 
              regardless of internal order.
            </p>
          </div>
          
          <div className="bg-card border rounded-[2.5rem] p-10 shadow-sm">
            <h3 className="font-black text-xl mb-6 tracking-tight">Standard Formulas</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                <span className="font-mono text-xs font-bold uppercase text-muted-foreground tracking-tighter">Combination</span>
                <span className="font-black text-blue-600">n! / r!(n-r)!</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary rounded-2xl">
                <span className="font-mono text-xs font-bold uppercase text-muted-foreground tracking-tighter">Permutation</span>
                <span className="font-black text-blue-600">n! / (n-r)!</span>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "LCM Calculator", description: "Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: Hash },
          { name: "Binary Calculator", description: "Base-2 Arithmetic", href: "/calculators/math/binary-calculator", icon: Hash },
        ]} />
      </section>
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-secondary/50 transition-colors rounded-xl border border-transparent hover:border-border/50">
      <div className="flex items-center gap-2">
        <ChevronRight size={10} className="text-blue-500" />
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-black text-blue-600">{value}</span>
    </div>
  );
}