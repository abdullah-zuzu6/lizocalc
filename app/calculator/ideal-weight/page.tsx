'use client'

import { useState, useEffect, useMemo } from 'react'
import { Scale, User, Ruler, RotateCcw, Info, HelpCircle, ChevronRight, Calculator, Activity, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function IdealWeightCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [height, setHeight] = useState<string>('180')
  const [age, setAge] = useState<string>('25')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const hCm = parseFloat(height) || 0
    const a = parseFloat(age) || 0
    
    if (hCm < 152.4) return { error: "Height must be at least 152.4 cm (5 feet) for these formulas." }

    // Convert cm to inches for standard formulas
    const hIn = hCm / 2.54
    const inchesOver5ft = hIn - 60

    let calc = {
      robinson: 0,
      miller: 0,
      devine: 0,
      hamwi: 0,
      bmiLow: (18.5 * (hCm / 100) ** 2).toFixed(1),
      bmiHigh: (24.9 * (hCm / 100) ** 2).toFixed(1)
    }

    if (gender === 'male') {
      calc.robinson = 52 + (1.9 * inchesOver5ft)
      calc.miller = 56.2 + (1.41 * inchesOver5ft)
      calc.devine = 50 + (2.3 * inchesOver5ft)
      calc.hamwi = 48 + (2.7 * inchesOver5ft)
    } else {
      calc.robinson = 49 + (1.7 * inchesOver5ft)
      calc.miller = 53.1 + (1.36 * inchesOver5ft)
      calc.devine = 45.5 + (2.3 * inchesOver5ft)
      calc.hamwi = 45.5 + (2.2 * inchesOver5ft)
    }

    return {
      formulas: [
        { name: 'Robinson (1983)', value: calc.robinson.toFixed(1) },
        { name: 'Miller (1983)', value: calc.miller.toFixed(1) },
        { name: 'Devine (1974)', value: calc.devine.toFixed(1) },
        { name: 'Hamwi (1964)', value: calc.hamwi.toFixed(1) }
      ],
      bmiRange: `${calc.bmiLow} - ${calc.bmiHigh}`,
      average: ((calc.robinson + calc.miller + calc.devine + calc.hamwi) / 4).toFixed(1)
    }
  }, [gender, height, age])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Ideal Weight Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compare various medical formulas to find your target weight range based on height, gender, and age.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-sm h-full">
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

                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <Ruler size={14} className="text-primary" /> Height (cm)
                    </label>
                    <input 
                      type="number" value={height} onChange={(e) => setHeight(e.target.value)} 
                      className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" 
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <User size={14} className="text-primary" /> Age
                    </label>
                    <input 
                      type="number" value={age} onChange={(e) => setAge(e.target.value)} 
                      className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold focus:ring-2 ring-primary/20 outline-none" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {setHeight('180'); setAge('25');}}
                  className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw size={16} /> Reset Stats
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Dashboard */}
          <div className="lg:col-span-7 space-y-6">
            {results && !results.error ? (
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 opacity-10">
                    <Scale size={240} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Estimated Average Ideal</span>
                    <h3 className="text-6xl font-black mt-2">{results.average} <span className="text-xl font-medium">kg</span></h3>
                    
                    <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 p-4 rounded-2xl">
                            <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Healthy BMI Range</p>
                            <p className="text-xl font-bold">{results.bmiRange} kg</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 className="text-white/80" />
                            <p className="text-xs leading-tight opacity-80">Based on your height of {height}cm</p>
                        </div>
                    </div>
                  </div>
                </div>

            
                {/* Formula Comparison Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {results && 'formulas' in results && results.formulas?.map((f, i) => (
    <div key={i} className="bg-card border border-border p-5 rounded-3xl flex items-center justify-between group hover:border-primary/30 transition-all">
      <div>
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{f.name}</p>
        <p className="text-2xl font-black text-foreground">{f.value} kg</p>
      </div>
      <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors">
        <Calculator size={18} />
      </div>
    </div>
  ))}
</div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <Activity size={48} className="opacity-20 mb-4" />
                <p className="max-w-xs">{results?.error || "Please enter your height to calculate ideal weight ranges."}</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Info className="text-primary" /> How Ideal Weight is Calculated
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Most medical formulas use a "base weight" for a height of 5 feet (152.4 cm) and then add a specific number of kilograms for every additional inch of height.
                </p>
                                <p className="text-sm">
                  While <strong>Devine</strong> is the most commonly used formula in clinical settings for calculating medication dosages, <strong>Miller</strong> and <strong>Robinson</strong> are often considered more updated for modern populations.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <HelpCircle className="text-primary" /> Is "Ideal Weight" Accurate?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                It's important to remember that these formulas only factor in <strong>height</strong> and <strong>gender</strong>. They do not account for:
              </p>
              <ul className="grid grid-cols-1 gap-3">
                {[
                  "Muscle mass vs. body fat percentage",
                  "Bone density and frame size",
                  "Athletic performance requirements",
                  "Overall metabolic health"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm p-3 bg-muted/50 rounded-xl border border-border">
                    <ChevronRight size={14} className="text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground italic">
                Always use these numbers as a general guideline rather than a strict medical requirement.
              </p>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'BMI Calculator', description: 'Body Mass Index assessment', href: '/calculator/bmi', icon: Activity },
          { name: 'Body Fat Calculator', description: 'Estimate your body composition', href: '/calculator/body-fat', icon: User },
          { name: 'Calorie Calculator', description: 'Total daily energy needs', href: '/calculator/calorie', icon: Activity }
        ]} />
      </div>
      <Footer />
    </main>
  )
}