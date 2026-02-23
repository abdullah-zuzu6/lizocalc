'use client'

import { useState, useEffect, useMemo } from 'react'
import { Info, Printer, TrendingUp, Calendar, Clock } from 'lucide-react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];

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
  const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('annual')

  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['interest-adv']?.data) {
      const d = history['interest-adv'].data
      setInitialInvestment(d.initialInvestment ?? 10000); 
      setMonthlyContribution(d.monthlyContribution ?? 100);
      setAnnualContribution(d.annualContribution ?? 0); 
      setRate(d.rate ?? 7); setYears(d.years ?? 10);
      setTaxRate(d.taxRate ?? 0); setInflationRate(d.inflationRate ?? 2); 
      setCompounding(d.compounding ?? 'monthly');
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
    const schedule = []; let currentBalance = initialInvestment;
    let totalContributions = 0; let totalInterest = 0;
    // Safety cap for calculation loop to prevent browser hang
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
  }, [initialInvestment, monthlyContribution, annualContribution, rate, years, taxRate, inflationRate, compounding]);

  if (!isMounted) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="print:hidden"><Navbar /></div>
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 print:hidden">
          <BackButton href="/calculators/financial" />
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 transition-all shadow-md">
            <Printer className="w-4 h-4" /> Print Results (PDF)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <section className="lg:col-span-1 space-y-6 print:hidden">
            <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" /> Strategy
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Initial Investment</label>
                  <input type="number" value={initialInvestment} onChange={e => setInitialInvestment(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Monthly</label>
                    <input type="number" value={monthlyContribution} onChange={e => setMonthlyContribution(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Annual</label>
                    <input type="number" value={annualContribution} onChange={e => setAnnualContribution(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Interest Rate (%)</label>
                  <input type="number" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl focus:ring-2 ring-primary/20 outline-none transition-all" />
                  <input type="range" min="0" max="25" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary mt-4" />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Compounding</label>
                  <select value={compounding} onChange={e => setCompounding(e.target.value as Frequency)} className="w-full mt-1 p-3 bg-background border border-border rounded-xl capitalize cursor-pointer">
                    {Object.keys(compoundingValues).map(k => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Years</label>
                    <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground ml-1">Tax (%)</label>
                    <input type="number" value={taxRate} onChange={e => setTaxRate(Number(e.target.value))} className="w-full mt-1 p-3 bg-background border border-border rounded-xl" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Results Area */}
          <section className="lg:col-span-2 space-y-6 overflow-hidden">
            {/* Summary Cards with containment */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-primary text-primary-foreground rounded-3xl shadow-lg overflow-hidden whitespace-nowrap">
                <p className="text-xs font-bold uppercase opacity-80">Final Balance</p>
                <p className="text-2xl xl:text-3xl font-black truncate">{formatCurrency(results.endingBalance)}</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-3xl shadow-sm overflow-hidden whitespace-nowrap">
                <p className="text-xs font-bold uppercase text-muted-foreground">Total Interest</p>
                <p className="text-2xl xl:text-3xl font-black text-primary truncate">{formatCurrency(results.totalInterest)}</p>
              </div>
              <div className="p-6 bg-card border border-border rounded-3xl shadow-sm overflow-hidden whitespace-nowrap">
                <p className="text-xs font-bold uppercase text-muted-foreground">Adjusted (Inflation)</p>
                <p className="text-2xl xl:text-3xl font-black text-accent truncate">{formatCurrency(results.inflationAdjusted)}</p>
              </div>
            </div>

            {/* Sliding Schedule Component */}
            
            
            {/* Visual Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:block">
              <div className="bg-card p-6 rounded-3xl border border-border h-[350px]">
                <h3 className="font-bold mb-4">Wealth Breakdown</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie data={[{ name: 'Principal', value: initialInvestment + results.totalContributions }, { name: 'Interest', value: results.totalInterest }]} innerRadius={60} outerRadius={100} paddingAngle={8} dataKey="value">
                      <Cell fill="#3b82f6" /><Cell fill="#10b981" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card p-6 rounded-3xl border border-border h-[350px] print:mt-10">
                <h3 className="font-bold mb-4">Accumulation Path</h3>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart data={results.schedule.filter((_, i) => (i + 1) % 12 === 0).map(s => ({ name: `Yr ${s.year}`, Balance: s.balance }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="Balance" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </section>
          
        </div>

        
<div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
                <h3 className="font-bold text-lg">Detailed Schedule</h3>
                
                {/* Sliding Toggle */}
                <div className="relative bg-muted p-1 rounded-xl flex w-full sm:w-[240px]">
                  <div 
                    className="absolute top-1 bottom-1 transition-all duration-300 ease-in-out bg-background rounded-lg shadow-sm"
                    style={{ 
                      left: viewMode === 'annual' ? '4px' : '50%',
                      width: 'calc(50% - 4px)'
                    }}
                  />
                  <button onClick={() => setViewMode('annual')} className={`relative z-10 flex-1 py-2 text-xs font-bold transition-colors ${viewMode === 'annual' ? 'text-foreground' : 'text-muted-foreground'}`}>Annual</button>
                  <button onClick={() => setViewMode('monthly')} className={`relative z-10 flex-1 py-2 text-xs font-bold transition-colors ${viewMode === 'monthly' ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</button>
                </div>
              </div>

              {/* Sliding Content Container */}
              
            </div>
            <div className="relative overflow-hidden h-[450px]">
                <div 
                  className="flex transition-transform duration-500 ease-in-out h-full"
                  style={{ transform: `translateX(${viewMode === 'annual' ? '0%' : '-100%'})` }}
                >
                  {/* Yearly Table */}
                  <div className="w-full flex-shrink-0 h-full overflow-y-auto px-4 py-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                          <th className="p-4">Year</th>
                          <th className="p-4">Interest Earned</th>
                          <th className="p-4 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.filter(s => s.month % 12 === 0).map((row) => (
                          <tr key={row.month} className="group transition-colors">
                            <td className="p-4 bg-muted/30 rounded-l-2xl font-bold">Year {row.year}</td>
                            <td className="p-4 bg-muted/30 text-emerald-600 font-medium">+{formatCurrency(row.interest)}</td>
                            <td className="p-4 bg-muted/30 rounded-r-2xl text-right font-black truncate max-w-[150px]">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Monthly Table */}
                  <div className="w-full flex-shrink-0 h-full overflow-y-auto px-4 py-2">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                      <thead className="sticky top-0 bg-card z-10">
                        <tr className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold">
                          <th className="p-4">Month</th>
                          <th className="p-4">Interest Earned</th>
                          <th className="p-4 text-right">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.schedule.map((row) => (
                          <tr key={row.month} className="group transition-colors">
                            <td className="p-4 bg-muted/30 rounded-l-2xl font-bold">Month {row.month}</td>
                            <td className="p-4 bg-muted/30 text-emerald-600 font-medium">+{formatCurrency(row.interest)}</td>
                            <td className="p-4 bg-muted/30 rounded-r-2xl text-right font-black truncate max-w-[150px]">{formatCurrency(row.balance)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
      </div>
      
      <div className="print:hidden"><Footer /></div>
    </main>
  )
}