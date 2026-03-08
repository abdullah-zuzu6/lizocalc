'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
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
  const [birthDate, setBirthDate] = useState<string>('2000-01-01')
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['age']?.data) {
      setBirthDate(history['age'].data.birthDate || '2000-01-01')
    }
  }, [])

  // Save to cookies whenever date changes
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('age', { birthDate })
    }
  }, [birthDate, isMounted])

  const calculateAge = (): AgeDetails => {
    const birth = new Date(birthDate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += prevMonth.getDate()
    }

    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalHours = totalDays * 24
    const totalMinutes = totalHours * 60

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday < today) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    }
    const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    return { years, months, days, totalDays, totalHours, totalMinutes: Math.floor(totalMinutes), nextBirthday: daysToNextBirthday }
  }

  const age = calculateAge()
  const maxDate = new Date().toISOString().split('T')[0]

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Age Calculator</h1>
          <p className="text-lg text-muted-foreground">Calculate your exact age in years, months, and days</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">Date of Birth</label>
              <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} max={maxDate} className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground text-lg" />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
            <p className="text-muted-foreground text-sm mb-2">Your Age</p>
            <p className="text-3xl font-bold text-primary mb-4">{age.years} years</p>
            <div className="text-sm space-y-2">
              <p><span className="text-muted-foreground">{age.months}</span> months, <span className="text-muted-foreground">{age.days}</span> days</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
            <p className="text-muted-foreground text-sm mb-2">Days Until Next Birthday</p>
            <p className="text-3xl font-bold text-accent">{age.nextBirthday}</p>
            <p className="text-sm text-muted-foreground mt-2">days remaining</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <h3 className="font-semibold text-lg mb-6">Detailed Breakdown</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <p className="text-muted-foreground text-sm mb-2">Days Lived</p>
              <p className="text-2xl font-bold text-primary">{age.totalDays.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <p className="text-muted-foreground text-sm mb-2">Hours Lived</p>
              <p className="text-2xl font-bold text-accent">{age.totalHours.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-background rounded-lg border border-border">
              <p className="text-muted-foreground text-sm mb-2">Minutes Lived</p>
              <p className="text-2xl font-bold text-foreground">{age.totalMinutes.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">About Age Calculation</h3>
          </div>
          <p className="text-muted-foreground">This calculator computes your exact age including years, months, and days. It also shows you how many days remain until your next birthday!</p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
