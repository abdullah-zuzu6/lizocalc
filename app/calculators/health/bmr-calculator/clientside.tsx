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
  Dumbbell
} from "lucide-react";
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getConsentPreference 
} from "@/lib/cookies";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function BMRCalculator() {
  // --- States ---
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const relatedCalculators = [
    { name: 'BMI Calculator', description: 'Body Mass Index', href: '/calculator/bmi', icon: Calculator },
    { name: 'Calorie Calculator', description: 'Total Daily Energy Expenditure', href: '/calculator/calorie', icon: Activity },
    { name: 'Body Fat Calculator', description: 'Estimate body fat %', href: '/calculator/body-fat', icon: Dumbbell },
  ];

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    
    if (consent?.functional && history["bmr-calc"]?.data) {
      const d = history["bmr-calc"].data;
      setAge(d.age || 30);
      setWeight(d.weight || 70);
      setHeight(d.height || 175);
      setGender(d.gender || "male");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("bmr-calc", { age, weight, height, gender });
    }
  }, [age, weight, height, gender, isMounted]);

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const bmr = gender === "male"
      ? 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
      : 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    
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
            <div className="bg-card rounded-xl border p-6 shadow-sm">
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
                        className={`flex-1 py-2 text-sm font-bold rounded-md capitalize transition-all ${gender === g ? "bg-background shadow" : ""}`}
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
                    <label className="text-sm font-medium">{field.label}: {field.val}</label>
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

                <button 
                  onClick={() => setShowResults(true)}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Calculate BMR <CheckCircle2 size={16} />
                </button>
                <button 
                  onClick={() => setShowResults(false)}
                  className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { label: "Daily BMR", val: results.daily, unit: "cal/day" },
                { label: "Monthly BMR", val: results.monthly, unit: "cal/mo" },
                { label: "Yearly BMR", val: results.yearly, unit: "cal/yr" },
              ].map((item, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 text-center">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">{item.label}</p>
                  <h2 className="text-3xl font-black text-blue-600">{item.val.toLocaleString()}</h2>
                  <p className="text-xs text-muted-foreground mt-1">{item.unit}</p>
                </div>
              ))}
            </div>

            {/* EDUCATIONAL SECTION */}
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600" /> About Basal Metabolic Rate
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Basal Metabolic Rate (BMR) is the energy your body needs to maintain basic physiological functions at rest.
              </p>
              <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
                <code className="text-blue-600 font-bold text-xs">Mifflin-St Jeor Equation used for precision</code>
              </div>
            </div>
            
            {/* Diagram visualization of energy expenditure */}
            <div className="mt-8">
              
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