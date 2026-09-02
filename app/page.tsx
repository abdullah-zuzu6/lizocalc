import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import CalculatorGrid from '@/components/CalculatorGrid'
import FAQ from '@/components/FAQ'
import Link from 'next/link'
import { BarChart3, Heart, Sigma, Timer, Atom } from 'lucide-react'
import type { Metadata } from 'next'
import FollowUs from '@/components/FollowUs'

const BASE_URL = 'https://www.lizocalc.com'

export const metadata: Metadata = {
  title: 'LizoCalc - Free Calculators for Financial, Fitness & Math and More',
  description:
    "Use LizoCalc's free online calculators for health,math,finance,physics and time etc. Fast, accurate, no signup required.",
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
    { slug: 'payment-calculator' },
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
    { slug: 'age-calculator' },
    { slug: 'business-days-calculator' }, { slug: 'days-between-dates-calculator' },
    { slug: 'days-from-today-calculator' },
    { slug: 'date-calculator' },
    { slug: 'time-calculator' }, { slug: 'hours-calculator' },
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/time/${c.slug}` }))

  // Single graph for this page: WebPage + FAQPage, cross-referenced.
  // WebPage.@id uses the canonical URL (matches the convention used on
  // calculator/info pages), and references the global WebSite/Organization
  // nodes declared once in layout.tsx by @id — never re-declared here.
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': BASE_URL,
        url: BASE_URL,
        name: 'LizoCalc - Free Online Calculators',
        description:
          "Use LizoCalc's free online calculators for health, math, finance, physics and time. Fast, accurate, no signup required.",
        inLanguage: 'en',
        isPartOf: { '@id': `${BASE_URL}/#website` },
        about: { '@id': `${BASE_URL}/#organization` },
        mainEntity: { '@id': `${BASE_URL}/#faq` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${BASE_URL}/#faq`,
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeStructuredData) }}
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

          {/* <CalculatorGrid
            title="Physics"
            Icon={Atom}
            variant="emerald"
            calculators={physics}
          /> */}

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
          LizoCalc - A Calculator Platform
        </h2>

        <p className="text-gray-200 leading-relaxed mb-6">
          LizoCalc is a website with free calculators for finance, health, math, physics,
          and time. Our goal is simple: make every calculator accurate, fast, and genuinely
          useful, and keep it different from the sites you&apos;ve tried before. We&apos;re
          adding new calculators all the time. Use any of them without logging in or handing
          over your data.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          What you can calculate here
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Right now we have more than 50 calculators, and that number keeps growing.
        </p>

        <ul className="list-disc list-inside text-gray-200 space-y-2 mb-8">
          <li><strong>Financial:</strong> mortgages, loans, compound interest, inflation</li>
          <li><strong>Health:</strong> BMI, calories, BMR, TDEE, macros, sleep</li>
          <li><strong>Math:</strong> fractions, percentages, LCM/GCF, scientific notation</li>
          <li><strong>Physics:</strong> density, speed, mass, weight</li>
          <li><strong>Time:</strong> age, date differences, hours between times</li>
        </ul>

        <p className="text-gray-200 leading-relaxed">
          Every calculator runs client-side in your browser. Nothing you enter is
          stored or sent anywhere, and no account is required.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Why people choose LizoCalc
        </h3>

        <ol className="list-decimal list-inside text-gray-200 space-y-4">
          <li className="leading-relaxed">
            Most calculator sites make you dig through pop-ups, wait for slow pages to load,
            or create an account just to see one number. LizoCalc skips all of that. Open a
            calculator, type your numbers, get your answer. That&apos;s the whole experience,
            and user experience is our first priority.
          </li>
          <li className="leading-relaxed">
            We also don&apos;t split things across ten different websites. Whether you need
            to check your BMI, work out a loan payment, or find the days between two dates,
            it&apos;s all in one place, built with the same simple design. Once you&apos;re
            used to one calculator, the rest feel familiar too.
          </li>
          <li className="leading-relaxed">
            Your privacy matters to us. Every calculation runs right in your browser, so what
            you type never leaves your device. No hidden tracking, no data collection, just a
            tool that does its job and gets out of your way.
          </li>
        </ol>
      </section>

      <FollowUs />

      <FAQ title="About LizoCalc" items={faqItems} />

      <Footer />
    </main>
  )
}