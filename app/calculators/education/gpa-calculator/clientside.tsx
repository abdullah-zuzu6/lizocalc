"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Trash2,
  RotateCcw,
  GraduationCap,
  CheckCircle2,
  Calculator,
  BookOpen,
  Award,
  ListFilter,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

const GRADE_SCALE: { [key: string]: number } = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
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
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", name: "", grade: "A", credits: "3" },
    { id: "2", name: "", grade: "B", credits: "3" },
    { id: "3", name: "", grade: "A", credits: "4" },
  ]);
  const [showResults, setShowResults] = useState(false);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["gpa-calc"]?.data) {
      setCourses(history["gpa-calc"].data.courses || courses);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) saveCalculatorHistory("gpa-calc", { courses });
  }, [courses, isMounted]);

  const addThreeCourses = () => {
    const newCourses = Array.from({ length: 3 }, () => ({
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      grade: "A",
      credits: "3",
    }));
    setCourses((prev) => [...prev, ...newCourses]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, value: string) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: value } : c)),
    );
    setShowResults(false);
  };

  const gpaData = useMemo(() => {
    let totalPoints = 0,
      totalCredits = 0;
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
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: RESULTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="text-blue-500" size={20} /> Results
              </h2>
              {showResults ? (
                <div className="bg-blue-600 rounded-xl p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                    Semester GPA
                  </p>
                  <h3 className="text-5xl font-black my-4 tracking-tighter">
                    {gpaData.gpa}
                  </h3>
                  <div className="space-y-2 border-t border-white/20 pt-4">
                    <div className="flex justify-between text-sm font-bold">
                      <span>Total Credits</span>
                      <span>{gpaData.totalCredits}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span>Quality Points</span>
                      <span>{gpaData.totalPoints.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-8 text-center">
                  <p className="text-sm font-bold text-muted-foreground uppercase">
                    Enter courses to calculate
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL: COURSES */}
          <div className="lg:col-span-8 space-y-6">
            <section className="bg-card border rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ListFilter size={20} className="text-blue-500" /> Course List
                </h2>
                <button
                  onClick={addThreeCourses}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-xs font-bold uppercase hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={16} /> Add
                </button>
              </div>

              <div className="space-y-3">
                {courses.map((course, index) => (
                  <div
                    key={course.id}
                    className="grid grid-cols-12 gap-2 items-center"
                  >
                    <input
                      type="text"
                      placeholder={`Course ${index + 1}`}
                      value={course.name}
                      onChange={(e) =>
                        updateCourse(course.id, "name", e.target.value)
                      }
                      className="col-span-6 p-3 bg-secondary rounded-md font-bold text-sm outline-none"
                    />
                    <select
                      value={course.grade}
                      onChange={(e) =>
                        updateCourse(course.id, "grade", e.target.value)
                      }
                      className="col-span-3 p-3 bg-secondary rounded-md font-bold text-sm text-blue-600 outline-none"
                    >
                      {Object.keys(GRADE_SCALE).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={course.credits}
                      onChange={(e) =>
                        updateCourse(course.id, "credits", e.target.value)
                      }
                      className="col-span-2 p-3 bg-secondary rounded-md font-bold text-sm text-center outline-none"
                    />
                    <button
                      onClick={() => removeCourse(course.id)}
                      className="col-span-1 p-2 text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowResults(true)}
                className="w-full mt-6 py-4 bg-blue-600 text-white rounded-md font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-blue-700"
              >
                Calculate GPA <CheckCircle2 size={16} />
              </button>
            </section>
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 bg-card border rounded-xl p-8">
          <h3 className="font-bold text-xl mb-4">How is GPA Calculated?</h3>
          <p className="text-muted-foreground text-sm mb-4">
            GPA is the weighted average of your grade points multiplied by
            credit hours.
          </p>
          <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
            <code className="text-blue-600 font-bold text-xs uppercase">
              GPA = Σ (Grade Value × Credits) / Σ Credits
            </code>
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "Grade Calculator",
              description: "Final exam predictor",
              href: "/calculator/grade",
              icon: Award,
            },
            {
              name: "Scientific Notation",
              description: "Math converter",
              href: "/calculator/scientific-notation",
              icon: Calculator,
            },
          ]}
        />
      </section>
    </main>
  );
}
