"use client";

import { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  RotateCcw, 
  Info, 
  ListFilter, 
  CheckCircle2, 
  DollarSign, 
  Calendar, 
  Heart 
} from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage';

const simplifiedCpiData: Record<number, number> = {
  1913: 9.9, 1920: 17.9, 1930: 16.7, 1940: 14.0, 1950: 24.1, 1960: 29.6, 
  1970: 38.8, 1980: 82.4, 1990: 130.7, 2000: 172.2, 2010: 218.056, 
  2015: 237.017, 2016: 240.007, 2017: 245.120, 2018: 251.107, 2019: 255.657, 
  2020: 258.811, 2021: 270.970, 2022: 292.655, 2023: 304.7, 2024: 314.1, 
  2025: 324.5, 2026: 335.0
};

export default function InflationCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  // --- Input States ---
  const [currency, setCurrency] = useState('$');
  const [cpiAmount, setCpiAmount] = useState<number>(100);
  const [cpiFromYear, setCpiFromYear] = useState<number>(2016);
  const [cpiToYear, setCpiToYear] = useState<number>(2026);
  const [cpiResult, setCpiResult] = useState<any>(null);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Inflation Calculator",
    href: "/calculators/financial/inflation-calculator",
    category: "Financial",
  };

  // --- Initialize & Load ---
  useEffect(() => {
    setIsMounted(true);
    
    const history = getCalculatorHistory();
    if (history['inflation-calc']?.data) {
      const d = history['inflation-calc'].data;
      setCurrency(d.currency || '$');
      setCpiAmount(d.cpiAmount || 100);
      setCpiFromYear(d.cpiFromYear || 2016);
      setCpiToYear(d.cpiToYear || 2026);
      // Auto-trigger calculation if data exists
      calculateInflation(d.cpiAmount, d.cpiFromYear, d.cpiToYear);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const calculateInflation = (amt: number, fromYear: number, toYear: number) => {
    const from = simplifiedCpiData[fromYear];
    const to = simplifiedCpiData[toYear];
    if (from && to) {
      const futureValue = amt * (to / from);
      const totalInflation = ((to - from) / from) * 100;
      setCpiResult({
        val: futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        pct: totalInflation.toFixed(1)
      });
      saveCalculatorHistory('inflation-calc', { currency, cpiAmount: amt, cpiFromYear: fromYear, cpiToYear: toYear });
    }
  };

  const handleReset = () => {
    setCpiResult(null);
    setCpiAmount(100);
    setCpiFromYear(2016);
    setCpiToYear(2026);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              {/* SAVE BUTTON */}
              <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Symbol</label>
                    <input 
                      maxLength={3} 
                      value={currency} 
                      onChange={e => setCurrency(e.target.value)} 
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-black text-center focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Initial Amount</label>
                    <input 
                      type="number" 
                      value={cpiAmount} 
                      onChange={e => setCpiAmount(Number(e.target.value))} 
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">From Year</label>
                    <select 
                      value={cpiFromYear} 
                      onChange={e => setCpiFromYear(Number(e.target.value))} 
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                    >
                      {Object.keys(simplifiedCpiData).reverse().map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">To Year</label>
                    <select 
                      value={cpiToYear} 
                      onChange={e => setCpiToYear(Number(e.target.value))} 
                      className="w-full p-3 bg-secondary/50 rounded-lg border border-border font-bold focus:border-blue-500 outline-none transition-all"
                    >
                      {Object.keys(simplifiedCpiData).reverse().map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <button 
                    onClick={() => calculateInflation(cpiAmount, cpiFromYear, cpiToYear)} 
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate Buying Power <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={handleReset} 
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {cpiResult ? (
              <div className="bg-card border rounded-xl p-8 text-center shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-3">Equivalent Purchasing Power</p>
                <h2 className="text-6xl font-black text-blue-600 tracking-tighter mb-4">
                  <span className="text-3xl mr-1 align-top mt-2 inline-block opacity-50">{currency}</span>
                  {cpiResult.val}
                </h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                  <TrendingUp size={16} />
                  +{cpiResult.pct}% Total Inflation
                </div>
                <p className="text-sm mt-6 text-muted-foreground leading-relaxed">
                  Due to inflation, {currency}{cpiAmount.toLocaleString()} in {cpiFromYear} has the same purchasing power as <span className="text-foreground font-bold">{currency}{cpiResult.val}</span> in {cpiToYear}.
                </p>
              </div>
            ) : (
              <div className="h-full min-h-[300px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                <TrendingUp size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-black uppercase tracking-widest">Adjust for inflation across time</p>
              </div>
            )}
            
            <section className="bg-card border rounded-xl p-8 shadow-sm">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <Info className="text-blue-600" size={20}/> How it works
              </h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                This calculator uses the Consumer Price Index (CPI) to track the change in the cost of a "basket of goods" over time. 
                The result represents the amount of money needed today to equal the purchasing power of a specific amount in the past.
              </p>
            
            </section>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Loan Calculator', description: 'Personal loan payments', href: '/calculators/financial/loan-calculator', icon: DollarSign },
          { name: 'Mortgage Calculator', description: 'Home financing breakdown', href: '/calculators/financial/mortgage-calculator', icon: Calendar }
        ]} />
      </section>
    </main>
  );
}