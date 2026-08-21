'use client'

import { useEffect, useSyncExternalStore } from 'react'
import posthog from 'posthog-js'
import { readConsent, subscribeConsent } from '@/lib/consent'

/**
 * Initializes PostHog on the client, and only once analytics consent has been
 * given. Safe no-op if the key is absent (e.g. before a dedicated Bianomics
 * project is provisioned), so the site works without analytics configured.
 * Uses NEXT_PUBLIC_ vars.
 *
 * Consent is the gate, not a cosmetic banner: nothing loads, no cookie is
 * set, and no request leaves the page until consent reads 'granted'. A
 * browser sending Global Privacy Control never reaches that state.
 *
 * Consent is read through `useSyncExternalStore` because that is what it is —
 * a value living outside React that can change from another component or
 * another tab. The server snapshot is `undefined`, so the first client render
 * matches the HTML and the real value arrives on the pass straight after.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const consent = useSyncExternalStore(
    subscribeConsent,
    () => readConsent(),
    () => undefined,
  )

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key || consent !== 'granted' || posthog.__loaded) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      defaults: '2025-05-24',
    })
  }, [consent])

  // Withdrawing consent has to take effect without a reload.
  useEffect(() => {
    if (consent === 'denied' && posthog.__loaded) {
      posthog.opt_out_capturing()
    }
  }, [consent])

  return <>{children}</>
}
