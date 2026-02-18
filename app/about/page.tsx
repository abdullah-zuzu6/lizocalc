'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About LizoCalculator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Your trusted platform for fast, accurate calculations across finance, fitness, mathematics, and more.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">LizoCalculator was created to provide free, accessible, and professional-grade calculators for everyone. We believe financial planning, health tracking, and mathematical calculations should be simple and accurate.</p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Us</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>✓ Free and no ads</li>
              <li>✓ Professional-grade accuracy</li>
              <li>✓ User-friendly interface</li>
              <li>✓ Mobile optimized</li>
              <li>✓ No personal data collection</li>
              <li>✓ Always up-to-date</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Calculator Collection</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Financial Calculators</h3>
              <p className="text-muted-foreground text-sm">Mortgage, loan, auto loan, interest, and payment calculators to help with financial planning.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-accent">Fitness & Health</h3>
              <p className="text-muted-foreground text-sm">BMI, calorie, body fat, and BMR calculators for health and fitness tracking.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Mathematics</h3>
              <p className="text-muted-foreground text-sm">Scientific, fraction, and percentage calculators for math calculations.</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">Have questions or suggestions? We'd love to hear from you.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all">
            Contact Us
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
