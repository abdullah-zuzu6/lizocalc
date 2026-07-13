"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Scale,
  RotateCcw,
  ListFilter,
  BarChart3,
  CheckCircle2,
  Weight as WeightIcon,
  Globe,
  Heart,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

const PLANETS = [
  { name: "Mercury", g: 3.7 },
  { name: "Venus", g: 8.87 },
  { name: "Earth", g: 9.807 },
  { name: "Moon", g: 1.62 },
  { name: "Mars", g: 3.71 },
  { name: "Jupiter", g: 24.79 },
];

export default function WeightCalculator() {
  const relatedCalculators = [
    {
      name: "Mass Calculator",
      description: "Find mass instantly",
      href: "/calculators/physics/mass-calculator",
      icon: Scale,
    },
    {
      name: "Speed Calculator",
      description: "Calculate speed of object",
      href: "/calculators/physics/speed-calculator",
      icon: Globe,
    },
  ];

  // --- States ---
  // These defaults render identically server-side and on first client
  // paint. There is no more "isMounted" gate hiding the whole calculator —
  // that gate was the reason CLS was 0.55–0.62: the calculator had zero
  // height, then suddenly gained hundreds of pixels of height right after
  // hydration completed.
  const [mass, setMass] = useState<string>("70");
  const [gravity, setGravity] = useState<string>("9.807");
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const calculatorInfo = {
    name: "Weight Calculator",
    href: "/calculators/physics/weight-calculator",
    category: "Physics",
  };

  // --- Load persisted state (does NOT block first paint) ---
  useEffect(() => {
    const history = getCalculatorHistory();

    if (history["weight-calc"]?.data) {
      const { mass, gravity } = history["weight-calc"].data;
      setMass(mass || "70");
      setGravity(gravity || "9.807");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-Save History ---
  useEffect(() => {
    saveCalculatorHistory("weight-calc", { mass, gravity });
  }, [mass, gravity]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const weightResult = useMemo(() => {
    const m = parseFloat(mass);
    const g = parseFloat(gravity);
    if (isNaN(m) || isNaN(g)) return null;
    return (m * g).toFixed(2);
  }, [mass, gravity]);

  return (
    // Changed from <main> to <div>: page.tsx already renders the page's
    // single <main> landmark. Two <main> elements nested on one page was
    // flagging "Accessibility tree is not well-formed" under Agentic
    // Browsing, on both mobile and desktop reports.
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-3xl border p-6 md:p-8 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={
                  isSaved
                    ? "Remove Weight Calculator from saved"
                    : "Save Weight Calculator"
                }
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tight">
                <ListFilter className="text-blue-600" size={24} />
                Parameters
              </h2>

              <div className="space-y-6">
                {/* FIX: label now has htmlFor pointing to the input's id.
                    This resolves "Form elements do not have associated
                    labels" — previously the <label> and <input> had no
                    programmatic relationship, so screen readers couldn't
                    announce what the field was for. */}
                <div className="space-y-2">
                  <label
                    htmlFor="mass-input"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Mass (kg)
                  </label>
                  <input
                    id="mass-input"
                    type="number"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full px-5 py-4 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="gravity-input"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Gravity (m/s²)
                  </label>
                  <input
                    id="gravity-input"
                    type="number"
                    value={gravity}
                    onChange={(e) => setGravity(e.target.value)}
                    className="w-full px-5 py-4 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all"
                  />
                </div>

                <div
                  className="grid grid-cols-3 gap-2"
                  role="group"
                  aria-label="Planet gravity presets"
                >
                  {PLANETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setGravity(p.g.toString())}
                      aria-pressed={gravity === p.g.toString()}
                      className="py-2.5 bg-secondary/50 rounded-xl text-[10px] font-black uppercase hover:bg-blue-600 hover:text-white transition-all border border-transparent hover:border-blue-400"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE WEIGHT <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setMass("");
                      setGravity("");
                      setShowResults(false);
                    }}
                    className="flex-1 py-4 bg-secondary text-gray-200 rounded-2xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7">
            {showResults && weightResult ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-card border-2 border-blue-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-600/5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <WeightIcon size={120} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-4">
                      Calculated Weight
                    </p>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
                      {weightResult} <span className="text-3xl md:text-4xl">N</span>
                    </h2>
                    <p className="text-xl font-bold text-gray-300 uppercase">
                      Newtons (Force)
                    </p>
                  </div>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 text-center shadow-sm">
                  <p className="text-[10px] font-bold uppercase text-gray-300 mb-2 tracking-widest">
                    Imperial Conversion
                  </p>
                  <p className="text-3xl font-black text-blue-600">
                    {(parseFloat(weightResult) / 4.448).toFixed(2)} lbs
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <WeightIcon size={80} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-[0.2em]">
                  Enter mass and gravity to calculate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10">
          <div className="bg-card border rounded-3xl p-8 space-y-4">
            <h3 className="font-black text-sm flex items-center gap-2 uppercase tracking-widest text-blue-600">
              <BarChart3 size={20} /> Mass vs Weight
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Mass is a constant measure of the amount of matter in an
              object. Weight is the variable force exerted on that mass by
              gravity.
            </p>
            <div className="p-4 bg-secondary/50 rounded-2xl font-mono text-xs font-bold border border-dashed">
              Weight (W) = mass (m) × gravity (g)
            </div>
          </div>
          <div className="bg-card border rounded-3xl p-8 space-y-4 text-sm">
            <h3 className="font-black text-sm uppercase tracking-widest text-blue-600">
              Why Gravity Varies
            </h3>
            <div className="space-y-3 text-gray-300">
              <p>
                • Objects weigh less on the Moon because its gravitational
                field is weaker (1.62 m/s²).
              </p>
              <p>
                • Weight is technically a vector quantity, as it has a
                direction pointing toward the center of gravity.
              </p>
              <p>
                • On Earth, gravity slightly fluctuates based on your
                altitude and latitude.
              </p>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </div>
  );
}