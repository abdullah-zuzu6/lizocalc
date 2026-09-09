"use client";
// Target path in the project: app/calculators/education/cgpa-calculator/clientside.tsx

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Trash2,
  GraduationCap,
  CheckCircle2,
  Calculator,
  Heart,
  Target,
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

type Semester = {
  id: string;
  name: string;
  gpa: string;
  credits: string;
};

export default function CGPACalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const hasLoadedHistory = useRef(false);

  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", name: "Semester 1", gpa: "3.45", credits: "15" },
    { id: "2", name: "Semester 2", gpa: "3.70", credits: "16" },
    { id: "3", name: "Semester 3", gpa: "3.20", credits: "14" },
  ]);

  // Share + copy state
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [copied, setCopied] = useState(false);

  // Points at the results panel so we can scroll it into view on mobile
  // after Calculate is pressed. See the effect near the bottom of this
  // file for why that only runs under the lg breakpoint.
  const resultsRef = useRef<HTMLElement>(null);

  const calculatorInfo = {
    name: "CGPA Calculator",
    href: "/calculators/education/cgpa-calculator",
    category: "Education",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?semesters=...) wins over saved history. Someone who
  // opens a shared link wants to see the exact numbers the sender got,
  // not their own last session.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedSemesters = params.get("semesters");

    if (sharedSemesters) {
      try {
        const parsed = JSON.parse(sharedSemesters) as [string, string, string][];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSemesters(
            parsed.map((row, i) => ({
              id: String(i + 1),
              name: row[0] ?? `Semester ${i + 1}`,
              gpa: row[1] ?? "0",
              credits: row[2] ?? "0",
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
      if (history["cgpa-calc"]?.data?.semesters) {
        setSemesters(history["cgpa-calc"].data.semesters);
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
    saveCalculatorHistory("cgpa-calc", { semesters });
  }, [semesters, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const addSemester = () => {
    const newSemesters = Array.from({ length: 2 }).map((_, i) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: `Semester ${semesters.length + i + 1}`,
      gpa: "3.00",
      credits: "15",
    }));

    setSemesters((prev) => [...prev, ...newSemesters]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof Semester, value: string) => {
    setSemesters((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const resetCalculator = () => {
    setSemesters([{ id: "1", name: "Semester 1", gpa: "", credits: "15" }]);
    setShowResults(false);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // --- 3. CALCULATION ---
  const cgpaData = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    semesters.forEach((sem) => {
      const gpaNum = parseFloat(sem.gpa);
      const creditNum = parseFloat(sem.credits);

      if (!isNaN(gpaNum) && !isNaN(creditNum) && creditNum > 0) {
        totalPoints += gpaNum * creditNum;
        totalCredits += creditNum;
      }
    });

    return {
      cgpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(3) : "0.000",
      totalCredits,
      totalSemesters: semesters.length,
    };
  }, [semesters]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults) {
      setShareUrl("");
      return;
    }
    const rows = semesters.map((s) => [s.name, s.gpa, s.credits]);
    const params = new URLSearchParams();
    params.set("semesters", JSON.stringify(rows));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, semesters]);

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

  const handleCopyCgpa = () => {
    navigator.clipboard.writeText(cgpaData.cgpa);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- 5. SCROLL RESULTS INTO VIEW AFTER CALCULATE, MOBILE/TABLET ONLY ---
  // Results sit beside the inputs in the 2-column grid at the `lg`
  // breakpoint and above, so they're already visible there. Below `lg`
  // the columns stack in source order (inputs, then results), so once
  // Calculate is pressed the results panel is off-screen underneath the
  // form. This brings it into view instead of leaving the person to
  // scroll and hunt for their number.
  useEffect(() => {
    if (!showResults) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [showResults, cgpaData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/*
          Source order is inputs -> results. That's what determines the
          stacking order below `lg` (no `order-*` classes anywhere in this
          file), and it also reads left-to-right at `lg` and above, so the
          layout matches on every screen size instead of reshuffling.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* INPUT PANEL */}
          <div className="lg:col-span-7">
            <section className="bg-card border rounded-2xl p-4 md:p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" aria-hidden="true" />
                Semester Grades
              </h2>

              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold border-b pb-2 text-muted-foreground">
                <div className="col-span-5">Semester Name</div>
                <div className="col-span-3 text-center">Credits</div>
                <div className="col-span-4 text-center">GPA</div>
              </div>

              <div className="space-y-4 md:space-y-3">
                {semesters.map((sem, index) => (
                  <div
                    key={sem.id}
                    className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-2 items-start md:items-center p-4 md:p-0 border md:border-0 rounded-xl bg-secondary/20 md:bg-transparent relative group"
                  >
                    {/* Semester Name */}
                    <div className="w-full md:col-span-5">
                      <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden">Semester Label</label>
                      <input
                        type="text"
                        placeholder={`Semester ${index + 1}`}
                        aria-label={`Semester name for entry ${index + 1}`}
                        value={sem.name}
                        onChange={(e) => {
                          updateSemester(sem.id, "name", e.target.value);
                          setShowResults(false);
                        }}
                        className="w-full p-2 bg-background border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Middle Section: Credits and GPA side-by-side on mobile */}
                    <div className="w-full md:col-span-7 grid grid-cols-2 md:grid-cols-7 gap-2">
                        {/* Credits */}
                        <div className="md:col-span-3">
                            <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden text-center">Credits</label>
                            <input
                                type="number"
                                aria-label={`Credit hours for semester ${index + 1}`}
                                value={sem.credits}
                                onChange={(e) => {
                                  updateSemester(sem.id, "credits", e.target.value);
                                  setShowResults(false);
                                }}
                                className="w-full p-2 bg-background border rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        {/* GPA + Delete */}
                        <div className="md:col-span-4 flex items-center gap-1">
                            <div className="flex-1">
                                <label className="text-[10px] uppercase font-bold text-muted-foreground mb-1 block md:hidden text-center">GPA</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4.0"
                                    aria-label={`GPA for semester ${index + 1}`}
                                    value={sem.gpa}
                                    onChange={(e) => {
                                      updateSemester(sem.id, "gpa", e.target.value);
                                      setShowResults(false);
                                    }}
                                    placeholder="3.45"
                                    className="w-full p-2 bg-background border rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <button
                                onClick={() => removeSemester(sem.id)}
                                disabled={semesters.length <= 1}
                                className="md:mt-0 mt-5 p-2 text-muted-foreground hover:text-red-500 shrink-0 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                aria-label={`Remove semester ${index + 1}`}
                            >
                                <Trash2 size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Button */}
              <button
                onClick={addSemester}
                className="mt-6 text-primary text-sm font-bold hover:underline flex items-center gap-1"
              >
                + Add more semesters
              </button>

              {/* Calculate Button */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full mt-8 px-8 py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-green-700 transition-all active:scale-[0.98] shadow-lg shadow-green-900/20"
              >
                Calculate CGPA <CheckCircle2 size={18} aria-hidden="true" />
              </button>
            </section>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-5">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative" ref={resultsRef}>

              <button
                onClick={handleToggleSave}
                className="absolute top-4 right-4 p-2 rounded-xl border hover:bg-secondary transition-colors"
                aria-label={isSaved ? "Remove CGPA calculator from saved tools" : "Save CGPA calculator to your tools"}
                aria-pressed={isSaved}
              >
                <Heart
                  size={18}
                  aria-hidden="true"
                  className={isSaved ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator size={20} className="text-primary" aria-hidden="true" />
                CGPA Result
              </h2>

              {showResults ? (
                <div className="space-y-4 min-h-[220px]">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center relative">
                    <button
                      onClick={handleCopyCgpa}
                      aria-label="Copy CGPA value"
                      className="absolute top-4 right-4 p-2 bg-background/60 hover:bg-background rounded-xl transition-all"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                      Your CGPA
                    </p>
                    <h3 className="text-5xl font-black text-primary">
                      {cgpaData.cgpa}
                    </h3>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Total Credits: {cgpaData.totalCredits} • {cgpaData.totalSemesters} Semesters
                    </p>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="w-full py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} aria-hidden="true" /> Clear All
                  </button>
                </div>
              ) : (
                <div className="min-h-[220px] flex flex-col items-center justify-center text-center border-2 border-dashed rounded-2xl opacity-50">
                  <Calculator className="mx-auto mb-3" aria-hidden="true" />
                  <p className="text-xs font-bold">
                    Calculate to see results
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>

        {/*
          SHARE RESULT - a full-width block below the grid, so it lands
          after the results in reading order on every screen size instead
          of only on mobile.
        */}
        {showResults && shareUrl && (
          <section className="mt-8 bg-card border rounded-2xl p-6 md:p-8 space-y-3 max-w-2xl">
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
                aria-label="Shareable link for this CGPA result"
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
              Anyone who opens this link sees the same semesters, GPAs, and credits.
            </p>
          </section>
        )}

        {/* TARGET CGPA PLANNER */}
        <div className="mt-8">
          <CgpaPlanner
            currentCgpa={cgpaData.cgpa}
            currentCredits={cgpaData.totalCredits}
            hasResults={showResults}
          />
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
                name: "Grade Calculator",
                description: "Semester & Cumulative",
                href: "/calculators/education/grade-calculator",
                icon: Target,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Target CGPA Planner — works out the average
// SGPA needed across the remaining semesters to
// land on a target CGPA. Same math as the GPA
// planner elsewhere on this site, scaled up to
// whole semesters instead of individual courses.
// ─────────────────────────────────────────────
function CgpaPlanner({
  currentCgpa,
  currentCredits,
  hasResults,
}: {
  currentCgpa: string;
  currentCredits: number;
  hasResults: boolean;
}) {
  const [current, setCurrent] = useState("3.3");
  const [currentCr, setCurrentCr] = useState("45");
  const [target, setTarget] = useState("3.5");
  const [futureCr, setFutureCr] = useState("30");
  const [showPlan, setShowPlan] = useState(false);

  const useMyCgpa = () => {
    setCurrent(currentCgpa);
    setCurrentCr(String(currentCredits));
    setShowPlan(false);
  };

  const plan = useMemo(() => {
    if (!showPlan) return null;
    const c = parseFloat(current);
    const cc = parseFloat(currentCr);
    const t = parseFloat(target);
    const fc = parseFloat(futureCr);

    if ([c, cc, t, fc].some((n) => isNaN(n))) {
      return { error: "Fill in all four fields with numbers." };
    }
    if (fc <= 0) {
      return { error: "Remaining credits has to be more than 0." };
    }
    if (cc < 0) {
      return { error: "Current credits can't be negative." };
    }

    const requiredPoints = t * (cc + fc) - c * cc;
    const requiredGpa = requiredPoints / fc;

    return {
      requiredGpa,
      achievable: requiredGpa <= 4.0,
      alreadyThere: requiredGpa < 0,
    };
  }, [showPlan, current, currentCr, target, futureCr]);

  return (
    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" aria-hidden="true" />
          Plan Your Target CGPA
        </h3>
        {hasResults && (
          <button
            onClick={useMyCgpa}
            className="text-xs font-bold text-primary hover:underline"
          >
            Use my calculated CGPA above
          </button>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Enter your current CGPA, your credits so far, and how many credits
        you have left. This works out the average GPA you need across those
        remaining semesters to hit your target.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="cgpa-plan-current" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Current CGPA
          </label>
          <input
            id="cgpa-plan-current"
            type="number"
            step="0.01"
            value={current}
            onChange={(e) => { setCurrent(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="cgpa-plan-current-credits" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Current Credits
          </label>
          <input
            id="cgpa-plan-current-credits"
            type="number"
            value={currentCr}
            onChange={(e) => { setCurrentCr(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="cgpa-plan-target" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Target CGPA
          </label>
          <input
            id="cgpa-plan-target"
            type="number"
            step="0.01"
            value={target}
            onChange={(e) => { setTarget(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="cgpa-plan-future-credits" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Remaining Credits
          </label>
          <input
            id="cgpa-plan-future-credits"
            type="number"
            value={futureCr}
            onChange={(e) => { setFutureCr(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
      </div>

      <button
        onClick={() => setShowPlan(true)}
        className="w-full mt-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:opacity-90 transition-all"
      >
        Calculate Required GPA
      </button>

      {plan && !("error" in plan) && (
        <div className={`mt-6 p-6 rounded-2xl text-center ${
          plan.alreadyThere ? "bg-green-50" : plan.achievable ? "bg-primary/5" : "bg-red-50"
        }`}>
          {plan.alreadyThere ? (
            <p className="text-sm font-bold text-green-600">
              You've already hit this target. Any passing average in your remaining credits keeps you there.
            </p>
          ) : plan.achievable ? (
            <>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                GPA Needed Across Remaining Credits
              </p>
              <p className="text-4xl font-black text-primary mt-1">{plan.requiredGpa.toFixed(3)}</p>
            </>
          ) : (
            <p className="text-sm font-bold text-red-600">
              That target isn't reachable on a 4.0 scale with these numbers. You'd need a{" "}
              {plan.requiredGpa.toFixed(2)} average, and 4.0 is the ceiling.
            </p>
          )}
        </div>
      )}
      {plan && "error" in plan && (
        <p className="mt-4 text-sm font-bold text-red-600" role="alert">{plan.error}</p>
      )}
    </div>
  );
}