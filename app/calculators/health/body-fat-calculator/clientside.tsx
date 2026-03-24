'use client'

import { useState, useEffect, useMemo } from 'react'
import { Info, RotateCcw, CheckCircle2, ListFilter, BarChart3, Activity, TrendingDown } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function BodyFatCalculator() {
  // --- States ---
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [weight, setWeight] = useState<number>(70)
  const [neck, setNeck] = useState<number>(38)
  const [waist, setWaist] = useState<number>(80)
  const [hip, setHip] = useState<number>(95)
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['body-fat-calc']?.data) {
      const d = history['body-fat-calc'].data
      setAge(d.age || 30); setGender(d.gender || 'male'); setWeight(d.weight || 70)
      setNeck(d.neck || 38); setWaist(d.waist || 80); setHip(d.hip || 95)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('body-fat-calc', { age, gender, weight, neck, waist, hip })
    }
  }, [age, gender, weight, neck, waist, hip, isMounted])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null
    
    let bf = 0
    if (gender === 'male') {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(waist)) - 450
    } else {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(hip)) - 450
    }
    
    const percentage = Math.max(0, bf)
    const fatWeight = weight * (percentage / 100)
    
    return {
      percentage: percentage.toFixed(1),
      fatWeight: fatWeight.toFixed(2),
      leanMass: (weight - fatWeight).toFixed(2)
    }
  }, [trigger])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                {/* Gender Toggle */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Gender</label>
                  <div className="flex bg-secondary p-1 rounded-lg">
                    {(['male', 'female'] as const).map((g) => (
                      <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 text-sm font-bold rounded-md capitalize ${gender === g ? 'bg-background shadow' : ''}`}>
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Fields */}
                {[ {label: 'Weight (kg)', val: weight, set: setWeight}, {label: 'Neck (cm)', val: neck, set: setNeck}, 
                   {label: 'Waist (cm)', val: waist, set: setWaist}, ...(gender === 'female' ? [{label: 'Hip (cm)', val: hip, set: setHip}] : []) 
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-sm font-medium">{f.label}</label>
                    <input type="number" value={f.val} onChange={(e) => f.set(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                ))}

                {/* Buttons */}
                <div className="pt-4 flex flex-col gap-3">
                  <button onClick={() => { setTrigger(prev => prev + 1); setShowResults(true); }} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button onClick={() => { setTrigger(0); setShowResults(false); }} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="grid md:grid-cols-3 gap-6">
                {[ {label: 'Body Fat %', val: `${results.percentage}%`}, {label: 'Fat Weight', val: `${results.fatWeight} kg`}, {label: 'Lean Mass', val: `${results.leanMass} kg`} ].map((item) => (
                  <div key={item.label} className="bg-card border rounded-xl p-6 text-center">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    <h2 className="text-3xl font-black text-blue-600 mt-3">{item.val}</h2>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center h-full">
                <TrendingDown size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter measurements and calculate</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION */}
        <div className="mt-8 bg-card border rounded-xl p-8">
          <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
            <Info size={20} className="text-blue-600"/> U.S. Navy Method
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This calculator utilizes the U.S. Navy circumference method. It estimates body fat by measuring the neck, waist (and hip for females) to calculate the body density, providing a highly accessible, non-invasive estimation.
          </p>
        </div>

        <RelatedCalculators calculators={[
          { name: 'BMI Calculator', description: 'Body Mass Index', href: '/calculators/health/bmi-calculator', icon: Activity },
          { name: 'Calorie Calculator', description: 'Daily energy needs', href: '/calculators/health/calorie-calculator', icon: BarChart3 }
        ]} />
      </section>
    </main>
  )
}