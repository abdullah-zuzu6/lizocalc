'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import { Calendar, RotateCcw, Info, ListFilter, BarChart3, Clock, Milestone, CheckCircle2, Cake } from 'lucide-react'

import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

interface AgeDetails {
  years: number
  months: number
  days: number
  totalDays: number
  totalHours: number
  totalMinutes: number
  nextBirthday: number
}

export default function AgeCalculator() {
  const relatedCalculators = [
    { name: 'Date Calculator', description: 'Days between two dates', href: '/calculators/time/date-calculator', icon: Calendar },
    { name: 'Time Calculator', description: 'Hours to minutes and more', href: '/calculators/time/time-calculator', icon: Clock },
  ]

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const currentYear = new Date().getFullYear()

  // Refs for hidden date pickers
  const birthDatePickerRef = useRef<HTMLInputElement>(null)
  const targetDatePickerRef = useRef<HTMLInputElement>(null)

  // --- States ---
  const [birthMonth, setBirthMonth] = useState('Jan')
  const [birthDay, setBirthDay] = useState(1)
  const [birthYear, setBirthYear] = useState(2000)
  
  const [targetMonth, setTargetMonth] = useState(months[new Date().getMonth()])
  const [targetDay, setTargetDay] = useState(new Date().getDate())
  const [targetYear, setTargetYear] = useState(currentYear)

  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  // --- Handlers for Calendar Picker ---
  const handleCalendarChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'birth' | 'target') => {
    const date = new Date(e.target.value)
    if (isNaN(date.getTime())) return

    const m = months[date.getMonth()]
    const d = date.getDate()
    const y = date.getFullYear()

    if (type === 'birth') {
      setBirthMonth(m); setBirthDay(d); setBirthYear(y)
    } else {
      setTargetMonth(m); setTargetDay(d); setTargetYear(y)
    }
  }

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['age-calc']?.data) {
      const data = history['age-calc'].data
      setBirthMonth(data.birthMonth || 'Jan')
      setBirthDay(data.birthDay || 1)
      setBirthYear(data.birthYear || 2000)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('age-calc', { birthMonth, birthDay, birthYear })
    }
  }, [birthMonth, birthDay, birthYear, isMounted])

  // --- Calculation Engine ---
  const results = useMemo((): AgeDetails | null => {
    if (trigger === 0) return null

    const birthDate = new Date(`${birthMonth} ${birthDay}, ${birthYear}`)
    const targetDate = new Date(`${targetMonth} ${targetDay}, ${targetYear}`)

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) return null

    let yearsDiff = targetDate.getFullYear() - birthDate.getFullYear()
    let monthsDiff = targetDate.getMonth() - birthDate.getMonth()
    let daysDiff = targetDate.getDate() - birthDate.getDate()

    if (daysDiff < 0) {
      monthsDiff--
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0)
      daysDiff += prevMonth.getDate()
    }

    if (monthsDiff < 0) {
      yearsDiff--
      monthsDiff += 12
    }

    const totalDays = Math.floor((targetDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60

    const nextBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    if (nextBday < targetDate) {
        nextBday.setFullYear(nextBday.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.ceil((nextBday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24))

    return { 
        years: yearsDiff, 
        months: monthsDiff, 
        days: daysDiff, 
        totalDays, 
        totalHours, 
        totalMinutes: Math.floor(totalMinutes), 
        nextBirthday: daysToNextBirthday 
    }
  }, [trigger])

  const handleCalculate = () => {
    setTrigger(prev => prev + 1)
    setShowResults(true)
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
              
              <div className="space-y-6">
                {/* Date of Birth */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Date of Birth</label>
                    <button 
                      onClick={() => birthDatePickerRef.current?.showPicker()}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="Open Calendar"
                    >
                      <Calendar size={18} />
                    </button>
                    <input 
                      type="date" 
                      ref={birthDatePickerRef} 
                      className="sr-only" 
                      onChange={(e) => handleCalendarChange(e, 'birth')}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)} className="bg-secondary p-2 rounded-md border text-sm font-bold">
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={birthDay} onChange={(e) => setBirthDay(Number(e.target.value))} className="bg-secondary p-2 rounded-md border text-sm font-bold">
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <input 
                      type="number" 
                      value={birthYear} 
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      className="bg-secondary p-2 rounded-md border text-sm font-bold w-full"
                      placeholder="Year"
                    />
                  </div>
                </div>

                {/* Age at Date */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Age at the Date of</label>
                    <button 
                      onClick={() => targetDatePickerRef.current?.showPicker()}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                      title="Open Calendar"
                    >
                      <Calendar size={18} />
                    </button>
                    <input 
                      type="date" 
                      ref={targetDatePickerRef} 
                      className="sr-only" 
                      onChange={(e) => handleCalendarChange(e, 'target')}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select value={targetMonth} onChange={(e) => setTargetMonth(e.target.value)} className="bg-secondary p-2 rounded-md border text-sm font-bold">
                      {months.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    <select value={targetDay} onChange={(e) => setTargetDay(Number(e.target.value))} className="bg-secondary p-2 rounded-md border text-sm font-bold">
                      {days.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <input 
                      type="number" 
                      value={targetYear} 
                      onChange={(e) => setTargetYear(Number(e.target.value))}
                      className="bg-secondary p-2 rounded-md border text-sm font-bold w-full"
                      placeholder="Year"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Age <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={() => { setShowResults(false); setTrigger(0); }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS (Unchanged) */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-6 flex flex-col justify-center min-w-0">
                    <p className="text-muted-foreground text-center text-xs font-bold uppercase tracking-widest">Current Age</p>
                    <h2 className="text-4xl md:text-5xl font-black text-blue-600 text-center my-4 tracking-tighter">
                      {results.years} <span className="text-xl">years</span>
                    </h2>
                    <p className="text-center font-bold text-muted-foreground">
                        {results.months} months | {results.days} days
                    </p>
                  </div>

                  <div className="bg-card border rounded-xl p-6 flex flex-col items-center justify-center">
                    <Cake size={32} className="text-pink-500 mb-2" />
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Next Birthday In</p>
                    <h2 className="text-4xl font-black text-foreground">
                        {results.nextBirthday} <span className="text-lg text-muted-foreground">days</span>
                    </h2>
                  </div>
                </div>

                <div className="bg-card border rounded-xl p-8">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase mb-6 tracking-widest flex items-center gap-2">
                        <BarChart3 size={14} className="text-blue-500" /> Life Breakdown
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="p-4 bg-secondary/50 rounded-lg border text-center">
                            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total Days</p>
                            <p className="text-xl font-bold">{results.totalDays.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg border text-center">
                            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total Hours</p>
                            <p className="text-xl font-bold">{results.totalHours.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-secondary/50 rounded-lg border text-center">
                            <p className="text-xs text-muted-foreground font-bold uppercase mb-1">Total Minutes</p>
                            <p className="text-xl font-bold">{results.totalMinutes.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
              </>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <Clock size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Select dates and click calculate to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* EDUCATIONAL SECTION (Unchanged) */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <Info size={20} className="text-blue-600"/> Why Calculate Age?
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Understanding your exact age down to the day helps in legal documentation, health tracking, and milestone planning. This tool accounts for leap years and varying month lengths.
            </p>
          </div>

          <div className="bg-card border rounded-xl p-8">
            <h3 className="font-bold text-xl mb-4">Pro Tips</h3>
            <div className="space-y-3">
              {[
                "Set the 'Age at Date' to a future year to see how old you'll be on a specific trip.",
                "The 'Total Days' stat is great for celebrating '10,000 days alive' milestones.",
                "Calculations are based on the Gregorian Calendar system."
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 text-sm text-muted-foreground items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  )
}