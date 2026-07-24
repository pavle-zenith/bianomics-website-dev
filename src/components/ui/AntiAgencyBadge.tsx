import { brand } from '@/content/site'
import styles from './AntiAgencyBadge.module.css'

interface AntiAgencyBadgeProps {
  /** Light treatment for dark canvases. */
  tone?: 'default' | 'inverse'
}

/**
 * The positioning lockup rendered as a graphic badge. Per the brand
 * rules this string ("THE ANTI-AGENCY") is a lockup element only and is
 * never written into a prose sentence. The colored dot is the brand's
 * natural accent hook.
 */
export function AntiAgencyBadge({ tone = 'default' }: AntiAgencyBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${tone === 'inverse' ? styles.inverse : ''}`}
      aria-label={brand.lockup}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>{brand.lockup}</span>
    </span>
  )
}
