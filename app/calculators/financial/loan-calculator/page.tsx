'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { Info, TrendingDown, BarChart3, PieChart as PieIcon, Calendar as TableIcon } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

type LoanType = 'amortized' | 'deferred' | 'bond'

export default function AdvancedLoanCalculator() {
  const [activeTab, setActiveTab] = useState<LoanType>('amortized')
  const [principal, setPrincipal] = useState<number>(100000)
  const [interestRate, setInterestRate] = useState<number>(5.5)
  const [years, setYears] = useState<number>(10)
  const [months, setMonths] = useState<number>(0)
  const [compounding, setCompounding] = useState<number>(12) 
  const [payFrequency, setPayFrequency] = useState<number>(12) 
  const [showSchedule, setShowSchedule] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const COLORS = ['#3b82f6', '#ef4444']

  // FAQ and Related Calculators Data (Fixed missing variables)
  const faqItems = [
    {
      question: 'How is an amortized loan different from a bond?',
      answer: 'An amortized loan is paid back in regular installments (like a mortgage), while a bond usually involves paying back a lump sum at maturity.',
    },
    {
      question: 'What does compounding frequency mean?',
      answer: 'It is how often interest is calculated and added to the principal. More frequent compounding (like daily) increases the total interest compared to annual compounding.',
    }
  ]

  const relatedCalculators = [
    { name: 'Mortgage Calculator', description: 'Calculate home loan payments', href: '/calculator/mortgage', icon: BarChart3 },
    { name: 'Auto Loan Calculator', description: 'Calculate vehicle financing', href: '/calculator/auto-loan', icon: TrendingDown },
  ]

  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['adv-loan']?.data) {
      const d = history['adv-loan'].data
      setPrincipal(d.principal); setInterestRate(d.interestRate); setYears(d.years)
    }
  }, [])

  useEffect(() => {
    if (isMounted && getConsentPreference()?.functional) {
      saveCalculatorHistory('adv-loan', { principal, interestRate, years })
    }
  }, [principal, interestRate, years, isMounted])

  const totalMonths = useMemo(() => years * 12 + months, [years, months])

  const results = useMemo(() => {
    const r = interestRate / 100
    const t = totalMonths / 12 || 0.0001 // prevent division by zero
    const n = compounding
    
    const effectiveRate = Math.pow(1 + r / n, n / payFrequency) - 1
    const totalPeriods = (totalMonths / 12) * payFrequency

    if (activeTab === 'amortized') {
      const periodicPayment = effectiveRate === 0 
        ? principal / (totalPeriods || 1) 
        : (principal * effectiveRate) / (1 - Math.pow(1 + effectiveRate, -totalPeriods))
      const totalPay = periodicPayment * totalPeriods
      return {
        mainValue: periodicPayment.toFixed(2),
        totalInterest: (totalPay - principal).toFixed(2),
        totalPayment: totalPay.toFixed(2),
        chartData: [{ name: 'Principal', value: principal }, { name: 'Interest', value: Math.max(0, totalPay - principal) }]
      }
    } else if (activeTab === 'deferred') {
      const maturityValue = principal * Math.pow(1 + r / n, n * t)
      return {
        mainValue: maturityValue.toFixed(2),
        totalInterest: (maturityValue - principal).toFixed(2),
        totalPayment: maturityValue.toFixed(2),
        chartData: [{ name: 'Principal', value: principal }, { name: 'Interest', value: maturityValue - principal }]
      }
    } else {
      const initialReceived = principal / Math.pow(1 + r / n, n * t)
      return {
        mainValue: initialReceived.toFixed(2),
        totalInterest: (principal - initialReceived).toFixed(2),
        totalPayment: principal.toFixed(2),
        chartData: [{ name: 'Initial Value', value: initialReceived }, { name: 'Interest Discount', value: principal - initialReceived }]
      }
    }
  }, [activeTab, principal, interestRate, totalMonths, compounding, payFrequency])

  const schedule = useMemo(() => {
    if (!showSchedule || activeTab !== 'amortized') return []
    const data = []
    let balance = principal
    const pRate = (interestRate / 100) / 12
    const mPay = Number(results.mainValue)

    for (let i = 1; i <= Math.min(totalMonths, 600); i++) {
      const interest = balance * pRate
      const principalPaid = mPay - interest
      balance -= principalPaid
      data.push({ period: i, payment: mPay, principal: principalPaid, interest: interest, balance: Math.max(0, balance) })
    }
    return data
  }, [showSchedule, activeTab, principal, totalMonths, interestRate, results.mainValue])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Advanced Loan Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate amortized payments, deferred maturity values, or bond discounts.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 bg-muted p-1 rounded-xl">
          {(['amortized', 'deferred', 'bond'] as LoanType[]).map((type) => (
            <button
              key={type}
              onClick={() => { setActiveTab(type); setShowSchedule(false); }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all capitalize ${
                activeTab === type ? 'bg-background text-primary shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {type} Loan
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-3">
                {activeTab === 'bond' ? 'Due Amount at Maturity' : 'Loan Amount'}: ${principal.toLocaleString()}
              </label>
              <input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-semibold mb-2">Years</label><input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" /></div>
              <div><label className="block text-sm font-semibold mb-2">Months</label><input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full px-4 py-2 bg-background border border-border rounded-lg" /></div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-3">Interest Rate: {interestRate}%</label>
              <input type="range" min="0" max="25" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full h-2 bg-border rounded-lg appearance-none accent-primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2 text-xs">Compounding</label>
                <select value={compounding} onChange={(e) => setCompounding(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm">
                  <option value={1}>Annually (APY)</option>
                  <option value={4}>Quarterly</option>
                  <option value={12}>Monthly (APR)</option>
                  <option value={365}>Daily</option>
                </select>
              </div>
              {activeTab === 'amortized' && (
                <div>
                  <label className="block font-semibold mb-2 text-xs">Frequency</label>
                  <select value={payFrequency} onChange={(e) => setPayFrequency(Number(e.target.value))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm">
                    <option value={52}>Weekly</option>
                    <option value={12}>Monthly</option>
                    <option value={1}>Yearly</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <p className="text-muted-foreground text-sm mb-1 capitalize">{activeTab} Value</p>
                  <p className="text-4xl font-bold text-primary">${results.mainValue}</p>
                  <div className="mt-4 space-y-1">
                    <p className="text-sm">Interest: <span className="font-semibold text-accent">${results.totalInterest}</span></p>
                    <p className="text-sm">Total: <span className="font-semibold">${results.totalPayment}</span></p>
                  </div>
                </div>
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart><Pie data={results.chartData} innerRadius={25} outerRadius={45} paddingAngle={5} dataKey="value">
                      {results.chartData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie><Tooltip /></PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <button onClick={() => setShowSchedule(!showSchedule)} className="w-full mt-6 py-3 px-4 bg-background border border-border rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                <TableIcon className="w-4 h-4" /> {showSchedule ? 'Hide' : 'View'} Schedule
              </button>
            </div>
          </div>
        </div>

        {showSchedule && activeTab === 'amortized' && (
          <div className="bg-card rounded-2xl border border-border overflow-hidden mb-12">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Period</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Principal</th>
                    <th className="px-6 py-4">Interest</th>
                    <th className="px-6 py-4">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {schedule.map((row) => (
                    <tr key={row.period} className="hover:bg-muted/30">
                      <td className="px-6 py-4 font-medium">{row.period}</td>
                      <td className="px-6 py-4">${row.payment.toFixed(2)}</td>
                      <td className="px-6 py-4 text-primary">${row.principal.toFixed(2)}</td>
                      <td className="px-6 py-4 text-accent">${row.interest.toFixed(2)}</td>
                      <td className="px-6 py-4 font-semibold">${row.balance.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          <div className="flex gap-3 mb-4">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
            <h3 className="font-semibold text-lg">Detailed Loan Analysis</h3>
          </div>
          <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
            <p>
              The mathematical model used depends on the loan structure. For Amortized Loans, we use the standard time-value-of-money formula to calculate periodic payments based on principal, rate, and total periods.
            </p>
            <div className="bg-muted p-4 rounded-lg text-center font-mono">
              {/* Note: Standard text instead of LaTeX to avoid JSX errors */}
              Payment = [ r * PV ] / [ 1 - (1 + r)^-n ]
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
        <FAQ items={faqItems} title="Advanced Loan FAQ" />
      </div>
      <Footer />
    </main>
  )
}