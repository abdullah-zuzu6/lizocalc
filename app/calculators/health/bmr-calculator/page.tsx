'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function BMRCalculator() {
  const [age, setAge] = useState<number>(30)
  const [weight, setWeight] = useState<number>(70)
  const [height, setHeight] = useState<number>(175)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['bmr']?.data) {
      setAge(history['bmr'].data.age || 30)
      setWeight(history['bmr'].data.weight || 70)
      setHeight(history['bmr'].data.height || 175)
      setGender(history['bmr'].data.gender || 'male')
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('bmr', { age, weight, height, gender })
    }
  }, [age, weight, height, gender, isMounted])

  const calculateBMR = () => {
    if (gender === 'male') {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }
  }

  const bmr = calculateBMR()
  const caloriesPerMonth = (bmr * 30).toFixed(0)
  const caloriesPerYear = (bmr * 365).toFixed(0)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">BMR Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your Basal Metabolic Rate - calories burned at rest
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

            {/* Height */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Height: {height} cm
              </label>
              <input
                type="range"
                min="100"
                max="250"
                step="1"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Daily BMR</p>
            <p className="text-4xl font-bold text-primary">{bmr.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-2">calories/day</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Monthly BMR</p>
            <p className="text-4xl font-bold text-accent">{caloriesPerMonth}</p>
            <p className="text-xs text-muted-foreground mt-2">calories/month</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Yearly BMR</p>
            <p className="text-4xl font-bold text-foreground">{caloriesPerYear}</p>
            <p className="text-xs text-muted-foreground mt-2">calories/year</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Basal Metabolic Rate</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Basal Metabolic Rate (BMR) is the number of calories your body needs to function at rest. 
            This calculation uses the Mifflin-St Jeor equation, which is considered one of the most accurate 
            methods for estimating BMR based on age, weight, height, and gender.
          </p>
          <p className="text-muted-foreground text-sm">
            Your actual daily energy expenditure (TDEE) will be higher when you factor in physical activity. 
            BMR typically represents about 60-75% of your total daily calorie burn.
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
              href="/calculator/body-fat"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Body Fat Calculator</p>
              <p className="text-sm text-muted-foreground">Estimate body fat percentage</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
