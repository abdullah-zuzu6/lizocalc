'use client'

import { useState, useMemo, useEffect } from 'react'
import { Home, DollarSign, BarChart3,TrendingDown, Table as TableIcon, LineChart as ChartIcon } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts'
import RelatedCalculators from '@/components/RelatedCalculators'


import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function AdvancedMortgageCalculator() {
  const relatedCalculators = [
    { name: 'Interest Calculator ', description: ' Calculate compound interest', href:'/calculators/financial/interest-calculator', icon: BarChart3 },
    { name: 'Payment Calculator', description: ' Calculate your payments',  href:"/calculators/financial/payment-calculator", icon: TrendingDown },
    { name: 'Loan Calculator', description: '   Calculate personal loan payments',  href:"/calculators/financial/loan-calculator", icon: TrendingDown },
  ]

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

  const [isMounted, setIsMounted] = useState(false)
  const [viewMode, setViewMode] = useState<'annual' | 'monthly'>('annual')
  const [showAdvanced, setShowAdvanced] = useState(false)

  // --- COOKIE LOGIC ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['mortgage-adv']?.data) {
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
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('mortgage-adv', { 
        homePrice, downPayment, downPaymentPercent, rate, years,
        propertyTax, homeInsurance, hoa, otherCosts, extraMonthly 
      })
    }
  }, [homePrice, downPayment, rate, years, propertyTax, homeInsurance, hoa, otherCosts, extraMonthly, isMounted])

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
    { name: 'P & I', value: results.pAndI, color: '#EAB308' }, // Yellow
    { name: 'Property Tax', value: monthlyTax, color: '#2563EB' }, // Blue
    { name: 'Home Insurance', value: monthlyIns, color: '#EF4444' }, // Red
    { name: 'Other Costs', value: hoa + otherCosts, color: '#22C55E' }, // Green
  ]

  const annualSchedule = useMemo(() => {
    const yearsArr: any[] = []
    results.schedule.forEach((m, i) => {
      const yearIdx = Math.floor(i / 12)
      if (!yearsArr[yearIdx]) yearsArr[yearIdx] = { year: yearIdx + 1, interest: 0, principal: 0, balance: 0, cumulativeInterest: 0, cumulativePaid: 0 }
      yearsArr[yearIdx].interest += m.interest
      yearsArr[yearIdx].principal += m.principal
      yearsArr[yearIdx].balance = m.balance
      yearsArr[yearIdx].cumulativeInterest = m.cumulativeInterest
      yearsArr[yearIdx].cumulativePaid = m.cumulativePaid
    })
    return yearsArr
  }, [results.schedule])

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* <Navbar /> */}

      {/* <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex items-center gap-3 mb-6 mt-4">
            <div className="p-3 rounded-lg bg-blue-600/10">
              <Home className="w-8 h-8 text-blue-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Advanced Mortgage Calculator</h1>
          </div>
        </div>
      </section> */}

      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUTS PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">Parameters</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Home Price ($)</label>
                  <input type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Down Pay ($)</label>
                    <input type="number" value={downPayment} onChange={(e) => handleDownPaymentChange(Number(e.target.value), false)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Down Pay (%)</label>
                    <input type="number" value={downPaymentPercent} onChange={(e) => handleDownPaymentChange(Number(e.target.value), true)} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Rate (%)</label>
                    <input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Term (Yrs)</label>
                    <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border" />
                  </div>
                </div>

                <button onClick={() => setShowAdvanced(!showAdvanced)} className="text-blue-500 text-sm font-bold">
                  {showAdvanced ? '– Fewer Options' : '+ Show Taxes & Extra Pay'}
                </button>

                {showAdvanced && (
                  <div className="space-y-4 pt-4 border-t animate-in fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div><label className="text-xs">Annual Tax</label><input type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} className="w-full px-2 py-1 bg-secondary border rounded" /></div>
                      <div><label className="text-xs">Annual Ins.</label><input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(Number(e.target.value))} className="w-full px-2 py-1 bg-secondary border rounded" /></div>
                    </div>
                    <div><label className="text-xs">Extra Monthly Payment</label><input type="number" value={extraMonthly} onChange={(e) => setExtraMonthly(Number(e.target.value))} className="w-full px-2 py-1 bg-secondary border rounded" /></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* TOP RESULTS DASHBOARD */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-6 flex flex-col justify-center min-w-0">
                <p className="text-muted-foreground text-center">Monthly Payment</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-blue-600 text-center my-4 break-all px-2">
                  ${monthlyTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </h2>
              </div>

              <div className="bg-card border rounded-xl p-4 h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-secondary/30 p-4 rounded-lg border min-w-0">
                <p className="text-xs text-muted-foreground uppercase font-bold">Total Interest</p>
                <p className="text-xl font-bold break-all text-red-500">${results.totalInterest.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg border min-w-0">
                <p className="text-xs text-muted-foreground uppercase font-bold">Loan Amount</p>
                <p className="text-xl font-bold break-all">${loanAmount.toLocaleString()}</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg border min-w-0">
                <p className="text-xs text-muted-foreground uppercase font-bold">Total Cost</p>
                <p className="text-xl font-bold break-all">${(results.totalInterest + loanAmount).toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </div>
        </div>

        {/* LOWER SECTION: GRAPH + SCHEDULE */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* AMORTIZATION GRAPH */}
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2"><ChartIcon size={18}/> Amortization Graph</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={annualSchedule} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString(undefined, {maximumFractionDigits:0})}`} />
                  <Legend verticalAlign="top" height={36}/>
                  <Line type="monotone" dataKey="balance" name="Balance" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="cumulativeInterest" name="Interest" stroke="#84cc16" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="cumulativePaid" name="Payment" stroke="#991b1b" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AMORTIZATION TABLE */}
          <div className="bg-card border rounded-xl overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-secondary/10">
              <h3 className="font-bold flex items-center gap-2"><TableIcon size={18}/> Schedule</h3>
              <div className="flex gap-2">
                <button onClick={() => setViewMode('annual')} className={`px-3 py-1 text-xs rounded transition ${viewMode === 'annual' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Annual</button>
                <button onClick={() => setViewMode('monthly')} className={`px-3 py-1 text-xs rounded transition ${viewMode === 'monthly' ? 'bg-blue-600 text-white' : 'bg-secondary'}`}>Monthly</button>
              </div>
            </div>
            <div className="flex-grow overflow-auto max-h-[400px]">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 sticky top-0 backdrop-blur-sm">
                  <tr>
                    <th className="p-3 text-left">{viewMode === 'annual' ? 'Year' : 'Month'}</th>
                    <th className="p-3 text-left">Interest</th>
                    <th className="p-3 text-left">Principal</th>
                    <th className="p-3 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {(viewMode === 'annual' ? annualSchedule : results.schedule).map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/10 transition-colors">
                      <td className="p-3 font-medium">{viewMode === 'annual' ? row.year : row.month}</td>
                      <td className="p-3 text-red-500">-${row.interest.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                      <td className="p-3 text-green-600">+${row.principal.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                      <td className="p-3 font-bold">${row.balance.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
         <RelatedCalculators calculators={relatedCalculators} />
      </section>

   
    </main>
  )
}