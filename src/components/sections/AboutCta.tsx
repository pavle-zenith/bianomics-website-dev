'use client'

import { about } from '@/content/site'
import { anchors } from '@/lib/routes'
import { track } from '@/lib/analytics'
import styles from './About.module.css'

/** Accent card contents (client) — title, large arrow, and a pill CTA. */
export function AboutCta() {
  return (
    <div className={styles.ctaInner}>
      <p className={styles.ctaTitle}>{about.cta.title}</p>

      <span className={styles.ctaBigArrow} aria-hidden="true">
        <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
          <path
            d="M12 32h40M38 16l16 16-16 16"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <a
        href={anchors.snapshot}
        className={styles.ctaPill}
        onClick={() => track('cta_primary_click', { location: 'snapshot' })}
      >
        {about.cta.label}
        <span className={styles.ctaPillBadge} aria-hidden="true">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M4 8h8M8.5 4.5 12 8l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
  )
}
