'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState<number>(1000)
  const [rate, setRate] = useState<number>(5)
  const [years, setYears] = useState<number>(10)
  const [compounding, setCompounding] = useState<'annually' | 'quarterly' | 'monthly' | 'daily'>('annually')
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['interest']?.data) {
      setPrincipal(history['interest'].data.principal || 1000)
      setRate(history['interest'].data.rate || 5)
      setYears(history['interest'].data.years || 10)
      setCompounding(history['interest'].data.compounding || 'annually')
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('interest', { principal, rate, years, compounding })
    }
  }, [principal, rate, years, compounding, isMounted])

  const compoundingValues = {
    annually: 1,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  }

  const calculateCompoundInterest = () => {
    const n = compoundingValues[compounding]
    const amount = principal * Math.pow(1 + rate / 100 / n, n * years)
    return {
      amount: amount.toFixed(2),
      interest: (amount - principal).toFixed(2),
    }
  }

  const result = calculateCompoundInterest()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <BackButton href="/calculators/financial" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Interest Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate compound interest on your investments
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* Principal */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Principal Amount: ${principal.toLocaleString()}
              </label>
              <input
                type="range"
                min="100"
                max="1000000"
                step="100"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Annual Interest Rate: {rate.toFixed(2)}%
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                step="0.1"
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Years */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Time Period: {years} years
              </label>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Compounding */}
            <div>
              <label className="block text-sm font-semibold mb-3">Compounding Frequency</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {(Object.keys(compoundingValues) as Array<keyof typeof compoundingValues>).map((option) => (
                  <button
                    key={option}
                    onClick={() => setCompounding(option)}
                    className={`py-2 px-3 rounded-lg border font-medium transition-all capitalize ${
                      compounding === option
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Interest Earned</p>
            <p className="text-4xl font-bold text-primary">${result.interest}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Amount</p>
            <p className="text-4xl font-bold text-accent">${result.amount}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Principal</p>
            <p className="text-4xl font-bold text-foreground">${principal.toLocaleString()}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Compound Interest</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Compound interest is the interest calculated on both the principal amount and the accumulated interest. 
            The frequency of compounding (annually, quarterly, monthly, or daily) significantly affects the total amount earned.
          </p>
          <p className="text-muted-foreground text-sm">
            Formula: A = P(1 + r/n)^(nt), where A is the final amount, P is principal, r is annual interest rate, 
            n is compounding frequency, and t is time in years.
          </p>
        </div>

        {/* Related Calculators */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="font-semibold text-lg mb-6">Related Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/calculator/loan"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Loan Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate loan payments</p>
            </Link>
            <Link
              href="/calculator/mortgage"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Mortgage Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate mortgage details</p>
            </Link>
            <Link
              href="/calculator/payment"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Payment Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate payments</p>
            </Link>
            <Link
              href="/calculator/auto-loan"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Auto Loan Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate auto loan details</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
