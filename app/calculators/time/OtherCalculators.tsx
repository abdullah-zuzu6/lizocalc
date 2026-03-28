'use client'

import { useState, useMemo, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, ArrowLeft, Clock } from 'lucide-react'
import Link from 'next/link'

const calculators = [
  {
    name: 'Age Calculator',
    description: 'Calculate your age in years, months, and days',
    href: '/calculators/time/age-calculator',
    category: 'Time',
  },
  {
    name: 'Date Calculator',
    description: 'Add or subtract days from dates, calculate date differences',
    href: '/calculators/time/date-calculator',
    category: 'Time',
  },
  {
    name: 'Time Calculator',
    description: 'Add and subtract time durations, convert time units',
    href: '/calculators/time/time-calculator',
    category: 'Time',
  },
  {
    name: 'Hours Calculator',
    description: 'Calculate working hours, billing time, and time tracking',
    href: '/calculators/time/hours-calculator',
    category: 'Time',
  },
]

export default function OtherCalculators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredCalculators = useMemo(() => {
    return calculators.filter(
      (calc) =>
        calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        calc.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <main className="min-h-screen bg-background">

      {/* NAVBAR */}
      <Navbar />

      {/* HEADER */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="p-2 rounded-lg hover:bg-secondary">
              <ArrowLeft className="w-6 h-6" />
            </Link>

            <Clock className="w-8 h-8 text-green-500" />

            <h1 className="text-4xl font-bold">
              Time Calculators – Age, Date & Hours Tools
            </h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Free online tools for calculating age, dates, working hours, and time differences instantly.
          </p>

          {/* SEARCH */}
         <div className="relative w-full">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />

  <input
    type="text"
    placeholder="Search calculators (age, date, time, hours)..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    disabled={!mounted}
    aria-label="Search calculators"
    className="
      w-full
      pl-12 pr-4 py-3
      border border-border
      rounded-xl
      bg-card
      text-foreground
      placeholder:text-muted-foreground
      focus:outline-none
      focus:ring-2 focus:ring-primary/50
      focus:border-primary
      transition-all
      duration-200
    "
  />
</div>

        </div>
      </section>

      {/* GRID */}
      <section className="py-12 px-4 max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">
          All Time Calculation Tools
        </h2>

        {filteredCalculators.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">

            {filteredCalculators.map((calc) => (
              <Link key={calc.href} href={calc.href} prefetch={false}>
                <div className="p-6 border rounded-xl hover:shadow-lg transition">

                  <div className="flex justify-between mb-4">
                    <Clock className="w-6 h-6 text-green-500" />
                    <span className="text-xs text-green-600">
                      {calc.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold">
                    {calc.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {calc.description}
                  </p>

                </div>
              </Link>
            ))}

          </div>
        ) : (
          <div className="text-center py-12">
            <p>No calculators found</p>

            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 bg-black text-white rounded"
            >
              Clear
            </button>
          </div>
        )}

      </section>

      <Footer />
    </main>
  )
}