"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Clock,
  RotateCcw,
  Zap,
  ListFilter,
  CheckCircle2,
  Heart,
  ArrowUpDown,
  CalendarClock,
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

type Period = "AM" | "PM";
type Mode = "time" | "datetime";

interface TimeResult {
  error?: string;
  hours: number;
  mins: number;
  totalMinutes: number;
  decimalHours: string;
}

interface DateTimeResult {
  error?: string;
  days: number;
  hours: number;
  mins: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  decimalHours: string;
  swapped?: boolean;
}

// Turns 12-hour fields into a Date object at local midnight + the given time.
function buildDateTime(dateStr: string, hour: string, min: string, period: Period): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return null;
  let h = parseInt(hour, 10);
  const mi = parseInt(min, 10) || 0;
  if (isNaN(h)) return null;
  if (period === "PM" && h !== 12) h += 12;
  if (period === "AM" && h === 12) h = 0;
  const date = new Date(y, m - 1, d, h, mi);
  return isNaN(date.getTime()) ? null : date;
}

export default function HoursCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("time");
  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Time-only mode ---
  const [startHour, setStartHour] = useState("08");
  const [startMin, setStartMin] = useState("00");
  const [startPeriod, setStartPeriod] = useState<Period>("AM");
  const [endHour, setEndHour] = useState("05");
  const [endMin, setEndMin] = useState("30");
  const [endPeriod, setEndPeriod] = useState<Period>("PM");

  // --- Dates & times mode ---
  const todayISO = new Date().toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(todayISO);
  const [dtStartHour, setDtStartHour] = useState("08");
  const [dtStartMin, setDtStartMin] = useState("00");
  const [dtStartPeriod, setDtStartPeriod] = useState<Period>("AM");
  const [endDate, setEndDate] = useState(todayISO);
  const [dtEndHour, setDtEndHour] = useState("05");
  const [dtEndMin, setDtEndMin] = useState("30");
  const [dtEndPeriod, setDtEndPeriod] = useState<Period>("PM");

  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const calculatorInfo = {
    name: "Hours Calculator",
    href: "/calculators/time/hours-calculator",
    category: "Time",
  };

  const relatedCalculators = [
    {
      name: "Time Calculator",
      description: "Hours, minutes and seconds conversions",
      href: "/calculators/time/time-calculator",
      icon: Clock,
    },
    {
      name: "Days Between Two Dates",
      description: "Find the gap between any two dates",
      href: "/calculators/time/days-between-dates-calculator",
      icon: CalendarClock,
    },
  ];

  // --- Load a shared link first, fall back to locally saved history ---
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedMode = params.get("mode") as Mode | null;

    if (sharedMode === "datetime" && params.get("sd") && params.get("ed")) {
      setMode("datetime");
      setStartDate(params.get("sd") || todayISO);
      setDtStartHour(params.get("sh") || "08");
      setDtStartMin(params.get("sm") || "00");
      setDtStartPeriod((params.get("sp") as Period) || "AM");
      setEndDate(params.get("ed") || todayISO);
      setDtEndHour(params.get("eh") || "05");
      setDtEndMin(params.get("em") || "30");
      setDtEndPeriod((params.get("ep") as Period) || "PM");
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else if (sharedMode === "time" && params.get("sh") && params.get("eh")) {
      setMode("time");
      setStartHour(params.get("sh") || "08");
      setStartMin(params.get("sm") || "00");
      setStartPeriod((params.get("sp") as Period) || "AM");
      setEndHour(params.get("eh") || "05");
      setEndMin(params.get("em") || "30");
      setEndPeriod((params.get("ep") as Period) || "PM");
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["hours-calc"]?.data;
      if (saved) {
        if (saved.startHour) setStartHour(saved.startHour);
        if (saved.startMin) setStartMin(saved.startMin);
        if (saved.startPeriod) setStartPeriod(saved.startPeriod);
        if (saved.endHour) setEndHour(saved.endHour);
        if (saved.endMin) setEndMin(saved.endMin);
        if (saved.endPeriod) setEndPeriod(saved.endPeriod);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save time-mode inputs ---
  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("hours-calc", {
      startHour,
      startMin,
      startPeriod,
      endHour,
      endMin,
      endPeriod,
    });
  }, [startHour, startMin, startPeriod, endHour, endMin, endPeriod, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Time-only calculation ---
  const timeResults = useMemo<TimeResult | null>(() => {
    if (mode !== "time" || trigger === 0) return null;

    const get24Minutes = (h: string, m: string, p: Period) => {
      let hour = parseInt(h, 10);
      if (isNaN(hour)) return null;
      if (p === "PM" && hour !== 12) hour += 12;
      if (p === "AM" && hour === 12) hour = 0;
      const min = parseInt(m, 10) || 0;
      return hour * 60 + min;
    };

    const startTotal = get24Minutes(startHour, startMin, startPeriod);
    let endTotal = get24Minutes(endHour, endMin, endPeriod);

    if (startTotal === null || endTotal === null) {
      return { error: "Enter a valid start and end time.", hours: 0, mins: 0, totalMinutes: 0, decimalHours: "0.00" };
    }

    if (endTotal < startTotal) endTotal += 24 * 60;
    const diffMinutes = endTotal - startTotal;

    return {
      hours: Math.floor(diffMinutes / 60),
      mins: diffMinutes % 60,
      totalMinutes: diffMinutes,
      decimalHours: (diffMinutes / 60).toFixed(2),
    };
  }, [mode, trigger, startHour, startMin, startPeriod, endHour, endMin, endPeriod]);

  // --- Dates & times calculation ---
  const dateTimeResults = useMemo<DateTimeResult | null>(() => {
    if (mode !== "datetime" || trigger === 0) return null;

    const start = buildDateTime(startDate, dtStartHour, dtStartMin, dtStartPeriod);
    const end = buildDateTime(endDate, dtEndHour, dtEndMin, dtEndPeriod);

    if (!start || !end) {
      return {
        error: "Enter a valid start and end date/time.",
        days: 0, hours: 0, mins: 0, totalDays: 0, totalHours: 0, totalMinutes: 0, decimalHours: "0.00",
      };
    }

    const swapped = end.getTime() < start.getTime();
    const diffMs = Math.abs(end.getTime() - start.getTime());

    const totalMinutes = Math.floor(diffMs / 60000);
    const totalHours = Math.floor(diffMs / 3600000);
    const totalDays = Math.floor(diffMs / 86400000);

    const days = totalDays;
    const remainderMs = diffMs - days * 86400000;
    const hours = Math.floor(remainderMs / 3600000);
    const mins = Math.floor((remainderMs % 3600000) / 60000);

    return {
      swapped,
      days,
      hours,
      mins,
      totalDays,
      totalHours,
      totalMinutes,
      decimalHours: (diffMs / 3600000).toFixed(2),
    };
  }, [mode, trigger, startDate, dtStartHour, dtStartMin, dtStartPeriod, endDate, dtEndHour, dtEndMin, dtEndPeriod]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    if (mode === "time" && timeResults && !timeResults.error) {
      params.set("mode", "time");
      params.set("sh", startHour);
      params.set("sm", startMin);
      params.set("sp", startPeriod);
      params.set("eh", endHour);
      params.set("em", endMin);
      params.set("ep", endPeriod);
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    } else if (mode === "datetime" && dateTimeResults && !dateTimeResults.error) {
      params.set("mode", "datetime");
      params.set("sd", startDate);
      params.set("sh", dtStartHour);
      params.set("sm", dtStartMin);
      params.set("sp", dtStartPeriod);
      params.set("ed", endDate);
      params.set("eh", dtEndHour);
      params.set("em", dtEndMin);
      params.set("ep", dtEndPeriod);
      setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
    } else {
      setShareUrl("");
    }
  }, [
    showResults, mode, timeResults, dateTimeResults,
    startHour, startMin, startPeriod, endHour, endMin, endPeriod,
    startDate, dtStartHour, dtStartMin, dtStartPeriod, endDate, dtEndHour, dtEndMin, dtEndPeriod,
  ]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail on older browsers; the link is still visible and selectable.
    }
  }, [shareUrl]);

  const setTimeToNow = (target: "start" | "end") => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const p: Period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const hStr = h.toString().padStart(2, "0");
    if (target === "start") {
      setStartHour(hStr);
      setStartMin(m);
      setStartPeriod(p);
    } else {
      setEndHour(hStr);
      setEndMin(m);
      setEndPeriod(p);
    }
  };

  const setDateTimeToNow = (target: "start" | "end") => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const p: Period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const hStr = h.toString().padStart(2, "0");
    const iso = now.toISOString().slice(0, 10);
    if (target === "start") {
      setStartDate(iso);
      setDtStartHour(hStr);
      setDtStartMin(m);
      setDtStartPeriod(p);
    } else {
      setEndDate(iso);
      setDtEndHour(hStr);
      setDtEndMin(m);
      setDtEndPeriod(p);
    }
  };

  const handleSwapTime = () => {
    const sh = startHour, sm = startMin, sp = startPeriod;
    setStartHour(endHour); setStartMin(endMin); setStartPeriod(endPeriod);
    setEndHour(sh); setEndMin(sm); setEndPeriod(sp);
  };

  const handleSwapDateTime = () => {
    const sd = startDate, sh = dtStartHour, sm = dtStartMin, sp = dtStartPeriod;
    setStartDate(endDate); setDtStartHour(dtEndHour); setDtStartMin(dtEndMin); setDtStartPeriod(dtEndPeriod);
    setEndDate(sd); setDtEndHour(sh); setDtEndMin(sm); setDtEndPeriod(sp);
  };

  const handleCalculate = () => {
    setTrigger((v) => v + 1);
    setShowResults(true);
  };

  const handleReset = () => {
    setStartHour("08"); setStartMin("00"); setStartPeriod("AM");
    setEndHour("05"); setEndMin("30"); setEndPeriod("PM");
    setStartDate(todayISO); setDtStartHour("08"); setDtStartMin("00"); setDtStartPeriod("AM");
    setEndDate(todayISO); setDtEndHour("05"); setDtEndMin("30"); setDtEndPeriod("PM");
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const handleModeChange = (next: Mode) => {
    setMode(next);
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
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
                aria-label={isSaved ? "Remove Hours Calculator from saved" : "Save Hours Calculator"}
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

              {/* Mode toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-secondary rounded-xl mb-6">
                <button
                  onClick={() => handleModeChange("time")}
                  className={`py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                    mode === "time" ? "bg-blue-600 text-white shadow" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Time Only
                </button>
                <button
                  onClick={() => handleModeChange("datetime")}
                  className={`py-2.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all ${
                    mode === "datetime" ? "bg-blue-600 text-white shadow" : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Dates &amp; Times
                </button>
              </div>

              {mode === "time" ? (
                <div className="space-y-4">
                  <TimeField
                    label="Start Time"
                    hour={startHour}
                    min={startMin}
                    period={startPeriod}
                    onHour={setStartHour}
                    onMin={setStartMin}
                    onPeriod={setStartPeriod}
                    onNow={() => setTimeToNow("start")}
                  />

                  <div className="flex justify-center">
                    <button
                      onClick={handleSwapTime}
                      aria-label="Swap start and end time"
                      className="p-2 rounded-full bg-secondary text-blue-600 hover:bg-secondary/80 transition-all"
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  </div>

                  <TimeField
                    label="End Time"
                    hour={endHour}
                    min={endMin}
                    period={endPeriod}
                    onHour={setEndHour}
                    onMin={setEndMin}
                    onPeriod={setEndPeriod}
                    onNow={() => setTimeToNow("end")}
                  />

                  <p className="text-xs text-gray-300 pt-1">
                    If the end time is earlier than the start time, it&apos;s treated as the next day.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <DateTimeField
                    label="Start"
                    date={startDate}
                    hour={dtStartHour}
                    min={dtStartMin}
                    period={dtStartPeriod}
                    onDate={setStartDate}
                    onHour={setDtStartHour}
                    onMin={setDtStartMin}
                    onPeriod={setDtStartPeriod}
                    onNow={() => setDateTimeToNow("start")}
                  />

                  <div className="flex justify-center">
                    <button
                      onClick={handleSwapDateTime}
                      aria-label="Swap start and end date/time"
                      className="p-2 rounded-full bg-secondary text-blue-600 hover:bg-secondary/80 transition-all"
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  </div>

                  <DateTimeField
                    label="End"
                    date={endDate}
                    hour={dtEndHour}
                    min={dtEndMin}
                    period={dtEndPeriod}
                    onDate={setEndDate}
                    onHour={setDtEndHour}
                    onMin={setDtEndMin}
                    onPeriod={setDtEndPeriod}
                    onNow={() => setDateTimeToNow("end")}
                  />

                  <p className="text-xs text-gray-300 pt-1">
                    Use this mode when the start and end fall on different days.
                  </p>
                </div>
              )}

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
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

          {/* Results Section */}
          <div className="lg:col-span-7">
            {mode === "time" && showResults && timeResults && !timeResults.error ? (
              <ResultsCard
                headline={`${timeResults.hours}h ${timeResults.mins}m`}
                headlineLabel="Total Duration"
                stats={[
                  { label: "Decimal Hours", value: timeResults.decimalHours },
                  { label: "Total Minutes", value: timeResults.totalMinutes.toLocaleString() },
                ]}
                shareUrl={shareUrl}
                copied={copied}
                onCopy={handleCopyShareLink}
              />
            ) : mode === "datetime" && showResults && dateTimeResults && !dateTimeResults.error ? (
              <ResultsCard
                headline={`${dateTimeResults.days}d ${dateTimeResults.hours}h ${dateTimeResults.mins}m`}
                headlineLabel="Total Duration"
                note={
                  dateTimeResults.swapped
                    ? "Note: the end date/time is earlier than the start, showing the duration between them."
                    : undefined
                }
                stats={[
                  { label: "Total Days", value: dateTimeResults.totalDays.toLocaleString() },
                  { label: "Total Hours", value: dateTimeResults.totalHours.toLocaleString() },
                  { label: "Total Minutes", value: dateTimeResults.totalMinutes.toLocaleString() },
                  { label: "Decimal Hours", value: dateTimeResults.decimalHours },
                ]}
                shareUrl={shareUrl}
                copied={copied}
                onCopy={handleCopyShareLink}
              />
            ) : (mode === "time" && showResults && timeResults?.error) ||
              (mode === "datetime" && showResults && dateTimeResults?.error) ? (
              <div
                role="alert"
                className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-700 font-bold flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {mode === "time" ? timeResults?.error : dateTimeResults?.error}
              </div>
            ) : (
              <div className="h-full min-h-[400px] bg-secondary/10 border-4 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all">
                <Clock size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[220px]">
                  Set your times and hit calculate
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

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

function TimeField({
  label, hour, min, period, onHour, onMin, onPeriod, onNow,
}: {
  label: string;
  hour: string;
  min: string;
  period: Period;
  onHour: (v: string) => void;
  onMin: (v: string) => void;
  onPeriod: (v: Period) => void;
  onNow: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
          {label}
        </label>
        <button
          onClick={onNow}
          className="text-[10px] flex items-center gap-1 text-blue-500 hover:text-blue-400 font-bold uppercase"
        >
          <Zap size={10} /> Now
        </button>
      </div>
      <div className="flex gap-2">
        <input
          type="number"
          value={hour}
          onChange={(e) => onHour(e.target.value)}
          aria-label={`${label} hour`}
          className="w-full p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-center font-bold text-sm"
        />
        <span className="self-center font-black text-lg text-gray-300">:</span>
        <input
          type="number"
          value={min}
          onChange={(e) => onMin(e.target.value)}
          aria-label={`${label} minute`}
          className="w-full p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-center font-bold text-sm"
        />
        <select
          value={period}
          onChange={(e) => onPeriod(e.target.value as Period)}
          aria-label={`${label} AM or PM`}
          className="w-20 p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xs"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}

function DateTimeField({
  label, date, hour, min, period, onDate, onHour, onMin, onPeriod, onNow,
}: {
  label: string;
  date: string;
  hour: string;
  min: string;
  period: Period;
  onDate: (v: string) => void;
  onHour: (v: string) => void;
  onMin: (v: string) => void;
  onPeriod: (v: Period) => void;
  onNow: () => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
          {label} Date &amp; Time
        </label>
        <button
          onClick={onNow}
          className="text-[10px] flex items-center gap-1 text-blue-500 hover:text-blue-400 font-bold uppercase"
        >
          <Zap size={10} /> Now
        </button>
      </div>
      <input
        type="date"
        value={date}
        onChange={(e) => onDate(e.target.value)}
        aria-label={`${label} date`}
        className="w-full px-4 py-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm mb-2"
      />
      <div className="flex gap-2">
        <input
          type="number"
          value={hour}
          onChange={(e) => onHour(e.target.value)}
          aria-label={`${label} hour`}
          className="w-full p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-center font-bold text-sm"
        />
        <span className="self-center font-black text-lg text-gray-300">:</span>
        <input
          type="number"
          value={min}
          onChange={(e) => onMin(e.target.value)}
          aria-label={`${label} minute`}
          className="w-full p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none text-center font-bold text-sm"
        />
        <select
          value={period}
          onChange={(e) => onPeriod(e.target.value as Period)}
          aria-label={`${label} AM or PM`}
          className="w-20 p-3 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xs"
        >
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>
    </div>
  );
}

function ResultsCard({
  headline, headlineLabel, stats, note, shareUrl, copied, onCopy,
}: {
  headline: string;
  headlineLabel: string;
  stats: { label: string; value: string }[];
  note?: string;
  shareUrl: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm animate-in fade-in zoom-in-95 duration-300">
      <div className="space-y-2 text-center">
        <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
          {headlineLabel}
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter break-all">
          {headline}
        </h2>
        {note && <p className="text-xs text-gray-300 pt-2">{note}</p>}
      </div>

      <div
        className={`grid gap-4 mt-10 pt-8 border-t border-dashed ${
          stats.length > 2 ? "grid-cols-2" : "grid-cols-2"
        }`}
      >
        {stats.map((s) => (
          <div key={s.label} className="p-4 bg-secondary/50 rounded-2xl text-center">
            <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">{s.label}</p>
            <p className="text-xl font-black">{s.value}</p>
          </div>
        ))}
      </div>

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
                onClick={onCopy}
                className={`px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                  copied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {copied ? (<><Check size={16} /> COPIED</>) : (<><Copy size={16} /> COPY LINK</>)}
              </button>
            </div>
            <p className="text-xs text-gray-300">
              Anyone who opens this link sees the same times and the same result.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}