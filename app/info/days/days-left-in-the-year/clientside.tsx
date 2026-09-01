"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon, Copy, Check } from "lucide-react";

// ─────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────

function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function dayOfYear(d: Date) {
  const start = new Date(d.getFullYear(), 0, 1);
  return Math.floor((d.getTime() - start.getTime()) / 86400000) + 1;
}

function weekOfYear(d: Date) {
  // ISO-8601 week number
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function formatShort(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year: number, monthIndex: number) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

interface Props {
  initialFullDate: string;
  initialISODate: string;
}

export default function DaysLeftInYear({ initialISODate }: Props) {
  // Re-derived client-side in the visitor's own timezone. Falls back to the
  // server-rendered value until mount so there is no layout shift.
  const [now, setNow] = useState<Date>(() => new Date());
  const [mounted, setMounted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    // Keep the count correct if the page is left open across midnight.
    const id = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(id);
  }, []);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
    });
  };

  const year = now.getFullYear();
  const leap = isLeapYear(year);
  const totalDaysInYear = leap ? 366 : 365;
  const doy = dayOfYear(now);
  const daysLeft = totalDaysInYear - doy;
  const weeksLeft = Math.floor(daysLeft / 7);
  const weeksLeftRemDays = daysLeft % 7;
  const hoursLeft = daysLeft * 24;
  const percentComplete = Math.round((doy / totalDaysInYear) * 100);
  const yearEnd = new Date(year, 11, 31);
  const currentWeek = weekOfYear(now);
  const totalWeeks = weekOfYear(yearEnd) === 1 ? 52 : weekOfYear(yearEnd);

  const shareCards = [
    { key: "days", label: "Days Left", value: `${daysLeft}` },
    { key: "weeks", label: "Weeks + Days Left", value: `${weeksLeft}w ${weeksLeftRemDays}d` },
    { key: "hours", label: "Hours Left (approx.)", value: `${hoursLeft.toLocaleString()}` },
    { key: "percent", label: "Year Complete", value: `${percentComplete}%` },
  ];

  const stats = [
    { label: "Day of the Year", value: `${doy} of ${totalDaysInYear}` },
    { label: "Week Number", value: `${currentWeek} of ${totalWeeks}` },
    { label: "Leap Year?", value: leap ? "Yes" : "No" },
    { label: "End of Year", value: formatShort(yearEnd) },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-6xl mx-auto space-y-8">
        {/* ── HERO RESULT ── */}
        <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm relative overflow-hidden">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
              Days Left in {year}
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight break-words">
              {mounted ? daysLeft : "—"}
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-medium">
              {mounted
                ? `${weeksLeft} weeks and ${weeksLeftRemDays} days remaining until ${formatShort(
                    yearEnd
                  )}`
                : "Calculating..."}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${mounted ? percentComplete : 0}%` }}
              />
            </div>
            <p className="text-center text-[10px] font-bold uppercase text-gray-300 mt-2 tracking-widest">
              {mounted ? `${percentComplete}% of ${year} complete` : "—"}
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-dashed border-gray-700">
            {stats.map((s) => (
              <div key={s.label} className="p-4 bg-secondary/50 rounded-2xl text-center">
                <p className="text-xl font-black">{mounted ? s.value : "—"}</p>
                <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SHARE CARDS ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight">
            Time Left, In Different Units
          </h3>
          <p className="text-gray-300 text-xs mb-6">Tap any card to copy the value.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shareCards.map((f) => (
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
                <p className="font-bold text-sm break-words">
                  {mounted ? f.value : "—"}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* ── CALENDAR VIEW ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-600" /> Rest of {year}
          </h3>
          <p className="text-gray-300 text-xs mb-6">
            Today, {mounted ? formatShort(now) : initialISODate}, through December 31.
          </p>
          <RemainingMonthsGrid today={now} mounted={mounted} />
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// Compact list of the remaining months of the year, each showing how
// many days are left in that month.
// ─────────────────────────────────────────────

function RemainingMonthsGrid({ today, mounted }: { today: Date; mounted: boolean }) {
  const { year, month, date } = useMemo(
    () => ({ year: today.getFullYear(), month: today.getMonth(), date: today.getDate() }),
    [today]
  );

  const months = useMemo(() => {
    const list: { name: string; daysRemaining: number; isCurrent: boolean }[] = [];
    for (let m = month; m < 12; m++) {
      const total = daysInMonth(year, m);
      const remaining = m === month ? total - date : total;
      list.push({ name: MONTH_NAMES[m], daysRemaining: remaining, isCurrent: m === month });
    }
    return list;
  }, [year, month, date]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {months.map((m) => (
        <div
          key={m.name}
          className={`p-4 rounded-xl text-center border-2 ${
            m.isCurrent
              ? "bg-blue-900/20 border-blue-600/40"
              : "bg-secondary/50 border-transparent"
          }`}
        >
          <p className="text-sm font-black uppercase text-gray-200">{m.name}</p>
          <p className="text-lg font-black mt-1">{mounted ? m.daysRemaining : "—"}</p>
          <p className="text-[10px] font-bold uppercase text-gray-300 mt-0.5">
            days left
          </p>
        </div>
      ))}
    </div>
  );
}