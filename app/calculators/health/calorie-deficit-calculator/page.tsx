'use client'

import { useState, useEffect, useMemo } from 'react'
import { Target, Flame, Scale, RotateCcw, Info, TrendingDown, Calendar, AlertTriangle, Zap, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function CalorieDeficitCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [currentWeight, setCurrentWeight] = useState<string>('85')
  const [goalWeight, setGoalWeight] = useState<string>('75')
  const [tdee, setTdee] = useState<string>('2500')
  const [pace, setPace] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const startW = parseFloat(currentWeight) || 0
    const endW = parseFloat(goalWeight) || 0
    const maintenance = parseFloat(tdee) || 0
    
    if (!startW || !endW || !maintenance) return null

    const totalLossNeeded = startW - endW
    if (totalLossNeeded <= 0) return { error: "Goal weight must be lower than current weight." }

    // Deficit amounts (Calories per day)
    const deficitMap = {
      conservative: 300,
      moderate: 500,
      aggressive: 750
    }

    const dailyDeficit = deficitMap[pace]
    const targetCalories = maintenance - dailyDeficit
    
    // 1kg of fat is roughly 7700 calories
    const totalCaloriesToBurn = totalLossNeeded * 7700
    const daysToGoal = totalCaloriesToBurn / dailyDeficit
    const weeksToGoal = daysToGoal / 7

    return {
      targetCalories: Math.round(targetCalories),
      dailyDeficit,
      weeksToGoal: weeksToGoal.toFixed(1),
      totalLossNeeded,
      isDangerous: targetCalories < 1200
    }
  }, [currentWeight, goalWeight, tdee, pace])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Calorie Deficit Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plan your weight loss journey with precision. Calculate exactly how many calories to cut to reach your target.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-sm">
              <div className="space-y-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <Scale size={14} className="text-primary" /> Current Weight (kg)
                    </label>
                    <input type="number" value={currentWeight} onChange={(e) => setCurrentWeight(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <Target size={14} className="text-primary" /> Goal Weight (kg)
                    </label>
                    <input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                    <Flame size={14} className="text-primary" /> Your Maintenance Calories (TDEE)
                  </label>
                  <input type="number" value={tdee} onChange={(e) => setTdee(e.target.value)} className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" />
                </div>

                {/* Pace Selector */}
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-muted-foreground">Loss Pace</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'conservative', label: 'Slow', desc: '0.25kg/wk' },
                      { id: 'moderate', label: 'Steady', desc: '0.5kg/wk' },
                      { id: 'aggressive', label: 'Fast', desc: '0.75kg/wk' }
                    ].map((p) => (
                      <button 
                        key={p.id} onClick={() => setPace(p.id as any)}
                        className={`p-3 rounded-2xl transition-all border flex flex-col items-center ${pace === p.id ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-muted border-transparent text-muted-foreground hover:border-border'}`}
                      >
                        <span className="text-sm font-bold">{p.label}</span>
                        <span className="text-[10px] opacity-70">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => {setCurrentWeight('85'); setGoalWeight('75'); setTdee('2500');}} className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-5 space-y-6">
            {results && !results.error ? (
              <div className="space-y-6">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                    <TrendingDown size={200} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Daily Calorie Budget</span>
                    <h3 className="text-6xl font-black mt-2">{results.targetCalories} <span className="text-xl font-medium">kcal</span></h3>
                    <div className="mt-6 flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full">
                      <Zap size={14} /> -{results.dailyDeficit} kcal deficit per day
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-8 space-y-6 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-muted rounded-2xl text-primary"><Calendar size={24}/></div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Estimated Timeline</p>
                      <p className="text-2xl font-black">{results.weeksToGoal} Weeks</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-muted rounded-2xl text-primary"><CheckCircle2 size={24}/></div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase">Total Weight to Lose</p>
                      <p className="text-2xl font-black">{results.totalLossNeeded} kg</p>
                    </div>
                  </div>

                  {results.isDangerous && (
                    <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex gap-3 text-rose-500">
                      <AlertTriangle size={20} className="shrink-0" />
                      <p className="text-xs leading-relaxed font-medium">
                        <strong>Warning:</strong> Your daily budget is below 1,200 calories. This may be difficult to sustain safely. Consult a professional.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                {results?.error ? <AlertTriangle size={48} className="text-rose-500 mb-4" /> : <TrendingDown size={48} className="opacity-20 mb-4" />}
                <p className="font-medium">{results?.error || "Enter your weight and goal to see your deficit plan."}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Info className="text-primary" /> Understanding the Deficit
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>calorie deficit</strong> occurs when you consume fewer calories than your body burns to maintain its current weight. This forces the body to use stored energy (fat) to make up the difference.
              </p>
              
              <div className="p-6 bg-muted rounded-2xl space-y-2">
                <h4 className="font-bold text-foreground">The 7,700 Rule</h4>
                <p className="text-sm text-muted-foreground">
                  Science suggests that it takes a cumulative deficit of approximately <strong>7,700 calories</strong> to lose 1 kilogram of body fat. By cutting 500 calories per day, you create a weekly deficit of 3,500—resulting in roughly 0.5kg of loss per week.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Zap className="text-primary" /> Sustainable Weight Loss
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Consistency beats intensity. While aggressive deficits look good on paper, they often lead to metabolic adaptation and burnout.
              </p>
              
              <ul className="space-y-3 text-sm">
                <li className="flex gap-2"><strong>Conservative (0.25kg/wk):</strong> Best for muscle retention and longevity.</li>
                <li className="flex gap-2"><strong>Moderate (0.5kg/wk):</strong> The "Gold Standard" for sustainable results.</li>
                <li className="flex gap-2"><strong>Aggressive (0.75kg/wk):</strong> Should only be followed for short periods.</li>
              </ul>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'TDEE Calculator', description: 'Find your maintenance calories', href: '/calculator/tdee', icon: Flame },
          { name: 'Macro Calculator', description: 'Set your protein and carb splits', href: '/calculator/macros', icon: Target }
        ]} />
      </div>
      <Footer />
    </main>
  )
}