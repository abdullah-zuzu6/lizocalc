'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Zap, Plus, Minus, RotateCcw,Calculator, Info, ListFilter, CheckCircle2, DollarSign, Percent } from 'lucide-react'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

interface CreditCardRow {
  id: number
  name: string
  balance: string
  minPayment: string
  interestRate: string
}

export default function CreditCardPayoffCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  const [cards, setCards] = useState<CreditCardRow[]>([
    { id: 1, name: 'Card 1', balance: '2000', minPayment: '100', interestRate: '18' },
    { id: 2, name: 'Card 2', balance: '1000', minPayment: '50', interestRate: '22' }
  ])
  const [results, setCalculatedResults] = useState<any>(null)

  // --- Cookie Logic ---
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    if (consent?.functional && history['cc-payoff']?.data) {
      setCards(history['cc-payoff'].data.cards)
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('cc-payoff', { cards })
    }
  }, [cards, isMounted])

  const addCardRow = () => {
    const nextId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1
    setCards([...cards, { id: nextId, name: `Card ${cards.length + 1}`, balance: '', minPayment: '', interestRate: '' }])
  }

  const removeCardRow = (id: number) => setCards(cards.filter(c => c.id !== id))

  const updateCardInput = (id: number, field: keyof CreditCardRow, value: string) => {
    setCards(cards.map(c => c.id === id ? { ...c, [field]: value } : c))
  }

  const handleCalculate = () => {
    const parsedCards = cards.filter(c => c.balance && c.interestRate).map(c => ({
      ...c,
      balanceNum: parseFloat(c.balance),
      rateNum: parseFloat(c.interestRate) / 100 / 12,
      minPaymentNum: parseFloat(c.minPayment) || (parseFloat(c.balance) * 0.03)
    }))

    if (parsedCards.length === 0) return

    let totalBalance = parsedCards.reduce((sum, c) => sum + c.balanceNum, 0)
    const totalMinPayment = parsedCards.reduce((sum, c) => sum + c.minPaymentNum, 0)
    let tempCards = parsedCards.map(c => ({ ...c }))
    let totalInterest = 0
    let months = 0

    while (totalBalance > 1 && months < 360) {
      months++
      totalBalance = 0
      tempCards.forEach(card => {
        if (card.balanceNum > 0) {
          const interest = card.balanceNum * card.rateNum
          totalInterest += interest
          let payment = Math.min(card.balanceNum + interest, totalMinPayment / tempCards.filter(c => c.balanceNum > 0).length)
          card.balanceNum = (card.balanceNum + interest) - payment
          totalBalance += card.balanceNum
        }
      })
    }

    setCalculatedResults({
      months,
      totalPaid: (parsedCards.reduce((sum, c) => sum + parseFloat(c.balance), 0) + totalInterest).toFixed(2),
      interest: totalInterest.toFixed(2),
      balance: parsedCards.reduce((sum, c) => sum + parseFloat(c.balance), 0).toFixed(2)
    })
  }

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-red-500" size={20} /> Card Information
              </h2>
              
              <div className="space-y-3">
                {cards.map((card) => (
                  <div key={card.id} className="grid grid-cols-12 gap-2 p-3 bg-secondary/30 rounded-lg border border-border items-center">
                    <input className="col-span-3 p-2 bg-background border rounded" value={card.name} placeholder="Name" onChange={(e) => updateCardInput(card.id, 'name', e.target.value)} />
                    <input className="col-span-3 p-2 bg-background border rounded" type="number" value={card.balance} placeholder="Balance ($)" onChange={(e) => updateCardInput(card.id, 'balance', e.target.value)} />
                    <input className="col-span-3 p-2 bg-background border rounded" type="number" value={card.minPayment} placeholder="Min Pmt ($)" onChange={(e) => updateCardInput(card.id, 'minPayment', e.target.value)} />
                    <input className="col-span-2 p-2 bg-background border rounded" type="number" value={card.interestRate} placeholder="Rate (%)" onChange={(e) => updateCardInput(card.id, 'interestRate', e.target.value)} />
                    <button className="col-span-1 p-2 text-red-500 hover:bg-red-50 rounded" onClick={() => removeCardRow(card.id)}><Minus size={16} /></button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 pt-6">
                <button onClick={addCardRow} className="px-4 py-2 bg-secondary text-xs font-bold rounded hover:bg-secondary/80 flex items-center gap-2">
                  <Plus size={14} /> Add Card
                </button>
                <button onClick={handleCalculate} className="flex-1 py-2 bg-red-600 text-white rounded font-bold text-sm hover:bg-red-700 flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Calculate Payoff
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-4 space-y-6">
            {results ? (
              <div className="bg-card border rounded-xl p-8 shadow-sm">
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-1">Payoff Timeline</p>
                <h3 className="text-5xl font-black text-red-600 tracking-tighter mb-6">{results.months} <span className="text-xl font-normal text-foreground">Months</span></h3>
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total Principal</span> <span className="font-bold">${results.balance}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted-foreground">Interest Paid</span> <span className="font-bold text-red-600">${results.interest}</span></div>
                  <div className="flex justify-between text-lg border-t pt-4 font-bold"><span>Grand Total</span> <span>${results.totalPaid}</span></div>
                </div>
              </div>
            ) : (
              <div className="h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <Calculator className="opacity-20 mb-2" size={48} />
                <p className="text-sm">Enter your debt details and click calculate to view your plan.</p>
              </div>
            )}
            
            <div className="bg-secondary/20 rounded-xl p-6 border">
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><Info size={16} className="text-red-500"/> Strategy Tip</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the <strong>Avalanche method</strong> (prioritizing high-interest cards) to minimize total interest paid, or the <strong>Snowball method</strong> for quicker psychological wins.
              </p>
            </div>
          </div>
        </div>
        
        <RelatedCalculators calculators={[
          { name: 'Personal Loan', description: 'Monthly payment estimation', href: '/calculator/personal-loan', icon: CreditCard },
          { name: 'Consolidation', description: 'Debt merging options', href: '/calculator/debt-consolidation', icon: Zap }
        ]} />
      </section>
    </main>
  )
}