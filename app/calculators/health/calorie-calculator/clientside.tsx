"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Info,
  RotateCcw,
  CheckCircle2,
  Settings2,
  BarChart3,
  Activity,
  Heart,
} from "lucide-react";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function CalorieCalculator() {
  // --- States ---
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Input States ---
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [activityLevel, setActivityLevel] = useState<number>(1.375);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Calorie Calculator",
    href: "/calculators/health/calorie-calculator",
    category: "Health",
  };

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);
    
    const history = getCalculatorHistory();
    if (history["calorie-calc"]?.data) {
      const d = history["calorie-calc"].data;
      setAge(d.age ?? 30);
      setWeight(d.weight ?? 70);
      setHeight(d.height ?? 175);
      setGender(d.gender ?? "male");
      setActivityLevel(d.activityLevel ?? 1.375);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("calorie-calc", {
      age,
      weight,
      height,
      gender,
      activityLevel,
    });
  }, [age, weight, height, gender, activityLevel, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

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
  }, [trigger, age, weight, height, gender, activityLevel]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE CALCULATOR BUTTON */}
              <button 
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                {/* Gender Toggle */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Gender
                  </label>
                  <div className="flex bg-secondary/50 p-1 rounded-lg border border-border">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => { setGender(g); setShowResults(false); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-all ${
                          gender === g 
                            ? "bg-background shadow-sm text-primary" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Numeric Inputs */}
                <InputField label="Age" value={age} onChange={setAge} />
                <InputField label="Weight (kg)" value={weight} onChange={setWeight} />
                <InputField label="Height (cm)" value={height} onChange={setHeight} />

                {/* Activity Dropdown */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Activity Level
                  </label>
                  <select
                    value={activityLevel}
                    onChange={(e) => { setActivityLevel(Number(e.target.value)); setShowResults(false); }}
                    className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all appearance-none cursor-pointer"
                  >
                    <option value={1.2}>Sedentary (Office job)</option>
                    <option value={1.375}>Lightly Active (1-3 days/week)</option>
                    <option value={1.55}>Moderately Active (3-5 days/week)</option>
                    <option value={1.725}>Very Active (6-7 days/week)</option>
                    <option value={1.9}>Extra Active (Physical job)</option>
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setTrigger((prev) => prev + 1);
                      setShowResults(true);
                    }}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    Calculate Calories <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setTrigger(0);
                      setShowResults(false);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 flex flex-col items-center justify-center">
                  <p className="text-xs font-bold uppercase text-primary mb-2 tracking-widest">
                    TDEE (Daily Needs)
                  </p>
                  <h2 className="text-6xl font-black text-primary tracking-tight">
                    {results.tdee}
                  </h2>
                  <p className="text-sm font-bold text-primary/70 mt-3">
                    Calories per day
                  </p>
                </div>
                
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center gap-4">
                  <div className="flex justify-between items-center p-4 bg-secondary/30 rounded-xl border border-border/50">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                      BMR (Base Metabolism)
                    </span>
                    <span className="text-lg font-black text-primary">{results.bmr}</span>
                  </div>
                  <div className="p-4 bg-secondary/10 rounded-xl border border-dashed border-border">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Goal Reference</p>
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold">Lose Weight:</span>
                      <span className="font-bold text-red-500">{results.tdee - 500} cal</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter parameters to calculate
                </p>
              </div>
            )}

            {/* INFO SECTION */}
            <div className="bg-card rounded-xl border p-8">
              <div className="flex gap-3 mb-4">
                <Info className="w-5 h-5 text-primary flex-shrink-0" />
                <h3 className="font-bold text-lg">How It Works</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We use the <strong>Mifflin-St Jeor Equation</strong> to calculate your Basal Metabolic Rate (BMR), 
                which is then multiplied by your activity factor to find your Total Daily Energy Expenditure (TDEE). 
                This represents the number of calories you burn per day to maintain your current weight.
              </p>
            </div>

            <RelatedCalculators
              calculators={[
                {
                  name: "BMI Calculator",
                  description: "Body Mass Index",
                  href: "/calculators/health/bmi-calculator",
                  icon: Activity,
                },
                {
                  name: "Body Fat %",
                  description: "Estimate fat percentage",
                  href: "/calculators/health/body-fat-calculator",
                  icon: BarChart3,
                },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// Reusable Input Component to keep code clean and styled
function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all"
      />
    </div>
  );
}