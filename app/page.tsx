import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import CalculatorGrid from '@/components/CalculatorGrid'
import FAQ from '@/components/FAQ'
import Link from 'next/link'
import { BarChart3, Heart, Sigma, Timer, Atom,} from 'lucide-react'
import type { Metadata } from 'next'
import FollowUs from '@/components/FollowUs'

const BASE_URL = 'https://www.lizocalc.com'

export const metadata: Metadata = {
  title: 'LizoCalc - Free Online Calculators.',
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
          About LizoCalc - A Calcuator Platform
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

      {/* Internal linking section — placed right after About LizoCalc */}
      <section className="max-w-6xl mx-auto px-6 pb-16 text-white">
        <h3 className="text-2xl font-semibold text-blue-300 mb-4">
          Jump straight to a category
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          If you already know what you&apos;re working on, skip the scroll and
          go directly to the calculators you need. Our{" "}
          <Link
            href="/calculators/financial"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Financial calculators
          </Link>{" "}
          cover everything from a{" "}
          <Link
            href="/calculators/financial/mortgage-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            mortgage
          </Link>{" "}
          to a{" "}
          <Link
            href="/calculators/financial/compound-interest-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            compound interest
          </Link>{" "}
          projection. Our{" "}
          <Link
            href="/calculators/health"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Health calculators
          </Link>{" "}
          include{" "}
          <Link
            href="/calculators/health/bmi-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            BMI
          </Link>
          ,{" "}
          <Link
            href="/calculators/health/tdee-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            TDEE
          </Link>
          , and{" "}
          <Link
            href="/calculators/health/body-fat-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            body fat
          </Link>{" "}
          tools that go beyond a single number.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          For coursework and academic planning, our{" "}
          <Link
            href="/calculators/education"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Education calculators
          </Link>{" "}
          include the{" "}
          <Link
            href="/calculators/education/gpa-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            GPA Calculator
          </Link>{" "}
          and{" "}
          <Link
            href="/calculators/education/final-grade-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Final Grade Calculator
          </Link>
          . Need something quick? Our{" "}
          <Link
            href="/calculators/math/percentage-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Percentage Calculator
          </Link>{" "}
          and{" "}
          <Link
            href="/calculators/time/age-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            Age Calculator
          </Link>{" "}
          are two of our most-used tools, and our full{" "}
          <Link
            href="/calculators"
            className="text-blue-400 underline hover:text-blue-300"
          >
            calculator directory
          </Link>{" "}
          lists everything in one place, including{" "}
          <Link
            href="/calculators/physics/speed-calculator"
            className="text-blue-400 underline hover:text-blue-300"
          >
            physics
          </Link>{" "}
          tools like speed and density.
        </p>

        <p className="text-gray-200 leading-relaxed">
          Prefer to read the reasoning before you calculate? Our{" "}
          <Link
            href="/blogs/education"
            className="text-blue-400 underline hover:text-blue-300"
          >
            education guides
          </Link>
          ,{" "}
          <Link
            href="/blogs/finance"
            className="text-blue-400 underline hover:text-blue-300"
          >
            finance guides
          </Link>
          , and{" "}
          <Link
            href="/blogs/health"
            className="text-blue-400 underline hover:text-blue-300"
          >
            health guides
          </Link>{" "}
          walk through the formulas behind these tools with real, worked
          examples — or start from the{" "}
          <Link
            href="/blogs"
            className="text-blue-400 underline hover:text-blue-300"
          >
            blog hub
          </Link>{" "}
          if you're not sure where to begin.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
          How People Actually Use These Calculators
        </h2>

        <p className="text-gray-200 leading-relaxed mb-6">
          Most calculator websites just give you a list of tools and expect  you to do everything out on your own. I wanted to do things on this page. Seeing the number is important. Understanding what it means is just as important. Here are five real examples, one from each category on this website using the same math that the live calculators use.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Finance: What Compound Interest Does
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Lets say you put $5,000 into an investment that earns 8% per year. You do not touch it for 15 years. The compound interest will turn that into about $15,861, which is more than triple of that 5k what you started with without adding any extra money. This is why it is an idea to invest early as possible as soon instead of waiting for the right moment.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          The same math works against you when you are borrowing money of investing. A mortgage or loan will add up interest in the way just in reverse. Knowing these numbers before you borrow money can make a difference. Of just guessing based on what you are told you can compare different loan offers to understand the real cost, which can save you time and help you choose the best option that fits your budget or financial situation.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Health: Why BMI Does Not Tell The Whole Story
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Imagine someone who's 5 feet 9 inches tall and weighs 160 pounds. Their BMI is 23.6, which is in the healthy weight range. This is information but it is only one part of the story.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          BMI does not show how much of your weight comes from muscle or body. Two people can have the BMI but have very different body compositions. That is why it is helpful to look at your body percentage and your Total Daily Energy Expenditure as well. These measurements give you an understanding of your health and can help you make smarter decisions if your goal is to lose weight build muscle or maintain a healthy lifestyle.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Math: The Calculation You Probably Do Every Week
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Percentages are used everywhere such as discounts, tax, tips and grades. For example 15% of 240 is 36 which is simple enough. What can be tricky is the reverse, such as "36's what percent of 240?"
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          A good calculator can save you from doing this by hand and getting it wrong. The same goes for fractions which're handy for students, teachers or anyone who works with numbers regularly.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Physics: The Formula Is Never The Hard Part. The Units Are
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          The formula for speed is distance divided by time which's easy to understand. For example if you drive 150 miles in 2 hours and 30 minutes your average speed is 60 miles per hour. Where people make mistakes is when they enter "2 hours 30 minutes" as "2.5" without converting the units first.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          A calculator can handle that conversion for you, which's where most manual mistakes happen.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Time: Simple, Until It Is Not
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Working out the exact years, months and days between two dates sounds easy but it can get complicated when leap years and different month lengths are involved. That is usually where manual math goes wrong.
        </p>

        <p className="text-gray-200 leading-relaxed mb-6">
          A time calculator can deal with all of that in the background so your age, date difference or work hours are accurate the time.
        </p>

        <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
          Why You Can Trust The Numbers
        </h3>

        <p className="text-gray-200 leading-relaxed mb-6">
          Every example here uses the formulas as the live calculators, on this website without any simplification or rounding. If you run these numbers yourself you will get the same result.
        </p>

        <p className="text-gray-200 leading-relaxed">
          That is the standard I hold this website to: accurate answers, no sign-up no data stored and no guesswork.
        </p>
      </section>

<FollowUs/>

      <FAQ title="About LizoCalc" items={faqItems} />

      <Footer />
    </main>
  )
}