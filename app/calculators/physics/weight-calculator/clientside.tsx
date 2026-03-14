'use client'

import { useState, useEffect, useMemo } from 'react'
import { Scale, RotateCcw, Info, ListFilter, BarChart3, CheckCircle2, Weight as WeightIcon, Globe } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const PLANETS = [
  { name: 'Mercury', g: 3.7 }, { name: 'Venus', g: 8.87 }, { name: 'Earth', g: 9.807 },
  { name: 'Moon', g: 1.62 }, { name: 'Mars', g: 3.71 }, { name: 'Jupiter', g: 24.79 }
]

export default function WeightCalculator() {
  const relatedCalculators = [
    { name: 'Mass Calculator', description: 'Find mass from force', href: '/calculators/physics/mass-calculator', icon: Scale },
    { name: 'Speed Calculator', description: 'Calculate velocity', href: '/calculators/physics/speed-calculator', icon: Globe },
  ]

  // --- States ---
  const [mass, setMass] = useState<string>('70')
  const [gravity, setGravity] = useState<string>('9.807')
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['weight-calc']?.data) {
      const { mass, gravity } = history['weight-calc'].data
      setMass(mass || '70')
      setGravity(gravity || '9.807')
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('weight-calc', { mass, gravity })
    }
  }, [mass, gravity, isMounted])

  // --- Calculation Engine ---
  const weightResult = useMemo(() => {
    const m = parseFloat(mass)
    const g = parseFloat(gravity)
    if (isNaN(m) || isNaN(g)) return null
    return (m * g).toFixed(2)
  }, [mass, gravity])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Mass (kg)</label>
                  <input 
                    type="number" 
                    value={mass} 
                    onChange={(e) => setMass(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Gravity (m/s²)</label>
                  <input 
                    type="number" 
                    value={gravity} 
                    onChange={(e) => setGravity(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {PLANETS.map(p => (
                    <button key={p.name} onClick={() => setGravity(p.g.toString())} className="py-2 bg-secondary rounded text-[10px] font-bold hover:bg-blue-600 hover:text-white transition-colors">
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button onClick={() => setShowResults(true)} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    Calculate Weight <CheckCircle2 size={16} />
                  </button>
                  <button onClick={() => { setMass(''); setGravity(''); setShowResults(false); }} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && weightResult ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center items-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">Calculated Weight (Force)</p>
                  <h2 className="text-5xl font-black text-blue-600 my-4 tracking-tighter">
                    {weightResult} <span className="text-2xl text-foreground">N</span>
                  </h2>
                </div>
                <div className="bg-card border rounded-xl p-6 flex flex-col justify-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">Imperial Conversion</p>
                  <p className="text-2xl font-bold">{(parseFloat(weightResult) / 4.448).toFixed(2)} lbs</p>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <WeightIcon size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter mass and gravity to calculate</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600"/> Mass vs Weight
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Mass is the amount of matter in an object, while weight is the force exerted on that mass by gravity. 

[Image of the difference between mass and weight]

            </p>
            <div className="p-4 bg-blue-600/5 border border-blue-600/20 rounded-xl">
              <code className="text-blue-600 font-bold text-xs uppercase">Formula: W = m × g</code>
            </div>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">Why it matters</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>• Weight changes based on the gravitational pull of the planet you are on.</p>
              <p>• Essential for aerospace engineering and structural calculations.</p>
              <p>• Helps in understanding basic Newtonian mechanics.</p>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
      
    </main>
  )
}