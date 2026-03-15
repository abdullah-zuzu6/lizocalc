'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Globe, Calculator, RotateCcw, Info, ListFilter, CheckCircle2 } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const simplifiedCpiData: Record<number, number> = {
  1913: 9.9, 1920: 17.9, 1930: 16.7, 1940: 14.0, 1950: 24.1, 1960: 29.6, 
  1970: 38.8, 1980: 82.4, 1990: 130.7, 2000: 172.2, 2010: 218.056, 
  2015: 237.017, 2016: 240.007, 2017: 245.120, 2018: 251.107, 2019: 255.657, 
  2020: 258.811, 2021: 270.970, 2022: 292.655, 2023: 304.7, 2024: 314.1, 
  2025: 324.5, 2026: 335.0
}

export default function InflationCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // State
  const [currency, setCurrency] = useState('$')
  const [cpiAmount, setCpiAmount] = useState<number>(100)
  const [cpiFromYear, setCpiFromYear] = useState<number>(2016)
  const [cpiToYear, setCpiToYear] = useState<number>(2026)
  const [cpiResult, setCpiResult] = useState<any>(null)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['inflation-calc']?.data) {
      const d = history['inflation-calc'].data
      setCurrency(d.currency || '$')
      setCpiAmount(d.cpiAmount || 100)
      setCpiFromYear(d.cpiFromYear || 2016)
      setCpiToYear(d.cpiToYear || 2026)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('inflation-calc', { currency, cpiAmount, cpiFromYear, cpiToYear })
  }, [currency, cpiAmount, cpiFromYear, cpiToYear, isMounted])

  const handleCalculateCpi = () => {
    const from = simplifiedCpiData[cpiFromYear]
    const to = simplifiedCpiData[cpiToYear]
    if (from && to) {
      const futureValue = cpiAmount * (to / from)
      const totalInflation = ((to - from) / from) * 100
      setCpiResult({
        val: futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        pct: totalInflation.toFixed(1)
      })
    }
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Currency Symbol</label>
                  <input maxLength={3} value={currency} onChange={e => setCurrency(e.target.value)} className="w-full mt-1 p-3 bg-secondary rounded-md border font-bold" />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount</label>
                  <input type="number" value={cpiAmount} onChange={e => setCpiAmount(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">From</label>
                    <select value={cpiFromYear} onChange={e => setCpiFromYear(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border">{Object.keys(simplifiedCpiData).map(y => <option key={y} value={y}>{y}</option>)}</select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">To</label>
                    <select value={cpiToYear} onChange={e => setCpiToYear(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border">{Object.keys(simplifiedCpiData).map(y => <option key={y} value={y}>{y}</option>)}</select>
                  </div>
                </div>
                <button onClick={handleCalculateCpi} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2">
                  Calculate <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {cpiResult ? (
              <div className="bg-card border rounded-xl p-8 text-center">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">Equivalent Value</p>
                <h2 className="text-5xl font-black text-blue-600 tracking-tighter">{currency}{cpiResult.val}</h2>
                <p className="text-sm mt-4 text-muted-foreground">Cumulative inflation of <span className="font-bold text-foreground">{cpiResult.pct}%</span> between {cpiFromYear} and {cpiToYear}.</p>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
                Enter details to calculate inflation impact
              </div>
            )}
            
            <section className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info className="text-blue-600"/> Formula</h3>
              <p className="text-sm text-muted-foreground mb-4">The calculation uses the standard CPI ratio method:</p>
              <div className="bg-secondary/50 p-4 rounded-lg font-mono text-center text-blue-600 font-bold">
                Value₂ = Value₁ × (CPI₂ / CPI₁)
              </div>
            </section>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Compound Interest', description: 'See how your wealth grows', href: '/compound-interest', icon: Calculator },
          { name: 'ROI Calculator', description: 'Measure your investment gains', href: '/roi-calculator', icon: TrendingUp }
        ]} />
      </section>
    </main>
  )
}