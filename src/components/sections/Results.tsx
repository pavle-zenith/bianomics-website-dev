import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { CaseStudy, ResultsContent } from '@/content/types'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Results.module.css'

import groundworkYouth from '../../../public/results/groundwork-youth.webp'
import beyondDuty from '../../../public/results/beyond-duty.webp'
import workforceSolutions from '../../../public/results/workforce-solutions.webp'
import challengeFoundation from '../../../public/results/challenge-foundation.webp'
import epla from '../../../public/results/epla.webp'
import readyone from '../../../public/results/readyone.webp'
import drivenAgainstSilence from '../../../public/results/driven-against-silence.webp'

/** Keyed by `study.texture`. Derived from _source/ by `npm run build-portfolio`. */
const textures: Record<string, StaticImageData> = {
  'groundwork-youth': groundworkYouth,
  'beyond-duty': beyondDuty,
  'workforce-solutions': workforceSolutions,
  'challenge-foundation': challengeFoundation,
  epla,
  readyone,
  'driven-against-silence': drivenAgainstSilence,
}

/**
 * Results — an editorial two-column grid. Every card starts on the same line.
 * The frames are square because the mockups are: they are composed images, and
 * the landscape crop the grid used to alternate in took a quarter of the height
 * off the ones it landed on. Services ride inside the image on glass, over a
 * gradient that keeps them legible.
 */
export function Results({ results }: { results: ResultsContent }) {
  const { caseStudies } = results

  return (
    <section
      id="results"
      className={`${styles.results} section section-inverse bed bed-dark`}
      aria-labelledby="results-heading"
      data-nav-tone="dark"
    >
      <div className="container">
        <Reveal variant="mask">
          <h2 id="results-heading" className={styles.heading}>
            Featured projects
          </h2>
        </Reveal>

        {caseStudies.length === 0 ? (
          <Reveal>
            <div className={styles.placeholder}>
              <p className={styles.placeholderText}>
                We are adding client stories here. Ask for a reference when you
                book your Snapshot and we will connect you with someone we have
                worked with.
              </p>
            </div>
          </Reveal>
        ) : (
          <div className={styles.grid}>
            {caseStudies.map((study, i) => (
              <Card key={study.id} study={study} delay={(i % 2) * 0.06} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Card({ study, delay }: { study: CaseStudy; delay: number }) {
  const image = study.texture ? textures[study.texture] : undefined

  return (
    <Reveal delay={delay} className={styles.card}>
      <article
        // The coded accent for this engagement, used on the category and dots.
        // Cast because CSS custom properties are not in the CSSProperties type.
        style={{ ['--case-fill' as string]: `var(--lab-${study.color}-fill)` } as CSSProperties}
      >
        {/* Wraps the frame and the service pills so the pills can be lifted
            onto the image at desktop widths and sit under it on a phone,
            where five of them covered half the artwork. */}
        <div className={styles.frame}>
          <div className={styles.media}>
            {image ? (
              <Image
                src={image}
                alt=""
                fill
                sizes="(min-width: 60rem) 46vw, 100vw"
                className={styles.image}
              />
            ) : (
              /* No image yet. The engagement's own colour rather than a
                 neighbour's photograph, which would credit the wrong work. */
              <span className={styles.pending} aria-hidden="true">
                {study.client}
              </span>
            )}
            <div className={styles.scrim} aria-hidden="true" />
          </div>

          <ul className={styles.services} aria-label="Services provided">
            {study.services.map((s) => (
              <li key={s} className={styles.service}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.client}>{study.client}</p>
        <p className={styles.category}>{study.category}</p>
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.summary}>{study.summary}</p>
        <p className={styles.intro}>{study.intro}</p>
      </article>
    </Reveal>
  )
}
