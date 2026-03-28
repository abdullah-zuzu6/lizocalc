import type { Metadata } from 'next'
import OtherCalculators from './OtherCalculators'

export const metadata: Metadata = {
  title: 'Education Calculators | GPA & Grade Tools',
  description:
    'Free education calculators including GPA calculator and grade calculator for students.',
  keywords: [
    'gpa calculator',
    'grade calculator',
    'education calculator',
    'student tools',
    'cgpa calculator',
  ],
}

export default function Page() {
  return <OtherCalculators />
}