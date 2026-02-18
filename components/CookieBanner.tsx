'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Cookie } from 'lucide-react'
import { hasGivenConsent, saveConsentPreference } from '@/lib/cookies'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: true,
    analytics: true,
  })

  useEffect(() => {
    // Only show banner if user hasn't given consent
    if (!hasGivenConsent()) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    saveConsentPreference({
      necessary: true,
      functional: true,
      analytics: true,
    })
    setIsVisible(false)
  }

  const handleRejectAll = () => {
    saveConsentPreference({
      necessary: true,
      functional: false,
      analytics: false,
    })
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    saveConsentPreference(preferences)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {!showDetails ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <Cookie className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Cookie Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  We use cookies to enhance your experience, analyze site traffic, and serve targeted ads.
                  Read our{' '}
                  <Link href="/privacy" className="text-primary hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                  {' '}to learn more.
                </p>
              </div>
            </div>

            <div className="flex gap-3 flex-shrink-0 w-full sm:w-auto">
              <button
                onClick={handleRejectAll}
                className="flex-1 sm:flex-none px-4 py-2 text-sm border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="flex-1 sm:flex-none px-4 py-2 text-sm border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                Customize
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-medium"
              >
                Accept All
              </button>
            </div>

            <button
              onClick={handleRejectAll}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground text-lg">Cookie Settings</h3>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {/* Necessary Cookies */}
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Necessary Cookies</h4>
                  <div className="relative inline-block w-10 h-6 bg-primary rounded-full">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-full h-full opacity-0 cursor-not-allowed"
                    />
                    <span className="absolute left-1 top-1 w-4 h-4 bg-primary-foreground rounded-full transition-transform" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Essential for website functionality. These cookies cannot be disabled.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Functional Cookies</h4>
                  <button
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        functional: !prev.functional,
                      }))
                    }
                    className={`relative inline-block w-10 h-6 rounded-full transition-colors ${
                      preferences.functional ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.functional ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Remember your preferences and settings for a better experience.
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 rounded-lg border border-border bg-card/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">Analytics Cookies</h4>
                  <button
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: !prev.analytics,
                      }))
                    }
                    className={`relative inline-block w-10 h-6 rounded-full transition-colors ${
                      preferences.analytics ? 'bg-primary' : 'bg-muted'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        preferences.analytics ? 'left-5' : 'left-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Help us understand how you use LizoCalculator to improve our service.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleRejectAll}
                className="flex-1 px-4 py-2 text-sm border border-primary/30 text-primary rounded-lg hover:bg-primary/10 transition-colors font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-medium"
              >
                Save Preferences
              </button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Learn more in our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> and <Link href="/terms" className="text-primary hover:underline">Terms of Use</Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
