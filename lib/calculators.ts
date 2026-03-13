// lib/calculators.ts
export interface Calculator {
  slug: string
  category: 'financial' | 'health' | 'math' | 'time' | 'education' | 'physics'
}

// Add all your calculators here
export const calculators: Calculator[] = [
  { slug: 'bmi-calculator', category: 'health' },
  { slug: 'mortgage-calculator', category: 'financial' },


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


  { slug: 'age-calculator', category: 'time' },
  { slug: 'gpa-calculator', category: 'education' },
  { slug: 'speed-calculator', category: 'physics' },
  // Add more calculators as needed
]