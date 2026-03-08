'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function TimeCalculator() {
  const [hours, setHours] = useState<number>(1)
  const [minutes, setMinutes] = useState<number>(30)
  const [seconds, setSeconds] = useState<number>(45)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['time']?.data) {
      setHours(history['time'].data.hours || 1)
      setMinutes(history['time'].data.minutes || 30)
      setSeconds(history['time'].data.seconds || 45)
    }
  }, [])

  // Save to cookies whenever values change
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('time', { hours, minutes, seconds })
    }
  }, [hours, minutes, seconds, isMounted])

  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  const totalMinutes = hours * 60 + minutes + seconds / 60
  const totalHours = hours + minutes / 60 + seconds / 3600

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <BackButton href="/calculators/other" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Time Calculator</h1>
          <p className="text-lg text-muted-foreground">Convert and calculate time durations</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-semibold mb-3">Hours: {hours}</label>
              <input type="range" min="0" max="23" step="1" value={hours} onChange={(e) => setHours(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
              <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} min="0" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Minutes: {minutes}</label>
              <input type="range" min="0" max="59" step="1" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
              <input type="number" value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} min="0" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Seconds: {seconds}</label>
              <input type="range" min="0" max="59" step="1" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary" />
              <input type="number" value={seconds} onChange={(e) => setSeconds(Number(e.target.value))} min="0" className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Seconds</p>
            <p className="text-4xl font-bold text-primary">{totalSeconds.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Minutes</p>
            <p className="text-4xl font-bold text-accent">{totalMinutes.toFixed(2)}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total Hours</p>
            <p className="text-4xl font-bold text-foreground">{totalHours.toFixed(4)}</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Time Conversion</h3>
          </div>
          <p className="text-muted-foreground">This calculator quickly converts time between hours, minutes, and seconds. Useful for scheduling, cooking, sports, and time tracking.</p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
