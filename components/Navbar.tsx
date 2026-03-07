'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Calculator } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Financial', href: '/calculators/financial' },
    { name: 'Health', href: '/calculators/health' },
    { name: 'Math', href: '/calculators/math' },
    { name: 'Others', href: '/calculators/other' },
    { name: 'All', href: '/calculators' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section - Modified for Lizocalc Branding */}
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl group">
            {/* Optional: Add a small icon to boost the "Calc" brand identity */}
            <div className="bg-primary p-1.5 rounded-lg">
               <Calculator className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center tracking-tight">
              <span className="text-foreground">Lizo</span>
              <span className="text-primary group-hover:text-primary/80 transition-colors">calc</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-secondary text-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <div className="px-2 pt-2 pb-3 space-y-1 shadow-inner">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-secondary hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}