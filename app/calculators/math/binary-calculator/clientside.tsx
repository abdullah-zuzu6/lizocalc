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
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type BinaryResult = {
  binary: string;
  decimal: string;
  hex: string;
  operation: string;
};

export default function BinaryCalculator() {
  // Input States
  const [valueA, setValueA] = useState("1010");
  const [valueB, setValueB] = useState("1100");
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  // UI States
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasLoadedHistory = useRef(false);

  // Converter States
  const [binaryInput, setBinaryInput] = useState("");
  const [decimalResult, setDecimalResult] = useState<number | null>(null);
  const [decimalInput, setDecimalInput] = useState("");
  const [binaryResult, setBinaryResult] = useState<string | null>(null);

  const relatedCalculators = [
    {
      name: "Hex Calculator",
      description: "Base-16 operations",
      href: "/calculators/math/hex-calculator",
      icon: Code,
    },
  ];

  // --- 1. HYDRATION & DATA LOADING ---
  useEffect(() => {
    setIsMounted(true);

    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    // Only load if user gave functional cookie consent
    if (consent?.functional && history["binary-calc"]?.data) {
      const data = history["binary-calc"].data;
      if (data.valueA) setValueA(data.valueA);
      if (data.valueB) setValueB(data.valueB);
      if (data.operator) setOperator(data.operator);
    }
    
    // Mark as loaded so the Save effect doesn't overwrite with defaults
    hasLoadedHistory.current = true;
  }, []);

  // --- 2. AUTO-SAVE TO COOKIES ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;

    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("binary-calc", {
        valueA,
        valueB,
        operator,
      });
    }
  }, [valueA, valueB, operator, isMounted]);

  // --- 3. CALCULATION LOGIC ---
  const results = useMemo((): BinaryResult | { error: string } | null => {
    if (trigger === 0) return null;

    const numA = parseInt(valueA, 2);
    const numB = parseInt(valueB, 2);

    if (isNaN(numA) || isNaN(numB)) {
      return { error: "Please enter valid binary digits (0 or 1)." };
    }

    let result = 0;
    switch (operator) {
      case "+": result = numA + numB; break;
      case "-": result = numA - numB; break;
      case "*": result = numA * numB; break;
      case "/": 
        if (numB === 0) return { error: "Cannot divide by zero." };
        result = Math.floor(numA / numB); 
        break;
    }

    // Convert to binary (handling 8-bit 2's complement for negatives)
    const binary = result < 0 
      ? (256 + result).toString(2).padStart(8, "0") 
      : result.toString(2);

    return {
      binary,
      decimal: result.toString(10),
      hex: (result >= 0 ? result : 256 + result).toString(16).toUpperCase(),
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

  const resetCalculator = () => {
    setValueA("");
    setValueB("");
    setOperator("+");
    setShowResults(false);
    setTrigger(0);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} />
                Binary Inputs
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Binary A</label>
                  <input
                    value={valueA}
                    onChange={(e) => {
                      setValueA(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="e.g. 1010"
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Operation</label>
                  <select
                    value={operator}
                    onChange={(e) => {
                      setOperator(e.target.value as any);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Binary B</label>
                  <input
                    value={valueB}
                    onChange={(e) => {
                      setValueB(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    placeholder="e.g. 1100"
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    Calculate Binary <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={resetCalculator}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold flex items-center justify-center gap-2 hover:bg-secondary/80 transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-card border rounded-xl p-6 text-center relative group">
                  <button 
                    onClick={() => handleCopy(results.binary)}
                    className="absolute top-4 right-4 p-2 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy Result"
                  >
                    {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Binary Result</p>
                  <h2 className="text-5xl font-black text-blue-600 mt-3 break-all tracking-tighter">
                    {results.binary}
                  </h2>
                </div>

                <div className="bg-card border rounded-xl p-6 space-y-3 flex flex-col justify-center">
                  {[
                    { label: "Decimal", value: results.decimal },
                    { label: "Hex", value: `0x${results.hex}` },
                    { label: "Operation", value: results.operation }
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between items-center bg-secondary/50 p-3 rounded-lg border border-border/50">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="font-mono text-blue-600 font-bold">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Binary size={48} className="opacity-10 mb-4" />
                <p className="font-bold text-muted-foreground max-w-[250px]">
                  {results && "error" in results ? (
                    <span className="text-red-500">{results.error}</span>
                  ) : (
                    "Enter two binary values and click calculate to see the result."
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CONVERTERS SECTION */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Binary to Decimal */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Binary size={18} className="text-blue-500" /> Binary to Decimal
            </h3>
            <div className="flex flex-col gap-4">
              <input
                value={binaryInput}
                onChange={(e) => setBinaryInput(e.target.value.replace(/[^01]/g, ""))}
                placeholder="Enter Binary (e.g. 1011)"
                className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
              />
              <button
                onClick={() => {
                  const val = parseInt(binaryInput, 2);
                  setDecimalResult(isNaN(val) ? null : val);
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Convert
              </button>
              {decimalResult !== null && (
                <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <span className="text-3xl font-black text-blue-600">{decimalResult}</span>
                </div>
              )}
            </div>
          </div>

          {/* Decimal to Binary */}
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Hash size={18} className="text-blue-500" /> Decimal to Binary
            </h3>
            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={decimalInput}
                onChange={(e) => setDecimalInput(e.target.value)}
                placeholder="Enter Decimal (e.g. 15)"
                className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
              />
              <button
                onClick={() => {
                  const num = parseInt(decimalInput);
                  if (!isNaN(num)) setBinaryResult(num.toString(2));
                }}
                className="w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 transition-colors"
              >
                Convert
              </button>
              {binaryResult && (
                <div className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <span className="text-3xl font-black text-blue-600 break-all">{binaryResult}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}