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
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  const handleClick = () => {
    if (event && location) {
      track(event, { location })
    }
    onClick?.()
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={handleClick} aria-disabled={disabled}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={handleClick} disabled={disabled}>
      {children}
    </button>
  )
}
