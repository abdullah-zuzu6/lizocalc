"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRightLeft,
  RotateCcw,
  CheckCircle2,

  Weight,
  
  Settings2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type Category = "length" | "weight" | "temperature";

const UNITS = {
  length: [
    { label: "Meters (m)", value: "m", factor: 1 },
    { label: "Kilometers (km)", value: "km", factor: 1000 },
    { label: "Centimeters (cm)", value: "cm", factor: 0.01 },
    { label: "Miles (mi)", value: "mi", factor: 1609.34 },
    { label: "Feet (ft)", value: "ft", factor: 0.3048 },
    { label: "Inches (in)", value: "in", factor: 0.0254 },
  ],
  weight: [
    { label: "Kilograms (kg)", value: "kg", factor: 1 },
    { label: "Grams (g)", value: "g", factor: 0.001 },
    { label: "Pounds (lb)", value: "lb", factor: 0.453592 },
    { label: "Ounces (oz)", value: "oz", factor: 0.0283495 },
    { label: "Metric Tons (t)", value: "t", factor: 1000 },
  ],
  temperature: [
    { label: "Celsius (°C)", value: "C" },
    { label: "Fahrenheit (°F)", value: "F" },
    { label: "Kelvin (K)", value: "K" },
  ],
};

export default function ConversionCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [category, setCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("");
  const [toUnit, setToUnit] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["unit-conv"]?.data) {
      const { category, inputValue, fromUnit, toUnit } =
        history["unit-conv"].data;
      setCategory(category || "length");
      setInputValue(inputValue || "1");
      setFromUnit(fromUnit || UNITS.length[0].value);
      setToUnit(toUnit || UNITS.length[1].value);
    } else {
      setFromUnit(UNITS[category][0].value);
      setToUnit(UNITS[category][1].value);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("unit-conv", {
        category,
        inputValue,
        fromUnit,
        toUnit,
      });
    }
  }, [category, inputValue, fromUnit, toUnit, isMounted]);

  const result = useMemo(() => {
    if (trigger === 0) return null;
    const val = parseFloat(inputValue);
    if (isNaN(val)) return null;

    if (category === "temperature") {
      let celsius = val;
      if (fromUnit === "F") celsius = ((val - 32) * 5) / 9;
      if (fromUnit === "K") celsius = val - 273.15;
      if (toUnit === "C") return celsius.toFixed(2);
      if (toUnit === "F") return ((celsius * 9) / 5 + 32).toFixed(2);
      if (toUnit === "K") return (celsius + 273.15).toFixed(2);
    } else {
      const fromFactor =
        UNITS[category].find((u) => u.value === fromUnit)?.factor || 1;
      const toFactor =
        UNITS[category].find((u) => u.value === toUnit)?.factor || 1;
      return ((val * fromFactor) / toFactor).toLocaleString(undefined, {
        maximumFractionDigits: 6,
      });
    }
    return null;
  }, [trigger]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {(["length", "weight", "temperature"] as Category[]).map(
                  (c) => (
                    <CategoryBtn
                      key={c}
                      active={category === c}
                      onClick={() => {
                        setCategory(c);
                        setFromUnit(UNITS[c][0].value);
                        setToUnit(UNITS[c][1].value);
                      }}
                      label={c}
                    />
                  ),
                )}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground">
                    Value
                  </label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full mt-1 p-3 bg-secondary rounded-md border text-lg font-bold outline-none focus:ring-2 ring-primary/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground">
                      From
                    </label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full mt-1 p-3 bg-secondary rounded-md border text-sm font-bold"
                    >
                      {UNITS[category].map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground">
                      To
                    </label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full mt-1 p-3 bg-secondary rounded-md border text-sm font-bold"
                    >
                      {UNITS[category].map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setTrigger((prev) => prev + 1);
                    setShowResults(true);
                  }}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  Convert Now <CheckCircle2 size={16} />
                </button>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrigger(0);
                    setInputValue("1");
                  }}
                  className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8">
            {showResults && result ? (
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <p className="text-xs font-bold uppercase text-primary mb-2">
                  Converted Result
                </p>
                <h2 className="text-5xl font-black text-primary tracking-tight">
                  {result} {toUnit}
                </h2>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <ArrowRightLeft size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Select parameters and convert
                </p>
              </div>
            )}
          </div>
        </div>
        <RelatedCalculators
          calculators={[
            {
              name: "Density Calc",
              description: "Mass/Volume solver",
              href: "/calculator/physics/density-calculator",
              icon: Weight,
            },
          ]}
        />
      </div>
    
    </main>
  );
}

function CategoryBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md font-bold uppercase text-[10px] tracking-widest transition-all ${active ? "bg-primary text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
    >
      {label}
    </button>
  );
}
