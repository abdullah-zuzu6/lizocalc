"use client";

// DaysFromTodayWidget.tsx
// Renders a live "X days from today" reference block.
// All dates auto-update based on the user's real current date —
// no hardcoded dates, always accurate.

import { useMemo } from "react";

// ── helper: add N calendar days to a Date ──
function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

// ── helper: format Date → "Weekday, Month D, YYYY" ──
function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ── helper: short format for table ──
function fmtShort(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── helper: weekday only ──
function weekday(d: Date): string {
  return d.toLocaleDateString("en-US", { weekday: "long" });
}

// ── helper: "M/D/YYYY" format ──
function fmtSlash(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export default function DaysFromTodayWidget() {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const rows = useMemo(
    () => [
      { label: "28 days from today", days: 28 },
      { label: "30 days from today", days: 30 },
      { label: "45 days from today", days: 45 },
      { label: "60 days from today", days: 60 },
      { label: "90 days from today", days: 90 },
      { label: "180 days from today", days: 180 },
    ],
    []
  );

  const todayStr = fmt(today);

  return (
    <section
      className="max-w-6xl mx-auto px-6 pb-4"
      aria-label="Days from today reference"
    >
      {/* ── Section header ── */}
      <div className="bg-blue-950/50 border border-blue-700 rounded-2xl p-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          📅 What Is 90 / 60 / 45 / 30 / 28 Days From Today?
        </h2>
        <p className="text-blue-200 text-sm">
          Auto-calculated from today's real date:{" "}
          <strong className="text-white">{todayStr}</strong>. Updates every day
          automatically.
        </p>
      </div>

      {/* ── Card grid — large, scannable, SEO-friendly ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {rows.map(({ label, days }) => {
          const result = addDays(today, days);
          return (
            <div
              key={days}
              className="bg-gray-800/60 border border-gray-700 rounded-xl p-5 hover:border-blue-500/50 transition-colors"
            >
              <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-1">
                {label}
              </p>
              <p className="text-green-400 text-2xl font-bold mb-1">
                {fmtShort(result)}
              </p>
              <p className="text-gray-400 text-sm">{weekday(result)}</p>

              {/* Machine-readable hidden span for SEO / AI parsers */}
              <span className="sr-only">
                {label} ({fmtSlash(today)}) = {fmtShort(result)},{" "}
                {weekday(result)}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Detailed table — covers search console query patterns ── */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-white border border-gray-700 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-blue-900/70">
              <th className="p-4 text-left font-semibold">Query</th>
              <th className="p-4 text-left font-semibold">From Date</th>
              <th className="p-4 text-left font-semibold">Result Date</th>
              <th className="p-4 text-left font-semibold">Day of Week</th>
            </tr>
          </thead>
          <tbody className="bg-gray-800/50 divide-y divide-gray-700">
            {rows.map(({ days }) => {
              const result = addDays(today, days);
              const todaySlash = fmtSlash(today);
              return (
                <tr key={days}>
                  <td className="p-4 font-semibold text-yellow-300">
                    {days} days from {todaySlash}
                  </td>
                  <td className="p-4 text-gray-300">{fmtShort(today)}</td>
                  <td className="p-4 font-bold text-green-400">
                    {fmtShort(result)}
                  </td>
                  <td className="p-4 text-gray-400">{weekday(result)}</td>
                </tr>
              );
            })}
            {/* Backward / "before today" rows */}
            {[28, 30, 45, 60, 90, 180].map((days) => {
              const result = addDays(today, -days);
              const todaySlash = fmtSlash(today);
              return (
                <tr key={`-${days}`}>
                  <td className="p-4 font-semibold text-orange-300">
                    {days} days before {todaySlash}
                  </td>
                  <td className="p-4 text-gray-300">{fmtShort(today)}</td>
                  <td className="p-4 font-bold text-orange-400">
                    {fmtShort(result)}
                  </td>
                  <td className="p-4 text-gray-400">{weekday(result)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-gray-500 text-xs mt-3 text-center">
        All dates calculated from today: <strong className="text-gray-400">{todayStr}</strong>.
        Results update automatically when the date changes.
      </p>
    </section>
  );
}