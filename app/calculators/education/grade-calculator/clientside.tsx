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

const GRADE_SCALE: { [key: string]: number } = {
  "A+": 4.0, A: 4.0, "A-": 3.7,
  "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7,
  "D+": 1.3, D: 1.0, "D-": 0.7,
  F: 0.0,
};

type Course = {
  id: string;
  name: string;
  grade: string;
  credits: string;
};

export default function GPACalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const hasLoadedHistory = useRef(false);

  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Math", grade: "A-", credits: "2" },
    { id: "2", name: "English", grade: "B+", credits: "1" },
    { id: "3", name: "History", grade: "B", credits: "2" },
  ]);

  // Share + copy state
  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [copied, setCopied] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);

  const calculatorInfo = {
    name: "GPA Calculator",
    href: "/calculators/education/gpa-calculator",
    category: "Education",
  };

  // --- 1. HYDRATION & DATA LOADING ---
  // A shared link (?courses=...) wins over saved history, the same rule
  // the binary calculator uses: the point of sharing a link is showing
  // someone else the exact numbers you got, not whatever they had saved.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedCourses = params.get("courses");

    if (sharedCourses) {
      try {
        const parsed = JSON.parse(sharedCourses) as [string, string, string][];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCourses(
            parsed.map((row, i) => ({
              id: String(i + 1),
              name: row[0] ?? "",
              grade: row[1] in GRADE_SCALE ? row[1] : "A",
              credits: row[2] ?? "3",
            }))
          );
          setShowResults(true);
        }
      } catch {
        // Malformed link — fall back to saved history instead.
        const history = getCalculatorHistory();
        if (history["gpa-calc"]?.data?.courses) {
          setCourses(history["gpa-calc"].data.courses);
          setShowResults(true);
        }
      }
    } else {
      const history = getCalculatorHistory();
      if (history["gpa-calc"]?.data?.courses) {
        setCourses(history["gpa-calc"].data.courses);
        setShowResults(true);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));

    hasLoadedHistory.current = true;
    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- 2. AUTO-SAVE TO STORAGE ---
  useEffect(() => {
    if (!isMounted || !hasLoadedHistory.current) return;
    saveCalculatorHistory("gpa-calc", { courses });
  }, [courses, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const addRow = () => {
    const newCourses = Array.from({ length: 3 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      grade: "A",
      credits: "3",
    }));
    setCourses((prev) => [...prev, ...newCourses]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((c) => c.id !== id));
    }
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const resetCalculator = () => {
    setCourses([{ id: "1", name: "", grade: "A", credits: "3" }]);
    setShowResults(false);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // --- 3. CALCULATION ---
  const gpaData = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach((course) => {
      const creditNum = parseFloat(course.credits);
      if (!isNaN(creditNum) && creditNum > 0) {
        totalPoints += (GRADE_SCALE[course.grade] || 0) * creditNum;
        totalCredits += creditNum;
      }
    });

    return {
      gpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(3) : "0.000",
      totalCredits,
    };
  }, [courses]);

  // --- 4. SHARE LINK ---
  useEffect(() => {
    if (!showResults) {
      setShareUrl("");
      return;
    }
    const rows = courses.map((c) => [c.name, c.grade, c.credits]);
    const params = new URLSearchParams();
    params.set("courses", JSON.stringify(rows));
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, courses]);

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

  const handleCopyGpa = () => {
    navigator.clipboard.writeText(gpaData.gpa);
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
  }, [showResults, gpaData]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL - Input */}
          <div className="lg:col-span-8">
            <section className="bg-card border rounded-2xl p-6 shadow-sm">

              <div className="hidden md:grid grid-cols-12 gap-4 mb-4 px-2 text-sm font-bold border-b pb-2">
                <div className="col-span-6">Course</div>
                <div className="col-span-3 text-center">Credits</div>
                <div className="col-span-3 text-center">Grade</div>
              </div>

              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-12 gap-2 items-center group"
                  >
                    {/* COURSE NAME */}
                    <input
                      type="text"
                      placeholder={`Course ${index + 1}`}
                      aria-label={`Course name for course ${index + 1}`}
                      value={course.name}
                      onChange={(e) => {
                        updateCourse(course.id, "name", e.target.value);
                        setShowResults(false);
                      }}
                      className="col-span-4 md:col-span-5 min-w-0 w-full p-2 bg-background border rounded-lg text-sm outline-none"
                    />

                    {/* CREDITS */}
                    <input
                      type="number"
                      aria-label={`Credit hours for course ${index + 1}`}
                      value={course.credits}
                      onChange={(e) => {
                        updateCourse(course.id, "credits", e.target.value);
                        setShowResults(false);
                      }}
                      className="col-span-3 md:col-span-3 min-w-0 w-full p-2 bg-background border rounded-lg text-sm text-center outline-none"
                    />

                    {/* GRADE + DELETE */}
                    <div className="col-span-5 md:col-span-4 flex items-center gap-1 min-w-0">
                      <select
                        value={course.grade}
                        aria-label={`Grade for course ${index + 1}`}
                        onChange={(e) => {
                          updateCourse(course.id, "grade", e.target.value);
                          setShowResults(false);
                        }}
                        className="flex-1 min-w-0 p-2 pr-8 bg-background border rounded-lg text-sm outline-none cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.3rem_center] bg-no-repeat"
                      >
                        {Object.keys(GRADE_SCALE).map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => removeCourse(course.id)}
                        aria-label={`Remove course ${index + 1}`}
                        disabled={courses.length <= 1}
                        className="p-2 text-muted-foreground hover:text-red-500 shrink-0 disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ADD BUTTON */}
              <button
                onClick={addRow}
                className="mt-4 text-primary text-sm font-medium hover:underline"
              >
                + add more courses
              </button>

              {/* CALCULATE */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full mt-8 px-8 py-3 bg-green-600 text-white rounded-lg font-bold flex items-center justify-center gap-2"
              >
                Calculate Now <CheckCircle2 size={18} aria-hidden="true" />
              </button>

            </section>
          </div>

          {/* RIGHT PANEL - Results, then Share */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative" ref={resultsRef}>

              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove GPA calculator from saved tools" : "Save GPA calculator to your tools"}
                aria-pressed={isSaved}
                className="absolute top-4 right-4 p-2 rounded-xl border"
              >
                <Heart
                  size={18}
                  aria-hidden="true"
                  className={isSaved ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" aria-hidden="true" />
                Statistics
              </h2>

              {/*
                Both branches share min-h-[220px] so switching between the
                placeholder and the result never shifts anything below it.
              */}
              {showResults ? (
                <div className="space-y-4 min-h-[220px]">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center relative">
                    <button
                      onClick={handleCopyGpa}
                      aria-label="Copy GPA value"
                      className="absolute top-4 right-4 p-2 bg-background/60 hover:bg-background rounded-xl transition-all"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                      Your GPA
                    </p>
                    <h3 className="text-5xl font-black text-primary">
                      {gpaData.gpa}
                    </h3>
                    <p className="text-sm mt-2 text-muted-foreground">
                      Total Credits: {gpaData.totalCredits}
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
                  <p className="text-xs font-bold">
                    Calculate to see results
                  </p>
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
                    aria-label="Shareable link for this GPA result"
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
                  Anyone who opens this link sees the same courses, grades, and credits.
                </p>
              </section>
            )}
          </div>
        </div>

        {/* GPA PLANNER */}
        <div className="mt-8">
          <GpaPlanner
            currentGpa={gpaData.gpa}
            currentCredits={gpaData.totalCredits}
            hasResults={showResults}
          />
        </div>

        <div className="mt-12">
          <RelatedCalculators
            calculators={[
              {
                name: "Grade Calculator",
                description: "Semester & Cumulative",
                href: "/calculators/education/grade-calculator",
                icon: Target,
              },
              {
                name: "LCM Calculator",
                description: "Least Common Multiple",
                href: "/calculators/math/lcm-calculator",
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
// GPA Planner — works out the average you need in
// your remaining credits to land on a target GPA.
// This is the feature calculator.net buries under a
// separate "GPA Planning Calculator" heading; here
// it sits right under the main tool and can pull
// numbers straight from the course table above it.
// ─────────────────────────────────────────────
function GpaPlanner({
  currentGpa,
  currentCredits,
  hasResults,
}: {
  currentGpa: string;
  currentCredits: number;
  hasResults: boolean;
}) {
  const [current, setCurrent] = useState("3.0");
  const [currentCr, setCurrentCr] = useState("30");
  const [target, setTarget] = useState("3.5");
  const [futureCr, setFutureCr] = useState("15");
  const [showPlan, setShowPlan] = useState(false);

  const useMyGpa = () => {
    setCurrent(currentGpa);
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
      return { error: "Additional credits has to be more than 0." };
    }
    if (cc < 0) {
      return { error: "Current credits can't be negative." };
    }

    const requiredPoints = t * (cc + fc) - c * cc;
    const requiredGpa = requiredPoints / fc;

    return {
      requiredGpa,
      possible: requiredGpa <= 4.0,
      alreadyThere: requiredGpa < 0,
    };
  }, [showPlan, current, currentCr, target, futureCr]);

  return (
    <div className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" aria-hidden="true" />
          Plan Your Future GPA
        </h3>
        {hasResults && (
          <button
            onClick={useMyGpa}
            className="text-xs font-bold text-primary hover:underline"
          >
            Use my calculated GPA above
          </button>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Say you want to graduate with a 3.5. Enter where you stand now and how many credits
        you have left, and this works out the average you need across those remaining
        credits to get there.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="plan-current-gpa" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Current GPA
          </label>
          <input
            id="plan-current-gpa"
            type="number"
            step="0.01"
            value={current}
            onChange={(e) => { setCurrent(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="plan-current-credits" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Current Credits
          </label>
          <input
            id="plan-current-credits"
            type="number"
            value={currentCr}
            onChange={(e) => { setCurrentCr(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="plan-target-gpa" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Target GPA
          </label>
          <input
            id="plan-target-gpa"
            type="number"
            step="0.01"
            value={target}
            onChange={(e) => { setTarget(e.target.value); setShowPlan(false); }}
            className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none"
          />
        </div>
        <div>
          <label htmlFor="plan-future-credits" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest block mb-2">
            Additional Credits
          </label>
          <input
            id="plan-future-credits"
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
        <div className={`mt-6 p-6 rounded-2xl text-center ${plan.possible && !plan.alreadyThere ? "bg-primary/5" : plan.alreadyThere ? "bg-green-50" : "bg-red-50"}`}>
          {plan.alreadyThere ? (
            <p className="text-sm font-bold text-green-600">
              You've already hit this target. Any passing average in your remaining credits keeps you there.
            </p>
          ) : plan.possible ? (
            <>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                GPA Needed in Remaining Credits
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