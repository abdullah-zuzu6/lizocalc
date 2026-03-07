'use client'

import { useState, useEffect, useMemo } from 'react'
import { RotateCcw, Info, ChevronRight, Calculator, Zap, CheckCircle2, Target, Percent, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type GradeResult = {
  needed: string
  status: 'possible' | 'impossible' | 'guaranteed'
  message: string
}

export default function GradeCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [currentGrade, setCurrentGrade] = useState<string>('85')
  const [targetGrade, setTargetGrade] = useState<string>('90')
  const [finalWeight, setFinalWeight] = useState<string>('20')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): GradeResult | { error: string } | null => {
    const current = parseFloat(currentGrade)
    const target = parseFloat(targetGrade)
    const weight = parseFloat(finalWeight)

    if (isNaN(current) || isNaN(target) || isNaN(weight)) return null
    if (weight <= 0 || weight >= 100) return { error: "Weight must be between 1% and 99%." }

    // Formula: Needed = (Target - (Current * (1 - Weight))) / Weight
    const weightDecimal = weight / 100
    const scoreNeeded = (target - (current * (1 - weightDecimal))) / weightDecimal

    let status: 'possible' | 'impossible' | 'guaranteed' = 'possible'
    let message = ""

    if (scoreNeeded > 100) {
      status = 'impossible'
      message = "You'd need more than 100% to reach this goal."
    } else if (scoreNeeded <= 0) {
      status = 'guaranteed'
      message = "You've already secured this grade!"
    } else {
      message = `You need a ${scoreNeeded.toFixed(2)}% on the final.`
    }

    return {
      needed: scoreNeeded.toFixed(2),
      status,
      message
    }
  }, [currentGrade, targetGrade, finalWeight])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Final Exam <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Stop guessing your grades. Calculate exactly what you need to score on your final exam to reach your target course grade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className={`rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden ${
                  results.status === 'impossible' ? 'bg-rose-500' : 
                  results.status === 'guaranteed' ? 'bg-emerald-500' : 'bg-primary'
                }`}>
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Score Required</span>
                    <h3 className="text-6xl font-black mt-2 tracking-tighter">
                      {results.status === 'guaranteed' ? '0%' : `${results.needed}%`}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Outcome</p>
                        <p className="text-lg font-bold">{results.message}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Goal Summary</h4>
                   <div className="space-y-3">
                      <StatRow label="Target" value={`${targetGrade}%`} />
                      <StatRow label="Final Weight" value={`${finalWeight}%`} />
                   </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                {results && 'error' in results ? (
                    <div className="text-rose-500 space-y-2">
                        <Info size={40} className="mx-auto" />
                        <p className="text-xs font-bold uppercase tracking-widest">{results.error}</p>
                    </div>
                ) : (
                    <>
                        <Target size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter Your Goals</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Percent size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Award size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Grade Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Current Grade (%)" value={currentGrade} onChange={(v) => {setCurrentGrade(v); setShowResults(false)}} />
                  <InputField label="Target Grade (%)" value={targetGrade} onChange={(v) => {setTargetGrade(v); setShowResults(false)}} />
                  <div className="md:col-span-2">
                    <InputField label="Final Exam Weight (%)" value={finalWeight} onChange={(v) => {setFinalWeight(v); setShowResults(false)}} highlight />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Needed Score <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setCurrentGrade(''); setTargetGrade(''); setFinalWeight('');}}
                    className="flex-1 py-4 bg-muted text-muted-foreground rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> Reset
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Weighted Grade Formula</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        To find your final grade, we use a weighted average. The final exam takes up a portion of your grade, and your current coursework makes up the rest.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-xs md:text-sm">
                          Final Score = (Target - (Current × (100% - Weight))) / Weight
                        </code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Pro Tips for Finals</h3>
                    <div className="space-y-4">
                        <TipItem text="Check your syllabus to confirm the exact weight of your final exam." />
                        <TipItem text="If you need more than 100%, check if your professor offers extra credit." />
                        <TipItem text="Aim for 2-3% higher than the calculated score to allow for a 'safety margin'." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'GPA Calculator', description: 'Semester & Cumulative GPA', href: '/calculator/gpa', icon: Award },
          { name: 'Percentage Calc', description: 'General percent math', href: '/calculator/percentage', icon: Percent }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function InputField({ label, value, onChange, highlight }: { label: string, value: string, onChange: (v: string) => void, highlight?: boolean }) {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase transition-colors ${highlight ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </div>
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-36 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 outline-none transition-all ${highlight ? 'ring-primary/40' : 'ring-primary/10'}`}
        placeholder="0"
      />
    </div>
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