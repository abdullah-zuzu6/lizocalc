'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, ArrowLeft, Clock } from 'lucide-react'

const calculators = [
  {
    name: 'Age Calculator ->',
    description: 'Calculate your age in years, months, and days',
    href: '/calculator/age',
    category: 'Time',
  },
  {
    name: 'Date Calculator ->',
    description: 'Add or subtract days from dates, calculate date differences',
    href: '/calculator/date',
    category: 'Time',
  },
  {
    name: 'Time Calculator ->',
    description: 'Add and subtract time durations, convert time units',
    href: '/calculator/time',
    category: 'Time',
  },
  {
    name: 'Hours Calculator ->',
    description: 'Calculate working hours, billing time, and time tracking',
    href: '/calculator/hours',
    category: 'Time',
  },
  {
    name: 'GPA Calculator ->',
    description: 'Calculate your Grade Point Average and weighted GPA',
    href: '/calculator/gpa',
    category: 'Education',
  },
]

export default function OtherCalculators() {
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
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <Clock className="w-8 h-8 text-green-500" />
            <h1 className="text-4xl font-bold">Other Calculators</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Useful calculators for various purposes including time, dates, age, GPA, and more.
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
              <Link key={calc.href} href={calc.href}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all group cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2 rounded-lg bg-green-600/10">
                      <Clock className="w-6 h-6 text-green-500" />
                    </div>
                    <span className="text-xs font-semibold text-green-500 bg-green-600/10 px-3 py-1 rounded-full">
                      {calc.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {calc.name }
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No calculators found matching "{searchQuery}"</p>
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
