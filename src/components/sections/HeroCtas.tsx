'use client'

import { anchors } from '@/lib/routes'
import { track } from '@/lib/analytics'
import styles from './Hero.module.css'

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" aria-hidden="true">
      <path
        d="M4.5 11.5 11.5 4.5M6 4.5h5.5V10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Hero CTAs (client) — anchors that fire PostHog events on click. */
export function HeroCtas() {
  return (
    <div className={styles.ctas}>
      <a
        href={anchors.snapshot}
        className={styles.primaryCta}
        onClick={() => track('cta_primary_click', { location: 'hero' })}
      >
        <span>Book a Snapshot</span>
        <span className={styles.ctaBadge} aria-hidden="true">
          <ArrowUpRight />
        </span>
      </a>
      <a
        href={anchors.whatWeDo}
        className={styles.secondaryCta}
        onClick={() => track('cta_secondary_click', { location: 'hero' })}
      >
        See what we do
        <ArrowUpRight />
      </a>
    </div>
  )
}
