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

export default function RelatedCalculators({
  calculators,
}: RelatedCalculatorsProps) {
  return (
    <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-center sm:text-left">
          Related Calculators
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          {calculators.map((calc, index) => {
            const Icon = calc.icon

            return (
              <Link
                key={index}
                href={calc.href}
                className="group flex flex-col justify-between p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10"
              >
                <div className="flex items-start gap-3">

                  {/* Icon */}
                  <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold mb-1 group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {calc.description}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mt-3">
                  Use Calculator
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}