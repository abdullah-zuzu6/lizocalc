'use client'

import { useState, useEffect } from 'react'
import { CreditCard, Zap, Plus, Minus, Calculator, RotateCcw, HelpCircle, BarChart3, Info } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import RelatedCalculators from '@/components/RelatedCalculators'

// Define the type for a single credit card input
interface CreditCardRow {
  id: number
  name: string
  balance: string
  minPayment: string
  interestRate: string
}

export default function CreditCardPayoffCalculator() {
  const [isMounted, setIsMounted] = useState(false)
  
  // State to hold the dynamically added card rows
  const [cards, setCards] = useState<CreditCardRow[]>([
    { id: 1, name: 'Card 1', balance: '2000', minPayment: '100', interestRate: '18' },
    { id: 2, name: 'Card 2', balance: '1000', minPayment: '50', interestRate: '22' }
  ])

  // Result state
  const [results, setCalculatedResults] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Helper functions to manage rows
  const addCardRow = () => {
    const nextId = cards.length === 0 ? 1 : Math.max(...cards.map(c => c.id)) + 1
    const nextNum = cards.length + 1
    setCards([...cards, { id: nextId, name: `Card ${nextNum}`, balance: '', minPayment: '', interestRate: '' }])
  }

  const removeCardRow = (id: number) => {
    setCards(cards.filter(card => card.id !== id))
  }

  const updateCardInput = (id: number, field: keyof CreditCardRow, value: string) => {
    setCards(cards.map(card => card.id === id ? { ...card, [field]: value } : card))
  }

  // --- Calculation Logic ---
  const handleCalculate = () => {
    const parsedCards = cards.filter(c => c.balance && c.interestRate).map(c => ({
        ...c,
        balanceNum: parseFloat(c.balance),
        rateNum: parseFloat(c.interestRate) / 100 / 12,
        minPaymentNum: parseFloat(c.minPayment) || (parseFloat(c.balance) * 0.03)
    }));

    if (parsedCards.length === 0) return;

    let totalBalance = parsedCards.reduce((sum, c) => sum + c.balanceNum, 0);
    const totalMinPayment = parsedCards.reduce((sum, c) => sum + c.minPaymentNum, 0);
    let tempCards = parsedCards.map(c => ({ ...c }));
    
    let totalInterest = 0;
    let months = 0;

    while (totalBalance > 1 && months < 360) {
        months++;
        totalBalance = 0;
        tempCards.forEach(card => {
            if (card.balanceNum > 0) {
                const interest = card.balanceNum * card.rateNum;
                totalInterest += interest;
                let payment = Math.min(card.balanceNum + interest, totalMinPayment / tempCards.filter(c=>c.balanceNum > 0).length); 
                card.balanceNum = (card.balanceNum + interest) - payment;
                totalBalance += card.balanceNum;
            }
        });
    }

    const totalPaid = parsedCards.reduce((sum, c) => sum + parseFloat(c.balance), 0) + totalInterest;

    setCalculatedResults({
      months,
      totalPaid: totalPaid.toFixed(2),
      interest: totalInterest.toFixed(2),
      balance: parsedCards.reduce((sum, c) => sum + parseFloat(c.balance), 0).toFixed(2)
    })
  }

  const relatedCalcs = [
    { name: 'Personal Loan Calculator', description: 'Estimate monthly loan payments', href: '/calculator/personal-loan', icon: CreditCard },
    { name: 'Debt Consolidation Calculator', description: 'Consolidate multiple debts', href: '/calculator/debt-consolidation', icon: Zap }
  ]

  if (!isMounted) return null

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Credit Cards Payoff Calculator</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">Input multiple card balances to find the fastest way to become debt-free.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Card Input Table */}
          <div className="xl:col-span-8 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <h2 className="text-2xl font-bold flex items-center gap-3 text-primary">
                <BarChart3 className="w-7 h-7" /> Card Information
              </h2>
              <button 
                onClick={addCardRow}
                className="text-xs bg-muted text-foreground flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-muted/80 font-semibold"
              >
                <Plus size={14} /> Add Card
              </button>
            </div>

            <div className="space-y-3">
              {cards.map((card) => (
                <div key={card.id} className="grid grid-cols-12 gap-2 p-3 bg-muted rounded-xl items-center border border-border">
                  <div className="col-span-12 md:col-span-3">
                    <input 
                      type="text" value={card.name} placeholder="Card Name" 
                      onChange={(e) => updateCardInput(card.id, 'name', e.target.value)}
                      className="w-full p-2.5 bg-background border border-border rounded-lg"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-3 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold opacity-30">$</span>
                    <input 
                      type="number" value={card.balance} placeholder="Balance" 
                      onChange={(e) => updateCardInput(card.id, 'balance', e.target.value)}
                      className="w-full p-2.5 pl-8 bg-background border border-border rounded-lg"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-3 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold opacity-30">$</span>
                    <input 
                      type="number" value={card.minPayment} placeholder="Min. Payment" 
                      onChange={(e) => updateCardInput(card.id, 'minPayment', e.target.value)}
                      className="w-full p-2.5 pl-8 bg-background border border-border rounded-lg"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-2 relative">
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold opacity-30">%</span>
                    <input 
                      type="number" step="0.1" value={card.interestRate} placeholder="Rate" 
                      onChange={(e) => updateCardInput(card.id, 'interestRate', e.target.value)}
                      className="w-full p-2.5 pr-8 bg-background border border-border rounded-lg text-center"
                    />
                  </div>
                  <div className="col-span-12 md:col-span-1 flex justify-center">
                    <button onClick={() => removeCardRow(card.id)} className="p-2 text-destructive/50 hover:text-destructive hover:bg-destructive/10 rounded-lg">
                      <Minus size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-6 mt-6 border-t border-border">
              <button onClick={handleCalculate} className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-95">
                Generate Payoff Schedule <Zap size={18} />
              </button>
              <button onClick={() => setCards([{ id: 1, name: 'Card 1', balance: '', minPayment: '', interestRate: '' }])} className="px-5 py-4 bg-muted text-muted-foreground rounded-xl flex items-center justify-center hover:bg-muted/80">
                <RotateCcw size={20} />
              </button>
            </div>
          </div>

          {/* Right Side: Results Panel */}
          <div className="xl:col-span-4 space-y-8">
            {results ? (
              <div className="bg-card rounded-2xl border-l-4 border-l-destructive border border-border p-8 shadow-sm">
                <div className="mb-6">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Payoff in</p>
                  <h3 className="text-4xl font-extrabold text-foreground">{results.months} <span className="text-lg font-normal">Months</span></h3>
                </div>

                <div className="p-4 bg-muted/40 rounded-xl space-y-2 border border-border mb-6">
                    <p className="text-sm">Total Principal: <span className="font-bold text-lg">${results.balance}</span></p>
                    <p className="text-sm">Total Interest Paid: <span className="font-bold text-lg text-destructive">${results.interest}</span></p>
                    <p className="text-sm border-t border-border pt-2">Grand Total: <span className="font-bold text-lg">${results.totalPaid}</span></p>
                </div>
                
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                    Simulation assumes all minimum payments are met.
                </p>
              </div>
            ) : (
                <div className="h-full border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center p-8 text-center text-muted-foreground space-y-3 bg-card shadow-inner">
                    <Calculator size={48} className="opacity-20" />
                    <p className="font-medium text-sm">Enter card details to generate your payoff plan.</p>
                </div>
            )}

            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex flex-col sm:flex-row gap-4 items-start">
                <Info size={32} className="text-primary mt-1 shrink-0" />
                <div className='flex-1'>
                    <h4 className="text-sm font-bold mb-1 text-foreground">Payoff Strategies</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        The **Avalanche** method saves the most interest by targeting high APR cards first. The **Snowball** method builds momentum by clearing small balances first.
                    </p>
                </div>
            </div>
          </div>
        </div>

        {/* Informational Content for SEO */}
        <div className="mt-16 bg-card rounded-2xl border border-border p-8 md:p-10 shadow-sm leading-relaxed text-sm sm:text-base text-muted-foreground space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
            <HelpCircle className="text-primary" /> Why Use a Payoff Calculator?
          </h2>
          <p>
            A structured payoff plan is vital for reducing interest costs. This tool provides a roadmap for acceleration by visualizing total interest vs. principal balance.
          </p>
          
          

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-disc pl-5">
            <li>Consolidate debts into a clear, unified view.</li>
            <li>Compare payoff times between strategies.</li>
            <li>Visualize total interest cost.</li>
            <li>Understand the long-term impact of APR.</li>
          </ul>

          {/* Corrected Formula Section */}
          <div className="mt-8 p-6 bg-muted rounded-xl text-center font-mono overflow-x-auto text-xs sm:text-sm">
             {"Payoff Timeline = f(Balance, Rate, Minimums) + Strategy(Extra Payments)"}
          </div>
          
        </div>

        <RelatedCalculators calculators={relatedCalcs} />
      </div>
      <Footer />
    </main>
  )
}