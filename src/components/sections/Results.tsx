import type { CSSProperties } from 'react'
import Image, { type StaticImageData } from 'next/image'
import type { ResultsContent } from '@/content/types'
import { anchors } from '@/lib/routes'
import { Reveal } from '@/components/ui/Reveal'
import { SnapshotLink } from '@/components/ui/SnapshotLink'
import clientLogo from '../../../public/Horizontal_Monochrome_White.png'
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
 * Results — featured projects listed one below another. Each card carries the
 * client logo, the story and its numbers on the left, and the texture with
 * the services provided overlaid on the right.
 */
export function Results({ results }: { results: ResultsContent }) {
  const { caseStudies } = results

  return (
    <section id="results" className="section" aria-labelledby="results-heading">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Results</p>
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
          <ul className={styles.list}>
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
                  <div className={styles.cardBody}>
                    <Image
                      src={clientLogo}
                      alt={study.client}
                      className={styles.clientLogo}
                    />
                    <h3 className={styles.title}>{study.title}</h3>
                    <p className={styles.intro}>{study.intro}</p>

                    <ul className={styles.metrics}>
                      {study.metrics.map((m) => (
                        <li key={m.label} className={styles.metric}>
                          <span className={styles.metricValue}>{m.value}</span>
                          <span className={styles.metricLabel}>{m.label}</span>
                        </li>
                      ))}
                    </ul>

                    <SnapshotLink
                      href={anchors.snapshot}
                      className={styles.cta}
                      location="why-different"
                    >
                      Book a Snapshot
                    </SnapshotLink>
                  </div>

                  <div className={styles.cardMedia}>
                    <Image
                      src={textures[study.texture] ?? case1}
                      alt=""
                      fill
                      sizes="(min-width: 60rem) 50vw, 100vw"
                      className={styles.mediaImage}
                    />
                    {/* Services provided, overlaid bottom-right of the thumbnail. */}
                    <ul className={styles.servicePills} aria-label="Services provided">
                      {study.services.map((s) => (
                        <li key={s} className={styles.servicePill}>
                          {s}
                        </li>
                      ))}
                    </ul>
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
