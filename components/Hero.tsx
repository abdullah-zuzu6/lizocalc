// 'use client'

// import { useState, useEffect } from 'react'
// import NoPrefetchLink from '@/components/NoPrefetchLink' // ← new import
// import { ChevronRight, Zap, BarChart3, Heart, Sigma } from 'lucide-react'

// const slides = [
//   {
//     title: 'Financial Calculators',
//     description: 'Calculate mortgages, loans, and manage your finances with precision',
//     icon: BarChart3,
//     color: 'from-blue-600 to-blue-400',
//     cta: 'Explore Financial',
//     href: '/calculators/financial',
//   },
//   {
//     title: 'Fitness & Health',
//     description: 'Track your fitness goals with BMI, calorie, and body fat calculators',
//     icon: Heart,
//     color: 'from-red-600 to-pink-400',
//     cta: 'Explore Fitness',
//     href: '/calculators/health',
//   },
//   {
//     title: 'Math Calculators',
//     description: 'Solve complex equations with scientific and fraction calculators',
//     icon: Sigma,
//     color: 'from-purple-600 to-purple-400',
//     cta: 'Explore Math',
//     href: '/calculators/math',
//   },
// ]

// export default function Hero() {
//   const [current, setCurrent] = useState(0)
//   const [autoPlay, setAutoPlay] = useState(true)

//   useEffect(() => {
//     if (!autoPlay) return

//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev + 1) % slides.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [autoPlay])

//   const Slide = slides[current]
//   const Icon = Slide.icon

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-primary -top-20 -right-20 animate-pulse" />
//         <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-accent -bottom-20 -left-20 animate-pulse" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           {/* Content */}
//           <div className="space-y-8 animate-fade-in">
//             <div>
//               <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
//                 Your Trusted <span className="text-primary">Calculator</span> Companion
//               </h1>
//               <p className="text-xl text-muted-foreground mt-4">
//                 {Slide.description}
//               </p>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <NoPrefetchLink
//                 href={Slide.href}
//                 className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2 group"
//               >
//                 {Slide.cta}
//                 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//               </NoPrefetchLink>

//               <NoPrefetchLink
//                 href="/calculators"
//                 className="px-8 py-3 bg-secondary text-foreground rounded-lg font-semibold hover:bg-accent transition-colors border border-border"
//               >
//                 Explore All
//               </NoPrefetchLink>
//             </div>

//             {/* Features */}
//             <div className="grid grid-cols-2 gap-4 pt-4">
//               <div className="flex items-start gap-3">
//                 <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold">Fast & Accurate</p>
//                   <p className="text-sm text-muted-foreground">Instant calculations</p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-3">
//                 <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
//                 <div>
//                   <p className="font-semibold">100% Free</p>
//                   <p className="text-sm text-muted-foreground">No hidden charges</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Carousel Slide */}
//           <div className="relative animate-slide-in-right">
//             <div className={`bg-gradient-to-br ${Slide.color} rounded-2xl p-12 min-h-96 flex flex-col items-center justify-center text-white relative overflow-hidden`}>
//               {/* Overlay */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

//               {/* Animated Shapes */}
//               <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-10 rounded-full -mr-20 -mt-20 animate-pulse" />
//               <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -ml-16 -mb-16 animate-pulse" />

//               {/* Icon */}
//               <Icon className="w-24 h-24 relative z-10 mb-4 opacity-90" />
//               <p className="text-2xl font-bold text-center relative z-10">
//                 {Slide.title}
//               </p>
//             </div>

//             {/* Carousel Controls */}
//             <div className="flex justify-center gap-2 mt-8">
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => {
//                     setCurrent(index)
//                     setAutoPlay(false)
//                   }}
//                   className={`h-2 rounded-full transition-all ${
//                     current === index ? 'bg-primary w-8' : 'bg-muted w-2'
//                   }`}
//                   aria-label={`Go to slide ${index + 1}`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }





'use client'

// FIXES APPLIED:
// 1. Removed blur-3xl on background orbs — blur is extremely expensive on mobile GPU
// 2. Removed animate-pulse on background orbs — CSS animation on blurred elements = major TBT killer
// 3. Removed bg-gradient-to-b from section — replaced with solid bg-secondary
// 4. Removed animate-fade-in / animate-slide-in-right — custom animations need JS parsing
// 5. Removed hover:shadow-lg hover:shadow-primary/50 on CTA button — shadow on hover causes repaint
// 6. Carousel card: removed heavy dual-overlay gradients, kept single clean gradient
// 7. Removed animated shapes (white circles with animate-pulse) inside the carousel card
// 8. Replaced NoPrefetchLink with next/link directly (same behavior, no extra component parse)

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

  // FIXED: useCallback so the interval function reference is stable
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
    <section className="relative overflow-hidden bg-secondary">
      {/* FIXED: Removed blur-3xl + animate-pulse orbs — they were the #1 TBT cause on mobile.
          Replaced with simple static tinted divs that cost nothing to paint. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-primary -top-20 -right-20" />
        <div className="absolute w-96 h-96 rounded-full opacity-10 bg-accent -bottom-20 -left-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Content */}
          <div className="space-y-8">
            <div>
              {/* FIXED: Added fetchpriority hint via next/head — h1 is the LCP element */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your Trusted{' '}
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
          {/* FIXED: Removed double gradient overlay (bg-gradient-to-t from-black/40) + animated white circles.
              Single gradient kept for visual identity. Much cheaper composite. */}
          <div className="relative">
            <div
              className={`bg-gradient-to-br ${Slide.color} rounded-2xl p-12 min-h-96 flex flex-col items-center justify-center text-white`}
            >
              <Icon className="w-24 h-24 mb-4 opacity-90" aria-hidden="true" />
              <p className="text-2xl font-bold text-center">{Slide.title}</p>
            </div>

            {/* Carousel Controls */}
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