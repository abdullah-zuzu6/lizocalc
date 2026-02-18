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
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Information We Do NOT Collect</h2>
            <p className="text-muted-foreground">LizoCalculator does not collect, store, or transmit any personal information to our servers. All calculations are performed directly in your browser and remain on your device.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Cookies and Local Storage</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>We use cookies and browser local storage to enhance your experience. These are stored locally on your device and contain:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li><strong>Cookie Consent Preferences:</strong> Your choice regarding analytics and functional cookies</li>
                <li><strong>Calculator History:</strong> Your previous calculator inputs and results (optional, for your convenience)</li>
                <li><strong>User Preferences:</strong> Your selected options and settings</li>
              </ul>
              <p>All cookie data remains on your device and is never sent to our servers. You can clear these cookies at any time from your browser settings.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Necessary Cookies</h3>
                <p>Essential for website functionality. These enable basic features like website security and cannot be disabled.</p>
              </div>
              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Functional Cookies</h3>
                <p>Remember your preferences and settings to provide a personalized experience.</p>
              </div>
              <div className="pl-4 border-l-2 border-primary">
                <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                <p>Help us understand how you use LizoCalculator to improve our service. You can disable these at any time.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Browser Compatibility</h2>
            <p className="text-muted-foreground">Our cookie functionality works with all modern browsers including Chrome, Firefox, Safari, and Edge. Cookies are stored locally on your device and do not require cloud synchronization.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Third-Party Services</h2>
            <p className="text-muted-foreground">We may use analytics services to understand site usage patterns. These services may use their own cookies according to their privacy policies. You can manage your analytics preferences through our cookie banner.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
            <p className="text-muted-foreground">All data transmission uses HTTPS encryption. Your cookies are stored securely on your local device. We do not transmit sensitive calculator data to external servers.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Your Rights</h2>
            <div className="space-y-2 text-muted-foreground">
              <p>You have full control over cookies:</p>
              <ul className="list-disc list-inside space-y-2 ml-2">
                <li>Manage cookie preferences anytime using our cookie banner</li>
                <li>Clear cookies from your browser settings</li>
                <li>Disable cookies entirely through your browser</li>
                <li>Request to delete all stored data</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground">We may update this policy periodically. We encourage you to review it regularly for any changes. The last update date is displayed above.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground">If you have questions about our privacy practices or cookies, please contact us at support@lizocalculator.com</p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
