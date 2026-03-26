'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Calculator, 
  TrendingUp, 
  ListFilter, 
  CheckCircle2, 
  Wallet, 
  BarChart3, 
  Heart, 
  Calendar, 
  Clock, 
  Coffee,
  RotateCcw,
  TrendingDown
} from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

type PayPeriod = 'Hour' | 'Day' | 'Week' | 'Bi-week' | 'Semi-month' | 'Month' | 'Quarter' | 'Year'

export default function SalaryCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  
  const calculatorInfo = {
    name: "Salary Calculator",
    href: "/calculators/financial/salary-calculator",
    category: "Financial",
  }

  // --- Related Calculators Array ---
  const relatedCalculatorsList = [
    { 
      name: 'Interest Calculator', 
      description: 'Compound interest solver', 
      href: '/calculators/financial/interest-calculator', 
      icon: BarChart3 
    },
    { 
      name: 'Mortgage Calculator', 
      description: 'Advanced house payment tool', 
      href: '/calculators/financial/mortgage-calculator', 
      icon: TrendingDown 
    }
  ]

  // --- States ---
  const [currencySymbol, setCurrencySymbol] = useState('$')
  const [salaryAmount, setSalaryAmount] = useState<number>(5000)
  const [payPeriod, setPayPeriod] = useState<PayPeriod>('Month')
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [holidaysPerYear, setHolidaysPerYear] = useState<number>(10)
  const [vacationPerYear, setVacationPerYear] = useState<number>(15)

  // --- Initialization & Load ---
  useEffect(() => {
    setIsMounted(true)
    const history = getCalculatorHistory()
    if (history['salary-calc']?.data) {
      const d = history['salary-calc'].data
      setSalaryAmount(d.salaryAmount); setPayPeriod(d.payPeriod); setCurrencySymbol(d.currencySymbol)
      setHoursPerWeek(d.hoursPerWeek); setDaysPerWeek(d.daysPerWeek)
      setHolidaysPerYear(d.holidaysPerYear); setVacationPerYear(d.vacationPerYear)
    }

    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('salary-calc', { 
        salaryAmount, payPeriod, currencySymbol, hoursPerWeek, 
        daysPerWeek, holidaysPerYear, vacationPerYear 
    })
  }, [salaryAmount, payPeriod, currencySymbol, hoursPerWeek, daysPerWeek, holidaysPerYear, vacationPerYear, isMounted])

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  // --- Calculation Engine ---
  const results = useMemo(() => {
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

    const totalOffDays = Number(holidaysPerYear) + Number(vacationPerYear)
    const potentialWorkDays = 52 * daysPerWeek
    const workDaysYear = Math.max(0, potentialWorkDays - totalOffDays)
    const adjustmentFactor = potentialWorkDays > 0 ? workDaysYear / potentialWorkDays : 0
    const annualAdjusted = annualUnadjusted * adjustmentFactor

    const formatRow = (annual: number) => ({
      hourly: (annual / (52 * hoursPerWeek)).toFixed(2),
      daily: (annual / (52 * daysPerWeek)).toFixed(2),
      weekly: (annual / 52).toFixed(2),
      monthly: (annual / 12).toFixed(2),
      annual: Math.round(annual).toLocaleString()
    })

    return { 
        unadjusted: formatRow(annualUnadjusted), 
        adjusted: formatRow(annualAdjusted),
        workDaysYear,
        offDaysYear: totalOffDays
    }
  }, [salaryAmount, payPeriod, hoursPerWeek, daysPerWeek, holidaysPerYear, vacationPerYear])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-600/10 rounded-xl">
                    <Wallet className="text-emerald-600 w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Salary Calculator</h1>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Annual & Monthly Projections</p>
                </div>
            </div>
            <button 
                onClick={handleToggleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
                    isSaved ? "bg-red-50 border-red-100 text-red-500" : "bg-card hover:bg-secondary"
                }`}
            >
                <Heart size={18} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved" : "Save Tool"}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">Income Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                   <div className="col-span-1">
                     <label className="text-[10px] font-bold uppercase text-muted-foreground">Currency</label>
                     <input value={currencySymbol} onChange={(e) => setCurrencySymbol(e.target.value)} className="w-full mt-1 p-3 bg-secondary rounded-lg font-bold text-center border outline-none" />
                   </div>
                   <div className="col-span-2">
                     <label className="text-[10px] font-bold uppercase text-muted-foreground">Amount</label>
                     <input type="number" value={salaryAmount} onChange={(e) => setSalaryAmount(Number(e.target.value))} className="w-full mt-1 p-3 bg-secondary rounded-lg font-bold border outline-none focus:ring-2 ring-emerald-500/20" />
                   </div>
                </div>

                <div>
                    <label className="text-[10px] font-bold uppercase text-muted-foreground">Pay Period</label>
                    <select value={payPeriod} onChange={(e) => setPayPeriod(e.target.value as PayPeriod)} className="w-full mt-1 p-3 bg-secondary rounded-lg font-bold border outline-none cursor-pointer">
                        {['Hour', 'Day', 'Week', 'Bi-week', 'Semi-month', 'Month', 'Quarter', 'Year'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Clock size={10}/> Hrs/Week</label>
                        <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(Number(e.target.value))} className="w-full mt-1 p-2 bg-secondary rounded-lg font-bold border outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Calendar size={10}/> Days/Week</label>
                        <input type="number" value={daysPerWeek} onChange={(e) => setDaysPerWeek(Number(e.target.value))} className="w-full mt-1 p-2 bg-secondary rounded-lg font-bold border outline-none" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Coffee size={10}/> Holidays</label>
                        <input type="number" value={holidaysPerYear} onChange={(e) => setHolidaysPerYear(Number(e.target.value))} className="w-full mt-1 p-2 bg-secondary rounded-lg font-bold border outline-none" />
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1"><Coffee size={10}/> Vacation</label>
                        <input type="number" value={vacationPerYear} onChange={(e) => setVacationPerYear(Number(e.target.value))} className="w-full mt-1 p-2 bg-secondary rounded-lg font-bold border outline-none" />
                    </div>
                </div>

                <button 
                    onClick={() => {
                        setSalaryAmount(5000); 
                        setPayPeriod('Month'); 
                        setHoursPerWeek(40);
                    }}
                    className="w-full py-2 text-muted-foreground text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:text-foreground transition-colors"
                >
                    <RotateCcw size={12} /> Reset Fields
                </button>
              </div>
            </div>

            {/* Work-Life Balance Card */}
            <div className="bg-emerald-600 rounded-xl p-6 text-white shadow-lg shadow-emerald-600/20">
                <h3 className="text-sm font-bold uppercase tracking-wider opacity-80 mb-4">Yearly Schedule</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-2xl font-black">{results.workDaysYear}</p>
                            <p className="text-[10px] font-bold uppercase opacity-70">Working Days</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black">{results.offDaysYear}</p>
                            <p className="text-[10px] font-bold uppercase opacity-70">Days Off</p>
                        </div>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden flex">
                        <div className="h-full bg-white" style={{ width: `${(results.workDaysYear / (results.workDaysYear + results.offDaysYear)) * 100}%` }}></div>
                    </div>
                </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                <div className="px-6 py-5 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-secondary/10">
                    <div>
                        <h3 className="font-bold flex items-center gap-2">
                            <TrendingUp size={18} className="text-emerald-600"/> 
                            Salary Projections
                        </h3>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-3 py-1 bg-secondary rounded text-[10px] font-bold uppercase text-muted-foreground">
                            Standard
                        </div>
                        <div className="px-3 py-1 bg-emerald-600/10 rounded text-[10px] font-bold uppercase text-emerald-600">
                            Adjusted
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/30">
                            <tr className="text-[10px] uppercase font-black text-muted-foreground tracking-widest">
                                <th className="p-5 text-left">Time Period</th>
                                <th className="p-5 text-right">Standard Salary</th>
                                <th className="p-5 text-right text-emerald-600">Actual Income</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y border-t">
                            {Object.entries(results.unadjusted).map(([key, val]) => (
                                <tr key={key} className="hover:bg-emerald-50/20 transition-colors group">
                                    <td className="p-5 capitalize font-bold text-muted-foreground group-hover:text-foreground">
                                        {key}
                                    </td>
                                    <td className="p-5 text-right font-mono font-medium text-sm">
                                        {currencySymbol}{val}
                                    </td>
                                    <td className="p-5 text-right font-mono font-black text-emerald-600">
                                        {currencySymbol}{results.adjusted[key as keyof typeof results.adjusted]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Educational Note */}
            <div className="p-6 bg-secondary/30 rounded-2xl border border-dashed border-muted-foreground/20">
                <h4 className="text-sm font-black uppercase mb-2 flex items-center gap-2">
                    <Coffee size={14} /> The "Adjusted" Difference
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    The **Standard Salary** assumes a consistent pay cycle without interruptions. The **Actual Income** factors in your {holidaysPerYear} holidays and {vacationPerYear} vacation days, showing the true value of your working time throughout the potential working days in a year.
                </p>
            </div>
          </div>
        </div>

        {/* RELATED CALCULATORS */}
        <div className="mt-12">
            <RelatedCalculators calculators={relatedCalculatorsList} />
        </div>
      </section>
    </main>
  )
}