"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  RotateCcw,
  Layers,
  CheckCircle2,
  ListFilter,
  CalendarDays,
  Heart,
  Share2,
  Copy,
  Check,
  Clock,
  Sun,
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
const WEEKDAYS_LONG = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return isNaN(d.getTime()) ? null : d;
}

function todayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// How many times `targetWeekday` has occurred from day 1 of a period up to
// and including `dayNumber`, given the weekday of day 1 of that period.
function occurrenceCount(
  dayNumber: number,
  weekdayOfDay1: number,
  targetWeekday: number
): number {
  const firstMatchDay = ((targetWeekday - weekdayOfDay1 + 7) % 7) + 1;
  return Math.floor((dayNumber - firstMatchDay) / 7) + 1;
}

interface WeekdayResult {
  error?: string;
  weekday: string;
  monthName: string;
  day: number;
  year: number;
  dayOfYear: number;
  totalDaysInYear: number;
  daysLeftInYear: number;
  yearProgressPct: number;
  occurrenceInYear: number;
  occurrenceInMonth: number;
  quarter: number;
}

export default function DayOfWeekCalculator() {
  const relatedCalculators = [
    {
      name: "Months From Today",
      description: "Add or subtract months from any date",
      href: "/calculators/time/months-from-today-calculator",
      icon: CalendarDays,
    },
    {
      name: "Time Calculator",
      description: "Calculate time differences and durations",
      href: "/calculators/time/time-calculator",
      icon: Clock,
    },
  ];

  // --- State ---
  const [date, setDate] = useState<string>("");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Day of the Week Calculator",
    href: "/calculators/time/day-of-week-calculator",
    category: "Date & Time",
  };

  // --- Load persisted state or a shared link on first mount ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedDate = params.get("date");

    if (sharedDate) {
      setDate(sharedDate);
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["day-of-week-calc"]?.data;
      if (saved?.date) {
        setDate(saved.date);
      } else {
        setDate(todayISO());
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs to the browser on every change ---
  useEffect(() => {
    saveCalculatorHistory("day-of-week-calc", { date });
  }, [date]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo<WeekdayResult | null>(() => {
    if (trigger === 0) return null;

    if (!date) {
      return {
        error: "Please pick a date.",
      } as WeekdayResult;
    }

    const d = parseISODate(date);
    if (!d) {
      return {
        error: "That date doesn't look valid.",
      } as WeekdayResult;
    }

    const year = d.getUTCFullYear();
    const monthIdx = d.getUTCMonth();
    const day = d.getUTCDate();
    const weekdayIdx = d.getUTCDay();

    const jan1 = new Date(Date.UTC(year, 0, 1));
    const dayOfYear = Math.round((d.getTime() - jan1.getTime()) / 86400000) + 1;
    const totalDaysInYear = isLeapYear(year) ? 366 : 365;
    const daysLeftInYear = totalDaysInYear - dayOfYear;
    const yearProgressPct = Math.round((dayOfYear / totalDaysInYear) * 1000) / 10;

    const jan1Weekday = jan1.getUTCDay();
    const occurrenceInYear = occurrenceCount(dayOfYear, jan1Weekday, weekdayIdx);

    const monthFirst = new Date(Date.UTC(year, monthIdx, 1));
    const monthFirstWeekday = monthFirst.getUTCDay();
    const occurrenceInMonth = occurrenceCount(day, monthFirstWeekday, weekdayIdx);

    const quarter = Math.floor(monthIdx / 3) + 1;

    return {
      weekday: WEEKDAYS_LONG[weekdayIdx],
      monthName: MONTHS_LONG[monthIdx],
      day,
      year,
      dayOfYear,
      totalDaysInYear,
      daysLeftInYear,
      yearProgressPct,
      occurrenceInYear,
      occurrenceInMonth,
      quarter,
    };
  }, [trigger, date]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || results.error) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("date", date);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, date]);

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

    const isMobileOrTablet =
      typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [results, showResults]);

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
                  isSaved
                    ? "Remove Day of the Week Calculator from saved"
                    : "Save Day of the Week Calculator"
                }
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
                <ListFilter className="text-blue-600" size={22} />
                Parameters
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="weekday-date"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Date
                  </label>
                  <input
                    id="weekday-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setDate(todayISO())}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2"
                  >
                    Use today&apos;s date
                  </button>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setTrigger((v) => v + 1);
                      setShowResults(true);
                    }}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setDate(todayISO());
                      setShowResults(false);
                      setTrigger(0);
                      setShareUrl("");
                      window.history.replaceState(null, "", window.location.pathname);
                    }}
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
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] flex items-center justify-center gap-2">
                    <Sun size={14} />
                    Day of the Week
                  </p>
                  <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight break-words">
                    {results.monthName} {results.day}, {results.year} is a{" "}
                    <span className="text-blue-600">{results.weekday}</span>
                  </h2>
                </div>

                {/* Signature element: year-progress bar */}
                <div className="mt-10 pt-8 border-t border-dashed">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-bold uppercase text-gray-300">
                      {results.year} Year Progress
                    </p>
                    <p className="text-xs font-black text-blue-600">
                      {results.yearProgressPct}%
                    </p>
                  </div>
                  <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all"
                      style={{ width: `${results.yearProgressPct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-dashed">
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Day of the Year
                    </p>
                    <p className="text-xl font-black">
                      {results.dayOfYear}{" "}
                      <span className="text-xs font-medium text-gray-300">
                        / {results.totalDaysInYear}
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Days Left in {results.year}
                    </p>
                    <p className="text-xl font-black">{results.daysLeftInYear}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      {results.weekday} #{results.occurrenceInYear}
                    </p>
                    <p className="text-xl font-black">in {results.year}</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      {results.weekday} #{results.occurrenceInMonth}
                    </p>
                    <p className="text-xl font-black">
                      in {results.monthName}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-secondary/30 rounded-2xl text-center">
                  <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                    Quarter
                  </p>
                  <p className="text-xl font-black">
                    Q{results.quarter} {results.year}
                  </p>
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
                            linkCopied
                              ? "bg-green-600 text-white"
                              : "bg-blue-600 text-white hover:bg-blue-700"
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
                        Anyone who opens this link sees the same date and the same result.
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
                <Layers size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[200px]">
                  Ready to find the day of the week
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