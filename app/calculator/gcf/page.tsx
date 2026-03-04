'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ChevronRight, Calculator, Zap, CheckCircle2, ListFilter, Box } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type GCFResult = {
  gcf: number
  numbers: number[]
  allFactors: { [key: number]: number[] }
  steps: string[]
}

export default function GCFCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [inputValues, setInputValues] = useState<string>('24, 36, 48')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Helper Functions ---
  const getGCD = (a: number, b: number): number => {
    a = Math.abs(a)
    b = Math.abs(b)
    while (b) {
      a %= b
      ;[a, b] = [b, a]
    }
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

  // --- Calculation Engine ---
  const results = useMemo((): GCFResult | { error: string } | null => {
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
      allFactors: factorMap,
      steps: [
        `Identify common factors for the set: ${nums.join(', ')}`,
        `Apply Euclidean algorithm: GCD of inputs is ${finalGCF}`
      ]
    }
  }, [inputValues])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            GCF <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Find the Greatest Common Factor (GCF/GCD) for a set of numbers. Essential for simplifying fractions and factoring polynomials.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Greatest Common Factor</span>
                    <h3 className="text-6xl font-black mt-2 tracking-tighter">
                      {results.gcf}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Numbers Processed</p>
                        <p className="text-lg font-bold">{results.numbers.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Factor Sets</h4>
                   <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {Object.entries(results.allFactors).map(([num, factors]) => (
                        <div key={num} className="space-y-1">
                          <span className="text-[10px] font-bold text-muted-foreground">Factors of {num}:</span>
                          <div className="flex flex-wrap gap-1">
                            {factors.map(f => (
                                <span key={f} className={`px-2 py-0.5 rounded text-[10px] font-mono ${f === results.gcf ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'}`}>
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
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                {results && 'error' in results ? (
                    <div className="text-rose-500 space-y-2">
                        <Info size={40} className="mx-auto" />
                        <p className="text-xs font-bold uppercase tracking-widest">{results.error}</p>
                    </div>
                ) : (
                    <>
                        <Box size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Input Numbers to Start</p>
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
                  <h2 className="text-xl font-bold tracking-tight">Integer Set</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Values</div>
                    <input 
                      type="text" 
                      value={inputValues} 
                      onChange={(e) => {setInputValues(e.target.value); setShowResults(false)}}
                      className="w-full pl-24 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 12, 24, 48"
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest ml-2">Use commas to separate multiple integers</p>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Find GCF <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setInputValues('');}}
                    className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Reset
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">How GCF Works</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        The Greatest Common Factor is the largest number that divides exactly into two or more numbers. It is often found by listing all factors or using the prime factorization method.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-sm">Example: GCF(12, 18) = 6</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">When to use GCF</h3>
                    <div className="space-y-4">
                        <TipItem text="Simplifying Fractions: Divide the numerator and denominator by their GCF to get the simplest form." />
                        <TipItem text="Distribution: Organizing different items into the largest possible equal groups." />
                        <TipItem text="Algebra: Factoring out common terms from equations or polynomials." />
                    </div>
                    
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'LCM Calculator', description: 'Least Common Multiple', href: '/calculator/lcm', icon: Zap },
          { name: 'Prime Factors', description: 'Find prime factorization', href: '/calculator/factors', icon: Hash }
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