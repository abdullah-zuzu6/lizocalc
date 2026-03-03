'use client'

import { useState, useEffect, useMemo } from 'react'
import { Target, Zap, Flame, Scale, RotateCcw, Info, HelpCircle, ChevronRight, Apple, Beef, Wheat } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function MacroCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [tdee, setTdee] = useState<string>('2500')
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain')
  const [dietType, setDietType] = useState<'balanced' | 'high-protein' | 'keto' | 'low-carb'>('balanced')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const calories = parseFloat(tdee) || 0
    if (!calories) return null

    // Adjust calories based on goal
    let targetCalories = calories
    if (goal === 'lose') targetCalories -= 500
    if (goal === 'gain') targetCalories += 500

    // Macro Ratios (Protein/Carbs/Fats)
    let ratios = { p: 0.30, c: 0.40, f: 0.30 } // Default Balanced

    if (dietType === 'high-protein') ratios = { p: 0.40, c: 0.35, f: 0.25 }
    if (dietType === 'keto') ratios = { p: 0.25, c: 0.05, f: 0.70 }
    if (dietType === 'low-carb') ratios = { p: 0.35, c: 0.20, f: 0.45 }

    return {
      totalCals: Math.round(targetCalories),
      protein: Math.round((targetCalories * ratios.p) / 4),
      carbs: Math.round((targetCalories * ratios.c) / 4),
      fats: Math.round((targetCalories * ratios.f) / 9),
      ratios
    }
  }, [tdee, goal, dietType])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Macro Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Fine-tune your nutrition. Calculate the ideal balance of protein, carbs, and fats for your specific diet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-sm">
              <div className="space-y-8">
                
                {/* TDEE Input */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                    <Flame size={14} className="text-primary" /> Daily Calorie Goal (TDEE)
                  </label>
                  <input 
                    type="number" value={tdee} onChange={(e) => setTdee(e.target.value)}
                    className="w-full p-4 bg-muted border-none rounded-2xl text-2xl font-bold focus:ring-2 ring-primary/20 outline-none"
                    placeholder="e.g. 2500"
                  />
                  <p className="text-[10px] text-muted-foreground italic">Don't know your TDEE? Use our TDEE Calculator first.</p>
                </div>

                {/* Goal Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground">Your Primary Goal</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['lose', 'maintain', 'gain'].map((g) => (
                      <button 
                        key={g} onClick={() => setGoal(g as any)}
                        className={`py-3 rounded-xl text-sm font-bold capitalize transition-all border ${goal === g ? 'bg-primary text-white border-primary' : 'bg-muted text-muted-foreground border-transparent'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diet Type Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground">Diet Preference</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: 'balanced', label: 'Balanced (30/40/30)', icon: Apple },
                      { id: 'high-protein', label: 'High Protein (40/35/25)', icon: Beef },
                      { id: 'low-carb', label: 'Low Carb (35/20/45)', icon: Scale },
                      { id: 'keto', label: 'Ketogenic (25/5/70)', icon: Zap },
                    ].map((d) => (
                      <button 
                        key={d.id} onClick={() => setDietType(d.id as any)}
                        className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-bold transition-all border ${dietType === d.id ? 'bg-primary/10 border-primary text-primary' : 'bg-muted border-transparent text-muted-foreground hover:bg-muted/80'}`}
                      >
                        <d.icon size={18} />
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {setTdee('2500'); setGoal('maintain'); setDietType('balanced');}}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Visual Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            {results ? (
              <div className="space-y-6">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                    <Target size={200} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Target Intake</span>
                    <h3 className="text-6xl font-black mt-2">{results.totalCals} <span className="text-xl font-medium">kcal</span></h3>
                    <p className="mt-2 text-sm opacity-80 font-medium">For {goal}ing weight on a {dietType} diet</p>
                  </div>
                </div>

                {/* Macro Distribution Bars */}
                <div className="bg-card border border-border rounded-3xl p-8 space-y-8 shadow-sm">
                  {/* Protein */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold flex items-center gap-2"><Beef size={16} className="text-rose-500" /> Protein</span>
                      <span className="text-lg font-black">{results.protein}g</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                      <div style={{ width: `${results.ratios.p * 100}%` }} className="h-full bg-rose-500 rounded-full" />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{Math.round(results.ratios.p * 100)}% of total calories</p>
                  </div>

                  {/* Carbs */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold flex items-center gap-2"><Wheat size={16} className="text-amber-500" /> Carbs</span>
                      <span className="text-lg font-black">{results.carbs}g</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                      <div style={{ width: `${results.ratios.c * 100}%` }} className="h-full bg-amber-500 rounded-full" />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{Math.round(results.ratios.c * 100)}% of total calories</p>
                  </div>

                  {/* Fats */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold flex items-center gap-2"><Zap size={16} className="text-blue-500" /> Fats</span>
                      <span className="text-lg font-black">{results.fats}g</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                      <div style={{ width: `${results.ratios.f * 100}%` }} className="h-full bg-blue-500 rounded-full" />
                    </div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{Math.round(results.ratios.f * 100)}% of total calories</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Target size={48} className="opacity-20 mb-4" />
                <p>Select your goal and diet to see your macro targets.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Info className="text-primary" /> Why Macros Matter
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                While calories determine whether you lose or gain weight, <strong>macronutrients</strong> determine the <em>composition</em> of that weight. 
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><strong>Protein (4 cal/g):</strong> Essential for muscle repair and satiety.</li>
                <li className="flex gap-2"><strong>Carbs (4 cal/g):</strong> The body's primary fuel source for high-intensity activity.</li>
                <li className="flex gap-2"><strong>Fats (9 cal/g):</strong> Crucial for hormone production and brain health.</li>
              </ul>
              

[Image of the structure of carbohydrates, proteins, and fats]

            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <HelpCircle className="text-primary" /> Popular Diet Splits
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold flex items-center gap-2 text-primary"><Zap size={16}/> Ketogenic (Keto)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Forces the body into ketosis by keeping carbs extremely low (under 5%). High fats become your primary energy source.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl border border-border">
                  <h4 className="font-bold flex items-center gap-2 text-rose-500"><Beef size={16}/> High Protein</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Favored by bodybuilders and those looking to maintain muscle during a "cut." Helps keep hunger at bay.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'TDEE Calculator', description: 'Find your daily energy burn', href: '/calculator/tdee', icon: Flame },
          { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculator/bmi', icon: Scale }
        ]} />
      </div>
      <Footer />
    </main>
  )
}