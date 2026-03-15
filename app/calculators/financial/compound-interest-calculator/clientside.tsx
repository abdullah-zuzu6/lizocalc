'use client'

import { useState, useMemo, useEffect } from 'react'
import { TrendingUp, Info, ArrowRightLeft, Percent, RotateCcw, CheckCircle2, ListFilter, BarChart3, Calculator } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type CompoundingPeriod = 'Annually (APY)' | 'Semiannually' | 'Quarterly' | 'Monthly (APR)' | 'Semimonthly' | 'Biweekly' | 'Weekly' | 'Daily' | 'Continuously'

export default function CompoundInterestCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // State
  const [inputInterest, setInputInterest] = useState<number>(10)
  const [inputCompound, setInputCompound] = useState<CompoundingPeriod>('Monthly (APR)')
  const [outputCompound, setOutputCompound] = useState<CompoundingPeriod>('Annually (APY)')

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

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['compound-interest-calc']?.data) {
      const d = history['compound-interest-calc'].data
      setInputInterest(d.inputInterest || 10)
      setInputCompound(d.inputCompound || 'Monthly (APR)')
      setOutputCompound(d.outputCompound || 'Annually (APY)')
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('compound-interest-calc', { inputInterest, inputCompound, outputCompound })
    }
  }, [inputInterest, inputCompound, outputCompound, isMounted])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const r = inputInterest / 100
    const n_in = compoundingValues[inputCompound]
    const n_out = compoundingValues[outputCompound]

    let ear: number
    if (n_in === Infinity) {
      ear = Math.exp(r) - 1
    } else {
      ear = Math.pow(1 + r / n_in, n_in) - 1
    }

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
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Input Interest (%)</label>
                  <input 
                    type="number" 
                    value={inputInterest} 
                    onChange={(e) => setInputInterest(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold text-lg"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Input Frequency</label>
                  <select 
                    value={inputCompound} 
                    onChange={(e) => setInputCompound(e.target.value as CompoundingPeriod)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold"
                  >
                    {Object.keys(compoundingValues).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Output Frequency</label>
                  <select 
                    value={outputCompound} 
                    onChange={(e) => setOutputCompound(e.target.value as CompoundingPeriod)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border outline-none font-bold"
                  >
                    {Object.keys(compoundingValues).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <button onClick={() => {setInputInterest(10); setInputCompound('Monthly (APR)'); setOutputCompound('Annually (APY)')}}
                  className="w-full py-2 mt-4 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6 flex flex-col justify-center text-center">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Equivalent Rate</p>
                <h2 className="text-5xl font-black text-blue-600 my-4">{results.equivalentRate}%</h2>
              </div>
              <div className="bg-card border rounded-xl p-6 flex flex-col justify-center text-center">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Daily Interest Rate</p>
                <h2 className="text-5xl font-black text-emerald-600 my-4">{results.dailyInterest}%</h2>
              </div>
            </div>

            <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <BarChart3 size={20} className="text-blue-600"/> Understanding Compounding
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The frequency of compounding significantly impacts the actual return on investment. This tool converts interest rates to allow for an "apples-to-apples" comparison between financial products using different compounding schedules.
              </p>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Interest Calculator', description: 'Basic interest', href: '/calculator/interest', icon: Percent },
          { name: 'Investment Calculator', description: 'Growth projection', href: '/calculator/investment', icon: TrendingUp }
        ]} />
      </section>
    </main>
  )
}