"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";

export default function FractionCalculator() {
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  /* BASIC FRACTION */

  const [num1, setNum1] = useState(1);
  const [den1, setDen1] = useState(2);
  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(3);

  const [operation, setOperation] = useState<
    "add" | "subtract" | "multiply" | "divide"
  >("add");

  const [result, setResult] = useState<string | null>(null);
  const [decimal, setDecimal] = useState<string | null>(null);

  const calculate = () => {
    let n = 0;
    let d = 1;

    if (operation === "add") {
      n = num1 * den2 + num2 * den1;
      d = den1 * den2;
    }
    if (operation === "subtract") {
      n = num1 * den2 - num2 * den1;
      d = den1 * den2;
    }
    if (operation === "multiply") {
      n = num1 * num2;
      d = den1 * den2;
    }
    if (operation === "divide") {
      n = num1 * den2;
      d = den1 * num2;
    }

    const g = gcd(Math.abs(n), Math.abs(d));

    setResult(`${n / g}/${d / g}`);
    setDecimal((n / d).toFixed(6));
  };

  const resetBasic = () => {
    setNum1(1);
    setDen1(2);
    setNum2(1);
    setDen2(3);
    setResult(null);
    setDecimal(null);
  };

  /* SIMPLIFY FRACTION */

  const [snum, setSnum] = useState(8);
  const [sden, setSden] = useState(12);
  const [simpRes, setSimpRes] = useState<string | null>(null);

  const simplify = () => {
    const g = gcd(snum, sden);

    setSimpRes(`${snum / g}/${sden / g}`);
  };

  const resetSimplify = () => {
    setSnum(8);
    setSden(12);
    setSimpRes(null);
  };

  /* DECIMAL → FRACTION */

  const [dec, setDec] = useState("");
  const [decRes, setDecRes] = useState<string | null>(null);

  const convertDecimal = () => {
    const d = parseFloat(dec);

    if (!d) return;

    const denom = 1000000;
    const num = Math.round(d * denom);

    const g = gcd(num, denom);

    setDecRes(`${num / g}/${denom / g}`);
  };

  const resetDecimal = () => {
    setDec("");
    setDecRes(null);
  };

  /* FRACTION → DECIMAL */

  const [fnum, setFnum] = useState(1);
  const [fden, setFden] = useState(2);
  const [fRes, setFRes] = useState<string | null>(null);

  const convertFraction = () => {
    setFRes((fnum / fden).toFixed(6));
  };

  const resetFraction = () => {
    setFnum(1);
    setFden(2);
    setFRes(null);
  };

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 max-w-5xl mx-auto space-y-10">
      {/* BASIC FRACTION */}

      <section className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Fraction Calculator</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-wrap">
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
            <input
              type="number"
              value={den1}
              onChange={(e) => setDen1(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
          </div>

          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as any)}
            className="bg-secondary p-2 rounded"
          >
            <option value="add">+</option>
            <option value="subtract">−</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>

          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
            <input
              type="number"
              value={den2}
              onChange={(e) => setDen2(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={calculate}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold"
            >
              Calculate
            </button>

            <button
              onClick={resetBasic}
              className="flex items-center gap-2 border px-5 py-2 rounded-xl"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>
        </div>

        {result && (
          <div className="grid sm:grid-cols-2 gap-6 mt-6">
            <div className="bg-secondary p-6 rounded-xl text-center">
              <p className="text-sm text-muted-foreground">Simplified</p>
              <h3 className="text-3xl font-bold text-primary break-words">
                {result}
              </h3>
            </div>

            <div className="bg-secondary p-6 rounded-xl text-center">
              <p className="text-sm text-muted-foreground">Decimal</p>
              <h3 className="text-3xl font-bold text-primary break-words">
                {decimal}
              </h3>
            </div>
          </div>
        )}
      </section>

      {/* SIMPLIFY FRACTION */}

      <section className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Simplify Fraction</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-wrap">
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={snum}
              onChange={(e) => setSnum(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
            <input
              type="number"
              value={sden}
              onChange={(e) => setSden(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={simplify}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold"
            >
              Calculate
            </button>

            <button
              onClick={resetSimplify}
              className="border px-5 py-2 rounded-xl flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {simpRes && (
            <div className="text-2xl font-bold text-primary break-words">
              = {simpRes}
            </div>
          )}
        </div>
      </section>

      {/* DECIMAL TO FRACTION */}

      <section className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Decimal to Fraction</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-wrap">
          <input
            type="number"
            value={dec}
            onChange={(e) => setDec(e.target.value)}
            className="bg-secondary p-2 rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={convertDecimal}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold"
            >
              Calculate
            </button>

            <button
              onClick={resetDecimal}
              className="border px-5 py-2 rounded-xl flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {decRes && (
            <div className="text-2xl font-bold text-primary break-words">
              = {decRes}
            </div>
          )}
        </div>
      </section>

      {/* FRACTION TO DECIMAL */}

      <section className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Fraction to Decimal</h2>

        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center flex-wrap">
          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={fnum}
              onChange={(e) => setFnum(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
            <input
              type="number"
              value={fden}
              onChange={(e) => setFden(+e.target.value)}
              className="bg-secondary p-2 rounded"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={convertFraction}
              className="bg-primary text-primary-foreground px-5 py-2 rounded-xl font-bold"
            >
              Calculate
            </button>

            <button
              onClick={resetFraction}
              className="border px-5 py-2 rounded-xl flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {fRes && (
            <div className="text-2xl font-bold text-primary break-words">
              = {fRes}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
