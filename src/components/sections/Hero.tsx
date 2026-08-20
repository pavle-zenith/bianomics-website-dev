import Image from 'next/image'
import { brand } from '@/content/site'
import { Reveal } from '@/components/ui/Reveal'
import { AntiAgencyBadge } from '@/components/ui/AntiAgencyBadge'
import { HeroCtas } from './HeroCtas'
import heroBg from '../../../public/hero/underlay.webp'
import styles from './Hero.module.css'

/**
 * Full-bleed hero on a light canvas: the blue haze texture washing in from the
 * right, a halftone screen rising off the bottom edge, an oversized two-line
 * headline (the Brand Anchor, the page's single H1), a primary pill CTA with an
 * arrow badge plus a text secondary CTA, and a bottom row carrying the
 * clarifier paragraph and the trust line.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className={`${styles.hero} bed bed-haze`}
      aria-labelledby="hero-heading"
    >
      {/* Layers over the haze bed, in paint order: the old hero texture as a
          barely-there underlay in the right-hand field, multiplied into the
          haze so it reads as grain in the colour rather than as an image; a
          scrim that lifts the left half back to near-white so the headline
          always clears its background; and the dot screen that carries the
          eye into the section below. */}
      <div className={styles.underlay} aria-hidden="true">
        <Image
          src={heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.underlayImg}
        />
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={`${styles.dots} bed bed-halftone`} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <div className={styles.top}>
          <Reveal>
            <div className={styles.badgeRow}>
              <AntiAgencyBadge label={brand.lockupHero} />
            </div>
          </Reveal>

          {/* The single H1 on the page: the Brand Anchor (verbatim), read from
              `brand.anchorLines` rather than typed here, so it cannot drift
              from the metadata title. Each line masks in on its own beat so
              the statement assembles. */}
          <h1 id="hero-heading" className={styles.anchor}>
            {brand.anchorLines.map((line, i) => (
              <Reveal
                key={line}
                as="span"
                variant="mask"
                delay={0.08 + i * 0.12}
                className={`${styles.line} ${i > 0 ? styles.line2 : ''}`}
              >
                {line}
              </Reveal>
            ))}
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
