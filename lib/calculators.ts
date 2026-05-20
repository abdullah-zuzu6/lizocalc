// lib/calculators.ts
export interface Calculator {
  slug: string
  category: 'financial' | 'health' | 'math' | 'time' | 'education' | 'physics'
}

// Add all your calculators here
export const calculators: Calculator[] = [
//Financial calculators
  { slug: 'mortgage-calculator', category: 'financial' },
  {slug: 'loan-calculator', category: 'financial' },
  { slug: 'salary-calculator', category: 'financial' },
  { slug: 'interest-calculator', category: 'financial' },
  { slug: 'payment-calculator', category: 'financial' },
  { slug: 'inflation-calculator', category: 'financial' },
  {slug: 'auto-loan-calculator', category: 'financial' },
  {slug: 'roi-calculator', category: 'financial' },
   {slug: 'compound-interest-calculator', category:'financial'},


//Health calculators
  { slug: 'bmi-calculator', category: 'health' },
  { slug: 'calorie-calculator', category: 'health' },
  { slug: 'body-fat-calculator', category: 'health' },
  { slug: 'bmr-calculator', category: 'health' },
  { slug: 'tdee-calculator', category: 'health' },
  { slug: 'calorie-deficit-calculator', category: 'health' },
  { slug: 'macros-calculator', category: 'health' },
  {slug: 'sleep-calculator', category: 'health' },
  
  
//Math calculators
  { slug: 'scientific-calculator', category: 'math' },
  { slug: 'lcm-calculator', category: 'math' },
  { slug: 'gcf-calculator', category: 'math' },
  { slug: 'fraction-calculator', category: 'math' },
  { slug: 'percentage-calculator', category: 'math' },
  { slug: 'triangle-calculator', category: 'math' },
  { slug: 'pythagorean-theorem-calculator', category: 'math' },
  { slug: 'half-life-calculator', category: 'math' },
  { slug: 'hexadecimal-calculator', category: 'math' },
  { slug: 'permutation-combination-calculator', category: 'math' },
  { slug: 'z-score-calculator', category: 'math' },
  { slug: 'binary-calculator', category: 'math' },
  { slug: 'conversion-calculator', category: 'math' },
 
//Time calculators 
  { slug: 'age-calculator', category: 'time' },
  { slug: 'date-calculator', category: 'time' },
  { slug: 'time-calculator', category: 'time' },
  { slug: 'hours-calculator', category: 'time' },

//Density calculator
  { slug: 'density-calculator', category: 'physics' },
  { slug: 'speed-calculator', category: 'physics' },
  { slug: 'mass-calculator', category: 'physics' },
  { slug: 'weight-calculator', category: 'physics' },

//Education Calculators
   { slug: 'gpa-calculator', category: 'education' },
   { slug: 'grade-calculator', category: 'education' },
   { slug: 'cgpa-calculator', category: 'education' },
   { slug: 'final-grade-calculator', category: 'education' },
   { slug: 'weighted-grade-calculator', category: 'education' },
   
]