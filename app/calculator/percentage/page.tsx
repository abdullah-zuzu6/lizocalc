'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function PercentageCalculator() {
  const [calcMode, setCalcMode] = useState<'percentage' | 'discount' | 'increase'>('percentage')
  const [value, setValue] = useState<number>(100)
  const [percent, setPercent] = useState<number>(20)
  const [original, setOriginal] = useState<number>(100)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['percentage']?.data) {
      setCalcMode(history['percentage'].data.calcMode || 'percentage')
      setValue(history['percentage'].data.value || 100)
      setPercent(history['percentage'].data.percent || 20)
      setOriginal(history['percentage'].data.original || 100)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('percentage', { calcMode, value, percent, original })
    }
  }, [calcMode, value, percent, original, isMounted])

  const calculatePercentage = (val: number, pct: number) => (val * pct) / 100
  const result = calculatePercentage(value, percent)

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Percentage Calculator</h1>
          <p className="text-lg text-muted-foreground">Calculate percentages, discounts, and percentage changes</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          {/* Calculation Mode */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">Calculation Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(['percentage', 'discount', 'increase'] as const).map((mode) => (
                <button key={mode} onClick={() => setCalcMode(mode)} className={`py-2 px-3 rounded-lg border font-medium transition-all capitalize ${calcMode === mode ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background hover:border-primary/50'}`}>
                  {mode === 'percentage' && 'Percentage'}{mode === 'discount' && 'Discount'}{mode === 'increase' && 'Increase'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {calcMode === 'percentage' && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-3">Value: {value}</label>
                  <input type="range" min="0" max="10000" step="1" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Percentage: {percent}%</label>
                  <input type="range" min="0" max="100" step="0.1" value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={percent} onChange={(e) => setPercent(Number(e.target.value))} step="0.1" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
              </>
            )}

            {calcMode === 'discount' && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-3">Original Price: ${original}</label>
                  <input type="range" min="0" max="10000" step="1" value={original} onChange={(e) => setOriginal(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={original} onChange={(e) => setOriginal(Number(e.target.value))} className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Discount: {percent}%</label>
                  <input type="range" min="0" max="100" step="0.1" value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={percent} onChange={(e) => setPercent(Number(e.target.value))} step="0.1" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
              </>
            )}

            {calcMode === 'increase' && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-3">Original Amount: {original}</label>
                  <input type="range" min="0" max="10000" step="1" value={original} onChange={(e) => setOriginal(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={original} onChange={(e) => setOriginal(Number(e.target.value))} className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-3">Increase: {percent}%</label>
                  <input type="range" min="0" max="200" step="0.1" value={percent} onChange={(e) => setPercent(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
                  <input type="number" value={percent} onChange={(e) => setPercent(Number(e.target.value))} step="0.1" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {calcMode === 'percentage' && (
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
              <p className="text-muted-foreground text-sm mb-2">{percent}% of {value}</p>
              <p className="text-4xl font-bold text-primary">{result.toFixed(2)}</p>
            </div>
          )}

          {calcMode === 'discount' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground text-sm mb-2">Discount Amount</p>
                <p className="text-4xl font-bold text-accent">${(original * percent / 100).toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground text-sm mb-2">Final Price</p>
                <p className="text-4xl font-bold text-primary">${(original - original * percent / 100).toFixed(2)}</p>
              </div>
            </div>
          )}

          {calcMode === 'increase' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground text-sm mb-2">Increase Amount</p>
                <p className="text-4xl font-bold text-accent">{(original * percent / 100).toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
                <p className="text-muted-foreground text-sm mb-2">New Amount</p>
                <p className="text-4xl font-bold text-primary">{(original + original * percent / 100).toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Percentage Calculations</h3>
          </div>
          <p className="text-muted-foreground">Use this calculator to quickly calculate percentages of any number, apply discounts, or calculate percentage increases. Perfect for shopping, taxes, and financial calculations.</p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
