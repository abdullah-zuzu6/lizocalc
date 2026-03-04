'use client'

import { useState, useEffect, useMemo } from 'react'
import { Scale, RotateCcw, Info, ChevronRight, CheckCircle2, Globe, Zap, Weight as WeightIcon } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

const PLANETS = [
  { name: 'Mercury', g: 3.7 }, { name: 'Venus', g: 8.87 }, { name: 'Earth', g: 9.807 },
  { name: 'Moon', g: 1.62 }, { name: 'Mars', g: 3.71 }, { name: 'Jupiter', g: 24.79 }
]

export default function WeightCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [mass, setMass] = useState<string>('70')
  const [gravity, setGravity] = useState<string>('9.807')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const weightResult = useMemo(() => {
    const m = parseFloat(mass)
    const g = parseFloat(gravity)
    if (isNaN(m) || isNaN(g)) return null
    return (m * g).toFixed(2)
  }, [mass, gravity])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Weight <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Determine the gravitational force acting on an object across different celestial bodies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && weightResult ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Calculated Weight</span>
                  <h3 className="text-6xl font-black mt-2 tracking-tighter">{weightResult}<span className="text-2xl ml-2">N</span></h3>
                  <p className="mt-4 text-sm opacity-80">This is equivalent to {(parseFloat(weightResult) / 4.448).toFixed(2)} lbs of force.</p>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Scale size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter mass to solve</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">Mass (kg)</label>
                  <input type="number" value={mass} onChange={(e) => setMass(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold outline-none focus:ring-2 ring-primary/20" />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">Gravity (m/s²)</label>
                  <input type="number" value={gravity} onChange={(e) => setGravity(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold outline-none focus:ring-2 ring-primary/20" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-8">
                {PLANETS.map(p => (
                  <button key={p.name} onClick={() => setGravity(p.g.toString())} className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-white rounded-lg text-xs font-bold transition-all">{p.name}</button>
                ))}
              </div>
              <button onClick={() => setShowResults(true)} className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:shadow-primary/30 transition-all">
                Calculate Weight <CheckCircle2 size={18} />
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}