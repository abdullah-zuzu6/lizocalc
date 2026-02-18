'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function AutoLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000)
  const [downPayment, setDownPayment] = useState<number>(6000)
  const [interestRate, setInterestRate] = useState<number>(6.5)
  const [loanTerm, setLoanTerm] = useState<number>(5)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['auto-loan']?.data) {
      setVehiclePrice(history['auto-loan'].data.vehiclePrice || 30000)
      setDownPayment(history['auto-loan'].data.downPayment || 6000)
      setInterestRate(history['auto-loan'].data.interestRate || 6.5)
      setLoanTerm(history['auto-loan'].data.loanTerm || 5)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('auto-loan', { vehiclePrice, downPayment, interestRate, loanTerm })
    }
  }, [vehiclePrice, downPayment, interestRate, loanTerm, isMounted])

  const principal = vehiclePrice - downPayment
  
  const calculatePayment = () => {
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    
    if (monthlyRate === 0) {
      return (principal / numberOfPayments).toFixed(2)
    }
    
    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    
    return monthlyPayment.toFixed(2)
  }

  const totalInterest = (
    Number(calculatePayment()) * loanTerm * 12 - principal
  ).toFixed(2)

  const totalPayment = (principal + Number(totalInterest)).toFixed(2)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Auto Loan Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your monthly car loan payment and total interest
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* Vehicle Price */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Vehicle Price: ${vehiclePrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="5000"
                max="500000"
                step="1000"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Down Payment: ${downPayment.toLocaleString()} ({((downPayment / vehiclePrice) * 100).toFixed(1)}%)
              </label>
              <input
                type="range"
                min="0"
                max={vehiclePrice}
                step="1000"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
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
                Loan Term: {loanTerm} years
              </label>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Monthly Payment</p>
            <p className="text-4xl font-bold text-primary">${calculatePayment()}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Interest</p>
            <p className="text-4xl font-bold text-accent">${totalInterest}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Paid</p>
            <p className="text-4xl font-bold text-foreground">${totalPayment}</p>
          </div>
        </div>

        {/* Loan Amount Summary */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <h3 className="font-semibold text-lg mb-4">Loan Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Vehicle Price:</span>
              <span className="font-semibold">${vehiclePrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Down Payment:</span>
              <span className="font-semibold">${downPayment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-4 col-span-2">
              <span className="text-muted-foreground">Loan Amount:</span>
              <span className="font-semibold">${principal.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Auto Loans</h3>
          </div>
          <p className="text-muted-foreground">
            An auto loan calculator helps you understand the true cost of borrowing for a vehicle. 
            This tool shows you the monthly payment, total interest paid, and the total cost of the loan 
            over its entire term.
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
              <p className="text-sm text-muted-foreground">Calculate personal loan payments</p>
            </Link>
            <Link
              href="/calculator/mortgage"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Mortgage Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate mortgage payments</p>
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

      <Footer />
    </main>
  )
}
