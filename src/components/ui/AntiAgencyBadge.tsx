import styles from './AntiAgencyBadge.module.css'

interface AntiAgencyBadgeProps {
  /** The lockup text. Each placement on the page carries a different one. */
  label: string
  /** Light treatment for dark canvases. */
  tone?: 'default' | 'inverse'
}

/**
 * A positioning lockup rendered as a graphic badge. These strings are lockup
 * elements only and are never written into a prose sentence. The colored dot
 * is the brand's natural accent hook.
 */
export function AntiAgencyBadge({ label, tone = 'default' }: AntiAgencyBadgeProps) {
  return (
    <span
      className={`${styles.badge} ${tone === 'inverse' ? styles.inverse : ''}`}
      aria-label={label}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.text}>{label}</span>
    </span>
  )
}
