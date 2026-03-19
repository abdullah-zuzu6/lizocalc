import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import CalculatorGrid from '@/components/CalculatorGrid'
import FAQ from '@/components/FAQ'
import NoPrefetchLink from '@/components/NoPrefetchLink' // ← new import
import { BarChart3, Heart, Sigma, Zap, Target, Lock } from 'lucide-react'

const financialCalculators = [
  {
    name: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments details',
    icon: BarChart3,
    href: '/calculator/mortgage',
    category: 'financial' as const,
  },
  {
    name: 'Loan Calculator',
    description: 'Determine loan payments and interest costs',
    icon: BarChart3,
    href: '/calculator/loan',
    category: 'financial' as const,
  },
  {
    name: 'Auto Loan Calculator',
    description: 'Calculate car loan payments and total interest',
    icon: BarChart3,
    href: '/calculator/auto-loan',
    category: 'financial' as const,
  },
]

const fitnessCalculators = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index',
    icon: Heart,
    href: '/calculator/bmi',
    category: 'fitness' as const,
  },
  {
    name: 'Calorie Calculator',
    description: 'Estimate daily calorie needs based on activity',
    icon: Heart,
    href: '/calculator/calorie',
    category: 'fitness' as const,
  },
  {
    name: 'Body Fat Calculator',
    description: 'Estimate body fat percentage',
    icon: Heart,
    href: '/calculator/body-fat',
    category: 'fitness' as const,
  },
]

const mathCalculators = [
  {
    name: 'Scientific Calculator',
    description: 'Advanced calculations and trigonometry',
    icon: Sigma,
    href: '/calculator/scientific',
    category: 'math' as const,
  },
  {
    name: 'Fraction Calculator',
    description: 'Add, subtract, multiply, divide fractions',
    icon: Sigma,
    href: '/calculator/fraction',
    category: 'math' as const,
  },
  {
    name: 'Percentage Calculator',
    description: 'Calculate percentages and discounts',
    icon: Sigma,
    href: '/calculator/percentage',
    category: 'math' as const,
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <Hero />

      {/* Main Content */}
      <div className="bg-background">
        <CalculatorGrid
          title="Financial Calculators"
          calculators={financialCalculators}
          showViewAll={false}
        />

        <CalculatorGrid
          title="Fitness & Health Calculators"
          calculators={fitnessCalculators}
          showViewAll={false}
        />

        <CalculatorGrid
          title="Math Calculators"
          calculators={mathCalculators}
          showViewAll={false}
        />
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose LizoCalculator?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Our calculators are optimized for speed with instant results and no page reloads.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accurate Results</h3>
              <p className="text-muted-foreground">
                Professional-grade algorithms ensure precise calculations for all your needs.
              </p>
            </div>

            <div className="p-8 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors">
              <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">100% Private</h3>
              <p className="text-muted-foreground">
                Your data is never stored or shared. All calculations happen locally on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section – using NoPrefetchLink here */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            All Calculators in One Place
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our complete collection of calculators for financial planning, fitness tracking, mathematics, and more.
          </p>
          <NoPrefetchLink
            href="/calculators"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            View All Calculators
          </NoPrefetchLink>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        items={[
          {
            question: 'Are LizoCalculator tools free to use?',
            answer:
              'Yes, all of our calculators are completely free to use. No registration, sign-up, or subscription required. Simply access the calculator you need and start calculating.',
          },
          {
            question: 'Do you store my calculations?',
            answer:
              'No, we do not store any of your calculations or personal information. All calculations are performed locally in your browser and are not sent to any server.',
          },
          {
            question: 'Which devices can I use these calculators on?',
            answer:
              'Our calculators work on all modern devices including smartphones, tablets, laptops, and desktop computers. They are fully responsive and optimized for any screen size.',
          },
          {
            question: 'Are the calculations accurate?',
            answer:
              'Yes, our calculators use professional-grade algorithms and mathematical formulas to ensure accuracy. However, results are estimates and should be verified with professionals for important decisions.',
          },
          {
            question: 'Can I suggest a new calculator?',
            answer:
              'Absolutely! We are always looking to expand our calculator collection. Please visit our contact page to share your suggestions and ideas.',
          },
          {
            question: 'Is there an app version?',
            answer:
              'Currently, our calculators are web-based and work on any browser. They are optimized for mobile and can be added to your home screen for quick access.',
          },
        ]}
        title="Common Questions"
      />

      <Footer />
    </main>
  )
}