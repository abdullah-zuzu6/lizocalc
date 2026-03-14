"use client";

import { useState, useEffect, useMemo } from 'react';
import { Beer, Clock, RotateCcw, Info, ListFilter, AlertTriangle, User, Scale, CheckCircle2, Activity } from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies';

type Drink = {
  id: string;
  type: 'Beer' | 'Wine' | 'Liquor';
  amount: string;
  size: number;
  abv: string;
};

export default function BACCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  // --- States ---
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [hours, setHours] = useState<string>('');
  const [drinks, setDrinks] = useState<Drink[]>([{ id: '1', type: 'Beer', amount: '2', size: 330, abv: '5' }]);

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history['bac-calc']?.data) {
      const d = history['bac-calc'].data;
      setGender(d.gender || 'male');
      setWeight(d.weight || '');
      setHours(d.hours || '');
      setDrinks(d.drinks || []);
    }
  }, []);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory('bac-calc', { gender, weight, hours, drinks });
    }
  };

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null;
    const w = parseFloat(weight) || 0;
    const t = parseFloat(hours) || 0;
    if (w <= 0) return null;
    
    const r = gender === 'male' ? 0.68 : 0.55;
    let totalAlcoholGrams = 0;
    drinks.forEach(d => {
      totalAlcoholGrams += (parseFloat(d.amount) * d.size) * (parseFloat(d.abv) / 100) * 0.789;
    });
    
    let bac = ((totalAlcoholGrams / (w * 1000 * r)) * 100) - (t * 0.015);
    bac = Math.max(0, bac);
    
    return {
      bac: bac.toFixed(3),
      timeToSober: (bac / 0.015).toFixed(1),
      isIllegal: bac >= 0.08,
      status: bac === 0 ? "Sober" : bac < 0.05 ? "Tipsy" : bac < 0.08 ? "Impaired" : "Danger"
    };
  }, [trigger, gender, weight, hours, drinks]);

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ListFilter className="text-blue-500" size={20} /> Parameters</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setGender('male')} className={`py-2 rounded-md text-sm font-bold border ${gender === 'male' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Male</button>
                  <button onClick={() => setGender('female')} className={`py-2 rounded-md text-sm font-bold border ${gender === 'female' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Female</button>
                </div>
                <input type="number" value={weight} onChange={(e) => {setWeight(e.target.value); setShowResults(false)}} placeholder="Enter body weight (kg) e.g. 70" className="w-full px-3 py-3 bg-secondary rounded-md border font-bold" />
                <input type="number" value={hours} onChange={(e) => {setHours(e.target.value); setShowResults(false)}} placeholder="Hours since first drink" className="w-full px-3 py-3 bg-secondary rounded-md border font-bold" />
                
                <button onClick={handleCalculate} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 flex items-center justify-center gap-2">
                  Calculate BAC <CheckCircle2 size={16} />
                </button>
                <button onClick={() => {setShowResults(false); setTrigger(0);}} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`rounded-xl p-8 text-white ${results.isIllegal ? 'bg-red-600' : 'bg-blue-600'}`}>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Estimated BAC</p>
                  <h2 className="text-6xl font-black my-4">{results.bac}%</h2>
                  <p className="font-bold uppercase tracking-widest">{results.status}</p>
                </div>
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase">Time to Sobriety</p>
                  <h3 className="text-4xl font-black text-blue-600 mt-2">{results.timeToSober} Hours</h3>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter data and click calculate</p>
              </div>
            )}
          </div>
        </div>
        
        {/* EDUCATIONAL */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-card border rounded-xl p-8">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info size={20} className="text-blue-600"/> The Widmark Formula</h3>
                <code className="block p-4 bg-secondary rounded-lg text-xs font-bold text-blue-600 mb-4">BAC = [Alcohol(g) / (Weight(g) * r)] * 100 - (Time * 0.015)</code>
                <p className="text-sm text-muted-foreground">This formula provides an estimation based on standard physiological constants. Always use caution.</p>
            </div>
            <div className="bg-card border rounded-xl p-8">
                <h3 className="font-bold text-xl mb-4 flex items-center gap-2 text-red-600"><AlertTriangle size={20}/> Important Disclaimer</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                    This calculator is for informational purposes only. Factors like food, metabolism, and health condition significantly affect real BAC levels. <strong>Do not use this to determine driving eligibility.</strong>
                </p>
            </div>
        </div>

        {/* RELATED CALCULATORS */}
        <div className="mt-12">
          <RelatedCalculators calculators={[
            { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculator/bmi', icon: Activity },
            { name: 'Calorie Calculator', description: 'Total daily energy needs', href: '/calculator/calorie', icon: Scale },
            { name: 'Macros Calculator', description: 'Track your nutrients', href: '/calculator/macros', icon: User }
          ]} />
        </div>
      </section>
    </main>
  );
}