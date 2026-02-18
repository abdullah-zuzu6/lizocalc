import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/5 to-background">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Related Calculators</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map((calc, index) => {
            const Icon = calc.icon
            return (
              <Link
                key={index}
                href={calc.href}
                className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {calc.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{calc.description}</p>
                    <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                      Use Calculator
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
