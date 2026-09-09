'use client';

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Ruler,
  Hash,
  Triangle as TriangleIcon,
  RotateCcw,
  CheckCircle2,
  Settings2,
  Heart,
  Info,
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

type NullableNum = number | null;

interface TriangleInputs {
  a: NullableNum;
  b: NullableNum;
  c: NullableNum;
  A: NullableNum;
  B: NullableNum;
  C: NullableNum;
}

interface TriangleSolution {
  sideA: string;
  sideB: string;
  sideC: string;
  angleA: string;
  angleB: string;
  angleC: string;
  area: string;
  perimeter: string;
  type: string;
}

const toRad = (deg: number) => (deg * Math.PI) / 180;
const toDeg = (rad: number) => (rad * 180) / Math.PI;

/**
 * Pure solving function, kept outside the component so both the Solve
 * button and a shared link (which arrives before any click happens) can
 * run the exact same logic. Throws a plain Error with a user-facing
 * message when the given values don't determine a triangle.
 */
function solveTriangleCore(inputs: TriangleInputs): TriangleSolution {
  let { a, b, c, A, B, C } = inputs;
  let solved = false;

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
    if (sum >= 180) throw new Error("Angle sum must be less than 180°.");
    if (!A) A = 180 - (B! + C!);
    if (!B) B = 180 - (A! + C!);
    if (!C) C = 180 - (A! + B!);

    const knownSide = a || b || c!;
    const oppAngle = a ? A : b ? B : C;
    const ratio = knownSide / Math.sin(toRad(oppAngle!));

    if (!a) a = ratio * Math.sin(toRad(A!));
    if (!b) b = ratio * Math.sin(toRad(B!));
    if (!c) c = ratio * Math.sin(toRad(C!));
    solved = true;
  }

  if (!solved) {
    throw new Error("Enter exactly 3 values, including at least one side (SSS, SAS, or ASA/AAS).");
  }

  const s = (a! + b! + c!) / 2;
  const area = Math.sqrt(s * (s - a!) * (s - b!) * (s - c!));

  let type = "Scalene";
  if (Math.abs(a! - b!) < 0.01 && Math.abs(b! - c!) < 0.01) type = "Equilateral";
  else if (Math.abs(a! - b!) < 0.01 || Math.abs(b! - c!) < 0.01 || Math.abs(a! - c!) < 0.01) type = "Isosceles";

  return {
    sideA: a!.toFixed(2),
    sideB: b!.toFixed(2),
    sideC: c!.toFixed(2),
    angleA: A!.toFixed(1),
    angleB: B!.toFixed(1),
    angleC: C!.toFixed(1),
    area: area.toFixed(2),
    perimeter: (a! + b! + c!).toFixed(2),
    type,
  };
}

function countGiven(inputs: TriangleInputs) {
  const sides = [inputs.a, inputs.b, inputs.c].filter((v) => v !== null).length;
  const angles = [inputs.A, inputs.B, inputs.C].filter((v) => v !== null).length;
  return sides + angles;
}

export default function TriangleCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [sideA, setSideA] = useState("5");
  const [sideB, setSideB] = useState("6");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [angleC, setAngleC] = useState("70");

  const [results, setResults] = useState<TriangleSolution | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: 'Triangle Solver',
    href: '/calculators/math/triangle-calculator',
    category: 'Math',
  };

  const readInputs = (a: string, b: string, c: string, A: string, B: string, C: string): TriangleInputs => ({
    a: a.trim() ? parseFloat(a) : null,
    b: b.trim() ? parseFloat(b) : null,
    c: c.trim() ? parseFloat(c) : null,
    A: A.trim() ? parseFloat(A) : null,
    B: B.trim() ? parseFloat(B) : null,
    C: C.trim() ? parseFloat(C) : null,
  });

  const buildShareUrl = (a: string, b: string, c: string, A: string, B: string, C: string) => {
    const params = new URLSearchParams();
    if (a.trim()) params.set("a", a);
    if (b.trim()) params.set("b", b);
    if (c.trim()) params.set("c", c);
    if (A.trim()) params.set("A", A);
    if (B.trim()) params.set("B", B);
    if (C.trim()) params.set("C", C);
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  // --- Hydration & data loading ---
  // A shared link (?a=&b=&c=&A=&B=&C=) wins over saved history.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sA = params.get("a") ?? "";
    const sB = params.get("b") ?? "";
    const sC = params.get("c") ?? "";
    const aA = params.get("A") ?? "";
    const aB = params.get("B") ?? "";
    const aC = params.get("C") ?? "";
    const hasShared = sA || sB || sC || aA || aB || aC;

    if (hasShared) {
      setSideA(sA);
      setSideB(sB);
      setSideC(sC);
      setAngleA(aA);
      setAngleB(aB);
      setAngleC(aC);
      try {
        const inputs = readInputs(sA, sB, sC, aA, aB, aC);
        if (countGiven(inputs) > 3) throw new Error("Over-specified: this link has more than 3 values.");
        const solved = solveTriangleCore(inputs);
        setResults(solved);
        setShareUrl(buildShareUrl(sA, sB, sC, aA, aB, aC));
      } catch (e: any) {
        setError(e.message);
      }
    } else {
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
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const calculateTriangle = () => {
    const inputs = readInputs(sideA, sideB, sideC, angleA, angleB, angleC);
    if (countGiven(inputs) > 3) {
      setError("Over-specified: please provide exactly 3 values (at least one must be a side).");
      setResults(null);
      setShareUrl("");
      return;
    }
    try {
      const solved = solveTriangleCore(inputs);
      setResults(solved);
      setError(null);
      saveCalculatorHistory("triangle", { sideA, sideB, sideC, angleA, angleB, angleC });
      setShareUrl(buildShareUrl(sideA, sideB, sideC, angleA, angleB, angleC));
    } catch (e: any) {
      setError(e.message);
      setResults(null);
      setShareUrl("");
    }
  };

  const handleClear = () => {
    setSideA(""); setSideB(""); setSideC("");
    setAngleA(""); setAngleB(""); setAngleC("");
    setResults(null); setError(null); setShareUrl(""); setLinkCopied(false);
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail without permission; the link is still
      // visible in the field and can be selected and copied by hand.
    }
  }, [shareUrl]);

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!results) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* INPUT PANEL — calculator.net-style triangle diagram */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove Triangle Solver from saved" : "Save Triangle Solver"}
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Settings2 className="text-blue-500" size={20} aria-hidden="true" /> Parameters
              </h2>
              <p className="text-xs text-muted-foreground mb-6">
                Fill in any 3 of the 6 boxes on the diagram, including at least one side.
              </p>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-xs font-bold flex items-start gap-2 animate-in fade-in duration-300">
                  <Info size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                  {error}
                </div>
              )}

              {/* Triangle diagram with inputs positioned at each vertex/side */}
              <div className="relative w-full max-w-sm mx-auto aspect-[4/3] mt-2 mb-6 text-gray-400 dark:text-gray-600">
                <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full" aria-hidden="true">
                  <polygon points="200,40 50,260 350,260" fill="none" stroke="currentColor" strokeWidth="2" />
                  <text x="200" y="62" textAnchor="middle" className="fill-blue-500 font-bold" style={{ fontSize: 16 }}>C</text>
                  <text x="72" y="248" textAnchor="middle" className="fill-blue-500 font-bold" style={{ fontSize: 16 }}>A</text>
                  <text x="328" y="248" textAnchor="middle" className="fill-blue-500 font-bold" style={{ fontSize: 16 }}>B</text>
                  <text x="112" y="142" textAnchor="middle" className="fill-emerald-500 font-bold" style={{ fontSize: 13 }}>b</text>
                  <text x="288" y="142" textAnchor="middle" className="fill-emerald-500 font-bold" style={{ fontSize: 13 }}>a</text>
                  <text x="200" y="278" textAnchor="middle" className="fill-emerald-500 font-bold" style={{ fontSize: 13 }}>c</text>
                </svg>

                <DiagramInput value={angleC} onChange={(v) => setAngleC(v)} suffix="°" left="50%" top="7%" />
                <DiagramInput value={sideB} onChange={(v) => setSideB(v)} left="24%" top="50%" />
                <DiagramInput value={sideA} onChange={(v) => setSideA(v)} left="76%" top="50%" />
                <DiagramInput value={angleA} onChange={(v) => setAngleA(v)} suffix="°" left="10%" top="91%" />
                <DiagramInput value={angleB} onChange={(v) => setAngleB(v)} suffix="°" left="90%" top="91%" />
                <DiagramInput value={sideC} onChange={(v) => setSideC(v)} left="50%" top="99%" />
              </div>

              <p className="text-[11px] text-muted-foreground text-center mb-6">
                Angles are entered in degrees. Leave the other 3 boxes blank.
              </p>

              <div className="flex gap-3">
                <button onClick={calculateTriangle} className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest hover:opacity-90 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2">
                  Solve Triangle <CheckCircle2 size={16} aria-hidden="true" />
                </button>
                <button onClick={handleClear} className="flex-1 py-4 bg-secondary text-muted-foreground rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-secondary/80 transition-all flex items-center justify-center gap-2">
                  <RotateCcw size={14} aria-hidden="true" /> Clear
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7 space-y-6" ref={resultsRef}>
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
                 <TriangleIcon size={64} className="text-blue-500 opacity-10 mb-4" aria-hidden="true" />
                 <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Awaiting Inputs</p>
                 <p className="text-sm text-muted-foreground/60 mt-2 max-w-xs leading-relaxed">Fill in 3 parameters on the diagram to generate the complete triangle solution.</p>
              </div>
            )}

            {/* SHARE RESULT */}
            {shareUrl && results && (
              <div className="bg-card border rounded-3xl p-6 md:p-8 space-y-3">
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
                    aria-label="Shareable link for this triangle solution"
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
                  Anyone who opens this link sees the same 3 values and the same solved triangle.
                </p>
              </div>
            )}
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

function DiagramInput({
  value,
  onChange,
  suffix,
  left,
  top,
}: {
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  left: string;
  top: string;
}) {
  return (
    <div className="absolute" style={{ left, top, transform: "translate(-50%, -50%)" }}>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="—"
          className="w-16 sm:w-[4.5rem] py-2 pl-2 pr-5 text-center bg-secondary/90 rounded-lg border-2 border-transparent focus:border-blue-500 outline-none font-bold text-sm transition-all"
        />
        {suffix && (
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function ResultBox({ label, val, sub }: { label: string; val: string; sub?: string }) {
    return (
        <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">{label}</span>
            <span className="text-2xl font-black text-foreground">{val} <span className="text-[10px] font-normal text-muted-foreground">{sub}</span></span>
        </div>
    )
}