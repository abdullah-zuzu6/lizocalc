'use client'

import { useState, useEffect, useMemo } from 'react'
import { Scale, RotateCcw, Info, ListFilter, Layers, CheckCircle2, Zap } from 'lucide-react'
// import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'
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

  const relatedCalculators = [
    { name: 'Density Calculator', description: 'Mass per volume solver', href: '/calculator/density', icon: Scale },
    { name: 'Speed Calculator', description: 'Distance and time math', href: '/calculator/speed', icon: Zap }
  ]

  const [mass, setMass] = useState<string>('')
  const [weight, setWeight] = useState<string>('')
  const [gravity, setGravity] = useState<string>('9.807')

  const [trigger, setTrigger] = useState<number>(0)
  const [showResults, setShowResults] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // Load cookies
  useEffect(() => {

    setIsMounted(true)

    const consent = getConsentPreference()
    const history = getCalculatorHistory()

    if (consent?.functional && history['mass-calc']?.data) {

      setMass(history['mass-calc'].data.mass || '')
      setWeight(history['mass-calc'].data.weight || '')
      setGravity(history['mass-calc'].data.gravity || '9.807')

    }

  }, [])

  // Save cookies
  useEffect(() => {

    if (!isMounted) return

    const consent = getConsentPreference()

    if (consent?.functional) {

      saveCalculatorHistory('mass-calc', {
        mass,
        weight,
        gravity
      })

    }

  }, [mass, weight, gravity, isMounted])

  const results = useMemo((): MassResult | { error: string } | null => {

    if (trigger === 0) return null

    const m = parseFloat(mass)
    const w = parseFloat(weight)
    const g = parseFloat(gravity)

    const hasMass = !isNaN(m)
    const hasWeight = !isNaN(w)
    const hasGravity = !isNaN(g) && g !== 0

    if (!hasGravity) return { error: 'Gravity cannot be zero.' }

    let resM = m
    let resW = w
    let solved = ''

    if (hasMass && hasGravity) {
      resW = m * g
      solved = 'Weight'
    } 
    else if (hasWeight && hasGravity) {
      resM = w / g
      solved = 'Mass'
    } 
    else {
      return null
    }

    return {
      mass: resM.toFixed(4).replace(/\.?0+$/, ""),
      weight: resW.toFixed(4).replace(/\.?0+$/, ""),
      gravity: g.toFixed(4).replace(/\.?0+$/, ""),
      solvedFor: solved
    }

  }, [trigger])

  const handleCalculate = () => {
    setTrigger(prev => prev + 1)
    setShowResults(true)
  }

  if (!isMounted) return null

  return (

    <main className="min-h-screen bg-background text-foreground">

      <section className="py-8 px-4 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}

          <div className="lg:col-span-4 space-y-6">

            <div className="bg-card rounded-xl border p-6 shadow-sm">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">

                <InputField
                  label="Mass (kg)"
                  value={mass}
                  onChange={(v: string) => { setMass(v); setShowResults(false) }}
                />

                <InputField
                  label="Weight (Newtons)"
                  value={weight}
                  onChange={(v: string) => { setWeight(v); setShowResults(false) }}
                />

                <InputField
                  label="Gravity (m/s²)"
                  value={gravity}
                  onChange={(v: string) => { setGravity(v); setShowResults(false) }}
                />

                <div className="flex flex-wrap gap-2 pt-2">
                  {PLANET_GRAVITY.map(p => (
                    <button
                      key={p.name}
                      onClick={() => { setGravity(p.g.toString()); setShowResults(false) }}
                      className="px-3 py-1 text-xs bg-secondary rounded-md hover:bg-blue-500 hover:text-white transition"
                    >
                      {p.name}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-3">

                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setMass('')
                      setWeight('')
                      setGravity('9.807')
                      setShowResults(false)
                      setTrigger(0)
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="lg:col-span-8 space-y-6">

            {showResults && results && !('error' in results) ? (

              <div className="bg-card border rounded-xl p-6">

                <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">
                  Calculated {results.solvedFor}
                </p>

                <h2 className="text-5xl font-black text-blue-600 text-center my-4 tracking-tighter">
                  {results.solvedFor === 'Mass' ? results.mass : results.weight}
                </h2>

                <div className="grid grid-cols-3 gap-4 mt-6">

                  <StatBox label="Mass" value={`${results.mass} kg`} />
                  <StatBox label="Weight" value={`${results.weight} N`} />
                  <StatBox label="Gravity" value={`${results.gravity} m/s²`} />

                </div>

              </div>

            ) : (

              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">

                {results && 'error' in results ? (
                  <div className="text-red-500 space-y-2">
                    <Info size={40} />
                    <p className="text-sm font-bold uppercase">{results.error}</p>
                  </div>
                ) : (
                  <>
                    <Layers size={48} className="opacity-10 mb-4" />
                    <p className="text-sm font-bold text-muted-foreground uppercase">
                      Enter values and click calculate
                    </p>
                  </>
                )}

              </div>

            )}

          </div>

        </div>

        {/* <RelatedCalculators calculators={relatedCalculators} /> */}
      <RelatedCalculators calculators={relatedCalculators}/>
      </section>

    </main>
  )
}

function InputField({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"
        placeholder="0"
      />
    </div>
  )
}

function StatBox({
  label,
  value
}: {
  label: string
  value: string
}) {

  return (
    <div className="bg-secondary/30 p-4 rounded-lg border text-center">
      <p className="text-xs text-muted-foreground uppercase font-bold">{label}</p>
      <p className="text-lg font-bold text-blue-600">{value}</p>
    </div>
  )
}
