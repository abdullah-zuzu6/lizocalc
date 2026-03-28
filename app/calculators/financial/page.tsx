import type { Metadata } from 'next'
import FinancialCalculators from './OtherCalculator'

export const metadata: Metadata = {
  title: 'Financial Calculators | Mortgage, Loan, Interest, ROI & Salary Tools',
  description:
    'Free financial calculators including mortgage, loan, interest, ROI, inflation, salary, and payment calculators for accurate financial planning.',
  keywords: [
    'financial calculators',
    'mortgage calculator',
    'loan calculator',
    'auto loan calculator',
    'interest calculator',
    'compound interest calculator',
    'inflation calculator',
    'salary calculator',
    'ROI calculator',
    'payment calculator',
  ],
}

export default function Page() {
  return <FinancialCalculators />
}