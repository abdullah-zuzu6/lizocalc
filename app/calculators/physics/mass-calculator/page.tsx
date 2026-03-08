'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Weight, 
  RotateCcw, 
  Info, 
  ChevronRight, 
  Calculator, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Scale, 
  Orbit 
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type MassResult = {
  mass: string
  weight: string
  gravity: string
  solvedFor: string
}

const PLANET_GRAVITY = [
  { name: 'Earth', g: 9.807 },
  { name: 'Moon', g: 1.622 },
  { name: 'Mars', g: 3.711 },
  { name: 'Jupiter', g: 24.79 },
  { name: 'Saturn', g: 10.44 }
]

export default function MassCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [mass, setMass] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [gravity, setGravity] = useState<string>('9.807')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): MassResult | { error: string } | null => {
    const m = parseFloat(mass)
    const w = parseFloat(weight)
    const g = parseFloat(gravity)

    // Check which two values we have
    const hasMass = !isNaN(m) && m !== 0
    const hasWeight = !isNaN(w) && w !== 0
    const hasGravity = !isNaN(g) && g !== 0

    if (!hasGravity) return { error: "Gravity (acceleration) cannot be zero." }

    let resM = m, resW = w, resG = g
    let solved = ''

    if (hasMass && hasGravity) {
      resW = m * g; solved = 'Weight (Force)'
    } else if (hasWeight && hasGravity) {
      resM = w / g; solved = 'Mass'
    } else {
      return null
    }

    return {
      mass: resM.toFixed(4).replace(/\.?0+$/, ""),
      weight: resW.toFixed(4).replace(/\.?0+$/, ""),
      gravity: resG.toFixed(4).replace(/\.?0+$/, ""),
      solvedFor: solved
    }
  }, [mass, weight, gravity])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Mass <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calculate mass, weight, or force. Understand the difference between an object's matter and the gravitational pull acting upon it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Calculated {results.solvedFor}</span>
                    <h3 className="text-5xl font-black mt-2 tracking-tighter">
                      {results.solvedFor === 'Mass' ? results.mass : results.weight}
                      <span className="text-xl ml-2">{results.solvedFor === 'Mass' ? 'kg' : 'N'}</span>
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Physics Note</p>
                        <p className="text-xs font-medium">Mass is constant; Weight changes with gravity.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Full Dynamics</h4>
                   <div className="space-y-3">
                      <StatRow label="Mass (m)" value={`${results.mass} kg`} />
                      <StatRow label="Weight (W/F)" value={`${results.weight} N`} />
                      <StatRow label="Gravity (g)" value={`${results.gravity} m/s²`} />
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
                        <Scale size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter values to solve</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Orbit size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Force & Mass Parameters</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <InputField label="Mass (m)" unit="kg" value={mass} onChange={(v) => {setMass(v); setShowResults(false)}} />
                <InputField label="Weight / Force (F)" unit="Newtons" value={weight} onChange={(v) => {setWeight(v); setShowResults(false)}} />
                <div className="md:col-span-2">
                    <InputField label="Acceleration / Gravity (g)" unit="m/s²" value={gravity} onChange={(v) => {setGravity(v); setShowResults(false)}} />
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">Planetary Gravity Presets</p>
                <div className="flex flex-wrap gap-2">
                  {PLANET_GRAVITY.map(p => (
                    <button 
                      key={p.name}
                      onClick={() => {setGravity(p.g.toString()); setShowResults(false)}}
                      className="px-4 py-2 bg-muted hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setShowResults(true)}
                  className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  Calculate Mass/Weight <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => {setShowResults(false); setMass(''); setWeight(''); setGravity('9.807');}}
                  className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Mass vs. Weight</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        While people use these terms interchangeably, in physics they are very different. **Mass** is the quantity of matter, while **Weight** is the force exerted on that matter by gravity.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-lg">{`$$W = m \\times g$$`}</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Newton's Second Law</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        This calculator is also a general force calculator. Newton's second law defines force as the product of mass and acceleration.
                    </p>
                    

[Image of Newton's Second Law of Motion formula triangle]

                    <div className="space-y-4">
                        <TipItem text="Mass (kg) is measured with a balance and never changes based on location." />
                        <TipItem text="Weight (N) is measured with a scale and changes based on gravity." />
                        <TipItem text="1 kg of mass on Earth weighs approximately 9.81 Newtons." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Density Calculator', description: 'Mass per volume solver', href: '/calculator/density', icon: Weight },
          { name: 'Speed Calculator', description: 'Distance and time math', href: '/calculator/speed', icon: Zap }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function InputField({ label, unit, value, onChange }: { label: string, unit: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col">
        <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">{label}</span>
        <span className="text-[8px] font-bold text-primary/60 uppercase">{unit}</span>
      </div>
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full pl-36 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
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