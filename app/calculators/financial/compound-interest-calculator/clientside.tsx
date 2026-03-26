'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  TrendingUp, 
  Info, 
  ArrowRightLeft, 
  Percent, 
  RotateCcw, 
  CheckCircle2, 
  ListFilter, 
  BarChart3, 
  Calculator,
  Heart
} from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

type CompoundingPeriod = 'Annually (APY)' | 'Semiannually' | 'Quarterly' | 'Monthly (APR)' | 'Semimonthly' | 'Biweekly' | 'Weekly' | 'Daily' | 'Continuously'

export default function CompoundInterestCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // --- States ---
  const [inputInterest, setInputInterest] = useState<number>(10)
  const [inputCompound, setInputCompound] = useState<CompoundingPeriod>('Monthly (APR)')
  const [outputCompound, setOutputCompound] = useState<CompoundingPeriod>('Annually (APY)')
  const [isSaved, setIsSaved] = useState(false)

  const calculatorInfo = {
    name: "Compound Interest Converter",
    href: "/calculators/financial/compound-interest-calculator",
    category: "Financial",
  }

  const compoundingValues: Record<CompoundingPeriod, number> = {
    'Annually (APY)': 1,
    'Semiannually': 2,
    'Quarterly': 4,
    'Monthly (APR)': 12,
    'Semimonthly': 24,
    'Biweekly': 26,
    'Weekly': 52,
    'Daily': 365.25,
    'Continuously': Infinity
  }

  // --- Initialization & Load History ---
  useEffect(() => {
    setIsMounted(true)
    
    // Load inputs from history
    const history = getCalculatorHistory()
    if (history['compound-interest-calc']?.data) {
      const d = history['compound-interest-calc'].data
      setInputInterest(d.inputInterest || 10)
      setInputCompound(d.inputCompound || 'Monthly (APR)')
      setOutputCompound(d.outputCompound || 'Annually (APY)')
    }

    // Check if favorited
    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('compound-interest-calc', { inputInterest, inputCompound, outputCompound })
  }, [inputInterest, inputCompound, outputCompound, isMounted])

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const r = inputInterest / 100
    const n_in = compoundingValues[inputCompound]
    const n_out = compoundingValues[outputCompound]

    // Calculate Effective Annual Rate (EAR)
    let ear: number
    if (n_in === Infinity) {
      ear = Math.exp(r) - 1
    } else {
      ear = Math.pow(1 + r / n_in, n_in) - 1
    }

    // Calculate Output Rate based on EAR
    let outputRate: number
    if (n_out === Infinity) {
      outputRate = Math.log(1 + ear)
    } else {
      outputRate = n_out * (Math.pow(1 + ear, 1 / n_out) - 1)
    }

    return {
      equivalentRate: (outputRate * 100).toFixed(5),
      dailyInterest: ((ear / 365.25) * 100).toFixed(5)
    }
  }, [inputInterest, inputCompound, outputCompound])

  if (!isMounted) return null

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
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2">
                    Input Interest Rate (%) <Percent size={14} className="text-muted-foreground" />
                  </label>
                  <input 
                    type="number" 
                    value={inputInterest} 
                    onChange={(e) => setInputInterest(Number(e.target.value))}
                    step="0.01"
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Input Frequency</label>
                  <select 
                    value={inputCompound} 
                    onChange={(e) => setInputCompound(e.target.value as CompoundingPeriod)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold focus:ring-2 ring-blue-500/20"
                  >
                    {Object.keys(compoundingValues).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="flex justify-center py-1 opacity-20">
                    <ArrowRightLeft size={20} />
                </div>

                <div>
                  <label className="text-sm font-medium">Output Frequency</label>
                  <select 
                    value={outputCompound} 
                    onChange={(e) => setOutputCompound(e.target.value as CompoundingPeriod)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold focus:ring-2 ring-blue-500/20"
                  >
                    {Object.keys(compoundingValues).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => {setInputInterest(10); setInputCompound('Monthly (APR)'); setOutputCompound('Annually (APY)')}}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-colors"
                  >
                    <RotateCcw size={14} /> Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-8 flex flex-col justify-center text-center shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2">Equivalent Rate</p>
                <h2 className="text-5xl font-black text-blue-600 my-2">{results.equivalentRate}%</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">{outputCompound}</p>
              </div>

              <div className="bg-card border rounded-xl p-8 flex flex-col justify-center text-center shadow-sm relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-2">Daily Interest Rate</p>
                <h2 className="text-5xl font-black text-emerald-600 my-2">{results.dailyInterest}%</h2>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Standard 365.25 Day Year</p>
              </div>
            </div>

            <div className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600"/> Understanding Compounding
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The frequency of compounding significantly impacts the actual return on investment. This tool converts interest rates to allow for an "apples-to-apples" comparison between financial products using different compounding schedules.
              </p>
              
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div className="p-4 bg-secondary/50 rounded-lg border border-dashed">
      <h4 className="text-xs font-bold uppercase mb-2">Nominal Rate (APR)</h4>
      <p className="text-sm text-muted-foreground">The stated interest rate without taking into account the compounding of interest within that year.</p>
  </div>
  <div className="p-4 bg-blue-600/5 rounded-lg border border-blue-600/10">
      <h4 className="text-xs font-bold uppercase mb-2 text-blue-600">Effective Rate (APY)</h4>
      {/* Fixed the CSS Conflict below */}
      <p className="text-sm text-blue-900/70">The actual interest rate earned or paid after compounding has been factored in.</p>
  </div>
</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
            <RelatedCalculators calculators={[
              { name: 'Interest Calculator', description: 'Basic interest calculations' , href: '/calculators/financial/interest-calculator', icon: Percent },
              { name: 'Loan Calculator', description: 'Estimate monthly loan payments', href: '/calculators/financial/loan-calculator', icon: Calculator },
            ]} />
        </div>
      </section>
    </main>
  )
}