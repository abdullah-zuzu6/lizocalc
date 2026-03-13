"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Ruler,
  Hash,
 
  Triangle as TriangleIcon,
 
} from "lucide-react";

import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function TriangleCalculator() {
  // --- Mount ---
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  // --- Input States ---
  const [sideA, setSideA] = useState("1");
  const [sideB, setSideB] = useState("1");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [angleC, setAngleC] = useState("60");

  const [results, setResults] = useState<any>(null);

  // --- Load history from cookies ---
  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["triangle"]?.data) {
      const d = history["triangle"].data;
      setSideA(d.sideA ?? "1");
      setSideB(d.sideB ?? "1");
      setSideC(d.sideC ?? "");
      setAngleA(d.angleA ?? "");
      setAngleB(d.angleB ?? "");
      setAngleC(d.angleC ?? "60");
    }
  }, [isMounted]);

  // --- Save history to cookies ---
  const saveHistory = () => {
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("triangle", {
        sideA,
        sideB,
        sideC,
        angleA,
        angleB,
        angleC,
      });
    }
  };

  // --- Triangle Calculation Function ---
  const calculateTriangle = () => {
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const toDeg = (rad: number) => (rad * 180) / Math.PI;

    const sA = parseFloat(sideA) || null;
    const sB = parseFloat(sideB) || null;
    const sC = parseFloat(sideC) || null;
    const aA = parseFloat(angleA) || null;
    const aB = parseFloat(angleB) || null;
    const aC = parseFloat(angleC) || null;

    if (sA && sB && aC) {
      const radC = toRad(aC);
      const calculatedSC = Math.sqrt(
        sA ** 2 + sB ** 2 - 2 * sA * sB * Math.cos(radC),
      );
      const radA = Math.asin((sA * Math.sin(radC)) / calculatedSC);
      const calculatedAA = toDeg(radA);
      const calculatedAB = 180 - aC - calculatedAA;
      const area = 0.5 * sA * sB * Math.sin(radC);
      const perimeter = sA + sB + calculatedSC;
      const type =
        sA === sB && sB === calculatedSC
          ? "Equilateral"
          : sA === sB || sB === calculatedSC || sA === calculatedSC
            ? "Isosceles"
            : "Scalene";

      const res = {
        sideA: sA.toFixed(2),
        sideB: sB.toFixed(2),
        sideC: calculatedSC.toFixed(2),
        angleA: calculatedAA.toFixed(2),
        angleB: calculatedAB.toFixed(2),
        angleC: aC.toFixed(2),
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        type,
      };
      setResults(res);
      saveHistory();
    }
  };

  const resetAll = () => {
    setSideA("1");
    setSideB("1");
    setSideC("");
    setAngleA("");
    setAngleB("");
    setAngleC("60");
    setResults(null);
    saveHistory();
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
   

      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                Triangle Parameters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Side A" value={sideA} onChange={setSideA} />
                <InputField label="Side B" value={sideB} onChange={setSideB} />
                <InputField label="Side C" value={sideC} onChange={setSideC} />
                <InputField
                  label="Angle A"
                  value={angleA}
                  onChange={setAngleA}
                  suffix="°"
                />
                <InputField
                  label="Angle B"
                  value={angleB}
                  onChange={setAngleB}
                  suffix="°"
                />
                <InputField
                  label="Angle C"
                  value={angleC}
                  onChange={setAngleC}
                  suffix="°"
                />
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  onClick={calculateTriangle}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold uppercase hover:bg-blue-700 transition-all"
                >
                  Calculate
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 py-3 bg-muted text-muted-foreground rounded-xl font-bold uppercase hover:text-blue-600 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7 space-y-6">
            {results ? (
              <div className="space-y-6">
                <div className="bg-primary rounded-3xl p-6 text-primary-foreground shadow-lg relative">
                  <div className="absolute -bottom-8 -right-8 opacity-10">
                    <TriangleIcon size={180} />
                  </div>
                  <h3 className="text-3xl font-black mb-4">
                    {results.type} Triangle
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <SolutionItem label="Side A" value={results.sideA} />
                    <SolutionItem label="Side B" value={results.sideB} />
                    <SolutionItem label="Side C" value={results.sideC} />
                    <SolutionItem
                      label="Angle A"
                      value={results.angleA + "°"}
                    />
                    <SolutionItem
                      label="Angle B"
                      value={results.angleB + "°"}
                    />
                    <SolutionItem
                      label="Angle C"
                      value={results.angleC + "°"}
                    />
                    <SolutionItem label="Area" value={results.area + " u²"} />
                    <SolutionItem
                      label="Perimeter"
                      value={results.perimeter + " u"}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <TriangleIcon
                  size={48}
                  className="opacity-20 mb-4 animate-pulse"
                />
                <p className="text-sm font-medium max-w-xs">
                  Enter 3 values (including at least one side) and click
                  Calculate.
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "Pythagorean",
              description: "Solve right triangles",
              href: "/calculator/pythagorean",
              icon: Ruler,
            },
            {
              name: "Percentage",
              description: "Calculate percentage",
              href: "/calculator/percentage",
              icon: Hash,
            },
          ]}
        />
      </section>

    </main>
  );
}

// --- Internal UI Components ---
function InputField({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
}) {
  return (
    <div className="relative flex flex-col">
      <label className="text-xs font-bold text-muted-foreground uppercase mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-muted border border-border rounded-md text-sm font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary">
          {suffix}
        </span>
      )}
    </div>
  );
}

function SolutionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 bg-muted/50 rounded-2xl border border-border flex flex-col">
      <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1">
        {label}
      </span>
      <span className="text-lg font-black text-foreground">{value}</span>
    </div>
  );
}
