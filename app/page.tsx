import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import CalculatorGrid from '@/components/CalculatorGrid'
import FAQ from '@/components/FAQ'
import { BarChart3, Heart, Sigma, Timer, Atom } from 'lucide-react'
import type { Metadata } from 'next'

const BASE_URL = 'https://www.lizocalc.com'

export const metadata: Metadata = {
  title: 'LizoCalc - Free Online Calculators for Finance, Health, Math & Physics',
  description:
    "Use LizoCalc's free online calculators for mortgages, loans, BMI, calories, fractions, percentages, and time. Fast, accurate, no signup required.",
  alternates: {
    canonical: BASE_URL,
  },
}

const formatName = (slug: string) =>
  slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

const faqItems = [
  {
    question: 'What is LizoCalc?',
    answer: 'LizoCalc is a free online platform offering calculators for finance, health, math, physics, and time-based calculations, all in one place.',
  },
  {
    question: 'Why should I use LizoCalc instead of other calculators?',
    answer: "LizoCalc combines many tools in a single clean interface, so you don't need to visit different websites for different calculations.",
  },
  {
    question: 'Does LizoCalc work on all devices?',
    answer: 'Yes, it is fully responsive and works smoothly on mobile, tablet, and desktop.',
  },
  {
    question: 'Do I need an account to use LizoCalc?',
    answer: 'No, you can use all calculators without signing up or logging in.',
  },
  {
    question: 'Is LizoCalc updated regularly?',
    answer: 'Yes, new calculators and improvements are added over time to improve accuracy and user experience.',
  },
  {
    question: 'Can LizoCalc replace manual calculations?',
    answer: 'It speeds up calculations, but users should still understand the underlying formulas for learning and verification.',
  },
  {
    question: 'Is LizoCalc safe to use?',
    answer: 'Yes, it runs entirely in your browser and does not store personal data or calculation history.',
  },
  {
    question: 'What kind of calculators are available on LizoCalc?',
    answer: 'Finance, health, math, physics, and everyday utility calculators, all in one system.',
  },
]

export default function Home() {
  const financial = [
    { slug: 'mortgage-calculator' }, { slug: 'loan-calculator' },
    { slug: 'auto-loan-calculator' }, { slug: 'salary-calculator' },
    { slug: 'interest-calculator' }, { slug: 'inflation-calculator' },
    { slug: 'payment-calculator' }, { slug: 'compound-interest-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/financial/${c.slug}` }))

  const health = [
    { slug: 'bmi-calculator' }, { slug: 'calorie-calculator' },
    { slug: 'body-fat-calculator' }, { slug: 'bmr-calculator' },
    { slug: 'tdee-calculator' }, { slug: 'sleep-calculator' },
    { slug: 'macros-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/health/${c.slug}` }))

  const math = [
    { slug: 'scientific-calculator' }, { slug: 'fraction-calculator' },
    { slug: 'percentage-calculator' }, { slug: 'triangle-calculator' },
    { slug: 'lcm-calculator' }, { slug: 'gcf-calculator' },
    { slug: 'binary-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/math/${c.slug}` }))

  const time = [
    { slug: 'age-calculator' }, { slug: 'date-calculator' },
    { slug: 'time-calculator' }, { slug: 'hours-calculator' },
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/time/${c.slug}` }))

  const physics = [
    { slug: 'density-calculator' }, { slug: 'speed-calculator' },
    { slug: 'mass-calculator' }, { slug: 'weight-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/physics/${c.slug}` }))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <Navbar />
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

          <CalculatorGrid
            title="Financial"
            Icon={BarChart3}
            variant="blue"
            calculators={financial}
          />

          <CalculatorGrid
            title="Health"
            Icon={Heart}
            variant="red"
            calculators={health}
          />

          <CalculatorGrid
            title="Mathematics"
            Icon={Sigma}
            variant="purple"
            calculators={math}
          />

          <CalculatorGrid
            title="Physics"
            Icon={Atom}
            variant="emerald"
            calculators={physics}
          />

          <CalculatorGrid
            title="Time"
            Icon={Timer}
            variant="emerald"
            calculators={time}
          />

        </div>
      </div>

      <section className="max-w-6xl mx-auto px-6 py-16 text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          About LizoCalc
        </h2>

        <p className="text-gray-200 leading-relaxed mb-6">
          LizoCalc brings finance, health, math, physics, and time calculators together
          in one fast, ad-light interface. Every tool gives an instant, accurate result
          without forcing you to sign up or hunt across different sites.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          What you can calculate here
        </h3>

        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-8">
          <li><strong>Financial:</strong> mortgages, loans, compound interest, inflation</li>
          <li><strong>Health:</strong> BMI, calories, BMR, TDEE, macros, sleep</li>
          <li><strong>Math:</strong> fractions, percentages, LCM/GCF, scientific notation</li>
          <li><strong>Physics:</strong> density, speed, mass, weight</li>
          <li><strong>Time:</strong> age, date differences, hours between times</li>
        </ul>

        <p className="text-gray-200 leading-relaxed">
          Every calculator runs client-side in your browser — nothing you enter is
          stored or sent anywhere, and no account is required.
        </p>
      </section>

      <FAQ title="About LizoCalc" items={faqItems} />

      <Footer />
    </main>
  )
}