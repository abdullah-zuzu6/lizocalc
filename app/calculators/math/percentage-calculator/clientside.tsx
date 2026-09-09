"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Percent,
  ArrowLeftRight,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  RotateCcw,
  Heart,
  Share2,
  Copy,
  Check,
  Sigma,
  Divide,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

type EqSolve = "R" | "P" | "N";
type ChangeSolve = "old" | "new" | "pct";
type Direction = "increase" | "decrease";

function formatNum(n: number, digits = 4): string {
  if (!isFinite(n)) return "—";
  const rounded = parseFloat(n.toFixed(digits));
  return rounded.toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function PercentageCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const hasLoadedHistory = useRef(false);

  const calculatorInfo = {
    name: "Percentage Calculator",
    href: "/calculators/math/percentage-calculator",
    category: "Math",
  };

  // ---- Tool A: equation solver (P% of N = R) ----
  const [eqSolve, setEqSolve] = useState<EqSolve>("R");
  const [eqP, setEqP] = useState("20");
  const [eqN, setEqN] = useState("150");
  const [eqR, setEqR] = useState("30");
  const [eqShow, setEqShow] = useState(false);
  const [eqTrigger, setEqTrigger] = useState(0);
  const [eqShareUrl, setEqShareUrl] = useState("");
  const [eqLinkCopied, setEqLinkCopied] = useState(false);
  const eqResultsRef = useRef<HTMLDivElement>(null);

  // ---- Tool B: percentage difference ----
  const [v1, setV1] = useState("50");
  const [v2, setV2] = useState("70");
  const [diffShow, setDiffShow] = useState(false);
  const [diffTrigger, setDiffTrigger] = useState(0);
  const [diffShareUrl, setDiffShareUrl] = useState("");
  const [diffLinkCopied, setDiffLinkCopied] = useState(false);
  const diffResultsRef = useRef<HTMLDivElement>(null);

  // ---- Tool C: percentage change / increase-decrease ----
  const [chSolve, setChSolve] = useState<ChangeSolve>("new");
  const [chOld, setChOld] = useState("80");
  const [chNew, setChNew] = useState("100");
  const [chPct, setChPct] = useState("25");
  const [chDir, setChDir] = useState<Direction>("increase");
  const [chShow, setChShow] = useState(false);
  const [chTrigger, setChTrigger] = useState(0);
  const [chShareUrl, setChShareUrl] = useState("");
  const [chLinkCopied, setChLinkCopied] = useState(false);
  const chResultsRef = useRef<HTMLDivElement>(null);

  // --- 1. HYDRATION: shared link wins, otherwise load saved history ---
  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const tool = params.get("tool");

    if (tool === "equation") {
      const s = params.get("solve") as EqSolve | null;
      if (s === "R" || s === "P" || s === "N") setEqSolve(s);
      if (params.get("P")) setEqP(params.get("P")!);
      if (params.get("N")) setEqN(params.get("N")!);
      if (params.get("R")) setEqR(params.get("R")!);
      setEqShow(true);
      setEqTrigger((v) => v + 1);
    } else if (tool === "difference") {
      if (params.get("v1")) setV1(params.get("v1")!);
      if (params.get("v2")) setV2(params.get("v2")!);
      setDiffShow(true);
      setDiffTrigger((v) => v + 1);
    } else if (tool === "change") {
      const s = params.get("solve") as ChangeSolve | null;
      if (s === "old" || s === "new" || s === "pct") setChSolve(s);
      if (params.get("old")) setChOld(params.get("old")!);
      if (params.get("new")) setChNew(params.get("new")!);
      if (params.get("pct")) setChPct(params.get("pct")!);
      const d = params.get("dir") as Direction | null;
      if (d === "increase" || d === "decrease") setChDir(d);
      setChShow(true);
      setChTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["pct-calc"]?.data) {
        const d = history["pct-calc"].data;
        if (d.eqSolve) setEqSolve(d.eqSolve);
        if (d.eqP) setEqP(d.eqP);
        if (d.eqN) setEqN(d.eqN);
        if (d.eqR) setEqR(d.eqR);
        if (d.v1) setV1(d.v1);
        if (d.v2) setV2(d.v2);
        if (d.chSolve) setChSolve(d.chSolve);
        if (d.chOld) setChOld(d.chOld);
        if (d.chNew) setChNew(d.chNew);
        if (d.chPct) setChPct(d.chPct);
        if (d.chDir) setChDir(d.chDir);
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
    saveCalculatorHistory("pct-calc", {
      eqSolve, eqP, eqN, eqR, v1, v2, chSolve, chOld, chNew, chPct, chDir,
    });
  }, [eqSolve, eqP, eqN, eqR, v1, v2, chSolve, chOld, chNew, chPct, chDir, isMounted]);

  // ================= TOOL A: EQUATION SOLVER =================
  const eqResult = useMemo(() => {
    if (eqTrigger === 0) return null;
    const P = parseFloat(eqP), N = parseFloat(eqN), R = parseFloat(eqR);

    if (eqSolve === "R") {
      if (isNaN(P) || isNaN(N)) return { error: "Enter both the percent and the base number." };
      return { R: (P / 100) * N, P, N };
    }
    if (eqSolve === "P") {
      if (isNaN(R) || isNaN(N)) return { error: "Enter both values." };
      if (N === 0) return { error: "The base number can't be zero." };
      return { P: (R / N) * 100, R, N };
    }
    // eqSolve === "N"
    if (isNaN(R) || isNaN(P)) return { error: "Enter both values." };
    if (P === 0) return { error: "The percent can't be zero when solving for the base number." };
    return { N: R / (P / 100), R, P };
  }, [eqTrigger, eqSolve, eqP, eqN, eqR]);

  useEffect(() => {
    if (!eqShow || !eqResult || "error" in eqResult) { setEqShareUrl(""); return; }
    const params = new URLSearchParams();
    params.set("tool", "equation");
    params.set("solve", eqSolve);
    params.set("P", eqP.trim());
    params.set("N", eqN.trim());
    params.set("R", eqR.trim());
    setEqShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [eqShow, eqResult, eqSolve, eqP, eqN, eqR]);

  const copyEqLink = useCallback(async () => {
    if (!eqShareUrl) return;
    try { await navigator.clipboard.writeText(eqShareUrl); setEqLinkCopied(true); setTimeout(() => setEqLinkCopied(false), 2000); } catch {}
  }, [eqShareUrl]);

  // --- Scroll Tool A results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!eqShow || !eqResult) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && eqResultsRef.current) {
      requestAnimationFrame(() => {
        eqResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [eqResult, eqShow]);

  // ================= TOOL B: DIFFERENCE =================
  const diffResult = useMemo(() => {
    if (diffTrigger === 0) return null;
    const a = parseFloat(v1), b = parseFloat(v2);
    if (isNaN(a) || isNaN(b)) return { error: "Enter both values." };
    if (a === 0 && b === 0) return { error: "Both values can't be zero." };
    const pct = (Math.abs(a - b) / ((a + b) / 2)) * 100;
    return { pct, a, b };
  }, [diffTrigger, v1, v2]);

  useEffect(() => {
    if (!diffShow || !diffResult || "error" in diffResult) { setDiffShareUrl(""); return; }
    const params = new URLSearchParams();
    params.set("tool", "difference");
    params.set("v1", v1.trim());
    params.set("v2", v2.trim());
    setDiffShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [diffShow, diffResult, v1, v2]);

  const copyDiffLink = useCallback(async () => {
    if (!diffShareUrl) return;
    try { await navigator.clipboard.writeText(diffShareUrl); setDiffLinkCopied(true); setTimeout(() => setDiffLinkCopied(false), 2000); } catch {}
  }, [diffShareUrl]);

  // --- Scroll Tool B results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!diffShow || !diffResult) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && diffResultsRef.current) {
      requestAnimationFrame(() => {
        diffResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [diffResult, diffShow]);

  // ================= TOOL C: CHANGE =================
  const chResult = useMemo(() => {
    if (chTrigger === 0) return null;
    const O = parseFloat(chOld), Nn = parseFloat(chNew), pctMag = parseFloat(chPct);
    const signedFraction = (mag: number, dir: Direction) => (dir === "increase" ? mag : -mag) / 100;

    if (chSolve === "new") {
      if (isNaN(O) || isNaN(pctMag)) return { error: "Enter both the old value and the percent." };
      if (pctMag < 0) return { error: "Enter the percent as a positive number and pick a direction." };
      const newVal = O * (1 + signedFraction(pctMag, chDir));
      return { old: O, new: newVal, pct: pctMag, dir: chDir };
    }
    if (chSolve === "old") {
      if (isNaN(Nn) || isNaN(pctMag)) return { error: "Enter both the new value and the percent." };
      if (pctMag < 0) return { error: "Enter the percent as a positive number and pick a direction." };
      const factor = 1 + signedFraction(pctMag, chDir);
      if (factor === 0) return { error: "A 100% decrease has no defined starting value from this direction." };
      const oldVal = Nn / factor;
      return { old: oldVal, new: Nn, pct: pctMag, dir: chDir };
    }
    // chSolve === "pct"
    if (isNaN(O) || isNaN(Nn)) return { error: "Enter both the old and new values." };
    if (O === 0) return { error: "The old value can't be zero — percent change from zero is undefined." };
    const raw = ((Nn - O) / O) * 100;
    const dir: Direction = raw >= 0 ? "increase" : "decrease";
    return { old: O, new: Nn, pct: Math.abs(raw), dir };
  }, [chTrigger, chSolve, chOld, chNew, chPct, chDir]);

  useEffect(() => {
    if (!chShow || !chResult || "error" in chResult) { setChShareUrl(""); return; }
    const params = new URLSearchParams();
    params.set("tool", "change");
    params.set("solve", chSolve);
    params.set("old", chOld.trim());
    params.set("new", chNew.trim());
    params.set("pct", chPct.trim());
    params.set("dir", chDir);
    setChShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [chShow, chResult, chSolve, chOld, chNew, chPct, chDir]);

  const copyChLink = useCallback(async () => {
    if (!chShareUrl) return;
    try { await navigator.clipboard.writeText(chShareUrl); setChLinkCopied(true); setTimeout(() => setChLinkCopied(false), 2000); } catch {}
  }, [chShareUrl]);

  // --- Scroll Tool C results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!chShow || !chResult) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && chResultsRef.current) {
      requestAnimationFrame(() => {
        chResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [chResult, chShow]);

  if (!isMounted) return null;

  const eqOptions: { key: EqSolve; label: string }[] = [
    { key: "R", label: "What is P% of N?" },
    { key: "P", label: "R is what % of N?" },
    { key: "N", label: "R is P% of what?" },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Percent className="text-blue-600" size={32} aria-hidden="true" /> Percentage Calculator
            </h2>
            
          </div>
          <button
            onClick={handleToggleSave}
            aria-label={isSaved ? "Remove Percentage Calculator from saved" : "Save Percentage Calculator"}
            aria-pressed={isSaved}
            className={`p-3 rounded-xl transition-all border shrink-0 ${
              isSaved ? "bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <Heart size={24} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
          </button>
        </div>

        {/* TOOL A: EQUATION SOLVER */}
        <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground mb-1">
            <Percent size={16} className="text-blue-500" aria-hidden="true" /> Percent Equation
          </h2>
          <p className="text-xs text-muted-foreground mb-5">P% of N = R — pick what you're solving for.</p>

          <div className="grid sm:grid-cols-3 gap-2 mb-5">
            {eqOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setEqSolve(opt.key); setEqShow(false); }}
                aria-pressed={eqSolve === opt.key}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border ${
                  eqSolve === opt.key ? "bg-blue-600 text-white border-blue-600" : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {eqSolve !== "P" && (
              <LabeledInput label="Percent (P)" value={eqP} onChange={setEqP} onEdited={() => setEqShow(false)} suffix="%" />
            )}
            {eqSolve !== "N" && (
              <LabeledInput label="Base number (N)" value={eqN} onChange={setEqN} onEdited={() => setEqShow(false)} />
            )}
            {eqSolve !== "R" && (
              <LabeledInput label="Result (R)" value={eqR} onChange={setEqR} onEdited={() => setEqShow(false)} />
            )}
          </div>

          <button
            onClick={() => { setEqTrigger((v) => v + 1); setEqShow(true); }}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 size={16} aria-hidden="true" /> Calculate
          </button>

          <div ref={eqResultsRef}>
            {eqShow && eqResult && (
              "error" in eqResult ? (
                <p className="mt-5 text-sm text-red-500 font-medium">{eqResult.error}</p>
              ) : (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
                      {eqSolve === "R" && "Result"}
                      {eqSolve === "P" && "Percent"}
                      {eqSolve === "N" && "Base number"}
                    </p>
                    <p className="text-3xl font-black text-blue-700 dark:text-blue-300">
                      {eqSolve === "R" && formatNum(eqResult.R!)}
                      {eqSolve === "P" && `${formatNum(eqResult.P!)}%`}
                      {eqSolve === "N" && formatNum(eqResult.N!)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatNum(eqResult.P!)}% of {formatNum(eqResult.N!)} is {formatNum(eqResult.R!)}
                    </p>
                  </div>
                  <ShareRow url={eqShareUrl} copied={eqLinkCopied} onCopy={copyEqLink} />
                </div>
              )
            )}
          </div>
        </div>

        {/* TOOL B: DIFFERENCE */}
        <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground mb-1">
            <ArrowLeftRight size={16} className="text-blue-500" aria-hidden="true" /> Percentage Difference
          </h2>
          <p className="text-xs text-muted-foreground mb-5">
            Two values, no direction — the order you enter them in doesn't change the answer.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-5">
            <LabeledInput label="Value 1" value={v1} onChange={setV1} onEdited={() => setDiffShow(false)} />
            <LabeledInput label="Value 2" value={v2} onChange={setV2} onEdited={() => setDiffShow(false)} />
          </div>

          <button
            onClick={() => { setDiffTrigger((v) => v + 1); setDiffShow(true); }}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 size={16} aria-hidden="true" /> Calculate
          </button>

          <div ref={diffResultsRef}>
            {diffShow && diffResult && (
              "error" in diffResult ? (
                <p className="mt-5 text-sm text-red-500 font-medium">{diffResult.error}</p>
              ) : (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="p-5 bg-blue-50 dark:bg-blue-950/30 rounded-xl text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">Percentage difference</p>
                    <p className="text-3xl font-black text-blue-700 dark:text-blue-300">{formatNum(diffResult.pct)}%</p>
                  </div>
                  <ShareRow url={diffShareUrl} copied={diffLinkCopied} onCopy={copyDiffLink} />
                </div>
              )
            )}
          </div>
        </div>

        {/* TOOL C: CHANGE */}
        <div className="bg-card border rounded-[2rem] p-6 md:p-8 shadow-sm">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp size={16} className="text-blue-500" aria-hidden="true" /> Percentage Change
          </h2>
          <p className="text-xs text-muted-foreground mb-5">
            An old value, a new value, and the percent between them — solve for any one of the three.
          </p>

          <div className="grid sm:grid-cols-3 gap-2 mb-5">
            {[
              { key: "new" as ChangeSolve, label: "Find the new value" },
              { key: "old" as ChangeSolve, label: "Find the old value" },
              { key: "pct" as ChangeSolve, label: "Find the percent change" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => { setChSolve(opt.key); setChShow(false); }}
                aria-pressed={chSolve === opt.key}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all border ${
                  chSolve === opt.key ? "bg-blue-600 text-white border-blue-600" : "bg-secondary text-muted-foreground border-transparent hover:bg-secondary/80"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {chSolve !== "old" && (
              <LabeledInput label="Old value" value={chOld} onChange={setChOld} onEdited={() => setChShow(false)} />
            )}
            {chSolve !== "new" && (
              <LabeledInput label="New value" value={chNew} onChange={setChNew} onEdited={() => setChShow(false)} />
            )}
            {chSolve !== "pct" && (
              <div>
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1 mb-1 block">Percent</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={chPct}
                    onChange={(e) => { setChPct(e.target.value); setChShow(false); }}
                    className="w-full p-3 bg-secondary/60 rounded-xl border font-bold text-lg outline-none focus:ring-2 ring-blue-500/20"
                  />
                  <select
                    value={chDir}
                    onChange={(e) => { setChDir(e.target.value as Direction); setChShow(false); }}
                    className="bg-secondary/60 rounded-xl border font-bold text-sm px-2 outline-none focus:ring-2 ring-blue-500/20"
                  >
                    <option value="increase">Increase</option>
                    <option value="decrease">Decrease</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => { setChTrigger((v) => v + 1); setChShow(true); }}
            className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
          >
            <CheckCircle2 size={16} aria-hidden="true" /> Calculate
          </button>

          <div ref={chResultsRef}>
            {chShow && chResult && (
              "error" in chResult ? (
                <p className="mt-5 text-sm text-red-500 font-medium">{chResult.error}</p>
              ) : (
                <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className={`p-5 rounded-xl text-center ${chResult.dir === "increase" ? "bg-emerald-50 dark:bg-emerald-950/30" : "bg-rose-50 dark:bg-rose-950/30"}`}>
                    <p className={`text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1 mb-1 ${chResult.dir === "increase" ? "text-emerald-600" : "text-rose-600"}`}>
                      {chResult.dir === "increase" ? <TrendingUp size={12} aria-hidden="true" /> : <TrendingDown size={12} aria-hidden="true" />}
                      {chSolve === "pct" ? (chResult.dir === "increase" ? "Increase" : "Decrease") : chSolve === "new" ? "New value" : "Old value"}
                    </p>
                    <p className={`text-3xl font-black ${chResult.dir === "increase" ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
                      {chSolve === "pct" ? `${formatNum(chResult.pct)}%` : chSolve === "new" ? formatNum(chResult.new) : formatNum(chResult.old)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {formatNum(chResult.old)} → {formatNum(chResult.new)} is a {formatNum(chResult.pct)}% {chResult.dir}
                    </p>
                  </div>
                  <ShareRow url={chShareUrl} copied={chLinkCopied} onCopy={copyChLink} />
                </div>
              )
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            { name: "Fraction Calculator", description: "Operations with fractions", href: "/calculators/math/fraction-calculator", icon: Divide },
            { name: "Half-Life Calculator", description: "Exponential decay solver", href: "/calculators/math/half-life-calculator", icon: Sigma },
          ]}
        />
      </section>
    </main>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  onEdited,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onEdited?: () => void;
  suffix?: string;
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground ml-1 mb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => { onChange(e.target.value); onEdited?.(); }}
          className="w-full p-3 bg-secondary/60 rounded-xl border font-bold text-lg outline-none focus:ring-2 ring-blue-500/20"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">{suffix}</span>
        )}
      </div>
    </div>
  );
}

function ShareRow({ url, copied, onCopy }: { url: string; copied: boolean; onCopy: () => void }) {
  if (!url) return null;
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
        <Share2 size={12} className="text-blue-600" aria-hidden="true" />
        Share This Result
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          readOnly
          value={url}
          onFocus={(e) => e.target.select()}
          aria-label="Shareable link for this percentage result"
          className="flex-1 px-4 py-2.5 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-xs font-medium truncate"
        />
        <button
          onClick={onCopy}
          className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
            copied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {copied ? (<><Check size={14} /> COPIED</>) : (<><Copy size={14} /> COPY LINK</>)}
        </button>
      </div>
    </div>
  );
}