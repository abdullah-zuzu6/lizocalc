"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  Moon, 
  Sun, 
  RotateCcw, 
  CheckCircle2, 
  Bed, 
  Clock, 
  ListFilter, 
  Info, 
  Heart 
} from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage';

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
  const [isSaved, setIsSaved] = useState(false);
  
  // --- Input States ---
  const [mode, setMode] = useState<'wake' | 'bed'>('wake');
  const [timeValue, setTimeValue] = useState<string>('07:00');
  const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

  // --- Calculator Metadata for Saving ---
  const calculatorInfo = {
    name: "Sleep Calculator",
    href: "/calculators/health/sleep-calculator", // Ensure this matches your route
    category: "Health",
  };

  // --- Initialize & Load History/Saved Status ---
  useEffect(() => {
    setIsMounted(true);
    
    // Load inputs from history
    const history = getCalculatorHistory();
    if (history['sleep-calc']?.data) {
      const d = history['sleep-calc'].data;
      setMode(d.mode || 'wake');
      setTimeValue(d.timeValue || '07:00');
      setPeriod(d.period || 'AM');
      setShowResults(true);
      setTrigger(1);
    }

    // Check if tool is favorited
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
    // Auto-save to history on calculation
    saveCalculatorHistory('sleep-calc', { mode, timeValue, period });
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
        quality: c >= 6 ? 'Excellent' : c === 5 ? 'Excellent' : c === 4 ? 'Good' : 'Fair'
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
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setMode('wake')} 
                    className={`py-2 rounded-md text-xs font-bold border transition-all ${mode === 'wake' ? 'bg-blue-600 text-white border-blue-600' : 'bg-secondary border-transparent text-muted-foreground'}`}
                  >
                    Wake Up At
                  </button>
                  <button 
                    onClick={() => setMode('bed')} 
                    className={`py-2 rounded-md text-xs font-bold border transition-all ${mode === 'bed' ? 'bg-blue-600 text-white border-blue-600' : 'bg-secondary border-transparent text-muted-foreground'}`}
                  >
                    Go to Bed At
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="time" 
                    value={timeValue} 
                    onChange={(e) => {setTimeValue(e.target.value); setShowResults(false)}} 
                    className="flex-1 px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none font-bold text-lg transition-all"
                  />
                  <select 
                    value={period} 
                    onChange={(e) => {setPeriod(e.target.value as 'AM' | 'PM'); setShowResults(false)}}
                    className="px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 outline-none font-bold text-lg transition-all"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <button 
                    onClick={handleCalculate} 
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate Cycles <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setTrigger(0);}} 
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {sleepOptions.map((opt, i) => (
                  <div key={i} className="bg-card border rounded-xl p-6 flex justify-between items-center shadow-sm hover:border-blue-500/30 transition-colors">
                    <div>
                      <p className="text-3xl font-black text-blue-600">{opt.time}</p>
                      <p className="text-[10px] uppercase font-black text-muted-foreground mt-1 tracking-wider">
                        {opt.hours} Hours ({opt.cycles} Cycles)
                      </p>
                    </div>
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                      opt.quality === 'Excellent' ? 'bg-green-100 text-green-700' : 
                      opt.quality === 'Good' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {opt.quality}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
                <Bed size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter your {mode === 'wake' ? 'desired wake up time' : 'target bedtime'} to see suggested cycles
                </p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8 shadow-sm">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Info size={20} className="text-blue-600"/> Sleep Science
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Human sleep follows roughly 90-minute cycles, transitioning from light sleep to deep sleep and REM. Waking up during a deep sleep stage often results in "sleep inertia"—that groggy, tired feeling. 
              <br/><br/>
              This calculator suggests times that align with the <strong>end</strong> of a cycle, assuming it takes the average person about <strong>15 minutes</strong> to fall asleep.
            </p>
          </div>
          <div className="bg-card border rounded-xl p-8 shadow-sm flex flex-col justify-center">
             <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-50 rounded-full text-blue-600"><Moon size={24}/></div>
                <div>
                  <h4 className="font-bold text-sm">Sleep Hygiene Tip</h4>
                  <p className="text-xs text-muted-foreground">Keep your room cool (around 18°C) and dark for better cycle quality.</p>
                </div>
             </div>
             <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-full text-orange-600"><Sun size={24}/></div>
                <div>
                  <h4 className="font-bold text-sm">Morning Routine</h4>
                  <p className="text-xs text-muted-foreground">Exposure to natural sunlight within 30 minutes of waking helps reset your circadian rhythm.</p>
                </div>
             </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
            { name: 'BMI Calculator', description: 'Body health metrics', href: '/calculators/health/bmi-calculator', icon: Clock },
            { name: 'Body Fat Calculator', description: 'Navy Method estimator', href: '/calculators/health/body-fat-calculator', icon: Bed }
          ]} />
      </section>
    </main>
  );
}