"use client";

import { useState, useEffect, useCallback } from "react";
import { Ruler, Hash, Triangle as TriangleIcon } from "lucide-react";

import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function TriangleCalculator() {
  const [isMounted, setIsMounted] = useState(false);

  const [sideA, setSideA] = useState("5");
  const [sideB, setSideB] = useState("6");
  const [sideC, setSideC] = useState("");
  const [angleA, setAngleA] = useState("");
  const [angleB, setAngleB] = useState("");
  const [angleC, setAngleC] = useState("70");

  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load from cookies
  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (!consent?.functional) return;

    const history = getCalculatorHistory();
    const data = history["triangle"]?.data;
    if (data) {
      setSideA(data.sideA ?? "5");
      setSideB(data.sideB ?? "6");
      setSideC(data.sideC ?? "");
      setAngleA(data.angleA ?? "");
      setAngleB(data.angleB ?? "");
      setAngleC(data.angleC ?? "70");
    }
  }, [isMounted]);

  const saveHistory = useCallback(() => {
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
  }, [sideA, sideB, sideC, angleA, angleB, angleC]);

  // ─── Real-time input validation ────────────────────────────────────────
  const validateInputs = useCallback(() => {
    const sidesFilled = [
      sideA.trim() !== "",
      sideB.trim() !== "",
      sideC.trim() !== "",
    ].filter(Boolean).length;

    const anglesFilled = [
      angleA.trim() !== "",
      angleB.trim() !== "",
      angleC.trim() !== "",
    ].filter(Boolean).length;

    // Rule 1: If 2 sides already filled → block 3rd side
    if (sidesFilled >= 2 && sideC.trim() !== "" && !results) {
      if (sidesFilled === 3) {
        setError(
          "You already entered 2 sides — the third side will be calculated.\nPlease clear side C."
        );
        return false;
      }
    }

    // Rule 2: If 2 angles already filled → block 3rd angle
    if (anglesFilled >= 2 && angleC.trim() !== "" && !results) {
      if (anglesFilled === 3) {
        setError(
          "You already entered 2 angles — the third angle will be calculated.\nPlease clear one angle field."
        );
        return false;
      }
    }

    // Rule 3: 3 sides + any angle = conflict
    if (sidesFilled === 3 && anglesFilled >= 1) {
      setError(
        "When all three sides are known, angles are calculated automatically.\nPlease clear all angle fields."
      );
      return false;
    }

    // Rule 4: 2 sides + 2 angles = usually over-specified
    if (sidesFilled >= 2 && anglesFilled >= 2) {
      setError(
        "Too many values — this combination over-determines the triangle.\nPlease remove one side or one angle."
      );
      return false;
    }

    setError(null);
    return true;
  }, [sideA, sideB, sideC, angleA, angleB, angleC, results]);

  // Run validation on every input change
  useEffect(() => {
    validateInputs();
  }, [sideA, sideB, sideC, angleA, angleB, angleC, validateInputs]);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculateTriangle = () => {
    if (!validateInputs()) return;

    setResults(null);

    let a = sideA.trim() ? parseFloat(sideA) : null;
    let b = sideB.trim() ? parseFloat(sideB) : null;
    let c = sideC.trim() ? parseFloat(sideC) : null;
    let A = angleA.trim() ? parseFloat(angleA) : null;
    let B = angleB.trim() ? parseFloat(angleB) : null;
    let C = angleC.trim() ? parseFloat(angleC) : null;

    let solved = false;

    // Case 1: SAS (two sides + included angle C)
    if (a && b && C && !c) {
      const radC = toRad(C);
      c = Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(radC));
      const radA = Math.asin((a * Math.sin(radC)) / c);
      A = toDeg(radA);
      B = 180 - C - A;
      solved = true;
    }

    // Case 2: SSS (three sides)
    else if (a && b && c && !A && !B && !C) {
      if (a + b <= c || a + c <= b || b + c <= a) {
        setError("These sides cannot form a triangle (triangle inequality violated).");
        return;
      }
      A = toDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
      B = toDeg(Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)));
      C = toDeg(Math.acos((a ** 2 + b ** 2 - c ** 2) / (2 * a * b)));
      solved = true;
    }

    // Case 3: ASA / AAS (two angles + one side)
    else if ([A, B, C].filter(Boolean).length === 2 && [a, b, c].filter(Boolean).length === 1) {
      const sum = (A || 0) + (B || 0) + (C || 0);
      if (sum >= 180) {
        setError("Sum of angles must be less than 180°");
        return;
      }

      if (!A) A = 180 - sum;
      if (!B) B = 180 - sum;
      if (!C) C = 180 - sum;

      let knownSide: number, oppAngle: number;
      if (a) { knownSide = a; oppAngle = A; }
      else if (b) { knownSide = b; oppAngle = B; }
      else { knownSide = c!; oppAngle = C; }

      const ratio = knownSide / Math.sin(toRad(oppAngle));

      if (!a) a = ratio * Math.sin(toRad(A));
      if (!b) b = ratio * Math.sin(toRad(B));
      if (!c) c = ratio * Math.sin(toRad(C));
      solved = true;
    }

    if (!solved) {
      setError(
        "Unsupported combination or conflicting values.\n\n" +
        "Supported cases:\n" +
        "• Two sides + included angle (leave third side empty)\n" +
        "• Three sides (leave angles empty)\n" +
        "• Two angles + one side"
      );
      return;
    }

    // Calculate area
    let area = 0;
    if (a && b && C) area = 0.5 * a * b * Math.sin(toRad(C));
    else if (b && c && A) area = 0.5 * b * c * Math.sin(toRad(A));
    else if (a && c && B) area = 0.5 * a * c * Math.sin(toRad(B));
    else {
      const s = (a! + b! + c!) / 2;
      area = Math.sqrt(s * (s - a!) * (s - b!) * (s - c!));
    }

    const perimeter = a! + b! + c!;

    let type = "Scalene";
    if (Math.abs(a! - b!) < 0.001 && Math.abs(b! - c!) < 0.001) type = "Equilateral";
    else if (Math.abs(a! - b!) < 0.001 || Math.abs(b! - c!) < 0.001 || Math.abs(a! - c!) < 0.001)
      type = "Isosceles";

    setResults({
      sideA: a!.toFixed(4),
      sideB: b!.toFixed(4),
      sideC: c!.toFixed(4),
      angleA: A!.toFixed(2),
      angleB: B!.toFixed(2),
      angleC: C!.toFixed(2),
      area: area.toFixed(4),
      perimeter: perimeter.toFixed(4),
      type,
    });

    saveHistory();
  };

  const resetAll = () => {
    setSideA("5");
    setSideB("6");
    setSideC("");
    setAngleA("");
    setAngleB("");
    setAngleC("70");
    setResults(null);
    setError(null);
    saveHistory();
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TriangleIcon className="text-blue-500" />
                Triangle Parameters
              </h2>

              {error && (
                <div className="mb-6 p-4 bg-red-950/50 border border-red-700 rounded-xl text-red-200 text-sm leading-relaxed">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Side A" value={sideA} onChange={setSideA} />
                <InputField label="Side B" value={sideB} onChange={setSideB} />
                <InputField label="Side C" value={sideC} onChange={setSideC} />
                <InputField label="Angle A" value={angleA} onChange={setAngleA} suffix="°" />
                <InputField label="Angle B" value={angleB} onChange={setAngleB} suffix="°" />
                <InputField label="Angle C" value={angleC} onChange={setAngleC} suffix="°" />
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={calculateTriangle}
                  disabled={!!error}
                  className={`flex-1 py-3.5 rounded-xl font-bold uppercase tracking-wide transition-all ${
                    error
                      ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  Calculate
                </button>
                <button
                  onClick={resetAll}
                  className="flex-1 py-3.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold uppercase tracking-wide transition-all border border-gray-600"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-7 space-y-6">
            {results ? (
              <div className="bg-gradient-to-br from-blue-950/70 to-indigo-950/70 rounded-3xl p-7 shadow-2xl border border-blue-800/30 relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 opacity-10 pointer-events-none">
                  <TriangleIcon size={280} />
                </div>
                <h3 className="text-3xl font-black mb-6 text-blue-100">
                  {results.type} Triangle
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <SolutionItem label="Side a" value={results.sideA} />
                  <SolutionItem label="Side b" value={results.sideB} />
                  <SolutionItem label="Side c" value={results.sideC} />
                  <SolutionItem label="∠A" value={results.angleA + "°"} />
                  <SolutionItem label="∠B" value={results.angleB + "°"} />
                  <SolutionItem label="∠C" value={results.angleC + "°"} />
                  <SolutionItem label="Area" value={results.area + " u²"} />
                  <SolutionItem label="Perimeter" value={results.perimeter + " u"} />
                </div>
              </div>
            ) : (
              <div className="h-[480px] border-2 border-dashed border-gray-700 rounded-3xl flex flex-col items-center justify-center p-10 text-center text-gray-400">
                <TriangleIcon size={72} className="opacity-40 mb-6 animate-pulse" />
                <h3 className="text-2xl font-semibold mb-3 text-gray-300">Ready to solve</h3>
                <p className="text-base max-w-md leading-relaxed">
                  Enter exactly one of these:<br />
                  • Two sides + included angle (leave third side empty)<br />
                  • Three sides (leave angles empty)<br />
                  • Two angles + one side
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            { name: "Pythagorean", description: "Solve right triangles", href: "/calculators/math/pythagorean-theorem-calculator", icon: Ruler },
            { name: "Percentage", description: "Calculate percentage", href: "/calculators/math/percentage", icon: Hash },
          ]}
        />
      </section>
    </main>
  );
}

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
      <label className="text-xs font-bold text-gray-500 uppercase mb-1.5 tracking-wide">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          step="any"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-700 rounded-lg text-sm font-medium focus:ring-2 ring-blue-500/40 focus:border-blue-500/50 outline-none transition-all placeholder-gray-600"
          placeholder="Enter value"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-400 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function SolutionItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-blue-900/30 flex flex-col">
      <span className="text-xs font-semibold text-blue-300/70 uppercase tracking-wider mb-1">
        {label}
      </span>
      <span className="text-xl md:text-2xl font-black text-white">{value}</span>
    </div>
  );
}