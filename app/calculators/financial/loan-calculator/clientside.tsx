"use client";

import { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  ListFilter, 
  Layers, 
  CheckCircle2, 
  Info, 
  Heart, 
  TrendingUp, 
  Calendar, 
  CircleDollarSign,
  Table as TableIcon
} from 'lucide-react';
import RelatedCalculators from '@/components/RelatedCalculators';
import { 
  getCalculatorHistory, 
  saveCalculatorHistory, 
  getSavedCalculators, 
  toggleSavedCalculator 
} from '@/lib/storage';

const compoundOptions = [
  "Annually (APY)", "Semi-annually", "Quarterly", "Monthly (APR)", "Semi-monthly", "Biweekly", "Weekly", "Daily", "Continuously"
];

const payBackOptions = [
  "Every Day", "Every Week", "Every 2 Weeks", "Every Half Month", "Every Month", "Every Quarter", "Every 6 Months", "Every Year"
];

export default function AdvancedLoanCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // --- States ---
  const [loanType, setLoanType] = useState<'amortized' | 'deferred' | 'bond'>('amortized');
  const [amount, setAmount] = useState<number | ''>('');
  const [dueAmount, setDueAmount] = useState<number | ''>('');
  const [currency, setCurrency] = useState('USD');
  const [termYears, setTermYears] = useState(0);
  const [termMonths, setTermMonths] = useState(0);
  const [interest, setInterest] = useState(0);
  const [compound, setCompound] = useState(compoundOptions[0]);
  const [payback, setPayback] = useState(payBackOptions[0]);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [result, setResult] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Advanced Loan Calculator",
    href: "/calculators/financial/loan-calculator",
    category: "Financial",
  };

  // --- Load from Cookies ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();
    if (history['loan-calc']?.data) {
      const data = history['loan-calc'].data;
      setLoanType(data.loanType || 'amortized');
      setAmount(data.amount || '');
      setDueAmount(data.dueAmount || '');
      setCurrency(data.currency || 'USD');
      setTermYears(data.termYears || 0);
      setTermMonths(data.termMonths || 0);
      setInterest(data.interest || 0);
      setCompound(data.compound || compoundOptions[0]);
      setPayback(data.payback || payBackOptions[0]);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const frequencyMap: Record<string, number> = {
    "Annually (APY)": 1, "Semi-annually": 2, "Quarterly": 4, "Monthly (APR)": 12,
    "Semi-monthly": 24, "Biweekly": 26, "Weekly": 52, "Daily": 365, "Continuously": 365
  };

  const calculate = () => {
    const totalMonths = termYears * 12 + termMonths;
    if (totalMonths <= 0) return;

    let n = frequencyMap[compound];
    let P = loanType === 'bond' ? Number(dueAmount) : Number(amount);
    let r = interest / 100;
    let scheduleArr: any[] = [];

    if (loanType === 'amortized') {
      let periodicRate = r / n;
      let numPeriods = (totalMonths / 12) * n;
      let payment = P * (periodicRate / (1 - Math.pow(1 + periodicRate, -numPeriods)));
      
      let remainingBalance = P;
      for (let i = 1; i <= Math.round(numPeriods); i++) {
        let interestPart = remainingBalance * periodicRate;
        let principalPart = payment - interestPart;
        remainingBalance -= principalPart;
        scheduleArr.push({
          period: i,
          payment: payment,
          principal: principalPart,
          interest: interestPart,
          balance: Math.max(0, remainingBalance)
        });
      }
      setResult(scheduleArr.reduce((a, b) => a + b.payment, 0));
    } else if (loanType === 'deferred') {
      let compounded = P * Math.pow(1 + r / n, n * (totalMonths / 12));
      scheduleArr.push({ period: totalMonths, payment: compounded });
      setResult(compounded);
    } else if (loanType === 'bond') {
      let compounded = P / Math.pow(1 + r / n, n * (totalMonths / 12));
      scheduleArr.push({ period: totalMonths, initialValue: compounded });
      setResult(compounded);
    }

    setSchedule(scheduleArr);
    setShowResults(true);

    saveCalculatorHistory('loan-calc', { loanType, amount, dueAmount, currency, termYears, termMonths, interest, compound, payback });
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-[2rem] border p-6 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm" : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={20} /> Parameters
              </h2>

              <div className="flex p-1 bg-secondary rounded-xl mb-6">
                {['amortized', 'deferred', 'bond'].map(t => (
                  <button key={t} onClick={() => { setLoanType(t as any); setShowResults(false); }}
                    className={`flex-1 py-2 text-[10px] font-black uppercase tracking-tighter rounded-lg transition-all ${
                      loanType === t ? 'bg-white text-blue-600 shadow-sm' : 'text-muted-foreground'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">
                    {loanType === 'bond' ? 'Predetermined Due Amount' : 'Loan Amount'}
                  </label>
                  <div className="relative">
                    <input type="number" value={loanType === 'bond' ? dueAmount : amount}
                      onChange={(e) => loanType === 'bond' ? setDueAmount(Number(e.target.value)) : setAmount(Number(e.target.value))}
                      className="w-full p-4 bg-secondary rounded-xl border-none font-black text-2xl outline-none focus:ring-2 ring-blue-500/20 pr-16" />
                    <span className="absolute right-4 top-5 text-xs font-bold text-muted-foreground">{currency}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Years</label>
                    <input type="number" value={termYears} onChange={e => setTermYears(Number(e.target.value))}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Months</label>
                    <input type="number" value={termMonths} onChange={e => setTermMonths(Number(e.target.value))}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Interest (%)</label>
                    <input type="number" value={interest} onChange={e => setInterest(Number(e.target.value))}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none text-blue-600" />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Currency</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none appearance-none cursor-pointer">
                      <option>USD</option><option>EUR</option><option>PKR</option><option>GBP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">Compounding</label>
                  <select value={compound} onChange={e => setCompound(e.target.value)}
                    className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none appearance-none cursor-pointer">
                    {compoundOptions.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div className="pt-4 space-y-3">
                  <button type="button" onClick={calculate}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all">
                    Calculate <CheckCircle2 size={18} />
                  </button>
                  <button type="button" onClick={() => { setAmount(''); setDueAmount(''); setShowResults(false); setSchedule([]); setResult(null); }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-secondary/80">
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && result !== null ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-blue-600 text-white rounded-[2.5rem] p-10 shadow-xl relative overflow-hidden">
                  <CircleDollarSign className="absolute -right-4 -bottom-4 w-40 h-40 opacity-10" />
                  <p className="text-[10px] font-black uppercase opacity-70 tracking-[0.3em]">Total Outlay</p>
                  <h2 className="text-7xl font-black my-4 tracking-tighter">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} <span className="text-xl font-medium opacity-70">{currency}</span>
                  </h2>
                  <div className="flex gap-4 mt-6">
                    <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm text-xs font-bold capitalize">
                      {loanType} Mode
                    </div>
                    <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm text-xs font-bold">
                      {termYears}Y {termMonths}M
                    </div>
                  </div>
                </div>

                {schedule.length > 0 && loanType === 'amortized' && (
                  <div className="bg-card border rounded-[2rem] p-6 shadow-sm overflow-hidden">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-6 tracking-widest flex items-center gap-2">
                      <TableIcon size={14} className="text-blue-500" /> Amortization Schedule
                    </h3>
                    <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                      <table className="w-full text-left">
                        <thead className="sticky top-0 bg-card border-b text-[10px] font-black uppercase text-muted-foreground">
                          <tr>
                            <th className="pb-4 px-2">Prd.</th>
                            <th className="pb-4 px-2">Payment</th>
                            <th className="pb-4 px-2">Principal</th>
                            <th className="pb-4 px-2">Interest</th>
                            <th className="pb-4 px-2">Balance</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm font-bold divide-y divide-secondary/50">
                          {schedule.map((row, i) => (
                            <tr key={i} className="hover:bg-secondary/20 transition-colors">
                              <td className="py-3 px-2 text-muted-foreground">{row.period}</td>
                              <td className="py-3 px-2">{row.payment.toFixed(2)}</td>
                              <td className="py-3 px-2 text-emerald-600">{row.principal.toFixed(2)}</td>
                              <td className="py-3 px-2 text-amber-500">{row.interest.toFixed(2)}</td>
                              <td className="py-3 px-2 font-black">{row.balance.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[500px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Layers size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Configure parameters and click Calculate
                </p>
              </div>
            )}
            
            <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-600">
                <Info size={20} /> About Loan Types
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div>
                  <p className="font-black uppercase text-[10px] mb-2">Amortized</p>
                  <p className="text-muted-foreground leading-relaxed">Regular periodic payments consisting of both principal and interest.</p>
                </div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-2">Deferred</p>
                  <p className="text-muted-foreground leading-relaxed">Single payment at the end of the term including all compounded interest.</p>
                </div>
                <div>
                  <p className="font-black uppercase text-[10px] mb-2">Bond/Zero-Coupon</p>
                  <p className="text-muted-foreground leading-relaxed">Determines the current value needed to reach a specific future amount.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: 'Mortgage Calculator', description: 'Calculate mortgage payments', href: '/calculators/financial/mortgage-calculator', icon: Layers },
          { name: 'Auto Loan', description: 'Auto loan calculator', href: '/calculators/financial/auto-loan-calculator', icon: ListFilter },
        ]} />
      </section>
    </main>
  );
}