'use client'

import { useState, useEffect, useMemo } from 'react'
import { Ruler, type Icon as LucideIcon, RotateCcw, Info, HelpCircle, ChevronRight, Calculator, Triangle as TriangleIcon, Hash, Zap } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function TriangleCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [sideA, setSideA] = useState<string>('1')
  const [sideB, setSideB] = useState<string>('1')
  const [sideC, setSideC] = useState<string>('')
  const [angleA, setAngleA] = useState<string>('')
  const [angleB, setAngleB] = useState<string>('')
  const [angleC, setAngleC] = useState<string>('60')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    // Conversion helpers
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const toDeg = (rad: number) => (rad * 180) / Math.PI

    const sA = parseFloat(sideA) || null
    const sB = parseFloat(sideB) || null
    const sC = parseFloat(sideC) || null
    const aA = parseFloat(angleA) || null
    const aB = parseFloat(angleB) || null
    const aC = parseFloat(angleC) || null

    // This is a simplified SAS (Side-Angle-Side) logic based on your screenshot
    // In a full production app, you'd add logic for SSS, ASA, AAS
    if (sA && sB && aC) {
      const radC = toRad(aC)
      // Law of Cosines: c^2 = a^2 + b^2 - 2ab cos(C)
      const calculatedSC = Math.sqrt(sA ** 2 + sB ** 2 - 2 * sA * sB * Math.cos(radC))
      
      // Law of Sines for Angle A
      const radA = Math.asin((sA * Math.sin(radC)) / calculatedSC)
      const calculatedAA = toDeg(radA)
      const calculatedAB = 180 - aC - calculatedAA

      const area = 0.5 * sA * sB * Math.sin(radC)
      const perimeter = sA + sB + calculatedSC

      return {
        sideA: sA.toFixed(2),
        sideB: sB.toFixed(2),
        sideC: calculatedSC.toFixed(2),
        angleA: calculatedAA.toFixed(2),
        angleB: calculatedAB.toFixed(2),
        angleC: aC.toFixed(2),
        area: area.toFixed(2),
        perimeter: perimeter.toFixed(2),
        type: sA === sB && sB === calculatedSC ? "Equilateral" : sA === sB ? "Isosceles" : "Scalene"
      }
    }

    return null
  }, [sideA, sideB, sideC, angleA, angleB, angleC])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase italic">
            Triangle <span className="text-primary">Solver</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Solve any triangle by entering three known values. Get instant results for sides, angles, area, and perimeter.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs & Visual Input UI */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative">
              
              {/* Triangle Diagram Input Helper */}
              <div className="relative w-full aspect-video bg-muted/50 rounded-2xl flex items-center justify-center mb-10 overflow-hidden border border-border">
                <svg width="200" height="180" viewBox="0 0 200 180" className="text-primary drop-shadow-lg">
                  <path d="M100 20 L180 150 L20 150 Z" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                  <text x="100" y="15" className="fill-muted-foreground text-[12px] font-bold" textAnchor="middle">Angle C</text>
                  <text x="15" y="165" className="fill-muted-foreground text-[12px] font-bold">Angle A</text>
                  <text x="185" y="165" className="fill-muted-foreground text-[12px] font-bold" textAnchor="end">Angle B</text>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sides Column */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Ruler size={14}/> Sides (a, b, c)
                  </h4>
                  <div className="space-y-3">
                    <InputField label="Side a" value={sideA} onChange={setSideA} />
                    <InputField label="Side b" value={sideB} onChange={setSideB} />
                    <InputField label="Side c" value={sideC} onChange={setSideC} />
                  </div>
                </div>

                {/* Angles Column */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary flex items-center gap-2">
                    <Hash size={14}/> Angles (°, A, B, C)
                  </h4>
                  <div className="space-y-3">
                    <InputField label="Angle A" value={angleA} onChange={setAngleA} suffix="°" />
                    <InputField label="Angle B" value={angleB} onChange={setAngleB} suffix="°" />
                    <InputField label="Angle C" value={angleC} onChange={setAngleC} suffix="°" />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row gap-4">
                <button 
                  onClick={() => {setSideA('1'); setSideB('1'); setAngleC('60'); setSideC(''); setAngleA(''); setAngleB('');}}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-muted rounded-2xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all"
                >
                  <RotateCcw size={16} /> Reset All
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Results Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            {results ? (
              <div className="space-y-6">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10">
                    <TriangleIcon size={240} />
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-70">Calculated Properties</span>
                    <h3 className="text-5xl font-black mt-2 tracking-tighter">{results.type} Triangle</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60">Total Area</p>
                        <p className="text-2xl font-black">{results.area} <span className="text-sm font-medium opacity-60">u²</span></p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60">Perimeter</p>
                        <p className="text-2xl font-black">{results.perimeter} <span className="text-sm font-medium opacity-60">u</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                    <Calculator size={14} className="text-primary" /> Full Solution
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <SolutionItem label="Side c" value={results.sideC} />
                    <SolutionItem label="Angle A" value={results.angleA + '°'} />
                    <SolutionItem label="Angle B" value={results.angleB + '°'} />
                    <SolutionItem label="Angle C" value={results.angleC + '°'} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full border-2 border-dashed border-border rounded-3xl flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <TriangleIcon size={48} className="opacity-20 mb-4 animate-pulse" />
                <p className="text-sm font-medium max-w-xs">Enter 3 values (including at least one side) to see the triangle solution.</p>
              </div>
            )}
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
                <Info size={24} className="text-primary" /> Triangle Math
              </h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <p>
                  Solving a triangle means finding the lengths of all its sides and the measures of all its angles. To do this, we primarily use two powerful formulas:
                </p>
                                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-2xl border border-border">
                    <p className="font-bold text-foreground text-sm">Law of Cosines</p>
                    <p className="font-mono text-xs text-primary mt-1">{"c^2 = a^2 + b^2 - 2ab \cdot \cos(C)"}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-2xl border border-border">
                    <p className="font-bold text-foreground text-sm">Law of Sines</p>
                    <p className="font-mono text-xs text-primary mt-1">{"a / \sin(A) = b / \sin(B) = c / \sin(C)"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black flex items-center gap-3 tracking-tighter uppercase italic">
                <Zap size={24} className="text-primary" /> Tips for Success
              </h2>
              <div className="space-y-4">
                <TipItem text="Ensure your angles add up to 180° for valid results." />
                <TipItem text="Side Length Rule: The sum of any two sides must be greater than the third side." />
                <TipItem text="SSA Ambiguity: Providing two sides and a non-included angle can sometimes result in two possible triangles." />
              </div>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Pythagorean', description: 'Solve right triangles', href: '/calculator/pythagorean', icon: Ruler },
          { name: 'Percentage', description: 'Calculate percentage values', href: '/calculator/percentage', icon: Hash }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

// --- Internal UI Components ---

function InputField({ label, value, onChange, suffix }: { label: string, value: string, onChange: (v: string) => void, suffix?: string }) {
  return (
    <div className="relative flex items-center">
      <div className="absolute left-4 text-[10px] font-bold text-muted-foreground uppercase">{label}</div>
      <input 
        type="number" 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-20 pr-10 py-3 bg-muted border-none rounded-xl text-sm font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
        placeholder="?"
      />
      {suffix && <div className="absolute right-4 text-xs font-bold text-primary">{suffix}</div>}
    </div>
  )
}

function SolutionItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="p-3 bg-muted/50 rounded-2xl border border-border flex flex-col">
      <span className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{label}</span>
      <span className="text-lg font-black text-foreground">{value}</span>
    </div>
  )
}

function TipItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3 p-4 bg-muted/50 rounded-2xl border border-border text-sm leading-relaxed text-muted-foreground">
      <ChevronRight size={18} className="text-primary shrink-0" />
      <p>{text}</p>
    </div>
  )
}