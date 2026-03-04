'use client'

import { useState, useEffect, useMemo } from 'react'
import { Binary, RotateCcw, Info, ChevronRight, Calculator, Hash, Zap, CheckCircle2, Cpu, Code } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type BinaryResult = {
  binary: string
  decimal: string
  hex: string
  operation: string
}

export default function BinaryCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [valueA, setValueA] = useState<string>('1010')
  const [valueB, setValueB] = useState<string>('1100')
  const [operator, setOperator] = useState<'+' | '-' | '*' | '/'>('+')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): BinaryResult | { error: string } | null => {
    // Basic validation
    if (!valueA || !valueB) return null

    const numA = parseInt(valueA, 2)
    const numB = parseInt(valueB, 2)
    let resNum = 0

    switch (operator) {
      case '+': resNum = numA + numB; break
      case '-': resNum = numA - numB; break
      case '*': resNum = numA * numB; break
      case '/': 
        if (numB === 0) return { error: "Cannot divide by zero." }
        resNum = Math.floor(numA / numB); 
        break
    }

    if (resNum < 0) return { error: "Negative results require 'Two's Complement' logic (unsupported)." }

    return {
      binary: resNum.toString(2),
      decimal: resNum.toString(10),
      hex: resNum.toString(16).toUpperCase(),
      operation: `${valueA} ${operator} ${valueB}`
    }
  }, [valueA, valueB, operator])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Binary <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Perform bitwise arithmetic and instantly convert between Binary, Decimal, and Hexadecimal bases.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Binary Result</span>
                    <h3 className="text-4xl font-black mt-2 tracking-tighter break-all">
                      {results.binary}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Decimal View</p>
                        <p className="text-xl font-bold">{results.decimal}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Base Conversions</h4>
                   <div className="space-y-3">
                      <StatRow label="Hexadecimal" value={`0x${results.hex}`} />
                      <StatRow label="Operation" value={results.operation} />
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
                        <Cpu size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Inputs</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Code size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <Binary size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Binary Arithmetic</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5">
                    <InputField label="Binary A" value={valueA} onChange={(v) => {setValueA(v); setShowResults(false)}} />
                  </div>
                  
                  <div className="md:col-span-2">
                    <select 
                        value={operator} 
                        onChange={(e) => {setOperator(e.target.value as any); setShowResults(false)}}
                        className="w-full p-4 bg-muted border-none rounded-2xl text-xl font-bold text-primary appearance-none text-center cursor-pointer outline-none focus:ring-2 ring-primary/20"
                    >
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                    </select>
                  </div>

                  <div className="md:col-span-5">
                    <InputField label="Binary B" value={valueB} onChange={(v) => {setValueB(v); setShowResults(false)}} highlight />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Execute Calculation <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setValueA('1010'); setValueB('1100'); setOperator('+');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Binary System</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Binary is a <strong>Base-2</strong> number system that uses only two symbols: 0 and 1. It is the fundamental language of computers because it represents the On/Off state of transistors.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl overflow-x-auto">
                        <code className="text-primary font-bold text-sm">Example: 1011₂ = (1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 11₁₀</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Binary Operations</h3>
                    <div className="space-y-4">
                        <TipItem text="Addition: Similar to decimal, but '1 + 1' results in '0' and a carry of '1'." />
                        <TipItem text="Subtraction: Uses 'borrowing' logic, often handled via Two's Complement in hardware." />
                        <TipItem text="Multiplication: Follows basic rules (0×0=0, 0×1=0, 1×1=1)." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Hex Calculator', description: 'Base-16 operations', href: '/calculator/hex', icon: Code },
          { name: 'Bitwise Solver', description: 'AND, OR, XOR logic', href: '/calculator/bitwise', icon: Zap }
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
        type="text" value={value} onChange={(e) => onChange(e.target.value.replace(/[^01]/g, ''))}
        className={`w-full pl-20 pr-4 py-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 outline-none transition-all ${highlight ? 'ring-primary/40' : 'ring-primary/10'}`}
        placeholder="0101"
      />
    </div>
  )
}

function StatRow({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center p-3 bg-muted/50 rounded-xl border border-border/50">
      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
      <span className="text-sm font-black text-primary font-mono">{value}</span>
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