import Image from 'next/image'
import { comparison, brand } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import logo from '../../../public/Horizontal_Original_Blue.png'
import styles from './WhyDifferent.module.css'

export function WhyDifferent() {
  return (
    <section id="why-different" className="section" aria-labelledby="why-heading">
      <div className="container">
        {/* Title left, CTA right, both above the comparison. */}
        <Reveal className={styles.head}>
          <div className={styles.headMain}>
            <h2 id="why-heading" className={styles.heading}>
              The same team runs it all, and stays as long as you need us.
            </h2>
          </div>

          <div className={styles.headCta}>
            <Button
              href={anchors.snapshot}
              variant="primary"
              event="cta_primary_click"
              location="why-different"
              arrow
            >
              Book a Snapshot
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className={styles.compare}>
            {/* Typical agency panel */}
            <div className={`${styles.panel} ${styles.panelTypical}`}>
              <p className={styles.panelLabel}>Outsourcing an agency</p>
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
                {/* The wordmark stands in for the name, then says what kind of
                    thing it is — the label opposite names an arrangement
                    ("outsourcing an agency"), so this one has to name one too
                    rather than just a company. */}
                <Image src={logo} alt={brand.name} className={styles.panelLogo} />
                <span className={styles.panelLabelSuffix}>embedded team</span>
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
      </div>
    </section>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="17" height="17" fill="none" aria-hidden="true">
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
    <svg viewBox="0 0 16 16" width="17" height="17" fill="none" aria-hidden="true">
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
