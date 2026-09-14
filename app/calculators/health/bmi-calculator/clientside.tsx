"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Heart,
  RotateCcw,
  ListFilter,
  BarChart3,
  Layers,
  CheckCircle2,
  Activity,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import RelatedCalculators from "@/components/RelatedCalculators";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";

export default function BMICalculator() {
  // NOTE: same fix as the density calculator — these defaults are what both
  // the server AND the first client render use. No more "isMounted" gate
  // hiding the whole calculator until after hydration; that was tanking CLS
  // because the entire UI used to pop into existence on the client. We
  // render the full layout immediately with sane defaults, then quietly
  // upgrade values from history (or a shared link) in an effect.
  const [age, setAge] = useState(19);
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(10);
  const [heightCm, setHeightCm] = useState(170);
  const [weight, setWeight] = useState(70);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Share Results state ---
  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  // --- Auto-scroll-to-results (mobile only) ---
  // Results sit beside the inputs in a 2-column grid at the `lg` breakpoint
  // and above, so they're already visible there — no scroll needed. Below
  // `lg` the results stack underneath the inputs, off-screen after Calculate
  // is pressed, so we smooth-scroll them into view.
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "BMI Calculator",
    href: "/calculators/health/bmi-calculator",
    category: "Health",
  };

  // --- Load a shared link or persisted state on first mount ---
  // A shared link (?unit=...&age=...&gender=...&weight=...&heightCm=... or
  // heightFeet/heightInches) always wins over locally saved history, since
  // the whole point of sharing is to reproduce someone else's exact result.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedUnit = params.get("unit");

    if (sharedUnit !== null) {
      const u = sharedUnit === "imperial" ? "imperial" : "metric";
      setUnit(u);
      setAge(Number(params.get("age")) || 19);
      setGender(params.get("gender") === "female" ? "female" : "male");
      setWeight(Number(params.get("weight")) || 70);
      if (u === "imperial") {
        setHeightFeet(Number(params.get("heightFeet")) || 5);
        setHeightInches(Number(params.get("heightInches")) || 10);
      } else {
        setHeightCm(Number(params.get("heightCm")) || 170);
      }
      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();
      if (history["bmi"]?.data) {
        const data = history["bmi"].data;
        setUnit(data.unit || "metric");
        setWeight(data.weight || 70);
        setAge(data.age || 19);
        setGender(data.gender || "male");
        if (data.unit === "imperial") {
          setHeightFeet(data.heightFeet || 5);
          setHeightInches(data.heightInches || 10);
        } else {
          setHeightCm(data.heightCm || 170);
        }
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-Save History ---
  useEffect(() => {
    saveCalculatorHistory("bmi", {
      unit,
      weight,
      age,
      gender,
      heightFeet,
      heightInches,
      heightCm,
    });
  }, [unit, weight, age, gender, heightFeet, heightInches, heightCm]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  const results = useMemo(() => {
    if (trigger === 0) return null;
    let weightKg = unit === "imperial" ? weight * 0.453592 : weight;
    let h_m =
      unit === "imperial"
        ? (heightFeet * 12 + heightInches) * 0.0254
        : heightCm / 100;

    if (!weightKg || !h_m) return null;

    const bmiValue = weightKg / (h_m * h_m);
    const piValue = weightKg / (h_m * h_m * h_m);

    let cat = "",
      col = "";
    if (bmiValue < 18.5) {
      cat = "Underweight";
      col = "text-blue-500";
    } else if (bmiValue < 25) {
      cat = "Normal Weight";
      col = "text-green-500";
    } else if (bmiValue < 30) {
      cat = "Overweight";
      col = "text-yellow-500";
    } else {
      cat = "Obese";
      col = "text-red-500";
    }

    const lowWeight = 18.5 * (h_m * h_m);
    const highWeight = 24.9 * (h_m * h_m);
    const range =
      unit === "imperial"
        ? `${(lowWeight * 2.20462).toFixed(1)} - ${(highWeight * 2.20462).toFixed(1)} lbs`
        : `${lowWeight.toFixed(1)} - ${highWeight.toFixed(1)} kg`;

    return {
      bmi: bmiValue.toFixed(1),
      category: cat,
      color: col,
      healthyWeight: range,
      ponderalIndex: piValue.toFixed(1),
    };
  }, [trigger]);

  // --- Build the shareable link once a valid result exists ---
  useEffect(() => {
    if (!showResults || !results) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("unit", unit);
    params.set("age", String(age));
    params.set("gender", gender);
    params.set("weight", String(weight));
    if (unit === "imperial") {
      params.set("heightFeet", String(heightFeet));
      params.set("heightInches", String(heightInches));
    } else {
      params.set("heightCm", String(heightCm));
    }
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, results, unit, age, gender, weight, heightFeet, heightInches, heightCm]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard API can fail (older browsers, permissions). The link is
      // still visible and selectable in the input, so this fails quietly.
    }
  }, [shareUrl]);

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

  return (
    // Changed from <main> to <div>: page.tsx already renders the page's
    // single <main> landmark. Two <main> elements on one page is what was
    // flagging "Accessibility tree is not well-formed" in Agentic Browsing.
    <div className="min-h-screen bg-background">
      <section className="py-12 px-4 max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* INPUT PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-2xl border p-6 shadow-sm relative overflow-hidden">
              {/* SAVE BUTTON */}
              <button
                onClick={handleToggleSave}
                title={isSaved ? "Remove from saved" : "Save calculator"}
                aria-label={
                  isSaved
                    ? "Remove BMI Calculator from saved"
                    : "Save BMI Calculator"
                }
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
                <ListFilter className="text-blue-600" size={20} /> Parameters
              </h2>

              <div className="space-y-6">
                <div className="flex bg-secondary p-1.5 rounded-xl">
                  {(["metric", "imperial"] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => setUnit(u)}
                      className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${
                        unit === u
                          ? "bg-background text-blue-600 shadow-sm"
                          : "text-muted-foreground"
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bmi-age"
                      className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block"
                    >
                      Age
                    </label>
                    <input
                      id="bmi-age"
                      type="number"
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bmi-gender"
                      className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block"
                    >
                      Gender
                    </label>
                    <select
                      id="bmi-gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value as "male" | "female")}
                      className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block">
                    Height
                  </label>
                  {unit === "metric" ? (
                    <div className="relative">
                      <input
                        aria-label="Height in centimeters"
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-12"
                      />
                      <span className="absolute right-4 top-3 text-xs font-bold text-muted-foreground">
                        cm
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <div className="relative">
                        <input
                          aria-label="Height in feet"
                          type="number"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(Number(e.target.value))}
                          className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-8"
                          placeholder="ft"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-bold text-muted-foreground">
                          ft
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          aria-label="Height in inches"
                          type="number"
                          value={heightInches}
                          onChange={(e) => setHeightInches(Number(e.target.value))}
                          className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20 pr-8"
                          placeholder="in"
                        />
                        <span className="absolute right-3 top-3 text-[10px] font-bold text-muted-foreground">
                          in
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="bmi-weight"
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-2 block"
                  >
                    Weight ({unit === "metric" ? "kg" : "lbs"})
                  </label>
                  <input
                    id="bmi-weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="w-full p-3 bg-secondary rounded-xl border-none font-bold outline-none focus:ring-2 ring-blue-500/20"
                  />
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => {
                      setTrigger((t) => t + 1);
                      setShowResults(true);
                    }}
                    className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all flex items-center justify-center gap-2"
                  >
                    Calculate BMI <CheckCircle2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setShowResults(false);
                      setTrigger(0);
                      setShareUrl("");
                      window.history.replaceState(null, "", window.location.pathname);
                    }}
                    className="w-full py-2.5 bg-secondary text-muted-foreground rounded-xl font-bold text-xs hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RESULTS PANEL */}
          <div className="lg:col-span-8" ref={resultsRef}>
            {showResults && results ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-sm">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-[0.3em] mb-4">
                      BMI Score
                    </p>
                    <h2 className={`text-7xl font-black tracking-tighter mb-2 ${results.color}`}>
                      {results.bmi}
                    </h2>
                    <p className={`font-black uppercase text-sm tracking-widest ${results.color}`}>
                      {results.category}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card border rounded-3xl p-6 shadow-sm">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">
                        Healthy Range
                      </p>
                      <p className="text-xl font-black text-foreground">
                        {results.healthyWeight}
                      </p>
                    </div>
                    <div className="bg-card border rounded-3xl p-6 shadow-sm">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">
                        Ponderal Index
                      </p>
                      <p className="text-xl font-black text-foreground">
                        {results.ponderalIndex}{" "}
                        <span className="text-sm font-bold text-muted-foreground">kg/m³</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card border rounded-[2rem] p-8 shadow-sm">
                  <h3 className="text-[10px] font-black text-muted-foreground uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                    <Activity size={16} className="text-blue-500" /> Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
                    <p>
                      Body Mass Index (BMI) is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass.
                    </p>
                    <p>
                      The Ponderal Index (PI) is similar to BMI but provides more accurate results for very tall or very short individuals by using the cube of the height.
                    </p>
                  </div>
                </div>

                {/* Share Results */}
                {shareUrl && (
                  <div className="bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2 mb-4">
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
                    <p className="text-xs text-muted-foreground mt-3">
                      Anyone who opens this link sees the same inputs and BMI result.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[450px] bg-secondary/10 border-4 border-dashed rounded-[3rem] p-12 text-center flex flex-col items-center justify-center">
                <Activity size={60} className="opacity-5 mb-6" />
                <p className="text-sm font-black uppercase text-muted-foreground tracking-widest">
                  Enter parameters to see your health metrics
                </p>
              </div>
            )}
          </div>
        </div>

        <RelatedCalculators
          calculators={[
            {
              name: "TDEE Calculator",
              description: "Calculate total daily energy expenditure",
              href: "/calculators/health/tdee-calculator",
              icon: Layers,
            },
            {
              name: "BMR Calculator",
              description: "Calculate basal metabolic rate",
              href: "/calculators/health/bmr-calculator",
              icon: BarChart3,
            },
          ]}
        />
      </section>
    </div>
  );
}