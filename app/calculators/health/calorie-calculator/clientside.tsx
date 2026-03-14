"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Info,
  RotateCcw,
  CheckCircle2,
  ListFilter,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function CalorieCalculator() {
  // --- States ---
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<number>(1.375);
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["calorie-calc"]?.data) {
      const d = history["calorie-calc"].data;
      setAge(d.age || 30);
      setWeight(d.weight || 70);
      setHeight(d.height || 175);
      setGender(d.gender || "male");
      setActivityLevel(d.activityLevel || 1.375);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("calorie-calc", {
        age,
        weight,
        height,
        gender,
        activityLevel,
      });
    }
  }, [age, weight, height, gender, activityLevel, isMounted]);

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null;

    const bmr =
      gender === "male"
        ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
        : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(bmr * activityLevel),
    };
  }, [trigger]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                {/* Gender Toggle */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Gender
                  </label>
                  <div className="flex bg-secondary p-1 rounded-lg">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => setGender(g)}
                        className={`flex-1 py-2 text-sm font-bold rounded-md capitalize ${gender === g ? "bg-background shadow" : ""}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Numeric Inputs */}
                {[
                  { label: "Age", val: age, setter: setAge, min: 1, max: 120 },
                  {
                    label: "Weight (kg)",
                    val: weight,
                    setter: setWeight,
                    min: 20,
                    max: 200,
                  },
                  {
                    label: "Height (cm)",
                    val: height,
                    setter: setHeight,
                    min: 100,
                    max: 250,
                  },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-sm font-medium">{field.label}</label>
                    <input
                      type="number"
                      value={field.val}
                      onChange={(e) => field.setter(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold"
                    />
                  </div>
                ))}

                {/* Activity Dropdown */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-secondary rounded-md border font-bold"
                  >
                    <option value={1.2}>Sedentary</option>
                    <option value={1.375}>Lightly Active</option>
                    <option value={1.55}>Moderately Active</option>
                    <option value={1.725}>Very Active</option>
                    <option value={1.9}>Extra Active</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setTrigger((prev) => prev + 1);
                      setShowResults(true);
                    }}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setTrigger(0);
                      setShowResults(false);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-8 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    BMR
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 my-4">
                    {results.bmr}
                  </h2>
                  <p className="text-sm font-medium">Calories/day at rest</p>
                </div>
                <div className="bg-card border rounded-xl p-8 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    TDEE
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 my-4">
                    {results.tdee}
                  </h2>
                  <p className="text-sm font-medium">Total calories/day</p>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center h-full">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter details and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 bg-card border rounded-xl p-8">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-blue-600" /> Understanding Your
            Results
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your <strong>BMR</strong> is the energy your body needs to maintain
            basic functions. Your <strong>TDEE</strong> accounts for your daily
            physical activity. Adjusting your intake relative to your TDEE is
            the standard method for managing weight goals.
          </p>
        </div>
      </section>
    </main>
  );
}
