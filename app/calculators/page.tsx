import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AllCalculatorsClient from '@/components/AllCalculatorsClient'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Calculators — Education, Finance & Health',
  description:
    'Every LizoCalc tool in one place — GPA, loan, BMI, and more — with a short guide on which one to use and why.',
  alternates: {
    canonical: 'https://www.lizocalc.com/calculators',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'All Calculators — Education, Finance & Health | LizoCalc',
    description:
      'Browse every free calculator on LizoCalc, organized by category, with guidance on choosing the right one.',
    url: 'https://www.lizocalc.com/calculators',
    siteName: 'LizoCalc',
    type: 'website',
  },
}

export default function AllCalculatorsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            All Calculators
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every calculator we&apos;ve built, in one list. No account, no
            paywall, no ads between you and the number you came for.
          </p>
        </div>
      </section>

      {/* Intro content before the tool grid */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-gray-200 leading-relaxed mb-4">
            This page exists because we got tired of the usual pattern on
            calculator sites — a homepage with three or four tools linked,
            and everything else buried a few clicks deep or only reachable
            through search. Below is the full list, organized so you can scan
            it once and find what you need, whether that&apos;s working out a{" "}
            <Link
              href="/calculators/education/gpa-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              GPA
            </Link>{" "}
            before a scholarship deadline, checking a{" "}
            <Link
              href="/calculators/financial/loan-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              loan payment
            </Link>{" "}
            before signing anything, or getting a quick{" "}
            <Link
              href="/calculators/health/bmi-calculator"
              className="text-blue-400 underline hover:text-blue-300"
            >
              BMI
            </Link>{" "}
            reading.
          </p>
          <p className="text-gray-200 leading-relaxed">
            Every tool on this page runs entirely in your browser. Nothing you
            type into a calculator here gets sent to a server or stored
            anywhere unless the tool itself tells you otherwise — the GPA
            calculator, for instance, only remembers your courses locally so
            you can pick up where you left off, and that&apos;s a setting you
            control from your{" "}
            <Link
              href="/calculators/saved-calculators"
              className="text-blue-400 underline hover:text-blue-300"
            >
              saved calculators
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* Calculator Grid (client component) */}
      <section className="px-4 py-8">
        <AllCalculatorsClient />
      </section>

      {/* Content after the grid */}
      <article className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
              Browse by category
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              If scanning the full grid above feels like a lot, the category
              pages break things down into smaller, more focused lists. Our{" "}
              <Link
                href="/calculators/education"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Education calculators
              </Link>{" "}
              cover GPA, grades, and academic planning. Our{" "}
              <Link
                href="/calculators/financial"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Financial calculators
              </Link>{" "}
              handle loans, interest, and budgeting. Our{" "}
              <Link
                href="/calculators/health"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Health calculators
              </Link>{" "}
              cover BMI, calories, and related metrics. We also have{" "}
              <Link
                href="/calculators/math"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Math calculators
              </Link>{" "}
              for everyday arithmetic problems,{" "}
              <Link
                href="/calculators/physics"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Physics calculators
              </Link>{" "}
              for mechanics and motion, and{" "}
              <Link
                href="/calculators/time"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Time calculators
              </Link>{" "}
              for dates, ages, and durations.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
              How to pick the right calculator
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              The honest answer is usually obvious once you know what
              question you&apos;re actually asking. The confusion tends to
              show up in the borderline cases — someone wants their
              cumulative GPA across four semesters but only has this
              semester&apos;s grades in front of them, or someone wants to
              compare two loan offers with different terms and isn&apos;t
              sure whether to look at the monthly payment or the total
              interest paid. In both cases, the calculator itself will give
              you a correct number for whatever you type in — the harder part
              is making sure you&apos;re asking it the right question in the
              first place.
            </p>
            <p className="text-gray-200 leading-relaxed mb-4">
              If you&apos;re not sure which tool fits your situation, the
              blog guides are usually a faster way in than the flat list
              above. Our{' '}
              <Link
                href="/blogs/education"
                className="text-blue-400 underline hover:text-blue-300"
              >
                education guides
              </Link>{' '}
              walk through GPA and grade calculations with worked examples,
              our{' '}
              <Link
                href="/blogs/finance"
                className="text-blue-400 underline hover:text-blue-300"
              >
                finance guides
              </Link>{' '}
              cover loan payments and amortization in more depth than a
              calculator alone can show, and our{' '}
              <Link
                href="/blogs/health"
                className="text-blue-400 underline hover:text-blue-300"
              >
                health guides
              </Link>{' '}
              explain what a number like BMI is actually measuring before you
              plug anything in.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
              How accurate are these calculators?
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              As accurate as the formula they&apos;re built on, which is a
              slightly more complicated answer than it sounds. The math
              itself — GPA as quality points over credit hours, loan payments
              as standard amortization, BMI as weight over height squared —
              is not in dispute anywhere. What varies is which specific
              version of a formula applies to your situation: your
              university might round differently than the default we show on
              our{" "}
              <Link
                href="/calculators/education/cgpa-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                CGPA Calculator
              </Link>
              , your lender might compound interest on a different schedule
              than our{" "}
              <Link
                href="/calculators/financial/interest-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Interest Calculator
              </Link>{" "}
              assumes, and BMI categories themselves shift slightly depending
              on which health authority&apos;s cutoffs you&apos;re using.
            </p>
            <p className="text-gray-200 leading-relaxed mb-4">
              We build every calculator around the most widely used version
              of each formula and note the common variations where they
              matter. But if a number here doesn&apos;t match what your
              school, bank, or doctor tells you, that&apos;s worth
              investigating rather than assuming one of the two is simply
              wrong — it&apos;s often a difference in the underlying policy,
              not a calculation error on either end.
            </p>
          </section>

          <section className="mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
              Why there's no login, no export fee, no upsell
            </h2>
            <p className="text-gray-200 leading-relaxed mb-4">
              A lot of calculator sites make the actual math free but gate
              anything useful you&apos;d do with the result — exporting a
              GPA history, saving a loan comparison, printing a BMI trend
              over time — behind a signup or a subscription. We&apos;d rather
              keep this simple: the tools are free, they work the same way
              whether you&apos;re a student checking a{" "}
              <Link
                href="/calculators/education/final-grade-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                final grade
              </Link>{" "}
              five minutes before an exam or someone comparing loan offers at
              midnight, and there&apos;s nothing further up the funnel
              waiting to convert you into a paying customer.
            </p>
            <p className="text-gray-200 leading-relaxed">
              That also means we don&apos;t collect more information than we
              need to. Most calculators here need nothing from you beyond
              whatever numbers you type into the fields, and anything that
              does get saved — like the GPA calculator&apos;s course list —
              stays local to your browser rather than living on a server
              somewhere with your name attached to it. You can review
              anything you&apos;ve saved anytime from{" "}
              <Link
                href="/calculators/saved-calculators"
                className="text-blue-400 underline hover:text-blue-300"
              >
                Saved Calculators
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-6">
              What's coming next
            </h2>
            <p className="text-gray-200 leading-relaxed">
              This list keeps growing based on what people actually ask for.
              If there&apos;s a calculation you keep doing by hand or keep
              hunting for on other sites — a specific tax calculation, a
              fitness metric beyond{" "}
              <Link
                href="/calculators/health/bmi-calculator"
                className="text-blue-400 underline hover:text-blue-300"
              >
                BMI
              </Link>
              , a different kind of loan comparison — that&apos;s useful
              information for us, and it&apos;s usually how the next tool on
              this page gets decided.
            </p>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}