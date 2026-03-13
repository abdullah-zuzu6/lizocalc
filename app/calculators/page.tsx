// 'use client'

// import { useState, useMemo } from 'react'
// import Link from 'next/link'
// import Navbar from '@/components/Navbar'
// import Footer from '@/components/Footer'
// import { Search, ArrowLeft, BarChart3, Heart, Sigma, Clock } from 'lucide-react'

// const allCalculators = [
//   // Financial
//   {
//     name: 'Mortgage Calculator',
//     description: 'Calculate monthly mortgage payments and loan details',
//     href: '/calculators/financial/mortgage-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Loan Calculator',
//     description: 'Determine loan payments and interest costs',
//     href: '/calculators/financial/loan-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Auto Loan Calculator',
//     description: 'Calculate car loan payments with different terms',
//     href: '/calculators/financial/auto-loan-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Interest Calculator',
//     description: 'Calculate simple and compound interest',
//     href: '/calculators/financial/interest-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Payment Calculator',
//     description: 'Calculate payment schedules and installments',
//     href: '/calculators/financial/payment-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Compound Interest Calculator',
//     description: 'Calculate compound interest over time',
//     href: '/calculators/financial/compound-interest-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Inflation Calculator',
//     description: 'Calculate the effect of inflation on purchasing power over time.',
//     href: '/calculators/financial/inflation-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Salary Calculator',
//     description: 'Professional tool for adjusted and unadjusted income projections.',
//     href: '/calculators/financial/salary-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'ROI Calculator',
//     description: 'Calculate return on investment and annualized returns.',
//     href: '/calculators/financial/roi-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: '401k Calculator',
//     description: 'Calculate 401k contributions and retirement savings',
//     href: '/calculators/financial/401k-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Credit Card Calculator',
//     description: 'Calculate credit card payments and interest',
//     href: '/calculators/financial/credit-card-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   {
//     name: 'Sales Tax Calculator',
//     description: 'Calculate sales tax amounts and total costs',
//     href: '/calculators/financial/sales-tax-calculator',
//     category: 'Financial',
//     icon: BarChart3,
//   },
//   // Fitness and health
//   {
//     name: 'BMI Calculator',
//     description: 'Calculate your Body Mass Index',
//     href: '/calculators/health/bmi-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'Calorie Calculator',
//     description: 'Estimate daily calorie needs',
//     href: '/calculators/health/calorie-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'Body Fat Calculator',
//     description: 'Estimate body fat percentage',
//     href: '/calculators/health/body-fat-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'BMR Calculator',
//     description: 'Calculate Basal Metabolic Rate',
//     href: '/calculators/health/bmr-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'TDEE Calculator',
//     description: 'Calculate Total Daily Energy Expenditure',
//     href: '/calculators/health/tdee-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'Macros Calculator',
//     description: 'Calculate protein, carbs, and fats needed for your goals',
//     href: '/calculators/health/macros-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'Ideal Weight Calculator',
//     description: 'Calculate your ideal weight using various medical formulas',
//     href: '/calculators/health/ideal-weight-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'Calorie Deficit Calculator',
//     description: 'Calculate the calorie deficit needed to reach your weight loss goals',
//     href: '/calculators/health/calorie-deficit-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   {
//     name: 'BAC Calculator',
//     description: 'Calculate your Blood Alcohol Concentration based on consumption and time',
//     href: '/calculators/health/bac-calculator',
//     category: 'Fitness',
//     icon: Heart,
//   },
//   // Math
//   {
//     name: 'Scientific Calculator',
//     description: 'Advanced calculations and trigonometry',
//     href: '/calculators/math/scientific-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Fraction Calculator',
//     description: 'Add, subtract, multiply, divide fractions',
//     href: '/calculators/math/fraction-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Percentage Calculator',
//     description: 'Calculate percentages and discounts',
//     href: '/calculators/math/percentage-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Triangle Calculator',
//     description: 'Solve triangles using known sides and angles',
//     href: '/calculators/math/triangle-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Pythagorean Calculator',
//     description: 'Solve right triangles using the Pythagorean theorem',
//     href: '/calculators/math/pythagorean-theorem-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Half-Life Calculator',
//     description: 'Calculate remaining substance after a given time period',
//     href: '/calculators/math/half-life-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Binary Calculator',
//     description: 'Perform bitwise arithmetic and convert between binary, decimal, and hexadecimal',
//     href: '/calculators/math/binary-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//    {
//     name: 'Hex Calculator',
//     description: 'Perform arithmetic operations on hexadecimal values',
//     href: '/calculators/math/hexadecimal-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'LCM Calculator',
//     description: 'Find the least common multiple of a set of integers',
//     href: '/calculators/math/lcm-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'GCF Calculator',
//     description: 'Find the greatest common factor of a set of integers',
//     href: '/calculators/math/gcf-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Scientific Notation Calculator',
//     description: 'Convert numbers to and from scientific notation',
//     href: '/calculators/math/scientific-notation-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Permutation & Combination Calculator',
//     description: 'Calculate permutations and combinations of items',
//     href: '/calculators/math/permutation-combination-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   {
//     name: 'Z-Score Calculator',
//     description: 'Calculate z-scores and percentile ranks for normally distributed data',
//     href: '/calculators/math/z-score-calculator',
//     category: 'Math',
//     icon: Sigma,
//   },
//   // Other
//   {
//     name: 'Age Calculator',
//     description: 'Calculate your age in years, months, and days',
//     href: '/calculators/time/age-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Date Calculator',
//     description: 'Add or subtract days from dates',
//     href: '/calculators/time/date-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Time Calculator',
//     description: 'Add and subtract time durations',
//     href: '/calculators/time/time-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Hours Calculator',
//     description: 'Calculate working hours and time tracking',
//     href: '/calculators/time/hours-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'GPA Calculator',
//     description: 'Calculate your Grade Point Average',
//     href: '/calculators/education/gpa-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Grade Calculator',
//     description: 'Calculate the grade you need on a final exam to reach your target grade',
//     href: '/calculators/education/grade-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Ohm\'s Law Calculator',
//     description: 'Calculate Voltage, Current, Resistance, and Power',
//     href: '/calculators/education/ohms-law-calculator',
//     category: 'Education',
//     icon: Clock,
//   },
//   {
//     name: 'Sleep Calculator',
//     description: 'Calculate the best bedtime and wake-up times based on sleep cycles',
//     href: '/calculators/health/sleep-calculator',
//     category: 'Fitness',
//     icon: Clock,
//   },
//   {
//     name: 'GDP Calculator',
//     description: 'Calculate Gross Domestic Product using the expenditure approach',
//     href: '/calculators/financial/gdp-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Density Calculator',
//     description: 'Calculate density, mass, or volume',
//     href: '/calculators/physics/density-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Mass Calculator',
//     description: 'Calculate mass, weight, or force',
//     href: '/calculators/physics/mass-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Speed Calculator',
//     description: 'Calculate average speed, travel time, or distance',
//     href: '/calculators/physics/speed-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Weight Calculator',
//     description: 'Calculate weight on different celestial bodies',
//     href: '/calculators/physics/weight-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
//   {
//     name: 'Conversion Calculator',
//     description: 'Convert between different units of measurement',
//     href: '/calculators/math/conversion-calculator',
//     category: 'Other',
//     icon: Clock,
//   },
// ]

// const categoryColors = {
//   Financial: 'text-blue-500 bg-blue-600/10',
//   Fitness: 'text-red-500 bg-red-600/10',
//   Math: 'text-purple-500 bg-purple-600/10',
//   Other: 'text-green-500 bg-green-600/10',
// }

// export default function AllCalculators() {
//   const [searchQuery, setSearchQuery] = useState('')

//   const filteredCalculators = useMemo(
//     () =>
//       allCalculators.filter(
//         (calc) =>
//           calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           calc.category.toLowerCase().includes(searchQuery.toLowerCase())
//       ),
//     [searchQuery]
//   )

//   const groupedCalculators = useMemo(() => {
//     const grouped = {
//       Financial: [] as typeof allCalculators,
//       Fitness: [] as typeof allCalculators,
//       Math: [] as typeof allCalculators,
//       Other: [] as typeof allCalculators,
//     }

//     filteredCalculators.forEach((calc) => {
//       grouped[calc.category as keyof typeof grouped].push(calc)
//     })
    

//     return grouped
//   }, [filteredCalculators])

//   return (
//     <main className="min-h-screen bg-background">
//       <Navbar />

//       {/* Header */}
//       <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center gap-4 mb-6">
//             <Link
//               href="/"
//               className="p-2 rounded-lg hover:bg-secondary transition-colors"
//               aria-label="Go back"
//             >
//               <ArrowLeft className="w-6 h-6" />
//             </Link>
//             <h1 className="text-4xl font-bold">All Calculators</h1>
//           </div>
//           <p className="text-lg text-muted-foreground mb-8">
//             Browse our complete collection of {allCalculators.length} professional calculators
//           </p>

//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search calculators..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
//             />
//           </div>
//         </div>
//       </section>

//       {/* Calculators by Category */}
//       <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
//         {filteredCalculators.length > 0 ? (
//           <div className="space-y-16">
//             {Object.entries(groupedCalculators).map(([category, calcs]) =>
//               calcs.length > 0 ? (
//                 <div key={category}>
//                   <h2 className="text-2xl font-bold mb-6">{category} Calculators</h2>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {calcs.map((calc) => {
//                       const Icon = calc.icon
//                       return (
//                         <Link key={calc.href} href={calc.href}>
//                           <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all group cursor-pointer">
//                             <div className="flex items-start justify-between mb-4">
//                               <div className={`p-2 rounded-lg ${categoryColors[calc.category as keyof typeof categoryColors]}`}>
//                                 <Icon className="w-6 h-6" />
//                               </div>
//                             </div>
//                             <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
//                               {calc.name}
//                             </h3>
//                             <p className="text-sm text-muted-foreground">
//                               {calc.description}
//                             </p>
//                           </div>
//                         </Link>
//                       )
//                     })}
//                   </div>
//                 </div>
//               ) : null
//             )}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-muted-foreground mb-4">No calculators found matching "{searchQuery}"</p>
//             <button
//               onClick={() => setSearchQuery('')}
//               className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
//             >
//               Clear Search
//             </button>
//           </div>
//         )}
//       </section>

//       <Footer />
//     </main>
//   )
// }

'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, ArrowLeft, BarChart3, Heart, Sigma, Clock } from 'lucide-react'

const allCalculators = [
  // Financial
  {
    name: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments and loan details',
    href: '/calculators/financial/mortgage-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Loan Calculator',
    description: 'Determine loan payments and interest costs',
    href: '/calculators/financial/loan-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Auto Loan Calculator',
    description: 'Calculate car loan payments with different terms',
    href: '/calculators/financial/auto-loan-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Interest Calculator',
    description: 'Calculate simple and compound interest',
    href: '/calculators/financial/interest-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Payment Calculator',
    description: 'Calculate payment schedules and installments',
    href: '/calculators/financial/payment-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest over time',
    href: '/calculators/financial/compound-interest-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Inflation Calculator',
    description: 'Calculate the effect of inflation on purchasing power over time.',
    href: '/calculators/financial/inflation-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Salary Calculator',
    description: 'Professional tool for adjusted and unadjusted income projections.',
    href: '/calculators/financial/salary-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'ROI Calculator',
    description: 'Calculate return on investment and annualized returns.',
    href: '/calculators/financial/roi-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: '401k Calculator',
    description: 'Calculate 401k contributions and retirement savings',
    href: '/calculators/financial/401k-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Credit Card Calculator',
    description: 'Calculate credit card payments and interest',
    href: '/calculators/financial/credit-card-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'Sales Tax Calculator',
    description: 'Calculate sales tax amounts and total costs',
    href: '/calculators/financial/sales-tax-calculator',
    category: 'Financial',
    icon: BarChart3,
  },
  {
    name: 'GDP Calculator',
    description: 'Calculate Gross Domestic Product using the expenditure approach',
    href: '/calculators/financial/gdp-calculator',
    category: 'Financial',
    icon: BarChart3,
  },

  // Fitness and health
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    href: '/calculators/health/bmi-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Calorie Calculator',
    description: 'Estimate daily calorie needs',
    href: '/calculators/health/calorie-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Body Fat Calculator',
    description: 'Estimate body fat percentage',
    href: '/calculators/health/body-fat-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'BMR Calculator',
    description: 'Calculate Basal Metabolic Rate',
    href: '/calculators/health/bmr-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'TDEE Calculator',
    description: 'Calculate Total Daily Energy Expenditure',
    href: '/calculators/health/tdee-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Macros Calculator',
    description: 'Calculate protein, carbs, and fats needed for your goals',
    href: '/calculators/health/macros-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Ideal Weight Calculator',
    description: 'Calculate your ideal weight using various medical formulas',
    href: '/calculators/health/ideal-weight-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Calorie Deficit Calculator',
    description: 'Calculate the calorie deficit needed to reach your weight loss goals',
    href: '/calculators/health/calorie-deficit-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'BAC Calculator',
    description: 'Calculate your Blood Alcohol Concentration based on consumption and time',
    href: '/calculators/health/bac-calculator',
    category: 'Fitness',
    icon: Heart,
  },
  {
    name: 'Sleep Calculator',
    description: 'Calculate the best bedtime and wake-up times based on sleep cycles',
    href: '/calculators/health/sleep-calculator',
    category: 'Fitness',
    icon: Heart,
  },

  // Math
  {
    name: 'Scientific Calculator',
    description: 'Advanced calculations and trigonometry',
    href: '/calculators/math/scientific-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, divide fractions',
    href: '/calculators/math/fraction-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages and discounts',
    href: '/calculators/math/percentage-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Triangle Calculator',
    description: 'Solve triangles using known sides and angles',
    href: '/calculators/math/triangle-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Pythagorean Calculator',
    description: 'Solve right triangles using the Pythagorean theorem',
    href: '/calculators/math/pythagorean-theorem-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Half-Life Calculator',
    description: 'Calculate remaining substance after a given time period',
    href: '/calculators/math/half-life-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Binary Calculator',
    description: 'Perform bitwise arithmetic and convert between binary, decimal, and hexadecimal',
    href: '/calculators/math/binary-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Hex Calculator',
    description: 'Perform arithmetic operations on hexadecimal values',
    href: '/calculators/math/hexadecimal-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'LCM Calculator',
    description: 'Find the least common multiple of a set of integers',
    href: '/calculators/math/lcm-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'GCF Calculator',
    description: 'Find the greatest common factor of a set of integers',
    href: '/calculators/math/gcf-calculator',
    category: 'Math',
    icon: Sigma,
  },
  
  {
    name: 'Permutation & Combination Calculator',
    description: 'Calculate permutations and combinations of items',
    href: '/calculators/math/permutation-combination-calculator',
    category: 'Math',
    icon: Sigma,
  },
  {
    name: 'Z-Score Calculator',
    description: 'Calculate z-scores and percentile ranks for normally distributed data',
    href: '/calculators/math/z-score-calculator',
    category: 'Math',
    icon: Sigma,
  },

  // Time
  {
    name: 'Age Calculator',
    description: 'Calculate your age in years, months, and days',
    href: '/calculators/time/age-calculator',
    category: 'Time',
    icon: Clock,
  },
  {
    name: 'Date Calculator',
    description: 'Add or subtract days from dates',
    href: '/calculators/time/date-calculator',
    category: 'Time',
    icon: Clock,
  },
  {
    name: 'Time Calculator',
    description: 'Add and subtract time durations',
    href: '/calculators/time/time-calculator',
    category: 'Time',
    icon: Clock,
  },
  {
    name: 'Hours Calculator',
    description: 'Calculate working hours and time tracking',
    href: '/calculators/time/hours-calculator',
    category: 'Time',
    icon: Clock,
  },

  // Education
  {
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average',
    href: '/calculators/education/gpa-calculator',
    category: 'Education',
    icon: Clock,
  },
  {
    name: 'Grade Calculator',
    description: 'Calculate the grade you need on a final exam to reach your target grade',
    href: '/calculators/education/grade-calculator',
    category: 'Education',
    icon: Clock,
  },
  {
    name: 'Ohm\'s Law Calculator',
    description: 'Calculate Voltage, Current, Resistance, and Power',
    href: '/calculators/education/ohms-law-calculator',
    category: 'Education',
    icon: Clock,
  },

  // Physics
  {
    name: 'Density Calculator',
    description: 'Calculate density, mass, or volume',
    href: '/calculators/physics/density-calculator',
    category: 'Physics',
    icon: Clock,
  },
  {
    name: 'Mass Calculator',
    description: 'Calculate mass, weight, or force',
    href: '/calculators/physics/mass-calculator',
    category: 'Physics',
    icon: Clock,
  },
  {
    name: 'Speed Calculator',
    description: 'Calculate average speed, travel time, or distance',
    href: '/calculators/physics/speed-calculator',
    category: 'Physics',
    icon: Clock,
  },
  {
    name: 'Weight Calculator',
    description: 'Calculate weight on different celestial bodies',
    href: '/calculators/physics/weight-calculator',
    category: 'Physics',
    icon: Clock,
  },
  {
    name: 'Conversion Calculator',
    description: 'Convert between different units of measurement',
    href: '/calculators/physics/conversion-calculator',
     category: 'Math',
    icon: Sigma,
  },
]

const categoryColors = {
  Financial: 'text-blue-500 bg-blue-600/10',
  Fitness: 'text-red-500 bg-red-600/10',
  Health: 'text-pink-500 bg-pink-600/10',
  Math: 'text-purple-500 bg-purple-600/10',
  Time: 'text-green-500 bg-green-600/10',
  Education: 'text-yellow-500 bg-yellow-600/10',
  Physics: 'text-indigo-500 bg-indigo-600/10',
}

export default function AllCalculators() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCalculators = useMemo(
    () =>
      allCalculators.filter(
        (calc) =>
          calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          calc.category.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  )

  const groupedCalculators = useMemo(() => {
    const grouped: Record<string, typeof allCalculators> = {
      Financial: [],
      Fitness: [],
      Health: [],
      Math: [],
      Time: [],
      Education: [],
      Physics: [],
    }

    filteredCalculators.forEach((calc) => {
      if (!grouped[calc.category]) grouped[calc.category] = []
      grouped[calc.category].push(calc)
    })

    return grouped
  }, [filteredCalculators])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-4xl font-bold">All Calculators</h1>
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our complete collection of {allCalculators.length} professional calculators
          </p>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search calculators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>
      </section>

      {/* Calculators by Category */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredCalculators.length > 0 ? (
          <div className="space-y-16">
            {Object.entries(groupedCalculators).map(([category, calcs]) =>
              calcs.length > 0 ? (
                <div key={category}>
                  <h2 className="text-2xl font-bold mb-6">{category} Calculators</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {calcs.map((calc) => {
                      const Icon = calc.icon
                      return (
                        <Link key={calc.href} href={calc.href}>
                          <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all group cursor-pointer">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`p-2 rounded-lg ${categoryColors[calc.category as keyof typeof categoryColors]}`}>
                                <Icon className="w-6 h-6" />
                              </div>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                              {calc.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {calc.description}
                            </p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ) : null
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No calculators found matching "{searchQuery}"</p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}