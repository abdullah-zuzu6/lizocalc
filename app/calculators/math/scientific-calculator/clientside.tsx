"use client";

import { useState, useEffect } from "react";
import RelatedCalculators from "@/components/RelatedCalculators";
import { Percent, Calculator, Sigma } from "lucide-react";

export default function CasioCalculatorAdvanced() {

const relatedCalculators = [
{
name: "Percentage Calculator",
description: "Calculate percentages quickly",
href: "/calculators/math/percentage-calculator",
icon: Percent,
},
{
name: "Basic Calculator",
description: "Perform simple arithmetic",
href: "/calculators/math/basic-calculator",
icon: Calculator,
},
{
name: "Statistics Calculator",
description: "Solve statistical calculations",
href: "/calculators/math/statistics-calculator",
icon: Sigma,
},
];

const [expression, setExpression] = useState("");
const [preview, setPreview] = useState("");
const [angleMode, setAngleMode] = useState<"DEG" | "RAD">("DEG");
const [memory, setMemory] = useState(0);
const [ans, setAns] = useState(0);
const [history, setHistory] = useState<string[]>([]);

useEffect(() => {
const savedHistory = localStorage.getItem("calcHistory");
if (savedHistory) setHistory(JSON.parse(savedHistory));
}, []);

useEffect(() => {
if (!expression) {
setPreview("");
return;
}

try {
const result = evaluate(expression);
if (!isNaN(result)) setPreview(String(result));
} catch {
setPreview("");
}
}, [expression]);

// Keyboard support
useEffect(() => {
const handleKey = (e: KeyboardEvent) => {
const key = e.key;

if (!isNaN(Number(key)) || key === ".") input(key);
if (key === "+" || key === "-" || key === "*" || key === "/") input(key);
if (key === "(" || key === ")") input(key);
if (key === "Enter") calculate();
if (key === "Backspace") backspace();
if (key === "Delete") clear();
};

window.addEventListener("keydown", handleKey);
return () => window.removeEventListener("keydown", handleKey);
}, [expression]);

const input = (val: string) => {
setExpression((prev) => prev + val);
};

const clear = () => {
setExpression("");
setPreview("");
};

const backspace = () => {
setExpression((prev) => prev.slice(0, -1));
};

const sci = (fn: string) => {
switch (fn) {
case "sin":
input("sin(");
break;
case "cos":
input("cos(");
break;
case "tan":
input("tan(");
break;
case "asin":
input("asin(");
break;
case "acos":
input("acos(");
break;
case "atan":
input("atan(");
break;
case "sqrt":
input("√(");
break;
case "log":
input("log(");
break;
case "ln":
input("ln(");
break;
case "pi":
input("π");
break;
case "x²":
input("^2");
break;
case "1/x":
input("1/(");
break;
case "exp":
input("exp(");
break;
}
};

const evaluate = (expInput: string) => {
let exp = expInput;

exp = exp.replace(/sin\(/g, "Math.sin(");
exp = exp.replace(/cos\(/g, "Math.cos(");
exp = exp.replace(/tan\(/g, "Math.tan(");
exp = exp.replace(/asin\(/g, "Math.asin(");
exp = exp.replace(/acos\(/g, "Math.acos(");
exp = exp.replace(/atan\(/g, "Math.atan(");

exp = exp.replace(/√/g, "Math.sqrt");
exp = exp.replace(/π/g, "Math.PI");

exp = exp.replace(/log\(/g, "Math.log10(");
exp = exp.replace(/ln\(/g, "Math.log(");
exp = exp.replace(/exp\(/g, "Math.exp(");

exp = exp.replace(/Ans/g, ans.toString());
exp = exp.replace(/\^2/g, "**2");

if (angleMode === "DEG") {
exp = exp.replace(
/Math\.sin\(([^)]+)\)/g,
"Math.sin(($1)*Math.PI/180)"
);
exp = exp.replace(
/Math\.cos\(([^)]+)\)/g,
"Math.cos(($1)*Math.PI/180)"
);
exp = exp.replace(
/Math\.tan\(([^)]+)\)/g,
"Math.tan(($1)*Math.PI/180)"
);
}

return eval(exp);
};

const calculate = () => {
try {
const result = evaluate(expression);

setExpression(String(result));
setPreview("");
setAns(result);

const newHistory = [`${expression} = ${result}`, ...history].slice(0, 10);
setHistory(newHistory);

localStorage.setItem("calcHistory", JSON.stringify(newHistory));
} catch {
setPreview("Error");
}
};

// Memory functions
const memoryAdd = () => setMemory((prev) => prev + Number(preview || 0));
const memorySubtract = () => setMemory((prev) => prev - Number(preview || 0));
const memoryRecall = () => input(memory.toString());
const memoryClear = () => setMemory(0);

const clearHistory = () => {
setHistory([]);
localStorage.removeItem("calcHistory");
};

return (
<main className="min-h-screen bg-background">

<section className="py-12 px-4 sm:px-6 lg:px-8">
<div className="max-w-4xl mx-auto">

<div className="flex justify-center">
<div className="bg-card border border-border rounded-3xl p-6 w-[380px] shadow-2xl">

{/* REAL TIME RESULT */}
<div className="bg-background p-2 rounded mb-2 text-sm text-muted-foreground overflow-x-auto text-right">
{preview || " "}
</div>

{/* USER INPUT */}
<div className="bg-background p-4 rounded mb-4 text-3xl font-bold text-foreground overflow-x-auto text-right">
{expression || "0"}
</div>

{/* Memory + Angle */}
<div className="grid grid-cols-6 gap-2 mb-3">
<button className="btn-calc" onClick={memoryAdd}>M+</button>
<button className="btn-calc" onClick={memorySubtract}>M-</button>
<button className="btn-calc" onClick={memoryRecall}>MR</button>
<button className="btn-calc" onClick={memoryClear}>MC</button>
<button className="btn-calc" onClick={() => input("Ans")}>Ans</button>

<button
className={`font-bold text-white py-2 rounded ${
angleMode === "DEG" ? "bg-green-500" : "bg-red-500"
}`}
onClick={() =>
setAngleMode(angleMode === "DEG" ? "RAD" : "DEG")
}
>
{angleMode}
</button>
</div>

{/* Scientific buttons */}
<div className="grid grid-cols-5 gap-2 mb-3">
{[
"sin","cos","tan","asin","acos",
"atan","sqrt","log","ln","pi",
"x²","1/x","exp","(",")"
].map((btn) => (
<button
key={btn}
className="btn-func"
onClick={() => {
if (btn === "(" || btn === ")") input(btn);
else sci(btn);
}}
>
{btn === "asin"
? "sin⁻¹"
: btn === "acos"
? "cos⁻¹"
: btn === "atan"
? "tan⁻¹"
: btn}
</button>
))}
</div>

{/* Digits + operators */}
<div className="grid grid-cols-4 gap-2">
{[
"7","8","9","/",
"4","5","6","*",
"1","2","3","-",
"0",".","+","="
].map((btn) => (
<button
key={btn}
className={
btn === "="
? "btn-equal"
: /[/*\-+]/.test(btn)
? "btn-op"
: "btn-num"
}
onClick={() => (btn === "=" ? calculate() : input(btn))}
>
{btn}
</button>
))}
</div>

{/* Clear / Back / Clear History */}
<div className="grid grid-cols-3 gap-2 mt-3">
<button className="btn-func" onClick={clear}>AC</button>
<button className="btn-func" onClick={backspace}>Back</button>
<button className="btn-func" onClick={clearHistory}>Clear History</button>
</div>

{/* History */}
<div className="mt-4 p-2 bg-background border border-border rounded h-24 overflow-y-auto text-sm text-muted-foreground">
{history.map((h, i) => (
<div key={i}>{h}</div>
))}
</div>

</div>
</div>

</div>
</section>

<RelatedCalculators calculators={relatedCalculators} />

<style jsx>{`
.btn-calc {
background: #a0a0a0;
color: black;
font-weight: bold;
padding: 0.5rem;
border-radius: 0.5rem;
transition: all 0.1s;
}
.btn-calc:hover {
background: #b5b5b5;
}
.btn-func {
background: #4a90e2;
color: white;
font-weight: bold;
padding: 0.5rem;
border-radius: 0.5rem;
transition: all 0.1s;
}
.btn-func:hover {
background: #357ab8;
}
.btn-num {
background: #333;
color: white;
font-weight: bold;
padding: 0.75rem;
border-radius: 0.5rem;
transition: all 0.1s;
}
.btn-num:hover {
background: #444;
}
.btn-op {
background: #555;
color: white;
font-weight: bold;
padding: 0.75rem;
border-radius: 0.5rem;
transition: all 0.1s;
}
.btn-op:hover {
background: #666;
}
.btn-equal {
background: #facc15;
color: black;
font-weight: bold;
padding: 0.75rem;
border-radius: 0.5rem;
transition: all 0.1s;
}
.btn-equal:hover {
background: #eab308;
}
`}</style>

</main>
);
}