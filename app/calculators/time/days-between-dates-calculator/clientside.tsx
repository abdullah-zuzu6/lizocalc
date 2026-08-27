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

// Parses a "YYYY-MM-DD" input value as a UTC midnight timestamp so the
// day-count math is never thrown off by the browser's local timezone or
// daylight-saving shifts.
function parseISODate(value: string): Date | null {
  if (!value) return null;
  const d = new Date(`${value}T00:00:00Z`);
  return isNaN(d.getTime()) ? null : d;
}

interface DaysResult {
  error?: string;
  swapped?: boolean;
  totalDays: number;
  weeks: number;
  remainderDays: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DaysBetweenDatesCalculator() {
  const relatedCalculators = [
    {
      name: "Age Calculator",
      description: "Find exact age in years, months & days",
      href: "/calculators/time/age-calculator",
      icon: CalendarDays,
    },
    
  ];

  // --- State ---
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [includeStart, setIncludeStart] = useState<boolean>(false);
  const [includeEnd, setIncludeEnd] = useState<boolean>(false);

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "Days Between Two Dates Calculator",
    href: "/calculators/time/days-between-dates-calculator",
    category: "Date & Time",
  };

  // --- Load persisted state or a shared link on first mount ---
  // A shared link (?start=...&end=...) always wins over locally saved
  // history, since the whole point of sharing is to reproduce someone
  // else's exact result.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedStart = params.get("start");
    const sharedEnd = params.get("end");

    if (sharedStart && sharedEnd) {
      setStartDate(sharedStart);
      setEndDate(sharedEnd);
      setIncludeStart(params.get("incStart") === "1");
      setIncludeEnd(params.get("incEnd") === "1");
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      const saved = history["days-between-dates-calc"]?.data;
      if (saved) {
        setStartDate(saved.startDate || "");
        setEndDate(saved.endDate || "");
        setIncludeStart(!!saved.includeStart);
        setIncludeEnd(!!saved.includeEnd);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-save inputs to the browser on every change ---
  useEffect(() => {
    saveCalculatorHistory("days-between-dates-calc", {
      startDate,
      endDate,
      includeStart,
      includeEnd,
    });
  }, [startDate, endDate, includeStart, includeEnd]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Core calculation ---
  const results = useMemo<DaysResult | null>(() => {
    if (trigger === 0) return null;

    if (!startDate || !endDate) {
      return {
        error: "Please pick both a start date and an end date.",
        totalDays: 0,
        weeks: 0,
        remainderDays: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const start = parseISODate(startDate);
    const end = parseISODate(endDate);

    if (!start || !end) {
      return {
        error: "One of those dates doesn't look valid.",
        totalDays: 0,
        weeks: 0,
        remainderDays: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    // Calendar-day gap between the two dates (this is the "neither date
    // included" figure — the same number you'd get subtracting one date
    // from the other, matching the logic used by timeanddate.com and
    // inchcalculator.com's date duration tools).
    const rawDiffDays = Math.round(
      (end.getTime() - start.getTime()) / 86400000
    );
    const swapped = rawDiffDays < 0;
    const gapDays = Math.abs(rawDiffDays);

    // Each checkbox independently adds one day, so checking both counts
    // the full inclusive span (first date AND last date included).
    const totalDays = gapDays + (includeStart ? 1 : 0) + (includeEnd ? 1 : 0);

    const weeks = Math.floor(totalDays / 7);
    const remainderDays = totalDays % 7;
    const hours = totalDays * 24;
    const minutes = hours * 60;
    const seconds = minutes * 60;

    return { swapped, totalDays, weeks, remainderDays, hours, minutes, seconds };
  }, [trigger, startDate, endDate, includeStart, includeEnd]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results || results.error) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("start", startDate);
    params.set("end", endDate);
    if (includeStart) params.set("incStart", "1");
    if (includeEnd) params.set("incEnd", "1");
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, startDate, endDate, includeStart, includeEnd]);

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
                    ? "Remove Days Between Two Dates Calculator from saved"
                    : "Save Days Between Two Dates Calculator"
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
                <DateInput
                  id="start-date"
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DateInput
                  id="end-date"
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                />

                <div className="space-y-3 bg-secondary/40 rounded-xl p-4 border border-transparent">
                  <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
                    Counting Options
                  </p>
                  <CheckboxRow
                    id="include-start"
                    checked={includeStart}
                    onChange={setIncludeStart}
                    label="Include the start date"
                    hint="Counts the start date itself as day one"
                  />
                  <CheckboxRow
                    id="include-end"
                    checked={includeEnd}
                    onChange={setIncludeEnd}
                    label="Include the end date"
                    hint="Counts the end date itself in the total"
                  />
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
                      setStartDate("");
                      setEndDate("");
                      setIncludeStart(false);
                      setIncludeEnd(false);
                      setShowResults(false);
                      setTrigger(0);
                      setShareUrl("");
                      // Clear any shared-link query params from the URL bar.
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
                    Total Days
                  </p>
                  <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter break-all">
                    {results.totalDays.toLocaleString()}
                  </h2>
                  <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-4">
                    {results.totalDays === 1 ? "day" : "days"}
                  </div>
                  {results.swapped && (
                    <p className="text-xs text-gray-300 pt-2">
                      Note: the end date is earlier than the start date — showing the duration between them.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-dashed">
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Weeks
                    </p>
                    <p className="text-xl font-black">
                      {results.weeks}{" "}
                      <span className="text-xs font-medium text-gray-300">
                        wk {results.remainderDays} d
                      </span>
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Hours
                    </p>
                    <p className="text-xl font-black">
                      {results.hours.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Minutes
                    </p>
                    <p className="text-xl font-black">
                      {results.minutes.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                    <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                      Seconds
                    </p>
                    <p className="text-xl font-black">
                      {results.seconds.toLocaleString()}
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
                <Layers size={64} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[200px]">
                  Ready to calculate days between dates
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

function DateInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
      >
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm transition-all"
      />
    </div>
  );
}

function CheckboxRow({
  id,
  checked,
  onChange,
  label,
  hint,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
}) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 rounded border-gray-500 text-blue-600 focus:ring-blue-600 cursor-pointer"
      />
      <span>
        <span className="block text-sm font-bold">{label}</span>
        <span className="block text-xs text-gray-300">{hint}</span>
      </span>
    </label>
  );
}