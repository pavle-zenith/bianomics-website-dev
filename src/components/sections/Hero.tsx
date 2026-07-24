import Image from 'next/image'
import { brand, recognitionMarks } from '@/content/site'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { AntiAgencyBadge } from '@/components/ui/AntiAgencyBadge'
import { HeroCtas } from './HeroCtas'
import heroBg from '../../../public/hero/hero-bg.png'
import styles from './Hero.module.css'

/**
 * Full-bleed hero: dark abstract background image + overlay, an oversized
 * two-line headline (the Brand Anchor, the page's single H1), a primary
 * pill CTA with an arrow badge plus a text secondary CTA, and a bottom row
 * carrying the clarifier paragraph, a scroll cue, and the trust line.
 */
export function Hero() {
  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.bg} aria-hidden="true">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay} />
      </div>

      <div className={`${styles.inner} container`}>
        <div className={styles.top}>
          <Reveal>
            <div className={styles.badgeRow}>
              <AntiAgencyBadge tone="inverse" />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            {/* The single H1 on the page: the Brand Anchor (verbatim). */}
            <h1 id="hero-heading" className={styles.anchor}>
              The world doesn&rsquo;t see what you&rsquo;re capable of.{' '}
              <span className={styles.line2}>Yet. We change that.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <HeroCtas />
          </Reveal>
        </div>

        <Reveal delay={0.24} className={styles.bottom}>
          <p className={styles.clarifier}>{brand.clarifier}</p>

          <div className={styles.trust}>
            <p className={styles.trustLead}>
              Trusted work, recognized across the field.
            </p>
            <ul className={styles.marks}>
              {recognitionMarks.map((mark) => (
                <li key={mark.label}>
                  <abbr title={mark.full} className={styles.mark}>
                    {mark.label}
                  </abbr>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <a href={anchors.whoWeWorkWith} className={styles.scrollCue}>
          <span className={styles.scrollArrow} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
              <path
                d="M8 2v12M3.5 9.5 8 14l4.5-4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          Scroll down
        </a>
      </div>
    </section>
  )
}
