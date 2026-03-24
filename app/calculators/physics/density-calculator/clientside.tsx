"use client";

import { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  Layers,
  CheckCircle2,
  ListFilter,
  BarChart3,
  Box,
  Weight,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

// ─────────────────────────────────────────────
// Types & Professional Unit Constants
// ─────────────────────────────────────────────

interface UnitOption {
  label: string;
  value: string;
  factor: number;
}

const UNITS = {
  mass: [
    { label: "kilogram [kg]", value: "kg", factor: 1 },
    { label: "gram [g]", value: "g", factor: 0.001 },
    { label: "milligram [mg]", value: "mg", factor: 0.000001 },
    { label: "metric ton [t]", value: "t", factor: 1000 },
    { label: "pound [lb]", value: "lb", factor: 0.45359237 },
    { label: "ounce [oz]", value: "oz", factor: 0.02834952 },
    { label: "carat [ct]", value: "ct", factor: 0.0002 },
  ],
  volume: [
    { label: "cubic meter [m³]", value: "m3", factor: 1 },
    { label: "liter [L]", value: "L", factor: 0.001 },
    { label: "milliliter [mL]", value: "mL", factor: 0.000001 },
    { label: "gallon [US]", value: "gal_us", factor: 0.00378541 },
    { label: "gallon [UK]", value: "gal_uk", factor: 0.00454609 },
    { label: "cubic foot [ft³]", value: "ft3", factor: 0.02831685 },
    { label: "cubic yard [yd³]", value: "yd3", factor: 0.76455486 },
    { label: "cubic inch [in³]", value: "in3", factor: 0.000016387 },
    { label: "cubic centimeter [cm³]", value: "cm3", factor: 0.000001 },
  ],
  density: [
    { label: "kilogram/cubic meter [kg/m³]", value: "kg_m3", factor: 1 },
    {
      label: "kilogram/cubic centimeter [kg/cm³]",
      value: "kg_cm3",
      factor: 1000000,
    },
    { label: "gram/cubic meter [g/m³]", value: "g_m3", factor: 0.001 },
    { label: "gram/cubic centimeter [g/cm³]", value: "g_cm3", factor: 1000 },
    { label: "kilogram/liter [kg/L]", value: "kg_L", factor: 1000 },
    { label: "gram/liter [g/L]", value: "g_L", factor: 1 },
    { label: "pound/cubic inch [lb/in³]", value: "lb_in3", factor: 27679.9 },
    { label: "pound/cubic foot [lb/ft³]", value: "lb_ft3", factor: 16.01846 },
    { label: "pound/cubic yard [lb/yd³]", value: "lb_yd3", factor: 0.5932764 },
    { label: "pound/gallon [US]", value: "lb_gal_us", factor: 119.8264 },
    { label: "pound/gallon [UK]", value: "lb_gal_uk", factor: 99.7763 },
  ],
};

export default function DensityCalculator() {
  const relatedCalculators = [
    {
      name: "Mass Calculator",
      description: "Weight ↔ Mass conversions",
      href: "/calculators/physics/mass-calculator",
      icon: Weight,
    },
    {
      name: "Speed Calculator",
      description: "Velocity & motion solver",
      href: "/calculators/physics/speed-calculator",
      icon: Box,
    },
  ];

  const [mass, setMass] = useState<string>("100");
  const [massUnit, setMassUnit] = useState<string>("kg");
  const [volume, setVolume] = useState<string>("1");
  const [volumeUnit, setVolumeUnit] = useState<string>("m3");
  const [densityUnit, setDensityUnit] = useState<string>("kg_m3");

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["density-calc"]?.data) {
      const data = history["density-calc"].data;
      setMass(data.mass || "8900");
      setMassUnit(data.massUnit || "kg");
      setVolume(data.volume || "1");
      setVolumeUnit(data.volumeUnit || "m3");
      setDensityUnit(data.densityUnit || "kg_m3");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("density-calc", {
        mass,
        massUnit,
        volume,
        volumeUnit,
        densityUnit,
      });
    }
  }, [mass, massUnit, volume, volumeUnit, densityUnit, isMounted]);

  const results = useMemo(() => {
    if (trigger === 0) return null;
    const mVal = parseFloat(mass);
    const vVal = parseFloat(volume);

    if (isNaN(mVal) || isNaN(vVal))
      return { error: "Please enter numeric values." };
    if (vVal === 0) return { error: "Volume cannot be zero." };

    const mFactor = UNITS.mass.find((u) => u.value === massUnit)?.factor || 1;
    const vFactor =
      UNITS.volume.find((u) => u.value === volumeUnit)?.factor || 1;
    const dFactor =
      UNITS.density.find((u) => u.value === densityUnit)?.factor || 1;

    const massSI = mVal * mFactor;
    const volumeSI = vVal * vFactor;
    const densitySI = massSI / volumeSI;

    return {
      density: densitySI / dFactor,
      mass: mVal,
      volume: vVal,
    };
  }, [trigger, mass, massUnit, volume, volumeUnit, densityUnit]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <ListFilter className="text-blue-600" size={22} />
                Parameters
              </h2>

              <div className="space-y-6">
                <UnitInput
                  label="Mass (m)"
                  value={mass}
                  unit={massUnit}
                  options={UNITS.mass}
                  onValueChange={setMass}
                  onUnitChange={setMassUnit}
                />
                <UnitInput
                  label="Volume (V)"
                  value={volume}
                  unit={volumeUnit}
                  options={UNITS.volume}
                  onValueChange={setVolume}
                  onUnitChange={setVolumeUnit}
                />

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                    Result Density Unit (ρ)
                  </label>
                  <select
                    value={densityUnit}
                    onChange={(e) => setDensityUnit(e.target.value)}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                  >
                    {UNITS.density.map((u) => (
                      <option key={u.value} value={u.value}>
                        {u.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setTrigger((v) => v + 1);
                      setShowResults(true);
                    }}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setMass("");
                      setVolume("");
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="flex-1 py-4 bg-secondary text-muted-foreground rounded-xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            {showResults && results && !("error" in results) ? (
              <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                <div className="space-y-2 text-center">
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                    Resultant Density
                  </p>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter break-all">
                    {results.density.toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}
                  </h2>
                  <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-4">
                    {UNITS.density.find((u) => u.value === densityUnit)?.label}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-dashed">
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                      Total Mass
                    </p>
                    <p className="text-xl font-black">
                      {results.mass}{" "}
                      <span className="text-sm font-medium text-muted-foreground">
                        {massUnit}
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mb-1">
                      Total Volume
                    </p>
                    <p className="text-xl font-black">
                      {results.volume}{" "}
                      <span className="text-sm font-medium text-muted-foreground">
                        {volumeUnit}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : showResults && results && "error" in results ? (
              <div className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-600 font-bold flex items-center gap-3">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[300px] bg-secondary/10 border-4 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all">
                <Layers size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest max-w-[200px]">
                  Enter Parameters to Solve
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card border rounded-2xl space-y-3">
            <h3 className="font-black uppercase text-sm flex items-center gap-2">
              <BarChart3 size={18} className="text-blue-600" /> Theory
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Density ($\rho$) is defined as mass per unit volume. The formula
              is $\rho = m / V$. It determines whether an object sinks or
              floats.
            </p>
          </div>
          <div className="p-6 bg-card border rounded-2xl space-y-3 text-sm">
            <h3 className="font-black uppercase text-sm">Pro Tip</h3>
            <ul className="space-y-2 text-muted-foreground list-disc list-inside">
              <li>Check your units: kg/m³ is the SI standard.</li>
              <li>Ensure volume is not zero.</li>
            </ul>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────
// Fully Responsive Input Component
// ─────────────────────────────────────────────

interface UnitInputProps {
  label: string;
  value: string;
  unit: string;
  options: UnitOption[];
  onValueChange: (v: string) => void;
  onUnitChange: (u: string) => void;
}

function UnitInput({
  label,
  value,
  unit,
  options,
  onValueChange,
  onUnitChange,
}: UnitInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="0.00"
          className="flex-[2] px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="flex-1 px-3 py-4 bg-secondary/50 rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xs cursor-pointer transition-all"
        >
          {options.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label.includes("[")
                ? u.label.split("[")[1].replace("]", "")
                : u.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
