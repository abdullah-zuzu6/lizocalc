'use client'

import { useState, useMemo, useEffect } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Table as TableIcon, 
  LineChart as ChartIcon, 
  Home, 
  Heart, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  Percent
} from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage'

export default function AdvancedMortgageCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const calculatorInfo = {
    name: "Advanced Mortgage Calculator",
    href: "/calculators/financial/mortgage-calculator",
    category: "Financial",
  }

  // Core Inputs
  const [homePrice, setHomePrice] = useState(400000)
  const [downPayment, setDownPayment] = useState(80000)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20)
  const [rate, setRate] = useState(6.5)
  const [years, setYears] = useState(30)
  
  // Advanced Costs
  const [propertyTax, setPropertyTax] = useState(4800)
  const [homeInsurance, setHomeInsurance] = useState(1500)
  const [hoa, setHoa] = useState(0)
  const [otherCosts, setOtherCosts] = useState(0)

  // Extra Payments
  const [extraMonthly, setExtraMonthly] = useState(0)

  const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('annual')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // --- Initialization & Load History ---
  useEffect(() => {
    setIsMounted(true)
    
    const history = getCalculatorHistory()
    if (history['mortgage-adv']?.data) {
      const d = history['mortgage-adv'].data
      setHomePrice(d.homePrice || 400000)
      setDownPayment(d.downPayment || 80000)
      setDownPaymentPercent(d.downPaymentPercent || 20)
      setRate(d.rate || 6.5)
      setYears(d.years || 30)
      setPropertyTax(d.propertyTax || 4800)
      setHomeInsurance(d.homeInsurance || 1500)
      setHoa(d.hoa || 0)
      setOtherCosts(d.otherCosts || 0)
      setExtraMonthly(d.extraMonthly || 0)
    }

    const savedTools = getSavedCalculators()
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href))
  }, [])

  // --- Auto-Save Inputs ---
  useEffect(() => {
    if (!isMounted) return
    saveCalculatorHistory('mortgage-adv', { 
      homePrice, downPayment, downPaymentPercent, rate, years,
      propertyTax, homeInsurance, hoa, otherCosts, extraMonthly 
    })
  }, [homePrice, downPayment, rate, years, propertyTax, homeInsurance, hoa, otherCosts, extraMonthly, isMounted])

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo)
    setIsSaved(nowSaved)
  }

  const handleDownPaymentChange = (val: number, isPercent: boolean) => {
    if (isPercent) {
      setDownPaymentPercent(val)
      setDownPayment((val / 100) * homePrice)
    } else {
      setDownPayment(val)
      setDownPaymentPercent(homePrice > 0 ? (val / homePrice) * 100 : 0)
    }
  }

  const loanAmount = homePrice - downPayment

  const results = useMemo(() => {
    const monthlyRate = rate / 100 / 12
    const totalMonths = Math.max(1, years * 12)
    const pAndI = monthlyRate === 0 
      ? loanAmount / totalMonths 
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)

    let balance = loanAmount
    const schedule = []
    let totalInterest = 0
    let totalPaid = 0

    for (let i = 1; i <= totalMonths && balance > 0; i++) {
      const interestM = balance * monthlyRate
      const principalM = pAndI - interestM
      const totalPrincipal = Math.min(balance, principalM + extraMonthly)
      
      balance -= totalPrincipal
      totalInterest += interestM
      totalPaid += (totalPrincipal + interestM)
      
      schedule.push({
        month: i,
        interest: interestM,
        principal: totalPrincipal,
        balance: Math.max(0, balance),
        cumulativeInterest: totalInterest,
        cumulativePaid: totalPaid
      })
    }

    return { pAndI, schedule, totalInterest }
  }, [loanAmount, rate, years, extraMonthly])

  const monthlyTax = propertyTax / 12
  const monthlyIns = homeInsurance / 12
  const monthlyTotal = results.pAndI + monthlyTax + monthlyIns + hoa + otherCosts

  const pieData = [
    { name: 'P & I', value: results.pAndI, color: '#3b82f6' },
    { name: 'Tax', value: monthlyTax, color: '#ef4444' },
    { name: 'Ins.', value: monthlyIns, color: '#eab308' },
    { name: 'HOA/Other', value: hoa + otherCosts, color: '#22c55e' },
  ]

  const annualSchedule = useMemo(() => {
    const yearsArr: any[] = []
    results.schedule.forEach((m, i) => {
      const yearIdx = Math.floor(i / 12)
      if (!yearsArr[yearIdx]) {
        yearsArr[yearIdx] = { 
          year: yearIdx + 1, 
          interest: 0, 
          principal: 0, 
          balance: 0, 
          cumulativeInterest: 0, 
          cumulativePaid: 0 
        }
      }
      yearsArr[yearIdx].interest += m.interest
      yearsArr[yearIdx].principal += m.principal
      yearsArr[yearIdx].balance = m.balance
      yearsArr[yearIdx].cumulativeInterest = m.cumulativeInterest
      yearsArr[yearIdx].cumulativePaid = m.cumulativePaid
    })
    return yearsArr
  }, [results.schedule])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-600/10 rounded-xl">
                    <Home className="text-blue-600 w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight">Advanced Mortgage</h1>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Comprehensive Payment Analysis</p>
                </div>
            </div>
            <button 
                onClick={handleToggleSave}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-sm ${
                    isSaved ? "bg-red-50 border-red-100 text-red-500" : "bg-card hover:bg-secondary"
                }`}
            >
                <Heart size={18} className={isSaved ? "fill-current" : ""} />
                {isSaved ? "Saved to Library" : "Save Calculator"}
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-muted-foreground">Home Price ($)</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full mt-1 px-3 py-3 bg-secondary rounded-lg border font-bold text-lg focus:ring-2 ring-blue-500/20 outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Down Pay ($)</label>
                    <input type="number" value={downPayment} onChange={(e) => handleDownPaymentChange(Number(e.target.value), false)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Down Pay (%)</label>
                    <input type="number" value={downPaymentPercent} onChange={(e) => handleDownPaymentChange(Number(e.target.value), true)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Interest Rate (%)</label>
                    <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Loan Term (Yrs)</label>
                    <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border font-bold" />
                  </div>
                </div>

                <button 
                    onClick={() => setShowAdvanced(!showAdvanced)} 
                    className="w-full py-2 flex items-center justify-between px-3 bg-secondary/50 rounded-lg text-sm font-bold transition-colors hover:bg-secondary"
                >
                  <span>Advanced Options</span>
                  {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                {showAdvanced && (
                  <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-[10px] font-bold uppercase">Annual Tax</label><input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full px-3 py-2 bg-secondary border rounded font-bold" /></div>
                      <div><label className="text-[10px] font-bold uppercase">Annual Ins.</label><input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full px-3 py-2 bg-secondary border rounded font-bold" /></div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold uppercase">Extra Monthly Payment</label>
                        <input type="number" value={extraMonthly} onChange={(e) => setExtraMonthly(Number(e.target.value))} className="w-full px-3 py-2 bg-emerald-500/5 border border-emerald-500/20 text-emerald-600 rounded font-bold" />
                    </div>
                  </div>
                )}
                
                <button 
                    onClick={() => {setHomePrice(400000); setDownPayment(80000); setRate(6.5); setYears(30); setExtraMonthly(0);}}
                    className="w-full py-2 text-muted-foreground text-[10px] font-bold uppercase flex items-center justify-center gap-2 hover:text-foreground transition-colors"
                >
                    <RotateCcw size={12} /> Reset to Defaults
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS DASHBOARD */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-600 text-white rounded-2xl p-8 flex flex-col justify-center shadow-xl shadow-blue-500/20">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Total Monthly Payment</p>
                <h2 className="text-5xl font-black mb-4">
                  ${monthlyTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </h2>
                <div className="space-y-1 opacity-90 border-t border-white/20 pt-4">
                    <div className="flex justify-between text-xs font-medium">
                        <span>Principal & Interest</span>
                        <span>${results.pAndI.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                    <div className="flex justify-between text-xs font-medium">
                        <span>Taxes & Insurance</span>
                        <span>${(monthlyTax + monthlyIns).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                    </div>
                </div>
              </div>

              <div className="bg-card border rounded-2xl p-4 h-[300px] shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={70} outerRadius={90} paddingAngle={8} dataKey="value" stroke="none">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                        formatter={(val: any) => `$${Number(val).toLocaleString(undefined, {maximumFractionDigits:0})}`}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border p-5 rounded-xl shadow-sm">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Total Interest</p>
                <p className="text-2xl font-black text-rose-500">${results.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
              <div className="bg-card border p-5 rounded-xl shadow-sm">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Loan Principal</p>
                <p className="text-2xl font-black">${loanAmount.toLocaleString()}</p>
              </div>
              <div className="bg-card border p-5 rounded-xl shadow-sm">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Total Payoff</p>
                <p className="text-2xl font-black text-blue-600">${(results.totalInterest + loanAmount).toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPHS AND TABLES */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2"><ChartIcon size={18} className="text-blue-600"/> Payoff Progress</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={annualSchedule} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value / 1000}k`} tick={{ fontSize: 12, fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    formatter={(value: any) => `$${Number(value).toLocaleString(undefined, {maximumFractionDigits:0})}`} 
                  />
                  <Legend verticalAlign="top" height={36} iconType="rect" />
                  <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#3b82f6" strokeWidth={4} dot={false} />
                  <Line type="monotone" dataKey="cumulativeInterest" name="Total Interest Paid" stroke="#f43f5e" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border rounded-2xl overflow-hidden flex flex-col shadow-sm">
            <div className="p-5 border-b flex justify-between items-center bg-secondary/10">
              <h3 className="font-bold flex items-center gap-2 text-sm"><TableIcon size={16} className="text-blue-600"/> Amortization Table</h3>
              <div className="flex bg-secondary p-1 rounded-lg">
                <button onClick={() => setViewMode('annual')} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md transition-all ${viewMode === 'annual' ? 'bg-white shadow-sm text-blue-600' : 'text-muted-foreground'}`}>Yearly</button>
                <button onClick={() => setViewMode('monthly')} className={`px-4 py-1.5 text-[10px] font-black uppercase rounded-md transition-all ${viewMode === 'monthly' ? 'bg-white shadow-sm text-blue-600' : 'text-muted-foreground'}`}>Monthly</button>
              </div>
            </div>
            <div className="flex-grow overflow-auto max-h-[400px]">
              <table className="w-full text-xs">
                <thead className="bg-secondary/50 sticky top-0 backdrop-blur-md">
                  <tr className="text-muted-foreground uppercase font-black">
                    <th className="p-4 text-left font-black">{viewMode === 'annual' ? 'Year' : 'Month'}</th>
                    <th className="p-4 text-left font-black">Interest</th>
                    <th className="p-4 text-left font-black">Principal</th>
                    <th className="p-4 text-left font-black">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-t">
                  {(viewMode === 'annual' ? annualSchedule : results.schedule).map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="p-4 font-bold text-muted-foreground">{viewMode === 'annual' ? row.year : row.month}</td>
                      <td className="p-4 text-rose-500 font-medium">-${row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                      <td className="p-4 text-emerald-600 font-medium">+${row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                      <td className="p-4 font-black text-foreground group-hover:text-blue-600 transition-colors">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 bg-card border rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="text-blue-600" /> Understanding Amortization
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                Amortization is the process of paying off a debt over time through regular installments. In the early years of your mortgage, a larger portion of your monthly payment goes toward **interest**. As the balance decreases, more of your payment is applied to the **principal**.
            </p>
        </div>

        <div className="mt-8">
            <RelatedCalculators calculators={[
                { name: 'Interest Calculator', description: 'Compound interest tools', href:'/calculators/financial/interest-calculator', icon: BarChart3 },
                { name: 'Payment Calculator', description: 'Simple loan payments', href:"/calculators/financial/payment-calculator", icon: TrendingDown },
            ]} />
        </div>
      </section>
    </main>
  )
}