"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  GraduationCap,
  CheckCircle2,
  Calculator,
  Award,
  ListFilter,
  Heart,
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
  "A+": 4.0, A: 4.0, "A-": 3.7, "B+": 3.3, B: 3.0, "B-": 2.7,
  "C+": 2.3, C: 2.0, "C-": 1.7, "D+": 1.3, D: 1.0, "D-": 0.7, F: 0.0,
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
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", grade: "A", credits: "3" },
    { id: "2", name: "", grade: "B", credits: "3" },
    { id: "3", name: "", grade: "A", credits: "4" },
  ]);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "GPA Calculator",
    href: "/calculators/education/gpa-calculator",
    category: "Education",
  };

  // --- Initial Load Logic ---
  useEffect(() => {
    setIsMounted(true);
    
    // 1. Load Course History
    const history = getCalculatorHistory();
    if (history["gpa-calc"]?.data?.courses) {
      setCourses(history["gpa-calc"].data.courses);
      setShowResults(true); 
    }

    // 2. Check if favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("gpa-calc", { courses });
  }, [courses, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Course Management ---
  const addThreeRows = () => {
    const newRows = Array.from({ length: 3 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      grade: "A",
      credits: "3",
    }));
    setCourses((prev) => [...prev, ...newRows]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const resetCalculator = () => {
    setCourses([
      { id: "1", name: "", grade: "A", credits: "3" },
      { id: "2", name: "", grade: "B", credits: "3" },
      { id: "3", name: "", grade: "A", credits: "4" },
    ]);
    setShowResults(false);
  };

  // --- Calculation Logic ---
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
      gpa: totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00",
      totalCredits,
      totalPoints,
    };
  }, [courses]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: RESULTS & HEART BUTTON */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE CALCULATOR (HEART) */}
              <button 
                onClick={handleToggleSave}
                title={isSaved ? "Remove from Saved" : "Save Calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                  ? 'bg-red-500/10 border-red-500/20 text-red-500 shadow-sm' 
                  : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart size={18} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-primary" size={20} /> Statistics
              </h2>

              {showResults ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center">
                    <p className="text-[10px] font-black uppercase text-primary mb-2 tracking-widest">
                      Your GPA
                    </p>
                    <h3 className="text-6xl font-black text-primary tracking-tighter">
                      {gpaData.gpa}
                    </h3>
                    <div className="mt-6 space-y-2 border-t border-primary/10 pt-4">
                       <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                          <span>Total Credits</span>
                          <span className="text-foreground">{gpaData.totalCredits}</span>
                       </div>
                    </div>
                  </div>

                  <button
                    onClick={resetCalculator}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-lg font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Clear All
                  </button>
                </div>
              ) : (
                <div className="bg-secondary/20 border-2 border-dashed rounded-2xl p-12 text-center min-h-[280px] flex flex-col items-center justify-center">
                  <Calculator size={40} className="opacity-10 mb-4" />
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">
                    Add subjects below <br/> to calculate
                  </p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT PANEL: COURSE LIST */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ListFilter size={20} className="text-primary" /> Course List
                </h2>
                <button
                  onClick={addThreeRows}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 flex items-center gap-2 transition-all active:scale-95"
                >
                  <Plus size={16} /> Add Rows
                </button>
              </div>

              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-3 items-center group animate-in fade-in duration-200">
                    <input
                      type="text"
                      placeholder={`Subject ${index + 1}`}
                      value={course.name}
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="col-span-6 p-4 bg-secondary/50 rounded-xl font-bold text-sm outline-none border border-transparent focus:border-primary/30 transition-all"
                    />
                    <select
                      value={course.grade}
                      onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
                      className="col-span-3 p-4 bg-secondary/50 rounded-xl font-black text-sm text-primary outline-none border border-transparent focus:border-primary/30 cursor-pointer text-center"
                    >
                      {Object.keys(GRADE_SCALE).map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                      className="col-span-2 p-4 bg-secondary/50 rounded-xl font-black text-sm text-center outline-none border border-transparent focus:border-primary/30"
                    />
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="col-span-1 p-2 text-muted-foreground hover:text-red-500 transition-colors flex justify-center opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowResults(true)}
                className="w-full mt-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:opacity-90 transition-all active:scale-[0.98] shadow-lg shadow-primary/10"
              >
                Calculate Now <CheckCircle2 size={18} />
              </button>
            </section>
          </div>
        </div>

        <div className="mt-12">
          <RelatedCalculators
            calculators={[
              {
                name: "Grade Predictor",
                description: "Predict your exam scores",
                href: "/calculators/education/grade-calculator",
                icon: Award,
              },
            ]}
          />
        </div>
      </div>
    </main>
  );
}