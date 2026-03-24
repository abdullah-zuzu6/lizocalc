'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, RotateCcw, Info, ListFilter, CheckCircle2, Calendar } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type TimeMode = 'dates' | 'length'

interface ChartData {
  name: string
  value: number
}

interface Results {
  gain: string
  roi: string
  annualized: string
  length: string
  chartData: ChartData[]
}

export default function ROICalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // --- States ---
  const [amountInvested, setAmountInvested] = useState<number>(1000)
  const [amountReturned, setAmountReturned] = useState<number>(2000)
  const [timeMode, setTimeMode] = useState<TimeMode>('dates')
  const [currency, setCurrency] = useState<string>('$')
  const [fromDate, setFromDate] = useState('2026-02-28')
  const [toDate, setToDate] = useState('2030-12-31')
  const [lengthValue, setLengthValue] = useState<number>(5)
  const [lengthUnit, setLengthUnit] = useState('years')
  const [results, setResults] = useState<Results | null>(null)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['roi-calc']?.data) {
      const d = history['roi-calc'].data
      setAmountInvested(d.amountInvested)
      setAmountReturned(d.amountReturned)
      setCurrency(d.currency)
      setTimeMode(d.timeMode)
      setFromDate(d.fromDate)
      setToDate(d.toDate)
      setLengthValue(d.lengthValue)
      setLengthUnit(d.lengthUnit)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('roi-calc', { amountInvested, amountReturned, currency, timeMode, fromDate, toDate, lengthValue, lengthUnit })
    }
  }, [amountInvested, amountReturned, currency, timeMode, fromDate, toDate, lengthValue, lengthUnit, isMounted])

  const handleCalculate = () => {
    const gain = amountReturned - amountInvested
    const roi = (gain / amountInvested) * 100
    
    let years = 0
    if (timeMode === 'dates') {
      const start = new Date(fromDate).getTime()
      const end = new Date(toDate).getTime()
      years = Math.abs(end - start) / (1000 * 60 * 60 * 24 * 365.25)
    } else {
      years = lengthUnit === 'years' ? lengthValue : lengthValue / 12
    }

    const annualizedRoi = years > 0 ? (Math.pow((amountReturned / amountInvested), (1 / years)) - 1) * 100 : 0

    setResults({
      gain: gain.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      roi: roi.toFixed(2),
      annualized: annualizedRoi.toFixed(2),
      length: years.toFixed(2),
      chartData: [{ name: 'Invested', value: amountInvested }, { name: 'Profit', value: Math.max(0, gain) }]
    })
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-emerald-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <input maxLength={3} value={currency} onChange={e => setCurrency(e.target.value)} className="w-full mt-1 p-3 bg-secondary rounded-md border font-bold" />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount Invested</label>
                  <input type="number" value={amountInvested} onChange={e => setAmountInvested(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                </div>
                <div>
                  <label className="text-sm font-medium">Amount Returned</label>
                  <input type="number" value={amountReturned} onChange={e => setAmountReturned(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                </div>
                
                <div className="pt-2">
                   <label className="text-sm font-medium mb-2 block">Time Mode</label>
                   <div className="flex gap-2">
                     <button onClick={() => setTimeMode('dates')} className={`flex-1 py-2 rounded border text-xs font-bold ${timeMode === 'dates' ? ' bg-blue-600 text-white' : 'bg-secondary'}`}>Dates</button>
                     <button onClick={() => setTimeMode('length')} className={`flex-1 py-2 rounded border text-xs font-bold ${timeMode === 'length' ? ' bg-blue-600 text-white' : 'bg-secondary'}`}>Length</button>
                   </div>
                </div>

                {timeMode === 'dates' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="p-2 bg-secondary rounded border text-xs" />
                    <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="p-2 bg-secondary rounded border text-xs" />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input type="number" value={lengthValue} onChange={e => setLengthValue(Number(e.target.value))} className="flex-1 p-2 bg-secondary rounded border" />
                    <select value={lengthUnit} onChange={e => setLengthUnit(e.target.value)} className="p-2 bg-secondary rounded border text-xs">
                      <option value="years">Years</option><option value="months">Months</option>
                    </select>
                  </div>
                )}

                <button onClick={handleCalculate} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2">
                  Calculate ROI <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {results ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-8 text-center flex flex-col justify-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">Total ROI</p>
                  <h2 className="text-5xl font-black text-emerald-600 tracking-tighter">{results.roi}%</h2>
                </div>
                <div className="bg-card border rounded-xl p-6">
                  <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie data={results.chartData} innerRadius={40} outerRadius={60} dataKey="value">
                        {results.chartData.map((entry: ChartData, index: number) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? '#cbd5e1' : '#059669'} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed rounded-xl flex items-center justify-center text-muted-foreground">
                Enter details to view your ROI results
              </div>
            )}
            
            <section className="bg-card border rounded-xl p-8">
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info className="text-emerald-600"/> About ROI</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Return on Investment (ROI) is a fundamental metric to evaluate the efficiency of an investment. 
                Our calculator provides both the simple percentage return and the annualized rate, which 
                helps in comparing investments of different durations.
              </p>
            </section>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Compound Interest', description: 'Calculate wealth over time', href: 'calculators/financial/compound-interest-calculator', icon: Calendar }
        ]} />
      </section>
    </main>
  )
}