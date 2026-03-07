'use client'

import { useState, useEffect, useMemo } from 'react'
import { Hash, RotateCcw, Info, ChevronRight, Calculator, Zap, CheckCircle2, Microscope, ArrowLeftRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type SciResult = {
  scientific: string
  decimal: string
  engineering: string
  eNotation: string
}

export default function ScientificNotationCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [inputValue, setInputValue] = useState<string>('0.0000045')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): SciResult | { error: string } | null => {
    if (!inputValue) return null
    
    const num = parseFloat(inputValue)
    if (isNaN(num)) return { error: "Please enter a valid number." }
    if (num === 0) return { scientific: "0 × 10⁰", decimal: "0", engineering: "0 × 10⁰", eNotation: "0e0" }

    const exponent = Math.floor(Math.log10(Math.abs(num)))
    const mantissa = num / Math.pow(10, exponent)
    
    // Engineering notation (exponent must be multiple of 3)
    const engExp = Math.floor(exponent / 3) * 3
    const engMantissa = num / Math.pow(10, engExp)

    return {
      scientific: `${mantissa.toFixed(4).replace(/\.?0+$/, "")} × 10${formatExponent(exponent)}`,
      decimal: num.toLocaleString('fullwide', {useGrouping:false, maximumFractionDigits:20}),
      engineering: `${engMantissa.toFixed(4).replace(/\.?0+$/, "")} × 10${formatExponent(engExp)}`,
      eNotation: num.toExponential(4)
    }
  }, [inputValue])

  function formatExponent(exp: number) {
    const superscripts: { [key: string]: string } = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻'
    }
    return exp.toString().split('').map(char => superscripts[char] || char).join('')
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Scientific <span className="text-primary">Notation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Convert standard numbers into scientific notation and back. Simplify complex figures into a manageable format.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Scientific Notation</span>
                    <h3 className="text-4xl font-black mt-2 tracking-tighter">
                      {results.scientific}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">E-Notation</p>
                        <p className="text-xl font-bold font-mono">{results.eNotation}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Alternative Formats</h4>
                   <div className="space-y-3">
                      <StatRow label="Engineering" value={results.engineering} />
                      <div className="pt-2 border-t border-border">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Standard Decimal</p>
                        <p className="text-xs font-mono break-all bg-muted p-2 rounded-lg">{results.decimal}</p>
                      </div>
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
                        <Microscope size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Value</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Hash size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <ArrowLeftRight size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Number Conversion</h2>
                </div>

                <div className="space-y-4">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">Input Number</div>
                    <input 
                      type="text" 
                      value={inputValue} 
                      onChange={(e) => {setInputValue(e.target.value); setShowResults(false)}}
                      className="w-full pl-32 pr-4 py-6 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
                      placeholder="e.g. 0.00005 or 500000"
                    />
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <Info size={16} className="text-primary mt-1 shrink-0" />
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Enter any decimal or integer. For scientific notation input, use the <strong>e</strong> format (e.g., 5e-6 for 0.000005).
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Convert Number <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setInputValue('');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">Understanding Scientific Notation</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Scientific notation is a way of expressing numbers that are too large or too small to be conveniently written in decimal form. It is written as a coefficient (between 1 and 10) multiplied by 10 raised to an exponent.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-sm">Standard: 300,000,000 m/s</code><br/>
                        <code className="text-primary font-bold text-sm">Scientific: 3.0 × 10⁸ m/s</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Formatting Rules</h3>
                    <div className="space-y-4">
                        <TipItem text="Positive Exponents: Used for large numbers. Move the decimal point to the left." />
                        <TipItem text="Negative Exponents: Used for small fractions. Move the decimal point to the right." />
                        <TipItem text="Engineering Notation: Similar to scientific, but the exponent must be a multiple of 3 (matching metric prefixes like kilo, mega, micro)." />
                    </div>
                    
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Sig Fig Calculator', description: 'Significant figures solver', href: '/calculator/sig-fig', icon: Microscope },
          { name: 'Binary Calculator', description: 'Base-2 math operations', href: '/calculator/binary', icon: Zap }
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