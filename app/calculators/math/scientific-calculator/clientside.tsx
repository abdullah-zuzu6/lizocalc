"use client";

import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  History,
  Trash2,
  Percent,
  Sigma,
  Calculator,
  Heart,
  Copy,
  Check,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function ScientificCalculator() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Scientific Calculator",
    href: "/calculators/math/scientific-calculator",
    category: "Mathematics",
  };

  const relatedCalculators = [
    { name: "Percentage", description: "Ratio solver", href: "/calculators/math/percentage-calculator", icon: Percent },
    { name: "Statistics", description: "Variance tool", href: "/calculators/math/statistics-calculator", icon: Sigma },
  ];

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("scientific-history");
    if (saved) setHistory(JSON.parse(saved));
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression]);

  const handleToggleSave = () => {
    setIsSaved(toggleSavedCalculator(calculatorInfo));
  };

  const handleInput = (val: string) => {
    setExpression((prev) => prev + val);
    setResult("");
  };

  const clearAll = () => { setExpression(""); setResult(""); };
  const backspace = () => setExpression((prev) => prev.slice(0, -1));

  const DEGtoRAD = (x: number) => (angleMode === "DEG" ? (x * Math.PI) / 180 : x);

  const mathFunctions = {
    sin: (x: number) => parseFloat(Math.sin(DEGtoRAD(x)).toFixed(10)),
    cos: (x: number) => parseFloat(Math.cos(DEGtoRAD(x)).toFixed(10)),
    tan: (x: number) => parseFloat(Math.tan(DEGtoRAD(x)).toFixed(10)),
    sqrt: (x: number) => Math.sqrt(x),
    log: (x: number) => Math.log10(x),
    ln: (x: number) => Math.log(x),
    pow: (x: number, y: number) => Math.pow(x, y),
    exp: (x: number) => Math.exp(x),
    inv: (x: number) => 1 / x,
  };

  const calculate = () => {
    if (!expression) return;
    try {
      let parsedExpr = expression
        .replace(/π/g, "Math.PI").replace(/e/g, "Math.E").replace(/\^/g, "**")
        .replace(/√\(/g, "sqrt(").replace(/1div\(/g, "inv(")
        .replace(/(\d)(Math\.PI|Math\.E|\(|sin|cos|tan|log|ln|sqrt)/g, "$1*$2")
        .replace(/(\)|Math\.PI|Math\.E)(\d|\(|sin|cos|tan|log|ln|sqrt)/g, "$1*$2");

      const solver = new Function("sin", "cos", "tan", "sqrt", "log", "ln", "pow", "exp", "inv", "Math", `return ${parsedExpr}`);
      const rawResult = solver(mathFunctions.sin, mathFunctions.cos, mathFunctions.tan, mathFunctions.sqrt, mathFunctions.log, mathFunctions.ln, mathFunctions.pow, mathFunctions.exp, mathFunctions.inv, Math);
      const finalResult = Number.isFinite(rawResult) ? parseFloat(Number(rawResult).toFixed(10)).toString() : "Error";
      
      setResult(finalResult);
      if (finalResult !== "Error") {
        const entry = `${expression} = ${finalResult}`;
        const newHistory = [entry, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem("scientific-history", JSON.stringify(newHistory));
        saveCalculatorHistory("scientific-calc", { expression, lastResult: finalResult });
      }
    } catch { setResult("Error"); }
  };

  const handleCopy = () => {
    if (!result || result === "Error") return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* COMPACT CALCULATOR */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-[2rem] border p-5 md:p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-black flex items-center gap-2 uppercase tracking-tight opacity-70">
                  <Calculator size={16} className="text-blue-600" /> LizoCalc Pro
                </h2>
                <button onClick={handleToggleSave} className={`p-2 rounded-lg border transition-all ${isSaved ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-secondary border-transparent"}`}>
                  <Heart size={16} className={isSaved ? "fill-current" : ""} />
                </button>
              </div>

              {/* Responsive Display */}
              <div className="bg-secondary/40 rounded-2xl p-4 mb-4 border border-border/20 text-right">
                <div ref={scrollRef} className="text-[10px] md:text-xs opacity-50 font-mono overflow-x-auto whitespace-nowrap mb-1 scrollbar-hide">
                  {expression || "0"}
                </div>
                <div className="text-2xl md:text-3xl font-black truncate">{result || "0"}</div>
              </div>

              {/* Compact Button Grid */}
              <div className="grid grid-cols-4 gap-2">
                <button onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")} className="p-2 bg-blue-600/10 text-blue-600 rounded-lg font-black text-[10px]">{angleMode}</button>
                <button onClick={() => handleInput("π")} className="p-2 bg-secondary rounded-lg font-bold text-xs">π</button>
                <button onClick={backspace} className="p-2 bg-rose-500/10 text-rose-600 rounded-lg font-bold text-xs">DEL</button>
                <button onClick={clearAll} className="p-2 bg-rose-500 text-white rounded-lg font-bold text-xs">AC</button>

                {["sin(", "cos(", "tan("].map(fn => (
                  <button key={fn} onClick={() => handleInput(fn)} className="p-3 bg-secondary/80 rounded-xl font-bold text-xs hover:bg-secondary transition-colors">{fn.replace("(", "")}</button>
                ))}
                <button onClick={() => handleInput("/")} className="p-3 bg-blue-600/10 text-blue-600 rounded-xl font-bold text-lg">÷</button>

                {["7", "8", "9"].map(n => <button key={n} onClick={() => handleInput(n)} className="p-4 bg-card border rounded-xl font-black text-lg hover:bg-secondary/30 transition-all">{n}</button>)}
                <button onClick={() => handleInput("*")} className="p-3 bg-blue-600/10 text-blue-600 rounded-xl font-bold text-lg">×</button>

                {["4", "5", "6"].map(n => <button key={n} onClick={() => handleInput(n)} className="p-4 bg-card border rounded-xl font-black text-lg hover:bg-secondary/30 transition-all">{n}</button>)}
                <button onClick={() => handleInput("-")} className="p-3 bg-blue-600/10 text-blue-600 rounded-xl font-bold text-lg">−</button>

                {["1", "2", "3"].map(n => <button key={n} onClick={() => handleInput(n)} className="p-4 bg-card border rounded-xl font-black text-lg hover:bg-secondary/30 transition-all">{n}</button>)}
                <button onClick={() => handleInput("+")} className="p-3 bg-blue-600/10 text-blue-600 rounded-xl font-bold text-lg">+</button>

                <button onClick={() => handleInput("0")} className="p-4 bg-card border rounded-xl font-black text-lg">0</button>
                <button onClick={() => handleInput(".")} className="p-4 bg-card border rounded-xl font-black text-lg">.</button>
                <button onClick={() => handleInput("(")} className="p-4 bg-secondary rounded-xl font-bold text-sm">(</button>
                <button onClick={() => handleInput(")")} className="p-4 bg-secondary rounded-xl font-bold text-sm">)</button>

                <button onClick={() => handleInput("√(")} className="p-3 bg-secondary rounded-xl font-bold text-sm">√</button>
                <button onClick={() => handleInput("^")} className="p-3 bg-secondary rounded-xl font-bold text-sm">xʸ</button>
                <button onClick={calculate} className="col-span-2 p-3 bg-blue-600 text-white rounded-xl font-black text-xl shadow-lg shadow-blue-500/20">=</button>
              </div>
            </div>
          </div>

          {/* DYNAMIC RESULTS & HISTORY */}
          <div className="lg:col-span-7 space-y-4">
            {result && result !== "Error" && (
              <div className="bg-blue-600 text-white rounded-[2rem] p-6 shadow-lg relative overflow-hidden group animate-in zoom-in-95">
                <button onClick={handleCopy} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-md transition-all">
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <p className="text-[9px] font-black uppercase opacity-60 tracking-widest">Result</p>
                <h2 className="text-4xl md:text-5xl font-black mt-2 break-all leading-none">{result}</h2>
              </div>
            )}

           <div className="bg-card border rounded-[2rem] p-6">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-sm font-bold flex items-center gap-2">
      <History className="text-blue-600" size={16} /> History
    </h2>
    {/* Desktop "Clear" - Hidden on Mobile */}
    {history.length > 0 && (
      <button 
        onClick={() => { setHistory([]); localStorage.removeItem("scientific-history"); }}
        className="hidden md:flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter text-rose-500 hover:opacity-70 transition-opacity"
      >
        <Trash2 size={12} /> Clear
      </button>
    )}
  </div>

  <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
    {history.length > 0 ? (
      history.map((item, i) => (
        <div key={i} className="p-3 bg-secondary/30 rounded-xl flex justify-between items-center group animate-in fade-in">
          <span className="text-[10px] font-mono opacity-50 truncate mr-2">{item.split("=")[0]}</span>
          <span className="font-black text-blue-600 text-sm">={item.split("=")[1]}</span>
        </div>
      ))
    ) : (
      <p className="text-center py-6 text-[10px] text-muted-foreground uppercase tracking-widest">Empty</p>
    )}
  </div>

  {/* Mobile Specific Clear Button - Visible only on small screens */}
  {history.length > 0 && (
    <button 
      onClick={() => { setHistory([]); localStorage.removeItem("scientific-history"); }}
      className="md:hidden w-full mt-4 py-3 bg-rose-500/5 border border-rose-500/10 text-rose-500 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:bg-rose-500/10"
    >
      <Trash2 size={14} /> Clear All Logs
    </button>
  )}
</div>
          </div>
        </div>
        
        <RelatedCalculators calculators={relatedCalculators} />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(37, 99, 235, 0.1); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}