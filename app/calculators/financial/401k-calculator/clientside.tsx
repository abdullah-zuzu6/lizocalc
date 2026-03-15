"use client";

import { useState, useEffect, useMemo } from "react";
import {
  RotateCcw,
  Layers,
  CheckCircle2,
  BarChart3,
  ListFilter,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

export default function Advanced401kDashboard() {
  const relatedCalculators = [
    {
      name: "Interest Calculator",
      description: "Calculate compound interest",
      href: "/calculators/financial/interest-calculator",
      icon: BarChart3,
    },
    {
      name: "ROI Calculator",
      description: "Measure investment returns",
      href: "/calculators/roi",
      icon: BarChart3,
    },
  ];

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);

  /* Inputs */
  const [currency, setCurrency] = useState("USD");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [balance, setBalance] = useState("");
  const [contribution, setContribution] = useState("");
  const [match, setMatch] = useState("");
  const [matchLimit, setMatchLimit] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [lifeExpectancy, setLifeExpectancy] = useState("");
  const [salaryIncrease, setSalaryIncrease] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [inflation, setInflation] = useState("");

  /* Cookie Load */
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    if (consent?.functional && history["401k-calc"]?.data) {
      const d = history["401k-calc"].data;

      setCurrency(d.currency || "USD");
      setAge(d.age || "");
      setSalary(d.salary || "");
      setBalance(d.balance || "");
      setContribution(d.contribution || "");
      setMatch(d.match || "");
      setMatchLimit(d.matchLimit || "");
      setRetirementAge(d.retirementAge || "");
      setLifeExpectancy(d.lifeExpectancy || "");
      setSalaryIncrease(d.salaryIncrease || "");
      setReturnRate(d.returnRate || "");
      setInflation(d.inflation || "");
    }
  }, []);

  /* Cookie Save */
  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("401k-calc", {
        currency,
        age,
        salary,
        balance,
        contribution,
        match,
        matchLimit,
        retirementAge,
        lifeExpectancy,
        salaryIncrease,
        returnRate,
        inflation,
      });
    }
  }, [
    currency,
    age,
    salary,
    balance,
    contribution,
    match,
    matchLimit,
    retirementAge,
    lifeExpectancy,
    salaryIncrease,
    returnRate,
    inflation,
    isMounted,
  ]);

  /* Validation */
  const validateInputs = () => {
    const allFilled =
      age &&
      salary &&
      balance &&
      contribution &&
      match &&
      matchLimit &&
      retirementAge &&
      lifeExpectancy &&
      salaryIncrease &&
      returnRate &&
      inflation;

    if (!allFilled) return false;

    const numericFields = [
      Number(age),
      Number(salary),
      Number(balance),
      Number(contribution),
      Number(match),
      Number(matchLimit),
      Number(retirementAge),
      Number(lifeExpectancy),
      Number(salaryIncrease),
      Number(returnRate),
      Number(inflation),
    ];

    if (numericFields.some((v) => isNaN(v) || v < 0)) return false;

    if (Number(age) >= Number(retirementAge)) return false;

    return true;
  };

  /* Calculation */
  const results = useMemo(() => {
    if (trigger === 0) return null;

    const currentAge = Number(age);
    const retireAge = Number(retirementAge);
    const years = retireAge - currentAge;

    if (years <= 0) return null;

    let currentSalary = Number(salary);
    let currentBalance = Number(balance);

    let totalUser = 0;
    let totalEmployer = 0;
    let yearlyBalances: { age: number; balance: number }[] = [];

    for (let i = 0; i < years; i++) {
      const userContribution = currentSalary * (Number(contribution) / 100);
      const maxMatch = currentSalary * (Number(matchLimit) / 100);
      const employerMatch =
        Math.min(userContribution, maxMatch) * (Number(match) / 100);

      totalUser += userContribution;
      totalEmployer += employerMatch;

      const annualInvestment = userContribution + employerMatch;
      const growth =
        (currentBalance + annualInvestment) * (Number(returnRate) / 100);

      currentBalance = currentBalance + annualInvestment + growth;

      yearlyBalances.push({ age: currentAge + i + 1, balance: currentBalance });

      currentSalary *= 1 + Number(salaryIncrease) / 100;
    }

    const inflationAdjusted =
      currentBalance / (1 + Number(inflation) / 100) ** years;

    return {
      finalBalance: Math.round(currentBalance),
      inflationAdjusted: Math.round(inflationAdjusted),
      totalUser: Math.round(totalUser),
      totalEmployer: Math.round(totalEmployer),
      investmentGrowth: Math.round(currentBalance - totalUser - totalEmployer),
      years,
      yearlyBalances,
    };
  }, [trigger]);

  const handleCalculate = () => {
    if (!validateInputs()) {
      alert("Please fill all fields correctly and ensure age < retirement age");
      return;
    }

    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* PARAMETERS PANEL */}
          <div className="lg:col-span-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* BASIC INFO */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase text-muted-foreground">
                    Basic Info
                  </h3>
                  <input
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Age e.g. 25"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={salary}
                    onChange={(e) => {
                      setSalary(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Annual Salary e.g. 70000"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={balance}
                    onChange={(e) => {
                      setBalance(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Current Balance e.g. 45000"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={contribution}
                    onChange={(e) => {
                      setContribution(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Contribution (% of salary)"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={match}
                    onChange={(e) => {
                      setMatch(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Employer match %"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={matchLimit}
                    onChange={(e) => {
                      setMatchLimit(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Employer match limit %"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                </div>

                {/* PROJECTIONS */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase text-muted-foreground">
                    Projections
                  </h3>
                  <input
                    value={retirementAge}
                    onChange={(e) => {
                      setRetirementAge(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Retirement Age e.g. 65"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={lifeExpectancy}
                    onChange={(e) => {
                      setLifeExpectancy(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Life Expectancy e.g. 85"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={salaryIncrease}
                    onChange={(e) => {
                      setSalaryIncrease(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Salary Increase %"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={returnRate}
                    onChange={(e) => {
                      setReturnRate(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Return Rate %"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                  <input
                    value={inflation}
                    onChange={(e) => {
                      setInflation(e.target.value);
                      setShowResults(false);
                    }}
                    placeholder="Inflation %"
                    className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="mt-4">
                <input
                  value={currency}
                  maxLength={3}
                  onChange={(e) => setCurrency(e.target.value.toUpperCase())}
                  placeholder="Currency (USD, PKR)"
                  className="w-full px-3 py-3 bg-secondary rounded-md border font-bold"
                />
              </div>

              {/* Buttons */}
              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={handleCalculate}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-bold flex items-center justify-center gap-2"
                >
                  Calculate <CheckCircle2 size={16} />
                </button>

                <button
                  onClick={() => {
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-6 space-y-6">
            {showResults && results ? (
              <div className="bg-card border rounded-xl p-6 text-center">
                <p className="text-xs uppercase text-muted-foreground">
                  Estimated Retirement Balance
                </p>

                <h2 className="text-5xl font-black text-blue-600 my-4">
                  {currency} {results.finalBalance.toLocaleString()}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Inflation Adjusted Value:{" "}
                  <strong>
                    {currency} {results.inflationAdjusted.toLocaleString()}
                  </strong>
                </p>

                <div className="mt-4 text-left">
                  <h3 className="font-bold mb-2">Contribution Breakdown</h3>
                  <p>Your Contributions: {currency} {results.totalUser.toLocaleString()}</p>
                  <p>Employer Contributions: {currency} {results.totalEmployer.toLocaleString()}</p>
                  <p>Investment Growth: {currency} {results.investmentGrowth.toLocaleString()}</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-2">Yearly Growth (for chart)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="px-2 py-1 border">Age</th>
                          <th className="px-2 py-1 border">Balance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.yearlyBalances.map((y) => (
                          <tr key={y.age}>
                            <td className="px-2 py-1 border">{y.age}</td>
                            <td className="px-2 py-1 border">{currency} {y.balance.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
                <Layers size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Enter parameters and click calculate
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}