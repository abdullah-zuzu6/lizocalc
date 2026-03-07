'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Landmark, 
  RotateCcw, 
  Info, 
  ChevronRight, 
  Calculator, 
  PieChart, 
  TrendingUp, 
  Globe, 
  DollarSign, 
  ArrowRightLeft,
  CheckCircle2 
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type GDPResult = {
  totalGdp: string
  netExports: string
  consumptionPct: string
  investmentPct: string
  governmentPct: string
  exportsPct: string
}

export default function GDPCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // --- Input States (Units in Billions/Millions) ---
  const [consumption, setConsumption] = useState<string>('700')
  const [investment, setInvestment] = useState<string>('200')
  const [government, setGovernment] = useState<string>('300')
  const [exports, setExports] = useState<string>('150')
  const [imports, setImports] = useState<string>('120')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo((): GDPResult | { error: string } | null => {
    const C = parseFloat(consumption)
    const I = parseFloat(investment)
    const G = parseFloat(government)
    const X = parseFloat(exports)
    const M = parseFloat(imports)

    if ([C, I, G, X, M].some(val => isNaN(val))) return null
    
    const netX = X - M
    const total = C + I + G + netX

    if (total === 0) return { error: "Total GDP cannot be zero." }

    const getPct = (val: number) => ((val / total) * 100).toFixed(1)

    return {
      totalGdp: total.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      netExports: netX.toLocaleString(undefined, { minimumFractionDigits: 2 }),
      consumptionPct: getPct(C),
      investmentPct: getPct(I),
      governmentPct: getPct(G),
      exportsPct: getPct(netX)
    }
  }, [consumption, investment, government, exports, imports])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
            GDP <span className="text-primary">Calculator</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Analyze national economic performance using the expenditure method. Measure the total value of goods and services produced.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BLOCK: Results Dashboard */}
          <div className="lg:col-span-4 order-2 lg:order-1">
            {showResults && results && !('error' in results) ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total GDP Value</span>
                    <h3 className="text-4xl md:text-5xl font-black mt-2 tracking-tighter break-all">
                      ${results.totalGdp}
                    </h3>
                    <div className="mt-6 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                        <p className="text-[10px] uppercase font-bold opacity-60 mb-1">Net Exports (X - M)</p>
                        <p className="text-lg font-bold">${results.netExports}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                   <h4 className="text-[10px] font-black uppercase text-muted-foreground mb-4 tracking-widest">Economic Composition</h4>
                   <div className="space-y-3">
                      <StatRow label="Private Consumption" value={`${results.consumptionPct}%`} />
                      <StatRow label="Gross Investment" value={`${results.investmentPct}%`} />
                      <StatRow label="Gov. Spending" value={`${results.governmentPct}%`} />
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
                        <Globe size={48} className="opacity-10 mb-4" />
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Awaiting Economic Data</p>
                    </>
                )}
              </div>
            )}
          </div>

          {/* MAIN BLOCK: Inputs */}
          <div className="lg:col-span-8 order-1 lg:order-2 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Landmark size={140} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                    <DollarSign size={20} />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">Expenditure Components</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField label="Consumption (C)" value={consumption} onChange={(v) => {setConsumption(v); setShowResults(false)}} />
                  <InputField label="Investment (I)" value={investment} onChange={(v) => {setInvestment(v); setShowResults(false)}} />
                  <InputField label="Gov. Spending (G)" value={government} onChange={(v) => {setGovernment(v); setShowResults(false)}} />
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Exports (X)" value={exports} onChange={(v) => {setExports(v); setShowResults(false)}} />
                    <InputField label="Imports (M)" value={imports} onChange={(v) => {setImports(v); setShowResults(false)}} />
                  </div>
                </div>

                <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button 
                    onClick={() => setShowResults(true)}
                    className="flex-[2] py-4 bg-primary text-primary-foreground rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-primary/40 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    Calculate GDP <CheckCircle2 size={18} />
                  </button>
                  <button 
                    onClick={() => {setShowResults(false); setConsumption(''); setInvestment(''); setGovernment(''); setExports(''); setImports('');}}
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
                    <h3 className="text-2xl font-black uppercase tracking-tight">The GDP Formula</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Gross Domestic Product measures the total value of all finished goods and services produced. The expenditure approach sums the four main types of spending in an economy.
                    </p>
                    
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <code className="text-primary font-bold text-lg">GDP = C + I + G + (X - M)</code>
                    </div>
                </div>
                <div className="space-y-6">
                    <h3 className="text-2xl font-black uppercase tracking-tight">Economic Indicators</h3>
                    
                    <div className="space-y-4">
                        <TipItem text="Consumption: Includes household spending on durable and non-durable goods." />
                        <TipItem text="Investment: Includes business capital, residential construction, and inventory." />
                        <TipItem text="Net Exports: A positive value means a trade surplus; negative means a deficit." />
                    </div>
                </div>
            </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'Inflation Calc', description: 'Purchasing power loss', href: '/calculator/inflation', icon: TrendingUp },
          { name: 'Currency Converter', description: 'Exchange rate math', href: '/calculator/currency', icon: ArrowRightLeft }
        ]} />
      </div>
      <Footer />
    </main>
  )
}

function InputField({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-muted-foreground">
        {label}
      </div>
      <input 
        type="number" value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full pl-32 pr-4 py-4 bg-muted border-none rounded-2xl text-lg font-bold focus:ring-2 ring-primary/20 outline-none transition-all"
        placeholder="0.00"
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