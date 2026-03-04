'use client'

import { useState, useEffect, useMemo } from 'react'
import { Moon, Sun, Clock, RotateCcw, Info, ChevronRight, CheckCircle2, Bed, Coffee, Battery } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type SleepCycle = {
  time: string
  hours: number
  cycles: number
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor'
}

export default function SleepCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [mode, setMode] = useState<'wake' | 'bed'>('wake')

  // --- Input States ---
  const [timeValue, setTimeValue] = useState<string>('07:00')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const sleepOptions = useMemo((): SleepCycle[] => {
    const [hours, minutes] = timeValue.split(':').map(Number)
    const baseDate = new Date()
    baseDate.setHours(hours, minutes, 0, 0)

    const cycles = [6, 5, 4, 3] // Number of 90-minute cycles
    const FALL_ASLEEP_BUFFER = 15 // Minutes

    return cycles.map(c => {
      const totalMinutes = c * 90
      const targetDate = new Date(baseDate.getTime())
      
      if (mode === 'wake') {
        // Subtract time to find bedtime
        targetDate.setMinutes(targetDate.getMinutes() - totalMinutes - FALL_ASLEEP_BUFFER)
      } else {
        // Add time to find wake time
        targetDate.setMinutes(targetDate.getMinutes() + totalMinutes + FALL_ASLEEP_BUFFER)
      }

      const quality: SleepCycle['quality'] = 
        c >= 5 ? 'Excellent' : c === 4 ? 'Good' : c === 3 ? 'Fair' : 'Poor'

      return {
        time: targetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        hours: totalMinutes / 60,
        cycles: c,
        quality
      }
    })
  }, [timeValue, mode])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Sleep <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Optimize your rest. Calculate the perfect time to go to bed or wake up based on natural 90-minute sleep cycles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-6 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-4">Recommended {mode === 'wake' ? 'Bedtimes' : 'Wake Times'}</p>
                  <div className="space-y-3">
                    {sleepOptions.map((opt, i) => (
                      <div key={i} className={`p-4 rounded-2xl flex justify-between items-center ${i === 0 ? 'bg-white/20' : 'bg-white/10'}`}>
                        <div>
                          <p className="text-2xl font-black">{opt.time}</p>
                          <p className="text-[10px] uppercase font-bold opacity-60">{opt.hours} Hours ({opt.cycles} Cycles)</p>
                        </div>
                        <span className="text-[10px] font-black bg-white/20 px-2 py-1 rounded-lg uppercase">{opt.quality}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Why these times?</h4>
                   <p className="text-xs leading-relaxed text-muted-foreground">
                     Waking up in the middle of a sleep cycle causes grogginess. These times align with the end of a <strong>90-minute cycle</strong>, plus a 15-minute buffer to fall asleep.
                   </p>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <Moon size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Set your schedule to begin</p>
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <button 
                  onClick={() => setMode('wake')}
                  className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${mode === 'wake' ? 'bg-primary text-white shadow-lg' : 'bg-muted text-muted-foreground'}`}
                >
                  <Sun size={16} /> I want to wake up at
                </button>
                <button 
                  onClick={() => setMode('bed')}
                  className={`flex-1 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${mode === 'bed' ? 'bg-primary text-white shadow-lg' : 'bg-muted text-muted-foreground'}`}
                >
                  <Moon size={16} /> I'm going to bed at
                </button>
              </div>

              <div className="relative group mb-8">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Select Time</div>
                <input 
                  type="time" 
                  value={timeValue} 
                  onChange={(e) => {setTimeValue(e.target.value); setShowResults(false)}}
                  className="w-full pl-32 pr-4 py-8 bg-muted border-none rounded-3xl text-2xl font-black focus:ring-2 ring-primary/20 outline-none transition-all cursor-pointer"
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setShowResults(true)}
                  className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  Calculate Sleep Cycles <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => {setShowResults(false); setTimeValue('07:00');}}
                  className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Science of Sleep Cycles</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        A typical night's sleep consists of several 90-minute cycles. During these cycles, your brain moves from light sleep to deep sleep and finally to REM (Rapid Eye Movement) sleep.
                    </p>
                    

[Image of stages of sleep cycle diagram showing light sleep deep sleep and REM]

                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <p className="text-[10px] font-bold text-primary uppercase mb-2">Did you know?</p>
                        <p className="text-xs text-muted-foreground">Waking up at the 90-minute mark allows you to feel refreshed, even if you slept fewer total hours than usual.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Sleep Hygiene Tips</h3>
                    

[Image of human circadian rhythm diagram]

                    <div className="space-y-4">
                        <TipItem text="Consistency is key: Try to wake up at the same time every day, even on weekends." />
                        <TipItem text="Limit Blue Light: Put away phones and screens at least 30-60 minutes before your calculated bedtime." />
                        <TipItem text="The 15-Minute Rule: Most people take about 15 minutes to fall asleep; our calculator accounts for this automatically." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'GPA Calculator', description: 'Academic performance', href: '/calculator/gpa', icon: Coffee },
          { name: 'BMI Calculator', description: 'Health metrics', href: '/calculator/bmi', icon: Battery }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-primary">{value}</span>
    </div>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-muted/50 rounded-2xl border border-border text-sm leading-relaxed text-muted-foreground hover:border-primary/30 transition-colors">
      <ChevronRight size={18} className="text-primary shrink-0" />
      <p>{text}</p>
    </div>
  )
}