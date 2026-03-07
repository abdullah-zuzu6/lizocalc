'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Globe, Calculator, RotateCcw, HelpCircle, Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Data for historical logic
const simplifiedCpiData: Record<number, number> = {
  1913: 9.9, 1920: 17.9, 1930: 16.7, 1940: 14.0, 1950: 24.1, 1960: 29.6, 
  1970: 38.8, 1980: 82.4, 1990: 130.7, 2000: 172.2, 2010: 218.056, 
  2015: 237.017, 2016: 240.007, 2017: 245.120, 2018: 251.107, 2019: 255.657, 
  2020: 258.811, 2021: 270.970, 2022: 292.655, 2023: 304.7, 2024: 314.1, 
  2025: 324.5, 2026: 335.0
}

export default function InflationCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [currency, setCurrency] = useState('$')
  
  // --- States for Calc 1: U.S. CPI Data ---
  const [cpiAmount, setCpiAmount] = useState<number>(100)
  const [cpiFromYear, setCpiFromYear] = useState<number>(2016)
  const [cpiToYear, setCpiToYear] = useState<number>(2026)
  const [cpiResult, setCpiResult] = useState<any>(null)

  // --- States for Calc 2: Forward Flat Rate ---
  const [fwdAmount, setFwdAmount] = useState<number>(100)
  const [fwdRate, setFwdRate] = useState<number>(3.5)
  const [fwdYears, setFwdYears] = useState<number>(10)
  const [fwdResult, setFwdResult] = useState<string | null>(null)

  // --- States for Calc 3: Backward Flat Rate ---
  const [bwdAmount, setBwdAmount] = useState<number>(100)
  const [bwdRate, setBwdRate] = useState<number>(3.5)
  const [bwdYears, setBwdYears] = useState<number>(5)
  const [bwdResult, setBwdResult] = useState<string | null>(null)

  useEffect(() => {
    setIsMounted(true)
    // Run initial calculations
    handleCalculateCpi()
  }, [])

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

  const handleCalculateForward = () => {
    const futureVal = fwdAmount * Math.pow((1 + (fwdRate / 100)), fwdYears)
    setFwdResult(futureVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  const handleCalculateBackward = () => {
    const pastVal = bwdAmount / Math.pow((1 + (bwdRate / 100)), bwdYears)
    setBwdResult(pastVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">Inflation Calculator</h1>
          <p className="text-muted-foreground text-lg">Measure the purchasing power of your money over time.</p>
        </div>

        {/* Global Currency Setup */}
        <div className="flex justify-end mb-6">
            <div className="flex items-center gap-2 bg-card p-2 rounded-xl border border-border shadow-sm">
                <span className="text-xs font-bold uppercase text-muted-foreground px-2">Currency Symbol:</span>
                <input 
                    type="text" maxLength={5} value={currency} 
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-16 p-1 bg-muted border border-border rounded text-center font-bold"
                />
            </div>
        </div>

        {/* --- Calculator 1: U.S. CPI Data --- */}
        <section className="bg-card rounded-2xl border border-border p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <Globe size={24} className="text-primary" />
            <h2 className="text-xl font-bold">U.S. Inflation (CPI Data)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end bg-muted/50 p-6 rounded-2xl border border-border">
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold opacity-50">{currency}</span>
                <input type="number" value={cpiAmount} onChange={(e) => setCpiAmount(Number(e.target.value))} className="w-full p-3 pl-8 bg-background border border-border rounded-xl outline-none" />
              </div>
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">From Year</label>
              <select value={cpiFromYear} onChange={(e) => setCpiFromYear(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl">
                {Object.keys(simplifiedCpiData).reverse().map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="md:col-span-3 space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">To Year</label>
              <select value={cpiToYear} onChange={(e) => setCpiToYear(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl">
                {Object.keys(simplifiedCpiData).reverse().map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div className="md:col-span-3 flex gap-2">
              <button onClick={handleCalculateCpi} className="flex-1 bg-primary text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95 flex justify-center"><Calculator size={20}/></button>
              <button onClick={() => setCpiAmount(100)} className="p-3 bg-background border border-border rounded-xl hover:bg-muted text-muted-foreground"><RotateCcw size={20}/></button>
            </div>
          </div>

          {cpiResult && (
            <div className="mt-6 bg-primary/10 border border-primary/20 rounded-xl p-6 text-center animate-in zoom-in duration-300">
              <p className="text-3xl font-bold text-primary mb-1">{currency}{cpiResult.val}</p>
              <p className="text-sm text-muted-foreground">Equivalent value in {cpiToYear} with <span className="text-foreground font-bold">{cpiResult.pct}%</span> cumulative inflation.</p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* --- Calculator 2: Forward Flat Rate --- */}
            <section className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={22} className="text-accent" />
                    <h2 className="font-bold">Future Inflation (Flat Rate)</h2>
                </div>
                <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Current Amount</label>
                        <input type="number" value={fwdAmount} onChange={(e) => setFwdAmount(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Annual Rate (%)</label>
                            <input type="number" step="0.1" value={fwdRate} onChange={(e) => setFwdRate(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Years in Future</label>
                            <input type="number" value={fwdYears} onChange={(e) => setFwdYears(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                        </div>
                    </div>
                    <button onClick={handleCalculateForward} className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all">Project Future Value</button>
                    {fwdResult && (
                        <div className="p-4 bg-accent/10 border border-accent/20 rounded-xl text-center">
                            <span className="text-xs uppercase font-bold text-accent block mb-1">Estimated Value</span>
                            <span className="text-2xl font-bold">{currency}{fwdResult}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* --- Calculator 3: Backward Flat Rate --- */}
            <section className="bg-card rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingDown size={22} className="text-destructive" />
                    <h2 className="font-bold">Past Value (Historical Flat)</h2>
                </div>
                <div className="space-y-4 flex-1">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-muted-foreground">Current Amount</label>
                        <input type="number" value={bwdAmount} onChange={(e) => setBwdAmount(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Avg. Annual Rate (%)</label>
                            <input type="number" step="0.1" value={bwdRate} onChange={(e) => setBwdRate(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">Years Ago</label>
                            <input type="number" value={bwdYears} onChange={(e) => setBwdYears(Number(e.target.value))} className="w-full p-3 bg-muted/50 border border-border rounded-xl outline-none" />
                        </div>
                    </div>
                    <button onClick={handleCalculateBackward} className="w-full bg-destructive text-white py-3 rounded-xl font-bold hover:opacity-90 transition-all">Calculate Past Value</button>
                    {bwdResult && (
                        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl text-center">
                            <span className="text-xs uppercase font-bold text-destructive block mb-1">Purchasing Power Then</span>
                            <span className="text-2xl font-bold">{currency}{bwdResult}</span>
                        </div>
                    )}
                </div>
            </section>
        </div>

        {/* --- Educational Content Section --- */}
        <div className="mt-16 space-y-12">
            <section className="bg-card rounded-2xl border border-border p-8 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <HelpCircle className="text-primary" /> How Inflation Works
                </h2>
                <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed">
                    <p className="mb-4">
                        Inflation represents the rate at which the cost of goods and services increases, effectively reducing the purchasing power of your currency. 
                        As inflation rises, every unit of currency buys fewer goods than it did previously.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-foreground">
                        <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                            <h3 className="font-bold text-lg mb-3">Consumer Price Index (CPI)</h3>
                            <p className="text-sm text-muted-foreground">
                                Our calculator utilizes the CPI—a measure that examines the weighted average of prices of a basket of consumer goods and services, 
                                such as transportation, food, and medical care.
                            </p>
                        </div>
                        <div className="bg-muted/30 p-6 rounded-2xl border border-border">
                            <h3 className="font-bold text-lg mb-3">Compounding Effect</h3>
                            <p className="text-sm text-muted-foreground">
                                Flat-rate inflation works similarly to compound interest but in reverse for your purchasing power. A small 2% annual inflation 
                                rate can cut the value of your money by nearly half over 35 years.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4">
                <h2 className="text-2xl font-bold mb-6">The Inflation Formula</h2>
                <p className="text-muted-foreground mb-6 text-lg">To manually calculate the impact of inflation between two periods, use the following equation:</p>
                <div className="bg-card p-8 rounded-3xl border border-border shadow-inner text-center overflow-x-auto">
  <span className="text-2xl font-mono text-primary">
    {"$$ \\text{Value}_2 = \\text{Value}_1 \\times \\left( \\frac{\\text{CPI}_2}{\\text{CPI}_1} \\right) $$"}
  </span>
</div>
                

[Image of the inflation calculation formula]

            </section>

            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col md:flex-row gap-8 items-center">
                <div className="bg-primary/20 p-4 rounded-full text-primary">
                    <Info size={40} />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-2">Did you know?</h3>
                    <p className="text-muted-foreground">
                        While high inflation is often seen as negative, most economists believe that a small, stable amount of inflation (around 2% per year) 
                        is actually a sign of a healthy, growing economy. It encourages consumers to spend and businesses to invest rather than hoarding cash.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-16">
            <RelatedCalculators calculators={[
                { name: 'Compound Interest', description: 'See how your wealth grows', href: '/compound-interest', icon: Calculator },
                { name: 'ROI Calculator', description: 'Measure your investment gains', href: '/roi-calculator', icon: TrendingUp }
            ]} />
        </div>
      </div>
      <Footer />
    </main>
  )
}