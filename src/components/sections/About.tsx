import type { CSSProperties } from 'react'
import { about } from '@/content/site'
import { routes } from '@/lib/routes'
import type { AboutStat } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import styles from './About.module.css'

/**
 * About — the statement runs the width with the Snapshot CTA parked on its
 * last line, then the range of the work as capability pills on the left and a
 * single headline number on the right.
 *
 * Each pill carries the practice it belongs to and takes that practice's
 * colour on hover, so the section previews the coding that the practices
 * block further down uses at full strength.
 */
export function About() {
  // Only the first number is shown here now; the row reads as one supporting
  // figure beside the pills rather than a wall of cards.
  const [stat] = about.stats

  return (
    <section id="about" className={`${styles.about} section`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.head}>
          <Reveal className={styles.headMain} variant="mask">
            <h2 id="about-heading" className={styles.heading}>
              {about.introBody}
            </h2>
          </Reveal>

          <Reveal delay={0.12} className={styles.headCta}>
            <Button
              href={routes.snapshot}
              variant="primary"
              event="cta_primary_click"
              location="snapshot"
              arrow
            >
              {about.introCta}
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <p className={styles.close}>{about.introClose}</p>
        </Reveal>

        <div className={styles.body}>
          <ul className={styles.pills}>
            {about.capabilities.map((capability, i) => (
              <Reveal
                as="li"
                key={capability.label}
                delay={(i % 2) * 0.06}
                className={styles.pill}
                style={
                  {
                    '--pill-fill': `var(--lab-${capability.color}-fill)`,
                  } as CSSProperties
                }
              >
                <span className={styles.pillMark} aria-hidden="true" />
                <span className={styles.pillLabel}>{capability.label}</span>
              </Reveal>
            ))}
          </ul>

          {stat ? (
            <Reveal delay={0.12} className={styles.statCard}>
              <StatCard stat={stat} />
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  )
}

function StatCard({ stat }: { stat: AboutStat }) {
  return (
    <>
      {/* Decorative: the same numeral, oversized and clipped by the card. */}
      <span className={styles.ghost} aria-hidden="true">
        {stat.value}
      </span>

      <Mark className={styles.markTop} />
      <Mark className={styles.markBottom} />

      <p className={styles.statValue}>
        {stat.value}
        {stat.suffix ? <span className={styles.statSuffix}>{stat.suffix}</span> : null}
      </p>
      <p className={styles.statLabel}>{stat.label}</p>
    </>
  )
}

/** The hairline corner tick from the reference. Decorative only. */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      width="10"
      height="10"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 0v10M0 5h10" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
