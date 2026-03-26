import { type LucideIcon } from 'lucide-react'
import NoPrefetchLink from './NoPrefetchLink'

interface CalculatorLink {
  name: string
  href: string
}

interface CalculatorGridProps {
  title: string
  calculators: CalculatorLink[]
  Icon: LucideIcon
  variant: 'blue' | 'red' | 'purple' | 'emerald'
}

const variants = {
  blue: 'from-blue-600/5 to-blue-400/5 border-blue-600/20 text-blue-600',
  red: 'from-red-600/5 to-pink-400/5 border-red-600/20 text-red-500',
  purple: 'from-purple-600/5 to-purple-400/5 border-purple-600/20 text-purple-500',
  emerald: 'from-green-600/5 to-emerald-400/5 border-green-600/20 text-emerald-500',
}

export default function CalculatorGrid({ title, calculators, Icon, variant }: CalculatorGridProps) {
  return (
    <section className={`p-6 rounded-2xl border bg-gradient-to-br ${variants[variant]} shadow-sm`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-background/80 border border-current/10">
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          {title}
        </h2>
      </div>

      {/* Tight list with very small gap (Calculator.net style) */}
      <ul className="flex flex-col space-y-0.5">
        {calculators.map((calc) => (
          <li key={calc.href}>
            <NoPrefetchLink 
              href={calc.href}
              className="text-[#b7b4ae] hover:underline text-[15px] block py-0.5 transition-colors"
            >
              {calc.name}
            </NoPrefetchLink>
          </li>
        ))}
      </ul>
    </section>
  )
}