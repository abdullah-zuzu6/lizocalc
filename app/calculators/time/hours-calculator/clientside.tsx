"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Clock,
  RotateCcw,
  Zap,
  ListFilter,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getConsentPreference,
} from "@/lib/cookies";

type Period = "AM" | "PM";

export default function HoursCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Default values
  const [startHour, setStartHour] = useState("08");
  const [startMin, setStartMin] = useState("00");
  const [startPeriod, setStartPeriod] = useState<Period>("AM");
  const [endHour, setEndHour] = useState("05");
  const [endMin, setEndMin] = useState("30");
  const [endPeriod, setEndPeriod] = useState<Period>("PM");

  const relatedCalculators = [
    {
      name: "Date Calculator",
      description: "Calculate days between",
      href: "/calculators/time/date-calculator",
      icon: Clock,
    },
    
  ];

  // --- Cookie Persistence ---
  useEffect(() => {
    setIsMounted(true);
    const consent = getConsentPreference();
    const history = getCalculatorHistory();

    // Restore state from cookie if consent allows
    if (consent?.functional && history["hours-calc"]?.data) {
      const d = history["hours-calc"].data;
      setStartHour(d.startHour);
      setStartMin(d.startMin);
      setStartPeriod(d.startPeriod);
      setEndHour(d.endHour);
      setEndMin(d.endMin);
      setEndPeriod(d.endPeriod);
      setShowResults(true); // Show results immediately if history exists
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const consent = getConsentPreference();
    if (consent?.functional) {
      saveCalculatorHistory("hours-calc", {
        startHour,
        startMin,
        startPeriod,
        endHour,
        endMin,
        endPeriod,
      });
    }
  }, [startHour, startMin, startPeriod, endHour, endMin, endPeriod, isMounted]);

  // --- Logic ---
  const results = useMemo(() => {
    const get24Hours = (h: string, m: string, p: Period) => {
      let hour = parseInt(h);
      if (p === "PM" && hour !== 12) hour += 12;
      if (p === "AM" && hour === 12) hour = 0;
      return hour * 60 + parseInt(m);
    };
    const startTotal = get24Hours(startHour, startMin, startPeriod);
    let endTotal = get24Hours(endHour, endMin, endPeriod);
    if (endTotal < startTotal) endTotal += 24 * 60;
    const diffMinutes = endTotal - startTotal;
    return {
      hours: Math.floor(diffMinutes / 60),
      mins: diffMinutes % 60,
      totalMinutes: diffMinutes,
      decimalHours: (diffMinutes / 60).toFixed(2),
    };
  }, [startHour, startMin, startPeriod, endHour, endMin, endPeriod]);

  const setTimeToNow = (target: "start" | "end") => {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const p = h >= 12 ? "PM" : "AM";
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

  const handleReset = () => {
    setStartHour("08");
    setStartMin("00");
    setStartPeriod("AM");
    setEndHour("05");
    setEndMin("30");
    setEndPeriod("PM");
    setShowResults(false);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>
              <div className="space-y-6">
                {["start", "end"].map((type) => (
                  <div key={type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase text-muted-foreground">
                        {type} Time
                      </label>
                      <button
                        onClick={() => setTimeToNow(type as any)}
                        className="text-[10px] flex items-center gap-1 text-blue-500 hover:text-blue-600"
                      >
                        <Zap size={10} /> Now
                      </button>
                    </div>
                    <div className="flex gap-1">
                      <input
                        type="number"
                        value={type === "start" ? startHour : endHour}
                        onChange={(e) =>
                          type === "start"
                            ? setStartHour(e.target.value)
                            : setEndHour(e.target.value)
                        }
                        className="w-16 p-2 bg-secondary rounded border text-center font-bold"
                      />
                      <span className="self-center font-bold text-lg">:</span>
                      <input
                        type="number"
                        value={type === "start" ? startMin : endMin}
                        onChange={(e) =>
                          type === "start"
                            ? setStartMin(e.target.value)
                            : setEndMin(e.target.value)
                        }
                        className="w-16 p-2 bg-secondary rounded border text-center font-bold"
                      />
                      <select
                        value={type === "start" ? startPeriod : endPeriod}
                        onChange={(e) =>
                          type === "start"
                            ? setStartPeriod(e.target.value as Period)
                            : setEndPeriod(e.target.value as Period)
                        }
                        className="w-14 p-2 bg-secondary rounded border font-bold text-xs"
                      >
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowResults(true)}
                    className="flex-1 py-3 bg-blue-600 text-white rounded font-bold text-sm hover:bg-blue-700 transition flex items-center justify-center gap-2"
                  >
                    Calculate <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 bg-secondary text-muted-foreground rounded hover:bg-secondary/80 transition"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-8 space-y-6">
            {showResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card border rounded-xl p-8 flex flex-col items-center justify-center">
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                    Total Duration
                  </p>
                  <h2 className="text-5xl font-black text-blue-600 my-4">
                    {results.hours}h {results.mins}m
                  </h2>
                </div>
                <div className="bg-card border rounded-xl p-8 flex flex-col justify-center gap-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-sm font-bold">Decimal Hours</span>
                    <span className="font-mono font-bold text-blue-600">
                      {results.decimalHours}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-bold">Total Minutes</span>
                    <span className="font-mono font-bold">
                      {results.totalMinutes}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-secondary/20 border-2 border-dashed rounded-xl p-12 text-center text-muted-foreground">
                <Clock size={48} className="mx-auto opacity-20 mb-4" />
                <p className="text-sm font-bold uppercase tracking-widest">
                  Configure times and click Calculate
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