import type { Metadata } from 'next'
import OtherCalculators from './OtherCalculators'

export const metadata: Metadata = {
  title: 'Physics Calculators | Mass, Density, Speed & Weight Tools',
  description:
    'Free physics calculators including density, mass, speed, and weight calculators for quick and accurate results.',
  keywords: [
    'physics calculator',
    'density calculator',
    'mass calculator',
    'speed calculator',
    'weight calculator',
    'physics tools',
  ],
}

export default function Page() {
  return <OtherCalculators />
}