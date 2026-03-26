"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Zap,
  Move,
  CheckCircle2,
  TrendingDown,
  Scale,
  RotateCcw,
  BarChart3,
  Layers,
  Heart,
} from "lucide-react";

import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";
import RelatedCalculators from "@/components/RelatedCalculators";

// ─────────────────────────────────────────────
// Types & Professional Unit Constants
// ─────────────────────────────────────────────

interface UnitOption {
  label: string;
  value: string;
  factor: number; 
}

const UNITS = {
  distance: [
    { label: "kilometers [km]", value: "km", factor: 1000 },
    { label: "meters [m]", value: "m", factor: 1 },
    { label: "miles [mi]", value: "mi", factor: 1609.34 },
    { label: "feet [ft]", value: "ft", factor: 0.3048 },
    { label: "nautical miles [nm]", value: "nmi", factor: 1852 },
  ],
  time: [
    { label: "hours [hr]", value: "hr", factor: 3600 },
    { label: "minutes [min]", value: "min", factor: 60 },
    { label: "seconds [sec]", value: "sec", factor: 1 },
  ],
};

export default function SpeedCalculator() {
  // --- State ---
  const [distance, setDistance] = useState<string>("10");
  const [distUnit, setDistUnit] = useState<string>("km");
  const [time, setTime] = useState<string>("1");
  const [timeUnit, setTimeUnit] = useState<string>("hr");

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const relatedCalculators = [
    {
      name: "Density Calculator",
      description: "Mass per volume solver",
      href: "/calculators/physics/density-calculator",
      icon: Scale,
    },
    {
      name: "Mass Calculator",
      description: "Solve for m = ρ × V",
      href: "/calculators/physics/mass-calculator",
      icon: Zap,
    },
  ];

  const calculatorInfo = {
    name: "Speed Calculator",
    href: "/calculators/physics/speed-calculator",
    category: "Physics",
  };

  // --- Initialize & Load ---
  useEffect(() => {
    setIsMounted(true);
    
    // Load inputs from history
    const history = getCalculatorHistory();
    if (history["speed-adv-calc"]?.data) {
      const data = history["speed-adv-calc"].data;
      setDistance(data.distance || "10");
      setDistUnit(data.distUnit || "km");
      setTime(data.time || "1");
      setTimeUnit(data.timeUnit || "hr");
    }

    // Check if tool is favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save History ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("speed-adv-calc", {
      distance,
      distUnit,
      time,
      timeUnit,
    });
  }, [distance, distUnit, time, timeUnit, isMounted]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    if (trigger === 0) return null;
    const dVal = parseFloat(distance);
    const tVal = parseFloat(time);

    if (isNaN(dVal) || isNaN(tVal) || tVal <= 0) {
      return { error: "Please enter a valid distance and a positive time." };
    }

    const dFactor = UNITS.distance.find((u) => u.value === distUnit)?.factor || 1;
    const tFactor = UNITS.time.find((u) => u.value === timeUnit)?.factor || 1;

    const distMeters = dVal * dFactor;
    const timeSeconds = tVal * tFactor;
    const speedMPS = distMeters / timeSeconds;

    return {
      kmh: (speedMPS * 3.6).toFixed(2),
      mph: (speedMPS * 2.23694).toFixed(2),
      mps: speedMPS.toFixed(2),
      pace: (60 / (speedMPS * 3.6)).toFixed(2), // min/km
    };
  }, [trigger, distance, distUnit, time, timeUnit]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-3xl border p-6 md:p-8 shadow-sm relative overflow-hidden">
              
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

              <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tight">
                <Move className="text-blue-600" size={24} />
                Parameters
              </h2>

              <div className="space-y-8">
                <UnitInput
                  label="Distance"
                  value={distance}
                  unit={distUnit}
                  options={UNITS.distance}
                  onValueChange={setDistance}
                  onUnitChange={setDistUnit}
                />

                <UnitInput
                  label="Time Duration"
                  value={time}
                  unit={timeUnit}
                  options={UNITS.time}
                  onValueChange={setTime}
                  onUnitChange={setTimeUnit}
                />

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setTrigger((v) => v + 1);
                      setShowResults(true);
                    }}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE <CheckCircle2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setDistance("");
                      setTime("");
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="flex-1 py-4 bg-secondary text-muted-foreground rounded-2xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7">
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-card border-2 border-blue-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-600/5 relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-5">
                      <Zap size={120} />
                   </div>
                   <div className="relative z-10 text-center">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-4">
                        Average Velocity
                      </p>
                      <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
                        {results.kmh}
                      </h2>
                      <p className="text-xl font-bold text-muted-foreground uppercase">kilometers per hour</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard label="Miles Per Hour" value={`${results.mph} mph`} />
                  <StatCard label="Meters Per Sec" value={`${results.mps} m/s`} />
                  <StatCard label="Pace (min/km)" value={results.pace} />
                </div>
              </div>
            ) : showResults && results && "error" in results ? (
              <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-8 text-red-600 font-bold flex items-center gap-4">
                <TrendingDown /> {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Layers size={80} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Input distance and time to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div className="p-8 bg-card border rounded-3xl space-y-4">
            <h3 className="font-black uppercase text-sm flex items-center gap-2 text-blue-600">
              <BarChart3 size={20} /> The Velocity Formula
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Speed is a scalar quantity that refers to "how fast an object is moving." It is the rate at which an object covers distance. 
            </p>
            <div className="p-4 bg-secondary/50 rounded-xl font-mono text-xs font-bold border">
                Average Speed = Total Distance / Total Time
            </div>
          </div>
          <div className="p-8 bg-card border rounded-3xl space-y-4 text-sm">
            <h3 className="font-black uppercase text-sm text-blue-600">Quick Reference</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex justify-between border-b pb-2"><span>1 km/h</span> <span>0.621 mph</span></li>
              <li className="flex justify-between border-b pb-2"><span>1 m/s</span> <span>3.6 km/h</span></li>
              <li className="flex justify-between"><span>1 Knot</span> <span>1.151 mph</span></li>
            </ul>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}

function UnitInput({
  label,
  value,
  unit,
  options,
  onValueChange,
  onUnitChange,
}: {
  label: string;
  value: string;
  unit: string;
  options: UnitOption[];
  onValueChange: (v: string) => void;
  onUnitChange: (u: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="0.00"
          className="flex-[2] px-5 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all"
        />
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="flex-1 px-4 py-5 bg-secondary/50 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-black text-xs cursor-pointer uppercase tracking-tighter"
        >
          {options.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label.includes("[") ? u.label.split("[")[1].replace("]", "") : u.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border rounded-3xl p-6 text-center shadow-sm">
      <p className="text-[10px] font-bold uppercase text-muted-foreground mb-2 tracking-widest">{label}</p>
      <p className="text-2xl font-black text-blue-600">{value}</p>
    </div>
  );
}