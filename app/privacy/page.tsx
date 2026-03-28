'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">

          {/* Intro */}
          <section>
            <p className="text-muted-foreground">
              LizoCalc is designed with privacy in mind. All calculations are performed directly in your browser. 
              We do not require sign-ups and we do not store personal data on our servers.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Do Not Collect</h2>
            <p className="text-muted-foreground">
              We do not collect, store, or process any personal information such as your name, email address, 
              or calculator inputs on our servers. All calculations happen locally on your device.
            </p>
          </section>

          {/* Local Storage */}
          <section>
            <h2 className="text-2xl font-bold mb-4">2. Local Storage and Cookies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                LizoCalc uses browser local storage and limited cookies to improve your experience. 
                This data stays on your device and is not transmitted to our servers.
              </p>

              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Preferences:</strong> Your selected settings and options</li>
                <li><strong>Calculator History:</strong> Saved inputs and results (if used)</li>
                <li><strong>Cookie Consent:</strong> Your choice for analytics and features</li>
              </ul>

              <p>
                You can clear this data anytime from your browser settings.
              </p>
            </div>
          </section>

          {/* Cookies Types */}
          <section>
            <h2 className="text-2xl font-bold mb-4">3. Types of Cookies</h2>
            <div className="space-y-4 text-muted-foreground">

              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Essential Cookies</h3>
                <p>Required for basic functionality and security of the website.</p>
              </div>

              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p>Remember your preferences for a better user experience.</p>
              </div>

              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p>Used to understand usage and improve performance. These can be disabled.</p>
              </div>

            </div>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may use third-party services such as analytics tools to understand how users interact 
              with the website. These services may use their own cookies according to their privacy policies.
            </p>
          </section>

          {/* Ads (IMPORTANT for future) */}
          <section>
            <h2 className="text-2xl font-bold mb-4">5. Advertising</h2>
            <p className="text-muted-foreground">
              In the future, LizoCalc may display advertisements through third-party ad networks such as Google AdSense. 
              These services may use cookies to show relevant ads based on your interests.
            </p>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground">
              We use HTTPS encryption to protect your connection. Since all calculations are performed locally, 
              your data remains under your control.
            </p>
          </section>

          {/* User Rights */}
          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <div className="space-y-2 text-muted-foreground">
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>You can clear browser storage at any time</li>
                <li>You can disable cookies in your browser settings</li>
                <li>You can control analytics preferences via cookie consent</li>
              </ul>
            </div>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl font-bold mb-4">8. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page 
              with an updated date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, you can contact us at:
              <br />
              <strong>techbydevorg@gmail.com</strong>
            </p>
          </section>

        </div>
      </div>

      <Footer />
    </main>
  )
}