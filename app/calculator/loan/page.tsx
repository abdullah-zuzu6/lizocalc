'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info, TrendingDown, BarChart3 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState<number>(300000)
  const [interestRate, setInterestRate] = useState<number>(5.5)
  const [years, setYears] = useState<number>(30)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['loan']?.data) {
      setPrincipal(history['loan'].data.principal || 300000)
      setInterestRate(history['loan'].data.interestRate || 5.5)
      setYears(history['loan'].data.years || 30)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('loan', { principal, interestRate, years })
    }
  }, [principal, interestRate, years, isMounted])

  const calculateLoan = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = years * 12
    
    if (monthlyRate === 0) {
      return (principal / numberOfPayments).toFixed(2)
    }
    
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    return monthlyPayment.toFixed(2)
  }

  const totalInterest = (
    Number(calculateLoan()) * years * 12 - principal
  ).toFixed(2)

  const totalPayment = (principal + Number(totalInterest)).toFixed(2)

  const faqItems = [
    {
      question: 'How is a loan payment calculated?',
      answer: 'Loan payments are calculated using a standard amortization formula that considers the principal (loan amount), interest rate, and loan term in months. The formula distributes payments across the loan period.',
    },
    {
      question: 'What is the difference between APR and interest rate?',
      answer: 'The interest rate is the cost of borrowing the principal, while APR (Annual Percentage Rate) includes additional fees and costs of the loan.',
    },
    {
      question: 'Can I pay off my loan early?',
      answer: 'Yes, most loans allow early payoff. Paying early reduces the total interest you pay over the life of the loan.',
    },
    {
      question: 'What factors affect loan approval?',
      answer: 'Credit score, income, debt-to-income ratio, and collateral (for secured loans) are the main factors that affect loan approval and interest rates.',
    },
  ]

  const relatedCalculators = [
    {
      name: 'Mortgage Calculator',
      description: 'Calculate home loan payments',
      href: '/calculator/mortgage',
      icon: BarChart3,
    },
    {
      name: 'Auto Loan Calculator',
      description: 'Calculate vehicle financing payments',
      href: '/calculator/auto-loan',
      icon: TrendingDown,
    },
  ]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly loan payment and total interest costs
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* Principal Amount */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Loan Amount: ${principal.toLocaleString()}
              </label>
              <input
                type="range"
                min="1000"
                max="1000000"
                step="1000"
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
                Annual Interest Rate: {interestRate.toFixed(2)}%
              </label>
              <input
                type="range"
                min="0"
                max="20"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Loan Term: {years} years
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
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Monthly Payment</p>
            <p className="text-4xl font-bold text-primary">${calculateLoan()}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Interest</p>
            <p className="text-4xl font-bold text-accent">${totalInterest}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Payment</p>
            <p className="text-4xl font-bold text-foreground">${totalPayment}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Loan Calculations</h3>
          </div>
          <p className="text-muted-foreground">
            This loan calculator uses the standard amortization formula to calculate monthly payments. 
            The calculation takes into account the principal amount, interest rate, and loan term. 
            The monthly payment remains constant throughout the loan period.
          </p>
        </div>

        {/* Related Calculators */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="font-semibold text-lg mb-6">Related Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/calculator/mortgage"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Mortgage Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate mortgage payments</p>
            </Link>
            <Link
              href="/calculator/auto-loan"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Auto Loan Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate car loan payments</p>
            </Link>
            <Link
              href="/calculator/interest"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Interest Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate compound interest</p>
            </Link>
            <Link
              href="/calculator/payment"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Payment Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate payments</p>
            </Link>
          </div>
        </div>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
      <FAQ items={faqItems} title="Loan Calculator FAQs" />

      <Footer />
    </main>
  )
}
