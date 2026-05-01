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

type GradeComponent = {
  id: string;
  name: string;      // e.g., "Assignment 1", "Midterm", "Final Exam"
  weight: string;    // percentage weight
  score: string;     // obtained score in percentage
};

export default function FinalGradeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [components, setComponents] = useState<GradeComponent[]>([
    { id: "1", name: "Assignments", weight: "20", score: "88" },
    { id: "2", name: "Quizzes", weight: "15", score: "92" },
    { id: "3", name: "Midterm Exam", weight: "25", score: "76" },
    { id: "4", name: "Final Exam", weight: "40", score: "85" },
  ]);

  const calculatorInfo = {
    name: "Final Grade Calculator",
    href: "/calculators/education/final-grade-calculator",
    category: "Education",
  };

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);

    const history = getCalculatorHistory();
    if (history["final-grade-calc"]?.data?.components) {
      setComponents(history["final-grade-calc"].data.components);
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));
  }, []);

  // Save to localStorage whenever components change
  useEffect(() => {
    if (!isMounted) return;
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
  };

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

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL - Results */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative">

              <button
                onClick={handleToggleSave}
                className="absolute top-4 right-4 p-2 rounded-xl border"
              >
                <Heart 
                  size={18} 
                  className={isSaved ? "fill-red-500 text-red-500" : ""} 
                />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap size={20} className="text-primary" />
                Final Grade
              </h2>

              {showResults ? (
                <div className="space-y-4">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center">
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
                    className="w-full py-2 bg-secondary rounded-lg text-xs font-bold"
                  >
                    Clear All
                  </button>
                </div>
              ) : (
                <div className="p-12 text-center border-2 border-dashed rounded-2xl opacity-50">
                  <Calculator className="mx-auto mb-3" />
                  <p className="text-xs font-bold">Calculate to see results</p>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT PANEL - Input */}
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
                      value={comp.name}
                      onChange={(e) => updateComponent(comp.id, "name", e.target.value)}
                      className="col-span-5 p-2 bg-background border rounded-lg text-sm outline-none"
                    />

                    {/* Weight */}
                    <input
                      type="number"
                      value={comp.weight}
                      onChange={(e) => updateComponent(comp.id, "weight", e.target.value)}
                      className="col-span-3 p-2 bg-background border rounded-lg text-sm text-center outline-none"
                    />

                    {/* Score + Delete */}
                    <div className="col-span-4 flex items-center gap-1">
                      <input
                        type="number"
                        value={comp.score}
                        onChange={(e) => updateComponent(comp.id, "score", e.target.value)}
                        placeholder="85"
                        className="flex-1 p-2 bg-background border rounded-lg text-sm text-center outline-none"
                      />

                      <button
                        onClick={() => removeComponent(comp.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 shrink-0"
                      >
                        <Trash2 size={16} />
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
                Calculate Final Grade <CheckCircle2 size={18} />
              </button>

              
            </section>

           
          </div>
          
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
                  
                ]}
              />
            </div>
      </div>
    </main>
  );
}