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
  Briefcase,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

// ─────────────────────────────────────────────
// Helpers — dates & U.S. federal holidays
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

function isoOf(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function formatLong(d: Date): string {
  return `${MONTHS_LONG[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function formatWeekdayLong(d: Date): string {
  return `${WEEKDAYS_LONG[d.getUTCDay()]}, ${formatLong(d)}`;
}

// U.S. federal holiday observance: if the fixed date falls on a Saturday it's
// observed the Friday before, if it falls on a Sunday it's observed the
// Monday after (per 5 U.S.C. § 6103).
function observedFixedDate(year: number, month0: number, day: number): Date {
  const raw = new Date(Date.UTC(year, month0, day));
  const wd = raw.getUTCDay();
  if (wd === 6) return new Date(raw.getTime() - 86400000);
  if (wd === 0) return new Date(raw.getTime() + 86400000);
  return raw;
}

function nthWeekdayOfMonth(year: number, month0: number, weekday: number, n: number): Date {
  let count = 0;
  const daysInMonth = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(Date.UTC(year, month0, day));
    if (d.getUTCDay() === weekday) {
      count++;
      if (count === n) return d;
    }
  }
  return new Date(Date.UTC(year, month0, daysInMonth));
}

function lastWeekdayOfMonth(year: number, month0: number, weekday: number): Date {
  const daysInMonth = new Date(Date.UTC(year, month0 + 1, 0)).getUTCDate();
  for (let day = daysInMonth; day >= 1; day--) {
    const d = new Date(Date.UTC(year, month0, day));
    if (d.getUTCDay() === weekday) return d;
  }
  return new Date(Date.UTC(year, month0, daysInMonth));
}

const HOLIDAY_DEFS: { name: string; compute: (year: number) => Date }[] = [
  { name: "New Year's Day", compute: (y) => observedFixedDate(y, 0, 1) },
  { name: "Martin Luther King Jr. Day", compute: (y) => nthWeekdayOfMonth(y, 0, 1, 3) },
  { name: "Presidents' Day", compute: (y) => nthWeekdayOfMonth(y, 1, 1, 3) },
  { name: "Memorial Day", compute: (y) => lastWeekdayOfMonth(y, 4, 1) },
  { name: "Juneteenth", compute: (y) => observedFixedDate(y, 5, 19) },
  { name: "Independence Day", compute: (y) => observedFixedDate(y, 6, 4) },
  { name: "Labor Day", compute: (y) => nthWeekdayOfMonth(y, 8, 1, 1) },
  { name: "Indigenous Peoples' Day", compute: (y) => nthWeekdayOfMonth(y, 9, 1, 2) },
  { name: "Veterans Day", compute: (y) => observedFixedDate(y, 10, 11) },
  { name: "Thanksgiving", compute: (y) => nthWeekdayOfMonth(y, 10, 4, 4) },
  { name: "Christmas Day", compute: (y) => observedFixedDate(y, 11, 25) },
];

// Builds a lookup of observed U.S. federal holidays for every year touching
// the given range, one extra year on each side to catch edge cases like
// New Year's Day sliding back into December 31st of the prior year.
function buildHolidayMap(fromYear: number, toYear: number): Map<string, string> {
  const map = new Map<string, string>();
  for (let y = fromYear - 1; y <= toYear + 1; y++) {
    for (const def of HOLIDAY_DEFS) {
      const d = def.compute(y);
      map.set(isoOf(d), def.name);
    }
  }
  return map;
}

type ExclusionMode = "weekends_holidays" | "holidays_only" | "weekends_only" | "none";

const EXCLUSION_OPTIONS: { value: ExclusionMode; label: string }[] = [
  { value: "weekends_holidays", label: "Exclude weekends & public holidays" },
  { value: "holidays_only", label: "Exclude public holidays only" },
  { value: "weekends_only", label: "Exclude weekends only" },
  { value: "none", label: "Include all days" },
];

interface BetweenResult {
  totalDays: number;
  businessDays: number;
  satCount: number;
  sunCount: number;
  holidaysExcluded: { name: string; date: Date }[];
}

function countBusinessDays(
  start: Date,
  endExclusive: Date,
  mode: ExclusionMode
): BetweenResult {
  const excludeWeekends = mode === "weekends_holidays" || mode === "weekends_only";
  const excludeHolidays = mode === "weekends_holidays" || mode === "holidays_only";

  const holidayMap = excludeHolidays
    ? buildHolidayMap(start.getUTCFullYear(), endExclusive.getUTCFullYear())
    : new Map<string, string>();

  let totalDays = 0;
  let businessDays = 0;
  let satCount = 0;
  let sunCount = 0;
  const holidaysExcluded: { name: string; date: Date }[] = [];

  for (let t = start.getTime(); t < endExclusive.getTime(); t += 86400000) {
    totalDays++;
    const d = new Date(t);
    const wd = d.getUTCDay();
    const iso = isoOf(d);

    if (excludeWeekends && (wd === 0 || wd === 6)) {
      if (wd === 6) satCount++;
      else sunCount++;
      continue;
    }
    if (excludeHolidays && holidayMap.has(iso)) {
      holidaysExcluded.push({ name: holidayMap.get(iso) as string, date: d });
      continue;
    }
    businessDays++;
  }

  return { totalDays, businessDays, satCount, sunCount, holidaysExcluded };
}

// Walks forward/backward one calendar day at a time, counting only valid
// business days, until `count` of them have been passed. The start date
// itself is not counted, matching spreadsheet WORKDAY() semantics.
function addBusinessDays(
  base: Date,
  count: number,
  direction: 1 | -1,
  mode: ExclusionMode
): Date {
  const excludeWeekends = mode === "weekends_holidays" || mode === "weekends_only";
  const excludeHolidays = mode === "weekends_holidays" || mode === "holidays_only";

  // Rough year span for the holiday lookup — generous padding since a large
  // business-day count can span several years.
  const yearsSpan = Math.ceil(count / 200) + 1;
  const fromYear = base.getUTCFullYear() - (direction === -1 ? yearsSpan : 0);
  const toYear = base.getUTCFullYear() + (direction === 1 ? yearsSpan : 0);
  const holidayMap = excludeHolidays ? buildHolidayMap(fromYear, toYear) : new Map<string, string>();

  let remaining = count;
  let cursor = base.getTime();

  while (remaining > 0) {
    cursor += direction * 86400000;
    const d = new Date(cursor);
    const wd = d.getUTCDay();
    if (excludeWeekends && (wd === 0 || wd === 6)) continue;
    if (excludeHolidays && holidayMap.has(isoOf(d))) continue;
    remaining--;
  }

  return new Date(cursor);
}

type Mode = "between" | "addSubtract";
type Direction = "add" | "subtract";

export default function BusinessDaysCalculator() {

   const relatedCalculators = [
    {
      name: "Days From Today",
      description: "Add or subtract days from any date",
      href: "/calculators/time/days-from-today-calculator",
      icon: CalendarDays,
    },
    {
      name: "Days Between Two Dates",
      description: "Total days, weeks & more between dates",
      href: "/calculators/time/days-between-dates-calculator",
      icon: Clock,
    },
  ];

 
  // --- Shared state ---
  const [mode, setMode] = useState<Mode>("between");
  const [exclusion, setExclusion] = useState<ExclusionMode>("weekends_holidays");

  // --- "Between Dates" state ---
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [includeEndDate, setIncludeEndDate] = useState<boolean>(false);

  // --- "Add/Subtract" state ---
  const [baseDate, setBaseDate] = useState<string>("");
  const [direction, setDirection] = useState<Direction>("add");
  const [bizDays, setBizDays] = useState<string>("");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Business Days Calculator",
    href: "/calculators/time/business-days-calculator",
    category: "Date & Time",
  };

  const bizDayPresets = [5, 10, 15, 20, 30, 60, 90];

  // --- Load persisted state or a shared link on first mount ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedMode = params.get("mode");

    if (sharedMode === "between" || sharedMode === "addSubtract") {
      setMode(sharedMode);
      setExclusion((params.get("excl") as ExclusionMode) || "weekends_holidays");
      if (sharedMode === "between") {
        setStartDate(params.get("start") || "");
        setEndDate(params.get("end") || "");
        setIncludeEndDate(params.get("incEnd") === "1");
      } else {
        setBaseDate(params.get("base") || "");
        setDirection(params.get("dir") === "subtract" ? "subtract" : "add");
        setBizDays(params.get("days") || "");
      }
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["business-days-calc"]?.data;
      if (saved) {
        setMode(saved.mode || "between");
        setExclusion(saved.exclusion || "weekends_holidays");
        setStartDate(saved.startDate || todayISO());
        setEndDate(saved.endDate || "");
        setIncludeEndDate(!!saved.includeEndDate);
        setBaseDate(saved.baseDate || todayISO());
        setDirection(saved.direction === "subtract" ? "subtract" : "add");
        setBizDays(saved.bizDays || "");
      } else {
        setStartDate(todayISO());
        setBaseDate(todayISO());
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs to the browser on every change ---
  useEffect(() => {
    saveCalculatorHistory("business-days-calc", {
      mode,
      exclusion,
      startDate,
      endDate,
      includeEndDate,
      baseDate,
      direction,
      bizDays,
    });
  }, [mode, exclusion, startDate, endDate, includeEndDate, baseDate, direction, bizDays]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo(() => {
    if (trigger === 0) return null;

    if (mode === "between") {
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
      const rangeEndExclusive = new Date(
        (swapped ? start : end).getTime() + (includeEndDate ? 86400000 : 0)
      );
      const r = countBusinessDays(rangeStart, rangeEndExclusive, exclusion);
      return { mode: "between" as const, swapped, rangeStart, rangeEndExclusive, ...r };
    }

    // addSubtract
    if (!baseDate || bizDays === "") {
      return { error: "Please enter a number of business days and a date." };
    }
    const base = parseISODate(baseDate);
    const count = parseFloat(bizDays);
    if (!base || isNaN(count) || !Number.isInteger(count) || count < 0) {
      return { error: "Please enter a whole, non-negative number of business days." };
    }
    const dir: 1 | -1 = direction === "subtract" ? -1 : 1;
    const resultDate = addBusinessDays(base, count, dir, exclusion);
    return { mode: "addSubtract" as const, resultDate, count };
  }, [trigger, mode, startDate, endDate, includeEndDate, baseDate, direction, bizDays, exclusion]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("excl", exclusion);
    if (mode === "between") {
      params.set("start", startDate);
      params.set("end", endDate);
      if (includeEndDate) params.set("incEnd", "1");
    } else {
      params.set("base", baseDate);
      params.set("dir", direction);
      params.set("days", bizDays);
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, mode, exclusion, startDate, endDate, includeEndDate, baseDate, direction, bizDays]);

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
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results, showResults]);

  const handleReset = () => {
    setExclusion("weekends_holidays");
    setStartDate(todayISO());
    setEndDate("");
    setIncludeEndDate(false);
    setBaseDate(todayISO());
    setDirection("add");
    setBizDays("");
    setShowResults(false);
    setTrigger(0);
    setShareUrl("");
    window.history.replaceState(null, "", window.location.pathname);
  };

  const excludesWeekends = exclusion === "weekends_holidays" || exclusion === "weekends_only";
  const excludesHolidays = exclusion === "weekends_holidays" || exclusion === "holidays_only";

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
                    ? "Remove Business Days Calculator from saved"
                    : "Save Business Days Calculator"
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
                <Briefcase className="text-blue-600" size={22} />
                Parameters
              </h2>

              {/* Mode Tabs */}
              <div className="grid grid-cols-2 gap-2 mb-6 bg-secondary/60 p-1.5 rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMode("between");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "between"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Between Dates
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("addSubtract");
                    setShowResults(false);
                    setTrigger(0);
                  }}
                  className={`py-2.5 rounded-lg font-black text-xs uppercase tracking-tight transition-all ${
                    mode === "addSubtract"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-300 hover:text-foreground"
                  }`}
                >
                  Add / Subtract
                </button>
              </div>

              <div className="space-y-6">
                {mode === "between" ? (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="bd-start"
                        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                      >
                        Start Date
                      </label>
                      <input
                        id="bd-start"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="bd-end"
                        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                      >
                        End Date
                      </label>
                      <input
                        id="bd-end"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                      />
                    </div>
                    <label htmlFor="bd-include-end" className="flex items-start gap-3 cursor-pointer">
                      <input
                        id="bd-include-end"
                        type="checkbox"
                        checked={includeEndDate}
                        onChange={(e) => setIncludeEndDate(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-600 cursor-pointer"
                      />
                      <span>
                        <span className="block text-sm font-bold">Include end date</span>
                        <span className="block text-xs text-gray-300">
                          Counts the end date itself if it&apos;s a business day
                        </span>
                      </span>
                    </label>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="bd-bizdays"
                        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                      >
                        Business Days
                      </label>
                      <input
                        id="bd-bizdays"
                        type="number"
                        min={0}
                        step={1}
                        value={bizDays}
                        onChange={(e) => setBizDays(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
                      />
                      <div className="flex flex-wrap gap-2 pt-1">
                        {bizDayPresets.map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setBizDays(String(n))}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              bizDays === String(n)
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
                        htmlFor="bd-base"
                        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                      >
                        {direction === "add" ? "Add business days to" : "Subtract business days from"}
                      </label>
                      <input
                        id="bd-base"
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
                  </>
                )}

                <div className="space-y-2">
                  <label
                    htmlFor="bd-exclusion"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Options
                  </label>
                  <select
                    id="bd-exclusion"
                    value={exclusion}
                    onChange={(e) => setExclusion(e.target.value as ExclusionMode)}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
                  >
                    {EXCLUSION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
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
                {results.mode === "between" ? (
                  <>
                    <div className="space-y-2 text-center">
                      <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                        Business Days Between Dates
                      </p>
                      <p className="text-xs font-bold text-gray-300">
                        From {formatLong(results.rangeStart)} to{" "}
                        {includeEndDate ? "" : "(but not including) "}
                        {formatLong(
                          new Date(
                            results.rangeEndExclusive.getTime() -
                              (includeEndDate ? 86400000 : 0)
                          )
                        )}
                      </p>
                      <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                        {results.businessDays.toLocaleString()}
                      </h2>
                      <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-2">
                        business {results.businessDays === 1 ? "day" : "days"}
                      </div>
                      {results.swapped && (
                        <p className="text-xs text-gray-300 pt-2">
                          Note: the end date was earlier than the start date — showing the count between them.
                        </p>
                      )}
                      <p className="text-xs text-gray-300 pt-2">
                        {results.totalDays.toLocaleString()} total days −{" "}
                        {(results.satCount + results.sunCount + results.holidaysExcluded.length).toLocaleString()}{" "}
                        {excludesWeekends && excludesHolidays
                          ? "weekend days and holidays"
                          : excludesWeekends
                          ? "weekend days"
                          : excludesHolidays
                          ? "holidays"
                          : "excluded days"}
                      </p>
                    </div>

                    {(excludesWeekends || excludesHolidays) && (
                      <div className="mt-8 pt-8 border-t border-dashed">
                        <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-4">
                          Days Excluded
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {excludesWeekends && (
                            <>
                              <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                                <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                                  Saturdays
                                </p>
                                <p className="text-xl font-black">{results.satCount}</p>
                              </div>
                              <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                                <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                                  Sundays
                                </p>
                                <p className="text-xl font-black">{results.sunCount}</p>
                              </div>
                            </>
                          )}
                        </div>
                        {excludesHolidays && results.holidaysExcluded.length > 0 && (
                          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {results.holidaysExcluded.map((h, i) => (
                              <div
                                key={`${h.name}-${i}`}
                                className="flex items-center justify-between px-4 py-2.5 bg-secondary/30 rounded-xl"
                              >
                                <span className="text-sm font-bold">{h.name}</span>
                                <span className="text-xs text-gray-300 font-mono">
                                  {formatLong(h.date)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="space-y-2 text-center">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                      Result Date
                    </p>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight break-words">
                      {formatWeekdayLong(results.resultDate)}
                    </h2>
                    <p className="text-xs text-gray-300 pt-4 max-w-md mx-auto">
                      That&apos;s {results.count} business{" "}
                      {results.count === 1 ? "day" : "days"}{" "}
                      {direction === "subtract" ? "before" : "after"}{" "}
                      {baseDate ? formatLong(parseISODate(baseDate) as Date) : "the start date"}, skipping{" "}
                      {excludesWeekends && excludesHolidays
                        ? "weekends and public holidays"
                        : excludesWeekends
                        ? "weekends"
                        : excludesHolidays
                        ? "public holidays"
                        : "nothing"}
                      .
                    </p>
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
                <Layers size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[200px]">
                  Ready to calculate business days
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