"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
  Info,
  Share2,
  Copy,
  Check,
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

/** Textbook / calculator.net-style stacked fraction: numerator over denominator. */
function Frac({ n, d }: { n: React.ReactNode; d: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center align-middle mx-1.5 leading-none text-sm">
      <span className="px-1 pb-1">{n}</span>
      <span className="px-1 pt-1 border-t-2 border-current">{d}</span>
    </span>
  );
}

function bigFactorial(num: number): bigint {
  let result = BigInt(1);
  for (let i = 2; i <= num; i++) result *= BigInt(i);
  return result;
}

export default function PermutationCombinationCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [totalN, setTotalN] = useState<string>("10");
  const [selectR, setSelectR] = useState<string>("3");
  const hasLoadedHistory = useRef(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  const calculatorInfo = {
    name: "Permutation & Combination",
    href: "/calculators/math/permutation-combination-calculator",
    category: "Math",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?n=...&r=...) wins over saved history.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedN = params.get("n");
    const sharedR = params.get("r");

    if (sharedN && sharedR) {
      setTotalN(sharedN.replace(/[^0-9]/g, ""));
      setSelectR(sharedR.replace(/[^0-9]/g, ""));
      setShowResults(true);
    } else {
      const consent = getConsentPreference();
      const history = getCalculatorHistory();
      if (consent?.functional && history["perm-comb-calc"]?.data) {
        const { n, r } = history["perm-comb-calc"].data;
        setTotalN(n || "10");
        setSelectR(r || "3");
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    hasLoadedHistory.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- 2. AUTO-SAVE ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("perm-comb-calc", { n: totalN, r: selectR });
    }
  }, [totalN, selectR, isMounted]);

  // --- 3. CALCULATION LOGIC ---
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

      const cRep = r === 0 ? BigInt(1) : bigFactorial(n + r - 1) / (rFact * bigFactorial(n - 1));

      return {
        permutation: p.toLocaleString(),
        combination: c.toLocaleString(),
        permutationRep: pRep.toLocaleString(),
        combinationRep: cRep.toLocaleString(),
        n,
        r,
      };
    } catch {
      return { error: "Calculation overflow." };
    }
  }, [totalN, selectR]);

  const resultsOk = results && !("error" in results) ? results : null;

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults || !resultsOk) { setShareUrl(""); return; }
    const params = new URLSearchParams();
    params.set("n", String(resultsOk.n));
    params.set("r", String(resultsOk.r));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, resultsOk]);

  // --- 5. Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults || !resultsOk) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [resultsOk, showResults]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail without permission; the link is still
      // visible in the field and can be selected and copied by hand.
    }
  }, [shareUrl]);

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
                aria-label={isSaved ? "Remove from saved" : "Save calculator"}
                aria-pressed={isSaved}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={22} aria-hidden="true" /> Probability Specs
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Total Amount in a Set (n)</label>
                  <input
                    type="number"
                    value={totalN}
                    onChange={(e) => { setTotalN(e.target.value); setShowResults(false); }}
                    placeholder="10"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Amount in Each Sub-Set (r)</label>
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
                    Calculate <CheckCircle2 size={18} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => {
                      setTotalN("10"); setSelectR("3"); setShowResults(false); setShareUrl("");
                      window.history.replaceState(null, "", window.location.pathname);
                    }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Clear Values
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && resultsOk ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-6">Result</h3>

                  <div className="space-y-6">
                    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                      <span className="font-bold text-base">Permutations,</span>
                      <span className="italic font-semibold">
                        <sub className="text-xs not-italic">{resultsOk.n}</sub>P<sub className="text-xs not-italic">{resultsOk.r}</sub>
                      </span>
                      <span>=</span>
                      <Frac n={`${resultsOk.n}!`} d={`(${resultsOk.n} − ${resultsOk.r})!`} />
                      <span>=</span>
                      <span className="text-2xl font-black text-blue-600 break-all">{resultsOk.permutation}</span>
                    </div>

                    <div className="flex items-baseline flex-wrap gap-x-2 gap-y-1">
                      <span className="font-bold text-base">Combinations,</span>
                      <span className="italic font-semibold">
                        <sub className="text-xs not-italic">{resultsOk.n}</sub>C<sub className="text-xs not-italic">{resultsOk.r}</sub>
                      </span>
                      <span>=</span>
                      <Frac n={`${resultsOk.n}!`} d={`${resultsOk.r}! × (${resultsOk.n} − ${resultsOk.r})!`} />
                      <span>=</span>
                      <span className="text-2xl font-black text-blue-600 break-all">{resultsOk.combination}</span>
                    </div>
                  </div>
                </div>

               

                {/* SHARE RESULT */}
                {shareUrl && (
                  <div className="bg-card border rounded-[2rem] p-6 md:p-8 space-y-3">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Share2 size={14} className="text-blue-600" aria-hidden="true" />
                      Share This Result
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.target.select()}
                        aria-label="Shareable link for this permutation and combination result"
                        className="flex-1 px-4 py-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-xs font-medium truncate"
                      />
                      <button
                        onClick={handleCopyShareLink}
                        className={`px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                          linkCopied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {linkCopied ? (<><Check size={16} /> COPIED</>) : (<><Copy size={16} /> COPY LINK</>)}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anyone who opens this link sees the same n and r, and the same computed result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                {results && "error" in results ? (
                  <p className="text-red-500 font-black text-xl tracking-tight uppercase">{results.error}</p>
                ) : (
                  <>
                    <Layers size={60} className="opacity-5 mb-6" aria-hidden="true" />
                    <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                      Define n and r to compute arrangement possibilities
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

     

        <RelatedCalculators calculators={[
          { name: "LCM Calculator", description: "Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: Hash },
          { name: "Percentage Calculator", description: "Solve for percent, base, or result", href: "/calculators/math/percentage-calculator", icon: Hash },
        ]} />
      </section>
    </main>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-3 hover:bg-secondary/50 transition-colors rounded-xl border border-transparent hover:border-border/50">
      <div className="flex items-center gap-2">
        <ChevronRight size={10} className="text-blue-500" aria-hidden="true" />
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <span className="text-sm font-black text-blue-600 break-all">{value}</span>
    </div>
  );
}