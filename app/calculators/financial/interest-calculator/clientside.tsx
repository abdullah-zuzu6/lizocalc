'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  TrendingUp, 
  ListFilter, 
  Calculator, 
  Hash, 
  CheckCircle2, 
  RotateCcw, 
  Settings2, 
  Info, 
  Heart,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

type Frequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'daily' | 'continuously';

const compoundingValues: Record<Frequency, number> = {
  annually: 1, semiannually: 2, quarterly: 4, monthly: 12,
  semimonthly: 24, biweekly: 26, weekly: 52, daily: 365, continuously: 1000000,
};

export default function InterestCalculator() {
  // --- States ---
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100)
  const [annualContribution, setAnnualContribution] = useState<number>(0)
  const [rate, setRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [taxRate, setTaxRate] = useState<number>(0)
  const [inflationRate, setInflationRate] = useState<number>(2)
  const [compounding, setCompounding] = useState<Frequency>('monthly')
  const [isMounted, setIsMounted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const calculatorInfo = {
    name: 'Interest Calculator',
    href: '/calculators/financial/interest-calculator',
    category: 'Financial',
  }

  const relatedCalculators = [
    { name: 'LCM Calculator', description: 'Find least common multiple', href: '/calculators/math/lcm-calculator', icon: Hash },
    { name: 'Salary Calculator', description: 'Calculate take-home pay', href: '/calculators/financial/salary-calculator', icon: Calculator },
  ]

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['interest-adv']?.data) {
      const d = history['interest-adv'].data
      setInitialInvestment(d.initialInvestment ?? 10000)
      setMonthlyContribution(d.monthlyContribution ?? 100)
      setAnnualContribution(d.annualContribution ?? 0)
      setRate(d.rate ?? 7)
      setYears(d.years ?? 10)
      setTaxRate(d.taxRate ?? 0)
      setInflationRate(d.inflationRate ?? 2)
      setCompounding(d.compounding ?? 'monthly')
    }

    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save to LocalStorage ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('interest-adv', { 
        initialInvestment, monthlyContribution, annualContribution, 
        rate, years, taxRate, inflationRate, compounding 
    })
  }, [initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding, isMounted])

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  const results = useMemo(() => {
    if (trigger === 0) return null
    const schedule = []; 
    let currentBalance = initialInvestment;
    let totalContributions = 0;
    const totalMonths = Math.min(years * 12, 1200); 
    const n = compoundingValues[compounding];

    for (let m = 1; m <= totalMonths; m++) {
      currentBalance += monthlyContribution;
      totalContributions += monthlyContribution;
      
      if (m > 1 && (m - 1) % 12 === 0) {
        currentBalance += annualContribution;
        totalContributions += annualContribution;
      }

      let interestThisMonth = compounding === 'continuously' 
        ? currentBalance * (Math.exp((rate / 100) / 12) - 1)
        : currentBalance * (Math.pow(1 + (rate / 100) / n, n / 12) - 1);

      const netInterest = interestThisMonth * (1 - taxRate / 100);
      currentBalance += netInterest;
      
      if (m % 12 === 0 || m === totalMonths) {
        schedule.push({ 
            year: Math.ceil(m / 12), 
            balance: Math.round(currentBalance),
            contributions: initialInvestment + totalContributions
        });
      }
    }

    const totalInterest = currentBalance - (initialInvestment + totalContributions);

    return { 
      endingBalance: currentBalance, 
      totalContributions, 
      totalInterest, 
      inflationAdjusted: currentBalance / Math.pow(1 + (inflationRate / 100), years), 
      schedule 
    };
  }, [trigger, initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding]);

  const handleReset = () => {
    setInitialInvestment(10000); setMonthlyContribution(100); setAnnualContribution(0);
    setRate(7); setYears(10); setTaxRate(0); setInflationRate(2); setCompounding('monthly');
    setTrigger(0); setShowResults(false);
  }

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden">
              <button 
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-50 border-red-100 text-red-500 shadow-sm" : "bg-secondary text-muted-foreground hover:text-foreground border-transparent"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings2 className="text-primary" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <InputField label="Initial Investment" value={initialInvestment} onChange={setInitialInvestment} />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Monthly Contribution" value={monthlyContribution} onChange={setMonthlyContribution} />
                  <InputField label="Annual Contribution" value={annualContribution} onChange={setAnnualContribution} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Interest Rate (%)" value={rate} onChange={setRate} step={0.1} />
                  <InputField label="Years" value={years} onChange={setYears} />
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">Compounding</label>
                  <select 
                    value={compounding} 
                    onChange={e => setCompounding(e.target.value as Frequency)} 
                    className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg appearance-none cursor-pointer capitalize"
                  >
                    {Object.keys(compoundingValues).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                   <InputField label="Tax Rate (%)" value={taxRate} onChange={setTaxRate} />
                   <InputField label="Inflation (%)" value={inflationRate} onChange={setInflationRate} />
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    onClick={() => { setTrigger(t => t + 1); setShowResults(true); }} 
                    className="w-full py-3.5 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    Calculate Growth <CheckCircle2 size={16} />
                  </button>
                  <button onClick={handleReset} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                
                {/* Top Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-primary text-primary-foreground rounded-xl shadow-lg">
                    <p className="text-[10px] font-black uppercase opacity-70 tracking-widest">Ending Balance</p>
                    <p className="text-3xl font-black mt-1">${Math.round(results.endingBalance).toLocaleString()}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs font-bold bg-white/10 w-fit px-2 py-0.5 rounded">
                        <ArrowUpRight size={12} /> Total Growth
                    </div>
                  </div>
                  <div className="p-6 bg-card border rounded-xl">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Interest</p>
                    <p className="text-3xl font-black mt-1 text-primary">${Math.round(results.totalInterest).toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-card border rounded-xl">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-1">
                        Buying Power <ShieldAlert size={12} className="text-amber-500" />
                    </p>
                    <p className="text-3xl font-black mt-1">${Math.round(results.inflationAdjusted).toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground mt-1 font-medium italic">Adjusted for {inflationRate}% inflation</p>
                  </div>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground mb-6 tracking-widest">Growth Composition</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={[
                                    { name: 'Principal', value: initialInvestment + results.totalContributions }, 
                                    { name: 'Interest', value: results.totalInterest }
                                ]} 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={8} 
                                dataKey="value"
                                stroke="none"
                            >
                            <Cell fill="hsl(var(--primary))" />
                            <Cell fill="hsl(var(--primary) / 0.2)" />
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            />
                        </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-2">
                        <div className="flex items-center gap-2 text-xs font-bold"><div className="w-3 h-3 rounded-full bg-primary" /> Principal</div>
                        <div className="flex items-center gap-2 text-xs font-bold"><div className="w-3 h-3 rounded-full bg-primary/20" /> Interest</div>
                    </div>
                  </div>

                  <div className="bg-card p-6 rounded-xl border">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground mb-6 tracking-widest">Accumulation Schedule</h3>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results.schedule}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="year" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis fontSize={10} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                            <Tooltip 
                                cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.4 }}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                            />
                            <Bar dataKey="balance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                        </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Explanation Card */}
                <div className="bg-card border rounded-xl p-8">
                    <div className="flex gap-3 mb-4">
                        <Info className="w-5 h-5 text-primary flex-shrink-0" />
                        <h3 className="font-bold text-lg">Compound Interest Explained</h3>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        Compound interest is interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods on a deposit or loan. 
                        Essentially, it is <strong>"interest on interest."</strong> The frequency of compounding ({compounding}) significantly impacts how fast your wealth grows.
                    </p>
                </div>
              </div>
            ) : (
                <div className="bg-secondary/20 border-2 border-dashed rounded-xl h-[500px] flex flex-col items-center justify-center text-muted-foreground">
                    <TrendingUp size={48} className="opacity-10 mb-4" />
                    <p className="text-sm font-bold uppercase tracking-widest">Configure parameters to see your growth</p>
                </div>
            )}
            
            <RelatedCalculators calculators={relatedCalculators} />
          </div>
        </div>
      </section>
    </main>
  )
}

function InputField({ label, value, onChange, step = 1 }: { label: string, value: number, onChange: (v: number) => void, step?: number }) {
  return (
    <div>
      <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">{label}</label>
      <input 
        type="number" 
        step={step}
        value={value} 
        onChange={e => onChange(Number(e.target.value))} 
        className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none font-bold text-lg transition-all" 
      />
    </div>
  )
}