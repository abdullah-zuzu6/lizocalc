'use client'

import { useState, useEffect, useMemo } from 'react'
import { Clock, RotateCcw, Info, ChevronRight, Calculator, Activity, Hash, Zap, CheckCircle2, FlaskConical } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Define the shape of our calculation results for TS safety
type HalfLifeResult = {
  remainingAmount: string
  decayConstant: string
  halfLivesElapsed: string
  decayPercentage: string
  steps: string[]
}

export default function HalfLifeCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [initialAmount, setInitialAmount] = useState<string>('100')
  const [halfLifeTime, setHalfLifeTime] = useState<string>('5')
  const [totalTime, setTotalTime] = useState<string>('15')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): HalfLifeResult | { error: string } | null => {
    const N0 = parseFloat(initialAmount) || 0
    const t12 = parseFloat(halfLifeTime) || 0
    const t = parseFloat(totalTime) || 0

    if (N0 <= 0 || t12 <= 0 || t < 0) return null

    // Formula: N(t) = N0 * (1/2)^(t / t12)
    const n = t / t12 // Number of half-lives
    const Nt = N0 * Math.pow(0.5, n)
    const lambda = Math.log(2) / t12 // Decay constant
    const decayPct = ((N0 - Nt) / N0) * 100

    return {
      remainingAmount: Nt.toFixed(4),
      decayConstant: lambda.toFixed(6),
      halfLivesElapsed: n.toFixed(2),
      decayPercentage: decayPct.toFixed(2),
      steps: [
        `Calculate half-lives elapsed: ${t} / ${t12} = ${n.toFixed(2)}`,
        `Apply decay formula: ${N0} × (0.5)^${n.toFixed(2)}`,
        `Decay constant (λ): ln(2) / ${t12} = ${lambda.toFixed(6)}`
      ]
    }
  }, [initialAmount, halfLifeTime, totalTime])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Half-Life <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Determine the remaining amount of a substance after a period of decay using the standard exponential decay formula.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Remaining Amount</span>
                    <h3 className="text-5xl font-black mt-2 tracking-tighter">
                      {results.remainingAmount}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Total Decay</p>
                        <p className="text-xl font-bold">{results.decayPercentage}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Decay Statistics</h4>
                   <div className="space-y-3">
                      <StatRow label="Half-lives Elapsed" value={results.halfLivesElapsed} />
                      <StatRow label="Decay Constant (λ)" value={results.decayConstant} />
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Parameters</p>
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs & Interaction */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <FlaskConical size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Clock size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Set Decay Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField label="Initial Amount" value={initialAmount} onChange={(v) => {setInitialAmount(v); setShowResults(false)}} />
                  <InputField label="Half-Life (t½)" value={halfLifeTime} onChange={(v) => {setHalfLifeTime(v); setShowResults(false)}} />
                  <InputField label="Total Time (t)" value={totalTime} onChange={(v) => {setTotalTime(v); setShowResults(false)}} highlight />
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Decay <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setInitialAmount('100'); setHalfLifeTime('5'); setTotalTime('15');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Half-Life Principle</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Half-life is the time required for a quantity to reduce to half of its initial value. This concept is fundamental in nuclear physics to describe how quickly unstable atoms undergo radioactive decay.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-lg">N(t) = N₀(1/2)^(t/t½)</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Key Applications</h3>
                    <div className="space-y-4">
                        <TipItem text="Carbon Dating: Estimating the age of organic materials by measuring Carbon-14." />
                        <TipItem text="Pharmacology: Determining how long a medication remains active in the bloodstream." />
                        <TipItem text="Waste Management: Planning the storage of spent nuclear fuel based on its decay rate." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Chemistry', description: 'Molar mass and solutions', href: '/calculator/chemistry', icon: FlaskConical },
          { name: 'Logarithm', description: 'Solve log and ln equations', href: '/calculator/log', icon: Hash }
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
        className={`w-full pl-16 pr-4 py-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 outline-none transition-all ${highlight ? 'ring-primary/40' : 'ring-primary/10'}`}
        placeholder="0"
      />
    </div>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-primary">{value}</span>
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