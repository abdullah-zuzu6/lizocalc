"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Binary,
  RotateCcw,
  ListFilter,
  Hash,
  CheckCircle2,
  Copy,
  Check,
  Heart,
  ArrowLeftRight,
  Share2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

type BinaryResult = {
  binary: string;
  decimal: string;
  operation: string;
};

type OperatorType = "+" | "-" | "*" | "/";

export default function BinaryCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Input States
  const [valueA, setValueA] = useState("1010");
  const [valueB, setValueB] = useState("1100");
  const [operator, setOperator] = useState<OperatorType>("+");

  // UI States
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasLoadedHistory = useRef(false);

  // Share link
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);

  // Converter States
  const [binaryInput, setBinaryInput] = useState("");
  const [decimalResult, setDecimalResult] = useState<number | null>(null);
  const [decimalInput, setDecimalInput] = useState("");
  const [binaryResult, setBinaryResult] = useState<string | null>(null);

  const calculatorInfo = {
    name: "Binary Calculator",
    href: "/calculators/math/binary-calculator",
    category: "Math",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?a=...&b=...&op=...) wins over saved history, since the
  // point of sharing is to show someone else the exact same result.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedA = params.get("a");
    const sharedB = params.get("b");
    const sharedOp = params.get("op");

    if (sharedA !== null && sharedB !== null && sharedOp && ["+", "-", "*", "/"].includes(sharedOp)) {
      setValueA(sharedA.replace(/[^01]/g, ""));
      setValueB(sharedB.replace(/[^01]/g, ""));
      setOperator(sharedOp as OperatorType);
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["binary-calc"]?.data) {
        const data = history["binary-calc"].data;
        if (data.valueA) setValueA(data.valueA);
        if (data.valueB) setValueB(data.valueB);
        if (data.operator) setOperator(data.operator);
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
    saveCalculatorHistory("binary-calc", { valueA, valueB, operator });
  }, [valueA, valueB, operator, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): BinaryResult | { error: string } | null => {
    if (trigger === 0) return null;

    if (valueA === "" || valueB === "") {
      return { error: "Enter a binary value in both fields." };
    }

    const numA = parseInt(valueA, 2);
    const numB = parseInt(valueB, 2);

    if (isNaN(numA) || isNaN(numB)) {
      return { error: "Please enter valid binary digits (0 or 1)." };
    }

    let resVal = 0;
    switch (operator) {
      case "+": resVal = numA + numB; break;
      case "-": resVal = numA - numB; break;
      case "*": resVal = numA * numB; break;
      case "/":
        if (numB === 0) return { error: "Cannot divide by zero." };
        resVal = Math.floor(numA / numB);
        break;
    }

    const binary = resVal < 0
      ? `-${Math.abs(resVal).toString(2)}`
      : resVal.toString(2);

    return {
      binary,
      decimal: resVal.toString(10),
      operation: `${valueA} ${operator} ${valueB}`,
    };
  }, [trigger, valueA, valueB, operator]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("a", valueA);
    params.set("b", valueB);
    params.set("op", operator);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, valueA, valueB, operator]);

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
    setValueA("");
    setValueB("");
    setOperator("+");
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
                aria-label={isSaved ? "Remove Binary Calculator from saved" : "Save Binary Calculator"}
                aria-pressed={isSaved}
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={22} />
                Binary Logic
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="value-a" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Value A</label>
                  <input
                    id="value-a"
                    value={valueA}
                    onChange={(e) => {
                      setValueA(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="1010"
                    aria-label="Binary value A"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 tracking-widest"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="bg-secondary p-1 rounded-xl flex gap-1" role="group" aria-label="Operator">
                    {["+", "-", "*", "/"].map((op) => (
                      <button
                        key={op}
                        onClick={() => { setOperator(op as OperatorType); setShowResults(false); }}
                        aria-label={op === "*" ? "Multiply" : op === "/" ? "Divide" : op === "+" ? "Add" : "Subtract"}
                        aria-pressed={operator === op}
                        className={`w-12 h-12 rounded-lg font-black text-xl transition-all ${
                          operator === op ? "bg-blue-600 text-white shadow-lg" : "text-muted-foreground hover:bg-background"
                        }`}
                      >
                        {op === "*" ? "×" : op === "/" ? "÷" : op}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="value-b" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Value B</label>
                  <input
                    id="value-b"
                    value={valueB}
                    onChange={(e) => {
                      setValueB(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="1100"
                    aria-label="Binary value B"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 tracking-widest"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-blue-500/10"
                  >
                    Compute <CheckCircle2 size={18} />
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
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[3rem] p-10 shadow-xl relative overflow-hidden group">
                  <Binary className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" aria-hidden="true" />
                  <button
                    onClick={() => handleCopy(results.binary)}
                    aria-label="Copy binary result"
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">Binary Value</p>
                  <h2 className="text-6xl font-black mt-4 break-all tracking-tighter leading-none">
                    {results.binary}
                  </h2>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                  <Hash className="absolute -right-2 -top-2 w-16 h-16 opacity-5 text-amber-500" aria-hidden="true" />
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">Decimal Value</p>
                  <h3 className="text-4xl font-black text-amber-500">{results.decimal}</h3>
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
                      Anyone who opens this link sees the same two values, the same operator, and the same result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                <Binary size={60} className="opacity-5 mb-6" aria-hidden="true" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                  {results && "error" in results ? (
                    <span className="text-red-500">{results.error}</span>
                  ) : (
                    "Enter two binary values to see the result"
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* QUICK CONVERTERS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <ArrowLeftRight size={20} className="text-blue-500" aria-hidden="true" /> Binary Value to Decimal Value
            </h3>
            <div className="flex flex-col gap-4">
              <input
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ""))}
                placeholder="1011001"
                aria-label="Binary number to convert"
                className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-xl outline-none"
              />
              <button
                onClick={() => {
                  const val = parseInt(binaryInput, 2);
                  setDecimalResult(isNaN(val) ? null : val);
                }}
                className="w-full py-4 bg-secondary text-foreground hover:bg-blue-600 hover:text-white rounded-2xl font-black transition-all"
              >
                Convert
              </button>
              {decimalResult !== null && (
                <div className="mt-2 p-6 bg-blue-600 rounded-[1.5rem] text-center animate-in zoom-in-95 duration-300">
                  <span className="text-3xl font-black text-white">{decimalResult}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <ArrowLeftRight size={20} className="text-blue-500" aria-hidden="true" /> Decimal Value to Binary Value
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="255"
                aria-label="Decimal number to convert"
                className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-xl outline-none"
              />
              <button
                onClick={() => {
                  const num = parseInt(decimalInput);
                  if (!isNaN(num)) setBinaryResult(num.toString(2));
                }}
                className="w-full py-4 bg-secondary text-foreground hover:bg-blue-600 hover:text-white rounded-2xl font-black transition-all"
              >
                Convert
              </button>
              {binaryResult && (
                <div className="mt-2 p-6 bg-blue-600 rounded-[1.5rem] text-center animate-in zoom-in-95 duration-300">
                  <span className="text-3xl font-black text-white break-all tracking-widest">{binaryResult}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            { name: "Hex Calculator", description: "Base-16 operations", href: "/calculators/math/hexadecimal-calculator", icon: Hash },
          ]}
        />
      </section>
    </main>
  );
}