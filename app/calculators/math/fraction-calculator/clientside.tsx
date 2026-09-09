"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  RotateCcw,
  ListFilter,
  CheckCircle2,
  Layers,
  Heart,
  ArrowRight,
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

type OperationType = "add" | "sub" | "mul" | "div";

type FractionSteps = {
  commonDenominator?: number;
  convertedA?: { n: number; d: number };
  convertedB?: { n: number; d: number };
  combinedNumerator?: number;
  rawNumerator: number;
  rawDenominator: number;
  gcdValue: number;
};

type FractionResult = {
  numerator: number;
  denominator: number;
  decimal: number;
  steps: FractionSteps;
};

// Renders a number stacked over another with a bar between them, the way a
// fraction actually looks on paper instead of a flat "a/b" string.
function FractionDisplay({
  numerator,
  denominator,
  size = "text-xl",
}: {
  numerator: number | string;
  denominator: number | string;
  size?: string;
}) {
  return (
    <span className={`inline-flex flex-col items-center mx-1 align-middle leading-none ${size}`}>
      <span className="px-1">{numerator}</span>
      <span className="w-full border-t-2 border-current my-0.5" />
      <span className="px-1">{denominator}</span>
    </span>
  );
}

export default function FractionCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const hasLoadedHistory = useRef(false);

  // Input state
  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);
  const [operation, setOperation] = useState<OperationType>("add");

  // UI state
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);

  // Share link
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Fraction Calculator",
    href: "/calculators/math/fraction-calculator",
    category: "Mathematics",
  };

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a || 1;
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?n1=...&d1=...&n2=...&d2=...&op=...) wins over saved
  // history, since the point of sharing is showing someone the exact answer.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedN1 = params.get("n1");
    const sharedD1 = params.get("d1");
    const sharedN2 = params.get("n2");
    const sharedD2 = params.get("d2");
    const sharedOp = params.get("op");

    if (
      sharedN1 !== null &&
      sharedD1 !== null &&
      sharedN2 !== null &&
      sharedD2 !== null &&
      sharedOp &&
      ["add", "sub", "mul", "div"].includes(sharedOp)
    ) {
      const pN1 = parseInt(sharedN1, 10);
      const pD1 = parseInt(sharedD1, 10);
      const pN2 = parseInt(sharedN2, 10);
      const pD2 = parseInt(sharedD2, 10);
      if (!isNaN(pN1)) setNum1(pN1);
      if (!isNaN(pD1)) setDen1(pD1);
      if (!isNaN(pN2)) setNum2(pN2);
      if (!isNaN(pD2)) setDen2(pD2);
      setOperation(sharedOp as OperationType);
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["fraction-calc"]?.data) {
        const data = history["fraction-calc"].data;
        setNum1(data.num1 ?? 1);
        setDen1(data.den1 ?? 2);
        setNum2(data.num2 ?? 1);
        setDen2(data.den2 ?? 3);
        setOperation(data.operation ?? "add");
        setShowResults(true);
        setTrigger((v) => v + 1);
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

  // --- 2. AUTO-SAVE TO COOKIES ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
    saveCalculatorHistory("fraction-calc", { num1, den1, num2, den2, operation });
  }, [num1, den1, num2, den2, operation, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): FractionResult | { error: string } | null => {
    if (trigger === 0) return null;

    if (den1 === 0 || den2 === 0) {
      return { error: "A denominator can't be zero." };
    }

    let rawNumerator = 0;
    let rawDenominator = 1;
    let commonDenominator: number | undefined;
    let convertedA: { n: number; d: number } | undefined;
    let convertedB: { n: number; d: number } | undefined;
    let combinedNumerator: number | undefined;

    if (operation === "add" || operation === "sub") {
      commonDenominator = den1 * den2;
      const a = num1 * den2;
      const b = num2 * den1;
      convertedA = { n: a, d: commonDenominator };
      convertedB = { n: b, d: commonDenominator };
      combinedNumerator = operation === "add" ? a + b : a - b;
      rawNumerator = combinedNumerator;
      rawDenominator = commonDenominator;
    } else if (operation === "mul") {
      rawNumerator = num1 * num2;
      rawDenominator = den1 * den2;
    } else {
      // Division: keep the first fraction, flip the second, then multiply.
      if (num2 === 0) return { error: "Can't divide by a fraction that equals zero." };
      rawNumerator = num1 * den2;
      rawDenominator = den1 * num2;
    }

    if (rawDenominator === 0) return { error: "That result has a zero denominator." };

    // Keep the denominator positive; push any negative sign onto the numerator.
    if (rawDenominator < 0) {
      rawNumerator = -rawNumerator;
      rawDenominator = -rawDenominator;
    }

    const g = gcd(rawNumerator, rawDenominator);
    const simplifiedN = rawNumerator / g;
    const simplifiedD = rawDenominator / g;

    return {
      numerator: simplifiedN,
      denominator: simplifiedD,
      decimal: simplifiedD !== 0 ? simplifiedN / simplifiedD : 0,
      steps: {
        commonDenominator,
        convertedA,
        convertedB,
        combinedNumerator,
        rawNumerator,
        rawDenominator,
        gcdValue: g,
      },
    };
  }, [trigger, num1, den1, num2, den2, operation]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("n1", String(num1));
    params.set("d1", String(den1));
    params.set("n2", String(num2));
    params.set("d2", String(den2));
    params.set("op", operation);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, num1, den1, num2, den2, operation]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail without permission; the link is still
      // visible in the input and can be selected and copied by hand.
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
    setNum1(1);
    setDen1(2);
    setNum2(1);
    setDen2(3);
    setOperation("add");
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const opSymbol = operation === "add" ? "+" : operation === "sub" ? "−" : operation === "mul" ? "×" : "÷";

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove Fraction Calculator from saved" : "Save Fraction Calculator"}
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} aria-hidden="true" /> Parameters
              </h2>

              <div className="space-y-6">
                {/* FRACTION 1 */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block ml-1">Fraction 1</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => { setNum1(Number(e.target.value)); setShowResults(false); }}
                      aria-label="Numerator of first fraction"
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="h-px w-4 bg-border shrink-0" />
                    <input
                      type="number"
                      value={den1}
                      onChange={(e) => { setDen1(Number(e.target.value)); setShowResults(false); }}
                      aria-label="Denominator of first fraction"
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* OPERATION SELECTOR */}
                <div className="flex justify-center py-2">
                  <select
                    value={operation}
                    onChange={(e) => { setOperation(e.target.value as OperationType); setShowResults(false); }}
                    aria-label="Operation"
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all cursor-pointer outline-none ring-4 ring-blue-500/10"
                  >
                    <option value="add">Addition (+)</option>
                    <option value="sub">Subtraction (−)</option>
                    <option value="mul">Multiplication (×)</option>
                    <option value="div">Division (÷)</option>
                  </select>
                </div>

                {/* FRACTION 2 */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block ml-1">Fraction 2</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => { setNum2(Number(e.target.value)); setShowResults(false); }}
                      aria-label="Numerator of second fraction"
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                    <div className="h-px w-4 bg-border shrink-0" />
                    <input
                      type="number"
                      value={den2}
                      onChange={(e) => { setDen2(Number(e.target.value)); setShowResults(false); }}
                      aria-label="Denominator of second fraction"
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold text-center focus:border-blue-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate Result <CheckCircle2 size={16} aria-hidden="true" />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="bg-card border rounded-xl p-8 text-center shadow-sm relative overflow-hidden">
                  <button
                    onClick={() => handleCopy(`${results.numerator}/${results.denominator}`)}
                    aria-label="Copy result"
                    className="absolute top-6 right-6 p-2.5 bg-secondary hover:bg-secondary/80 rounded-xl transition-all"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                  </button>

                  <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-4">Simplified Result</p>

                  <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
                    <div className="opacity-40 flex items-center">
                      <FractionDisplay numerator={num1} denominator={den1} size="text-3xl font-black" />
                      <span className="mx-2 text-3xl font-black">{opSymbol}</span>
                      <FractionDisplay numerator={num2} denominator={den2} size="text-3xl font-black" />
                    </div>
                    <ArrowRight className="text-blue-500 shrink-0" size={24} aria-hidden="true" />
                    <FractionDisplay
                      numerator={results.numerator}
                      denominator={results.denominator}
                      size="text-6xl font-black text-blue-600 tracking-tighter"
                    />
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-xs font-bold text-muted-foreground">
                    Decimal Equivalent: <span className="text-foreground">{results.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                  </div>
                </div>

                {/* STEP-BY-STEP CALCULATION */}
                <div className="bg-card border rounded-xl p-8 shadow-sm">
                  <h3 className="font-bold text-xl mb-6">Step-by-step calculation</h3>
                  <div className="space-y-5">
                    {(operation === "add" || operation === "sub") && (
                      <>
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                          <p className="text-sm leading-relaxed pt-1">
                            Multiply the two denominators to get a common denominator: {den1} × {den2} = <strong>{results.steps.commonDenominator}</strong>.
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
                          <p className="text-sm leading-relaxed pt-1">
                            Rewrite each fraction over that denominator: {num1} × {den2} = {results.steps.convertedA?.n}, and {num2} × {den1} = {results.steps.convertedB?.n}.
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">3</span>
                          <p className="text-sm leading-relaxed pt-1">
                            {operation === "add" ? "Add" : "Subtract"} the new numerators: {results.steps.convertedA?.n} {operation === "add" ? "+" : "−"} {results.steps.convertedB?.n} = <strong>{results.steps.combinedNumerator}</strong>.
                          </p>
                        </div>
                      </>
                    )}

                    {operation === "mul" && (
                      <div className="flex items-start gap-4">
                        <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                        <p className="text-sm leading-relaxed pt-1">
                          Multiply the numerators together and the denominators together: {num1} × {num2} = {results.steps.rawNumerator}, and {den1} × {den2} = {results.steps.rawDenominator}.
                        </p>
                      </div>
                    )}

                    {operation === "div" && (
                      <>
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">1</span>
                          <p className="text-sm leading-relaxed pt-1">
                            Keep the first fraction, change ÷ to ×, and flip the second fraction: {num2}/{den2} becomes {den2}/{num2}.
                          </p>
                        </div>
                        <div className="flex items-start gap-4">
                          <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">2</span>
                          <p className="text-sm leading-relaxed pt-1">
                            Multiply straight across: {num1} × {den2} = {results.steps.rawNumerator}, and {den1} × {num2} = {results.steps.rawDenominator}.
                          </p>
                        </div>
                      </>
                    )}

                    <div className="flex items-start gap-4">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                        {operation === "mul" ? 2 : operation === "div" ? 3 : 4}
                      </span>
                      <p className="text-sm leading-relaxed pt-1">
                        That gives {results.steps.rawNumerator}/{results.steps.rawDenominator}.{" "}
                        {results.steps.gcdValue > 1
                          ? `The greatest common divisor of ${results.steps.rawNumerator} and ${results.steps.rawDenominator} is ${results.steps.gcdValue}, so dividing both by ${results.steps.gcdValue} gives the lowest terms: ${results.numerator}/${results.denominator}.`
                          : "It's already in its lowest terms."}
                      </p>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
                        {operation === "mul" ? 3 : operation === "div" ? 4 : 5}
                      </span>
                      <p className="text-sm leading-relaxed pt-1">
                        As a decimal, {results.numerator}/{results.denominator} works out to {results.decimal.toLocaleString(undefined, { maximumFractionDigits: 6 })}.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SHARE RESULT */}
                {shareUrl && (
                  <div className="bg-card border rounded-xl p-6 md:p-8 space-y-3">
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
                      Anyone who opens this link sees the same two fractions, the same operation, and the same result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                <Layers size={48} className="opacity-10 mb-4" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-widest max-w-xs text-center leading-loose">
                  {results && "error" in results ? (
                    <span className="text-red-500">{results.error}</span>
                  ) : (
                    "Enter two fractions to see the result and every step"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "LCM Calculator", description: "Find Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: Layers },
          { name: "GCF Calculator", description: "Greatest Common Factor", href: "/calculators/math/gcf-calculator", icon: Layers },
        ]} />
      </section>
    </main>
  );
}