import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { FitSituation } from '@/content/types'
import { getContent } from '@/content/live'
import { Reveal } from '@/components/ui/Reveal'
import styles from './WhoWeWorkWith.module.css'

import socialImpact from '../../../public/serve/social-impact.webp'
import careerSeekers from '../../../public/serve/career-seekers.webp'

/**
 * Keyed by `fit.photo`. Derived from _source/ by `npm run build-photos`.
 *
 * Typed to the key union rather than to `string`, so adding a situation
 * without its photograph is a compile error. It used to be a loose record
 * with a fallback to the first image, which would have put the wrong
 * photograph under a heading rather than failing.
 */
const photos: Record<FitSituation['photo'], StaticImageData> = {
  'social-impact': socialImpact,
  'career-seekers': careerSeekers,
}

/**
 * Who we serve — tall photo cards, one per half of the offer, with the copy
 * set over a gradient at the foot of each image.
 */
export async function WhoWeWorkWith() {
  const { fitSituations } = await getContent()
  return (
    <section
      id="who-we-work-with"
      className="section"
      aria-labelledby="who-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="who-heading" className={styles.heading}>
            Purpose needs a voice loud enough to be heard. A workforce strong
            enough to carry it. We build both.
          </h2>
        </Reveal>

        <ul className={styles.grid}>
          {fitSituations.map((fit, i) => (
            <Reveal
              as="li"
              key={fit.id}
              delay={i * 0.08}
              className={styles.card}
            >
              <div
                className={styles.cardInner}
                // Each role already carries one of the four practice colours.
                style={
                  { '--fit-fill': `var(--lab-${fit.color}-fill)` } as CSSProperties
                }
              >
                <div className={styles.cardFill}>
                  <Image
                    src={photos[fit.photo]}
                    alt=""
                    fill
                    sizes="(min-width: 52rem) 50vw, 100vw"
                    className={styles.photo}
                  />
                </div>
                <div className={styles.scrim} aria-hidden="true" />
                {/* Dot screen in the role's coded colour, rising off the foot
                    of the frame where the caption sits. */}
                <div
                  className={`${styles.dots} bed bed-halftone`}
                  aria-hidden="true"
                />

                <div className={styles.caption}>
                  <p className={styles.lead}>{fit.lead}</p>
                  <h3 className={styles.cardTitle}>{fit.title}</h3>
                  <p className={styles.cardText}>{fit.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
