'use client'

import { useState, useMemo, useEffect } from 'react'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { Home, DollarSign, TrendingDown } from 'lucide-react'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState(300000)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['mortgage']?.data) {
      setPrincipal(history['mortgage'].data.principal || 300000)
      setRate(history['mortgage'].data.rate || 6.5)
      setYears(history['mortgage'].data.years || 30)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('mortgage', { principal, rate, years })
    }
  }, [principal, rate, years, isMounted])

  const monthlyRate = rate / 100 / 12
  const numberOfPayments = years * 12
  const monthlyPayment = useMemo(() => {
    if (monthlyRate === 0) {
      return principal / numberOfPayments
    }
    return (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / 
           (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  }, [principal, monthlyRate, numberOfPayments])

  const totalPayment = monthlyPayment * numberOfPayments
  const totalInterest = totalPayment - principal

  const faqItems = [
    {
      question: 'What is a mortgage calculator?',
      answer: 'A mortgage calculator is a tool that helps you estimate your monthly mortgage payments based on the loan amount, interest rate, and loan term. It provides insights into your total payment amount and total interest paid over the life of the loan.',
    },
    {
      question: 'How accurate is this mortgage calculator?',
      answer: 'This calculator provides accurate estimates based on the inputs you provide. However, actual mortgage payments may vary due to additional factors like property taxes, insurance, HOA fees, and discount points.',
    },
    {
      question: 'Can I use this calculator for refinancing?',
      answer: 'Yes, you can use this calculator to estimate refinancing scenarios by adjusting the loan amount, interest rate, and remaining loan term to see how refinancing would affect your monthly payments.',
    },
    {
      question: 'What factors affect mortgage payments?',
      answer: 'The main factors are the loan amount (principal), interest rate, and loan term. Additional costs like property taxes, homeowners insurance, PMI (Private Mortgage Insurance), and HOA fees may also apply.',
    },
  ]

  const relatedCalculators = [
    {
      name: 'Loan Calculator',
      description: 'Calculate general loan payments and interest',
      href: '/calculator/loan',
      icon: DollarSign,
    },
    {
      name: 'Auto Loan Calculator',
      description: 'Calculate car financing and monthly payments',
      href: '/calculator/auto-loan',
      icon: TrendingDown,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <BackButton href="/calculators/financial" />
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold">Mortgage Calculator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly mortgage payments, total interest, and create amortization schedules
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
              
              {/* Loan Amount */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Loan Amount: ${principal.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>

              {/* Interest Rate */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Interest Rate (% per year): {rate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  step="0.1"
                  className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>

              {/* Loan Term */}
              <div className="mb-8">
                <label className="block text-sm font-semibold mb-2">
                  Loan Term (years): {years}
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-secondary rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-2 w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/10 to-blue-400/10 border border-blue-600/20 rounded-xl p-8">
              <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
              <p className="text-5xl font-bold text-primary">
                ${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Payment</p>
                <p className="text-2xl font-bold">
                  ${totalPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <p className="text-sm text-muted-foreground mb-2">Total Interest</p>
                <p className="text-2xl font-bold text-red-500">
                  ${totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-card rounded-xl border border-border p-6 space-y-4">
              <h3 className="font-semibold text-lg">Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount:</span>
                  <span className="font-semibold">${principal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Interest Rate:</span>
                  <span className="font-semibold">{rate.toFixed(2)}%</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Loan Term:</span>
                  <span className="font-semibold">{years} years</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="text-muted-foreground">Number of Payments:</span>
                  <span className="font-semibold">{numberOfPayments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <RelatedCalculators calculators={relatedCalculators} />
      <FAQ items={faqItems} title="Mortgage Calculator FAQs" />

      <Footer />
    </main>
  )
}
