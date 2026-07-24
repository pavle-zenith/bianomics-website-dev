import Image from 'next/image'
import { about } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { AboutCta } from './AboutCta'
import teamImg from '../../../public/about/team.png'
import figureImg from '../../../public/about/figure.png'
import styles from './About.module.css'

/**
 * About Us intro: a small eyebrow, a large right-weighted intro paragraph,
 * then three feature cards (accent CTA card, a stat over team imagery, and a
 * stat over an abstract figure). Assets live in public/about/.
 */
export function About() {
  return (
    <section id="about" className={`${styles.about} section`} aria-labelledby="about-heading">
      <div className="container">
        <Reveal className={styles.intro}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            {about.eyebrow}
          </p>
          <div className={styles.introRow}>
            <h2 id="about-heading" className={styles.introText}>
              {about.intro}
            </h2>
            <div className={styles.introCta}>
              <Button
                href={anchors.snapshot}
                variant="primary"
                event="cta_primary_click"
                location="snapshot"
              >
                {about.introCta}
              </Button>
            </div>
          </div>
        </Reveal>

        <div className={styles.grid}>
          {/* Card 1 — accent CTA card */}
          <Reveal className={styles.ctaCard}>
            <AboutCta />
          </Reveal>

          {/* Card 2 — team imagery with a stat overlay */}
          <Reveal delay={0.08} className={styles.mediaCard}>
            <Image
              src={teamImg}
              alt={about.media.imageAlt}
              fill
              sizes="(min-width: 60rem) 33vw, 100vw"
              className={styles.mediaImage}
            />
            <div className={styles.mediaScrim} aria-hidden="true" />
            <div className={styles.stat}>
              <p className={styles.statValue}>
                {about.media.stat}
                <span className={styles.statSuffix}>{about.media.statSuffix}</span>
              </p>
              <p className={styles.statLabel}>{about.media.label}</p>
            </div>
          </Reveal>

          {/* Card 3 — abstract figure with a stat overlay */}
          <Reveal delay={0.16} className={styles.figureCard}>
            <Image
              src={figureImg}
              alt={about.figure.imageAlt}
              fill
              sizes="(min-width: 60rem) 33vw, 100vw"
              className={styles.figureImage}
            />
            <div className={styles.figureStat}>
              <p className={styles.figureValue}>{about.figure.stat}</p>
              <p className={styles.figureLabel}>{about.figure.label}</p>
            </div>
            <a
              href={anchors.whatWeDo}
              className={styles.figureArrow}
              aria-label="See what we do"
            >
              <ArrowRight />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ArrowRight() {
  return (
    <svg viewBox="0 0 40 40" width="40" height="40" fill="none" aria-hidden="true">
      <path
        d="M8 20h24M22 10l10 10-10 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
