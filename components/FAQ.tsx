// 'use client'

// import { useState } from 'react'
// import { ChevronDown, HelpCircle, Zap } from 'lucide-react'
// import NoPrefetchLink from './NoPrefetchLink'

// interface FAQItem {
//   question: string
//   answer: string
// }

// interface FAQProps {
//   items: FAQItem[]
//   title?: string
// }

// export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
//   const [openIndex, setOpenIndex] = useState<number | null>(null)

//   return (
//     <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/5 to-background">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="mb-16 text-center">
//           <div className="flex items-center justify-center gap-3 mb-4">
            
//             <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//               {title}
//             </h2>
//           </div>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
//             Get instant answers to the most common questions. Can't find what you're looking for?{' '}
//             <NoPrefetchLink href="/contact" className="text-primary hover:underline font-semibold">
//               Contact us
//             </NoPrefetchLink>
//           </p>
//         </div>

//         {/* FAQ Items */}
//         <div className="space-y-3">
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="group"
//             >
//               <button
//                 onClick={() => setOpenIndex(openIndex === index ? null : index)}
//                 className={`w-full px-6 py-5 flex items-center justify-between text-left rounded-xl border transition-all duration-300 ${
//                   openIndex === index
//                     ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
//                     : 'bg-card/50 border-border hover:border-primary/30 hover:bg-card/70'
//                 }`}
//               >
//                 <div className="flex items-start gap-4 flex-1 min-w-0">
//                   <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
//                     openIndex === index 
//                       ? 'bg-primary text-primary-foreground' 
//                       : 'bg-primary/20 text-primary'
//                   }`}>
//                     {index + 1}
//                   </div>
//                   <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
//                     {item.question}
//                   </span>
//                 </div>
//                 <ChevronDown
//                   className={`w-5 h-5 text-primary flex-shrink-0 transition-all duration-300 ml-4 ${
//                     openIndex === index ? 'rotate-180' : 'group-hover:translate-y-1'
//                   }`}
//                 />
//               </button>

//               {/* Answer */}
//               <div
//                 className={`overflow-hidden transition-all duration-300 ${
//                   openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
//                 }`}
//               >
//                 <div className="px-6 py-6 bg-card/30 border border-primary/10 border-t-0 rounded-b-xl">
//                   <div className="flex gap-4">
//                     <div className="flex-shrink-0">
//                       <Zap className="w-5 h-5 text-primary mt-1" />
//                     </div>
//                     <p className="text-muted-foreground leading-relaxed text-base">
//                       {item.answer}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

        
//       </div>
//     </section>
//   )
// }



'use client'

// FIXES APPLIED:
// 1. Removed bg-gradient-to-br from section background — unnecessary gradient on a full-page section
// 2. Removed bg-gradient-to-r bg-clip-text text-transparent on h2 — gradient text forces a new
//    stacking context and is expensive to paint on mobile
// 3. Removed unused HelpCircle import — dead import still gets bundled
// 4. Removed shadow-lg shadow-primary/10 on open FAQ button — box-shadow with opacity causes repaint
// 5. max-h transition (max-h-0 → max-h-96) kept — it's the standard CSS accordion pattern and fine
// 6. Replaced NoPrefetchLink with next/link directly

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Zap } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
  title?: string
}

export default function FAQ({ items, title = 'Frequently Asked Questions' }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">

        {/* Header — FIXED: plain text color instead of gradient text */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get instant answers to the most common questions. Can't find what you're looking for?{' '}
            <Link href="/contact" prefetch={false} className="text-primary hover:underline font-semibold">
              Contact us
            </Link>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={index} className="group">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full px-6 py-5 flex items-center justify-between text-left rounded-xl border transition-colors duration-200 ${
                  openIndex === index
                    ? 'bg-card border-primary/50'
                    : 'bg-card/50 border-border hover:border-primary/30 hover:bg-card/70'
                }`}
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    openIndex === index
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-primary/20 text-primary'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ml-4 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Answer */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-6 bg-card/30 border border-primary/10 border-t-0 rounded-b-xl">
                  <div className="flex gap-4">
                    <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" aria-hidden="true" />
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}