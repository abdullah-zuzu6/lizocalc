'use client'

import { useState } from "react"
import { Menu, X, Calculator } from "lucide-react"
import NoPrefetchLink from "./NoPrefetchLink"

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Financial", href: "/calculators/financial" },
  { name: "Health", href: "/calculators/health" },
  { name: "Math", href: "/calculators/math" },
  { name: "Time", href: "/calculators/time" },
  { name: "Education", href: "/calculators/education" },
  { name: "Physics", href: "/calculators/physics" },
  { name: "All", href: "/calculators" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <NoPrefetchLink
            href="/"
            className="flex items-center gap-2 font-bold text-2xl group"
          >
            <div className="bg-primary p-1.5 rounded-lg">
              <Calculator className="w-5 h-5 text-white" />
            </div>

            <div className="flex items-center tracking-tight">
              <span className="text-foreground">Lizo</span>
              <span className="text-primary group-hover:text-primary/80 transition-colors">
                calc
              </span>
            </div>
          </NoPrefetchLink>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <NoPrefetchLink
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                {item.name}
              </NoPrefetchLink>
            ))}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NoPrefetchLink
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </NoPrefetchLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}