"use client";

import { useState, useEffect, useMemo } from "react";
import { Calendar as CalendarIcon, Copy, Check } from "lucide-react";

// ─────────────────────────────────────────────
// Date helpers
// ─────────────────────────────────────────────

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

interface Props {
  initialFullDate: string;
  initialISODate: string;
}

export default function WhatIsTodayDate({ initialFullDate, initialISODate }: Props) {
  // Re-derived client-side in the visitor's own timezone. Falls back to the
  // server-rendered value until mount so there is no layout shift.
  const [now, setNow] = useState<Date>(() => new Date());
  const [mounted, setMounted] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setNow(new Date());

    // Keep the date correct if the page is left open across midnight.
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
  const totalDaysInYear = isLeapYear(year) ? 366 : 365;
  const doy = dayOfYear(now);
  const daysLeft = totalDaysInYear - doy;
  const weeksLeftDays = daysLeft % 7;
  const weeksLeft = Math.floor(daysLeft / 7);

  const formats = [
    { key: "full", label: "Full Date", value: formatFull(now) },
    { key: "us", label: "US Format", sub: "MM/DD/YYYY", value: formatUS(now) },
    { key: "eu", label: "European", sub: "DD/MM/YYYY", value: formatEU(now) },
    { key: "iso", label: "ISO 8601", sub: "YYYY-MM-DD", value: formatISO(now) },
    { key: "written", label: "Written", value: formatWritten(now) },
    { key: "short", label: "Short", value: formatShort(now) },
  ];

  const stats = [
    { label: "Day of the Week", value: now.toLocaleDateString("en-US", { weekday: "long" }) },
    { label: "Day of the Year", value: `${doy} of ${totalDaysInYear}` },
    { label: "Week Number", value: `${weekOfYear(now)}` },
    { label: "Month Number", value: `${now.getMonth() + 1} of 12` },
    { label: `Days Left in ${year}`, value: `${daysLeft}` },
    { label: `Weeks Left in ${year}`, value: `${weeksLeft}w ${weeksLeftDays}d` },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-4 md:py-8 px-4 max-w-6xl mx-auto space-y-8">
        {/* ── HERO RESULT ── */}
        <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm relative overflow-hidden">
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
              Today&apos;s Date Is
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight break-words">
              {mounted ? formatWritten(now) : initialFullDate}
            </h2>
            <p className="text-gray-300 text-sm md:text-base font-medium">
              Day {mounted ? doy : "—"} of {totalDaysInYear} in {year}
            </p>
          </div>

          {/* Stat row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 pt-8 border-t border-dashed border-gray-700">
            {stats.map((s) => (
              <div key={s.label} className="p-4 bg-secondary/50 rounded-2xl text-center">
                <p className="text-xl font-black">{mounted ? s.value : "—"}</p>
                <p className="text-[10px] font-bold uppercase text-gray-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── DATE FORMATS ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight">
            Today&apos;s Date in Every Format
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
                <p className="font-bold text-sm break-words">
                  {mounted ? f.value : initialISODate}
                </p>
                {f.sub && <p className="text-[10px] text-gray-400 mt-0.5">{f.sub}</p>}
              </button>
            ))}
          </div>
        </div>

        {/* ── CALENDAR VIEW ── */}
        <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm">
          <h3 className="text-xl font-black mb-1 uppercase tracking-tight flex items-center gap-2">
            <CalendarIcon size={20} className="text-blue-600" /> This Month
          </h3>
          <p className="text-gray-300 text-xs mb-6">
            Today, {mounted ? formatShort(now) : initialISODate}, highlighted below.
          </p>
          <MiniCalendarMonth today={now} mounted={mounted} />
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single-month calendar grid highlighting today.
// ─────────────────────────────────────────────

function MiniCalendarMonth({ today, mounted }: { today: Date; mounted: boolean }) {
  const { year, month } = useMemo(
    () => ({ year: today.getFullYear(), month: today.getMonth() }),
    [today]
  );

  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startWeekday = first.getDay();
  const cells: (number | null)[] = Array(startWeekday).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  const todayDate = today.getDate();

  return (
    <div className="max-w-sm">
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
          const isToday = mounted && day === todayDate;
          return (
            <div
              key={i}
              className={`text-xs rounded-lg py-1.5 font-semibold ${
                isToday ? "bg-blue-600 text-white" : day ? "text-gray-300" : ""
              }`}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}