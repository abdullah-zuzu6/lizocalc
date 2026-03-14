"use client";

import { useState, useEffect, useMemo } from "react";
// Added 'Layers' to the import list below:
import {
  Plus,
  Trash2,
  RotateCcw,
  ListFilter,
  Target,
  BarChart3,
  BookOpen,
  Layers,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

const GRADE_MAP: { [key: string]: number } = {
  "A+": 97,
  A: 93,
  "A-": 90,
  "B+": 87,
  B: 83,
  "B-": 80,
  "C+": 77,
  C: 73,
  "C-": 70,
  "D+": 67,
  D: 63,
  "D-": 60,
  F: 50,
};

type Assignment = { id: string; name: string; grade: string; weight: string };

export default function AdvancedGradeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", name: "Assignment 1", grade: "90", weight: "20" },
    { id: "2", name: "Midterm", grade: "85", weight: "30" },
  ]);
  const [goal, setGoal] = useState("90");
  const [remainingWeight, setRemainingWeight] = useState("50");

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["advanced-grade-calc"]?.data) {
      const {
        assignments: savedAsgn,
        goal: savedGoal,
        remWeight,
      } = history["advanced-grade-calc"].data;
      setAssignments(savedAsgn || assignments);
      setGoal(savedGoal || "90");
      setRemainingWeight(remWeight || "50");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("advanced-grade-calc", {
        assignments,
        goal,
        remWeight: remainingWeight,
      });
    }
  }, [assignments, goal, remainingWeight, isMounted]);

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
  const removeRow = (id: string) =>
    setAssignments(assignments.filter((a) => a.id !== id));

  const updateRow = (id: string, field: keyof Assignment, val: string) => {
    setAssignments(
      assignments.map((a) => (a.id === id ? { ...a, [field]: val } : a)),
    );
  };

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
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Assignments
              </h2>

              <div className="space-y-3">
                {assignments.map((a) => (
                  <div
                    key={a.id}
                    className="grid grid-cols-12 gap-2 items-center bg-secondary/50 p-2 rounded-lg"
                  >
                    <input
                      className="col-span-6 p-2 bg-background rounded text-xs font-bold border"
                      value={a.name}
                      onChange={(e) => updateRow(a.id, "name", e.target.value)}
                      placeholder="Name"
                    />
                    <select
                      className="col-span-3 p-2 bg-background rounded text-xs font-bold border text-blue-600"
                      value={a.grade}
                      onChange={(e) => updateRow(a.id, "grade", e.target.value)}
                    >
                      {Object.keys(GRADE_MAP).map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <input
                      className="col-span-2 p-2 bg-background rounded text-xs font-bold border text-center"
                      value={a.weight}
                      onChange={(e) =>
                        updateRow(a.id, "weight", e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeRow(a.id)}
                      className="col-span-1 flex justify-center text-muted-foreground hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addRow}
                  className="w-full py-2 bg-secondary text-xs font-bold uppercase rounded hover:bg-secondary/80 flex items-center justify-center gap-2"
                >
                  <Plus size={14} /> Add Row
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS & PLANNING */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-blue-500" size={20} /> Final Grade
                Planning
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Desired Final Grade
                  </label>
                  <input
                    className="w-full mt-2 p-3 bg-secondary rounded-md font-bold text-lg"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Remaining Weight (%)
                  </label>
                  <input
                    className="w-full mt-2 p-3 bg-secondary rounded-md font-bold text-lg"
                    value={remainingWeight}
                    onChange={(e) => setRemainingWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-600 rounded-xl text-center text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80">
                  You need an average of
                </p>
                <h2 className="text-5xl font-black my-4">
                  {results.needed.toFixed(2)}%
                </h2>
                <p className="text-xs font-bold opacity-80">
                  on your remaining assignments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" /> How it Works
            </h3>
            <p className="text-muted-foreground text-sm">
              Weighted averages are calculated by multiplying each grade by its
              respective weight, summing them up, and determining the remaining
              requirements.
            </p>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" /> Quick Tips
            </h3>
            <p className="text-muted-foreground text-sm">
              Always ensure your total weight adds up to 100% across all
              assignments for the most accurate projection.
            </p>
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "GPA Calculator",
              description: "Semester & Cumulative",
              href: "/calculator/gpa",
              icon: Target,
            },
            {
              name: "LCM Calculator",
              description: "Least Common Multiple",
              href: "/calculator/lcm",
              icon: Layers,
            },
          ]}
        />
      </section>
    </main>
  );
}
