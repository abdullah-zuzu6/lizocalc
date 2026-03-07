'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ChevronRight, Calculator, Zap, CheckCircle2, Layers, ListFilter } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Define the shape of our calculation results for TS safety
type ProbResult = {
  permutation: string
  combination: string
  permutationRep: string
  combinationRep: string
  n: number
  r: number
}

export default function PermutationCombinationCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [totalN, setTotalN] = useState<string>('10')
  const [selectR, setSelectR] = useState<string>('3')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Factorial Helper for BigInt (to handle huge numbers without loss) ---
  const bigFactorial = (num: number): bigint => {
    let result = BigInt(1)
    for (let i = 2; i <= num; i++) result *= BigInt(i)
    return result
  }

  // --- Calculation Engine ---
  const results = useMemo((): ProbResult | { error: string } | null => {
    const n = parseInt(totalN)
    const r = parseInt(selectR)

    if (isNaN(n) || isNaN(r)) return null
    if (n < 0 || r < 0) return { error: "Numbers must be positive." }
    if (r > n) return { error: "Items to select (r) cannot exceed total items (n)." }
    // Cap at 500 for performance (BigInt can handle more, but loops get heavy)
    if (n > 500) return { error: "Number too large for real-time calculation (Max n=500)." }

    try {
      const nFact = bigFactorial(n)
      const rFact = bigFactorial(r)
      const nrFact = bigFactorial(n - r)

      // 1. Standard Permutation (nPr): n! / (n-r)!
      const p = nFact / nrFact

      // 2. Standard Combination (nCr): n! / (r!(n-r)!)
      const c = p / rFact

      // 3. Permutation with Repetition (n^r)
      // FIX FOR ERROR 2791: Using manual multiplication instead of **
      let pRep = BigInt(1)
      for (let i = 0; i < r; i++) {
        pRep *= BigInt(n)
      }

      // 4. Combination with Repetition: (n+r-1)! / (r!(n-1)!)
      const nrPlusOneFact = bigFactorial(n + r - 1)
      const nMinusOneFact = bigFactorial(n - 1)
      const cRep = nrPlusOneFact / (rFact * nMinusOneFact)

      return {
        permutation: p.toLocaleString(),
        combination: c.toLocaleString(),
        permutationRep: pRep.toLocaleString(),
        combinationRep: cRep.toLocaleString(),
        n,
        r
      }
    } catch (e) {
      return { error: "Calculation overflow or error." }
    }
  }, [totalN, selectR])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Permutation & <span className="text-primary">Combination</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calculate the possible arrangements and selections for any set of items with high-precision BigInt logic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Combinations (nCr)</span>
                    <h3 className="text-4xl font-black mt-2 tracking-tighter break-all">
                      {results.combination}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Permutations (nPr)</p>
                        <p className="text-xl font-bold">{results.permutation}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">With Repetition</h4>
                   <div className="space-y-3">
                      <StatRow label="Comb. (Rep)" value={results.combinationRep} />
                      <StatRow label="Perm. (Rep)" value={results.permutationRep} />
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
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Set n and r to Solve</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Calculator size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ListFilter size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Logic Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Total (n)</div>
                    <input 
                      type="number" 
                      value={totalN} 
                      onChange={(e) => {setTotalN(e.target.value); setShowResults(false)}}
                      className="w-full pl-28 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Sample (r)</div>
                    <input 
                      type="number" 
                      value={selectR} 
                      onChange={(e) => {setSelectR(e.target.value); setShowResults(false)}}
                      className="w-full pl-28 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Solve Probability <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setTotalN(''); setSelectR('');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">Understanding the Math</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Permutations are for when <strong>order matters</strong> (like a race or a combination lock), while combinations are for when <strong>grouping matters</strong> (like choosing team members).
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <p className="text-[10px] font-bold uppercase opacity-60">Permutation Formula</p>
                            <code className="text-primary font-bold">n! / (n - r)!</code>
                        </div>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                            <p className="text-[10px] font-bold uppercase opacity-60">Combination Formula</p>
                            <code className="text-primary font-bold">n! / [r! (n - r)!]</code>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Key Differences</h3>
                    [Image showing difference between permutation and combination using examples like selecting ice cream flavors vs arranging ice cream scoops]
                    <div className="space-y-4">
                        <TipItem text="Combinations ignore the order. Picking [Red, Blue] is the same as [Blue, Red]." />
                        <TipItem text="Permutations treat order as distinct. [1-2-3] is a different PIN than [3-2-1]." />
                        <TipItem text="Repetition variants are used when you can pick the same item multiple times, like numbers on a license plate." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Probability Solver', description: 'Event likelihood math', href: '/calculator/probability', icon: Zap },
          { name: 'LCM Calculator', description: 'Least Common Multiple', href: '/calculator/lcm', icon: Hash }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50 overflow-hidden">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest shrink-0">{label}</span>
      <span className="text-xs font-black text-primary font-mono truncate ml-4">{value}</span>
    </div>
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