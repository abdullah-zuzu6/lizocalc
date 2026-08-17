"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Zap,
  Move,
  CheckCircle2,
  TrendingDown,
  Scale,
  RotateCcw,
  BarChart3,
  Layers,
  Heart,
  ArrowLeftRight,
} from "lucide-react";
import Link from "next/link";

import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";
import RelatedCalculators from "@/components/RelatedCalculators";

// ─────────────────────────────────────────────
// Types & Unit Constants
// ─────────────────────────────────────────────

interface UnitOption {
  label: string;
  value: string;
  factor: number;
}

// Distance units, factor = meters per 1 unit.
const DISTANCE_UNITS: UnitOption[] = [
  { label: "millimeters [mm]", value: "mm", factor: 0.001 },
  { label: "centimeters [cm]", value: "cm", factor: 0.01 },
  { label: "meters [m]", value: "m", factor: 1 },
  { label: "kilometers [km]", value: "km", factor: 1000 },
  { label: "inches [in]", value: "in", factor: 0.0254 },
  { label: "feet [ft]", value: "ft", factor: 0.3048 },
  { label: "yards [yd]", value: "yd", factor: 0.9144 },
  { label: "miles [mi]", value: "mi", factor: 1609.344 },
  { label: "nautical miles [nmi]", value: "nmi", factor: 1852 },
];

// Speed units, factor = meters/second per 1 unit. Grouped the same way
// calculator.net groups them, so the converter dropdowns read the same way
// most people already expect from that reference implementation.
const SPEED_UNIT_GROUPS: { group: string; units: UnitOption[] }[] = [
  {
    group: "Common speed units",
    units: [
      { label: "meters/second [m/s]", value: "mps", factor: 1 },
      { label: "kilometers/hour [km/h]", value: "kmh", factor: 1000 / 3600 },
      { label: "miles/hour [mph]", value: "mph", factor: 1609.344 / 3600 },
      { label: "knots [kn]", value: "kn", factor: 1852 / 3600 },
      { label: "feet/second [ft/s]", value: "ftps", factor: 0.3048 },
    ],
  },
  {
    group: "Other speed units",
    units: [
      { label: "kilometers/minute [km/min]", value: "kmpmin", factor: 1000 / 60 },
      { label: "kilometers/second [km/s]", value: "kmps", factor: 1000 },
      { label: "meters/hour [m/h]", value: "mph_", factor: 1 / 3600 },
      { label: "meters/minute [m/min]", value: "mpmin", factor: 1 / 60 },
      { label: "centimeters/hour [cm/h]", value: "cmph", factor: 0.01 / 3600 },
      { label: "centimeters/minute [cm/min]", value: "cmpmin", factor: 0.01 / 60 },
      { label: "centimeters/second [cm/s]", value: "cmps", factor: 0.01 },
      { label: "millimeters/hour [mm/h]", value: "mmph", factor: 0.001 / 3600 },
      { label: "millimeters/minute [mm/min]", value: "mmpmin", factor: 0.001 / 60 },
      { label: "millimeters/second [mm/s]", value: "mmps", factor: 0.001 },
      { label: "miles/minute [mi/min]", value: "mipmin", factor: 1609.344 / 60 },
      { label: "miles/second [mi/s]", value: "mips", factor: 1609.344 },
      { label: "yards/hour [yd/h]", value: "ydph", factor: 0.9144 / 3600 },
      { label: "yards/minute [yd/min]", value: "ydpmin", factor: 0.9144 / 60 },
      { label: "yards/second [yd/s]", value: "ydps", factor: 0.9144 },
      { label: "feet/hour [ft/h]", value: "ftph", factor: 0.3048 / 3600 },
      { label: "feet/minute [ft/min]", value: "ftpmin", factor: 0.3048 / 60 },
      { label: "inches/hour [in/h]", value: "inph", factor: 0.0254 / 3600 },
      { label: "inches/minute [in/min]", value: "inpmin", factor: 0.0254 / 60 },
      { label: "inches/second [in/s]", value: "inps", factor: 0.0254 },
      { label: "light speed [c]", value: "c", factor: 299792458 },
    ],
  },
];

const ALL_SPEED_UNITS: UnitOption[] = SPEED_UNIT_GROUPS.flatMap((g) => g.units);

// The five common output units shown on the main calculator's result panel.
const OUTPUT_UNIT_META = [
  { key: "kmh", label: "Kilometers / Hour", unit: "km/h" },
  { key: "mph", label: "Miles / Hour", unit: "mph" },
  { key: "mps", label: "Meters / Second", unit: "m/s" },
  { key: "kn", label: "Knots", unit: "kn" },
  { key: "ftps", label: "Feet / Second", unit: "ft/s" },
] as const;

type OutputUnitKey = (typeof OUTPUT_UNIT_META)[number]["key"];

export default function SpeedCalculator() {
  // --- State ---
  // These defaults render identically on the server and on first client
  // paint — no more "isMounted" gate hiding the whole calculator. That gate
  // was the reason CLS was 0.55: the calculator had zero height, then
  // suddenly gained ~450px+ of height right after hydration.
  const [distance, setDistance] = useState<string>("10");
  const [distUnit, setDistUnit] = useState<string>("km");

  // Time Duration is three separate fields (hours / minutes / seconds) that
  // combine into a single duration, instead of one value + one unit
  // dropdown. This lets someone enter "8 hr 4 min 30 sec" as one duration
  // instead of only ever picking a single unit at a time.
  const [timeHours, setTimeHours] = useState<string>("1");
  const [timeMinutes, setTimeMinutes] = useState<string>("0");
  const [timeSeconds, setTimeSeconds] = useState<string>("0");

  // Which unit gets the large, featured result card.
  const [outputUnit, setOutputUnit] = useState<OutputUnitKey>("kmh");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Auto-scroll-to-results (mobile only) ---
  // Results sit beside the inputs in a 2-column grid at the `lg` breakpoint
  // and above, so they're already visible there — no scroll needed. Below
  // `lg` the results stack underneath the inputs, off-screen after Calculate
  // is pressed, so we smooth-scroll them into view.
  const resultsRef = useRef<HTMLDivElement>(null);

  const relatedCalculators = [
    {
      name: "Density Calculator",
      description: "Mass per volume solver",
      href: "/calculators/physics/density-calculator",
      icon: Scale,
    },
    {
      name: "Mass Calculator",
      description: "Solve for m = ρ × V",
      href: "/calculators/physics/mass-calculator",
      icon: Zap,
    },
  ];

  const calculatorInfo = {
    name: "Speed Calculator",
    href: "/calculators/physics/speed-calculator",
    category: "Physics",
  };

  // --- Load persisted state (does NOT block first paint) ---
  useEffect(() => {
    const history = getCalculatorHistory();
    if (history["speed-adv-calc"]?.data) {
      const data = history["speed-adv-calc"].data;
      setDistance(data.distance || "10");
      setDistUnit(data.distUnit || "km");
      setTimeHours(data.timeHours || "1");
      setTimeMinutes(data.timeMinutes || "0");
      setTimeSeconds(data.timeSeconds || "0");
      setOutputUnit(data.outputUnit || "kmh");
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-Save History ---
  useEffect(() => {
    saveCalculatorHistory("speed-adv-calc", {
      distance,
      distUnit,
      timeHours,
      timeMinutes,
      timeSeconds,
      outputUnit,
    });
  }, [distance, distUnit, timeHours, timeMinutes, timeSeconds, outputUnit]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    if (trigger === 0) return null;
    const dVal = parseFloat(distance);

    // Treat a blank field as 0 so someone can, say, leave hours empty and
    // only fill in minutes/seconds without triggering a validation error.
    const hVal = timeHours.trim() === "" ? 0 : parseFloat(timeHours);
    const mVal = timeMinutes.trim() === "" ? 0 : parseFloat(timeMinutes);
    const sVal = timeSeconds.trim() === "" ? 0 : parseFloat(timeSeconds);

    if (
      isNaN(dVal) ||
      isNaN(hVal) ||
      isNaN(mVal) ||
      isNaN(sVal) ||
      hVal < 0 ||
      mVal < 0 ||
      sVal < 0
    ) {
      return { error: "Please enter a valid distance and a positive time." };
    }

    const dFactor =
      DISTANCE_UNITS.find((u) => u.value === distUnit)?.factor || 1;

    const distMeters = dVal * dFactor;
    const totalTimeSeconds = hVal * 3600 + mVal * 60 + sVal;

    if (totalTimeSeconds <= 0) {
      return { error: "Please enter a valid distance and a positive time." };
    }

    const speedMPS = distMeters / totalTimeSeconds;

    return {
      kmh: (speedMPS * 3.6).toFixed(2),
      mph: (speedMPS / (1609.344 / 3600)).toFixed(2),
      mps: speedMPS.toFixed(2),
      kn: (speedMPS / (1852 / 3600)).toFixed(2),
      ftps: (speedMPS / 0.3048).toFixed(2),
      pace: (60 / (speedMPS * 3.6)).toFixed(2), // min/km
    };
  }, [trigger, distance, distUnit, timeHours, timeMinutes, timeSeconds]);

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  // Runs after `results` (re)computes so the results block has already
  // rendered with real content — scrolling one tick earlier would target
  // the still-empty placeholder height and land in the wrong place.
  useEffect(() => {
    if (!showResults || !results) return;

    // `lg` in Tailwind's default scale is 1024px — matches the lg:grid-cols-12
    // breakpoint below where results move beside the inputs instead of below.
    const isMobileOrTablet =
      typeof window !== "undefined" && window.innerWidth < 1024;

    if (isMobileOrTablet && resultsRef.current) {
      // rAF ensures we scroll after the browser has painted the new results
      // block, so scrollIntoView measures its final position, not a stale one.
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, [results, showResults]);

  const featured = OUTPUT_UNIT_META.find((u) => u.key === outputUnit)!;
  const otherUnits = OUTPUT_UNIT_META.filter((u) => u.key !== outputUnit);

  return (
    // Changed from <main> to <div>: page.tsx already renders the page's
    // single <main> landmark. Two <main> elements nested on one page was
    // flagging "Accessibility tree is not well-formed" under Agentic
    // Browsing, on both mobile and desktop reports.
    <div className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* INPUT PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-3xl border p-6 md:p-8 shadow-sm relative overflow-hidden">
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={
                  isSaved
                    ? "Remove Speed Calculator from saved"
                    : "Save Speed Calculator"
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

              <h2 className="text-xl font-black mb-8 flex items-center gap-2 uppercase tracking-tight">
                <Move className="text-blue-600" size={24} />
                Parameters
              </h2>

              <div className="space-y-8">
                <UnitInput
                  id="distance"
                  label="Distance"
                  value={distance}
                  unit={distUnit}
                  options={DISTANCE_UNITS}
                  onValueChange={setDistance}
                  onUnitChange={setDistUnit}
                />

                <HMSInput
                  label="Time Duration"
                  hours={timeHours}
                  minutes={timeMinutes}
                  seconds={timeSeconds}
                  onHoursChange={setTimeHours}
                  onMinutesChange={setTimeMinutes}
                  onSecondsChange={setTimeSeconds}
                />

                <div className="space-y-3">
                  <label
                    htmlFor="output-unit"
                    className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                  >
                    Show Result In
                  </label>
                  <select
                    id="output-unit"
                    value={outputUnit}
                    onChange={(e) => setOutputUnit(e.target.value as OutputUnitKey)}
                    className="w-full px-4 py-4 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-sm cursor-pointer"
                  >
                    {OUTPUT_UNIT_META.map((u) => (
                      <option key={u.key} value={u.key}>
                        {u.label} ({u.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      setTrigger((v) => v + 1);
                      setShowResults(true);
                    }}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE <CheckCircle2 size={20} />
                  </button>
                  <button
                    onClick={() => {
                      setDistance("");
                      setTimeHours("");
                      setTimeMinutes("");
                      setTimeSeconds("");
                      setShowResults(false);
                      setTrigger(0);
                    }}
                    className="flex-1 py-4 bg-secondary text-gray-200 rounded-2xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={18} /> RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-7" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-card border-2 border-blue-600 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-600/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Zap size={120} />
                  </div>
                  <div className="relative z-10 text-center">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.4em] mb-4">
                      Average Speed
                    </p>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-2">
                      {results[featured.key]}
                    </h2>
                    <p className="text-xl font-bold text-gray-300 uppercase">
                      {featured.label} ({featured.unit})
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {otherUnits.map((u) => (
                    <StatCard
                      key={u.key}
                      label={u.label}
                      value={`${results[u.key]} ${u.unit}`}
                    />
                  ))}
                  <StatCard label="Pace (min/km)" value={results.pace} />
                </div>
              </div>
            ) : showResults && results && "error" in results ? (
              <div
                role="alert"
                className="bg-red-50 border-2 border-red-100 rounded-3xl p-8 text-red-700 font-bold flex items-center gap-4"
              >
                <TrendingDown /> {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Layers size={80} className="opacity-10 mb-6" />
                <p className="text-sm font-black uppercase text-gray-300 tracking-[0.2em]">
                  Input distance and time to see results
                </p>
              </div>
            )}
          </div>
        </div>

        {/* SPEED CONVERTER */}
        <SpeedUnitConverter />

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
          <div className="p-8 bg-card border rounded-3xl space-y-4">
            <h3 className="font-black uppercase text-sm flex items-center gap-2 text-blue-600">
              <BarChart3 size={20} /> What is Speed?
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
             
              <Link
                href="/info/physics/speed"
                className="text-blue-300 underline underline-offset-2 hover:text-blue-200"
              >
                Speed
              </Link>{" "}
              is how fast an object moves. It is the rate at which an object covers distance. The standard formula is speed equals distance divided by time. Its standard SI unit is meters per second (m/s)
            </p>
            <div className="p-4 bg-secondary/50 rounded-xl font-mono text-xs font-bold border">
              Speed = Total Distance / Total Time
            </div>
          </div>
          <div className="p-8 bg-card border rounded-3xl space-y-4 text-sm">
            <h3 className="font-black uppercase text-sm text-blue-600">
              Common Speed Conversions
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex justify-between border-b pb-2">
                <span>1 km/h</span> <span>0.621 mph</span>
              </li>
              <li className="flex justify-between border-b pb-2">
                <span>1 m/s</span> <span>3.6 km/h</span>
              </li>
              <li className="flex justify-between">
                <span>1 Knot</span> <span>1.151 mph</span>
              </li>
            </ul>
          </div>
        </div>

        <RelatedCalculators calculators={relatedCalculators} />
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────
// Speed Converter — standalone from/to unit converter
// ─────────────────────────────────────────────

export function SpeedUnitConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("kmh");
  const [toUnit, setToUnit] = useState<string>("mph");

  const converted = useMemo(() => {
    const val = parseFloat(value);
    if (isNaN(val)) return null;

    const from = ALL_SPEED_UNITS.find((u) => u.value === fromUnit);
    const to = ALL_SPEED_UNITS.find((u) => u.value === toUnit);
    if (!from || !to) return null;

    const valueInMps = val * from.factor;
    const result = valueInMps / to.factor;

    // Light speed and other tiny/huge factors need more precision than a
    // flat 2 decimals, otherwise the result rounds straight to 0.00.
    const decimals = Math.abs(result) < 0.01 && result !== 0 ? 8 : 4;
    return result.toFixed(decimals);
  }, [value, fromUnit, toUnit]);

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="bg-card rounded-3xl border p-6 md:p-8 shadow-sm">
      <h2 className="text-lg font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
        <ArrowLeftRight className="text-blue-600" size={22} />
        Speed Converter
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        <div className="space-y-3">
          <label
            htmlFor="conv-from-value"
            className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
          >
            From
          </label>
          <input
            id="conv-from-value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0.00"
            className="w-full px-5 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all"
          />
          <select
            id="conv-from-unit"
            aria-label="Convert from unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full px-4 py-4 bg-secondary/50 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-black text-xs cursor-pointer"
          >
            {SPEED_UNIT_GROUPS.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swapUnits}
          title="Swap units"
          aria-label="Swap From and To units"
          className="mx-auto md:mb-16 p-3 rounded-xl bg-secondary hover:bg-secondary/80 border transition-all"
        >
          <ArrowLeftRight size={20} className="text-blue-600" />
        </button>

        <div className="space-y-3">
          <label
            htmlFor="conv-to-unit"
            className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
          >
            To
          </label>
          <div className="w-full px-5 py-5 bg-secondary/50 rounded-2xl border-2 border-blue-600 font-black text-xl text-blue-600 truncate">
            {converted ?? "—"}
          </div>
          <select
            id="conv-to-unit"
            aria-label="Convert to unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full px-4 py-4 bg-secondary/50 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-black text-xs cursor-pointer"
          >
            {SPEED_UNIT_GROUPS.map((g) => (
              <optgroup key={g.group} label={g.group}>
                {g.units.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function UnitInput({
  id,
  label,
  value,
  unit,
  options,
  onValueChange,
  onUnitChange,
}: {
  id: string;
  label: string;
  value: string;
  unit: string;
  options: UnitOption[];
  onValueChange: (v: string) => void;
  onUnitChange: (u: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label
        htmlFor={`${id}-value`}
        className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
      >
        {label}
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={`${id}-value`}
          type="number"
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          placeholder="0.00"
          className="flex-[2] px-5 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all"
        />
        {/* aria-label gives this select its own accessible name — its
            visual label above is shared with the number input, so the
            select needs a distinct name. This resolves "Select elements
            do not have associated label elements". */}
        <select
          id={`${id}-unit`}
          aria-label={`${label} unit`}
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="flex-1 px-4 py-5 bg-secondary/50 rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-black text-xs cursor-pointer uppercase tracking-tighter"
        >
          {options.map((u) => (
            <option key={u.value} value={u.value}>
              {u.label.includes("[")
                ? u.label.split("[")[1].replace("]", "")
                : u.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Three side-by-side number fields (Hours / Minutes / Seconds) that combine
// into a single duration, e.g. 8 hr + 4 min + 30 sec, rather than forcing a
// single value tied to one unit at a time.
function HMSInput({
  label,
  hours,
  minutes,
  seconds,
  onHoursChange,
  onMinutesChange,
  onSecondsChange,
}: {
  label: string;
  hours: string;
  minutes: string;
  seconds: string;
  onHoursChange: (v: string) => void;
  onMinutesChange: (v: string) => void;
  onSecondsChange: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest">
        {label}
      </label>
      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1">
          <input
            id="time-hours"
            type="number"
            min="0"
            value={hours}
            onChange={(e) => onHoursChange(e.target.value)}
            placeholder="0"
            aria-label={`${label} hours`}
            className="w-full px-4 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all text-center"
          />
          <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest text-center">
            Hours
          </p>
        </div>
        <div className="space-y-1">
          <input
            id="time-minutes"
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => onMinutesChange(e.target.value)}
            placeholder="0"
            aria-label={`${label} minutes`}
            className="w-full px-4 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all text-center"
          />
          <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest text-center">
            Min
          </p>
        </div>
        <div className="space-y-1">
          <input
            id="time-seconds"
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => onSecondsChange(e.target.value)}
            placeholder="0"
            aria-label={`${label} seconds`}
            className="w-full px-4 py-5 bg-secondary rounded-2xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-xl transition-all text-center"
          />
          <p className="text-[9px] font-black uppercase text-gray-300 tracking-widest text-center">
            Sec
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border rounded-3xl p-6 text-center shadow-sm">
      <p className="text-[10px] font-bold uppercase text-gray-300 mb-2 tracking-widest">
        {label}
      </p>
      <p className="text-2xl font-black text-blue-600">{value}</p>
    </div>
  );
}