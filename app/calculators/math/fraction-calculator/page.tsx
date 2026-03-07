'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
const simplifyFraction = (num: number, den: number) => {
  const g = gcd(Math.abs(num), Math.abs(den))
  return { numerator: num / g, denominator: den / g }
}

export default function FractionCalculator() {
  const [num1, setNum1] = useState<number>(1)
  const [den1, setDen1] = useState<number>(2)
  const [num2, setNum2] = useState<number>(1)
  const [den2, setDen2] = useState<number>(3)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['fraction']?.data) {
      setNum1(history['fraction'].data.num1 || 1)
      setDen1(history['fraction'].data.den1 || 2)
      setNum2(history['fraction'].data.num2 || 1)
      setDen2(history['fraction'].data.den2 || 3)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('fraction', { num1, den1, num2, den2 })
    }
  }, [num1, den1, num2, den2, isMounted])
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'divide'>('add')

  const calculate = () => {
    let resultNum = 0, resultDen = 1
    
    switch (operation) {
      case 'add':
        resultNum = num1 * den2 + num2 * den1
        resultDen = den1 * den2
        break
      case 'subtract':
        resultNum = num1 * den2 - num2 * den1
        resultDen = den1 * den2
        break
      case 'multiply':
        resultNum = num1 * num2
        resultDen = den1 * den2
        break
      case 'divide':
        resultNum = num1 * den2
        resultDen = den1 * num2
        break
    }

    const simplified = simplifyFraction(resultNum, resultDen)
    const decimal = (resultNum / resultDen).toFixed(6)
    
    return { simplified, decimal }
  }

  const result = calculate()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <BackButton href="/calculators/math" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fraction Calculator</h1>
          <p className="text-lg text-muted-foreground">Add, subtract, multiply, and divide fractions</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            {/* First Fraction */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <label className="block text-sm font-semibold mb-4">First Fraction</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} placeholder="Numerator" className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
                  <div className="border-t border-border my-2"></div>
                  <input type="number" value={den1} onChange={(e) => setDen1(Number(e.target.value))} placeholder="Denominator" className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
                </div>
                <div className="text-2xl font-bold text-muted-foreground">=</div>
                <div className="text-xl font-semibold text-primary">{(num1 / den1).toFixed(4)}</div>
              </div>
            </div>

            {/* Operation */}
            <div>
              <label className="block text-sm font-semibold mb-3">Operation</label>
              <div className="grid grid-cols-4 gap-2">
                {(['add', 'subtract', 'multiply', 'divide'] as const).map((op) => (
                  <button key={op} onClick={() => setOperation(op)} className={`py-2 px-3 rounded-lg border font-medium transition-all capitalize ${operation === op ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary/50'}`}>
                    {op === 'add' && '+'}{op === 'subtract' && '−'}{op === 'multiply' && '×'}{op === 'divide' && '÷'}
                  </button>
                ))}
              </div>
            </div>

            {/* Second Fraction */}
            <div className="bg-background rounded-lg p-6 border border-border">
              <label className="block text-sm font-semibold mb-4">Second Fraction</label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} placeholder="Numerator" className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
                  <div className="border-t border-border my-2"></div>
                  <input type="number" value={den2} onChange={(e) => setDen2(Number(e.target.value))} placeholder="Denominator" className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground" />
                </div>
                <div className="text-2xl font-bold text-muted-foreground">=</div>
                <div className="text-xl font-semibold text-primary">{(num2 / den2).toFixed(4)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Simplified Result</p>
            <div className="text-3xl font-bold text-primary">
              {result.simplified.numerator}/{result.simplified.denominator}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Decimal Form</p>
            <p className="text-3xl font-bold text-accent">{result.decimal}</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Fractions</h3>
          </div>
          <p className="text-muted-foreground">This calculator simplifies fractions to their lowest terms automatically and displays results as both fractions and decimals.</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <h3 className="font-semibold text-lg mb-6">Related Calculators</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/calculator/percentage" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
              <p className="font-medium">Percentage Calculator</p>
              <p className="text-sm text-muted-foreground">Calculate percentages</p>
            </Link>
            <Link href="/calculator/scientific" className="p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
              <p className="font-medium">Scientific Calculator</p>
              <p className="text-sm text-muted-foreground">Advanced calculations</p>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
