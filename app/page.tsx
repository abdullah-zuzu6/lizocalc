import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import CalculatorGrid from '@/components/CalculatorGrid'
import FAQ from '@/components/FAQ'
import { BarChart3, Heart, Sigma, Clock, Timer } from 'lucide-react'

const formatName = (slug: string) => 
  slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

export default function Home() {
  const financial = [
    { slug: 'mortgage-calculator' }, { slug: 'loan-calculator' },
    { slug: 'auto-loan-calculator' }, { slug: 'salary-calculator' },
    { slug: 'interest-calculator' }, { slug: 'inflation-calculator' },
    { slug: 'payment-calculator' }, { slug: 'compound-interest-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/financial/${c.slug}` }));

  const health = [
    { slug: 'bmi-calculator' }, { slug: 'calorie-calculator' },
    { slug: 'body-fat-calculator' }, { slug: 'bmr-calculator' },
    { slug: 'tdee-calculator' }, { slug: 'sleep-calculator' },
    { slug: 'macros-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/health/${c.slug}` }));

  const math = [
    { slug: 'scientific-calculator' }, { slug: 'fraction-calculator' },
    { slug: 'percentage-calculator' }, { slug: 'triangle-calculator' },
    { slug: 'lcm-calculator' }, { slug: 'gcf-calculator' },
    { slug: 'binary-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/math/${c.slug}` }));

  const time = [
    { slug: 'age-calculator' }, { slug: 'date-calculator' },
    { slug: 'time-calculator' }, { slug: 'hours-calculator' },

  ].map(c => ({ name: formatName(c.slug), href: `/calculators/time/${c.slug}` }));
const physics = [

    { slug: 'density-calculator' }, { slug: 'speed-calculator' },
    { slug: 'mass-calculator' }, { slug: 'weight-calculator' }
  ].map(c => ({ name: formatName(c.slug), href: `/calculators/physics/${c.slug}` }));

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Main Grid: 4 columns for that high-density look */}
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
            Icon={Clock} 
            variant="emerald"
            calculators={physics} 
          />
           <CalculatorGrid 
            title="times" 
            Icon={Timer} 
            variant="emerald"
            calculators={time} 
          />

        </div>
      </div>

      <FAQ 
        title="Common Questions"
        items={[
          { question: 'Are these tools free?', answer: 'Yes, 100% free with no registration.' },
          { question: 'Is my data safe?', answer: 'We never store your calculations.' }
        ]} 
      />

      <Footer />
    </main>
  )
}