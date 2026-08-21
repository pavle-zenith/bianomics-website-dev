'use client'

import { resetConsent } from '@/lib/consent'

/**
 * Reopens the consent banner. A consent choice that cannot be changed is not
 * really a choice, and both the CCPA and the GDPR sections of the Privacy
 * Policy say it can be withdrawn.
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => resetConsent()}>
      Cookie settings
    </button>
  )
}
