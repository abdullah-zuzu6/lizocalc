"use client";

import { useState, useEffect, useRef } from "react";
import { RotateCcw, History, Trash2, Percent, Sigma, ChevronRight, Settings2 } from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function CasioCalculatorAdvanced() {
  const [expression, setExpression] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
  const [history, setHistory] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const relatedCalculators = [
    { name: "Percentage Calculator", description: "Quick percent & ratio solver", href: "/calculators/math/percentage-calculator", icon: Percent },
    { name: "Statistics Calculator", description: "Standard deviation & variance", href: "/calculators/math/statistics-calculator", icon: Sigma },
  ];

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("scientific-history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, [expression]);

  const handleInput = (val: string) => setExpression(prev => prev + val);
  const clearAll = () => { setExpression(""); setResult(""); };
  const backspace = () => setExpression(prev => prev.slice(0, -1));

  // --- PRECISION TRIGONOMETRY FUNCTIONS ---
  const DEGtoRAD = (x: number) => angleMode === "DEG" ? (x * Math.PI) / 180 : x;
  const RADtoDEG = (x: number) => angleMode === "DEG" ? (x * 180) / Math.PI : x;

  const mathFunctions: Record<string, (...args: number[]) => number> = {
    sin: x => parseFloat(Math.sin(DEGtoRAD(x)).toFixed(10)),
    cos: x => parseFloat(Math.cos(DEGtoRAD(x)).toFixed(10)),
    tan: x => parseFloat(Math.tan(DEGtoRAD(x)).toFixed(10)),
    asin: x => parseFloat(RADtoDEG(Math.asin(x)).toFixed(10)),
    acos: x => parseFloat(RADtoDEG(Math.acos(x)).toFixed(10)),
    atan: x => parseFloat(RADtoDEG(Math.atan(x)).toFixed(10)),
    sqrt: x => Math.sqrt(x),
    log: x => Math.log10(x),
    ln: x => Math.log(x),
    pow: (x, y) => Math.pow(x, y),
    exp: x => Math.exp(x),
    "1/x": x => 1 / x,
  };

  const calculate = () => {
    if (!expression) return;

    try {
      let expr = expression
        .replace(/π/g, "Math.PI")
        .replace(/e/g, "Math.E")
        .replace(/\^/g, "**")
        .replace(/√\(/g, "Math.sqrt(");

      // Evaluate expression safely
      const func = new Function(
        "sin","cos","tan","asin","acos","atan","sqrt","log","ln","pow","exp","1div","Math",
        `return ${expr}`
      );

      const rawResult = func(
        mathFunctions.sin,
        mathFunctions.cos,
        mathFunctions.tan,
        mathFunctions.asin,
        mathFunctions.acos,
        mathFunctions.atan,
        mathFunctions.sqrt,
        mathFunctions.log,
        mathFunctions.ln,
        mathFunctions.pow,
        mathFunctions.exp,
        mathFunctions["1/x"],
        Math
      );

      const finalResult = parseFloat(Number(rawResult).toFixed(10)).toString();
      setResult(finalResult);

      const historyEntry = `${expression} = ${finalResult}`;
      setHistory(prev => [historyEntry, ...prev].slice(0, 10));
      localStorage.setItem("scientific-history", JSON.stringify([historyEntry, ...history].slice(0, 10)));

    } catch (err) {
      setResult("Syntax Error");
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CALCULATOR UI */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="bg-[#1c1c1c] p-6 rounded-[2.5rem] border-[6px] border-[#2a2a2a] shadow-2xl w-full max-w-[430px]">
            {/* LCD */}
            <div className="bg-[#94a37e] rounded-xl p-4 mb-6 shadow-inner border-2 border-black/20 font-mono text-black text-right relative">
              <div className="absolute top-2 left-3 flex gap-2 text-[10px] font-bold opacity-70">
                <span className={angleMode === "DEG" ? "bg-black text-[#94a37e] px-1" : ""}>DEG</span>
                <span className={angleMode === "RAD" ? "bg-black text-[#94a37e] px-1" : ""}>RAD</span>
              </div>
              <div ref={scrollRef} className="h-8 text-lg opacity-80 overflow-x-auto whitespace-nowrap mt-2 scrollbar-hide">{expression || "0"}</div>
              <div className="h-12 text-4xl font-black truncate">{result || "0"}</div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-5 gap-2">
              <button onClick={() => setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")} className="btn-sci-func">{angleMode}</button>
              <button onClick={() => handleInput("sin(")} className="btn-sci-func">sin</button>
              <button onClick={() => handleInput("cos(")} className="btn-sci-func">cos</button>
              <button onClick={() => handleInput("tan(")} className="btn-sci-func">tan</button>
              <button onClick={() => handleInput("π")} className="btn-sci-func">π</button>
              <button onClick={() => handleInput("asin(")} className="btn-sci-func">sin⁻¹</button>
              <button onClick={() => handleInput("acos(")} className="btn-sci-func">cos⁻¹</button>
              <button onClick={() => handleInput("atan(")} className="btn-sci-func">tan⁻¹</button>
              <button onClick={() => handleInput("log(")} className="btn-sci-func">log</button>
              <button onClick={() => handleInput("ln(")} className="btn-sci-func">ln</button>
              <button onClick={() => handleInput("√(")} className="btn-sci-func">√</button>
              <button onClick={() => handleInput("^2")} className="btn-sci-func">x²</button>
              <button onClick={() => handleInput("^")} className="btn-sci-func">xʸ</button>
              <button onClick={() => handleInput("(")} className="btn-sci-op">(</button>
              <button onClick={() => handleInput(")")} className="btn-sci-op">)</button>

              {["7","8","9","DEL","AC"].map(k => (
                <button key={k} onClick={() => k==="DEL"?backspace():k==="AC"?clearAll():handleInput(k)} 
                  className={k==="AC"||k==="DEL"?"btn-sci-danger":"btn-sci-num"}>{k}</button>
              ))}
              {["4","5","6","*","/"].map(k => (
                <button key={k} onClick={() => handleInput(k)} className="btn-sci-op">{k==="*"?"×":k==="/"?"÷":k}</button>
              ))}
              {["1","2","3","+","-"].map(k => (
                <button key={k} onClick={() => handleInput(k)} className="btn-sci-op">{k}</button>
              ))}
              <button onClick={() => handleInput("0")} className="btn-sci-num">0</button>
              <button onClick={() => handleInput(".")} className="btn-sci-num">.</button>
              <button onClick={() => handleInput("e")} className="btn-sci-num">e</button>
              <button onClick={() => handleInput("1/")} className="btn-sci-num">1/x</button>
              <button onClick={calculate} className="btn-sci-equal">=</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <History size={20} className="text-primary" /> History
            </h2>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {history.length>0 ? history.map((item,i)=>(
                <div key={i} className="p-3 bg-secondary/40 rounded-lg text-sm font-mono border border-border/50 flex justify-between">
                  <span className="truncate opacity-70">{item.split("=")[0]}</span>
                  <span className="font-bold text-primary">={item.split("=")[1]}</span>
                </div>
              )) : (<p className="text-xs text-muted-foreground italic">No history yet.</p>)}
            </div>
            {history.length>0 && (
              <button onClick={()=>{setHistory([]);localStorage.removeItem("scientific-history");}} className="mt-4 text-xs font-bold text-rose-500 flex items-center gap-1 hover:underline">
                <Trash2 size={12}/> Clear History
              </button>
            )}
          </section>
          <section className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Settings2 size={18} className="text-primary" /> Quick Tips
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-2 text-xs text-muted-foreground">
                <ChevronRight size={14} className="text-primary shrink-0"/>
                <span>Use <strong>sin⁻¹</strong> to find angles from ratios (e.g., asin(0.5) = 30°).</span>
              </li>
              <li className="flex gap-2 text-xs text-muted-foreground">
                <ChevronRight size={14} className="text-primary shrink-0"/>
                <span>The <strong>1/x</strong> button calculates the reciprocal of a value.</span>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />

      <style jsx>{`
        .btn-sci-func { @apply bg-[#3a3a3a] text-white py-3 rounded-md hover:bg-[#4a4a4a] text-[11px] font-bold border-b-[3px] border-black/50 shadow-md active:border-b-0 active:translate-y-[1px] transition-all; }
        .btn-sci-op { @apply bg-[#2d2d2d] text-primary py-4 rounded-md hover:bg-[#3d3d3d] border-b-[3px] border-black/50 text-lg font-bold shadow-md active:border-b-0 active:translate-y-[1px] transition-all; }
        .btn-sci-num { @apply bg-[#e5e5e5] text-black py-4 rounded-md hover:bg-white border-b-[3px] border-black/20 text-lg font-bold shadow-md active:border-b-0 active:translate-y-[1px] transition-all; }
        .btn-sci-danger { @apply bg-rose-600 text-white py-4 rounded-md hover:bg-rose-500 border-b-[3px] border-black/50 font-bold shadow-md active:border-b-0 active:translate-y-[1px] transition-all; }
        .btn-sci-equal { @apply bg-primary text-white py-4 rounded-md hover:opacity-90 border-b-[3px] border-black/50 text-xl font-bold shadow-md active:border-b-0 active:translate-y-[1px] transition-all; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { @apply bg-primary/20 rounded-full; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}