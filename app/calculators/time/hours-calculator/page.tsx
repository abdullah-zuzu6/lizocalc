'use client'

import { useState, useMemo, useEffect } from 'react'
import { Clock, Calendar, Info, ArrowRight, RotateCcw, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'

type Period = 'AM' | 'PM'

export default function HoursCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // Time Only State
  const [startHour, setStartHour] = useState('08')
  const [startMin, setStartMin] = useState('00')
  const [startPeriod, setStartPeriod] = useState<Period>('AM')
  
  const [endHour, setEndHour] = useState('05')
  const [endMin, setEndMin] = useState('30')
  const [endPeriod, setEndPeriod] = useState<Period>('PM')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Helper to set "Now"
  const setTimeToNow = (target: 'start' | 'end') => {
    const now = new Date()
    let hours = now.getHours()
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const period = hours >= 12 ? 'PM' : 'AM'
    
    hours = hours % 12
    hours = hours ? hours : 12 // the hour '0' should be '12'
    const hourStr = hours.toString().padStart(2, '0')

    if (target === 'start') {
      setStartHour(hourStr); setStartMin(minutes); setStartPeriod(period)
    } else {
      setEndHour(hourStr); setEndMin(minutes); setEndPeriod(period)
    }
  }

  const results = useMemo(() => {
    if (!isMounted) return null

    const get24Hours = (h: string, m: string, p: Period) => {
      let hour = parseInt(h)
      if (p === 'PM' && hour !== 12) hour += 12
      if (p === 'AM' && hour === 12) hour = 0
      return hour * 60 + parseInt(m)
    }

    const startTotal = get24Hours(startHour, startMin, startPeriod)
    let endTotal = get24Hours(endHour, endMin, endPeriod)

    // Handle crossing midnight
    if (endTotal < startTotal) {
      endTotal += 24 * 60
    }

    const diffMinutes = endTotal - startTotal
    const hours = Math.floor(diffMinutes / 60)
    const mins = diffMinutes % 60
    const decimalHours = (diffMinutes / 60).toFixed(2)

    return { hours, mins, totalMinutes: diffMinutes, decimalHours }
  }, [startHour, startMin, startPeriod, endHour, endMin, endPeriod, isMounted])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Hours Calculator</h1>
          <p className="text-muted-foreground">Calculate hours and minutes between two times with AM/PM support.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="bg-card rounded-2xl border border-border p-8 space-y-8">
            {/* Start Time Group */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-primary uppercase">Start Time</label>
                <button onClick={() => setTimeToNow('start')} className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors bg-muted px-2 py-1 rounded">
                  <Zap size={12} /> Now
                </button>
              </div>
              <div className="flex gap-2">
                <input type="number" min="1" max="12" value={startHour} onChange={(e) => setStartHour(e.target.value.padStart(2, '0'))} className="flex-1 p-3 bg-background border border-border rounded-xl text-center" />
                <span className="flex items-center font-bold">:</span>
                <input type="number" min="0" max="59" value={startMin} onChange={(e) => setStartMin(e.target.value.padStart(2, '0'))} className="flex-1 p-3 bg-background border border-border rounded-xl text-center" />
                <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value as Period)} className="flex-1 p-3 bg-muted border border-border rounded-xl font-bold">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center text-muted-foreground/30"><ArrowRight size={32} /></div>

            {/* End Time Group */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-primary uppercase">End Time</label>
                <button onClick={() => setTimeToNow('end')} className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors bg-muted px-2 py-1 rounded">
                  <Zap size={12} /> Now
                </button>
              </div>
              <div className="flex gap-2">
                <input type="number" min="1" max="12" value={endHour} onChange={(e) => setEndHour(e.target.value.padStart(2, '0'))} className="flex-1 p-3 bg-background border border-border rounded-xl text-center" />
                <span className="flex items-center font-bold">:</span>
                <input type="number" min="0" max="59" value={endMin} onChange={(e) => setEndMin(e.target.value.padStart(2, '0'))} className="flex-1 p-3 bg-background border border-border rounded-xl text-center" />
                <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value as Period)} className="flex-1 p-3 bg-muted border border-border rounded-xl font-bold">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 flex flex-col justify-center text-center">
            <p className="text-sm text-muted-foreground mb-2">The total duration is:</p>
            <h2 className="text-5xl font-bold text-primary mb-2">
              {results?.hours}h {results?.mins}m
            </h2>
            <p className="text-lg font-medium text-muted-foreground mb-8">
              {results?.decimalHours} Decimal Hours
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 bg-background/50 rounded-xl border border-border flex justify-between items-center">
                <span className="text-sm font-medium">Total Minutes</span>
                <span className="font-bold">{results?.totalMinutes.toLocaleString()}</span>
              </div>
              <div className="p-4 bg-background/50 rounded-xl border border-border flex justify-between items-center">
                <span className="text-sm font-medium">Time Format</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">12-Hour Standard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Informational Content for SEO */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="text-primary" />
            <h3 className="font-bold text-lg">About the 12-Hour Time Calculation</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The 12-hour clock is a time convention in which the 24 hours of the day are divided into two periods: 
            <strong> AM</strong> (from Latin <em>ante meridiem</em>, meaning "before midday") and 
            <strong> PM</strong> (<em>post meridiem</em>, meaning "after midday"). This calculator accurately computes 
            the difference between two such times, even if the duration spans across midnight.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  )
}