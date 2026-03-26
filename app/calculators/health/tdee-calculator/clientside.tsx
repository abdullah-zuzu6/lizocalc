"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Activity,
  User,
  Target,
  RotateCcw,
  Zap,
  Flame,
  Scale,
  Settings2,
  CheckCircle2,
  Heart,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function TDEECalculator() {
  // --- States ---
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // --- Input States ---
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState<string>("25");
  const [weight, setWeight] = useState<string>("70");
  const [height, setHeight] = useState<string>("175");
  const [activity, setActivity] = useState<string>("1.375");

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "TDEE Calculator",
    href: "/calculators/health/tdee-calculator",
    category: "Health",
  };

  const relatedCalculators = [
    {
      name: "BMI Calculator",
      description: "Body Mass Index assessment",
      href: "/calculators/health/bmi-calculator",
      icon: User,
    },
    {
      name: "Macro Calculator",
      description: "Detailed macro percentage splits",
      href: "/calculators/health/macros-calculator",
      icon: Target,
    },
  ];

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);

    const history = getCalculatorHistory();
    if (history["tdee-calc"]?.data) {
      const d = history["tdee-calc"].data;
      setGender(d.gender || "male");
      setAge(d.age || "25");
      setWeight(d.weight || "70");
      setHeight(d.height || "175");
      setActivity(d.activity || "1.375");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("tdee-calc", {
      gender,
      age,
      weight,
      height,
      activity,
    });
  }, [gender, age, weight, height, activity, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Logic ---
  const results = useMemo(() => {
    const a = parseFloat(age) || 0;
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const mult = parseFloat(activity) || 1.2;

    if (!a || !w || !h) return null;

    // Mifflin-St Jeor Formula
    let bmr = 10 * w + 6.25 * h - 5 * a;
    bmr = gender === "male" ? bmr + 5 : bmr - 161;

    const tdee = bmr * mult;
    const bmi = w / (h / 100) ** 2;

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      macros: {
        protein: Math.round((tdee * 0.3) / 4),
        fats: Math.round((tdee * 0.25) / 9),
        carbs: Math.round((tdee * 0.45) / 4),
      },
    };
  }, [gender, age, weight, height, activity]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden">
              {/* SAVE CALCULATOR HEART BUTTON */}
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
                        onClick={() => {
                          setGender(g);
                          setShowResults(false);
                        }}
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

                {/* Input Fields */}
                <InputField label="Age" value={age} onChange={setAge} />
                <InputField
                  label="Weight (kg)"
                  value={weight}
                  onChange={setWeight}
                />
                <InputField
                  label="Height (cm)"
                  value={height}
                  onChange={setHeight}
                />

                {/* Activity Dropdown */}
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Activity Level
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => {
                      setActivity(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all appearance-none cursor-pointer"
                  >
                    <option value="1.2">Sedentary (No Exercise)</option>
                    <option value="1.375">Light Exercise (1-2 days/week)</option>
                    <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                    <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                    <option value="1.9">Athlete (Professional/Heavy Job)</option>
                  </select>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    Calculate TDEE <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setAge("25");
                      setWeight("70");
                      setHeight("175");
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
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary Result */}
                  <div className="bg-primary rounded-xl p-8 text-primary-foreground shadow-lg shadow-primary/20 flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase opacity-70 tracking-widest">
                      Maintenance Calories
                    </p>
                    <h2 className="text-6xl font-black my-4 tracking-tight">
                      {results.tdee}{" "}
                      <span className="text-lg font-medium opacity-80">
                        kcal/day
                      </span>
                    </h2>
                    <div className="flex gap-6 pt-4 border-t border-white/20">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">
                          BMR
                        </p>
                        <p className="text-xl font-bold">{results.bmr}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">
                          BMI
                        </p>
                        <p className="text-xl font-bold">{results.bmi}</p>
                      </div>
                    </div>
                  </div>

                  {/* Macro Breakdown */}
                  <div className="space-y-3 flex flex-col justify-center">
                    {[
                      {
                        label: "Protein",
                        val: results.macros.protein,
                        icon: Zap,
                        color: "text-blue-500",
                        bg: "bg-blue-500/5",
                      },
                      {
                        label: "Carbohydrates",
                        val: results.macros.carbs,
                        icon: Flame,
                        color: "text-amber-500",
                        bg: "bg-amber-500/5",
                      },
                      {
                        label: "Fats",
                        val: results.macros.fats,
                        icon: Target,
                        color: "text-rose-500",
                        bg: "bg-rose-500/5",
                      },
                    ].map((m) => (
                      <div
                        key={m.label}
                        className={`border border-border/50 p-4 rounded-xl flex items-center justify-between ${m.bg}`}
                      >
                        <div className="flex items-center gap-3">
                          <m.icon className={m.color} size={20} />
                          <span className="font-bold text-sm">{m.label}</span>
                        </div>
                        <span className="font-black text-lg text-foreground">
                          {m.val}g
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center h-[400px] flex flex-col items-center justify-center">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter parameters and click calculate
                </p>
              </div>
            )}

            {/* EDUCATIONAL SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border rounded-xl p-8">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                  <Scale size={20} className="text-primary" /> What is TDEE?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your Total Daily Energy Expenditure (TDEE) is an estimation of
                  how many calories you burn per day when exercise is taken into
                  account. It is calculated by first figuring out your Basal
                  Metabolic Rate, then multiplying that value by an activity
                  multiplier.
                </p>
              </div>
              <div className="bg-card border rounded-xl p-8">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                   Goal Setting
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you want to <strong>lose weight</strong>, try eating 500
                  calories below your TDEE. If you want to{" "}
                  <strong>gain weight</strong> (bulk), eat 500 calories above
                  your TDEE.
                </p>
              </div>
            </div>

            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </div>
      </section>
    </main>
  );
}

// Reusable Internal Input Component
function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all"
      />
    </div>
  );
}