'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Calculator as CalcIcon, X, ArrowRight, SearchXIcon } from 'lucide-react'
import NoPrefetchLink from './NoPrefetchLink'

const allCalculators = [
  // Financial
  { name: 'Mortgage Calculator', href: '/calculators/financial/mortgage-calculator', category: 'Financial' },
  { name: 'Loan Calculator', href: '/calculators/financial/loan-calculator', category: 'Financial' },
  { name: 'Auto Loan Calculator', href: '/calculators/financial/auto-loan-calculator', category: 'Financial' },
  { name: 'Interest Calculator', href: '/calculators/financial/interest-calculator', category: 'Financial' },
  { name: 'Payment Calculator', href: '/calculators/financial/payment-calculator', category: 'Financial' },
  { name: 'Compound Interest Calculator', href: '/calculators/financial/compound-interest-calculator', category: 'Financial' },
  { name: 'Inflation Calculator', href: '/calculators/financial/inflation-calculator', category: 'Financial' },
  { name: 'Salary Calculator', href: '/calculators/financial/salary-calculator', category: 'Financial' },
  { name: 'ROI Calculator', href: '/calculators/financial/roi-calculator', category: 'Financial' },

  // Fitness & Health
  { name: 'BMI Calculator', href: '/calculators/health/bmi-calculator', category: 'Fitness' },
  { name: 'Calorie Calculator', href: '/calculators/health/calorie-calculator', category: 'Fitness' },
  { name: 'Body Fat Calculator', href: '/calculators/health/body-fat-calculator', category: 'Fitness' },
  { name: 'BMR Calculator', href: '/calculators/health/bmr-calculator', category: 'Fitness' },
  { name: 'TDEE Calculator', href: '/calculators/health/tdee-calculator', category: 'Fitness' },
  { name: 'Macros Calculator', href: '/calculators/health/macros-calculator', category: 'Fitness' },
  { name: 'Calorie Deficit Calculator', href: '/calculators/health/calorie-deficit-calculator', category: 'Fitness' },
  { name: 'Sleep Calculator', href: '/calculators/health/sleep-calculator', category: 'Fitness' },

  // Math
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

  // Time
  { name: 'Age Calculator', href: '/calculators/time/age-calculator', category: 'Time' },
  { name: 'Date Calculator', href: '/calculators/time/date-calculator', category: 'Time' },
  { name: 'Time Calculator', href: '/calculators/time/time-calculator', category: 'Time' },
  { name: 'Hours Calculator', href: '/calculators/time/hours-calculator', category: 'Time' },

  // Education
  { name: 'GPA Calculator', href: '/calculators/education/gpa-calculator', category: 'Education' },
  { name: 'Grade Calculator', href: '/calculators/education/grade-calculator', category: 'Education' },

  // Physics
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

  const filteredResults = query === '' 
    ? [] 
    : allCalculators.filter((calc) =>
        calc.name.toLowerCase().includes(query.toLowerCase()) ||
        calc.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)

  return (
    <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md" ref={searchRef}>
      <div className="relative group">
<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white transition-colors duration-300" />        <input
       
          type="text"
          placeholder="Search Math,health,fitness and other calculators "
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full bg-secondary/30 backdrop-blur-sm border border-border rounded-lg py-1.5 pl-9 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-primary/40 focus:bg-card focus:border-primary/40 transition-all duration-300 text-foreground placeholder:text-muted-foreground/70"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-secondary/80 text-muted-foreground transition-all"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && query.length > 0 && (
        <div className="absolute top-full mt-1.5 w-full bg-card/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden z-[100] animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="max-h-[320px] overflow-y-auto p-1.5 custom-scrollbar">
            {filteredResults.length > 0 ? (
              filteredResults.map((calc) => (
                <NoPrefetchLink
                  key={calc.href}
                  href={calc.href}
                  onClick={() => { setIsOpen(false); setQuery(''); }}
                  className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-md hover:bg-primary/5 transition-all group mb-0.5"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <CalcIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                        {calc.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-serif leading-none tracking-tight">
                        {calc.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-all transform -translate-x-1 group-hover:translate-x-0" />
                </NoPrefetchLink>
              ))
            ) : (
              <div className="py-6 text-center text-[12px] text-muted-foreground font-serif">
                No results for "{query}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}