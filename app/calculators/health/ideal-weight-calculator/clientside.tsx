"use client"

import { useState, useEffect, useMemo } from 'react'
import { Scale, User, Ruler, RotateCcw, Info, HelpCircle, Calculator, Activity, CheckCircle2 } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function IdealWeightCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  // --- Input States ---
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState<string>('180')
  const [age, setAge] = useState<string>('25')

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['ideal-weight-calc']?.data) {
      const d = history['ideal-weight-calc'].data
      setGender(d.gender)
      setHeight(d.height)
      setAge(d.age)
    }
  }, [])

  const handleCalculate = () => {
    setTrigger(prev => prev + 1)
    setShowResults(true)
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('ideal-weight-calc', { gender, height, age })
    }
  }

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null
    const hCm = parseFloat(height) || 0
    if (hCm < 152.4) return { error: "Height must be at least 152.4 cm (5 feet)." }

    const hIn = hCm / 2.54
    const inchesOver5ft = hIn - 60
    
    let robinson = gender === 'male' ? 52 + (1.9 * inchesOver5ft) : 49 + (1.7 * inchesOver5ft)
    let miller = gender === 'male' ? 56.2 + (1.41 * inchesOver5ft) : 53.1 + (1.36 * inchesOver5ft)
    let devine = gender === 'male' ? 50 + (2.3 * inchesOver5ft) : 45.5 + (2.3 * inchesOver5ft)
    let hamwi = gender === 'male' ? 48 + (2.7 * inchesOver5ft) : 45.5 + (2.2 * inchesOver5ft)
    
    return {
      formulas: [
        { name: 'Robinson (1983)', value: robinson.toFixed(1) },
        { name: 'Miller (1983)', value: miller.toFixed(1) },
        { name: 'Devine (1974)', value: devine.toFixed(1) },
        { name: 'Hamwi (1964)', value: hamwi.toFixed(1) }
      ],
      bmiRange: `${(18.5 * (hCm / 100) ** 2).toFixed(1)} - ${(24.9 * (hCm / 100) ** 2).toFixed(1)}`,
      average: ((robinson + miller + devine + hamwi) / 4).toFixed(1)
    }
  }, [trigger, gender, height, age])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setGender('male')} className={`py-2 rounded-md text-sm font-bold border ${gender === 'male' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Male</button>
                  <button onClick={() => setGender('female')} className={`py-2 rounded-md text-sm font-bold border ${gender === 'female' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Female</button>
                </div>
                <input type="number" value={height} onChange={(e) => {setHeight(e.target.value); setShowResults(false)}} className="w-full px-3 py-3 bg-secondary rounded-md border font-bold" placeholder="Height (cm)" />
                <input type="number" value={age} onChange={(e) => {setAge(e.target.value); setShowResults(false)}} className="w-full px-3 py-3 bg-secondary rounded-md border font-bold" placeholder="Age" />
                
                <button onClick={handleCalculate} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  Calculate <CheckCircle2 size={16} />
                </button>
                <button onClick={() => {setShowResults(false); setTrigger(0);}} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6">
                <div className="bg-blue-600 rounded-xl p-8 text-white shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-widest opacity-80">Estimated Average Ideal Weight</p>
                  <h2 className="text-6xl font-black my-4">{results.average} kg</h2>
                  <p className="text-sm opacity-90">Healthy BMI Range: {results.bmiRange} kg</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {results.formulas.map((f, i) => (
                    <div key={i} className="bg-card border p-5 rounded-xl flex justify-between items-center">
                      <span className="text-sm font-bold text-muted-foreground">{f.name}</span>
                      <span className="text-xl font-black">{f.value} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                <Activity size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">{results?.error || "Enter stats and click calculate"}</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info size={20} className="text-blue-600"/> Methodology</h3>
            <p className="text-sm text-muted-foreground">These formulas calculate ideal weight based on height and gender. They do not account for muscle mass, bone density, or body fat percentage.</p>
          </div>
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><HelpCircle size={20} className="text-blue-600"/> Context</h3>
            <p className="text-sm text-muted-foreground">Clinical formulas like Devine are often used for medication dosing. Always consult a professional for health goals.</p>
          </div>
        </div>

        {/* RELATED CALCULATORS */}
        <div className="mt-8">
          <RelatedCalculators calculators={[
            { name: 'BMI Calculator', description: 'Assess your body mass index', href: '/calculator/bmi', icon: Activity },
            { name: 'Calorie Calculator', description: 'Daily energy requirements', href: '/calculator/calorie', icon: Scale },
            { name: 'Macros Calculator', description: 'Track your nutrient intake', href: '/calculator/macros', icon: User }
          ]} />
        </div>
      </section>
    </main>
  )
}