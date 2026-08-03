import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { CaseStudy, ResultsContent } from '@/content/types'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import styles from './Results.module.css'

import case1 from '../../../public/results/case-1.png'
import case2 from '../../../public/results/case-2.png'
import case3 from '../../../public/results/case-3.png'

const textures: Record<string, StaticImageData> = {
  'case-1': case1,
  'case-2': case2,
  'case-3': case3,
}

/**
 * Results — an editorial 2x2 grid. Every card starts on the same line; the
 * only variation is the frame, which alternates square and landscape so the
 * grid reads as a spread rather than four identical tiles. Services ride
 * inside the image on glass, over a gradient that keeps them legible.
 */
export function Results({ results }: { results: ResultsContent }) {
  const { caseStudies } = results

  return (
    <section id="results" className="section" aria-labelledby="results-heading">
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
              <Card
                key={study.id}
                study={study}
                // Square on the diagonal, landscape on the counter-diagonal.
                square={i % 3 === 0}
                delay={(i % 2) * 0.06}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Card({
  study,
  square,
  delay,
}: {
  study: CaseStudy
  square: boolean
  delay: number
}) {
  return (
    <Reveal delay={delay} className={styles.card}>
      <article
        // The coded accent for this engagement, used on the category and dots.
        // Cast because CSS custom properties are not in the CSSProperties type.
        style={{ ['--case-fill' as string]: `var(--lab-${study.color}-fill)` } as CSSProperties}
      >
        <div className={`${styles.media} ${square ? styles.mediaSquare : ''}`}>
          <Image
            src={textures[study.texture] ?? case1}
            alt=""
            fill
            sizes="(min-width: 60rem) 46vw, 100vw"
            className={styles.image}
          />
          <div className={styles.scrim} aria-hidden="true" />

          {/* Three at most — a fourth crowds the frame and wraps to a second row. */}
          <ul className={styles.services} aria-label="Services provided">
            {study.services.slice(0, 3).map((s) => (
              <li key={s} className={styles.service}>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <p className={styles.category}>{study.category}</p>
        <h3 className={styles.title}>{study.title}</h3>
        <p className={styles.summary}>{study.summary}</p>
        <p className={styles.intro}>{study.intro}</p>

        <a href={anchors.snapshot} className={styles.link}>
          View case study
          <span aria-hidden="true">→</span>
        </a>
      </article>
    </Reveal>
  )
}
