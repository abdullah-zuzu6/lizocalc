'use client'

import { useState, useEffect, useMemo } from 'react'
import { TrendingUp, Calculator, RotateCcw, Calendar, Clock, Info } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type TimeMode = 'dates' | 'length'

export default function ROICalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Input States
  const [amountInvested, setAmountInvested] = useState<number>(1000)
  const [amountReturned, setAmountReturned] = useState<number>(2000)
  const [timeMode, setTimeMode] = useState<TimeMode>('dates')
  const [currency, setCurrency] = useState<string>('$')

  // Date Mode State
  const [fromDate, setFromDate] = useState('2026-02-28')
  const [toDate, setToDate] = useState('2030-12-31')

  // Length Mode State
  const [lengthValue, setLengthValue] = useState<number>(100)
  const [lengthUnit, setLengthUnit] = useState('years')

  // Result State
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
    handleCalculate()
  }, [])

  const handleCalculate = () => {
    const gain = amountReturned - amountInvested
    const roi = (gain / amountInvested) * 100
    
    let years = 0
    if (timeMode === 'dates') {
      const start = new Date(fromDate)
      const end = new Date(toDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      years = diffTime / (1000 * 60 * 60 * 24 * 365.25)
    } else {
      years = lengthUnit === 'years' ? lengthValue : lengthValue / 12
    }

    // Annualized ROI Formula: ((Final / Initial)^(1/t) - 1) * 100
    const annualizedRoi = (Math.pow((amountReturned / amountInvested), (1 / years)) - 1) * 100

    setResults({
      gain: gain.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      roi: roi.toFixed(2),
      annualized: annualizedRoi.toFixed(2),
      length: years.toFixed(3),
      chartData: [
        { name: 'Invested', value: amountInvested },
        { name: 'Profit', value: Math.max(0, gain) }
      ]
    })
  }

  const COLORS = ['#94a3b8', '#22c55e'] // Gray for Invested, Green for Profit

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">ROI Calculator</h1>
          <p className="text-muted-foreground">Calculate investment gain, ROI, and annualized returns easily.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-6 shadow-sm space-y-6">
            
            <div className="flex gap-4">
              <div className="w-24 space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Currency</label>
                <input 
                  type="text" maxLength={5} value={currency} 
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full p-3 bg-muted border border-border rounded-xl font-bold text-center outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Amount Invested</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{currency}</span>
                  <input 
                    type="number" value={amountInvested} 
                    onChange={(e) => setAmountInvested(Number(e.target.value))}
                    className="w-full p-3 pl-10 bg-background border border-border rounded-xl font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Amount Returned</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{currency}</span>
                <input 
                  type="number" value={amountReturned} 
                  onChange={(e) => setAmountReturned(Number(e.target.value))}
                  className="w-full p-3 pl-10 bg-background border border-border rounded-xl font-bold focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold uppercase text-muted-foreground">Investment Time:</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input type="radio" checked={timeMode === 'dates'} onChange={() => setTimeMode('dates')} className="w-4 h-4 accent-primary" />
                  Use Dates
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input type="radio" checked={timeMode === 'length'} onChange={() => setTimeMode('length')} className="w-4 h-4 accent-primary" />
                  Use Length
                </label>
              </div>
            </div>

            {timeMode === 'dates' ? (
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold w-12 text-muted-foreground uppercase">From</span>
                  <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="flex-1 p-2 bg-background border border-border rounded-lg outline-none" />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold w-12 text-muted-foreground uppercase">To</span>
                  <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="flex-1 p-2 bg-background border border-border rounded-lg outline-none" />
                </div>
              </div>
            ) : (
              <div className="flex gap-2 p-4 bg-muted/30 rounded-xl border border-border">
                <input type="number" value={lengthValue} onChange={(e) => setLengthValue(Number(e.target.value))} className="flex-[2] p-2 bg-background border border-border rounded-lg outline-none" />
                <select value={lengthUnit} onChange={(e) => setLengthUnit(e.target.value)} className="flex-1 p-2 bg-background border border-border rounded-lg outline-none">
                  <option value="years">years</option>
                  <option value="months">months</option>
                </select>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <button onClick={handleCalculate} className="flex-[4] bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
                Calculate <TrendingUp size={18} />
              </button>
              <button onClick={() => setAmountInvested(1000)} className="flex-1 bg-muted rounded-xl flex items-center justify-center hover:bg-muted/80 transition-colors">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-7 space-y-6">
            {results && (
              <>
                <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                  <div className="bg-primary px-6 py-4 text-white font-bold text-lg">Result</div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Stats Table */}
                      <div className="space-y-1">
                        {[
                          { label: 'Investment Gain', value: `${currency}${results.gain}`, color: 'text-primary' },
                          { label: 'ROI', value: `${results.roi}%`, color: 'text-primary' },
                          { label: 'Annualized ROI', value: `${results.annualized}%`, color: 'text-primary' },
                          { label: 'Investment Length', value: `${results.length} years`, color: '' },
                        ].map((row, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                            <span className={`font-bold ${row.color}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pie Chart */}
                      <div className="h-48 relative flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={results.chartData}
                              cx="50%" cy="50%"
                              innerRadius={40} outerRadius={70}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {results.chartData.map((entry: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-xs font-bold text-muted-foreground uppercase">ROI</span>
                            <span className="text-lg font-bold">{results.roi}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-card rounded-2xl border border-border flex items-start gap-4 shadow-sm">
                    <Info className="text-primary mt-1" size={20} />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        In finance, Return on Investment, usually abbreviated as ROI, is a common, widespread metric used to evaluate the forecasted profitability on different investments.
                    </p>
                </div>
              </>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Investment Calculator', description: 'Project future growth', href: '/investment', icon: TrendingUp },
          { name: 'Compound Interest', description: 'Calculate wealth over time', href: '/compound', icon: Calculator }
        ]} />
      </div>
      <Footer />
    </main>
  )
}