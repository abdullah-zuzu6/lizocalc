// LocalStorage utility functions for Lizocalc
export const StorageKeys = {
  CONSENT: 'lizo-consent',
  HISTORY: 'lizo-calc-history',
  SAVED: 'lizo-saved-calculators',
  PREFERENCES: 'lizo-preferences',
} as const

/** CORE ENGINE **/
export function setItem(name: string, value: string): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(name, value) } catch (e) { console.error(e) }
}

export function getItem(name: string): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(name)
}

export function removeItem(name: string): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(name)
}

/** SAVED CALCULATORS **/
export interface SavedTool { name: string; href: string; category: string }

export function getSavedCalculators(): SavedTool[] {
  const value = getItem(StorageKeys.SAVED);
  return value ? JSON.parse(value) : [];
}

export function toggleSavedCalculator(tool: SavedTool): boolean {
  const saved = getSavedCalculators();
  const exists = saved.find(item => item.href === tool.href);
  const newSaved = exists ? saved.filter(item => item.href !== tool.href) : [...saved, tool];
  setItem(StorageKeys.SAVED, JSON.stringify(newSaved));
  return !exists;
}

/** CONSENT (Aliases for your CookieBanner) **/
export function saveConsentPreference(consent: any): void {
  setItem(StorageKeys.CONSENT, JSON.stringify(consent));
}

export function hasGivenConsent(): boolean {
  return getItem(StorageKeys.CONSENT) !== null;
}

export function getConsentPreference(): any | null {
  const value = getItem(StorageKeys.CONSENT);
  return value ? JSON.parse(value) : null;
}

/** CALC HISTORY **/
export function saveCalculatorHistory(calculatorName: string, data: Record<string, any>): void {
  const history = getCalculatorHistory();
  history[calculatorName] = { data, timestamp: new Date().toISOString() };
  setItem(StorageKeys.HISTORY, JSON.stringify(history));
}

export function getCalculatorHistory(): Record<string, any> {
  const value = getItem(StorageKeys.HISTORY);
  return value ? JSON.parse(value) : {};
}

/** COMPATIBILITY ALIASES **/
// These ensure your existing imports in CookieBanner.tsx don't break
export const setCookie = setItem;
export const getCookie = getItem;
export const deleteCookie = removeItem;