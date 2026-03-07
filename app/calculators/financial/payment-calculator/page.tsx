'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function PaymentCalculator() {
  const [totalAmount, setTotalAmount] = useState<number>(1000)
  const [numberOfPayments, setNumberOfPayments] = useState<number>(12)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['payment']?.data) {
      setTotalAmount(history['payment'].data.totalAmount || 1000)
      setNumberOfPayments(history['payment'].data.numberOfPayments || 12)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('payment', { totalAmount, numberOfPayments })
    }
  }, [totalAmount, numberOfPayments, isMounted])

  const paymentPerInstallment = (totalAmount / numberOfPayments).toFixed(2)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Divide any amount into equal installment payments
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* Total Amount */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Total Amount: ${totalAmount.toLocaleString()}
              </label>
              <input
                type="range"
                min="1"
                max="1000000"
                step="1"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>

            {/* Number of Payments */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Number of Payments: {numberOfPayments}
              </label>
              <input
                type="range"
                min="1"
                max="360"
                step="1"
                value={numberOfPayments}
                onChange={(e) => setNumberOfPayments(Number(e.target.value))}
                className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                value={numberOfPayments}
                onChange={(e) => setNumberOfPayments(Number(e.target.value))}
                className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Payment Per Installment</p>
            <p className="text-4xl font-bold text-primary">${paymentPerInstallment}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Amount</p>
            <p className="text-4xl font-bold text-accent">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Number of Payments</p>
            <p className="text-4xl font-bold text-foreground">{numberOfPayments}</p>
          </div>
        </div>

        {/* Payment Schedule */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <h3 className="font-semibold text-lg mb-6">Payment Schedule Preview</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Array.from({ length: Math.min(12, numberOfPayments) }).map((_, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-background rounded-lg">
                <span className="text-muted-foreground">Payment {i + 1}</span>
                <span className="font-semibold">${paymentPerInstallment}</span>
              </div>
            ))}
            {numberOfPayments > 12 && (
              <div className="flex justify-between items-center p-3 text-muted-foreground text-sm">
                <span>... and {numberOfPayments - 12} more payments</span>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Equal Installments</h3>
          </div>
          <p className="text-muted-foreground">
            This payment calculator divides a total amount into equal installments. Each payment will be exactly 
            the same amount, making budgeting and planning easy. This is useful for splitting bills, breaking down 
            costs, or understanding purchase price over time.
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
              href="/calculator/interest"
              className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <p className="font-medium">Interest Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate compound interest</p>
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
