"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  RotateCcw,
  Info,
  ListFilter,
  BarChart3,
  TrendingDown,
  Layers,
  CheckCircle2,
  Heart,
  Hash,
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

type LCMResult = {
  lcm: number;
  numbers: number[];
  primeFactors: { [key: number]: string };
};

type MethodKey = "prime" | "listing" | "ladder" | "division" | "gcf" | "venn";

const methodOptions: { key: MethodKey; label: string }[] = [
  { key: "prime", label: "Prime Factorization" },
  { key: "listing", label: "Listing Multiples" },
  { key: "ladder", label: "Cake / Ladder Method" },
  { key: "division", label: "Division Method" },
  { key: "gcf", label: "GCF (GCD) Method" },
  { key: "venn", label: "Venn Diagram" },
];

// --- Pure math helpers (no React here, safe to keep outside the component) ---

const getGCD = (a: number, b: number): number => (!b ? Math.abs(a) : getGCD(b, a % b));
const getLCMPair = (a: number, b: number): number =>
  a === 0 || b === 0 ? 0 : Math.abs(a * b) / getGCD(a, b);

const superscripts: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
};
const sup = (n: number) => String(n).split("").map((d) => superscripts[d] ?? d).join("");

function getPrimeFactors(n: number): Record<number, number> {
  const factors: Record<number, number> = {};
  let d = 2;
  let temp = Math.abs(n);
  while (temp >= 2) {
    if (temp % d === 0) {
      factors[d] = (factors[d] || 0) + 1;
      temp /= d;
    } else {
      d++;
    }
  }
  return factors;
}

function getMultiplesUntil(n: number, target: number, minCount = 4) {
  const list: number[] = [];
  let m = n;
  while (m < target || list.length < minCount) {
    list.push(m);
    if (m >= target) break;
    m += n;
  }
  return list;
}

function getLadderSteps(nums: number[]) {
  let row = [...nums];
  const steps: { divisor: number; before: number[]; after: number[] }[] = [];
  const isAllOne = (r: number[]) => r.every((v) => v === 1);
  let divisor = 2;
  let guard = 0;
  while (!isAllOne(row) && guard < 500) {
    guard++;
    const canDivide = row.some((v) => v > 1 && v % divisor === 0);
    if (canDivide) {
      const before = [...row];
      const after = row.map((v) => (v > 1 && v % divisor === 0 ? v / divisor : v));
      steps.push({ divisor, before, after });
      row = after;
    } else {
      divisor++;
    }
  }
  return steps;
}

function getGCFChainSteps(nums: number[]) {
  const steps: { a: number; b: number; gcd: number; lcm: number }[] = [];
  let acc = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const b = nums[i];
    const g = getGCD(acc, b);
    const l = getLCMPair(acc, b);
    steps.push({ a: acc, b, gcd: g, lcm: l });
    acc = l;
  }
  return steps;
}

/**
 * Places every individual prime "copy" into the correct Venn region.
 * Works generally for 2 or 3 sets: for a prime with max exponent m across
 * the numbers, copy k (1..m) belongs to whichever numbers have an exponent >= k.
 */
function getVennRegions(nums: number[]) {
  const factorSets = nums.map((n) => getPrimeFactors(n));
  const allPrimes = Array.from(
    new Set(factorSets.flatMap((f) => Object.keys(f).map(Number)))
  ).sort((a, b) => a - b);

  const regions: Record<string, number[]> = {};
  for (const p of allPrimes) {
    const exps = factorSets.map((f) => f[p] || 0);
    const maxExp = Math.max(...exps);
    for (let k = 1; k <= maxExp; k++) {
      const key = exps.map((e) => (e >= k ? "1" : "0")).join("");
      if (!regions[key]) regions[key] = [];
      regions[key].push(p);
    }
  }
  return regions;
}

function VennDiagram({ nums, regions }: { nums: number[]; regions: Record<string, number[]> }) {
  const cell = (key: string) => (regions[key] || []).join(", ") || "—";

  if (nums.length === 2) {
    return (
      <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto text-foreground">
        <circle cx="150" cy="130" r="100" fill="none" stroke="#3b82f6" strokeWidth="2" />
        <circle cx="250" cy="130" r="100" fill="none" stroke="#22c55e" strokeWidth="2" />
        <text x="60" y="35" fontSize="15" fontWeight="700" className="fill-current">{nums[0]}</text>
        <text x="310" y="35" fontSize="15" fontWeight="700" className="fill-current">{nums[1]}</text>
        <text x="105" y="135" fontSize="13" textAnchor="middle" className="fill-current">{cell("10")}</text>
        <text x="295" y="135" fontSize="13" textAnchor="middle" className="fill-current">{cell("01")}</text>
        <text x="200" y="135" fontSize="13" textAnchor="middle" className="fill-current">{cell("11")}</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto text-foreground">
      <circle cx="200" cy="120" r="100" fill="none" stroke="#22c55e" strokeWidth="2" />
      <circle cx="150" cy="210" r="100" fill="none" stroke="#ef4444" strokeWidth="2" />
      <circle cx="250" cy="210" r="100" fill="none" stroke="#3b82f6" strokeWidth="2" />
      <text x="180" y="35" fontSize="15" fontWeight="700" className="fill-current">{nums[0]}</text>
      <text x="30" y="300" fontSize="15" fontWeight="700" className="fill-current">{nums[1]}</text>
      <text x="335" y="300" fontSize="15" fontWeight="700" className="fill-current">{nums[2]}</text>
      <text x="200" y="90" fontSize="12" textAnchor="middle" className="fill-current">{cell("100")}</text>
      <text x="110" y="235" fontSize="12" textAnchor="middle" className="fill-current">{cell("010")}</text>
      <text x="290" y="235" fontSize="12" textAnchor="middle" className="fill-current">{cell("001")}</text>
      <text x="160" y="150" fontSize="12" textAnchor="middle" className="fill-current">{cell("110")}</text>
      <text x="240" y="150" fontSize="12" textAnchor="middle" className="fill-current">{cell("101")}</text>
      <text x="200" y="245" fontSize="12" textAnchor="middle" className="fill-current">{cell("011")}</text>
      <text x="200" y="180" fontSize="12" textAnchor="middle" className="fill-current">{cell("111")}</text>
    </svg>
  );
}

export default function LCMCalculator() {
  const [isMounted, setIsMounted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const [inputValues, setInputValues] = useState<string>("12, 18, 24");
  const [method, setMethod] = useState<MethodKey>("prime");

  const [shareUrl, setShareUrl] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const calculatorInfo = {
    name: "LCM Calculator",
    href: "/calculators/math/lcm-calculator",
    category: "Mathematics",
  };

  // --- Load a shared link first, then saved history ---
  useEffect(() => {
    setIsMounted(true);

    const params = new URLSearchParams(window.location.search);
    const sharedNumbers = params.get("numbers");
    const sharedMethod = params.get("method") as MethodKey | null;

    if (sharedNumbers) {
      setInputValues(sharedNumbers.split(",").join(", "));
      if (sharedMethod && methodOptions.some((m) => m.key === sharedMethod)) {
        setMethod(sharedMethod);
      }
      setTrigger(1);
      setShowResults(true);
    } else {
      const history = getCalculatorHistory();
      if (history["lcm-calc"]?.data) {
        setInputValues(history["lcm-calc"].data.inputValues || "12, 18, 24");
        if (history["lcm-calc"].data.method) setMethod(history["lcm-calc"].data.method);
        setTrigger(1);
        setShowResults(true);
      }
    }

    const savedTools = getSavedCalculators();
    setIsSaved(savedTools.some((tool) => tool.href === calculatorInfo.href));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    saveCalculatorHistory("lcm-calc", { inputValues, method });
  }, [inputValues, method, isMounted]);

  const handleToggleSave = () => {
    const nowSaved = toggleSavedCalculator(calculatorInfo);
    setIsSaved(nowSaved);
  };

  // --- Calculation engine ---
  const results = useMemo((): LCMResult | { error: string } | null => {
    if (trigger === 0) return null;

    const nums = inputValues
      .split(/[, ]+/)
      .map((n) => parseInt(n.trim()))
      .filter((n) => !isNaN(n) && n !== 0);

    if (nums.length < 2) return { error: "Please enter at least two numbers." };

    try {
      const finalLCM = nums.reduce((acc, curr) => getLCMPair(acc, curr));

      const factorMap: { [key: number]: string } = {};
      nums.forEach((n) => {
        const factors = getPrimeFactors(n);
        factorMap[n] = Object.entries(factors)
          .map(([base, exp]) => `${base}${Number(exp) > 1 ? sup(Number(exp)) : ""}`)
          .join(" × ");
      });

      return { lcm: finalLCM, numbers: nums, primeFactors: factorMap };
    } catch (e) {
      return { error: "Calculation error. Numbers may be too large." };
    }
  }, [trigger, inputValues]);

  const solvedOk = results && !("error" in results) ? results : null;

  // --- Step data for every method, computed once results exist ---
  const steps = useMemo(() => {
    if (!solvedOk) return null;
    const nums = solvedOk.numbers.map((n) => Math.abs(n));
    return {
      listing: nums.map((n) => ({ n, list: getMultiplesUntil(n, solvedOk.lcm) })),
      ladder: getLadderSteps(nums),
      gcfChain: getGCFChainSteps(nums),
      venn: nums.length >= 2 && nums.length <= 3 ? getVennRegions(nums) : null,
      vennNums: nums,
    };
  }, [solvedOk]);

  // --- Share link ---
  useEffect(() => {
    if (!showResults || !solvedOk) {
      setShareUrl("");
      return;
    }
    const params = new URLSearchParams();
    params.set("numbers", solvedOk.numbers.join(","));
    params.set("method", method);
    setShareUrl(`${window.location.origin}${window.location.pathname}?${params.toString()}`);
  }, [showResults, solvedOk, method]);

  const handleCopyShareLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Clipboard access can fail without permission; the link is still visible and selectable.
    }
  }, [shareUrl]);

  // --- Scroll results into view after Calculate, mobile/tablet only ---
  useEffect(() => {
    if (!showResults || !results) return;
    const isMobileOrTablet = typeof window !== "undefined" && window.innerWidth < 1024;
    if (isMobileOrTablet && resultsRef.current) {
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [results, showResults]);

  const handleCalculate = () => {
    setTrigger((prev) => prev + 1);
    setShowResults(true);
  };

  if (!isMounted) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="py-8 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: INPUTS */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl border p-6 shadow-sm relative overflow-hidden">
              <button
                onClick={handleToggleSave}
                aria-label={isSaved ? "Remove LCM Calculator from saved" : "Save LCM Calculator"}
                className={`absolute top-4 right-4 p-2.5 rounded-xl transition-all border ${
                  isSaved
                    ? "bg-red-50 border-red-100 text-red-500 shadow-sm"
                    : "bg-secondary border-transparent text-muted-foreground"
                }`}
              >
                <Heart size={20} className={isSaved ? "fill-current" : ""} />
              </button>

              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <ListFilter className="text-blue-500" size={20} /> Parameters
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Number Set (Comma Separated)
                  </label>
                  <textarea
                    value={inputValues}
                    onChange={(e) => {
                      setInputValues(e.target.value);
                      setShowResults(false);
                    }}
                    className="w-full mt-1 px-4 py-4 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 outline-none transition-all font-bold text-lg min-h-[120px] resize-none"
                    placeholder="12, 18, 24..."
                  />
                  <p className="text-[10px] text-muted-foreground uppercase mt-3 tracking-widest text-center">
                    Enter positive or negative integers
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-black uppercase text-muted-foreground mb-1 block ml-1">
                    Show Steps Using
                  </label>
                  <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value as MethodKey)}
                    className="w-full px-4 py-3 bg-secondary/50 rounded-lg border border-border focus:border-blue-500 outline-none font-bold text-sm appearance-none"
                  >
                    {methodOptions.map((m) => (
                      <option key={m.key} value={m.key}>{m.label}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    onClick={handleCalculate}
                    className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                  >
                    Find LCM <CheckCircle2 size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setInputValues("");
                      setShowResults(false);
                      setTrigger(0);
                      setShareUrl("");
                      window.history.replaceState(null, "", window.location.pathname);
                    }}
                    className="w-full py-2 bg-secondary text-muted-foreground rounded-md font-bold text-xs hover:bg-secondary/80 flex items-center justify-center gap-2 transition-all"
                  >
                    <RotateCcw size={14} /> Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: RESULTS */}
          <div className="lg:col-span-8 space-y-6" ref={resultsRef}>
            {showResults && results && !("error" in results) ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-xl p-8 flex flex-col justify-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                      <Hash size={120} strokeWidth={3} />
                    </div>
                    <p className="text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      Least Common Multiple
                    </p>
                    <h2 className="text-5xl md:text-7xl font-black text-blue-600 tracking-tighter leading-none break-all">
                      {results.lcm.toLocaleString()}
                    </h2>
                  </div>

                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Items Count", value: results.numbers.length },
                    { label: "Smallest In Set", value: Math.min(...results.numbers) },
                    { label: "Largest In Set", value: Math.max(...results.numbers) },
                    { label: "Algorithm", value: "GCD/LCM" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-secondary/20 p-4 rounded-xl border border-border/50 text-center">
                      <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* STEP-BY-STEP SOLUTION */}
                {steps && (
                  <div className="bg-card border rounded-xl p-6 sm:p-8 shadow-sm space-y-6">
                    <h3 className="font-black text-xl flex items-center gap-2">
                      <BarChart3 size={20} className="text-blue-600" /> Step-by-Step Solution
                    </h3>

                    {method === "prime" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">Prime Factorization Method</h4>
                        <div className="space-y-2 mb-4">
                          {results.numbers.map((n) => (
                            <p key={n} className="text-sm">
                              <span className="font-bold">{n}</span> = {results.primeFactors[n]}
                            </p>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Take the highest power of every prime that appears above and multiply
                          them together.
                        </p>
                        <p className="mt-3 font-bold text-blue-600">LCM = {results.lcm.toLocaleString()}</p>
                      </div>
                    )}

                    {method === "listing" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">Listing Multiples Method</h4>
                        <div className="space-y-2">
                          {steps.listing.map(({ n, list }) => (
                            <p key={n} className="text-sm">
                              Multiples of <span className="font-bold">{n}</span>:{" "}
                              {list.map((m, i) => (
                                <span key={i} className={m === results.lcm ? "text-blue-600 font-bold" : ""}>
                                  {m}
                                  {i < list.length - 1 ? ", " : ""}
                                </span>
                              ))}
                              {list[list.length - 1] < results.lcm ? "…" : ""}
                            </p>
                          ))}
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          The smallest number appearing in every list above is the LCM.
                        </p>
                        <p className="mt-1 font-bold text-blue-600">LCM = {results.lcm.toLocaleString()}</p>
                      </div>
                    )}

                    {method === "ladder" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">Cake / Ladder Method</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Divide the whole set by the smallest prime that divides at least one
                          number, carry down any number it doesn't divide evenly, and repeat until
                          every row reads 1.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="text-sm font-mono border-collapse">
                            <tbody>
                              {steps.ladder.map((s, i) => (
                                <tr key={i} className="border-b border-border/50">
                                  <td className="pr-4 py-1 font-bold text-blue-600">{s.divisor}</td>
                                  {s.before.map((v, j) => (
                                    <td key={j} className="px-3 py-1 text-center">{v}</td>
                                  ))}
                                </tr>
                              ))}
                              {steps.ladder.length > 0 && (
                                <tr>
                                  <td className="pr-4 py-1" />
                                  {steps.ladder[steps.ladder.length - 1].after.map((v, j) => (
                                    <td key={j} className="px-3 py-1 text-center font-bold text-blue-600">{v}</td>
                                  ))}
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Multiply every divisor on the left: {steps.ladder.map((s) => s.divisor).join(" × ")} = {results.lcm.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {method === "division" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">Division Method</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          The same divisions as the ladder method, read as a table: each row is
                          the divisor and the values left after dividing.
                        </p>
                        <div className="overflow-x-auto">
                          <table className="min-w-full text-sm border border-border rounded-lg overflow-hidden">
                            <thead className="bg-secondary/50">
                              <tr>
                                <th className="p-2 text-left">Divisor</th>
                                {results.numbers.map((n, i) => (
                                  <th key={i} className="p-2 text-center">{n}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {steps.ladder.map((s, i) => (
                                <tr key={i} className="border-t border-border/50">
                                  <td className="p-2 font-bold text-blue-600">{s.divisor}</td>
                                  {s.after.map((v, j) => (
                                    <td key={j} className="p-2 text-center">{v}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          Stop once every column reads 1, then multiply the divisor column: {steps.ladder.map((s) => s.divisor).join(" × ")} = {results.lcm.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {method === "gcf" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">GCF (GCD) Method</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          LCM(a, b) = |a × b| ÷ GCD(a, b). For more than two numbers, apply the
                          formula pairwise and carry each result into the next step.
                        </p>
                        <div className="space-y-3">
                          {steps.gcfChain.map((s, i) => (
                            <div key={i} className="bg-secondary/30 rounded-lg p-3 text-sm">
                              <p>GCD({s.a}, {s.b}) = {s.gcd}</p>
                              <p>LCM({s.a}, {s.b}) = ({s.a} × {s.b}) ÷ {s.gcd} = {s.lcm.toLocaleString()}</p>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 font-bold text-blue-600">LCM = {results.lcm.toLocaleString()}</p>
                      </div>
                    )}

                    {method === "venn" && (
                      <div>
                        <h4 className="font-bold text-blue-600 mb-3">Venn Diagram Method</h4>
                        {steps.venn ? (
                          <>
                            <p className="text-sm text-muted-foreground mb-4">
                              Each circle holds the prime factors of one number. Shared primes sit
                              in the overlap. Multiply every prime shown, once for each time it
                              appears anywhere in the diagram, to get the LCM.
                            </p>
                            <VennDiagram nums={steps.vennNums} regions={steps.venn} />
                            <p className="mt-4 text-sm text-muted-foreground text-center">
                              LCM = product of every number shown above = {results.lcm.toLocaleString()}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Venn diagrams work cleanly for 2 or 3 numbers. Pick Prime Factorization
                            or the Ladder Method for larger sets.
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* SHARE RESULT */}
                {shareUrl && (
                  <div className="bg-card border rounded-xl p-6 space-y-3">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center gap-2">
                      <Share2 size={14} className="text-blue-600" />
                      Share This Result
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        readOnly
                        value={shareUrl}
                        onFocus={(e) => e.target.select()}
                        aria-label="Shareable link for this LCM result"
                        className="flex-1 px-4 py-3 bg-secondary rounded-lg border-2 border-transparent focus:border-blue-600 outline-none text-xs font-medium truncate"
                      />
                      <button
                        onClick={handleCopyShareLink}
                        className={`px-5 py-3 rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all ${
                          linkCopied ? "bg-green-600 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                      >
                        {linkCopied ? (<><Check size={16} /> COPIED</>) : (<><Copy size={16} /> COPY LINK</>)}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Anyone who opens this link sees the same numbers, method, and LCM.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full min-h-[350px] border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-secondary/10">
                {"error" in (results || {}) ? (
                  <div className="text-center px-6">
                    <Info size={40} className="mx-auto text-red-400 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest text-red-500">
                      {(results as any).error}
                    </p>
                  </div>
                ) : (
                  <>
                    <Layers size={48} className="opacity-10 mb-4" />
                    <p className="text-xs font-black uppercase tracking-widest">
                      Input your numbers to find the common multiple
                    </p>
                  </>
                )}
              </div>
            )}

          
          </div>
        </div>

        <RelatedCalculators calculators={[
          { name: "GCF Calculator", description: "Find Greatest Common Factor", href: "/calculators/math/gcf-calculator", icon: Layers },
          { name: "Fraction Calculator", description: "Simplify & solve fractions", href: "/calculators/math/fraction-calculator", icon: Hash },
        ]} />
      </section>
    </main>
  );
}