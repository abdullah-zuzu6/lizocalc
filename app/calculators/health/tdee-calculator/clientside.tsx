"use client";

import { useState, useEffect } from 'react';
import { 
  Activity, User, Target, RotateCcw, Zap, Flame, Scale, 
  ListFilter, CheckCircle2, BarChart3 
} from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies';

export default function TDEECalculator() {
  // --- States ---
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<string>('25');
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [activity, setActivity] = useState<string>('1.375');
  
  // State to hold finalized results
  const [results, setResults] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  const relatedCalculators = [
    { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculators/health/bmi-calculator', icon: User },
    { name: 'Macro Calculator', description: 'Detailed macro percentage splits', href: '/calculators/health/macros-calculator', icon: Target }
  ];

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    
    if (consent?.functional && history['tdee-calc']?.data) {
      const d = history['tdee-calc'].data;
      setGender(d.gender || 'male');
      setAge(d.age || '25');
      setWeight(d.weight || '70');
      setHeight(d.height || '175');
      setActivity(d.activity || '1.375');
    }
  }, []);

  // --- Calculation Logic ---
  const handleCalculate = () => {
    const a = parseFloat(age) || 0;
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const mult = parseFloat(activity) || 1.2;

    if (!a || !w || !h) return;

    // Mifflin-St Jeor
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    const tdee = bmr * mult;
    const bmi = w / ((h / 100) ** 2);

    const calcResults = {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      macros: {
        protein: Math.round((tdee * 0.3) / 4),
        fats: Math.round((tdee * 0.25) / 9),
        carbs: Math.round((tdee * 0.45) / 4)
      }
    };

    setResults(calcResults);

    // Save to Cookies
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory('tdee-calc', { gender, age, weight, height, activity });
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div className="flex bg-secondary p-1 rounded-lg">
                  {(['male', 'female'] as const).map((g) => (
                    <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 text-sm font-bold rounded-md capitalize ${gender === g ? "bg-background shadow" : ""}`}>
                      {g}
                    </button>
                  ))}
                </div>

                {[{ label: "Age", val: age, set: setAge }, { label: "Weight (kg)", val: weight, set: setWeight }, { label: "Height (cm)", val: height, set: setHeight }].map(f => (
                  <div key={f.label}>
                    <label className="text-sm font-medium">{f.label}</label>
                    <input type="number" value={f.val} onChange={(e) => f.set(e.target.value)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium">Activity Level</label>
                  <select value={activity} onChange={(e) => setActivity(e.target.value)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold">
                    <option value="1.2">Sedentary</option>
                    <option value="1.375">Light Exercise</option>
                    <option value="1.55">Moderate Exercise</option>
                    <option value="1.725">Heavy Exercise</option>
                    <option value="1.9">Athlete</option>
                  </select>
                </div>

                <button 
                  onClick={handleCalculate}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                >
                  Calculate TDEE <CheckCircle2 size={16} />
                </button>

                <button onClick={() => {setAge('25'); setWeight('70'); setHeight('175'); setResults(null);}} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-primary rounded-xl p-8 text-primary-foreground">
                  <p className="text-xs font-bold uppercase opacity-70">Daily Maintenance</p>
                  <h2 className="text-5xl font-black my-4">{results.tdee} <span className="text-lg font-normal">kcal</span></h2>
                  <div className="flex gap-6 pt-4 border-t border-white/20">
                    <div><p className="text-[10px] uppercase font-bold opacity-60">BMR</p><p className="font-bold">{results.bmr}</p></div>
                    <div><p className="text-[10px] uppercase font-bold opacity-60">BMI</p><p className="font-bold">{results.bmi}</p></div>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Protein', val: results.macros.protein, icon: Zap, color: 'text-blue-500' },
                    { label: 'Carbs', val: results.macros.carbs, icon: Flame, color: 'text-amber-500' },
                    { label: 'Fats', val: results.macros.fats, icon: Target, color: 'text-rose-500' }
                  ].map(m => (
                    <div key={m.label} className="bg-card border p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3"><m.icon className={m.color} size={20}/><span className="font-bold">{m.label}</span></div>
                      <span className="font-black text-lg">{m.val}g</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center h-full flex flex-col items-center justify-center">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter details and click Calculate</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Scale size={20} className="text-blue-600"/> What is TDEE?</h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your TDEE is the total energy (calories) your body burns in a day, including physical activity and basic metabolic processes.
              </p>
            </div>
            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4">Goal Setting</h3>
              <p className="text-sm text-muted-foreground">Adjust your daily intake by ±500 calories for effective weight loss or muscle gain phases.</p>
            </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}