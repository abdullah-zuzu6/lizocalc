'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info, Heart, Activity, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function CalorieCalculator() {
  const [age, setAge] = useState<number>(30)
  const [weight, setWeight] = useState<number>(70)
  const [height, setHeight] = useState<number>(175)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityLevel, setActivityLevel] = useState<number>(1.375)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['calorie']?.data) {
      setAge(history['calorie'].data.age || 30)
      setWeight(history['calorie'].data.weight || 70)
      setHeight(history['calorie'].data.height || 175)
      setGender(history['calorie'].data.gender || 'male')
      setActivityLevel(history['calorie'].data.activityLevel || 1.375)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('calorie', { age, weight, height, gender, activityLevel })
    }
  }, [age, weight, height, gender, activityLevel, isMounted])

  const activityLevels = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  }

  const calculateBMR = () => {
    if (gender === 'male') {
      return 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age
    } else {
      return 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age
    }
  }

  const bmr = calculateBMR()
  const tdee = bmr * activityLevel

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Calorie Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Estimate your daily calorie needs based on activity level
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

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-semibold mb-3">Activity Level</label>
              <div className="space-y-2">
                {Object.entries(activityLevels).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => setActivityLevel(value)}
                    className={`w-full text-left py-3 px-4 rounded-lg border font-medium transition-all ${
                      activityLevel === value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="capitalize">
                        {key === 'sedentary' && 'Sedentary (little exercise)'}
                        {key === 'light' && 'Light (exercise 1-3 days/week)'}
                        {key === 'moderate' && 'Moderate (exercise 3-5 days/week)'}
                        {key === 'active' && 'Active (exercise 6-7 days/week)'}
                        {key === 'veryActive' && 'Very Active (heavy exercise)'}
                      </span>
                      <span className="text-xs opacity-70">{value}x</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Basal Metabolic Rate (BMR)</p>
            <p className="text-4xl font-bold text-primary">{bmr.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-2">calories/day at rest</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Daily Energy Expenditure (TDEE)</p>
            <p className="text-4xl font-bold text-accent">{tdee.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground mt-2">total calories/day</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Daily Calorie Needs</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            This calculator uses the Mifflin-St Jeor equation to estimate your daily calorie needs based on your 
            personal data and activity level. The BMR is the number of calories you burn at rest, while TDEE includes 
            activity level.
          </p>
          <p className="text-muted-foreground text-sm">
            To lose weight, eat fewer calories than your TDEE. To gain, eat more. A 500 calorie deficit typically 
            results in 1 pound (0.45 kg) of weight loss per week.
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
              href="/calculator/body-fat"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Body Fat Calculator</p>
              <p className="text-sm text-muted-foreground">Estimate body fat percentage</p>
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

      <RelatedCalculators calculators={[
        {
          name: 'BMI Calculator',
          description: 'Calculate your body mass index',
          href: '/calculator/bmi',
          icon: Heart,
        },
        {
          name: 'Body Fat Calculator',
          description: 'Estimate body fat percentage',
          href: '/calculator/body-fat',
          icon: Activity,
        },
      ]} />
      
      <FAQ items={[
        {
          question: 'What is TDEE?',
          answer: 'TDEE stands for Total Daily Energy Expenditure. It\'s the total number of calories your body burns in a day, including basal metabolic rate and calories from activities.',
        },
        {
          question: 'What does activity level mean?',
          answer: 'Activity level is a multiplier based on how much you exercise. Sedentary means little exercise, light means 1-3 days/week, moderate means 3-5 days/week, and active means 6-7 days/week.',
        },
        {
          question: 'How accurate is this calculator?',
          answer: 'This calculator uses the Mifflin-St Jeor equation, which is widely used and accurate for most people. However, individual metabolism varies, so treat this as an estimate.',
        },
        {
          question: 'How can I use this to lose weight?',
          answer: 'To lose weight, consume fewer calories than your TDEE. A deficit of 500 calories per day typically results in about 1 pound of weight loss per week.',
        },
      ]} title="Calorie Calculator FAQs" />

      <Footer />
    </main>
  )
}
