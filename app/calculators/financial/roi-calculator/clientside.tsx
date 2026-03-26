'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  TrendingUp, 
  RotateCcw, 
  Info, 
  ListFilter, 
  CheckCircle2, 
  Calendar, 
  Settings2, 
  Heart,
  ArrowUpRight,
  TrendingDown,
  DollarSign
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

type TimeMode = 'dates' | 'length'

interface ChartData {
  name: string
  value: number
}

export default function ROICalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  // --- States ---
  const [amountInvested, setAmountInvested] = useState<number>(1000)
  const [amountReturned, setAmountReturned] = useState<number>(2000)
  const [timeMode, setTimeMode] = useState<TimeMode>('dates')
  const [currency, setCurrency] = useState<string>('$')
  const [fromDate, setFromDate] = useState('2026-02-28')
  const [toDate, setToDate] = useState('2030-12-31')
  const [lengthValue, setLengthValue] = useState<number>(5)
  const [lengthUnit, setLengthUnit] = useState('years')

  const calculatorInfo = {
    name: 'ROI Calculator',
    href: '/calculators/financial/roi-calculator',
    category: 'Financial',
  }

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['roi-calc']?.data) {
      const d = history['roi-calc'].data
      setAmountInvested(d.amountInvested ?? 1000)
      setAmountReturned(d.amountReturned ?? 2000)
      setCurrency(d.currency ?? '$')
      setTimeMode(d.timeMode ?? 'dates')
      setFromDate(d.fromDate ?? '2026-02-28')
      setToDate(d.toDate ?? '2030-12-31')
      setLengthValue(d.lengthValue ?? 5)
      setLengthUnit(d.lengthUnit ?? 'years')
    }

    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('roi-calc', { 
      amountInvested, amountReturned, currency, timeMode, fromDate, toDate, lengthValue, lengthUnit 
    })
  }, [amountInvested, amountReturned, currency, timeMode, fromDate, toDate, lengthValue, lengthUnit, isMounted])

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  const results = useMemo(() => {
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

    const annualizedRoi = (amountInvested > 0 && years > 0) 
      ? (Math.pow((amountReturned / amountInvested), (1 / years)) - 1) * 100 
      : 0

    return {
      gain: gain.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      isLoss: gain < 0,
      roi: roi.toFixed(2),
      annualized: annualizedRoi.toFixed(2),
      length: years.toFixed(2),
      chartData: [
        { name: 'Invested', value: amountInvested }, 
        { name: 'Gain/Loss', value: Math.abs(gain) }
      ]
    }
  }, [amountInvested, amountReturned, timeMode, fromDate, toDate, lengthValue, lengthUnit])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden">
              <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-emerald-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  <div className="col-span-1">
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Cur.</label>
                    <input maxLength={3} value={currency} onChange={e => setCurrency(e.target.value)} className="w-full p-3 bg-secondary rounded-lg border font-bold text-center" />
                  </div>
                  <div className="col-span-3">
                    <InputField label="Amount Invested" value={amountInvested} onChange={setAmountInvested} />
                  </div>
                </div>

                <InputField label="Amount Returned" value={amountReturned} onChange={setAmountReturned} />
                
                <div className="pt-2">
                   <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Time Mode</label>
                   <div className="flex bg-secondary/50 p-1 rounded-lg border border-border">
                     <button onClick={() => setTimeMode('dates')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${timeMode === 'dates' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>Dates</button>
                     <button onClick={() => setTimeMode('length')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${timeMode === 'length' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}>Length</button>
                   </div>
                </div>

                {timeMode === 'dates' ? (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">From</label>
                      <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="w-full p-3 bg-secondary/50 rounded-lg border text-sm font-bold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">To</label>
                      <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="w-full p-3 bg-secondary/50 rounded-lg border text-sm font-bold" />
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="flex-[2]">
                      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Duration</label>
                      <input type="number" value={lengthValue} onChange={e => setLengthValue(Number(e.target.value))} className="w-full p-3 bg-secondary/50 rounded-lg border font-bold" />
                    </div>
                    <div className="flex-1">
                      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Unit</label>
                      <select value={lengthUnit} onChange={e => setLengthUnit(e.target.value)} className="w-full p-3 bg-secondary/50 rounded-lg border text-xs font-bold h-[50px]">
                        <option value="years">Years</option><option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-3">
                  <button onClick={() => setShowResults(true)} className="w-full py-3.5 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20">
                    Calculate ROI <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => {
                      setAmountInvested(1000); setAmountReturned(2000); setShowResults(false);
                    }} 
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Primary ROI Metric */}
                  <div className={`rounded-xl p-8 text-white shadow-lg flex flex-col justify-center relative overflow-hidden ${results.isLoss ? 'bg-rose-600 shadow-rose-900/20' : 'bg-emerald-600 shadow-emerald-900/20'}`}>
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Total Return on Investment</p>
                    <h2 className="text-6xl font-black my-2 tracking-tight">{results.roi}%</h2>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                        {results.isLoss ? <TrendingDown size={14}/> : <ArrowUpRight size={14}/>} 
                        {results.isLoss ? 'Net Loss' : 'Net Profit'}
                      </div>
                      <span className="font-bold text-xl">{currency}{results.gain}</span>
                    </div>
                  </div>

                  {/* Chart Card */}
                  <div className="bg-card border rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-full h-[150px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie 
                            data={results.chartData} 
                            innerRadius={50} 
                            outerRadius={70} 
                            paddingAngle={5} 
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill="hsl(var(--muted))" />
                            <Cell fill={results.isLoss ? '#e11d48' : '#10b981'} />
                          </Pie>
                          <Tooltip 
                             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                             formatter={(value: any) => `${currency}${Number(value).toLocaleString()}`}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-muted" /> Invested
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <div className={`w-2 h-2 rounded-full ${results.isLoss ? 'bg-rose-500' : 'bg-emerald-500'}`} /> {results.isLoss ? 'Loss' : 'Profit'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border rounded-xl p-6">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Annualized ROI (CAGR)</p>
                    <p className="text-3xl font-black text-primary">{results.annualized}%</p>
                    <p className="text-xs text-muted-foreground mt-1 italic">The geometric mean return per year</p>
                  </div>
                  <div className="bg-card border rounded-xl p-6">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Investment Length</p>
                    <p className="text-3xl font-black text-primary">{results.length} <span className="text-sm font-medium">Years</span></p>
                    <p className="text-xs text-muted-foreground mt-1 italic">Total duration used for annualized calc</p>
                  </div>
                </div>

                {/* About Section */}
                <div className="bg-card border rounded-xl p-8">
                  <h3 className="font-bold text-xl mb-4 flex items-center gap-2"><Info className="text-emerald-600"/> About Return on Investment</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment. 
                    While simple ROI tells you the total percentage gained or lost, **Annualized ROI** (calculated via the CAGR formula) is more useful for comparing 
                    investments held for different lengths of time.
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-[450px] bg-secondary/20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground">
                <DollarSign size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">Enter investment details to view ROI analysis</p>
              </div>
            )}
            
            <RelatedCalculators calculators={[
              { name: 'Compound Interest', description: 'Calculate wealth over time', href: '/calculators/financial/interest-calculator', icon: Calendar }
            ]} />
          </div>
        </div>
      </section>
    </main>
  )
}

function InputField({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">{label}</label>
      <input 
        type="number" 
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 outline-none font-bold text-lg transition-all" 
      />
    </div>
  )
}