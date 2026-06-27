// SERVER COMPONENT — no 'use client' here
// metadata export only works in server components, so we keep this file clean
// and delegate all interactivity to AllCalculatorsClient below.

import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AllCalculatorsClient from '@/components/AllCalculatorsClient'

export const metadata: Metadata = {
  title: 'My All Calculators | LizoCalc',
  description:
    'Access, manage, and quickly open your calculators in one place on LizoCalc.',
  alternates: {
    canonical: 'https://www.lizocalc.com/calculators',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function AllCalculatorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AllCalculatorsClient />
      <Footer />
    </main>
  )
}