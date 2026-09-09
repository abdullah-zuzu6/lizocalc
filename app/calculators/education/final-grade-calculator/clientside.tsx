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
  Share2,
  Copy,
  Check,
  TrendingUp,
  RotateCcw,
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

export default function FinalGradeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const hasLoadedHistory = useRef(false);

  const [components, setComponents] = useState<GradeComponent[]>([
    { id: "1", name: "Assignments", weight: "20", score: "88" },
    { id: "2", name: "Quizzes", weight: "15", score: "92" },
    { id: "3", name: "Midterm Exam", weight: "25", score: "76" },
    { id: "4", name: "Final Exam", weight: "40", score: "85" },
  ]);

  // Share + copy state
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const calculatorInfo = {
    name: "Final Grade Calculator",
    href: "/calculators/education/final-grade-calculator",
    category: "Education",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?components=...) wins over saved history, same rule
  // every calculator on this site uses: a shared link should reproduce
  // the exact numbers someone else got, not whatever you had saved.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedComponents = params.get("components");

    if (sharedComponents) {
      try {
        const parsed = JSON.parse(sharedComponents) as [string, string, string][];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setComponents(
            parsed.map((row, i) => ({
              id: String(i + 1),
              name: row[0] ?? "",
              weight: row[1] ?? "0",
              score: row[2] ?? "",
            }))
          );
          setShowResults(true);
        }
      } catch {
        loadFromHistory();
      }
    } else {
      loadFromHistory();
    }

    function loadFromHistory() {
      const history = getCalculatorHistory();
      if (history["final-grade-calc"]?.data?.components) {
        setComponents(history["final-grade-calc"].data.components);
        setShowResults(true);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));

    hasLoadedHistory.current = true;
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- 2. AUTO-SAVE ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
    saveCalculatorHistory("final-grade-calc", { components });
  }, [components, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const addComponent = () => {
    const newComponents = Array.from({ length: 2 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      name: "New Component",
      weight: "10",
      score: "",
    }));
    setComponents((prev) => [...prev, ...newComponents]);
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
  };

  const resetCalculator = () => {
    setComponents([
      { id: "1", name: "Assignments", weight: "20", score: "" },
      { id: "2", name: "Midterm", weight: "30", score: "" },
      { id: "3", name: "Final Exam", weight: "50", score: "" },
    ]);
    setShowResults(false);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // --- 3. CALCULATION ---
  const gradeData = useMemo(() => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    components.forEach((comp) => {
      const weightNum = parseFloat(comp.weight);
      const scoreNum = parseFloat(comp.score);

      if (!isNaN(weightNum) && weightNum > 0 && !isNaN(scoreNum)) {
        totalWeightedScore += (scoreNum * weightNum) / 100;
        totalWeight += weightNum;
      }
    });

    const finalGrade = totalWeight > 0
      ? (totalWeightedScore * 100 / totalWeight).toFixed(2)
      : "0.00";

    const isComplete = Math.abs(totalWeight - 100) < 0.1;

    return {
      finalGrade,
      totalWeight: totalWeight.toFixed(1),
      isComplete,
      status: totalWeight > 100 ? "Overweight" : totalWeight < 100 ? "Remaining Weight" : "Complete",
    };
  }, [components]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults) {
      setShareUrl("");
      return;
    }
    const rows = components.map((c) => [c.name, c.weight, c.score]);
    const params = new URLSearchParams();
    params.set("components", JSON.stringify(rows));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, components]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail without permission. The link is still
      // visible in the input and can be selected by hand.
    }
  }, [shareUrl]);

  const handleCopyGrade = () => {
    navigator.clipboard.writeText(`${gradeData.finalGrade}%`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 5. SCROLL RESULTS INTO VIEW AFTER CALCULATE, MOBILE/TABLET ONLY ---
  // Below the `lg` breakpoint everything now stacks input -> results ->
  // share, in that DOM order, so the result sits just below the Calculate
  // button. This still brings it fully into view in case the button was
  // near the bottom of the screen.
  useEffect(() => {
    if (!showResults) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [showResults, gradeData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL - Input */}
          <div className="lg:col-span-8">
            <section className="bg-card border rounded-2xl p-6 shadow-sm">

              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold border-b pb-2">
                <div className="col-span-5">Component</div>
                <div className="col-span-3 text-center">Weight (%)</div>
                <div className="col-span-4 text-center">Score (%)</div>
              </div>

              <div className="space-y-3">
                {components.map((comp, index) => (
                  <div
                    key={comp.id}
                    className="grid grid-cols-12 gap-2 items-center group"
                  >
                    {/* Component Name */}
                    <input
                      type="text"
                      placeholder={`Component ${index + 1}`}
                      aria-label={`Component name for item ${index + 1}`}
                      value={comp.name}
                      onChange={(e) => {
                        updateComponent(comp.id, "name", e.target.value);
                        setShowResults(false);
                      }}
                      className="col-span-5 p-2 bg-background border rounded-lg text-sm outline-none"
                    />

                    {/* Weight */}
                    <input
                      type="number"
                      aria-label={`Weight percentage for component ${index + 1}`}
                      value={comp.weight}
                      onChange={(e) => {
                        updateComponent(comp.id, "weight", e.target.value);
                        setShowResults(false);
                      }}
                      className="col-span-3 p-2 bg-background border rounded-lg text-sm text-center outline-none"
                    />

                    {/* Score + Delete */}
                    <div className="col-span-4 flex items-center gap-1">
                      <input
                        type="number"
                        aria-label={`Score percentage for component ${index + 1}`}
                        value={comp.score}
                        onChange={(e) => {
                          updateComponent(comp.id, "score", e.target.value);
                          setShowResults(false);
                        }}
                        placeholder="85"
                        className="flex-1 p-2 bg-background border rounded-lg text-sm text-center outline-none"
                      />

                      <button
                        onClick={() => removeComponent(comp.id)}
                        disabled={components.length <= 1}
                        aria-label={`Remove component ${index + 1}`}
                        className="p-2 text-muted-foreground hover:text-red-500 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={addComponent}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                + add more components
              </button>

              {/* Calculate Button */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full mt-8 px-8 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
              >
                Calculate Final Grade <CheckCircle2 size={18} aria-hidden="true" />
              </button>

            </section>
          </div>

          {/* RIGHT PANEL - Results, then Share */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative" ref={resultsRef}>

              <button
                onClick={handleToggleSave}
                className="absolute top-4 right-4 p-2 rounded-xl border"
                aria-label={isSaved ? "Remove final grade calculator from saved tools" : "Save final grade calculator to your tools"}
                aria-pressed={isSaved}
              >
                <Heart
                  size={18}
                  aria-hidden="true"
                  className={isSaved ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" aria-hidden="true" />
                Final Grade
              </h2>

              {showResults ? (
                <div className="space-y-4 min-h-[220px]">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center relative">
                    <button
                      onClick={handleCopyGrade}
                      aria-label="Copy final grade value"
                      className="absolute top-4 right-4 p-2 bg-background/60 hover:bg-background rounded-xl transition-all"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                      YOUR FINAL GRADE
                    </p>
                    <h3 className="text-6xl font-black text-primary mt-2">
                      {gradeData.finalGrade}%
                    </h3>
                    <p className="text-sm mt-4 text-muted-foreground">
                      Total Weight: {gradeData.totalWeight}%
                      <span className={`ml-2 px-2 py-0.5 rounded text-xs font-medium ${
                        gradeData.isComplete ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {gradeData.status}
                      </span>
                    </p>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="w-full py-2 bg-secondary rounded-lg text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Clear All
                  </button>
                </div>
              ) : (
                <div className="min-h-[220px] flex flex-col items-center justify-center text-center border-2 border-dashed rounded-2xl opacity-50">
                  <Calculator className="mx-auto mb-3" aria-hidden="true" />
                  <p className="text-xs font-bold">Calculate to see results</p>
                </div>
              )}
            </section>

            {/* SHARE RESULT */}
            {showResults && shareUrl && (
              <section className="bg-card border rounded-2xl p-6 space-y-3">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                  <Share2 size={14} className="text-primary" aria-hidden="true" />
                  Share This Result
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    onFocus={(e) => e.target.select()}
                    aria-label="Shareable link for this final grade result"
                    className="flex-1 px-4 py-3 bg-secondary rounded-xl border-2 border-transparent focus:border-primary outline-none text-xs font-medium truncate"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className={`px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                      linkCopied ? "bg-green-600 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                    }`}
                  >
                    {linkCopied ? (<><Check size={16} /> COPIED</>) : (<><Copy size={16} /> COPY LINK</>)}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Anyone who opens this link sees the same components, weights, and scores.
                </p>
              </section>
            )}
          </div>
        </div>

        {/* REQUIRED FINAL SCORE SOLVER */}
        <div className="mt-8">
          <RequiredScoreCalculator />
        </div>

        {/* Related Calculators */}
        <div className="mt-12">
          <RelatedCalculators
            calculators={[
              {
                name: "GPA Calculator",
                description: "Semester GPA",
                href: "/calculators/education/gpa-calculator",
                icon: GraduationCap,
              },
              {
                name: "CGPA Calculator",
                description: "Cumulative GPA",
                href: "/calculators/education/cgpa-calculator",
                icon: Target,
              },
              {
                name: "Grade Calculator",
                description: "Weighted assignment average",
                href: "/calculators/education/grade-calculator",
                icon: Layers,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Required Final Score Solver — answers the question
// most people actually search for: "what do I need on
// my final exam?" It runs the weighted-grade formula
// backwards from a target grade instead of forward
// from known scores.
// ─────────────────────────────────────────────
function RequiredScoreCalculator() {
  const [currentGrade, setCurrentGrade] = useState("86");
  const [finalWeight, setFinalWeight] = useState("30");
  const [targetGrade, setTargetGrade] = useState("90");
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    if (!showResult) return null;
    const current = parseFloat(currentGrade);
    const weight = parseFloat(finalWeight);
    const target = parseFloat(targetGrade);

    if ([current, weight, target].some((n) => isNaN(n))) {
      return { error: "Fill in all three fields with numbers." };
    }
    if (weight <= 0 || weight > 100) {
      return { error: "Final exam weight has to be between 1 and 100." };
    }

    const courseworkWeight = 1 - weight / 100;
    const required = (target - current * courseworkWeight) / (weight / 100);

    return {
      required,
      alreadyThere: required <= 0,
      achievable: required <= 100,
    };
  }, [showResult, currentGrade, finalWeight, targetGrade]);

  return (
    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
      <h3 className="font-bold text-lg flex items-center gap-2 mb-4">
        <TrendingUp size={20} className="text-primary" aria-hidden="true" />
        What Score Do I Need on My Final Exam?
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your grade before the final, how much the final is worth, and the grade
        you're aiming for. This works backward from your target to tell you the exact
        score you need.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="req-current-grade" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Current Grade (%)
          </label>
          <input
            id="req-current-grade"
            type="number"
            value={currentGrade}
            onChange={(e) => { setCurrentGrade(e.target.value); setShowResult(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="req-final-weight" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Final Exam Weight (%)
          </label>
          <input
            id="req-final-weight"
            type="number"
            value={finalWeight}
            onChange={(e) => { setFinalWeight(e.target.value); setShowResult(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="req-target-grade" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Target Grade (%)
          </label>
          <input
            id="req-target-grade"
            type="number"
            value={targetGrade}
            onChange={(e) => { setTargetGrade(e.target.value); setShowResult(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => setShowResult(true)}
        className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all"
      >
        Calculate Required Score
      </button>

      {result && !("error" in result) && (
        <div className={`mt-6 p-6 rounded-2xl text-center ${
          result.alreadyThere ? "bg-green-50" : result.achievable ? "bg-primary/5" : "bg-red-50"
        }`}>
          {result.alreadyThere ? (
            <p className="text-sm font-bold text-green-600">
              You've already hit this target. Any final exam score keeps you there or above it.
            </p>
          ) : result.achievable ? (
            <>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                Score Needed on the Final
              </p>
              <p className="text-4xl font-black text-primary mt-1">{result.required.toFixed(1)}%</p>
            </>
          ) : (
            <p className="text-sm font-bold text-red-600">
              That target isn't reachable. Even a perfect 100% on the final wouldn't get
              you there, you'd need a {result.required.toFixed(1)}% score. Try a lower
              target grade.
            </p>
          )}
        </div>
      )}
      {result && "error" in result && (
        <p className="mt-4 text-sm font-bold text-red-600" role="alert">{result.error}</p>
      )}
    </div>
  );
}