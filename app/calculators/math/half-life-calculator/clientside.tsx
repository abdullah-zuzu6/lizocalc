"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  FlaskConical,
  Heart,
  ChevronRight,
  Activity,
  ArrowLeftRight,
  Sigma,
  Hourglass,
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

type SolveTarget = "Nt" | "N0" | "t" | "thalf";

type TableRow = { time: number; value: number };

type SolvedResult = {
  N0: number;
  Nt: number;
  t: number;
  thalf: number;
  decayConstant: number;
  meanLifetime: number;
  halfLivesElapsed: number;
  percentRemaining: number;
  percentDecayed: number;
};

const UNIT_LABELS: Record<string, string> = {
  seconds: "sec",
  minutes: "min",
  hours: "hr",
  days: "days",
  years: "yrs",
};

const SOLVE_KEYS: SolveTarget[] = ["Nt", "N0", "t", "thalf"];

const LN2 = Math.log(2);

function formatNum(n: number, digits = 6): string {
  if (!isFinite(n)) return "—";
  if (Math.abs(n) >= 1000000 || (Math.abs(n) < 0.0001 && n !== 0)) {
    return n.toExponential(4);
  }
  return parseFloat(n.toFixed(digits)).toString();
}

export default function HalfLifeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const hasLoadedHistory = useRef(false);

  const [solveFor, setSolveFor] = useState<SolveTarget>("Nt");
  const [N0, setN0] = useState("100");
  const [Nt, setNt] = useState("10");
  const [t, setT] = useState("15");
  const [thalf, setThalf] = useState("5");
  const [unit, setUnit] = useState("years");

  // Share link
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Half-Life Calculator",
    href: "/calculators/science/half-life-calculator",
    category: "Science",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?solve=...) wins over saved history, same reasoning as
  // the GCF tool: the point of sharing is to show someone the same result.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedSolve = params.get("solve") as SolveTarget | null;

    if (sharedSolve && SOLVE_KEYS.includes(sharedSolve)) {
      setSolveFor(sharedSolve);
      if (params.get("N0")) setN0(params.get("N0")!);
      if (params.get("Nt")) setNt(params.get("Nt")!);
      if (params.get("t")) setT(params.get("t")!);
      if (params.get("thalf")) setThalf(params.get("thalf")!);
      if (params.get("unit")) setUnit(params.get("unit")!);
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const consent = getConsentPreference();
      const history = getCalculatorHistory();
      if (consent?.functional && history["half-life-calc"]?.data) {
        const d = history["half-life-calc"].data;
        setSolveFor(d.solveFor || "Nt");
        setN0(d.N0 || "100");
        setNt(d.Nt || "10");
        setT(d.t || "15");
        setThalf(d.thalf || "5");
        setUnit(d.unit || "years");
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
      saveCalculatorHistory("half-life-calc", { solveFor, N0, Nt, t, thalf, unit });
    }
  }, [solveFor, N0, Nt, t, thalf, unit, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const result = useMemo((): SolvedResult | { error: string } | null => {
    if (trigger === 0) return null;

    const nN0 = parseFloat(N0);
    const nNt = parseFloat(Nt);
    const nT = parseFloat(t);
    const nThalf = parseFloat(thalf);

    if (solveFor !== "N0" && (isNaN(nN0) || nN0 <= 0)) {
      return { error: "Initial quantity (N\u2080) must be a positive number." };
    }
    if (solveFor !== "Nt" && (isNaN(nNt) || nNt <= 0)) {
      return { error: "Remaining quantity (N\u209C) must be a positive number." };
    }
    if (solveFor !== "t" && (isNaN(nT) || nT < 0)) {
      return { error: "Elapsed time (t) must be zero or a positive number." };
    }
    if (solveFor !== "thalf" && (isNaN(nThalf) || nThalf <= 0)) {
      return { error: "Half-life (t\u00BD) must be a positive number." };
    }

    let finalN0 = nN0;
    let finalNt = nNt;
    let finalT = nT;
    let finalThalf = nThalf;

    if (solveFor === "Nt") {
      finalNt = finalN0 * Math.pow(0.5, finalT / finalThalf);
    } else if (solveFor === "N0") {
      finalN0 = finalNt * Math.pow(2, finalT / finalThalf);
    } else if (solveFor === "t") {
      if (finalNt > finalN0) {
        return { error: "The remaining amount can't be larger than the initial amount for ordinary decay." };
      }
      finalT = (finalThalf * Math.log(finalN0 / finalNt)) / LN2;
    } else if (solveFor === "thalf") {
      if (finalNt > finalN0) {
        return { error: "The remaining amount can't be larger than the initial amount for ordinary decay." };
      }
      if (finalT <= 0) {
        return { error: "Elapsed time must be greater than 0 to solve for half-life." };
      }
      if (finalNt === finalN0) {
        return { error: "Half-life is undefined when no decay has happened yet (N\u209C equals N\u2080)." };
      }
      finalThalf = (finalT * LN2) / Math.log(finalN0 / finalNt);
    }

    if (!isFinite(finalNt) || !isFinite(finalN0) || !isFinite(finalT) || !isFinite(finalThalf)) {
      return { error: "That combination of values doesn't produce a real result. Double-check your numbers." };
    }

    const decayConstant = LN2 / finalThalf;
    const meanLifetime = 1 / decayConstant;
    const halfLivesElapsed = finalT / finalThalf;
    const percentRemaining = (finalNt / finalN0) * 100;
    const percentDecayed = 100 - percentRemaining;

    return {
      N0: finalN0,
      Nt: finalNt,
      t: finalT,
      thalf: finalThalf,
      decayConstant,
      meanLifetime,
      halfLivesElapsed,
      percentRemaining,
      percentDecayed,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, solveFor, N0, Nt, t, thalf]);

  const solvedOk = result && !("error" in result) ? result : null;

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults || !solvedOk) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("solve", solveFor);
    params.set("N0", N0.trim());
    params.set("Nt", Nt.trim());
    params.set("t", t.trim());
    params.set("thalf", thalf.trim());
    params.set("unit", unit);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, solvedOk, solveFor, N0, Nt, t, thalf, unit]);

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

  // --- 4B. SCROLL RESULTS INTO VIEW AFTER CALCULATE, MOBILE/TABLET ONLY ---
  useEffect(() => {
    if (!showResults || !result) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [result, showResults]);

  // --- 5. DECAY TABLE ---
  const decayTable: TableRow[] = useMemo(() => {
    if (!solvedOk) return [];
    const rows: TableRow[] = [];
    const steps = Math.min(10, Math.max(1, Math.ceil(solvedOk.t / solvedOk.thalf)));
    const step = solvedOk.t / steps || solvedOk.thalf;
    for (let i = 0; i <= steps; i++) {
      const time = i * step;
      rows.push({ time, value: solvedOk.N0 * Math.pow(0.5, time / solvedOk.thalf) });
    }
    return rows;
  }, [solvedOk]);

  // --- 6. CHART GEOMETRY ---
  const chart = useMemo(() => {
    if (!solvedOk) return null;
    const width = 600;
    const height = 260;
    const padL = 56;
    const padB = 34;
    const padT = 16;
    const padR = 16;
    const maxT = Math.max(solvedOk.t, solvedOk.thalf) * 1.15 || 1;
    const maxN = solvedOk.N0;

    const xOf = (time: number) => padL + (time / maxT) * (width - padL - padR);
    const yOf = (amount: number) =>
      padT + (1 - amount / maxN) * (height - padT - padB);

    const segments = 60;
    const points: string[] = [];
    for (let i = 0; i <= segments; i++) {
      const time = (i / segments) * maxT;
      const amount = solvedOk.N0 * Math.pow(0.5, time / solvedOk.thalf);
      points.push(`${xOf(time).toFixed(2)},${yOf(amount).toFixed(2)}`);
    }

    const markerX = xOf(solvedOk.t);
    const markerY = yOf(solvedOk.Nt);

    return {
      width,
      height,
      path: `M ${points.join(" L ")}`,
      padL,
      padB,
      markerX,
      markerY,
      maxT,
      maxN,
    };
  }, [solvedOk]);

  if (!isMounted) return null;

  const solveOptions: { key: SolveTarget; label: string; symbol: string }[] = [
    { key: "Nt", label: "Remaining amount", symbol: "N\u209C" },
    { key: "N0", label: "Initial amount", symbol: "N\u2080" },
    { key: "t", label: "Elapsed time", symbol: "t" },
    { key: "thalf", label: "Half-life", symbol: "t\u00BD" },
  ];

  const resultLabel = solveOptions.find((o) => o.key === solveFor)?.label || "Result";
  const resultValue = solvedOk
    ? solveFor === "Nt"
      ? solvedOk.Nt
      : solveFor === "N0"
      ? solvedOk.N0
      : solveFor === "t"
      ? solvedOk.t
      : solvedOk.thalf
    : 0;
  const resultUnit = solveFor === "t" || solveFor === "thalf" ? UNIT_LABELS[unit] : "units";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove Half-Life Calculator from saved" : "Save Half-Life Calculator"}
                aria-pressed={isSaved}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="text-blue-600" size={22} aria-hidden="true" /> Decay Specs
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                    Solve for
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {solveOptions.map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => { setSolveFor(opt.key); setShowResults(false); }}
                        aria-pressed={solveFor === opt.key}
                        className={`px-3 py-3 rounded-xl text-xs font-bold text-left transition-all border ${
                          solveFor === opt.key
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80"
                        }`}
                      >
                        <span className="block text-base font-black">{opt.symbol}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 px-1">
                    Fill in the other three values. The calculator solves for this one.
                  </p>
                </div>

                {solveFor !== "N0" && (
                  <InputField label="Initial quantity (N\u2080)" value={N0} onChange={setN0} onEdited={() => setShowResults(false)} />
                )}
                {solveFor !== "Nt" && (
                  <InputField label="Remaining quantity (N\u209C)" value={Nt} onChange={setNt} onEdited={() => setShowResults(false)} />
                )}
                {solveFor !== "t" && (
                  <InputField label={`Elapsed time (t) \u2014 ${unit}`} value={t} onChange={setT} onEdited={() => setShowResults(false)} />
                )}
                {solveFor !== "thalf" && (
                  <InputField label={`Half-life (t\u00BD) \u2014 ${unit}`} value={thalf} onChange={setThalf} onEdited={() => setShowResults(false)} />
                )}

                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
                    Time unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => { setUnit(e.target.value); setShowResults(false); }}
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 appearance-none"
                  >
                    {["seconds", "minutes", "hours", "days", "years"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-muted-foreground mt-2 px-1">
                    Applies to both time and half-life. Use the same unit for both.
                  </p>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={() => { setTrigger((v) => v + 1); setShowResults(true); }}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/10"
                  >
                    Calculate <CheckCircle2 size={18} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => {
                      setSolveFor("Nt"); setN0("100"); setNt("10"); setT("15"); setThalf("5");
                      setShowResults(false); setTrigger(0); setShareUrl("");
                      window.history.replaceState(null, "", window.location.pathname);
                    }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && result && !("error" in result) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
                  <FlaskConical className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">{resultLabel}</p>
                  <h2 className="text-6xl font-black mt-4 tracking-tighter leading-none break-all">
                    {formatNum(resultValue)} <span className="text-2xl opacity-50 font-medium tracking-normal ml-2">{resultUnit}</span>
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Half-lives elapsed", value: formatNum(result.halfLivesElapsed, 3), color: "text-amber-500" },
                    { label: "Decay constant \u03BB", value: `${formatNum(result.decayConstant, 5)}/${UNIT_LABELS[unit]}`, color: "text-emerald-500" },
                    { label: "Mean lifetime \u03C4", value: `${formatNum(result.meanLifetime, 3)} ${UNIT_LABELS[unit]}`, color: "text-sky-500" },
                    { label: "Percent decayed", value: `${formatNum(result.percentDecayed, 2)}%`, color: "text-rose-500" },
                  ].map((item) => (
                    <div key={item.label} className="bg-card border rounded-[2rem] p-5 text-center shadow-sm">
                      <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest mb-2 leading-tight">{item.label}</p>
                      <h3 className={`text-lg font-black ${item.color} break-all`}>{item.value}</h3>
                    </div>
                  ))}
                </div>

                {/* CHART */}
                {chart && (
                  <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Activity size={20} className="text-blue-600" aria-hidden="true" /> Decay Curve
                    </h3>
                    <svg viewBox={`0 0 ${chart.width} ${chart.height}`} className="w-full h-auto" role="img" aria-label="Exponential decay curve from initial amount to remaining amount over time">
                      <line x1={chart.padL} y1={chart.height - chart.padB} x2={chart.width - 16} y2={chart.height - chart.padB} stroke="currentColor" strokeOpacity="0.15" />
                      <line x1={chart.padL} y1={16} x2={chart.padL} y2={chart.height - chart.padB} stroke="currentColor" strokeOpacity="0.15" />
                      <path d={chart.path} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1={chart.markerX} y1={chart.markerY} x2={chart.markerX} y2={chart.height - chart.padB} stroke="#2563eb" strokeDasharray="4 4" strokeOpacity="0.5" />
                      <circle cx={chart.markerX} cy={chart.markerY} r="5" fill="#2563eb" />
                      <text x={chart.padL} y={chart.height - 10} fontSize="11" fill="currentColor" opacity="0.6">0</text>
                      <text x={chart.width - 40} y={chart.height - 10} fontSize="11" fill="currentColor" opacity="0.6">{formatNum(chart.maxT, 2)} {UNIT_LABELS[unit]}</text>
                      <text x={8} y={22} fontSize="11" fill="currentColor" opacity="0.6">{formatNum(chart.maxN, 2)}</text>
                      <text x={8} y={chart.height - chart.padB} fontSize="11" fill="currentColor" opacity="0.6">0</text>
                    </svg>
                    <p className="text-xs text-muted-foreground mt-2">
                      The dot marks the point you solved for: t = {formatNum(result.t, 3)} {UNIT_LABELS[unit]}, N = {formatNum(result.Nt, 4)}.
                    </p>
                  </div>
                )}

                {/* DECAY TABLE */}
                <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
                  <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                    <Hourglass size={20} className="text-blue-600" aria-hidden="true" /> Amount Remaining Over Time
                  </h3>
                  <div className="overflow-hidden rounded-2xl border">
                    <table className="w-full text-sm">
                      <thead className="bg-secondary/50">
                        <tr>
                          <th className="px-6 py-4 text-left font-black uppercase text-[10px] tracking-widest text-muted-foreground">Time ({UNIT_LABELS[unit]})</th>
                          <th className="px-6 py-4 text-right font-black uppercase text-[10px] tracking-widest text-muted-foreground">Amount remaining</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {decayTable.map((row, i) => (
                          <tr key={i} className="hover:bg-secondary/20 transition-colors">
                            <td className="px-6 py-4 font-bold flex items-center gap-2">
                              <ChevronRight size={12} className="text-blue-500" aria-hidden="true" /> {formatNum(row.time, 3)}
                            </td>
                            <td className="px-6 py-4 text-right font-mono text-blue-600 font-bold">{formatNum(row.value, 6)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                        aria-label="Shareable link for this half-life result"
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
                      Anyone who opens this link sees the same inputs and the same solved result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                <FlaskConical size={60} className="opacity-5 mb-6" aria-hidden="true" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                  {result && "error" in result ? (
                    <span className="text-red-500 normal-case tracking-normal">{result.error}</span>
                  ) : (
                    "Pick what you want to solve for, fill in the rest, and calculate"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* HALF-LIFE / MEAN LIFETIME / DECAY CONSTANT CONVERTER */}
        <DecayConstantConverter unit={unit} />

        <RelatedCalculators
          calculators={[
            { name: "Percentage Calculator", href: "/calculators/math/percentage-calculator", description: "Work out percent change and shares", icon: Sigma },
            { name: "Age Calculator", href: "/calculators/time/age-calculator", description: "Estimate your age", icon: Activity },
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
  onEdited,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEdited?: () => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => { onChange(e.target.value); onEdited?.(); }}
        className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-xl outline-none focus:ring-2 ring-blue-500/20"
      />
    </div>
  );
}

type KnownField = "thalf" | "meanLife" | "decayConstant";

function DecayConstantConverter({ unit }: { unit: string }) {
  const [known, setKnown] = useState<KnownField>("thalf");
  const [value, setValue] = useState("5");

  const parsed = parseFloat(value);
  const valid = !isNaN(parsed) && parsed > 0;

  let thalf = NaN, meanLife = NaN, decayConstant = NaN;
  if (valid) {
    if (known === "thalf") {
      thalf = parsed;
      decayConstant = LN2 / thalf;
      meanLife = 1 / decayConstant;
    } else if (known === "meanLife") {
      meanLife = parsed;
      decayConstant = 1 / meanLife;
      thalf = LN2 * meanLife;
    } else {
      decayConstant = parsed;
      meanLife = 1 / decayConstant;
      thalf = LN2 / decayConstant;
    }
  }

  const fields: { key: KnownField; label: string; symbol: string; unitLabel: string; result: number }[] = [
    { key: "thalf", label: "Half-life", symbol: "t\u00BD", unitLabel: UNIT_LABELS[unit], result: thalf },
    { key: "meanLife", label: "Mean lifetime", symbol: "\u03C4", unitLabel: UNIT_LABELS[unit], result: meanLife },
    { key: "decayConstant", label: "Decay constant", symbol: "\u03BB", unitLabel: `1/${UNIT_LABELS[unit]}`, result: decayConstant },
  ];

  return (
    <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
      <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
        <ArrowLeftRight className="text-blue-600" size={22} aria-hidden="true" />
        Half-Life, Mean Lifetime &amp; Decay Constant Converter
      </h2>
      <p className="text-sm text-muted-foreground mb-6">
        Know one of these three, get the other two instantly.Click one of the boxes to edit it, and the others will update automatically.
      </p>

      <div className="grid md:grid-cols-3 gap-4">
        {fields.map((f) => (
          <div key={f.key} className={`rounded-2xl border p-5 ${known === f.key ? "border-blue-500 bg-blue-500/5" : "border-transparent bg-secondary"}`}>
            <button
              onClick={() => setKnown(f.key)}
              className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 flex items-center justify-between w-full"
            >
              <span>{f.label} ({f.symbol})</span>
              {known === f.key && <span className="text-blue-600">editing</span>}
            </button>
            {known === f.key ? (
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full bg-background/60 rounded-xl px-3 py-2 font-black text-lg outline-none focus:ring-2 ring-blue-500/20"
              />
            ) : (
              <p className="font-black text-lg break-all">
                {valid ? formatNum(f.result, 5) : "—"} <span className="text-xs font-medium text-muted-foreground">{f.unitLabel}</span>
              </p>
            )}
          </div>
        ))}
      </div>
      
    </div>
  );
}