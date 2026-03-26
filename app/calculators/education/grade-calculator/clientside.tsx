"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  ListFilter,
  Target,
  BarChart3,
  BookOpen,
  Layers,
  Heart,
  CheckCircle2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

const GRADE_MAP: { [key: string]: number } = {
  "A+": 97, A: 93, "A-": 90, "B+": 87, B: 83, "B-": 80,
  "C+": 77, C: 73, "C-": 70, "D+": 67, D: 63, "D-": 60, F: 50,
};

type Assignment = { id: string; name: string; grade: string; weight: string };

export default function AdvancedGradeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", name: "Assignment 1", grade: "90", weight: "20" },
    { id: "2", name: "Midterm", grade: "85", weight: "30" },
  ]);
  const [goal, setGoal] = useState("90");
  const [remainingWeight, setRemainingWeight] = useState("50");

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Grade Calculator",
    href: "/calculators/education/grade-calculator",
    category: "Education",
  };

  // --- Initial Load Logic ---
  useEffect(() => {
    setIsMounted(true);
    
    // 1. Load Calculator History
    const history = getCalculatorHistory();
    if (history["advanced-grade-calc"]?.data) {
      const { assignments: savedAsgn, goal: savedGoal, remWeight } = history["advanced-grade-calc"].data;
      if (savedAsgn) setAssignments(savedAsgn);
      if (savedGoal) setGoal(savedGoal);
      if (remWeight) setRemainingWeight(remWeight);
    }

    // 2. Check if favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("advanced-grade-calc", {
      assignments,
      goal,
      remWeight: remainingWeight,
    });
  }, [assignments, goal, remainingWeight, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Row Management ---
  const addRow = () =>
    setAssignments([
      ...assignments,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "",
        grade: "A",
        weight: "10",
      },
    ]);

  const removeRow = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((a) => a.id !== id));
    }
  };

  const updateRow = (id: string, field: keyof Assignment, val: string) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, [field]: val } : a)),
    );
  };

  const resetCalculator = () => {
    setAssignments([
      { id: "1", name: "Assignment 1", grade: "90", weight: "20" },
      { id: "2", name: "Midterm", grade: "85", weight: "30" },
    ]);
    setGoal("90");
    setRemainingWeight("50");
  };

  // --- Calculation Logic ---
  const results = useMemo(() => {
    let currentGradePoints = 0;
    assignments.forEach((a) => {
      const g = GRADE_MAP[a.grade] || parseFloat(a.grade) || 0;
      const w = parseFloat(a.weight) || 0;
      currentGradePoints += g * (w / 100);
    });
    const target = parseFloat(goal) || 0;
    const remW = parseFloat(remainingWeight) || 0;
    const needed = remW > 0 ? (target - currentGradePoints) / (remW / 100) : 0;
    return { needed };
  }, [assignments, goal, remainingWeight]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: ASSIGNMENT INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              
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
                <ListFilter className="text-primary" size={20} /> Assignments
              </h2>

              <div className="space-y-3">
                {assignments.map((a, idx) => (
                  <div
                    key={a.id}
                    className="grid grid-cols-12 gap-2 items-center bg-secondary/30 p-2 rounded-xl border border-transparent hover:border-border transition-all"
                  >
                    <input
                      className="col-span-6 p-2 bg-background rounded-lg text-xs font-bold border outline-none focus:ring-2 focus:ring-primary/10"
                      value={a.name}
                      onChange={(e) => updateRow(a.id, "name", e.target.value)}
                      placeholder={`Task ${idx + 1}`}
                    />
                    <select
                      className="col-span-3 p-2 bg-background rounded-lg text-xs font-bold border text-primary cursor-pointer outline-none"
                      value={a.grade}
                      onChange={(e) => updateRow(a.id, "grade", e.target.value)}
                    >
                      {Object.keys(GRADE_MAP).map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                    <input
                      className="col-span-2 p-2 bg-background rounded-lg text-xs font-bold border text-center outline-none"
                      value={a.weight}
                      onChange={(e) => updateRow(a.id, "weight", e.target.value)}
                    />
                    <button
                      onClick={() => removeRow(a.id)}
                      className="col-span-1 flex justify-center text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                
                <div className="pt-2 space-y-2">
                  <button
                    onClick={addRow}
                    className="w-full py-3 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/20 flex items-center justify-center gap-2 transition-all"
                  >
                    <Plus size={14} /> Add Assessment
                  </button>
                  <button
                    onClick={resetCalculator}
                    className="w-full py-2.5 bg-secondary text-muted-foreground text-[10px] font-bold uppercase rounded-xl hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={12} /> Reset Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: PLANNING & RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border rounded-2xl p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Target className="text-primary" size={20} /> Grade Projection
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">
                    Goal Score (%)
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-secondary/50 rounded-2xl font-black text-2xl border border-transparent focus:border-primary/20 focus:bg-background outline-none transition-all"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest ml-1">
                    Weight Left (%)
                  </label>
                  <input
                    type="number"
                    className="w-full p-4 bg-secondary/50 rounded-2xl font-black text-2xl border border-transparent focus:border-primary/20 focus:bg-background outline-none transition-all"
                    value={remainingWeight}
                    onChange={(e) => setRemainingWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-10 p-10 bg-primary rounded-3xl text-center text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden">
                <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">
                    Required Average
                  </p>
                  <h2 className="text-7xl font-black my-4 tracking-tighter">
                    {results.needed.toFixed(2)}%
                  </h2>
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    <CheckCircle2 size={14} />
                    <span className="text-[10px] font-bold uppercase">Target: {goal}%</span>
                  </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* INFO CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <BookOpen size={18} className="text-primary" /> Strategy
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Calculated using weighted mean. If your required score is above 100%, 
                  consider asking about extra credit or adjusting your target goal.
                </p>
              </div>
              <div className="bg-card border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <BarChart3 size={18} className="text-primary" /> Precision
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  For the most accurate results, ensure the "Weight Left" plus the 
                  weights of your entered assignments equal exactly 100%.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED CALCULATORS SECTION */}
        <div className="mt-12">
           <RelatedCalculators
            calculators={[
              {
                name: "GPA Calculator",
                description: "Semester & Cumulative",
                href: "/calculators/education/gpa-calculator",
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
      </section>
    </main>
  );
}