"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Calendar as CalendarIcon,
  Copy,
  Check,
  Heart,
  RotateCcw,
  Clock,
} from "lucide-react";
import {
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

// ─────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────

function addDays(base: Date, days: number) {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatFull(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatUS(d: Date) {
  return `${pad(d.getMonth() + 1)}/${pad(d.getDate())}/${d.getFullYear()}`;
}

function formatEU(d: Date) {
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function formatISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function formatWritten(d: Date) {
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${month} ${day}${suffix}, ${d.getFullYear()}`;
}

function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function countWeekdays(a: Date, b: Date) {
  let count = 0;
  const cur = new Date(a);
  cur.setDate(cur.getDate() + 1);
  while (cur <= b) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) count++;
    cur.setDate(cur.getDate() + 1);
  }
  return count;
}

interface Props {
  initialTodayISO: string;
  initialTargetISO: string;
  initialFullDate: string;
}

const DEFAULT_DAYS = 200;

export default function DaysFromTodayCalculator({
  initialTargetISO,
  initialFullDate,
}: Props) {
  // Real "now", re-derived client-side in the visitor's own timezone.
  // Falls back to the server-rendered value until mount so there is no
  // layout shift and crawlers already have a correct date in the HTML.
  const [now, setNow] = useState<Date>(() => new Date());
  const [mounted, setMounted] = useState(false);

  const [days, setDays] = useState<number>(DEFAULT_DAYS);
  const [direction, setDirection] = useState<"after" | "before">("after");
  const [startMode, setStartMode] = useState<"today" | "custom">("today");
  const [customDate, setCustomDate] = useState<string>("");

  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });

  const calculatorInfo = {
    name: "200 Days From Today Calculator",
    href: "/calculators/time/200-days-from-today-calculator",
    category: "Date",
  };

  useEffect(() => {
    setMounted(true);
    setNow(new Date());
    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const startDate = useMemo(() => {
    if (startMode === "custom" && customDate) {
      const [y, m, d] = customDate.split("-").map(Number);
      return startOfDay(new Date(y, m - 1, d));
    }
    return startOfDay(now);
  }, [startMode, customDate, now]);

  const targetDate = useMemo(() => {
    const sign = direction === "after" ? 1 : -1;
    return addDays(startDate, sign * days);
  }, [startDate, days, direction]);

  const isDefaultView = startMode === "today" && direction === "after" && days === DEFAULT_DAYS;

  // Live countdown — only meaningful when counting forward from today.
  useEffect(() => {
    if (!mounted) return;
    if (!(startMode === "today" && direction === "after")) return;

    const tick = () => {
      const target = addDays(startOfDay(new Date()), days).getTime();
      const diff = target - Date.now();
      if (diff <= 0) {
        setCountdown({ d: 0, h: 0, m: 0, s: 0 });
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ d, h, m, s });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [mounted, days, startMode, direction]);

  const handleCopy = useCallback((key: string, text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
    });
  }, []);

  const monthsApprox = (days / 30.44).toFixed(1);
  const weeks = Math.floor(days / 7);
  const remDays = days % 7;
  const weekdayCount = countWeekdays(
    direction === "after" ? startDate : targetDate,
    direction === "after" ? targetDate : startDate
  );

  const formats = [
    { key: "full", label: "Full Date", value: formatFull(targetDate) },
    { key: "us", label: "US Format", sub: "MM/DD/YYYY", value: formatUS(targetDate) },
    { key: "eu", label: "European", sub: "DD/MM/YYYY", value: formatEU(targetDate) },
    { key: "iso", label: "ISO 8601", sub: "YYYY-MM-DD", value: formatISO(targetDate) },
    { key: "written", label: "Written", value: formatWritten(targetDate) },
    { key: "short", label: "Short", value: formatShort(targetDate) },
  ];

  const relatedDays = [7, 14, 21,28,30, 45, 60, 90, 120, 150, 180, 200, 250, 300, 365];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-6xl mx-auto space-y-8">
        {/* ── HERO RESULT ── */}
        <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm relative overflow-hidden">
          <button
            onClick={handleToggleSave}
            title={isSaved ? "Remove from saved" : "Save calculator"}
            aria-label={isSaved ? "Remove from saved" : "Save calculator"}
            aria-pressed={isSaved}
            className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
              isSaved
                ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
            }`}
          >
            <Heart size={20} className={isSaved ? "fill-current" : ""} />
          </button>

          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
              {isDefaultView
                ? "200 Days From Today Is"
                : `${days} Days ${direction === "after" ? "From" : "Before"} ${
                    startMode === "today" ? "Today" : "Selected Date"
                  } Is`}
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight break-words">
              {mounted ? formatWritten(targetDate) : initialFullDate}
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-medium">
              {targetDate.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-dashed border-gray-700">
            <div className="p-4 bg-secondary/50 rounded-2xl text-center">
              <p className="text-xl font-black">{days}</p>
              <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">Days</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-2xl text-center">
              <p className="text-xl font-black">
                {weeks}
                <span className="text-sm font-medium text-gray-300"> + {remDays}</span>
              </p>
              <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">Weeks + Days</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-2xl text-center">
              <p className="text-xl font-black">~{monthsApprox}</p>
              <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">Months</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-2xl text-center">
              <p className="text-xl font-black">{weekdayCount}</p>
              <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">Weekdays</p>
            </div>
          </div>

          {/* Countdown — only shown for the live "today forward" case */}
          {startMode === "today" && direction === "after" && (
            <div className="mt-8 pt-8 border-t border-dashed border-gray-700">
              <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-4 flex items-center justify-center gap-2">
                <Clock size={14} /> Live Countdown
              </p>
              <div className="flex items-center justify-center gap-2 sm:gap-4">
                {[
                  { label: "Days", val: countdown.d },
                  { label: "Hrs", val: countdown.h },
                  { label: "Min", val: countdown.m },
                  { label: "Sec", val: countdown.s },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="bg-secondary rounded-xl px-3 py-3 sm:px-5 sm:py-4 text-center min-w-[64px] sm:min-w-[80px]"
                  >
                    <p className="text-2xl sm:text-3xl font-black tabular-nums">
                      {mounted ? pad(unit.val) : "--"}
                    </p>
                    <p className="text-[9px] font-bold uppercase text-gray-300 mt-1">
                      {unit.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── DATE FORMATS ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight">
            Date in Every Format
          </h3>
          <p className="text-gray-300 text-xs mb-6">Tap any card to copy the date.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {formats.map((f) => (
              <button
                key={f.key}
                onClick={() => handleCopy(f.key, f.value)}
                className="text-left p-4 bg-secondary hover:bg-secondary/70 rounded-xl border-2 border-transparent hover:border-blue-600 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                    {f.label}
                  </span>
                  {copiedKey === f.key ? (
                    <Check size={14} className="text-green-400" />
                  ) : (
                    <Copy
                      size={14}
                      className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </div>
                <p className="font-bold text-sm break-words">{f.value}</p>
                {f.sub && <p className="text-[10px] text-gray-400 mt-0.5">{f.sub}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* ── CUSTOM CALCULATOR ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight">
            Custom Date Calculator
          </h3>
          <p className="text-gray-300 text-xs mb-6">
            Calculate any number of days from any date.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 space-y-2">
              <label
                htmlFor="days-input"
                className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
              >
                Days
              </label>
              <input
                id="days-input"
                type="number"
                min={0}
                value={days}
                onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
              />
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="direction-select"
                className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
              >
                Direction
              </label>
              <select
                id="direction-select"
                value={direction}
                onChange={(e) => setDirection(e.target.value as "after" | "before")}
                className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
              >
                <option value="after">From (future)</option>
                <option value="before">Before (past)</option>
              </select>
            </div>

            <div className="flex-1 space-y-2">
              <label
                htmlFor="start-mode-select"
                className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
              >
                Start
              </label>
              <select
                id="start-mode-select"
                value={startMode}
                onChange={(e) => setStartMode(e.target.value as "today" | "custom")}
                className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
              >
                <option value="today">Today</option>
                <option value="custom">Specific Date</option>
              </select>
            </div>

            {startMode === "custom" && (
              <div className="flex-1 space-y-2">
                <label
                  htmlFor="custom-date-input"
                  className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                >
                  Date
                </label>
                <input
                  id="custom-date-input"
                  type="date"
                  value={customDate || formatISO(now)}
                  onChange={(e) => setCustomDate(e.target.value)}
                  className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                />
              </div>
            )}
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 mt-4">
            <div className="flex-1 p-4 bg-blue-900/20 rounded-xl border border-blue-600/20 text-center">
              <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">Result</p>
              <p className="text-lg font-black">{mounted ? formatFull(targetDate) : initialTargetISO}</p>
            </div>
            <button
              onClick={() => {
                setDays(DEFAULT_DAYS);
                setDirection("after");
                setStartMode("today");
                setCustomDate("");
              }}
              className="sm:w-40 py-4 bg-secondary text-gray-200 rounded-xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} /> RESET
            </button>
          </div>
        </div>

        {/* ── CALENDAR VIEW ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-600" /> Calendar View
          </h3>
          <p className="text-gray-300 text-xs mb-6">
            {direction === "after"
              ? `The span from ${formatShort(startDate)} to your target date.`
              : `The span from your target date to ${formatShort(startDate)}.`}
          </p>
          <MiniCalendarRange
            rangeStart={direction === "after" ? startDate : targetDate}
            rangeEnd={direction === "after" ? targetDate : startDate}
            today={startOfDay(now)}
          />
        </div>

        {/* ── QUICK LINKS ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-4 uppercase tracking-tight">
            Other Day Counts
          </h3>
          <div className="flex flex-wrap gap-2">
            {relatedDays.map((n) => (
              <button
                key={n}
                onClick={() => {
                  setDays(n);
                  setDirection("after");
                  setStartMode("today");
                }}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                  days === n && direction === "after" && startMode === "today"
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-secondary border-transparent text-gray-200 hover:border-blue-600/50"
                }`}
              >
                {n} days
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// Compact calendar spanning the months between two dates.
// Renders one grid per month touched by the range, highlighting
// today, the range, and the boundary dates.
// ─────────────────────────────────────────────

function MiniCalendarRange({
  rangeStart,
  rangeEnd,
  today,
}: {
  rangeStart: Date;
  rangeEnd: Date;
  today: Date;
}) {
  const months = useMemo(() => {
    const list: { year: number; month: number }[] = [];
    let cur = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), 1);
    // Cap at 6 months rendered so an accidental huge day count can't
    // freeze the page — the stat row above already shows the full math.
    let guard = 0;
    while (cur <= end && guard < 6) {
      list.push({ year: cur.getFullYear(), month: cur.getMonth() });
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
      guard++;
    }
    return list;
  }, [rangeStart, rangeEnd]);

  const rs = startOfDay(rangeStart).getTime();
  const re = startOfDay(rangeEnd).getTime();
  const lo = Math.min(rs, re);
  const hi = Math.max(rs, re);
  const todayTime = today.getTime();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {months.map(({ year, month }) => {
        const first = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startWeekday = first.getDay();
        const cells: (number | null)[] = Array(startWeekday).fill(null);
        for (let d = 1; d <= daysInMonth; d++) cells.push(d);

        return (
          <div key={`${year}-${month}`}>
            <p className="text-sm font-black uppercase text-gray-200 mb-3">
              {first.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
            <div className="grid grid-cols-7 gap-1 text-center">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={i} className="text-[10px] font-bold text-gray-400 pb-1">
                  {d}
                </div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={i} />;
                const cellTime = new Date(year, month, day).getTime();
                const inRange = cellTime >= lo && cellTime <= hi;
                const isBoundary = cellTime === lo || cellTime === hi;
                const isToday = cellTime === todayTime;

                return (
                  <div
                    key={i}
                    className={`text-xs rounded-lg py-1.5 font-semibold ${
                      isBoundary
                        ? "bg-blue-600 text-white"
                        : inRange
                        ? "bg-blue-900/40 text-blue-200"
                        : isToday
                        ? "border border-blue-600 text-blue-300"
                        : "text-gray-300"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="sm:col-span-2 lg:col-span-3 flex items-center gap-6 pt-2 text-[10px] font-bold uppercase text-gray-300">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-600 inline-block" /> Today / Target
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-blue-900/40 inline-block" /> In Range
        </span>
      </div>
    </div>
  );
}