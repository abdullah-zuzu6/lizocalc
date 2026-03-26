"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Code,
  RotateCcw,
  Hash,
  CheckCircle2,
  Cpu,
  Heart,
  Copy,
  Info
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

// --- Types & Interfaces ---
interface HexResult {
  hex: string;
  decimal: string;
  binary: string;
  operation: string;
}

interface ConversionCardProps {
  title: string;
  value: string;
  onChange: (v: string) => void;
  onConvert: () => void;
  result: string | null;
  prefix: string;
  type?: string;
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

export default function HexCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [valueA, setValueA] = useState("1A");
  const [valueB, setValueB] = useState("F2");
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  const [hexInput, setHexInput] = useState("");
  const [decimalResult, setDecimalResult] = useState<number | null>(null);

  const [decimalInput, setDecimalInput] = useState("");
  const [hexResult, setHexResult] = useState<string | null>(null);

  const calculatorInfo = {
    name: "Hex Calculator",
    href: "/calculators/math/hex-calculator",
    category: "Math",
  };

  const relatedCalculators = [
    {
      name: "Binary Calculator",
      description: "Base-2 arithmetic",
      href: "/calculators/math/binary-calculator",
      icon: Cpu,
    },
  ];

  // --- Initialization ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["hex-calc"]?.data) {
      const data = history["hex-calc"].data;
      setValueA(data.valueA || "1A");
      setValueB(data.valueB || "F2");
      setOperator(data.operator || "+");
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save & Sync ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("hex-calc", { valueA, valueB, operator });
  }, [valueA, valueB, operator, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo((): HexResult | { error: string } | null => {
    if (!showResults) return null;

    const numA = parseInt(valueA, 16);
    const numB = parseInt(valueB, 16);

    if (isNaN(numA) || isNaN(numB)) return { error: "Invalid hexadecimal value" };

    let res = 0;
    switch (operator) {
      case "+": res = numA + numB; break;
      case "-": res = numA - numB; break;
      case "*": res = numA * numB; break;
      case "/": 
        if (numB === 0) return { error: "Cannot divide by zero" };
        res = Math.floor(numA / numB); 
        break;
    }

    if (res < 0) return { error: "Negative result not supported" };

    return {
      hex: res.toString(16).toUpperCase(),
      decimal: res.toString(10),
      binary: res.toString(2).padStart(8, "0"),
      operation: `0x${valueA} ${operator === '*' ? '×' : operator === '/' ? '÷' : operator} 0x${valueB}`,
    };
  }, [showResults, valueA, valueB, operator]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <section className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Hash className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Hex Calculator</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Base-16 Arithmetic & Conversion</p>
            </div>
          </div>
          <button 
            onClick={handleToggleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
              isSaved ? "bg-red-50 border-red-100 text-red-500" : "bg-card hover:bg-secondary"
            }`}
          >
            <Heart size={18} className={isSaved ? "fill-current" : ""} />
            {isSaved ? "Saved" : "Save Tool"}
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* RESULTS PANEL */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !("error" in results) ? (
              <div className="space-y-4">
                <div className="bg-primary text-white rounded-3xl p-8 shadow-lg shadow-primary/20 relative overflow-hidden group">
                  <p className="text-[10px] uppercase font-black opacity-70 tracking-widest">Hexadecimal Result</p>
                  <div className="flex items-center justify-between mt-2">
                    <h2 className="text-5xl font-black truncate pr-4">0x{results.hex}</h2>
                    <button 
                      onClick={() => copyToClipboard(results.hex)}
                      className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    >
                      <Copy size={16} />
                    </button>
                  </div>

                  <div className="mt-6 bg-white/10 p-4 rounded-xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold opacity-60">Decimal Equivalent</p>
                    <p className="text-2xl font-black">{results.decimal}</p>
                  </div>
                </div>

                <div className="bg-card border rounded-3xl p-6 space-y-3">
                  <StatRow label="Binary Representation" value={results.binary} />
                  <StatRow label="Calculation Path" value={results.operation} />
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-3xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[300px]">
                <Code size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                  {results && "error" in results ? (results as { error: string }).error : "Compute values to see results"}
                </p>
              </div>
            )}
          </div>

          {/* INPUT PANEL */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="bg-card border rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 italic">
                <Cpu size={20} className="text-primary" /> Hex Engine
              </h2>
              
              <div className="grid md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-5">
                  <InputField
                    label="Operand A (Hex)"
                    value={valueA}
                    onChange={(v: string) => { setValueA(v); setShowResults(false); }}
                  />
                </div>

                <div className="md:col-span-2">
                  <select
                    value={operator}
                    onChange={(e) => { setOperator(e.target.value as any); setShowResults(false); }}
                    className="w-full p-4 bg-secondary rounded-xl text-center font-black text-xl border-2 border-transparent focus:border-primary transition-all outline-none cursor-pointer"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>
                </div>

                <div className="md:col-span-5">
                  <InputField
                    label="Operand B (Hex)"
                    value={valueB}
                    onChange={(v: string) => { setValueB(v); setShowResults(false); }}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setShowResults(true)}
                  className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md active:scale-[0.98]"
                >
                  CALCULATE HEX <CheckCircle2 size={18} />
                </button>

                <button
                  onClick={() => {
                    setValueA(""); setValueB(""); setOperator("+"); setShowResults(false);
                  }}
                  className="flex-1 py-4 bg-secondary text-muted-foreground rounded-2xl font-bold flex items-center justify-center gap-2 hover:text-foreground transition-all"
                >
                  <RotateCcw size={16} /> RESET
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONVERSION MODULES */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <ConversionCard 
            title="Hex to Decimal" 
            value={hexInput} 
            onChange={(v) => setHexInput(v.replace(/[^0-9a-fA-F]/g, ""))}
            onConvert={() => setDecimalResult(parseInt(hexInput, 16))}
            result={decimalResult?.toString() || null}
            prefix=""
          />
          <ConversionCard 
            title="Decimal to Hex" 
            type="number"
            value={decimalInput} 
            onChange={(v) => setDecimalInput(v)}
            onConvert={() => setHexResult(parseInt(decimalInput).toString(16).toUpperCase())}
            result={hexResult}
            prefix="0x"
          />
        </div>

        <div className="mt-8 p-6 bg-secondary/30 rounded-2xl border border-dashed border-muted-foreground/20">
            <h4 className="text-sm font-black uppercase mb-2 flex items-center gap-2">
                <Info size={14} /> Hexadecimal System
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
                Hexadecimal is a base-16 numbering system that uses sixteen distinct symbols: **0–9** and **A–F**. It is widely used in computing because it provides a human-friendly representation of binary-coded values. Each hex digit represents four binary bits (a nibble).
            </p>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

function InputField({ label, value, onChange }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9a-fA-F]/g, "").toUpperCase())}
        placeholder="e.g. 1A2F"
        className="w-full p-4 bg-secondary rounded-xl font-black text-lg border-2 border-transparent focus:border-primary outline-none transition-all placeholder:opacity-30"
      />
    </div>
  );
}

function ConversionCard({ title, value, onChange, onConvert, result, prefix, type="text" }: ConversionCardProps) {
    return (
        <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-4 text-muted-foreground">{title}</h3>
                <div className="flex gap-2">
                    <input
                        type={type}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className="flex-1 p-3 border rounded-xl bg-secondary font-bold focus:ring-2 ring-primary/20 outline-none"
                    />
                    <button onClick={onConvert} className="px-4 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary/90 transition-all">
                        CONVERT
                    </button>
                </div>
            </div>
            {result !== null && result !== "" && (
                <div className="mt-4 pt-4 border-t border-dashed text-center">
                    <span className="text-[10px] font-black uppercase opacity-50 block mb-1">Result</span>
                    <p className="text-2xl font-black text-primary tracking-tight">{prefix}{result}</p>
                </div>
            )}
        </div>
    )
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary/50 rounded-2xl gap-2">
      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="font-mono text-sm bg-background px-3 py-1 rounded-lg border font-bold text-primary break-all">{value}</span>
    </div>
  );
}