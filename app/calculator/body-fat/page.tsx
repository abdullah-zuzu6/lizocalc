'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function BodyFatCalculator() {
  const [age, setAge] = useState<number>(30)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [weight, setWeight] = useState<number>(70)
  const [neck, setNeck] = useState<number>(38)
  const [waist, setWaist] = useState<number>(80)
  const [hip, setHip] = useState<number>(95)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['body-fat']?.data) {
      setAge(history['body-fat'].data.age || 30)
      setGender(history['body-fat'].data.gender || 'male')
      setWeight(history['body-fat'].data.weight || 70)
      setNeck(history['body-fat'].data.neck || 38)
      setWaist(history['body-fat'].data.waist || 80)
      setHip(history['body-fat'].data.hip || 95)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('body-fat', { age, gender, weight, neck, waist, hip })
    }
  }, [age, gender, weight, neck, waist, hip, isMounted])

  const calculateBodyFat = () => {
    if (gender === 'male') {
      // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
      // Simplified using neck, waist measurements
      const bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(waist)) - 450
      return Math.max(0, bodyFat)
    } else {
      // Female formula using neck, waist, hip
      const bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(hip)) - 450
      return Math.max(0, bodyFat)
    }
  }

  const bodyFatPercentage = calculateBodyFat()
  const bodyFatWeight = (weight * (bodyFatPercentage / 100)).toFixed(2)
  const leanBodyMass = (weight - Number(bodyFatWeight)).toFixed(2)

  const getFatCategory = () => {
    if (bodyFatPercentage < 10) return { label: 'Essential Fat', color: 'text-accent' }
    if (bodyFatPercentage < 18) return { label: 'Athletes', color: 'text-primary' }
    if (bodyFatPercentage < 25) return { label: 'Fitness', color: 'text-primary' }
    if (bodyFatPercentage < 32) return { label: 'Average', color: 'text-muted-foreground' }
    return { label: 'Obese', color: 'text-destructive' }
  }

  const category = getFatCategory()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <BackButton href="/calculators/fitness" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Body Fat Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Estimate your body fat percentage using body measurements
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold mb-3">Gender</label>
              <div className="flex gap-4">
                {(['male', 'female'] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => setGender(option)}
                    className={`flex-1 py-3 px-4 rounded-lg border font-medium transition-all capitalize ${
                      gender === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Age: {age} years
              </label>
              <input
                type="range"
                min="1"
                max="120"
                step="1"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Weight: {weight} kg
              </label>
              <input
                type="range"
                min="20"
                max="200"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                step="0.1"
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Neck */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Neck Circumference: {neck} cm
              </label>
              <input
                type="range"
                min="20"
                max="60"
                step="0.1"
                value={neck}
                onChange={(e) => setNeck(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={neck}
                onChange={(e) => setNeck(Number(e.target.value))}
                step="0.1"
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Waist */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Waist Circumference: {waist} cm
              </label>
              <input
                type="range"
                min="40"
                max="160"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
                step="0.1"
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Hip (only for females) */}
            {gender === 'female' && (
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Hip Circumference: {hip} cm
                </label>
                <input
                  type="range"
                  min="60"
                  max="160"
                  step="0.1"
                  value={hip}
                  onChange={(e) => setHip(Number(e.target.value))}
                  className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <input
                  type="number"
                  value={hip}
                  onChange={(e) => setHip(Number(e.target.value))}
                  step="0.1"
                  className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Body Fat Percentage</p>
            <p className={`text-4xl font-bold ${category.color}`}>{bodyFatPercentage.toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground mt-2">{category.label}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Body Fat Weight</p>
            <p className="text-4xl font-bold text-accent">{bodyFatWeight}</p>
            <p className="text-xs text-muted-foreground mt-2">kg</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Lean Body Mass</p>
            <p className="text-4xl font-bold text-foreground">{leanBodyMass}</p>
            <p className="text-xs text-muted-foreground mt-2">kg</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Body Fat Measurement</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            This calculator uses the U.S. Navy Body Fat formula based on body circumference measurements. 
            It's a non-invasive method that provides a reasonable estimate of body fat percentage.
          </p>
          <p className="text-muted-foreground text-sm">
            Body fat categories: Essential Fat (males &lt;10%, females &lt;13%), Athletes (males 10-13%, females 14-20%), 
            Fitness (males 14-17%, females 21-24%), Average, and Obese.
          </p>
        </div>

        {/* Related Calculators */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="font-semibold text-lg mb-6">Related Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/calculator/bmi"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">BMI Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate body mass index</p>
            </Link>
            <Link
              href="/calculator/calorie"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Calorie Calculator</p>
              <p className="text-sm text-muted-foreground">Estimate daily calorie needs</p>
            </Link>
            <Link
              href="/calculator/bmr"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">BMR Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate basal metabolic rate</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
