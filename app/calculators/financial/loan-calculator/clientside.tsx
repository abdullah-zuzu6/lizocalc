'use client'

import { useState, useEffect, useMemo } from 'react'
import { RotateCcw, ListFilter, BarChart3, Layers, CheckCircle2, Info } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const compoundOptions = [
  "Annually (APY)","Semi-annually","Quarterly","Monthly (APR)","Semi-monthly","Biweekly","Weekly","Daily","Continuously"
]

const payBackOptions = [
  "Every Day","Every Week","Every 2 Weeks","Every Half Month","Every Month","Every Quarter","Every 6 Months","Every Year"
]

export default function AdvancedLoanCalculator() {
  const relatedCalculators = [
    { name: 'Mortgage Calculator', description: 'Calculate mortgage payments', href: '/calculators/financial/mortgage-calculator', icon: Layers },
    { name: 'Auto Loan', description: 'Auto loan calculator', href: '/calculators/financial/calculators/auto-loan-calculator', icon: ListFilter },
  ]

  // --- States ---
  const [loanType, setLoanType] = useState<'amortized'|'deferred'|'bond'>('amortized')
  const [amount, setAmount] = useState<number|''>('')
  const [dueAmount, setDueAmount] = useState<number|''>('')
  const [currency, setCurrency] = useState('USD')
  const [termYears, setTermYears] = useState(0)
  const [termMonths, setTermMonths] = useState(0)
  const [interest, setInterest] = useState(0)
  const [compound, setCompound] = useState(compoundOptions[0])
  const [payback, setPayback] = useState(payBackOptions[0])
  const [schedule, setSchedule] = useState<any[]>([])
  const [result, setResult] = useState<number|null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // --- Load from cookies ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['loan-calc']?.data) {
      const data = history['loan-calc'].data
      setLoanType(data.loanType||'amortized')
      setAmount(data.amount||'')
      setDueAmount(data.dueAmount||'')
      setCurrency(data.currency||'USD')
      setTermYears(data.termYears||0)
      setTermMonths(data.termMonths||0)
      setInterest(data.interest||0)
      setCompound(data.compound||compoundOptions[0])
      setPayback(data.payback||payBackOptions[0])
    }
  },[])

  // --- Save to cookies ---
  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('loan-calc', {loanType, amount, dueAmount, currency, termYears, termMonths, interest, compound, payback})
    }
  }, [loanType, amount, dueAmount, currency, termYears, termMonths, interest, compound, payback, isMounted])

  // --- Calculation Engine ---
  const frequencyMap: Record<string, number> = {
    "Annually (APY)":1,"Semi-annually":2,"Quarterly":4,"Monthly (APR)":12,
    "Semi-monthly":24,"Biweekly":26,"Weekly":52,"Daily":365,"Continuously":365
  }

  const calculate = () => {
    const totalMonths = termYears*12 + termMonths
    let n = frequencyMap[compound]
    let P = loanType==='bond'?Number(dueAmount):Number(amount)
    let r = interest/100
    let scheduleArr:any[] = []

    if (loanType==='amortized') {
      let periodicRate = r/n
      let numPeriods = totalMonths/12*n
      let payment = P*(periodicRate/(1-Math.pow(1+periodicRate,-numPeriods)))
      for (let i=1;i<=numPeriods;i++){
        let interestPart=P*periodicRate
        let principalPart=payment-interestPart
        P-=principalPart
        scheduleArr.push({period:i,payment,principal:principalPart,interest:interestPart})
      }
      setResult(scheduleArr.reduce((a,b)=>a+b.payment,0))
    } else if (loanType==='deferred'){
      let compounded = P*Math.pow(1+r/n,n*totalMonths/12)
      scheduleArr.push({period:totalMonths,payment:compounded})
      setResult(compounded)
    } else if (loanType==='bond'){
      let compounded = P/Math.pow(1+r/n,n*totalMonths/12)
      scheduleArr.push({period:totalMonths,initialValue:compounded})
      setResult(compounded)
    }

    setSchedule(scheduleArr)
    setShowResults(true)
  }

  if(!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20}/> Parameters
              </h2>

              <div className="flex gap-3 mb-4">
                {['amortized','deferred','bond'].map(t=>(
                  <button key={t} onClick={()=>{setLoanType(t as any); setShowResults(false)}} 
                    className={`px-3 py-2 rounded ${loanType===t?'bg-blue-600 text-white':'bg-secondary'}`}>
                    {t.charAt(0).toUpperCase()+t.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">{loanType==='bond'?'Predetermined Due Amount':'Loan Amount'}</label>
                  <input type="number" value={loanType==='bond'?dueAmount:amount}
                    onChange={(e)=>loanType==='bond'?setDueAmount(Number(e.target.value)):setAmount(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold text-lg"/>
                </div>

                <div>
                  <label className="text-sm font-medium">Currency</label>
                  <select value={currency} onChange={e=>setCurrency(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none transition-all font-bold text-lg">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>PKR</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Years</label>
                    <input type="number" value={termYears} onChange={e=>setTermYears(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"/>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Months</label>
                    <input type="number" value={termMonths} onChange={e=>setTermMonths(Number(e.target.value))}
                      className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Interest Rate (%)</label>
                  <input type="number" value={interest} onChange={e=>setInterest(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"/>
                </div>

                <div>
                  <label className="text-sm font-medium">Compound</label>
                  <select value={compound} onChange={e=>setCompound(e.target.value)}
                    className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold">
                    {compoundOptions.map(c=><option key={c}>{c}</option>)}
                  </select>
                </div>

                {loanType!=='bond' && (
                  <div>
                    <label className="text-sm font-medium">Payback Frequency</label>
                    <select value={payback} onChange={e=>setPayback(e.target.value)}
                      className="w-full mt-1 px-3 py-3 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold">
                      {payBackOptions.map(p=><option key={p}>{p}</option>)}
                    </select>
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-3">
                  <button type="button" onClick={calculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2 hover:bg-blue-700">
                    Calculate <CheckCircle2 size={16}/>
                  </button>
                  <button type="button" onClick={()=>{setAmount('');setDueAmount('');setShowResults(false);setSchedule([]);setResult(null)}}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold flex items-center justify-center gap-2 hover:bg-secondary/80">
                    <RotateCcw size={14}/> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && result!==null ? (
              <div className="bg-card border rounded-xl p-6 overflow-x-auto">
                <h2 className="font-bold mb-4 text-lg text-blue-600">Result ({currency})</h2>
                <p className="text-2xl font-black mb-4">{result.toFixed(2)}</p>
                {schedule.length>0 && (
                  <table className="w-full border-collapse border">
                    <thead className="bg-gray-100">
                      <tr>{Object.keys(schedule[0]).map(k=><th key={k} className="border px-2 py-1">{k}</th>)}</tr>
                    </thead>
                    <tbody>
                      {schedule.map((row,i)=>(
                        <tr key={i}>{Object.values(row).map((v,j)=>
                          <td key={j} className="border px-2 py-1">{v!=null ? (typeof v==='number'?v.toFixed(2):String(v)) : '-'}</td>
                        )}</tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Layers size={48} className="opacity-10 mb-4"/>
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Enter loan parameters and click Calculate</p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  )
}