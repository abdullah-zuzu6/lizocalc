'use client';

import { useState, useEffect, useCallback } from "react";
import { 
  Ruler, 
  Hash, 
  Triangle as TriangleIcon, 
  RotateCcw, 
  CheckCircle2, 
  Settings2, 
  Heart,
  Info,
  BookOpen
} from "lucide-react";

import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function TriangleCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [sideA, setSideA] = useState("5");
  const [sideB, setSideB] = useState("6");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [angleC, setAngleC] = useState("70");

  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const calculatorInfo = {
    name: 'Triangle Solver',
    href: '/calculators/math/triangle-calculator',
    category: 'Math',
  };

  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    const data = history["triangle"]?.data;
    if (data) {
      setSideA(data.sideA ?? "5");
      setSideB(data.sideB ?? "6");
      setSideC(data.sideC ?? "");
      setAngleA(data.angleA ?? "");
      setAngleB(data.angleB ?? "");
      setAngleC(data.angleC ?? "70");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const validateInputs = useCallback(() => {
    const s = [sideA, sideB, sideC].filter(x => x.trim() !== "").length;
    const a = [angleA, angleB, angleC].filter(x => x.trim() !== "").length;

    if (s + a > 3) {
      setError("Over-specified: Please provide exactly 3 values (at least one must be a side).");
      return false;
    }
    setError(null);
    return true;
  }, [sideA, sideB, sideC, angleA, angleB, angleC]);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculateTriangle = () => {
    if (!validateInputs()) return;
    
    let a = sideA.trim() ? parseFloat(sideA) : null;
    let b = sideB.trim() ? parseFloat(sideB) : null;
    let c = sideC.trim() ? parseFloat(sideC) : null;
    let A = angleA.trim() ? parseFloat(angleA) : null;
    let B = angleB.trim() ? parseFloat(angleB) : null;
    let C = angleC.trim() ? parseFloat(angleC) : null;

    let solved = false;

    try {
        // SAS
        if (a && b && C && !c) {
          const radC = toRad(C);
          c = Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(radC));
          A = toDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
          B = 180 - C - A;
          solved = true;
        }
        // SSS
        else if (a && b && c) {
          if (a + b <= c || a + c <= b || b + c <= a) throw new Error("Triangle inequality violated.");
          A = toDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
          B = toDeg(Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)));
          C = toDeg(Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b)));
          solved = true;
        }
        // ASA / AAS
        else if ([A, B, C].filter(Boolean).length === 2 && [a, b, c].filter(Boolean).length === 1) {
          const sum = (A || 0) + (B || 0) + (C || 0);
          if (sum >= 180) throw new Error("Angle sum must be < 180°");
          if (!A) A = 180 - (B! + C!);
          if (!B) B = 180 - (A! + C!);
          if (!C) C = 180 - (A! + B!);

          const knownSide = a || b || c!;
          const oppAngle = a ? A : b ? B : C;
          const ratio = knownSide / Math.sin(toRad(oppAngle));

          if (!a) a = ratio * Math.sin(toRad(A));
          if (!b) b = ratio * Math.sin(toRad(B));
          if (!c) c = ratio * Math.sin(toRad(C));
          solved = true;
        }

        if (!solved) throw new Error("Please provide 3 values (SAS, SSS, or ASA).");

        const s = (a! + b! + c!) / 2;
        const area = Math.sqrt(s * (s - a!) * (s - b!) * (s - c!));
        
        let type = "Scalene";
        if (Math.abs(a! - b!) < 0.01 && Math.abs(b! - c!) < 0.01) type = "Equilateral";
        else if (Math.abs(a! - b!) < 0.01 || Math.abs(b! - c!) < 0.01 || Math.abs(a! - c!) < 0.01) type = "Isosceles";

        setResults({
          sideA: a!.toFixed(2), sideB: b!.toFixed(2), sideC: c!.toFixed(2),
          angleA: A!.toFixed(1), angleB: B!.toFixed(1), angleC: C!.toFixed(1),
          area: area.toFixed(2), perimeter: (a! + b! + c!).toFixed(2), type
        });
        saveCalculatorHistory("triangle", { sideA, sideB, sideC, angleA, angleB, angleC });
    } catch (e: any) {
        setError(e.message);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
               <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-blue-500" size={20} /> Parameters
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-start gap-2 animate-in fade-in duration-300">
                  <Info size={16} className="shrink-0 mt-0.5" />
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <InputField label="Side a" value={sideA} onChange={setSideA} />
                <InputField label="Angle A" value={angleA} onChange={setAngleA} suffix="°" />
                <InputField label="Side b" value={sideB} onChange={setSideB} />
                <InputField label="Angle B" value={angleB} onChange={setAngleB} suffix="°" />
                <InputField label="Side c" value={sideC} onChange={setSideC} />
                <InputField label="Angle C" value={angleC} onChange={setAngleC} suffix="°" />
              </div>

              <div className="mt-8 flex gap-3">
                <button onClick={calculateTriangle} className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:opacity-90 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                  Solve Triangle <CheckCircle2 size={16} />
                </button>
                <button onClick={() => { setResults(null); setError(null); }} className="flex-1 py-4 bg-secondary text-muted-foreground rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-secondary/80 transition-all flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Clear
                </button>
              </div>
            </div>

            <div className="bg-blue-600/5 border border-blue-600/10 rounded-2xl p-6">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><BookOpen size={16} className="text-blue-500"/> Solver Rules</h3>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc ml-4 leading-relaxed">
                    <li>Provide exactly <strong>3 values</strong> to solve.</li>
                    <li>At least <strong>one value must be a side</strong> length.</li>
                    <li>Angle sum must be less than 180°.</li>
                </ul>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7">
            {results ? (
              <div className="bg-card border rounded-3xl overflow-hidden shadow-xl animate-in slide-in-from-right-4 duration-500">
                <div className="bg-blue-600 p-8 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">Classification</p>
                    <h2 className="text-4xl font-black">{results.type} Triangle</h2>
                </div>
                <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ResultBox label="Side a" val={results.sideA} />
                    <ResultBox label="Side b" val={results.sideB} />
                    <ResultBox label="Side c" val={results.sideC} />
                    <ResultBox label="Angle A" val={results.angleA + '°'} />
                    <ResultBox label="Angle B" val={results.angleB + '°'} />
                    <ResultBox label="Angle C" val={results.angleC + '°'} />
                    <ResultBox label="Area" val={results.area} sub="sq u" />
                    <ResultBox label="Perimeter" val={results.perimeter} sub="u" />
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-secondary rounded-3xl flex flex-col items-center justify-center p-12 text-center">
                 <TriangleIcon size={64} className="text-blue-500 opacity-10 mb-4" />
                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Awaiting Inputs</p>
                 <p className="text-sm text-muted-foreground/60 mt-2 max-w-xs leading-relaxed">Fill in 3 parameters on the left to generate the complete triangle solution.</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL GUIDE */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-secondary/20 p-8 rounded-3xl border">
            <div>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-500"><Info size={20}/> Standard Notation</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    In trigonometry, side <strong>a</strong> is always opposite to Angle <strong>A</strong>, side <strong>b</strong> is opposite Angle <strong>B</strong>, and side <strong>c</strong> is opposite Angle <strong>C</strong>. This solver uses these standard relations to calculate the Law of Cosines and Law of Sines.
                </p>
                
            </div>
            <div className="flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div className="p-4 bg-card border rounded-xl">
                        <p className="font-bold text-xs uppercase mb-1">SAS</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">Side-Angle-Side: Two sides and the angle between them.</p>
                    </div>
                    <div className="p-4 bg-card border rounded-xl">
                        <p className="font-bold text-xs uppercase mb-1">SSS</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">Side-Side-Side: Three side lengths provided.</p>
                    </div>
                    <div className="p-4 bg-card border rounded-xl">
                        <p className="font-bold text-xs uppercase mb-1">ASA</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">Angle-Side-Angle: Two angles and the side between them.</p>
                    </div>
                    <div className="p-4 bg-card border rounded-xl">
                        <p className="font-bold text-xs uppercase mb-1">AAS</p>
                        <p className="text-[10px] text-muted-foreground leading-tight">Angle-Angle-Side: Two angles and a non-included side.</p>
                    </div>
                </div>
            </div>
        </div>

        <RelatedCalculators
          calculators={[
            { name: "Pythagorean", description: "Solve right triangles", href: "/calculators/math/pythagorean-theorem-calculator", icon: Ruler },
            { name: "Percentage", description: "Calculate percentage", href: "/calculators/math/percentage-calculator", icon: Hash },
          ]}
        />
      </section>
    </main>
  );
}

function InputField({ label, value, onChange, suffix }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-3 bg-secondary/50 rounded-xl border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-bold"
          placeholder="0.00"
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-500">{suffix}</span>}
      </div>
    </div>
  );
}

function ResultBox({ label, val, sub }: any) {
    return (
        <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</span>
            <span className="text-2xl font-black text-foreground">{val} <span className="text-[10px] font-normal text-muted-foreground">{sub}</span></span>
        </div>
    )
}