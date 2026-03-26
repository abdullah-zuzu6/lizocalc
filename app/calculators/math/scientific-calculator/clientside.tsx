"use client";

import { useState, useEffect, useRef } from "react";
import { 
  RotateCcw, 
  History, 
  Trash2, 
  Percent, 
  Sigma, 
  ChevronRight, 
  Settings2, 
  Calculator, 
  Heart 
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from "@/lib/storage";

export default function CasioCalculatorAdvanced() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Scientific Calculator",
    href: "/calculators/math/scientific-calculator",
    category: "Mathematics",
  };

  const relatedCalculators = [
    { name: "Percentage Calculator", description: "Quick percent & ratio solver", href: "/calculators/math/percentage-calculator", icon: Percent },
    { name: "Statistics Calculator", description: "Standard deviation & variance", href: "/calculators/math/statistics-calculator", icon: Sigma },
  ];

  useEffect(() => {
    setIsMounted(true);
    // Load local history
    const saved = localStorage.getItem("scientific-history");
    if (saved) setHistory(JSON.parse(saved));

    // Check if saved to favorites
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const handleInput = (val: string) => setExpression(prev => prev + val);
  const clearAll = () => { setExpression(""); setResult(""); };
  const backspace = () => setExpression(prev => prev.slice(0, -1));

  // --- MATH ENGINE ---
  const DEGtoRAD = (x: number) => angleMode === "DEG" ? (x * Math.PI) / 180 : x;
  const RADtoDEG = (x: number) => angleMode === "DEG" ? (x * 180) / Math.PI : x;

  const mathFunctions = {
    sin: (x: number) => parseFloat(Math.sin(DEGtoRAD(x)).toFixed(10)),
    cos: (x: number) => parseFloat(Math.cos(DEGtoRAD(x)).toFixed(10)),
    tan: (x: number) => parseFloat(Math.tan(DEGtoRAD(x)).toFixed(10)),
    asin: (x: number) => parseFloat(RADtoDEG(Math.asin(x)).toFixed(10)),
    acos: (x: number) => parseFloat(RADtoDEG(Math.acos(x)).toFixed(10)),
    atan: (x: number) => parseFloat(RADtoDEG(Math.atan(x)).toFixed(10)),
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
      // Advanced Parsing: Handle implicit multiplication (e.g., 2π or 5(2))
      let parsedExpr = expression
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**")
        .replace(/√\(/g, "sqrt(")
        .replace(/1div\(/g, "inv(")
        .replace(/(\d)(Math\.PI|Math\.E|\(|sin|cos|tan|log|ln|sqrt)/g, "$1*$2") // 2π -> 2*π
        .replace(/(\)|Math\.PI|Math\.E)(\d|\(|sin|cos|tan|log|ln|sqrt)/g, "$1*$2"); // π2 -> π*2

      const solver = new Function(
        "sin", "cos", "tan", "asin", "acos", "atan", "sqrt", "log", "ln", "pow", "exp", "inv", "Math",
        `return ${parsedExpr}`
      );

      const rawResult = solver(
        mathFunctions.sin, mathFunctions.cos, mathFunctions.tan,
        mathFunctions.asin, mathFunctions.acos, mathFunctions.atan,
        mathFunctions.sqrt, mathFunctions.log, mathFunctions.ln,
        mathFunctions.pow, mathFunctions.exp, mathFunctions.inv,
        Math
      );

      const finalResult = Number.isFinite(rawResult) 
        ? parseFloat(Number(rawResult).toFixed(10)).toString() 
        : "Error";
      
      setResult(finalResult);

      if (finalResult !== "Error") {
        const entry = `${expression} = ${finalResult}`;
        const newHistory = [entry, ...history].slice(0, 15);
        setHistory(newHistory);
        localStorage.setItem("scientific-history", JSON.stringify(newHistory));
        saveCalculatorHistory("scientific-calc", { expression, lastResult: finalResult });
      }
    } catch (err) {
      setResult("Syntax Error");
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* CALCULATOR INTERFACE */}
        <div className="lg:col-span-7 flex justify-center items-start">
          <div className="bg-[#1c1c1c] p-7 rounded-[3.5rem] border-[10px] border-[#2a2a2a] shadow-2xl w-full max-w-[460px] relative">
            {/* Logo & Save Toggle */}
            <div className="flex justify-between items-center px-6 mb-4">
               <div className="text-[#555] font-black italic tracking-tighter text-sm uppercase select-none">LizoCalc Pro</div>
               <button 
                onClick={handleToggleSave}
                className={`p-2 rounded-full transition-all ${isSaved ? "text-red-500" : "text-[#444] hover:text-[#666]"}`}
               >
                <Heart size={18} className={isSaved ? "fill-current" : ""} />
               </button>
            </div>
            
            {/* LCD DISPLAY */}
            <div className="bg-[#94a37e] rounded-2xl p-6 mb-8 shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] border-4 border-black/20 font-mono text-black text-right relative overflow-hidden">
              <div className="absolute top-2 left-4 flex gap-3 text-[10px] font-black opacity-60">
                <span className={angleMode === "DEG" ? "bg-black text-[#94a37e] px-1.5 rounded-sm" : ""}>DEG</span>
                <span className={angleMode === "RAD" ? "bg-black text-[#94a37e] px-1.5 rounded-sm" : ""}>RAD</span>
                <span className="opacity-40">S-V.P.A.M.</span>
              </div>
              <div ref={scrollRef} className="h-8 text-xl opacity-80 overflow-x-auto whitespace-nowrap mt-4 scrollbar-hide select-all tracking-tight transition-all">
                {expression || " "}
              </div>
              <div className="h-16 text-5xl md:text-6xl font-black truncate leading-tight tracking-tighter drop-shadow-sm">
                {result || "0"}
              </div>
            </div>

            {/* BUTTON GRID */}
            <div className="grid grid-cols-5 gap-3">
              {/* Functions Row */}
              <button onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")} className="btn-sci-func">{angleMode}</button>
              <button onClick={() => handleInput("sin(")} className="btn-sci-func">sin</button>
              <button onClick={() => handleInput("cos(")} className="btn-sci-func">cos</button>
              <button onClick={() => handleInput("tan(")} className="btn-sci-func">tan</button>
              <button onClick={() => handleInput("π")} className="btn-sci-func text-blue-400">π</button>
              
              <button onClick={() => handleInput("asin(")} className="btn-sci-func text-[9px]">sin⁻¹</button>
              <button onClick={() => handleInput("acos(")} className="btn-sci-func text-[9px]">cos⁻¹</button>
              <button onClick={() => handleInput("atan(")} className="btn-sci-func text-[9px]">tan⁻¹</button>
              <button onClick={() => handleInput("log(")} className="btn-sci-func">log</button>
              <button onClick={() => handleInput("ln(")} className="btn-sci-func">ln</button>

              <button onClick={() => handleInput("√(")} className="btn-sci-func">√</button>
              <button onClick={() => handleInput("^2")} className="btn-sci-func">x²</button>
              <button onClick={() => handleInput("^")} className="btn-sci-func">xʸ</button>
              <button onClick={() => handleInput("(")} className="btn-sci-op text-white font-medium text-lg">(</button>
              <button onClick={() => handleInput(")")} className="btn-sci-op text-white font-medium text-lg">)</button>

              {/* Pad Logic */}
              <button onClick={() => handleInput("7")} className="btn-sci-num">7</button>
              <button onClick={() => handleInput("8")} className="btn-sci-num">8</button>
              <button onClick={() => handleInput("9")} className="btn-sci-num">9</button>
              <button onClick={backspace} className="btn-sci-danger text-sm">DEL</button>
              <button onClick={clearAll} className="btn-sci-danger text-sm">AC</button>

              <button onClick={() => handleInput("4")} className="btn-sci-num">4</button>
              <button onClick={() => handleInput("5")} className="btn-sci-num">5</button>
              <button onClick={() => handleInput("6")} className="btn-sci-num">6</button>
              <button onClick={() => handleInput("*")} className="btn-sci-op">×</button>
              <button onClick={() => handleInput("/")} className="btn-sci-op">÷</button>

              <button onClick={() => handleInput("1")} className="btn-sci-num">1</button>
              <button onClick={() => handleInput("2")} className="btn-sci-num">2</button>
              <button onClick={() => handleInput("3")} className="btn-sci-num">3</button>
              <button onClick={() => handleInput("+")} className="btn-sci-op">+</button>
              <button onClick={() => handleInput("-")} className="btn-sci-op">−</button>

              <button onClick={() => handleInput("0")} className="btn-sci-num">0</button>
              <button onClick={() => handleInput(".")} className="btn-sci-num">.</button>
              <button onClick={() => handleInput("e")} className="btn-sci-num">e</button>
              <button onClick={() => handleInput("1div(")} className="btn-sci-num text-xs">1/x</button>
              <button onClick={calculate} className="btn-sci-equal">=</button>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-5 space-y-8">
          <section className="bg-card border rounded-3xl p-8 shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 uppercase tracking-widest">
              <History size={20} className="text-blue-600" /> Computation Logs
            </h2>
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-3 custom-scrollbar">
              {history.length > 0 ? history.map((item, i) => (
                <div key={i} className="p-4 bg-secondary/30 rounded-2xl text-sm font-mono border border-border/40 flex justify-between items-center hover:bg-secondary/50 transition-colors">
                  <span className="truncate opacity-50 text-[11px]">{item.split("=")[0]}</span>
                  <span className="font-black text-blue-600 ml-4 text-lg tracking-tighter">={item.split("=")[1]}</span>
                </div>
              )) : (
                <div className="text-center py-16 opacity-10">
                    <Calculator size={56} className="mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Database Empty</p>
                </div>
              )}
            </div>
            {history.length > 0 && (
              <button onClick={() => { setHistory([]); localStorage.removeItem("scientific-history"); }} className="mt-8 w-full py-4 text-[11px] font-black uppercase tracking-[0.2em] text-rose-500 bg-rose-500/5 rounded-2xl border border-rose-500/10 hover:bg-rose-500/10 transition-all flex items-center justify-center gap-3">
                <Trash2 size={14} /> Wipe Session Logs
              </button>
            )}
          </section>

          <section className="bg-blue-600/5 border border-blue-600/10 rounded-3xl p-8">
            <h3 className="font-black text-[11px] uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-blue-600">
              <Settings2 size={16} /> Operator Reference
            </h3>
            <div className="grid grid-cols-1 gap-5">
              {[
                { title: "Implicit Logic", desc: "The engine automatically inserts multipliers. Inputting `2π` is equivalent to `2 * π`." },
                { title: "Trigonometry", desc: "Toggle between Degrees and Radians using the top-left button." },
                { title: "Floating Point", desc: "Calculations follow IEEE 754 standards with a 10-decimal rounding filter." }
              ].map((note, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center shrink-0">
                      <ChevronRight size={12} className="text-blue-600"/>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    <strong className="text-foreground block mb-1">{note.title}</strong> {note.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />

      <style jsx>{`
        .btn-sci-func { @apply bg-[#333] text-white py-4 rounded-2xl hover:bg-[#3a3a3a] text-[10px] font-black uppercase tracking-tighter border-b-4 border-black/80 active:border-b-0 active:translate-y-[2px] transition-all; }
        .btn-sci-op { @apply bg-[#2a2a2a] text-blue-400 py-5 rounded-2xl hover:bg-[#333] border-b-4 border-black/80 text-2xl font-black active:border-b-0 active:translate-y-[2px] transition-all; }
        .btn-sci-num { @apply bg-[#e5e5e5] text-black py-5 rounded-2xl hover:bg-white border-b-4 border-black/20 text-2xl font-black active:border-b-0 active:translate-y-[2px] transition-all; }
        .btn-sci-danger { @apply bg-rose-600 text-white py-5 rounded-2xl hover:bg-rose-500 border-b-4 border-black/80 font-black active:border-b-0 active:translate-y-[2px] transition-all; }
        .btn-sci-equal { @apply bg-blue-600 text-white py-5 rounded-2xl hover:bg-blue-500 border-b-4 border-black/80 text-3xl font-black active:border-b-0 active:translate-y-[2px] transition-all; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-blue-600/20 rounded-full; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}