'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Weight, 
  Box, 
  Calculator as CalcIcon
} from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type DensityResult = {
  mass: string
  volume: string
  density: string
  solvedFor: string
}

export default function DensityCalculator() {

  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const [mass, setMass] = useState<string>('')
  const [volume, setVolume] = useState<string>('')
  const [density, setDensity] = useState<string>('')

  // Load cookie data on mount
  useEffect(() => {
    setIsMounted(true)

    const consent = getConsentPreference()
    const history = getCalculatorHistory()

    if (consent?.functional && history['density-calc']?.data) {
      const { m, v, d } = history['density-calc'].data
      setMass(m || '')
      setVolume(v || '')
      setDensity(d || '')
    }
  }, [])

  // Save cookie whenever values change
  useEffect(() => {
    if (!isMounted) return

    const consent = getConsentPreference()

    if (consent?.functional) {
      saveCalculatorHistory('density-calc', {
        m: mass,
        v: volume,
        d: density
      })
    }
  }, [mass, volume, density])

  // Sync values when switching tabs
  useEffect(() => {

    const syncData = () => {
      const consent = getConsentPreference()
      const history = getCalculatorHistory()

      if (consent?.functional && history['density-calc']?.data) {
        const { m, v, d } = history['density-calc'].data
        setMass(m || '')
        setVolume(v || '')
        setDensity(d || '')
      }
    }

    window.addEventListener('focus', syncData)

    return () => window.removeEventListener('focus', syncData)

  }, [])

  const results = useMemo((): DensityResult | { error: string } | null => {

    const m = parseFloat(mass)
    const v = parseFloat(volume)
    const d = parseFloat(density)

    const inputs = [m, v, d].filter(val => !isNaN(val) && val !== 0)

    if (inputs.length < 2) return null

    let resM = m
    let resV = v
    let resD = d
    let solved = ''

    if (isNaN(m)) {
      resM = d * v
      solved = 'Mass'
    } 
    else if (isNaN(v)) {
      resV = m / d
      solved = 'Volume'
    } 
    else if (isNaN(d)) {
      resD = m / v
      solved = 'Density'
    }

    if (resV === 0 && solved === 'Density') {
      return { error: 'Volume cannot be zero.' }
    }

    return {
      mass: resM.toFixed(4).replace(/\.?0+$/, ""),
      volume: resV.toFixed(4).replace(/\.?0+$/, ""),
      density: resD.toFixed(4).replace(/\.?0+$/, ""),
      solvedFor: solved
    }

  }, [mass, volume, density])

  if (!isMounted) return null

  return (

    <main className="min-h-screen bg-background text-foreground">

      <section className="py-12 px-4 max-w-7xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}

          <div className="lg:col-span-4 space-y-6">

            <div className="bg-card rounded-xl border p-6 shadow-sm">

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CalcIcon className="text-primary" size={20} />
                Parameters
              </h2>

              <div className="space-y-4">

                <InputField label="Mass (m)" unit="kg" value={mass} onChange={setMass} />

                <InputField label="Volume (V)" unit="m³" value={volume} onChange={setVolume} />

                <InputField label="Density (ρ)" unit="kg/m³" value={density} onChange={setDensity} />

                <div className="pt-4 flex flex-col gap-3">

                  <button
                    onClick={() => setShowResults(true)}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-bold text-sm hover:opacity-90 flex items-center justify-center gap-2"
                  >
                    Calculate
                    <CheckCircle2 size={16} />
                  </button>

                  <button
                    onClick={() => {
                      setMass('')
                      setVolume('')
                      setDensity('')
                      setShowResults(false)

                      saveCalculatorHistory('density-calc', {
                        m: '',
                        v: '',
                        d: ''
                      })
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} />
                    Reset
                  </button>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="lg:col-span-8 space-y-6">

            {showResults && results && !('error' in results) ? (

              <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-xl">

                <p className="text-xs font-bold uppercase opacity-70">
                  Calculated {results.solvedFor}
                </p>

                <h2 className="text-5xl font-black my-2 tracking-tighter">
                  {results.solvedFor === 'Density'
                    ? results.density
                    : results.solvedFor === 'Mass'
                    ? results.mass
                    : results.volume}
                </h2>

                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/20">

                  <StatBox label="Mass" value={`${results.mass} kg`} />

                  <StatBox label="Volume" value={`${results.volume} m³`} />

                  <StatBox label="Density" value={`${results.density} kg/m³`} />

                </div>

              </div>

            ) : (

              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center h-full min-h-[300px]">

                <Layers size={48} className="opacity-10 mb-4" />

                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter 2 values to solve
                </p>

              </div>

            )}

          </div>

        </div>

        {/* FORMULA */}

        <div className="mt-8 grid md:grid-cols-2 gap-8">

          <div className="bg-card border rounded-xl p-8">

            <h3 className="font-bold text-xl mb-4">Density Formula</h3>

            <p className="text-sm text-muted-foreground mb-4">
              Density is the ratio between mass and volume.
            </p>

            <div className="p-4 bg-primary/10 rounded-xl">

              <code className="text-primary font-bold text-lg">
                {"ρ = m / V"}
              </code>

            </div>

          </div>

        </div>

        <RelatedCalculators
          calculators={[
            {
              name: 'Mass Calculator',
              description: 'Weight vs mass solver',
              href: '/calculator/mass',
              icon: Weight
            },
            {
              name: 'Volume Calculator',
              description: '3D shape capacity',
              href: '/calculator/volume',
              icon: Box
            }
          ]}
        />

      </section>

    </main>
  )
}

function InputField({ label, unit, value, onChange }: any) {

  return (
    <div>

      <label className="text-xs font-bold uppercase text-muted-foreground">
        {label} ({unit})
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-primary/20 outline-none font-bold"
      />

    </div>
  )
}

function StatBox({ label, value }: { label: string; value: string }) {

  return (
    <div>

      <p className="text-[10px] font-bold uppercase opacity-60">
        {label}
      </p>

      <p className="text-lg font-black">
        {value}
      </p>

    </div>
  )
}
