"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Code,
  RotateCcw,
  
  Hash,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type HexResult = {
  hex: string;
  decimal: string;
  binary: string;
  operation: string;
};

export default function HexCalculator() {
  const relatedCalculators = [
    {
      name: "Binary Calculator",
      description: "Base-2 arithmetic",
      href: "/calculators/math/binary-calculator",
      icon: Cpu,
    },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const [valueA, setValueA] = useState("1A");
  const [valueB, setValueB] = useState("F2");
  const [operator, setOperator] = useState<"+" | "-" | "*" | "/">("+");

  const [hexInput, setHexInput] = useState("");
  const [decimalResult, setDecimalResult] = useState<number | null>(null);

  const [decimalInput, setDecimalInput] = useState("");
  const [hexResult, setHexResult] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);

    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["hex-calc"]?.data) {
      const data = history["hex-calc"].data;

      setValueA(data.valueA || "1A");
      setValueB(data.valueB || "F2");
      setOperator(data.operator || "+");
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const consent = getConsentPreference();

    if (consent?.functional) {
      saveCalculatorHistory("hex-calc", {
        valueA,
        valueB,
        operator,
      });
    }
  }, [valueA, valueB, operator, isMounted]);

  const results = useMemo((): HexResult | { error: string } | null => {
    if (!showResults) return null;

    const numA = parseInt(valueA, 16);
    const numB = parseInt(valueB, 16);

    if (isNaN(numA) || isNaN(numB))
      return { error: "Invalid hexadecimal value" };

    let res = 0;

    switch (operator) {
      case "+":
        res = numA + numB;
        break;
      case "-":
        res = numA - numB;
        break;
      case "*":
        res = numA * numB;
        break;
      case "/":
        if (numB === 0) return { error: "Cannot divide by zero" };
        res = Math.floor(numA / numB);
        break;
    }

    if (res < 0) return { error: "Negative result not supported" };

    return {
      hex: res.toString(16).toUpperCase(),
      decimal: res.toString(10),
      binary: res.toString(2).padStart(8, "0"),
      operation: `0x${valueA} ${operator} 0x${valueB}`,
    };
  }, [showResults, valueA, valueB, operator]);

  const convertHexToDecimal = () => {
    if (!hexInput) {
      setDecimalResult(null);
      return;
    }

    const value = parseInt(hexInput, 16);

    if (isNaN(value)) setDecimalResult(null);
    else setDecimalResult(value);
  };

  const convertDecimalToHex = () => {
    if (!decimalInput) {
      setHexResult(null);
      return;
    }

    const value = parseInt(decimalInput);

    if (isNaN(value)) setHexResult(null);
    else setHexResult(value.toString(16).toUpperCase());
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* RESULTS PANEL */}

          <div className="lg:col-span-4">
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6">
                <div className="bg-primary text-white rounded-3xl p-8">
                  <p className="text-xs uppercase font-bold opacity-70">
                    Hex Result
                  </p>

                  <h2 className="text-5xl font-black mt-2">0x{results.hex}</h2>

                  <div className="mt-6 bg-white/10 p-4 rounded-xl">
                    <p className="text-xs uppercase opacity-60">Decimal</p>

                    <p className="text-xl font-bold">{results.decimal}</p>
                  </div>
                </div>

                <div className="bg-card border rounded-3xl p-6">
                  <StatRow label="Binary Bits" value={results.binary} />
                  <StatRow label="Operation" value={results.operation} />
                </div>
              </div>
            ) : (
              <div className="border-dashed border-2 rounded-3xl p-12 text-center">
                <Code size={48} className="opacity-10 mx-auto mb-4" />

                <p className="text-sm font-bold text-muted-foreground">
                  Enter hex values and click compute
                </p>
              </div>
            )}
          </div>

          {/* INPUT PANEL */}

          <div className="lg:col-span-8">
            <div className="bg-card border rounded-3xl p-10">
              <div className="grid md:grid-cols-12 gap-4 items-end">
                <div className="md:col-span-5">
                  <InputField
                    label="Hex A"
                    value={valueA}
                    onChange={(v) => {
                      setValueA(v);
                      setShowResults(false);
                    }}
                  />
                </div>

                <div className="md:col-span-2">
                  <select
                    value={operator}
                    onChange={(e) => {
                      setOperator(e.target.value as any);
                      setShowResults(false);
                    }}
                    className="w-full p-4 bg-secondary rounded-xl text-center font-bold"
                  >
                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">×</option>
                    <option value="/">÷</option>
                  </select>
                </div>

                <div className="md:col-span-5">
                  <InputField
                    label="Hex B"
                    value={valueB}
                    onChange={(v) => {
                      setValueB(v);
                      setShowResults(false);
                    }}
                  />
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <button
                  onClick={() => setShowResults(true)}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  Compute Hex <CheckCircle2 size={18} />
                </button>

                <button
                  onClick={() => {
                    setValueA("");
                    setValueB("");
                    setOperator("+");
                    setShowResults(false);
                  }}
                  className="flex-1 py-4 bg-secondary rounded-2xl font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CONVERSION TOOLS */}

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Hash size={18} /> Convert Hexadecimal to Decimal
            </h3>

            <input
              value={hexInput}
              onChange={(e) =>
                setHexInput(e.target.value.replace(/[^0-9a-fA-F]/g, ""))
              }
              className="w-full p-3 border rounded-md bg-secondary"
            />

            <button
              onClick={convertHexToDecimal}
              className="w-full mt-4 py-3 bg-primary text-white rounded-md font-bold"
            >
              Convert
            </button>

            {decimalResult !== null && (
              <p className="mt-4 text-2xl font-black text-center text-primary">
                {decimalResult}
              </p>
            )}
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Hash size={18} /> Convert Decimal to Hexadecimal
            </h3>

            <input
              type="number"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
              className="w-full p-3 border rounded-md bg-secondary"
            />

            <button
              onClick={convertDecimalToHex}
              className="w-full mt-4 py-3 bg-primary text-white rounded-md font-bold"
            >
              Convert
            </button>

            {hexResult && (
              <p className="mt-4 text-2xl font-black text-center text-primary">
                0x{hexResult}
              </p>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
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
      <label className="text-sm font-bold text-muted-foreground">{label}</label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value.replace(/[^0-9a-fA-F]/g, "").toUpperCase())
        }
        className="w-full mt-1 p-4 bg-secondary rounded-xl font-bold"
      />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between p-3 bg-secondary rounded-xl mt-2">
      <span className="text-xs font-bold text-muted-foreground uppercase">
        {label}
      </span>

      <span className="font-mono text-primary font-bold">{value}</span>
    </div>
  );
}
