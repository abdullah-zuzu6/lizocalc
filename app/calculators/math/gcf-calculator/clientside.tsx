'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  RotateCcw, 
  Info, 
  ListFilter, 
  BarChart3, 
  TrendingDown, 
  Layers, 
  CheckCircle2, 
  ChevronRight, 
  Box,
  Heart,
  Settings2,
  BookOpen
} from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

type GCFResult = {
  gcf: number
  numbers: number[]
  allFactors: { [key: number]: number[] }
}

export default function GCFCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [inputValues, setInputValues] = useState<string>('24, 36, 48')
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const calculatorInfo = {
    name: 'GCF Calculator',
    href: '/calculators/math/gcf-calculator',
    category: 'Math',
  }

  const relatedCalculators = [
    { name: 'LCM Calculator', description: 'Find least common multiple', href: '/calculators/math/lcm-calculator', icon: Layers },
  ]

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

  // --- Cookie & Storage Logic ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['gcf-calc']?.data) {
      setInputValues(history['gcf-calc'].data.inputValues || '24, 36, 48')
    }

    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('gcf-calc', { inputValues })
  }, [inputValues, isMounted])

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

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
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Enter Numbers (commas)</label>
                  <input 
                    type="text" 
                    value={inputValues} 
                    onChange={(e) => { setInputValues(e.target.value); setShowResults(false); }}
                    className="w-full mt-1 px-4 py-3 bg-secondary/50 rounded-xl border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-bold text-lg"
                    placeholder="e.g. 24, 36, 48"
                  />
                  <p className="text-[10px] text-muted-foreground mt-2 px-1 italic">Separated by commas, e.g., 12, 18, 24</p>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={handleCalculate}
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
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

            {/* QUICK HELP */}
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
               <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><BookOpen size={16} className="text-primary"/> Pro Tip</h3>
               <p className="text-xs text-muted-foreground leading-relaxed italic">
                 The GCF is also known as the <strong>Highest Common Factor (HCF)</strong> or <strong>Greatest Common Divisor (GCD)</strong>. It is essential for simplifying fractions to their lowest terms!
               </p>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results && !('error' in results) ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-primary rounded-2xl p-8 flex flex-col justify-center items-center shadow-lg shadow-primary/20 border border-primary/10 text-primary-foreground">
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-widest mb-2">Greatest Common Factor</p>
                    <h2 className="text-7xl font-black tracking-tighter leading-none">
                      {results.gcf}
                    </h2>
                    <div className="mt-4 flex items-center gap-1 text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                      Optimal Divisor
                    </div>
                  </div>

                  <div className="bg-card border rounded-2xl p-6 shadow-sm">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                      <TrendingDown size={14} className="text-primary" /> Visualizing Factor Sets
                    </h3>
                    <div className="space-y-4 overflow-auto max-h-[180px] pr-2 scrollbar-thin scrollbar-thumb-secondary">
                      {Object.entries(results.allFactors).map(([num, factors]) => (
                        <div key={num} className="space-y-2">
                          <span className="text-[10px] font-bold text-muted-foreground">Factors of {num}:</span>
                          <div className="flex flex-wrap gap-1.5">
                              {factors.map(f => (
                                  <span key={f} className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors ${f === results.gcf ? 'bg-primary text-primary-foreground font-black ring-2 ring-primary/20' : 'bg-secondary text-muted-foreground'}`}>
                                      {f}
                                  </span>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* EDUCATIONAL SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-2xl p-8">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <BarChart3 size={20} className="text-primary"/> The Logic
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      The GCF represents the largest integer that can divide all of your inputs without leaving a remainder. In the sets above, you can see the GCF is the <strong>highest value present in every list</strong> of factors.
                    </p>
                  </div>

                  <div className="bg-card border rounded-2xl p-8">
                    <h3 className="font-bold text-lg mb-4">Practical Uses</h3>
                    <div className="space-y-3">
                      {[
                        "Reducing fractions to simplest form.",
                        "Factoring out terms in algebra.",
                        "Dividing items into equal sized groups."
                      ].map((tip, i) => (
                        <div key={i} className="flex gap-3 text-sm text-muted-foreground items-start">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <ChevronRight size={14} className="text-primary" />
                          </div>
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[450px]">
                {results && 'error' in results ? (
                  <div className="text-rose-500 space-y-4 max-w-xs">
                    <Info size={48} className="mx-auto opacity-50" />
                    <p className="text-sm font-bold uppercase tracking-widest">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <Box size={64} className="opacity-5 mb-4 text-primary" />
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em]">Ready for Calculation</p>
                    <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">Enter at least two numbers to find their highest common divisor.</p>
                  </>
                )}
              </div>
            )}
            
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </div>
      </section>
    </main>
  )
}