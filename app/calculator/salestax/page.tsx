'use client'

import { useState, useEffect, useMemo } from 'react'
import { Percent, DollarSign, ShoppingCart, Info, HelpCircle, RotateCcw, ChevronDown, CheckCircle2, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// 2026 Estimated State Sales Tax Rates
const US_STATES = [
  { name: 'California', rate: 7.25 },
  { name: 'New York', rate: 4.0 },
  { name: 'Texas', rate: 6.25 },
  { name: 'Florida', rate: 6.0 },
  { name: 'Illinois', rate: 6.25 },
  { name: 'Pennsylvania', rate: 6.0 },
  { name: 'Ohio', rate: 5.75 },
  { name: 'North Carolina', rate: 4.75 },
  { name: 'Washington', rate: 6.5 },
  { name: 'Massachusetts', rate: 6.25 },
].sort((a, b) => a.name.localeCompare(b.name))

export default function SalesTaxCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // --- Input States ---
  const [amount, setAmount] = useState<string>('100')
  const [taxRate, setTaxRate] = useState<string>('7.25')
  const [isInclusive, setIsInclusive] = useState<boolean>(false) // false = Add tax, true = Remove tax

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // --- Calculation Engine ---
  const results = useMemo(() => {
    const pAmount = parseFloat(amount) || 0
    const pRate = parseFloat(taxRate) || 0
    
    if (isInclusive) {
      // Logic: Price includes tax, find base price
      // Base = Total / (1 + rate)
      const basePrice = pAmount / (1 + pRate / 100)
      const taxAmount = pAmount - basePrice
      return {
        basePrice: basePrice.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalAmount: pAmount.toFixed(2),
        label: 'Original Price'
      }
    } else {
      // Logic: Price is pre-tax, add tax on top
      // Total = Base * (1 + rate)
      const taxAmount = pAmount * (pRate / 100)
      const totalAmount = pAmount + taxAmount
      return {
        basePrice: pAmount.toFixed(2),
        taxAmount: taxAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
        label: 'Total with Tax'
      }
    }
  }, [amount, taxRate, isInclusive])

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Sales Tax Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Quickly calculate sales tax amounts, total costs, or reverse-calculate the pre-tax price of an item.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Controls */}
          <div className="lg:col-span-7 space-y-6">
            <section className="bg-card rounded-3xl border border-border p-6 md:p-10 shadow-sm">
              <div className="space-y-8">
                
                {/* Mode Switcher */}
                <div className="flex bg-muted p-1.5 rounded-2xl border border-border">
                  <button 
                    onClick={() => setIsInclusive(false)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${!isInclusive ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  >
                    Add Tax (Exclusive)
                  </button>
                  <button 
                    onClick={() => setIsInclusive(true)}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${isInclusive ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground'}`}
                  >
                    Remove Tax (Inclusive)
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <DollarSign size={14} className="text-primary" /> {isInclusive ? 'Total Price' : 'Net Amount'}
                    </label>
                    <input 
                      type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                      className="w-full p-4 bg-muted border-none rounded-2xl text-2xl font-bold focus:ring-2 ring-primary/20 outline-none"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black uppercase text-muted-foreground flex items-center gap-2">
                      <Percent size={14} className="text-primary" /> Tax Rate (%)
                    </label>
                    <input 
                      type="number" step="0.01" value={taxRate} onChange={(e) => setTaxRate(e.target.value)}
                      className="w-full p-4 bg-muted border-none rounded-2xl text-2xl font-bold focus:ring-2 ring-primary/20 outline-none"
                    />
                  </div>
                </div>

                {/* State Quick Picker */}
                <div className="pt-4 border-t border-border">
                   <p className="text-[10px] font-bold uppercase text-muted-foreground mb-3 tracking-widest">Select US State (2026 Est.)</p>
                   <div className="flex flex-wrap gap-2">
                      {US_STATES.map((state) => (
                        <button 
                          key={state.name}
                          onClick={() => setTaxRate(state.rate.toString())}
                          className="px-3 py-1.5 bg-muted/50 border border-border rounded-lg text-xs font-medium hover:bg-primary/10 hover:border-primary/30 transition-all"
                        >
                          {state.name} ({state.rate}%)
                        </button>
                      ))}
                   </div>
                </div>

                <button 
                  onClick={() => {setAmount('0'); setTaxRate('0');}}
                  className="w-full flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  <RotateCcw size={16} /> Reset Form
                </button>
              </div>
            </section>
          </div>

          {/* Right Side: Results */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary rounded-3xl p-8 text-primary-foreground shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute -top-10 -right-10 opacity-10">
                <ShoppingCart size={240} />
              </div>
              
              <div className="relative z-10 space-y-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest opacity-70">{results.label}</span>
                  <h3 className="text-6xl font-black mt-2">${results.totalAmount}</h3>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium opacity-80">Net Amount</span>
                    <span className="text-xl font-bold">${results.basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium opacity-80">Tax ({taxRate}%)</span>
                    <span className="text-xl font-bold">${results.taxAmount}</span>
                  </div>
                </div>

                <div className="bg-white/10 p-4 rounded-2xl flex items-start gap-3">
                   <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                   <p className="text-xs leading-relaxed">
                     Your calculation is ready. This is an estimate based on {taxRate}% tax. Local surcharges may apply.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Educational Content --- */}
        <section className="mt-16 bg-card rounded-3xl border border-border p-8 md:p-12 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Info className="text-primary" /> Inclusive vs. Exclusive Tax
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Tax-Exclusive (Add Tax):</strong> This is common in the United States and Canada. The price on the tag is the "net" price, and sales tax is added at the register.
                </p>
                <div className="p-4 bg-muted rounded-xl font-mono text-xs">
                  {"Total = Net Price \times (1 + Tax Rate)"}
                </div>
                <p>
                  <strong>Tax-Inclusive (Remove Tax):</strong> Common in the UK (VAT), Australia (GST), and Europe. The price you see is the final price. This calculator helps business owners "back out" the tax for accounting.
                </p>
                <div className="p-4 bg-muted rounded-xl font-mono text-xs">
                  {"Net Price = Total Price / (1 + Tax Rate)"}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <HelpCircle className="text-primary" /> FAQ
              </h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">Why is my total slightly different at the store?</h4>
                  <p className="text-sm text-muted-foreground">Many cities and counties add their own local taxes (0.5% – 3%) on top of the state-wide rate. This calculator provides the state base, but you can manually enter your specific local rate for precision.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-foreground">What items are usually tax-exempt?</h4>
                  <p className="text-sm text-muted-foreground">In many jurisdictions, essential goods like groceries, prescription medicine, and sometimes clothing are exempt from sales tax or taxed at a lower rate.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedCalculators calculators={[
          { name: 'VAT Calculator', description: 'Standard European VAT tool', href: '/calculator/vat', icon: Percent },
          { name: 'Margin Calculator', description: 'Calculate profit margins', href: '/calculator/margin', icon: TrendingUp }
        ]} />
      </div>
      <Footer />
    </main>
  )
}