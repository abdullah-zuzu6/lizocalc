"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  RotateCcw,
  CheckCircle2,
  ListFilter,
  Activity,
  Calculator,
  Heart,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import {
  getCalculatorHistory,
  saveCalculatorHistory,
  getSavedCalculators,
  toggleSavedCalculator,
} from "@/lib/storage";
import RelatedCalculators from "@/components/RelatedCalculators";

export default function BMRCalculator() {
  // --- States ---
  // These defaults are used for both the server and first client render.
  // We do not hide the calculator behind an isMounted gate.
  const [age, setAge] = useState<number>(30);
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(175);
  const [gender, setGender] = useState<"male" | "female">("male");

  const [showResults, setShowResults] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  // --- Share Results state ---
  const [shareUrl, setShareUrl] = useState<string>("");
  const [linkCopied, setLinkCopied] = useState(false);

  // --- Auto-scroll-to-results ---
  const resultsRef = useRef<HTMLDivElement>(null);

  // --- Calculator Metadata ---
  const calculatorInfo = {
    name: "BMR Calculator",
    href: "/calculators/health/bmr-calculator",
    category: "Health",
  };

  const relatedCalculators = [
    {
      name: "BMI Calculator",
      description: "Body Mass Index",
      href: "/calculators/health/bmi-calculator",
      icon: Calculator,
    },
    {
      name: "Calorie Calculator",
      description: "Total Daily Energy Expenditure",
      href: "/calculators/health/calorie-calculator",
      icon: Activity,
    },
  ];

  // --- Load shared link or persisted history ---
  // Shared URL values always take priority over local history.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const sharedAge = params.get("age");
    const sharedWeight = params.get("weight");
    const sharedHeight = params.get("height");
    const sharedGender = params.get("gender");

    if (
      sharedAge !== null ||
      sharedWeight !== null ||
      sharedHeight !== null ||
      sharedGender !== null
    ) {
      const parsedAge = Number(sharedAge);
      const parsedWeight = Number(sharedWeight);
      const parsedHeight = Number(sharedHeight);

      setAge(
        Number.isFinite(parsedAge) && parsedAge > 0 ? parsedAge : 30
      );

      setWeight(
        Number.isFinite(parsedWeight) && parsedWeight > 0
          ? parsedWeight
          : 70
      );

      setHeight(
        Number.isFinite(parsedHeight) && parsedHeight > 0
          ? parsedHeight
          : 175
      );

      setGender(sharedGender === "female" ? "female" : "male");

      setShowResults(true);
      setTrigger((v) => v + 1);
    } else {
      const history = getCalculatorHistory();

      if (history["bmr-calc"]?.data) {
        const data = history["bmr-calc"].data;

        setAge(data.age || 30);
        setWeight(data.weight || 70);
        setHeight(data.height || 175);
        setGender(data.gender || "male");
      }
    }

    // Check if calculator is saved
    const savedTools = getSavedCalculators();

    setIsSaved(
      savedTools.some((tool) => tool.href === calculatorInfo.href)
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Auto-Save Inputs to LocalStorage ---
  useEffect(() => {
    saveCalculatorHistory("bmr-calc", {
      age,
      weight,
      height,
      gender,
    });
  }, [age, weight, height, gender]);

  // --- Toggle Save Logic ---
  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation Engine ---
  const results = useMemo(() => {
    if (trigger === 0) return null;

    if (
      !Number.isFinite(age) ||
      !Number.isFinite(weight) ||
      !Number.isFinite(height)
    ) {
      return {
        error: "Please enter valid numeric values.",
      };
    }

    if (age <= 0 || weight <= 0 || height <= 0) {
      return {
        error: "Age, weight, and height must be greater than zero.",
      };
    }

    // Mifflin-St Jeor Equation
    const bmr =
      gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    return {
      daily: Math.round(bmr),
      monthly: Math.round(bmr * 30),
      yearly: Math.round(bmr * 365),
    };
  }, [trigger, age, weight, height, gender]);

  // --- Build Shareable Link ---
  useEffect(() => {
    if (!showResults || !results || "error" in results) {
      setShareUrl("");
      return;
    }

    const params = new URLSearchParams();

    params.set("age", String(age));
    params.set("weight", String(weight));
    params.set("height", String(height));
    params.set("gender", gender);

    setShareUrl(
      `${window.location.origin}${window.location.pathname}?${params.toString()}`
    );
  }, [showResults, results, age, weight, height, gender]);

  // --- Copy Share Link ---
  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);

      setLinkCopied(true);

      setTimeout(() => {
        setLinkCopied(false);
      }, 2000);
    } catch {
      // Clipboard API can fail in some browsers or permission states.
      // The URL remains visible and selectable.
    }
  }, [shareUrl]);

  // --- Smooth Scroll to Results on Mobile/Tablet ---
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
          {/* LEFT PANEL: PARAMETERS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-card rounded-2xl border p-5 md:p-8 shadow-sm relative overflow-hidden">
              {/* SAVE CALCULATOR BUTTON */}
              <button
                onClick={handleToggleSave}
                title={
                  isSaved
                    ? "Remove from saved"
                    : "Save calculator"
                }
                aria-label={
                  isSaved
                    ? "Remove BMR Calculator from saved"
                    : "Save BMR Calculator"
                }
                aria-pressed={isSaved}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-gray-300 hover:text-foreground"
                }`}
              >
                <Heart
                  size={20}
                  className={isSaved ? "fill-current" : ""}
                />
              </button>

              <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
                <ListFilter
                  className="text-blue-600"
                  size={22}
                />
                Parameters
              </h2>

              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-2 block">
                    Gender
                  </label>

                  <div className="flex bg-secondary p-1 rounded-xl">
                    {(["male", "female"] as const).map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          setGender(g);
                          setTrigger((v) => v + 1);
                          setShowResults(true);
                        }}
                        aria-pressed={gender === g}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg capitalize transition-all ${
                          gender === g
                            ? "bg-background shadow text-blue-600"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="bmr-age"
                      className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                    >
                      Age
                    </label>

                    <span className="text-sm font-black text-blue-600">
                      {age} years
                    </span>
                  </div>

                  <input
                    id="bmr-age"
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => {
                      setAge(Number(e.target.value));
                    }}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
                  />

                  <input
                    type="range"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => {
                      setAge(Number(e.target.value));
                    }}
                    aria-label="Age slider"
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="bmr-weight"
                      className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                    >
                      Weight
                    </label>

                    <span className="text-sm font-black text-blue-600">
                      {weight} kg
                    </span>
                  </div>

                  <input
                    id="bmr-weight"
                    type="number"
                    min="20"
                    max="200"
                    value={weight}
                    onChange={(e) => {
                      setWeight(Number(e.target.value));
                    }}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
                  />

                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={weight}
                    onChange={(e) => {
                      setWeight(Number(e.target.value));
                    }}
                    aria-label="Weight slider"
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Height */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="bmr-height"
                      className="text-[10px] font-black uppercase text-gray-300 tracking-widest"
                    >
                      Height
                    </label>

                    <span className="text-sm font-black text-blue-600">
                      {height} cm
                    </span>
                  </div>

                  <input
                    id="bmr-height"
                    type="number"
                    min="100"
                    max="250"
                    value={height}
                    onChange={(e) => {
                      setHeight(Number(e.target.value));
                    }}
                    className="w-full px-4 py-4 bg-secondary rounded-xl border-2 border-transparent focus:border-blue-600 outline-none font-bold text-lg transition-all"
                  />

                  <input
                    type="range"
                    min="100"
                    max="250"
                    value={height}
                    onChange={(e) => {
                      setHeight(Number(e.target.value));
                    }}
                    aria-label="Height slider"
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                {/* Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setTrigger((v) => v + 1);
                      setShowResults(true);
                    }}
                    className="flex-[2] py-4 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    CALCULATE BMR
                    <CheckCircle2 size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setAge(30);
                      setWeight(70);
                      setHeight(175);
                      setGender("male");
                      setShowResults(false);
                      setTrigger(0);
                      setShareUrl("");
                      setLinkCopied(false);

                      window.history.replaceState(
                        null,
                        "",
                        window.location.pathname
                      );
                    }}
                    className="flex-1 py-4 bg-secondary text-gray-200 rounded-xl font-black text-sm hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={16} />
                    RESET
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div
            className="lg:col-span-7"
            ref={resultsRef}
          >
            {showResults &&
            results &&
            !("error" in results) ? (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                {/* Main Result */}
                <div className="bg-card border-2 border-blue-600/20 rounded-3xl p-6 md:p-12 shadow-sm">
                  <div className="space-y-2 text-center">
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em]">
                      Your Basal Metabolic Rate
                    </p>

                    <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter">
                      {results.daily.toLocaleString()}
                    </h2>

                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mt-4">
                      calories / day
                    </div>
                  </div>

                  {/* Additional Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 pt-8 border-t border-dashed">
                    <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                      <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                        Monthly BMR
                      </p>

                      <p className="text-xl font-black">
                        {results.monthly.toLocaleString()}
                      </p>

                      <span className="text-xs font-medium text-gray-300">
                        calories / month
                      </span>
                    </div>

                    <div className="p-4 bg-secondary/50 rounded-2xl text-center">
                      <p className="text-[10px] font-bold uppercase text-gray-300 mb-1">
                        Yearly BMR
                      </p>

                      <p className="text-xl font-black">
                        {results.yearly.toLocaleString()}
                      </p>

                      <span className="text-xs font-medium text-gray-300">
                        calories / year
                      </span>
                    </div>
                  </div>
                </div>

                {/* Share Results */}
                {shareUrl && (
                  <div className="bg-card border rounded-3xl p-6 md:p-8 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest flex items-center gap-2 mb-4">
                      <Share2
                        size={14}
                        className="text-blue-600"
                      />
                      Share This Result
                    </p>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.target.select()}
                        aria-label="Shareable BMR result link"
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
                            <Check size={16} />
                            COPIED
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            COPY LINK
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-gray-300 mt-3">
                      Anyone who opens this link sees the same age,
                      weight, height, gender, and BMR result.
                    </p>
                  </div>
                )}

              </div>
            ) : showResults &&
              results &&
              "error" in results ? (
              <div
                role="alert"
                className="bg-red-50 border-2 border-red-100 rounded-2xl p-6 text-red-700 font-bold flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                {results.error}
              </div>
            ) : (
              <div className="h-full min-h-[300px] bg-secondary/10 border-4 border-dashed rounded-3xl p-12 text-center flex flex-col items-center justify-center transition-all">
                <Activity
                  size={64}
                  className="opacity-10 mb-6"
                />

                <p className="text-sm font-black uppercase text-gray-300 tracking-widest max-w-[250px]">
                  Enter Your Details to Calculate BMR
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