'use client'

import { useState, useEffect } from 'react'
import { Info, RotateCcw, Car, CheckCircle2, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function AutoLoanCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000)
  const [downPayment, setDownPayment] = useState<number>(6000)
  const [interestRate, setInterestRate] = useState<number>(6.5)
  const [loanTerm, setLoanTerm] = useState<number>(5)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['auto-loan-calc']?.data) {
      const d = history['auto-loan-calc'].data
      setVehiclePrice(d.vehiclePrice); setDownPayment(d.downPayment)
      setInterestRate(d.interestRate); setLoanTerm(d.loanTerm)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('auto-loan-calc', { vehiclePrice, downPayment, interestRate, loanTerm })
    }
  }, [vehiclePrice, downPayment, interestRate, loanTerm, isMounted])

  // --- Calculation Engine ---
  const principal = Math.max(0, vehiclePrice - downPayment)
  const monthlyRate = interestRate / 100 / 12
  const numberOfPayments = loanTerm * 12
  
  const monthlyPayment = monthlyRate === 0 
    ? principal / numberOfPayments 
    : (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  
  const totalPaid = monthlyPayment * numberOfPayments
  const totalInterest = Math.max(0, totalPaid - principal)

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Car className="text-blue-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: "Vehicle Price", val: vehiclePrice, set: setVehiclePrice, min: 5000, max: 100000 },
                  { label: "Down Payment", val: downPayment, set: setDownPayment, min: 0, max: vehiclePrice },
                  { label: "Interest Rate (%)", val: interestRate, set: setInterestRate, min: 0, max: 25, step: 0.1 },
                  { label: "Loan Term (Years)", val: loanTerm, set: setLoanTerm, min: 1, max: 10 }
                ].map((item, i) => (
                  <div key={i}>
                    <label className="text-sm font-medium">{item.label}</label>
                    <input type="range" min={item.min} max={item.max} step={item.step || 1000} value={item.val} 
                           onChange={(e) => item.set(Number(e.target.value))} className="w-full mt-2 accent-blue-600" />
                    <input type="number" value={item.val} onChange={(e) => item.set(Number(e.target.value))} 
                           className="w-full mt-2 px-3 py-2 bg-secondary rounded-md border text-lg font-bold" />
                  </div>
                ))}

                <button onClick={() => { setVehiclePrice(30000); setDownPayment(6000); setInterestRate(6.5); setLoanTerm(5) }}
                        className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset Defaults
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Monthly Payment', val: monthlyPayment, color: 'text-blue-600' },
                { label: 'Total Interest', val: totalInterest, color: 'text-amber-600' },
                { label: 'Total Paid', val: totalPaid, color: 'text-emerald-600' }
              ].map((res, i) => (
                <div key={i} className="bg-card border rounded-xl p-6 flex flex-col justify-center text-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{res.label}</p>
                  <h3 className={`text-3xl font-black ${res.color} mt-2`}>${res.val.toLocaleString(undefined, {maximumFractionDigits: 2})}</h3>
                </div>
              ))}
            </div>

            <div className="bg-card border rounded-xl p-6">
              <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 flex items-center gap-2">
                <TrendingUp size={14} /> Loan Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between p-2 bg-secondary/50 rounded-lg"><span className="text-sm font-bold">Principal Amount</span> <span className="font-mono font-bold">${principal.toLocaleString()}</span></div>
                <div className="flex justify-between p-2 bg-secondary/50 rounded-lg"><span className="text-sm font-bold">Loan Duration</span> <span className="font-mono font-bold">{numberOfPayments} months</span></div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Loan Calculator', description: 'Personal loan payments', href: '/calculator/loan', icon: DollarSign },
          { name: 'Mortgage Calculator', description: 'Home financing', href: '/calculator/mortgage', icon: Calendar }
        ]} />
      </section>
    </main>
  )
}