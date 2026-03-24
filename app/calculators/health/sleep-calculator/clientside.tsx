"use client";

import { useState, useEffect, useMemo } from 'react';
import { Moon, Sun, RotateCcw, CheckCircle2, Bed, Clock, ListFilter, Info } from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies';

type SleepCycle = {
  time: string;
  hours: number;
  cycles: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
};

export default function SleepCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  
  // --- Input States ---
  const [mode, setMode] = useState<'wake' | 'bed'>('wake');
  const [timeValue, setTimeValue] = useState<string>('07:00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();
    if (consent?.functional && history['sleep-calc']?.data) {
      const d = history['sleep-calc'].data;
      setMode(d.mode || 'wake');
      setTimeValue(d.timeValue || '07:00');
      setPeriod(d.period || 'AM');
    }
  }, []);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory('sleep-calc', { mode, timeValue, period });
    }
  };

  // --- Calculation Engine ---
  const sleepOptions = useMemo((): SleepCycle[] => {
    if (trigger === 0) return [];
    let [hours, minutes] = timeValue.split(':').map(Number);
    
    // Convert 12hr to 24hr format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const baseDate = new Date();
    baseDate.setHours(hours, minutes, 0, 0);

    return [6, 5, 4, 3].map(c => {
      const totalMinutes = c * 90 + 15; // 90 min cycles + 15 min buffer
      const targetDate = new Date(baseDate.getTime());
      
      if (mode === 'wake') {
        targetDate.setMinutes(targetDate.getMinutes() - totalMinutes);
      } else {
        targetDate.setMinutes(targetDate.getMinutes() + totalMinutes);
      }

      return {
        time: targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        hours: (c * 90) / 60,
        cycles: c,
        quality: c >= 5 ? 'Excellent' : c === 4 ? 'Good' : c === 3 ? 'Fair' : 'Poor'
      };
    });
  }, [trigger, timeValue, period, mode]);

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
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setMode('wake')} className={`py-2 rounded-md text-xs font-bold border ${mode === 'wake' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Wake Up</button>
                  <button onClick={() => setMode('bed')} className={`py-2 rounded-md text-xs font-bold border ${mode === 'bed' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Bed Time</button>
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="time" 
                    value={timeValue} 
                    onChange={(e) => {setTimeValue(e.target.value); setShowResults(false)}} 
                    className="flex-1 px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  />
                  <select 
                    value={period} 
                    onChange={(e) => {setPeriod(e.target.value as 'AM' | 'PM'); setShowResults(false)}}
                    className="px-3 py-3 bg-secondary rounded-md border font-bold text-lg"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <button onClick={handleCalculate} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  Calculate Cycles <CheckCircle2 size={16} />
                </button>
                <button onClick={() => {setShowResults(false); setTrigger(0);}} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sleepOptions.map((opt, i) => (
                  <div key={i} className="bg-card border rounded-xl p-6 flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-black text-blue-600">{opt.time}</p>
                      <p className="text-[10px] uppercase font-bold text-muted-foreground">{opt.hours} Hours ({opt.cycles} Cycles)</p>
                    </div>
                    <span className="text-[10px] font-black bg-secondary px-2 py-1 rounded uppercase">{opt.quality}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center">
                <Bed size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter time and calculate</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info size={20} className="text-blue-600"/> Sleep Science</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
               
              We move through 90-minute sleep cycles. Waking up at the end of a cycle helps you avoid sleep inertia and feel refreshed.
            </p>
          </div>
          
        </div>
        <RelatedCalculators calculators={[
            { name: 'BMI Calculator', description: 'Health metrics', href: '/calculators/health/bmi-calculator', icon: Clock },
            { name: 'Interest Calculator', description: 'Financial growth', href: '/calculators/financial/interest-calculator', icon: Bed }
          ]} />
      </section>
    </main>
  );
}