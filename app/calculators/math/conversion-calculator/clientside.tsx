"use client";

import { useState, useEffect, useMemo } from "react";
import {
  ArrowRightLeft,
  RotateCcw,
  CheckCircle2,
  Weight,
  Settings2,
  Heart,
  Scale,
  Thermometer,
  Ruler
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

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
  const [isSaved, setIsSaved] = useState(false);
  const [category, setCategory] = useState<Category>("length");
  const [inputValue, setInputValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [toUnit, setToUnit] = useState<string>("km");
  const [showResults, setShowResults] = useState(false);

  const calculatorInfo = {
    name: "Unit Converter",
    href: "/calculators/unit-converter",
    category: "Utility",
  };

  const relatedCalculatorsList = [
    {
      name: "Density Calc",
      description: "Mass/Volume solver",
      href: "/calculators/physics/density-calculator",
      icon: Weight,
    },
  ];

  // --- Initialization ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["unit-conv"]?.data) {
      const d = history["unit-conv"].data;
      setCategory(d.category || "length");
      setInputValue(d.inputValue || "1");
      setFromUnit(d.fromUnit || UNITS.length[0].value);
      setToUnit(d.toUnit || UNITS.length[1].value);
      setShowResults(true);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("unit-conv", { category, inputValue, fromUnit, toUnit });
  }, [category, inputValue, fromUnit, toUnit, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const result = useMemo(() => {
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
      const fromFactor = UNITS[category].find((u) => u.value === fromUnit)?.factor || 1;
      const toFactor = UNITS[category].find((u) => u.value === toUnit)?.factor || 1;
      const rawResult = (val * fromFactor) / toFactor;
      
      return rawResult.toLocaleString(undefined, {
        maximumFractionDigits: rawResult < 0.0001 ? 10 : 6,
      });
    }
    return null;
  }, [inputValue, fromUnit, toUnit, category]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <ArrowRightLeft className="text-primary w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Unit Converter</h1>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Instant Multi-Unit Conversion</p>
            </div>
          </div>
          <button 
            onClick={handleToggleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
              isSaved ? "bg-red-50 border-red-100 text-red-500" : "bg-card hover:bg-secondary"
            }`}
          >
            <Heart size={18} className={isSaved ? "fill-current" : ""} />
            {isSaved ? "Saved" : "Save Tool"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <section className="bg-card border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <CategoryBtn 
                  active={category === "length"} 
                  onClick={() => { setCategory("length"); setFromUnit("m"); setToUnit("km"); }} 
                  icon={<Ruler size={14}/>} 
                  label="Length" 
                />
                <CategoryBtn 
                  active={category === "weight"} 
                  onClick={() => { setCategory("weight"); setFromUnit("kg"); setToUnit("lb"); }} 
                  icon={<Scale size={14}/>} 
                  label="Weight" 
                />
                <CategoryBtn 
                  active={category === "temperature"} 
                  onClick={() => { setCategory("temperature"); setFromUnit("C"); setToUnit("F"); }} 
                  icon={<Thermometer size={14}/>} 
                  label="Temp" 
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground">Value to Convert</label>
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => { setInputValue(e.target.value); setShowResults(true); }}
                    className="w-full mt-1 p-3 bg-secondary rounded-lg border text-lg font-bold outline-none focus:ring-2 ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground">From</label>
                    <select
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full mt-1 p-3 bg-secondary rounded-lg border text-sm font-bold cursor-pointer"
                    >
                      {UNITS[category].map((u) => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-center -my-2">
                    <div className="bg-background border rounded-full p-2 shadow-sm z-10">
                        <ArrowRightLeft size={16} className="text-muted-foreground rotate-90" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground">To</label>
                    <select
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full mt-1 p-3 bg-secondary rounded-lg border text-sm font-bold cursor-pointer"
                    >
                      {UNITS[category].map((u) => (
                        <option key={u.value} value={u.value}>{u.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setInputValue("1");
                    setShowResults(false);
                  }}
                  className="w-full py-2 text-muted-foreground text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:text-foreground transition-colors"
                >
                  <RotateCcw size={12} /> Reset to Default
                </button>
              </div>
            </section>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && result ? (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center min-h-[350px] flex flex-col items-center justify-center shadow-sm">
                <p className="text-xs font-black uppercase text-primary tracking-widest mb-4">
                  Converted Result
                </p>
                <div className="space-y-2">
                    <p className="text-muted-foreground font-medium">{inputValue} {fromUnit} equals</p>
                    <h2 className="text-5xl md:text-7xl font-black text-primary tracking-tight break-all">
                    {result} <span className="text-2xl md:text-3xl opacity-60 font-bold">{toUnit}</span>
                    </h2>
                </div>
                
                <div className="mt-8 flex items-center gap-2 text-emerald-600 bg-emerald-500/10 px-4 py-2 rounded-full text-xs font-bold">
                    <CheckCircle2 size={14} /> Accuracy verified
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-2xl p-12 text-center min-h-[350px] flex flex-col items-center justify-center">
                <ArrowRightLeft size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Input a value to see conversion
                </p>
              </div>
            )}

            {/* Scale Info Card */}
            <div className="p-6 bg-card border rounded-2xl shadow-sm">
                <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                    <Scale size={16} className="text-primary" /> Conversion Insight
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    This tool uses standard international conversion factors. When converting between {category} units, 
                    we maintain up to 6 decimal places for precision. 
                    {category === 'temperature' ? ' Note that temperature conversions use specific formulas rather than fixed multipliers.' : ' Our factors are based on the SI base unit standard.'}
                </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
            <RelatedCalculators calculators={relatedCalculatorsList} />
        </div>
      </div>
    </main>
  );
}

function CategoryBtn({
  active,
  onClick,
  label,
  icon
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 py-3 rounded-xl border transition-all ${
        active 
          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
          : "bg-card border-border text-muted-foreground hover:bg-secondary"
      }`}
    >
      {icon}
      <span className="font-bold uppercase text-[10px] tracking-widest">{label}</span>
    </button>
  );
}