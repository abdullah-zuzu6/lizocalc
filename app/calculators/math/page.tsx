
'use client'

import { useState, useMemo } from 'react'
import NoPrefetchLink from '@/components/NoPrefetchLink'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, ArrowLeft, Sigma } from 'lucide-react'

const calculators = [
  {
    name: 'Scientific Calculator',
    description: 'Advanced calculator with trigonometry, logarithms, and scientific functions',
    href: '/calculators/math/scientific-calculator',
    category: 'Advanced',
  },
  {
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, and divide fractions with simplification',
    href: '/calculators/math/fraction-calculator',
    category: 'Basic',
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages, discounts, markups, and percentage changes',
    href: '/calculators/math/percentage-calculator',
    category: 'Basic',
  },
  {
    name: 'Triangle Calculator',
    description: 'Solve triangles using known sides and angles',
    href: '/calculators/math/triangle-calculator',
    category: 'Advanced',
  },
  {
    name: 'Pythagorean Theorem Calculator',
    description: 'Solve right triangles using the Pythagorean theorem',
    href: '/calculators/math/pythagorean-theorem-calculator',
    category: 'Advanced',
  },
  {
    name: 'Half Life Calculator',
    description: 'Calculate remaining substance after a given time period',
    href: '/calculators/math/half-life-calculator',
    category: 'Advanced',
  },
  {
    name: 'Binary Calculator',
    description: 'Perform bitwise arithmetic and convert between binary, decimal, and hexadecimal',
    href: '/calculators/math/binary-calculator',
    category: 'Advanced',
  },
  {
    name: 'Hexadecimal Calculator',
    description: 'Perform arithmetic operations on hexadecimal values',
    href: '/calculators/math/hexadecimal-calculator',
    category: 'Advanced',
  },
  {
    name: 'Least Common Multiple (LCM) Calculator',
    description: 'Find the least common multiple of a set of integers',
    href: '/calculators/math/lcm-calculator',
    category: 'Advanced',
  },
  {
    name: 'Greatest Common Factor (GCF) Calculator',
    description: 'Find the greatest common factor of a set of integers',
    href: '/calculators/math/gcf-calculator',
    category: 'Advanced',
  },
  
  {
    name: 'Permutation and Combination Calculator',
    description: 'Calculate permutations and combinations of items',
    href: '/calculators/math/permutation-combination-calculator',
    category: 'Advanced',
  },
  {
    name: 'Z Score Calculator',
    description: 'Calculate z-scores and percentile ranks for normally distributed data',
    href: '/calculators/math/z-score-calculator',
    category: 'Advanced',
  },
  {
    name: 'Conversion Calculator',
    description: 'Convert between different units of measurement',
    href: '/calculators/math/conversion-calculator',
    category: 'Advanced',
  },
]

export default function MathCalculators() {
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
            <NoPrefetchLink
              href="/"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </NoPrefetchLink>

            <Sigma className="w-8 h-8 text-purple-500" />
            <h1 className="text-4xl font-bold">Math Calculators</h1>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Solve mathematical problems with our collection of advanced calculators.
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
                    <div className="p-2 rounded-lg bg-purple-600/10">
                      <Sigma className="w-6 h-6 text-purple-500" />
                    </div>
                    <span className="text-xs font-semibold text-purple-500 bg-purple-600/10 px-3 py-1 rounded-full">
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