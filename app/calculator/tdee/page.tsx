'use client'

import { useState, useEffect, useMemo } from 'react'
import { Activity, User, Target, Info, HelpCircle, RotateCcw, Zap, Flame, Scale, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function TDEECalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState<string>('25')
  const [weight, setWeight] = useState<string>('70')
  const [height, setHeight] = useState<string>('175')
  const [activity, setActivity] = useState<string>('1.375') // Light Exercise default

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const a = parseFloat(age) || 0
    const w = parseFloat(weight) || 0
    const h = parseFloat(height) || 0
    const mult = parseFloat(activity) || 1.2

    if (!a || !w || !h) return null

    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a)
    bmr = gender === 'male' ? bmr + 5 : bmr - 161

    const tdee = bmr * mult
    const bmi = w / ((h / 100) ** 2)

    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      bmi: bmi.toFixed(1),
      cutting: Math.round(tdee - 500),
      bulking: Math.round(tdee + 500),
      macros: {
        protein: Math.round((tdee * 0.3) / 4),
        fats: Math.round((tdee * 0.25) / 9),
        carbs: Math.round((tdee * 0.45) / 4)
      }
    }
  }, [gender, age, weight, height, activity])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Advanced TDEE Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover your maintenance calories and get a custom macro breakdown for your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-sm">
              <div className="space-y-8">
                
                {/* Gender Toggle */}
                <div className="flex bg-muted p-1.5 rounded-2xl border border-border">
                  <button 
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${gender === 'male' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  >
                    Male
                  </button>
                  <button 
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${gender === 'female' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  >
                    Female
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground">Age</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground">Weight (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground">Height (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground">Activity Level</label>
                  <select 
                    value={activity} 
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full p-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none appearance-none cursor-pointer"
                  >
                    <option value="1.2">Sedentary (Office Job)</option>
                    <option value="1.375">Light Exercise (1-2 days/week)</option>
                    <option value="1.55">Moderate Exercise (3-5 days/week)</option>
                    <option value="1.725">Heavy Exercise (6-7 days/week)</option>
                    <option value="1.9">Athlete (2x per day)</option>
                  </select>
                </div>

                <button 
                  onClick={() => {setAge('25'); setWeight('70'); setHeight('175');}}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            {results ? (
              <div className="space-y-6">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-10">
                    <Flame size={200} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Daily Maintenance</span>
                    <h3 className="text-6xl font-black mt-2">{results.tdee} <span className="text-xl font-medium">kcal/day</span></h3>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">Basal BMR</p>
                        <p className="text-xl font-bold">{results.bmr}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold opacity-60">BMI Score</p>
                        <p className="text-xl font-bold">{results.bmi}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Macro Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-card border border-border p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Zap size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Protein</p>
                        <p className="text-xl font-black">{results.macros.protein}g</p>
                      </div>
                    </div>
                    <ChevronRight className="opacity-20" />
                  </div>
                  <div className="bg-card border border-border p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-500"><Flame size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Carbs</p>
                        <p className="text-xl font-black">{results.macros.carbs}g</p>
                      </div>
                    </div>
                    <ChevronRight className="opacity-20" />
                  </div>
                  <div className="bg-card border border-border p-6 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Target size={20}/></div>
                      <div>
                        <p className="text-xs font-bold text-muted-foreground uppercase">Fats</p>
                        <p className="text-xl font-black">{results.macros.fats}g</p>
                      </div>
                    </div>
                    <ChevronRight className="opacity-20" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Activity size={48} className="opacity-20 mb-4" />
                <p>Fill in your stats to unlock your metabolic profile.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Scale className="text-primary" /> What is TDEE?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your <strong>Total Daily Energy Expenditure</strong> is an estimation of how many calories you burn per day when exercise is taken into account. It is calculated by first figuring out your Basal Metabolic Rate, then multiplying that value by an activity multiplier.
              </p>
              
              <div className="p-6 bg-muted rounded-2xl space-y-2">
                <h4 className="font-bold text-foreground">The Math Behind BMR (Mifflin-St Jeor)</h4>
                <div className="font-mono text-xs text-primary">
                   {"BMR = (10 \times weight) + (6.25 \times height) - (5 \times age) + s"}
                </div>
                <p className="text-[10px] text-muted-foreground italic mt-2">*Where s is +5 for males and -161 for females.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Target className="text-primary" /> Goal Setting
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold">To Lose Weight (Cutting)</h4>
                  <p className="text-sm text-muted-foreground">Aim for 500 calories below your TDEE. This typically results in ~0.5kg of weight loss per week.</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold">To Gain Weight (Bulking)</h4>
                  <p className="text-sm text-muted-foreground">Aim for 500 calories above your TDEE. Combine this with strength training for muscle growth.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculator/bmi', icon: User },
          { name: 'Macro Calculator', description: 'Detailed macro percentage splits', href: '/calculator/macros', icon: Target }
        ]} />
      </div>
      <Footer />
    </main>
  )
}