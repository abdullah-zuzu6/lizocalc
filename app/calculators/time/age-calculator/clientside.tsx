"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Calendar,
  RotateCcw,
  ListFilter,
  Clock,
  CheckCircle2,
  Cake,
  Heart,
  Share2,
  Copy,
  Check,
} from "lucide-react";

import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Turns month/day/year fields into a "YYYY-MM-DD" string for the share link.
function isoFromParts(month: string, day: number, year: number): string {
  const monthIndex = MONTHS.indexOf(month);
  if (monthIndex === -1) return "";
  const d = new Date(year, monthIndex, day);
  if (isNaN(d.getTime())) return "";
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

// Reverses isoFromParts, used when a shared link is opened.
function partsFromISO(value: string): { month: string; day: number; year: number } | null {
  const d = new Date(`${value}T00:00:00`);
  if (isNaN(d.getTime())) return null;
  return { month: MONTHS[d.getMonth()], day: d.getDate(), year: d.getFullYear() };
}

interface AgeResult {
  error?: string;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthdayDays: number;
}

export default function AgeCalculator() {
  const relatedCalculators = [
    {
      name: "Days Between Two Dates",
      description: "Find the gap between any two dates",
      href: "/calculators/time/days-between-dates-calculator",
      icon: Calendar,
    },
    {
      name: "Time Calculator",
      description: "Hours to minutes and more",
      href: "/calculators/time/time-calculator",
      icon: Clock,
    },
  ];

  const dayOptions = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();

  const birthDatePickerRef = useRef<HTMLInputElement>(null);
  const targetDatePickerRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- State ---
  const [birthMonth, setBirthMonth] = useState("Jan");
  const [birthDay, setBirthDay] = useState(1);
  const [birthYear, setBirthYear] = useState(2000);

  const [targetMonth, setTargetMonth] = useState(MONTHS[new Date().getMonth()]);
  const [targetDay, setTargetDay] = useState(new Date().getDate());
  const [targetYear, setTargetYear] = useState(currentYear);

  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const calculatorInfo = {
    name: "Age Calculator",
    href: "/calculators/time/age-calculator",
    category: "Time",
  };

  const handleCalendarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "birth" | "target"
  ) => {
    const date = new Date(e.target.value);
    if (isNaN(date.getTime())) return;

    const m = MONTHS[date.getMonth()];
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

  // --- Load a shared link first, fall back to locally saved history ---
  // A shared link (?birth=...&target=...) always wins over saved history,
  // since the point of sharing is to reproduce someone else's exact result.
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedBirth = params.get("birth");
    const sharedTarget = params.get("target");

    if (sharedBirth && sharedTarget) {
      const b = partsFromISO(sharedBirth);
      const t = partsFromISO(sharedTarget);
      if (b) {
        setBirthMonth(b.month);
        setBirthDay(b.day);
        setBirthYear(b.year);
      }
      if (t) {
        setTargetMonth(t.month);
        setTargetDay(t.day);
        setTargetYear(t.year);
      }
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["age-calc"]?.data;
      if (saved) {
        setBirthMonth(saved.birthMonth || "Jan");
        setBirthDay(saved.birthDay || 1);
        setBirthYear(saved.birthYear || 2000);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save the birth date to the browser on every change ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("age-calc", { birthMonth, birthDay, birthYear });
  }, [birthMonth, birthDay, birthYear, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo<AgeResult | null>(() => {
    if (trigger === 0) return null;

    const birthDate = new Date(`${birthMonth} ${birthDay}, ${birthYear}`);
    const targetDate = new Date(`${targetMonth} ${targetDay}, ${targetYear}`);

    if (isNaN(birthDate.getTime()) || isNaN(targetDate.getTime())) {
      return {
        error: "One of those dates doesn't look valid.",
        years: 0,
        months: 0,
        days: 0,
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        nextBirthdayDays: 0,
      };
    }

    if (targetDate < birthDate) {
      return {
        error: "The target date can't be earlier than the date of birth.",
        years: 0,
        months: 0,
        days: 0,
        totalDays: 0,
        totalHours: 0,
        totalMinutes: 0,
        nextBirthdayDays: 0,
      };
    }

    // Borrowing method: days first, then months, then years.
    let yearsDiff = targetDate.getFullYear() - birthDate.getFullYear();
    let monthsDiff = targetDate.getMonth() - birthDate.getMonth();
    let daysDiff = targetDate.getDate() - birthDate.getDate();

    if (daysDiff < 0) {
      monthsDiff--;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      daysDiff += prevMonth.getDate();
    }

    if (monthsDiff < 0) {
      yearsDiff--;
      monthsDiff += 12;
    }

    const totalDiffMs = targetDate.getTime() - birthDate.getTime();
    const totalDays = Math.floor(totalDiffMs / 86400000);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    const nextBday = new Date(targetDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < targetDate) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    const nextBirthdayDays = Math.ceil((nextBday.getTime() - targetDate.getTime()) / 86400000);

    return {
      years: yearsDiff,
      months: monthsDiff,
      days: daysDiff,
      totalDays,
      totalHours,
      totalMinutes,
      nextBirthdayDays,
    };
  }, [trigger, birthMonth, birthDay, birthYear, targetMonth, targetDay, targetYear]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || results.error) {
      setShareUrl("");
      return;
    }
    const birthISO = isoFromParts(birthMonth, birthDay, birthYear);
    const targetISO = isoFromParts(targetMonth, targetDay, targetYear);
    if (!birthISO || !targetISO) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("birth", birthISO);
    params.set("target", targetISO);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, birthMonth, birthDay, birthYear, targetMonth, targetDay, targetYear]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail (older browsers, permissions). The link is
      // still visible and selectable in the input, so this fails quietly.
    }
  }, [shareUrl]);

  const handleCalculate = () => {
    setTrigger((v) => v + 1);
    setShowResults(true);
  };

  const handleReset = () => {
    setBirthMonth("Jan");
    setBirthDay(1);
    setBirthYear(2000);
    setTargetMonth(MONTHS[new Date().getMonth()]);
    setTargetDay(new Date().getDate());
    setTargetYear(currentYear);
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults || !results) return;

    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results, showResults]);

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm relative overflow-hidden">
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={
                  isSaved ? "Remove Age Calculator from saved" : "Save Age Calculator"
                }
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} aria-hidden="true" />
              </button>

              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <ListFilter className="text-blue-600" size={22} />
                Parameters
              </h2>

              <div className="space-y-6">
                {/* Date of Birth */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="birth-month-select"
                      className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                    >
                      Date of Birth
                    </label>
                    <button
                      onClick={() => birthDatePickerRef.current?.showPicker()}
                      aria-label="Open calendar picker to select date of birth"
                      className="text-blue-600 hover:scale-110 transition-transform"
                    >
                      <Calendar size={18} aria-hidden="true" />
                    </button>
                    <input
                      type="date"
                      ref={birthDatePickerRef}
                      className="sr-only"
                      aria-label="Date of birth calendar picker"
                      onChange={(e) => handleCalendarChange(e, "birth")}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      id="birth-month-select"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      aria-label="Birth month"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(Number(e.target.value))}
                      aria-label="Birth day"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {dayOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={birthYear}
                      onChange={(e) => setBirthYear(Number(e.target.value))}
                      aria-label="Birth year"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold w-full outline-none focus:ring-2 ring-blue-500/20"
                      placeholder="Year"
                    />
                  </div>
                </div>

                {/* Age at Date */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="target-month-select"
                      className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                    >
                      Age at Date
                    </label>
                    <button
                      onClick={() => targetDatePickerRef.current?.showPicker()}
                      aria-label="Open calendar picker to select the target date"
                      className="text-blue-600 hover:scale-110 transition-transform"
                    >
                      <Calendar size={18} aria-hidden="true" />
                    </button>
                    <input
                      type="date"
                      ref={targetDatePickerRef}
                      className="sr-only"
                      aria-label="Target date calendar picker"
                      onChange={(e) => handleCalendarChange(e, "target")}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <select
                      id="target-month-select"
                      value={targetMonth}
                      onChange={(e) => setTargetMonth(e.target.value)}
                      aria-label="Target month"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {MONTHS.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={targetDay}
                      onChange={(e) => setTargetDay(Number(e.target.value))}
                      aria-label="Target day"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      {dayOptions.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={targetYear}
                      onChange={(e) => setTargetYear(Number(e.target.value))}
                      aria-label="Target year"
                      className="bg-secondary p-3 rounded-xl border-none text-sm font-bold w-full outline-none focus:ring-2 ring-blue-500/20"
                      placeholder="Year"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleCalculate}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-4 bg-secondary text-gray-200 rounded-xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} /> RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7" ref={resultsRef}>
            {showResults && results && !results.error ? (
              <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                <div className="space-y-2 text-center">
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                    Current Age
                  </p>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter break-all">
                    {results.years}
                  </h2>
                  <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-4">
                    {results.years === 1 ? "year" : "years"}
                  </div>
                  <p className="text-sm text-gray-300 pt-2 font-bold">
                    {results.months} {results.months === 1 ? "month" : "months"},{" "}
                    {results.days} {results.days === 1 ? "day" : "days"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-dashed">
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Next Birthday
                    </p>
                    <p className="text-xl font-black">
                      {results.nextBirthdayDays}{" "}
                      <span className="text-xs font-medium text-gray-300">days</span>
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Total Days
                    </p>
                    <p className="text-xl font-black">
                      {results.totalDays.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Total Hours
                    </p>
                    <p className="text-xl font-black">
                      {results.totalHours.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Total Minutes
                    </p>
                    <p className="text-xl font-black">
                      {results.totalMinutes.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Share Results */}
                <div className="mt-8 pt-8 border-t border-dashed">
                  {!shareUrl ? null : (
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest flex items-center gap-2">
                        <Share2 size={14} className="text-blue-600" />
                        Share This Result
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          readOnly
                          value={shareUrl}
                          onFocus={(e) => e.target.select()}
                          className="flex-1 px-4 py-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-xs font-medium truncate"
                        />
                        <button
                          onClick={handleCopyShareLink}
                          className={`px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                            copied
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {copied ? (
                            <>
                              <Check size={16} /> COPIED
                            </>
                          ) : (
                            <>
                              <Copy size={16} /> COPY LINK
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-300">
                        Anyone who opens this link sees the same dates and the same result.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : showResults && results && results.error ? (
              <div
                role="alert"
                className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-700 font-bold flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-4 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all">
                <Cake size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[200px]">
                  Enter a birth date to see your age
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </div>
  );
}