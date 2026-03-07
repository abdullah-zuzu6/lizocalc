'use client'

import { useState, useMemo, useEffect } from 'react'
import { TrendingUp, Info, ArrowRightLeft, Percent, RotateCcw } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'

type CompoundingPeriod = 'Annually (APY)' | 'Semiannually' | 'Quarterly' | 'Monthly (APR)' | 'Semimonthly' | 'Biweekly' | 'Weekly' | 'Daily' | 'Continuously'

export default function CompoundInterestCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Input State matching reference images
  const [inputInterest, setInputInterest] = useState<number>(10)
  const [inputCompound, setInputCompound] = useState<CompoundingPeriod>('Monthly (APR)')
  const [outputCompound, setOutputCompound] = useState<CompoundingPeriod>('Annually (APY)')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const compoundingValues: Record<CompoundingPeriod, number> = {
    'Annually (APY)': 1,
    'Semiannually': 2,
    'Quarterly': 4,
    'Monthly (APR)': 12,
    'Semimonthly': 24,
    'Biweekly': 26,
    'Weekly': 52,
    'Daily': 365.25, // Using standard 365.25 for accuracy as per reference
    'Continuously': Infinity
  }

  const results = useMemo(() => {
    if (!isMounted) return null

    const r = inputInterest / 100
    const n_in = compoundingValues[inputCompound]
    const n_out = compoundingValues[outputCompound]

    // Calculate effective annual rate (EAR) first
    let ear: number
    if (n_in === Infinity) {
      ear = Math.exp(r) - 1
    } else {
      ear = Math.pow(1 + r / n_in, n_in) - 1
    }

    // Convert EAR to target compounding frequency
    let outputRate: number
    if (n_out === Infinity) {
      outputRate = Math.log(1 + ear)
    } else {
      outputRate = n_out * (Math.pow(1 + ear, 1 / n_out) - 1)
    }

    const dailyRate = ear / 365.25

    return {
      equivalentRate: (outputRate * 100).toFixed(5),
      dailyInterest: (dailyRate * 100).toFixed(5)
    }
  }, [inputInterest, inputCompound, outputCompound, isMounted])

  const faqItems = [
    {
      question: 'What is the difference between APR and APY?',
      answer: 'APR (Annual Percentage Rate) does not account for compounding within the year, while APY (Annual Percentage Yield) represents the actual interest earned including the effect of compounding.',
    },
    {
      question: 'Why use 365.25 days for daily compounding?',
      answer: 'Using 365.25 days accounts for leap years, ensuring the most mathematically accurate daily interest conversion over long periods.',
    }
  ]

  const relatedCalcs = [
    { name: 'Interest Calculator', description: 'Basic interest calculations', href: '/calculator/interest', icon: Percent },
    { name: 'Investment Calculator', description: 'Project future portfolio growth', icon: TrendingUp, href: '/calculator/investment' },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Compound Interest Calculator</h1>
          <p className="text-muted-foreground">Compare and convert interest rates across different compounding periods.</p>
        </div>

        {/* Result Banner - Matches the green style from reference */}
        {isMounted && (
          <div className="mb-8 bg-primary/10 border border-primary/20 rounded-xl p-6">
            <h2 className="text-sm font-bold text-primary uppercase mb-2">Result</h2>
            <p className="text-xl md:text-2xl font-semibold leading-tight">
              {inputInterest}% compound {inputCompound.toLowerCase()} is equivalent to <span className="text-primary">{results?.equivalentRate}%</span> compound {outputCompound.toLowerCase()} or <span className="text-primary">{results?.dailyInterest}%</span> interest every day.
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">*The daily rate assumes 365.25 days per year.</p>
          </div>
        )}

        {/* Main Calculator Card */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-end">
            
            {/* Input Interest */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Input Interest</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={inputInterest} 
                  onChange={(e) => setInputInterest(Number(e.target.value))}
                  className="w-full p-3 pr-8 bg-background border border-border rounded-xl font-bold focus:ring-2 focus:ring-primary outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
              </div>
            </div>

            {/* Input Compound Select */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Compound</label>
              <select 
                value={inputCompound} 
                onChange={(e) => setInputCompound(e.target.value as CompoundingPeriod)}
                className="w-full p-3 bg-muted border border-border rounded-xl font-medium outline-none cursor-pointer"
              >
                {Object.keys(compoundingValues).map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>

            {/* Equals Sign */}
            <div className="md:col-span-1 flex items-center justify-center pb-3">
              <span className="text-2xl font-bold text-muted-foreground/50">=</span>
            </div>

            {/* Output Interest Display */}
            <div className="md:col-span-2 space-y-2 text-center md:text-left">
              <label className="text-xs font-bold uppercase text-muted-foreground">Output Interest</label>
              <div className="p-3 font-bold text-primary text-lg">
                {results?.equivalentRate}%
              </div>
            </div>

            {/* Output Compound Select */}
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Compound</label>
              <select 
                value={outputCompound} 
                onChange={(e) => setOutputCompound(e.target.value as CompoundingPeriod)}
                className="w-full p-3 bg-muted border border-border rounded-xl font-medium outline-none cursor-pointer"
              >
                {Object.keys(compoundingValues).map(period => (
                  <option key={period} value={period}>{period}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border">
            <button className="flex-1 bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all">
              Calculate <ArrowRightLeft size={18} />
            </button>
            <button 
              onClick={() => {setInputInterest(0); setInputCompound('Annually (APY)');}}
              className="px-8 py-3 bg-muted text-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-muted/80 transition-all"
            >
              Clear <RotateCcw size={18} />
            </button>
          </div>
        </div>

        {/* Informational Content for SEO */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-12">
          <div className="flex gap-3 mb-6">
            <Info className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">How Compounding Frequency Works</h3>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              Compounding interest is the process where the interest you earn on an investment is added to the principal balance, and then you earn interest on that new, larger balance in the next period.
            </p>
            <p>
              The more frequently interest is compounded (daily vs. annually), the higher the effective yield will be. This calculator helps you determine the <strong>Equivalent Rate</strong> so you can compare different financial products fairly.
            </p>
            <div className="bg-muted p-4 rounded-lg font-mono text-center overflow-x-auto">
              APY = (1 + r/n)^n - 1
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalcs} />
        <FAQ items={faqItems} title="Compound Interest FAQ" />
      </div>
      <Footer />
    </main>
  )
}