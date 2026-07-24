import { comparison, brand } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { AntiAgencyBadge } from '@/components/ui/AntiAgencyBadge'
import styles from './WhyDifferent.module.css'

export function WhyDifferent() {
  return (
    <section id="why-different" className="section" aria-labelledby="why-heading">
      <div className="container">
        <Reveal className={styles.head}>
          <div className={styles.badgeRow}>
            <AntiAgencyBadge />
          </div>
          <h2 id="why-heading" className={styles.heading}>
            Most firms do one piece and hand it off. We do the whole picture and
            stay until it holds.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.compare}>
            {/* Typical agency panel */}
            <div className={`${styles.panel} ${styles.panelTypical}`}>
              <p className={styles.panelLabel}>A typical agency</p>
              <ul className={styles.rows}>
                {comparison.map((row) => (
                  <li key={row.dimension} className={styles.row}>
                    <span className={`${styles.mark} ${styles.markX}`} aria-hidden="true">
                      <XIcon />
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowDim}>{row.dimension}</span>
                      {row.typical}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bianomics panel — the elevated, winning side */}
            <div className={`${styles.panel} ${styles.panelUs}`}>
              <p className={styles.panelLabel}>
                <span className={styles.panelDot} aria-hidden="true" />
                {brand.name}
              </p>
              <ul className={styles.rows}>
                {comparison.map((row) => (
                  <li key={row.dimension} className={styles.row}>
                    <span className={`${styles.mark} ${styles.markCheck}`} aria-hidden="true">
                      <CheckIcon />
                    </span>
                    <span className={styles.rowText}>
                      <span className={styles.rowDim}>{row.dimension}</span>
                      {row.bianomics}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className={styles.cta}>
            <Button
              href={anchors.snapshot}
              variant="primary"
              event="cta_primary_click"
              location="why-different"
            >
              Book a Snapshot
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
