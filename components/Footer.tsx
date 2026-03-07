import Link from 'next/link'
import { Mail, Github, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary">LizoCalculator</h3>
            <p className="text-muted-foreground text-sm">
              Professional online calculators for all your calculation needs. Fast, accurate, and easy to use.
            </p>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculators/financial" className="text-muted-foreground hover:text-primary transition-colors">
                  Financial Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators/health" className="text-muted-foreground hover:text-primary transition-colors">
                  Fitness & Health
                </Link>
              </li>
              <li>
                <Link href="/calculators/math" className="text-muted-foreground hover:text-primary transition-colors">
                  Math Calculators
                </Link>
              </li>
              <li>
                <Link href="/calculators/other" className="text-muted-foreground hover:text-primary transition-colors">
                  Other Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Use
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
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
              © {currentYear} LizoCalculator. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
