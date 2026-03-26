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
  Heart 
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
  
  // --- States ---
  const [tdee, setTdee] = useState<string>('2500');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [dietType, setDietType] = useState<'balanced' | 'high-protein' | 'keto' | 'low-carb'>('balanced');
  const [results, setResults] = useState<any>(null);
  const [isSaved, setIsSaved] = useState(false);

  const calculatorInfo = {
    name: "Macro Calculator",
    href: "/calculators/health/macro-calculator",
    category: "Health",
  };

  // --- Initialization & Load History ---
  useEffect(() => {
    setIsMounted(true);
    
    // Load inputs from history
    const history = getCalculatorHistory();
    if (history['macro-calc']?.data) {
      const d = history['macro-calc'].data;
      setTdee(d.tdee || '2500');
      setGoal(d.goal || 'maintain');
      setDietType(d.dietType || 'balanced');
    }

    // Check if favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory('macro-calc', { tdee, goal, dietType });
  }, [tdee, goal, dietType, isMounted]);

  // --- Toggle Save Logic ---
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
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE CALCULATOR BUTTON */}
              <button 
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-primary" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Daily Calorie Goal (TDEE)</label>
                  <input 
                    type="number" 
                    value={tdee} 
                    onChange={(e) => setTdee(e.target.value)} 
                    placeholder="e.g. 2500"
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all" 
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['lose', 'maintain', 'gain'].map((g) => (
                      <button 
                        key={g} 
                        onClick={() => setGoal(g as any)} 
                        className={`py-2 rounded-md text-[10px] font-black uppercase tracking-wider border transition-all ${
                          goal === g ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20' : 'bg-secondary border-transparent text-muted-foreground'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Diet Preference</label>
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
                        className={`flex items-center gap-3 p-3 rounded-md text-sm font-bold border transition-all ${
                          dietType === d.id ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-secondary border-transparent text-muted-foreground hover:bg-secondary/80'
                        }`}
                      >
                        <d.icon size={16} /> {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button 
                    onClick={handleCalculate} 
                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Macros <CheckCircle2 size={16} />
                  </button>

                  <button 
                    onClick={() => {setTdee('2500'); setGoal('maintain'); setDietType('balanced'); setResults(null);}} 
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-xl flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Target Daily Intake</p>
                  <h2 className="text-6xl font-black my-4">{results.totalCals} <span className="text-lg font-normal opacity-80">kcal</span></h2>
                  <div className="flex items-center gap-2 text-xs opacity-90 font-bold uppercase tracking-tighter">
                    <span className="bg-white/20 px-2 py-0.5 rounded">{goal} weight</span>
                    <span className="bg-white/20 px-2 py-0.5 rounded">{dietType} diet</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Protein', val: results.protein, icon: Beef, color: 'text-rose-500', bg: 'bg-rose-500', width: results.ratios.p },
                    { label: 'Carbs', val: results.carbs, icon: Wheat, color: 'text-amber-500', bg: 'bg-amber-500', width: results.ratios.c },
                    { label: 'Fats', val: results.fats, icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500', width: results.ratios.f }
                  ].map(m => (
                    <div key={m.label} className="bg-card border p-5 rounded-xl shadow-sm">
                      <div className="flex justify-between items-end mb-3">
                        <span className="text-sm font-bold flex items-center gap-2">
                          <m.icon size={18} className={m.color} /> {m.label}
                        </span>
                        <div className="text-right">
                          <span className="font-black text-2xl leading-none">{m.val}g</span>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase">{Math.round(m.width * 100)}% of total</p>
                        </div>
                      </div>
                      <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                        <div 
                          style={{ width: `${m.width * 100}%` }} 
                          className={`h-full ${m.bg} transition-all duration-500 ease-out`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                <Target size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Adjust the parameters and click calculate</p>
              </div>
            )}

            {/* Educational Section */}
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Apple size={20} className="text-primary" /> Understanding Macronutrients
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Macronutrients—protein, carbohydrates, and fats—are the building blocks of your diet. Each plays a critical role in your body: 
                <strong> Protein</strong> supports muscle repair, <strong>Carbohydrates</strong> provide quick energy, and <strong>Fats</strong> are essential for hormone production and long-term health.
              </p>
              

[Image of macronutrient breakdown]

            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <RelatedCalculators calculators={[
            { name: 'TDEE Calculator', description: 'Find your daily energy burn', href: '/calculators/health/tdee-calculator', icon: Flame },
            { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculators/health/bmi-calculator', icon: Scale }
          ]} />
        </div>
      </section>
    </main>
  );
}