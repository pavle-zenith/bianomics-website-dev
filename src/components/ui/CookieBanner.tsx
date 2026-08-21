'use client'

import { useSyncExternalStore } from 'react'
import { routes } from '@/lib/routes'
import { readConsent, subscribeConsent, writeConsent } from '@/lib/consent'
import styles from './CookieBanner.module.css'

/**
 * Analytics consent. Appears only when no choice has been recorded, and the
 * choice it records is the same one PostHogProvider reads — so declining
 * actually prevents the script loading rather than hiding a banner over it.
 *
 * Nothing renders on the server or on the hydrating render: the answer lives
 * in localStorage, and rendering it during hydration would make the markup
 * disagree with the HTML. A brief absence is the correct trade, since no
 * analytics runs while we wait either.
 */
export function CookieBanner() {
  // `undefined` on the server and for the hydrating render; `null` once the
  // client has looked and found no recorded choice. Only the second of those
  // shows the banner, which is what keeps the markup matching on hydration.
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => readConsent(),
    () => undefined,
  )

  if (consent !== null) return null

  const decide = (value: 'granted' | 'denied') => () => writeConsent(value)

  return (
    <div
      className={styles.banner}
      role="dialog"
      aria-labelledby="cookie-heading"
      aria-describedby="cookie-body"
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p id="cookie-heading" className={styles.heading}>
            Analytics cookies
          </p>
          <p id="cookie-body" className={styles.body}>
            We would like to measure which parts of this site are useful. No
            advertising, no selling, no sharing. Decline and nothing loads.{' '}
            <a href={routes.privacy} className={styles.link}>
              Privacy Policy
            </a>
          </p>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.decline} onClick={decide('denied')}>
            Decline
          </button>
          <button type="button" className={styles.accept} onClick={decide('granted')}>
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
