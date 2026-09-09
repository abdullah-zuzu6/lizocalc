"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Activity,
  RotateCcw,
  CheckCircle2,
  BarChart3,
  Settings2,
  Heart,
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
} from "@/lib/storage";

type ZResult = {
  zScore: string;
  percentile: string;
  probability: string;
  position: "Above" | "Below" | "Equal";
};

export default function ZScoreCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Input States ---
  const [rawScore, setRawScore] = useState<string>("85");
  const [mean, setMean] = useState<string>("70");
  const [stdDev, setStdDev] = useState<string>("10");

  // --- Share link ---
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Calculator Metadata for Saving ---
  const calculatorInfo = {
    name: "Z-Score Calculator",
    href: "/calculators/math/z-score-calculator",
    category: "Statistics",
  };

  // --- Initialize & Load History ---
  // A shared link (?x=&mean=&sd=) wins over saved history, and auto-solves
  // immediately so whoever opens the link sees the same result right away.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedX = params.get("x");
    const sharedMean = params.get("mean");
    const sharedSd = params.get("sd");

    if (sharedX && sharedMean && sharedSd) {
      setRawScore(sharedX);
      setMean(sharedMean);
      setStdDev(sharedSd);
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["z-score-calc"]?.data) {
        const { rawScore, mean, stdDev } = history["z-score-calc"].data;
        setRawScore(rawScore || "85");
        setMean(mean || "70");
        setStdDev(stdDev || "10");
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("z-score-calc", { rawScore, mean, stdDev });
  }, [rawScore, mean, stdDev, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Math Logic ---
  const erf = (x: number): number => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const results = useMemo((): ZResult | { error: string } | null => {
    if (trigger === 0) return null;
    const x = parseFloat(rawScore), mu = parseFloat(mean), sigma = parseFloat(stdDev);

    if (isNaN(x) || isNaN(mu) || isNaN(sigma))
      return { error: "Please enter valid numbers." };
    if (sigma <= 0) return { error: "Standard Deviation must be > 0." };

    const z = (x - mu) / sigma;
    const pct = 0.5 * (1 + erf(z / Math.sqrt(2))) * 100;

    return {
      zScore: z.toFixed(4),
      percentile: pct.toFixed(2),
      probability: (pct / 100).toFixed(4),
      position: z > 0 ? "Above" : z < 0 ? "Below" : "Equal",
    };
  }, [trigger, rawScore, mean, stdDev]);

  const resultsOk = results && !("error" in results) ? results : null;

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults || !results) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results, showResults]);

  // --- Share link ---
  useEffect(() => {
    if (!showResults || !resultsOk) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("x", rawScore);
    params.set("mean", mean);
    params.set("sd", stdDev);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, resultsOk, rawScore, mean, stdDev]);

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
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE CALCULATOR BUTTON */}
              <button 
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <InputField
                  label="Raw Score (x)"
                  value={rawScore}
                  onChange={(v) => { setRawScore(v); setShowResults(false); }}
                />
                <InputField
                  label="Mean (μ)"
                  value={mean}
                  onChange={(v) => { setMean(v); setShowResults(false); }}
                />
                <InputField
                  label="Std Deviation (σ)"
                  value={stdDev}
                  onChange={(v) => { setStdDev(v); setShowResults(false); }}
                />

                <button
                  onClick={() => {
                    setTrigger((prev) => prev + 1);
                    setShowResults(true);
                  }}
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                  Calculate Z-Score <CheckCircle2 size={16} />
                </button>
                
                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrigger(0);
                    setShareUrl("");
                    window.history.replaceState(null, "", window.location.pathname);
                  }}
                  className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 flex flex-col items-center justify-center">
                    <p className="text-xs font-bold uppercase text-primary mb-2 tracking-widest">
                      Z-Score Result
                    </p>
                    <h2 className="text-6xl font-black text-primary tracking-tight">
                      {results.zScore}
                    </h2>
                    <p className="text-sm font-bold text-primary/70 mt-3">
                      {results.position} the mean
                    </p>
                  </div>
                  <div className="bg-card border rounded-xl p-6 flex flex-col justify-center">
                    <div className="space-y-4">
                      <StatRow
                        label="Percentile Rank"
                        value={`${results.percentile}%`}
                      />
                      <StatRow
                        label="Cumulative Probability"
                        value={results.probability}
                      />
                    </div>
                  </div>
                </div>

                {/* SHARE RESULT */}
                {shareUrl && (
                  <div className="bg-card border rounded-xl p-6 space-y-3">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Share2 size={14} className="text-primary" />
                      Share This Result
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.target.select()}
                        aria-label="Shareable link for this z-score result"
                        className="flex-1 px-4 py-3 bg-secondary rounded-lg border-2 border-transparent focus:border-primary outline-none text-xs font-medium truncate"
                      />
                      <button
                        onClick={handleCopyShareLink}
                        className={`px-5 py-3 rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all ${
                          linkCopied ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                        }`}
                      >
                        {linkCopied ? (<><Check size={16} /> COPIED</>) : (<><Copy size={16} /> COPY LINK</>)}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anyone who opens this link sees the same raw score, mean, and standard
                      deviation, and the same computed z-score.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {results && "error" in results
                    ? results.error
                    : "Enter parameters to calculate"}
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "Density Calculator ",
              description: "Measure Density perfectly",
              href: "/calculators/physics/density-calculator",
              icon: BarChart3,
            },
           
          ]}
        />
      </div>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all"
      />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/50">
      <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
        {label}
      </span>
      <span className="text-lg font-black text-primary">{value}</span>
    </div>
  );
}