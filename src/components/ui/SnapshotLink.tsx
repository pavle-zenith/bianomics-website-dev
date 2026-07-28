'use client'

import type { ReactNode } from 'react'
import { track, type AnalyticsEvents } from '@/lib/analytics'

interface SnapshotLinkProps {
  href: string
  children: ReactNode
  className?: string
  location: AnalyticsEvents['cta_primary_click']['location']
}

/**
 * A CTA link that fires the primary-CTA event. Lets Server Components render
 * bespoke CTA markup without becoming client components themselves.
 */
export function SnapshotLink({
  href,
  children,
  className,
  location,
}: SnapshotLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track('cta_primary_click', { location })}
    >
      {children}
      <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
        <path
          d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  )
}
