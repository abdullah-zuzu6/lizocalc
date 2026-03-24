"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Activity,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Settings2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

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

  // --- Input States ---
  const [rawScore, setRawScore] = useState<string>("85");
  const [mean, setMean] = useState<string>("70");
  const [stdDev, setStdDev] = useState<string>("10");

  // --- Cookie/History Logic ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["z-score-calc"]?.data) {
      const { rawScore, mean, stdDev } = history["z-score-calc"].data;
      setRawScore(rawScore || "85");
      setMean(mean || "70");
      setStdDev(stdDev || "10");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("z-score-calc", { rawScore, mean, stdDev });
    }
  }, [rawScore, mean, stdDev, isMounted]);

  // --- Math Logic ---
  const erf = (x: number): number => {
    const a1 = 0.254829592,
      a2 = -0.284496736,
      a3 = 1.421413741,
      a4 = -1.453152027,
      a5 = 1.061405429,
      p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y =
      1.0 -
      ((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  };

  const results = useMemo((): ZResult | { error: string } | null => {
    if (trigger === 0) return null;
    const x = parseFloat(rawScore),
      mu = parseFloat(mean),
      sigma = parseFloat(stdDev);
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
  }, [trigger]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
    
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <InputField
                  label="Raw Score (x)"
                  value={rawScore}
                  onChange={setRawScore}
                />
                <InputField label="Mean (μ)" value={mean} onChange={setMean} />
                <InputField
                  label="Std Deviation (σ)"
                  value={stdDev}
                  onChange={setStdDev}
                />

                <button
                  onClick={() => {
                    setTrigger((prev) => prev + 1);
                    setShowResults(true);
                  }}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Calculate Z-Score <CheckCircle2 size={16} />
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 flex flex-col items-center justify-center">
                  <p className="text-xs font-bold uppercase text-primary mb-2">
                    Z-Score Result
                  </p>
                  <h2 className="text-5xl font-black text-primary tracking-tight">
                    {results.zScore}
                  </h2>
                  <p className="text-sm font-bold text-primary/70 mt-2">
                    {results.position} the mean
                  </p>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <div className="space-y-4">
                    <StatRow
                      label="Percentile Rank"
                      value={`${results.percentile}%`}
                    />
                    <StatRow
                      label="P-Value (Probability)"
                      value={results.probability}
                    />
                  </div>
                </div>
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
              name: "Standard Deviation",
              description: "Measure data spread",
              href: "/calculator/standard-deviation",
              icon: BarChart3,
            },
            {
              name: "Probability",
              description: "Event likelihood solver",
              href: "/calculator/probability",
              icon: TrendingUp,
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
      <label className="text-xs font-bold uppercase text-muted-foreground">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 outline-none font-bold text-lg"
      />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-secondary/50 rounded-lg border">
      <span className="text-xs font-bold uppercase text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-black text-primary">{value}</span>
    </div>
  );
}
