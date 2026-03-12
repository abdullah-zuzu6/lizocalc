'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ListFilter, BarChart3, TrendingDown, Layers, CheckCircle2, ChevronRight, Box } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type GCFResult = {
  gcf: number
  numbers: number[]
  allFactors: { [key: number]: number[] }
}

export default function GCFCalculator() {
  const relatedCalculators = [
    { name: 'LCM Calculator', description: 'Least Common Multiple', href: '/calculators/math/lcm-calculator', icon: Layers },
    { name: 'Factor Solver', description: 'Find all prime factors', href: '/calculator/factors', icon: Hash },
    { name: 'Interest Calculator', description: 'Calculate compound interest', href: '/calculators/financial/interest-calculator', icon: BarChart3 },
  ]

  // --- States ---
  const [inputValues, setInputValues] = useState<string>('24, 36, 48')
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { a %= b; [a, b] = [b, a]; }
    return a
  }

  const getAllFactors = (n: number): number[] => {
    const factors: number[] = []
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i)
        if (i !== n / i) factors.push(n / i)
      }
    }
    return factors.sort((a, b) => a - b)
  }

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['gcf-calc']?.data) {
      setInputValues(history['gcf-calc'].data.inputValues || '24, 36, 48')
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('gcf-calc', { inputValues })
    }
  }, [inputValues, isMounted])

  // --- Calculation Engine ---
  const results = useMemo((): GCFResult | { error: string } | null => {
    if (trigger === 0) return null

    const nums = inputValues
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0)

    if (nums.length < 2) return null
    if (nums.some(n => n > 1000000)) return { error: "Please use numbers below 1,000,000." }

    const finalGCF = nums.reduce((acc, curr) => getGCD(acc, curr))
    
    const factorMap: { [key: number]: number[] } = {}
    nums.forEach(n => {
      factorMap[n] = getAllFactors(n)
    })

    return {
      gcf: finalGCF,
      numbers: nums,
      allFactors: factorMap
    }
  }, [trigger])

  const handleCalculate = () => {
    setTrigger(prev => prev + 1)
    setShowResults(true)
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-primary" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Enter Numbers (commas)</label>
                  <input 
                    type="text" 
                    value={inputValues} 
                    onChange={(e) => { setInputValues(e.target.value); setShowResults(false); }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-xl border focus:ring-2 ring-primary/20 outline-none transition-all font-bold text-lg"
                    placeholder="e.g. 24, 36, 48"
                  />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={handleCalculate}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:bg-primary/90 shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    Calculate GCF <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => { setInputValues(''); setShowResults(false); setTrigger(0); }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !('error' in results) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-2xl p-6 flex flex-col justify-center min-w-0 shadow-sm">
                  <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">Greatest Common Factor</p>
                  <h2 className="text-5xl md:text-6xl font-black text-primary text-center my-4 break-all px-2 tracking-tighter leading-tight">
                    {results.gcf}
                  </h2>
                </div>

                <div className="bg-card border rounded-2xl p-6 flex flex-col shadow-sm">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                    <TrendingDown size={14} className="text-primary" /> Factor Sets
                  </h3>
                  <div className="space-y-4 overflow-auto max-h-[150px] pr-2">
                    {Object.entries(results.allFactors).map(([num, factors]) => (
                      <div key={num} className="space-y-1">
                        <span className="text-[10px] font-bold text-muted-foreground">Factors of {num}:</span>
                        <div className="flex flex-wrap gap-1">
                            {factors.map(f => (
                                <span key={f} className={`px-2 py-0.5 rounded text-[10px] font-mono ${f === results.gcf ? 'bg-primary text-primary-foreground font-bold' : 'bg-secondary text-muted-foreground'}`}>
                                    {f}
                                </span>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                {results && 'error' in results ? (
                  <div className="text-rose-500 space-y-2">
                    <Info size={40} className="mx-auto" />
                    <p className="text-sm font-bold uppercase tracking-widest">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <Box size={48} className="opacity-10 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter numbers and calculate</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary"/> What is GCF?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The <strong>Greatest Common Factor (GCF)</strong> is the largest number that divides exactly into two or more integers. 
            </p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <h3 className="font-bold text-xl mb-4">Quick Tips</h3>
            <div className="space-y-3">
              {["Simplifying Fractions: Divide by GCF.", "Organizing into equal groups.", "Polynomial factoring."].map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm text-muted-foreground items-start">
                  <ChevronRight size={18} className="text-primary shrink-0" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  )
}