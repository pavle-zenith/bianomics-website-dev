import Image from 'next/image'
import { about } from '@/content/site'
import { getResults } from '@/content'
import { anchors } from '@/lib/routes'
import type { AboutStat, Testimonial } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import ctaBg from '../../../public/about/team.png'
import styles from './About.module.css'

/**
 * About — the statement, the supporting line, then the evidence row:
 * a bare testimonial rail on the left and the two headline numbers as cards,
 * each with its own numeral ghosted in behind and clipped by the card edge.
 */
export function About() {
  // Testimonials live in the results content. Empty is the expected state
  // until approved quotes land, and the rail simply drops out when it is.
  const [testimonial] = getResults().testimonials

  return (
    <section id="about" className={`${styles.about} section`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.intro}>
          <Reveal variant="mask">
            <h2 id="about-heading" className={styles.introText}>
              {about.introStatement}
            </h2>
          </Reveal>

          {/* Full-width band: the photograph is carried at low opacity so the
              copy stays the subject and the type keeps its contrast. */}
          <Reveal delay={0.12} className={styles.band}>
            {/* Dark enough to drive the nav's tone while it is under the line. */}
            <span data-nav-tone="dark" className={styles.bandTone} aria-hidden="true" />
            <div className={styles.bandBg} aria-hidden="true">
              <Image
                src={ctaBg}
                alt=""
                fill
                sizes="100vw"
                className={styles.bandImg}
                placeholder="blur"
              />
            </div>
            <div className={styles.bandScrim} aria-hidden="true" />

            <div className={styles.bandInner}>
              <div className={styles.introSubText}>
                <p className={styles.introLabel}>{about.introLabel}</p>
                <p className={styles.introBody}>{about.introBody}</p>
                <p className={styles.introClose}>{about.introClose}</p>
              </div>

              <Button
                href={anchors.snapshot}
                variant="primary"
                event="cta_primary_click"
                location="snapshot"
                arrow
              >
                {about.introCta}
              </Button>
            </div>
          </Reveal>
        </div>

        <div className={`${styles.evidence} ${testimonial ? '' : styles.evidenceNoRail}`}>
          {testimonial ? (
            <Reveal className={`${styles.card} ${styles.quoteCard}`}>
              <Quote testimonial={testimonial} />
            </Reveal>
          ) : null}

          {about.stats.map((stat, i) => (
            <Reveal
              key={stat.value}
              delay={0.08 + i * 0.08}
              className={`${styles.card} ${styles.statCard}`}
            >
              <StatCard stat={stat} />
            </Reveal>
          ))}
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

function Quote({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={styles.quoteFigure}>
      <Mark className={styles.markTop} />
      <Mark className={styles.markBottom} />

      {testimonial.rating ? (
        <p className={styles.rating}>
          <span className={styles.stars} aria-hidden="true">
            ★★★★★
          </span>
          <span className={styles.ratingValue}>{testimonial.rating}</span>
          <span className={styles.ratingOutOf}>/ 5</span>
        </p>
      ) : null}

      <blockquote className={styles.quote}>{testimonial.quote}</blockquote>

      <figcaption className={styles.attribution}>
        <span className={styles.attributionName}>{testimonial.attribution}</span>
        {testimonial.role || testimonial.org ? (
          <span className={styles.attributionRole}>
            {[testimonial.role, testimonial.org].filter(Boolean).join(', ')}
          </span>
        ) : null}
      </figcaption>
    </figure>
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
