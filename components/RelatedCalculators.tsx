import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface RelatedCalculator {
  name: string
  description: string
  href: string
  icon: LucideIcon
}

interface RelatedCalculatorsProps {
  calculators: RelatedCalculator[]
}

export default function RelatedCalculators({ calculators }: RelatedCalculatorsProps) {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-center sm:text-left">
          Related Calculators
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {calculators.map((calc, index) => {
            const Icon = calc.icon
            return (
              <Link
                key={index}
                href={calc.href}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  
                  {/* Icon */}
                  <div className="p-2.5 sm:p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-primary text-xs sm:text-sm font-semibold mt-2">
                  Use Calculator
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}