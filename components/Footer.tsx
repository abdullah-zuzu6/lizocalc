// 'use client'

// import { Mail,  } from 'lucide-react'
// import NoPrefetchLink from './NoPrefetchLink'

// export default function Footer() {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className="bg-card border-t border-border mt-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//           {/* About */}
//           <div>
//             <h3 className="font-bold text-lg mb-4 text-primary">LizoCalc</h3>
//             <p className="text-muted-foreground text-sm">
//               Professional online calculators for all your calculation needs. Fast, accurate, and easy to use.
//             </p>
//           </div>

//           {/* Calculators */}
//           <div>
//             <h4 className="font-semibold mb-4">Calculators</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <NoPrefetchLink href="/calculators/financial" className="text-muted-foreground hover:text-primary transition-colors">
//                   Financial Calculators
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators/health" className="text-muted-foreground hover:text-primary transition-colors">
//                   Fitness & Health
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators/math" className="text-muted-foreground hover:text-primary transition-colors">
//                   Math Calculators
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators/education" className="text-muted-foreground hover:text-primary transition-colors">
//                   Education Calculators
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators/physics" className="text-muted-foreground hover:text-primary transition-colors">
//                   Physics Calculators
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators/time" className="text-muted-foreground hover:text-primary transition-colors">
//                   Time Calculators
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/calculators" className="text-muted-foreground hover:text-primary transition-colors">
//                   All Calculators
//                 </NoPrefetchLink>
//               </li>
//             </ul>
//           </div>

//           {/* Legal */}
//           <div>
//             <h4 className="font-semibold mb-4">Legal</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <NoPrefetchLink href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
//                   Privacy Policy
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
//                   Terms of Use
//                 </NoPrefetchLink>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="font-semibold mb-4">Contact</h4>
//             <ul className="space-y-2">
//               <li>
//                 <NoPrefetchLink href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
//                   <Mail className="w-4 h-4" />
//                   Contact Us
//                 </NoPrefetchLink>
//               </li>
//               <li>
//                 <NoPrefetchLink href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
//                   About Us
//                 </NoPrefetchLink>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-border pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <p className="text-muted-foreground text-sm">
//               © {currentYear} LizoCalc. All rights reserved.
//             </p>
           
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }


// FIXES APPLIED:
// 1. Removed 'use client' — Footer has zero interactivity, zero hooks, zero state.
//    Making it a server component means it ships ZERO client JS for this component.
//    This directly reduces your JS bundle size (helps unused JS diagnostic).
// 2. Moved currentYear to a static const — computed once at build time on the server,
//    not re-evaluated in the browser on every page load.
// 3. Replaced NoPrefetchLink with next/link (prefetch={false}) directly — removes
//    one extra component from the client bundle.
// 4. Removed unused Mail import gap (kept Mail since it's used in Contact link).

import Link from 'next/link'
import { Mail } from 'lucide-react'

// Computed at build time — zero client cost
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">LizoCalc</h3>
            <p className="text-muted-foreground text-sm">
              Professional online calculators for all your calculation needs.
              Fast, accurate, and easy to use.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/calculators/financial', label: 'Financial Calculators' },
                { href: '/calculators/health',    label: 'Fitness & Health' },
                { href: '/calculators/math',      label: 'Math Calculators' },
                { href: '/calculators/education', label: 'Education Calculators' },
                { href: '/calculators/physics',   label: 'Physics Calculators' },
                { href: '/calculators/time',      label: 'Time Calculators' },
                { href: '/calculators',           label: 'All Calculators' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    prefetch={false}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch={false} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} LizoCalc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}