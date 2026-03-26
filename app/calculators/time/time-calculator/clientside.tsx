'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Info, 
  Settings2, 
  Heart, 
  Timer
} from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

export default function TimeCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  // --- Input States ---
  const [hours, setHours] = useState<number>(1)
  const [minutes, setMinutes] = useState<number>(30)
  const [seconds, setSeconds] = useState<number>(45)

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Time Calculator",
    href: "/calculators/time/time-calculator",
    category: "Time",
  }

  const relatedCalculators = [
    { name: 'Date Calculator', description: 'Calculate days between', href: '/calculators/time/date-calculator', icon: Clock },
    { name: 'Age Calculator', description: 'Calculate age based on birth date', href: '/calculators/time/age-calculator', icon: Clock },
  ]

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true)
    
    // Load inputs from history
    const history = getCalculatorHistory()
    if (history['time-calc']?.data) {
      const d = history['time-calc'].data
      setHours(d.hours ?? 1)
      setMinutes(d.minutes ?? 30)
      setSeconds(d.seconds ?? 45)
    }

    // Check if tool is favorited
    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('time-calc', { hours, minutes, seconds })
  }, [hours, minutes, seconds, isMounted])

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  // --- Calculation Logic ---
  const results = useMemo(() => {
    if (trigger === 0) return null
    return {
      totalSeconds: hours * 3600 + minutes * 60 + seconds,
      totalMinutes: hours * 60 + minutes + seconds / 60,
      totalHours: hours + minutes / 60 + seconds / 3600
    }
  }, [trigger, hours, minutes, seconds])

  const handleCalculate = () => {
    setTrigger(t => t + 1)
    setShowResults(true)
  }

  const handleReset = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
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
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE CALCULATOR BUTTON */}
              <button 
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved 
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm" 
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: 'Hours', val: hours, setter: setHours, max: 23 },
                  { label: 'Minutes', val: minutes, setter: setMinutes, max: 59 },
                  { label: 'Seconds', val: seconds, setter: setSeconds, max: 59 }
                ].map((item) => (
                  <div key={item.label}>
                    <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                      {item.label}: {item.val}
                    </label>
                    <input 
                      type="range" min="0" max={item.max} step="1" 
                      value={item.val} 
                      onChange={(e) => { item.setter(Number(e.target.value)); setShowResults(false) }} 
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600 mb-3" 
                    />
                    <input 
                      type="number" 
                      value={item.val} 
                      onChange={(e) => { item.setter(Number(e.target.value)); setShowResults(false) }} 
                      min="0" 
                      className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none font-bold text-lg transition-all" 
                    />
                  </div>
                ))}
                
                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={handleCalculate} 
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button 
                    onClick={handleReset} 
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {[
                  { label: 'Total Seconds', val: results.totalSeconds.toLocaleString() },
                  { label: 'Total Minutes', val: results.totalMinutes.toFixed(2) },
                  { label: 'Total Hours', val: results.totalHours.toFixed(4) }
                ].map((res) => (
                  <div key={res.label} className="bg-card border rounded-xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-muted-foreground mb-2 tracking-widest">{res.label}</p>
                    <p className="text-3xl font-black text-blue-600 break-all">{res.val}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center min-h-[200px] flex flex-col items-center justify-center">
                <Timer size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter values and click calculate
                </p>
              </div>
            )}

            <div className="bg-card rounded-xl border p-8">
              <div className="flex gap-3 mb-4">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <h3 className="font-bold text-lg">About Time Conversion</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                This calculator converts units of time into multiple formats. By entering hours, minutes, and seconds, 
                you can see the equivalent duration expressed entirely in seconds, decimal minutes, or decimal hours. 
                This is particularly useful for payroll, sports timing, or scientific calculations.
              </p>
            </div>
            
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </div>
      </section>
    </main>
  )
}