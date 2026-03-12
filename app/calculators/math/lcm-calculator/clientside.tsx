'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ListFilter, BarChart3, TrendingDown, Layers, CheckCircle2 } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type LCMResult = {
  lcm: number
  numbers: number[]
  primeFactors: { [key: number]: string }
}

export default function LCMCalculator() {
  const relatedCalculators = [
    { name: 'GCF Calculator', description: 'Greatest Common Factor', href: '/calculators/math/gcf-calculator', icon: Layers },
    { name: 'Factor Solver', description: 'Find all prime factors', href: '/calculator/factors', icon: Hash },
    { name: 'Interest Calculator', description: 'Calculate compound interest', href: '/calculators/financial/interest-calculator', icon: BarChart3 },
  ]

  // --- States ---
  const [inputValues, setInputValues] = useState<string>('12, 18, 24')
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0) // Used to trigger useMemo manually

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => (!b ? a : getGCD(b, a % b))
  const getLCM = (a: number, b: number): number => (a === 0 || b === 0) ? 0 : Math.abs(a * b) / getGCD(a, b)

  const getPrimeFactors = (n: number) => {
    const factors: { [key: number]: number } = {}
    let d = 2
    let temp = n
    while (temp >= 2) {
      if (temp % d === 0) {
        factors[d] = (factors[d] || 0) + 1
        temp /= d
      } else {
        d++
      }
    }
    return factors
  }

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['lcm-calc']?.data) {
      setInputValues(history['lcm-calc'].data.inputValues || '12, 18, 24')
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('lcm-calc', { inputValues })
    }
  }, [inputValues, isMounted])

  // --- Calculation Engine ---
  const results = useMemo((): LCMResult | { error: string } | null => {
    if (trigger === 0) return null // Don't calculate on initial load unless triggered

    const nums = inputValues
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0)

    if (nums.length < 2) return null
    
    // Check for safe integer limits for standard JS numbers
    const finalLCM = nums.reduce((acc, curr) => getLCM(acc, curr))
    
    const factorMap: { [key: number]: string } = {}
    nums.forEach(n => {
      const factors = getPrimeFactors(n)
      factorMap[n] = Object.entries(factors)
        .map(([base, exp]) => `${base}${exp > 1 ? `^${exp}` : ''}`)
        .join(' × ')
    })

    return {
      lcm: finalLCM,
      numbers: nums,
      primeFactors: factorMap
    }
  }, [trigger]) // Only recalculate when button is clicked

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
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Enter Numbers (commas)</label>
                  <input 
                    type="text" 
                    value={inputValues} 
                    onChange={(e) => { setInputValues(e.target.value); setShowResults(false); }}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold text-lg"
                    placeholder="e.g. 12, 18, 24"
                  />
                  <p className="text-[10px] text-muted-foreground uppercase mt-2 tracking-wider">Separate numbers with a comma</p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate LCM <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => { setInputValues(''); setShowResults(false); setTrigger(0); }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
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
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center min-w-0">
                  <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">Least Common Multiple (LCM)</p>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-blue-600 text-center my-4 break-all px-2 tracking-tighter leading-tight">
                    {results.lcm.toLocaleString()}
                  </h2>
                </div>

                <div className="bg-card border rounded-xl p-6 flex flex-col">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                    <TrendingDown size={14} className="text-blue-500" /> Prime Factorization
                  </h3>
                  <div className="space-y-3 overflow-auto max-h-[150px] pr-2">
                    {Object.entries(results.primeFactors).map(([num, factors]) => (
                      <div key={num} className="flex justify-between items-center p-2 bg-secondary/50 rounded-lg border border-border/50">
                        <span className="text-sm font-bold">{num}</span>
                        <span className="text-sm font-mono text-blue-600 font-bold">{factors}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                {results && 'error' in results ? (
                  <div className="text-red-500 space-y-2">
                    <Info size={40} className="mx-auto" />
                    <p className="text-sm font-bold uppercase tracking-widest">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <Layers size={48} className="opacity-10 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter numbers and click calculate</p>
                  </>
                )}
              </div>
            )}

            {/* QUICK STATS / INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-4 rounded-lg border min-w-0">
                <p className="text-xs text-muted-foreground uppercase font-bold">Numbers Analyzed</p>
                <p className="text-xl font-bold break-all">{results && !('error' in results) ? results.numbers.length : 0}</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg border min-w-0">
                <p className="text-xs text-muted-foreground uppercase font-bold">Status</p>
                <p className="text-xl font-bold text-green-600 font-mono tracking-tighter">READY</p>
              </div>
            </div>
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600"/> What is LCM?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The <strong>Least Common Multiple (LCM)</strong> is the smallest positive integer that is evenly divisible by all the numbers in a given set. It is essential for solving problems involving fractions and synchronized timing.
            </p>
            <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
              <code className="text-blue-600 font-bold text-xs uppercase">Formula: LCM(a, b) = (|a × b|) / GCD(a, b)</code>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">Quick Tips</h3>
            <div className="space-y-3">
              {[
                "Use LCM to find the Least Common Denominator (LCD).",
                "Useful in scheduling events that repeat at different intervals.",
                "Helps in gear ratio calculations and circular motion."
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm text-muted-foreground items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
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