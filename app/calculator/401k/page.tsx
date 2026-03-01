'use client'

import { useState, useEffect, useMemo } from 'react'
import { PieChart, Wallet, TrendingUp, Landmark,Zap,Calculator, RotateCcw, HelpCircle, Info, DollarSign, List } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

export default function Advanced401kCalculator() {
  const [isMounted, setIsMounted] = useState(false)

  // --- Input States ---
  const [currentAge, setCurrentAge] = useState<number>(30)
  const [retirementAge, setRetirementAge] = useState<number>(65)
  const [currentBalance, setCurrentBalance] = useState<number>(10000)
  const [annualSalary, setAnnualSalary] = useState<number>(75000)
  const [contributionPct, setContributionPct] = useState<number>(6)
  const [employerMatch, setEmployerMatch] = useState<number>(50)
  const [employerLimit, setEmployerLimit] = useState<number>(6)
  const [expectedReturn, setExpectedReturn] = useState<number>(7)
  const [salaryIncrease, setSalaryIncrease] = useState<number>(3)
  const [showTable, setShowTable] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Advanced Calculation Engine ---
  const calculationData = useMemo(() => {
    let totalYears = retirementAge - currentAge
    if (totalYears <= 0) return null

    let balance = currentBalance
    let salary = annualSalary
    let totalContributed = 0
    let totalMatched = 0
    let yearlyLogs = []

    for (let year = 1; year <= totalYears; year++) {
      const userContrib = salary * (contributionPct / 100)
      const matchPossible = salary * (employerLimit / 100)
      const actualMatch = Math.min(userContrib, matchPossible) * (employerMatch / 100)
      const annualAddition = userContrib + actualMatch
      
      const interestEarned = (balance + annualAddition) * (expectedReturn / 100)
      balance = balance + annualAddition + interestEarned
      
      totalContributed += userContrib
      totalMatched += actualMatch
      
      yearlyLogs.push({
        year: new Date().getFullYear() + year,
        age: currentAge + year,
        salary: salary.toFixed(0),
        contribution: userContrib.toFixed(0),
        match: actualMatch.toFixed(0),
        balance: balance.toFixed(0)
      })

      salary *= (1 + salaryIncrease / 100)
    }

    return {
      finalBalance: balance,
      totalContributed,
      totalMatched,
      totalInterest: balance - currentBalance - totalContributed - totalMatched,
      yearlyLogs
    }
  }, [currentAge, retirementAge, currentBalance, annualSalary, contributionPct, employerMatch, employerLimit, expectedReturn, salaryIncrease])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">401(k) <span className="text-primary">PRO</span></h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced retirement projection with employer matching and annual salary growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Inputs with Sliders */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-8 shadow-xl">
              <div className="space-y-8">
                {/* Contribution Slider */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold uppercase tracking-wider opacity-60">Personal Contribution</label>
                    <span className="text-2xl font-black text-primary">{contributionPct}%</span>
                  </div>
                  <input 
                    type="range" min="0" max="30" value={contributionPct} 
                    onChange={(e) => setContributionPct(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                {/* Salary Input */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase opacity-60">Annual Salary</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <input type="number" value={annualSalary} onChange={(e) => setAnnualSalary(Number(e.target.value))} className="w-full pl-7 p-3 bg-muted border-none rounded-xl font-bold" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase opacity-60">Current Age</label>
                    <input type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} className="w-full p-3 bg-muted border-none rounded-xl font-bold" />
                  </div>
                </div>

                {/* Growth & Match Accordion-style areas */}
                <div className="p-5 bg-muted/30 rounded-2xl border border-border space-y-4">
                   <h3 className="font-bold text-sm flex items-center gap-2"><TrendingUp size={16}/> Market & Match Assumptions</h3>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold opacity-50">Expected Return</label>
                        <input type="number" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} className="w-full p-2 bg-background rounded-lg border border-border" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold opacity-50">Salary Increase</label>
                        <input type="number" value={salaryIncrease} onChange={(e) => setSalaryIncrease(Number(e.target.value))} className="w-full p-2 bg-background rounded-lg border border-border" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold opacity-50">Employer Match %</label>
                        <input type="number" value={employerMatch} onChange={(e) => setEmployerMatch(Number(e.target.value))} className="w-full p-2 bg-background rounded-lg border border-border" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase font-bold opacity-50">Match Limit %</label>
                        <input type="number" value={employerLimit} onChange={(e) => setEmployerLimit(Number(e.target.value))} className="w-full p-2 bg-background rounded-lg border border-border" />
                      </div>
                   </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Side: Visual Results */}
          <div className="lg:col-span-7 space-y-6">
            {calculationData && (
              <div className="bg-card rounded-3xl border border-border p-8 shadow-xl h-full flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <span className="text-sm font-bold uppercase text-muted-foreground">Est. Retirement Balance</span>
                    <h2 className="text-6xl font-black text-primary tracking-tighter mt-2">
                      ${calculationData.finalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </h2>
                    <div className="mt-4 flex items-center gap-2 text-green-500 font-bold bg-green-500/10 w-fit px-3 py-1 rounded-full text-xs">
                      <Zap size={14} /> Ready to retire at age {retirementAge}
                    </div>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-sm">
                        <span className="opacity-60">User Contributed</span>
                        <span className="font-bold">${calculationData.totalContributed.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="opacity-60">Company Match</span>
                        <span className="font-bold text-accent">${calculationData.totalMatched.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="opacity-60">Market Earnings</span>
                        <span className="font-bold text-primary">${calculationData.totalInterest.toLocaleString()}</span>
                     </div>
                     <div className="h-2 w-full bg-muted rounded-full flex overflow-hidden mt-4">
                        <div style={{ width: `${(calculationData.totalContributed / calculationData.finalBalance) * 100}%` }} className="bg-foreground" />
                        <div style={{ width: `${(calculationData.totalMatched / calculationData.finalBalance) * 100}%` }} className="bg-accent" />
                        <div style={{ width: `${(calculationData.totalInterest / calculationData.finalBalance) * 100}%` }} className="bg-primary" />
                     </div>
                  </div>
                </div>

                <div className="flex-1 min-h-[200px] flex items-end gap-1">
                    {calculationData.yearlyLogs.filter((_, i) => i % 5 === 0 || i === calculationData.yearlyLogs.length - 1).map((log, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <div 
                                style={{ height: `${(Number(log.balance) / calculationData.finalBalance) * 100}%` }} 
                                className="w-full bg-primary/20 group-hover:bg-primary transition-all rounded-t-sm"
                            />
                            <span className="text-[10px] font-bold opacity-40 uppercase">{log.age}</span>
                        </div>
                    ))}
                </div>

                <button 
                  onClick={() => setShowTable(!showTable)}
                  className="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest py-3 bg-muted rounded-xl hover:bg-border transition-colors"
                >
                  <List size={14} /> {showTable ? 'Hide' : 'Show'} Full Yearly Breakdown
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Yearly Breakdown Table */}
        {showTable && calculationData && (
          <div className="mb-16 overflow-x-auto bg-card rounded-3xl border border-border shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-4 text-xs font-bold uppercase opacity-60">Year (Age)</th>
                  <th className="p-4 text-xs font-bold uppercase opacity-60">Salary</th>
                  <th className="p-4 text-xs font-bold uppercase opacity-60">Contribution</th>
                  <th className="p-4 text-xs font-bold uppercase opacity-60">Employer Match</th>
                  <th className="p-4 text-xs font-bold uppercase opacity-60 text-right">End Balance</th>
                </tr>
              </thead>
              <tbody>
                {calculationData.yearlyLogs.map((log, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold">{log.year} <span className="text-muted-foreground font-normal">({log.age})</span></td>
                    <td className="p-4 text-muted-foreground">${Number(log.salary).toLocaleString()}</td>
                    <td className="p-4 text-muted-foreground">${Number(log.contribution).toLocaleString()}</td>
                    <td className="p-4 text-accent font-medium">${Number(log.match).toLocaleString()}</td>
                    <td className="p-4 text-right font-black text-primary">${Number(log.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* --- Educational Content Section --- */}
        <section className="bg-card rounded-3xl border border-border p-8 md:p-12 shadow-sm">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <HelpCircle className="text-primary" /> Mastering Your 401(k)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-muted-foreground leading-relaxed">
                    <div className="space-y-4">
                        <p>
                            A 401(k) is a powerful retirement tool that leverages <strong>tax-deferred growth</strong>. Unlike a standard savings account, your earnings reinvest automatically, allowing your balance to grow exponentially over decades.
                        </p>
                        

[Image of compound interest vs simple interest graph]

                        <p>
                            The most critical factor is the <strong>Employer Match</strong>. It is essentially a 100% or 50% immediate return on your investment, which no other market vehicle can reliably offer.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-muted/50 p-6 rounded-2xl border border-border">
                            <h4 className="text-foreground font-bold mb-2 flex items-center gap-2"><Info size={18} className="text-primary"/> Pro Tip: The 1% Bump</h4>
                            <p className="text-sm">
                                Increasing your contribution by just 1% today can lead to hundreds of thousands of dollars more in retirement due to the compounding effect over 30+ years.
                            </p>
                        </div>
                        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                            <h4 className="text-primary font-bold mb-2">The Formula</h4>
                            <div className="font-mono text-xs overflow-x-auto py-2">
                                {"Future Value = P(1 + r/n)^{nt} + \text{PMT} \left[ \frac{(1 + r/n)^{nt} - 1}{r/n} \right]"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="mt-16">
          <RelatedCalculators calculators={[
            { name: 'ROI Calculator', description: 'Measure investment gains', href: '/calculator/roi', icon: TrendingUp },
            { name: 'Inflation Calculator', description: 'Future purchasing power', href: '/calculator/inflation', icon: Landmark }
          ]} />
        </div>
      </div>
      <Footer />
    </main>
  )
}