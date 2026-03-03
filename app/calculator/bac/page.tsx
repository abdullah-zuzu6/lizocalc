'use client'

import { useState, useEffect, useMemo } from 'react'
import { Beer, Wine, GlassWater, Clock, RotateCcw, Info, HelpCircle, Activity, AlertTriangle, User, Scale } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type Drink = {
  id: string
  type: 'Beer' | 'Wine' | 'Liquor' | 'Other'
  amount: string
  size: number // in ml
  abv: string // percentage
}

export default function BACCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [weight, setWeight] = useState<string>('70')
  const [hoursSinceFirstDrink, setHoursSinceFirstDrink] = useState<string>('2')
  const [drinks, setDrinks] = useState<Drink[]>([
    { id: '1', type: 'Beer', amount: '2', size: 330, abv: '5' }
  ])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine (Widmark Formula) ---
  const results = useMemo(() => {
    const w = parseFloat(weight) || 0
    const t = parseFloat(hoursSinceFirstDrink) || 0
    if (!w) return null

    // Widmark constants
    const r = gender === 'male' ? 0.68 : 0.55
    
    // Calculate total alcohol in grams
    let totalAlcoholGrams = 0
    drinks.forEach(d => {
      const amt = parseFloat(d.amount) || 0
      const abv = parseFloat(d.abv) || 0
      // formula: Volume(ml) * ABV% * 0.789 (density of ethanol)
      totalAlcoholGrams += (amt * d.size) * (abv / 100) * 0.789
    })

    // BAC Formula: [Alcohol(g) / (Weight(g) * r)] * 100 - (t * 0.015)
    let bac = ((totalAlcoholGrams / (w * 1000 * r)) * 100) - (t * 0.015)
    bac = Math.max(0, bac)

    // Time to reach 0.00
    const timeToSober = bac / 0.015

    return {
      bac: bac.toFixed(3),
      timeToSober: timeToSober.toFixed(1),
      isIllegal: bac >= 0.08,
      status: bac === 0 ? "Sober" : bac < 0.05 ? "Tipsy" : bac < 0.08 ? "Impaired" : "Danger"
    }
  }, [gender, weight, hoursSinceFirstDrink, drinks])

  const updateDrink = (id: string, field: keyof Drink, value: any) => {
    setDrinks(drinks.map(d => d.id === id ? { ...d, [field]: value } : d))
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:6xl font-black mb-4 tracking-tighter uppercase italic">
            BAC <span className="text-primary">Monitor</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Estimate your Blood Alcohol Concentration based on the Widmark formula. Stay safe and never drink and drive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl">
              <div className="space-y-8">
                
                {/* User Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <User size={12}/> Gender
                    </label>
                    <div className="flex bg-muted p-1 rounded-xl">
                      <button onClick={() => setGender('male')} className={`flex-1 py-2 rounded-lg text-xs font-bold ${gender === 'male' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}>Male</button>
                      <button onClick={() => setGender('female')} className={`flex-1 py-2 rounded-lg text-xs font-bold ${gender === 'female' ? 'bg-background shadow text-primary' : 'text-muted-foreground'}`}>Female</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Scale size={12}/> Weight (kg)
                    </label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-3 bg-muted border-none rounded-xl font-bold focus:ring-2 ring-primary/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Clock size={12}/> Time (hrs)
                    </label>
                    <input type="number" value={hoursSinceFirstDrink} onChange={(e) => setHoursSinceFirstDrink(e.target.value)} className="w-full p-3 bg-muted border-none rounded-xl font-bold focus:ring-2 ring-primary/20" />
                  </div>
                </div>

                {/* Drink List */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                    <Beer size={16} /> Consumption
                  </h4>
                  
                  {drinks.map((drink) => (
                    <div key={drink.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end bg-muted/30 p-4 rounded-2xl border border-border">
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] font-bold opacity-50 uppercase">Type</label>
                        <select value={drink.type} onChange={(e) => updateDrink(drink.id, 'type', e.target.value)} className="w-full bg-muted p-2 rounded-lg text-sm font-bold border-none outline-none">
                          <option>Beer</option><option>Wine</option><option>Liquor</option>
                        </select>
                      </div>
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[10px] font-bold opacity-50 uppercase">Qty</label>
                        <input type="number" value={drink.amount} onChange={(e) => updateDrink(drink.id, 'amount', e.target.value)} className="w-full bg-muted p-2 rounded-lg text-sm font-bold border-none outline-none" />
                      </div>
                      <div className="md:col-span-4 space-y-1">
                        <label className="text-[10px] font-bold opacity-50 uppercase">Size</label>
                        <select value={drink.size} onChange={(e) => updateDrink(drink.id, 'size', parseInt(e.target.value))} className="w-full bg-muted p-2 rounded-lg text-sm font-bold border-none outline-none">
                          <option value="330">12oz / 330ml Bottle</option>
                          <option value="500">16oz / 500ml Pint</option>
                          <option value="150">5oz / 150ml Glass</option>
                          <option value="44">1.5oz / 44ml Shot</option>
                        </select>
                      </div>
                      <div className="md:col-span-3 space-y-1">
                        <label className="text-[10px] font-bold opacity-50 uppercase">ABV %</label>
                        <input type="number" value={drink.abv} onChange={(e) => updateDrink(drink.id, 'abv', e.target.value)} className="w-full bg-muted p-2 rounded-lg text-sm font-bold border-none outline-none" />
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setDrinks([{ id: Math.random().toString(), type: 'Beer', amount: '1', size: 330, abv: '5' }])} className="w-full py-3 border-2 border-dashed border-border rounded-2xl text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-all uppercase">
                  + Add Another Drink
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Visual Result */}
          <div className="lg:col-span-5 space-y-6">
            {results ? (
              <div className="h-full flex flex-col gap-6">
                <div className={`rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden grow flex flex-col justify-center transition-colors duration-500 ${results.isIllegal ? 'bg-rose-600' : 'bg-primary'}`}>
                  <div className="relative z-10 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Current BAC Estimate</span>
                    <h3 className="text-8xl font-black mt-2 tracking-tighter">{results.bac}%</h3>
                    
                    {/* Gauge Visual */}
                    <div className="relative w-full h-4 bg-white/20 rounded-full mt-8 overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-1000 ease-out" 
                        style={{ width: `${Math.min(100, (parseFloat(results.bac) / 0.15) * 100)}%` }} 
                      />
                      <div className="absolute left-[53.33%] top-0 w-1 h-full bg-rose-900/50" title="Legal Limit 0.08" />
                    </div>
                    
                    <div className="mt-6 flex items-center justify-center gap-2 px-6 py-2 bg-black/20 rounded-2xl font-black uppercase italic tracking-widest">
                      {results.isIllegal && <AlertTriangle size={20} />}
                      {results.status}
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border p-6 rounded-3xl flex items-center gap-6">
                  <div className="p-4 bg-muted rounded-2xl text-primary"><Clock size={32}/></div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Time to Sobriety (0.00%)</p>
                    <p className="text-3xl font-black">{results.timeToSober} Hours</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Activity size={48} className="opacity-20 mb-4" />
                <p>Enter your stats and drinks to monitor your levels.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
                <Info className="text-primary" /> The Widmark Formula
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  The Blood Alcohol Concentration is estimated using the weight of the person, the amount of alcohol consumed, and the time elapsed. 
                </p>
                                <div className="p-4 bg-muted rounded-2xl font-mono text-xs overflow-x-auto">
                  {"BAC = [Alcohol(g) / (BodyWeight(g) \times r)] \times 100 - (Time \times 0.015)"}
                </div>
                <p className="text-[10px] italic">Note: 'r' is the gender-specific distribution ratio (0.68 for men, 0.55 for women).</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3 tracking-tight">
                <AlertTriangle className="text-rose-500" /> Important Disclaimer
              </h2>
              <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl text-sm leading-relaxed text-muted-foreground">
                This calculator provides an <strong>estimate only</strong>. Real BAC levels depend on many factors including:
                <ul className="mt-4 space-y-2">
                  <li className="flex gap-2">● Food consumption and hydration levels</li>
                  <li className="flex gap-2">● Metabolism and liver health</li>
                  <li className="flex gap-2">● Medication interactions</li>
                </ul>
                <p className="mt-4 font-bold text-rose-600 uppercase tracking-tighter">Never rely on this tool to determine if you are fit to drive.</p>
              </div>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculator/bmi', icon: Activity },
          { name: 'Calorie Calculator', description: 'Total daily energy needs', href: '/calculator/calorie', icon: Beer }
        ]} />
      </div>
      <Footer />
    </main>
  )
}