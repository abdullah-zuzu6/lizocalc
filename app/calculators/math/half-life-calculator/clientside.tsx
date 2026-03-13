"use client";

import { useState, useEffect, useMemo } from "react";
import { Clock, RotateCcw, CheckCircle2, FlaskConical } from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type HalfLifeResult = {
  remainingAmount: string;
  decayConstant: string;
  halfLivesElapsed: string;
  decayPercentage: string;
};

type TableRow = {
  time: number;
  value: number;
};

export default function HalfLifeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [initialAmount, setInitialAmount] = useState("100");
  const [halfLifeTime, setHalfLifeTime] = useState("5");
  const [totalTime, setTotalTime] = useState("15");
  const [unit, setUnit] = useState("years");

  useEffect(() => {
    setIsMounted(true);

    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["half-life-calc"]?.data) {
      const d = history["half-life-calc"].data;
      setInitialAmount(d.initial || "100");
      setHalfLifeTime(d.hl || "5");
      setTotalTime(d.total || "15");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const consent = getConsentPreference();

    if (consent?.functional) {
      saveCalculatorHistory("half-life-calc", {
        initial: initialAmount,
        hl: halfLifeTime,
        total: totalTime,
      });
    }
  }, [initialAmount, halfLifeTime, totalTime, isMounted]);

  const results = useMemo((): HalfLifeResult | null => {
    const N0 = parseFloat(initialAmount);
    const t12 = parseFloat(halfLifeTime);
    const t = parseFloat(totalTime);

    if (isNaN(N0) || isNaN(t12) || isNaN(t) || N0 <= 0 || t12 <= 0 || t < 0) {
      return null;
    }

    const n = t / t12;
    const Nt = N0 * Math.pow(0.5, n);
    const lambda = Math.log(2) / t12;
    const decayPct = ((N0 - Nt) / N0) * 100;

    return {
      remainingAmount: Nt.toFixed(6),
      decayConstant: lambda.toFixed(6),
      halfLivesElapsed: n.toFixed(2),
      decayPercentage: decayPct.toFixed(2),
    };
  }, [initialAmount, halfLifeTime, totalTime]);

  const decayTable: TableRow[] = useMemo(() => {
    const rows: TableRow[] = [];

    const N0 = parseFloat(initialAmount);
    const t12 = parseFloat(halfLifeTime);
    const t = parseFloat(totalTime);

    if (isNaN(N0) || isNaN(t12) || isNaN(t)) return rows;

    for (let i = 0; i <= t; i += t12) {
      const value = N0 * Math.pow(0.5, i / t12);

      rows.push({
        time: i,
        value: value,
      });
    }

    return rows;
  }, [initialAmount, halfLifeTime, totalTime]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
     

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4">
            <div className="bg-card border rounded-xl p-6">
              <h2 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Clock size={18} /> Parameters
              </h2>

              <div className="space-y-4">
                <InputField
                  label="Initial Amount"
                  value={initialAmount}
                  onChange={setInitialAmount}
                />

                <InputField
                  label="Half Life"
                  value={halfLifeTime}
                  onChange={setHalfLifeTime}
                />

                <InputField
                  label="Total Time"
                  value={totalTime}
                  onChange={setTotalTime}
                />

                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Time Unit
                  </label>

                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full mt-1 p-3 rounded-md bg-secondary border"
                  >
                    <option>seconds</option>
                    <option>minutes</option>
                    <option>hours</option>
                    <option>days</option>
                    <option>years</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowResults(true)}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold flex items-center justify-center gap-2"
                >
                  Calculate <CheckCircle2 size={16} />
                </button>

                <button
                  onClick={() => {
                    setInitialAmount("100");
                    setHalfLifeTime("5");
                    setTotalTime("15");
                    setShowResults(false);
                  }}
                  className="w-full py-2 bg-secondary rounded-md text-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 text-center">
                    <p className="text-xs uppercase text-muted-foreground">
                      Remaining Amount
                    </p>

                    <h2 className="text-4xl font-black text-primary mt-2">
                      {results.remainingAmount}
                    </h2>
                  </div>

                  <div className="bg-card border rounded-xl p-6">
                    <div className="space-y-3">
                      <StatRow
                        label="Half Lives Elapsed"
                        value={results.halfLivesElapsed}
                      />

                      <StatRow
                        label="Decay Constant"
                        value={results.decayConstant}
                      />

                      <StatRow
                        label="Total Decay"
                        value={results.decayPercentage + "%"}
                      />
                    </div>
                  </div>
                </div>

                {/* DECAY TABLE */}
                <div className="bg-card border rounded-xl p-6">
                  <h3 className="font-bold mb-4">Decay Table</h3>

                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Time ({unit})</th>
                        <th className="text-left py-2">Remaining</th>
                      </tr>
                    </thead>

                    <tbody>
                      {decayTable.map((row, i) => (
                        <tr key={i} className="border-b">
                          <td className="py-2">{row.time}</td>
                          <td>{row.value.toFixed(6)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="border-2 border-dashed rounded-xl p-12 text-center">
                <FlaskConical size={48} className="mx-auto opacity-20 mb-4" />

                <p className="text-sm uppercase text-muted-foreground">
                  Enter values and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RELATED CALCULATORS */}
        <div className="mt-12">
          <RelatedCalculators
  calculators={[
    {
      name: "Decay Calculator",
      href: "/calculators/math/decay-calculator",
      description: "Calculate exponential decay of a quantity over time.",
      icon: FlaskConical,
    },
    {
      name: "Exponential Decay Calculator",
      href: "/calculators/math/exponential-decay-calculator",
      description: "Compute exponential decay using decay rate and time.",
      icon: Clock,
    },
    {
      name: "Radioactive Decay Calculator",
      href: "/calculators/math/radioactive-decay-calculator",
      description: "Estimate radioactive decay and remaining material.",
      icon: CheckCircle2,
    },
  ]}
/>


        </div>
      </div>

    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-bold uppercase text-muted-foreground">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 p-3 bg-secondary border rounded-md"
      />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between bg-secondary/50 p-2 rounded">
      <span className="text-xs uppercase text-muted-foreground">{label}</span>

      <span className="font-bold text-primary">{value}</span>
    </div>
  );
}
