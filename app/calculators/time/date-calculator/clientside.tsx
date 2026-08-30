"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  Clock,
  Heart,
  CalendarRange,
  Share2,
  Copy,
  Check,
  ArrowLeftRight,
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

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return isNaN(d.getTime()) ? null : d;
}

function formatLong(d: Date): string {
  return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function formatWeekdayLong(d: Date): string {
  return `${WEEKDAYS_LONG[d.getUTCDay()]}, ${formatLong(d)}`;
}

// Calendar-accurate years/months/days between two UTC dates (end assumed
// on or after start). Borrows from the previous month's real length
// rather than assuming every month is 30 days.
function diffYMD(start: Date, end: Date): { years: number; months: number; days: number } {
  let y = end.getUTCFullYear() - start.getUTCFullYear();
  let m = end.getUTCMonth() - start.getUTCMonth();
  let d = end.getUTCDate() - start.getUTCDate();

  if (d < 0) {
    m -= 1;
    const prevMonthLastDay = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0)).getUTCDate();
    d += prevMonthLastDay;
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  return { years: y, months: m, days: d };
}

// Adds a number of months to a date, clamping the day to the target
// month's real length so Jan 31 + 1 month lands on Feb 28 (or 29), not
// rolls over into March.
function addMonthsClamped(date: Date, monthsToAdd: number): Date {
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  const total = m + monthsToAdd;
  const newYear = y + Math.floor(total / 12);
  const newMonth = ((total % 12) + 12) % 12;
  const daysInNewMonth = new Date(Date.UTC(newYear, newMonth + 1, 0)).getUTCDate();
  return new Date(Date.UTC(newYear, newMonth, Math.min(d, daysInNewMonth)));
}

function addDuration(
  base: Date,
  years: number,
  months: number,
  weeks: number,
  days: number,
  direction: 1 | -1
): Date {
  const monthStep = addMonthsClamped(base, (years * 12 + months) * direction);
  return new Date(monthStep.getTime() + (weeks * 7 + days) * direction * 86400000);
}

type Mode = "difference" | "add-subtract";

const relatedCalculators = [
  { name: "Age Calculator", description: "Find exact age in days", href: "/calculators/time/age-calculator", icon: Clock },
  { name: "Hours Calculator", description: "Convert hours to minutes", href: "/calculators/time/hours-calculator", icon: Clock },
];

const calculatorInfo = {
  name: "Date Calculator",
  href: "/calculators/time/date-calculator",
  category: "Time",
};

export default function DateCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("difference");
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Difference mode state ---
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [includeEndDay, setIncludeEndDay] = useState(false);

  // --- Add / Subtract mode state ---
  const [baseDate, setBaseDate] = useState<string>("");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [yearsVal, setYearsVal] = useState(0);
  const [monthsVal, setMonthsVal] = useState(0);
  const [weeksVal, setWeeksVal] = useState(0);
  const [daysVal, setDaysVal] = useState(0);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Load a shared link or prior inputs on first mount ---
  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const sharedMode = params.get("mode");

    if (sharedMode === "difference" || sharedMode === "add-subtract") {
      setMode(sharedMode);
      if (sharedMode === "difference") {
        setStartDate(params.get("start") || "");
        setEndDate(params.get("end") || "");
        setIncludeEndDay(params.get("incEnd") === "1");
      } else {
        setBaseDate(params.get("base") || "");
        setOperation(params.get("op") === "subtract" ? "subtract" : "add");
        setYearsVal(Number(params.get("y") ?? 0));
        setMonthsVal(Number(params.get("mo") ?? 0));
        setWeeksVal(Number(params.get("w") ?? 0));
        setDaysVal(Number(params.get("d") ?? 0));
      }
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["date-calc"]?.data;
      if (saved) {
        setMode(saved.mode || "difference");
        setStartDate(saved.startDate || todayISO());
        setEndDate(saved.endDate || "");
        setIncludeEndDay(!!saved.includeEndDay);
        setBaseDate(saved.baseDate || todayISO());
        setOperation(saved.operation === "subtract" ? "subtract" : "add");
        setYearsVal(saved.yearsVal ?? 0);
        setMonthsVal(saved.monthsVal ?? 0);
        setWeeksVal(saved.weeksVal ?? 0);
        setDaysVal(saved.daysVal ?? 1);
      } else {
        setStartDate(todayISO());
        setBaseDate(todayISO());
        setDaysVal(1);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("date-calc", {
      mode,
      startDate,
      endDate,
      includeEndDay,
      baseDate,
      operation,
      yearsVal,
      monthsVal,
      weeksVal,
      daysVal,
    });
  }, [isMounted, mode, startDate, endDate, includeEndDay, baseDate, operation, yearsVal, monthsVal, weeksVal, daysVal]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo(() => {
    if (trigger === 0) return null;

    if (mode === "difference") {
      if (!startDate || !endDate) {
        return { error: "Please pick both a start date and an end date." };
      }
      const start = parseISODate(startDate);
      const end = parseISODate(endDate);
      if (!start || !end) {
        return { error: "One of those dates doesn't look valid." };
      }
      const swapped = end.getTime() < start.getTime();
      const rangeStart = swapped ? end : start;
      const rangeEnd = swapped ? start : end;

      const totalDays = Math.round((rangeEnd.getTime() - rangeStart.getTime()) / 86400000) + (includeEndDay ? 1 : 0);
      const weeks = Math.floor(totalDays / 7);
      const remainingDays = totalDays % 7;
      const ymdEnd = includeEndDay ? new Date(rangeEnd.getTime() + 86400000) : rangeEnd;
      const ymd = diffYMD(rangeStart, ymdEnd);

      return { mode: "difference" as const, swapped, rangeStart, rangeEnd, totalDays, weeks, remainingDays, ...ymd };
    }

    // add-subtract
    if (!baseDate) {
      return { error: "Please pick a starting date." };
    }
    const base = parseISODate(baseDate);
    if (!base) {
      return { error: "That date doesn't look valid." };
    }
    if (yearsVal === 0 && monthsVal === 0 && weeksVal === 0 && daysVal === 0) {
      return { error: "Enter at least one year, month, week, or day." };
    }
    const direction: 1 | -1 = operation === "subtract" ? -1 : 1;
    const resultDate = addDuration(base, yearsVal || 0, monthsVal || 0, weeksVal || 0, daysVal || 0, direction);

    return { mode: "add-subtract" as const, resultDate };
  }, [trigger, mode, startDate, endDate, includeEndDay, baseDate, operation, yearsVal, monthsVal, weeksVal, daysVal]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (mode === "difference") {
      params.set("start", startDate);
      params.set("end", endDate);
      if (includeEndDay) params.set("incEnd", "1");
    } else {
      params.set("base", baseDate);
      params.set("op", operation);
      params.set("y", String(yearsVal));
      params.set("mo", String(monthsVal));
      params.set("w", String(weeksVal));
      params.set("d", String(daysVal));
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, mode, startDate, endDate, includeEndDay, baseDate, operation, yearsVal, monthsVal, weeksVal, daysVal]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard API can fail silently; the link is still visible/selectable.
    }
  }, [shareUrl]);

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

  const handleCalculate = () => {
    setTrigger((t) => t + 1);
    setShowResults(true);
  };

  const handleReset = () => {
    setStartDate(todayISO());
    setEndDate("");
    setIncludeEndDay(false);
    setBaseDate(todayISO());
    setOperation("add");
    setYearsVal(0);
    setMonthsVal(0);
    setWeeksVal(0);
    setDaysVal(1);
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

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
                aria-label={isSaved ? "Remove Date Calculator from saved" : "Save Date Calculator"}
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <CalendarRange className="text-blue-600" size={22} />
                Parameters
              </h2>

              {/* Mode Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6 bg-secondary/60 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMode("difference");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "difference" ? "bg-blue-600 text-white shadow-sm" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Difference
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("add-subtract");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "add-subtract" ? "bg-blue-600 text-white shadow-sm" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Add &amp; Subtract
                </button>
              </div>

              <div className="space-y-6">
                {mode === "difference" ? (
                  <>
                    <div className="space-y-2">
                      <label htmlFor="dc-start" className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                        Start Date
                      </label>
                      <input
                        id="dc-start"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="dc-end" className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                        End Date
                      </label>
                      <input
                        id="dc-end"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                    <label htmlFor="dc-include-end" className="flex items-start gap-3 cursor-pointer">
                      <input
                        id="dc-include-end"
                        type="checkbox"
                        checked={includeEndDay}
                        onChange={(e) => setIncludeEndDay(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      />
                      <span>
                        <span className="block text-sm font-bold">Include end date</span>
                        <span className="block text-xs text-gray-300">
                          Counts both the first and the last day, like a rental or notice period
                        </span>
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest block">
                        Direction
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setOperation("add")}
                          className={`py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                            operation === "add" ? "bg-blue-600 text-white" : "bg-secondary text-gray-300 hover:text-foreground"
                          }`}
                        >
                          <Plus size={16} /> ADD
                        </button>
                        <button
                          type="button"
                          onClick={() => setOperation("subtract")}
                          className={`py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                            operation === "subtract" ? "bg-blue-600 text-white" : "bg-secondary text-gray-300 hover:text-foreground"
                          }`}
                        >
                          <Minus size={16} /> SUBTRACT
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="dc-base" className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                        {operation === "add" ? "Add to" : "Subtract from"}
                      </label>
                      <input
                        id="dc-base"
                        type="date"
                        value={baseDate}
                        onChange={(e) => setBaseDate(e.target.value)}
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setBaseDate(todayISO())}
                        className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2"
                      >
                        Use today&apos;s date
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Years", val: yearsVal, setter: setYearsVal },
                        { label: "Months", val: monthsVal, setter: setMonthsVal },
                        { label: "Weeks", val: weeksVal, setter: setWeeksVal },
                        { label: "Days", val: daysVal, setter: setDaysVal },
                      ].map((item) => (
                        <div key={item.label} className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest block">
                            {item.label}
                          </label>
                          <input
                            type="number"
                            min={0}
                            value={item.val}
                            onChange={(e) => item.setter(Number(e.target.value))}
                            className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

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
            {showResults && results && !("error" in results) ? (
              <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm animate-in fade-in zoom-in-95 duration-300">
                {results.mode === "difference" ? (
                  <>
                    <div className="space-y-2 text-center">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                        Total Difference
                      </p>
                      <p className="text-xs font-bold text-gray-300">
                        From {formatLong(results.rangeStart)} to {formatLong(results.rangeEnd)}
                      </p>
                      <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                        {results.totalDays.toLocaleString()}
                      </h2>
                      <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-2">
                        total {results.totalDays === 1 ? "day" : "days"}
                      </div>
                      {results.swapped && (
                        <p className="text-xs text-gray-300 pt-2 flex items-center justify-center gap-1.5">
                          <ArrowLeftRight size={12} />
                          The end date was earlier than the start date, so this shows the gap between them.
                        </p>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-dashed grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-5 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Years, Months &amp; Days</p>
                        <p className="text-xl font-black">
                          {results.years}y {results.months}m {results.days}d
                        </p>
                      </div>
                      <div className="p-5 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Weeks &amp; Days</p>
                        <p className="text-xl font-black">
                          {results.weeks}w {results.remainingDays}d
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2 text-center">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">Result Date</p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                      {formatWeekdayLong(results.resultDate)}
                    </h2>
                  </div>
                )}

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
                            linkCopied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          {linkCopied ? (
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
                        Anyone who opens this link sees the same inputs and the same result.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : showResults && results && "error" in results ? (
              <div
                role="alert"
                className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-700 font-bold flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-4 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all">
                <CalendarRange size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[220px]">
                  Ready to calculate your dates
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