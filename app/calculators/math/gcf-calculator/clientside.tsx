"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Settings2,
  RotateCcw,
  CheckCircle2,
  Heart,
  Copy,
  Check,
  Share2,
  Box,
  TrendingDown,
  BarChart3,
  ChevronRight,
  Layers,
  Divide,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

type GCFResult = {
  gcf: number;
  numbers: number[];
  allFactors: { [key: number]: number[] };
};

export default function GCFCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [inputValues, setInputValues] = useState("24, 36, 48");
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasLoadedHistory = useRef(false);

  // Share link
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "GCF Calculator",
    href: "/calculators/math/gcf-calculator",
    category: "Math",
  };

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const getAllFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) factors.push(n / i);
      }
    }
    return factors.sort((a, b) => a - b);
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?nums=...) wins over saved history, since the point of
  // sharing is to show someone else the exact same result.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedNums = params.get("nums");

    if (sharedNums) {
      setInputValues(sharedNums.replace(/[^0-9, ]/g, ""));
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["gcf-calc"]?.data) {
        setInputValues(history["gcf-calc"].data.inputValues || "24, 36, 48");
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

  // --- 2. AUTO-SAVE TO HISTORY ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
    saveCalculatorHistory("gcf-calc", { inputValues });
  }, [inputValues, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): GCFResult | { error: string } | null => {
    if (trigger === 0) return null;

    const nums = inputValues
      .split(",")
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n > 0);

    if (nums.length < 2) {
      return { error: "Enter at least two numbers, separated by commas." };
    }
    if (nums.some((n) => n > 1000000)) {
      return { error: "Please use numbers below 1,000,000." };
    }

    const finalGCF = nums.reduce((acc, curr) => getGCD(acc, curr));

    const factorMap: { [key: number]: number[] } = {};
    nums.forEach((n) => {
      factorMap[n] = getAllFactors(n);
    });

    return {
      gcf: finalGCF,
      numbers: nums,
      allFactors: factorMap,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, inputValues]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("nums", inputValues.trim());
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, inputValues]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail on older browsers or without permission.
      // The link is still visible in the input and can be selected by hand.
    }
  }, [shareUrl]);

  // --- 4B. SCROLL RESULTS INTO VIEW AFTER CALCULATE, MOBILE/TABLET ONLY ---
  useEffect(() => {
    if (!showResults || !results) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results, showResults]);

  // --- 5. HANDLERS ---
  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputValues("");
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-[2.5rem] border p-8 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove GCF Calculator from saved" : "Save GCF Calculator"}
                aria-pressed={isSaved}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Settings2 className="text-blue-600" size={22} />
                Parameters
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="gcf-numbers" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Numbers (comma separated)</label>
                  <input
                    id="gcf-numbers"
                    value={inputValues}
                    onChange={(e) => { setInputValues(e.target.value); setShowResults(false); }}
                    placeholder="24, 36, 48"
                    aria-label="Numbers to find the GCF of"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 tracking-wide"
                  />
                  <p className="text-[10px] text-muted-foreground mt-2 px-1">Add two or more, e.g. 12, 18, 24</p>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/10"
                  >
                    Calculate GCF <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
                  <Box className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
                  <button
                    onClick={() => handleCopy(String(results.gcf))}
                    aria-label="Copy GCF result"
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">Greatest Common Factor</p>
                  <h2 className="text-6xl font-black mt-4 break-all tracking-tighter leading-none">
                    {results.gcf}
                  </h2>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                    <TrendingDown size={14} className="text-blue-600" aria-hidden="true" /> Factor Breakdown
                  </h3>
                  <div className="space-y-4 overflow-auto max-h-[220px] pr-2">
                    {Object.entries(results.allFactors).map(([num, factors]) => (
                      <div key={num} className="space-y-2">
                        <span className="text-[10px] font-bold text-muted-foreground">Factors of {num}:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {factors.map((f) => (
                            <span
                              key={f}
                              className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors ${
                                f === results.gcf ? "bg-blue-600 text-white font-black ring-2 ring-blue-500/20" : "bg-secondary text-muted-foreground"
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Share Result */}
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
                        aria-label="Shareable link for this result"
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
                      Anyone who opens this link sees the same numbers and the same GCF result.
                    </p>
                  </div>
                )}

              
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                <Box size={60} className="opacity-5 mb-6" aria-hidden="true" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                  {results && "error" in results ? (
                    <span className="text-red-500">{results.error}</span>
                  ) : (
                    "Enter two or more numbers to find their GCF"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            { name: "LCM Calculator", description: "Find least common multiple", href: "/calculators/math/lcm-calculator", icon: Layers },
            { name: "Fraction Calculator", description: "Simplify and calculate fractions", href: "/calculators/math/fraction-calculator", icon: Divide },
          ]}
        />
      </section>
    </main>
  );
}