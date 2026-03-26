"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Binary,
  RotateCcw,
  ListFilter,
  Code,
  Hash,
  CheckCircle2,
  Copy,
  Check,
  Heart,
  ArrowLeftRight,
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
  hex: string;
  operation: string;
};

export default function BinaryCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Input States
  const [valueA, setValueA] = useState("1010");
  const [valueB, setValueB] = useState("1100");
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  // UI States
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasLoadedHistory = useRef(false);

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
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();

    if (history["binary-calc"]?.data) {
      const data = history["binary-calc"].data;
      if (data.valueA) setValueA(data.valueA);
      if (data.valueB) setValueB(data.valueB);
      if (data.operator) setOperator(data.operator);
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
    saveCalculatorHistory("binary-calc", { valueA, valueB, operator });
  }, [valueA, valueB, operator, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): BinaryResult | { error: string } | null => {
    if (trigger === 0) return null;

    const numA = parseInt(valueA, 2);
    const numB = parseInt(valueB, 2);

    if (isNaN(numA) || (valueB !== "" && isNaN(numB))) {
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
      ? (256 + resVal).toString(2).padStart(8, "0") 
      : resVal.toString(2);

    return {
      binary,
      decimal: resVal.toString(10),
      hex: (resVal >= 0 ? resVal : 256 + resVal).toString(16).toUpperCase(),
      operation: `${valueA} ${operator} ${valueB}`,
    };
  }, [trigger, valueA, valueB, operator]);

  // --- 4. HANDLERS ---
  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
                className={`absolute top-6 right-6 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={22} />
                Binary Logic
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Value A</label>
                  <input
                    value={valueA}
                    onChange={(e) => {
                      setValueA(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="1010"
                    className="w-full p-4 bg-secondary rounded-2xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 tracking-widest"
                  />
                </div>

                <div className="flex justify-center">
                  <div className="bg-secondary p-1 rounded-xl flex gap-1">
                    {["+", "-", "*", "/"].map((op) => (
                      <button
                        key={op}
                        onClick={() => { setOperator(op as any); setShowResults(false); }}
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
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1 mb-2 block">Value B</label>
                  <input
                    value={valueB}
                    onChange={(e) => {
                      setValueB(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="1100"
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
                    onClick={() => { setValueA(""); setValueB(""); setOperator("+"); setShowResults(false); setTrigger(0); }}
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
                  <Binary className="absolute -right-4 -bottom-4 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                  <button 
                    onClick={() => handleCopy(results.binary)}
                    className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-2xl backdrop-blur-md transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.4em]">Calculated Binary</p>
                  <h2 className="text-6xl font-black mt-4 break-all tracking-tighter leading-none">
                    {results.binary}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Decimal Base", value: results.decimal, icon: Hash, color: "text-amber-500" },
                    { label: "Hexadecimal", value: `0x${results.hex}`, icon: Code, color: "text-emerald-500" }
                  ].map((item) => (
                    <div key={item.label} className="bg-card border rounded-[2rem] p-8 flex flex-col items-center text-center shadow-sm relative overflow-hidden group">
                      <item.icon className={`absolute -right-2 -top-2 w-16 h-16 opacity-5 ${item.color}`} />
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-4">{item.label}</p>
                      <h3 className={`text-4xl font-black ${item.color}`}>{item.value}</h3>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center transition-all">
                <Binary size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em] max-w-xs leading-loose">
                  {results && "error" in results ? (
                    <span className="text-red-500">{results.error}</span>
                  ) : (
                    "Initialize binary values to perform bitwise arithmetic"
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
              <ArrowLeftRight size={20} className="text-blue-500" /> Binary → Decimal
            </h3>
            <div className="flex flex-col gap-4">
              <input
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ""))}
                placeholder="1011001"
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
              <ArrowLeftRight size={20} className="text-blue-500" /> Decimal → Binary
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="255"
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
            { name: "Hex Calculator", description: "Base-16 operations", href: "/calculators/math/hex-calculator", icon: Code },
            { name: "LCM Calculator", description: "Least common multiple", href: "/calculators/math/lcm-calculator", icon: Hash },
          ]} 
        />
      </section>
    </main>
  );
}