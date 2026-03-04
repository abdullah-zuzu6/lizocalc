'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Database, 
  RotateCcw, 
  Info, 
  ChevronRight, 
  Calculator, 
  CheckCircle2, 
  Layers, 
  Weight, 
  Box, 
  FlaskConical 
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type DensityResult = {
  mass: string
  volume: string
  density: string
  solvedFor: string
}

const PRESETS = [
  { name: 'Water', density: 1000 },
  { name: 'Gold', density: 19300 },
  { name: 'Aluminum', density: 2700 },
  { name: 'Steel', density: 7850 },
  { name: 'Air', density: 1.225 }
]

export default function DensityCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [mass, setMass] = useState<string>('')
  const [volume, setVolume] = useState<string>('')
  const [density, setDensity] = useState<string>('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const results = useMemo((): DensityResult | { error: string } | null => {
    const m = parseFloat(mass)
    const v = parseFloat(volume)
    const d = parseFloat(density)

    const inputs = [m, v, d].filter(val => !isNaN(val) && val !== 0)
    if (inputs.length < 2) return null

    let resM = m, resV = v, resD = d
    let solved = ''

    if (!isNaN(m) && !isNaN(v)) {
      resD = m / v; solved = 'Density'
    } else if (!isNaN(d) && !isNaN(v)) {
      resM = d * v; solved = 'Mass'
    } else if (!isNaN(m) && !isNaN(d)) {
      resV = m / d; solved = 'Volume'
    }

    if (resV === 0 && solved === 'Density') return { error: "Volume cannot be zero." }

    return {
      mass: resM.toFixed(4).replace(/\.?0+$/, ""),
      volume: resV.toFixed(4).replace(/\.?0+$/, ""),
      density: resD.toFixed(4).replace(/\.?0+$/, ""),
      solvedFor: solved
    }
  }, [mass, volume, density])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Density <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calculate density, mass, or volume. Use presets or enter custom values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Calculated {results.solvedFor}</span>
                    <h3 className="text-5xl font-black mt-2 tracking-tighter">
                      {results.solvedFor === 'Density' ? results.density : results.solvedFor === 'Mass' ? results.mass : results.volume}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Standard Units</p>
                        <p className="text-sm font-medium">Results in SI Units (kg, m³, kg/m³)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Full Breakdown</h4>
                   <div className="space-y-3">
                      <StatRow label="Mass (m)" value={`${results.mass} kg`} />
                      <StatRow label="Volume (V)" value={`${results.volume} m³`} />
                      <StatRow label="Density (ρ)" value={`${results.density} kg/m³`} />
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
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter 2 values to solve</p>
                    </>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <FlaskConical size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Physical Properties</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <InputField label="Mass (m)" unit="kg" value={mass} onChange={(v) => {setMass(v); setShowResults(false)}} />
                <InputField label="Volume (V)" unit="m³" value={volume} onChange={(v) => {setVolume(v); setShowResults(false)}} />
                <InputField label="Density (ρ)" unit="kg/m³" value={density} onChange={(v) => {setDensity(v); setShowResults(false)}} />
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black uppercase text-muted-foreground mb-3 tracking-widest">Quick Presets</p>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map(p => (
                    <button 
                      key={p.name}
                      onClick={() => {setDensity(p.density.toString()); setShowResults(false)}}
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
                  Calculate Properties <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => {setShowResults(false); setMass(''); setVolume(''); setDensity('');}}
                  className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>
        </div>

        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Density Formula</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Density is a measure of mass per unit of volume.
                    </p>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        {/* THE FIX IS HERE */}
                        <code className="text-primary font-bold text-lg">{`$$\\rho = \\frac{m}{V}$$`}</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Quick Tips</h3>
                    <div className="space-y-4">
                        <TipItem text="Water's density is ~1,000 kg/m³." />
                        <TipItem text="Less dense objects float in more dense fluids." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Mass Calculator', description: 'Weight vs mass solver', href: '/calculator/mass', icon: Weight },
          { name: 'Volume Calculator', description: '3D shape capacity', href: '/calculator/volume', icon: Box }
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
        className="w-full pl-24 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
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