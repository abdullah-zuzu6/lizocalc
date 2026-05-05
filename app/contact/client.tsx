'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, MessageSquare, Phone } from 'lucide-react'

export default function Contact() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? You can reach us anytime.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          <div className="space-y-8">

            {/* Email */}
            <div className="flex gap-4 items-start">
              <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-muted-foreground">
                  techbydevorg@gmail.com
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  For general inquiries, support, and feedback
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex gap-4 items-start">
              <Phone className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <p className="text-muted-foreground">
                  +92 318 643475
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Available for quick support and communication
                </p>
              </div>
            </div>

            {/* Feedback */}
            <div className="flex gap-4 items-start">
              <MessageSquare className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Feedback & Suggestions</h3>
                <p className="text-muted-foreground">
                  We are always working to improve LizoCalc. Your ideas and suggestions are welcome.
                </p>
              </div>
            </div>

          </div>

          {/* Info Box */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold mb-4">
              Support Information
            </h2>

            <div className="space-y-4 text-muted-foreground text-sm">
              <p>
                We aim to respond to all inquiries as quickly as possible. Most messages are answered within 24–48 hours.
              </p>

              <p>
                Please include clear details about your question or issue so we can assist you better.
              </p>

              <p>
                For technical issues, mention the calculator name and device or browser you are using.
              </p>
            </div>
          </div>

        </div>

        {/* Extra Trust Section */}
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            We’re Here to Help
          </h2>
          <p className="text-muted-foreground">
            Whether you need help using a calculator or want to suggest a new feature, feel free to reach out. 
            Your feedback helps us improve and build better tools for everyone.
          </p>
        </div>

      </div>

      <Footer />
    </main>
  )
}