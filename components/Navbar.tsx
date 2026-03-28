'use client'

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Calculator } from "lucide-react"
import dynamic from "next/dynamic"

// Load SearchBar only on the client (this eliminates most hydration issues)
const SearchBar = dynamic(() => import("./SearchBar"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-muted rounded" />
        <div className="w-full h-10 bg-secondary/30 border border-border rounded-lg" />
      </div>
    </div>
  )
})

const NAV_ITEMS = [
  { name: "Financial", href: "/calculators/financial" },
  { name: "Health", href: "/calculators/health" },
  { name: "Math", href: "/calculators/math" },
  { name: "Time", href: "/calculators/time" },
  { name: "Education", href: "/calculators/education" },
  { name: "Physics", href: "/calculators/physics" },
  { name: "All", href: "/calculators" },
  { name: "Saved Calculators", href: "/calculators/saved-calculators" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-sm" >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-2 sm:gap-4">
          
          {/* Logo */}
          <Link
            href="/"
            prefetch={false}
            className="flex-shrink-0 flex items-center gap-1.5 font-bold text-lg sm:text-2xl group"
          >
            <div className="bg-primary p-1 sm:p-1.5 rounded-lg shadow-sm group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="flex items-center tracking-tight">
              <span className="text-foreground">Lizo</span>
              <span className="text-primary group-hover:text-primary/80 transition-colors">
                calc
              </span>
            </div>
          </Link>

          {/* Search Bar - Client Only */}
          <div className="flex-1 flex justify-center max-w-[180px] xs:max-w-xs sm:max-w-md lg:max-w-lg">
            <SearchBar />
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary transition-all"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg hover:bg-secondary text-foreground transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-border bg-card animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-6 space-y-1">
              <div className="px-3 py-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                Categories
              </div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 rounded-lg text-base font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors border-l-4 border-transparent hover:border-primary"
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