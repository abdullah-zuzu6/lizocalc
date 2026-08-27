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
  Plus,
  Minus,
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

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

interface DateFormats {
  weekdayLong: string; // Wednesday, October 8, 2026
  monthDayYear: string; // October 8, 2026
  dayMonthYear: string; // 8 October 2026
  shortUS: string; // 10/8/26
  shortIntl: string; // 8/10/26
  iso: string; // 2026-10-08
}

function buildFormats(d: Date): DateFormats {
  const year = d.getUTCFullYear();
  const monthIdx = d.getUTCMonth();
  const day = d.getUTCDate();
  const weekday = d.getUTCDay();
  const yy = String(year).slice(-2);

  return {
    weekdayLong: `${WEEKDAYS_LONG[weekday]}, ${MONTHS_LONG[monthIdx]} ${day}, ${year}`,
    monthDayYear: `${MONTHS_LONG[monthIdx]} ${day}, ${year}`,
    dayMonthYear: `${day} ${MONTHS_LONG[monthIdx]} ${year}`,
    shortUS: `${monthIdx + 1}/${day}/${yy}`,
    shortIntl: `${day}/${monthIdx + 1}/${yy}`,
    iso: `${year}-${pad2(monthIdx + 1)}-${pad2(day)}`,
  };
}

type Direction = "add" | "subtract";

interface DaysFromResult {
  error?: string;
  formats: DateFormats;
}

export default function DaysFromTodayCalculator() {
  const relatedCalculators = [
    {
      name: "Days Between Two Dates",
      description: "Total days, weeks & more between dates",
      href: "/calculators/time/days-between-dates-calculator",
      icon: CalendarDays,
    },
   
  ];

  // --- State ---
  const [days, setDays] = useState<string>("");
  const [direction, setDirection] = useState<Direction>("add");
  const [startDate, setStartDate] = useState<string>("");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Days From Today Calculator",
    href: "/calculators/time/days-from-today-calculator",
    category: "Date & Time",
  };

  const dayPresets = [7, 14, 30, 45, 60, 90, 120];

  // --- Load persisted state or a shared link on first mount ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedDays = params.get("days");
    const sharedDate = params.get("date");
    const sharedDir = params.get("dir");

    if (sharedDays && sharedDate) {
      setDays(sharedDays);
      setStartDate(sharedDate);
      setDirection(sharedDir === "subtract" ? "subtract" : "add");
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["days-from-today-calc"]?.data;
      if (saved) {
        setDays(saved.days || "");
        setStartDate(saved.startDate || todayISO());
        setDirection(saved.direction === "subtract" ? "subtract" : "add");
      } else {
        setStartDate(todayISO());
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs to the browser on every change ---
  useEffect(() => {
    saveCalculatorHistory("days-from-today-calc", {
      days,
      startDate,
      direction,
    });
  }, [days, startDate, direction]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo<DaysFromResult | null>(() => {
    if (trigger === 0) return null;

    if (!startDate || days === "") {
      return {
        error: "Please enter a number of days and a date.",
        formats: buildFormats(new Date()),
      };
    }

    const base = parseISODate(startDate);
    const dayCount = parseFloat(days);

    if (!base || isNaN(dayCount)) {
      return {
        error: "That number of days or date doesn't look valid.",
        formats: buildFormats(new Date()),
      };
    }

    const delta = direction === "subtract" ? -Math.abs(dayCount) : Math.abs(dayCount);
    const resultDate = new Date(base.getTime() + delta * 86400000);

    return { formats: buildFormats(resultDate) };
  }, [trigger, days, startDate, direction]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || results.error) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("days", days);
    params.set("date", startDate);
    params.set("dir", direction);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, days, startDate, direction]);

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

  const handleCopyFormat = useCallback(async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFormat(key);
      setTimeout(() => setCopiedFormat((cur) => (cur === key ? null : cur)), 2000);
    } catch {
      // Fails quietly; the value is still visible on screen.
    }
  }, []);

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

  const formatRows: { key: keyof DateFormats; label: string }[] = results && !results.error
    ? [
        { key: "monthDayYear", label: "Month Day, Year" },
        { key: "dayMonthYear", label: "Day Month Year" },
        { key: "shortUS", label: "Short (M/D/YY)" },
        { key: "shortIntl", label: "Short (D/M/YY)" },
        { key: "iso", label: "ISO (YYYY-MM-DD)" },
      ]
    : [];

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
                    ? "Remove Days From Today Calculator from saved"
                    : "Save Days From Today Calculator"
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
                    htmlFor="days-value"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Number of Days
                  </label>
                  <input
                    id="days-value"
                    type="number"
                    min={0}
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    placeholder="e.g. 45"
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
                  />
                  <div className="flex flex-wrap gap-2 pt-1">
                    {dayPresets.map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setDays(String(n))}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          days === String(n)
                            ? "bg-blue-600 text-white"
                            : "bg-secondary text-gray-300 hover:text-foreground"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest block">
                    Direction
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDirection("add")}
                      className={`py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        direction === "add"
                          ? "bg-blue-600 text-white"
                          : "bg-secondary text-gray-300 hover:text-foreground"
                      }`}
                    >
                      <Plus size={16} /> ADD
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirection("subtract")}
                      className={`py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${
                        direction === "subtract"
                          ? "bg-blue-600 text-white"
                          : "bg-secondary text-gray-300 hover:text-foreground"
                      }`}
                    >
                      <Minus size={16} /> SUBTRACT
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="start-date"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    {direction === "add" ? "Add days to" : "Subtract days from"}
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setStartDate(todayISO())}
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
                      setDays("");
                      setDirection("add");
                      setStartDate(todayISO());
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
                  <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                    Result Date
                  </p>
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                    {results.formats.weekdayLong}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-10 pt-8 border-t border-dashed">
                  {formatRows.map(({ key, label }) => {
                    const value = results.formats[key];
                    const isCopied = copiedFormat === key;
                    return (
                      <div
                        key={key}
                        className="p-4 bg-secondary/50 rounded-2xl flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                            {label}
                          </p>
                          <p className="text-sm font-black truncate">{value}</p>
                        </div>
                        <button
                          onClick={() => handleCopyFormat(key, value)}
                          aria-label={`Copy ${label}`}
                          className={`shrink-0 p-2 rounded-lg transition-all ${
                            isCopied
                              ? "bg-green-600 text-white"
                              : "bg-secondary text-gray-300 hover:text-foreground border border-transparent"
                          }`}
                        >
                          {isCopied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      </div>
                    );
                  })}
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
                        Anyone who opens this link sees the same days, direction, and date.
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
                  Ready to calculate a future or past date
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