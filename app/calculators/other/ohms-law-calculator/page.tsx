'use client'

import { useState, useEffect, useMemo } from 'react'
import { Zap, RotateCcw, Info, ChevronRight, Calculator, CheckCircle2, Cpu, Activity } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type OhmsResult = {
  v: string
  i: string
  r: string
  p: string
  solvedFor: string[]
}

export default function OhmsLawCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [voltage, setVoltage] = useState<string>('')
  const [current, setCurrent] = useState<string>('')
  const [resistance, setResistance] = useState<string>('')
  const [power, setPower] = useState<string>('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): OhmsResult | { error: string } | null => {
    const v = parseFloat(voltage)
    const i = parseFloat(current)
    const r = parseFloat(resistance)
    const p = parseFloat(power)

    const inputs = [v, i, r, p].filter(val => !isNaN(val) && val !== 0)
    if (inputs.length < 2) return null

    let resV = v, resI = i, resR = r, resP = p
    const solved: string[] = []

    // Logic Tree for Ohm's Law & Watt's Law
    if (!isNaN(v) && !isNaN(i)) {
      resR = v / i; resP = v * i; solved.push('R', 'P')
    } else if (!isNaN(v) && !isNaN(r)) {
      resI = v / r; resP = (v * v) / r; solved.push('I', 'P')
    } else if (!isNaN(v) && !isNaN(p)) {
      resI = p / v; resR = (v * v) / p; solved.push('I', 'R')
    } else if (!isNaN(i) && !isNaN(r)) {
      resV = i * r; resP = (i * i) * r; solved.push('V', 'P')
    } else if (!isNaN(i) && !isNaN(p)) {
      resV = p / i; resR = p / (i * i); solved.push('V', 'R')
    } else if (!isNaN(r) && !isNaN(p)) {
      resV = Math.sqrt(p * r); resI = Math.sqrt(p / r); solved.push('V', 'I')
    }

    return {
      v: resV.toFixed(4).replace(/\.?0+$/, ""),
      i: resI.toFixed(4).replace(/\.?0+$/, ""),
      r: resR.toFixed(4).replace(/\.?0+$/, ""),
      p: resP.toFixed(4).replace(/\.?0+$/, ""),
      solvedFor: solved
    }
  }, [voltage, current, resistance, power])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Ohm's Law <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Calculate Voltage, Current, Resistance, and Power. Simply enter any two known values to solve for the others.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Power Output (Watts)</span>
                    <h3 className="text-6xl font-black mt-2 tracking-tighter">
                      {results.p}<span className="text-2xl ml-1">W</span>
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Solved Variables</p>
                        <p className="text-lg font-bold">Calculated {results.solvedFor.join(' & ')}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Full Circuit Specs</h4>
                   <div className="space-y-3">
                      <StatRow label="Voltage (V)" value={`${results.v} V`} />
                      <StatRow label="Current (I)" value={`${results.i} A`} />
                      <StatRow label="Resistance (R)" value={`${results.r} Ω`} />
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
                        <Activity size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Enter 2 values to solve</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Zap size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Cpu size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Circuit Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Voltage (V)" unit="Volts" value={voltage} onChange={(v) => {setVoltage(v); setShowResults(false)}} />
                  <InputField label="Current (I)" unit="Amps" value={current} onChange={(v) => {setCurrent(v); setShowResults(false)}} />
                  <InputField label="Resistance (R)" unit="Ohms" value={resistance} onChange={(v) => {setResistance(v); setShowResults(false)}} />
                  <InputField label="Power (P)" unit="Watts" value={power} onChange={(v) => {setPower(v); setShowResults(false)}} />
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Circuit <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setVoltage(''); setCurrent(''); setResistance(''); setPower('');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">Understanding Ohm's Law</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-sm">V = I × R</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Power Law</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Watt's Law relates power to voltage and current. Combining this with Ohm's Law allows us to solve for any circuit variable.
                    </p>
                    
                    <div className="space-y-4">
                        <TipItem text="Voltage (V): The electrical pressure (measured in Volts)." />
                        <TipItem text="Current (I): The flow of electrons (measured in Amps)." />
                        <TipItem text="Resistance (R): The opposition to flow (measured in Ohms)." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Voltage Drop', description: 'Wire length loss calc', href: '/calculator/voltage-drop', icon: Zap },
          { name: 'Binary Calculator', description: 'Logic gate math', href: '/calculator/binary', icon: Cpu }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function InputField({ label, unit, value, onChange }: { label: string, unit: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col">
        <span className="text-[10px] font-black uppercase text-muted-foreground leading-none">{label}</span>
        <span className="text-[8px] font-bold text-primary/60 uppercase">{unit}</span>
      </div>
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full pl-28 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
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