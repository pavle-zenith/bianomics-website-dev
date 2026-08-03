import Image from 'next/image'
import { brand } from '@/content/site'
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
    <section
      id="hero"
      className={styles.hero}
      aria-labelledby="hero-heading"
      data-nav-tone="dark"
    >
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
              <AntiAgencyBadge label={brand.lockupHero} tone="inverse" />
            </div>
          </Reveal>

          {/* The single H1 on the page: the Brand Anchor (verbatim).
              Each line masks in on its own beat so the statement assembles. */}
          <h1 id="hero-heading" className={styles.anchor}>
            <Reveal as="span" variant="mask" delay={0.08} className={styles.line}>
              You built something real.
            </Reveal>
            <Reveal
              as="span"
              variant="mask"
              delay={0.2}
              className={`${styles.line} ${styles.line2}`}
            >
              We make the world feel it, fund it, and remember it.
            </Reveal>
          </h1>

        </div>

        {/* The base: a rule, then the subline and the CTA.
            The recognition row (trust lead + `recognitionMarks` set in
            `.trust` / `.trustLead` / `.marks` / `.mark`) is temporarily out at
            Pavle's request. Its styles are kept so it can be restored here. */}
        <div className={styles.base}>
          <Reveal delay={0.24} className={styles.bottom}>
            <p className={styles.clarifier}>{brand.clarifier}</p>
            <div className={styles.ctaSlot}>
              <HeroCtas />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
