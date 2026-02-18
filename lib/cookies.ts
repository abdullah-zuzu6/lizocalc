// Cookie utility functions for managing user preferences and calculator data

export const CookieNames = {
  CONSENT: 'lizo-cookie-consent',
  CALCULATOR_HISTORY: 'lizo-calculator-history',
  PREFERENCES: 'lizo-preferences',
} as const

export interface CookieOptions {
  maxAge?: number // in seconds
  expires?: Date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None'
}

// Set a cookie
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === 'undefined') return

  const {
    maxAge = 365 * 24 * 60 * 60, // 1 year default
    path = '/',
    secure = true,
    sameSite = 'Lax',
  } = options

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
  cookieString += `; path=${path}`
  cookieString += `; max-age=${maxAge}`
  cookieString += `; samesite=${sameSite}`

  if (secure && window.location.protocol === 'https:') {
    cookieString += '; secure'
  }

  document.cookie = cookieString
}

// Get a cookie value
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null

  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim())
    if (decodeURIComponent(cookieName) === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

// Delete a cookie
export function deleteCookie(name: string): void {
  if (typeof document === 'undefined') return
  setCookie(name, '', { maxAge: -1 })
}

// Save consent preference
export function saveConsentPreference(consent: {
  necessary: boolean
  functional: boolean
  analytics: boolean
}): void {
  setCookie(CookieNames.CONSENT, JSON.stringify(consent), {
    maxAge: 365 * 24 * 60 * 60, // 1 year
  })
}

// Get consent preference
export function getConsentPreference(): {
  necessary: boolean
  functional: boolean
  analytics: boolean
} | null {
  const cookieValue = getCookie(CookieNames.CONSENT)
  if (!cookieValue) return null
  try {
    return JSON.parse(cookieValue)
  } catch {
    return null
  }
}

// Check if user has given consent
export function hasGivenConsent(): boolean {
  return getCookie(CookieNames.CONSENT) !== null
}

// Save calculator history
export function saveCalculatorHistory(
  calculatorName: string,
  data: Record<string, any>
): void {
  const history = getCalculatorHistory()
  history[calculatorName] = {
    data,
    timestamp: new Date().toISOString(),
  }
  setCookie(CookieNames.CALCULATOR_HISTORY, JSON.stringify(history))
}

// Get calculator history
export function getCalculatorHistory(): Record<
  string,
  { data: Record<string, any>; timestamp: string }
> {
  const cookieValue = getCookie(CookieNames.CALCULATOR_HISTORY)
  if (!cookieValue) return {}
  try {
    return JSON.parse(cookieValue)
  } catch {
    return {}
  }
}

// Clear all cookies
export function clearAllCookies(): void {
  Object.values(CookieNames).forEach((cookieName) => {
    deleteCookie(cookieName)
  })
}
