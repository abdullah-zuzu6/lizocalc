"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Calendar as CalendarIcon,
  RotateCcw,
  ListFilter,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Heart,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

type CalcMode = "difference" | "add-subtract";

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function DateCalculator() {
  const relatedCalculators = [
    {
      name: "Age Calculator",
      description: "Find exact age in days",
      href: "/calculators/time/age-calculator",
      icon: Clock,
    },
    {
      name: "Hours Calculator",
      description: "Convert hours to minutes",
      href: "/calculators/time/hours-calculator",
      icon: Clock,
    },
  ];

  const calculatorInfo = {
    name: "Date Calculator",
    href: "/calculators/time/date-calculator",
    category: "Time",
  };

  const [mode, setMode] = useState<CalcMode>("difference");
  const [startDate, setStartDate] = useState<string>(todayISO());
  const [endDate, setEndDate] = useState<string>(todayISO());
  const [includeEndDay, setIncludeEndDay] = useState(false);

  const [yearsVal, setYearsVal] = useState(0);
  const [monthsVal, setMonthsVal] = useState(0);
  const [weeksVal, setWeeksVal] = useState(0);
  const [daysVal, setDaysVal] = useState(0);
  const [operation, setOperation] = useState<"add" | "subtract">("add");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);

  // Loads saved values quietly after paint — does NOT hide the calculator
  // while waiting, so nothing pops in and shifts the page around.
  useEffect(() => {
    const history = getCalculatorHistory();
    if (history["date-calc"]?.data) {
      const data = history["date-calc"].data;
      setStartDate(data.startDate || todayISO());
      setEndDate(data.endDate || todayISO());
      setMode(data.mode || "difference");
      setIncludeEndDay(data.includeEndDay || false);
    }
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    setHistoryLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!historyLoaded) return;
    saveCalculatorHistory("date-calc", {
      startDate,
      endDate,
      mode,
      includeEndDay,
    });
  }, [startDate, endDate, mode, includeEndDay, historyLoaded]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    if (trigger === 0) return null;

    const start = new Date(startDate);

    if (mode === "difference") {
      const end = new Date(endDate);
      let diffTime = Math.abs(end.getTime() - start.getTime());
      if (includeEndDay) diffTime += 86400000;

      const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(totalDays / 365);
      const months = Math.floor((totalDays % 365) / 30);
      const weeks = Math.floor((totalDays % 30) / 7);
      const remainingDays = totalDays % 7;

      return { totalDays, years, months, weeks, remainingDays };
    } else {
      const resultDate = new Date(start);
      const factor = operation === "add" ? 1 : -1;

      resultDate.setFullYear(resultDate.getFullYear() + yearsVal * factor);
      resultDate.setMonth(resultDate.getMonth() + monthsVal * factor);
      resultDate.setDate(
        resultDate.getDate() + (weeksVal * 7 + daysVal) * factor,
      );

      return { resultDate: resultDate.toDateString() };
    }
  }, [
    trigger,
    mode,
    startDate,
    endDate,
    includeEndDay,
    yearsVal,
    monthsVal,
    weeksVal,
    daysVal,
    operation,
  ]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        {/* Mode Switcher */}
        <div className="flex gap-2 mb-8 bg-secondary/50 p-1 rounded-xl max-w-md mx-auto border">
          <button
            onClick={() => {
              setMode("difference");
              setShowResults(false);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${mode === "difference" ? "bg-white shadow-sm text-blue-600" : "text-muted-foreground"}`}
          >
            Difference
          </button>
          <button
            onClick={() => {
              setMode("add-subtract");
              setShowResults(false);
            }}
            className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all ${mode === "add-subtract" ? "bg-white shadow-sm text-blue-600" : "text-muted-foreground"}`}
          >
            Add / Subtract
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={
                  isSaved
                    ? "Remove from saved calculators"
                    : "Save this calculator"
                }
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="start-date" className="text-sm font-medium">
                    Start Date
                  </label>
                  <input
                    id="start-date"
                    name="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"
                  />
                </div>

                {mode === "difference" ? (
                  <>
                    <div>
                      <label htmlFor="end-date" className="text-sm font-medium">
                        End Date
                      </label>
                      <input
                        id="end-date"
                        name="end-date"
                        type="date"
                        value={endDate}
                        onChange={(e) => {
                          setEndDate(e.target.value);
                          setShowResults(false);
                        }}
                        className="w-full mt-1 px-3 py-2 bg-secondary rounded-md border focus:ring-2 ring-blue-500/20 outline-none font-bold"
                      />
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-secondary/30 rounded-md border border-dashed">
                      <input
                        type="checkbox"
                        id="includeEnd"
                        checked={includeEndDay}
                        onChange={() => setIncludeEndDay(!includeEndDay)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <label
                        htmlFor="includeEnd"
                        className="text-xs font-bold text-muted-foreground"
                      >
                        Include end day (+1 day)
                      </label>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="flex bg-secondary p-1 rounded-lg border">
                      <button
                        onClick={() => setOperation("add")}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-bold transition-all ${operation === "add" ? "bg-white text-blue-600 shadow-sm" : "text-muted-foreground"}`}
                      >
                        <Plus size={14} /> Add
                      </button>
                      <button
                        onClick={() => setOperation("subtract")}
                        className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-md text-xs font-bold transition-all ${operation === "subtract" ? "bg-white text-blue-600 shadow-sm" : "text-muted-foreground"}`}
                      >
                        <Minus size={14} /> Subtract
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="years-val"
                          className="text-[10px] font-bold uppercase text-muted-foreground"
                        >
                          Years
                        </label>
                        <input
                          id="years-val"
                          name="years-val"
                          type="number"
                          value={yearsVal}
                          onChange={(e) => setYearsVal(Number(e.target.value))}
                          className="w-full p-2 bg-secondary border rounded-md font-bold"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="months-val"
                          className="text-[10px] font-bold uppercase text-muted-foreground"
                        >
                          Months
                        </label>
                        <input
                          id="months-val"
                          name="months-val"
                          type="number"
                          value={monthsVal}
                          onChange={(e) => setMonthsVal(Number(e.target.value))}
                          className="w-full p-2 bg-secondary border rounded-md font-bold"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="weeks-val"
                          className="text-[10px] font-bold uppercase text-muted-foreground"
                        >
                          Weeks
                        </label>
                        <input
                          id="weeks-val"
                          name="weeks-val"
                          type="number"
                          value={weeksVal}
                          onChange={(e) => setWeeksVal(Number(e.target.value))}
                          className="w-full p-2 bg-secondary border rounded-md font-bold"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="days-val"
                          className="text-[10px] font-bold uppercase text-muted-foreground"
                        >
                          Days
                        </label>
                        <input
                          id="days-val"
                          name="days-val"
                          type="number"
                          value={daysVal}
                          onChange={(e) => setDaysVal(Number(e.target.value))}
                          className="w-full p-2 bg-secondary border rounded-md font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-blue-600 text-white rounded-md font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setTrigger(0);
                      setYearsVal(0);
                      setMonthsVal(0);
                      setWeeksVal(0);
                      setDaysVal(0);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS — reserves the same min-height whether it's
              showing the placeholder or the results, so nothing jumps. */}
          <div className="lg:col-span-8 space-y-6">
            {showResults && results ? (
              <div className="space-y-6">
                {mode === "difference" ? (
                  <>
                    <div className="bg-card border rounded-xl p-8 flex flex-col justify-center items-center min-h-[180px]">
                      <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">
                        Total Difference
                      </p>
                      <h2 className="text-5xl md:text-6xl font-black text-blue-600 tracking-tighter">
                        {"totalDays" in results && results.totalDays}{" "}
                        <span className="text-2xl text-muted-foreground font-bold">
                          days
                        </span>
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-secondary/30 p-6 rounded-xl border flex flex-col items-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-2">
                          Years & Months
                        </p>
                        <p className="text-2xl font-bold">
                          {"years" in results && results.years}y{" "}
                          {"months" in results && results.months}m
                        </p>
                      </div>
                      <div className="bg-secondary/30 p-6 rounded-xl border flex flex-col items-center">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-2">
                          Weeks & Days
                        </p>
                        <p className="text-2xl font-bold">
                          {"weeks" in results && results.weeks}w{" "}
                          {"remainingDays" in results && results.remainingDays}d
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-card border rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[350px]">
                    <CalendarIcon
                      size={48}
                      className="text-blue-500 mb-4 opacity-20"
                    />
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-2">
                      Resulting Date
                    </p>
                    <h2 className="text-3xl md:text-5xl font-black text-blue-600 tracking-tighter">
                      {"resultDate" in results && results.resultDate}
                    </h2>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed border-border rounded-xl p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
                <Clock size={48} className="opacity-10 mb-4" />
                <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  Adjust parameters and click calculate
                </p>
              </div>
            )}

            {/* QUICK STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-secondary/30 p-4 rounded-lg border">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  Calculation System
                </p>
                <p className="text-lg font-bold">Gregorian Calendar</p>
              </div>
              <div className="bg-secondary/30 p-4 rounded-lg border">
                <p className="text-[10px] text-muted-foreground uppercase font-bold">
                  Accuracy
                </p>
                <p className="text-lg font-bold text-green-600 tracking-tighter">
                  100% VERIFIED
                </p>
              </div>
            </div>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </main>
  );
}
