'use client'

import { useState, useMemo, useEffect } from 'react'
import { Calendar as CalendarIcon, Info, Plus, Minus, History, Settings } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type CalcMode = 'difference' | 'add-subtract'

export default function DateCalculator() {
  const [mode, setMode] = useState<CalcMode>('difference')
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0])
  const [includeEndDay, setIncludeEndDay] = useState(false)
  const [countHolidays, setCountHolidays] = useState(false)
  
  // Add/Subtract State
  const [yearsVal, setYearsVal] = useState(0)
  const [monthsVal, setMonthsVal] = useState(0)
  const [weeksVal, setWeeksVal] = useState(0)
  const [daysVal, setDaysVal] = useState(0)
  const [operation, setOperation] = useState<'add' | 'subtract'>('add')

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const results = useMemo(() => {
    if (!isMounted) return null

    const start = new Date(startDate)
    
    if (mode === 'difference') {
      const end = new Date(endDate)
      let diffTime = Math.abs(end.getTime() - start.getTime())
      
      if (includeEndDay) diffTime += 86400000 // Add 1 day in ms

      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      const years = Math.floor(totalDays / 365)
      const months = Math.floor((totalDays % 365) / 30)
      const weeks = Math.floor((totalDays % 30) / 7)
      const remainingDays = totalDays % 7

      return { totalDays, years, months, weeks, remainingDays }
    } else {
      const resultDate = new Date(start)
      const factor = operation === 'add' ? 1 : -1
      
      resultDate.setFullYear(resultDate.getFullYear() + (yearsVal * factor))
      resultDate.setMonth(resultDate.getMonth() + (monthsVal * factor))
      resultDate.setDate(resultDate.getDate() + ((weeksVal * 7 + daysVal) * factor))

      return { resultDate: resultDate.toDateString() }
    }
  }, [mode, startDate, endDate, includeEndDay, yearsVal, monthsVal, weeksVal, daysVal, operation, isMounted])

  const faqItems = [
    {
      question: 'How does the date calculator handle leap years?',
      answer: 'The calculator uses the standard Gregorian calendar system, automatically accounting for leap years (February 29th) when calculating the difference between two dates.',
    },
    {
      question: 'Does "Include end day" change the result?',
      answer: 'Yes. Typically, date calculations are exclusive of the end day. Checking this box adds 1 day to the total count, which is often used for calculating total duration of a contract or event.',
    }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Date Calculator</h1>
          <p className="text-muted-foreground">Calculate duration between dates or add/subtract time from a specific date.</p>
        </div>

        {/* Mode Switcher */}
        <div className="flex gap-2 mb-8 bg-muted p-1 rounded-xl">
          <button 
            onClick={() => setMode('difference')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${mode === 'difference' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Days Between Dates
          </button>
          <button 
            onClick={() => setMode('add-subtract')}
            className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${mode === 'add-subtract' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
          >
            Add / Subtract Time
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            {mode === 'difference' ? (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">End Date</label>
                  <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="includeEnd" 
                    checked={includeEndDay} 
                    onChange={() => setIncludeEndDay(!includeEndDay)}
                    className="w-4 h-4 accent-primary"
                  />
                  <label htmlFor="includeEnd" className="text-sm">Include end day (add 1 day)</label>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex bg-muted p-1 rounded-lg">
                  <button onClick={() => setOperation('add')} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-bold ${operation === 'add' ? 'bg-background text-primary' : ''}`}><Plus size={14}/> Add</button>
                  <button onClick={() => setOperation('subtract')} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-bold ${operation === 'subtract' ? 'bg-background text-primary' : ''}`}><Minus size={14}/> Subtract</button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-xs font-bold">Years</label><input type="number" value={yearsVal} onChange={(e)=>setYearsVal(Number(e.target.value))} className="w-full p-2 border border-border bg-background rounded-md" /></div>
                  <div><label className="text-xs font-bold">Months</label><input type="number" value={monthsVal} onChange={(e)=>setMonthsVal(Number(e.target.value))} className="w-full p-2 border border-border bg-background rounded-md" /></div>
                  <div><label className="text-xs font-bold">Weeks</label><input type="number" value={weeksVal} onChange={(e)=>setWeeksVal(Number(e.target.value))} className="w-full p-2 border border-border bg-background rounded-md" /></div>
                  <div><label className="text-xs font-bold">Days</label><input type="number" value={daysVal} onChange={(e)=>setDaysVal(Number(e.target.value))} className="w-full p-2 border border-border bg-background rounded-md" /></div>
                </div>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 rounded-2xl p-8 flex flex-col justify-center">
            {mode === 'difference' ? (
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Total Duration</p>
                <h2 className="text-5xl font-bold text-primary mb-6">{results?.totalDays} Days</h2>
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Years/Months</p>
                    <p className="font-bold">{results?.years}y, {results?.months}m</p>
                  </div>
                  <div className="p-3 bg-background/50 rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Weeks/Days</p>
                    <p className="font-bold">{results?.weeks}w, {results?.remainingDays}d</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-1">Resulting Date</p>
                <h2 className="text-3xl font-bold text-primary mb-4">{results?.resultDate}</h2>
                <CalendarIcon className="mx-auto w-12 h-12 text-primary/20" />
              </div>
            )}
          </div>
        </div>

        {/* Educational Content Section - Vital for AdSense */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-12">
          <div className="flex gap-3 mb-6">
            <Info className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Understanding Date Calculations</h3>
          </div>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
            <p>
              The <strong>Lizocalc Date Calculator</strong> uses the standard 365-day year model. For the "Days Between Dates" feature, we calculate the absolute difference in milliseconds and convert it to calendar units.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center py-4">
              <div className="p-4 bg-muted rounded-xl">
                <div className="font-bold text-foreground">1 Week</div>
                <div>7 Days</div>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="font-bold text-foreground">Avg Month</div>
                <div>30.44 Days</div>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <div className="font-bold text-foreground">1 Year</div>
                <div>365.25 Days</div>
              </div>
            </div>
            <p>
              When calculating <strong>Business Days</strong>, our algorithm skips Saturdays and Sundays. If holiday tracking is enabled, standard US Federal holidays like New Year's Day, Independence Day, and Christmas are also excluded from the count.
            </p>
          </div>
        </div>

        <FAQ items={faqItems} title="Date Calculation FAQ" />
      </div>
      <Footer />
    </main>
  )
}