import Link from 'next/link'
import { type LucideIcon,  } from 'lucide-react'

interface CalculatorCard {
  name: string
  description: string
  icon: LucideIcon
  href: string
  category: 'financial' | 'fitness' | 'math' | 'other'
}

interface CalculatorGridProps {
  title: string
  calculators: CalculatorCard[]
  showViewAll?: boolean
}

const categoryColors = {
  financial: 'from-blue-600/10 to-blue-400/10 border-blue-600/20 hover:border-blue-600/50',
  fitness: 'from-red-600/10 to-pink-400/10 border-red-600/20 hover:border-red-600/50',
  math: 'from-purple-600/10 to-purple-400/10 border-purple-600/20 hover:border-purple-600/50',
  other: 'from-green-600/10 to-emerald-400/10 border-green-600/20 hover:border-green-600/50',
}

const categoryIconColors = {
  financial: 'text-blue-500',
  fitness: 'text-red-500',
  math: 'text-purple-500',
  other: 'text-green-500',
}

export default function CalculatorGrid({ title, calculators, showViewAll }: CalculatorGridProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {calculators.map((calc) => {
          const Icon = calc.icon
          return (
            <Link key={calc.href} href={calc.href}>
              <div
                className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer group bg-gradient-to-br ${
                  categoryColors[calc.category]
                } hover:shadow-lg hover:shadow-primary/20`}
              >
                <div className="flex items-start justify-between mb-4">
                  <Icon className={`w-8 h-8 ${categoryIconColors[calc.category]}`} />
                  <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {calc.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {calc.description}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      {showViewAll && (
        <div className="text-center">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            View All Calculators
          </Link>
        </div>
      )}
    </section>
  )
}
