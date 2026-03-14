"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Zap,
  RotateCcw,
  Info,
  Timer,
  Move,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function SpeedCalculator() {
  const [distance, setDistance] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["speed-calc"]?.data) {
      const { distance, time, unit } = history["speed-calc"].data;
      setDistance(distance || "");
      setTime(time || "");
      setUnit(unit || "metric");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("speed-calc", { distance, time, unit });
    }
  }, [distance, time, unit, isMounted]);

  const results = useMemo(() => {
    const d = parseFloat(distance);
    const t = parseFloat(time);
    if (isNaN(d) || isNaN(t) || t <= 0) return null;

    const speed = d / t;
    const pace = 60 / speed;

    return {
      speed: speed.toFixed(2),
      pace: pace.toFixed(2),
      unitLabel: unit === "metric" ? "km/h" : "mph",
    };
  }, [distance, time, unit]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
    
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase">
            Speed <span className="text-blue-600">Calculator</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Calculate average velocity, travel time, or distance covered using
            standard kinematics formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Move className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setUnit("metric")}
                  className={`flex-1 py-2 rounded-md font-bold text-xs uppercase ${unit === "metric" ? "bg-blue-600 text-white" : "bg-secondary"}`}
                >
                  Metric
                </button>
                <button
                  onClick={() => setUnit("imperial")}
                  className={`flex-1 py-2 rounded-md font-bold text-xs uppercase ${unit === "imperial" ? "bg-blue-600 text-white" : "bg-secondary"}`}
                >
                  Imperial
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">
                    Distance ({unit === "metric" ? "km" : "mi"})
                  </label>
                  <input
                    type="number"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Time (Hours)</label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold"
                    placeholder="0.00"
                  />
                </div>
                <button
                  onClick={() => setShowResults(true)}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
                >
                  Calculate <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center items-center">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Average Speed
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 my-4">
                    {results.speed}{" "}
                    <span className="text-2xl">{results.unitLabel}</span>
                  </h2>
                </div>
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center items-center">
                  <p className="text-xs font-bold uppercase text-muted-foreground">
                    Travel Pace
                  </p>
                  <h2 className="text-3xl font-bold my-4">
                    {results.pace}{" "}
                    <span className="text-lg text-muted-foreground">
                      min/{unit === "metric" ? "km" : "mi"}
                    </span>
                  </h2>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center">
                <Zap size={48} className="mx-auto opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase">
                  Enter data to see velocity results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <TrendingDown size={20} className="text-blue-600" /> Velocity
              Basics
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Velocity is a vector quantity that measures the rate of change of
              position of an object.
            </p>
            <code className="block p-3 bg-blue-600/5 border border-blue-600/10 rounded-lg text-blue-600 font-bold text-xs uppercase">
              Formula: v = d / t
            </code>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">Common Applications</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Planning logistics and delivery schedules.</li>
              <li>• Analyzing athletic performance and training.</li>
              <li>• Calculating travel duration for trips.</li>
            </ul>
          </div>
        </div>
      </section>
      
    </main>
  );
}
