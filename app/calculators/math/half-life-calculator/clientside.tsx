"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Clock, RotateCcw, CheckCircle2, FlaskConical, Heart, ChevronRight, Activity } from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
  getConsentPreference,
} from "@/lib/storage";

type HalfLifeResult = {
  remainingAmount: string;
  decayConstant: string;
  halfLivesElapsed: string;
  decayPercentage: string;
};

type TableRow = {
  time: number;
  value: number;
};

export default function HalfLifeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const hasLoadedHistory = useRef(false);

  // Input States
  const [initialAmount, setInitialAmount] = useState("100");
  const [halfLifeTime, setHalfLifeTime] = useState("5");
  const [totalTime, setTotalTime] = useState("15");
  const [unit, setUnit] = useState("years");

  const calculatorInfo = {
    name: "Half-Life Calculator",
    href: "/calculators/science/half-life-calculator",
    category: "Science",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["half-life-calc"]?.data) {
      const d = history["half-life-calc"].data;
      setInitialAmount(d.initial || "100");
      setHalfLifeTime(d.hl || "5");
      setTotalTime(d.total || "15");
      setUnit(d.unit || "years");
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
      saveCalculatorHistory("half-life-calc", {
        initial: initialAmount,
        hl: halfLifeTime,
        total: totalTime,
        unit: unit,
      });
    }
  }, [initialAmount, halfLifeTime, totalTime, unit, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): HalfLifeResult | null => {
    const N0 = parseFloat(initialAmount);
    const t12 = parseFloat(halfLifeTime);
    const t = parseFloat(totalTime);

    if (isNaN(N0) || isNaN(t12) || isNaN(t) || N0 <= 0 || t12 <= 0 || t < 0) return null;

    const n = t / t12;
    const Nt = N0 * Math.pow(0.5, n);
    const lambda = Math.log(2) / t12;
    const decayPct = ((N0 - Nt) / N0) * 100;

    return {
      remainingAmount: Nt.toFixed(6),
      decayConstant: lambda.toFixed(6),
      halfLivesElapsed: n.toFixed(2),
      decayPercentage: decayPct.toFixed(2),
    };
  }, [initialAmount, halfLifeTime, totalTime]);

  const decayTable: TableRow[] = useMemo(() => {
    const rows: TableRow[] = [];
    const N0 = parseFloat(initialAmount);
    const t12 = parseFloat(halfLifeTime);
    const t = parseFloat(totalTime);

    if (isNaN(N0) || isNaN(t12) || isNaN(t)) return rows;

    for (let i = 0; i <= t; i += t12) {
      rows.push({ time: i, value: N0 * Math.pow(0.5, i / t12) });
    }
    return rows;
  }, [initialAmount, halfLifeTime, totalTime]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Clock className="text-blue-600" size={22} /> Decay Specs
              </h2>

              <div className="space-y-6">
                <InputField label="Initial Quantity (N₀)" value={initialAmount} onChange={setInitialAmount} />
                <InputField label="Half Life (t½)" value={halfLifeTime} onChange={setHalfLifeTime} />
                <InputField label="Observation Time (t)" value={totalTime} onChange={setTotalTime} />

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                    Timeline Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 appearance-none"
                  >
                    {["seconds", "minutes", "hours", "days", "years"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/10"
                  >
                    Analyze Decay <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => { setInitialAmount("100"); setHalfLifeTime("5"); setTotalTime("15"); setShowResults(false); }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
                  <FlaskConical className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">Final Remaining Amount</p>
                  <h2 className="text-6xl font-black mt-4 tracking-tighter leading-none">
                    {results.remainingAmount} <span className="text-2xl opacity-50 font-medium tracking-normal ml-2">units</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Cycles Elapsed", value: results.halfLivesElapsed, color: "text-amber-500" },
                    { label: "Decay Constant", value: results.decayConstant, color: "text-emerald-500" },
                    { label: "Percentage Lost", value: `${results.decayPercentage}%`, color: "text-rose-500" }
                  ].map((item) => (
                    <div key={item.label} className="bg-card border rounded-[2rem] p-6 text-center shadow-sm">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-2">{item.label}</p>
                      <h3 className={`text-2xl font-black ${item.color}`}>{item.value}</h3>
                    </div>
                  ))}
                </div>

                {/* DECAY TABLE */}
                <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Activity size={20} className="text-blue-600" /> Decay Progression
                  </h3>
                  <div className="overflow-hidden rounded-2xl border">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="px-6 py-4 text-left font-black uppercase text-[10px] tracking-widest text-muted-foreground">Interval ({unit})</th>
                          <th className="px-6 py-4 text-right font-black uppercase text-[10px] tracking-widest text-muted-foreground">Remaining Mass</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {decayTable.map((row, i) => (
                          <tr key={i} className="hover:bg-secondary/20 transition-colors">
                            <td className="px-6 py-4 font-bold flex items-center gap-2">
                               <ChevronRight size={12} className="text-blue-500" /> {row.time}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-blue-600 font-bold">{row.value.toFixed(6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                <FlaskConical size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                   Configure isotopes parameters to simulate radioactive decay
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "Carbon Dating Calculator",
              href: "/calculators/science/carbon-dating",
              description: "Estimate organic age via C-14 decay.",
              icon: Activity,
            },
            {
              name: "Log Calculator",
              href: "/calculators/math/log-calculator",
              description: "Calculate natural and base-10 logs.",
              icon: FlaskConical,
            },
          ]}
        />
      </div>
    </main>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void; }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-xl outline-none focus:ring-2 ring-blue-500/20"
      />
    </div>
  );
}