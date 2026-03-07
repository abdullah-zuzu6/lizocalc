'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ChevronRight, Calculator, Zap, CheckCircle2, Layers, ListFilter } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type LCMResult = {
  lcm: number
  numbers: number[]
  primeFactors: { [key: number]: string }
  calculationMethod: string
}

export default function LCMCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [inputValues, setInputValues] = useState<string>('12, 18, 24')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => (!b ? a : getGCD(b, a % b))
  const getLCM = (a: number, b: number): number => (a * b) / getGCD(a, b)

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

  // --- Calculation Engine ---
  const results = useMemo((): LCMResult | { error: string } | null => {
    const nums = inputValues
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0)

    if (nums.length < 2) return null
    if (nums.some(n => n > 10000)) return { error: "Please use numbers below 10,000 for performance." }

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
      primeFactors: factorMap,
      calculationMethod: "Prime Factorization"
    }
  }, [inputValues])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            LCM <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Find the smallest positive integer that is divisible by all numbers in your set. Useful for fraction arithmetic and scheduling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Least Common Multiple</span>
                    <h3 className="text-6xl font-black mt-2 tracking-tighter">
                      {results.lcm}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Input Set</p>
                        <p className="text-lg font-bold">{results.numbers.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Factor breakdown</h4>
                   <div className="space-y-3">
                      {Object.entries(results.primeFactors).map(([num, factors]) => (
                        <div key={num} className="flex justify-between items-center p-2 bg-muted/50 rounded-lg">
                          <span className="text-xs font-bold">{num}:</span>
                          <span className="text-xs font-mono text-primary">{factors}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                {results && 'error' in results ? (
                    <div className="text-rose-500 space-y-2">
                        <Info size={40} className="mx-auto" />
                        <p className="text-xs font-bold uppercase tracking-widest">{results.error}</p>
                    </div>
                ) : (
                    <>
                        <Layers size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Numbers</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Hash size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ListFilter size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Integer Input</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Numbers</div>
                    <input 
                      type="text" 
                      value={inputValues} 
                      onChange={(e) => {setInputValues(e.target.value); setShowResults(false)}}
                      className="w-full pl-24 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 10, 15, 20"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest ml-2">Separate your numbers with commas</p>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate LCM <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setInputValues('');}}
                    className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Clear
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Understanding LCM</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        The Least Common Multiple (LCM) is the smallest number that is a multiple of two or more numbers. For example, the multiples of 4 are 4, 8, 12, 16... and the multiples of 6 are 6, 12, 18... The smallest number they share is <strong>12</strong>.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-sm">Formula: LCM(a, b) = (|a × b|) / GCD(a, b)</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Practical Uses</h3>
                    <div className="space-y-4">
                        <TipItem text="Fractions: Finding the Least Common Denominator (LCD) to add or subtract fractions." />
                        <TipItem text="Scheduling: Determining when two events with different frequencies will happen at the same time again." />
                        <TipItem text="Gear Ratios: Calculating when teeth on different sized gears will return to their starting position." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'GCD Calculator', description: 'Greatest Common Divisor', href: '/calculator/gcd', icon: Layers },
          { name: 'Factor Solver', description: 'Find all prime factors', href: '/calculator/factors', icon: Hash }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-muted/50 rounded-2xl border border-border text-sm leading-relaxed text-muted-foreground hover:border-primary/30 transition-colors">
      <ChevronRight size={18} className="text-primary shrink-0" />
      <p>{text}</p>
    </div>
  )
}