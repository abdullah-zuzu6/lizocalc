"use client";

import { useState, useEffect, useMemo } from "react";
import { RotateCcw, ListFilter, CheckCircle2, Layers } from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type FractionResult = {
  numerator: number;
  denominator: number;
  decimal: number;
};

export default function FractionCalculator() {
  const relatedCalculators = [
    {
      name: "LCM Calculator",
      description: "Find Least Common Multiple",
      href: "/calculators/math/lcm-calculator",
      icon: Layers,
    },
    {
      name: "GCF Calculator",
      description: "Greatest Common Factor",
      href: "/calculators/math/gcf-calculator",
      icon: Layers,
    },
  ];

  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);

  const [operation, setOperation] = useState<"add" | "sub" | "mul" | "div">(
    "add",
  );

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b));

  const simplify = (n: number, d: number) => {
    const g = gcd(n, d);
    return { n: n / g, d: d / g };
  };

  useEffect(() => {
    setIsMounted(true);

    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["fraction-calc"]?.data) {
      const data = history["fraction-calc"].data;

      setNum1(data.num1 ?? 1);
      setDen1(data.den1 ?? 2);
      setNum2(data.num2 ?? 1);
      setDen2(data.den2 ?? 3);
      setOperation(data.operation ?? "add");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const consent = getConsentPreference();

    if (consent?.functional) {
      saveCalculatorHistory("fraction-calc", {
        num1,
        den1,
        num2,
        den2,
        operation,
      });
    }
  }, [num1, den1, num2, den2, operation, isMounted]);

  const results = useMemo(() => {
    if (trigger === 0) return null;

    let n = 0;
    let d = 1;

    if (operation === "add") {
      n = num1 * den2 + num2 * den1;
      d = den1 * den2;
    }

    if (operation === "sub") {
      n = num1 * den2 - num2 * den1;
      d = den1 * den2;
    }

    if (operation === "mul") {
      n = num1 * num2;
      d = den1 * den2;
    }

    if (operation === "div") {
      n = num1 * den2;
      d = den1 * num2;
    }

    const simplified = simplify(n, d);

    return {
      numerator: simplified.n,
      denominator: simplified.d,
      decimal: simplified.n / simplified.d,
    };
  }, [trigger]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  const handleReset = () => {
    setNum1(1);
    setDen1(2);
    setNum2(1);
    setDen2(3);
    setOperation("add");
    setTrigger(0);
    setShowResults(false);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                {/* FRACTION 1 */}

                <div>
                  <label className="text-sm font-medium">Fraction 1</label>

                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => {
                        setNum1(Number(e.target.value));
                        setShowResults(false);
                      }}
                      className="w-full px-3 py-3 bg-secondary rounded-md border"
                    />

                    <span className="flex items-center font-bold">/</span>

                    <input
                      type="number"
                      value={den1}
                      onChange={(e) => {
                        setDen1(Number(e.target.value));
                        setShowResults(false);
                      }}
                      className="w-full px-3 py-3 bg-secondary rounded-md border"
                    />
                  </div>
                </div>

                {/* OPERATION */}

                <div>
                  <label className="text-sm font-medium">Operation</label>

                  <select
                    value={operation}
                    onChange={(e) => {
                      setOperation(e.target.value as any);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border"
                  >
                    <option value="add">Add</option>
                    <option value="sub">Subtract</option>
                    <option value="mul">Multiply</option>
                    <option value="div">Divide</option>
                  </select>
                </div>

                {/* FRACTION 2 */}

                <div>
                  <label className="text-sm font-medium">Fraction 2</label>

                  <div className="flex gap-2 mt-1">
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => {
                        setNum2(Number(e.target.value));
                        setShowResults(false);
                      }}
                      className="w-full px-3 py-3 bg-secondary rounded-md border"
                    />

                    <span className="flex items-center font-bold">/</span>

                    <input
                      type="number"
                      value={den2}
                      onChange={(e) => {
                        setDen2(Number(e.target.value));
                        setShowResults(false);
                      }}
                      className="w-full px-3 py-3 bg-secondary rounded-md border"
                    />
                  </div>
                </div>

                {/* BUTTONS */}

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}

          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="bg-card border rounded-xl p-6 flex flex-col justify-center min-w-0">
                <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">
                  Result
                </p>

                <h2 className="text-4xl md:text-5xl font-black text-blue-600 text-center my-4 break-all">
                  {results.numerator} / {results.denominator}
                </h2>

                <p className="text-center text-muted-foreground text-sm">
                  Decimal: {results.decimal.toFixed(6)}
                </p>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center">
                <Layers size={48} className="opacity-10 mb-4 mx-auto" />

                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter fractions and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}
