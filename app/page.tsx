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

{/* 🔥 SEO BRAND SECTION – LizoCalc Ranking */}
<section className="max-w-6xl mx-auto px-6 py-16 text-white">
  
  <h2 className="text-3xl md:text-4xl font-bold text-blue-500 border-b border-blue-600 pb-4 mb-8">
    LizoCalc – All-in-One Free Online Calculator Platform
  </h2>

  <p className="text-gray-200 leading-relaxed mb-6">
    <strong>LizoCalc</strong> is a powerful and easy-to-use online calculator platform designed to solve everyday problems quickly and accurately. Whether you need to calculate finances, track your health metrics, solve mathematical equations, or manage time-based calculations, LizoCalc provides everything in one place. Unlike basic calculator tools, LizoCalc combines multiple advanced calculators with a clean interface, making it ideal for students, professionals, and daily users.
  </p>

  <p className="text-gray-200 leading-relaxed mb-6">
    The main goal of <strong>LizoCalc</strong> is to simplify complex calculations into fast and understandable results. From loan and mortgage calculators to BMI, calorie, and scientific math tools, every calculator is built to deliver precise answers instantly. You don’t need to switch between multiple websites — LizoCalc brings all essential tools into a single, reliable platform.
  </p>

  <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
    Why LizoCalc is Different from Other Calculator Websites
  </h3>

  <ul className="list-disc list-inside text-gray-200 space-y-2 mb-8">
    <li>All calculators available in one place</li>
    <li>Fast, accurate, and easy-to-use tools</li>
    <li>Clean and modern interface for better user experience</li>
    <li>No signup required – completely free to use</li>
    <li>Works on mobile, tablet, and desktop devices</li>
  </ul>

  <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
    What You Can Do with LizoCalc
  </h3>

  <p className="text-gray-200 leading-relaxed mb-6">
    With <strong>LizoCalc</strong>, you can perform a wide range of calculations including financial planning, health tracking, mathematical problem-solving, and time management. Each category is carefully designed to help users get accurate results without confusion. Whether you are calculating interest, checking your BMI, solving fractions, or measuring time differences, LizoCalc makes the process simple and efficient.
  </p>

  <h3 className="text-2xl font-semibold text-blue-300 mt-10 mb-4">
    Is LizoCalc Free to Use?
  </h3>

  <p className="text-gray-200 leading-relaxed">
    Yes, <strong>LizoCalc</strong> is completely free to use. There are no hidden charges, subscriptions, or login requirements. All tools are available instantly, allowing users to focus on solving problems without any distractions.
  </p>

</section>


<FAQ 
  title="About Lizocalc"
  items={[
    { 
      question: 'What is Lizocalc?', 
      answer: 'Lizocalc is an online platform that provides multiple calculators for math, finance, health, physics, and daily life use in one place.' 
    },
    { 
      question: 'Why should I use Lizocalc instead of other calculators?', 
      answer: 'Because it combines many tools in a single clean interface, so you don’t need to visit different websites for different calculations.' 
    },
    { 
      question: 'Does Lizocalc work on all devices?', 
      answer: 'Yes, it is fully responsive and works smoothly on mobile, tablet, and desktop.' 
    },
    { 
      question: 'Do I need an account to use Lizocalc?', 
      answer: 'No, you can use all calculators without signing up or logging in.' 
    },
    { 
      question: 'Is Lizocalc updated regularly?', 
      answer: 'Yes, new calculators and improvements are added over time to improve accuracy and user experience.' 
    },
    { 
      question: 'Can Lizocalc replace manual calculations?', 
      answer: 'It helps speed up calculations, but users should still understand the logic behind formulas for learning and verification.' 
    },
    { 
      question: 'Is Lizocalc safe to use?', 
      answer: 'Yes, it runs in your browser and does not store personal data or calculation history.' 
    },
    { 
      question: 'What kind of calculators are available on Lizocalc?', 
      answer: 'It includes finance, health, math, physics, and everyday utility calculators in one system.' 
    }
  ]} 
/>
      <Footer />
    </main>
  )
}