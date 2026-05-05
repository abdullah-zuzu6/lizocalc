'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Terms() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6">Terms of Use</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">

          {/* Acceptance */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using LizoCalc, you agree to comply with and be bound by these Terms of Use.
            </p>
          </section>

          {/* Use */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use of Website</h2>
            <p className="text-muted-foreground">
              You may use this website for personal and informational purposes only. You agree not to misuse 
              the website or its tools in any way that may harm the platform or other users.
            </p>
          </section>

          {/* Intellectual Property (VERY IMPORTANT) */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Intellectual Property Rights</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                All content on LizoCalc, including but not limited to design, layout, code, calculators, 
                text, graphics, and images, is the property of LizoCalc and is protected by copyright 
                and intellectual property laws.
              </p>

              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>You are not allowed to copy, reproduce, or redistribute any part of the website</li>
                <li>You may not copy the design, UI, or structure of the website</li>
                <li>You may not use our code, calculators, or content for commercial purposes</li>
                <li>You may not reverse engineer or replicate this website</li>
              </ul>

              <p>
                You may only use the website for personal and lawful purposes. Any unauthorized use may 
                result in legal action.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Disclaimer</h2>
            <p className="text-muted-foreground">
              All calculators and information provided on LizoCalc are for general informational purposes only. 
              We do not guarantee the accuracy or completeness of results. You should verify important calculations 
              before making financial, medical, or professional decisions.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              LizoCalc is not responsible for any losses, damages, or decisions made based on the use of this website. 
              Use of the calculators is at your own risk.
            </p>
          </section>

          {/* Accuracy */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Accuracy of Content</h2>
            <p className="text-muted-foreground">
              While we aim to provide accurate and updated tools, errors may occur. We reserve the right to 
              update or modify content at any time without notice.
            </p>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Third-Party Links & Services</h2>
            <p className="text-muted-foreground">
              Our website may include links to third-party websites or services. We are not responsible for 
              the content or practices of those websites.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Cookies and Local Storage</h2>
            <p className="text-muted-foreground">
              By using LizoCalc, you agree to the use of cookies and local storage as described in our Privacy Policy. 
              These are used to improve functionality and user experience.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We may update these Terms at any time. Continued use of the website means you accept the updated Terms.
            </p>
          </section>

          {/* Law */}
          <section>
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms are governed by applicable laws. Any disputes will be handled under the relevant jurisdiction.
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  )
}