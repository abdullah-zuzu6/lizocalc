"use client";

import { useState, useEffect } from 'react';
import { Target, Zap, Flame, Scale, RotateCcw, Apple, Beef, Wheat, CheckCircle2, ListFilter } from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies';

export default function MacroCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  
  // --- States ---
  const [tdee, setTdee] = useState<string>('2500');
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const [dietType, setDietType] = useState<'balanced' | 'high-protein' | 'keto' | 'low-carb'>('balanced');
  const [results, setResults] = useState<any>(null);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    
    if (consent?.functional && history['macro-calc']?.data) {
      const d = history['macro-calc'].data;
      setTdee(d.tdee || '2500');
      setGoal(d.goal || 'maintain');
      setDietType(d.dietType || 'balanced');
    }
  }, []);

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

    // Save to Cookies
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory('macro-calc', { tdee, goal, dietType });
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-primary" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Daily Calorie Goal (TDEE)</label>
                  <input type="number" value={tdee} onChange={(e) => setTdee(e.target.value)} className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border font-bold" />
                </div>

                <div>
                  <label className="text-sm font-medium">Primary Goal</label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['lose', 'maintain', 'gain'].map((g) => (
                      <button key={g} onClick={() => setGoal(g as any)} className={`py-2 rounded-md text-xs font-bold capitalize border ${goal === g ? 'bg-primary text-white' : 'bg-secondary'}`}>
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
                      <button key={d.id} onClick={() => setDietType(d.id as any)} className={`flex items-center gap-3 p-3 rounded-md text-sm font-bold border ${dietType === d.id ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary border-transparent'}`}>
                        <d.icon size={16} /> {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={handleCalculate} className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:bg-primary/90 flex items-center justify-center gap-2">
                  Calculate Macros <CheckCircle2 size={16} />
                </button>

                <button onClick={() => {setTdee('2500'); setGoal('maintain'); setDietType('balanced'); setResults(null);}} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-lg">
                  <p className="text-xs font-bold uppercase opacity-70">Target Daily Intake</p>
                  <h2 className="text-5xl font-black my-4">{results.totalCals} <span className="text-lg font-normal">kcal</span></h2>
                  <p className="text-sm opacity-80 font-medium">Goal: {goal} weight ({dietType})</p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Protein', val: results.protein, icon: Beef, color: 'text-rose-500', width: results.ratios.p },
                    { label: 'Carbs', val: results.carbs, icon: Wheat, color: 'text-amber-500', width: results.ratios.c },
                    { label: 'Fats', val: results.fats, icon: Zap, color: 'text-blue-500', width: results.ratios.f }
                  ].map(m => (
                    <div key={m.label} className="bg-card border p-4 rounded-xl">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-bold flex items-center gap-2"><m.icon size={16} className={m.color} /> {m.label}</span>
                        <span className="font-black text-lg">{m.val}g</span>
                      </div>
                      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                        <div style={{ width: `${m.width * 100}%` }} className={`h-full ${m.color.replace('text', 'bg')}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                <Target size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Configure settings and Calculate</p>
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