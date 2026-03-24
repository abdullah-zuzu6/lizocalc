"use client";

import { useState, useEffect } from "react";
import { Percent, ListFilter, ArrowLeftRight, TrendingUp, CheckCircle2, RotateCcw } from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from "@/lib/cookies";

export default function PercentageCalculator() {
  const [isMounted, setIsMounted] = useState(false);

  const [pOf, setPOf] = useState({ p: 10, n: 100, res: null as number | null });
  const [whatPct, setWhatPct] = useState({ part: 20, whole: 50, res: null as number | null });
  const [diff, setDiff] = useState({ v1: 100, v2: 150, res: null as number | null });
  const [change, setChange] = useState({ old: 100, new: 120, res: null as number | null });

  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history["pct-calc"]?.data) {
      const d = history["pct-calc"].data;
      setPOf(d.pOf); setWhatPct(d.whatPct); setDiff(d.diff); setChange(d.change);
    }
  }, []);

  const syncCookies = (data: any) => {
    if (getConsentPreference()?.functional) {
      saveCalculatorHistory("pct-calc", data);
    }
  };

  const handleCalculate = (section: string) => {
    let newState = { pOf, whatPct, diff, change };
    if (section === 'pOf') newState.pOf = { ...pOf, res: (pOf.p * pOf.n) / 100 };
    if (section === 'whatPct') newState.whatPct = { ...whatPct, res: (whatPct.part / whatPct.whole) * 100 };
    if (section === 'diff') newState.diff = { ...diff, res: (Math.abs(diff.v1 - diff.v2) / ((diff.v1 + diff.v2) / 2)) * 100 };
    if (section === 'change') newState.change = { ...change, res: ((change.new - change.old) / change.old) * 100 };

    setPOf(newState.pOf); setWhatPct(newState.whatPct); setDiff(newState.diff); setChange(newState.change);
    syncCookies(newState);
  };

  const handleReset = (section: string) => {
    let newState = { pOf, whatPct, diff, change };
    if (section === 'pOf') newState.pOf = { p: 10, n: 100, res: null };
    if (section === 'whatPct') newState.whatPct = { part: 20, whole: 50, res: null };
    if (section === 'diff') newState.diff = { v1: 100, v2: 150, res: null };
    if (section === 'change') newState.change = { old: 100, new: 120, res: null };

    setPOf(newState.pOf); setWhatPct(newState.whatPct); setDiff(newState.diff); setChange(newState.change);
    syncCookies(newState);
  };

  const related = [
    { name: "Fraction Calculator", description: "Operations with fractions", href: "/calculators/math/fraction-calculator", icon: Percent },
    { name: "LCM Calculator", description: "Find Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: ListFilter },
  ];

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* 1. Percentage of Number */}
        <section className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Percent className="text-blue-500" /> Percentage of a Number</h2>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <input type="number" value={pOf.p} onChange={(e) => setPOf({...pOf, p: Number(e.target.value)})} className="w-20 sm:w-24 p-2 bg-secondary rounded border" /> %
            <span>of</span>
            <input type="number" value={pOf.n} onChange={(e) => setPOf({...pOf, n: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" />
            <button onClick={() => handleCalculate('pOf')} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded font-bold flex items-center gap-2 min-w-[120px] justify-center"><CheckCircle2 size={16}/> Calculate</button>
            <button onClick={() => handleReset('pOf')} className="p-2 bg-secondary rounded"><RotateCcw size={16}/></button>
          </div>
          {pOf.res !== null && <p className="font-bold text-lg text-blue-600">Result: {pOf.res}</p>}
        </section>

        {/* 2. Percentage Phrases */}
        <section className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ListFilter className="text-blue-500" /> Percentage Phrases</h2>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <input type="number" value={whatPct.part} onChange={(e) => setWhatPct({...whatPct, part: Number(e.target.value)})} className="w-20 sm:w-24 p-2 bg-secondary rounded border" /> is what % of
            <input type="number" value={whatPct.whole} onChange={(e) => setWhatPct({...whatPct, whole: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" />?
            <button onClick={() => handleCalculate('whatPct')} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded font-bold flex items-center gap-2 min-w-[120px] justify-center"><CheckCircle2 size={16}/> Calculate</button>
            <button onClick={() => handleReset('whatPct')} className="p-2 bg-secondary rounded"><RotateCcw size={16}/></button>
          </div>
          {whatPct.res !== null && <p className="font-bold text-lg text-blue-600">Result: {whatPct.res.toFixed(2)}%</p>}
        </section>

        {/* 3. Percentage Difference */}
        <section className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><ArrowLeftRight className="text-blue-500" /> Percentage Difference</h2>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <input type="number" value={diff.v1} onChange={(e) => setDiff({...diff, v1: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" placeholder="Val 1" />
            <input type="number" value={diff.v2} onChange={(e) => setDiff({...diff, v2: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" placeholder="Val 2" />
            <button onClick={() => handleCalculate('diff')} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded font-bold flex items-center gap-2 min-w-[120px] justify-center"><CheckCircle2 size={16}/> Calculate</button>
            <button onClick={() => handleReset('diff')} className="p-2 bg-secondary rounded"><RotateCcw size={16}/></button>
          </div>
          {diff.res !== null && <p className="font-bold text-lg text-blue-600">Difference: {diff.res.toFixed(2)}%</p>}
        </section>

        {/* 4. Percentage Change */}
        <section className="bg-card border rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><TrendingUp className="text-blue-500" /> Percentage Change</h2>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <input type="number" value={change.old} onChange={(e) => setChange({...change, old: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" placeholder="Old" />
            <input type="number" value={change.new} onChange={(e) => setChange({...change, new: Number(e.target.value)})} className="w-24 sm:w-28 p-2 bg-secondary rounded border" placeholder="New" />
            <button onClick={() => handleCalculate('change')} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white rounded font-bold flex items-center gap-2 min-w-[120px] justify-center"><CheckCircle2 size={16}/> Calculate</button>
            <button onClick={() => handleReset('change')} className="p-2 bg-secondary rounded"><RotateCcw size={16}/></button>
          </div>
          {change.res !== null && <p className="font-bold text-lg text-blue-600">Change: {change.res.toFixed(2)}%</p>}
        </section>

        <RelatedCalculators calculators={related} />
      </div>
    </main>
  );
}