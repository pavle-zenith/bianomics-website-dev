import type { ReactNode } from 'react'
import styles from './PullQuote.module.css'

interface PullQuoteProps {
  children: ReactNode
  cite?: string
}

/**
 * Elevated statement in the secondary serif (HV Fitzgerald). The ONLY
 * place the serif is used. Reserved for tagline moments and pull-quotes.
 */
export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <figure className={styles.figure}>
      <blockquote className={styles.quote}>{children}</blockquote>
      {cite ? <figcaption className={styles.cite}>{cite}</figcaption> : null}
    </figure>
  )
}
