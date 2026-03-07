'use client'

import { useState, useEffect } from 'react'
import { Wallet, Calculator, RotateCcw, Globe, Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

type PayPeriod = 'Hour' | 'Day' | 'Week' | 'Bi-week' | 'Semi-month' | 'Month' | 'Quarter' | 'Year'

export default function SalaryCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Input States
  const [salaryAmount, setSalaryAmount] = useState<number>(1000)
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('Month')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [holidaysPerYear, setHolidaysPerYear] = useState<number>(10)
  const [vacationPerYear, setVacationPerYear] = useState<number>(15)
  const [currencySymbol, setCurrencySymbol] = useState<string>('$')

  // Result State (Triggered only on button click)
  const [calculatedResults, setCalculatedResults] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
    handleCalculate() // Initial calculation on load
  }, [])

  const handleCalculate = () => {
    // 1. Calculate Annual Base (Unadjusted)
    let annualUnadjusted = 0
    switch (payPeriod) {
      case 'Hour': annualUnadjusted = salaryAmount * hoursPerWeek * 52; break
      case 'Day': annualUnadjusted = salaryAmount * daysPerWeek * 52; break
      case 'Week': annualUnadjusted = salaryAmount * 52; break
      case 'Bi-week': annualUnadjusted = salaryAmount * 26; break
      case 'Semi-month': annualUnadjusted = salaryAmount * 24; break
      case 'Month': annualUnadjusted = salaryAmount * 12; break
      case 'Quarter': annualUnadjusted = salaryAmount * 4; break
      case 'Year': annualUnadjusted = salaryAmount; break
    }

    // 2. Calculate Adjusted Annual
    const totalWorkingDaysYear = 260 
    const totalOffDays = Number(holidaysPerYear) + Number(vacationPerYear)
    const adjustmentFactor = (totalWorkingDaysYear - totalOffDays) / totalWorkingDaysYear
    const annualAdjusted = annualUnadjusted * adjustmentFactor

    const formatRow = (annual: number) => ({
      hourly: (annual / (52 * hoursPerWeek)).toFixed(2),
      daily: (annual / (52 * daysPerWeek)).toFixed(2),
      weekly: (annual / 52).toFixed(2),
      biweekly: (annual / 26).toFixed(2),
      semimonthly: (annual / 24).toFixed(2),
      monthly: (annual / 12).toFixed(2),
      quarterly: (annual / 4).toFixed(2),
      annual: annual.toLocaleString(undefined, { maximumFractionDigits: 0 })
    })

    setCalculatedResults({
      unadjusted: formatRow(annualUnadjusted),
      adjusted: formatRow(annualAdjusted),
      currentCurrency: currencySymbol
    })
  }

  const resetFields = () => {
    setSalaryAmount(1000)
    setPayPeriod('Month')
    setCurrencySymbol('$')
    setCalculatedResults(null)
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Salary Calculator</h1>
          <p className="text-muted-foreground">Professional tool for adjusted and unadjusted income projections.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Side: Inputs */}
          <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-6 shadow-sm space-y-5">
            <div className="flex gap-4">
               <div className="flex-1 space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                  Symbol
                </label>
                <input 
                  type="text"
                  maxLength={5}
                  value={currencySymbol} 
                  onChange={(e) => setCurrencySymbol(e.target.value)}
                  placeholder="$"
                  className="w-full p-3 bg-muted border border-border rounded-xl font-bold text-center outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-[2] space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Salary Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">{currencySymbol}</span>
                  <input 
                    type="number" 
                    value={salaryAmount} 
                    onChange={(e) => setSalaryAmount(Number(e.target.value))}
                    className="w-full p-3 pl-10 bg-background border border-border rounded-xl font-bold focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground">Per Period</label>
              <select 
                value={payPeriod} 
                onChange={(e) => setPayPeriod(e.target.value as PayPeriod)}
                className="w-full p-3 bg-muted border border-border rounded-xl font-medium outline-none cursor-pointer"
              >
                {['Hour', 'Day', 'Week', 'Bi-week', 'Semi-month', 'Month', 'Quarter', 'Year'].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Hours / Week</label>
                <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Days / Week</label>
                <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Holidays / Year</label>
                <input type="number" value={holidaysPerYear} onChange={(e) => setHolidaysPerYear(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-muted-foreground">Vacation / Year</label>
                <input type="number" value={vacationPerYear} onChange={(e) => setVacationPerYear(Number(e.target.value))} className="w-full p-3 bg-background border border-border rounded-xl" />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button 
                onClick={handleCalculate}
                className="flex-[4] bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
              >
                Calculate <Calculator size={18} />
              </button>
              <button onClick={resetFields} className="flex-1 bg-muted rounded-xl flex items-center justify-center hover:bg-muted/80 transition-colors">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Right Side: Results Table */}
          <div className="lg:col-span-7">
            {calculatedResults ? (
              <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm animate-in fade-in duration-500">
                <div className="bg-primary px-6 py-4 text-white font-bold text-lg flex justify-between items-center">
                  <span>Results</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded uppercase tracking-wider">Estimated</span>
                </div>
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-muted/50 text-[10px] sm:text-xs uppercase font-bold text-muted-foreground border-b border-border">
                      <th className="px-4 sm:px-6 py-4">Frequency</th>
                      <th className="px-4 sm:px-6 py-4">Unadjusted</th>
                      <th className="px-4 sm:px-6 py-4 text-primary">Adjusted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { label: 'Hourly', key: 'hourly' },
                      { label: 'Daily', key: 'daily' },
                      { label: 'Weekly', key: 'weekly' },
                      { label: 'Bi-weekly', key: 'biweekly' },
                      { label: 'Semi-monthly', key: 'semimonthly' },
                      { label: 'Monthly', key: 'monthly' },
                      { label: 'Quarterly', key: 'quarterly' },
                      { label: 'Annual', key: 'annual', bold: true },
                    ].map((row) => (
                      <tr key={row.key} className={`hover:bg-muted/30 transition-colors ${row.bold ? 'font-bold bg-primary/5' : ''}`}>
                        <td className="px-4 sm:px-6 py-3.5 text-sm">{row.label}</td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm font-mono">{calculatedResults.currentCurrency}{calculatedResults.unadjusted[row.key]}</td>
                        <td className="px-4 sm:px-6 py-3.5 text-sm font-mono text-primary">{calculatedResults.currentCurrency}{calculatedResults.adjusted[row.key]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-full min-h-[400px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <Calculator size={40} className="opacity-20" />
                </div>
                <p className="font-medium">Adjust values on the left and click calculate to see your salary breakdown.</p>
              </div>
            )}
            
            <div className="mt-8 p-4 bg-muted/30 rounded-xl border border-border/50">
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                Note: This calculator assumes 52 working weeks or 260 weekdays per year. Adjusted values account for holidays and vacation days as unpaid time off for calculation purposes.
              </p>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Income Tax', description: 'Estimate your tax burden', href: '/tax', icon: Wallet },
          { name: 'Hours Calculator', description: 'Track work time', href: '/hours', icon: Calculator }
        ]} />
      </div>
      <Footer />
    </main>
  )
}