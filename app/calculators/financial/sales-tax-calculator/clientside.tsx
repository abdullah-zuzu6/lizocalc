'use client'

import { useState, useEffect, useMemo } from 'react'
import { Percent, DollarSign, TrendingUp,ShoppingCart, Info, HelpCircle, RotateCcw, CheckCircle2, ListFilter, MapPin } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

const US_STATES = [
  { name: 'California', rate: 7.25 },
  { name: 'New York', rate: 4.0 },
  { name: 'Texas', rate: 6.25 },
  { name: 'Florida', rate: 6.0 },
].sort((a, b) => a.name.localeCompare(b.name))

export default function SalesTaxCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // --- Input States ---
  const [amount, setAmount] = useState<string>('100')
  const [taxRate, setTaxRate] = useState<string>('7.25')
  const [currency, setCurrency] = useState<string>('$')
  const [isInclusive, setIsInclusive] = useState<boolean>(false)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['sales-tax-calc']?.data) {
      const d = history['sales-tax-calc'].data
      setAmount(d.amount); setTaxRate(d.taxRate); setCurrency(d.currency); setIsInclusive(d.isInclusive)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('sales-tax-calc', { amount, taxRate, currency, isInclusive })
    }
  }, [amount, taxRate, currency, isInclusive, isMounted])

  const results = useMemo(() => {
    const pAmount = parseFloat(amount) || 0
    const pRate = parseFloat(taxRate) || 0
    if (isInclusive) {
      const basePrice = pAmount / (1 + pRate / 100)
      return { basePrice: basePrice.toFixed(2), taxAmount: (pAmount - basePrice).toFixed(2), totalAmount: pAmount.toFixed(2), label: 'Original Price' }
    } else {
      const taxAmount = pAmount * (pRate / 100)
      return { basePrice: pAmount.toFixed(2), taxAmount: taxAmount.toFixed(2), totalAmount: (pAmount + taxAmount).toFixed(2), label: 'Total with Tax' }
    }
  }, [amount, taxRate, isInclusive])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-emerald-500" size={20} /> Parameters
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Currency</label>
                    <input className="w-full mt-1 p-3 bg-secondary rounded-md border font-bold" value={currency} onChange={(e) => setCurrency(e.target.value)} maxLength={3} />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Tax Rate %</label>
                    <input className="w-full mt-1 p-3 bg-secondary rounded-md border font-bold" type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
                  </div>
                </div>

                <div>
                    <label className="text-xs font-bold uppercase text-muted-foreground">Amount</label>
                    <input className="w-full mt-1 p-3 bg-secondary rounded-md border font-bold text-lg" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>

                <div className="flex bg-secondary p-1 rounded-md border">
                  <button onClick={() => setIsInclusive(false)} className={`flex-1 py-2 text-xs font-bold rounded ${!isInclusive ? 'bg-emerald-600 text-white' : ''}`}>Add Tax</button>
                  <button onClick={() => setIsInclusive(true)} className={`flex-1 py-2 text-xs font-bold rounded ${isInclusive ? 'bg-emerald-600 text-white' : ''}`}>Remove Tax</button>
                </div>

                <button className="w-full py-3 bg-emerald-600 text-white rounded-md font-bold flex items-center justify-center gap-2 hover:bg-emerald-700">
                  Calculate <CheckCircle2 size={16} />
                </button>
                <button onClick={() => { setAmount('0'); setTaxRate('0') }} className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2">
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border rounded-xl p-8 flex flex-col justify-center">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">{results.label}</p>
                <h3 className="text-5xl font-black text-emerald-600 tracking-tighter mt-2">{currency}{results.totalAmount}</h3>
              </div>
              <div className="bg-card border rounded-xl p-6">
                <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4 tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" /> Breakdown
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-2 bg-secondary/50 rounded-lg"><span className="text-sm font-bold">Net</span> <span className="font-mono font-bold">{currency}{results.basePrice}</span></div>
                  <div className="flex justify-between p-2 bg-secondary/50 rounded-lg"><span className="text-sm font-bold">Tax</span> <span className="font-mono font-bold">{currency}{results.taxAmount}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'VAT Calculator', description: 'Standard European VAT', href: '/calculator/vat', icon: Percent },
          { name: 'Margin Calculator', description: 'Calculate profit margins', href: '/calculator/margin', icon: TrendingUp }
        ]} />
      </section>
    </main>
  )
}