import type { Metadata } from 'next'
import FitnessCalculators from './OtherCalculator'

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators | BMI, Calories, BMR, TDEE Tools',
  description:
    'Free health and fitness calculators including BMI, calorie, body fat, BMR, TDEE, macros, and sleep calculators for accurate results.',
  keywords: [
    'health calculators',
    'fitness calculators',
    'BMI calculator',
    'calorie calculator',
    'BMR calculator',
    'TDEE calculator',
    'body fat calculator',
    'macros calculator',
    'sleep calculator',
  ],
}

export default function Page() {
  return <FitnessCalculators />
}