'use client'

import posthog from 'posthog-js'

/**
 * Typed analytics wrapper. The event set is closed so names/props can't
 * drift. PostHog is initialized in components/PostHogProvider.tsx; calling
 * track() before init (or when the key is absent) is a safe no-op.
 */

type CtaLocation =
  | 'nav'
  | 'hero'
  | 'what-we-do'
  | 'why-different'
  | 'faq'
  | 'opportunity-lab'
  | 'snapshot'
  | 'closing'
  | 'footer'
  /* The standalone /snapshot page, so its conversions can be told apart from
     the landing page's block of the same name. */
  | 'snapshot-page-faq'
  | 'snapshot-page-closing'

export type AnalyticsEvents = {
  cta_primary_click: { location: CtaLocation }
  cta_secondary_click: { location: CtaLocation }
  form_submit_success: { has_agency_history: 'yes' | 'no' }
  scroll_depth: { section: 'what_we_do' | 'snapshot' }
}

export function track<K extends keyof AnalyticsEvents>(
  name: K,
  props: AnalyticsEvents[K],
): void {
  if (typeof window === 'undefined') return
  // posthog is a stable singleton; capture is a no-op until init runs.
  posthog.capture(name, props)
}
