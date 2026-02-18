'use client'

import { useState, useEffect } from 'react'
import { Delete, Sigma, Calculator, PercentSquare } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackButton from '@/components/BackButton'
import FAQ from '@/components/FAQ'
import RelatedCalculators from '@/components/RelatedCalculators'
import { getCalculatorHistory, saveCalculatorHistory, getConsentPreference } from '@/lib/cookies'

export default function ScientificCalculator() {
  const [display, setDisplay] = useState<string>('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load from cookies on mount
  useEffect(() => {
    setIsMounted(true)
    const consent = getConsentPreference()
    const history = getCalculatorHistory()
    
    if (consent?.functional && history['scientific']?.data) {
      setDisplay(history['scientific'].data.display || '0')
    }
  }, [])

  // Save to cookies whenever display changes
  useEffect(() => {
    if (!isMounted) return
    
    const consent = getConsentPreference()
    if (consent?.functional) {
      saveCalculatorHistory('scientific', { display })
    }
  }, [display, isMounted])

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.')
      setWaitingForNewValue(false)
    }
  }

  const handleOperation = (op: string) => {
    const currentValue = Number(display)
    
    if (previousValue === null) {
      setPreviousValue(currentValue)
    } else if (operation) {
      const result = calculate(previousValue, currentValue, operation)
      setDisplay(String(result))
      setPreviousValue(result)
    }
    
    setOperation(op)
    setWaitingForNewValue(true)
  }

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case '+':
        return prev + current
      case '-':
        return prev - current
      case '*':
        return prev * current
      case '/':
        return prev / current
      case '^':
        return Math.pow(prev, current)
      case '%':
        return prev % current
      default:
        return current
    }
  }

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, Number(display), operation)
      setDisplay(String(result))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleScientific = (func: string) => {
    const value = Number(display)
    let result: number

    switch (func) {
      case 'sin':
        result = Math.sin((value * Math.PI) / 180)
        break
      case 'cos':
        result = Math.cos((value * Math.PI) / 180)
        break
      case 'tan':
        result = Math.tan((value * Math.PI) / 180)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'exp':
        result = Math.exp(value)
        break
      case 'abs':
        result = Math.abs(value)
        break
      case '1/x':
        result = 1 / value
        break
      default:
        result = value
    }

    setDisplay(String(result))
    setWaitingForNewValue(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
  }

  const handleDelete = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const faqItems = [
    {
      question: 'What is a scientific calculator?',
      answer: 'A scientific calculator is a tool that performs advanced mathematical functions including trigonometry (sin, cos, tan), logarithms, exponents, and square roots. It is ideal for students, engineers, and professionals.',
    },
    {
      question: 'What does sin, cos, and tan mean?',
      answer: 'Sin (sine), cos (cosine), and tan (tangent) are trigonometric functions used to relate angles to sides of triangles. They are essential for advanced mathematics and physics calculations.',
    },
    {
      question: 'What is the difference between log and ln?',
      answer: 'Log is the base-10 logarithm (common logarithm), while ln is the natural logarithm with base e (approximately 2.718). Both are important in different applications.',
    },
    {
      question: 'How do I calculate square root?',
      answer: 'Simply enter the number and click the sqrt button. The calculator will display the square root of that number instantly.',
    },
  ]

  const relatedCalculators = [
    {
      name: 'Fraction Calculator',
      description: 'Perform operations with fractions',
      href: '/calculator/fraction',
      icon: Calculator,
    },
    {
      name: 'Percentage Calculator',
      description: 'Calculate percentages and discounts',
      href: '/calculator/percentage',
      icon: PercentSquare,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Back Button */}
      <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <BackButton href="/calculators/math" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Scientific Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Advanced calculations with trigonometry and logarithm functions
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-8">
          {/* Display */}
          <div className="bg-background rounded-lg p-6 mb-6 text-right border border-border">
            <div className="text-sm text-muted-foreground mb-2">Calculation</div>
            <div className="text-5xl font-bold text-primary break-all">{display}</div>
          </div>

          {/* Scientific Functions */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'exp', 'abs', '1/x'].map((func) => (
              <button
                key={func}
                onClick={() => handleScientific(func)}
                className="py-3 px-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors text-sm"
              >
                {func}
              </button>
            ))}
          </div>

          {/* Main Calculator */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <button
              onClick={handleClear}
              className="col-span-2 py-4 px-6 bg-destructive hover:bg-destructive/80 text-destructive-foreground rounded-lg font-semibold transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleDelete}
              className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors"
            >
              <Delete className="w-6 h-6" />
            </button>
            <button
              onClick={() => handleOperation('/')}
              className="py-4 px-6 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              ÷
            </button>

            {/* Row 2 */}
            <button onClick={() => handleNumber('7')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">7</button>
            <button onClick={() => handleNumber('8')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">8</button>
            <button onClick={() => handleNumber('9')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">9</button>
            <button
              onClick={() => handleOperation('*')}
              className="py-4 px-6 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              ×
            </button>

            {/* Row 3 */}
            <button onClick={() => handleNumber('4')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">4</button>
            <button onClick={() => handleNumber('5')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">5</button>
            <button onClick={() => handleNumber('6')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">6</button>
            <button
              onClick={() => handleOperation('-')}
              className="py-4 px-6 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              −
            </button>

            {/* Row 4 */}
            <button onClick={() => handleNumber('1')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">1</button>
            <button onClick={() => handleNumber('2')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">2</button>
            <button onClick={() => handleNumber('3')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">3</button>
            <button
              onClick={() => handleOperation('+')}
              className="py-4 px-6 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              +
            </button>

            {/* Row 5 */}
            <button onClick={handleDecimal} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">.</button>
            <button onClick={() => handleNumber('0')} className="py-4 px-6 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg font-semibold transition-colors">0</button>
            <button
              onClick={() => handleOperation('^')}
              className="py-4 px-6 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-semibold transition-colors"
            >
              ^
            </button>
            <button
              onClick={handleEquals}
              className="py-4 px-6 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg font-semibold transition-colors"
            >
              =
            </button>
          </div>
        </div>
      </div>

      <RelatedCalculators calculators={relatedCalculators} />
      <FAQ items={faqItems} title="Scientific Calculator FAQs" />

      <Footer />
    </main>
  )
}
