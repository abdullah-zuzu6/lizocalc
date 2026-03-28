import type { Metadata } from 'next'
import OtherCalculators from './OtherCalculators'

export const metadata: Metadata = {
  title: 'Time Calculators | Age, Date, Time & Hours Tools',
  description:
    'Free online time calculators including age calculator, date calculator, time calculator, and hours calculator.',
  keywords: [
    'age calculator',
    'date calculator',
    'time calculator',
    'hours calculator',
    'time tools',
  ],
}

export default function Page() {
  return <OtherCalculators/>
}