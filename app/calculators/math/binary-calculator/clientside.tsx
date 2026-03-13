"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Binary,
  RotateCcw,
  Info,
  ListFilter,
  Cpu,
  Code,
  Hash,
  CheckCircle2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type BinaryResult = {
  binary: string;
  decimal: string;
  hex: string;
  operation: string;
};

export default function BinaryCalculator() {
  const relatedCalculators = [
    {
      name: "Hex Calculator",
      description: "Base-16 operations",
      href: "/calculators/math/hex-calculator",
      icon: Code,
    },
    {
      name: "Bitwise Calculator",
      description: "AND OR XOR logic",
      href: "/calculators/math/bitwise-calculator",
      icon: Cpu,
    },
  ];

  const [valueA, setValueA] = useState("1010");
  const [valueB, setValueB] = useState("1100");
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [binaryInput, setBinaryInput] = useState("");
  const [decimalResult, setDecimalResult] = useState<number | null>(null);

  const [decimalInput, setDecimalInput] = useState("");
  const [binaryResult, setBinaryResult] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["binary-calc"]?.data) {
      const data = history["binary-calc"].data;

      setValueA(data.valueA || "1010");
      setValueB(data.valueB || "1100");
      setOperator(data.operator || "+");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const consent = getConsentPreference();

    if (consent?.functional) {
      saveCalculatorHistory("binary-calc", {
        valueA,
        valueB,
        operator,
      });
    }
  }, [valueA, valueB, operator, isMounted]);

  const results = useMemo((): BinaryResult | { error: string } | null => {
    if (trigger === 0) return null;

    const numA = parseInt(valueA, 2);
    const numB = parseInt(valueB, 2);

    if (isNaN(numA) || isNaN(numB)) {
      return { error: "Invalid binary number." };
    }

    let result = 0;

    switch (operator) {
      case "+":
        result = numA + numB;
        break;

      case "-":
        result = numA - numB;
        break;

      case "*":
        result = numA * numB;
        break;

      case "/":
        if (numB === 0) {
          return { error: "Cannot divide by zero." };
        }
        result = Math.floor(numA / numB);
        break;
    }

    if (result < 0) {
      return { error: "Negative results are not supported." };
    }

    return {
      binary: result.toString(2),
      decimal: result.toString(10),
      hex: result.toString(16).toUpperCase(),
      operation: `${valueA} ${operator} ${valueB}`,
    };
  }, [trigger]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };
  const convertBinaryToDecimal = () => {
    if (!binaryInput) {
      setDecimalResult(null);
      return;
    }

    const value = parseInt(binaryInput, 2);

    if (isNaN(value)) {
      setDecimalResult(null);
    } else {
      setDecimalResult(value);
    }
  };

  const convertDecimalToBinary = () => {
    const num = parseInt(decimalInput);
    if (!isNaN(num)) setBinaryResult(num.toString(2));
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} />
                Binary Inputs
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Binary A</label>
                  <input
                    value={valueA}
                    onChange={(e) => {
                      setValueA(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Operation</label>
                  <select
                    value={operator}
                    onChange={(e) => {
                      setOperator(e.target.value as any);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">Binary B</label>
                  <input
                    value={valueB}
                    onChange={(e) => {
                      setValueB(e.target.value.replace(/[^01]/g, ""));
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2"
                  >
                    Calculate Binary <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setValueA("");
                      setValueB("");
                      setOperator("+");
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}

          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !("error" in results) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 text-center">
                  <p className="text-xs text-muted-foreground uppercase font-bold">
                    Binary Result
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 mt-3 break-all">
                    {results.binary}
                  </h2>
                </div>

                <div className="bg-card border rounded-xl p-6 space-y-3">
                  <div className="flex justify-between bg-secondary p-2 rounded">
                    <span>Decimal</span>
                    <span className="font-mono text-blue-600 font-bold">
                      {results.decimal}
                    </span>
                  </div>

                  <div className="flex justify-between bg-secondary p-2 rounded">
                    <span>Hex</span>
                    <span className="font-mono text-blue-600 font-bold">
                      0x{results.hex}
                    </span>
                  </div>

                  <div className="flex justify-between bg-secondary p-2 rounded">
                    <span>Operation</span>
                    <span className="font-mono text-blue-600 font-bold">
                      {results.operation}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center">
                <Binary size={48} className="opacity-10 mx-auto mb-4" />
                <p className="font-bold text-muted-foreground">
                  Enter binary values and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CONVERTERS */}

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Binary size={18} className="text-blue-500" /> Convert Binary to
              Decimal
            </h3>

            <input
              value={binaryInput}
              onChange={(e) =>
                setBinaryInput(e.target.value.replace(/[^01]/g, ""))
              }
              className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
            />

            <button
              onClick={convertBinaryToDecimal}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md font-bold"
            >
              Convert
            </button>

            {decimalResult !== null && (
              <p className="mt-4 text-2xl font-black text-blue-600 text-center">
                {decimalResult}
              </p>
            )}
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Hash size={18} className="text-blue-500" /> Convert Decimal to
              Binary
            </h3>

            <input
              type="number"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
              className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
            />

            <button
              onClick={convertDecimalToBinary}
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md font-bold"
            >
              Convert
            </button>

            {binaryResult && (
              <p className="mt-4 text-2xl font-black text-blue-600 text-center break-all">
                {binaryResult}
              </p>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}
