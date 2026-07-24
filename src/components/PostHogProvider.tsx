'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

/**
 * Initializes PostHog on the client. Safe no-op if the key is absent
 * (e.g. before a dedicated Bianomics project is provisioned), so the
 * site works without analytics configured. Uses NEXT_PUBLIC_ vars.
 */
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key || posthog.__loaded) return

    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: 'identified_only',
      defaults: '2025-05-24',
    })
  }, [])

  return <>{children}</>
}
