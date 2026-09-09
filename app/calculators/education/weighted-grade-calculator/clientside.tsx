"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Trash2,
  GraduationCap,
  CheckCircle2,
  Calculator,
  Heart,
  Target,
  Layers,
  AlertCircle,
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

type GradeComponent = {
  id: string;
  name: string;
  weight: string;
  score: string;
};

function makeId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export default function WeightedGradeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [components, setComponents] = useState<GradeComponent[]>([
    { id: "1", name: "Homework", weight: "20", score: "90" },
    { id: "2", name: "Midterm Exam", weight: "30", score: "85" },
    { id: "3", name: "Final Exam", weight: "50", score: "88" },
  ]);

  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Weighted Grade Calculator",
    href: "/calculators/education/weighted-grade-calculator",
    category: "Education",
  };

  // NOTE: We intentionally do NOT gate the initial render behind `isMounted`.
  // The default `components` state above is static and identical on server
  // and client, so there is no hydration mismatch risk. Returning `null`
  // until mount was causing a large Cumulative Layout Shift (0.4-0.55) because
  // the entire calculator card would pop into the page after first paint.
  // We only use `isMounted` to guard browser-only APIs (localStorage) inside
  // effects below.
  //
  // A shared link (?data=...) wins over saved history, and auto-solves
  // immediately so whoever opens the link sees the same result right away.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get("data");

    if (sharedData) {
      try {
        const parsed: { name: string; weight: string; score: string }[] = JSON.parse(
          decodeURIComponent(sharedData)
        );
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComponents(parsed.map((c) => ({ id: makeId(), ...c })));
          setShowResults(true);
        }
      } catch {
        // Malformed share link; fall back to the default components above.
      }
    } else {
      const history = getCalculatorHistory();
      if (history["weighted-grade-calc"]?.data?.components) {
        setComponents(history["weighted-grade-calc"].data.components);
        setShowResults(true);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("weighted-grade-calc", { components });
  }, [components, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const addComponent = () => {
    setComponents((prev) => [
      ...prev,
      { id: makeId(), name: "", weight: "", score: "" },
    ]);
  };

  const removeComponent = (id: string) => {
    if (components.length > 1) {
      setComponents(components.filter((c) => c.id !== id));
    }
  };

  const updateComponent = (id: string, field: keyof GradeComponent, value: string) => {
    setComponents((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
    setShowResults(false);
  };

  const resetCalculator = () => {
    setComponents([{ id: "1", name: "Homework", weight: "20", score: "" }]);
    setShowResults(false);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const gradeData = useMemo(() => {
    let totalWeightedScore = 0;
    let totalWeight = 0;
    components.forEach((comp) => {
      const w = parseFloat(comp.weight) || 0;
      const s = parseFloat(comp.score) || 0;
      if (w > 0) {
        totalWeightedScore += s * (w / 100);
        totalWeight += w;
      }
    });

    const isOver = totalWeight > 100;
    const weightStatus = isOver
      ? `Error: Total weight is ${totalWeight}% (Limit 100%)`
      : totalWeight < 100
        ? `${(100 - totalWeight).toFixed(1)}% weight remaining`
        : "Perfect! Weights total 100%";

    return {
      finalGrade: totalWeight > 0 ? (totalWeightedScore / (totalWeight / 100)).toFixed(2) : "0.00",
      totalWeight: totalWeight.toFixed(1),
      isOver,
      weightStatus,
    };
  }, [components]);

  // --- Build the shareable link once results are showing ---
  useEffect(() => {
    if (!showResults) {
      setShareUrl("");
      return;
    }
    const payload = components.map(({ name, weight, score }) => ({ name, weight, score }));
    const params = new URLSearchParams();
    params.set("data", encodeURIComponent(JSON.stringify(payload)));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, components]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard API can fail silently; the link is still visible/selectable.
    }
  }, [shareUrl]);

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [showResults]);

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL - Results */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-6" ref={resultsRef}>
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative">
              <button
                type="button"
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove Weighted Grade Calculator from saved tools" : "Save Weighted Grade Calculator to your saved tools"}
                aria-pressed={isSaved}
                className="absolute top-4 right-4 p-2 rounded-xl border hover:bg-secondary transition-colors"
              >
                <Heart size={18} className={isSaved ? "fill-red-500 text-red-500" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" aria-hidden="true" />
                Grade Summary
              </h2>

              {showResults ? (
                <div className="space-y-4">
                  <div
                    className={`border rounded-2xl p-8 text-center transition-colors ${gradeData.isOver ? 'bg-red-50 border-red-200' : 'bg-primary/5 border-primary/10'}`}
                    role="status"
                    aria-live="polite"
                  >
                    <p className={`text-[10px] font-black uppercase tracking-widest ${gradeData.isOver ? 'text-red-500' : 'text-primary'}`}>
                      {gradeData.isOver ? 'Weight Limit Exceeded' : 'Weighted Grade'}
                    </p>
                    <h3 className={`text-5xl font-black mt-2 ${gradeData.isOver ? 'text-red-600' : 'text-primary'}`}>
                      {gradeData.finalGrade}%
                    </h3>
                    <p className="text-sm mt-2 text-muted-foreground">Sum of Weights: {gradeData.totalWeight}%</p>
                  </div>

                  <div className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold ${gradeData.isOver ? 'bg-red-100 text-red-700' : 'bg-secondary text-muted-foreground'}`}>
                    {gradeData.isOver && <AlertCircle size={14} aria-hidden="true" />}
                    {gradeData.weightStatus}
                  </div>

                  {/* SHARE RESULT */}
                  {shareUrl && (
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                        <Share2 size={12} className="text-primary" aria-hidden="true" />
                        Share This Result
                      </p>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          onFocus={(e) => e.target.select()}
                          aria-label="Shareable link for this weighted grade result"
                          className="w-full px-3 py-2.5 bg-secondary rounded-lg border-2 border-transparent focus:border-primary outline-none text-xs font-medium truncate"
                        />
                        <button
                          type="button"
                          onClick={handleCopyShareLink}
                          className={`w-full py-2.5 rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all ${
                            linkCopied ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                          }`}
                        >
                          {linkCopied ? (<><Check size={14} /> COPIED</>) : (<><Copy size={14} /> COPY LINK</>)}
                        </button>
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Anyone who opens this link sees the same components and the same grade.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={resetCalculator}
                    className="w-full py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-xs font-bold transition-colors"
                  >
                    Clear Calculator
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed rounded-2xl opacity-50">
                  <Calculator className="mx-auto mb-3" aria-hidden="true" />
                  <p className="text-xs font-bold">Calculate to see results</p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT PANEL - Input */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <section className="bg-card border rounded-2xl p-4 md:p-6 shadow-sm">
              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold border-b pb-2 text-muted-foreground">
                <div className="col-span-6" id="col-header-name">Assessment Name</div>
                <div className="col-span-3 text-center" id="col-header-weight">Weight (%)</div>
                <div className="col-span-3 text-center" id="col-header-score">Grade (%)</div>
              </div>

              <div className="space-y-4 md:space-y-3">
                {components.map((comp, index) => {
                  const nameId = `component-name-${comp.id}`;
                  const weightId = `component-weight-${comp.id}`;
                  const scoreId = `component-score-${comp.id}`;
                  const rowLabel = comp.name || `Component ${index + 1}`;

                  return (
                    <div
                      key={comp.id}
                      className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-2 p-4 md:p-0 border md:border-0 rounded-xl bg-secondary/10 md:bg-transparent"
                    >
                      <div className="w-full md:col-span-6">
                        <label htmlFor={nameId} className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden">
                          Assessment Name
                        </label>
                        <input
                          id={nameId}
                          type="text"
                          placeholder={`Component ${index + 1}`}
                          aria-label={`Assessment name for row ${index + 1}`}
                          value={comp.name}
                          onChange={(e) => updateComponent(comp.id, "name", e.target.value)}
                          className="w-full p-2 bg-background border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div className="grid grid-cols-2 md:contents gap-2">
                        <div className="md:col-span-3">
                          <label htmlFor={weightId} className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden text-center">
                            Weight %
                          </label>
                          <input
                            id={weightId}
                            type="number"
                            inputMode="decimal"
                            aria-label={`Weight percentage for ${rowLabel}`}
                            value={comp.weight}
                            onChange={(e) => updateComponent(comp.id, "weight", e.target.value)}
                            className={`w-full p-2 bg-background border rounded-lg text-sm text-center outline-none focus:ring-2 ${gradeData.isOver ? 'border-red-300 focus:ring-red-100' : 'focus:ring-primary/20'}`}
                          />
                        </div>

                        <div className="md:col-span-3 flex items-center gap-1">
                          <div className="flex-1">
                            <label htmlFor={scoreId} className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden text-center">
                              Grade %
                            </label>
                            <input
                              id={scoreId}
                              type="number"
                              inputMode="decimal"
                              aria-label={`Score percentage for ${rowLabel}`}
                              value={comp.score}
                              placeholder="0"
                              onChange={(e) => updateComponent(comp.id, "score", e.target.value)}
                              className="w-full p-2 bg-background border rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-primary/20"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeComponent(comp.id)}
                            aria-label={`Remove ${rowLabel}`}
                            disabled={components.length <= 1}
                            className="md:mt-0 mt-5 p-2 text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={16} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <button
                  type="button"
                  onClick={addComponent}
                  className="text-primary text-sm font-bold underline underline-offset-2 hover:no-underline"
                >
                  + Add Component
                </button>
                <button
                  type="button"
                  onClick={() => setShowResults(true)}
                  className={`w-full md:w-auto px-8 py-4 text-white rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${gradeData.isOver ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  Calculate Grade <CheckCircle2 size={18} aria-hidden="true" />
                </button>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <RelatedCalculators
            calculators={[
              {
                name: "Final Grade Calculator",
                description: "Find required final exam score",
                href: "/calculators/education/final-grade-calculator",
                icon: Target,
              },
              {
                name: "CGPA Calculator",
                description: "Cumulative GPA across semesters",
                href: "/calculators/education/cgpa-calculator",
                icon: Layers,
              },
              {
                name: "GPA Calculator",
                description: "Standard semester GPA tool",
                href: "/calculators/education/gpa-calculator",
                icon: GraduationCap,
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}