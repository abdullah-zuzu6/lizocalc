'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, Calculator as CalcIcon, X, ArrowRight } from 'lucide-react'
import NoPrefetchLink from './NoPrefetchLink'

const allCalculators = [
  { name: 'Mortgage Calculator', href: '/calculators/financial/mortgage-calculator', category: 'Financial' },
  { name: 'Loan Calculator', href: '/calculators/financial/loan-calculator', category: 'Financial' },
  { name: 'Auto Loan Calculator', href: '/calculators/financial/auto-loan-calculator', category: 'Financial' },
  { name: 'Interest Calculator', href: '/calculators/financial/interest-calculator', category: 'Financial' },
  { name: 'Payment Calculator', href: '/calculators/financial/payment-calculator', category: 'Financial' },
  { name: 'Compound Interest Calculator', href: '/calculators/financial/compound-interest-calculator', category: 'Financial' },
  { name: 'Inflation Calculator', href: '/calculators/financial/inflation-calculator', category: 'Financial' },
  { name: 'Salary Calculator', href: '/calculators/financial/salary-calculator', category: 'Financial' },
  { name: 'ROI Calculator', href: '/calculators/financial/roi-calculator', category: 'Financial' },
  { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', category: 'Fitness' },
  { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', category: 'Fitness' },
  { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', category: 'Fitness' },
  { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', category: 'Fitness' },
  { name: 'TDEE Calculator', href: '/calculators/health/tdee-calculator', category: 'Fitness' },
  { name: 'Macros Calculator', href: '/calculators/health/macros-calculator', category: 'Fitness' },
  { name: 'Calorie Deficit Calculator', href: '/calculators/health/calorie-deficit-calculator', category: 'Fitness' },
  { name: 'Sleep Calculator', href: '/calculators/health/sleep-calculator', category: 'Fitness' },
  { name: 'Scientific Calculator', href: '/calculators/math/scientific-calculator', category: 'Math' },
  { name: 'Fraction Calculator', href: '/calculators/math/fraction-calculator', category: 'Math' },
  { name: 'Percentage Calculator', href: '/calculators/math/percentage-calculator', category: 'Math' },
  { name: 'Triangle Calculator', href: '/calculators/math/triangle-calculator', category: 'Math' },
  { name: 'Pythagorean Calculator', href: '/calculators/math/pythagorean-theorem-calculator', category: 'Math' },
  { name: 'Half-Life Calculator', href: '/calculators/math/half-life-calculator', category: 'Math' },
  { name: 'Binary Calculator', href: '/calculators/math/binary-calculator', category: 'Math' },
  { name: 'Hex Calculator', href: '/calculators/math/hexadecimal-calculator', category: 'Math' },
  { name: 'LCM Calculator', href: '/calculators/math/lcm-calculator', category: 'Math' },
  { name: 'GCF Calculator', href: '/calculators/math/gcf-calculator', category: 'Math' },
  { name: 'Permutation & Combination Calculator', href: '/calculators/math/permutation-combination-calculator', category: 'Math' },
  { name: 'Z-Score Calculator', href: '/calculators/math/z-score-calculator', category: 'Math' },
  { name: 'Conversion Calculator', href: '/calculators/math/conversion-calculator', category: 'Math' },
  { name: 'Age Calculator', href: '/calculators/time/age-calculator', category: 'Time' },
  { name: 'Date Calculator', href: '/calculators/time/date-calculator', category: 'Time' },
  { name: 'Time Calculator', href: '/calculators/time/time-calculator', category: 'Time' },
  { name: 'Hours Calculator', href: '/calculators/time/hours-calculator', category: 'Time' },
  { name: 'GPA Calculator', href: '/calculators/education/gpa-calculator', category: 'Education' },
  { name: 'Grade Calculator', href: '/calculators/education/grade-calculator', category: 'Education' },
    { name: 'CGPA Calculator', href: '/calculators/education/cgpa-calculator', category: 'Education' },
  { name: 'Density Calculator', href: '/calculators/physics/density-calculator', category: 'Physics' },
  { name: 'Mass Calculator', href: '/calculators/physics/mass-calculator', category: 'Physics' },
  { name: 'Speed Calculator', href: '/calculators/physics/speed-calculator', category: 'Physics' },
  { name: 'Weight Calculator', href: '/calculators/physics/weight-calculator', category: 'Physics' },
]
export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredResults = useMemo(() => {
    if (!query) return []
    return allCalculators
      .filter((calc) =>
        calc.name.toLowerCase().includes(query.toLowerCase()) ||
        calc.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 6)
  }, [query])

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        <input
          type="text"
          placeholder="Search calculators..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(!!e.target.value)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-secondary/30 border border-border rounded-lg py-2 pl-9 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setIsOpen(false)
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && query && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="max-h-72 overflow-y-auto p-2">
            {filteredResults.length > 0 ? (
              filteredResults.map((calc) => (
                <NoPrefetchLink
                  key={calc.href}
                  href={calc.href}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className="flex items-center justify-between p-3 hover:bg-primary/5 rounded-md transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <CalcIcon className="w-4 h-4 text-primary" />
                    <div>
                      <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {calc.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{calc.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </NoPrefetchLink>
              ))
            ) : (
              <div className="p-6 text-center">
                <div className="text-sm text-muted-foreground">No results found</div>
                <div className="text-xs text-muted-foreground mt-1">Try different keywords</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}