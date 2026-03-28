import type { Metadata } from 'next'
import MathCalculators from './OtheCalculators'

export const metadata: Metadata = {
  title: 'Math Calculators | Scientific, Percentage, Fraction, LCM, GCF Tools',
  description:
    'Free online math calculators including scientific, percentage, fraction, triangle, LCM, GCF, binary, and more for accurate and fast calculations.',
  keywords: [
    'math calculators',
    'scientific calculator',
    'percentage calculator',
    'fraction calculator',
    'triangle calculator',
    'LCM calculator',
    'GCF calculator',
    'binary calculator',
    'hex calculator',
    'z score calculator',
    'permutation combination calculator',
  ],
}

export default function Page() {
return <MathCalculators/>
}