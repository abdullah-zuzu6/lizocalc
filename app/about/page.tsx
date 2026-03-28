'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About LizoCalc
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LizoCalc is a modern platform offering fast, accurate, and easy-to-use calculators 
            for finance, health, mathematics, and more — all in one place.
          </p>
        </div>

        {/* Mission & Why */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground">
              Our goal is to make everyday calculations simple, fast, and accessible to everyone. 
              Whether you're planning finances, tracking health, or solving math problems, 
              LizoCalc provides reliable tools that work instantly in your browser.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose LizoCalc</h2>
            <ul className="text-muted-foreground space-y-2">
              <li>✓ Fast and accurate calculations</li>
              <li>✓ Clean and user-friendly design</li>
              <li>✓ Works on mobile and desktop</li>
              <li>✓ No sign-up required</li>
              <li>✓ Privacy-focused (data stays on your device)</li>
              <li>✓ Regular updates and improvements</li>
            </ul>
          </div>
        </div>

        {/* Collection */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Calculator Collection</h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">
                Financial Calculators
              </h3>
              <p className="text-muted-foreground text-sm">
                Mortgage, loan, interest, ROI, and salary calculators to help with smart financial decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-accent">
                Health & Fitness
              </h3>
              <p className="text-muted-foreground text-sm">
                BMI, calorie, body fat, BMR, and TDEE calculators for tracking your health and fitness goals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">
                Math & Science
              </h3>
              <p className="text-muted-foreground text-sm">
                Scientific, fraction, percentage, and advanced calculators for everyday and academic use.
              </p>
            </div>

          </div>
        </div>

        {/* Trust Section */}
        <div className="bg-card rounded-2xl border border-border p-8 mb-16">
          <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
          <p className="text-muted-foreground">
            All calculators on LizoCalc run directly in your browser. This means your data stays private 
            and calculations are performed instantly without sending information to external servers. 
            We focus on speed, accuracy, and simplicity.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
          <p className="text-muted-foreground mb-6">
            Have questions, suggestions, or feedback? We are always working to improve.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
          >
            Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  )
}