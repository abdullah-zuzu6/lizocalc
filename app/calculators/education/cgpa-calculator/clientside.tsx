"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Trash2,
  GraduationCap,
  CheckCircle2,
  Calculator,
  Heart,
  Target,
  Layers,
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

type Semester = {
  id: string;
  name: string;           // e.g., "Semester 1", "Fall 2025"
  gpa: string;
  credits: string;
};

export default function CGPACalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", name: "Semester 1", gpa: "3.45", credits: "15" },
    { id: "2", name: "Semester 2", gpa: "3.70", credits: "16" },
    { id: "3", name: "Semester 3", gpa: "3.20", credits: "14" },
  ]);

  const calculatorInfo = {
    name: "CGPA Calculator",
    href: "/calculators/education/cgpa-calculator",
    category: "Education",
  };

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);

    const history = getCalculatorHistory();
    if (history["cgpa-calc"]?.data?.semesters) {
      setSemesters(history["cgpa-calc"].data.semesters);
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));
  }, []);

  // Save to localStorage whenever semesters change
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("cgpa-calc", { semesters });
  }, [semesters, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const addSemester = () => {
    const newSemesters = Array.from({ length: 2 }).map(() => ({
      id: Math.random().toString(36).substr(2, 9),
      name: `Semester ${semesters.length + 1}`,
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
    setSemesters([
      { id: "1", name: "Semester 1", gpa: "", credits: "15" },
    ]);
    setShowResults(false);
  };

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

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL - Results (Moved to top on mobile for better UX) */}
          <div className="order-2 lg:order-1 lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative">

              <button
                onClick={handleToggleSave}
                className="absolute top-4 right-4 p-2 rounded-xl border hover:bg-secondary transition-colors"
                aria-label="Save Calculator"
              >
                <Heart
                  size={18}
                  className={isSaved ? "fill-red-500 text-red-500" : ""}
                />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" />
                CGPA Statistics
              </h2>

              {showResults ? (
                <div className="space-y-4">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center">
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
                    className="w-full py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-xs font-bold transition-colors"
                  >
                    Clear All
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed rounded-2xl opacity-50">
                  <Calculator className="mx-auto mb-3" />
                  <p className="text-xs font-bold">
                    Calculate to see results
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT PANEL - Input */}
          <div className="order-1 lg:order-2 lg:col-span-8">
            <section className="bg-card border rounded-2xl p-4 md:p-6 shadow-sm">
              
              {/* Header - Hidden on mobile because rows become stacked cards */}
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
                        value={sem.name}
                        onChange={(e) => updateSemester(sem.id, "name", e.target.value)}
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
                                value={sem.credits}
                                onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
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
                                    value={sem.gpa}
                                    onChange={(e) => updateSemester(sem.id, "gpa", e.target.value)}
                                    placeholder="3.45"
                                    className="w-full p-2 bg-background border rounded-lg text-sm text-center outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <button
                                onClick={() => removeSemester(sem.id)}
                                className="md:mt-0 mt-5 p-2 text-muted-foreground hover:text-red-500 shrink-0 transition-colors"
                                aria-label="Remove Semester"
                            >
                                <Trash2 size={16} />
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
                onClick={() => {
                    setShowResults(true);
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // Helpful for mobile users to see results
                }}
                className="w-full mt-8 px-8 py-4 bg-green-600 text-white rounded-xl font-black uppercase tracking-wide flex items-center justify-center gap-2 hover:bg-green-700 transition-all active:scale-[0.98] shadow-lg shadow-green-900/20"
              >
                Calculate CGPA <CheckCircle2 size={18} />
              </button>
            </section>

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
      </div>
    </main>
  );
}