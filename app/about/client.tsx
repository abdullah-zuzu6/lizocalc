'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image' // Added for a profile picture placeholder

export default function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
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

        {/* 🔥 NEW: Meet the Creator Section (E-E-A-T Booster) */}
        <div className="bg-card rounded-3xl border border-blue-500/20 p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* If you have a profile photo, uncomment the Image tag below */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex-shrink-0 flex items-center justify-center text-4xl font-bold text-white shadow-xl shadow-blue-500/20">
              RA
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">Meet the Developer</h2>
              <h3 className="text-blue-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                Rana Muhammad Abdullah — Founder & Lead Engineer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                As a <strong>Mechatronics Engineering student</strong> and a <strong>Full-Stack Web Developer</strong> with over 2 years of experience, I built LizoCalc to solve a simple problem: the internet is full of slow, ad-heavy calculators that are hard to use. 
              </p>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                My engineering background ensures that every formula and mathematical logic used on this site is rigorously tested for accuracy. At LizoCalc, I combine my passion for precision engineering with modern web performance to bring you the best calculation tools on the web.
              </p>
            </div>
          </div>
        </div>

        {/* Collection */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl p-12 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-white text-center">Our Calculator Collection</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-primary">Financial Calculators</h3>
              <p className="text-muted-foreground text-sm">
                Mortgage, loan, interest, ROI, and salary calculators to help with smart financial decisions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-accent">Health & Fitness</h3>
              <p className="text-muted-foreground text-sm">
                BMI, calorie, body fat, BMR, and TDEE calculators for tracking your health and fitness goals.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-white">Math & Science</h3>
              <p className="text-muted-foreground text-sm">
                Scientific, fraction, percentage, and advanced calculators for academic use, including our 
                <Link href="/calculators/education/cgpa-calculator" className="text-blue-400 hover:underline ml-1">CGPA tools</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Have questions about a formula or a suggestion for a new tool? I am always working to improve the platform based on your feedback.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 transition-all active:scale-95"
          >
            Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </main>
  )
}