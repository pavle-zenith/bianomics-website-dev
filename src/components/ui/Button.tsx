'use client'

import type { ReactNode } from 'react'
import { track, type AnalyticsEvents } from '@/lib/analytics'
import styles from './Button.module.css'

type Variant = 'primary' | 'secondary'

type CtaEvent = 'cta_primary_click' | 'cta_secondary_click'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  /** If set, renders an <a>; otherwise a <button>. */
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  /** Analytics event to fire on click, with its location. */
  event?: CtaEvent
  location?: AnalyticsEvents['cta_primary_click']['location']
  disabled?: boolean
  className?: string
  fullWidth?: boolean
  /** Renders the accent arrow square beside the button. */
  arrow?: boolean
}

/**
 * The one CTA primitive. Fires a typed PostHog event with `location`
 * so each CTA's conversion is attributable. Renders as a link or button.
 */
export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  type = 'button',
  event,
  location,
  disabled,
  className,
  fullWidth,
  arrow,
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    arrow ? styles.hasArrow : '',
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {arrow ? <span>{children}</span> : children}
      {arrow ? (
        <span className={styles.arrow} aria-hidden="true">
          {/* Two glyphs: the resting one flies out along its own diagonal
              while its twin flies in from the opposite corner. */}
          <span className={`${styles.arrowGlyph} ${styles.arrowOut}`}>
            <ArrowUpRight />
          </span>
          <span className={`${styles.arrowGlyph} ${styles.arrowIn}`}>
            <ArrowUpRight />
          </span>
        </span>
      ) : null}
    </>
  )

  const handleClick = () => {
    if (event && location) {
      track(event, { location })
    }
    onClick?.()
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} aria-disabled={disabled}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={handleClick} disabled={disabled}>
      {content}
    </button>
  )
}

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
