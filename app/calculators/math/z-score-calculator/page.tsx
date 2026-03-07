'use client'

import { useState, useEffect, useMemo } from 'react'
import { Activity, RotateCcw, Info, ChevronRight, Calculator, Hash, Zap, CheckCircle2, TrendingUp, BarChart3 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type ZResult = {
  zScore: string
  percentile: string
  probability: string
  position: 'Above' | 'Below' | 'Equal'
}

export default function ZScoreCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States ---
  const [rawScore, setRawScore] = useState<string>('85')
  const [mean, setMean] = useState<string>('70')
  const [stdDev, setStdDev] = useState<string>('10')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- ERROR FUNCTION (erf) APPROXIMATION ---
  // Since Math.erf doesn't exist in JS, we use a numerical approximation
  const erf = (x: number): number => {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  }

  const getPercentile = (z: number) => {
    // Normal CDF calculation using our custom erf
    return (0.5 * (1 + erf(z / Math.sqrt(2)))) * 100
  }

  // --- Calculation Engine ---
  const results = useMemo((): ZResult | { error: string } | null => {
    const x = parseFloat(rawScore)
    const mu = parseFloat(mean)
    const sigma = parseFloat(stdDev)

    if (isNaN(x) || isNaN(mu) || isNaN(sigma)) return null
    if (sigma <= 0) return { error: "Standard Deviation must be greater than zero." }

    const z = (x - mu) / sigma
    const pct = getPercentile(z)

    return {
      zScore: z.toFixed(4),
      percentile: pct.toFixed(2),
      probability: (pct / 100).toFixed(4),
      position: z > 0 ? 'Above' : z < 0 ? 'Below' : 'Equal'
    }
  }, [rawScore, mean, stdDev])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            Z-Score <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Standardize your data. Calculate how many standard deviations a value is from the mean to determine its relative standing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Z-Score (σ)</span>
                    <h3 className="text-6xl font-black mt-2 tracking-tighter">
                      {results.zScore}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Status</p>
                        <p className="text-lg font-bold">{results.position} Average</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Statistical Rank</h4>
                   <div className="space-y-3">
                      <StatRow label="Percentile" value={`${results.percentile}%`} />
                      <StatRow label="P-Value (Area)" value={results.probability} />
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
                        <BarChart3 size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Input Data to Standardize</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Activity size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <TrendingUp size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Distribution Parameters</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <InputField label="Value (x)" value={rawScore} onChange={(v) => {setRawScore(v); setShowResults(false)}} />
                  <InputField label="Mean (μ)" value={mean} onChange={(v) => {setMean(v); setShowResults(false)}} />
                  <InputField label="Std Dev (σ)" value={stdDev} onChange={(v) => {setStdDev(v); setShowResults(false)}} highlight />
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Score <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setRawScore(''); setMean(''); setStdDev('');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">The Z-Score Formula</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        A Z-score tells you how far a value is from the average. In a normal distribution, about 95% of data falls between a Z-score of -2 and +2.
                    </p>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-lg">z = (x - μ) / σ</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Interpreting Results</h3>
                    

[Image of normal distribution curve with z-score areas]

                    <div className="space-y-4">
                        <TipItem text="Z = 0: The value is exactly equal to the mean." />
                        <TipItem text="Positive Z: The value is above average." />
                        <TipItem text="Negative Z: The value is below average." />
                        <TipItem text="Z > 3: This usually indicates an extreme outlier in the data." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Standard Deviation', description: 'Measure data spread', href: '/calculator/standard-deviation', icon: BarChart3 },
          { name: 'Probability', description: 'Event likelihood solver', href: '/calculator/probability', icon: Zap }
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
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-24 pr-4 py-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 outline-none transition-all ${highlight ? 'ring-primary/40' : 'ring-primary/10'}`}
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