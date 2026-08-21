'use client'

import Script from 'next/script'
import { useEffect, useSyncExternalStore } from 'react'
import { readConsent, subscribeConsent } from '@/lib/consent'

/**
 * GA4, loaded on the client and only once analytics consent has been given.
 * Safe no-op if the measurement ID is absent, so the site works without
 * analytics configured. Uses NEXT_PUBLIC_ vars.
 *
 * Consent is the gate, not a cosmetic banner. The consent card promises
 * "Decline and nothing loads", so the tag is not merely configured to stay
 * quiet — the script itself is never requested until consent reads 'granted'.
 * A browser sending Global Privacy Control never reaches that state. Pasting
 * Google's stock snippet into the layout would have loaded gtag.js on every
 * visit and made that promise false.
 *
 * Consent is read through `useSyncExternalStore` for the same reason
 * PostHogProvider does: it is a value living outside React that can change
 * from another component or another tab. The server snapshot is `undefined`,
 * so the first client render matches the HTML.
 */

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

export function GoogleAnalytics() {
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => readConsent(),
    () => undefined,
  )

  // Withdrawing consent has to take effect without a reload. gtag.js reads
  // this flag before every hit, so setting it stops collection immediately
  // even though the script stays in the document. Set for any non-granted
  // state, so it is already true if the script ever loads out of order.
  useEffect(() => {
    if (!MEASUREMENT_ID) return
    ;(window as unknown as Record<string, boolean>)[`ga-disable-${MEASUREMENT_ID}`] =
      consent !== 'granted'
  }, [consent])

  if (!MEASUREMENT_ID || consent !== 'granted') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      {/* Consent Mode is set before `config` so the first hit already carries
          the granted state rather than being sent under the default. */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted'
});
gtag('config', '${MEASUREMENT_ID}');`}
      </Script>
    </>
  )
}
