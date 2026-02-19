'use client'

import { useState, useMemo } from 'react'

export default function MortgageCalculator() {

  const [homePrice, setHomePrice] = useState(540000)
  const [downPercent, setDownPercent] = useState(20)
  const [years, setYears] = useState(30)
  const [rate, setRate] = useState(6.016)

  const [propertyTax, setPropertyTax] = useState(1.2)
  const [insurance, setInsurance] = useState(1500)
  const [pmi, setPmi] = useState(0)
  const [hoa, setHoa] = useState(0)
  const [otherCost, setOtherCost] = useState(4000)

  const downPayment = (homePrice * downPercent) / 100
  const loanAmount = homePrice - downPayment

  const monthlyRate = rate / 100 / 12
  const payments = years * 12

  const monthlyMortgage = useMemo(() => {
    if (monthlyRate === 0) return loanAmount / payments
    return loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, payments)) /
      (Math.pow(1 + monthlyRate, payments) - 1)
  }, [loanAmount, monthlyRate, payments])

  const monthlyTax = (homePrice * (propertyTax / 100)) / 12
  const monthlyInsurance = insurance / 12
  const monthlyPMI = pmi / 12
  const monthlyHOA = hoa / 12
  const monthlyOther = otherCost / 12

  const totalMonthly = monthlyMortgage + monthlyTax + monthlyInsurance + monthlyPMI + monthlyHOA + monthlyOther

  const totalMortgagePayments = monthlyMortgage * payments
  const totalInterest = totalMortgagePayments - loanAmount

  // Amortization schedule (yearly)
  const amortization = []
  let balance = loanAmount

  for (let year = 1; year <= years; year++) {
    let interestYear = 0
    let principalYear = 0

    for (let m = 1; m <= 12; m++) {
      const interest = balance * monthlyRate
      const principal = monthlyMortgage - interest
      balance -= principal

      interestYear += interest
      principalYear += principal
    }

    amortization.push({
      year,
      interest: interestYear,
      principal: principalYear,
      balance: balance > 0 ? balance : 0
    })
  }

  return (
    <main className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
      <p className="mb-6">
        The Mortgage Calculator helps estimate the monthly payment due along with other financial costs associated with mortgages.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* INPUTS */}
        <div className="border p-4 rounded space-y-3">

          <label>Home Price</label>
          <input type="number" value={homePrice} onChange={e => setHomePrice(+e.target.value)} className="w-full border p-1"/>

          <label>Down Payment (%)</label>
          <input type="number" value={downPercent} onChange={e => setDownPercent(+e.target.value)} className="w-full border p-1"/>

          <label>Loan Term (years)</label>
          <input type="number" value={years} onChange={e => setYears(+e.target.value)} className="w-full border p-1"/>

          <label>Interest Rate (%)</label>
          <input type="number" step="0.001" value={rate} onChange={e => setRate(+e.target.value)} className="w-full border p-1"/>

          <h3 className="font-bold mt-4">Annual Tax & Cost</h3>

          <label>Property Taxes (%)</label>
          <input type="number" value={propertyTax} onChange={e => setPropertyTax(+e.target.value)} className="w-full border p-1"/>

          <label>Home Insurance ($)</label>
          <input type="number" value={insurance} onChange={e => setInsurance(+e.target.value)} className="w-full border p-1"/>

          <label>PMI Insurance ($)</label>
          <input type="number" value={pmi} onChange={e => setPmi(+e.target.value)} className="w-full border p-1"/>

          <label>HOA Fee ($)</label>
          <input type="number" value={hoa} onChange={e => setHoa(+e.target.value)} className="w-full border p-1"/>

          <label>Other Costs ($)</label>
          <input type="number" value={otherCost} onChange={e => setOtherCost(+e.target.value)} className="w-full border p-1"/>
        </div>

        {/* RESULTS */}
        <div className="border p-4 rounded space-y-2 bg-gray-50">

          <h2 className="text-xl font-bold text-green-700">
            Monthly Pay: ${totalMonthly.toFixed(2)}
          </h2>

          <table className="w-full border mt-2">
            <tbody>
              <tr><td>Mortgage Payment</td><td>${monthlyMortgage.toFixed(2)}</td><td>${totalMortgagePayments.toFixed(2)}</td></tr>
              <tr><td>Property Tax</td><td>${monthlyTax.toFixed(2)}</td><td>${(monthlyTax * payments).toFixed(2)}</td></tr>
              <tr><td>Home Insurance</td><td>${monthlyInsurance.toFixed(2)}</td><td>${(monthlyInsurance * payments).toFixed(2)}</td></tr>
              <tr><td>Other Costs</td><td>${monthlyOther.toFixed(2)}</td><td>${(monthlyOther * payments).toFixed(2)}</td></tr>
              <tr className="font-bold"><td>Total Out-of-Pocket</td><td>${totalMonthly.toFixed(2)}</td><td>${(totalMonthly * payments).toFixed(2)}</td></tr>
            </tbody>
          </table>

          <div className="mt-4 space-y-1">
            <p>House Price: ${homePrice.toLocaleString()}</p>
            <p>Loan Amount: ${loanAmount.toLocaleString()}</p>
            <p>Down Payment: ${downPayment.toLocaleString()}</p>
            <p>Total of {payments} Mortgage Payments: ${totalMortgagePayments.toLocaleString()}</p>
            <p>Total Interest: ${totalInterest.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Amortization */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-2">Amortization Schedule (Yearly)</h2>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>Year</th>
              <th>Interest</th>
              <th>Principal</th>
              <th>Ending Balance</th>
            </tr>
          </thead>
          <tbody>
            {amortization.map((row, i) => (
              <tr key={i}>
                <td className="border p-1">{row.year}</td>
                <td className="border p-1">${row.interest.toFixed(0)}</td>
                <td className="border p-1">${row.principal.toFixed(0)}</td>
                <td className="border p-1">${row.balance.toFixed(0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Content text from calculator.net */}
      <section className="mt-8 space-y-4 text-sm">

        <h2 className="font-bold">Mortgages</h2>
        <p>
          A mortgage is a loan secured by property, usually real estate. The buyer agrees to repay the money borrowed over time with interest.
        </p>

        <h2 className="font-bold">Mortgage Calculator Components</h2>
        <p>
          Loan amount, down payment, loan term, and interest rate are the main components used to calculate a mortgage.
        </p>

        <h2 className="font-bold">Costs Associated with Home Ownership</h2>
        <p>
          Property taxes, home insurance, HOA fees, and maintenance costs are important recurring expenses.
        </p>

        <h2 className="font-bold">Early Repayment</h2>
        <p>
          Making extra payments can reduce interest and shorten the loan term.
        </p>

      </section>

    </main>
  )
}
