'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  ArrowRightLeft, 
  RotateCcw, 
  CheckCircle2, 
  Ruler, 
  Weight, 
  Thermometer, 
  ChevronRight,
  Info
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type Category = 'length' | 'weight' | 'temperature'

const UNITS = {
  length: [
    { label: 'Meters (m)', value: 'm', factor: 1 },
    { label: 'Kilometers (km)', value: 'km', factor: 1000 },
    { label: 'Centimeters (cm)', value: 'cm', factor: 0.01 },
    { label: 'Miles (mi)', value: 'mi', factor: 1609.34 },
    { label: 'Feet (ft)', value: 'ft', factor: 0.3048 },
    { label: 'Inches (in)', value: 'in', factor: 0.0254 },
  ],
  weight: [
    { label: 'Kilograms (kg)', value: 'kg', factor: 1 },
    { label: 'Grams (g)', value: 'g', factor: 0.001 },
    { label: 'Pounds (lb)', value: 'lb', factor: 0.453592 },
    { label: 'Ounces (oz)', value: 'oz', factor: 0.0283495 },
    { label: 'Metric Tons (t)', value: 't', factor: 1000 },
  ],
  temperature: [
    { label: 'Celsius (°C)', value: 'C' },
    { label: 'Fahrenheit (°F)', value: 'F' },
    { label: 'Kelvin (K)', value: 'K' },
  ]
}

export default function ConversionCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [category, setCategory] = useState<Category>('length')
  const [inputValue, setInputValue] = useState<string>('1')
  const [fromUnit, setFromUnit] = useState<string>('')
  const [toUnit, setToUnit] = useState<string>('')
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setFromUnit(UNITS[category][0].value)
    setToUnit(UNITS[category][1].value)
  }, [category])

  const result = useMemo(() => {
    const val = parseFloat(inputValue)
    if (isNaN(val)) return null

    if (category === 'temperature') {
      let celsius = val
      if (fromUnit === 'F') celsius = (val - 32) * 5/9
      if (fromUnit === 'K') celsius = val - 273.15

      if (toUnit === 'C') return celsius.toFixed(2)
      if (toUnit === 'F') return (celsius * 9/5 + 32).toFixed(2)
      if (toUnit === 'K') return (celsius + 273.15).toFixed(2)
    } else {
      const fromFactor = UNITS[category].find(u => u.value === fromUnit)?.factor || 1
      const toFactor = UNITS[category].find(u => u.value === toUnit)?.factor || 1
      return ((val * fromFactor) / toFactor).toLocaleString(undefined, { maximumFractionDigits: 6 })
    }
    return null
  }, [inputValue, fromUnit, toUnit, category])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Unit <span className="text-primary">Converter</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Convert between metric and imperial units instantly. High-precision calculations for length, mass, and temperature.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && result ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Converted Value</span>
                    <h3 className="text-4xl md:text-5xl font-black mt-2 tracking-tighter break-all">
                      {result} <span className="text-xl">{toUnit}</span>
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Input</p>
                        <p className="text-lg font-bold">{inputValue} {fromUnit}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted/30 border-2 border-dashed border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <ArrowRightLeft size={48} className="opacity-10 mb-4" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Select units to convert</p>
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl">
              
              {/* Category Toggles */}
              <div className="flex flex-wrap gap-3 mb-10">
                <CategoryBtn active={category === 'length'} onClick={() => setCategory('length')} icon={<Ruler size={14}/>} label="Length" />
                <CategoryBtn active={category === 'weight'} onClick={() => setCategory('weight')} icon={<Weight size={14}/>} label="Weight" />
                <CategoryBtn active={category === 'temperature'} onClick={() => setCategory('temperature')} icon={<Thermometer size={14}/>} label="Temp" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                <div className="md:col-span-12">
                   <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">Value to Convert</label>
                   <input 
                    type="number" value={inputValue} onChange={(e) => {setInputValue(e.target.value); setShowResults(false)}}
                    className="w-full p-6 bg-muted border-none rounded-2xl text-2xl font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div className="md:col-span-5">
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">From</label>
                  <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold appearance-none cursor-pointer outline-none border-2 border-transparent focus:border-primary/20">
                    {UNITS[category].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2 flex justify-center py-4">
                  <button onClick={() => {const temp = fromUnit; setFromUnit(toUnit); setToUnit(temp);}} className="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
                    <ArrowRightLeft size={20} />
                  </button>
                </div>

                <div className="md:col-span-5">
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-2 block">To</label>
                  <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-4 bg-muted rounded-2xl font-bold appearance-none cursor-pointer outline-none border-2 border-transparent focus:border-primary/20">
                    {UNITS[category].map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-10 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => setShowResults(true)}
                  className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  Convert Now <CheckCircle2 size={18} />
                </button>
                <button 
                  onClick={() => {setShowResults(false); setInputValue('1');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">Metric vs. Imperial System</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Most of the world uses the Metric system (meters, grams), while the US and a few others use the Imperial system (feet, pounds). Accurate conversion is vital for engineering and science.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <p className="text-[10px] font-bold text-primary uppercase mb-2">Did you know?</p>
                        <p className="text-xs text-muted-foreground">The "Metric Inch" doesn't exist, but exactly 25.4 millimeters is the international standard for one inch.</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Conversion Factors</h3>
                    
                    <div className="space-y-4">
                        <TipItem text="Length: 1 mile is approximately 1.61 kilometers." />
                        <TipItem text="Weight: 1 kilogram is roughly 2.2 pounds." />
                        <TipItem text="Temp: Celsius to Fahrenheit uses the formula (C × 9/5) + 32." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Density Calc', description: 'Mass/Volume solver', href: '/calculator/density', icon: Weight },
          { name: 'Speed Calc', description: 'Distance/Time math', href: '/calculator/speed', icon: ArrowRightLeft }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function CategoryBtn({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all ${active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
    >
      {icon} {label}
    </button>
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