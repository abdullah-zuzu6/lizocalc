'use client'

import { useState, useEffect, useMemo } from 'react'
import { TrendingUp, ListFilter, BarChart3, Wallet, Calculator, Hash, CheckCircle2, RotateCcw } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type Frequency = 'annually' | 'semiannually' | 'quarterly' | 'monthly' | 'semimonthly' | 'biweekly' | 'weekly' | 'daily' | 'continuously';

const compoundingValues: Record<Frequency, number> = {
  annually: 1, semiannually: 2, quarterly: 4, monthly: 12,
  semimonthly: 24, biweekly: 26, weekly: 52, daily: 365, continuously: 1000000,
};

export default function InterestCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(100)
  const [annualContribution, setAnnualContribution] = useState<number>(0)
  const [rate, setRate] = useState<number>(7)
  const [years, setYears] = useState<number>(10)
  const [taxRate, setTaxRate] = useState<number>(0)
  const [inflationRate, setInflationRate] = useState<number>(2)
  const [compounding, setCompounding] = useState<Frequency>('monthly')
  const [isMounted, setIsMounted] = useState(false)
  const [trigger, setTrigger] = useState(0)

  const relatedCalculators = [
    { name: 'LCM Calculator', description: 'Find least common multiple', href: '/calculators/math/lcm-calculator', icon: Hash },
    { name: 'Salary Calculator', description: 'Calculate take-home pay', href: '/calculators/financial/salary-calculator', icon: Calculator },
  ]

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['interest-adv']?.data) {
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
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('interest-adv', { initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding })
    }
  }, [initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding, isMounted])

  const results = useMemo(() => {
    if (trigger === 0) return null
    const schedule = []; let currentBalance = initialInvestment;
    let totalContributions = 0; let totalInterest = 0;
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
      totalInterest += netInterest;
      schedule.push({ month: m, year: Math.ceil(m / 12), interest: netInterest, balance: currentBalance });
    }
    return { endingBalance: currentBalance, totalContributions, totalInterest, inflationAdjusted: currentBalance / Math.pow(1 + (inflationRate / 100), years), schedule };
  }, [trigger, initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding]);

  const handleReset = () => {
    setInitialInvestment(10000); setMonthlyContribution(100); setAnnualContribution(0);
    setRate(7); setYears(10); setTaxRate(0); setInflationRate(2); setCompounding('monthly');
    setTrigger(0);
  }

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls */}
          <section className="lg:col-span-4 space-y-6">
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Initial Investment</label>
                  <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border outline-none focus:ring-2 ring-blue-500/20" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Monthly</label>
                    <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Annual</label>
                    <input type="number" value={annualContribution} onChange={e => setAnnualContribution(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Interest Rate (%)</label>
                  <input type="number" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-md border" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Compounding</label>
                  <select value={compounding} onChange={e => setCompounding(e.target.value as Frequency)} className="w-full mt-1 p-3 bg-secondary rounded-md border cursor-pointer">
                    {Object.keys(compoundingValues).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="pt-4 flex flex-col gap-2">
                    <button onClick={() => setTrigger(t => t + 1)} className="w-full py-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
                        Calculate Interest <CheckCircle2 size={16} />
                    </button>
                    <button onClick={handleReset} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                        <RotateCcw size={14} /> Reset
                    </button>
                </div>
              </div>
            </div>
          </section>

          {/* Results Area */}
          <section className="lg:col-span-8 space-y-6">
            {results ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 bg-blue-600 text-white rounded-xl shadow-lg">
                    <p className="text-xs font-bold uppercase opacity-80">Final Balance</p>
                    <p className="text-2xl font-black">${Math.round(results.endingBalance).toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Total Interest</p>
                    <p className="text-2xl font-black text-blue-600">${Math.round(results.totalInterest).toLocaleString()}</p>
                  </div>
                  <div className="p-6 bg-card border rounded-xl shadow-sm">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Inflation Adj.</p>
                    <p className="text-2xl font-black">${Math.round(results.inflationAdjusted).toLocaleString()}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card p-6 rounded-xl border h-[300px]">
                    <h3 className="font-bold mb-4 text-sm uppercase text-muted-foreground">Wealth Breakdown</h3>
                    <ResponsiveContainer width="100%" height="80%">
                      <PieChart>
                        <Pie data={[{ name: 'Principal', value: initialInvestment + results.totalContributions }, { name: 'Interest', value: results.totalInterest }]} innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value">
                          <Cell fill="#3b82f6" /><Cell fill="#10b981" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-card p-6 rounded-xl border h-[300px]">
                    <h3 className="font-bold mb-4 text-sm uppercase text-muted-foreground">Accumulation Path</h3>
                    <ResponsiveContainer width="100%" height="80%">
                      <BarChart data={results.schedule.filter((_, i) => (i + 1) % 12 === 0).map(s => ({ name: `Yr ${s.year}`, Balance: s.balance }))}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} />
                        <YAxis fontSize={10} />
                        <Tooltip />
                        <Bar dataKey="Balance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : (
                <div className="bg-secondary/20 border-2 border-dashed rounded-xl h-[500px] flex flex-col items-center justify-center text-muted-foreground">
                    <TrendingUp size={48} className="opacity-20 mb-4" />
                    <p>Configure parameters and calculate to view growth</p>
                </div>
            )}
            
            <RelatedCalculators calculators={relatedCalculators} />
          </section>
        </div>
      </section>
    </main>
  )
}