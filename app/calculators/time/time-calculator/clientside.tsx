'use client'

import { useState, useEffect, useMemo } from 'react'
import { Clock, RotateCcw, ListFilter, CheckCircle2, Info, BarChart3 } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function TimeCalculator() {
  const [hours, setHours] = useState<number>(1)
  const [minutes, setMinutes] = useState<number>(30)
  const [seconds, setSeconds] = useState<number>(45)
  const [isMounted, setIsMounted] = useState(false)
  
  // Logic to control result display
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  const relatedCalculators = [
    { name: 'Date Calculator', description: 'Calculate days between', href: '/calculators/time/date-calculator', icon: Clock },
    { name: 'Age Calculator', description: 'Calculate age based on birth date', href: '/calculators/time/age-calculator', icon: Clock },
  ]

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['time-calc']?.data) {
      const d = history['time-calc'].data
      setHours(d.hours ?? 1)
      setMinutes(d.minutes ?? 30)
      setSeconds(d.seconds ?? 45)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('time-calc', { hours, minutes, seconds })
    }
  }, [hours, minutes, seconds, isMounted])

  // --- Calculations (only recalculated when trigger changes) ---
  const results = useMemo(() => {
    return {
      totalSeconds: hours * 3600 + minutes * 60 + seconds,
      totalMinutes: hours * 60 + minutes + seconds / 60,
      totalHours: hours + minutes / 60 + seconds / 3600
    }
  }, [trigger])

  const handleCalculate = () => {
    setTrigger(t => t + 1)
    setShowResults(true)
  }

  const handleReset = () => {
    setHours(0); setMinutes(0); setSeconds(0)
    setShowResults(false)
    setTrigger(0)
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground py-8">
      <section className="px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: 'Hours', val: hours, setter: setHours, max: 23 },
                  { label: 'Minutes', val: minutes, setter: setMinutes, max: 59 },
                  { label: 'Seconds', val: seconds, setter: setSeconds, max: 59 }
                ].map((item) => (
                  <div key={item.label}>
                    <label className="block text-sm font-semibold mb-2">{item.label}: {item.val}</label>
                    <input 
                      type="range" min="0" max={item.max} step="1" 
                      value={item.val} 
                      onChange={(e) => { item.setter(Number(e.target.value)); setShowResults(false) }} 
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                    <input 
                      type="number" value={item.val} 
                      onChange={(e) => { item.setter(Number(e.target.value)); setShowResults(false) }} 
                      min="0" 
                      className="w-full mt-3 px-3 py-2 bg-secondary rounded-md border font-bold text-lg" 
                    />
                  </div>
                ))}
                
                <div className="pt-4 flex flex-col gap-3">
                  <button onClick={handleCalculate} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button onClick={handleReset} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition flex items-center justify-center gap-2">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Seconds', val: results.totalSeconds.toLocaleString() },
                  { label: 'Total Minutes', val: results.totalMinutes.toFixed(2) },
                  { label: 'Total Hours', val: results.totalHours.toFixed(4) }
                ].map((res) => (
                  <div key={res.label} className="bg-card border rounded-xl p-6 text-center overflow-hidden">
                    <p className="text-muted-foreground text-xs font-bold uppercase mb-2">{res.label}</p>
                    {/* break-all and max-w-full prevent overflow issues */}
                    <p className="text-2xl font-black text-blue-600 break-all max-w-full">{res.val}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground">
                <p className="text-sm font-bold uppercase tracking-widest">Enter values and click calculate</p>
              </div>
            )}

            <div className="bg-card rounded-xl border p-8">
              <div className="flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <h3 className="font-bold text-lg">About Time Conversion</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                This calculator converts time between hours, minutes, and seconds.
              </p>
            </div>
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </div>
      </section>
    </main>
  )
}