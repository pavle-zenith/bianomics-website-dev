'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'
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
 *
 * While it is up it publishes its own height as `--consent-h` on the document
 * element. The card is fixed to the foot of the viewport, which on a phone is
 * the same band the hero's CTA sits in; the hero reserves that height rather
 * than being recomposed around a dialog most visitors dismiss in a second.
 * Measured, not assumed — the height depends on how the notice wraps at the
 * current width. The property is removed the moment the card goes.
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

  const ref = useRef<HTMLDivElement>(null)
  const visible = consent === null

  const publish = useCallback(() => {
    const el = ref.current
    if (!el) return
    document.documentElement.style.setProperty(
      '--consent-h',
      `${Math.ceil(el.getBoundingClientRect().height)}px`,
    )
  }, [])

  useEffect(() => {
    if (!visible) return
    publish()
    const observer = new ResizeObserver(publish)
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      document.documentElement.style.removeProperty('--consent-h')
    }
  }, [visible, publish])

  if (!visible) return null

  const decide = (value: 'granted' | 'denied') => () => writeConsent(value)

  return (
    <div
      ref={ref}
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
