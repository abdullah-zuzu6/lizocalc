"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Heart,
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  Layers,
  CheckCircle2,
  Activity,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function BMICalculator() {
  const [age, setAge] = useState(19);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [heightCm, setHeightCm] = useState(170);
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "BMI Calculator",
    href: "/calculators/health/bmi-calculator",
    category: "Health",
  };

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["bmi"]?.data) {
      const data = history["bmi"].data;
      setUnit(data.unit || "metric");
      setWeight(data.weight || 70);
      setAge(data.age || 19);
      setGender(data.gender || "male");
      if (data.unit === "imperial") {
        setHeightFeet(data.heightFeet || 5);
        setHeightInches(data.heightInches || 10);
      } else {
        setHeightCm(data.heightCm || 170);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("bmi", {
      unit,
      weight,
      age,
      gender,
      heightFeet,
      heightInches,
      heightCm,
    });
  }, [unit, weight, age, gender, heightFeet, heightInches, heightCm, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    if (trigger === 0) return null;
    let weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    let h_m =
      unit === "imperial"
        ? (heightFeet * 12 + heightInches) * 0.0254
        : heightCm / 100;

    if (!weightKg || !h_m) return null;

    const bmiValue = weightKg / (h_m * h_m);
    const piValue = weightKg / (h_m * h_m * h_m);

    let cat = "", col = "";
    if (bmiValue < 18.5) {
      cat = "Underweight";
      col = "text-blue-500";
    } else if (bmiValue < 25) {
      cat = "Normal Weight";
      col = "text-green-500";
    } else if (bmiValue < 30) {
      cat = "Overweight";
      col = "text-yellow-500";
    } else {
      cat = "Obese";
      col = "text-red-500";
    }

    const lowWeight = 18.5 * (h_m * h_m);
    const highWeight = 24.9 * (h_m * h_m);
    const range =
      unit === "imperial"
        ? `${(lowWeight * 2.20462).toFixed(1)} - ${(highWeight * 2.20462).toFixed(1)} lbs`
        : `${lowWeight.toFixed(1)} - ${highWeight.toFixed(1)} kg`;

    return {
      bmi: bmiValue.toFixed(1),
      category: cat,
      color: col,
      healthyWeight: range,
      ponderalIndex: piValue.toFixed(1),
    };
  }, [trigger]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={20} /> Parameters
              </h2>

              <div className="space-y-6">
                <div className="flex bg-secondary p-1.5 rounded-xl">
                  {(["metric", "imperial"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                        unit === u ? "bg-background text-blue-600 shadow-sm" : "text-muted-foreground"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Height</label>
                  {unit === "metric" ? (
                    <div className="relative">
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-12"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-muted-foreground">cm</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <input
                          type="number"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(Number(e.target.value))}
                          className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-8"
                          placeholder="ft"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-bold text-muted-foreground">ft</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={heightInches}
                          onChange={(e) => setHeightInches(Number(e.target.value))}
                          className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-8"
                          placeholder="in"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-bold text-muted-foreground">in</span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">
                    Weight ({unit === "metric" ? "kg" : "lbs"})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => { setTrigger(t => t + 1); setShowResults(true); }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate BMI <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => { setShowResults(false); setTrigger(0); }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] mb-4">
                      BMI Score
                    </p>
                    <h2 className={`text-7xl font-black tracking-tighter mb-2 ${results.color}`}>
                      {results.bmi}
                    </h2>
                    <p className={`font-black uppercase text-sm tracking-widest ${results.color}`}>
                      {results.category}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card border rounded-3xl p-6 shadow-sm">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Healthy Range</p>
                      <p className="text-xl font-black text-foreground">{results.healthyWeight}</p>
                    </div>
                    <div className="bg-card border rounded-3xl p-6 shadow-sm">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Ponderal Index</p>
                      <p className="text-xl font-black text-foreground">
                        {results.ponderalIndex} <span className="text-sm font-bold text-muted-foreground">kg/m³</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Body Mass Index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass.
                    </p>
                    <p>
                      The Ponderal Index (PI) is similar to BMI but provides more accurate results for very tall or very short individuals by using the cube of the height.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Activity size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Enter parameters to see your health metrics
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "TDEE Calculator",
              description: "Calculate total daily energy expenditure",
              href: "/calculators/health/tdee-calculator",
              icon: Layers,
            },
            {
              name: "BMR Calculator",
              description: "Calculate basal metabolic rate",
              href: "/calculators/health/bmr-calculator",
              icon: BarChart3,
            },
          ]}
        />
      </section>
    </main>
  );
}