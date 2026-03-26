'use client'

import { useState, useMemo } from 'react'
import NoPrefetchLink from '@/components/NoPrefetchLink'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, ArrowLeft, Heart } from 'lucide-react'
import Link from 'next/link'

const calculators = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index based on height and weight',
    href: '/calculators/health/bmi-calculator',
    category: 'Health',
  },
  {
    name: 'Calorie Calculator',
    description: 'Estimate daily calorie needs based on activity level and goals',
    href: '/calculators/health/calorie-calculator',
    category: 'Health',
  },
  {
    name: 'Body Fat Calculator',
    description: 'Estimate body fat percentage using various methods',
    href: '/calculators/health/body-fat-calculator',
    category: 'Health',
  },
  {
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate and daily energy expenditure',
    href: '/calculators/health/bmr-calculator',
    category: 'Health',
  },
  {
    name: 'TDEE Calculator',
    description: 'Calculate Total Daily Energy Expenditure based on activity level',
    href: '/calculators/health/tdee-calculator',
    category: 'Health',
  },
  {
    name: 'Macros Calculator',
    description: 'Calculate protein, carbs, and fats needed for your goals',
    href: '/calculators/health/macros-calculator',
    category: 'Health',
  },
  {
    name: 'Calorie Deficit Calculator',
    description: 'Calculate the calorie deficit needed to reach your weight loss goals',
    href: '/calculators/health/calorie-deficit-calculator',
    category: 'Health',
  },
  
   {
    name: 'Sleep Calculator',
    description: 'Calculate your ideal sleep duration based on age and lifestyle',
    href: '/calculators/health/sleep-calculator',
    category: 'Health',
  },
]


export default function FitnessCalculators() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCalculators = useMemo(
    () =>
      calculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">

            {/* Back Button */}
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>

            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-4xl font-bold">Fitness & Health Calculators</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Track your fitness goals with our health calculators.
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCalculators.map((calc) => (
              <NoPrefetchLink key={calc.href} href={calc.href}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-red-600/10">
                      <Heart className="w-6 h-6 text-red-500" />
                    </div>
                    <span className="text-xs font-semibold text-red-500 bg-red-600/10 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {calc.description}
                  </p>
                </div>
              </NoPrefetchLink>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No calculators found matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}