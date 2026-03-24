'use client'

import { useState, useEffect, useMemo } from 'react'
import { Calculator, TrendingUp, ListFilter, CheckCircle2, Wallet, Layers, Hash, BarChart3 } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type PayPeriod = 'Hour' | 'Day' | 'Week' | 'Bi-week' | 'Semi-month' | 'Month' | 'Quarter' | 'Year'

export default function SalaryCalculator() {
  // --- States ---
  const [isMounted, setIsMounted] = useState(false)
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [salaryAmount, setSalaryAmount] = useState<number>(1000)
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('Month')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [holidaysPerYear, setHolidaysPerYear] = useState<number>(10)
  const [vacationPerYear, setVacationPerYear] = useState<number>(15)
  const [showResults, setShowResults] = useState(false)
  const [trigger, setTrigger] = useState(0)

  // --- Related Calculators Data ---
  const relatedCalculators = [
    { name: 'Interest Calculator', description: 'Compound interest solver', href: '/calculators/financial/interest-calculator', icon: BarChart3 }
  ]

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['salary-calc']?.data) {
      const d = history['salary-calc'].data
      setSalaryAmount(d.salaryAmount); setPayPeriod(d.payPeriod); setCurrencySymbol(d.currencySymbol)
      setHoursPerWeek(d.hoursPerWeek); setDaysPerWeek(d.daysPerWeek)
      setHolidaysPerYear(d.holidaysPerYear); setVacationPerYear(d.vacationPerYear)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('salary-calc', { salaryAmount, payPeriod, currencySymbol, hoursPerWeek, daysPerWeek, holidaysPerYear, vacationPerYear })
    }
  }, [salaryAmount, payPeriod, currencySymbol, hoursPerWeek, daysPerWeek, holidaysPerYear, vacationPerYear, isMounted])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null
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
    const adjustmentFactor = (260 - (Number(holidaysPerYear) + Number(vacationPerYear))) / 260
    const annualAdjusted = annualUnadjusted * adjustmentFactor

    const formatRow = (annual: number) => ({
      hourly: (annual / (52 * hoursPerWeek)).toFixed(2),
      weekly: (annual / 52).toFixed(2),
      monthly: (annual / 12).toFixed(2),
      annual: Math.round(annual).toLocaleString()
    })

    return { unadjusted: formatRow(annualUnadjusted), adjusted: formatRow(annualAdjusted) }
  }, [trigger, salaryAmount, payPeriod, hoursPerWeek, daysPerWeek, holidaysPerYear, vacationPerYear])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><ListFilter size={20} className="text-blue-500"/> Parameters</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                   <div className="col-span-1">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Symbol</label>
                     <input value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} className="w-full mt-1 p-3 bg-secondary rounded-lg font-bold text-center border outline-none focus:ring-2 ring-blue-500/20" />
                   </div>
                   <div className="col-span-2">
                     <label className="text-xs font-bold uppercase text-muted-foreground">Amount</label>
                     <input type="number" value={salaryAmount} onChange={(e) => setSalaryAmount(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-lg font-bold border outline-none focus:ring-2 ring-blue-500/20" />
                   </div>
                </div>
                <label className="text-xs font-bold uppercase text-muted-foreground">Pay Period</label>
                <select value={payPeriod} onChange={(e) => setPayPeriod(e.target.value as PayPeriod)} className="w-full p-3 bg-secondary rounded-lg font-bold border outline-none focus:ring-2 ring-blue-500/20">
                  {['Hour', 'Day', 'Week', 'Bi-week', 'Semi-month', 'Month', 'Year'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                
                <div className="grid grid-cols-2 gap-2">
                    {[
                        {label: 'Hrs/Week', val: hoursPerWeek, set: setHoursPerWeek},
                        {label: 'Days/Week', val: daysPerWeek, set: setDaysPerWeek},
                        {label: 'Hols/Year', val: holidaysPerYear, set: setHolidaysPerYear},
                        {label: 'Vac/Year', val: vacationPerYear, set: setVacationPerYear},
                    ].map((f) => (
                        <div key={f.label}>
                            <label className="text-[10px] font-bold uppercase text-muted-foreground">{f.label}</label>
                            <input type="number" value={f.val} onChange={(e) => f.set(Number(e.target.value))} className="w-full mt-1 p-2 bg-secondary rounded-lg font-bold border outline-none focus:ring-2 ring-blue-500/20" />
                        </div>
                    ))}
                </div>

                <button onClick={() => {setTrigger(t => t + 1); setShowResults(true)}} className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2">
                  Calculate Salary <CheckCircle2 size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-8 space-y-8">
            {showResults && results ? (
              <div className="bg-card border rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between bg-secondary/50">
                  <span className="font-bold">Projections</span>
                  <span className="text-xs font-bold uppercase text-blue-600">Adjusted Calculation</span>
                </div>
                <table className="w-full">
                  <thead className="bg-secondary/30">
                    <tr className="text-[10px] uppercase font-bold text-muted-foreground">
                      <th className="p-4 text-left">Frequency</th>
                      <th className="p-4 text-right">Unadjusted</th>
                      <th className="p-4 text-right text-blue-600">Adjusted</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                     {Object.entries(results.unadjusted).map(([key, val]) => (
                       <tr key={key} className="hover:bg-secondary/50">
                         <td className="p-4 capitalize font-medium">{key}</td>
                         <td className="p-4 text-right font-mono">{currencySymbol}{val}</td>
                         <td className="p-4 text-right font-mono font-bold text-blue-600">{currencySymbol}{results.adjusted[key as keyof typeof results.adjusted]}</td>
                       </tr>
                     ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-xl h-full min-h-[300px] flex flex-col items-center justify-center text-muted-foreground">
                <TrendingUp size={48} className="opacity-10 mb-4" />
                <p>Input your work schedule to view results</p>
              </div>
            )}
            
            
            
          </div>
        </div>
        {/* Related Calculators */}
            <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  )
}