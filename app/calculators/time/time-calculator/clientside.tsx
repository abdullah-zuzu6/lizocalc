"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  Heart,
  Timer,
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

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function todayISO(): string {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function nowHHMM(): string {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

function combineDateTime(dateStr: string, timeStr: string): Date | null {
  if (!dateStr) return null;
  const t = timeStr || "00:00";
  const d = new Date(`${dateStr}T${t}:00`);
  return isNaN(d.getTime()) ? null : d;
}

// 24-hour "HH:MM" stays the source of truth for calculation and share
// links; these just translate it to/from a 12-hour hour + minute + AM/PM
// picker for display.
function parse24(timeStr: string): { h: number; m: number } {
  const [h, m] = (timeStr || "00:00").split(":").map(Number);
  return { h: isNaN(h) ? 0 : h, m: isNaN(m) ? 0 : m };
}

function to12h(timeStr: string): { hour12: number; minute: number; ampm: "AM" | "PM" } {
  const { h, m } = parse24(timeStr);
  const ampm: "AM" | "PM" = h >= 12 ? "PM" : "AM";
  let hour12 = h % 12;
  if (hour12 === 0) hour12 = 12;
  return { hour12, minute: m, ampm };
}

function from12h(hour12: number, minute: number, ampm: "AM" | "PM"): string {
  let h = hour12 % 12;
  if (ampm === "PM") h += 12;
  const safeMinute = Math.min(59, Math.max(0, minute || 0));
  return `${pad2(h)}:${pad2(safeMinute)}`;
}

function isWeekend(d: Date): boolean {
  const day = d.getDay();
  return day === 0 || day === 6;
}

// Walks the range one calendar day at a time and only counts milliseconds
// that fall on a Monday-Friday segment, so a start or end time in the
// middle of a day is still handled correctly.
function msExcludingWeekends(start: Date, end: Date): number {
  let total = 0;
  let cursor = new Date(start);
  while (cursor.getTime() < end.getTime()) {
    const nextMidnight = new Date(cursor);
    nextMidnight.setHours(24, 0, 0, 0);
    const segmentEnd =
      nextMidnight.getTime() < end.getTime() ? nextMidnight : end;
    if (!isWeekend(cursor)) {
      total += segmentEnd.getTime() - cursor.getTime();
    }
    cursor = segmentEnd;
  }
  return total;
}

interface DurationBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

function breakdownFromMs(ms: number): DurationBreakdown {
  const totalWholeSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalWholeSeconds / 86400);
  const hours = Math.floor((totalWholeSeconds % 86400) / 3600);
  const minutes = Math.floor((totalWholeSeconds % 3600) / 60);
  const seconds = totalWholeSeconds % 60;
  return {
    days,
    hours,
    minutes,
    seconds,
    totalDays: ms / 86400000,
    totalHours: ms / 3600000,
    totalMinutes: ms / 60000,
    totalSeconds: ms / 1000,
  };
}

function formatDateTimeLong(d: Date): string {
  const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let h = d.getHours();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${WEEKDAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}, ${h}:${pad2(d.getMinutes())} ${ampm}`;
}

type Mode = "duration" | "convert";

function TimeOfDayPicker({
  value,
  onChange,
  idPrefix,
}: {
  value: string;
  onChange: (next: string) => void;
  idPrefix: string;
}) {
  const { hour12, minute, ampm } = to12h(value);

  return (
    <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
      <select
        id={`${idPrefix}-hour`}
        aria-label="Hour"
        value={hour12}
        onChange={(e) => onChange(from12h(Number(e.target.value), minute, ampm))}
        className="w-full px-3 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
      >
        {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
          <option key={h} value={h}>
            {h}
          </option>
        ))}
      </select>
      <select
        id={`${idPrefix}-minute`}
        aria-label="Minute"
        value={minute}
        onChange={(e) => onChange(from12h(hour12, Number(e.target.value), ampm))}
        className="w-full px-3 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
      >
        {Array.from({ length: 60 }, (_, i) => i).map((m) => (
          <option key={m} value={m}>
            {pad2(m)}
          </option>
        ))}
      </select>
      <div className="flex rounded-xl overflow-hidden border-2 border-transparent bg-secondary">
        {(["AM", "PM"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(from12h(hour12, minute, opt))}
            aria-pressed={ampm === opt}
            className={`px-3 py-4 text-xs font-black transition-all ${
              ampm === opt ? "bg-blue-600 text-white" : "text-gray-300 hover:text-foreground"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function TimeCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("duration");
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- "Duration" mode state ---
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [workdaysOnly, setWorkdaysOnly] = useState<boolean>(false);

  // --- "Convert" mode state ---
  const [hours, setHours] = useState<number>(1);
  const [minutes, setMinutes] = useState<number>(30);
  const [seconds, setSeconds] = useState<number>(45);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Time Calculator",
    href: "/calculators/time/time-calculator",
    category: "Time",
  };

  const relatedCalculators = [
    { name: "Date Calculator", description: "Calculate days between", href: "/calculators/time/date-calculator", icon: Clock },
    { name: "Age Calculator", description: "Calculate age based on birth date", href: "/calculators/time/age-calculator", icon: Clock },
  ];

  // --- Load a shared link or prior inputs on first mount ---
  useEffect(() => {
    setIsMounted(true);
    const params = new URLSearchParams(window.location.search);
    const sharedMode = params.get("mode");

    if (sharedMode === "duration" || sharedMode === "convert") {
      setMode(sharedMode);
      if (sharedMode === "duration") {
        setStartDate(params.get("sd") || "");
        setStartTime(params.get("st") || "00:00");
        setEndDate(params.get("ed") || "");
        setEndTime(params.get("et") || "00:00");
        setWorkdaysOnly(params.get("wd") === "1");
      } else {
        setHours(Number(params.get("h") ?? 1));
        setMinutes(Number(params.get("m") ?? 30));
        setSeconds(Number(params.get("s") ?? 45));
      }
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["time-calc"]?.data;
      if (saved) {
        setMode(saved.mode || "duration");
        setStartDate(saved.startDate || todayISO());
        setStartTime(saved.startTime || "00:00");
        setEndDate(saved.endDate || todayISO());
        setEndTime(saved.endTime || nowHHMM());
        setWorkdaysOnly(!!saved.workdaysOnly);
        setHours(saved.hours ?? 1);
        setMinutes(saved.minutes ?? 30);
        setSeconds(saved.seconds ?? 45);
      } else {
        setStartDate(todayISO());
        setStartTime("09:00");
        setEndDate(todayISO());
        setEndTime(nowHHMM());
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("time-calc", {
      mode,
      startDate,
      startTime,
      endDate,
      endTime,
      workdaysOnly,
      hours,
      minutes,
      seconds,
    });
  }, [isMounted, mode, startDate, startTime, endDate, endTime, workdaysOnly, hours, minutes, seconds]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo(() => {
    if (trigger === 0) return null;

    if (mode === "duration") {
      if (!startDate || !endDate) {
        return { error: "Please pick a start and end date." };
      }
      const start = combineDateTime(startDate, startTime);
      const end = combineDateTime(endDate, endTime);
      if (!start || !end) {
        return { error: "One of those dates or times doesn't look valid." };
      }
      const swapped = end.getTime() < start.getTime();
      const rangeStart = swapped ? end : start;
      const rangeEnd = swapped ? start : end;
      const ms = workdaysOnly
        ? msExcludingWeekends(rangeStart, rangeEnd)
        : rangeEnd.getTime() - rangeStart.getTime();
      const breakdown = breakdownFromMs(ms);
      return { mode: "duration" as const, swapped, rangeStart, rangeEnd, ...breakdown };
    }

    // convert
    const h = Number(hours) || 0;
    const m = Number(minutes) || 0;
    const s = Number(seconds) || 0;
    return {
      mode: "convert" as const,
      totalSeconds: h * 3600 + m * 60 + s,
      totalMinutes: h * 60 + m + s / 60,
      totalHours: h + m / 60 + s / 3600,
    };
  }, [trigger, mode, startDate, startTime, endDate, endTime, workdaysOnly, hours, minutes, seconds]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("mode", mode);
    if (mode === "duration") {
      params.set("sd", startDate);
      params.set("st", startTime);
      params.set("ed", endDate);
      params.set("et", endTime);
      if (workdaysOnly) params.set("wd", "1");
    } else {
      params.set("h", String(hours));
      params.set("m", String(minutes));
      params.set("s", String(seconds));
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, mode, startDate, startTime, endDate, endTime, workdaysOnly, hours, minutes, seconds]);

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
    setStartTime("09:00");
    setEndDate(todayISO());
    setEndTime(nowHHMM());
    setWorkdaysOnly(false);
    setHours(1);
    setMinutes(30);
    setSeconds(45);
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleUseNow = (which: "start" | "end") => {
    const d = new Date();
    const iso = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
    const hhmm = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
    if (which === "start") {
      setStartDate(iso);
      setStartTime(hhmm);
    } else {
      setEndDate(iso);
      setEndTime(hhmm);
    }
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm relative overflow-hidden">
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={isSaved ? "Remove Time Calculator from saved" : "Save Time Calculator"}
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
                <Clock className="text-blue-600" size={22} />
                Parameters
              </h2>

              {/* Mode Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6 bg-secondary/60 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMode("duration");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "duration" ? "bg-blue-600 text-white shadow-sm" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Duration
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("convert");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "convert" ? "bg-blue-600 text-white shadow-sm" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Convert
                </button>
              </div>

              <div className="space-y-6">
                {mode === "duration" ? (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="tc-start-date" className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                          Start
                        </label>
                        <button
                          type="button"
                          onClick={() => handleUseNow("start")}
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                          Use now
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          id="tc-start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                        />
                        <TimeOfDayPicker idPrefix="tc-start" value={startTime} onChange={setStartTime} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="tc-end-date" className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                          End
                        </label>
                        <button
                          type="button"
                          onClick={() => handleUseNow("end")}
                          className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2"
                        >
                          Use now
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          id="tc-end-date"
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                        />
                        <TimeOfDayPicker idPrefix="tc-end" value={endTime} onChange={setEndTime} />
                      </div>
                    </div>

                    <label htmlFor="tc-workdays" className="flex items-start gap-3 cursor-pointer">
                      <input
                        id="tc-workdays"
                        type="checkbox"
                        checked={workdaysOnly}
                        onChange={(e) => setWorkdaysOnly(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      />
                      <span>
                        <span className="block text-sm font-bold">Count only workdays</span>
                        <span className="block text-xs text-gray-300">
                          Skips the time that falls on a Saturday or Sunday
                        </span>
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    {[
                      { label: "Hours", val: hours, setter: setHours, max: 999 },
                      { label: "Minutes", val: minutes, setter: setMinutes, max: 59 },
                      { label: "Seconds", val: seconds, setter: setSeconds, max: 59 },
                    ].map((item) => (
                      <div key={item.label} className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest block">
                          {item.label}: {item.val}
                        </label>
                        <input
                          type="range"
                          min="0"
                          max={item.max}
                          step="1"
                          value={item.val}
                          onChange={(e) => {
                            item.setter(Number(e.target.value));
                            setShowResults(false);
                          }}
                          className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        <input
                          type="number"
                          value={item.val}
                          min="0"
                          onChange={(e) => {
                            item.setter(Number(e.target.value));
                            setShowResults(false);
                          }}
                          className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                        />
                      </div>
                    ))}
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
                {results.mode === "duration" ? (
                  <>
                    <div className="space-y-2 text-center">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                        Time Duration
                      </p>
                      <p className="text-xs font-bold text-gray-300">
                        From {formatDateTimeLong(results.rangeStart)} to {formatDateTimeLong(results.rangeEnd)}
                      </p>
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words pt-2">
                        {results.days > 0 && `${results.days}d `}
                        {(results.days > 0 || results.hours > 0) && `${results.hours}h `}
                        {results.minutes}m {results.seconds}s
                      </h2>
                      {results.swapped && (
                        <p className="text-xs text-gray-300 pt-2 flex items-center justify-center gap-1.5">
                          <ArrowLeftRight size={12} />
                          The end date was earlier than the start date, so this shows the gap between them.
                        </p>
                      )}
                      {workdaysOnly && (
                        <p className="text-xs text-gray-300 pt-1">
                          Weekend time was excluded from this total.
                        </p>
                      )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-dashed grid grid-cols-3 gap-4">
                      <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Total Hours</p>
                        <p className="text-lg sm:text-xl font-black break-all">{results.totalHours.toFixed(2)}</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Total Minutes</p>
                        <p className="text-lg sm:text-xl font-black break-all">{results.totalMinutes.toFixed(1)}</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Total Seconds</p>
                        <p className="text-lg sm:text-xl font-black break-all">{Math.round(results.totalSeconds).toLocaleString()}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] text-center mb-6">
                      Converted Duration
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-5 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-2">Total Seconds</p>
                        <p className="text-2xl font-black break-all">{results.totalSeconds.toLocaleString()}</p>
                      </div>
                      <div className="p-5 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-2">Total Minutes</p>
                        <p className="text-2xl font-black break-all">{results.totalMinutes.toFixed(2)}</p>
                      </div>
                      <div className="p-5 bg-secondary/50 rounded-2xl text-center">
                        <p className="text-[10px] font-bold uppercase text-gray-300 mb-2">Total Hours</p>
                        <p className="text-2xl font-black break-all">{results.totalHours.toFixed(4)}</p>
                      </div>
                    </div>
                  </>
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
                <Timer size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[220px]">
                  Ready to calculate your time
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