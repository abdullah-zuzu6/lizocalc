"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  Ruler,
  RotateCcw,
  Info,
  ListFilter,
  Triangle as TriangleIcon,
  CheckCircle2,
  Square,
  BarChart3,
  Heart,
  Calculator,
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

// --- Types ---
type CalcResult = {
  a: string;
  b: string;
  c: string;
  solvingFor: "Side A" | "Side B" | "Hypotenuse";
  area: string;
  steps: string[];
};

// A side's value is wholePart + √rootPart, so 2 and √5 together mean 2 + √5.
// Leaving both boxes empty marks that side as the unknown to solve for.
function combinedValue(whole: string, root: string): number {
  const w = parseFloat(whole) || 0;
  const r = parseFloat(root) || 0;
  return w + (r > 0 ? Math.sqrt(r) : 0);
}

function isProvided(whole: string, root: string): boolean {
  return whole.trim() !== "" || root.trim() !== "";
}

function formatSurd(whole: string, root: string): string {
  const w = whole.trim();
  const r = root.trim();
  if (w && r) return `(${w} + √${r})`;
  if (r) return `√${r}`;
  if (w) return w;
  return "0";
}

export default function PythagoreanCalculator() {
  const [sideA, setSideA] = useState<string>("3");
  const [sideARoot, setSideARoot] = useState<string>("");
  const [sideB, setSideB] = useState<string>("4");
  const [sideBRoot, setSideBRoot] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [sideCRoot, setSideCRoot] = useState<string>("");

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Pythagorean Calculator",
    href: "/calculators/math/pythagorean-theorem-calculator",
    category: "Math",
  };

  const relatedCalculators = [
    {
      name: "Triangle Calculator",
      description: "Solve for non-right triangles",
      href: "/calculators/math/triangle-calculator",
      icon: TriangleIcon,
    },
    {
      name: "GCF Calculator",
      description: "Greatest Common Factor",
      href: "/calculators/math/gcf-calculator",
      icon: ListFilter,
    },
  ];

  // --- Load a shared link first, then saved history ---
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const hasShare = ["a", "aRoot", "b", "bRoot", "c", "cRoot"].some((k) => params.has(k));

    if (hasShare) {
      setSideA(params.get("a") ?? "");
      setSideARoot(params.get("aRoot") ?? "");
      setSideB(params.get("b") ?? "");
      setSideBRoot(params.get("bRoot") ?? "");
      setSideC(params.get("c") ?? "");
      setSideCRoot(params.get("cRoot") ?? "");
      setTrigger(1);
      setShowResults(true);
    } else {
      const history = getCalculatorHistory();
      if (history["pythag-calc"]?.data) {
        const data = history["pythag-calc"].data;
        setSideA(data.sideA ?? "");
        setSideARoot(data.sideARoot ?? "");
        setSideB(data.sideB ?? "");
        setSideBRoot(data.sideBRoot ?? "");
        setSideC(data.sideC ?? "");
        setSideCRoot(data.sideCRoot ?? "");
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

  const clearResults = () => setShowResults(false);

  // --- Calculation Engine ---
  const results = useMemo((): CalcResult | { error: string } | null => {
    if (trigger === 0) return null;

    const aProvided = isProvided(sideA, sideARoot);
    const bProvided = isProvided(sideB, sideBRoot);
    const cProvided = isProvided(sideC, sideCRoot);
    const providedCount = [aProvided, bProvided, cProvided].filter(Boolean).length;

    if (providedCount < 2) return { error: "Please enter any two sides to calculate the third." };
    if (providedCount === 3) return { error: "Leave one side's boxes empty to solve for that side." };

    const aVal = combinedValue(sideA, sideARoot);
    const bVal = combinedValue(sideB, sideBRoot);
    const cVal = combinedValue(sideC, sideCRoot);

    if (cProvided && bProvided && !aProvided) {
      if (cVal <= bVal) return { error: "Hypotenuse (C) must be longer than Side B." };
      const diff = cVal ** 2 - bVal ** 2;
      const calcA = Math.sqrt(diff);
      return {
        a: calcA.toFixed(2), b: bVal.toFixed(2), c: cVal.toFixed(2),
        solvingFor: "Side A",
        area: (0.5 * calcA * bVal).toFixed(2),
        steps: [
          `a² + ${formatSurd(sideB, sideBRoot)}² = ${formatSurd(sideC, sideCRoot)}²`,
          `a² + ${bVal.toFixed(2)}² = ${cVal.toFixed(2)}²`,
          `a² = ${(cVal ** 2).toFixed(2)} − ${(bVal ** 2).toFixed(2)} = ${diff.toFixed(2)}`,
          `a = √${diff.toFixed(2)} = ${calcA.toFixed(2)}`,
        ],
      };
    }
    if (cProvided && aProvided && !bProvided) {
      if (cVal <= aVal) return { error: "Hypotenuse (C) must be longer than Side A." };
      const diff = cVal ** 2 - aVal ** 2;
      const calcB = Math.sqrt(diff);
      return {
        a: aVal.toFixed(2), b: calcB.toFixed(2), c: cVal.toFixed(2),
        solvingFor: "Side B",
        area: (0.5 * aVal * calcB).toFixed(2),
        steps: [
          `${formatSurd(sideA, sideARoot)}² + b² = ${formatSurd(sideC, sideCRoot)}²`,
          `${aVal.toFixed(2)}² + b² = ${cVal.toFixed(2)}²`,
          `b² = ${(cVal ** 2).toFixed(2)} − ${(aVal ** 2).toFixed(2)} = ${diff.toFixed(2)}`,
          `b = √${diff.toFixed(2)} = ${calcB.toFixed(2)}`,
        ],
      };
    }
    if (aProvided && bProvided && !cProvided) {
      const sum = aVal ** 2 + bVal ** 2;
      const calcC = Math.sqrt(sum);
      return {
        a: aVal.toFixed(2), b: bVal.toFixed(2), c: calcC.toFixed(2),
        solvingFor: "Hypotenuse",
        area: (0.5 * aVal * bVal).toFixed(2),
        steps: [
          `${formatSurd(sideA, sideARoot)}² + ${formatSurd(sideB, sideBRoot)}² = c²`,
          `${aVal.toFixed(2)}² + ${bVal.toFixed(2)}² = c²`,
          `c² = ${sum.toFixed(2)}`,
          `c = √${sum.toFixed(2)} = ${calcC.toFixed(2)}`,
        ],
      };
    }
    return null;
  }, [trigger, sideA, sideARoot, sideB, sideBRoot, sideC, sideCRoot]);

  const resultsOk = results && !("error" in results) ? results : null;

  // --- Share link: only the 2 known sides need to travel with the link ---
  useEffect(() => {
    if (!showResults || !resultsOk) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    if (resultsOk.solvingFor !== "Side A") {
      if (sideA.trim()) params.set("a", sideA.trim());
      if (sideARoot.trim()) params.set("aRoot", sideARoot.trim());
    }
    if (resultsOk.solvingFor !== "Side B") {
      if (sideB.trim()) params.set("b", sideB.trim());
      if (sideBRoot.trim()) params.set("bRoot", sideBRoot.trim());
    }
    if (resultsOk.solvingFor !== "Hypotenuse") {
      if (sideC.trim()) params.set("c", sideC.trim());
      if (sideCRoot.trim()) params.set("cRoot", sideCRoot.trim());
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, resultsOk, sideA, sideARoot, sideB, sideBRoot, sideC, sideCRoot]);

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults || !resultsOk) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [resultsOk, showResults]);

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

  const handleSolve = () => {
    setTrigger((t) => t + 1);
    setShowResults(true);
    saveCalculatorHistory("pythag-calc", {
      sideA, sideARoot, sideB, sideBRoot, sideC, sideCRoot,
    });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground tracking-tight">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-black  flex items-center gap-3">
              <Calculator className="text-blue-600" size={30} /> Parameters
            </h2>
          </div>
          <button
            onClick={handleToggleSave}
            aria-label={isSaved ? "Remove from saved" : "Save calculator"}
            className={`p-4 rounded-2xl transition-all border ${
              isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground border-transparent"
            }`}
          >
            <Heart size={24} className={isSaved ? "fill-current" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUTS */}
          <div className="lg:col-span-4">
            <div className="bg-card rounded-3xl border p-8 shadow-sm space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
                <Square size={14} className="fill-current" /> Triangle Sides
              </h2>
              <p className="text-[10px] text-muted-foreground -mt-4">
                Each side can be a plain number, or a number plus a square root, e.g. 2 + √5.
                Leave both boxes on one side empty to solve for it.
              </p>

              <div className="space-y-4">
                <SurdInputField
                  label="Side a (Height)"
                  whole={sideA}
                  root={sideARoot}
                  onWholeChange={(v) => { setSideA(v); clearResults(); }}
                  onRootChange={(v) => { setSideARoot(v); clearResults(); }}
                />
                <SurdInputField
                  label="Side b (Base)"
                  whole={sideB}
                  root={sideBRoot}
                  onWholeChange={(v) => { setSideB(v); clearResults(); }}
                  onRootChange={(v) => { setSideBRoot(v); clearResults(); }}
                />
                <SurdInputField
                  label="Side c (Hypotenuse)"
                  whole={sideC}
                  root={sideCRoot}
                  onWholeChange={(v) => { setSideC(v); clearResults(); }}
                  onRootChange={(v) => { setSideCRoot(v); clearResults(); }}
                  isHypotenuse
                />
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button onClick={handleSolve} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  Calculate Result <CheckCircle2 size={18} />
                </button>
                <button
                  onClick={() => {
                    setSideA(""); setSideARoot("");
                    setSideB(""); setSideBRoot("");
                    setSideC(""); setSideCRoot("");
                    setShowResults(false); setTrigger(0);
                    setShareUrl("");
                    window.history.replaceState(null, "", window.location.pathname);
                  }}
                  className="w-full py-3 bg-secondary text-muted-foreground rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* OUTPUTS */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                    <TriangleIcon className="absolute -bottom-10 -right-10 opacity-10 rotate-12" size={240} />
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-2">Solved For: {results.solvingFor}</p>
                    <h2 className="text-7xl font-black tracking-tighter italic">
                      {results.solvingFor === "Side A" ? results.a : results.solvingFor === "Side B" ? results.b : results.c}
                    </h2>
                  </div>

                  <div className="bg-card border rounded-[2.5rem] p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-blue-600 mb-4">
                        <BarChart3 size={20} />
                        <span className="text-xs font-black uppercase tracking-widest">Properties</span>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Area</p>
                            <p className="text-3xl font-black">{results.area} <small className="text-sm font-normal text-muted-foreground italic">u²</small></p>
                        </div>
                        <div>
                            <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Type</p>
                            <p className="text-xl font-black text-green-600">RIGHT-ANGLED</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-3xl p-8">
                    <h3 className="text-xs font-black text-muted-foreground uppercase mb-6 tracking-widest flex items-center gap-2">
                        <Ruler size={16} className="text-blue-600" /> Mathematical Breakdown
                    </h3>
                    <div className="grid gap-3">
                        {results.steps.map((step, i) => (
                            <div key={i} className="flex justify-between items-center p-5 bg-secondary/30 rounded-2xl border border-border/50 font-mono">
                                <span className="text-[10px] font-black uppercase text-blue-600/50">Step {i + 1}</span>
                                <span className="text-lg font-bold tracking-tight">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SHARE RESULT */}
                {shareUrl && (
                  <div className="bg-card border rounded-3xl p-6 md:p-8 space-y-3">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Share2 size={14} className="text-blue-600" />
                      Share This Result
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.target.select()}
                        aria-label="Shareable link for this Pythagorean theorem result"
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
                      Anyone who opens this link sees the same two sides and the same solved result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-2 border-dashed border-border rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                {results && "error" in results ? (
                  <div className="text-red-500 animate-pulse flex flex-col items-center">
                    <Info size={48} className="mb-4" />
                    <p className="font-black uppercase tracking-widest text-sm">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <TriangleIcon size={80} className="text-blue-600 opacity-10 mb-6" />
                    <h3 className="text-lg font-black uppercase tracking-[0.2em] italic text-muted-foreground">Waiting for Geometry</h3>
                    <p className="text-sm text-muted-foreground/60 mt-2 max-w-xs leading-relaxed">Enter any two side lengths to solve for the remaining side and triangle area.</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

function SurdInputField({
  label,
  whole,
  root,
  onWholeChange,
  onRootChange,
  isHypotenuse,
}: {
  label: string;
  whole: string;
  root: string;
  onWholeChange: (v: string) => void;
  onRootChange: (v: string) => void;
  isHypotenuse?: boolean;
}) {
  const borderClass = isHypotenuse
    ? "border-blue-600/20 focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
    : "border-transparent focus:border-blue-600/40 focus:bg-background";

  return (
    <div className="group">
      <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2 block group-focus-within:text-blue-600 transition-colors">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={whole}
          onChange={(e) => onWholeChange(e.target.value)}
          placeholder="Number"
          aria-label={`${label} whole number part`}
          className={`w-full px-4 py-4 bg-secondary/50 rounded-2xl border-2 outline-none transition-all font-black text-lg ${borderClass}`}
        />
        <span className="text-lg font-black text-muted-foreground select-none">√</span>
        <input
          type="number"
          value={root}
          onChange={(e) => onRootChange(e.target.value)}
          placeholder="Root"
          aria-label={`${label} square root part`}
          min={0}
          className={`w-full px-4 py-4 bg-secondary/50 rounded-2xl border-2 outline-none transition-all font-black text-lg ${borderClass}`}
        />
      </div>
    </div>
  );
}

function TipItem({ text }: { text: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 bg-blue-600 rounded-full p-1"><Ruler size={12} className="text-white" /></div>
            <p className="text-xs font-bold text-muted-foreground leading-relaxed">{text}</p>
        </div>
    );
}