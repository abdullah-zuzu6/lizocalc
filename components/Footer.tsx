import Link from 'next/link'
import { Mail, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react'

// Computed at build time — zero client cost
const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">

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
                { href: '/calculators/health', label: 'Fitness & Health' },
                { href: '/calculators/math', label: 'Math Calculators' },
                { href: '/calculators/education', label: 'Education Calculators' },
                { href: '/calculators/physics', label: 'Physics Calculators' },
                { href: '/calculators/time', label: 'Time Calculators' },
                { href: '/calculators', label: 'All Calculators' },
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
                <Link
                  href="/privacy"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-3 text-sm">
                <li>
                <Link
                  href="https://www.linkedin.com/company/lizocalc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" aria-hidden="true" />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/profile.php?id=61573367673248"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" />
                  Facebook
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.instagram.com/lizocalc/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                  Instagram
                </Link>
              </li>

              <li>
                <Link
                  href="https://www.youtube.com/channel/UCJiKjUqHhQ8JLlyn3fPyjhQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4" aria-hidden="true" />
                  YouTube
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
                <Link
                  href="/about"
                  prefetch={false}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
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