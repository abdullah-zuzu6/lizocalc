'use client'

// PERFORMANCE FIXES ALREADY APPLIED (kept as-is):
// - No blur-3xl / animate-pulse orbs
// - Solid bg-secondary instead of gradient
// - No custom fade/slide animations
// - prefetch={false} on Links
// - useCallback for stable interval reference

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ChevronRight, Zap, BarChart3, Heart, Sigma } from 'lucide-react'

const slides = [
  {
    title: 'Financial Calculators',
    description: 'Calculate mortgages, loans, and manage your finances with precision',
    icon: BarChart3,
    color: 'from-blue-600 to-blue-400',
    cta: 'Explore Financial',
    href: '/calculators/financial',
  },
  {
    title: 'Fitness & Health',
    description: 'Track your fitness goals with BMI, calorie, and body fat calculators',
    icon: Heart,
    color: 'from-red-600 to-pink-400',
    cta: 'Explore Fitness',
    href: '/calculators/health',
  },
  {
    title: 'Math Calculators',
    description: 'Solve complex equations with scientific and fraction calculators',
    icon: Sigma,
    color: 'from-purple-600 to-purple-400',
    cta: 'Explore Math',
    href: '/calculators/math',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [autoPlay, next])

  const Slide = slides[current]
  const Icon = Slide.icon

  return (
    <section className="relative overflow-hidden bg-secondary" aria-label="LizoCalc — free online calculators">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-primary -top-20 -right-20" />
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-accent -bottom-20 -left-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="space-y-8">
            <div>
              {/* h1 leads with the exact brand term as its own clause — good for brand-query relevance,
                  still reads naturally rather than as keyword stuffing */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-primary-foreground">LizoCalc</span>{' '}
                — Your Trusted{' '}
                <span className="text-primary">Calculator</span>{' '}
                Companion
              </h1>
              <p className="text-xl text-muted-foreground mt-4">
                {Slide.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={Slide.href}
                prefetch={false}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold transition-opacity hover:opacity-90 flex items-center justify-center gap-2 group"
              >
                {Slide.cta}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/calculators"
                prefetch={false}
                className="px-8 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-accent transition-colors border border-border"
              >
                Explore All
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">Fast & Accurate</p>
                  <p className="text-sm text-muted-foreground">Instant calculations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="font-semibold">100% Free</p>
                  <p className="text-sm text-muted-foreground">No hidden charges</p>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Slide */}
          <div className="relative">
            <div
              className={`bg-gradient-to-br ${Slide.color} rounded-2xl p-12 min-h-96 flex flex-col items-center justify-center text-white`}
            >
              <Icon className="w-24 h-24 mb-4 opacity-90" aria-hidden="true" />
              <p className="text-2xl font-bold text-center">{Slide.title}</p>
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrent(index)
                    setAutoPlay(false)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    current === index ? 'bg-primary w-8' : 'bg-muted w-2'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}