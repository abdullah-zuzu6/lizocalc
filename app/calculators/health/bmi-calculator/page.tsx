'use client'

import { useState, useMemo, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import { Heart, Save, Info } from 'lucide-react'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function BMICalculator() {
  const [age, setAge] = useState(19)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [heightFeet, setHeightFeet] = useState(5)
  const [heightInches, setHeightInches] = useState(10)
  const [heightCm, setHeightCm] = useState(170)
  const [weight, setWeight] = useState(70)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['bmi']?.data) {
      const data = history['bmi'].data
      setUnit(data.unit || 'metric')
      setWeight(data.weight || 70)
      setAge(data.age || 19)
      if (data.unit === 'imperial') {
        setHeightFeet(data.heightFeet || 5)
        setHeightInches(data.heightInches || 10)
      } else {
        setHeightCm(data.heightCm || 170)
      }
    }
  }, [])

  const { bmi, category, color, needleRotation, healthyWeight, ponderalIndex } = useMemo(() => {
    let weightKg = weight
    let h_m = 0

    if (unit === 'imperial') {
      const totalInches = (heightFeet * 12) + heightInches
      h_m = (totalInches * 2.54) / 100
      weightKg = weight * 0.453592
    } else {
      h_m = heightCm / 100
      weightKg = weight
    }

    const bmiValue = weightKg / (h_m * h_m)
    const piValue = weightKg / (h_m * h_m * h_m)
    const constrainedBmi = Math.min(Math.max(bmiValue, 5), 40)
    const rotation = ((constrainedBmi - 5) / (40 - 5)) * 180 - 90

    let cat = '', col = ''
    if (bmiValue < 18.5) { cat = 'Underweight'; col = 'text-blue-500' }
    else if (bmiValue < 25) { cat = 'Normal Weight'; col = 'text-green-500' }
    else if (bmiValue < 30) { cat = 'Overweight'; col = 'text-yellow-500' }
    else { cat = 'Obese'; col = 'text-red-500' }

    const lowWeight = (18.5 * (h_m * h_m))
    const highWeight = (24.9 * (h_m * h_m))
    const weightRange = unit === 'imperial' 
      ? `${(lowWeight * 2.20462).toFixed(1)} lbs - ${(highWeight * 2.20462).toFixed(1)} lbs`
      : `${lowWeight.toFixed(1)} kg - ${highWeight.toFixed(1)} kg`

    return { bmi: bmiValue.toFixed(1), category: cat, color: col, needleRotation: rotation, healthyWeight: weightRange, ponderalIndex: piValue.toFixed(1) }
  }, [heightFeet, heightInches, heightCm, weight, unit])

  const faqItems = [
    { question: 'What is BMI?', answer: 'BMI is a measure of body fat based on your height and weight.' },
    { question: 'Is it accurate?', answer: 'It is a general screening tool, but does not measure body fat directly.' }
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/calculators/fitness" />
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="p-3 rounded-lg bg-red-600/10">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold">BMI Calculator</h1>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 max-w-5xl mx-auto">
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Theme-compliant Info Bar */}
          <div className="bg-secondary/50 border-b border-border py-3 px-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="w-4 h-4 text-primary" />
            Enter your details below to calculate your body mass index.
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Input Section */}
            <div className="lg:col-span-5 p-8 bg-secondary/20">
              <div className="flex mb-8 gap-2 p-1 bg-secondary rounded-lg">
                <button onClick={() => setUnit('imperial')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${unit === 'imperial' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}>Imperial</button>
                <button onClick={() => setUnit('metric')} className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${unit === 'metric' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}>Metric</button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Gender</label>
                  <div className="flex gap-6">
                    {['male', 'female'].map((g) => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer capitalize">
                        <input type="radio" checked={gender === g} onChange={() => setGender(g as any)} className="w-4 h-4 accent-primary" /> {g}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Height</label>
                  {unit === 'imperial' ? (
                    <div className="flex gap-3">
                      <div className="flex-1"><input type="number" value={heightFeet} onChange={(e) => setHeightFeet(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" placeholder="ft" /></div>
                      <div className="flex-1"><input type="number" value={heightInches} onChange={(e) => setHeightInches(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" placeholder="in" /></div>
                    </div>
                  ) : (
                    <input type="number" value={heightCm} onChange={(e) => setHeightCm(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Weight ({unit === 'imperial' ? 'lbs' : 'kg'})</label>
                  <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" />
                </div>

                <button className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">Calculate</button>
              </div>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-7 p-8 bg-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Result <span className={`text-lg font-medium px-3 py-1 rounded-full bg-secondary ${color}`}>{category}</span>
                </h2>
                <Save className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              </div>

              {/* Gauge with Theme Colors */}
              <div className="relative w-full max-w-[320px] mx-auto mb-12">
                <div 
                  className="h-[160px] w-full rounded-t-full relative flex items-end justify-center"
                  style={{ 
                    background: 'conic-gradient(from 270deg, #3b82f6 0% 12%, #22c55e 12% 75%, #eab308 75% 88%, #ef4444 88% 100%)',
                    maskImage: 'radial-gradient(circle at 50% 100%, transparent 65%, black 65%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 100%, transparent 65%, black 65%)'
                  }}
                >
                   <div className="absolute inset-0 flex items-center justify-center pt-20">
                     <div className="text-4xl font-black">{bmi}</div>
                   </div>
                </div>
                
                <div 
                  className="absolute bottom-0 left-1/2 w-1 h-[130px] bg-foreground origin-bottom transition-transform duration-1000 ease-out z-10"
                  style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
                >
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 bg-background border-4 border-foreground rounded-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                <div className="p-4 bg-secondary/30 rounded-lg flex justify-between items-center">
                  <span className="text-muted-foreground">Healthy Weight Range:</span>
                  <span className="font-bold">{healthyWeight}</span>
                </div>
                <div className="p-4 bg-secondary/30 rounded-lg flex justify-between items-center">
                  <span className="text-muted-foreground">Ponderal Index:</span>
                  <span className="font-bold">{ponderalIndex} kg/m³</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} title="BMI Calculator FAQs" />
      <Footer />
    </main>
  )
}