"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Info, 
  RotateCcw, 
  CheckCircle2, 
  ListFilter, 
  BarChart3, 
  Activity,
  Calculator,
  Heart
} from "lucide-react";
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators,
  toggleSavedCalculator 
} from "@/lib/storage";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function BMRCalculator() {
  // --- States ---
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const calculatorInfo = {
    name: "BMR Calculator",
    href: "/calculators/health/bmr-calculator", // Adjust to your actual path
    category: "Health",
  };

  const relatedCalculators = [
    { name: 'BMI Calculator', description: 'Body Mass Index', href: '/calculators/health/bmi-calculator', icon: Calculator },
    { name: 'Calorie Calculator', description: 'Total Daily Energy Expenditure', href: '/calculators/health/calorie-calculator', icon: Activity },
  ];

  // --- Initialization & Load History ---
  useEffect(() => {
    setIsMounted(true);
    
    // Load inputs from history
    const history = getCalculatorHistory();
    if (history["bmr-calc"]?.data) {
      const d = history["bmr-calc"].data;
      setAge(d.age || 30);
      setWeight(d.weight || 70);
      setHeight(d.height || 175);
      setGender(d.gender || "male");
    }

    // Check if favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("bmr-calc", { age, weight, height, gender });
  }, [age, weight, height, gender, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const results = useMemo(() => {
    // Mifflin-St Jeor Equation
    const bmr = gender === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    
    return {
      daily: Math.round(bmr),
      monthly: Math.round(bmr * 30),
      yearly: Math.round(bmr * 365)
    };
  }, [age, weight, height, gender]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              
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
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Gender</label>
                  <div className="flex bg-secondary p-1 rounded-lg">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => { setGender(g); setShowResults(true); }}
                        className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-all ${gender === g ? "bg-background shadow text-blue-600" : "text-muted-foreground"}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {[
                  { label: "Age", val: age, setter: setAge, min: 1, max: 120 },
                  { label: "Weight (kg)", val: weight, setter: setWeight, min: 20, max: 200 },
                  { label: "Height (cm)", val: height, setter: setHeight, min: 100, max: 250 },
                ].map((field) => (
                  <div key={field.label}>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-sm font-medium">{field.label}</label>
                      <span className="text-sm font-bold text-blue-600">{field.val}</span>
                    </div>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      value={field.val}
                      onChange={(e) => { field.setter(Number(e.target.value)); setShowResults(true); }}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600 mt-2"
                    />
                  </div>
                ))}

                <div className="pt-2 space-y-3">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate BMR <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setAge(30); setWeight(70); setHeight(175); setGender("male"); setShowResults(false);
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
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Daily BMR", val: results.daily, unit: "cal/day" },
                { label: "Monthly BMR", val: results.monthly, unit: "cal/mo" },
                { label: "Yearly BMR", val: results.yearly, unit: "cal/yr" },
              ].map((item, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 text-center shadow-sm">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">{item.label}</p>
                  <h2 className="text-3xl font-black text-blue-600">{item.val.toLocaleString()}</h2>
                  <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">{item.unit}</p>
                </div>
              ))}
            </div>

            {/* EDUCATIONAL SECTION */}
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" /> About Basal Metabolic Rate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Basal Metabolic Rate (BMR) is the minimum number of calories your body requires to function while at rest. This includes keeping your heart beating, lungs breathing, and body temperature stable.
              </p>
              
              <div className="mt-4 p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
                <code className="text-blue-600 font-bold text-xs">Mifflin-St Jeor Equation used for high accuracy</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RelatedCalculators calculators={relatedCalculators} />
        </div>
      </section>
    </main>
  );
}