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
 * Results — a list, one engagement per row: the mockup on the left, everything
 * written about it on the right. Eight of these in a two-up grid gave each one
 * a half-width column to say its piece in, which is what was squeezing the
 * copy; a full-width row gives the text a column of its own.
 *
 * The frames are square because the mockups are: they are composed images, and
 * a landscape crop takes a quarter of the height off them. Services ride inside
 * the image on glass, over a gradient that keeps them legible.
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
            {caseStudies.map((study) => (
              <Card key={study.id} study={study} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Card({ study }: { study: CaseStudy }) {
  const image = study.texture ? textures[study.texture] : undefined

  return (
    <Reveal className={styles.card}>
      <article
        className={styles.row}
        // The coded accent for this engagement, used on the category and dots.
        // Cast because CSS custom properties are not in the CSSProperties type.
        style={{ ['--case-fill' as string]: `var(--lab-${study.color}-fill)` } as CSSProperties}
      >
        <div className={styles.media}>
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(min-width: 60rem) 42vw, 100vw"
              className={styles.image}
            />
          ) : (
            /* No image yet. The engagement's own colour rather than a
               neighbour's photograph, which would credit the wrong work. */
            <span className={styles.pending} aria-hidden="true">
              {study.client}
            </span>
          )}
        </div>

        {/* Two groups, pinned to the top and the foot of the row: the kind of
            engagement rides against the top of the frame, and everything that
            says what the work was sits together on its baseline. */}
        <div className={styles.body}>
          <div className={styles.bodyTop}>
            <p className={styles.category}>{study.category}</p>
          </div>

          <div className={styles.bodyFoot}>
            <p className={styles.client}>{study.client}</p>
            <h3 className={styles.title}>{study.title}</h3>
            <p className={styles.summary}>{study.summary}</p>
            <p className={styles.intro}>{study.intro}</p>

            {/* Out of the picture and onto the page. On glass over the
                artwork they were covering up to half of it once the frame
                came down to a column; here they close the row instead. */}
            <ul className={styles.services} aria-label="Services provided">
              {study.services.map((s) => (
                <li key={s} className={styles.service}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
