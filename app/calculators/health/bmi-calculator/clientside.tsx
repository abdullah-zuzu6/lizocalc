"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Heart,
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  BookOpen,
  Layers,
  CheckCircle2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

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

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["bmi"]?.data) {
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
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("bmi", {
        unit,
        weight,
        age,
        gender,
        heightFeet,
        heightInches,
        heightCm,
      });
    }
  }, [
    unit,
    weight,
    age,
    gender,
    heightFeet,
    heightInches,
    heightCm,
    isMounted,
  ]);

  const results = useMemo(() => {
    if (trigger === 0) return null;
    let weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    let h_m =
      unit === "imperial"
        ? (heightFeet * 12 + heightInches) * 0.0254
        : heightCm / 100;

    const bmiValue = weightKg / (h_m * h_m);
    const piValue = weightKg / (h_m * h_m * h_m);
    const constrainedBmi = Math.min(Math.max(bmiValue, 5), 40);
    const rotation = ((constrainedBmi - 5) / (40 - 5)) * 180 - 90;

    let cat = "",
      col = "";
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
      needleRotation: rotation,
      healthyWeight: range,
      ponderalIndex: piValue.toFixed(1),
    };
  }, [trigger]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  const handleReset = () => {
    setTrigger(0);
    setShowResults(false);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <div className="flex bg-secondary p-1 rounded-lg">
                  <button
                    onClick={() => setUnit("metric")}
                    className={`flex-1 py-2 text-sm font-bold rounded-md ${unit === "metric" ? "bg-background shadow" : ""}`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUnit("imperial")}
                    className={`flex-1 py-2 text-sm font-bold rounded-md ${unit === "imperial" ? "bg-background shadow" : ""}`}
                  >
                    Imperial
                  </button>
                </div>

                <div>
                  <label className="text-sm font-medium">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Height</label>
                  {unit === "metric" ? (
                    <input
                      type="number"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border"
                    />
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(Number(e.target.value))}
                        className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border"
                        placeholder="ft"
                      />
                      <input
                        type="number"
                        value={heightInches}
                        onChange={(e) =>
                          setHeightInches(Number(e.target.value))
                        }
                        className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border"
                        placeholder="in"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Weight ({unit === "metric" ? "kg" : "lbs"})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    Calculate BMI <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="bg-card border rounded-xl p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Heart className="text-red-500" size={20} /> Results
                </h2>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="flex flex-col items-center">
                    <div className="text-6xl font-black text-primary">
                      {results.bmi}
                    </div>
                    <div className={`mt-2 font-bold ${results.color}`}>
                      {results.category}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-secondary/30 rounded-lg flex justify-between border">
                      <span className="text-sm font-bold">Healthy Weight</span>
                      <span className="text-sm font-mono">
                        {results.healthyWeight}
                      </span>
                    </div>
                    <div className="p-4 bg-secondary/30 rounded-lg flex justify-between border">
                      <span className="text-sm font-bold">Ponderal Index</span>
                      <span className="text-sm font-mono">
                        {results.ponderalIndex} kg/m³
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Info size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter details and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "LCM Calculator",
              description: "Find common multiples",
              href: "/calculators/math/lcm",
              icon: Layers,
            },
            {
              name: "Interest Calculator",
              description: "Calculate interest",
              href: "/calculators/financial/interest",
              icon: BarChart3,
            },
          ]}
        />
      </section>
    </main>
  );
}
