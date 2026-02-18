'use client'

import { useState } from 'react'
import { ChevronDown, HelpCircle, Zap } from 'lucide-react'

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <HelpCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Get instant answers to the most common questions. Can't find what you're looking for?{' '}
            <a href="/contact" className="text-primary hover:underline font-semibold">
              Contact us
            </a>
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full px-6 py-5 flex items-center justify-between text-left rounded-xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-card border-primary/50 shadow-lg shadow-primary/10'
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
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-all duration-300 ml-4 ${
                    openIndex === index ? 'rotate-180' : 'group-hover:translate-y-1'
                  }`}
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
                    <div className="flex-shrink-0">
                      <Zap className="w-5 h-5 text-primary mt-1" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-primary mb-1">Still have questions?</p>
              <p className="text-foreground font-medium">We're here to help</p>
            </div>
            <a
              href="/contact"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all whitespace-nowrap"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
