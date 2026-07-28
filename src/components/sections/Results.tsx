import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { ResultsContent } from '@/content/types'
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
 * Results — a 2x2 grid of case studies. Each card is a single image with the
 * services, title, and intro laid over it under a bottom-up gradient.
 */
export function Results({ results }: { results: ResultsContent }) {
  const { caseStudies } = results

  return (
    <section id="results" className="section" aria-labelledby="results-heading">
      <div className="container">
        <Reveal>
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
          <ul className={styles.grid}>
            {caseStudies.map((study, i) => (
              <Reveal
                as="li"
                key={study.id}
                delay={i * 0.06}
                className={styles.card}
              >
                <article
                  className={styles.cardInner}
                  style={
                    {
                      ['--case-fill' as string]: `var(--lab-${study.color}-fill)`,
                    } as CSSProperties
                  }
                >
                  <div className={styles.cardFill}>
                    <Image
                      src={textures[study.texture] ?? case1}
                      alt=""
                      fill
                      sizes="(min-width: 60rem) 50vw, 100vw"
                      className={styles.mediaImage}
                    />
                  </div>
                  <div className={styles.scrim} aria-hidden="true" />

                  {/* Services, pinned top-left. */}
                  <ul className={styles.servicePills} aria-label="Services provided">
                    {study.services.slice(0, 3).map((s) => (
                      <li key={s} className={styles.servicePill}>
                        {s}
                      </li>
                    ))}
                  </ul>

                  {/* Title and intro, at the foot of the image. */}
                  <div className={styles.caption}>
                    <h3 className={styles.title}>{study.client}</h3>
                    <p className={styles.intro}>{study.intro}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
