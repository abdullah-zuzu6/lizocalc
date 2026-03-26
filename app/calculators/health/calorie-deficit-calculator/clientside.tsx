"use client";

import { useState, useEffect } from 'react';
import { 
  Target, 
  Zap, 
  Flame, 
  Scale, 
  RotateCcw, 
  Apple, 
  Beef, 
  Wheat, 
  CheckCircle2, 
  ListFilter, 
  Info, 
  HelpCircle,
  Heart,
  Activity
} from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage';

export default function MacroCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // --- States ---
  const [tdee, setTdee] = useState<string>('2500');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [dietType, setDietType] = useState<'balanced' | 'high-protein' | 'keto' | 'low-carb'>('balanced');
  const [results, setResults] = useState<any>(null);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Macro Calculator",
    href: "/calculators/health/macro-calculator",
    category: "Health",
  };

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    
    if (history['macro-calc']?.data) {
      const d = history['macro-calc'].data;
      setTdee(d.tdee || '2500');
      setGoal(d.goal || 'maintain');
      setDietType(d.dietType || 'balanced');
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const handleCalculate = () => {
    const calories = parseFloat(tdee) || 0;
    if (!calories) return;

    let targetCalories = calories;
    if (goal === 'lose') targetCalories -= 500;
    if (goal === 'gain') targetCalories += 500;

    let ratios = { p: 0.30, c: 0.40, f: 0.30 };
    if (dietType === 'high-protein') ratios = { p: 0.40, c: 0.35, f: 0.25 };
    if (dietType === 'keto') ratios = { p: 0.25, c: 0.05, f: 0.70 };
    if (dietType === 'low-carb') ratios = { p: 0.35, c: 0.20, f: 0.45 };

    const calcResults = {
      totalCals: Math.round(targetCalories),
      protein: Math.round((targetCalories * ratios.p) / 4),
      carbs: Math.round((targetCalories * ratios.c) / 4),
      fats: Math.round((targetCalories * ratios.f) / 9),
      ratios
    };

    setResults(calcResults);

    // Save to History (Functional logic)
    saveCalculatorHistory('macro-calc', { tdee, goal, dietType });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">
                    Daily Calorie Goal (TDEE)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={tdee} 
                      onChange={(e) => setTdee(e.target.value)} 
                      className="w-full p-4 bg-secondary rounded-xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 pr-16" 
                    />
                    <span className="absolute right-4 top-5 text-xs font-bold text-muted-foreground uppercase">kcal</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(['lose', 'maintain', 'gain'] as const).map((g) => (
                      <button 
                        key={g} 
                        onClick={() => setGoal(g)} 
                        className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter border transition-all ${
                          goal === g ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20' : 'bg-secondary border-transparent text-muted-foreground'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Diet Preference</label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {[
                      { id: 'balanced', label: 'Balanced (30/40/30)', icon: Apple },
                      { id: 'high-protein', label: 'High Protein (40/35/25)', icon: Beef },
                      { id: 'low-carb', label: 'Low Carb (35/20/45)', icon: Scale },
                      { id: 'keto', label: 'Ketogenic (25/5/70)', icon: Zap },
                    ].map((d) => (
                      <button 
                        key={d.id} 
                        onClick={() => setDietType(d.id as any)} 
                        className={`flex items-center gap-4 p-4 rounded-xl text-sm font-bold border transition-all ${
                          dietType === d.id ? 'bg-blue-600/10 border-blue-600 text-blue-600' : 'bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <d.icon size={18} /> {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button 
                    onClick={handleCalculate} 
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Macros <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setTdee('2500'); setGoal('maintain'); setDietType('balanced'); setResults(null);}} 
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-xl flex flex-col justify-center relative overflow-hidden">
                    <Activity className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10" />
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.3em]">Target Daily Intake</p>
                    <h2 className="text-7xl font-black my-4 tracking-tighter">
                      {results.totalCals} <span className="text-xl font-medium opacity-70">kcal</span>
                    </h2>
                    <p className="text-sm font-bold bg-white/10 self-start px-3 py-1 rounded-full backdrop-blur-sm capitalize">
                      {goal} weight • {dietType.replace('-', ' ')}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { label: 'Protein', val: results.protein, icon: Beef, color: 'text-rose-500', bg: 'bg-rose-500', width: results.ratios.p },
                      { label: 'Carbs', val: results.carbs, icon: Wheat, color: 'text-amber-500', bg: 'bg-amber-500', width: results.ratios.c },
                      { label: 'Fats', val: results.fats, icon: Zap, color: 'text-blue-400', bg: 'bg-blue-400', width: results.ratios.f }
                    ].map(m => (
                      <div key={m.label} className="bg-card border p-5 rounded-2xl shadow-sm">
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                            <m.icon size={16} className={m.color} /> {m.label}
                          </span>
                          <span className="font-black text-2xl tracking-tight">{m.val}<span className="text-sm text-muted-foreground ml-0.5">g</span></span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            style={{ width: `${m.width * 100}%` }} 
                            className={`h-full transition-all duration-1000 ease-out ${m.bg}`} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* EDUCATIONAL SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <Info size={20} /> Why Macros Matter
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        While calories determine weight change, macronutrients determine body composition. Protein repairs muscle, carbohydrates provide energy, and fats support hormones.
                      </p>
                    </div>
                    <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
                      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                        <HelpCircle size={20} /> Popular Diet Splits
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Adjust your intake based on your specific needs—like high protein for muscle growth or Keto for metabolic adaptation.
                      </p>
                    </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Target size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Configure settings and click Calculate
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'TDEE Calculator', description: 'Find your daily energy burn', href: '/calculators/health/tdee-calculator', icon: Flame },
          { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculators/health/bmi-calculator', icon: Scale }
        ]} />
      </section>
    </main>
  );
}