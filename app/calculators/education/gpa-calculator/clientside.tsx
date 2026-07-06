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

type Course = {
  id: string;
  name: string;
  grade: string;
  credits: string;
};

export default function GPACalculator() {
  // NOTE: isMounted is kept only to gate the "save to storage" effect
  // (so we don't overwrite saved history with defaults before it loads).
  // It NO LONGER gates the render itself — that was the cause of your
  // 0.406 CLS. The component now renders full markup on first paint,
  // then quietly updates from storage after mount.
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "Math", grade: "A-", credits: "2" },
    { id: "2", name: "English", grade: "B+", credits: "1" },
    { id: "3", name: "History", grade: "B", credits: "2" },
  ]);

  const calculatorInfo = {
    name: "GPA Calculator",
    href: "/calculators/education/gpa-calculator",
    category: "Education",
  };

  useEffect(() => {
    const history = getCalculatorHistory();
    if (history["gpa-calc"]?.data?.courses) {
      setCourses(history["gpa-calc"].data.courses);
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((t) => t.href === calculatorInfo.href));

    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
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
  };

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

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-2xl p-6 shadow-sm relative">

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
                FIX FOR CLS: both branches below now share the same
                min-height (min-h-[220px]) and flex centering, so switching
                between "placeholder" and "results" never changes the
                section's height and never shifts content below it.
              */}
              {showResults ? (
                <div className="space-y-4 min-h-[220px]">
                  <div className="bg-primary/5 border rounded-2xl p-8 text-center">
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
                    className="w-full py-2 bg-secondary rounded-lg text-xs font-bold"
                  >
                    Clear All
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

          {/* RIGHT PANEL */}
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
                      onChange={(e) => updateCourse(course.id, "name", e.target.value)}
                      className="col-span-4 md:col-span-5 min-w-0 w-full p-2 bg-background border rounded-lg text-sm outline-none"
                    />

                    {/* CREDITS */}
                    <input
                      type="number"
                      aria-label={`Credit hours for course ${index + 1}`}
                      value={course.credits}
                      onChange={(e) => updateCourse(course.id, "credits", e.target.value)}
                      className="col-span-3 md:col-span-3 min-w-0 w-full p-2 bg-background border rounded-lg text-sm text-center outline-none"
                    />

                    {/* GRADE + DELETE */}
                    <div className="col-span-5 md:col-span-4 flex items-center gap-1 min-w-0">
                      <select
                        value={course.grade}
                        aria-label={`Grade for course ${index + 1}`}
                        onChange={(e) => updateCourse(course.id, "grade", e.target.value)}
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
      </div>
    </main>
  );
}