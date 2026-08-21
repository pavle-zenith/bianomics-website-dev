'use client'

/**
 * Analytics consent, in one place.
 *
 * The banner and the PostHog provider both read from here, so the banner can
 * never claim a choice the analytics does not honour. Nothing is loaded until
 * `readConsent()` returns 'granted'.
 */

export type Consent = 'granted' | 'denied'

const KEY = 'bianomics:analytics-consent'
/** Same-tab listeners; `storage` only fires in other tabs. */
const EVENT = 'bianomics:consent-change'

/**
 * A browser sending Global Privacy Control has already told us not to. We
 * treat that as a decision, so the banner never appears and analytics never
 * loads — which is what the Privacy Policy says we do.
 */
export function hasGlobalPrivacyControl(): boolean {
  if (typeof navigator === 'undefined') return false
  return (navigator as Navigator & { globalPrivacyControl?: boolean })
    .globalPrivacyControl === true
}

export function readConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  if (hasGlobalPrivacyControl()) return 'denied'
  try {
    const value = window.localStorage.getItem(KEY)
    return value === 'granted' || value === 'denied' ? value : null
  } catch {
    // Private mode, or storage blocked. Treat as undecided rather than
    // assuming consent.
    return null
  }
}

export function writeConsent(value: Consent): void {
  try {
    window.localStorage.setItem(KEY, value)
  } catch {
    // If we cannot remember the choice we still honour it for this page view.
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }))
}

/** Clears the choice so the banner comes back. */
export function resetConsent(): void {
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    /* nothing to clear */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }))
}

export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}
