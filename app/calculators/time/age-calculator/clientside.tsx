"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Calendar,
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  Clock,
  CheckCircle2,
  Cake,
  Heart,
} from "lucide-react";

import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

interface AgeDetails {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: number;
}

export default function AgeCalculator() {
  const relatedCalculators = [
    {
      name: "Date Calculator",
      description: "Days between two dates",
      href: "/calculators/time/date-calculator",
      icon: Calendar,
    },
    {
      name: "Time Calculator",
      description: "Hours to minutes and more",
      href: "/calculators/time/time-calculator",
      icon: Clock,
    },
  ];

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();

  // Refs for hidden date pickers
  const birthDatePickerRef = useRef<HTMLInputElement>(null);
  const targetDatePickerRef = useRef<HTMLInputElement>(null);

  // --- States ---
  const [birthMonth, setBirthMonth] = useState("Jan");
  const [birthDay, setBirthDay] = useState(1);
  const [birthYear, setBirthYear] = useState(2000);

  const [targetMonth, setTargetMonth] = useState(months[new Date().getMonth()]);
  const [targetDay, setTargetDay] = useState(new Date().getDate());
  const [targetYear, setTargetYear] = useState(currentYear);

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "Age Calculator",
    href: "/calculators/time/age-calculator",
    category: "Time",
  };

  // --- Handlers for Calendar Picker ---
  const handleCalendarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "birth" | "target"
  ) => {
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) return;

    const m = months[date.getMonth()];
    const d = date.getDate();
    const y = date.getFullYear();

    if (type === "birth") {
      setBirthMonth(m);
      setBirthDay(d);
      setBirthYear(y);
    } else {
      setTargetMonth(m);
      setTargetDay(d);
      setTargetYear(y);
    }
  };

  // --- Initialize & Load History ---
  useEffect(() => {
    setIsMounted(true);
    const history = getCalculatorHistory();

    if (history["age-calc"]?.data) {
      const data = history["age-calc"].data;
      setBirthMonth(data.birthMonth || "Jan");
      setBirthDay(data.birthDay || 1);
      setBirthYear(data.birthYear || 2000);
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
  }, []);

  // --- Auto-Save Inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("age-calc", { birthMonth, birthDay, birthYear });
  }, [birthMonth, birthDay, birthYear, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const results = useMemo((): AgeDetails | null => {
    if (trigger === 0) return null;

    const birthDate = new Date(`${birthMonth} ${birthDay}, ${birthYear}`);
    const targetDate = new Date(`${targetMonth} ${targetDay}, ${targetYear}`);

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) return null;

    let yearsDiff = targetDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = targetDate.getMonth() - birthDate.getMonth();
    let daysDiff = targetDate.getDate() - birthDate.getDate();

    if (daysDiff < 0) {
      monthsDiff--;
      const prevMonth = new Date(
        targetDate.getFullYear(),
        targetDate.getMonth(),
        0
      );
      daysDiff += prevMonth.getDate();
    }

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    const totalDiffMs = targetDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalDiffMs / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const nextBday = new Date(
      targetDate.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );
    if (nextBday < targetDate) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    const daysToNextBirthday = Math.ceil(
      (nextBday.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    return {
      years: yearsDiff,
      months: monthsDiff,
      days: daysDiff,
      totalDays,
      totalHours,
      totalMinutes: Math.floor(totalMinutes),
      nextBirthday: daysToNextBirthday,
    };
  }, [trigger]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={20} /> Parameters
              </h2>

              <div className="space-y-6">
                {/* Date of Birth */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Date of Birth
                    </label>
                    <button
                      onClick={() => birthDatePickerRef.current?.showPicker()}
                      className="text-blue-600 hover:scale-110 transition-transform"
                    >
                      <Calendar size={18} />
                    </button>
                    <input
                      type="date"
                      ref={birthDatePickerRef}
                      className="sr-only"
                      onChange={(e) => handleCalendarChange(e, "birth")}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(Number(e.target.value))}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold w-full outline-none focus:ring-2 ring-blue-500/20"
                      placeholder="Year"
                    />
                  </div>
                </div>

                {/* Age at Date */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Age at Date
                    </label>
                    <button
                      onClick={() => targetDatePickerRef.current?.showPicker()}
                      className="text-blue-600 hover:scale-110 transition-transform"
                    >
                      <Calendar size={18} />
                    </button>
                    <input
                      type="date"
                      ref={targetDatePickerRef}
                      className="sr-only"
                      onChange={(e) => handleCalendarChange(e, "target")}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      value={targetMonth}
                      onChange={(e) => setTargetMonth(e.target.value)}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={targetDay}
                      onChange={(e) => setTargetDay(Number(e.target.value))}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={targetYear}
                      onChange={(e) => setTargetYear(Number(e.target.value))}
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold w-full outline-none focus:ring-2 ring-blue-500/20"
                      placeholder="Year"
                    />
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate Age <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8">
            {showResults && results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-600/5 border border-blue-600/10 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mb-4">
                      Current Age
                    </p>
                    <h2 className="text-6xl font-black text-blue-600 tracking-tighter mb-2">
                      {results.years} <span className="text-2xl font-bold text-foreground/60">years</span>
                    </h2>
                    <p className="font-bold text-muted-foreground uppercase text-xs tracking-widest">
                      {results.months} months | {results.days} days
                    </p>
                  </div>

                  <div className="bg-card border rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm">
                    <div className="p-4 bg-pink-500/10 rounded-full mb-4">
                        <Cake size={32} className="text-pink-500" />
                    </div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">
                      Next Birthday In
                    </p>
                    <h2 className="text-4xl font-black">
                      {results.nextBirthday}{" "}
                      <span className="text-lg text-muted-foreground font-bold italic">days</span>
                    </h2>
                  </div>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-8 tracking-[0.2em] flex items-center gap-2">
                    <BarChart3 size={16} className="text-blue-500" /> Life Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <StatBox label="Total Days" value={results.totalDays} />
                    <StatBox label="Total Hours" value={results.totalHours} />
                    <StatBox label="Total Minutes" value={results.totalMinutes} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Clock size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Select dates to see your life summary
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

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="p-6 bg-secondary/30 rounded-2xl border border-border/50 text-center">
      <p className="text-[10px] font-black text-muted-foreground uppercase mb-2 tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-blue-600 tracking-tight">
        {value.toLocaleString()}
      </p>
    </div>
  );
}