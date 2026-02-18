'use client'

import { useState, useMemo, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { Heart, TrendingUp, Activity } from 'lucide-react'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function BMICalculator() {
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['bmi']?.data) {
      setHeight(history['bmi'].data.height || 170)
      setWeight(history['bmi'].data.weight || 70)
      setUnit(history['bmi'].data.unit || 'metric')
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('bmi', { height, weight, unit })
    }
  }, [height, weight, unit, isMounted])

  const { bmi, category, color } = useMemo(() => {
    let h = height
    let w = weight

    if (unit === 'imperial') {
      // Convert inches to cm and pounds to kg
      h = height * 2.54
      w = weight * 0.453592
    }

    const h_m = h / 100
    const bmiValue = w / (h_m * h_m)

    let cat = ''
    let col = ''

    if (bmiValue < 18.5) {
      cat = 'Underweight'
      col = 'text-blue-500'
    } else if (bmiValue < 25) {
      cat = 'Normal Weight'
      col = 'text-green-500'
    } else if (bmiValue < 30) {
      cat = 'Overweight'
      col = 'text-yellow-500'
    } else {
      cat = 'Obese'
      col = 'text-red-500'
    }

    return { bmi: bmiValue.toFixed(1), category: cat, color: col }
  }, [height, weight, unit])

  const faqItems = [
    {
      question: 'What does BMI stand for?',
      answer: 'BMI stands for Body Mass Index. It is a measure of body fat based on your height and weight that applies to both adult men and women.',
    },
    {
      question: 'Is BMI an accurate measure of health?',
      answer: 'BMI is a screening tool that can indicate possible weight problems, but it is not a direct measure of body fat percentage. For a comprehensive health assessment, consult with a healthcare professional.',
    },
    {
      question: 'What are the BMI categories?',
      answer: 'The BMI categories are: Underweight (below 18.5), Normal Weight (18.5-24.9), Overweight (25-29.9), and Obese (30 and above).',
    },
    {
      question: 'How is BMI calculated?',
      answer: 'BMI is calculated by dividing your weight in kilograms by the square of your height in meters (kg/m²). This calculator does the math for you automatically.',
    },
  ]

  const relatedCalculators = [
    {
      name: 'Calorie Calculator',
      description: 'Estimate your daily calorie needs',
      href: '/calculator/calorie',
      icon: TrendingUp,
    },
    {
      name: 'Body Fat Calculator',
      description: 'Calculate your body fat percentage',
      href: '/calculator/body-fat',
      icon: Activity,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/calculators/fitness" />
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-red-600/10">
              <Heart className="w-8 h-8 text-red-500" />
            </div>
            <h1 className="text-4xl font-bold">BMI Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculate your Body Mass Index and understand your health status
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator */}
          <div className="space-y-8">
            <div className="bg-card rounded-xl border border-border p-8">
              <h2 className="text-2xl font-bold mb-6">Calculator</h2>

              {/* Unit Toggle */}
              <div className="mb-8 flex gap-4">
                <button
                  onClick={() => setUnit('metric')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    unit === 'metric'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Metric (cm, kg)
                </button>
                <button
                  onClick={() => setUnit('imperial')}
                  className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                    unit === 'imperial'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Imperial (in, lbs)
                </button>
              </div>

              {/* Height */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Height: {height} {unit === 'metric' ? 'cm' : 'in'}
                </label>
                <input
                  type="range"
                  min={unit === 'metric' ? '100' : '40'}
                  max={unit === 'metric' ? '250' : '100'}
                  step="1"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>

              {/* Weight */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Weight: {weight} {unit === 'metric' ? 'kg' : 'lbs'}
                </label>
                <input
                  type="range"
                  min={unit === 'metric' ? '30' : '66'}
                  max={unit === 'metric' ? '200' : '440'}
                  step="1"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className={`bg-gradient-to-br from-red-600/10 to-red-400/10 border border-red-600/20 rounded-xl p-8`}>
              <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
              <p className={`text-5xl font-bold ${color}`}>{bmi}</p>
              <p className={`text-xl font-semibold mt-4 ${color}`}>{category}</p>
            </div>

            {/* BMI Chart */}
            <div className="bg-card rounded-xl border border-border p-8">
              <h3 className="font-semibold text-lg mb-6">BMI Categories</h3>
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${bmi < 18.5 ? 'bg-blue-600/10 border-2 border-blue-600' : 'bg-secondary/50'}`}>
                  <div className="flex justify-between">
                    <span className="font-semibold">Underweight</span>
                    <span className="text-muted-foreground">BMI &lt; 18.5</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${bmi >= 18.5 && bmi < 25 ? 'bg-green-600/10 border-2 border-green-600' : 'bg-secondary/50'}`}>
                  <div className="flex justify-between">
                    <span className="font-semibold">Normal Weight</span>
                    <span className="text-muted-foreground">18.5 - 24.9</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${bmi >= 25 && bmi < 30 ? 'bg-yellow-600/10 border-2 border-yellow-600' : 'bg-secondary/50'}`}>
                  <div className="flex justify-between">
                    <span className="font-semibold">Overweight</span>
                    <span className="text-muted-foreground">25 - 29.9</span>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${bmi >= 30 ? 'bg-red-600/10 border-2 border-red-600' : 'bg-secondary/50'}`}>
                  <div className="flex justify-between">
                    <span className="font-semibold">Obese</span>
                    <span className="text-muted-foreground">BMI ≥ 30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <RelatedCalculators calculators={relatedCalculators} />
      <FAQ items={faqItems} title="BMI Calculator FAQs" />

      <Footer />
    </main>
  )
}
