'use client'

import { useState, useEffect, useMemo } from 'react'
import { Ruler, RotateCcw, Info, ChevronRight, Calculator, Triangle as TriangleIcon, Hash, Zap, CheckCircle2, Square } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Define the shape of our calculation results for TS safety
type CalcResult = {
  a: string
  b: string
  c: string
  solvingFor: string
  area: string
  steps: string[]
  error?: string
}

export default function PythagoreanCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [sideA, setSideA] = useState<string>('3')
  const [sideB, setSideB] = useState<string>('4')
  const [sideC, setSideC] = useState<string>('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): CalcResult | { error: string } | null => {
    const a = parseFloat(sideA) || 0
    const b = parseFloat(sideB) || 0
    const c = parseFloat(sideC) || 0

    // Prevent calculation if less than 2 sides are provided
    const inputs = [a, b, c].filter(x => x > 0).length
    if (inputs < 2) return null

    // Case 1: Solve for Hypotenuse (c)
    if (a > 0 && b > 0 && !c) {
      const calcC = Math.sqrt(a ** 2 + b ** 2)
      return {
        a: a.toFixed(2),
        b: b.toFixed(2),
        c: calcC.toFixed(2),
        solvingFor: 'Hypotenuse (c)',
        area: (0.5 * a * b).toFixed(2),
        steps: [`${a}² + ${b}² = c²`, `${a**2} + ${b**2} = ${a**2 + b**2}`, `√${a**2 + b**2} = ${calcC.toFixed(2)}`]
      }
    }
    // Case 2: Solve for Leg (a)
    if (c > 0 && b > 0 && !a) {
      if (c <= b) return { error: "Hypotenuse must be longer than the leg." }
      const calcA = Math.sqrt(c ** 2 - b ** 2)
      return {
        a: calcA.toFixed(2),
        b: b.toFixed(2),
        c: c.toFixed(2),
        solvingFor: 'Leg (a)',
        area: (0.5 * calcA * b).toFixed(2),
        steps: [`a² + ${b}² = ${c}²`, `a² = ${c**2} - ${b**2}`, `√${c**2 - b**2} = ${calcA.toFixed(2)}`]
      }
    }
    // Case 3: Solve for Leg (b)
    if (c > 0 && a > 0 && !b) {
      if (c <= a) return { error: "Hypotenuse must be longer than the leg." }
      const calcB = Math.sqrt(c ** 2 - a ** 2)
      return {
        a: a.toFixed(2),
        b: calcB.toFixed(2),
        c: c.toFixed(2),
        solvingFor: 'Leg (b)',
        area: (0.5 * a * calcB).toFixed(2),
        steps: [`${a}² + b² = ${c}²`, `b² = ${c**2} - ${a**2}`, `√${c**2 - a**2} = ${calcB.toFixed(2)}`]
      }
    }
    return null
  }, [sideA, sideB, sideC])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
            Pythagorean <span className="text-primary">Theorem</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Solve for any side of a right triangle ($a^2 + b^2 = c^2$). Enter two known sides to find the third.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Solved Value</span>
                    <h3 className="text-5xl font-black mt-2 tracking-tighter">
                      {results.solvingFor.includes('(c)') ? results.c : 
                       results.solvingFor.includes('(a)') ? results.a : 
                       results.b}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Triangle Area</p>
                        <p className="text-xl font-bold">{results.area} u²</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Step-by-Step Solution</h4>
                   <div className="space-y-3">
                      {results.steps.map((step, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm font-mono p-2 bg-muted/50 rounded-lg">
                            <span className="text-primary font-bold">{i + 1}.</span>
                            <span>{step}</span>
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
                        <TriangleIcon size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Inputs</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs & Interaction */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Square size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Ruler size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Enter Side Lengths</h2>
                </div>

                {/* Right Triangle Diagram Aid */}
                <div className="flex justify-center mb-10">
                    <div className="relative w-48 h-32 border-l-4 border-b-4 border-primary rounded-bl-sm">
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-xs font-black text-muted-foreground">a</div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-black text-muted-foreground">b</div>
                        <div className="absolute top-4 right-4 rotate-[33deg] text-xs font-black text-primary">c</div>
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-t-2 border-r-2 border-primary/30" />
                        <div className="absolute top-0 left-0 w-[230px] h-[4px] bg-primary/20 origin-top-left rotate-[33deg]" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="Side a" value={sideA} onChange={(v) => {setSideA(v); setSideC(''); setShowResults(false)}} />
                  <InputField label="Side b" value={sideB} onChange={(v) => {setSideB(v); setSideC(''); setShowResults(false)}} />
                  <InputField label="Side c" value={sideC} onChange={(v) => {setSideC(v); setSideA(''); setSideB(''); setShowResults(false)}} highlight />
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Side <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setSideA(''); setSideB(''); setSideC('');}}
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
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Understanding the Theorem</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Named after the ancient Greek mathematician Pythagoras, this theorem states that in any right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-lg">a² + b² = c²</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Real-World Uses</h3>
                    <div className="space-y-4">
                        <TipItem text="Architecture: Ensuring buildings are perfectly square at the corners." />
                        <TipItem text="Navigation: Calculating the shortest direct distance between two points." />
                        <TipItem text="Electronics: Measuring the size of screens (which are measured diagonally)." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Triangle Solver', description: 'Solve for non-right triangles', href: '/calculator/triangle', icon: TriangleIcon },
          { name: 'Area Calculator', description: 'Measure space within shapes', href: '/calculator/area', icon: Hash }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function InputField({ label, value, onChange, highlight }: { label: string, value: string, onChange: (v: string) => void, highlight?: boolean }) {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase transition-colors ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </div>
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-16 pr-4 py-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 outline-none transition-all ${highlight ? 'ring-primary/40 placeholder:text-primary/30' : 'ring-primary/10'}`}
        placeholder="?"
      />
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