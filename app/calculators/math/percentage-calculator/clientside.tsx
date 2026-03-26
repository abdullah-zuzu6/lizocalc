'use client';

import { useState, useEffect } from "react";
import { 
  Percent, 
  ListFilter, 
  ArrowLeftRight, 
  TrendingUp, 
  CheckCircle2, 
  RotateCcw, 
  Settings2, 
  Heart,
  TrendingDown,
  Info
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from "@/lib/storage";

export default function PercentageCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const [pOf, setPOf] = useState({ p: 10, n: 100, res: null as number | null });
  const [whatPct, setWhatPct] = useState({ part: 20, whole: 50, res: null as number | null });
  const [diff, setDiff] = useState({ v1: 100, v2: 150, res: null as number | null });
  const [change, setChange] = useState({ old: 100, new: 120, res: null as number | null });

  const calculatorInfo = {
    name: 'Percentage Calculator',
    href: '/calculators/math/percentage-calculator',
    category: 'Math',
  };

  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history["pct-calc"]?.data) {
      const d = history["pct-calc"].data;
      setPOf(d.pOf); setWhatPct(d.whatPct); setDiff(d.diff); setChange(d.change);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const persistData = (data: any) => {
    saveCalculatorHistory("pct-calc", data);
  };

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const handleCalculate = (section: string) => {
    let newState = { pOf, whatPct, diff, change };
    if (section === 'pOf') newState.pOf = { ...pOf, res: (pOf.p * pOf.n) / 100 };
    if (section === 'whatPct') newState.whatPct = { ...whatPct, res: (whatPct.part / whatPct.whole) * 100 };
    if (section === 'diff') newState.diff = { ...diff, res: (Math.abs(diff.v1 - diff.v2) / ((diff.v1 + diff.v2) / 2)) * 100 };
    if (section === 'change') newState.change = { ...change, res: ((change.new - change.old) / change.old) * 100 };

    setPOf(newState.pOf); setWhatPct(newState.whatPct); setDiff(newState.diff); setChange(newState.change);
    persistData(newState);
  };

  const handleReset = (section: string) => {
    let newState = { pOf, whatPct, diff, change };
    if (section === 'pOf') newState.pOf = { p: 10, n: 100, res: null };
    if (section === 'whatPct') newState.whatPct = { part: 20, whole: 50, res: null };
    if (section === 'diff') newState.diff = { v1: 100, v2: 150, res: null };
    if (section === 'change') newState.change = { old: 100, new: 120, res: null };

    setPOf(newState.pOf); setWhatPct(newState.whatPct); setDiff(newState.diff); setChange(newState.change);
    persistData(newState);
  };

  const related = [
    { name: "Fraction Calculator", description: "Operations with fractions", href: "/calculators/math/fraction-calculator", icon: Percent },
    { name: "LCM Calculator", description: "Find Least Common Multiple", href: "/calculators/math/lcm-calculator", icon: ListFilter },
  ];

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-4xl mx-auto">
        
        {/* HEADER AREA */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <Percent className="text-blue-600" size={32} /> Percentage Toolkit
            </h1>
            <p className="text-muted-foreground mt-2">Comprehensive solvers for every percentage scenario.</p>
          </div>
          <button 
            onClick={handleToggleSave}
            className={`p-3 rounded-xl transition-all border ${
              isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
            }`}
          >
            <Heart size={24} className={isSaved ? "fill-current" : ""} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 1. Percentage of Number */}
          <CalcCard 
            title="Percentage of" 
            icon={<Percent size={18} className="text-blue-500" />}
            onReset={() => handleReset('pOf')}
          >
            <div className="flex items-center gap-2 mb-4">
              <input type="number" value={pOf.p} onChange={(e) => setPOf({...pOf, p: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold text-lg text-center" />
              <span className="font-bold text-muted-foreground">% of</span>
              <input type="number" value={pOf.n} onChange={(e) => setPOf({...pOf, n: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold text-lg text-center" />
            </div>
            <button onClick={() => handleCalculate('pOf')} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-blue-900/10">
              <CheckCircle2 size={16}/> Calculate
            </button>
            {pOf.res !== null && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center animate-in fade-in zoom-in-95 duration-200">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Result</p>
                <p className="text-3xl font-black text-blue-700 dark:text-blue-300">{pOf.res.toLocaleString()}</p>
              </div>
            )}
          </CalcCard>

          {/* 2. Percentage Phrases */}
          <CalcCard 
            title="Phrases" 
            icon={<ListFilter size={18} className="text-blue-500" />}
            onReset={() => handleReset('whatPct')}
          >
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3">
                <input type="number" value={whatPct.part} onChange={(e) => setWhatPct({...whatPct, part: Number(e.target.value)})} className="flex-1 p-3 bg-secondary/50 rounded-lg border font-bold text-lg" />
                <span className="text-sm font-bold text-muted-foreground uppercase">Is what % of</span>
              </div>
              <input type="number" value={whatPct.whole} onChange={(e) => setWhatPct({...whatPct, whole: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold text-lg" />
            </div>
            <button onClick={() => handleCalculate('whatPct')} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16}/> Calculate
            </button>
            {whatPct.res !== null && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">Percentage</p>
                <p className="text-3xl font-black text-blue-700">{whatPct.res.toFixed(2)}%</p>
              </div>
            )}
          </CalcCard>

          {/* 3. Percentage Difference */}
          <CalcCard 
            title="Difference" 
            icon={<ArrowLeftRight size={18} className="text-blue-500" />}
            onReset={() => handleReset('diff')}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Value 1</label>
                <input type="number" value={diff.v1} onChange={(e) => setDiff({...diff, v1: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Value 2</label>
                <input type="number" value={diff.v2} onChange={(e) => setDiff({...diff, v2: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold" />
              </div>
            </div>
            <button onClick={() => handleCalculate('diff')} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16}/> Calculate
            </button>
            {diff.res !== null && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
                <p className="text-xs font-black uppercase tracking-widest text-blue-600">Difference</p>
                <p className="text-3xl font-black text-blue-700">{diff.res.toFixed(2)}%</p>
              </div>
            )}
          </CalcCard>

          {/* 4. Percentage Change */}
          <CalcCard 
            title="Change" 
            icon={<TrendingUp size={18} className="text-blue-500" />}
            onReset={() => handleReset('change')}
          >
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">Old Value</label>
                <input type="number" value={change.old} onChange={(e) => setChange({...change, old: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-muted-foreground ml-1">New Value</label>
                <input type="number" value={change.new} onChange={(e) => setChange({...change, new: Number(e.target.value)})} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold" />
              </div>
            </div>
            <button onClick={() => handleCalculate('change')} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16}/> Calculate
            </button>
            {change.res !== null && (
              <div className={`mt-4 p-4 rounded-lg text-center ${change.res >= 0 ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-rose-50 dark:bg-rose-950/30'}`}>
                <p className={`text-xs font-black uppercase tracking-widest flex items-center justify-center gap-1 ${change.res >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {change.res >= 0 ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
                  {change.res >= 0 ? 'Increase' : 'Decrease'}
                </p>
                <p className={`text-3xl font-black ${change.res >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                  {Math.abs(change.res).toFixed(2)}%
                </p>
              </div>
            )}
          </CalcCard>

        </div>

        {/* INFO SECTION */}
        <div className="mt-12 bg-card border rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info className="text-blue-600"/> Formula Guide</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <p className="font-bold text-foreground mb-1">Difference vs Change</p>
                <p>Percentage **Difference** is used when comparing two values of equal importance. Percentage **Change** is used when there is an "Old" and "New" reference point.</p>
              </div>
              <div>
                <p className="font-bold text-foreground mb-1">Phrases</p>
                <p>Commonly used for tax calculations or tips: "$20 is what percent of $100?" allows you to work backwards from a known part.</p>
              </div>
            </div>
        </div>

        <div className="mt-12">
          <RelatedCalculators calculators={related} />
        </div>
      </section>
    </main>
  );
}

function CalcCard({ title, icon, children, onReset }: { title: string, icon: React.ReactNode, children: React.ReactNode, onReset: () => void }) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-black uppercase tracking-[0.2em] flex items-center gap-2 text-muted-foreground">
          {icon} {title}
        </h2>
        <button onClick={onReset} className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-foreground transition-all">
          <RotateCcw size={16} />
        </button>
      </div>
      {children}
    </div>
  );
}