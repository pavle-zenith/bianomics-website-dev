'use client'

import { anchors } from '@/lib/routes'
import { track } from '@/lib/analytics'
import styles from './Results.module.css'

/** Snapshot CTA on a case-study right panel (client component for tracking). */
export function ResultsCta() {
  return (
    <a
      href={anchors.snapshot}
      className={styles.cta}
      onClick={() => track('cta_primary_click', { location: 'why-different' })}
    >
      Book a Snapshot
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
