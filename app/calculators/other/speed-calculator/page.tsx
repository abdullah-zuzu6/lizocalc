'use client'

import { useState, useEffect, useMemo } from 'react'
import { Zap, RotateCcw, Info, ChevronRight, CheckCircle2, Navigation, Timer, Move } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SpeedCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [distance, setDistance] = useState<string>('')
  const [time, setTime] = useState<string>('')
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => setIsMounted(true), [])

  const results = useMemo(() => {
    const d = parseFloat(distance)
    const t = parseFloat(time)
    if (isNaN(d) || isNaN(t) || t === 0) return null
    
    const speed = d / t
    const pace = (60 / speed) // minutes per unit

    return {
      speed: speed.toFixed(2),
      pace: pace.toFixed(2),
      unitLabel: unit === 'metric' ? 'km/h' : 'mph'
    }
  }, [distance, time, unit])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Speed <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Calculate average velocity, travel time, or distance covered using standard kinematics formulas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Average Speed</span>
                  <h3 className="text-6xl font-black mt-2 tracking-tighter">{results.speed}<span className="text-2xl ml-2">{results.unitLabel}</span></h3>
                  <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold opacity-60">Travel Pace</p>
                    <p className="text-lg font-bold">{results.pace} min/{unit === 'metric' ? 'km' : 'mi'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Zap size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter travel data</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-8 order-1 lg:order-2">
            <section className="bg-card rounded-3xl border border-border p-8 shadow-xl">
              <div className="flex gap-4 mb-8">
                <button onClick={() => setUnit('metric')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${unit === 'metric' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground'}`}>Metric (km)</button>
                <button onClick={() => setUnit('imperial')} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${unit === 'imperial' ? 'bg-primary text-white shadow-md' : 'bg-muted text-muted-foreground'}`}>Imperial (mi)</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><Move size={12}/> Distance ({unit === 'metric' ? 'km' : 'mi'})</label>
                  <input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-muted-foreground flex items-center gap-2"><Timer size={12}/> Time (Hours)</label>
                  <input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold outline-none border-2 border-transparent focus:border-primary/20 transition-all" placeholder="0.00" />
                </div>
              </div>
              <button onClick={() => setShowResults(true)} className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
                Calculate Velocity <CheckCircle2 size={20} />
              </button>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}